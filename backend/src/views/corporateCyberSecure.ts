import { COUNTRIES, CountryCode, MARKET_ORDER } from "../constants/countries";
import { CYBERSECURE_REQUIREMENTS } from "../validators/corporateLeads.validators";
import {
  CORPORATE_HUB_PATH,
  EnquiryCopy,
  EnquiryForm,
  corporateAiPath,
  ctaButton,
  cyberSecurePath,
  enquiry,
  heading,
  rich,
} from "./corporateAiWorkflow";
import { CYBERSECURE_CONTENT, CyberBlock, CyberPageContent } from "./corporateCyberSecureContent";
import { ORIGIN, PageContext, SEARCH_OVERLAY, coursePagePath, escapeHtml, footer, head, header, scripts, whatsappAttr } from "./countryHome";

// The "CyberSecure Workforce" corporate cybersecurity awareness pages (2026-11-02): one per
// country at /<cc>/corporate-training/cybersecure-workforce. Copy lives in
// corporateCyberSecureContent.ts. They reuse the AI Workflow pages' styles, enquiry form
// and corporate-ai.js; enquiries are saved with source "cybersecure-workforce".
// Nigeria offers in-house, online and hybrid delivery and mentions ITF reimbursement;
// Ghana, Kenya and South Africa are live online only.

export { CYBERSECURE_SLUG, cyberSecurePath } from "./corporateAiWorkflow";

export const CYBER_CONSULTATION = "Book a Cybersecurity Training Consultation";
export const CYBER_PROPOSAL = "Request a Corporate Training Proposal";

export const CYBER_FORM: EnquiryForm = {
  programme: "cybersecure-workforce",
  consultation: CYBER_CONSULTATION,
  proposal: CYBER_PROPOSAL,
  submit: "Request Corporate Cybersecurity Training Proposal",
  requirements: CYBERSECURE_REQUIREMENTS,
  messagePlaceholder: "Your teams, concerns, or anything that has already happened",
};

// rich(), plus the copy's "**Name** (link: /path)" turned into a link.
function richLinks(value: string): string {
  return rich(value).replace(/<strong>([^<]+)<\/strong> \(link: (\/[a-z0-9/-]+)\)/g, '<a href="$2"><strong>$1</strong></a>');
}

function labelled(value: string): [string, string] | null {
  const m = /^\*\*([^*]+?):\*\*\s*(.*)$/.exec(value);
  return m ? [m[1], m[2]] : null;
}

function field(c: CyberPageContent, label: string): string {
  for (const block of c.sections.Hero.blocks) {
    if (!("p" in block)) continue;
    const l = labelled(block.p);
    if (l && l[0].toLowerCase().startsWith(label.toLowerCase())) return l[1];
  }
  return "";
}

function table(rows: string[][]): string {
  const [head, ...body] = rows;
  if (head.length === 4) {
    // Packages: name, length, who it is for, what it includes.
    return `<div class="ca-cards ca-cards-3 cs-packages">${body
      .map(
        ([name, length, forWhom, includes]) => `<div class="ca-card${/recommended/i.test(name) ? " cs-recommended" : ""}">
          <h3>${rich(name.replace(/\s*\(recommended\)/i, ""))}</h3>
          ${/recommended/i.test(name) ? '<p class="cs-tag">Recommended</p>' : ""}
          <p class="cs-meta"><strong>${escapeHtml(head[1])}:</strong> ${rich(length)}</p>
          <p class="cs-meta"><strong>${escapeHtml(head[2])}:</strong> ${rich(forWhom)}</p>
          <p>${rich(includes)}</p>
        </div>`,
      )
      .join("")}</div>`;
  }
  if (/question/i.test(head[1])) {
    // Scenarios: the situation, then the question participants answer.
    return `<div class="ca-cards cs-scenarios">${body
      .map(([situation, question]) => `<div class="ca-card"><p>${rich(situation)}</p><p class="cs-question">${rich(question)}</p></div>`)
      .join("")}</div>`;
  }
  return `<div class="ca-cards">${body.map(([a, b]) => `<div class="ca-card"><h3>${rich(a)}</h3><p>${rich(b)}</p></div>`).join("")}</div>`;
}

function blocks(list: CyberBlock[], dark: boolean, listClass = "ca-list"): string {
  return list
    .map((block) => {
      if ("ul" in block) return `<ul class="${listClass}">${block.ul.map((item) => `<li>${richLinks(item)}</li>`).join("")}</ul>`;
      if ("table" in block) return table(block.table);
      const l = labelled(block.p);
      if (l && /cta/i.test(l[0])) return `<div class="ca-ctas">${ctaButton(l[1], dark)}</div>`;
      return `<p class="ca-p">${richLinks(block.p)}</p>`;
    })
    .join("\n");
}

function section(
  c: CyberPageContent,
  key: string,
  opts: { id: string; dark?: boolean; titleOverride?: string; eyebrowOverride?: string; aside?: string; listClass?: string; body?: string },
): string {
  const s = c.sections[key];
  const h = heading(s.h);
  const eyebrow = opts.eyebrowOverride ?? h.eyebrow;
  const title = opts.titleOverride ?? h.title;
  const body = opts.body ?? blocks(s.blocks, Boolean(opts.dark), opts.listClass);
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

function image(cc: string, slot: string, alt: string): string {
  return `<img class="ca-img" src="/images/cybersecure/${cc}-${slot}.jpg" alt="${escapeHtml(alt)}" width="1200" height="675" loading="lazy" decoding="async">`;
}

// The 12 modules as four stage columns, numbered 1 to 12, then the section's CTA.
function modules(c: CyberPageContent): string {
  const stages: { name: string; items: string[] }[] = [];
  const rest: CyberBlock[] = [];
  for (const block of c.sections["Course structure"].blocks) {
    if ("p" in block && /^\*\*Stage \d/.test(block.p)) stages.push({ name: block.p.replace(/\*\*/g, ""), items: [] });
    else if ("ul" in block && stages.length) stages[stages.length - 1].items.push(...block.ul);
    else rest.push(block);
  }
  let n = 0;
  const grid = stages
    .map((s) => {
      const [num, label] = s.name.split(" — ");
      return `<div class="cs-stage"><p class="cs-stage-name"><span>${escapeHtml(num)}</span> ${escapeHtml(label ?? "")}</p><ol class="cs-modules" start="${n + 1}">${s.items
        .map((item) => {
          n += 1;
          return `<li><span class="cs-num">${n}</span><div>${rich(item)}</div></li>`;
        })
        .join("")}</ol></div>`;
    })
    .join("");
  return `<div class="cs-stages">${grid}</div>
  ${blocks(rest, false)}`;
}

function hero(code: CountryCode, c: CyberPageContent): string {
  const cc = code.toLowerCase();
  const trust = field(c, "Trust line")
    .split(" · ")
    .map((t) => `<li>${rich(t)}</li>`)
    .join("");
  return `<section class="hero ca-hero" id="top">
    <div class="wrap ca-hero-grid">
      <div class="hero-inner ca-hero-copy">
        <span class="eyebrow">${escapeHtml(field(c, "Eyebrow"))}</span>
        <h1 class="hero-title ca-hero-title">${escapeHtml(field(c, "H1"))}</h1>
        <p class="ca-headline">${rich(field(c, "Headline line"))}</p>
        <p class="hero-sub">${rich(field(c, "Supporting statement"))}</p>
        <div class="hero-ctas">
          ${ctaButton(field(c, "Primary CTA") || CYBER_CONSULTATION, true)}
          ${ctaButton(field(c, "Secondary CTA") || CYBER_PROPOSAL, true)}
        </div>
        <ul class="ca-trust">${trust}</ul>
      </div>
      <div class="ca-hero-media">
        <img src="/images/cybersecure/${cc}-hero.jpg" alt="${escapeHtml(c.images.hero)}" width="1600" height="900" fetchpriority="high" decoding="async">
      </div>
    </div>
  </section>
  <section class="ca-definition" aria-label="About the programme">
    <div class="wrap"><p>${rich(field(c, "Definition box"))}</p></div>
  </section>`;
}

export function cyberFaqItems(c: CyberPageContent): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  for (const block of c.sections["Frequently asked questions"].blocks) {
    if (!("p" in block)) continue;
    const m = /^\*\*(.+?\?)\*\*\s*(.*)$/.exec(block.p);
    if (m) out.push({ q: m[1], a: m[2] });
  }
  return out;
}

function faq(c: CyberPageContent): string {
  const items = cyberFaqItems(c)
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

function finalCopy(c: CyberPageContent): EnquiryCopy {
  const final = c.sections["Final CTA"].blocks.filter((b): b is { p: string } => "p" in b).map((b) => b.p);
  const [title, lede, , note, contact] = final;
  return { title: (title ?? "").replace(/\*\*/g, ""), lede: lede ?? "", note: note ?? "", contact: contact ?? "" };
}

function related(code: CountryCode): string {
  const c = COUNTRIES[code];
  const links = [
    `<li><a href="${CORPORATE_HUB_PATH}">All corporate training</a></li>`,
    `<li><a href="${corporateAiPath(code)}">AI Workflow Productivity for teams in ${escapeHtml(c.name)}</a></li>`,
    `<li><a href="${coursePagePath(code, "cyber-security-fundamentals")}">Cyber Security Fundamentals (individual course)</a></li>`,
    `<li><a href="${c.site.path}">Paleon Training ${escapeHtml(c.name)}</a></li>`,
    code === "NG" ? `<li><a href="/corporate-training-nigeria">Corporate course packages in Nigeria</a></li>` : "",
    ...MARKET_ORDER.filter((k) => k !== code).map(
      (k) => `<li><a href="${cyberSecurePath(k)}" hreflang="${COUNTRIES[k].site.locale}">Cybersecurity awareness training in ${escapeHtml(COUNTRIES[k].name)}</a></li>`,
    ),
  ].filter(Boolean);
  return `<section class="section section-paper ca-section ca-related" aria-labelledby="related-title">
    <div class="wrap">
      <h2 class="section-title" id="related-title">Related</h2>
      <ul class="ca-links">${links.join("")}</ul>
    </div>
  </section>`;
}

function jsonLd(code: CountryCode, c: CyberPageContent, url: string): object {
  const country = COUNTRIES[code].name;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${url}#course`,
        name: "CyberSecure Workforce",
        description: field(c, "Definition box").replace(/\*\*/g, ""),
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
        mainEntity: cyberFaqItems(c).map((f) => ({
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

export function renderCyberSecure(code: CountryCode): string {
  const c = CYBERSECURE_CONTENT[code];
  const cc = code.toLowerCase();
  const ctx: PageContext = { country: code, hub: false, detected: null, chosen: null };
  const home = COUNTRIES[code].site.path;
  const canonicalPath = cyberSecurePath(code);
  const ogImage = `${ORIGIN}/images/og/cybersecure-workforce-${cc}.jpg`;
  const headHtml = head(ctx, {
    title: c.title,
    description: c.description,
    canonicalPath,
    alternatesFor: cyberSecurePath,
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
  ${section(c, "Problem", { id: "problem", eyebrowOverride: "The challenge", listClass: "ca-list ca-list-x", aside: image(cc, "awareness", c.images.awareness) })}
  ${section(c, "Solution", { id: "solution", dark: true, eyebrowOverride: "The solution", listClass: "ca-steps" })}
  ${section(c, "Business benefits", { id: "benefits", eyebrowOverride: "Business benefits", titleOverride: "What your organisation gains" })}
  ${section(c, "Course structure", { id: "modules", eyebrowOverride: "Course structure", body: modules(c) })}
  ${section(c, "Who should attend?", { id: "attend", dark: true, eyebrowOverride: "Who it is for" })}
  ${section(c, "Department applications", { id: "departments", eyebrowOverride: "By department", titleOverride: "How each team uses it" })}
  ${section(c, "Practical learning", { id: "practice", dark: true })}
  ${section(c, "Workplace scenarios", { id: "scenarios" })}
  ${section(c, "AI + cybersecurity", { id: "ai-security", dark: true, aside: image(cc, "scenario", c.images.scenario) })}
  ${section(c, "Corporate delivery options", { id: "delivery", eyebrowOverride: "Delivery", aside: image(cc, "training", c.images.training) })}
  ${section(c, "Corporate packages", { id: "packages", dark: true, eyebrowOverride: "Packages", titleOverride: "Three ways to run the programme" })}
  ${section(c, "Measurement and deliverables", { id: "measurement" })}
  ${section(c, "Your corporate training journey", { id: "journey", dark: true, eyebrowOverride: "How it works", listClass: "ca-steps" })}
  ${section(c, "Why Paleon Training?", { id: "why", eyebrowOverride: "Why us" })}
  ${faq(c)}
  ${enquiry(code, finalCopy(c), CYBER_FORM)}
  ${related(code)}
</main>
${footer(ctx, home)}
${scripts(ctx)}
<script src="/corporate-ai.js" defer></script>
</body>
</html>
`;
}
