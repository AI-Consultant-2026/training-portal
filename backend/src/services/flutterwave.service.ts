import crypto from "crypto";
import { config } from "../config";
import { CountryCode, COUNTRIES, isCountryCode } from "../constants/countries";
import * as emails from "../emails";
import { Course, Enrollment, Payment } from "../models";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";
import type { ApiChargeKind, VerifiedCharge } from "./payment.service";
import { CARD_PAYMENTS_UNAVAILABLE_MESSAGE, INSTALMENT_NOTES } from "./payment.service";
import { applyApiCharge, WebhookOutcome } from "./paystackWebhook.service";
import { moneyIn, paystackCurrency } from "./paystackAccounts";
import * as userService from "./user.service";

// Flutterwave checkout for Ghana, Kenya and South Africa (2026-10-30), in cedis, shillings
// and rand; Nigeria stays on Paystack. It works like the Paystack instalment checkout:
// the server opens a Flutterwave Standard checkout for a set amount (deposit, balance or
// full price), the student (or their sponsor) pays on Flutterwave's own page, so card and
// mobile money details never touch Paleon's servers, and the charge is applied when
// Flutterwave's webhook says it succeeded, or when the payer lands back on the site.
//
// Either way the charge is looked up with Flutterwave's verify API before anything is
// unlocked, so the webhook body itself is never trusted. Our tx_ref ties the charge to the
// pending payment recorded when the checkout opened, which names the enrolment.

const API = "https://api.flutterwave.com/v3";

// A pending charge is stored under this prefix until Flutterwave confirms it; it then
// becomes "flutterwave:<tx_ref>" (its idempotency key, so a repeated webhook is a no-op).
export const FLUTTERWAVE_INIT_REFERENCE_PREFIX = "flutterwave-init:";
export const FLUTTERWAVE_REFERENCE_PREFIX = "flutterwave:";

export function isFlutterwaveConfigured(): boolean {
  return config.flutterwave.secretKey !== "";
}

function authHeaders(): Record<string, string> {
  return { Authorization: `Bearer ${config.flutterwave.secretKey}`, "Content-Type": "application/json" };
}

// tx_refs look like PLN-deposit-<hex>, so the kind of charge is known from the reference.
function kindOf(txRef: string): ApiChargeKind | null {
  const match = /^PLN-(deposit|balance|full)-[0-9a-f]+$/.exec(txRef);
  return match ? (match[1] as ApiChargeKind) : null;
}

// Opens a Flutterwave checkout for one enrolment and records the pending payment. Same
// inputs and result as initializePaystackCharge, so the callers can use either.
export async function initializeFlutterwaveCharge(input: {
  enrollment: Enrollment;
  courseSlug: string;
  kind: ApiChargeKind;
  amount: number;
  country: CountryCode;
  callbackUrl: string;
}): Promise<{ paymentLink: string; payment: Payment; enrollment: Enrollment }> {
  const { enrollment, amount, country } = input;
  if (!isFlutterwaveConfigured()) {
    throw new ApiError(503, CARD_PAYMENTS_UNAVAILABLE_MESSAGE, { code: "CARD_PAYMENTS_UNAVAILABLE" });
  }
  const student = await userService.getUserById(enrollment.studentId);
  const currency = paystackCurrency(country);
  const txRef = `PLN-${input.kind}-${crypto.randomBytes(8).toString("hex")}`;
  const origin = config.corsOrigin.replace(/\/$/, "");

  const res = await fetch(`${API}/payments`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      tx_ref: txRef,
      // Flutterwave takes the main unit (cedis, shillings, rand), not cents.
      amount,
      currency,
      // Flutterwave adds status, tx_ref and transaction_id to this when the payer returns.
      redirect_url: input.callbackUrl,
      // Always the enrolled student's email, even when a sponsor pays, so the receipt and
      // the record match the student's account.
      customer: { email: student.email, name: `${student.firstName} ${student.lastName}`.trim() },
      payment_options: COUNTRIES[country].site.flutterwavePaymentOptions ?? "card",
      meta: { enrollmentId: enrollment.id, instalment: input.kind, courseSlug: input.courseSlug },
      customizations: {
        title: "Paleon Training",
        description: INSTALMENT_NOTES[input.kind],
        logo: `${origin}/favicon.svg`,
      },
    }),
  });
  const body = (await res.json().catch(() => null)) as
    | { status?: string; message?: string; data?: { link?: string } }
    | null;
  const paymentLink = body?.data?.link;
  if (!res.ok || body?.status !== "success" || !paymentLink) {
    throw new ApiError(502, "We couldn't open the payment page. Please try again in a moment.", {
      code: "FLUTTERWAVE_INIT_FAILED",
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
    // There's no exchange rate to give a Naira figure for cedis, shillings or rand.
    baseAmountNgn: 0,
    billingCountry: country,
    gatewayReference: FLUTTERWAVE_INIT_REFERENCE_PREFIX + txRef,
    notes: `${INSTALMENT_NOTES[input.kind]} (Flutterwave)`,
  });

  return { paymentLink, payment, enrollment };
}

interface FlutterwaveTransaction {
  id?: number;
  tx_ref?: string;
  status?: string;
  currency?: string;
  // The price we asked for; charged_amount can be higher if fees are passed on.
  amount?: number;
  customer?: { email?: string };
}

async function fetchTransaction(transactionId: string): Promise<FlutterwaveTransaction> {
  const res = await fetch(`${API}/transactions/${encodeURIComponent(transactionId)}/verify`, {
    headers: authHeaders(),
  });
  const body = (await res.json().catch(() => null)) as { status?: string; data?: FlutterwaveTransaction } | null;
  if (!res.ok || body?.status !== "success" || !body.data) {
    throw new ApiError(502, "We couldn't check this payment with Flutterwave yet. Please refresh in a minute.", {
      code: "FLUTTERWAVE_VERIFY_FAILED",
    });
  }
  return body.data;
}

interface ResolvedCharge {
  txRef: string;
  kind: ApiChargeKind;
  country: CountryCode;
  enrollment: Enrollment;
}

// Ties a verified Flutterwave transaction back to the pending payment our checkout made,
// whether it's still pending or has already been applied.
async function resolveCharge(tx: FlutterwaveTransaction): Promise<ResolvedCharge | null> {
  const txRef = tx.tx_ref ?? "";
  const kind = kindOf(txRef);
  if (!kind) return null;
  const payment = await Payment.findOne({
    where: { gatewayReference: [FLUTTERWAVE_INIT_REFERENCE_PREFIX + txRef, FLUTTERWAVE_REFERENCE_PREFIX + txRef] },
  });
  if (!payment || !isCountryCode(payment.billingCountry)) return null;
  const enrollment = await Enrollment.findByPk(payment.enrollmentId);
  if (!enrollment) return null;
  return { txRef, kind, country: payment.billingCountry, enrollment };
}

async function applyTransaction(tx: FlutterwaveTransaction, charge: ResolvedCharge): Promise<WebhookOutcome> {
  const { txRef, kind, country, enrollment } = charge;
  const currency = paystackCurrency(country);
  const amount = Number(tx.amount ?? 0);
  const gatewayReference = FLUTTERWAVE_REFERENCE_PREFIX + txRef;
  if (tx.status !== "successful" || tx.currency !== currency || !(amount > 0)) return "ignored";
  // Flutterwave retries the webhook, and the payer's return can arrive at the same time.
  if (await Payment.findOne({ where: { gatewayReference } })) return "duplicate";

  const unmatched = async (reason: string): Promise<WebhookOutcome> => {
    logger.warn(`Flutterwave payment ${txRef} not confirmed automatically: ${reason}`);
    await emails.sendPaystackUnmatchedEmail({
      gateway: "Flutterwave",
      reference: txRef,
      email: tx.customer?.email ?? "",
      amount: moneyIn(country, amount),
      reason,
    });
    return "unmatched";
  };

  return applyApiCharge(
    { enrollmentId: enrollment.id, instalment: kind },
    { email: null, amount, gatewayReference, pendingReference: FLUTTERWAVE_INIT_REFERENCE_PREFIX + txRef, country },
    unmatched,
  );
}

// Flutterwave sends the secret hash set in its dashboard in the verif-hash header.
export function isValidHash(header: string | undefined): boolean {
  const secret = config.flutterwave.secretHash;
  if (!secret || !header) return false;
  const given = Buffer.from(header, "utf8");
  const wanted = Buffer.from(secret, "utf8");
  return given.length === wanted.length && crypto.timingSafeEqual(given, wanted);
}

// POST /api/payments/flutterwave/webhook. Only the transaction id is read from the body:
// the transaction itself is fetched from Flutterwave.
export async function handleFlutterwaveEvent(event: {
  event?: string;
  data?: { id?: number | string };
}): Promise<WebhookOutcome> {
  if (event.event !== "charge.completed" || event.data?.id === undefined) return "ignored";
  const tx = await fetchTransaction(String(event.data.id));
  const charge = await resolveCharge(tx);
  if (!charge) {
    // Not one of the checkouts this site opened (e.g. a payment link made in the dashboard).
    logger.warn(`Flutterwave transaction ${event.data.id} (${tx.tx_ref ?? "no tx_ref"}) isn't a Paleon checkout`);
    return "ignored";
  }
  return applyTransaction(tx, charge);
}

const APPLIED_OUTCOMES = new Set(["confirmed", "already_paid", "duplicate"]);

// Backup for the webhook when the payer lands back on the site (?transaction_id=...).
// `owns` decides whether the person asking may apply this charge's enrolment.
export async function verifyFlutterwaveCharge(
  transactionId: string,
  owns: (enrollment: Enrollment) => boolean,
): Promise<VerifiedCharge> {
  if (!isFlutterwaveConfigured()) {
    throw new ApiError(503, CARD_PAYMENTS_UNAVAILABLE_MESSAGE, { code: "CARD_PAYMENTS_UNAVAILABLE" });
  }
  const tx = await fetchTransaction(transactionId);
  const charge = await resolveCharge(tx);
  if (!charge || !owns(charge.enrollment)) {
    throw ApiError.forbidden("This payment doesn't belong to your account");
  }
  if (tx.status !== "successful") return { outcome: String(tx.status ?? "pending") };
  const outcome = await applyTransaction(tx, charge);
  if (!APPLIED_OUTCOMES.has(outcome)) return { outcome };
  const course = await Course.findByPk(charge.enrollment.courseId);
  return {
    outcome,
    purchase: {
      // In the charge's own currency, despite the name (see VerifiedCharge).
      valueNgn: Number(tx.amount),
      currency: paystackCurrency(charge.country),
      plan: charge.kind,
      courseSlug: course?.slug ?? null,
    },
  };
}
