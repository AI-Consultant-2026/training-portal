import { COUNTRIES, MARKET_ORDER } from "../constants/countries";
import { flagSvg } from "./flags";
import { ORGANIZATION_LD } from "./corporateLocal";
import { COHORT_PLACES, cohortNotice, cohortSentence, callButton, readinessButton, reserveButton } from "./corporateOffers";
import { CORPORATE_AI_CONTENT } from "./corporateAiWorkflowContent";
import {
  CORPORATE_HUB_PATH,
  acceleratorPath,
  corporateAiPath,
  cyberSecurePath,
  enquiry,
} from "./corporateAiWorkflow";
import { ORIGIN, PageContext, SEARCH_OVERLAY, escapeHtml, corporateUtilBar, footer, head, header, scripts } from "./countryHome";

// Promotional page for the AI Workflow Productivity & Process Transformation programme
// (2026-11-07): what the programme is, what it does for the workforce, how it builds a
// competitive advantage, and the programme video, for corporate clients in Nigeria, South
// Africa, Kenya and Ghana. Linked from /corporate-training. One page for all four
// countries (no hreflang alternates); the country cards lead to each country's page.
// No prices and no invented clients or statistics: the percentages and the hours example
// are labelled illustrative, as in the proposal deck.

export const PROMOTION_AI_PATH = "/Promotion-AI-Workflow-Productivity";

const VIDEO = "/videos/corporate/ai-workflow-productivity.mp4?v=2";
const POSTER = "/videos/corporate/ai-workflow-productivity.jpg";


const DELIVERY: Record<string, string> = {
  NG: "In-house, online or hybrid. Supports ITF reimbursement claims.",
  ZA: "In-house, live online or self-paced for companies in Johannesburg, Cape Town, Durban, Pretoria and across South Africa.",
  KE: "In-house, live online or self-paced for companies in Nairobi, Mombasa, Kisumu and across Kenya.",
  GH: "In-house, live online or self-paced for companies in Accra, Kumasi, Tema, Takoradi and across Ghana.",
};

// AI brings new cyber risks, so the page points employers to CyberSecure Workforce as well
// (2026-11-08, SEO for "cybersecurity and AI workforce training" searches in ZA/KE/GH).
const AI_RISKS: [string, string][] = [
  ["Confidential data in AI tools", "Staff paste customer, financial or HR information into tools the organisation has not approved."],
  ["AI-written phishing", "Scam emails and messages are now fluent, personal and free of the spelling mistakes people used to look for."],
  ["Deepfake voices and video", "Criminals imitate a manager's voice or face to push through an urgent payment or a change of bank details."],
];

const WORKFORCE: [string, string][] = [
  ["Less repetitive work", "Drafting, summarising, searching and re-keying take a fraction of the time, so the tedious parts of the job shrink."],
  ["Confidence with AI", "Staff learn which tools to use, for which tasks, and how to check the output. No more guessing or quietly avoiding AI."],
  ["Better first drafts", "Clear prompts and saved templates give a strong starting point for emails, reports, minutes and proposals."],
  ["Time for the work that matters", "Hours recovered from routine tasks go to customers, problem-solving and the judgement only people can bring."],
  ["Clear, safe rules", "A simple traffic-light guide shows what may and may not go into an AI tool, so nobody puts the organisation at risk by accident."],
  ["Skills that last a career", "A practical method that works across tools, plus a certificate of completion. AI-ready skills are now valued in every sector."],
];

const CHAIN: [string, string][] = [
  ["Skills", "Every participant learns to use approved AI tools on their own tasks."],
  ["Redesign", "Teams map real workflows and rebuild the slow, repetitive steps with AI and a human check."],
  ["Time recovered", "Routine work takes less time, measured against your own baseline."],
  ["Reinvested", "That time goes into customers, quality, sales and new ideas."],
  ["Advantage", "You respond faster, deliver more consistently and adapt sooner than competitors."],
];

const SOURCES: [string, string, string][] = [
  ["speed", "Speed", "Answer enquiries, prepare quotations and turn around reports faster. In competitive markets the first good answer often wins the business."],
  ["consistency", "Consistency", "Saved prompts and written procedures keep the standard the same across teams, shifts and branches, whoever is on duty."],
  ["capacity", "Capacity", "Your existing team handles more work at the same quality, so growth does not depend only on hiring."],
  ["agility", "Agility", "An AI-ready workforce with trained champions adopts new tools and improves processes continuously, not once."],
  ["trust", "Trust", "Responsible-use rules and human review protect your clients' data and your reputation while others take risks."],
];

const ICONS: Record<string, string> = {
  speed: '<path d="M12 21a9 9 0 1 1 9-9"/><path d="M12 12l5-4"/><path d="M12 7v1M7 12H6"/>',
  consistency: '<rect x="4" y="4" width="16" height="4" rx="1"/><rect x="4" y="10" width="16" height="4" rx="1"/><rect x="4" y="16" width="16" height="4" rx="1"/>',
  capacity: '<path d="M4 20V10M10 20V6M16 20v-8M22 20H2"/>',
  agility: '<path d="M4 12a8 8 0 0 1 14-5.3L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5.3L4 15"/><path d="M4 20v-5h5"/>',
  trust: '<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
};

const MODULES = [
  "Understanding AI at Work",
  "AI-Powered Employee Productivity",
  "AI Workflow Design",
  "AI for Departments",
  "Prompt Engineering for Business",
  "AI for Documents and Data",
  "AI-Powered Process Transformation",
  "Responsible AI",
  "Building an AI-Ready Workforce",
  "Workplace AI Transformation Project",
];

const FAQ: [string, string][] = [
  [
    "What is AI workforce and process transformation training?",
    "Training that does two things together: it teaches your workforce to use AI tools safely in their daily work, and it helps teams redesign real business processes around AI, with human review built in. AI Workflow Productivity & Process Transformation is Paleon Training's programme for companies in South Africa, Kenya, Ghana and Nigeria.",
  ],
  [
    "Who is the programme for?",
    "Staff in every department: HR, finance, operations, sales, marketing, customer service, administration, procurement, project management and leadership. No technical background is needed.",
  ],
  [
    "Which AI tools do you cover?",
    "General-purpose tools such as ChatGPT, Claude, Gemini and Microsoft Copilot. We focus on the tools your organisation has approved and on a method that works across tools.",
  ],
  [
    "Is the training the same in every country?",
    "The programme is the same in every country: self-paced online per learner, or live online, in-house or hybrid by quote. Examples are adapted to your sector and teams, and Nigerian employers can use our records for ITF reimbursement claims.",
  ],
  [
    "How do you measure the results?",
    "We agree a baseline for selected tasks with your managers before the training, then measure again after the training and at the end of a 30-day adoption period. You receive a management report.",
  ],
  [
    "How much does it cost?",
    "Pricing depends on group size, delivery method and customisation. Request a proposal and we will send a written quotation.",
  ],
  [
    "Do you offer AI training for employees in South Africa, Kenya and Ghana?",
    "Yes. The programme is delivered in-house, live online or hybrid, or self-paced online, for companies across South Africa (including Johannesburg, Cape Town, Durban and Pretoria), Kenya (including Nairobi, Mombasa and Kisumu) and Ghana (including Accra, Kumasi and Tema). In Nigeria we also train in-house or hybrid.",
  ],
  [
    "Do you also offer cybersecurity training for staff?",
    "Yes. CyberSecure Workforce is our cybersecurity awareness programme for every employee: phishing, payment fraud, impersonation, protecting company data, safe use of AI tools and reporting incidents. Many organisations combine it with AI Workflow Productivity, and it is available now in South Africa, Kenya, Ghana and Nigeria.",
  ],
  [
    "When can we start?",
    `Self-paced places can start today. For live delivery, ${cohortSentence("ai-workflow").charAt(0).toLowerCase()}${cohortSentence("ai-workflow").slice(1)} Reserve now and complete the needs assessment in advance.`,
  ],
  [
    "How do we contact you?",
    "Use the enquiry form on this page, email corporate@paleontraining.com or message us on WhatsApp on +44 7508 823495. Tell us your country, team size and the work you want to improve. We reply within one working day.",
  ],
];

function icon(name: string): string {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
}

function jsonLd(url: string): object {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: "AI Workforce & Process Transformation Training | Paleon Training",
        breadcrumb: { "@id": `${url}#breadcrumb` },
        about: { "@id": `${ORIGIN}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Corporate training", item: `${ORIGIN}${CORPORATE_HUB_PATH}` },
          { "@type": "ListItem", position: 2, name: "AI workforce and process transformation training", item: url },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "AI workforce and process transformation training",
        serviceType: "AI workforce and process transformation training",
        description:
          "Live, facilitated AI productivity and process transformation training for employees in every department, with responsible-use rules and human review built in.",
        url,
        provider: { "@id": `${ORIGIN}/#organization` },
        areaServed: MARKET_ORDER.map((k) => ({ "@type": "Country", name: COUNTRIES[k].name })),
        audience: { "@type": "BusinessAudience", audienceType: "Companies and organisations" },
      },
      ORGANIZATION_LD,
      {
        "@type": "Course",
        name: "AI Workflow Productivity & Process Transformation",
        description:
          "Corporate AI training that teaches employees to use generative AI safely in their daily work and to redesign repetitive workflows, delivered in-house, live online, hybrid or self-paced for companies in South Africa, Kenya, Ghana and Nigeria.",
        provider: { "@id": `${ORIGIN}/#organization` },
        url,
        inLanguage: "en",
        audience: { "@type": "BusinessAudience", audienceType: "Organisations and their employees" },
      },
      {
        "@type": "VideoObject",
        name: "AI Workflow Productivity & Process Transformation",
        description: "Where time is lost, how AI helps, and how Paleon Training keeps it safe. A short introduction to the corporate programme.",
        thumbnailUrl: `${ORIGIN}${POSTER}`,
        contentUrl: `${ORIGIN}${VIDEO}`,
        uploadDate: "2026-11-06T12:00:00+00:00",
        duration: "PT1M54S",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
    ],
  };
}

export function renderPromotionAiWorkflow(): string {
  const ctx: PageContext = { country: "NG", hub: true, detected: null, chosen: null };
  const url = `${ORIGIN}${PROMOTION_AI_PATH}`;
  const headHtml = head(ctx, {
    title: "AI Workforce & Process Transformation Training | South Africa, Kenya, Ghana",
    description:
      "AI workforce and process transformation training for companies in South Africa, Kenya, Ghana and Nigeria: in-house or online, plus cybersecurity awareness for every employee.",
    canonicalPath: PROMOTION_AI_PATH,
    alternatesFor: corporateAiPath,
    xDefault: CORPORATE_HUB_PATH,
    jsonLd: jsonLd(url),
  })
    // One page for all four countries: no hreflang alternates.
    .replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*">\n?/g, "")
    .replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1${ORIGIN}/images/og/corporate-ai-workflow-ng.jpg"`)
    .replace("</head>", '<link rel="stylesheet" href="/corporate-ai.css">\n</head>');

  const countryCards = MARKET_ORDER.map(
    (k) => `<a class="ca-country" href="${corporateAiPath(k)}" hreflang="${COUNTRIES[k].site.locale}">
        ${flagSvg(k, "flag flag-md")}
        <span class="ca-country-name">${escapeHtml(COUNTRIES[k].name)}</span>
        <span class="ca-country-note">${escapeHtml(DELIVERY[k])}</span>
        <span class="ca-country-go">AI training in ${escapeHtml(COUNTRIES[k].name)} &rarr;</span>
      </a>`,
  ).join("\n");
  const flags = MARKET_ORDER.map((k) => `<li>${flagSvg(k, "flag flag-sm")}<span>${escapeHtml(COUNTRIES[k].name)}</span></li>`).join("");

  return `${headHtml}
<body data-country="NG" data-hub>
${SEARCH_OVERLAY}
<a class="skip-link" href="#main">Skip to main content</a>
${corporateUtilBar(COUNTRIES.NG.site.path)}
${header(ctx, COUNTRIES.NG.site.path, "/", true)}
<main id="main">
  <section class="hero ca-hero pw-hero" id="top">
    <div class="wrap">
      <p class="pw-crumb"><a href="${CORPORATE_HUB_PATH}">Corporate training</a> <span aria-hidden="true">/</span> AI Workflow Productivity</p>
      <div class="ca-hero-grid">
        <div class="hero-inner ca-hero-copy">
          <span class="eyebrow">AI Workflow Productivity &amp; Process Transformation &middot; South Africa, Kenya, Ghana and Nigeria</span>
          <h1 class="hero-title ca-hero-title">AI workforce and process transformation training for companies</h1>
          <p class="ca-headline">Less busywork. Better work. An advantage that lasts.</p>
          <p class="hero-sub">Your competitors can buy the same AI tools you can. What they cannot buy is a workforce that knows how to use them well, and workflows rebuilt around them. This programme gives your organisation both, in-house, live online or self-paced, for companies in South Africa, Kenya, Ghana and Nigeria.</p>
          ${cohortNotice("ai-workflow")}
          <div class="hero-ctas">
            ${reserveButton("ai-workflow")}
            ${readinessButton(null, true)}
          </div>
          <ul class="pw-flags" aria-label="Available in">${flags}</ul>
        </div>
        <div class="ca-hero-media">
          <img src="/images/corporate-ai/za-hero.jpg" alt="${escapeHtml(CORPORATE_AI_CONTENT.ZA.images.hero)}" width="1600" height="900" fetchpriority="high" decoding="async">
        </div>
      </div>
    </div>
  </section>

  <section class="section section-dark ca-section pw-watch" id="video" aria-labelledby="video-title">
    <div class="wrap">
      <span class="section-eyebrow">Programme video &middot; 1 min 53 s</span>
      <h2 class="section-title" id="video-title">See the programme in under two minutes</h2>
      <p class="ca-p">For companies in South Africa, Kenya, Ghana and Nigeria: where time is lost in everyday work, how AI helps, and how we keep it safe. Press play with the sound on.</p>
      <figure class="ca-video pw-video">
        <video controls playsinline preload="metadata" poster="${POSTER}" aria-label="Video: AI Workflow Productivity &amp; Process Transformation (1 minute 54 seconds)">
          <source src="${VIDEO}" type="video/mp4">
          <a href="${VIDEO}">Download the programme video (MP4)</a>
        </video>
      </figure>
      <div class="ca-ctas">${reserveButton("ai-workflow")} ${callButton(true)}</div>
    </div>
  </section>

  <section class="section section-paper ca-section" id="what" aria-labelledby="what-title">
    <div class="wrap ca-split">
      <div class="ca-body">
        <span class="section-eyebrow">What it is</span>
        <h2 class="section-title" id="what-title">Practical AI training, built around your real work</h2>
        <p class="ca-p">AI Workflow Productivity &amp; Process Transformation is a corporate training programme that teaches employees in every department to use generative AI tools, such as ChatGPT, Claude, Gemini and Copilot, on their own daily tasks. Teams then take real workflows from your organisation and redesign them, so the improvement continues long after the training ends.</p>
        <p class="ca-p">AI training is only the beginning. <strong>The real gain comes from changing how the work gets done</strong>, with confidentiality, accuracy checks and a named person reviewing every output built in from the first module.</p>
        <div class="pw-facts">
          <div><strong>10</strong><span>practical modules</span></div>
          <div><strong>1</strong><span>real workplace project per team</span></div>
          <div><strong>30</strong><span>day adoption roadmap</span></div>
        </div>
      </div>
      <div class="ca-aside"><img class="ca-img" src="/images/corporate-ai/gh-collaboration.jpg" alt="${escapeHtml(CORPORATE_AI_CONTENT.GH.images.collaboration)}" width="1200" height="675" loading="lazy" decoding="async"></div>
    </div>
  </section>

  <section class="section section-paper ca-section pw-tint" id="workforce" aria-labelledby="workforce-title">
    <div class="wrap">
      <span class="section-eyebrow">For your workforce</span>
      <h2 class="section-title" id="workforce-title">What your people gain</h2>
      <p class="ca-p">The programme is designed to make work better for the people doing it, not just faster for the organisation.</p>
      <div class="ca-cards pw-cards">${WORKFORCE.map(([h, p]) => `<div class="ca-card"><h3>${escapeHtml(h)}</h3><p>${escapeHtml(p)}</p></div>`).join("")}</div>
    </div>
  </section>

  <section class="section section-dark ca-section" id="advantage" aria-labelledby="advantage-title">
    <div class="wrap">
      <span class="section-eyebrow">Competitive advantage</span>
      <h2 class="section-title" id="advantage-title">How the programme turns skills into a competitive edge</h2>
      <p class="ca-p">Advantage does not come from attending a course. It comes from a chain of changes, each one building on the last. The programme is designed to deliver every link.</p>
      <ol class="pw-chain">${CHAIN.map(([h, p], i) => `<li><span class="pw-step">${i + 1}</span><h3>${escapeHtml(h)}</h3><p>${escapeHtml(p)}</p></li>`).join("")}</ol>
      <h3 class="pw-sub">Five sources of advantage</h3>
      <div class="pw-sources">${SOURCES.map(([k, h, p]) => `<div class="pw-source"><span class="pw-icon">${icon(k)}</span><h4>${escapeHtml(h)}</h4><p>${escapeHtml(p)}</p></div>`).join("")}</div>
      <blockquote class="pw-quote">Anyone can subscribe to an AI tool. A trained workforce and redesigned workflows are much harder to copy, and they keep improving once they are in place.</blockquote>
    </div>
  </section>

  <section class="section section-paper ca-section" id="results" aria-labelledby="results-title">
    <div class="wrap">
      <span class="section-eyebrow">Measurable results</span>
      <h2 class="section-title" id="results-title">We measure what changes, not just who attended</h2>
      <p class="ca-p">Before the training we record a baseline with your managers for selected tasks. We measure again after the training and at the end of the 30-day adoption period, and report the results to you.</p>
      <div class="pw-results">
        <ul class="ca-list">
          <li><strong>Task time:</strong> average time to complete selected tasks.</li>
          <li><strong>Turnaround:</strong> time to produce reports or reply to enquiries.</li>
          <li><strong>Quality:</strong> errors, rework and document revisions.</li>
          <li><strong>Adoption:</strong> share of staff actively using approved tools.</li>
          <li><strong>Confidence:</strong> before-and-after assessment results.</li>
        </ul>
        <div class="pw-targets">
          <span class="pw-tag">Illustrative targets</span>
          <p><strong>10&ndash;20%</strong> less time on selected tasks</p>
          <p><strong>15&ndash;25%</strong> faster turnaround</p>
          <small>Targets are hypotheses we test against your own baseline, not guaranteed results.</small>
        </div>
      </div>
      <div class="pw-equation" aria-label="Example: 20 employees times 3 hours a week times 52 weeks equals 3,120 hours a year">
        <div><strong>20</strong><span>employees</span></div><i aria-hidden="true">&times;</i>
        <div><strong>3 hrs</strong><span>saved a week each</span></div><i aria-hidden="true">&times;</i>
        <div><strong>52</strong><span>weeks</span></div><i aria-hidden="true">=</i>
        <div class="pw-total"><strong>3,120</strong><span>hours recovered a year</span></div>
      </div>
      <p class="ca-hint">Example only. Multiply the hours by your own average hourly staff cost to put a value on it.</p>
    </div>
  </section>

  <section class="section section-paper ca-section pw-tint" id="modules" aria-labelledby="modules-title">
    <div class="wrap">
      <span class="section-eyebrow">Course structure</span>
      <h2 class="section-title" id="modules-title">10 practical modules</h2>
      <ol class="cs-modules pw-modules">${MODULES.map((m, i) => `<li><span class="cs-num">${i + 1}</span><span>${escapeHtml(m)}</span></li>`).join("")}</ol>
      <p class="ca-p">Everything is included: needs assessment, instructor-led training, digital resources and prompt templates, exercises and assessments, completion certificates, a management report and a 30-day adoption roadmap.</p>
    </div>
  </section>

  <section class="section section-paper ca-section" id="countries" aria-labelledby="countries-title">
    <div class="wrap">
      <span class="section-eyebrow">Where we deliver</span>
      <h2 class="section-title" id="countries-title">AI workforce and process transformation training in South Africa, Kenya, Ghana and Nigeria</h2>
      ${cohortNotice("ai-workflow")}
      <div class="ca-countries">${countryCards}</div>
      <p class="ca-p pw-more"><a href="${CORPORATE_HUB_PATH}"><strong>See all corporate training programmes &rarr;</strong></a></p>
    </div>
  </section>

  <section class="section section-dark ca-section" id="cybersecurity" aria-labelledby="cybersecurity-title">
    <div class="wrap">
      <span class="section-eyebrow">AI and cybersecurity together</span>
      <h2 class="section-title" id="cybersecurity-title">AI makes your teams faster. Cybersecurity training keeps them safe.</h2>
      <p class="ca-p">Using AI at work brings new risks. The organisations that gain most from AI train their whole workforce in cybersecurity awareness too, so people can spot the threats AI has made more convincing.</p>
      <div class="ca-cards ca-cards-3">${AI_RISKS.map(([h, p]) => `<div class="ca-card"><h3>${escapeHtml(h)}</h3><p>${escapeHtml(p)}</p></div>`).join("")}</div>
      <p class="ca-p"><strong>CyberSecure Workforce</strong> is our cybersecurity awareness training for every employee, from the front desk to the boardroom. Available now:</p>
      <ul class="ca-links">${MARKET_ORDER.map(
        (k) => `<li><a href="${cyberSecurePath(k)}" hreflang="${COUNTRIES[k].site.locale}">Cybersecurity awareness training in ${escapeHtml(COUNTRIES[k].name)} &rarr;</a></li>`,
      ).join("")}</ul>
      <p class="ca-p">For IT, security, risk and data teams, the <strong>AI + Cybersecurity Professional Accelerator</strong> develops the people who will lead secure AI adoption (next live cohort: December 2026, ${COHORT_PLACES.accelerator} places left): ${MARKET_ORDER.map(
        (k) => `<a href="${acceleratorPath(k)}" hreflang="${COUNTRIES[k].site.locale}">${escapeHtml(COUNTRIES[k].name)}</a>`,
      ).join(", ")}.</p>
      <div class="ca-ctas">${reserveButton("ai-workflow")}</div>
    </div>
  </section>

  <section class="section section-paper ca-section pw-tint" id="faq" aria-labelledby="faq-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Questions</span>
      <h2 class="section-title" id="faq-title">Frequently asked questions</h2>
      ${FAQ.map(([q, a]) => `<details class="ca-faq"><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("\n")}
    </div>
  </section>

  ${enquiry(null, {
    title: "Find your first three workflows",
    lede: "Tell us about your organisation, your teams and the work you want to improve. We will reply within one working day to arrange a short consultation.",
    note: "Tell us your team size and what you want to improve, and we will send a proposal shaped around your organisation.",
    contact: "Email: corporate@paleontraining.com · WhatsApp: +44 7508 823495",
  })}
</main>
${footer(ctx, COUNTRIES.NG.site.path, false, "/", true)}
${scripts(ctx)}
<script src="/corporate-ai.js" defer></script>
</body>
</html>
`;
}
