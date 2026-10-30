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
  /** Formatted with its currency, e.g. "₦200,000". */
  amount: string;
  reason: string;
}): EmailMessage {
  const lines = [
    "A Paystack payment came in that couldn't be confirmed automatically.",
    `Reason: ${input.reason}`,
    `Payer email: ${input.email}`,
    `Amount: ${input.amount}`,
    `Paystack reference: ${input.reference}`,
    `Please find the student on ${config.corsOrigin}/admin/candidates and tick "Paid" on the right course (or "Deposit" for a ₦20,000 instalment deposit).`,
  ];
  return {
    to: config.leadsNotifyEmail,
    subject: `Paystack payment needs manual confirmation (${input.amount})`,
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
  depositNgn: number;
  balanceNgn: number;
  unlockedDays: number;
}): EmailMessage {
  const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;
  const lines = [
    `Hi ${input.student.firstName},`,
    `Your ${naira(input.depositNgn)} deposit for ${input.courseTitle} is confirmed. Days 1–${input.unlockedDays} are now unlocked, so you can start learning today.`,
    `Start learning: ${config.corsOrigin}/courses/${input.courseSlug}`,
    `When you're ready to carry on, pay the balance of ${naira(input.balanceNgn)} from the course page. It unlocks every remaining day, the capstone project and your certificate.`,
    "Welcome to Paleon Training!",
  ];
  return {
    to: input.student.email,
    subject: `Deposit received: ${input.courseTitle} Days 1–${input.unlockedDays} are unlocked`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
