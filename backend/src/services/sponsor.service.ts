import crypto from "crypto";
import { config } from "../config";
import { COURSE_PRICES_NGN, DEPOSIT_UNLOCKED_DAYS, INSTALMENT_DEPOSIT_NGN, getBalanceNgn } from "../constants/coursePricing";
import { Course, Enrollment, Payment, User } from "../models";
import { ApiError } from "../utils/ApiError";
import * as courseService from "./course.service";
import { balanceIn, checkoutCountryFor, coursePriceIn, depositIn, paystackSecretKey } from "./paystackAccounts";
import {
  ApiChargeKind,
  CARD_PAYMENTS_UNAVAILABLE_MESSAGE,
  ensureUnpaidEnrollment,
  initializePaystackCharge,
  VerifiedCharge,
  verifyPaystackCharge,
} from "./payment.service";

// "Ask a sponsor to pay" (2026-10-12): many students are paid for by a parent or relative,
// who can't pay on the student's Paystack page without knowing which email to type. The
// student gets a link to a public page, /sponsor/<token>, where anyone can pay the deposit,
// the balance or the full price by card. The charge is always made out to the student's own
// account email and carries the enrolment id, so the webhook confirms it as usual.
//
// The token is the enrolment id plus an HMAC of it -- no email or name in the URL -- and the
// page shows only the student's first name and the course.

function sign(enrollmentId: string): string {
  return crypto
    .createHmac("sha256", config.jwt.accessSecret)
    .update(`sponsor:${enrollmentId}`)
    .digest("base64url")
    .slice(0, 24);
}

export function sponsorToken(enrollmentId: string): string {
  return `${enrollmentId}.${sign(enrollmentId)}`;
}

export function sponsorUrl(enrollmentId: string): string {
  return `${config.corsOrigin.replace(/\/$/, "")}/sponsor/${sponsorToken(enrollmentId)}`;
}

function enrollmentIdFromToken(token: string): string | null {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const enrollmentId = token.slice(0, dot);
  const expected = Buffer.from(sign(enrollmentId));
  const given = Buffer.from(token.slice(dot + 1));
  return given.length === expected.length && crypto.timingSafeEqual(given, expected) ? enrollmentId : null;
}

async function loadSponsoredEnrollment(token: string): Promise<{ enrollment: Enrollment; course: Course; student: User }> {
  const enrollmentId = enrollmentIdFromToken(token);
  const enrollment = enrollmentId
    ? await Enrollment.findByPk(enrollmentId, { include: [{ model: Course, as: "course" }] }).catch(() => null)
    : null;
  const course = enrollment ? (enrollment as Enrollment & { course?: Course }).course : undefined;
  const student = enrollment ? await User.findByPk(enrollment.studentId) : null;
  if (!enrollment || !course || !student) throw ApiError.notFound("This payment link isn't valid");
  return { enrollment, course, student };
}

// The student asks for their link from the payment page. Like starting a payment, this
// enrols them if they aren't yet (same verified-email rule).
export async function createSponsorLink(courseId: string, studentId: string): Promise<{ url: string }> {
  const course = await courseService.getCourseByIdOrSlug(courseId);
  if (COURSE_PRICES_NGN[course.slug] === undefined) {
    throw ApiError.badRequest("This course does not have a price set yet");
  }
  const enrollment = await ensureUnpaidEnrollment(course.id, studentId);
  return { url: sponsorUrl(enrollment.id) };
}

export interface SponsorPageInfo {
  studentFirstName: string;
  courseTitle: string;
  courseSlug: string;
  status: "unpaid" | "deposit_paid" | "paid";
  priceNgn: number;
  depositNgn: number | null;
  balanceNgn: number | null;
  unlockedDays: number;
  paymentsEnabled: boolean;
}

export async function getSponsorPage(token: string): Promise<SponsorPageInfo> {
  const { enrollment, course, student } = await loadSponsoredEnrollment(token);
  const priceNgn = COURSE_PRICES_NGN[course.slug];
  if (priceNgn === undefined) throw ApiError.notFound("This payment link isn't valid");
  const balanceNgn = getBalanceNgn(course.slug);
  return {
    studentFirstName: student.firstName,
    courseTitle: course.title,
    courseSlug: course.slug,
    status: enrollment.paymentConfirmed ? "paid" : enrollment.depositPaidAt ? "deposit_paid" : "unpaid",
    priceNgn,
    depositNgn: balanceNgn === null ? null : INSTALMENT_DEPOSIT_NGN,
    balanceNgn,
    unlockedDays: DEPOSIT_UNLOCKED_DAYS,
    paymentsEnabled: paystackSecretKey(checkoutCountryFor(student.country)) !== "",
  };
}

export async function startSponsorPayment(
  token: string,
  kind: ApiChargeKind,
): Promise<{ paymentLink: string; payment: Payment; enrollment: Enrollment }> {
  const { enrollment, course, student } = await loadSponsoredEnrollment(token);
  // The sponsor pays through the student's checkout account (see paystackAccounts.ts).
  const country = checkoutCountryFor(student.country);
  if (paystackSecretKey(country) === "") {
    throw new ApiError(503, CARD_PAYMENTS_UNAVAILABLE_MESSAGE, { code: "CARD_PAYMENTS_UNAVAILABLE" });
  }
  if (enrollment.paymentConfirmed) throw ApiError.conflict("This course has already been paid for");

  const price = coursePriceIn(country, course.slug);
  const balance = balanceIn(country, course.slug);
  const deposit = depositIn(country);
  let amount: number;
  if (kind === "full") {
    if (price === undefined) throw ApiError.badRequest("This course does not have a price set yet");
    if (enrollment.depositPaidAt) throw ApiError.conflict("The deposit is already paid -- pay the balance instead");
    amount = price;
  } else if (balance === null || deposit === null) {
    throw ApiError.badRequest("This course can't be paid in instalments");
  } else if (kind === "deposit") {
    if (enrollment.depositPaidAt) throw ApiError.conflict("The deposit has already been paid");
    amount = deposit;
  } else {
    if (!enrollment.depositPaidAt) throw ApiError.badRequest("Pay the deposit first");
    amount = balance;
  }

  const pageUrl = sponsorUrl(enrollment.id);
  return initializePaystackCharge({
    enrollment,
    courseSlug: course.slug,
    kind,
    amount,
    callbackUrl: `${pageUrl}?paid=${kind}`,
    cancelUrl: pageUrl,
  });
}

// Backup for the webhook when the sponsor lands back on the page from Paystack.
export async function verifySponsorPayment(token: string, reference: string): Promise<VerifiedCharge> {
  const { enrollment } = await loadSponsoredEnrollment(token);
  return verifyPaystackCharge(reference, (charged) => charged.id === enrollment.id);
}
