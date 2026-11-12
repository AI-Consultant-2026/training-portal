import { COUNTRIES, CountryCode, MARKET_ORDER, formatMoney } from "../constants/countries";

// Local copy (not imported from countryHome) so this module has no view dependencies
// and can be used by module-level constants such as the hub FAQ without import cycles.
function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Corporate prices (2026-11-12, owner request). These are for the ONLINE SELF-PACED version
// of each programme in the Paleon portal (company seats; staff join with the company's
// code), per learner, 12 months' access. Live facilitator-led and in-house delivery is
// still quoted per proposal. Market-adjusted, not straight exchange-rate conversions.
// Every price on the corporate pages and in the cost FAQs comes from this one table.

export type PricedProgramme = "cybersecure" | "ai-workflow" | "accelerator";

export const PROGRAMME_NAMES: Record<PricedProgramme, string> = {
  cybersecure: "CyberSecure Workforce Essentials",
  "ai-workflow": "AI Workflow Productivity & Process Transformation",
  accelerator: "AI + Cybersecurity Professional Accelerator",
};

export const CORPORATE_PRICES: Record<PricedProgramme, Record<CountryCode, number>> = {
  cybersecure: { NG: 55000, GH: 650, KE: 7500, ZA: 1000 },
  "ai-workflow": { NG: 120000, GH: 1400, KE: 15500, ZA: 2100 },
  accelerator: { NG: 250000, GH: 2900, KE: 32500, ZA: 4300 },
};

/** Volume discounts, by number of seats bought for one programme. */
export const VOLUME_TIERS: { min: number; max: number | null; discount: number }[] = [
  { min: 1, max: 9, discount: 0 },
  { min: 10, max: 49, discount: 0.1 },
  { min: 50, max: 199, discount: 0.2 },
  { min: 200, max: null, discount: 0.3 },
];

/** All three programmes for the same person. */
export const BUNDLE_DISCOUNT = 0.15;

const PROGRAMME_ORDER: PricedProgramme[] = ["cybersecure", "ai-workflow", "accelerator"];

export function tierLabel(tier: (typeof VOLUME_TIERS)[number]): string {
  return tier.max === null ? `${tier.min}+ learners` : `${tier.min}–${tier.max} learners`;
}

export function seatPrice(programme: PricedProgramme, code: CountryCode, seats: number): number {
  const tier = [...VOLUME_TIERS].reverse().find((t) => seats >= t.min) ?? VOLUME_TIERS[0];
  return Math.round(CORPORATE_PRICES[programme][code] * (1 - tier.discount));
}

/** Per-person price for all three programmes, rounded down to the nearest 10. */
export function bundlePrice(code: CountryCode): number {
  const full = PROGRAMME_ORDER.reduce((sum, p) => sum + CORPORATE_PRICES[p][code], 0);
  return Math.floor((full * (1 - BUNDLE_DISCOUNT)) / 10) * 10;
}

const money = (code: CountryCode, amount: number) => formatMoney(code, amount);

const TERMS =
  "Prices are per learner for the online self-paced programme in the Paleon portal, with 12 months’ access, plus VAT where applicable. " +
  "Volume discounts apply to the number of learners on one programme. The all-three discount and volume discounts do not combine; you get whichever saves you more.";

/** Answer for the "How much does it cost?" FAQs (also used in FAQPage JSON-LD). */
export function pricingFaqAnswer(code: CountryCode, programme: PricedProgramme | null): string {
  const list =
    programme === null
      ? PROGRAMME_ORDER.map((p) => `${PROGRAMME_NAMES[p]} ${money(code, CORPORATE_PRICES[p][code])}`).join("; ")
      : `${money(code, CORPORATE_PRICES[programme][code])}`;
  const what = programme === null ? `Online self-paced, per learner: ${list}.` : `Online self-paced, it is ${list} per learner.`;
  return (
    `${what} There are volume discounts of 10% for 10–49 learners, 20% for 50–199 and 30% for 200 or more, ` +
    `and 15% off when the same person takes all three programmes. Each place includes 12 months’ access; VAT is added where applicable. ` +
    "Live facilitator-led or in-house delivery is quoted separately: request a proposal with your team size and we will reply within one working day."
  );
}

/** Hub FAQ answer: no single country, so give the starting price in each currency. */
export function hubPricingFaqAnswer(): string {
  const from = MARKET_ORDER.map((k) => `${money(k, CORPORATE_PRICES.cybersecure[k])} in ${COUNTRIES[k].name}`).join(", ");
  return (
    `Online self-paced programmes start from ${from} per learner (CyberSecure Workforce), with volume discounts of up to 30% and 15% off all three programmes. ` +
    "Live facilitator-led or in-house delivery is quoted per proposal. Choose your country page for full prices in your currency."
  );
}

/** The pricing section on a programme's country page. */
export function pricingSection(code: CountryCode, programme: PricedProgramme, dark: boolean): string {
  const name = PROGRAMME_NAMES[programme];
  const rows = VOLUME_TIERS.map(
    (t) => `<tr${t.min === 1 ? ' class="cp-list"' : ""}>
          <th scope="row">${tierLabel(t)}</th>
          <td>${t.discount ? `${Math.round(t.discount * 100)}% off` : "List price"}</td>
          <td><strong>${escapeHtml(money(code, seatPrice(programme, code, t.min)))}</strong></td>
        </tr>`,
  ).join("");
  return `<section class="section ${dark ? "section-dark" : "section-paper"} ca-section" id="pricing" aria-labelledby="pricing-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Pricing</span>
      <h2 class="section-title" id="pricing-title">${escapeHtml(name)} prices in ${escapeHtml(COUNTRIES[code].name)}</h2>
      <p class="cp-price"><span class="cp-amount">${escapeHtml(money(code, CORPORATE_PRICES[programme][code]))}</span> per learner, online self-paced, 12 months&rsquo; access</p>
      <div class="cp-table-wrap">
        <table class="cp-table">
          <caption>Volume discounts for your organisation</caption>
          <thead><tr><th scope="col">Learners</th><th scope="col">Discount</th><th scope="col">Price per learner</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <p class="ca-p"><strong>All three programmes for the same person:</strong> 15% off, ${escapeHtml(money(code, bundlePrice(code)))} per learner for CyberSecure Workforce, AI Workflow Productivity and the AI + Cybersecurity Professional Accelerator.</p>
      <p class="ca-p ca-hint">${escapeHtml(TERMS)}</p>
      <p class="ca-p"><strong>Live facilitator-led or in-house delivery?</strong> It is quoted for your team; request a proposal below and we will reply within one working day.</p>
      <div class="ca-ctas"><a class="btn btn-signal btn-lg" href="#enquiry" data-intent="proposal">Buy learner places or request a quote</a></div>
    </div>
  </section>`;
}

/** Compact price table for the country corporate page and the hub. */
export function pricingSummaryTable(codes: CountryCode[]): string {
  const head = codes.map((k) => `<th scope="col">${escapeHtml(COUNTRIES[k].name)}</th>`).join("");
  const rows = PROGRAMME_ORDER.map(
    (p) =>
      `<tr><th scope="row">${escapeHtml(PROGRAMME_NAMES[p])}</th>${codes
        .map((k) => `<td>${escapeHtml(money(k, CORPORATE_PRICES[p][k]))}</td>`)
        .join("")}</tr>`,
  ).join("");
  return `<div class="cp-table-wrap">
        <table class="cp-table">
          <caption>Online self-paced, per learner, 12 months&rsquo; access</caption>
          <thead><tr><th scope="col">Programme</th>${head}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <p class="ca-p ca-hint">Volume discounts: 10% off for 10&ndash;49 learners, 20% for 50&ndash;199, 30% for 200 or more. All three programmes for the same person: 15% off. Plus VAT where applicable. Live facilitator-led and in-house delivery is quoted per proposal.</p>`;
}
