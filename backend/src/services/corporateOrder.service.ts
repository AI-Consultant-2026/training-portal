import crypto from "crypto";
import { config } from "../config";
import {
  INVOICE_FROM_SEATS,
  OrderProgramme,
  PriceRegion,
  PROGRAMME_COURSE_SLUGS,
  formatRegionMoney,
  orderProgrammeName,
  programmesOf,
  quoteCorporateOrder,
} from "../constants/corporatePricing";
import { COUNTRIES } from "../constants/countries";
import * as emails from "../emails";
import { OrderSummary } from "../emails/templates/corporateOrders";
import { CorporateClient, CorporateOrder, CorporateSeat, Course, sequelize } from "../models";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";
import { generateJoinCode } from "./corporate.service";
import {
  FLUTTERWAVE_API,
  FlutterwaveTransaction,
  authHeaders,
  fetchTransaction,
  isFlutterwaveConfigured,
} from "./flutterwave.service";

// Corporate online orders (2026-11-12). A company buys learner places on a corporate page:
//   1. The server prices the order from constants/corporatePricing.ts (never from the
//      browser), in the buyer's currency: NGN, GHS, KES, ZAR, or GBP outside those four.
//   2. 200+ learners, or a buyer who asks for one, gets an invoice: the order is saved as
//      invoice_requested and corporate@ is emailed to send it.
//   3. Otherwise Flutterwave's hosted checkout opens; card and bank details never touch
//      Paleon's servers.
//   4. When Flutterwave's webhook (or the buyer's return to the site) reports the payment,
//      the transaction is re-fetched from Flutterwave and checked (status, currency,
//      amount). The company is then set up automatically: a corporate client with a join
//      code, and seats on each course, open for sign-ups for 12 months. The buyer is emailed
//      the staff link; the first time they sign up with it, they become the manager.
//
// tx_refs are PLN-corp-<hex>; the graduate-course checkout uses PLN-deposit/balance/full.

export const CORPORATE_TX_PREFIX = "PLN-corp-";
const SIGN_UP_WINDOW_MONTHS = 12;

export function isCorporateTxRef(txRef: unknown): boolean {
  return typeof txRef === "string" && txRef.startsWith(CORPORATE_TX_PREFIX);
}

export interface CorporateOrderInput {
  organisation: string;
  contactName: string;
  contactEmail: string;
  phone?: string | null;
  region: PriceRegion;
  buyerCountry?: string | null;
  programme: OrderProgramme;
  seats: number;
  payByInvoice?: boolean;
}

export type CorporateOrderResult =
  | { kind: "checkout"; paymentLink: string; txRef: string }
  | { kind: "invoice"; txRef: string; reason: string };

function paymentOptions(region: PriceRegion): string {
  if (region === "NG") return "card,banktransfer,ussd";
  if (region === "INTL") return "card";
  return COUNTRIES[region].site.flutterwavePaymentOptions ?? "card";
}

async function courseTitles(programme: OrderProgramme): Promise<string[]> {
  const courses = await Course.findAll({
    where: { slug: programmesOf(programme).map((p) => PROGRAMME_COURSE_SLUGS[p]) },
  });
  return programmesOf(programme)
    .map((p) => courses.find((c) => c.slug === PROGRAMME_COURSE_SLUGS[p])?.title)
    .filter((t): t is string => Boolean(t));
}

function summary(order: CorporateOrder, titles: string[]): OrderSummary {
  const region = order.region as PriceRegion;
  return {
    txRef: order.txRef,
    organisation: order.organisation,
    contactName: order.contactName,
    contactEmail: order.contactEmail,
    phone: order.phone,
    buyerCountry: order.region === "INTL" ? order.buyerCountry : COUNTRIES[region as Exclude<PriceRegion, "INTL">].name,
    programmeName: orderProgrammeName(order.programme as OrderProgramme),
    courseTitles: titles,
    seats: order.seats,
    unitPrice: formatRegionMoney(region, Number(order.unitPrice)),
    total: formatRegionMoney(region, Number(order.total)),
    discountPercent: order.discountPercent,
  };
}

export async function createCorporateOrder(input: CorporateOrderInput): Promise<CorporateOrderResult> {
  const quote = quoteCorporateOrder(input.region, input.programme, input.seats);
  const invoice = quote.invoiceOnly || Boolean(input.payByInvoice);
  if (!invoice && !isFlutterwaveConfigured()) {
    throw new ApiError(503, "Online payment isn't available right now. Tick \"Send us an invoice instead\", or email corporate@paleontraining.com.", {
      code: "CARD_PAYMENTS_UNAVAILABLE",
    });
  }
  const txRef = `${CORPORATE_TX_PREFIX}${crypto.randomBytes(8).toString("hex")}`;
  const fields = {
    txRef,
    organisation: input.organisation.trim(),
    contactName: input.contactName.trim(),
    contactEmail: input.contactEmail.trim().toLowerCase(),
    phone: input.phone?.trim() || null,
    region: input.region,
    buyerCountry: input.region === "INTL" ? input.buyerCountry?.trim() || null : null,
    programme: input.programme,
    seats: input.seats,
    currency: quote.currency,
    unitPrice: quote.unitPrice,
    discountPercent: quote.discountPercent,
    total: quote.total,
  };

  if (invoice) {
    const order = await CorporateOrder.create({ ...fields, status: "invoice_requested" });
    const reason = quote.invoiceOnly ? `${INVOICE_FROM_SEATS}+ learners are invoiced` : "the buyer asked for an invoice";
    const info = summary(order, await courseTitles(input.programme));
    await emails.sendCorporateInvoiceRequestEmail(info);
    await emails.sendCorporateOrderAdminEmail({ ...info, kind: "invoice", reason });
    return { kind: "invoice", txRef, reason };
  }

  const origin = config.corsOrigin.replace(/\/$/, "");
  const res = await fetch(`${FLUTTERWAVE_API}/payments`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      tx_ref: txRef,
      amount: quote.total,
      currency: quote.currency,
      redirect_url: `${origin}/corporate-checkout/complete`,
      customer: { email: fields.contactEmail, name: fields.contactName, phonenumber: fields.phone ?? undefined },
      payment_options: paymentOptions(input.region),
      meta: { corporateOrder: txRef, programme: input.programme, seats: input.seats },
      customizations: {
        title: "Paleon Training",
        description: `${orderProgrammeName(input.programme)}: ${input.seats} learner place${input.seats === 1 ? "" : "s"}`,
        logo: `${origin}/favicon.svg`,
      },
    }),
  });
  const body = (await res.json().catch(() => null)) as { status?: string; message?: string; data?: { link?: string } } | null;
  const paymentLink = body?.data?.link;
  if (!res.ok || body?.status !== "success" || !paymentLink) {
    logger.error(`Flutterwave corporate checkout failed for ${txRef}: ${body?.message ?? `HTTP ${res.status}`}`);
    throw new ApiError(502, "We couldn't open the payment page. Please try again, or tick \"Send us an invoice instead\".", {
      code: "FLUTTERWAVE_INIT_FAILED",
    });
  }
  await CorporateOrder.create({ ...fields, status: "pending" });
  return { kind: "checkout", paymentLink, txRef };
}

export type CorporateOutcome = "paid" | "duplicate" | "ignored" | "unmatched";

async function uniqueJoinCode(): Promise<string> {
  for (let i = 0; i < 5; i++) {
    const code = generateJoinCode();
    if (!(await CorporateClient.findOne({ where: { joinCode: code } }))) return code;
  }
  throw new Error("Could not generate a unique join code");
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

// Applies a transaction already fetched from Flutterwave's verify API. Safe to call more
// than once for the same payment (webhook retries, the buyer's return): only the first
// call sets the company up.
export async function applyCorporateTransaction(tx: FlutterwaveTransaction): Promise<CorporateOutcome> {
  const txRef = tx.tx_ref ?? "";
  if (!isCorporateTxRef(txRef)) return "ignored";
  const order = await CorporateOrder.findOne({ where: { txRef } });
  if (!order || order.status === "invoice_requested") return "ignored";
  if (order.status === "paid") return "duplicate";
  if (tx.status !== "successful") return "ignored";

  const region = order.region as PriceRegion;
  const amount = Number(tx.amount ?? 0);
  if (tx.currency !== order.currency || amount + 0.001 < Number(order.total)) {
    const reason = `paid ${tx.currency} ${amount}, order is ${order.currency} ${order.total}`;
    logger.warn(`Corporate order ${txRef} not set up automatically: ${reason}`);
    await emails.sendPaystackUnmatchedEmail({
      gateway: "Flutterwave",
      reference: txRef,
      email: order.contactEmail,
      amount: formatRegionMoney(region, amount),
      reason: `corporate order for ${order.organisation}: ${reason}`,
    });
    return "unmatched";
  }

  const programme = order.programme as OrderProgramme;
  const slugs = programmesOf(programme).map((p) => PROGRAMME_COURSE_SLUGS[p]);
  const paidAt = new Date();
  const closesAt = addMonths(paidAt, SIGN_UP_WINDOW_MONTHS);
  const joinCode = await uniqueJoinCode();

  const result = await sequelize.transaction(async (transaction) => {
    // Lock the order so a webhook and the buyer's return arriving together can't both set it up.
    const locked = await CorporateOrder.findByPk(order.id, { lock: transaction.LOCK.UPDATE, transaction });
    if (!locked || locked.status === "paid") return null;
    const courses = await Course.findAll({ where: { slug: slugs }, transaction });
    if (courses.length !== slugs.length) throw new Error(`Corporate courses missing for order ${txRef}`);

    const money = formatRegionMoney(region, amount);
    const client = await CorporateClient.create(
      {
        name: order.organisation,
        // Staff accounts take the company's country; buyers outside the four countries
        // are recorded under Nigeria (the portal's home market) with their real country noted.
        country: region === "INTL" ? "NG" : region,
        contactName: order.contactName,
        contactEmail: order.contactEmail,
        joinCode,
        notes: [
          `Bought online ${paidAt.toISOString().slice(0, 10)}: ${orderProgrammeName(programme)}, ${order.seats} learners, ${money} paid on Flutterwave (order ${txRef}, transaction ${tx.id ?? "?"}).`,
          order.phone ? `Phone: ${order.phone}.` : "",
          region === "INTL" ? `Based in ${order.buyerCountry ?? "another country"}; paid in GBP.` : "",
        ]
          .filter(Boolean)
          .join(" "),
      },
      { transaction },
    );
    for (const course of courses) {
      await CorporateSeat.create({ clientId: client.id, courseId: course.id, seats: order.seats, expiresAt: closesAt }, { transaction });
    }
    await locked.update(
      { status: "paid", paidAt, clientId: client.id, flutterwaveTransactionId: tx.id !== undefined ? String(tx.id) : null },
      { transaction },
    );
    return { client, titles: slugs.map((s) => courses.find((c) => c.slug === s)!.title), order: locked };
  });
  if (!result) return "duplicate";

  const info = summary(result.order, result.titles);
  const signUpsCloseOn = closesAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  await emails.sendCorporateOrderPaidEmail({ ...info, joinCode: result.client.joinCode, signUpsCloseOn });
  await emails.sendCorporateOrderAdminEmail({ ...info, kind: "paid", joinCode: result.client.joinCode });
  return "paid";
}

// Webhook: only the transaction id is taken from the body; the transaction is fetched.
export async function handleCorporateWebhook(event: { event?: string; data?: { id?: number | string } }): Promise<CorporateOutcome> {
  if (event.event !== "charge.completed" || event.data?.id === undefined) return "ignored";
  return applyCorporateTransaction(await fetchTransaction(String(event.data.id)));
}

export type ReturnStatus = "paid" | "processing" | "cancelled" | "failed" | "unknown";

// The buyer lands on /corporate-checkout/complete?status=...&tx_ref=...&transaction_id=...
// A backup for the webhook: the payment is checked with Flutterwave before anything happens.
export async function handleCheckoutReturn(query: {
  status?: unknown;
  tx_ref?: unknown;
  transaction_id?: unknown;
}): Promise<{ status: ReturnStatus; email?: string; organisation?: string }> {
  const txRef = typeof query.tx_ref === "string" ? query.tx_ref : "";
  if (!isCorporateTxRef(txRef)) return { status: "unknown" };
  const order = await CorporateOrder.findOne({ where: { txRef } });
  if (!order) return { status: "unknown" };
  const who = { email: order.contactEmail, organisation: order.organisation };
  if (order.status === "paid") return { status: "paid", ...who };
  if (query.status === "cancelled") return { status: "cancelled", ...who };
  const transactionId = typeof query.transaction_id === "string" ? query.transaction_id : "";
  if (!/^\d+$/.test(transactionId)) return { status: "processing", ...who };
  try {
    const tx = await fetchTransaction(transactionId);
    if (tx.tx_ref !== txRef) return { status: "unknown" };
    if (tx.status === "failed") return { status: "failed", ...who };
    const outcome = await applyCorporateTransaction(tx);
    return { status: outcome === "paid" || outcome === "duplicate" ? "paid" : "processing", ...who };
  } catch (err) {
    logger.warn(`Corporate checkout return for ${txRef} not verified yet`, err);
    return { status: "processing", ...who };
  }
}
