import { config } from "../config";
import { Enrollment, Payment } from "../models";
import { ApiError } from "../utils/ApiError";
import { COURSE_PRICES_NGN } from "../constants/coursePricing";
import * as courseService from "./course.service";
import { getEnrollmentForCourseAndStudent } from "./enrollment.service";
import * as paymentGateway from "./paymentGateway.service";
import * as referralService from "./referral.service";
import { logger } from "../utils/logger";
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
  card: { currency: string; amount: number };
  bankTransfer: { currency: string; amount: number; bankDetails: typeof config.bankTransfer };
  estimatedLocal: { currency: string; amount: number } | null;
}

export async function getQuote(courseIdOrSlug: string, billingCountry?: string): Promise<Quote> {
  const course = await courseService.getCourseByIdOrSlug(courseIdOrSlug);
  const baseAmountNgn = requirePriceNgn(course.slug);

  return {
    baseAmountNgn,
    card: { currency: CARD_SETTLEMENT_CURRENCY, amount: convertFromNgn(baseAmountNgn, CARD_SETTLEMENT_CURRENCY) },
    bankTransfer: { currency: "NGN", amount: baseAmountNgn, bankDetails: config.bankTransfer },
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

export async function chargeCourseCard(input: CardPaymentInput): Promise<{ payment: Payment; enrollment: Enrollment }> {
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
}

// Unlike chargeCourseCard, this never confirms payment itself -- a claimed bank transfer
// can't be verified automatically. It only records the attempt (currency, amount, the
// reference the student says they used) so an admin has what they need to check the real
// bank account and confirm it manually via the existing admin/enrollments/:id/payment flow.
export async function submitBankTransfer(input: BankTransferInput): Promise<{ payment: Payment; enrollment: Enrollment }> {
  const { course, enrollment } = await requireUnpaidEnrollment(input.courseId, input.studentId);
  const baseAmountNgn = requirePriceNgn(course.slug);

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
  });

  return { payment, enrollment };
}
