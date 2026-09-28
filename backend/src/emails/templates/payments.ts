import { config } from "../../config";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

interface Student {
  firstName: string;
  lastName: string;
  email: string;
}

// Sent to the team when a Paystack payment arrives that the webhook can't tie to exactly one
// unpaid enrolment, so it still gets confirmed by hand instead of being silently lost.
export function buildPaystackUnmatchedEmail(input: {
  reference: string;
  email: string;
  amountNgn: number;
  reason: string;
}): EmailMessage {
  const lines = [
    "A Paystack payment came in that couldn't be confirmed automatically.",
    `Reason: ${input.reason}`,
    `Payer email: ${input.email}`,
    `Amount: ₦${input.amountNgn.toLocaleString("en-NG")}`,
    `Paystack reference: ${input.reference}`,
    `Please find the student on ${config.corsOrigin}/admin/candidates and tick "Paid" on the right course.`,
  ];
  return {
    to: config.leadsNotifyEmail,
    subject: `Paystack payment needs manual confirmation (₦${input.amountNgn.toLocaleString("en-NG")})`,
    text: lines.join("\n"),
    html: wrapHtml(lines),
  };
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
