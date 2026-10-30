import { config } from "../config";
import {
  COUNTRIES,
  COUNTRY_CODES,
  CountryCode,
  HOMEPAGE_COURSES,
  HomepageCourse,
  formatMoney,
  isCountryCode,
  isLive,
} from "../constants/countries";
import { COURSE_PRICES_NGN, INSTALMENT_DEPOSIT_NGN, getBalanceNgn } from "../constants/coursePricing";

// Paystack per country (2026-10-30). Each country is its own Paystack account with its own
// secret key and currency (constants/countries.ts: site.currency, site.paystackSecretKeyEnv).
// A student checks out through their own country's account once that country is live.
// Students from a country that isn't live yet keep paying in Naira through Nigeria's
// account, as they could before the country homepages existed.

export function paystackSecretKey(country: CountryCode): string {
  // Nigeria reads config.paystackSecretKey so the existing tests (and Render's existing
  // PAYSTACK_SECRET_KEY) keep working.
  return country === "NG" ? config.paystackSecretKey : (config.paystackSecretKeys[country] ?? "");
}

export function paystackCurrency(country: CountryCode): string {
  return COUNTRIES[country].site.currency.code;
}

/** The account a student from `studentCountry` pays through. */
export function checkoutCountryFor(studentCountry: string | null | undefined): CountryCode {
  return isCountryCode(studentCountry) && isLive(studentCountry) ? studentCountry : "NG";
}

/** Countries whose Paystack key is set (the webhook accepts a signature from any of them). */
export function configuredPaystackCountries(): CountryCode[] {
  return COUNTRY_CODES.filter((code) => paystackSecretKey(code) !== "");
}

function isHomepageCourse(slug: string): slug is HomepageCourse {
  return (HOMEPAGE_COURSES as readonly string[]).includes(slug);
}

/** Full course price in the account's currency, or undefined if not set. */
export function coursePriceIn(country: CountryCode, courseSlug: string): number | undefined {
  if (country === "NG") return COURSE_PRICES_NGN[courseSlug];
  const prices = COUNTRIES[country].site.coursePrices;
  return prices && isHomepageCourse(courseSlug) ? prices[courseSlug] : undefined;
}

export function depositIn(country: CountryCode): number | null {
  return country === "NG" ? INSTALMENT_DEPOSIT_NGN : COUNTRIES[country].site.deposit;
}

/** Price minus deposit, or null when the course can't be paid in instalments there. */
export function balanceIn(country: CountryCode, courseSlug: string): number | null {
  if (country === "NG") return getBalanceNgn(courseSlug);
  const price = coursePriceIn(country, courseSlug);
  const deposit = depositIn(country);
  if (price === undefined || deposit === null || price <= deposit) return null;
  return price - deposit;
}

export function moneyIn(country: CountryCode, amount: number): string {
  return formatMoney(country, amount);
}

// --- Which gateway (2026-10-30) ---------------------------------------------------------
// Nigeria pays through Paystack; Ghana, Kenya and South Africa pay through one Flutterwave
// account, in their own currency (constants/countries.ts: site.gateway).

export type CheckoutGateway = "paystack" | "flutterwave";

export function checkoutGateway(country: CountryCode): CheckoutGateway {
  return COUNTRIES[country].site.gateway;
}

/** True when the gateway that `country` pays through has its key set. */
export function paymentsEnabledIn(country: CountryCode): boolean {
  return checkoutGateway(country) === "flutterwave"
    ? config.flutterwave.secretKey !== ""
    : paystackSecretKey(country) !== "";
}

/** What the payment pages need to show prices in the checkout's own currency. */
export interface CheckoutInfo {
  country: CountryCode;
  gateway: CheckoutGateway;
  currency: { code: string; symbol: string; spaced: boolean };
  /** "Naira", "cedis", "shillings", "rand". */
  currencyName: string;
  /** The country's WhatsApp line for payment questions. */
  whatsappLink: string;
}

export function checkoutInfo(country: CountryCode): CheckoutInfo {
  const { site, currencyName } = COUNTRIES[country];
  return {
    country,
    gateway: checkoutGateway(country),
    currency: site.currency,
    currencyName,
    whatsappLink: site.whatsapp.link,
  };
}
