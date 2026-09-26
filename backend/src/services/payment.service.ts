import { Enrollment, Payment } from "../models";
import { ApiError } from "../utils/ApiError";
import { COURSE_PRICES_NGN } from "../constants/coursePricing";
import { getPaystackPaymentLink } from "../constants/paystackPaymentLinks";
import * as courseService from "./course.service";
import { enrollStudent, getEnrollmentForCourseAndStudent } from "./enrollment.service";
import * as userService from "./user.service";

function requirePriceNgn(courseSlug: string): number {
  const priceNgn = COURSE_PRICES_NGN[courseSlug];
  if (priceNgn === undefined) {
    throw ApiError.badRequest("This course does not have a price set yet");
  }
  return priceNgn;
}

// Clicking "Enroll" on the course page only opens the payment page; the student is enrolled
// when they commit to paying by heading off to Paystack. A
// student with no enrolment yet gets one created through the same enrollStudent() path
// (so the duplicate/published checks still apply), subject to the same verified-email
// rule as POST /courses/:id/enroll.
async function ensureUnpaidEnrollment(courseId: string, studentId: string): Promise<Enrollment> {
  const existing = await getEnrollmentForCourseAndStudent(courseId, studentId);
  if (existing?.paymentConfirmed) {
    throw ApiError.conflict("Payment has already been confirmed for this enrollment");
  }
  if (existing) return existing;

  const student = await userService.getUserById(studentId);
  if (!student.emailVerifiedAt) {
    throw ApiError.forbidden("Please verify your email before enrolling in a course");
  }
  return enrollStudent(courseId, studentId);
}

export interface Quote {
  baseAmountNgn: number;
  card: {
    currency: "NGN";
    amount: number;
    /** False until this course has a Paystack payment link (see paystackPaymentLinks.ts). */
    enabled: boolean;
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
  };
}

export const CARD_PAYMENTS_UNAVAILABLE_MESSAGE =
  "Payment isn't available for this course yet. Please contact hello@paleontraining.com.";

// Marks a pending card payment in the admin view, where it's matched by hand against the
// Paystack dashboard.
export const PAYSTACK_PENDING_REFERENCE = "Paystack payment page";

// Card payments are taken in Naira on a Paystack Payment Page (one per course, see
// paystackPaymentLinks.ts), so card details never touch Paleon's servers. Paystack doesn't
// tell this server when a payment page is paid, so this never confirms payment itself: it enrols the student if needed and records one pending card
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
  const enrollment = await ensureUnpaidEnrollment(course.id, input.studentId);

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
