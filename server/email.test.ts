import { describe, expect, it } from "vitest";

describe("ASSESSMENT_EMAIL environment variable", () => {
  it("should be set and be a valid email format", () => {
    const email = process.env.ASSESSMENT_EMAIL;
    expect(email).toBeDefined();
    expect(email).toBe("assessment@goodshepherdhomecare.co.uk");
    expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});
