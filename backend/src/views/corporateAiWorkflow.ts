import { DATA_PROTECTION_LAW, areaServed, cityList, countryCorporatePath, deliveryPhrase, ORGANIZATION_LD } from "./corporateLocal";
import { COUNTRIES, CountryCode, MARKET_ORDER } from "../constants/countries";
import {
  CORPORATE_DELIVERY,
  CORPORATE_DEPARTMENTS,
  CORPORATE_EMPLOYEE_BANDS,
  CORPORATE_REQUIREMENTS,
  CorporateProgramme,
} from "../validators/corporateLeads.validators";
import { flagSvg } from "./flags";
import { CORPORATE_AI_CONTENT, CorporateBlock, CorporatePageContent } from "./corporateAiWorkflowContent";
import {
  ORIGIN,
  PageContext,
  SEARCH_OVERLAY,
  coursePagePath,
  escapeHtml,
  corporateUtilBar, footer,
  head,
  header,
  scripts,
  whatsappAttr,
} from "./countryHome";
import type { PricedProgramme } from "../constants/corporatePricing";
import { hubPricingFaqAnswer, pricingFaqAnswer, pricingSection, pricingSummaryTable } from "./corporatePricing";
import { trainerPersonLd, trainerStandards } from "./trainerStandards";
import {
  CALL_URL,
  cohortNotice,
  cohortSentence,
  RESERVE_CTA,
  callButton,
  forwardSection,
  outcomeList,
  outcomesSection,
  pilotSection,
  readinessButton,
  reserveButton,
  hasOnboardingSlots,
  onboardingSummary,
  waysToBuyBrief,
  waysToBuySection,
} from "./corporateOffers";
import { SECTORS, SECTORS_PATH } from "./corporateSectorsData";

// The "AI Workflow Productivity & Process Transformation" corporate pages (2026-11-02):
// one per country at /<cc>/corporate-training/ai-workflow-productivity. Copy lives in
// corporateAiWorkflowContent.ts. Every button opens the same enquiry form with the
// visitor's intent (proposal, reserve, taster) preselected; the form posts to
// /api/leads/corporate via corporate-ai.js. Since 2026-11-13 every country offers
// online, in-house training only (self-paced, private to the client's staff; never live,
// facilitator-led or hybrid); Nigeria also mentions ITF reimbursement.

export const CORPORATE_AI_SLUG = "corporate-training/ai-workflow-productivity";
// The corporate training hub (2026-11-02), the homepage since 2026-11-08 (it was
// /corporate-training, which now redirects here): x-default for the four country pages.
export const CORPORATE_HUB_PATH = "/";

export function corporateAiPath(country: CountryCode): string {
  return `${COUNTRIES[country].site.path}/${CORPORATE_AI_SLUG}`;
}

// The CyberSecure Workforce pages (2026-11-02, views/corporateCyberSecure.ts). Defined here
// so this file can link to them without a circular import.
export const CYBERSECURE_SLUG = "corporate-training/cybersecure-workforce";

export function cyberSecurePath(country: CountryCode): string {
  return `${COUNTRIES[country].site.path}/${CYBERSECURE_SLUG}`;
}

// The AI + Cybersecurity Professional Accelerator pages (2026-11-02, views/corporateAccelerator.ts).
export const ACCELERATOR_SLUG = "corporate-training/ai-cybersecurity-professional-accelerator";

export function acceleratorPath(country: CountryCode): string {
  return `${COUNTRIES[country].site.path}/${ACCELERATOR_SLUG}`;
}

const CONSULTATION = "Book a Consultation";
// The main CTA (2026-11-12, owner request): goes to the "Buy learner places online" form,
// on the page itself (#buy) or, on pages without one, on the country's programme page.
export const WORKFORCE_CTA = "Book Corporate Workforce Training";
// The enquiry form (2026-11-12, owner request): one button, always a proposal request;
// the consultation/proposal choice at the top of the form was removed.
const ENQUIRY_SUBMIT = "Request In-House Training Proposal";
const PROPOSAL = "Request In-House Training Proposal";
const WHATSAPP_LINK = "https://wa.me/447508823495";

// Escape, then turn the copy's **bold** marks into <strong>.
// Where the "up to 50% of the ITF levy" claim comes from (2026-11-13 review): a law firm's
// summary of the Act, since the ITF's own site does not publish it in a linkable form.
export const ITF_SOURCE_NAME = "Industrial Training Fund (Amendment) Act 2011";
export const ITF_SOURCE_URL =
  "https://www.mondaq.com/nigeria/employee-rights-labour-relations/199880/what-you-should-know-and-do-about-the-industrial-training-fund-amendment-act-2011";

export function rich(value: string): string {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(escapeHtml(ITF_SOURCE_NAME), `<a href="${ITF_SOURCE_URL}" target="_blank" rel="noopener">${escapeHtml(ITF_SOURCE_NAME)}</a>`);
}

// "**Label:** rest" -> ["Label", "rest"]; null when the paragraph doesn't start with a label.
function labelled(value: string): [string, string] | null {
  const m = /^\*\*([^*]+?):\*\*\s*(.*)$/.exec(value);
  return m ? [m[1], m[2]] : null;
}

function field(c: CorporatePageContent, section: string, label: string): string {
  for (const block of c.sections[section].blocks) {
    if (!("p" in block)) continue;
    const l = labelled(block.p);
    if (l && l[0].toLowerCase().startsWith(label.toLowerCase())) return l[1];
  }
  return "";
}

export function ctaButton(label: string, dark: boolean, buyHref = "#buy", programme: PricedProgramme = "ai-workflow"): string {
  // Any "Reserve ..." label in the page content (e.g. "Reserve a December 2026 cohort") is the
  // onboarding-slot button, which disappears once December is full.
  if (label === RESERVE_CTA || /^reserve\b/i.test(label)) return reserveButton(programme);
  if (label === WORKFORCE_CTA) {
    return `<a class="btn btn-signal btn-lg" href="${buyHref}" data-buy-cta>${escapeHtml(label)}</a>`;
  }
  const intent = /proposal/i.test(label) ? "proposal" : "consultation";
  const cls = intent === "proposal" ? (dark ? "btn btn-outline-light btn-lg" : "btn btn-outline-ink btn-lg") : "btn btn-signal btn-lg";
  return `<a class="${cls}" href="#enquiry" data-intent="${intent}">${escapeHtml(label)}</a>`;
}

// A section's blocks: paragraphs, lists, two-column tables (rendered as cards) and the
// "**... CTA ...:** label" lines (rendered as buttons).
function blocks(list: CorporateBlock[], dark: boolean, listClass = "ca-list"): string {
  return list
    .map((block) => {
      if ("ul" in block) {
        return `<ul class="${listClass}">${block.ul.map((item) => `<li>${rich(item)}</li>`).join("")}</ul>`;
      }
      if ("table" in block) {
        const cells = block.table.slice(2);
        const cards: string[] = [];
        for (let i = 0; i + 1 < cells.length; i += 2) {
          cards.push(`<div class="ca-card"><h3>${rich(cells[i])}</h3><p>${rich(cells[i + 1])}</p></div>`);
        }
        return `<div class="ca-cards">${cards.join("")}</div>`;
      }
      const l = labelled(block.p);
      if (l && /cta/i.test(l[0])) return `<div class="ca-ctas">${ctaButton(l[1], dark)}</div>`;
      return `<p class="ca-p">${rich(block.p)}</p>`;
    })
    .join("\n");
}

export function heading(h: string): { eyebrow: string; title: string } {
  const [first, rest] = h.split(" — ");
  return rest ? { eyebrow: first, title: rest.charAt(0).toUpperCase() + rest.slice(1) } : { eyebrow: "", title: first };
}

function image(cc: string, slot: string, alt: string, extra = ""): string {
  return `<img class="ca-img${extra}" src="/images/corporate-ai/${cc}-${slot}.jpg" alt="${escapeHtml(alt)}" width="1200" height="675" loading="lazy" decoding="async">`;
}

function section(
  c: CorporatePageContent,
  key: string,
  opts: { id: string; dark?: boolean; titleOverride?: string; eyebrowOverride?: string; aside?: string; listClass?: string; after?: string },
): string {
  const s = c.sections[key];
  const h = heading(s.h);
  const eyebrow = opts.eyebrowOverride ?? h.eyebrow;
  const title = opts.titleOverride ?? h.title;
  const body = blocks(s.blocks, Boolean(opts.dark), opts.listClass) + (opts.after ?? "");
  return `<section class="section ${opts.dark ? "section-dark" : "section-paper"} ca-section" id="${opts.id}" aria-labelledby="${opts.id}-title">
    <div class="wrap${opts.aside ? " ca-split" : ""}">
      <div class="ca-body">
        ${eyebrow ? `<span class="section-eyebrow">${escapeHtml(eyebrow)}</span>` : ""}
        <h2 class="section-title" id="${opts.id}-title">${escapeHtml(title)}</h2>
        ${body}
      </div>
      ${opts.aside ? `<div class="ca-aside">${opts.aside}</div>` : ""}
    </div>
  </section>`;
}

// Nigeria's corporate hub hero, also used on the NG AI Workflow page since 2026-11-12 (user request).
export const NG_CORPORATE_HERO_ALT =
  "Three Nigerian colleagues, a man in a native kaftan-style top and two women, one in an Ankara skirt, working on a laptop in a Lagos office overlooking the Lekki-Ikoyi bridge";

function hero(code: CountryCode, c: CorporatePageContent): string {
  const cc = code.toLowerCase();
  const heroSrc = code === "NG" ? "/images/corporate-ai/ng-corporate-hero.jpg" : `/images/corporate-ai/${cc}-hero.jpg`;
  const heroAlt = code === "NG" ? NG_CORPORATE_HERO_ALT : c.images.hero;
  const trust = field(c, "Hero", "Trust line")
    .split(" · ")
    .map((t) => `<li>${rich(t)}</li>`)
    .join("");
  return `<section class="hero ca-hero" id="top">
    <div class="wrap cs-crumb-wrap"><p class="pw-crumb"><a href="${countryCorporatePath(code)}">Corporate training in ${escapeHtml(COUNTRIES[code].name)}</a> <span aria-hidden="true">/</span> AI training in ${escapeHtml(COUNTRIES[code].name)}</p></div>
    <div class="wrap ca-hero-grid">
      <div class="hero-inner ca-hero-copy">
        <span class="eyebrow">${escapeHtml(field(c, "Hero", "Eyebrow"))}</span>
        <h1 class="hero-title ca-hero-title">${escapeHtml(field(c, "Hero", "H1"))}</h1>
        <p class="ca-headline">${rich(field(c, "Hero", "Headline line"))}</p>
        <p class="hero-sub">${rich(field(c, "Hero", "Supporting statement"))}</p>
        ${cohortNotice("ai-workflow")}
        <div class="hero-ctas">
          ${reserveButton("ai-workflow")}
          ${readinessButton(code, true)}
        </div>
        <ul class="ca-trust">${trust}</ul>
      </div>
      <div class="ca-hero-media">
        <img src="${heroSrc}" alt="${escapeHtml(heroAlt)}" width="1600" height="900" fetchpriority="high" decoding="async">
      </div>
    </div>
  </section>
  <section class="ca-definition" aria-label="About the programme">
    <div class="wrap"><p>${rich(field(c, "Hero", "Definition box"))}</p></div>
  </section>`;
}

// Three extra FAQs per country (2026-11-08, local SEO): cities, cost, combining with
// cybersecurity training. They go before the proposal question and feed the FAQPage JSON-LD.
function extraFaqs(code: CountryCode): { q: string; a: string }[] {
  const country = COUNTRIES[code].name;
  return [
    {
      q: `Do you offer AI training for employees in ${cityList(code)}?`,
      a: `Yes. AI Workflow Productivity & Process Transformation is delivered ${deliveryPhrase(code)} for companies in ${cityList(code)} and anywhere else in ${country}. Buy self-paced places per employee, or an in-house rollout for your whole organisation. ${cohortSentence("ai-workflow")}`,
    },
    {
      q: "When can we start?",
      a: `${cohortSentence("ai-workflow")}${hasOnboardingSlots("ai-workflow") ? " Reserve an onboarding slot now and we will complete the needs assessment with you in advance, so your teams are ready to start." : ""}`,
    },
    {
      q: "How much does corporate AI training cost?",
      a: pricingFaqAnswer(code, "ai-workflow"),
    },
    {
      q: "Can we combine AI training with cybersecurity training for our staff?",
      a: `Yes. Many organisations pair AI Workflow Productivity with CyberSecure Workforce, our cybersecurity awareness programme, so staff learn to use AI tools and to recognise the new risks they bring, such as AI-written phishing and deepfake payment requests. Both are available online and in-house for companies in ${country}, and individual places bought online start today.`,
    },
  ];
}

function faqItems(c: CorporatePageContent, code?: CountryCode): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  for (const block of c.sections["Frequently asked questions"].blocks) {
    if (!("p" in block)) continue;
    const m = /^\*\*(.+?\?)\*\*\s*(.*)$/.exec(block.p);
    if (m) out.push({ q: m[1], a: m[2] });
  }
  if (code) {
    const at = out.findIndex((f) => /request a (corporate )?proposal\?$/i.test(f.q));
    out.splice(at === -1 ? out.length : at, 0, ...extraFaqs(code));
  }
  return out;
}

function whereWeTrain(code: CountryCode): string {
  const country = COUNTRIES[code].name;
  const how =
    "Training is online and in-house: your staff learn self-paced online in a private company space that only your organisation can join. There are no live or facilitator-led sessions" +
    (code === "NG" ? ". We provide the attendance records and documentation for ITF reimbursement claims." : ".");
  return `<section class="section section-paper ca-section" id="where" aria-labelledby="where-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Where we train</span>
      <h2 class="section-title" id="where-title">AI workforce and process transformation training across ${escapeHtml(country)}</h2>
      ${cohortNotice("ai-workflow")}
      <p class="ca-p">Paleon Training runs AI Workflow Productivity &amp; Process Transformation for companies in ${escapeHtml(cityList(code))}, and anywhere else in ${escapeHtml(country)}. ${escapeHtml(how)}</p>
      <p class="ca-p">Staff study around their working day, and examples and the workplace project are adapted to your sector: banking and financial services, energy and mining, telecoms, healthcare, education, government and professional services.</p>
      <div class="ca-ctas">${reserveButton("ai-workflow")}${callButton(false)}</div>
    </div>
  </section>`;
}

function faq(code: CountryCode, c: CorporatePageContent): string {
  const items = faqItems(c, code)
    .map((f) => `<details class="ca-faq"><summary>${escapeHtml(f.q)}</summary><p>${rich(f.a)}</p></details>`)
    .join("\n");
  return `<section class="section section-paper ca-section" id="faq" aria-labelledby="faq-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Questions</span>
      <h2 class="section-title" id="faq-title">Frequently asked questions</h2>
      ${items}
    </div>
  </section>`;
}

export function options(values: readonly string[], placeholder?: string): string {
  return `${placeholder ? `<option value="">${escapeHtml(placeholder)}</option>` : ""}${values
    .map((v) => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`)
    .join("")}`;
}

function finalCopy(c: CorporatePageContent): EnquiryCopy {
  const final = c.sections["Final CTA"].blocks.filter((b): b is { p: string } => "p" in b).map((b) => b.p);
  const [title, lede, , note, contact] = final;
  return { title: (title ?? "").replace(/\*\*/g, ""), lede: lede ?? "", note: note ?? "", contact: contact ?? "" };
}

export interface EnquiryCopy {
  title: string;
  lede: string;
  note: string;
  contact: string;
}

// What changes in the enquiry form between corporate programmes (2026-11-02): the
// programme sent with the lead, the two intent labels, the requirement options and the
// submit button. corporate-ai.js reads the labels from the form's data attributes.
export interface EnquiryForm {
  programme: CorporateProgramme;
  consultation: string;
  proposal: string;
  submit: string;
  requirements: readonly string[];
  messagePlaceholder: string;
}

const AI_FORM: EnquiryForm = {
  programme: "ai-workflow",
  consultation: CONSULTATION,
  proposal: PROPOSAL,
  submit: "Request In-House Training Proposal",
  requirements: CORPORATE_REQUIREMENTS,
  messagePlaceholder: "The teams, processes or tasks you want to improve",
};

// The enquiry form (shortened 2026-11-13, owner request): name, business email,
// organisation, country and headcount only; the rest is collected on the call. `code`
// presets the country (a country page); null is the hub, where the visitor picks it.
// The buttons that open it set the intent: proposal, reserve (a December 2026 onboarding slot)
// or taster (the free self-paced leadership preview); corporate-ai.js changes the heading and button.
export function enquiry(code: CountryCode | null, copy: EnquiryCopy, form: EnquiryForm = AI_FORM): string {
  const { title, lede, note } = copy;
  const countryOptions =
    (code ? "" : '<option value="">Choose your country</option>') +
    MARKET_ORDER.map(
      (k) => `<option value="${k}"${k === code ? " selected" : ""}>${escapeHtml(COUNTRIES[k].name)}</option>`,
    ).join("") +
    '<option value="XX">Other country</option>';
  return `<section class="section section-dark ca-section" id="enquiry" aria-labelledby="enquiry-title">
    <div class="wrap ca-enquiry">
      <div class="ca-enquiry-copy">
        <span class="section-eyebrow">Talk to us</span>
        <h2 class="section-title" id="enquiry-title">${escapeHtml(title)}</h2>
        <p class="ca-p">${rich(lede)}</p>
        <p class="ca-p">${rich(note)}</p>
        <p class="ca-p"><strong>Prefer to talk first?</strong> Book a 20-minute call and we will cover your teams, goals and dates.</p>
        <div class="ca-ctas">${callButton(true)}</div>
        <p class="ca-contact">${contactLine(CORPORATE_CONTACT)}</p>
      </div>
      <form class="ca-form" id="caForm" novalidate data-country="${code ?? ""}" data-programme="${form.programme}">
        <input type="hidden" name="intent" value="proposal">
        <p class="ca-form-intent" id="caIntent" hidden></p>
        <div class="ca-grid">
          <div class="form-row"><label class="form-label" for="ca-name">Name</label><input class="form-input" id="ca-name" name="name" autocomplete="name" required maxlength="150"></div>
          <div class="form-row"><label class="form-label" for="ca-email">Business email</label><input class="form-input" id="ca-email" name="email" type="email" autocomplete="email" required maxlength="200"></div>
          <div class="form-row"><label class="form-label" for="ca-org">Organisation</label><input class="form-input" id="ca-org" name="organisation" autocomplete="organization" required maxlength="200"></div>
          <div class="form-row"><label class="form-label" for="ca-country">Country</label><select class="form-select" id="ca-country" name="country" required>${countryOptions}</select></div>
          <div class="form-row"><label class="form-label" for="ca-employees">Headcount</label><select class="form-select" id="ca-employees" name="employees" required>${options(CORPORATE_EMPLOYEE_BANDS, "Number of employees")}</select></div>
        </div>
        <div class="form-row"><label class="form-label" for="ca-message">What would you like to improve? <span class="optional">(optional)</span></label><input class="form-input" id="ca-message" name="message" maxlength="500" placeholder="For example: phishing clicks in finance, or safe AI use across the sales team"></div>
        <div class="ca-hp" aria-hidden="true"><label for="ca-website">Website</label><input id="ca-website" name="website" tabindex="-1" autocomplete="off"></div>
        <label class="consent-check"><input type="checkbox" name="consent" required> <span>I agree that Paleon Training may use these details to respond to my enquiry, as described in the <a href="/privacy">Privacy Policy</a>.</span></label>
        <label class="consent-check"><input type="checkbox" name="updates"> <span>Send me occasional updates about Paleon corporate training. I can unsubscribe at any time. <span class="optional">(optional)</span></span></label>
        <p class="form-error" id="caError" role="alert" hidden></p>
        <button type="submit" class="btn btn-signal btn-lg btn-block" id="caSubmit" data-default="${escapeHtml(ENQUIRY_SUBMIT)}">${escapeHtml(ENQUIRY_SUBMIT)}</button>
        <p class="form-note">We reply within one working day. Your details are used only to respond to this enquiry. <a href="/privacy">Privacy Policy</a>.</p>
      </form>
      <div class="ca-thanks" id="caThanks" hidden tabindex="-1">
        <h3>Thank you. Your enquiry has reached our corporate team.</h3>
        <p>What happens next: a member of the team will reply within one working day to arrange a 20-minute call about your organisation, teams and goals. After that we send a proposal shaped around what you need.</p>
        <p>Urgent question? <a href="${WHATSAPP_LINK}" target="_blank" rel="noopener">Message us on WhatsApp</a> or email <a href="mailto:corporate@paleontraining.com">corporate@paleontraining.com</a>.</p>
      </div>
    </div>
  </section>`;
}

// One corporate email and one WhatsApp line on every corporate page (2026-11-13).
export const CORPORATE_CONTACT = "Email: corporate@paleontraining.com · WhatsApp: +44 7508 823495";

// "Email: x · Call: y · WhatsApp: z" with each part linked.
export function contactLine(line: string): string {
  return line
    .split(" · ")
    .map((part) => {
      const [label, value] = part.split(": ");
      if (!value) return escapeHtml(part);
      const digits = value.replace(/[^\d+]/g, "");
      const href = /email/i.test(label)
        ? `mailto:${value}`
        : /whatsapp/i.test(label)
          ? `https://wa.me/${digits.replace("+", "")}`
          : `tel:${digits}`;
      const ext = /whatsapp/i.test(label) ? ' target="_blank" rel="noopener"' : "";
      return `${escapeHtml(label)}: <a href="${escapeHtml(href)}"${ext}>${escapeHtml(value)}</a>`;
    })
    .join(" &middot; ");
}

function related(code: CountryCode): string {
  const c = COUNTRIES[code];
  const links = [
    `<li><a href="${countryCorporatePath(code)}">All corporate training in ${escapeHtml(c.name)}</a></li>`,
    `<li><a href="${c.site.path}">Paleon Training ${escapeHtml(c.name)}</a></li>`,
    `<li><a href="${coursePagePath(code, "ai-machine-learning-fundamentals")}">AI &amp; Machine Learning Fundamentals (individual course)</a></li>`,
    code === "NG" ? `<li><a href="/digital-skills-training-nigeria">Digital skills training in Nigeria</a></li>` : "",
    code === "NG" ? `<li><a href="/executive-training">Executive and corporate training</a></li>` : "",
    `<li><a href="${cyberSecurePath(code)}">CyberSecure Workforce: cybersecurity awareness for staff</a></li>`,
    `<li><a href="${acceleratorPath(code)}">AI + Cybersecurity Professional Accelerator</a></li>`,
    `<li><a href="/consultancy">Web and AI consultancy</a></li>`,
    ...MARKET_ORDER.filter((k) => k !== code).map(
      (k) => `<li><a href="${corporateAiPath(k)}" hreflang="${COUNTRIES[k].site.locale}">Corporate AI training in ${escapeHtml(COUNTRIES[k].name)}</a></li>`,
    ),
  ].filter(Boolean);
  return `<section class="section section-paper ca-section ca-related" aria-labelledby="related-title">
    <div class="wrap">
      <h2 class="section-title" id="related-title">Related</h2>
      <ul class="ca-links">${links.join("")}</ul>
    </div>
  </section>`;
}

function jsonLd(code: CountryCode, c: CorporatePageContent, url: string): object {
  const country = COUNTRIES[code].name;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${url}#course`,
        name: "AI Workflow Productivity & Process Transformation",
        description: field(c, "Hero", "Definition box"),
        url,
        inLanguage: "en",
        audience: { "@type": "BusinessAudience", name: `Organisations in ${country}` },
        provider: { "@id": `${ORIGIN}/#organization` },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: ["online", "onsite", "blended"],
          location: { "@type": "Country", name: country },
        },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `AI workforce and process transformation training in ${country}`,
        serviceType: "AI workforce and process transformation training",
        description: c.description,
        url,
        provider: { "@id": `${ORIGIN}/#organization` },
        areaServed: areaServed(code),
        audience: { "@type": "BusinessAudience", audienceType: "Companies and organisations" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: `Corporate training in ${country}`, item: `${ORIGIN}${countryCorporatePath(code)}` },
          { "@type": "ListItem", position: 3, name: `AI training in ${country}`, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqItems(c, code).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\*\*/g, "") },
        })),
      },
      ORGANIZATION_LD,
    ],
  };
}

export function renderCorporateAiWorkflow(code: CountryCode): string {
  const c = CORPORATE_AI_CONTENT[code];
  const cc = code.toLowerCase();
  const ctx: PageContext = { country: code, hub: false, detected: null, chosen: null };
  const home = COUNTRIES[code].site.path;
  const canonicalPath = corporateAiPath(code);
  const ogImage = `${ORIGIN}/images/og/corporate-ai-workflow-${cc}.jpg`;
  const headHtml = head(ctx, {
    title: c.title,
    description: c.description,
    canonicalPath,
    alternatesFor: corporateAiPath,
    xDefault: CORPORATE_HUB_PATH,
    jsonLd: jsonLd(code, c, `${ORIGIN}${canonicalPath}`),
  })
    .replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1${ogImage}"`)
    .replace("</head>", '<link rel="stylesheet" href="/corporate-ai.css">\n</head>');

  return `${headHtml}
<body data-country="${code}"${whatsappAttr(code)}>
${SEARCH_OVERLAY}
<a class="skip-link" href="#main">Skip to main content</a>
${corporateUtilBar(home)}
${header(ctx, home, "/", true)}
<main id="main">
  ${hero(code, c)}
  ${outcomesSection("ai-workflow", code)}
  ${section(c, "Problem", { id: "problem", eyebrowOverride: "The challenge", listClass: "ca-list ca-list-x" })}
  ${section(c, "Solution", { id: "solution", dark: true, aside: image(cc, "collaboration", c.images.collaboration), listClass: "ca-steps" })}
  ${section(c, "Business benefits", { id: "benefits", eyebrowOverride: "Business benefits", titleOverride: "What your organisation gains" })}
  ${section(c, "Course structure", { id: "modules", eyebrowOverride: "Course structure", titleOverride: "10 practical modules", listClass: "ca-steps" })}
  ${section(c, "Who should attend?", { id: "attend", dark: true, eyebrowOverride: "Who it is for" })}
  ${waysToBuySection("ai-workflow", code, false)}
  ${section(c, "Practical workplace project", { id: "project", dark: true, eyebrowOverride: "Practical workplace project", aside: image(cc, "productivity", c.images.productivity) })}
  ${section(c, "Responsible AI", {
    id: "responsible-ai",
    after: `<p class="ca-p">Need security awareness for every employee? See <a href="${cyberSecurePath(code)}"><strong>CyberSecure Workforce</strong></a>, our cybersecurity awareness programme for organisations in ${escapeHtml(COUNTRIES[code].name)}. Developing specialists? See the <a href="${acceleratorPath(code)}"><strong>AI + Cybersecurity Professional Accelerator</strong></a>.</p>`,
  })}
  ${section(c, "Why Paleon Training?", { id: "why", dark: true, eyebrowOverride: "Why us" })}
  ${section(c, "Your corporate training journey", { id: "journey", eyebrowOverride: "How it works", listClass: "ca-steps" })}
  ${pricingSection(code, "ai-workflow", true)}
  ${pilotSection(code, "ai-workflow", false)}
  ${forwardSection(code, "ai-workflow", true)}
  ${whereWeTrain(code)}
  ${trainerStandards()}
  ${faq(code, c)}
  ${enquiry(code, finalCopy(c))}
  ${related(code)}
</main>
${footer(ctx, home, false, home, true)}
${scripts(ctx)}
<script src="/corporate-ai.js" defer></script>
<script src="/corporate-buy.js" defer></script>
</body>
</html>
`;
}

// ---------------------------------------------------------------------------------
// The corporate training hub at /corporate-training (2026-11-02): one page for employers
// in all four countries, pointing to the AI Workflow page for each country and to the other
// corporate offers. Same enquiry form; the visitor picks their country.

// Every country: online and in-house only, self-paced (2026-11-13).
const deliveryNote = (k: CountryCode, what: string) =>
  `Online and in-house ${what}, self-paced, across ${COUNTRIES[k].name}.${k === "NG" ? " Supports ITF reimbursement claims." : ""}`;
const HUB_CYBER_DELIVERY = Object.fromEntries(MARKET_ORDER.map((k) => [k, deliveryNote(k, "awareness training")])) as Record<CountryCode, string>;
const HUB_ACC_DELIVERY = Object.fromEntries(MARKET_ORDER.map((k) => [k, deliveryNote(k, "professional training")])) as Record<CountryCode, string>;
const HUB_DELIVERY = Object.fromEntries(MARKET_ORDER.map((k) => [k, deliveryNote(k, "training")])) as Record<CountryCode, string>;

// Country cards on the hub (2026-11-08, SEO for employers in South Africa, Kenya and Ghana).
const HUB_COUNTRY_SEO: { code: CountryCode; h: string; p: string }[] = [
  {
    code: "ZA",
    h: "Corporate training in South Africa",
    p: "Online, in-house cybersecurity awareness and AI productivity training for companies in Johannesburg, Cape Town, Durban, Pretoria and across South Africa. Staff learn to stop phishing and payment fraud, protect customer information and use AI tools safely.",
  },
  {
    code: "KE",
    h: "Corporate training in Kenya",
    p: "Online, in-house cybersecurity awareness and AI productivity training for companies in Nairobi, Mombasa, Kisumu and across Kenya. Practical self-paced courses for every employee, from the front desk to the boardroom, with examples from your sector.",
  },
  {
    code: "GH",
    h: "Corporate training in Ghana",
    p: "Online, in-house cybersecurity awareness and AI productivity training for companies in Accra, Kumasi, Tema, Takoradi and across Ghana. Teams learn to recognise scams and impersonation, protect business data and work faster with AI.",
  },
  {
    code: "NG",
    h: "Corporate training in Nigeria",
    p: "Online, in-house cybersecurity awareness and AI productivity training for organisations in Lagos, Abuja, Port Harcourt, Warri and across Nigeria. We provide the attendance records and documentation for ITF reimbursement claims.",
  },
];

const HUB_FAQ: { q: string; a: string }[] = [
  {
    q: "How is the training delivered, and who writes the courses?",
    a: "All corporate training is online and in-house: staff study self-paced in a private company space in the Paleon portal. There are no live, facilitator-led or hybrid sessions. Each course is designed by our Programme Director and written by authors with practical experience in the subject and a relevant degree or recognised industry certification, and reviewed before it is published.",
  },
  {
    q: "Which countries do you deliver corporate training in?",
    a: "Nigeria, South Africa, Kenya and Ghana. In every country training is online and in-house: your staff learn self-paced online in a private company space.",
  },
  {
    q: "Do you offer cybersecurity awareness training for companies in South Africa?",
    a: "Yes. CyberSecure Workforce is available online and in-house, self-paced, for teams across South Africa, including Johannesburg, Cape Town, Durban and Pretoria. Employees learn to spot phishing, stop payment fraud, protect customer information and report incidents quickly.",
  },
  {
    q: "Do you offer cybersecurity awareness training for companies in Kenya?",
    a: "Yes. CyberSecure Workforce is available online and in-house, self-paced, for teams across Kenya, including Nairobi, Mombasa and Kisumu. It is written for non-technical staff and uses realistic workplace scenarios.",
  },
  {
    q: "Do you offer cybersecurity awareness training for companies in Ghana?",
    a: "Yes. CyberSecure Workforce is available online and in-house, self-paced, for teams across Ghana, including Accra, Kumasi, Tema and Takoradi. Staff learn to recognise scams, impersonation and fake payment requests, and to protect business information.",
  },
  {
    q: "Do you offer AI training for employees in South Africa, Kenya and Ghana?",
    a: `Yes. AI Workflow Productivity & Process Transformation is available online and in-house in all three countries, self-paced, and the AI + Cybersecurity Professional Accelerator trains IT, security, risk and data teams. ${onboardingSummary()}`,
  },
  {
    q: "What is AI Workflow Productivity & Process Transformation?",
    a: "Our corporate programme that teaches employees to use AI tools such as ChatGPT, Claude and Gemini in their daily work. Staff learn to save time, improve quality and redesign repetitive processes, safely and with human review.",
  },
  {
    q: "What is CyberSecure Workforce?",
    a: "Our corporate cybersecurity awareness programme. Employees learn to recognise phishing, payment fraud and impersonation, protect business information, use AI tools safely and report suspicious activity quickly. Twelve practical modules for non-technical staff, from the boardroom to the front desk.",
  },
  {
    q: "What is the AI + Cybersecurity Professional Accelerator?",
    a: "Our professional-level programme for selected staff such as IT, security, risk, data and digital teams. Participants learn to use AI in their work, understand the cyber risks AI brings, and support secure AI adoption. Twelve modules and a capstone project on a real challenge from their organisation.",
  },
  {
    q: "Which programme is right for us?",
    a: "AI Workflow Productivity helps every team work faster with AI. CyberSecure Workforce gives every employee practical cybersecurity awareness. The AI + Cybersecurity Professional Accelerator develops the professionals who will lead secure AI adoption. Many organisations combine them.",
  },
  {
    q: "Can the training be customised for our organisation?",
    a: "Yes. We adapt examples, exercises and the workplace project to your sector, departments and the tools you use.",
  },
  {
    q: "How much does corporate training cost?",
    a: hubPricingFaqAnswer(),
  },
  {
    q: "Can you provide attendance records?",
    a: "Yes. For company groups we provide attendance records and a programme outline for your internal reporting.",
  },
  {
    q: "Can Nigerian employers claim ITF reimbursement?",
    a: "Yes, if your organisation pays the ITF training levy: the ITF can refund up to 50% of the levy paid when it approves your training programme (source: Industrial Training Fund (Amendment) Act 2011). We provide attendance records and programme documentation.",
  },
  {
    q: "How quickly will you reply to an enquiry?",
    a: "Within one working day. Complete the form below or email corporate@paleontraining.com.",
  },
  {
    q: "How do we get started?",
    a: "Take the free Readiness Check, book a 20-minute call, or request a proposal using the form on this page. You can also email corporate@paleontraining.com or message us on WhatsApp on +44 7508 823495.",
  },
];

const HUB_JOURNEY = [
  "**Consultation:** we learn about your organisation, teams and goals.",
  "**Assessment:** we identify where training will make the biggest difference.",
  "**Design:** we adapt the programme to your sector, departments and tools.",
  "**Training:** online and in-house: practical self-paced courses in a private space for your staff.",
  "**Application:** participants apply what they learn to real workplace tasks.",
  "**Review:** we review results with you and plan the next steps.",
];

const HUB_DEFINITION =
  "Paleon Training provides corporate training for organisations in Nigeria, South Africa, Kenya and Ghana. Its flagship programmes are AI Workflow Productivity & Process Transformation, which teaches employees to use generative AI to save time and redesign repetitive work, CyberSecure Workforce, which trains every employee to recognise, stop and report cyber threats, and the AI + Cybersecurity Professional Accelerator for the professionals who lead secure AI adoption.";

// The three programme videos on the homepage (2026-11-10), marked up so Google can show them
// in video results. Durations match the files with end cards (cec0a21).
const HUB_VIDEOS = [
  {
    slug: "cybersecure-workforce-essentials",
    name: "CyberSecure Workforce",
    description: "How phishing, payment fraud and data leaks reach ordinary staff, and how Paleon's CyberSecure Workforce training builds a cyber-aware workforce.",
    duration: "PT1M48S",
  },
  {
    slug: "ai-workflow-productivity",
    name: "AI Workflow Productivity & Process Transformation",
    description: "Where time is lost, how AI helps, and how Paleon Training keeps it safe. A short introduction to the corporate AI programme.",
    duration: "PT1M54S",
  },
  {
    slug: "ai-cybersecurity-accelerator",
    name: "AI + Cybersecurity Professional Accelerator",
    description: "An introduction to Paleon's combined AI and cybersecurity programme for managers and professionals who lead secure, AI-ready teams.",
    duration: "PT1M55S",
  },
];

function hubJsonLd(url: string): object {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...trainerPersonLd(),
      ...HUB_VIDEOS.map((v) => ({
        "@type": "VideoObject",
        "@id": `${ORIGIN}/#video-${v.slug}`,
        name: v.name,
        description: v.description,
        thumbnailUrl: `${ORIGIN}/videos/corporate/${v.slug}.jpg`,
        contentUrl: `${ORIGIN}/videos/corporate/${v.slug}.mp4?v=2`,
        uploadDate: "2026-11-09T12:00:00+00:00",
        duration: v.duration,
        inLanguage: "en",
        publisher: { "@id": `${ORIGIN}/#organization` },
      })),
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: "Corporate training from Paleon Training",
        description: HUB_DEFINITION,
        about: { "@id": `${ORIGIN}/#organization` },
        hasPart: [
          ...MARKET_ORDER.map((k) => ({
            "@type": "WebPage",
            url: `${ORIGIN}${countryCorporatePath(k)}`,
            name: `Corporate training in ${COUNTRIES[k].name}`,
          })),
          ...MARKET_ORDER.map((k) => ({
            "@type": "WebPage",
            url: `${ORIGIN}${corporateAiPath(k)}`,
            name: `AI Workflow Productivity & Process Transformation in ${COUNTRIES[k].name}`,
          })),
          ...MARKET_ORDER.map((k) => ({
            "@type": "WebPage",
            url: `${ORIGIN}${cyberSecurePath(k)}`,
            name: `CyberSecure Workforce cybersecurity awareness training in ${COUNTRIES[k].name}`,
          })),
          ...MARKET_ORDER.map((k) => ({
            "@type": "WebPage",
            url: `${ORIGIN}${acceleratorPath(k)}`,
            name: `AI + Cybersecurity Professional Accelerator in ${COUNTRIES[k].name}`,
          })),
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#cybersecure-service`,
        name: "CyberSecure Workforce: cybersecurity awareness training for employees",
        serviceType: "Cybersecurity awareness training",
        description:
          "Online, self-paced cybersecurity awareness training for non-technical employees, private to your organisation: phishing, payment fraud, impersonation, data protection, safe AI use and incident reporting.",
        url: `${url}#cybersecure`,
        provider: { "@id": `${ORIGIN}/#organization` },
        areaServed: MARKET_ORDER.map((k) => ({ "@type": "Country", name: COUNTRIES[k].name })),
        audience: { "@type": "BusinessAudience", audienceType: "Companies and organisations" },
      },
      {
        "@type": "Service",
        "@id": `${url}#ai-workflow-service`,
        name: "AI Workflow Productivity & Process Transformation: AI training for employees",
        serviceType: "Corporate AI training",
        description:
          "Practical AI productivity training for every department, with confidentiality, accuracy checks and human review built in, ending with a real workplace project.",
        url: `${url}#ai-workflow`,
        provider: { "@id": `${ORIGIN}/#organization` },
        areaServed: MARKET_ORDER.map((k) => ({ "@type": "Country", name: COUNTRIES[k].name })),
        audience: { "@type": "BusinessAudience", audienceType: "Companies and organisations" },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: HUB_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      ORGANIZATION_LD,
    ],
  };
}

// The hub keeps the visitor's country (2026-11-03): a country page links here with
// ?country=za, and the page then shows that country in the header, footer and menu links.
// Without one it falls back to the country the visitor picked (cookie), as / does, then Nigeria.
// The main button routes by country (2026-11-13): the ?country= asked for, else the country
// the visitor picked (cookie), else the CDN's country; with none of these it scrolls to the
// country picker instead of assuming Nigeria.
export function renderCorporateHub(
  country: CountryCode | null = null,
  chosen: CountryCode | null = null,
  detected: CountryCode | null = null,
): string {
  const ctx: PageContext = country
    ? { country, hub: false, detected: null, chosen: country }
    : { country: chosen ?? "NG", hub: true, detected: null, chosen };
  // The homepage since 2026-11-08: the logo goes to "/", the menu's section links (Courses,
  // Why Paleon ...) to the visitor's learner homepage, /ng by default.
  const home = COUNTRIES[ctx.country].site.path;
  const url = `${ORIGIN}${CORPORATE_HUB_PATH}`;
  const buyCountry = country ?? chosen ?? detected;
  const buyHref = buyCountry ? `${cyberSecurePath(buyCountry)}#buy` : "#choose-country";
  const headHtml = head(ctx, {
    title: "Corporate AI & Cybersecurity Training | Nigeria, South Africa, Kenya, Ghana",
    description:
      "AI and cybersecurity training for employees in Nigeria, South Africa, Kenya and Ghana: online and in-house, per learner or organisation-wide. Get a proposal.",
    canonicalPath: CORPORATE_HUB_PATH,
    alternatesFor: countryCorporatePath,
    xDefault: CORPORATE_HUB_PATH,
    jsonLd: hubJsonLd(url),
  })
    .replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1${ORIGIN}/images/og/corporate-ai-workflow-ng.jpg"`)
    .replace("</head>", '<link rel="stylesheet" href="/corporate-ai.css">\n</head>');

  // Homepage country selector (2026-11-09): the same card format as the learner homepages'
  // "Choose your country" (flag, name, currency, status pill), linking to each country's
  // corporate training page. The pill reads "In-house &amp; online" for every country (2026-11-13).
  const chooseCards = MARKET_ORDER.map((k) => {
    const c = COUNTRIES[k];
    const selected = ctx.chosen === k;
    return `<li><a class="ctry-card${selected ? " is-selected" : ""}" href="${countryCorporatePath(k)}" hreflang="${c.site.locale}" data-pick-country="${k}">
        ${flagSvg(k, "flag flag-lg")}
        <span class="ctry-body"><span class="ctry-name">${escapeHtml(c.name)}</span><span class="ctry-meta">Prices in ${escapeHtml(c.site.currency.symbol)} ${escapeHtml(c.site.currency.code)}</span></span>
        <span class="ctry-status is-live">In-house &amp; online</span>
      </a></li>`;
  }).join("\n");
  const countryCards = MARKET_ORDER.map(
    (k) => `<a class="ca-country" href="${corporateAiPath(k)}" hreflang="${COUNTRIES[k].site.locale}">
        ${flagSvg(k, "flag flag-md")}
        <span class="ca-country-name">${escapeHtml(COUNTRIES[k].name)}</span>
        <span class="ca-country-note">${escapeHtml(HUB_DELIVERY[k])}</span>
        <span class="ca-country-go">View the programme &rarr;</span>
      </a>`,
  ).join("\n");
  const cyberCards = MARKET_ORDER.map(
    (k) => `<a class="ca-country" href="${cyberSecurePath(k)}" hreflang="${COUNTRIES[k].site.locale}">
        ${flagSvg(k, "flag flag-md")}
        <span class="ca-country-name">${escapeHtml(COUNTRIES[k].name)}</span>
        <span class="ca-country-note">${escapeHtml(HUB_CYBER_DELIVERY[k])}</span>
        <span class="ca-country-go">View the programme &rarr;</span>
      </a>`,
  ).join("\n");
  const accCards = MARKET_ORDER.map(
    (k) => `<a class="ca-country" href="${acceleratorPath(k)}" hreflang="${COUNTRIES[k].site.locale}">
        ${flagSvg(k, "flag flag-md")}
        <span class="ca-country-name">${escapeHtml(COUNTRIES[k].name)}</span>
        <span class="ca-country-note">${escapeHtml(HUB_ACC_DELIVERY[k])}</span>
        <span class="ca-country-go">View the programme &rarr;</span>
      </a>`,
  ).join("\n");
  const faqHtml = HUB_FAQ.map(
    (f) => `<details class="ca-faq"><summary>${escapeHtml(f.q)}</summary><p>${rich(f.a)}</p></details>`,
  ).join("\n");

  return `${headHtml}
<body data-country="${ctx.country}"${ctx.hub ? " data-hub" : ""}>
${SEARCH_OVERLAY}
<a class="skip-link" href="#main">Skip to main content</a>
${corporateUtilBar(home)}
${header(ctx, home, "/", true)}
<main id="main">
  <section class="section section-dark ca-choose" id="choose-country" aria-labelledby="choose-country-title">
    <div class="wrap ctry-picker">
      <p class="ctry-title" id="choose-country-title">Choose your country</p>
      <ul class="ctry-grid" aria-labelledby="choose-country-title">${chooseCards}</ul>
    </div>
  </section>
  <section class="hero ca-hero" id="top">
    <div class="wrap ca-hero-grid">
      <div class="hero-inner ca-hero-copy">
        <span class="eyebrow">Corporate training for employers &middot; South Africa, Kenya, Ghana and Nigeria</span>
        <h1 class="hero-title ca-hero-title">Cybersecurity and AI workforce training for companies</h1>
        <p class="ca-headline">Protect your business and help your teams do more, with training built around your organisation.</p>
        <p class="hero-sub">Paleon Training helps business owners, managing directors and HR leaders train their staff in two areas that now matter to every company: <strong>cybersecurity awareness</strong>, so every employee can spot phishing, payment fraud and impersonation, and <strong>AI productivity</strong>, so every department can use AI tools safely to save time. Training is online and in-house: self-paced courses in a private space for your staff only, per employee or organisation-wide, in all four countries. Every programme is built around real workplace tasks, not theory.</p>
        <div class="hero-ctas">
          ${ctaButton(WORKFORCE_CTA, true, buyHref)}
          ${readinessButton(buyCountry, true)}
        </div>
        <ul class="ca-trust"><li>Customised by sector and department</li><li>Responsible AI built in</li><li>Reply within one working day</li></ul>
      </div>
      <div class="ca-hero-media">
        <img src="/images/corporate-ai/ke-hero.jpg" alt="${escapeHtml(CORPORATE_AI_CONTENT.KE.images.hero)}" width="1600" height="900" fetchpriority="high" decoding="async">
      </div>
    </div>
  </section>
  <section class="ca-definition" aria-label="About Paleon corporate training">
    <div class="wrap"><p>${escapeHtml(HUB_DEFINITION)}</p></div>
  </section>

  <section class="section section-paper ca-section" id="cybersecure" aria-labelledby="cybersecure-title">
    <div class="wrap">
      <span class="section-eyebrow">Flagship programme</span>
      <h2 class="section-title" id="cybersecure-title">CyberSecure Workforce: cybersecurity awareness training</h2>
      <p class="ca-headline co-lead">Fewer incidents that start with a person.</p>
      ${outcomeList("cybersecure", ctx.country)}
      ${cohortNotice("cybersecure", true)}
      <div class="ca-ctas">${reserveButton("cybersecure")}</div>
      <p class="ca-p">Many attacks on organisations start with a person, not a system: a fake invoice, a message that seems to come from the boss, a login page that looks real. CyberSecure Workforce trains every employee to recognise, stop and report them, in plain language, with practice on realistic workplace scenarios and AI-related risks included. Twelve practical modules, ending with the CyberSecure Workforce Challenge.</p>
      <figure class="ca-video">
        <video controls playsinline preload="none" poster="/videos/corporate/cybersecure-workforce-essentials.jpg" aria-label="Video: CyberSecure Workforce (1 minute 48 seconds)">
          <source src="/videos/corporate/cybersecure-workforce-essentials.mp4?v=2" type="video/mp4">
        </video>
      </figure>
      <p class="ca-p"><strong>Data protection, in plain language.</strong> The programme builds awareness of handling personal and customer data responsibly, in line with your obligations under your country&rsquo;s law:</p>
      <ul class="ca-law">${MARKET_ORDER.map((k) => `<li><strong>${escapeHtml(COUNTRIES[k].name)}:</strong> ${escapeHtml(DATA_PROTECTION_LAW[k].replace(/^the /, ""))}</li>`).join("")}</ul>
      <p class="ca-p ca-hint">Awareness training to support your compliance programme; it is not legal advice.</p>
      <p class="ca-p"><strong>Choose your country</strong> for local delivery options and details:</p>
      <div class="ca-countries">${cyberCards}</div>
    </div>
  </section>

  <section class="section section-paper ca-section" id="ai-workflow" aria-labelledby="ai-workflow-title">
    <div class="wrap">
      <span class="section-eyebrow">Flagship programme</span>
      <h2 class="section-title" id="ai-workflow-title">AI Workflow Productivity &amp; Process Transformation</h2>
      <p class="ca-headline co-lead">Hours saved every week, with the risks managed.</p>
      ${outcomeList("ai-workflow", ctx.country)}
      ${cohortNotice("ai-workflow", true)}
      <div class="ca-ctas">${reserveButton("ai-workflow")}</div>
      <p class="ca-p">Your employees learn to use AI on their own tasks: reports, emails, meeting follow-ups, documents and data. Teams then redesign selected workflows so the improvement lasts, with confidentiality, accuracy checks and human review built into every module. Ten practical modules, ending with a real workplace project.</p>
      <figure class="ca-video">
        <video controls playsinline preload="none" poster="/videos/corporate/ai-workflow-productivity.jpg" aria-label="Video: AI Workflow Productivity &amp; Process Transformation (1 minute 54 seconds)">
          <source src="/videos/corporate/ai-workflow-productivity.mp4?v=2" type="video/mp4">
        </video>
      </figure>
      <p class="ca-p"><a href="/Promotion-AI-Workflow-Productivity"><strong>Explore the programme: what it is, what your workforce gains and how it builds a competitive advantage &rarr;</strong></a></p>
      <p class="ca-p"><strong>Choose your country</strong> for local delivery options and details:</p>
      <div class="ca-countries">${countryCards}</div>
    </div>
  </section>

  <section class="section section-paper ca-section" id="accelerator" aria-labelledby="accelerator-title">
    <div class="wrap">
      <span class="section-eyebrow">Professional programme</span>
      <h2 class="section-title" id="accelerator-title">AI + Cybersecurity Professional Accelerator</h2>
      <p class="ca-headline co-lead">Your own people leading secure AI adoption.</p>
      ${outcomeList("accelerator", ctx.country)}
      ${cohortNotice("accelerator", true)}
      <div class="ca-ctas">${reserveButton("accelerator")}</div>
      <p class="ca-p">For the people who will lead secure AI adoption: IT, security, risk, data and digital professionals. Participants learn to use AI in their work, understand the cyber risks it brings, and help set the rules for using it safely. Twelve professional modules, ending with a capstone on a real challenge from their organisation.</p>
      <figure class="ca-video">
        <video controls playsinline preload="none" poster="/videos/corporate/ai-cybersecurity-accelerator.jpg" aria-label="Video: AI + Cybersecurity Professional Accelerator (1 minute 55 seconds)">
          <source src="/videos/corporate/ai-cybersecurity-accelerator.mp4?v=2" type="video/mp4">
        </video>
      </figure>
      <p class="ca-p"><strong>Choose your country</strong> for local delivery options and details:</p>
      <div class="ca-countries">${accCards}</div>
    </div>
  </section>

  <section class="section section-dark ca-section" id="pricing" aria-labelledby="pricing-title">
    <div class="wrap">
      <span class="section-eyebrow">Pricing</span>
      <h2 class="section-title" id="pricing-title">Corporate training prices in Nigeria, South Africa, Kenya and Ghana</h2>
      ${pricingSummaryTable([...MARKET_ORDER], true)}
      <h3 class="cp-subtitle">Two ways to buy</h3>
      ${waysToBuyBrief(ctx.country)}
    </div>
  </section>

  ${pilotSection(ctx.country, null, false)}

  <section class="section section-dark ca-section" id="sectors" aria-labelledby="sectors-title">
    <div class="wrap">
      <span class="section-eyebrow">By sector</span>
      <h2 class="section-title" id="sectors-title">Training shaped around your sector</h2>
      <div class="ca-cards">${SECTORS.map(
        (sec) => `<div class="ca-card">
          <h3><a href="${SECTORS_PATH}/${sec.slug}">${escapeHtml(sec.name)}</a></h3>
          <p>${escapeHtml(sec.card)}</p>
          <p class="ca-card-link"><a href="${SECTORS_PATH}/${sec.slug}">${escapeHtml(sec.name)} training &rarr;</a></p>
        </div>`,
      ).join("\n")}</div>
    </div>
  </section>

  <section class="section section-paper ca-section" id="by-country" aria-labelledby="by-country-title">
    <div class="wrap">
      <span class="section-eyebrow">Where we train</span>
      <h2 class="section-title" id="by-country-title">Cybersecurity and AI training for companies in South Africa, Kenya, Ghana and Nigeria</h2>
      <p class="ca-p">Every programme uses examples from your sector. All training is online and in-house: staff study self-paced in your private company space, when it suits them. There are no live or facilitator-led sessions.</p>
      <div class="ca-cards">${HUB_COUNTRY_SEO.map(
        (c) => `<div class="ca-card">
          <h3>${flagSvg(c.code, "flag flag-sm")} ${escapeHtml(c.h)}</h3>
          <p>${escapeHtml(c.p)}</p>
          <p class="ca-card-link"><a href="${cyberSecurePath(c.code)}">Cybersecurity awareness training in ${escapeHtml(COUNTRIES[c.code].name)} &rarr;</a></p>
          <p class="ca-card-link"><a href="${corporateAiPath(c.code)}">AI training for employees in ${escapeHtml(COUNTRIES[c.code].name)} &rarr;</a></p>
        </div>`,
      ).join("\n")}</div>
      <div class="ca-ctas">${ctaButton(PROPOSAL, true)}</div>
    </div>
  </section>

  <section class="section section-paper ca-section" id="resources" aria-labelledby="resources-title">
    <div class="wrap">
      <span class="section-eyebrow">Free resources for directors</span>
      <h2 class="section-title" id="resources-title">Tools for business owners, CEOs and managing directors</h2>
      <div class="ca-cards">
        <div class="ca-card">
          <h3><a href="/ai-cyber-readiness-check">AI &amp; Cyber Readiness Check</a></h3>
          <p>Ten quick questions on how ready your organisation is for cyber threats and for safe AI use. See your score straight away and get a scorecard with your priority gaps by email.</p>
          <p class="ca-card-link"><a href="/ai-cyber-readiness-check">Take the free check &rarr;</a></p>
        </div>
        <div class="ca-card">
          <h3><a href="/ai-use-policy-template">AI use policy template for organisations</a></h3>
          <p>A plain-language starting point for your own AI policy: approved tools, what data must never go into AI, human review, accountability and training.</p>
          <p class="ca-card-link"><a href="/ai-use-policy-template">Read the template &rarr;</a></p>
        </div>
        <div class="ca-card">
          <h3><a href="/board-cyber-risk-briefing">Board cyber-risk briefing</a></h3>
          <p>The cyber risks boards should understand, the questions directors should ask management, and the measures that show whether your people are ready.</p>
          <p class="ca-card-link"><a href="/board-cyber-risk-briefing">Read the briefing &rarr;</a></p>
        </div>
        <div class="ca-card">
          <h3><a href="/corporate-guides">Corporate training guides</a></h3>
          <p>Free guides on POPIA, NDPA, Kenya and Ghana data protection training, cybersecurity awareness, training levies, AI for staff and advice by sector.</p>
          <p class="ca-card-link"><a href="/corporate-guides">Browse the guides &rarr;</a></p>
        </div>
      </div>
    </div>
  </section>

  ${forwardSection(ctx.country, null, false)}

  ${trainerStandards()}

  <section class="section section-dark ca-section" id="journey" aria-labelledby="journey-title">
    <div class="wrap">
      <span class="section-eyebrow">How it works</span>
      <h2 class="section-title" id="journey-title">Your corporate training journey</h2>
      <ul class="ca-steps">${HUB_JOURNEY.map((j) => `<li>${rich(j)}</li>`).join("")}</ul>
      <div class="ca-ctas">${ctaButton(WORKFORCE_CTA, true, buyHref)}${callButton(true)}</div>
    </div>
  </section>

  <section class="section section-paper ca-section" id="faq" aria-labelledby="faq-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Questions</span>
      <h2 class="section-title" id="faq-title">Frequently asked questions</h2>
      ${faqHtml}
    </div>
  </section>

  ${enquiry(null, {
    title: "Tell us what your organisation needs",
    lede: "Share a little about your organisation, your workforce and the work you want to improve. We will help identify the most appropriate training approach.",
    note: "Tell us your team size and what you want to improve, and we will send a proposal shaped around your organisation.",
    contact: CORPORATE_CONTACT,
  })}
</main>
${footer(ctx, home, false, "/", true)}
${scripts(ctx)}
<script src="/corporate-ai.js" defer></script>
<script src="/corporate-buy.js" defer></script>
</body>
</html>
`;
}
