// PLACEHOLDER exchange rates -- NGN -> 1 unit of the target currency. Nobody has picked
// a live FX data source or a real payment gateway yet (see paymentGateway.service.ts), so
// these are rough reference figures only, good enough to show a plausible order-of-magnitude
// price while the page is built out. Replace with a live-rates lookup (or the real
// gateway's own conversion) before this goes live with real charges -- everything that
// needs a converted amount calls the two functions below, so that's the only place to change.
const PLACEHOLDER_NGN_RATES: Record<string, number> = {
  GBP: 0.00048,
  USD: 0.00062,
  CAD: 0.00084,
  EUR: 0.00056,
  INR: 0.052,
  JPY: 0.092,
  BRL: 0.0034,
};

// The currency a card payment actually settles in, always GBP regardless of the
// student's country -- Paleon Training UK Limited receives card payments in GBP. Naira
// payments go through the separate bank-transfer flow instead (see payment.service.ts).
export const CARD_SETTLEMENT_CURRENCY = "GBP";

// Countries with a known local-currency estimate to show alongside the GBP charge amount.
// Any other billing country (China, Russia, "Other Country", etc.) still charges in GBP,
// it just has no local-currency estimate line on the payment page.
export const COUNTRY_CURRENCY: Record<string, string> = {
  "United Kingdom": "GBP",
  "United States": "USD",
  Canada: "CAD",
  Germany: "EUR",
  India: "INR",
  France: "EUR",
  Japan: "JPY",
  Brazil: "BRL",
};

export function convertFromNgn(amountNgn: number, currency: string): number {
  const rate = PLACEHOLDER_NGN_RATES[currency];
  if (!rate) {
    throw new Error(`No placeholder FX rate configured for ${currency}`);
  }
  return Math.round(amountNgn * rate * 100) / 100;
}

export function estimateLocalAmount(
  amountNgn: number,
  billingCountry: string,
): { currency: string; amount: number } | null {
  const currency = COUNTRY_CURRENCY[billingCountry];
  if (!currency) return null;
  return { currency, amount: convertFromNgn(amountNgn, currency) };
}
