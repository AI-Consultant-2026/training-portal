// Paystack Payment Page links, one per course, keyed by course slug -- the card payment
// page sends students to these to pay in Naira on Paystack's own secure page (Paleon
// never sees card details). Each page is created in the Paystack dashboard with a fixed
// amount, which must match the course's price in COURSE_PRICES_NGN: a mismatch means
// students are shown one price here and charged another on Paystack.
//
// An empty string means "no link yet": the card option is hidden for that course and
// students are pointed to bank transfer instead. These links are public (anyone can
// open them), so they're fine to keep in code.
export const PAYSTACK_PAYMENT_LINKS: Record<string, string> = {
  "cyber-security-fundamentals": "",
  "digital-marketing": "",
  "gis-and-drone-mapping": "",
  "hse-fundamentals": "",
  "renewable-energy-digital-systems": "",
  "social-media-management-content": "",
};

// Only a real Paystack page may be used as a payment link, so a typo'd or foreign URL
// can't send a student to pay somewhere else.
export function getPaystackPaymentLink(courseSlug: string): string | null {
  const link = PAYSTACK_PAYMENT_LINKS[courseSlug];
  if (!link) return null;
  return /^https:\/\/paystack\.(com|shop)\//.test(link) ? link : null;
}
