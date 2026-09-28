import crypto from "crypto";
import { fn, col, where as sqlWhere } from "sequelize";
import { config } from "../config";
import { COURSE_PRICES_NGN } from "../constants/coursePricing";
import * as emails from "../emails";
import { Course, Enrollment, Payment, User } from "../models";
import { logger } from "../utils/logger";
import { setPaymentConfirmed } from "./admin.service";

// Automatic payment confirmation from Paystack (2026-09-28). Students pay on a Paystack
// Payment Page (see paystackPaymentLinks.ts), which can't carry our enrolment id, so a
// charge.success event is matched by the payer's email (their Paleon account) plus the
// amount (the course price). Anything that doesn't match exactly one unpaid enrolment is
// left for the team to confirm by hand, with an email so it isn't missed.

export const PAYSTACK_REFERENCE_PREFIX = "paystack:";

export function isPaystackConfigured(): boolean {
  return config.paystackSecretKey !== "";
}

// Paystack signs the raw request body with HMAC-SHA512 using the account's secret key and
// sends the hex digest in the x-paystack-signature header.
export function isValidSignature(rawBody: Buffer, signature: string | undefined): boolean {
  if (!signature || !isPaystackConfigured()) return false;
  const expected = crypto.createHmac("sha512", config.paystackSecretKey).update(rawBody).digest("hex");
  const given = Buffer.from(signature, "utf8");
  const wanted = Buffer.from(expected, "utf8");
  return given.length === wanted.length && crypto.timingSafeEqual(given, wanted);
}

interface PaystackChargeData {
  reference?: string;
  status?: string;
  currency?: string;
  // Both in kobo. requested_amount is the price before any fees passed on to the customer.
  amount?: number;
  requested_amount?: number;
  customer?: { email?: string };
}

export type WebhookOutcome = "ignored" | "duplicate" | "confirmed" | "already_paid" | "unmatched";

export async function handlePaystackEvent(event: { event?: string; data?: PaystackChargeData }): Promise<WebhookOutcome> {
  const data = event.data ?? {};
  if (event.event !== "charge.success" || data.status !== "success" || data.currency !== "NGN") {
    return "ignored";
  }
  const reference = data.reference ?? "";
  const email = (data.customer?.email ?? "").trim();
  const amountNgn = Math.round((data.requested_amount ?? data.amount ?? 0) / 100);
  if (!reference || !email || amountNgn <= 0) return "ignored";

  // Paystack retries a webhook until it gets a 200, so the same charge can arrive twice.
  const gatewayReference = PAYSTACK_REFERENCE_PREFIX + reference;
  if (await Payment.findOne({ where: { gatewayReference } })) return "duplicate";

  const unmatched = async (reason: string): Promise<WebhookOutcome> => {
    logger.warn(`Paystack payment ${reference} not confirmed automatically: ${reason}`);
    await emails.sendPaystackUnmatchedEmail({ reference, email, amountNgn, reason });
    return "unmatched";
  };

  const student = await User.findOne({
    where: [sqlWhere(fn("lower", col("email")), email.toLowerCase()), { role: "student" }],
  });
  if (!student) return unmatched("no student account uses this email");

  const enrollments = await Enrollment.findAll({
    where: { studentId: student.id },
    include: [{ model: Course, as: "course" }],
  });
  const priceOf = (e: Enrollment) => {
    const course = (e as Enrollment & { course?: Course }).course;
    return course ? COURSE_PRICES_NGN[course.slug] : undefined;
  };
  const priced = enrollments.filter((e) => priceOf(e) === amountNgn);
  const unpaid = priced.filter((e) => !e.paymentConfirmed);

  if (unpaid.length === 0) {
    if (priced.length > 0) {
      // Their course at this price is already confirmed (e.g. an admin ticked it before the
      // webhook arrived). Record the charge against it so a retry is a no-op.
      await recordSucceededPayment(priced[0], amountNgn, gatewayReference);
      return "already_paid";
    }
    return unmatched(`no unpaid course at ₦${amountNgn.toLocaleString("en-NG")} on this account`);
  }
  if (unpaid.length > 1) {
    return unmatched("more than one unpaid course on this account has this price");
  }

  const enrollment = unpaid[0];
  await recordSucceededPayment(enrollment, amountNgn, gatewayReference);
  // Same path as the admin's "Paid" checkbox: unlocks lessons, credits any referral and
  // emails the student.
  await setPaymentConfirmed(enrollment.id, true);
  return "confirmed";
}

// Turns the pending payment made when the student clicked Pay into a succeeded one, or
// records a new one if there isn't one (e.g. they reached the Paystack page another way).
async function recordSucceededPayment(enrollment: Enrollment, amountNgn: number, gatewayReference: string) {
  const pending = await Payment.findOne({
    where: { enrollmentId: enrollment.id, method: "card", status: "pending" },
  });
  if (pending) {
    await pending.update({ status: "succeeded", amount: amountNgn, gatewayReference });
    return;
  }
  await Payment.create({
    enrollmentId: enrollment.id,
    studentId: enrollment.studentId,
    method: "card",
    status: "succeeded",
    currency: "NGN",
    amount: amountNgn,
    baseAmountNgn: amountNgn,
    billingCountry: "",
    gatewayReference,
  });
}
