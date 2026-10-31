import { COUNTRIES, COUNTRY_CODES, CountryCode, formatMoney, isCountryCode } from "./countries";

// Single source of truth for the referral / ambassador programme. A referral "qualifies"
// (and both sides earn a reward) only when the referred student's FIRST course payment is
// confirmed -- see referral.service.ts's handleQualifyingPayment. Rewards are recorded as
// pending and paid out manually by an admin from /admin/referrals: there is no automated
// airtime/data disbursement, the same way payments are verified by hand.

export const REFERRAL_REWARD_TYPES = ["airtime", "data", "discount"] as const;
export type ReferralRewardType = (typeof REFERRAL_REWARD_TYPES)[number];

// What the ambassador (referrer) earns per qualified referral, and the welcome reward the
// new student (referee) earns on their first paid enrolment. Naira, matching
// coursePricing.ts's currency; other countries' amounts are below. Deliberately plain constants, not env-configurable: a
// change to the reward is a deliberate commercial decision worth shipping as a code
// change and a note in the changelog, not a silent env tweak.
export const REFERRER_REWARD_NGN = 5_000;
export const REFEREE_REWARD_NGN = 3_000;

// Ghana, Kenya and South Africa pay the same rewards in their own money (2026-10-30), set
// in countries.ts's ambassadorRewards. The referrer is paid in their own country's money
// and the friend in theirs; anyone without a known country is treated as Nigerian.
export interface CountryRewards {
  country: CountryCode;
  currency: string;
  referrer: number;
  referee: number;
}

export function rewardsForCountry(country: string | null | undefined): CountryRewards {
  const code: CountryCode = isCountryCode(country) ? country : "NG";
  const { currency, ambassadorRewards } = COUNTRIES[code].site;
  if (code === "NG" || !ambassadorRewards) {
    return { country: "NG", currency: "NGN", referrer: REFERRER_REWARD_NGN, referee: REFEREE_REWARD_NGN };
  }
  return { country: code, currency: currency.code, ...ambassadorRewards };
}

// "₦5,000", "GH₵45", "KSh 480", "R60". An unknown currency code is shown before the number.
export function formatRewardMoney(currency: string, amount: number): string {
  const code = COUNTRY_CODES.find((c) => COUNTRIES[c].site.currency.code === currency);
  return code ? formatMoney(code, amount) : `${currency} ${amount.toLocaleString("en-GB")}`;
}

export const DEFAULT_REWARD_TYPE: ReferralRewardType = "airtime";

// Ambassador code: 6 chars from an unambiguous alphabet (no 0/O/1/I/5/S/2/Z) so it
// survives being read aloud, handwritten, or typed on a phone. Prefixed for the brand.
export const REFERRAL_CODE_PREFIX = "PLN";
export const REFERRAL_CODE_ALPHABET = "ABCDEFGHJKMNPQRTUVWXY346789";
export const REFERRAL_CODE_BODY_LENGTH = 6;

export const REFERRAL_LEADERBOARD_SIZE = 10;

// Printable ambassador collateral on /refer/me (see referralPrint.service.ts).
export const PRINT_KINDS = ["flyer-a4", "flyer-a5", "cards"] as const;
export type PrintKind = (typeof PRINT_KINDS)[number];

export const PRINT_DESIGNS = [
  "general",
  "cyber-security-fundamentals",
  "gis-and-drone-mapping",
  "digital-marketing",
  "hse-fundamentals",
  "ai-machine-learning-fundamentals",
] as const;
export type PrintDesign = (typeof PRINT_DESIGNS)[number];
