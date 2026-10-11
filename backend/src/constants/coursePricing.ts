// The single source of truth for course prices (in Naira, Paleon Training's home
// currency) -- the /api/payments/quote endpoint is the only thing that should read this;
// everything else (both payment pages, the course detail page's "Pay for course" button)
// gets its price from that endpoint so there's nowhere else for pricing to drift.
// Keep in sync with course records/slugs in the database.
export const COURSE_PRICES_NGN: Record<string, number> = {
  "cyber-security-fundamentals": 200_000,
  "digital-marketing": 150_000,
  "gis-and-drone-mapping": 200_000,
  "hse-fundamentals": 100_000,
  "renewable-energy-digital-systems": 250_000,
  "social-media-management-content": 150_000,
};

// Instalment option (2026-10-11): a student can start with a small deposit instead of the
// full price. The deposit unlocks the first DEPOSIT_UNLOCKED_DAYS days (modules, in course
// order); paying the balance (price minus deposit) unlocks every other day, the capstone,
// the certificate and the attendance record, and is what qualifies a referral -- exactly
// like a full payment. One flat deposit for every course keeps the offer easy to say.
export const INSTALMENT_DEPOSIT_NGN = 20_000;
export const DEPOSIT_UNLOCKED_DAYS = 2;

export function getBalanceNgn(courseSlug: string): number | null {
  const price = COURSE_PRICES_NGN[courseSlug];
  if (price === undefined || price <= INSTALMENT_DEPOSIT_NGN) return null;
  return price - INSTALMENT_DEPOSIT_NGN;
}
