import { CountryCode, isCountryCode } from "./countries";

// Corporate prices (2026-11-12, owner request). These are for the ONLINE SELF-PACED version
// of each programme in the Paleon portal (company seats; staff join with the company's
// code), per learner, 12 months' access. Since 2026-11-13 this is the ONLY delivery: online
// and in-house (private to the client's staff); never live, facilitator-led or hybrid. Market-adjusted, not straight exchange-rate conversions.
// Every price on the corporate pages, in the cost FAQs and at the corporate checkout
// comes from this file, so the checkout can never charge a different price than the page.

export type PricedProgramme = "cybersecure" | "ai-workflow" | "accelerator";
/** What a company can buy: one programme, or all three for each learner. */
export type OrderProgramme = PricedProgramme | "all-three";
/** The four countries, or INTL: anywhere else, paid in pounds. */
export type PriceRegion = CountryCode | "INTL";

export const PRICED_PROGRAMMES: readonly PricedProgramme[] = ["cybersecure", "ai-workflow", "accelerator"];
export const ORDER_PROGRAMMES: readonly OrderProgramme[] = [...PRICED_PROGRAMMES, "all-three"];
export const PRICE_REGIONS: readonly PriceRegion[] = ["NG", "GH", "KE", "ZA", "INTL"];

export const PROGRAMME_NAMES: Record<PricedProgramme, string> = {
  cybersecure: "CyberSecure Workforce",
  "ai-workflow": "AI Workflow Productivity & Process Transformation",
  accelerator: "AI + Cybersecurity Professional Accelerator",
};

/** The corporate course each programme gives access to (courses.slug). */
export const PROGRAMME_COURSE_SLUGS: Record<PricedProgramme, string> = {
  cybersecure: "cybersecure-workforce-essentials",
  "ai-workflow": "ai-workflow-productivity",
  accelerator: "ai-cybersecurity-professional-accelerator",
};

export const CORPORATE_PRICES: Record<PricedProgramme, Record<PriceRegion, number>> = {
  cybersecure: { NG: 55000, GH: 650, KE: 7500, ZA: 1000, INTL: 45 },
  "ai-workflow": { NG: 120000, GH: 1400, KE: 15500, ZA: 2100, INTL: 95 },
  accelerator: { NG: 250000, GH: 2900, KE: 32500, ZA: 4300, INTL: 195 },
};

export const REGION_CURRENCY: Record<PriceRegion, string> = { NG: "NGN", GH: "GHS", KE: "KES", ZA: "ZAR", INTL: "GBP" };

/** Volume discounts, by number of learners on one order. */
export const VOLUME_TIERS: { min: number; max: number | null; discount: number }[] = [
  { min: 1, max: 9, discount: 0 },
  { min: 10, max: 49, discount: 0.1 },
  { min: 50, max: 199, discount: 0.2 },
  { min: 200, max: null, discount: 0.3 },
];

/** All three programmes for the same person. */
export const BUNDLE_DISCOUNT = 0.15;

// Invoice on every order (owner, 2026-11-13): any order size can pay online or tick
// "Send us an invoice"; there is no longer an invoice-only threshold (it was 200+ learners).
// The online methods match what each Flutterwave checkout offers (corporateOrder.service
// paymentOptions: NG card,banktransfer,ussd; GH card,mobilemoneyghana; KE card,mpesa; ZA and
// pounds card only).
export const PAYMENT_METHODS: Record<PriceRegion, string> = {
  NG: "card, bank transfer or USSD",
  GH: "card or mobile money",
  KE: "card or M-Pesa",
  ZA: "card",
  INTL: "card",
};

export function invoiceSentence(region: PriceRegion): string {
  return `Invoice available on every order. Pay online by ${PAYMENT_METHODS[region]}, or tick “Send us an invoice” and we’ll email one within one working day.`;
}

export const INVOICE_FAQ = {
  q: "Can we pay by invoice?",
  a: "Yes, for any order size. Training is set up once payment is received.",
};
export const MAX_ORDER_SEATS = 10000;

export function volumeDiscount(seats: number): number {
  return ([...VOLUME_TIERS].reverse().find((t) => seats >= t.min) ?? VOLUME_TIERS[0]).discount;
}

// Pounds are priced to the pound, the other currencies to the nearest 10.
function roundDown(region: PriceRegion, amount: number): number {
  const step = region === "INTL" ? 1 : 10;
  return Math.floor(amount / step + 1e-9) * step;
}

/** One programme's price per learner at a volume tier. */
export function seatPrice(programme: PricedProgramme, region: PriceRegion, seats: number): number {
  return Math.round(CORPORATE_PRICES[programme][region] * (1 - volumeDiscount(seats)));
}

/** All three programmes per learner: 15% off, or the volume discount if that saves more. */
export function bundlePrice(region: PriceRegion, seats = 1): number {
  const full = PRICED_PROGRAMMES.reduce((sum, p) => sum + CORPORATE_PRICES[p][region], 0);
  return roundDown(region, full * (1 - Math.max(BUNDLE_DISCOUNT, volumeDiscount(seats))));
}

export interface CorporateQuote {
  region: PriceRegion;
  currency: string;
  programme: OrderProgramme;
  seats: number;
  listUnitPrice: number;
  unitPrice: number;
  discountPercent: number;
  total: number;
}

export function quoteCorporateOrder(region: PriceRegion, programme: OrderProgramme, seats: number): CorporateQuote {
  const listUnitPrice =
    programme === "all-three"
      ? PRICED_PROGRAMMES.reduce((sum, p) => sum + CORPORATE_PRICES[p][region], 0)
      : CORPORATE_PRICES[programme][region];
  const unitPrice = programme === "all-three" ? bundlePrice(region, seats) : seatPrice(programme, region, seats);
  return {
    region,
    currency: REGION_CURRENCY[region],
    programme,
    seats,
    listUnitPrice,
    unitPrice,
    discountPercent: Math.round((1 - unitPrice / listUnitPrice) * 100),
    total: unitPrice * seats,
  };
}

export function programmesOf(programme: OrderProgramme): PricedProgramme[] {
  return programme === "all-three" ? [...PRICED_PROGRAMMES] : [programme];
}

export function orderProgrammeName(programme: OrderProgramme): string {
  return programme === "all-three" ? "All three corporate programmes" : PROGRAMME_NAMES[programme];
}

/** "₦55,000", "KSh 7,500", "£45". */
export function formatRegionMoney(region: PriceRegion, amount: number): string {
  const symbols: Record<PriceRegion, string> = { NG: "₦", GH: "GH₵", KE: "KSh ", ZA: "R", INTL: "£" };
  return `${symbols[region]}${amount.toLocaleString("en-GB")}`;
}

export function isPriceRegion(value: unknown): value is PriceRegion {
  return value === "INTL" || isCountryCode(value);
}
