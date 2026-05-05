import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createCareAssessment, getAllCareAssessments, updateCareAssessmentStatus } from "./db";
import { notifyOwner } from "./_core/notification";
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

        // Send notification to owner
        try {
          await notifyOwner({
            title: `New Care Assessment: ${input.fullName}`,
            content: `A new care assessment has been submitted.\n\nName: ${input.fullName}\nPhone: ${input.phone}\nEmail: ${input.email || "Not provided"}\nLocation: ${input.location}\nCare Type: ${input.careType}\nUrgency: ${input.urgency || "Not specified"}\nDetails: ${input.additionalDetails || "None provided"}`,
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
});

export type AppRouter = typeof appRouter;
