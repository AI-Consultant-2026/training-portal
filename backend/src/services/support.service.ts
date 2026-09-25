import { config } from "../config";
import { User } from "../models";
import { emailAdapter } from "../utils/email";
import { wrapHtml } from "../emails/htmlWrapper";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";

export interface ProblemReportInput {
  message: string;
  phone?: string;
  pageUrl?: string;
  userAgent?: string;
  viewport?: string;
  screenshot?: { originalname: string; buffer: Buffer; mimetype: string };
}

// A rough, human-readable device/browser line from the User-Agent, so support doesn't
// have to ask "Android or iPhone? Which browser?" -- the questions the Support page
// used to make students answer by hand. The raw UA is included too for anything this misses.
export function describeDevice(userAgent: string): string {
  const ua = userAgent || "";
  let device = "Unknown device";
  const ios = ua.match(/(iPhone|iPad)[^)]*OS (\d+)[_.](\d+)/);
  const android = ua.match(/Android (\d+(?:\.\d+)?)/);
  if (ios) device = `${ios[1]} (iOS ${ios[2]}.${ios[3]})`;
  else if (android) device = `Android ${android[1]}`;
  else if (/Windows NT/.test(ua)) device = "Windows computer";
  else if (/Macintosh/.test(ua)) device = "Mac";
  else if (/Linux/.test(ua)) device = "Linux computer";

  let browser = "Unknown browser";
  if (/EdgA?\//.test(ua)) browser = "Microsoft Edge";
  else if (/OPR\/|Opera/.test(ua)) browser = "Opera";
  else if (/SamsungBrowser/.test(ua)) browser = "Samsung Internet";
  else if (/CriOS\/|Chrome\//.test(ua)) browser = "Google Chrome";
  else if (/FxiOS\/|Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua)) browser = "Safari";
  return `${device} · ${browser}`;
}

// Emails a student's in-portal problem report to support, with their account details
// filled in automatically. Unlike the other transactional emails (best-effort, failures
// only logged), a failure here is surfaced to the student so they know to email instead.
export async function sendProblemReport(userId: string, input: ProblemReportInput): Promise<void> {
  const user = await User.findByPk(userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  const name = `${user.firstName} ${user.lastName}`.trim();
  const lines = [
    "Problem reported from inside the Paleon Training portal.",
    `Name: ${name}`,
    `Email: ${user.email}`,
    `Phone / WhatsApp: ${input.phone || "(not given)"}`,
    `Location: ${user.location || "(unknown)"}`,
    `Device: ${describeDevice(input.userAgent ?? "")}`,
    `Page: ${input.pageUrl || "(unknown)"}`,
    `Screen: ${input.viewport || "(unknown)"}`,
    `Screenshot: ${input.screenshot ? "attached" : "none"}`,
    "",
    "What they said:",
    input.message,
    "",
    `Browser details: ${input.userAgent || "(none)"}`,
    `Reported: ${new Date().toISOString()}`,
    "Reply to this email to answer the student directly.",
  ];
  try {
    await emailAdapter.send({
      to: config.supportEmail,
      subject: `Portal problem report: ${name}`,
      text: lines.join("\n"),
      html: wrapHtml(lines),
      replyTo: user.email,
      attachments: input.screenshot
        ? [
            {
              filename: input.screenshot.originalname || "screenshot.png",
              content: input.screenshot.buffer,
              contentType: input.screenshot.mimetype,
            },
          ]
        : undefined,
    });
  } catch (err) {
    logger.error("Failed to send problem report", err);
    throw new ApiError(502, "We couldn't send your report just now. Please email support@paleontraining.com instead.");
  }
}
