import { COUNTRIES, CountryCode, formatMoney } from "../constants/countries";
import { CORPORATE_PRICES, PRICED_PROGRAMMES, PROGRAMME_NAMES, PricedProgramme, seatPrice } from "../constants/corporatePricing";
import { DATA_PROTECTION_LAW } from "./corporateLocal";

// The buying aids shared by every corporate page (2026-11-13, owner's 12-point conversion
// review): business outcomes before the module list, the two ways to buy (self-paced per
// learner, or live / in-house by quote, with a worked example for 25 staff), the December
// 2026 cohort for the two booked programmes, a paid 10-learner pilot and a free leadership
// taster, a "Book a 20-minute call" link, and the PDFs a buyer can forward for sign-off.
// No view imports, so every corporate page module can use it.

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const money = (code: CountryCode, amount: number) => formatMoney(code, amount);

// ---- The December 2026 cohort (owner: 10 places remain; replaces "fully booked until
// January 2027" on AI Workflow Productivity and the Accelerator). Update both when it fills.
export const COHORT_NAME = "December 2026";
export const COHORT_PLACES = 10;
export const RESERVE_CTA = `Reserve a ${COHORT_NAME} cohort`;
export const COHORT_SENTENCE = `The next cohort starts in ${COHORT_NAME} and ${COHORT_PLACES} places remain.`;
export const COHORT_NOTICE = `<p class="ca-booked"><strong>${COHORT_NAME} cohort: ${COHORT_PLACES} places remain.</strong> Reserve now to hold places for your team.</p>`;

export function reserveButton(): string {
  return `<a class="btn btn-signal btn-lg" href="#enquiry" data-intent="reserve">${escapeHtml(RESERVE_CTA)}</a>`;
}

// ---- "Book a 20-minute call": WhatsApp with the message typed in, until there is a calendar.
export const CALL_CTA = "Book a 20-minute call";
export const CALL_URL =
  "https://wa.me/447508823495?text=" +
  encodeURIComponent("Hello Paleon Training, I would like to book a 20-minute call about training for our staff.");

export function callButton(dark: boolean): string {
  return `<a class="btn ${dark ? "btn-outline-light" : "btn-outline-ink"} btn-lg" href="${CALL_URL}" target="_blank" rel="noopener" data-call-cta>${CALL_CTA}</a>`;
}

// ---- The Readiness Check as the low-commitment second action in every hero.
export const READINESS_CTA = "Take the free Readiness Check";

export function readinessHref(code: CountryCode | null): string {
  return `/ai-cyber-readiness-check${code ? `?country=${code.toLowerCase()}` : ""}`;
}

export function readinessButton(code: CountryCode | null, dark: boolean): string {
  return `<a class="btn ${dark ? "btn-outline-light" : "btn-outline-ink"} btn-lg" href="${readinessHref(code)}">${READINESS_CTA}</a>`;
}

// ---- Programme addresses and PDF addresses.
export const PROGRAMME_SLUGS: Record<PricedProgramme, string> = {
  cybersecure: "cybersecure-workforce",
  "ai-workflow": "ai-workflow-productivity",
  accelerator: "ai-cybersecurity-accelerator",
};

const PROGRAMME_PAGE: Record<PricedProgramme, string> = {
  cybersecure: "corporate-training/cybersecure-workforce",
  "ai-workflow": "corporate-training/ai-workflow-productivity",
  accelerator: "corporate-training/ai-cybersecurity-professional-accelerator",
};

export function programmePagePath(programme: PricedProgramme, code: CountryCode): string {
  return `${COUNTRIES[code].site.path}/${PROGRAMME_PAGE[programme]}`;
}

export const BROCHURE_BASE = "/corporate-training/brochures";
export const BUSINESS_CASE_BASE = "/corporate-training/business-case";

export function brochurePath(programme: PricedProgramme, code: CountryCode): string {
  return `${BROCHURE_BASE}/${PROGRAMME_SLUGS[programme]}-${code.toLowerCase()}.pdf`;
}

export function businessCasePath(programme: PricedProgramme, code: CountryCode): string {
  return `${BUSINESS_CASE_BASE}/${PROGRAMME_SLUGS[programme]}-${code.toLowerCase()}.pdf`;
}

/** "cybersecure-workforce-za" -> { programme, code }, or null. */
export function parsePdfSlug(slug: string): { programme: PricedProgramme; code: CountryCode } | null {
  const m = /^([a-z-]+)-(ng|za|ke|gh)$/.exec(slug);
  if (!m) return null;
  const programme = PRICED_PROGRAMMES.find((p) => PROGRAMME_SLUGS[p] === m[1]);
  return programme ? { programme, code: m[2].toUpperCase() as CountryCode } : null;
}

// ---- Business outcomes, shown before the module list (no invented figures: the
// measures are agreed with each client).
export interface Outcome {
  h: string;
  p: string;
}

export const OUTCOME_LEAD: Record<PricedProgramme, string> = {
  cybersecure: "Fewer incidents that start with a person",
  "ai-workflow": "Hours saved every week, with the risks managed",
  accelerator: "Your own people leading secure AI adoption",
};

export function outcomes(programme: PricedProgramme, code: CountryCode): Outcome[] {
  const law = DATA_PROTECTION_LAW[code];
  switch (programme) {
    case "cybersecure":
      return [
        {
          h: "Fewer phishing and payment-fraud losses",
          p: "Staff learn to stop and check fake invoices, urgent payment requests, changed bank details and look-alike login pages before money or data leaves the business.",
        },
        {
          h: "Faster reporting of incidents",
          p: "Every employee knows what to report, how and to whom, so suspicious activity reaches your IT team in minutes, not days.",
        },
        {
          h: "Audit and data-protection readiness",
          p: `Completion records and assessment results give you evidence of staff training for audits, the board and your obligations under ${law}.`,
        },
      ];
    case "ai-workflow":
      return [
        {
          h: "Hours saved on routine work",
          p: "Teams use AI for first drafts of reports, emails, meeting notes and summaries, and spend the time saved on work that needs judgement.",
        },
        {
          h: "Consistent, checked quality",
          p: "Shared prompts, templates and human review steps keep AI-assisted work accurate and on-brand across departments.",
        },
        {
          h: "Governed, audit-ready AI use",
          p: `Clear rules on approved tools and on the data that never goes into AI, so you can show auditors and the board that AI use is controlled and in line with ${law}.`,
        },
      ];
    case "accelerator":
      return [
        {
          h: "In-house AI and cyber champions",
          p: "IT, security, risk and data staff who can assess AI tools, recognise AI-enabled threats and support colleagues across the business.",
        },
        {
          h: "Audit-ready AI governance",
          p: "Participants draft the AI policies, risk assessments and controls your organisation needs before AI use grows further.",
        },
        {
          h: "A real problem worked on",
          p: "Each capstone tackles a live challenge from your organisation, so the programme ends with a result you can use.",
        },
      ];
  }
}

export function outcomesSection(programme: PricedProgramme, code: CountryCode): string {
  const cards = outcomes(programme, code)
    .map((o) => `<div class="ca-card co-outcome"><h3>${escapeHtml(o.h)}</h3><p>${escapeHtml(o.p)}</p></div>`)
    .join("");
  return `<section class="section section-paper ca-section co-outcomes" id="outcomes" aria-labelledby="outcomes-title">
    <div class="wrap">
      <span class="section-eyebrow">Business outcomes</span>
      <h2 class="section-title" id="outcomes-title">${escapeHtml(OUTCOME_LEAD[programme])}</h2>
      <div class="ca-cards ca-cards-3">${cards}</div>
      <p class="ca-p ca-hint">We agree how to measure these with you at the start, for example phishing-report rates, time saved on named tasks or policy sign-off, and review them with you at the end.</p>
    </div>
  </section>`;
}

/** The three outcome headlines as a short list, for the hub and country pages' programme cards. */
export function outcomeList(programme: PricedProgramme, code: CountryCode): string {
  return `<ul class="ca-list co-outcome-list">${outcomes(programme, code)
    .map((o) => `<li><strong>${escapeHtml(o.h)}</strong></li>`)
    .join("")}</ul>`;
}

// ---- Two ways to buy, with a worked example for 25 staff.
export const EXAMPLE_STAFF = 25;
export const PILOT_STAFF = 10;

export function exampleTotal(programme: PricedProgramme, code: CountryCode, staff = EXAMPLE_STAFF): number {
  return seatPrice(programme, code, staff) * staff;
}

export function workedExample(programme: PricedProgramme, code: CountryCode): string {
  const each = seatPrice(programme, code, EXAMPLE_STAFF);
  return `${EXAMPLE_STAFF} staff × ${money(code, each)} (10% volume discount) = ${money(code, exampleTotal(programme, code))}, plus VAT where applicable`;
}

const ITF_LINE =
  "Nigerian employers that pay the ITF training levy can use our attendance records and programme documentation to support a reimbursement claim; eligibility and the amount are decided by the ITF.";

export function waysToBuySection(programme: PricedProgramme, code: CountryCode, dark: boolean): string {
  const country = COUNTRIES[code].name;
  const name = PROGRAMME_NAMES[programme];
  return `<section class="section ${dark ? "section-dark" : "section-paper"} ca-section" id="delivery" aria-labelledby="delivery-title">
    <div class="wrap">
      <span class="section-eyebrow">Two ways to buy</span>
      <h2 class="section-title" id="delivery-title">Self-paced per learner, or live and in-house by quote</h2>
      <div class="ca-cards co-ways">
        <div class="ca-card co-way">
          <p class="co-way-tag">Option 1 &middot; fixed price</p>
          <h3>Self-paced online</h3>
          <p class="co-way-price"><strong>${escapeHtml(money(code, CORPORATE_PRICES[programme][code]))}</strong> per learner</p>
          <ul class="ca-list">
            <li>Each learner works through ${escapeHtml(name)} in the Paleon portal, at their own pace</li>
            <li>12 months&rsquo; access, quizzes, a final assessment and completion records</li>
            <li>Volume discounts from 10 learners; buy online and start today</li>
          </ul>
          <p class="co-way-example"><strong>Worked example:</strong> ${escapeHtml(workedExample(programme, code))}.</p>
          <div class="ca-ctas"><a class="btn btn-signal btn-lg" href="#buy" data-buy-cta>Buy learner places</a></div>
        </div>
        <div class="ca-card co-way">
          <p class="co-way-tag">Option 2 &middot; by quote</p>
          <h3>Live, facilitator-led</h3>
          <p class="co-way-price"><strong>Live online, in-house at your offices, or hybrid</strong></p>
          <ul class="ca-list">
            <li>Available in Nigeria, South Africa, Kenya and Ghana, including at your offices in ${escapeHtml(country)}</li>
            <li>Department sessions, executive workshops or an organisation-wide rollout</li>
            <li>Examples and exercises adapted to your sector; attendance records for your files</li>
          </ul>
          <p class="co-way-example"><strong>Worked example:</strong> for ${EXAMPLE_STAFF} staff we quote after a 20-minute call about your teams, locations and dates, and reply with a proposal within one working day.</p>
          <div class="ca-ctas"><a class="btn ${dark ? "btn-outline-light" : "btn-outline-ink"} btn-lg" href="#enquiry" data-intent="proposal">Request a proposal</a></div>
        </div>
      </div>
      ${code === "NG" ? `<p class="ca-p"><strong>ITF reimbursement.</strong> ${escapeHtml(ITF_LINE)}</p>` : ""}
    </div>
  </section>`;
}

/** The same two options in brief, for the hub and country pages under the price table. */
export function waysToBuyBrief(code: CountryCode, dark = true): string {
  const examples = PRICED_PROGRAMMES.map(
    (p) => `<li>${escapeHtml(PROGRAMME_NAMES[p])}: ${escapeHtml(workedExample(p, code))}</li>`,
  ).join("");
  return `<div class="ca-cards co-ways">
        <div class="ca-card co-way">
          <p class="co-way-tag">Option 1 &middot; fixed price</p>
          <h3>Self-paced online, per learner</h3>
          <p>The prices above. Each learner studies in the Paleon portal with 12 months&rsquo; access; buy online and start today.</p>
          <p class="co-way-example"><strong>Worked example for ${EXAMPLE_STAFF} staff in ${escapeHtml(COUNTRIES[code].name)}:</strong></p>
          <ul class="ca-list">${examples}</ul>
        </div>
        <div class="ca-card co-way">
          <p class="co-way-tag">Option 2 &middot; by quote</p>
          <h3>Live online, in-house or hybrid</h3>
          <p>Facilitator-led sessions at your offices, live online or a mix, in Nigeria, South Africa, Kenya and Ghana. We quote after a 20-minute call about your teams, locations and dates.</p>
          <div class="ca-ctas"><a class="btn ${dark ? "btn-outline-light" : "btn-outline-ink"} btn-lg" href="#enquiry" data-intent="proposal">Request a proposal</a></div>
        </div>
      </div>`;
}

// ---- Pilot (10 learners at the normal 10-learner price) and free leadership taster.
export function pilotTotal(programme: PricedProgramme, code: CountryCode): number {
  return seatPrice(programme, code, PILOT_STAFF) * PILOT_STAFF;
}

export function pilotSection(code: CountryCode, programme: PricedProgramme | null, dark: boolean): string {
  const prices = (programme ? [programme] : [...PRICED_PROGRAMMES])
    .map((p) => `<li>${escapeHtml(PROGRAMME_NAMES[p])}: <strong>${escapeHtml(money(code, pilotTotal(p, code)))}</strong> for ${PILOT_STAFF} learners</li>`)
    .join("");
  const buyHref = programme ? "#buy" : `${programmePagePath("cybersecure", code)}#buy`;
  return `<section class="section ${dark ? "section-dark" : "section-paper"} ca-section" id="pilot" aria-labelledby="pilot-title">
    <div class="wrap">
      <span class="section-eyebrow">Start small</span>
      <h2 class="section-title" id="pilot-title">Try it first: a 10-learner pilot or a free leadership taster</h2>
      <div class="ca-cards co-ways">
        <div class="ca-card co-way">
          <p class="co-way-tag">Paid pilot</p>
          <h3>Pilot with ${PILOT_STAFF} learners</h3>
          <p>Put ${PILOT_STAFF} staff through the self-paced programme, review their results with us, then decide on a wider rollout. Prices in ${escapeHtml(COUNTRIES[code].name)}, including the 10% volume discount:</p>
          <ul class="ca-list">${prices}</ul>
          <div class="ca-ctas"><a class="btn btn-signal btn-lg" href="${buyHref}" data-pilot-cta>Buy a ${PILOT_STAFF}-learner pilot</a></div>
        </div>
        <div class="ca-card co-way">
          <p class="co-way-tag">Free</p>
          <h3>Leadership taster session</h3>
          <p>A short live online session for your leadership team: the cyber and AI risks and opportunities for your organisation, and what training would change. Free, with no obligation.</p>
          <div class="ca-ctas"><a class="btn ${dark ? "btn-outline-light" : "btn-outline-ink"} btn-lg" href="#enquiry" data-intent="taster">Request a free taster</a></div>
        </div>
      </div>
    </div>
  </section>`;
}

// ---- PDFs to forward to whoever signs off.
export function forwardSection(code: CountryCode, programme: PricedProgramme | null, dark: boolean): string {
  const list = programme ? [programme] : [...PRICED_PROGRAMMES];
  const items = list
    .map(
      (p) => `<li><a href="${brochurePath(p, code)}" download>${escapeHtml(PROGRAMME_NAMES[p])} brochure (PDF)</a></li>
          <li><a href="${businessCasePath(p, code)}" download>${escapeHtml(PROGRAMME_NAMES[p])}: one-page business case (PDF)</a></li>`,
    )
    .join("");
  return `<section class="section ${dark ? "section-dark" : "section-paper"} ca-section" id="forward" aria-labelledby="forward-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">For the person who signs it off</span>
      <h2 class="section-title" id="forward-title">Something to forward</h2>
      <p class="ca-p">Need approval inside your organisation? Download a brochure and a one-page business case with costs in ${escapeHtml(COUNTRIES[code].site.currency.code)}, the outcomes to expect and how the training supports your obligations under ${escapeHtml(DATA_PROTECTION_LAW[code])}.</p>
      <ul class="ca-links co-downloads">${items}</ul>
    </div>
  </section>`;
}
