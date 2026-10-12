// Thin wrapper over window.ptTrack, which /analytics.js defines (served by the backend:
// real GA4 / Meta Pixel + consent banner once GA4_MEASUREMENT_ID or META_PIXEL_ID is set, a no-op stub before that, and
// absent entirely under the Vite dev server). Analytics must never break the app, so this
// never throws and never sends personal data -- event names and coarse parameters only.
declare global {
  interface Window {
    ptTrack?: (name: string, params?: Record<string, unknown>) => void;
  }
}

export function track(name: string, params?: Record<string, unknown>): void {
  try {
    window.ptTrack?.(name, params);
  } catch {
    // ignore
  }
}

// A confirmed card payment (2026-10-12), reported when the payer lands back from Paystack
// and the server has checked the charge: GA4's "purchase" and the Meta Pixel's "Purchase",
// so ads can be judged (and optimised) on real payments. Sent once per Paystack reference
// in this browser -- a refresh of the return URL doesn't count it again -- and the reference
// also goes to Meta as the eventID.
export function trackPurchase(
  reference: string,
  purchase: { valueNgn: number; currency: string; plan: string; courseSlug: string | null },
  source: "student" | "sponsor",
): void {
  const key = `pt_purchase_${reference}`;
  try {
    if (window.localStorage.getItem(key)) return;
    window.localStorage.setItem(key, "1");
  } catch {
    // Storage blocked: still report it; the eventID lets Meta drop a repeat.
  }
  track("purchase", {
    transaction_id: reference,
    value: purchase.valueNgn,
    currency: purchase.currency,
    course_slug: purchase.courseSlug ?? undefined,
    plan: purchase.plan,
    payer: source,
  });
}
