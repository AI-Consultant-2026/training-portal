import { Enrollment, Payment } from "../models";
import { ApiError } from "../utils/ApiError";
import crypto from "crypto";
import { config } from "../config";
import { COURSE_PRICES_NGN, DEPOSIT_UNLOCKED_DAYS, INSTALMENT_DEPOSIT_NGN, getBalanceNgn } from "../constants/coursePricing";
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
  /** Pay in two parts: a deposit that unlocks the first days, then the balance. */
  instalment: {
    depositNgn: number;
    balanceNgn: number;
    unlockedDays: number;
    /** False when Paystack's API key isn't set (instalments need the API checkout). */
    enabled: boolean;
  } | null;
}

export async function getQuote(courseIdOrSlug: string): Promise<Quote> {
  const course = await courseService.getCourseByIdOrSlug(courseIdOrSlug);
  const baseAmountNgn = requirePriceNgn(course.slug);

  const balanceNgn = getBalanceNgn(course.slug);

  return {
    baseAmountNgn,
    card: {
      currency: "NGN",
      amount: baseAmountNgn,
      enabled: getPaystackPaymentLink(course.slug) !== null,
    },
    instalment:
      balanceNgn === null
        ? null
        : {
            depositNgn: INSTALMENT_DEPOSIT_NGN,
            balanceNgn,
            unlockedDays: DEPOSIT_UNLOCKED_DAYS,
            enabled: config.paystackSecretKey !== "",
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
    where: { enrollmentId: enrollment.id, method: "card", status: "pending", gatewayReference: PAYSTACK_PENDING_REFERENCE },
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

// --- Instalments (2026-10-11) ----------------------------------------------------------
// The deposit and the balance are charged through Paystack's transaction API rather than a
// fixed-price Payment Page, so the amount is set here and the charge carries the enrolment
// id back to the webhook in its metadata (see paystackWebhook.service.ts). Card details
// still only ever go to Paystack's own checkout page.

export type InstalmentKind = "deposit" | "balance";

// A pending instalment charge is stored under this prefix until Paystack confirms it; the
// webhook then swaps it for "paystack:<reference>" (its idempotency key).
export const PAYSTACK_INIT_REFERENCE_PREFIX = "paystack-init:";
export const INSTALMENT_NOTES: Record<InstalmentKind, string> = {
  deposit: "Instalment deposit",
  balance: "Instalment balance",
};

export async function startInstalmentPayment(input: {
  courseId: string;
  studentId: string;
  kind: InstalmentKind;
}): Promise<{ paymentLink: string; payment: Payment; enrollment: Enrollment }> {
  if (config.paystackSecretKey === "") {
    throw new ApiError(503, CARD_PAYMENTS_UNAVAILABLE_MESSAGE, { code: "CARD_PAYMENTS_UNAVAILABLE" });
  }
  const course = await courseService.getCourseByIdOrSlug(input.courseId);
  const balanceNgn = getBalanceNgn(course.slug);
  if (balanceNgn === null) {
    throw ApiError.badRequest("This course can't be paid in instalments");
  }

  let enrollment: Enrollment;
  if (input.kind === "deposit") {
    enrollment = await ensureUnpaidEnrollment(course.id, input.studentId);
    if (enrollment.depositPaidAt) {
      throw ApiError.conflict("Your deposit has already been paid -- pay the balance to unlock the rest of the course");
    }
  } else {
    const existing = await getEnrollmentForCourseAndStudent(course.id, input.studentId);
    if (!existing) throw ApiError.badRequest("Pay the deposit first to start this course");
    if (existing.paymentConfirmed) throw ApiError.conflict("Payment has already been confirmed for this enrollment");
    if (!existing.depositPaidAt) throw ApiError.badRequest("Pay the deposit first to start this course");
    enrollment = existing;
  }

  const amountNgn = input.kind === "deposit" ? INSTALMENT_DEPOSIT_NGN : balanceNgn;
  const student = await userService.getUserById(input.studentId);
  const reference = `PLN-${input.kind}-${crypto.randomBytes(8).toString("hex")}`;
  const origin = config.corsOrigin.replace(/\/$/, "");

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.paystackSecretKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: student.email,
      amount: amountNgn * 100,
      currency: "NGN",
      reference,
      callback_url: `${origin}/courses/${course.slug}?payment=${input.kind}`,
      metadata: {
        enrollmentId: enrollment.id,
        instalment: input.kind,
        courseSlug: course.slug,
        cancel_action: `${origin}/courses/${course.slug}/pay/card`,
      },
    }),
  });
  const body = (await res.json().catch(() => null)) as
    | { status?: boolean; message?: string; data?: { authorization_url?: string } }
    | null;
  const paymentLink = body?.data?.authorization_url;
  if (!res.ok || !body?.status || !paymentLink) {
    throw new ApiError(502, "We couldn't open the payment page. Please try again in a moment.", {
      code: "PAYSTACK_INIT_FAILED",
      detail: body?.message ?? `HTTP ${res.status}`,
    });
  }

  const payment = await Payment.create({
    enrollmentId: enrollment.id,
    studentId: input.studentId,
    method: "card",
    status: "pending",
    currency: "NGN",
    amount: amountNgn,
    baseAmountNgn: amountNgn,
    billingCountry: "",
    gatewayReference: PAYSTACK_INIT_REFERENCE_PREFIX + reference,
    notes: INSTALMENT_NOTES[input.kind],
  });

  return { paymentLink, payment, enrollment };
}

// Backup for the webhook: when the student lands back on the course page from Paystack
// checkout (with ?reference=...), the page asks the server to look the charge up with
// Paystack directly and apply it -- so a deposit unlocks even if the webhook is late or
// isn't set up. Only the student who owns the charge's enrolment can trigger it, and it
// goes through the same idempotent handler as the webhook.
export async function verifyInstalmentPayment(reference: string, studentId: string): Promise<{ outcome: string }> {
  if (config.paystackSecretKey === "") {
    throw new ApiError(503, CARD_PAYMENTS_UNAVAILABLE_MESSAGE, { code: "CARD_PAYMENTS_UNAVAILABLE" });
  }
  const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${config.paystackSecretKey}` },
  });
  const body = (await res.json().catch(() => null)) as { status?: boolean; data?: Record<string, unknown> } | null;
  const data = body?.data;
  if (!res.ok || !body?.status || !data) {
    throw new ApiError(502, "We couldn't check this payment with Paystack yet. Please refresh in a minute.");
  }
  const { handlePaystackEvent, readInstalmentMetadata } = await import("./paystackWebhook.service");
  const meta = readInstalmentMetadata(data.metadata);
  const enrollment = meta ? await Enrollment.findByPk(meta.enrollmentId) : null;
  if (!meta || !enrollment || enrollment.studentId !== studentId) {
    throw ApiError.forbidden("This payment doesn't belong to your account");
  }
  if (data.status !== "success") return { outcome: String(data.status ?? "pending") };
  const outcome = await handlePaystackEvent({ event: "charge.success", data: data as never });
  return { outcome };
}
