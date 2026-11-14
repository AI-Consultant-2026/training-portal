import { COUNTRIES, CountryCode, MARKET_ORDER, formatMoney } from "../constants/countries";
import { CORPORATE_PRICES, PAYMENT_METHODS, PRICED_PROGRAMMES, PROGRAMME_NAMES, PricedProgramme, invoiceSentence, seatPrice } from "../constants/corporatePricing";
import { DATA_PROTECTION_LAW } from "./corporateLocal";

// The buying aids shared by every corporate page (2026-11-13, owner's 12-point conversion
// review): business outcomes before the module list, the two ways to buy (self-paced per
// learner, or a private company portal for the whole organisation, with a worked example for 25
// staff), December 2026 company onboarding slots, a paid 10-learner pilot and a free leadership preview,
// a "Book a 20-minute call" link, and the PDFs a buyer can forward for sign-off.
// Delivery (owner, 2026-11-13): corporate training is ONLINE and IN-HOUSE only, meaning
// self-paced online courses private to the client's own staff. It is NOT live, NOT
// facilitator-led and NOT hybrid; never offer sessions, workshops or training at offices.
// No view imports, so every corporate page module can use it.

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const money = (code: CountryCode, amount: number) => formatMoney(code, amount);

// ---- Company onboarding slots left for December 2026 (owner, 2026-11-13): ONE count shared
// by all three programmes. A slot is one organisation's onboarding: portal setup, the staff
// sign-up link and a manager login. It is not an intake or a cohort: individual places bought
// online start today. Keep ONBOARDING.slotsLeft true and current. At 0 the onboarding line,
// the reserve buttons and the FAQ mentions disappear everywhere (December full).
export const COHORT_NAME = "December 2026";
export const ONBOARDING = { slotsLeft: 10 };
export const RESERVE_CTA = "Reserve a December onboarding slot";
export const ONBOARDING_COVERS =
  "Each slot covers portal setup, your staff sign-up link and a manager login for one organisation.";
export const PLACES_START_TODAY = "Individual places bought online start today.";
const SHARED = "shared across our three corporate programmes";

// The programme argument is kept for call sites; the count is shared.
export function hasOnboardingSlots(_programme?: PricedProgramme): boolean {
  return ONBOARDING.slotsLeft > 0;
}

export function slotsLeft(_programme?: PricedProgramme): string {
  const n = ONBOARDING.slotsLeft;
  return `${n} ${COHORT_NAME} slot${n === 1 ? "" : "s"} left`;
}

/** The onboarding line as plain text (FAQs, JSON-LD); just "places start today" once December is full. */
export function cohortSentence(_programme?: PricedProgramme): string {
  if (!hasOnboardingSlots()) return PLACES_START_TODAY;
  return `Company onboarding: ${slotsLeft()}. ${ONBOARDING_COVERS} ${PLACES_START_TODAY}`;
}

/** For pages and answers that cover all the programmes: says the count is shared. */
export function onboardingSummary(): string {
  if (!hasOnboardingSlots()) return PLACES_START_TODAY;
  return `Company onboarding: ${slotsLeft()}, ${SHARED}. ${ONBOARDING_COVERS} ${PLACES_START_TODAY}`;
}

/** shared = true on pages that show more than one programme, so 10 is not read as 10 each. */
export function cohortNotice(_programme?: PricedProgramme, shared = false): string {
  if (!hasOnboardingSlots()) return "";
  return `<p class="ca-booked"><strong>Company onboarding: ${slotsLeft()}${shared ? `, ${SHARED}` : ""}.</strong> ${ONBOARDING_COVERS} ${PLACES_START_TODAY}</p>`;
}

export function reserveButton(_programme?: PricedProgramme): string {
  if (!hasOnboardingSlots()) return "";
  return `<a class="btn btn-signal btn-lg" href="#enquiry" data-intent="reserve" data-places="${ONBOARDING.slotsLeft}">${escapeHtml(RESERVE_CTA)}</a>`;
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

// Watermarked example documents (services/corporateSamples.service.ts).
export const SAMPLE_CERTIFICATE_PATH = "/corporate-training/samples/certificate.pdf";
export const SAMPLE_ATTENDANCE_PATH = "/corporate-training/samples/attendance-record.pdf";

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
          h: "Your own AI and cyber champions",
          p: "IT, security, risk and data staff who can assess AI tools, recognise AI-enabled threats and support colleagues across the business.",
        },
        {
          h: "Audit-ready AI governance",
          p: "Participants draft the AI policies, risk assessments and controls your organisation needs before AI use grows further.",
        },
        {
          h: "A real problem worked on",
          p: "Each capstone tackles a current challenge from your organisation, so the programme ends with a result you can use.",
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
      <h2 class="section-title" id="delivery-title">Online: per learner, or in a private company portal</h2>
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
          <p class="co-way-tag">Option 2 &middot; by proposal</p>
          <h3>Private company portal (by proposal)</h3>
          <p class="co-way-explainer">Your organisation gets its own private space in the Paleon portal. Staff join with one sign-up link, and your HR or L&amp;D lead tracks progress from a manager login.</p>
          <p class="co-way-price"><strong>A private online space for your staff only</strong></p>
          <ul class="ca-list">
            <li>Your own company space in the Paleon portal, for staff anywhere in ${escapeHtml(country)}; staff join with your company sign-up link</li>
            <li>For whole departments or an organisation-wide rollout</li>
            <li>${escapeHtml(invoiceSentence(code))}</li>
            <li>Managers see each learner&rsquo;s progress; completion and attendance records for your files</li>
          </ul>
          <p class="co-way-example"><strong>Worked example:</strong> tell us your departments and headcount in a 20-minute call, and we reply with a proposal within one working day. All training is online and self-paced: there are no live or facilitator-led sessions.</p>
          <div class="ca-ctas"><a class="btn ${dark ? "btn-outline-light" : "btn-outline-ink"} btn-lg" href="#enquiry" data-intent="proposal">Request a Company Portal Proposal</a></div>
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
          <p class="co-way-tag">Option 2 &middot; by proposal</p>
          <h3>Private company portal (by proposal)</h3>
          <p class="co-way-explainer">Your organisation gets its own private space in the Paleon portal. Staff join with one sign-up link, and your HR or L&amp;D lead tracks progress from a manager login.</p>
          <p>A private company space in the Paleon portal for your staff only, in Nigeria, South Africa, Kenya and Ghana. Staff join with your sign-up link and managers track progress. ${escapeHtml(invoiceSentence(code))} All training is self-paced online, never live or facilitator-led.</p>
          <div class="ca-ctas"><a class="btn ${dark ? "btn-outline-light" : "btn-outline-ink"} btn-lg" href="#enquiry" data-intent="proposal">Request a Company Portal Proposal</a></div>
        </div>
      </div>`;
}

// ---- Pilot (10 learners at the normal 10-learner price) and free leadership preview.
export function pilotTotal(programme: PricedProgramme, code: CountryCode): number {
  return seatPrice(programme, code, PILOT_STAFF) * PILOT_STAFF;
}

const PILOT_GUARANTEE_TERMS = "if you order a wider rollout within 90 days, the full pilot fee is credited against it.";
export const PILOT_GUARANTEE = `Pilot guarantee: ${PILOT_GUARANTEE_TERMS}`;

/** Pilot prices. On a country page only that country's column (owner, 2026-11-13: "show only
 * the local set"); on the homepage with no country chosen (code null), all four countries. */
function pilotTable(code: CountryCode | null, list: PricedProgramme[]): string {
  const order = code ? [code] : [...MARKET_ORDER];
  const head = order.map((k) => `<th scope="col">${escapeHtml(COUNTRIES[k].name)}</th>`).join("");
  const rows = list
    .map(
      (p) =>
        `<tr><th scope="row">${escapeHtml(PROGRAMME_NAMES[p])}</th>${order
          .map((k) => `<td${k === code ? ' class="co-here"' : ""}>${escapeHtml(money(k, pilotTotal(p, k)))}</td>`)
          .join("")}</tr>`,
    )
    .join("");
  return `<div class="cp-table-wrap co-pilot-table"><table class="cp-table"><caption>${PILOT_STAFF}-learner pilot, self-paced, including the 10% volume discount</caption><thead><tr><th scope="col">Programme</th>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

/** `code` null = the homepage with no country chosen: the buttons go to each country's own
 * corporate page (its pilot section), never to Nigeria's pages for everyone. */
export function pilotSection(code: CountryCode | null, programme: PricedProgramme | null, dark: boolean): string {
  const list = programme ? [programme] : [...PRICED_PROGRAMMES];
  // On a country page each pilot button goes to the buy form of its own programme, in that country.
  const buttons = code
    ? list
        .map(
          (p) =>
            `<a class="btn ${list.length === 1 ? "btn-signal btn-lg" : "btn-signal"}" href="${programme ? "#buy" : `${programmePagePath(p, code)}#buy`}" data-pilot-cta data-programme="${PROGRAMME_SLUGS[p]}">${
              list.length === 1 ? `Buy a ${PILOT_STAFF}-learner pilot` : `Pilot ${escapeHtml(PROGRAMME_NAMES[p])}`
            }</a>`,
        )
        .join("")
    : MARKET_ORDER.map(
        (k) =>
          `<a class="btn btn-signal" href="${COUNTRIES[k].site.path}/corporate-training#pilot" data-pilot-cta data-country="${k}">Pilot in ${escapeHtml(COUNTRIES[k].name)}</a>`,
      ).join("");
  const where = code ? `Pilot prices in ${escapeHtml(COUNTRIES[code].name)}:` : "Pilot prices in each country (choose yours to buy):";
  return `<section class="section ${dark ? "section-dark" : "section-paper"} ca-section" id="pilot" aria-labelledby="pilot-title">
    <div class="wrap">
      <span class="section-eyebrow">Start small</span>
      <h2 class="section-title" id="pilot-title">Try it first: a 10-learner pilot or a free leadership preview</h2>
      <div class="ca-cards co-ways">
        <div class="ca-card co-way">
          <p class="co-way-tag">Paid pilot</p>
          <h3>Pilot with ${PILOT_STAFF} learners</h3>
          <p>Put ${PILOT_STAFF} staff through the self-paced programme, review their results with us, then decide on a wider rollout. ${where}</p>
          ${pilotTable(code, list)}
          <p><strong>${escapeHtml(PILOT_GUARANTEE)}</strong></p>
          <div class="ca-ctas">${buttons}</div>
        </div>
        <div class="ca-card co-way">
          <p class="co-way-tag">Free</p>
          <h3>Leadership preview</h3>
          <p>Free self-paced online access to sample modules for your leadership team, so they can see the cyber and AI risks and opportunities the programme covers before you buy. One short form, and the sample modules open straight away.</p>
          <div class="ca-ctas"><a class="btn ${dark ? "btn-outline-light" : "btn-outline-ink"} btn-lg" href="${previewSignupPath(code, programme)}" data-preview-cta>Get the free preview</a></div>
        </div>
      </div>
    </div>
  </section>`;
}

// ---- Refund, cancellation and unused-seat terms (owner-approved 2026-11-13), shown next to
// every buy form, in the pilot section and in the PDFs.
export const BUYING_TERMS: { h: string; p: string }[] = [
  {
    h: "Self-paced places",
    p: "Full refund within 14 days of purchase if no learner has started. Once learners have started there is no refund, but unused seats can be given to other staff at any time during the 12 months' access.",
  },
  {
    h: "Private company portals",
    p: "The same refund and unused-seat terms as self-paced places.",
  },
  { h: "Pilot guarantee", p: PILOT_GUARANTEE_TERMS.replace(/^i/, "I") },
];

export function termsBlock(dark = false): string {
  return `<div class="co-terms${dark ? " co-terms-dark" : ""}" id="terms">
      <h3 class="cp-subtitle">Refunds, cancellations and unused seats</h3>
      <ul class="ca-list">${BUYING_TERMS.map((x) => `<li><strong>${escapeHtml(x.h)}:</strong> ${escapeHtml(x.p)}</li>`).join("")}</ul>
    </div>`;
}

// ---- PDFs to forward to whoever signs off.
export function forwardSection(code: CountryCode | null, programme: PricedProgramme | null, dark: boolean): string {
  const list = programme ? [programme] : [...PRICED_PROGRAMMES];
  const items = (k: CountryCode) =>
    `<li><a href="${howItWorksPdfPath(k)}" download>How the company portal works: from order to certificate (one page, PDF)</a></li>` +
    list
      .map(
        (p) => `<li><a href="${brochurePath(p, k)}" download>${escapeHtml(PROGRAMME_NAMES[p])} brochure (PDF)</a></li>
          <li><a href="${businessCasePath(p, k)}" download>${escapeHtml(PROGRAMME_NAMES[p])}: one-page business case (PDF)</a></li>`,
      )
      .join("");
  // A country page shows only its own PDFs (owner, 2026-11-13). The homepage with no country
  // chosen lists each country's set under its name.
  const downloads = code
    ? `<p class="ca-p">Need approval inside your organisation? Download a brochure and a one-page business case with costs in ${escapeHtml(COUNTRIES[code].site.currency.code)}, the outcomes to expect and how the training supports your obligations under ${escapeHtml(DATA_PROTECTION_LAW[code])}.</p>
      <ul class="ca-links co-downloads">${items(code)}</ul>`
    : `<p class="ca-p">Need approval inside your organisation? Download a brochure and a one-page business case for your country, with costs in your currency, the outcomes to expect and your data protection law.</p>
      ${MARKET_ORDER.map((k) => `<h3 class="cp-subtitle">${escapeHtml(COUNTRIES[k].name)} (${escapeHtml(COUNTRIES[k].site.currency.code)})</h3>
      <ul class="ca-links co-downloads">${items(k)}</ul>`).join("\n      ")}`;
  return `<section class="section ${dark ? "section-dark" : "section-paper"} ca-section" id="forward" aria-labelledby="forward-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">For the person who signs it off</span>
      <h2 class="section-title" id="forward-title">Something to forward</h2>
      ${downloads}
      <h3 class="cp-subtitle">What you hold at audit time</h3>
      <p class="ca-p">Every learner gets a certificate of completion and a dated attendance record showing each module, quiz and status. Your HR or L&amp;D lead gets a manager login showing the seats used and each learner's progress, so the evidence is ready for an auditor, regulator or insurer.</p>
      <ul class="ca-links co-samples">
          <li><a href="${SAMPLE_CERTIFICATE_PATH}" target="_blank" rel="noopener">Sample certificate of completion (PDF)</a></li>
          <li><a href="${SAMPLE_ATTENDANCE_PATH}" target="_blank" rel="noopener">Sample attendance record (PDF)</a></li>
      </ul>
    </div>
  </section>`;
}

// ---- Free leadership preview (owner, 2026-11-13): a dedicated one-step sign-up page that
// opens sample modules straight away, instead of the general enquiry form.
export const PREVIEW_PATH = "/corporate-training/free-preview";
export function previewSignupPath(code: CountryCode | null, programme: PricedProgramme | null): string {
  const q = [code ? `country=${code.toLowerCase()}` : "", programme ? `programme=${programme}` : ""].filter(Boolean).join("&");
  return q ? `${PREVIEW_PATH}?${q}` : PREVIEW_PATH;
}

// ---- How the company portal works (owner, 2026-11-14): the buy-online flow for company
// managers, shown on the page (not behind a form) on the homepage, the 4 country pages and
// the 12 programme pages, plus a one-page PDF per country to forward. One source of truth
// for the web section and the PDF (services/corporateBrochure.service.ts).
export const HOW_IT_WORKS_PDF_BASE = "/corporate-training/how-the-company-portal-works";

export function howItWorksPdfPath(code: CountryCode): string {
  return `${HOW_IT_WORKS_PDF_BASE}-${code.toLowerCase()}.pdf`;
}

/** "/corporate-training/how-the-company-portal-works-za.pdf" slug part -> code, or null. */
export function parseHowItWorksSlug(cc: string): CountryCode | null {
  return /^(ng|za|ke|gh)$/.test(cc) ? (cc.toUpperCase() as CountryCode) : null;
}

export interface PortalStep { h: string; p: string }
export interface PortalStage { title: string; steps: PortalStep[] }

function paymentLine(code: CountryCode | null): string {
  return code
    ? `Pay securely online by ${PAYMENT_METHODS[code]}.`
    : "Pay securely online by card, bank transfer, USSD, mobile money or M-Pesa, depending on your country.";
}

export function portalStages(code: CountryCode | null): PortalStage[] {
  return [
    {
      title: "Buy",
      steps: [
        { h: "Choose your seats", p: "Pick a programme and enter the number of learners and your organisation's details. The price, including any volume discount, is worked out for you automatically." },
        { h: "Pay online or by invoice", p: `${paymentLine(code)} If your finance team prefers, tick “Send us an invoice” and we'll email one within one working day.` },
      ],
    },
    {
      title: "Set up",
      steps: [
        { h: "Your company portal is created", p: "Once payment is confirmed, we create your company's private space on the Paleon portal and email you your staff sign-up link." },
        { h: "Share the link with your staff", p: "Send it to your team by email or WhatsApp. Each person opens it, creates their own account and confirms their email address. It takes about two minutes." },
      ],
    },
    {
      title: "Learn and track",
      steps: [
        { h: "Staff start straight away", p: "When they log in at paleontraining.com, the course is already on their dashboard. They work through short lessons, practical exercises and quizzes on a phone, laptop or office computer, whenever it suits their work." },
        { h: "You track progress", p: "Sign up with the same email address used on the order and your account becomes the manager login. You see who has joined, how far each person has got and who has finished." },
        { h: "Certificates on completion", p: "Each staff member who finishes receives a certificate of completion, and a dated attendance record is available for your training files." },
      ],
    },
  ];
}

export const PORTAL_BENEFITS: PortalStep[] = [
  { h: "No time away from work", p: "Staff learn in short sessions around their duties, with no need to bring people in from other branches or sites." },
  { h: "No travel or venue costs", p: "Everyone, in every location, gets the same training at the same price." },
  { h: "Start today", p: "There's no waiting for a training date: seats can be used as soon as payment is confirmed." },
  { h: "Full visibility for HR", p: "You see each person's progress yourself, without chasing anyone." },
  { h: "Flexible seats", p: "An unused seat can be given to another member of staff at any time during the 12 months' access." },
  { h: "Low risk", p: "Full refund within 14 days of purchase if no learner has started." },
  { h: "Practical, job-focused content", p: "Short lessons built around real workplace tasks, with examples adapted to your sector, not theory." },
  { h: "Start small if you prefer", p: "Test it with one team in a 10-learner pilot. The pilot fee is credited if you order a wider rollout within 90 days." },
];

export const HOW_IT_WORKS_TITLE = "How the company portal works";

export function howItWorksSection(code: CountryCode | null, programme: PricedProgramme | null, buyHref: string): string {
  let n = 0;
  const stages = portalStages(code)
    .map(
      (s) => `<div class="co-how-stage">
          <h3 class="co-how-stage-title">${escapeHtml(s.title)}</h3>
          <ol class="co-how-steps">${s.steps
            .map((st) => `<li value="${++n}"><span class="co-how-num" aria-hidden="true">${n}</span><span><strong>${escapeHtml(st.h)}.</strong> ${escapeHtml(st.p)}</span></li>`)
            .join("")}</ol>
        </div>`,
    )
    .join("");
  const benefits = PORTAL_BENEFITS.map((b) => `<li class="co-how-benefit"><strong>${escapeHtml(b.h)}.</strong> ${escapeHtml(b.p)}</li>`).join("");
  const pdf = code
    ? `<a href="${howItWorksPdfPath(code)}" download>Download this as a one-page PDF</a> to forward to your MD or finance team.`
    : `Download this as a one-page PDF to forward to your MD or finance team: ${MARKET_ORDER.map((k) => `<a href="${howItWorksPdfPath(k)}" download>${escapeHtml(COUNTRIES[k].name)}</a>`).join(" &middot; ")}.`;
  return `<section class="section section-paper ca-section co-how" id="how-it-works" aria-labelledby="how-it-works-title">
    <div class="wrap">
      <span class="section-eyebrow">For company managers and HR</span>
      <h2 class="section-title" id="how-it-works-title">${HOW_IT_WORKS_TITLE}</h2>
      <p class="ca-p">Buy a seat for each member of staff, and they start training online the same day, in your own private company portal. Seven steps from order to certificate:</p>
      <div class="co-how-stages">${stages}</div>
      <h3 class="cp-subtitle">Why companies choose portal training</h3>
      <ul class="co-how-benefits">${benefits}</ul>
      <div class="ca-ctas"><a class="btn btn-signal btn-lg" href="${buyHref}">See prices and buy seats</a> <a class="btn btn-outline-ink btn-lg" href="${previewSignupPath(code, programme)}" data-preview-cta>Get the free preview</a></div>
      <p class="ca-p ca-hint">${pdf}</p>
    </div>
  </section>`;
}
