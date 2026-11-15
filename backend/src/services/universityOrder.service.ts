import crypto from "crypto";
import { Transaction } from "sequelize";
import { config } from "../config";
import { COUNTRIES, CountryCode } from "../constants/countries";
import * as emails from "../emails";
import { OrderSummary } from "../emails/templates/corporateOrders";
import { CorporateClient, CorporateOrder, CorporateSeat, Course, sequelize } from "../models";
import { UniversityOrderItem } from "../models/corporateOrder.model";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";
import { generateJoinCode } from "./corporate.service";
import { FLUTTERWAVE_API, authHeaders, isFlutterwaveConfigured } from "./flutterwave.service";
import { getGroupDiscountTiers, money, quoteUniversityOrder } from "./universityPricing.service";

// University orders (2026-11-15). A university buys places for its students on one or
// more of the graduate courses, at the course fee in its country less the group discount
// (universityPricing.service). It works like the corporate order (corporateOrder.service):
//   - the server prices the order; the buyer pays on Flutterwave or asks for an invoice;
//   - the Flutterwave webhook (PLN-corp- refs) or an admin's "Mark paid & set up" calls
//     setUpUniversity, which creates the university (client_type "university") with its
//     student join link, or adds the places to the university it already has;
//   - the buyer is emailed the link; signing up with it makes them the university's
//     representative (manager login).
// A representative who is logged in can buy more places from /university: the order is
// tied to their university (client_id), so the places are added to it, at its agreed
// discount if Paleon set one.

// Same prefix as corporate orders, so the existing Flutterwave webhook route handles both.
const TX_PREFIX = "PLN-corp-";
const SIGN_UP_WINDOW_MONTHS = 12;

export interface UniversityOrderInput {
  organisation: string;
  contactName: string;
  contactEmail: string;
  phone?: string | null;
  country: CountryCode;
  items: { courseSlug: string; seats: number }[];
  payByInvoice?: boolean;
}

export type UniversityOrderResult =
  | { kind: "checkout"; paymentLink: string; txRef: string }
  | { kind: "invoice"; txRef: string };

function paymentOptions(country: CountryCode): string {
  if (country === "NG") return "card,banktransfer,ussd";
  return COUNTRIES[country].site.flutterwavePaymentOptions ?? "card";
}

function itemLine(country: CountryCode, item: UniversityOrderItem): string {
  return `${item.courseTitle}: ${item.seats} place${item.seats === 1 ? "" : "s"} at ${money(country, item.unitPrice)} each${
    item.discountPercent ? ` (${item.discountPercent}% group discount)` : ""
  }`;
}

export function universityProgrammeName(items: UniversityOrderItem[] | null): string {
  if (!items?.length) return "University places";
  return `University places: ${items.map((i) => `${i.courseTitle} ×${i.seats}`).join("; ")}`;
}

export function universitySummary(order: CorporateOrder): OrderSummary {
  const country = order.region as CountryCode;
  const items = order.items ?? [];
  return {
    txRef: order.txRef,
    organisation: order.organisation,
    contactName: order.contactName,
    contactEmail: order.contactEmail,
    phone: order.phone,
    buyerCountry: COUNTRIES[country]?.name ?? order.region,
    programmeName: universityProgrammeName(items),
    courseTitles: items.map((i) => i.courseTitle),
    seats: order.seats,
    unitPrice: money(country, Number(order.unitPrice)),
    total: money(country, Number(order.total)),
    discountPercent: order.discountPercent,
    itemLines: items.map((i) => itemLine(country, i)),
    university: true,
  };
}

export async function createUniversityOrder(
  input: UniversityOrderInput,
  topUpClient: CorporateClient | null = null,
): Promise<UniversityOrderResult> {
  const country = topUpClient ? (topUpClient.country as CountryCode) : input.country;
  const quote = quoteUniversityOrder(country, input.items, await getGroupDiscountTiers(), topUpClient?.discountPercent ?? null);
  const invoice = Boolean(input.payByInvoice);
  if (!invoice && !isFlutterwaveConfigured()) {
    throw new ApiError(503, 'Online payment isn\'t available right now. Tick "Send us an invoice", or email corporate@paleontraining.com.', {
      code: "CARD_PAYMENTS_UNAVAILABLE",
    });
  }
  const txRef = `${TX_PREFIX}${crypto.randomBytes(8).toString("hex")}`;
  const fields = {
    txRef,
    orderType: "university" as const,
    organisation: (topUpClient?.name ?? input.organisation).trim(),
    contactName: input.contactName.trim(),
    contactEmail: input.contactEmail.trim().toLowerCase(),
    phone: input.phone?.trim() || null,
    region: country,
    buyerCountry: null,
    programme: "university",
    seats: quote.seats,
    currency: quote.currency,
    // The order row keeps one unit price; the real per-course prices are in items.
    unitPrice: Math.round(quote.total / quote.seats),
    discountPercent: quote.discountPercent,
    total: quote.total,
    items: quote.lines,
    clientId: topUpClient?.id ?? null,
  };

  if (invoice) {
    const order = await CorporateOrder.create({ ...fields, status: "invoice_requested" });
    const info = universitySummary(order);
    await emails.sendCorporateInvoiceRequestEmail(info);
    await emails.sendCorporateOrderAdminEmail({ ...info, kind: "invoice", reason: "the buyer asked for an invoice" });
    return { kind: "invoice", txRef };
  }

  const origin = config.corsOrigin.replace(/\/$/, "");
  const res = await fetch(`${FLUTTERWAVE_API}/payments`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      tx_ref: txRef,
      amount: quote.total,
      currency: quote.currency,
      redirect_url: `${origin}/university-checkout/complete`,
      customer: { email: fields.contactEmail, name: fields.contactName, phonenumber: fields.phone ?? undefined },
      payment_options: paymentOptions(country),
      meta: { corporateOrder: txRef, university: true, seats: quote.seats },
      customizations: {
        title: "Paleon Training",
        description: `Student places: ${quote.seats} place${quote.seats === 1 ? "" : "s"}`,
        logo: `${origin}/favicon.svg`,
      },
    }),
  });
  const body = (await res.json().catch(() => null)) as { status?: string; message?: string; data?: { link?: string } } | null;
  const paymentLink = body?.data?.link;
  if (!res.ok || body?.status !== "success" || !paymentLink) {
    logger.error(`Flutterwave university checkout failed for ${txRef}: ${body?.message ?? `HTTP ${res.status}`}`);
    throw new ApiError(502, 'We couldn\'t open the payment page. Please try again, or tick "Send us an invoice".', {
      code: "FLUTTERWAVE_INIT_FAILED",
    });
  }
  await CorporateOrder.create({ ...fields, status: "pending" });
  return { kind: "checkout", paymentLink, txRef };
}

async function uniqueJoinCode(transaction: Transaction): Promise<string> {
  for (let i = 0; i < 5; i++) {
    const code = generateJoinCode();
    if (!(await CorporateClient.findOne({ where: { joinCode: code }, transaction }))) return code;
  }
  throw new Error("Could not generate a unique join code");
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

/**
 * Sets up a paid university order: the university and its join link (or the university it
 * already has: the order's client_id for a representative's top-up, otherwise one with the
 * same contact email), then adds the places on each course, open for sign-ups for 12 months.
 * Returns false if the order was already set up.
 */
export async function setUpUniversity(
  order: CorporateOrder,
  payment: { amount: number; paidVia: string; flutterwaveTransactionId?: string | null },
): Promise<boolean> {
  const country = order.region as CountryCode;
  const items = order.items ?? [];
  const paidAt = new Date();
  const closesAt = addMonths(paidAt, SIGN_UP_WINDOW_MONTHS);

  const result = await sequelize.transaction(async (transaction) => {
    const locked = await CorporateOrder.findByPk(order.id, { lock: transaction.LOCK.UPDATE, transaction });
    if (!locked || locked.status === "paid") return null;
    const courses = await Course.findAll({ where: { slug: items.map((i) => i.courseSlug) }, transaction });
    if (courses.length !== new Set(items.map((i) => i.courseSlug)).size) {
      throw new Error(`Graduate courses missing for university order ${order.txRef}`);
    }

    const note = `Bought ${paidAt.toISOString().slice(0, 10)}: ${items.map((i) => `${i.courseTitle} x${i.seats}`).join(", ")}, ${money(country, payment.amount)} ${payment.paidVia} (order ${order.txRef}).`;
    let client =
      (locked.clientId ? await CorporateClient.findByPk(locked.clientId, { transaction }) : null) ??
      (await CorporateClient.findOne({
        where: { clientType: "university", contactEmail: locked.contactEmail },
        order: [["createdAt", "ASC"]],
        transaction,
      }));
    const topUp = Boolean(client);
    if (client) {
      await client.update({ notes: [client.notes, note].filter(Boolean).join("\n") }, { transaction });
    } else {
      client = await CorporateClient.create(
        {
          name: locked.organisation,
          country,
          contactName: locked.contactName,
          contactEmail: locked.contactEmail,
          joinCode: await uniqueJoinCode(transaction),
          clientType: "university",
          representativeEmails: [locked.contactEmail],
          notes: [note, locked.phone ? `Phone: ${locked.phone}.` : ""].filter(Boolean).join(" "),
        },
        { transaction },
      );
    }

    for (const item of items) {
      const course = courses.find((c) => c.slug === item.courseSlug)!;
      const seat = await CorporateSeat.findOne({
        where: { clientId: client.id, courseId: course.id },
        lock: transaction.LOCK.UPDATE,
        transaction,
      });
      if (seat) {
        // More places: sign-ups stay open until the later of the two dates.
        const expiresAt = seat.expiresAt && seat.expiresAt < closesAt ? closesAt : seat.expiresAt;
        await seat.update({ seats: seat.seats + item.seats, expiresAt }, { transaction });
      } else {
        await CorporateSeat.create({ clientId: client.id, courseId: course.id, seats: item.seats, expiresAt: closesAt }, { transaction });
      }
    }
    await locked.update(
      { status: "paid", paidAt, clientId: client.id, flutterwaveTransactionId: payment.flutterwaveTransactionId ?? null },
      { transaction },
    );
    return { client, order: locked, topUp };
  });
  if (!result) return false;

  const info = universitySummary(result.order);
  const signUpsCloseOn = closesAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  await emails.sendCorporateOrderPaidEmail({ ...info, joinCode: result.client.joinCode, signUpsCloseOn, topUp: result.topUp });
  await emails.sendCorporateOrderAdminEmail({ ...info, kind: "paid", joinCode: result.client.joinCode });
  return true;
}
