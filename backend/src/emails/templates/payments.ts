import { config } from "../../config";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

interface Student {
  firstName: string;
  lastName: string;
  email: string;
}

export function buildPaymentConfirmedEmail(input: { student: Student; courseTitle: string; courseSlug: string }): EmailMessage {
  const lines = [
    `Hi ${input.student.firstName},`,
    `Good news — your payment for ${input.courseTitle} is confirmed and all your lessons are now unlocked.`,
    `Start learning: ${config.corsOrigin}/courses/${input.courseSlug}`,
    "The course is self-paced and you keep access for life. If you get stuck, use \"Report a problem\" in the portal menu.",
    "Welcome to Paleon Training!",
  ];
  return {
    to: input.student.email,
    subject: `You're in — ${input.courseTitle} is unlocked`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
