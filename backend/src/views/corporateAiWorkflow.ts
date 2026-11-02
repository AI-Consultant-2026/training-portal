import { COUNTRIES, CountryCode, MARKET_ORDER } from "../constants/countries";
import {
  CORPORATE_DELIVERY,
  CORPORATE_DEPARTMENTS,
  CORPORATE_EMPLOYEE_BANDS,
  CORPORATE_REQUIREMENTS,
} from "../validators/corporateLeads.validators";
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

export function corporateAiPath(country: CountryCode): string {
  return `${COUNTRIES[country].site.path}/${CORPORATE_AI_SLUG}`;
}

const CONSULTATION = "Book a Corporate AI Training Consultation";
const PROPOSAL = "Request a Corporate Training Proposal";
const WHATSAPP_LINK = "https://wa.me/447508823495";
const PHONE_PREFIX: Record<CountryCode, string> = { NG: "+234", ZA: "+27", GH: "+233", KE: "+254" };

// Escape, then turn the copy's **bold** marks into <strong>.
function rich(value: string): string {
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

function ctaButton(label: string, dark: boolean): string {
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

function heading(h: string): { eyebrow: string; title: string } {
  const [first, rest] = h.split(" — ");
  return rest ? { eyebrow: first, title: rest.charAt(0).toUpperCase() + rest.slice(1) } : { eyebrow: "", title: first };
}

function image(cc: string, slot: string, alt: string, extra = ""): string {
  return `<img class="ca-img${extra}" src="/images/corporate-ai/${cc}-${slot}.jpg" alt="${escapeHtml(alt)}" width="1200" height="675" loading="lazy" decoding="async">`;
}

function section(
  c: CorporatePageContent,
  key: string,
  opts: { id: string; dark?: boolean; titleOverride?: string; eyebrowOverride?: string; aside?: string; listClass?: string },
): string {
  const s = c.sections[key];
  const h = heading(s.h);
  const eyebrow = opts.eyebrowOverride ?? h.eyebrow;
  const title = opts.titleOverride ?? h.title;
  const body = blocks(s.blocks, Boolean(opts.dark), opts.listClass);
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

function options(values: readonly string[], placeholder?: string): string {
  return `${placeholder ? `<option value="">${escapeHtml(placeholder)}</option>` : ""}${values
    .map((v) => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`)
    .join("")}`;
}

function enquiry(code: CountryCode, c: CorporatePageContent): string {
  const final = c.sections["Final CTA"].blocks.filter((b): b is { p: string } => "p" in b).map((b) => b.p);
  const [title, lede, , note, contact] = final;
  const countryOptions = MARKET_ORDER.map(
    (k) => `<option value="${k}"${k === code ? " selected" : ""}>${escapeHtml(COUNTRIES[k].name)}</option>`,
  ).join("");
  const delivery =
    code === "NG"
      ? `<div class="form-row"><label class="form-label" for="ca-delivery">Preferred delivery method <span class="optional">(optional)</span></label>
          <select class="form-select" id="ca-delivery" name="delivery">${options(CORPORATE_DELIVERY, "Choose one")}</select></div>`
      : "";
  return `<section class="section section-dark ca-section" id="enquiry" aria-labelledby="enquiry-title">
    <div class="wrap ca-enquiry">
      <div class="ca-enquiry-copy">
        <span class="section-eyebrow">Talk to us</span>
        <h2 class="section-title" id="enquiry-title">${escapeHtml((title ?? "").replace(/\*\*/g, ""))}</h2>
        <p class="ca-p">${rich(lede ?? "")}</p>
        <p class="ca-p">${rich(note ?? "")}</p>
        <p class="ca-contact">${contactLine(contact ?? "")}</p>
      </div>
      <form class="ca-form" id="caForm" novalidate data-country="${code}">
        <p class="ca-intent" role="group" aria-label="What would you like?">
          <label><input type="radio" name="intent" value="consultation" checked> ${CONSULTATION}</label>
          <label><input type="radio" name="intent" value="proposal"> ${PROPOSAL}</label>
        </p>
        <div class="ca-grid">
          <div class="form-row"><label class="form-label" for="ca-name">Name</label><input class="form-input" id="ca-name" name="name" autocomplete="name" required maxlength="150"></div>
          <div class="form-row"><label class="form-label" for="ca-job">Job title</label><input class="form-input" id="ca-job" name="jobTitle" autocomplete="organization-title" required maxlength="150"></div>
          <div class="form-row"><label class="form-label" for="ca-org">Organisation</label><input class="form-input" id="ca-org" name="organisation" autocomplete="organization" required maxlength="200"></div>
          <div class="form-row"><label class="form-label" for="ca-country">Country</label><select class="form-select" id="ca-country" name="country" required>${countryOptions}</select></div>
          <div class="form-row"><label class="form-label" for="ca-email">Business email</label><input class="form-input" id="ca-email" name="email" type="email" autocomplete="email" required maxlength="200"></div>
          <div class="form-row"><label class="form-label" for="ca-phone">Phone / WhatsApp</label><input class="form-input" id="ca-phone" name="phone" type="tel" autocomplete="tel" required placeholder="${PHONE_PREFIX[code]} ..." maxlength="20"></div>
          <div class="form-row"><label class="form-label" for="ca-employees">Number of employees</label><select class="form-select" id="ca-employees" name="employees" required>${options(CORPORATE_EMPLOYEE_BANDS, "Choose one")}</select></div>
          <div class="form-row"><label class="form-label" for="ca-department">Department / team <span class="optional">(optional)</span></label><select class="form-select" id="ca-department" name="department">${options(CORPORATE_DEPARTMENTS, "Choose one")}</select></div>
          <div class="form-row"><label class="form-label" for="ca-requirement">Training requirement <span class="optional">(optional)</span></label><select class="form-select" id="ca-requirement" name="requirement">${options(CORPORATE_REQUIREMENTS, "Choose one")}</select></div>
          ${delivery}
        </div>
        <div class="form-row"><label class="form-label" for="ca-message">Message <span class="optional">(optional)</span></label><textarea class="form-input" id="ca-message" name="message" rows="4" maxlength="3000" placeholder="The teams, processes or tasks you want to improve"></textarea></div>
        <div class="ca-hp" aria-hidden="true"><label for="ca-website">Website</label><input id="ca-website" name="website" tabindex="-1" autocomplete="off"></div>
        <label class="consent-check"><input type="checkbox" name="consent" required> <span>I agree that Paleon Training may use these details to respond to my enquiry, as described in the <a href="/privacy">Privacy Policy</a>.</span></label>
        <label class="consent-check"><input type="checkbox" name="updates"> <span>Send me occasional updates about Paleon corporate training. I can unsubscribe at any time. <span class="optional">(optional)</span></span></label>
        <p class="form-error" id="caError" role="alert" hidden></p>
        <button type="submit" class="btn btn-signal btn-lg btn-block" id="caSubmit">Request Corporate Training Proposal</button>
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
function contactLine(line: string): string {
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
    `<li><a href="${c.site.path}">Paleon Training ${escapeHtml(c.name)}</a></li>`,
    `<li><a href="${coursePagePath(code, "ai-machine-learning-fundamentals")}">AI &amp; Machine Learning Fundamentals (individual course)</a></li>`,
    code === "NG" ? `<li><a href="/digital-skills-training-nigeria">Digital skills training in Nigeria</a></li>` : "",
    code === "NG" ? `<li><a href="/executive-training">Executive and corporate training</a></li>` : "",
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
    xDefault: corporateAiPath("NG"),
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
  ${section(c, "Responsible AI", { id: "responsible-ai" })}
  ${section(c, "Why Paleon Training?", { id: "why", dark: true, eyebrowOverride: "Why us" })}
  ${section(c, "Your corporate training journey", { id: "journey", eyebrowOverride: "How it works", listClass: "ca-steps" })}
  ${faq(c)}
  ${enquiry(code, c)}
  ${related(code)}
</main>
${footer(ctx, home)}
${scripts(ctx)}
<script src="/corporate-ai.js" defer></script>
</body>
</html>
`;
}
