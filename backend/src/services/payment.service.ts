import { config } from "../config";
import { Enrollment, Payment } from "../models";
import { ApiError } from "../utils/ApiError";
import { COURSE_PRICES_NGN } from "../constants/coursePricing";
import { getPaystackPaymentLink } from "../constants/paystackPaymentLinks";
import * as courseService from "./course.service";
import { enrollStudent, getEnrollmentForCourseAndStudent } from "./enrollment.service";
import * as userService from "./user.service";
import { logger } from "../utils/logger";
import { storageAdapter } from "../utils/storage";
import * as emails from "../emails";

function requirePriceNgn(courseSlug: string): number {
  const priceNgn = COURSE_PRICES_NGN[courseSlug];
  if (priceNgn === undefined) {
    throw ApiError.badRequest("This course does not have a price set yet");
  }
  return priceNgn;
}

// Clicking "Enroll" on the course page only opens a payment page; the student is enrolled
// when they commit to paying (submitting a bank transfer, or heading off to Paystack). A
// student with no enrolment yet gets one created through the same enrollStudent() path
// (so the duplicate/published checks still apply), subject to the same verified-email
// rule as POST /courses/:id/enroll.
async function ensureUnpaidEnrollment(
  courseId: string,
  studentId: string,
  { sendConfirmationEmail }: { sendConfirmationEmail: boolean },
): Promise<{ enrollment: Enrollment; newlyEnrolled: boolean }> {
  const existing = await getEnrollmentForCourseAndStudent(courseId, studentId);
  if (existing?.paymentConfirmed) {
    throw ApiError.conflict("Payment has already been confirmed for this enrollment");
  }
  if (existing) return { enrollment: existing, newlyEnrolled: false };

  const student = await userService.getUserById(studentId);
  if (!student.emailVerifiedAt) {
    throw ApiError.forbidden("Please verify your email before enrolling in a course");
  }
  const enrollment = await enrollStudent(courseId, studentId, { sendConfirmationEmail });
  return { enrollment, newlyEnrolled: true };
}

export interface Quote {
  baseAmountNgn: number;
  card: {
    currency: "NGN";
    amount: number;
    /** False until this course has a Paystack payment link (see paystackPaymentLinks.ts). */
    enabled: boolean;
  };
  bankTransfer: {
    currency: string;
    amount: number;
    /** False while bank transfers are paused; the details below are then blanked. */
    enabled: boolean;
    /** True while payments go to the interim account (BANK_TRANSFER_TEMPORARY_NOTICE). */
    temporaryNotice: boolean;
    bankDetails: { bankName: string; accountName: string; accountNumber: string; sortCodeOrIban: string };
  };
}

export async function getQuote(courseIdOrSlug: string): Promise<Quote> {
  const course = await courseService.getCourseByIdOrSlug(courseIdOrSlug);
  const baseAmountNgn = requirePriceNgn(course.slug);

  return {
    baseAmountNgn,
    card: {
      currency: "NGN",
      amount: baseAmountNgn,
      enabled: getPaystackPaymentLink(course.slug) !== null,
    },
    bankTransfer: {
      currency: "NGN",
      amount: baseAmountNgn,
      enabled: config.bankTransfer.enabled,
      temporaryNotice: config.bankTransfer.temporaryNotice,
      // Don't hand out receiving-account details while the flow is paused.
      bankDetails: config.bankTransfer.enabled
        ? {
            bankName: config.bankTransfer.bankName,
            accountName: config.bankTransfer.accountName,
            accountNumber: config.bankTransfer.accountNumber,
            sortCodeOrIban: config.bankTransfer.sortCodeOrIban,
          }
        : { bankName: "", accountName: "", accountNumber: "", sortCodeOrIban: "" },
    },
  };
}

export const CARD_PAYMENTS_UNAVAILABLE_MESSAGE =
  "Card payment isn't available for this course yet. Please pay by bank transfer, or contact hello@paleontraining.com.";

// Marks a pending card payment in the admin view, where it's matched by hand against the
// Paystack dashboard.
export const PAYSTACK_PENDING_REFERENCE = "Paystack payment page";

// Card payments are taken in Naira on a Paystack Payment Page (one per course, see
// paystackPaymentLinks.ts), so card details never touch Paleon's servers. Paystack doesn't
// tell this server when a payment page is paid, so like a bank transfer this never
// confirms payment itself: it enrols the student if needed and records one pending card
// payment (reused if they click Pay again), so the payment shows as pending in the admin
// view. The team confirms it by hand once it appears in the Paystack dashboard, which also
// emails them about every successful payment.
export async function startCardPayment(input: {
  courseId: string;
  studentId: string;
}): Promise<{ paymentLink: string; payment: Payment; enrollment: Enrollment }> {
  const course = await courseService.getCourseByIdOrSlug(input.courseId);
  const paymentLink = getPaystackPaymentLink(course.slug);
  if (!paymentLink) {
    throw new ApiError(503, CARD_PAYMENTS_UNAVAILABLE_MESSAGE, { code: "CARD_PAYMENTS_UNAVAILABLE" });
  }
  const baseAmountNgn = requirePriceNgn(course.slug);
  const { enrollment } = await ensureUnpaidEnrollment(course.id, input.studentId, { sendConfirmationEmail: true });

  const existing = await Payment.findOne({
    where: { enrollmentId: enrollment.id, method: "card", status: "pending" },
  });
  const payment =
    existing ??
    (await Payment.create({
      enrollmentId: enrollment.id,
      studentId: input.studentId,
      method: "card",
      status: "pending",
      currency: "NGN",
      amount: baseAmountNgn,
      baseAmountNgn,
      // Paystack collects the card's billing details, so there's nothing to record here.
      billingCountry: "",
      gatewayReference: PAYSTACK_PENDING_REFERENCE,
    }));

  return { paymentLink, payment, enrollment };
}

export interface BankTransferInput {
  courseId: string;
  studentId: string;
  transferReference: string;
  notes?: string;
  // Optional proof of payment (image or PDF) uploaded with the transfer.
  receipt?: { buffer: Buffer; originalName: string; mimeType: string };
}

// This never confirms payment itself -- a claimed bank transfer
// can't be verified automatically. It only records the attempt (currency, amount, the
// reference the student says they used) so an admin has what they need to check the real
// bank account and confirm it manually via the existing admin/enrollments/:id/payment flow.
// A student who hasn't enrolled yet is enrolled here (see ensureUnpaidEnrollment).
export const BANK_TRANSFER_DISABLED_MESSAGE =
  "Bank transfer payments are temporarily unavailable. Please check back soon or contact hello@paleontraining.com.";

export async function submitBankTransfer(input: BankTransferInput): Promise<{ payment: Payment; enrollment: Enrollment }> {
  if (!config.bankTransfer.enabled) {
    throw new ApiError(503, BANK_TRANSFER_DISABLED_MESSAGE, { code: "BANK_TRANSFER_DISABLED" });
  }
  const course = await courseService.getCourseByIdOrSlug(input.courseId);
  const baseAmountNgn = requirePriceNgn(course.slug);

  // No separate enrolment email: the "payment details received" email doubles as one.
  const { enrollment, newlyEnrolled } = await ensureUnpaidEnrollment(course.id, input.studentId, {
    sendConfirmationEmail: false,
  });

  const saved = input.receipt
    ? await storageAdapter.save({
        buffer: input.receipt.buffer,
        originalName: input.receipt.originalName,
        mimeType: input.receipt.mimeType,
        keyPrefix: "payment-receipts",
      })
    : null;

  const payment = await Payment.create({
    enrollmentId: enrollment.id,
    studentId: input.studentId,
    method: "bank_transfer",
    status: "pending",
    currency: "NGN",
    amount: baseAmountNgn,
    baseAmountNgn,
    billingCountry: "Nigeria",
    gatewayReference: input.transferReference,
    notes: input.notes ?? null,
    receiptPath: saved?.storagePath ?? null,
    receiptName: input.receipt?.originalName ?? null,
    receiptMimeType: input.receipt?.mimeType ?? null,
  });

  // Best-effort, not awaited: the transfer is recorded either way. The alert gives the
  // team everything needed to confirm it; the student gets a receipt with the timeline.
  const student = await userService.getUserById(input.studentId);
  const details = { student, courseTitle: course.title, amount: baseAmountNgn, reference: input.transferReference };
  // One email to the student, not two: when this submit also enrolled them, the
  // "payment received" email doubles as the enrolment confirmation.
  emails
    .sendBankTransferAlertEmail({
      ...details,
      notes: input.notes ?? null,
      receipt: input.receipt
        ? { filename: input.receipt.originalName, content: input.receipt.buffer, contentType: input.receipt.mimeType }
        : null,
    })
    .catch((err) => logger.error("Failed to send bank transfer alert email", err));
  emails
    .sendBankTransferReceivedEmail({ ...details, newlyEnrolled })
    .catch((err) => logger.error("Failed to send bank transfer received email", err));

  return { payment, enrollment };
}
