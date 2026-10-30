import { axiosClient } from "./axiosClient";

// Mirrors backend/src/constants/countries.ts's CountryInfo, which is the one real copy.
export interface CountryInfo {
  code: string;
  name: string;
  regionLabel: string;
  regions: string[];
  phonePlaceholder: string;
  currencyName: string;
}

export interface CountriesResponse {
  /** The visitor's country from their IP, when it's one Paleon sells to. */
  detected: string | null;
  countries: CountryInfo[];
}

export async function fetchCountries(): Promise<CountriesResponse> {
  const { data } = await axiosClient.get<CountriesResponse>("/countries");
  return data;
}

// Short names for admin tables, where fetching the full list just to label a column
// would be overkill. Unknown codes are shown as-is.
const COUNTRY_NAMES: Record<string, string> = { NG: "Nigeria", GH: "Ghana", KE: "Kenya", ZA: "South Africa" };

// The four countries in the order the site lists them (constants/countries.ts MARKET_ORDER).
export const COUNTRY_CODES = ["NG", "ZA", "KE", "GH"] as const;

// Mirrors the currency settings in backend/src/constants/countries.ts.
const CURRENCY_FORMAT: Record<string, { symbol: string; spaced: boolean }> = {
  NGN: { symbol: "\u20A6", spaced: false },
  GHS: { symbol: "GH\u20B5", spaced: false },
  KES: { symbol: "KSh", spaced: true },
  ZAR: { symbol: "R", spaced: false },
};

/** "₦5,000", "GH₵45", "KSh 480", "R60". Naira when no currency is given. */
export function formatMoney(amount: number, currency = "NGN"): string {
  const format = CURRENCY_FORMAT[currency];
  const number = amount.toLocaleString("en-GB");
  if (!format) return `${currency} ${number}`;
  return `${format.symbol}${format.spaced ? " " : ""}${number}`;
}

/** Amounts owed in several currencies as one line, Naira first: "₦8,000 + GH₵45". */
export function formatMoneyTotals(totals: Record<string, number>): string {
  const entries = Object.entries(totals).filter(([, amount]) => amount > 0);
  if (entries.length === 0) return formatMoney(0);
  const order = Object.keys(CURRENCY_FORMAT);
  entries.sort(([a], [b]) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99));
  return entries.map(([currency, amount]) => formatMoney(amount, currency)).join(" + ");
}

export function countryName(code: string | null | undefined): string {
  if (!code) return "Nigeria";
  return COUNTRY_NAMES[code] ?? code;
}

// Nigerian numbers are usually written in local form (0801...); WhatsApp's click-to-chat
// links need the full international digits with no leading 0. Falls back to stripping
// symbols only for anything that doesn't look like that shape, rather than guessing.
// A number written locally (leading 0) gets the lead's own country's dialling code.
const DIAL_CODES: Record<string, string> = { NG: "234", GH: "233", KE: "254", ZA: "27" };

export function toWhatsAppLink(phone: string, country: string): string {
  const digits = phone.replace(/\D/g, "");
  const withCountryCode = digits.startsWith("0") ? `${DIAL_CODES[country] ?? "234"}${digits.slice(1)}` : digits;
  return `https://wa.me/${withCountryCode}`;
}
