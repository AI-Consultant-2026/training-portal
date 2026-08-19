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
