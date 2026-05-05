import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createCareAssessment, getAllCareAssessments, updateCareAssessmentStatus, createTestimonial, getPublishedTestimonials, getAllTestimonials, deleteTestimonial, createBlogPost, getPublishedBlogPosts, getBlogPostBySlug, getAllBlogPosts, updateBlogPost, deleteBlogPost } from "./db";
import { notifyOwner } from "./_core/notification";
import { sendAssessmentNotificationEmail } from "./email";
import { TRPCError } from "@trpc/server";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  assessment: router({
    submit: publicProcedure
      .input(
        z.object({
          fullName: z.string().min(1, "Full name is required"),
          phone: z.string().min(1, "Phone number is required"),
          email: z.string().optional().default(""),
          location: z.string().min(1, "Location is required"),
          careType: z.string().min(1, "Care type is required"),
          urgency: z.string().optional().default(""),
          additionalDetails: z.string().optional().default(""),
          preferredContactTime: z.string().optional().default(""),
          relationship: z.string().optional().default(""),
        })
      )
      .mutation(async ({ input }) => {
        await createCareAssessment({
          fullName: input.fullName,
          phone: input.phone,
          email: input.email || null,
          location: input.location,
          careType: input.careType,
          urgency: input.urgency || null,
          additionalDetails: input.additionalDetails || null,
          preferredContactTime: input.preferredContactTime || null,
          relationship: input.relationship || null,
          status: "new",
        });

        // Send email notification directly to assessment email
        try {
          await sendAssessmentNotificationEmail({
            fullName: input.fullName,
            phone: input.phone,
            email: input.email || null,
            location: input.location,
            careType: input.careType,
            urgency: input.urgency || null,
            additionalDetails: input.additionalDetails || null,
            preferredContactTime: input.preferredContactTime || null,
            relationship: input.relationship || null,
          });
        } catch (e) {
          console.error("[Email] Failed to send assessment email:", e);
        }

        // Also send platform notification to owner
        try {
          await notifyOwner({
            title: `New Care Assessment: ${input.fullName}`,
            content: `A new care assessment has been submitted.\n\nName: ${input.fullName}\nPhone: ${input.phone}\nEmail: ${input.email || "Not provided"}\nLocation: ${input.location}\nCare Type: ${input.careType}\nUrgency: ${input.urgency || "Not specified"}\nPreferred Contact: ${input.preferredContactTime || "Not specified"}\nRelationship: ${input.relationship || "Not specified"}\nDetails: ${input.additionalDetails || "None provided"}`,
          });
        } catch (e) {
          console.error("[Notification] Failed to notify owner:", e);
        }

        return { success: true };
      }),

    list: adminProcedure.query(async () => {
      return await getAllCareAssessments();
    }),

    updateStatus: adminProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["new", "contacted", "in_progress", "completed", "cancelled"]),
        })
      )
      .mutation(async ({ input }) => {
        await updateCareAssessmentStatus(input.id, input.status);
        return { success: true };
      }),
  }),

  testimonials: router({
    published: publicProcedure.query(async () => {
      return await getPublishedTestimonials();
    }),
    list: adminProcedure.query(async () => {
      return await getAllTestimonials();
    }),
    create: adminProcedure
      .input(z.object({
        clientName: z.string().min(1),
        relationship: z.string().optional().default(""),
        location: z.string().optional().default(""),
        rating: z.number().min(1).max(5),
        content: z.string().min(1),
        serviceType: z.string().optional().default(""),
      }))
      .mutation(async ({ input }) => {
        await createTestimonial({
          clientName: input.clientName,
          relationship: input.relationship || null,
          location: input.location || null,
          rating: input.rating,
          content: input.content,
          serviceType: input.serviceType || null,
          isPublished: "yes",
        });
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteTestimonial(input.id);
        return { success: true };
      }),
  }),

  blog: router({
    published: publicProcedure.query(async () => {
      return await getPublishedBlogPosts();
    }),
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await getBlogPostBySlug(input.slug) ?? null;
      }),
    list: adminProcedure.query(async () => {
      return await getAllBlogPosts();
    }),
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        excerpt: z.string().optional().default(""),
        content: z.string().min(1),
        category: z.string().optional().default(""),
        imageUrl: z.string().optional().default(""),
      }))
      .mutation(async ({ input, ctx }) => {
        await createBlogPost({
          title: input.title,
          slug: input.slug,
          excerpt: input.excerpt || null,
          content: input.content,
          category: input.category || null,
          imageUrl: input.imageUrl || null,
          isPublished: "yes",
          authorId: ctx.user.id,
        });
        return { success: true };
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        category: z.string().optional(),
        imageUrl: z.string().optional(),
        isPublished: z.enum(["yes", "no"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateBlogPost(id, data as any);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteBlogPost(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
