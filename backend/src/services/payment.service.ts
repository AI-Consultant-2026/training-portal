import { Course, Enrollment, Payment } from "../models";
import { ApiError } from "../utils/ApiError";
import crypto from "crypto";
import { config } from "../config";
import { COURSE_PRICES_NGN, DEPOSIT_UNLOCKED_DAYS, INSTALMENT_DEPOSIT_NGN, getBalanceNgn } from "../constants/coursePricing";
import { getPaystackPaymentLink } from "../constants/paystackPaymentLinks";
import * as courseService from "./course.service";
import { enrollStudent, getEnrollmentForCourseAndStudent } from "./enrollment.service";
import * as userService from "./user.service";
import {
  balanceIn,
  CheckoutInfo,
  checkoutCountryFor,
  checkoutGateway,
  checkoutInfo,
  coursePriceIn,
  depositIn,
  paymentsEnabledIn,
  paystackCurrency,
  paystackSecretKey,
} from "./paystackAccounts";
import { initializeFlutterwaveCharge, verifyFlutterwaveCharge } from "./flutterwave.service";
import { CountryCode, isCountryCode } from "../constants/countries";

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
export async function ensureUnpaidEnrollment(courseId: string, studentId: string): Promise<Enrollment> {
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

// The amounts are in the student's checkout currency (`checkout`, 2026-10-30): Naira for
// Nigeria, and for anyone from a country that isn't live yet; cedis, shillings or rand for
// a live Ghana, Kenya or South Africa. The "Ngn" names date from when Naira was the only
// currency.
export interface Quote {
  checkout: CheckoutInfo;
  baseAmountNgn: number;
  card: {
    currency: string;
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

export async function getQuote(courseIdOrSlug: string, studentId: string): Promise<Quote> {
  const course = await courseService.getCourseByIdOrSlug(courseIdOrSlug);
  const student = await userService.getUserById(studentId);
  const country = checkoutCountryFor(student.country);
  if (country !== "NG") return getLocalQuote(course.slug, country);

  const baseAmountNgn = requirePriceNgn(course.slug);

  const balanceNgn = getBalanceNgn(course.slug);

  return {
    checkout: checkoutInfo("NG"),
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

// A live Ghana, Kenya or South Africa: the country's own prices, paid through Flutterwave.
function getLocalQuote(courseSlug: string, country: CountryCode): Quote {
  const price = coursePriceIn(country, courseSlug);
  if (price === undefined) throw ApiError.badRequest("This course does not have a price set yet");
  const deposit = depositIn(country);
  const balance = balanceIn(country, courseSlug);
  const checkout = checkoutInfo(country);
  const enabled = paymentsEnabledIn(country);
  return {
    checkout,
    baseAmountNgn: price,
    card: { currency: checkout.currency.code, amount: price, enabled },
    instalment:
      deposit === null || balance === null
        ? null
        : { depositNgn: deposit, balanceNgn: balance, unlockedDays: DEPOSIT_UNLOCKED_DAYS, enabled },
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
  const student = await userService.getUserById(input.studentId);
  const country = checkoutCountryFor(student.country);
  if (country !== "NG") return startLocalFullPayment(course, input.studentId, country);
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

// A live Ghana, Kenya or South Africa has no fixed-price payment pages: paying in full is
// an API checkout for the whole price, like a sponsor's full payment.
async function startLocalFullPayment(
  course: Course,
  studentId: string,
  country: CountryCode,
): Promise<{ paymentLink: string; payment: Payment; enrollment: Enrollment }> {
  if (!paymentsEnabledIn(country)) {
    throw new ApiError(503, CARD_PAYMENTS_UNAVAILABLE_MESSAGE, { code: "CARD_PAYMENTS_UNAVAILABLE" });
  }
  const price = coursePriceIn(country, course.slug);
  if (price === undefined) throw ApiError.badRequest("This course does not have a price set yet");
  const enrollment = await ensureUnpaidEnrollment(course.id, studentId);
  if (enrollment.depositPaidAt) {
    throw ApiError.conflict("Your deposit has already been paid -- pay the balance to unlock the rest of the course");
  }
  const origin = config.corsOrigin.replace(/\/$/, "");
  return openCheckout({
    enrollment,
    courseSlug: course.slug,
    kind: "full",
    amount: price,
    callbackUrl: `${origin}/courses/${course.slug}?payment=full`,
    cancelUrl: `${origin}/courses/${course.slug}/pay/card`,
  });
}

// --- Instalments (2026-10-11) ----------------------------------------------------------
// The deposit and the balance are charged through Paystack's transaction API rather than a
// fixed-price Payment Page, so the amount is set here and the charge carries the enrolment
// id back to the webhook in its metadata (see paystackWebhook.service.ts). Card details
// still only ever go to Paystack's own checkout page.

export type InstalmentKind = "deposit" | "balance";
// A sponsor (2026-10-12) can also pay the whole price in one API charge, since they can't
// use the student's fixed-price Payment Page link with the student's email.
export type ApiChargeKind = InstalmentKind | "full";

// A pending instalment charge is stored under this prefix until Paystack confirms it; the
// webhook then swaps it for "paystack:<reference>" (its idempotency key).
export const PAYSTACK_INIT_REFERENCE_PREFIX = "paystack-init:";
export const INSTALMENT_NOTES: Record<ApiChargeKind, string> = {
  deposit: "Instalment deposit",
  balance: "Instalment balance",
  full: "Full payment",
};

export async function startInstalmentPayment(input: {
  courseId: string;
  studentId: string;
  kind: InstalmentKind;
}): Promise<{ paymentLink: string; payment: Payment; enrollment: Enrollment }> {
  const student = await userService.getUserById(input.studentId);
  const country = checkoutCountryFor(student.country);
  if (!paymentsEnabledIn(country)) {
    throw new ApiError(503, CARD_PAYMENTS_UNAVAILABLE_MESSAGE, { code: "CARD_PAYMENTS_UNAVAILABLE" });
  }
  const course = await courseService.getCourseByIdOrSlug(input.courseId);
  const balance = balanceIn(country, course.slug);
  const deposit = depositIn(country);
  if (balance === null || deposit === null) {
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

  const amount = input.kind === "deposit" ? deposit : balance;
  const origin = config.corsOrigin.replace(/\/$/, "");
  return openCheckout({
    enrollment,
    courseSlug: course.slug,
    kind: input.kind,
    amount,
    callbackUrl: `${origin}/courses/${course.slug}?payment=${input.kind}`,
    cancelUrl: `${origin}/courses/${course.slug}/pay/card`,
  });
}

// Opens the checkout for one enrolment on the student's gateway: Paystack for Nigeria (and
// any country not live yet), Flutterwave for a live Ghana, Kenya or South Africa.
export async function openCheckout(input: {
  enrollment: Enrollment;
  courseSlug: string;
  kind: ApiChargeKind;
  amount: number;
  callbackUrl: string;
  cancelUrl: string;
}): Promise<{ paymentLink: string; payment: Payment; enrollment: Enrollment }> {
  const student = await userService.getUserById(input.enrollment.studentId);
  const country = checkoutCountryFor(student.country);
  if (checkoutGateway(country) === "flutterwave") {
    // Flutterwave returns to the callback URL whether the payer paid or cancelled.
    return initializeFlutterwaveCharge({ ...input, country });
  }
  return initializePaystackCharge(input);
}

// Opens a Paystack checkout for one enrolment, always charged to the enrolled student's
// email (so the webhook's email check passes even when someone else pays), and records the
// pending payment. The charge's metadata carries the enrolment id back to the webhook.
// `amount` is in the currency of the student's checkout country (checkoutCountryFor), whose
// Paystack account and currency the charge uses.
export async function initializePaystackCharge(input: {
  enrollment: Enrollment;
  courseSlug: string;
  kind: ApiChargeKind;
  amount: number;
  callbackUrl: string;
  cancelUrl: string;
}): Promise<{ paymentLink: string; payment: Payment; enrollment: Enrollment }> {
  const { enrollment, amount } = input;
  const student = await userService.getUserById(enrollment.studentId);
  const country = checkoutCountryFor(student.country);
  const currency = paystackCurrency(country);
  const reference = `PLN-${input.kind}-${crypto.randomBytes(8).toString("hex")}`;

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${paystackSecretKey(country)}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: student.email,
      // Paystack takes the smallest unit (kobo, pesewas, cents) for all four currencies.
      amount: amount * 100,
      currency,
      reference,
      callback_url: input.callbackUrl,
      metadata: {
        enrollmentId: enrollment.id,
        instalment: input.kind,
        courseSlug: input.courseSlug,
        cancel_action: input.cancelUrl,
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
    studentId: enrollment.studentId,
    method: "card",
    status: "pending",
    currency,
    amount,
    // Only a Naira charge has a Naira amount; there's no exchange rate to convert others.
    baseAmountNgn: currency === "NGN" ? amount : 0,
    billingCountry: country,
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
export async function verifyInstalmentPayment(reference: string, studentId: string): Promise<VerifiedCharge> {
  return verifyPaystackCharge(reference, (enrollment) => enrollment.studentId === studentId);
}

// Flutterwave's version (?transaction_id=... on the return URL).
export async function verifyFlutterwavePayment(transactionId: string, studentId: string): Promise<VerifiedCharge> {
  return verifyFlutterwaveCharge(transactionId, (enrollment) => enrollment.studentId === studentId);
}

// What the return-from-Paystack pages get back. `purchase` is set only when Paystack says
// the charge succeeded and it's been applied (now, or earlier by the webhook): the page uses
// it to report a "Purchase" to analytics (GA4 + the Meta Pixel) once per reference.
// valueNgn is in `currency` (cedis, shillings or rand for a Flutterwave charge).
export interface VerifiedCharge {
  outcome: string;
  purchase?: { valueNgn: number; currency: string; plan: ApiChargeKind; courseSlug: string | null };
}

const APPLIED_OUTCOMES = new Set(["confirmed", "already_paid", "duplicate"]);

// Looks a charge up with Paystack and applies it, if `owns` accepts the charge's enrolment.
export async function verifyPaystackCharge(
  reference: string,
  owns: (enrollment: Enrollment) => boolean,
): Promise<VerifiedCharge> {
  // The charge lives in the Paystack account it was opened with, recorded on its pending
  // payment; Nigeria's for anything older.
  const pending = await Payment.findOne({ where: { gatewayReference: PAYSTACK_INIT_REFERENCE_PREFIX + reference } });
  const country: CountryCode = pending && isCountryCode(pending.billingCountry) ? pending.billingCountry : "NG";
  const secretKey = paystackSecretKey(country);
  if (secretKey === "") {
    throw new ApiError(503, CARD_PAYMENTS_UNAVAILABLE_MESSAGE, { code: "CARD_PAYMENTS_UNAVAILABLE" });
  }
  const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secretKey}` },
  });
  const body = (await res.json().catch(() => null)) as { status?: boolean; data?: Record<string, unknown> } | null;
  const data = body?.data;
  if (!res.ok || !body?.status || !data) {
    throw new ApiError(502, "We couldn't check this payment with Paystack yet. Please refresh in a minute.");
  }
  const { handlePaystackEvent, readInstalmentMetadata } = await import("./paystackWebhook.service");
  const meta = readInstalmentMetadata(data.metadata);
  const enrollment = meta ? await Enrollment.findByPk(meta.enrollmentId) : null;
  if (!meta || !enrollment || !owns(enrollment)) {
    throw ApiError.forbidden("This payment doesn't belong to your account");
  }
  if (data.status !== "success") return { outcome: String(data.status ?? "pending") };
  const outcome = await handlePaystackEvent({ event: "charge.success", data: data as never }, country);
  if (!APPLIED_OUTCOMES.has(outcome)) return { outcome };
  const course = await Course.findByPk(enrollment.courseId);
  return {
    outcome,
    purchase: {
      valueNgn: Math.round(Number(data.amount) / 100),
      currency: paystackCurrency(country),
      plan: meta.instalment,
      courseSlug: course?.slug ?? null,
    },
  };
}
