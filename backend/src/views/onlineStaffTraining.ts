import { COUNTRIES, CountryCode, MARKET_ORDER } from "../constants/countries";
import { CORPORATE_PRICES, PAYMENT_METHODS, PROGRAMME_NAMES, formatRegionMoney } from "../constants/corporatePricing";
import { acceleratorPath, corporateAiPath, cyberSecurePath } from "./corporateAiWorkflow";
import { countryCorporatePath, ORGANIZATION_LD } from "./corporateLocal";
import { PREVIEW_PATH, SAMPLE_ATTENDANCE_PATH, SAMPLE_CERTIFICATE_PATH, howItWorksSection } from "./corporateOffers";
import { pricingSummaryTable } from "./corporatePricing";
import { ORIGIN, PageContext, escapeHtml } from "./countryHome";
import { flagSvg } from "./flags";
import { shell } from "./directorResources";

// Online staff training for companies (owner, 2026-11-14, SEO for company managers and HR):
// one page for the searches "online staff training", "online training for employees",
// "staff training platform" and "e-learning for employees" in all four countries. It
// describes the private company portal honestly: Paleon's three programmes, not a general
// LMS for a company's own content.

export const ONLINE_STAFF_TRAINING_PATH = "/corporate-training/online-staff-training";

const TITLE = "Online Staff Training for Companies | Private Company Portal";
const DESCRIPTION =
  "Online training for employees in Nigeria, South Africa, Kenya and Ghana: buy seats, staff join with one link and HR tracks progress. Certificates included.";

const FAQ: [string, string][] = [
  [
    "What is online staff training?",
    "Courses your employees take on a phone, laptop or office computer instead of in a classroom. With Paleon Training, each member of staff gets a seat in your company's private portal and works through short lessons, practical exercises and quizzes at their own pace, while HR tracks progress from a manager login.",
  ],
  [
    "Which courses can our staff take?",
    "Three programmes: CyberSecure Workforce (cybersecurity awareness for every employee), AI Workflow Productivity & Process Transformation (using AI tools such as ChatGPT, Copilot and Gemini safely on real work) and the AI + Cybersecurity Professional Accelerator (for IT, security, risk and data teams).",
  ],
  [
    "Can we upload our own training content?",
    "No. The portal delivers Paleon's programmes, with examples adapted to your sector. It is not a general learning management system for your own material.",
  ],
  [
    "How do staff log in?",
    "After payment you receive a staff sign-up link. Each person opens it, creates an account with their email address and finds the course on their dashboard at paleontraining.com. It takes about two minutes.",
  ],
  [
    "How does HR see progress?",
    "Sign up with the email address used on the order and your account becomes the manager login. It shows who has joined, how far each person has got and who has finished.",
  ],
  [
    "Do staff get a certificate?",
    "Yes. Each learner who completes a programme gets a certificate of completion, and a dated attendance record is available for your training files, audits and levy claims.",
  ],
  [
    "How much does online staff training cost?",
    `Per learner, with 12 months' access: from ${MARKET_ORDER.map((k) => `${formatRegionMoney(k, CORPORATE_PRICES.cybersecure[k])} in ${COUNTRIES[k].name}`).join(", ")}. Volume discounts are 10% for 10 to 49 learners, 20% for 50 to 199 and 30% for 200 or more.`,
  ],
  [
    "Can we pay by invoice?",
    "Yes, for any order size. Tick “Send us an invoice” at checkout and we email one within one working day. Training is set up once payment is received.",
  ],
];

function ld(): object {
  const url = `${ORIGIN}${ONLINE_STAFF_TRAINING_PATH}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "Online staff training for companies",
        serviceType: "Online employee training",
        description: DESCRIPTION,
        url,
        provider: { "@id": `${ORIGIN}/#organization` },
        areaServed: MARKET_ORDER.map((k) => ({ "@type": "Country", name: COUNTRIES[k].name })),
        audience: { "@type": "BusinessAudience", audienceType: "Companies and organisations" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Corporate training", item: `${ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "Online staff training", item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
      ORGANIZATION_LD,
    ],
  };
}

export function renderOnlineStaffTraining(chosen: CountryCode | null): string {
  const ctx: PageContext = { country: chosen ?? "NG", hub: true, detected: null, chosen };
  const programmes: [string, string, (k: CountryCode) => string][] = [
    [PROGRAMME_NAMES.cybersecure, "Every employee learns to recognise, stop and report phishing, payment fraud and impersonation, protect customer data and use AI tools safely. For all staff, from the boardroom to the front desk.", cyberSecurePath],
    [PROGRAMME_NAMES["ai-workflow"], "Employees learn to use AI tools such as ChatGPT, Copilot and Gemini on their own work: reports, emails, documents and data, with human review and confidentiality built in.", corporateAiPath],
    [PROGRAMME_NAMES.accelerator, "For the IT, security, risk and data professionals who will lead secure AI adoption, ending with a capstone on a real challenge from your organisation.", acceleratorPath],
  ];
  const cards = programmes
    .map(
      ([name, text, path]) => `<div class="ca-card">
          <h3>${escapeHtml(name)}</h3>
          <p>${escapeHtml(text)}</p>
          <p class="ca-card-link">${MARKET_ORDER.map((k) => `<a href="${path(k)}">${escapeHtml(COUNTRIES[k].name)}</a>`).join(" &middot; ")}</p>
        </div>`,
    )
    .join("");
  const countries = MARKET_ORDER.map(
    (k) => `<li><a class="footer-country" href="${countryCorporatePath(k)}">${flagSvg(k, "flag flag-sm")}<span>Online staff training in ${escapeHtml(COUNTRIES[k].name)}</span></a>: pay by ${escapeHtml(PAYMENT_METHODS[k])}, or by invoice.</li>`,
  ).join("");
  const faq = FAQ.map(([q, a]) => `<details class="ca-faq"><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("");
  const body = `<section class="hero ca-hero" id="top">
    <div class="wrap ca-hero-grid">
      <div class="hero-inner ca-hero-copy">
        <span class="eyebrow">For company managers and HR &middot; Nigeria, South Africa, Kenya and Ghana</span>
        <h1 class="hero-title ca-hero-title">Online staff training for companies</h1>
        <p class="hero-sub">Train your employees online, in your own private company portal. Buy a seat for each person, share one sign-up link, and staff start the same day on a phone, laptop or office computer. HR tracks progress from a manager login, and every learner who finishes gets a certificate.</p>
        <div class="hero-ctas"><a class="btn btn-signal btn-lg" href="#prices">See prices and buy seats</a> <a class="btn btn-outline-light btn-lg" href="${PREVIEW_PATH}">Get the free preview</a></div>
      </div>
      <div class="ca-hero-media">
        <img src="/images/corporate-ai/ke-productivity.jpg" alt="An employee working through an online course on a laptop at her desk" width="1200" height="679" fetchpriority="high" decoding="async">
      </div>
    </div>
  </section>

  ${howItWorksSection(null, null, "#prices")}

  <section class="section section-paper ca-section" id="courses" aria-labelledby="courses-title">
    <div class="wrap">
      <span class="section-eyebrow">What your staff learn</span>
      <h2 class="section-title" id="courses-title">Three online training programmes for employees</h2>
      <div class="ca-cards">${cards}</div>
    </div>
  </section>

  <section class="section section-dark ca-section" id="prices" aria-labelledby="prices-title">
    <div class="wrap">
      <span class="section-eyebrow">Prices</span>
      <h2 class="section-title" id="prices-title">Online staff training prices per learner</h2>
      ${pricingSummaryTable([...MARKET_ORDER], true)}
      <p class="ca-p">12 months&rsquo; access per learner. Volume discounts: 10% for 10&ndash;49 learners, 20% for 50&ndash;199, 30% for 200+. Choose your country to buy seats online:</p>
      <ul class="ca-links">${countries}</ul>
    </div>
  </section>

  <section class="section section-paper ca-section" id="hr" aria-labelledby="hr-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">For HR and L&amp;D</span>
      <h2 class="section-title" id="hr-title">The records HR needs, without the admin</h2>
      <ul class="ca-list">
        <li><strong>Manager login:</strong> who has joined, how far each person has got and who has finished, for every programme you buy.</li>
        <li><strong>Certificates of completion</strong> for every learner who finishes (<a href="${SAMPLE_CERTIFICATE_PATH}" target="_blank" rel="noopener">see a sample</a>).</li>
        <li><strong>Dated attendance records</strong> showing each module, quiz and status, for audits, regulators, insurers and training levy claims (<a href="${SAMPLE_ATTENDANCE_PATH}" target="_blank" rel="noopener">see a sample</a>).</li>
        <li><strong>Flexible seats:</strong> an unused seat can be given to another member of staff during the 12 months.</li>
      </ul>
    </div>
  </section>

  <section class="section section-paper ca-section" id="faq" aria-labelledby="faq-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Questions</span>
      <h2 class="section-title" id="faq-title">Online staff training: frequently asked questions</h2>
      ${faq}
    </div>
  </section>`;
  return shell(ctx, { title: TITLE, description: DESCRIPTION, path: ONLINE_STAFF_TRAINING_PATH, jsonLd: ld(), body });
}

