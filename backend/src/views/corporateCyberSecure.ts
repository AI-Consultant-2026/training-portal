import { COUNTRIES, CountryCode, MARKET_ORDER } from "../constants/countries";
import { CYBERSECURE_REQUIREMENTS } from "../validators/corporateLeads.validators";
import {
  CORPORATE_HUB_PATH,
  EnquiryCopy,
  acceleratorPath,
  EnquiryForm,
  corporateAiPath,
  ctaButton,
  cyberSecurePath,
  enquiry,
  heading,
  rich,
  WORKFORCE_CTA,
} from "./corporateAiWorkflow";
import { CYBERSECURE_CONTENT, CyberBlock, CyberPageContent } from "./corporateCyberSecureContent";
import { CITIES, cityList, countryCorporatePath, deliveryPhrase, ORGANIZATION_LD } from "./corporateLocal";
import { ORIGIN, PageContext, SEARCH_OVERLAY, coursePagePath, escapeHtml, corporateUtilBar, footer, head, header, scripts, whatsappAttr } from "./countryHome";
import { pricingFaqAnswer, pricingSection } from "./corporatePricing";
import { trainerStandards } from "./trainerStandards";
import { callButton, forwardSection, outcomesSection, pilotSection, readinessButton, waysToBuySection } from "./corporateOffers";

// The "CyberSecure Workforce" corporate cybersecurity awareness pages (2026-11-02): one per
// country at /<cc>/corporate-training/cybersecure-workforce. Copy lives in
// corporateCyberSecureContent.ts. They reuse the AI Workflow pages' styles, enquiry form
// and corporate-ai.js; enquiries are saved with source "cybersecure-workforce".
// Every country offers self-paced online learning, or live online, in-house and hybrid
// delivery by quote (2026-11-13); Nigeria also mentions ITF reimbursement.

export { CYBERSECURE_SLUG, cyberSecurePath } from "./corporateAiWorkflow";

export const CYBER_CONSULTATION = "Book a Cybersecurity Consultation";
export const CYBER_PROPOSAL = "Request In-House Training Proposal";

export const CYBER_FORM: EnquiryForm = {
  programme: "cybersecure-workforce",
  consultation: CYBER_CONSULTATION,
  proposal: CYBER_PROPOSAL,
  submit: "Request In-House Training Proposal",
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
  opts: {
    id: string;
    dark?: boolean;
    titleOverride?: string;
    eyebrowOverride?: string;
    aside?: string;
    listClass?: string;
    body?: string;
    after?: string;
  },
): string {
  const s = c.sections[key];
  const h = heading(s.h);
  const eyebrow = opts.eyebrowOverride ?? h.eyebrow;
  const title = opts.titleOverride ?? h.title;
  const body = (opts.body ?? blocks(s.blocks, Boolean(opts.dark), opts.listClass)) + (opts.after ?? "");
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
    <div class="wrap cs-crumb-wrap"><p class="pw-crumb"><a href="${countryCorporatePath(code)}">Corporate training in ${escapeHtml(COUNTRIES[code].name)}</a> <span aria-hidden="true">/</span> Cybersecurity awareness training in ${escapeHtml(COUNTRIES[code].name)}</p></div>
    <div class="wrap ca-hero-grid">
      <div class="hero-inner ca-hero-copy">
        <span class="eyebrow">${escapeHtml(field(c, "Eyebrow"))}</span>
        <h1 class="hero-title ca-hero-title">${escapeHtml(field(c, "H1"))}</h1>
        <p class="ca-headline">${rich(field(c, "Headline line"))}</p>
        <p class="hero-sub">${rich(field(c, "Supporting statement"))}</p>
        <div class="hero-ctas">
          ${ctaButton(WORKFORCE_CTA, true)}
          ${readinessButton(code, true)}
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

// Local SEO (2026-11-08): the cities each page names, plus three extra FAQs per country
// (cities, cost, combining with AI training) that also feed the FAQPage JSON-LD.
function extraFaqs(code: CountryCode): { q: string; a: string }[] {
  const country = COUNTRIES[code].name;
  return [
    {
      q: `Do you offer cybersecurity awareness training for companies in ${cityList(code)}?`,
      a: `Yes. CyberSecure Workforce is delivered ${deliveryPhrase(code)} for companies in ${cityList(code)} and anywhere else in ${country}. Every session is scheduled around your working day.`,
    },
    {
      q: "How much does cybersecurity awareness training for employees cost?",
      a: pricingFaqAnswer(code, "cybersecure"),
    },
    {
      q: "Can we combine cybersecurity training with AI training for our staff?",
      a: `Yes. Many organisations pair CyberSecure Workforce with AI Workflow Productivity & Process Transformation, so staff learn to use AI tools and to recognise the new risks they bring. Both are available for companies in ${country}.`,
    },
  ];
}

export function cyberFaqItems(c: CyberPageContent, code?: CountryCode): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  for (const block of c.sections["Frequently asked questions"].blocks) {
    if (!("p" in block)) continue;
    const m = /^\*\*(.+?\?)\*\*\s*(.*)$/.exec(block.p);
    if (m) out.push({ q: m[1], a: m[2] });
  }
  if (code) {
    // Keep "How do we request a proposal?" last: the new questions go before it.
    const last = out.length && /proposal\?$/i.test(out[out.length - 1].q) ? out.pop() : undefined;
    out.push(...extraFaqs(code));
    if (last) out.push(last);
  }
  return out;
}

function faq(code: CountryCode, c: CyberPageContent): string {
  const items = cyberFaqItems(c, code)
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

function whereWeTrain(code: CountryCode): string {
  const country = COUNTRIES[code].name;
  const how =
    "We train in-house at your offices or sites, live online, or a mix of both, or your staff can learn self-paced online" +
    (code === "NG" ? ", and we provide the attendance records and documentation for ITF reimbursement claims." : ".");
  return `<section class="section section-paper ca-section" id="where" aria-labelledby="where-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Where we train</span>
      <h2 class="section-title" id="where-title">Cybersecurity awareness training for employees across ${escapeHtml(country)}</h2>
      <p class="ca-p">Paleon Training runs CyberSecure Workforce for companies in ${escapeHtml(cityList(code))}, and anywhere else in ${escapeHtml(country)}. ${escapeHtml(how)}</p>
      <p class="ca-p">Sessions are scheduled around your working day, and examples are adapted to your sector: banking and financial services, energy and mining, telecoms, healthcare, education, government and professional services.</p>
      <div class="ca-ctas">${ctaButton(CYBER_PROPOSAL, false)}${callButton(false)}</div>
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
    `<li><a href="${countryCorporatePath(code)}">All corporate training in ${escapeHtml(COUNTRIES[code].name)}</a></li>`,
    `<li><a href="${corporateAiPath(code)}">AI Workflow Productivity for teams in ${escapeHtml(c.name)}</a></li>`,
    `<li><a href="${acceleratorPath(code)}">AI + Cybersecurity Professional Accelerator for specialists</a></li>`,
    `<li><a href="${coursePagePath(code, "cyber-security-fundamentals")}">Cyber Security Fundamentals (individual course)</a></li>`,
    `<li><a href="${c.site.path}">Paleon Training ${escapeHtml(c.name)}</a></li>`,
    code === "NG" ? `<li><a href="/ng/corporate-training">Corporate training in Nigeria</a></li>` : "",
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
          courseMode: ["online", "onsite", "blended"],
          location: { "@type": "Country", name: country },
        },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `Cybersecurity awareness training for employees in ${country}`,
        serviceType: "Cybersecurity awareness training",
        description: c.description,
        url,
        provider: { "@id": `${ORIGIN}/#organization` },
        areaServed: [
          { "@type": "Country", name: country },
          ...CITIES[code].map((name) => ({ "@type": "City", name })),
        ],
        audience: { "@type": "BusinessAudience", audienceType: "Companies and organisations" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: `Corporate training in ${COUNTRIES[code].name}`, item: `${ORIGIN}${countryCorporatePath(code)}` },
          { "@type": "ListItem", position: 3, name: `Cybersecurity awareness training in ${country}`, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: cyberFaqItems(c, code).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\*\*/g, "") },
        })),
      },
      ORGANIZATION_LD,
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
${corporateUtilBar(home)}
${header(ctx, home, "/", true)}
<main id="main">
  ${hero(code, c)}
  ${outcomesSection("cybersecure", code)}
  ${section(c, "Problem", { id: "problem", eyebrowOverride: "The challenge", listClass: "ca-list ca-list-x", aside: image(cc, "awareness", c.images.awareness) })}
  ${section(c, "Solution", { id: "solution", dark: true, eyebrowOverride: "The solution", listClass: "ca-steps" })}
  ${section(c, "Business benefits", { id: "benefits", eyebrowOverride: "Business benefits", titleOverride: "What your organisation gains" })}
  ${section(c, "Course structure", { id: "modules", eyebrowOverride: "Course structure", body: modules(c) })}
  ${section(c, "Who should attend?", { id: "attend", dark: true, eyebrowOverride: "Who it is for" })}
  ${section(c, "Department applications", { id: "departments", eyebrowOverride: "By department", titleOverride: "How each team uses it" })}
  ${section(c, "Practical learning", { id: "practice", dark: true })}
  ${section(c, "Workplace scenarios", { id: "scenarios" })}
  ${section(c, "AI + cybersecurity", {
    id: "ai-security",
    dark: true,
    aside: image(cc, "scenario", c.images.scenario),
    after: `<p class="ca-p">For IT, risk and digital teams who need deeper skills, see the <a href="${acceleratorPath(code)}"><strong>AI + Cybersecurity Professional Accelerator</strong></a>.</p>`,
  })}
  ${waysToBuySection("cybersecure", code, false)}
  ${section(c, "Corporate packages", { id: "packages", dark: true, eyebrowOverride: "Packages", titleOverride: "Three ways to run the programme" })}
  ${pricingSection(code, "cybersecure", false)}
  ${pilotSection(code, "cybersecure", true)}
  ${forwardSection(code, "cybersecure", false)}
  ${section(c, "Measurement and deliverables", { id: "measurement", dark: true })}
  ${section(c, "Your corporate training journey", { id: "journey", eyebrowOverride: "How it works", listClass: "ca-steps" })}
  ${section(c, "Why Paleon Training?", { id: "why", dark: true, eyebrowOverride: "Why us" })}
  ${whereWeTrain(code)}
  ${trainerStandards()}
  ${faq(code, c)}
  ${enquiry(code, finalCopy(c), CYBER_FORM)}
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
