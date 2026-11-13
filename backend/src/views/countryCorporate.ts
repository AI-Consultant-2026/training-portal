import { GUIDES } from "../constants/corporateGuides";
import { COUNTRIES, CountryCode } from "../constants/countries";
import {
  CORPORATE_CONTACT,
  CORPORATE_HUB_PATH,
  acceleratorPath,
  corporateAiPath,
  ctaButton,
  cyberSecurePath,
  enquiry,
  WORKFORCE_CTA,
  NG_CORPORATE_HERO_ALT,
} from "./corporateAiWorkflow";
import { CORPORATE_AI_CONTENT } from "./corporateAiWorkflowContent";
import { CITIES, DATA_PROTECTION_LAW, WHO_WE_SERVE, servingLine, ORGANIZATION_LD, areaServed, cityList, countryCorporatePath, deliveryPhrase } from "./corporateLocal";
import { ORIGIN, PageContext, SEARCH_OVERLAY, escapeHtml, corporateUtilBar, footer, head, header, scripts, whatsappAttr } from "./countryHome";
import { pricingFaqAnswer, pricingSummaryTable } from "./corporatePricing";
import { trainerStandards } from "./trainerStandards";
import {
  onboardingSummary,
  cohortNotice,
  callButton,
  forwardSection,
  outcomeList,
  pilotSection,
  readinessButton,
  reserveButton,
  waysToBuyBrief,
} from "./corporateOffers";
import { SECTORS, SECTORS_PATH } from "./corporateSectorsData";

// Corporate training pages for South Africa, Kenya and Ghana (2026-11-08) and Nigeria
// (2026-11-09, replacing the static /corporate-training-nigeria, which now 301s) at
// /ng, /za, /ke and /gh/corporate-training: the country's corporate landing page, linked from
// the homepage's "Choose your country" selector, the header country menu and the footer's
// country links. Each lists the three corporate programmes for that country. Since
// 2026-11-13 every country offers online training only, per learner or in a private company portal (self-paced, private to the
// client's staff; never live, facilitator-led or hybrid); Nigeria's also supports ITF claims.

export const COUNTRY_CORPORATE_CODES: CountryCode[] = ["NG", "ZA", "KE", "GH"];

const ITF_NOTE =
  "Registered employers who contribute to the Industrial Training Fund (ITF) can use our training records and attendance evidence to support a reimbursement claim. Eligibility and the amount reimbursed are decided by the ITF.";



function faqs(code: CountryCode): { q: string; a: string }[] {
  const country = COUNTRIES[code].name;
  return [
    {
      q: `Which corporate training programmes do you offer in ${country}?`,
      a: `Three: AI Workflow Productivity & Process Transformation (AI training for employees), CyberSecure Workforce (cybersecurity awareness training for all staff) and the AI + Cybersecurity Professional Accelerator (for IT, security, risk, data and digital professionals). Many organisations combine them.`,
    },
    {
      q: `Do you train companies in ${cityList(code)}?`,
      a: `Yes. Training is delivered ${deliveryPhrase(code)} for organisations in ${cityList(code)} and anywhere else in ${country}, so every office, branch and remote worker can take the same practical courses online.`,
    },
    ...(code === "NG"
      ? [{ q: "Can the training support an ITF reimbursement claim?", a: `Yes. ${ITF_NOTE}` }]
      : []),
    {
      q: "When can our team start?",
      a: onboardingSummary(),
    },
    {
      q: "Can the training be customised for our organisation?",
      a: "Yes. We adapt examples, exercises and the workplace project to your sector, departments and the tools your staff use.",
    },
    {
      q: "How much does corporate training cost?",
      a: pricingFaqAnswer(code, null),
    },
    {
      q: "How do we get started?",
      a: "Take the free Readiness Check, book a 20-minute call, or request a proposal using the form on this page. You can also email corporate@paleontraining.com.",
    },
  ];
}

function jsonLd(code: CountryCode, url: string, title: string, description: string): object {
  const country = COUNTRIES[code].name;
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION_LD,
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: title,
        description,
        inLanguage: COUNTRIES[code].site.locale,
        breadcrumb: { "@id": `${url}#breadcrumb` },
        about: { "@id": `${url}#service` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Corporate training", item: `${ORIGIN}${CORPORATE_HUB_PATH}` },
          { "@type": "ListItem", position: 2, name: `Corporate training in ${country}`, item: url },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `Corporate training in ${country}`,
        serviceType: "Corporate AI and cybersecurity training for employees",
        description,
        url,
        provider: { "@id": `${ORIGIN}/#organization` },
        areaServed: areaServed(code),
        audience: { "@type": "BusinessAudience", audienceType: "Business owners, CEOs, managing directors and HR leaders" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Corporate training programmes in ${country}`,
          itemListElement: [
            ["AI Workflow Productivity & Process Transformation", corporateAiPath(code)],
            ["CyberSecure Workforce: cybersecurity awareness training", cyberSecurePath(code)],
            ["AI + Cybersecurity Professional Accelerator", acceleratorPath(code)],
          ].map(([name, path]) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, url: `${ORIGIN}${path}` } })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs(code).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
}

// Nigeria's corporate page has its own hero (2026-11-10, user request: more representative of
// Nigeria). Since 2026-11-12 the NG AI Workflow programme page uses the same image (see
// NG_CORPORATE_HERO_ALT in corporateAiWorkflow.ts).

export function renderCountryCorporate(code: CountryCode): string {
  const c = COUNTRIES[code];
  const country = c.name;
  const cc = code.toLowerCase();
  const ctx: PageContext = { country: code, hub: false, detected: null, chosen: null };
  const home = c.site.path;
  const canonicalPath = countryCorporatePath(code);
  const url = `${ORIGIN}${canonicalPath}`;
  const title = `Corporate Training in ${country} | AI & Cybersecurity for Staff`;
  const ng = code === "NG";
  const description = ng
    ? `Corporate AI and cybersecurity training for employees in ${CITIES[code].slice(0, 3).join(", ")} and across Nigeria. Online, per learner or in a private company portal; supports ITF claims. Get a proposal.`
    : `Corporate AI and cybersecurity training for employees in ${CITIES[code].slice(0, 3).join(", ")} and across ${country}. Self-paced online, in your own private company portal. Get a proposal.`;
  const ogImage = `${ORIGIN}/images/og/corporate-ai-workflow-${cc}.jpg`;
  const headHtml = head(ctx, {
    title,
    description,
    canonicalPath,
    alternatesFor: countryCorporatePath,
    xDefault: CORPORATE_HUB_PATH,
    jsonLd: jsonLd(code, url, title, description),
  })
    .replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1${ogImage}"`)
    .replace("</head>", '<link rel="stylesheet" href="/corporate-ai.css">\n</head>');

  const faqHtml = faqs(code)
    .map((f) => `<details class="ca-faq"><summary>${escapeHtml(f.q)}</summary><p>${escapeHtml(f.a)}</p></details>`)
    .join("\n");

  return `${headHtml}
<body data-country="${code}"${whatsappAttr(code)}>
${SEARCH_OVERLAY}
<a class="skip-link" href="#main">Skip to main content</a>
${corporateUtilBar(home)}
${header(ctx, home, "/", true)}
<main id="main">
  <section class="hero ca-hero" id="top">
    <div class="wrap cs-crumb-wrap"><p class="pw-crumb"><a href="${CORPORATE_HUB_PATH}">Corporate training</a> <span aria-hidden="true">/</span> ${escapeHtml(country)}</p></div>
    <div class="wrap ca-hero-grid">
      <div class="hero-inner ca-hero-copy">
        <span class="eyebrow">Corporate training &middot; ${escapeHtml(country)}</span>
        <h1 class="hero-title ca-hero-title">Corporate training in ${escapeHtml(country)}: AI and cybersecurity training for employees</h1>
        <p class="ca-headline">Protect your business and help your teams do more, with training built around your organisation.</p>
        <p class="hero-sub">Paleon Training helps business owners, CEOs, managing directors and HR leaders in ${escapeHtml(cityList(code))} train their staff in <strong>cybersecurity awareness</strong>, so every employee can spot phishing, payment fraud and impersonation, and <strong>AI productivity</strong>, so every department can use AI tools safely to save time. Training is online, per learner or in a private company portal: self-paced courses, bought per employee or as an organisation-wide rollout, built around real workplace tasks.${ng ? " It supports ITF reimbursement claims." : ""}</p>
        <div class="hero-ctas">
          ${ctaButton(WORKFORCE_CTA, true, `${cyberSecurePath(code)}#buy`)}
          ${readinessButton(code, true)}
        </div>
        <ul class="ca-trust"><li>Self-paced online, in your own private company portal, across ${escapeHtml(country)}</li><li>Customised by sector and department</li><li>Reply within one working day</li></ul>
      </div>
      <div class="ca-hero-media">
        <img src="/images/corporate-ai/${code === "NG" ? "ng-corporate" : cc}-hero.jpg" alt="${escapeHtml(code === "NG" ? NG_CORPORATE_HERO_ALT : CORPORATE_AI_CONTENT[code].images.hero)}" width="1600" height="900" fetchpriority="high" decoding="async">
      </div>
    </div>
  </section>

  <section class="section section-paper ca-section" id="programmes" aria-labelledby="programmes-title">
    <div class="wrap">
      <span class="section-eyebrow">Corporate programmes</span>
      <h2 class="section-title" id="programmes-title">Three corporate training programmes for companies in ${escapeHtml(country)}</h2>
      <div class="ca-cards">
        <div class="ca-card">
          <h3><a href="${cyberSecurePath(code)}">CyberSecure Workforce: cybersecurity awareness training</a></h3>
          ${outcomeList("cybersecure", code)}
          <p>Every employee learns to recognise, stop and report phishing, payment fraud and impersonation, protect business information and use AI tools safely. Twelve practical modules for non-technical staff, from the boardroom to the front desk.</p>
          <p>It builds awareness of handling personal and customer data responsibly, in line with your obligations under ${escapeHtml(DATA_PROTECTION_LAW[code])}. Awareness training, not legal advice.</p>
          <p class="ca-card-link"><a href="${cyberSecurePath(code)}">Cybersecurity awareness training in ${escapeHtml(country)} &rarr;</a></p>
        </div>
        <div class="ca-card">
          <h3><a href="${corporateAiPath(code)}">AI Workflow Productivity &amp; Process Transformation</a></h3>
          ${outcomeList("ai-workflow", code)}
          <p>Your employees learn to use AI tools such as ChatGPT, Claude and Gemini on their own work &mdash; reports, emails, meeting follow-ups, documents and data &mdash; and to redesign repetitive workflows safely, with human review. Ten practical modules and a real workplace project.</p>
          <p class="ca-card-link"><a href="${corporateAiPath(code)}">AI training for employees in ${escapeHtml(country)} &rarr;</a></p>
        </div>
        <div class="ca-card">
          <h3><a href="${acceleratorPath(code)}">AI + Cybersecurity Professional Accelerator</a></h3>
          ${outcomeList("accelerator", code)}
          <p>For the IT, security, risk, data and digital professionals who will lead secure AI adoption. Twelve professional modules and a capstone on a real challenge from their organisation.</p>
          <p class="ca-card-link"><a href="${acceleratorPath(code)}">AI and cybersecurity training for professionals in ${escapeHtml(country)} &rarr;</a></p>
        </div>
      </div>
      ${cohortNotice(undefined, true)}
      <h3 class="cp-subtitle" id="pricing">Prices in ${escapeHtml(country)}</h3>
      ${pricingSummaryTable([code])}
      <h3 class="cp-subtitle">Two ways to buy</h3>
      ${waysToBuyBrief(code, false)}
      <div class="ca-ctas">${reserveButton("cybersecure")}</div>
    </div>
  </section>

  <section class="section section-dark ca-section" id="where" aria-labelledby="where-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Staff training for organisations across ${escapeHtml(country)}</span>
      <h2 class="section-title" id="where-title">${WHO_WE_SERVE}</h2>
      <p class="ca-p"><strong>${escapeHtml(servingLine(code))}.</strong> Organisations across ${escapeHtml(country)}, fully online. Training is online, per learner or in a private company portal: self-paced courses, so head office, branches, sites and remote workers can all take part around their working day. There are no live or facilitator-led sessions.</p>
      <p class="ca-p">Examples and workplace projects are adapted to your sector: ${ng ? "banking and financial services, oil and gas and energy, telecoms, manufacturing, healthcare, education, government and professional services" : "banking and financial services, energy and mining, telecoms, healthcare, education, government and professional services"}.</p>
      ${ng ? `<p class="ca-p"><strong>ITF reimbursement.</strong> ${escapeHtml(ITF_NOTE)}</p>` : ""}
      <p class="ca-p">Sector pages: ${SECTORS.map((sec) => `<a href="${SECTORS_PATH}/${sec.slug}?country=${cc}">${escapeHtml(sec.name)}</a>`).join(" &middot; ")}.</p>
      <div class="ca-ctas">${ctaButton(WORKFORCE_CTA, true, `${cyberSecurePath(code)}#buy`)}${callButton(true)}</div>
    </div>
  </section>

  ${pilotSection(code, null, false)}

  ${forwardSection(code, null, true)}

  ${trainerStandards()}

  <section class="section section-paper ca-section" id="resources" aria-labelledby="resources-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Free resources for directors</span>
      <h2 class="section-title" id="resources-title">Start with a free readiness check</h2>
      <p class="ca-p">Ten quick questions show how ready your organisation in ${escapeHtml(country)} is for cyber threats and for safe AI use, with a scorecard of your priority gaps by email: <a href="/ai-cyber-readiness-check?country=${cc}"><strong>take the AI &amp; Cyber Readiness Check</strong></a>.</p>
      <p class="ca-p">Also for directors: our <a href="/ai-use-policy-template">AI use policy template</a> and <a href="/board-cyber-risk-briefing">board cyber-risk briefing</a>.</p>
      <p class="ca-p">Guides for employers in ${escapeHtml(country)}: ${GUIDES.filter((g) => g.country === code)
        .map((g) => `<a href="/corporate-guides/${g.slug}">${escapeHtml(g.h1.split(":")[0])}</a>`)
        .join(" &middot; ")} &middot; <a href="/corporate-guides">all guides</a>.</p>
    </div>
  </section>

  <section class="section section-paper ca-section" id="faq" aria-labelledby="faq-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Questions</span>
      <h2 class="section-title" id="faq-title">Corporate training in ${escapeHtml(country)}: frequently asked questions</h2>
      ${faqHtml}
    </div>
  </section>

  ${enquiry(code, {
    title: `Tell us what your organisation in ${country} needs`,
    lede: "Share a little about your organisation, your workforce and the work you want to improve. We will help identify the most appropriate training approach.",
    note: "Tell us your team size and what you want to improve, and we will send a proposal shaped around your organisation.",
    contact: CORPORATE_CONTACT,
  })}
</main>
${footer(ctx, home, false, "/", true)}
${scripts(ctx)}
<script src="/corporate-ai.js" defer></script>
</body>
</html>
`;
}
