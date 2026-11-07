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
  footer,
  head,
  header,
  scripts,
  whatsappAttr,
} from "./countryHome";

// The "AI Workflow Productivity & Process Transformation" corporate pages (2026-11-02):
// one per country at /<cc>/corporate-training/ai-workflow-productivity. Copy lives in
// corporateAiWorkflowContent.ts. Every button opens the same enquiry form with the
// visitor's intent (consultation or proposal) preselected; the form posts to
// /api/leads/corporate via corporate-ai.js. Nigeria offers in-house, online and hybrid
// delivery and mentions ITF reimbursement; Ghana, Kenya and South Africa are live online only.

export const CORPORATE_AI_SLUG = "corporate-training/ai-workflow-productivity";
// The corporate training hub (2026-11-02): x-default for the four country pages.
export const CORPORATE_HUB_PATH = "/corporate-training";

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

const CONSULTATION = "Book a Corporate AI Training Consultation";
// The /corporate-training hub covers every programme, so its button drops "AI" (2026-11-07).
const HUB_CONSULTATION = "Book a Corporate Training Consultation";
const PROPOSAL = "Request a Corporate Training Proposal";
const WHATSAPP_LINK = "https://wa.me/447508823495";
const PHONE_PREFIX: Record<CountryCode, string> = { NG: "+234", ZA: "+27", GH: "+233", KE: "+254" };

// Escape, then turn the copy's **bold** marks into <strong>.
export function rich(value: string): string {
  return escapeHtml(value).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
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

export function ctaButton(label: string, dark: boolean): string {
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

function hero(code: CountryCode, c: CorporatePageContent): string {
  const cc = code.toLowerCase();
  const trust = field(c, "Hero", "Trust line")
    .split(" · ")
    .map((t) => `<li>${rich(t)}</li>`)
    .join("");
  return `<section class="hero ca-hero" id="top">
    <div class="wrap ca-hero-grid">
      <div class="hero-inner ca-hero-copy">
        <span class="eyebrow">${escapeHtml(field(c, "Hero", "Eyebrow"))}</span>
        <h1 class="hero-title ca-hero-title">${escapeHtml(field(c, "Hero", "H1"))}</h1>
        <p class="ca-headline">${rich(field(c, "Hero", "Headline line"))}</p>
        <p class="hero-sub">${rich(field(c, "Hero", "Supporting statement"))}</p>
        <div class="hero-ctas">
          ${ctaButton(field(c, "Hero", "Primary CTA") || CONSULTATION, true)}
          ${ctaButton(field(c, "Hero", "Secondary CTA") || PROPOSAL, true)}
        </div>
        <ul class="ca-trust">${trust}</ul>
      </div>
      <div class="ca-hero-media">
        <img src="/images/corporate-ai/${cc}-hero.jpg" alt="${escapeHtml(c.images.hero)}" width="1600" height="900" fetchpriority="high" decoding="async">
      </div>
    </div>
  </section>
  <section class="ca-definition" aria-label="About the programme">
    <div class="wrap"><p>${rich(field(c, "Hero", "Definition box"))}</p></div>
  </section>`;
}

function faqItems(c: CorporatePageContent): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  for (const block of c.sections["Frequently asked questions"].blocks) {
    if (!("p" in block)) continue;
    const m = /^\*\*(.+?\?)\*\*\s*(.*)$/.exec(block.p);
    if (m) out.push({ q: m[1], a: m[2] });
  }
  return out;
}

function faq(c: CorporatePageContent): string {
  const items = faqItems(c)
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
  submit: "Request Corporate Training Proposal",
  requirements: CORPORATE_REQUIREMENTS,
  messagePlaceholder: "The teams, processes or tasks you want to improve",
};

// The enquiry form. `code` presets the country (a country page); null is the hub, where
// the visitor picks their country and sees the delivery question with a note that
// in-house and hybrid are Nigeria only.
export function enquiry(code: CountryCode | null, copy: EnquiryCopy, form: EnquiryForm = AI_FORM): string {
  const { title, lede, note, contact } = copy;
  const countryOptions =
    (code ? "" : '<option value="">Choose your country</option>') +
    MARKET_ORDER.map(
      (k) => `<option value="${k}"${k === code ? " selected" : ""}>${escapeHtml(COUNTRIES[k].name)}</option>`,
    ).join("");
  const delivery =
    code === "NG" || code === null
      ? `<div class="form-row"><label class="form-label" for="ca-delivery">Preferred delivery method <span class="optional">(optional)</span></label>
          <select class="form-select" id="ca-delivery" name="delivery">${options(CORPORATE_DELIVERY, "Choose one")}</select>${
            code === null ? '<p class="ca-hint">In-house and hybrid training are available in Nigeria. In Ghana, Kenya and South Africa, training is live online.</p>' : ""
          }</div>`
      : "";
  const phonePlaceholder = code ? `${PHONE_PREFIX[code]} ...` : "Include your country code";
  return `<section class="section section-dark ca-section" id="enquiry" aria-labelledby="enquiry-title">
    <div class="wrap ca-enquiry">
      <div class="ca-enquiry-copy">
        <span class="section-eyebrow">Talk to us</span>
        <h2 class="section-title" id="enquiry-title">${escapeHtml(title)}</h2>
        <p class="ca-p">${rich(lede)}</p>
        <p class="ca-p">${rich(note)}</p>
        <p class="ca-contact">${contactLine(contact)}</p>
      </div>
      <form class="ca-form" id="caForm" novalidate data-country="${code ?? ""}" data-programme="${form.programme}" data-consultation-label="${escapeHtml(form.consultation)}" data-proposal-label="${escapeHtml(form.submit)}">
        <p class="ca-intent" role="group" aria-label="What would you like?">
          <label><input type="radio" name="intent" value="consultation" checked> ${escapeHtml(form.consultation)}</label>
          <label><input type="radio" name="intent" value="proposal"> ${escapeHtml(form.proposal)}</label>
        </p>
        <div class="ca-grid">
          <div class="form-row"><label class="form-label" for="ca-name">Name</label><input class="form-input" id="ca-name" name="name" autocomplete="name" required maxlength="150"></div>
          <div class="form-row"><label class="form-label" for="ca-job">Job title</label><input class="form-input" id="ca-job" name="jobTitle" autocomplete="organization-title" required maxlength="150"></div>
          <div class="form-row"><label class="form-label" for="ca-org">Organisation</label><input class="form-input" id="ca-org" name="organisation" autocomplete="organization" required maxlength="200"></div>
          <div class="form-row"><label class="form-label" for="ca-country">Country</label><select class="form-select" id="ca-country" name="country" required>${countryOptions}</select></div>
          <div class="form-row"><label class="form-label" for="ca-email">Business email</label><input class="form-input" id="ca-email" name="email" type="email" autocomplete="email" required maxlength="200"></div>
          <div class="form-row"><label class="form-label" for="ca-phone">Phone / WhatsApp</label><input class="form-input" id="ca-phone" name="phone" type="tel" autocomplete="tel" required placeholder="${phonePlaceholder}" maxlength="20"></div>
          <div class="form-row"><label class="form-label" for="ca-employees">Number of employees</label><select class="form-select" id="ca-employees" name="employees" required>${options(CORPORATE_EMPLOYEE_BANDS, "Choose one")}</select></div>
          <div class="form-row"><label class="form-label" for="ca-department">Department / team <span class="optional">(optional)</span></label><select class="form-select" id="ca-department" name="department">${options(CORPORATE_DEPARTMENTS, "Choose one")}</select></div>
          <div class="form-row"><label class="form-label" for="ca-requirement">Training requirement <span class="optional">(optional)</span></label><select class="form-select" id="ca-requirement" name="requirement">${options(form.requirements, "Choose one")}</select></div>
          ${delivery}
        </div>
        <div class="form-row"><label class="form-label" for="ca-message">Message <span class="optional">(optional)</span></label><textarea class="form-input" id="ca-message" name="message" rows="4" maxlength="3000" placeholder="${escapeHtml(form.messagePlaceholder)}"></textarea></div>
        <div class="ca-hp" aria-hidden="true"><label for="ca-website">Website</label><input id="ca-website" name="website" tabindex="-1" autocomplete="off"></div>
        <label class="consent-check"><input type="checkbox" name="consent" required> <span>I agree that Paleon Training may use these details to respond to my enquiry, as described in the <a href="/privacy">Privacy Policy</a>.</span></label>
        <label class="consent-check"><input type="checkbox" name="updates"> <span>Send me occasional updates about Paleon corporate training. I can unsubscribe at any time. <span class="optional">(optional)</span></span></label>
        <p class="form-error" id="caError" role="alert" hidden></p>
        <button type="submit" class="btn btn-signal btn-lg btn-block" id="caSubmit">${escapeHtml(form.submit)}</button>
        <p class="form-note">We reply within one working day. Your details are used only to respond to this enquiry. <a href="/privacy">Privacy Policy</a>.</p>
      </form>
      <div class="ca-thanks" id="caThanks" hidden tabindex="-1">
        <h3>Thank you. Your enquiry has reached our corporate team.</h3>
        <p>What happens next: a member of the team will reply within one working day to arrange a short consultation about your organisation, teams and goals. After that we send a proposal shaped around what you need.</p>
        <p>Urgent question? <a href="${WHATSAPP_LINK}" target="_blank" rel="noopener">Message us on WhatsApp</a> or email <a href="mailto:corporate@paleontraining.com">corporate@paleontraining.com</a>.</p>
      </div>
    </div>
  </section>`;
}

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
    `<li><a href="${CORPORATE_HUB_PATH}?country=${code.toLowerCase()}">All corporate training</a></li>`,
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
          courseMode: code === "NG" ? ["online", "onsite", "blended"] : "online",
          location: { "@type": "Country", name: country },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqItems(c).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\*\*/g, "") },
        })),
      },
      {
        "@type": "Organization",
        "@id": `${ORIGIN}/#organization`,
        name: "Paleon Training Limited",
        url: `${ORIGIN}/`,
        email: "corporate@paleontraining.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Off NNPC Junior Staff Club 10",
          addressLocality: "Warri",
          addressRegion: "Delta State",
          addressCountry: "NG",
        },
        sameAs: [
          "https://www.facebook.com/profile.php?id=61593708334223",
          "https://www.linkedin.com/company/146121029/",
          "https://www.instagram.com/paleontraining/",
        ],
      },
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
<div class="util-bar">
  <div class="wrap util-row">
    <a href="mailto:corporate@paleontraining.com">corporate@paleontraining.com</a>
    <span>Paleon Training Limited</span>
    <span class="util-note">Mon&ndash;Fri, 10am&ndash;7pm WAT (9am&ndash;6pm GMT)</span>
  </div>
</div>
${header(ctx, home)}
<main id="main">
  ${hero(code, c)}
  ${section(c, "Problem", { id: "problem", eyebrowOverride: "The challenge", listClass: "ca-list ca-list-x" })}
  ${section(c, "Solution", { id: "solution", dark: true, aside: image(cc, "collaboration", c.images.collaboration), listClass: "ca-steps" })}
  ${section(c, "Business benefits", { id: "benefits", eyebrowOverride: "Business benefits", titleOverride: "What your organisation gains" })}
  ${section(c, "Course structure", { id: "modules", eyebrowOverride: "Course structure", titleOverride: "10 practical modules", listClass: "ca-steps" })}
  ${section(c, "Who should attend?", { id: "attend", dark: true, eyebrowOverride: "Who it is for" })}
  ${section(c, "Corporate delivery options", { id: "delivery", eyebrowOverride: "Delivery", aside: image(cc, "training", c.images.training) })}
  ${section(c, "Practical workplace project", { id: "project", dark: true, eyebrowOverride: "Practical workplace project", aside: image(cc, "productivity", c.images.productivity) })}
  ${section(c, "Responsible AI", {
    id: "responsible-ai",
    after: `<p class="ca-p">Need security awareness for every employee? See <a href="${cyberSecurePath(code)}"><strong>CyberSecure Workforce</strong></a>, our cybersecurity awareness programme for organisations in ${escapeHtml(COUNTRIES[code].name)}. Developing specialists? See the <a href="${acceleratorPath(code)}"><strong>AI + Cybersecurity Professional Accelerator</strong></a>.</p>`,
  })}
  ${section(c, "Why Paleon Training?", { id: "why", dark: true, eyebrowOverride: "Why us" })}
  ${section(c, "Your corporate training journey", { id: "journey", eyebrowOverride: "How it works", listClass: "ca-steps" })}
  ${faq(c)}
  ${enquiry(code, finalCopy(c))}
  ${related(code)}
</main>
${footer(ctx, home)}
${scripts(ctx)}
<script src="/corporate-ai.js" defer></script>
</body>
</html>
`;
}

// ---------------------------------------------------------------------------------
// The corporate training hub at /corporate-training (2026-11-02): one page for employers
// in all four countries, pointing to the AI Workflow page for each country and to the other
// corporate offers. Same enquiry form; the visitor picks their country.

const HUB_CYBER_DELIVERY: Record<CountryCode, string> = {
  NG: "In-house, online or hybrid awareness training. Supports ITF reimbursement claims.",
  ZA: "Live online awareness training for teams across South Africa.",
  KE: "Live online awareness training for teams across Kenya.",
  GH: "Live online awareness training for teams across Ghana.",
};

const HUB_ACC_DELIVERY: Record<CountryCode, string> = {
  NG: "In-house, online or hybrid for professional teams. Supports ITF reimbursement claims.",
  ZA: "Live online for professional teams across South Africa.",
  KE: "Live online for professional teams across Kenya.",
  GH: "Live online for professional teams across Ghana.",
};

const HUB_DELIVERY: Record<CountryCode, string> = {
  NG: "In-house, online or hybrid. Supports ITF reimbursement claims.",
  ZA: "Live online training for teams across South Africa.",
  KE: "Live online training for teams across Kenya.",
  GH: "Live online training for teams across Ghana.",
};

const HUB_FAQ: { q: string; a: string }[] = [
  {
    q: "Which countries do you deliver corporate training in?",
    a: "Nigeria, South Africa, Kenya and Ghana. In Nigeria we train in-house, online or hybrid. In South Africa, Kenya and Ghana, training is delivered live online with a facilitator.",
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
    a: "Pricing depends on group size, delivery method and customisation. Request a corporate training proposal and we will send a quote.",
  },
  {
    q: "Can you provide attendance records?",
    a: "Yes. For company groups we provide attendance records and a programme outline for your internal reporting.",
  },
  {
    q: "Can Nigerian employers claim ITF reimbursement?",
    a: "Yes, if your organisation pays the ITF training levy. Employers can reclaim up to 50% of eligible training costs from the Industrial Training Fund, subject to the ITF's requirements. We provide the attendance records and programme documentation your claim needs.",
  },
  {
    q: "How quickly will you reply to an enquiry?",
    a: "Within one working day. Complete the form below or email corporate@paleontraining.com.",
  },
];

const HUB_JOURNEY = [
  "**Consultation:** we learn about your organisation, teams and goals.",
  "**Assessment:** we identify where training will make the biggest difference.",
  "**Design:** we adapt the programme to your sector, departments and tools.",
  "**Training:** practical sessions, live online or, in Nigeria, in-house or hybrid.",
  "**Application:** participants apply what they learn to real workplace tasks.",
  "**Review:** we review results with you and plan the next steps.",
];

const HUB_DEFINITION =
  "Paleon Training provides corporate training for organisations in Nigeria, South Africa, Kenya and Ghana. Its flagship programmes are AI Workflow Productivity & Process Transformation, which teaches employees to use generative AI to save time and redesign repetitive work, CyberSecure Workforce, which trains every employee to recognise, stop and report cyber threats, and the AI + Cybersecurity Professional Accelerator for the professionals who lead secure AI adoption.";

function hubJsonLd(url: string): object {
  return {
    "@context": "https://schema.org",
    "@graph": [
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
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: HUB_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "Organization",
        "@id": `${ORIGIN}/#organization`,
        name: "Paleon Training Limited",
        url: `${ORIGIN}/`,
        email: "corporate@paleontraining.com",
        areaServed: MARKET_ORDER.map((k) => ({ "@type": "Country", name: COUNTRIES[k].name })),
        address: {
          "@type": "PostalAddress",
          streetAddress: "Off NNPC Junior Staff Club 10",
          addressLocality: "Warri",
          addressRegion: "Delta State",
          addressCountry: "NG",
        },
      },
    ],
  };
}

// The hub keeps the visitor's country (2026-11-03): a country page links here with
// ?country=za, and the page then shows that country in the header, footer and menu links.
// Without one it falls back to the country the visitor picked (cookie), as / does, then Nigeria.
export function renderCorporateHub(country: CountryCode | null = null, chosen: CountryCode | null = null): string {
  const ctx: PageContext = country
    ? { country, hub: false, detected: null, chosen: country }
    : { country: chosen ?? "NG", hub: true, detected: null, chosen };
  const home = ctx.hub ? "/" : COUNTRIES[ctx.country].site.path;
  const url = `${ORIGIN}${CORPORATE_HUB_PATH}`;
  const headHtml = head(ctx, {
    title: "Corporate & AI Training for Organisations | Paleon Training",
    description:
      "AI productivity, cybersecurity awareness and executive training for organisations in Nigeria, South Africa, Kenya and Ghana. Practical and customised.",
    canonicalPath: CORPORATE_HUB_PATH,
    alternatesFor: corporateAiPath,
    xDefault: CORPORATE_HUB_PATH,
    jsonLd: hubJsonLd(url),
  })
    .replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1${ORIGIN}/images/og/corporate-ai-workflow-ng.jpg"`)
    .replace("</head>", '<link rel="stylesheet" href="/corporate-ai.css">\n</head>');

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
    (f) => `<details class="ca-faq"><summary>${escapeHtml(f.q)}</summary><p>${escapeHtml(f.a)}</p></details>`,
  ).join("\n");

  return `${headHtml}
<body data-country="${ctx.country}"${ctx.hub ? " data-hub" : ""}>
${SEARCH_OVERLAY}
<a class="skip-link" href="#main">Skip to main content</a>
<div class="util-bar">
  <div class="wrap util-row">
    <a href="mailto:corporate@paleontraining.com">corporate@paleontraining.com</a>
    <span>Paleon Training Limited</span>
    <span class="util-note">Mon&ndash;Fri, 10am&ndash;7pm WAT (9am&ndash;6pm GMT)</span>
  </div>
</div>
${header(ctx, home)}
<main id="main">
  <section class="hero ca-hero" id="top">
    <div class="wrap ca-hero-grid">
      <div class="hero-inner ca-hero-copy">
        <span class="eyebrow">Corporate training &middot; Nigeria, South Africa, Kenya and Ghana</span>
        <h1 class="hero-title ca-hero-title">Corporate training that changes how your teams work</h1>
        <p class="ca-headline">Practical AI and digital skills, built around your organisation.</p>
        <p class="hero-sub">Paleon Training designs staff training for organisations across four countries: AI productivity for every department, cybersecurity awareness for every employee, professional AI + cybersecurity development for specialists, digital skills packages for teams, and executive programmes for leaders. Every programme is built around real workplace tasks, not theory.</p>
        <div class="hero-ctas">
          ${ctaButton(HUB_CONSULTATION, true)}
          ${ctaButton(PROPOSAL, true)}
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
      <p class="ca-p">Many attacks on organisations start with a person, not a system: a fake invoice, a message that seems to come from the boss, a login page that looks real. CyberSecure Workforce trains every employee to recognise, stop and report them, in plain language, with practice on realistic workplace scenarios and AI-related risks included. Twelve practical modules, ending with the CyberSecure Workforce Challenge.</p>
      <figure class="ca-video">
        <video controls playsinline preload="none" poster="/videos/corporate/cybersecure-workforce-essentials.jpg" aria-label="Video: CyberSecure Workforce Essentials (1 minute 47 seconds)">
          <source src="/videos/corporate/cybersecure-workforce-essentials.mp4" type="video/mp4">
        </video>
      </figure>
      <p class="ca-p"><strong>Choose your country</strong> for local delivery options and details:</p>
      <div class="ca-countries">${cyberCards}</div>
    </div>
  </section>

  <section class="section section-paper ca-section" id="ai-workflow" aria-labelledby="ai-workflow-title">
    <div class="wrap">
      <span class="section-eyebrow">Flagship programme</span>
      <h2 class="section-title" id="ai-workflow-title">AI Workflow Productivity &amp; Process Transformation</h2>
      <p class="ca-booked"><strong>Fully booked until January 2027.</strong> You can still enquire now to reserve a place from January 2027.</p>
      <p class="ca-p">Your employees learn to use AI on their own tasks: reports, emails, meeting follow-ups, documents and data. Teams then redesign selected workflows so the improvement lasts, with confidentiality, accuracy checks and human review built into every module. Ten practical modules, ending with a real workplace project.</p>
      <figure class="ca-video">
        <video controls playsinline preload="none" poster="/videos/corporate/ai-workflow-productivity.jpg" aria-label="Video: AI Workflow Productivity &amp; Process Transformation (1 minute 53 seconds)">
          <source src="/videos/corporate/ai-workflow-productivity.mp4" type="video/mp4">
        </video>
      </figure>
      <p class="ca-p"><strong>Choose your country</strong> for local delivery options and details:</p>
      <div class="ca-countries">${countryCards}</div>
    </div>
  </section>

  <section class="section section-paper ca-section" id="accelerator" aria-labelledby="accelerator-title">
    <div class="wrap">
      <span class="section-eyebrow">Professional programme</span>
      <h2 class="section-title" id="accelerator-title">AI + Cybersecurity Professional Accelerator</h2>
      <p class="ca-booked"><strong>Fully booked until January 2027.</strong> You can still enquire now to reserve a place from January 2027.</p>
      <p class="ca-p">For the people who will lead secure AI adoption: IT, security, risk, data and digital professionals. Participants learn to use AI in their work, understand the cyber risks it brings, and help set the rules for using it safely. Twelve professional modules, ending with a capstone on a real challenge from their organisation.</p>
      <figure class="ca-video">
        <video controls playsinline preload="none" poster="/videos/corporate/ai-cybersecurity-accelerator.jpg" aria-label="Video: AI + Cybersecurity Professional Accelerator (1 minute 51 seconds)">
          <source src="/videos/corporate/ai-cybersecurity-accelerator.mp4" type="video/mp4">
        </video>
      </figure>
      <p class="ca-p"><strong>Choose your country</strong> for local delivery options and details:</p>
      <div class="ca-countries">${accCards}</div>
    </div>
  </section>

  <section class="section section-dark ca-section" id="journey" aria-labelledby="journey-title">
    <div class="wrap">
      <span class="section-eyebrow">How it works</span>
      <h2 class="section-title" id="journey-title">Your corporate training journey</h2>
      <ul class="ca-steps">${HUB_JOURNEY.map((j) => `<li>${rich(j)}</li>`).join("")}</ul>
      <div class="ca-ctas">${ctaButton(HUB_CONSULTATION, true)}</div>
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
    note: "Prefer to talk first? Choose **Book a Corporate Training Consultation** and we will arrange a call.",
    contact: "Email: corporate@paleontraining.com · Call: +234 707 714 9215 · WhatsApp: +44 7508 823495",
  }, { ...AI_FORM, consultation: HUB_CONSULTATION })}
</main>
${footer(ctx, home)}
${scripts(ctx)}
<script src="/corporate-ai.js" defer></script>
</body>
</html>
`;
}
