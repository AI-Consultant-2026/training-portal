import { COUNTRIES, CountryCode, MARKET_ORDER } from "../constants/countries";
import { ACCELERATOR_REQUIREMENTS } from "../validators/corporateLeads.validators";
import {
  CORPORATE_HUB_PATH,
  EnquiryCopy,
  EnquiryForm,
  acceleratorPath,
  corporateAiPath,
  ctaButton,
  cyberSecurePath,
  enquiry,
  heading,
  rich,
  WORKFORCE_CTA,
} from "./corporateAiWorkflow";
import { areaServed, cityList, countryCorporatePath, deliveryPhrase, ORGANIZATION_LD } from "./corporateLocal";
import { ACCELERATOR_CONTENT, AccBlock, AccPageContent } from "./corporateAcceleratorContent";
import { ORIGIN, PageContext, SEARCH_OVERLAY, coursePagePath, escapeHtml, corporateUtilBar, footer, head, header, scripts, whatsappAttr } from "./countryHome";
import { pricingFaqAnswer, pricingSection } from "./corporatePricing";
import { trainerStandards } from "./trainerStandards";
import {
  cohortNotice,
  cohortSentence,
  callButton,
  forwardSection,
  outcomesSection,
  pilotSection,
  readinessButton,
  reserveButton,
  waysToBuySection,
} from "./corporateOffers";

// The "AI + Cybersecurity Professional Accelerator" corporate pages (2026-11-02): one per
// country at /<cc>/corporate-training/ai-cybersecurity-professional-accelerator. Copy lives in
// corporateAcceleratorContent.ts. Same styles, enquiry form and corporate-ai.js as the AI
// Workflow and CyberSecure Workforce pages; enquiries are saved with source "ai-cyber-accelerator".
// Every country offers self-paced online learning, or live online, in-house and hybrid
// delivery by quote (2026-11-13); Nigeria also mentions ITF reimbursement.

export { ACCELERATOR_SLUG, acceleratorPath } from "./corporateAiWorkflow";

export const ACC_CONSULTATION = "Book an AI + Cybersecurity Consultation"; // enquiry form only (no longer shown)
export const ACC_PROPOSAL = "Request In-House Training Proposal";

export const ACC_FORM: EnquiryForm = {
  programme: "ai-cyber-accelerator",
  consultation: ACC_CONSULTATION,
  proposal: ACC_PROPOSAL,
  submit: "Request In-House Training Proposal",
  requirements: ACCELERATOR_REQUIREMENTS,
  messagePlaceholder: "Your AI plans, the teams you want to develop, or the challenges you face",
};

// rich(), plus the copy's "Name (link: /path)" and "**Name** (link: /path)" turned into links.
function richLinks(value: string): string {
  return rich(value)
    .replace(/<strong>([^<]+)<\/strong> \(link: (\/[a-z0-9/-]+)\)/g, '<a href="$2"><strong>$1</strong></a>')
    .replace(/^([^<(]+?) \(link: (\/[a-z0-9/-]+)\)$/, '<a href="$2">$1</a>');
}

function labelled(value: string): [string, string] | null {
  const m = /^\*\*([^*]+?):\*\*\s*(.*)$/.exec(value);
  return m ? [m[1], m[2]] : null;
}

function field(c: AccPageContent, label: string): string {
  for (const block of c.sections.Hero.blocks) {
    if (!("p" in block)) continue;
    const l = labelled(block.p);
    if (l && l[0].toLowerCase().startsWith(label.toLowerCase())) return l[1];
  }
  return "";
}

function table(rows: string[][]): string {
  const [head, ...body] = rows;
  if (head.length === 3) {
    // The programme comparison: one card per programme, this one highlighted.
    return `<div class="ca-cards ca-cards-3 ac-compare">${body
      .map(([name, bestFor, focus]) => {
        const here = /Accelerator/.test(name);
        return `<div class="ca-card${here ? " ac-here" : ""}">
          ${here ? '<p class="cs-tag">This programme</p>' : ""}
          <h3>${richLinks(name)}</h3>
          <p class="cs-meta"><strong>${escapeHtml(head[1])}:</strong> ${rich(bestFor)}</p>
          <p class="cs-meta"><strong>${escapeHtml(head[2])}:</strong> ${rich(focus)}</p>
        </div>`;
      })
      .join("")}</div>`;
  }
  if (/practise/i.test(head[1])) {
    // Scenarios: the situation, then what participants practise.
    return `<div class="ca-cards cs-scenarios">${body
      .map(([situation, practise]) => `<div class="ca-card"><p>${rich(situation)}</p><p class="cs-question">${rich(practise)}</p></div>`)
      .join("")}</div>`;
  }
  return `<div class="ca-cards">${body.map(([a, b]) => `<div class="ca-card"><h3>${rich(a)}</h3><p>${rich(b)}</p></div>`).join("")}</div>`;
}

function blocks(list: AccBlock[], dark: boolean, listClass = "ca-list"): string {
  return list
    .map((block) => {
      if ("ul" in block) return `<ul class="${listClass}">${block.ul.map((item) => `<li>${richLinks(item)}</li>`).join("")}</ul>`;
      if ("table" in block) return table(block.table);
      const l = labelled(block.p);
      if (l && /cta/i.test(l[0])) return `<div class="ca-ctas">${ctaButton(l[1], dark, "#buy", "accelerator")}</div>`;
      if (/^\*\*[^*]+↔[^*]+\*\*$/.test(block.p)) return `<p class="ac-bridge">${rich(block.p)}</p>`;
      return `<p class="ca-p">${richLinks(block.p)}</p>`;
    })
    .join("\n");
}

function section(
  c: AccPageContent,
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
  return `<img class="ca-img" src="/images/accelerator/${cc}-${slot}.jpg" alt="${escapeHtml(alt)}" width="1200" height="675" loading="lazy" decoding="async">`;
}

// The 12 modules as four stage columns, numbered 1 to 12, then the section's other blocks.
function modules(c: AccPageContent): string {
  const stages: { name: string; items: string[] }[] = [];
  const rest: AccBlock[] = [];
  for (const block of c.sections["Programme structure"].blocks) {
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

function hero(code: CountryCode, c: AccPageContent): string {
  const cc = code.toLowerCase();
  const trust = field(c, "Trust line")
    .split(" · ")
    .map((t) => `<li>${rich(t)}</li>`)
    .join("");
  return `<section class="hero ca-hero" id="top">
    <div class="wrap cs-crumb-wrap"><p class="pw-crumb"><a href="${countryCorporatePath(code)}">Corporate training in ${escapeHtml(COUNTRIES[code].name)}</a> <span aria-hidden="true">/</span> AI and cybersecurity training for professionals in ${escapeHtml(COUNTRIES[code].name)}</p></div>
    <div class="wrap ca-hero-grid">
      <div class="hero-inner ca-hero-copy">
        <span class="eyebrow">${escapeHtml(field(c, "Eyebrow"))}</span>
        <h1 class="hero-title ca-hero-title">${escapeHtml(field(c, "H1"))}</h1>
        <p class="ca-headline">${rich(field(c, "Headline line"))}</p>
        <p class="hero-sub">${rich(field(c, "Supporting statement"))}</p>
        ${cohortNotice("accelerator")}
        <div class="hero-ctas">
          ${reserveButton("accelerator")}
          ${readinessButton(code, true)}
        </div>
        <ul class="ca-trust">${trust}</ul>
      </div>
      <div class="ca-hero-media">
        <img src="/images/accelerator/${cc}-hero.jpg" alt="${escapeHtml(c.images.hero)}" width="1600" height="900" fetchpriority="high" decoding="async">
      </div>
    </div>
  </section>
  <section class="ca-definition" aria-label="About the programme">
    <div class="wrap"><p>${rich(field(c, "Definition box"))}</p></div>
  </section>`;
}

// Local SEO (2026-11-08): extra FAQs per country (cities, start date, cost, starting with
// CyberSecure Workforce), placed before the proposal question and in the FAQPage JSON-LD.
// The next live cohort is December 2026 (corporateOffers.ts), as on the corporate hub.
function extraFaqs(code: CountryCode): { q: string; a: string }[] {
  const country = COUNTRIES[code].name;
  return [
    {
      q: `Do you offer AI and cybersecurity training for professionals in ${cityList(code)}?`,
      a: `Yes. The AI + Cybersecurity Professional Accelerator is delivered ${deliveryPhrase(code)} for IT, security, risk, data and digital teams in ${cityList(code)} and anywhere else in ${country}. Choose self-paced online learning for each participant, or live online, in-house or hybrid delivery by quote. ${cohortSentence("accelerator")}`,
    },
    {
      q: "When can our team start?",
      a: `Self-paced places can start today. For live delivery, ${cohortSentence("accelerator").charAt(0).toLowerCase()}${cohortSentence("accelerator").slice(1)} Reserve now and we will agree the participants and the capstone challenge with you in advance.`,
    },
    {
      q: "How much does the AI + Cybersecurity Professional Accelerator cost?",
      a: pricingFaqAnswer(code, "accelerator"),
    },
    {
      q: "Can we train the rest of our staff in cybersecurity too?",
      a: `Yes. CyberSecure Workforce, our cybersecurity awareness programme for every employee, is available now for companies in ${country}. Many organisations train the whole workforce and develop their specialists through the Accelerator at the same time.`,
    },
  ];
}

function faqItems(c: AccPageContent, code?: CountryCode): { q: string; a: string }[] {
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
    "We train in-house at your offices or sites, live online, or a mix of both, or participants can learn self-paced online" +
    (code === "NG" ? ", and we provide the attendance records and documentation for ITF reimbursement claims." : ".");
  return `<section class="section section-paper ca-section" id="where" aria-labelledby="where-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Where we train</span>
      <h2 class="section-title" id="where-title">AI and cybersecurity training for professionals across ${escapeHtml(country)}</h2>
      ${cohortNotice("accelerator")}
      <p class="ca-p">Paleon Training runs the AI + Cybersecurity Professional Accelerator for IT, security, risk, data and digital teams in ${escapeHtml(cityList(code))}, and anywhere else in ${escapeHtml(country)}. ${escapeHtml(how)}</p>
      <p class="ca-p">Scenarios and the capstone are adapted to your sector: banking and financial services, energy and mining, telecoms, healthcare, education, government and professional services. Need cybersecurity awareness for every employee now? <a href="${cyberSecurePath(code)}"><strong>CyberSecure Workforce</strong></a> is available today.</p>
      <div class="ca-ctas">${reserveButton("accelerator")}${callButton(false)}</div>
    </div>
  </section>`;
}

function faq(code: CountryCode, c: AccPageContent): string {
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

function finalCopy(c: AccPageContent): EnquiryCopy {
  const final = c.sections["Final CTA"].blocks.filter((b): b is { p: string } => "p" in b).map((b) => b.p);
  const [title, lede, , note, contact] = final;
  return { title: (title ?? "").replace(/\*\*/g, ""), lede: lede ?? "", note: note ?? "", contact: contact ?? "" };
}

function related(code: CountryCode): string {
  const c = COUNTRIES[code];
  const links = [
    `<li><a href="${countryCorporatePath(code)}">All corporate training in ${escapeHtml(COUNTRIES[code].name)}</a></li>`,
    `<li><a href="${corporateAiPath(code)}">AI Workflow Productivity for teams in ${escapeHtml(c.name)}</a></li>`,
    `<li><a href="${cyberSecurePath(code)}">CyberSecure Workforce: awareness for all staff</a></li>`,
    `<li><a href="${coursePagePath(code, "ai-machine-learning-fundamentals")}">AI &amp; Machine Learning Fundamentals (individual course)</a></li>`,
    `<li><a href="${c.site.path}">Paleon Training ${escapeHtml(c.name)}</a></li>`,
    code === "NG" ? `<li><a href="/ng/corporate-training">Corporate training in Nigeria</a></li>` : "",
    code === "NG" ? `<li><a href="/digital-skills-training-nigeria">Digital skills training in Nigeria</a></li>` : "",
    ...MARKET_ORDER.filter((k) => k !== code).map(
      (k) => `<li><a href="${acceleratorPath(k)}" hreflang="${COUNTRIES[k].site.locale}">AI and cybersecurity training in ${escapeHtml(COUNTRIES[k].name)}</a></li>`,
    ),
  ].filter(Boolean);
  return `<section class="section section-paper ca-section ca-related" aria-labelledby="related-title">
    <div class="wrap">
      <h2 class="section-title" id="related-title">Related</h2>
      <ul class="ca-links">${links.join("")}</ul>
    </div>
  </section>`;
}

function jsonLd(code: CountryCode, c: AccPageContent, url: string): object {
  const country = COUNTRIES[code].name;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${url}#course`,
        name: "AI + Cybersecurity Professional Accelerator",
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
        name: `AI and cybersecurity training for professionals in ${country}`,
        serviceType: "AI and cybersecurity professional training",
        description: c.description,
        url,
        provider: { "@id": `${ORIGIN}/#organization` },
        areaServed: areaServed(code),
        audience: { "@type": "BusinessAudience", audienceType: "IT, security, risk, data and digital teams" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: `Corporate training in ${COUNTRIES[code].name}`, item: `${ORIGIN}${countryCorporatePath(code)}` },
          { "@type": "ListItem", position: 3, name: `AI and cybersecurity training in ${country}`, item: url },
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

export function renderAccelerator(code: CountryCode): string {
  const c = ACCELERATOR_CONTENT[code];
  const cc = code.toLowerCase();
  const ctx: PageContext = { country: code, hub: false, detected: null, chosen: null };
  const home = COUNTRIES[code].site.path;
  const canonicalPath = acceleratorPath(code);
  const ogImage = `${ORIGIN}/images/og/ai-cyber-accelerator-${cc}.jpg`;
  const headHtml = head(ctx, {
    title: c.title,
    description: c.description,
    canonicalPath,
    alternatesFor: acceleratorPath,
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
  ${outcomesSection("accelerator", code)}
  ${section(c, "Problem", { id: "problem", eyebrowOverride: "The challenge", listClass: "ca-list ca-list-x" })}
  ${section(c, "Solution", { id: "solution", dark: true, eyebrowOverride: "The approach", listClass: "ca-steps", aside: image(cc, "ai", c.images.ai) })}
  ${section(c, "Business benefits", { id: "benefits", eyebrowOverride: "Business benefits", titleOverride: "What your organisation gains" })}
  ${section(c, "Why invest", { id: "why-invest", dark: true })}
  ${section(c, "Programme structure", { id: "modules", eyebrowOverride: "Programme structure", body: modules(c) })}
  ${section(c, "Who should attend?", { id: "attend", dark: true, eyebrowOverride: "Who it is for" })}
  ${section(c, "Workplace scenarios", { id: "scenarios" })}
  ${section(c, "Capstone", { id: "capstone", dark: true, aside: image(cc, "transformation", c.images.transformation) })}
  ${section(c, "Responsible AI", { id: "responsible-ai", aside: image(cc, "security", c.images.security) })}
  ${waysToBuySection("accelerator", code, true)}
  ${section(c, "Your corporate training journey", { id: "journey", eyebrowOverride: "How it works", listClass: "ca-steps" })}
  ${section(c, "Programme comparison", { id: "compare", dark: true })}
  ${section(c, "Why Paleon Training?", { id: "why", eyebrowOverride: "Why us" })}
  ${pricingSection(code, "accelerator", true)}
  ${pilotSection(code, "accelerator", false)}
  ${forwardSection(code, "accelerator", true)}
  ${whereWeTrain(code)}
  ${trainerStandards()}
  ${faq(code, c)}
  ${enquiry(code, finalCopy(c), ACC_FORM)}
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
