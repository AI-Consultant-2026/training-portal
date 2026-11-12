import { COUNTRIES, CountryCode, MARKET_ORDER, formatMoney } from "../constants/countries";
import {
  CORPORATE_PRICES,
  PRICED_PROGRAMMES,
  PricedProgramme,
  PROGRAMME_NAMES,
  VOLUME_TIERS,
  bundlePrice,
  seatPrice,
  BUNDLE_DISCOUNT,
  INVOICE_FROM_SEATS,
  OrderProgramme,
  PriceRegion,
  formatRegionMoney,
} from "../constants/corporatePricing";

// Local copy (not imported from countryHome) so this module has no view dependencies
// and can be used by module-level constants such as the hub FAQ without import cycles.
function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Corporate pricing on the pages. The prices themselves, and the maths shared with the
// checkout, live in constants/corporatePricing.ts.
export {
  BUNDLE_DISCOUNT,
  CORPORATE_PRICES,
  PROGRAMME_NAMES,
  VOLUME_TIERS,
  bundlePrice,
  seatPrice,
} from "../constants/corporatePricing";
export type { PricedProgramme } from "../constants/corporatePricing";

const PROGRAMME_ORDER = PRICED_PROGRAMMES;

export function tierLabel(tier: (typeof VOLUME_TIERS)[number]): string {
  return tier.max === null ? `${tier.min}+ learners` : `${tier.min}\u2013${tier.max} learners`;
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

// Programme page addresses, kept here (not imported from the page modules, which import
// this one) so the price tables can link each price to where it can be bought.
const PROGRAMME_PAGE_SLUGS: Record<PricedProgramme, string> = {
  cybersecure: "corporate-training/cybersecure-workforce",
  "ai-workflow": "corporate-training/ai-workflow-productivity",
  accelerator: "corporate-training/ai-cybersecurity-professional-accelerator",
};

function buyHref(code: CountryCode, programme: PricedProgramme): string {
  return `${COUNTRIES[code].site.path}/${PROGRAMME_PAGE_SLUGS[programme]}#buy`;
}

// Everything the buy form's script needs to show the price as the buyer types. The
// server works the price out again from the same table; this is only a preview.
function priceData(): string {
  return escapeHtml(
    JSON.stringify({
      prices: CORPORATE_PRICES,
      tiers: VOLUME_TIERS.map((t) => [t.min, t.discount]),
      bundle: BUNDLE_DISCOUNT,
      invoiceFrom: INVOICE_FROM_SEATS,
    }),
  );
}

const REGION_LABELS: [PriceRegion, string][] = [
  ["NG", "Nigeria (pay in naira)"],
  ["GH", "Ghana (pay in cedis)"],
  ["KE", "Kenya (pay in shillings)"],
  ["ZA", "South Africa (pay in rand)"],
  ["INTL", "Another country (pay in pounds, GBP)"],
];

function buyForm(code: CountryCode, programme: PricedProgramme): string {
  const regions = REGION_LABELS.map(
    ([r, label]) => `<option value="${r}"${r === code ? " selected" : ""}>${escapeHtml(label)}</option>`,
  ).join("");
  const programmes = ([...PRICED_PROGRAMMES, "all-three"] as OrderProgramme[])
    .map(
      (p) =>
        `<option value="${p}"${p === programme ? " selected" : ""}>${escapeHtml(
          p === "all-three" ? "All three programmes (15% off)" : PROGRAMME_NAMES[p],
        )}</option>`,
    )
    .join("");
  return `<form class="ca-form cp-buy" id="cpBuy" novalidate data-prices="${priceData()}">
        <h3 class="cp-buy-title" id="buy">Buy learner places online</h3>
        <p class="cp-buy-lede">Pay securely on Flutterwave by card${code === "NG" ? ", bank transfer or USSD" : code === "GH" || code === "KE" ? " or mobile money" : ""}. Your staff sign-up link is emailed to you as soon as the payment is confirmed.</p>
        <div class="ca-grid">
          <div class="form-row"><label class="form-label" for="cp-programme">Programme</label><select class="form-select" id="cp-programme" name="programme" required>${programmes}</select></div>
          <div class="form-row"><label class="form-label" for="cp-seats">Number of learners</label><input class="form-input" id="cp-seats" name="seats" type="number" inputmode="numeric" min="1" max="10000" step="1" value="10" required></div>
          <div class="form-row"><label class="form-label" for="cp-region">Where is your organisation based?</label><select class="form-select" id="cp-region" name="region" required>${regions}</select></div>
          <div class="form-row" id="cp-country-row" hidden><label class="form-label" for="cp-country">Which country?</label><input class="form-input" id="cp-country" name="buyerCountry" autocomplete="country-name" maxlength="100"></div>
          <div class="form-row"><label class="form-label" for="cp-org">Organisation</label><input class="form-input" id="cp-org" name="organisation" autocomplete="organization" required maxlength="200"></div>
          <div class="form-row"><label class="form-label" for="cp-name">Your name</label><input class="form-input" id="cp-name" name="contactName" autocomplete="name" required maxlength="150"></div>
          <div class="form-row"><label class="form-label" for="cp-email">Work email</label><input class="form-input" id="cp-email" name="contactEmail" type="email" autocomplete="email" required maxlength="200"></div>
          <div class="form-row"><label class="form-label" for="cp-phone">Phone / WhatsApp <span class="optional">(optional)</span></label><input class="form-input" id="cp-phone" name="phone" type="tel" autocomplete="tel" maxlength="30"></div>
        </div>
        <div class="cp-total" id="cpTotal" aria-live="polite"></div>
        <label class="consent-check" id="cp-invoice-row"><input type="checkbox" name="payByInvoice" id="cp-invoice"> <span>Send us an invoice instead (pay by bank transfer)</span></label>
        <div class="ca-hp" aria-hidden="true"><label for="cp-website">Website</label><input id="cp-website" name="website" tabindex="-1" autocomplete="off"></div>
        <label class="consent-check"><input type="checkbox" name="consent" required> <span>I agree to the <a href="/terms">Terms</a> and that Paleon Training may use these details to process this order, as described in the <a href="/privacy">Privacy Policy</a>.</span></label>
        <p class="form-error" id="cpError" role="alert" hidden></p>
        <button type="submit" class="btn btn-signal btn-lg btn-block" id="cpSubmit">Continue to secure payment</button>
        <p class="form-note">You will use this email to create your manager login. Each learner who signs up with your link uses one place. Prices exclude VAT where applicable.</p>
      </form>
      <div class="ca-thanks" id="cpThanks" hidden tabindex="-1">
        <h3>Thank you. Your invoice request has reached our corporate team.</h3>
        <p>We will email the invoice, with bank transfer details, within one working day. As soon as it is paid we set up your staff training and email you the link your staff use to sign up.</p>
      </div>`;
}

/** The pricing section on a programme's country page, with the buy form. */
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
      <p class="ca-p"><strong>Outside Nigeria, South Africa, Kenya and Ghana?</strong> Pay in pounds: ${escapeHtml(formatRegionMoney("INTL", CORPORATE_PRICES[programme].INTL))} per learner, with the same discounts.</p>
      <p class="ca-p ca-hint">${escapeHtml(TERMS)} Orders of ${INVOICE_FROM_SEATS} or more learners are invoiced.</p>
      ${buyForm(code, programme)}
      <p class="ca-p cp-after"><strong>Live facilitator-led or in-house delivery?</strong> It is quoted for your team: <a href="#enquiry" data-intent="proposal">request a proposal</a> and we will reply within one working day.</p>
    </div>
  </section>`;
}

/** Compact price table for the country corporate page and the hub. Each price links to
 * the form where it can be bought; `withGbp` adds the pounds column (the hub). */
export function pricingSummaryTable(codes: CountryCode[], withGbp = false): string {
  const head =
    codes.map((k) => `<th scope="col">${escapeHtml(COUNTRIES[k].name)}</th>`).join("") +
    (withGbp ? '<th scope="col">Other countries</th>' : "");
  const rows = PROGRAMME_ORDER.map(
    (p) =>
      `<tr><th scope="row">${escapeHtml(PROGRAMME_NAMES[p])}</th>${codes
        .map((k) => `<td><a href="${buyHref(k, p)}">${escapeHtml(money(k, CORPORATE_PRICES[p][k]))}</a></td>`)
        .join("")}${withGbp ? `<td><a href="${buyHref("NG", p).replace("#buy", "?region=INTL#buy")}">${escapeHtml(formatRegionMoney("INTL", CORPORATE_PRICES[p].INTL))}</a></td>` : ""}</tr>`,
  ).join("");
  return `<div class="cp-table-wrap">
        <table class="cp-table">
          <caption>Online self-paced, per learner, 12 months&rsquo; access. Select a price to buy online.</caption>
          <thead><tr><th scope="col">Programme</th>${head}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <p class="ca-p ca-hint">Volume discounts: 10% off for 10&ndash;49 learners, 20% for 50&ndash;199, 30% for 200 or more (invoiced). All three programmes for the same person: 15% off. Plus VAT where applicable. Live facilitator-led and in-house delivery is quoted per proposal.</p>`;
}
