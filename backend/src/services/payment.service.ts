import { config } from "../config";
import { Enrollment, Payment } from "../models";
import { ApiError } from "../utils/ApiError";
import { COURSE_PRICES_NGN } from "../constants/coursePricing";
import * as courseService from "./course.service";
import { enrollStudent, getEnrollmentForCourseAndStudent } from "./enrollment.service";
import * as paymentGateway from "./paymentGateway.service";
import * as referralService from "./referral.service";
import * as userService from "./user.service";
import { logger } from "../utils/logger";
import { storageAdapter } from "../utils/storage";
import * as emails from "../emails";
import { CARD_SETTLEMENT_CURRENCY, convertFromNgn, estimateLocalAmount } from "./currency.service";

// A referred student's first confirmed payment qualifies their referrer's reward. Kept
// best-effort and non-fatal: a hiccup crediting the referral must never turn a
// successful payment into an error response for the student who just paid.
async function creditReferralIfAny(enrollment: Enrollment): Promise<void> {
  try {
    await referralService.handleQualifyingPayment(enrollment);
  } catch (err) {
    logger.error("Failed to credit referral after confirmed payment", err);
  }
}

function requirePriceNgn(courseSlug: string): number {
  const priceNgn = COURSE_PRICES_NGN[courseSlug];
  if (priceNgn === undefined) {
    throw ApiError.badRequest("This course does not have a price set yet");
  }
  return priceNgn;
}

async function requireUnpaidEnrollment(courseIdOrSlug: string, studentId: string) {
  const course = await courseService.getCourseByIdOrSlug(courseIdOrSlug);
  const enrollment = await getEnrollmentForCourseAndStudent(course.id, studentId);
  if (!enrollment) {
    throw ApiError.badRequest("Enroll in this course before paying for it");
  }
  if (enrollment.paymentConfirmed) {
    throw ApiError.conflict("Payment has already been confirmed for this enrollment");
  }
  return { course, enrollment };
}

export interface Quote {
  baseAmountNgn: number;
  card: {
    currency: string;
    amount: number;
    /** False while card payments are switched off (CARD_PAYMENTS_ENABLED not "true"). */
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
  estimatedLocal: { currency: string; amount: number } | null;
}

export async function getQuote(courseIdOrSlug: string, billingCountry?: string): Promise<Quote> {
  const course = await courseService.getCourseByIdOrSlug(courseIdOrSlug);
  const baseAmountNgn = requirePriceNgn(course.slug);

  return {
    baseAmountNgn,
    card: {
      currency: CARD_SETTLEMENT_CURRENCY,
      amount: convertFromNgn(baseAmountNgn, CARD_SETTLEMENT_CURRENCY),
      enabled: config.card.enabled,
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
    estimatedLocal: billingCountry ? estimateLocalAmount(baseAmountNgn, billingCountry) : null,
  };
}

export interface CardPaymentInput {
  courseId: string;
  studentId: string;
  cardholderName: string;
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvv: string;
  billingCountry: string;
  billingAddressLine1: string;
  billingCity: string;
  billingPostalCode: string;
}

export const CARD_PAYMENTS_DISABLED_MESSAGE =
  "Card payments are temporarily unavailable. Please pay by bank transfer, or contact hello@paleontraining.com.";

export async function chargeCourseCard(input: CardPaymentInput): Promise<{ payment: Payment; enrollment: Enrollment }> {
  // Checked before anything else: while the gateway is a mock, an enabled card flow would
  // unlock a paid course for any made-up card number.
  if (!config.card.enabled) {
    throw new ApiError(503, CARD_PAYMENTS_DISABLED_MESSAGE, { code: "CARD_PAYMENTS_DISABLED" });
  }
  const { course, enrollment } = await requireUnpaidEnrollment(input.courseId, input.studentId);
  const baseAmountNgn = requirePriceNgn(course.slug);
  const amount = convertFromNgn(baseAmountNgn, CARD_SETTLEMENT_CURRENCY);

  const chargeResult = await paymentGateway.chargeCard({
    amount,
    currency: CARD_SETTLEMENT_CURRENCY,
    cardholderName: input.cardholderName,
    cardNumber: input.cardNumber,
    expMonth: input.expMonth,
    expYear: input.expYear,
    cvv: input.cvv,
  });

  const payment = await Payment.create({
    enrollmentId: enrollment.id,
    studentId: input.studentId,
    method: "card",
    status: chargeResult.status,
    currency: CARD_SETTLEMENT_CURRENCY,
    amount,
    baseAmountNgn,
    billingCountry: input.billingCountry,
    cardBrand: chargeResult.cardBrand,
    cardLast4: chargeResult.cardLast4,
    gatewayReference: chargeResult.gatewayReference,
  });

  if (chargeResult.status === "succeeded") {
    enrollment.paymentConfirmed = true;
    enrollment.paymentConfirmedAt = new Date();
    await enrollment.save();
    await creditReferralIfAny(enrollment);
  }

  return { payment, enrollment };
}

export interface BankTransferInput {
  courseId: string;
  studentId: string;
  transferReference: string;
  notes?: string;
  // Optional proof of payment (image or PDF) uploaded with the transfer.
  receipt?: { buffer: Buffer; originalName: string; mimeType: string };
}

// Unlike chargeCourseCard, this never confirms payment itself -- a claimed bank transfer
// can't be verified automatically. It only records the attempt (currency, amount, the
// reference the student says they used) so an admin has what they need to check the real
// bank account and confirm it manually via the existing admin/enrollments/:id/payment flow.
//
// Clicking "Enroll" on the course page only opens the bank-transfer page; the student is
// enrolled here, when they submit their transfer. So a student with no enrolment yet gets
// one created (through the same enrollStudent() path, so the confirmation email and
// duplicate/published checks still apply), subject to the same verified-email rule as
// POST /courses/:id/enroll.
export const BANK_TRANSFER_DISABLED_MESSAGE =
  "Bank transfer payments are temporarily unavailable. Please check back soon or contact hello@paleontraining.com.";

export async function submitBankTransfer(input: BankTransferInput): Promise<{ payment: Payment; enrollment: Enrollment }> {
  if (!config.bankTransfer.enabled) {
    throw new ApiError(503, BANK_TRANSFER_DISABLED_MESSAGE, { code: "BANK_TRANSFER_DISABLED" });
  }
  const course = await courseService.getCourseByIdOrSlug(input.courseId);
  const baseAmountNgn = requirePriceNgn(course.slug);

  let enrollment = await getEnrollmentForCourseAndStudent(course.id, input.studentId);
  let newlyEnrolled = false;
  if (enrollment?.paymentConfirmed) {
    throw ApiError.conflict("Payment has already been confirmed for this enrollment");
  }
  if (!enrollment) {
    const student = await userService.getUserById(input.studentId);
    if (!student.emailVerifiedAt) {
      throw ApiError.forbidden("Please verify your email before enrolling in a course");
    }
    enrollment = await enrollStudent(course.id, input.studentId, { sendConfirmationEmail: false });
    newlyEnrolled = true;
  }

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
