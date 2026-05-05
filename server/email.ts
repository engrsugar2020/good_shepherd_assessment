import nodemailer from "nodemailer";
import { ENV } from "./_core/env";

// SMTP Configuration
const SMTP_CONFIG = {
  host: ENV.smtpHost || "sxb1plzcpnl507873.prod.sxb1.secureserver.net",
  port: ENV.smtpPort || 465,
  user: ENV.smtpUser || "accessment@goodshepherdhomecare.co.uk",
  // The password contains $$ which env vars may mangle; use raw value if env looks corrupted
  getPass: (): string => {
    const envPass = ENV.smtpPass;
    // Check if the env var contains the expected password pattern
    if (envPass && envPass.includes("$$")) {
      return envPass;
    }
    // If $$ was stripped/mangled by the env system, reconstruct it
    // The password base without $$ is stored, we append $$
    if (envPass && envPass.length > 0) {
      // Check if it looks like the password minus the $$
      const base = "Greatness55";
      if (envPass.startsWith(base)) {
        return base + "$$";
      }
      return envPass;
    }
    return "";
  },
};

// Create reusable transporter using SMTP
const createTransporter = () => {
  const pass = SMTP_CONFIG.getPass();
  if (!SMTP_CONFIG.host || !SMTP_CONFIG.user || !pass) {
    console.warn("[Email] SMTP not configured - email notifications disabled");
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: true, // Port 465 uses SSL/TLS
    auth: {
      user: SMTP_CONFIG.user,
      pass: pass,
    },
  });
};

export type AssessmentEmailData = {
  fullName: string;
  phone: string;
  email: string | null;
  location: string;
  careType: string;
  urgency: string | null;
  additionalDetails: string | null;
  preferredContactTime: string | null;
  relationship: string | null;
};

/**
 * Send assessment notification email to the configured assessment email address.
 * Returns true if sent successfully, false otherwise.
 */
export async function sendAssessmentNotificationEmail(
  data: AssessmentEmailData
): Promise<boolean> {
  const transporter = createTransporter();
  if (!transporter) {
    return false;
  }

  // Always send to the correct accessment@ email (note: env var may have different spelling)
  const recipientEmail = "accessment@goodshepherdhomecare.co.uk";

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #4a1d8e, #6b2fa0); padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #d4af37; margin: 0; font-size: 24px;">🐑 Good Shepherd HomeCare Ltd</h1>
        <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 14px;">New Care Assessment Submission</p>
      </div>
      
      <div style="background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0;">
        <h2 style="color: #4a1d8e; margin-top: 0;">New Assessment Request</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 10px; font-weight: bold; color: #333; width: 40%;">Full Name:</td>
            <td style="padding: 10px; color: #555;">${data.fullName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 10px; font-weight: bold; color: #333;">Phone:</td>
            <td style="padding: 10px; color: #555;">${data.phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 10px; font-weight: bold; color: #333;">Email:</td>
            <td style="padding: 10px; color: #555;">${data.email || "Not provided"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 10px; font-weight: bold; color: #333;">Location:</td>
            <td style="padding: 10px; color: #555;">${data.location}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 10px; font-weight: bold; color: #333;">Care Type:</td>
            <td style="padding: 10px; color: #555;">${data.careType}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 10px; font-weight: bold; color: #333;">Urgency:</td>
            <td style="padding: 10px; color: #555;">${data.urgency || "Not specified"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 10px; font-weight: bold; color: #333;">Preferred Contact Time:</td>
            <td style="padding: 10px; color: #555;">${data.preferredContactTime || "Not specified"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 10px; font-weight: bold; color: #333;">Relationship:</td>
            <td style="padding: 10px; color: #555;">${data.relationship || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #333;">Additional Details:</td>
            <td style="padding: 10px; color: #555;">${data.additionalDetails || "None provided"}</td>
          </tr>
        </table>
      </div>
      
      <div style="background: #4a1d8e; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
        <p style="color: #d4af37; margin: 0; font-size: 12px;">
          Please respond within 2 hours as promised on our website.
        </p>
        <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 11px;">
          Good Shepherd HomeCare Ltd | +44 7947 962839
        </p>
      </div>
    </div>
  `;

  const textContent = `
NEW CARE ASSESSMENT SUBMISSION
================================

Full Name: ${data.fullName}
Phone: ${data.phone}
Email: ${data.email || "Not provided"}
Location: ${data.location}
Care Type: ${data.careType}
Urgency: ${data.urgency || "Not specified"}
Preferred Contact Time: ${data.preferredContactTime || "Not specified"}
Relationship: ${data.relationship || "Not specified"}
Additional Details: ${data.additionalDetails || "None provided"}

================================
Please respond within 2 hours as promised on our website.
Good Shepherd HomeCare Ltd | +44 7947 962839
  `.trim();

  try {
    await transporter.sendMail({
      from: `"Good Shepherd HomeCare" <${SMTP_CONFIG.user}>`,
      to: recipientEmail,
      subject: `New Care Assessment: ${data.fullName} - ${data.careType}`,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Email] Assessment notification sent to ${recipientEmail} for ${data.fullName}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send assessment notification:", error);
    return false;
  }
}

/**
 * Verify SMTP connection is working.
 * Returns true if connection is successful.
 */
export async function verifySmtpConnection(): Promise<boolean> {
  const transporter = createTransporter();
  if (!transporter) {
    return false;
  }

  try {
    await transporter.verify();
    console.log("[Email] SMTP connection verified successfully");
    return true;
  } catch (error) {
    console.error("[Email] SMTP connection verification failed:", error);
    return false;
  }
}
