import { describe, expect, it } from "vitest";
import { verifySmtpConnection } from "./email";

describe("Email Configuration", () => {
  it("should have SMTP environment variables configured", () => {
    expect(process.env.SMTP_HOST).toBeDefined();
    expect(process.env.SMTP_HOST).toBe("sxb1plzcpnl507873.prod.sxb1.secureserver.net");
    expect(process.env.SMTP_PORT).toBe("465");
    expect(process.env.SMTP_USER).toBe("accessment@goodshepherdhomecare.co.uk");
    expect(process.env.SMTP_PASS).toBeDefined();
    expect(process.env.SMTP_PASS!.length).toBeGreaterThan(0);
  });

  it("should verify SMTP connection with configured credentials", async () => {
    const result = await verifySmtpConnection();
    expect(result).toBe(true);
  }, 15000);

  it("should have ASSESSMENT_EMAIL set to a valid email", () => {
    const email = process.env.ASSESSMENT_EMAIL;
    expect(email).toBeDefined();
    expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    // The env var or default should point to the correct recipient
    expect(email).toMatch(/goodshepherdhomecare\.co\.uk$/);
  });
});
