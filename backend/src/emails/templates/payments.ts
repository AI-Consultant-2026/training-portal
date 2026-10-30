import { config } from "../../config";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

interface Student {
  firstName: string;
  lastName: string;
  email: string;
}

// Sent to the team when a Paystack (or, from 2026-10-30, Flutterwave) payment arrives that
// the webhook can't tie to exactly one unpaid enrolment, so it still gets confirmed by hand
// instead of being silently lost.
export function buildPaystackUnmatchedEmail(input: {
  /** Defaults to Paystack. */
  gateway?: "Paystack" | "Flutterwave";
  reference: string;
  email: string;
  /** Formatted with its currency, e.g. "₦200,000". */
  amount: string;
  reason: string;
}): EmailMessage {
  const gateway = input.gateway ?? "Paystack";
  const lines = [
    `A ${gateway} payment came in that couldn't be confirmed automatically.`,
    `Reason: ${input.reason}`,
    `Payer email: ${input.email}`,
    `Amount: ${input.amount}`,
    `${gateway} reference: ${input.reference}`,
    `Please find the student on ${config.corsOrigin}/admin/candidates and tick "Paid" on the right course (or "Deposit" for ${gateway === "Paystack" ? "a ₦20,000" : "an"} instalment deposit).`,
  ];
  return {
    to: config.leadsNotifyEmail,
    subject: `${gateway} payment needs manual confirmation (${input.amount})`,
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

// Instalments (2026-10-11): the deposit is in and the first days are open.
export function buildDepositConfirmedEmail(input: {
  student: Student;
  courseTitle: string;
  courseSlug: string;
  /** Formatted with the currency it was paid in, e.g. "₦20,000" or "KSh 1,930" (2026-10-30). */
  deposit: string;
  balance: string;
  unlockedDays: number;
}): EmailMessage {
  const lines = [
    `Hi ${input.student.firstName},`,
    `Your ${input.deposit} deposit for ${input.courseTitle} is confirmed. Days 1–${input.unlockedDays} are now unlocked, so you can start learning today.`,
    `Start learning: ${config.corsOrigin}/courses/${input.courseSlug}`,
    `When you're ready to carry on, pay the balance of ${input.balance} from the course page. It unlocks every remaining day, the capstone project and your certificate.`,
    "Welcome to Paleon Training!",
  ];
  return {
    to: input.student.email,
    subject: `Deposit received: ${input.courseTitle} Days 1–${input.unlockedDays} are unlocked`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
