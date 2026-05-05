import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => ({
  createCareAssessment: vi.fn().mockResolvedValue(undefined),
  getAllCareAssessments: vi.fn().mockResolvedValue([
    {
      id: 1,
      fullName: "Jean Smith",
      phone: "07815493302",
      email: "jean@example.com",
      location: "Glasgow City",
      careType: "Dementia Care",
      urgency: "This week",
      additionalDetails: "Need help for my mother",
      preferredContactTime: "Morning (9am-12pm)",
      relationship: "Son/Daughter",
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  updateCareAssessmentStatus: vi.fn().mockResolvedValue(undefined),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(undefined),
}));

// Mock notification
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@example.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("assessment.submit", () => {
  it("successfully submits a care assessment", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.assessment.submit({
      fullName: "Jean Smith",
      phone: "07815493302",
      email: "jean@example.com",
      location: "Glasgow City",
      careType: "Dementia Care",
      urgency: "This week",
      additionalDetails: "Need help for my mother",
      preferredContactTime: "Morning (9am-12pm)",
      relationship: "Son/Daughter",
    });

    expect(result).toEqual({ success: true });
  });

  it("validates required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.assessment.submit({
        fullName: "",
        phone: "07815493302",
        location: "Glasgow City",
        careType: "Dementia Care",
      })
    ).rejects.toThrow();
  });
});

describe("assessment.list", () => {
  it("returns assessments for admin users", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.assessment.list();
    expect(result).toHaveLength(1);
    expect(result[0].fullName).toBe("Jean Smith");
  });

  it("rejects non-admin users", async () => {
    const ctx = createPublicContext();
    ctx.user = {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    };
    const caller = appRouter.createCaller(ctx);

    await expect(caller.assessment.list()).rejects.toThrow("Admin access required");
  });
});

describe("assessment.updateStatus", () => {
  it("allows admin to update status", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.assessment.updateStatus({
      id: 1,
      status: "contacted",
    });

    expect(result).toEqual({ success: true });
  });
});
