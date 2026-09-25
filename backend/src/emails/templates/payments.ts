import { config } from "../../config";
import { PAYMENT_CONFIRMATION_PROMISE } from "../../constants/paymentConfirmation";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

interface Student {
  firstName: string;
  lastName: string;
  email: string;
}

function naira(amount: number): string {
  return `₦${Number(amount).toLocaleString("en-NG")}`;
}

// To the team (hello@): everything needed to check the bank account and confirm.
export function buildBankTransferAlertEmail(input: {
  student: Student;
  courseTitle: string;
  amount: number;
  reference: string;
  notes?: string | null;
  receipt?: { filename: string; content: Buffer; contentType: string } | null;
}): EmailMessage {
  const lines = [
    "A student has submitted a bank transfer and is waiting for confirmation.",
    `Student: ${input.student.firstName} ${input.student.lastName} <${input.student.email}>`,
    `Course: ${input.courseTitle}`,
    `Amount: ${naira(input.amount)}`,
    `Transfer reference: ${input.reference}`,
    `Receipt: ${input.receipt ? "attached" : "not uploaded"}`,
    ...(input.notes ? [`Student's note: ${input.notes}`] : []),
    `We've told the student their lessons unlock ${PAYMENT_CONFIRMATION_PROMISE}.`,
    `Confirm it in Admin → Candidates: ${config.corsOrigin}/admin/candidates`,
  ];
  return {
    to: config.leadsNotifyEmail,
    subject: `Bank transfer to confirm: ${input.courseTitle} — ${input.student.firstName} ${input.student.lastName}`,
    text: lines.join("\n"),
    html: wrapHtml(lines),
    replyTo: input.student.email,
    attachments: input.receipt ? [input.receipt] : undefined,
  };
}

// To the student, straight after they submit.
export function buildBankTransferReceivedEmail(input: {
  student: Student;
  courseTitle: string;
  amount: number;
  reference: string;
  newlyEnrolled?: boolean;
}): EmailMessage {
  const lines = [
    `Hi ${input.student.firstName},`,
    input.newlyEnrolled
      ? `You're enrolled in ${input.courseTitle} \u2014 and we've received your bank transfer details.`
      : `Thanks \u2014 we've received your bank transfer details for ${input.courseTitle}.`,
    `Amount: ${naira(input.amount)}. Your reference: ${input.reference}.`,
    `We'll check it against our bank account and unlock your lessons ${PAYMENT_CONFIRMATION_PROMISE} (Monday to Friday, Nigerian time). We'll email you as soon as they're unlocked.`,
    `Meanwhile, your course's first lesson is already open: ${config.corsOrigin}/dashboard`,
    "If anything looks wrong, reply to this email or WhatsApp us on +44 7508 823495.",
  ];
  return {
    to: input.student.email,
    subject: input.newlyEnrolled
      ? `You're enrolled in ${input.courseTitle} \u2014 payment details received`
      : `We've received your payment details \u2014 ${input.courseTitle}`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}

// To the student, when an admin confirms the payment.
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
