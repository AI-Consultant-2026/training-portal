import { COUNTRIES, CountryCode } from "../constants/countries";
import { CORPORATE_PRICES } from "../constants/corporatePricing";
import { CORPORATE_CONTACT, EnquiryCopy, AI_FORM, aiLandingPath, corporateAiPath, enquiry } from "./corporateAiWorkflow";
import { DATA_PROTECTION_LAW, countryCorporatePath } from "./corporateLocal";
import { cohortNotice } from "./corporateOffers";
import { pricingSection } from "./corporatePricing";
import { ORIGIN, PageContext, SEARCH_OVERLAY, escapeHtml, corporateUtilBar, footer, head, header, scripts, whatsappAttr } from "./countryHome";
import { Faq, LandingVideo, MAX_DISCOUNT, cards, commonFaqs, contactSection, faqSection, howSection, landingJsonLd, money, offerSection, videoSlot } from "./landingShared";
import { AI_MODULES } from "./promotionAiWorkflow";

// AI Workflow Productivity & Process Transformation landing pages (2026-11-23, owner request):
// one short, direct sales page per country at /<cc>/ai-workflow-productivity, for managers and
// HR leads buying seats for their staff. The full programme page stays at
// /<cc>/corporate-training/ai-workflow-productivity. Same layout and incentives as the
// CyberSecure landing pages (landingShared.ts); nothing new is promised. Online, self-paced,
// private company portal only. AI products are named in text only, never shown as logos.
// The promotional video slot shows a placeholder until AI_LANDING_VIDEO is set.

export { aiLandingPath };

/** Set to { src, poster, label } once the promo video is in /videos/corporate/. */
export const AI_LANDING_VIDEO: LandingVideo | null = null;

const PROBLEMS: [string, string][] = [
  [
    "Hours lost to first drafts",
    "Reports, emails, minutes and proposals are still written from a blank page, then rewritten. Week after week, across every team.",
  ],
  [
    "AI with no rules",
    "Staff are already pasting work into AI tools, sometimes with customer, financial or HR data, in tools the organisation never approved.",
  ],
  [
    "Tools bought, nothing changed",
    "Licences sit unused or are used for the odd email. Nobody has redesigned the work, so the time savings never arrive.",
  ],
];

function faqs(code: CountryCode): Faq[] {
  const list = commonFaqs("ai-workflow", code, "Staff learn clear rules on approved tools and on the data that must never go into AI,");
  list.splice(2, 0, {
    q: "Which AI tools does it cover?",
    a: "General-purpose tools such as ChatGPT, Claude, Gemini and Microsoft Copilot. The focus is on the tools your organisation has approved, and on a method that works across tools. No technical background is needed.",
  });
  return list;
}

export function renderAiLanding(code: CountryCode): string {
  const country = COUNTRIES[code].name;
  const cc = code.toLowerCase();
  const home = COUNTRIES[code].site.path;
  const ctx: PageContext = { country: code, hub: false, detected: null, chosen: null };
  const canonicalPath = aiLandingPath(code);
  const url = `${ORIGIN}${canonicalPath}`;
  const price = money(code, CORPORATE_PRICES["ai-workflow"][code]);
  const headHtml = head(ctx, {
    title: `AI Training for Your Staff in ${country} | AI Workflow Productivity`,
    description: `Train every employee in ${country} to save hours each week with AI tools, safely. Online, self-paced, from ${price} per learner, with discounts up to ${MAX_DISCOUNT}%. Start today.`,
    canonicalPath,
    alternatesFor: aiLandingPath,
    xDefault: aiLandingPath("NG"),
    jsonLd: landingJsonLd(`AI Workflow Productivity for staff in ${country}`, url, faqs(code)),
  })
    .replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1${ORIGIN}/images/og/corporate-ai-workflow-${cc}.jpg"`)
    .replace("</head>", '<link rel="stylesheet" href="/corporate-ai.css">\n</head>');

  const enquiryCopy: EnquiryCopy = {
    title: "Start the process today",
    lede: `Tell us how many staff you want to train and which teams matter most. We will reply within one working day with a proposal for your organisation in ${country}, including your volume discount.`,
    note: "Prefer to buy straight away? **Use the order form above** and your staff can start today.",
    contact: CORPORATE_CONTACT,
  };
  const moduleList = `<ol class="cs-modules pw-modules">${AI_MODULES.map((m, i) => `<li><span class="cs-num">${i + 1}</span><span>${escapeHtml(m)}</span></li>`).join("")}</ol>`;

  return `${headHtml}
<body data-country="${code}"${whatsappAttr(code)}>
${SEARCH_OVERLAY}
<a class="skip-link" href="#main">Skip to main content</a>
${corporateUtilBar(home, code)}
${header(ctx, home, "/", true)}
<main id="main">
  <section class="hero ca-hero" id="top">
    <div class="wrap cs-crumb-wrap"><p class="pw-crumb"><a href="${countryCorporatePath(code)}">Corporate training in ${escapeHtml(country)}</a> <span aria-hidden="true">/</span> AI Workflow Productivity for your staff</p></div>
    <div class="wrap ca-hero-grid">
      <div class="hero-inner ca-hero-copy">
        <span class="eyebrow">AI Workflow Productivity &amp; Process Transformation &middot; ${escapeHtml(country)}</span>
        <h1 class="hero-title ca-hero-title">Train your staff to save hours every week with AI</h1>
        <p class="ca-headline">Your competitors have the same AI tools. Win with a team that uses them well. Online and self-paced, from ${escapeHtml(price)} per learner.</p>
        <p class="hero-sub">Your staff learn to use approved AI tools on their real work: reports, emails, meeting notes, documents and data. Confidentiality, accuracy checks and human review are built into every module. Then teams redesign their workflows so the time saved lasts. Buy seats today and your staff can start today.</p>
        ${cohortNotice("ai-workflow")}
        <div class="hero-ctas">
          <a class="btn btn-signal btn-lg" href="#buy" data-landing-cta="buy">Buy seats for your staff</a>
          <a class="btn btn-outline-light btn-lg" href="#enquiry" data-intent="proposal" data-landing-cta="proposal">Get a proposal in 1 working day</a>
        </div>
        <ul class="ca-trust">
          <li>Up to ${MAX_DISCOUNT}% off for teams</li>
          <li>14-day money-back guarantee</li>
          <li>Track every learner’s progress</li>
          <li>Certificate of completion</li>
        </ul>
      </div>
      <div class="ca-hero-media">
        <img src="/images/corporate-ai/${cc}-hero.jpg" alt="Colleagues using AI tools at work in ${escapeHtml(country)}" width="1600" height="900" fetchpriority="high" decoding="async">
      </div>
    </div>
  </section>

  <section class="section section-dark ca-section" id="video" aria-labelledby="video-title">
    <div class="wrap">
      <span class="section-eyebrow">Watch</span>
      <h2 class="section-title" id="video-title">AI Workflow Productivity in 90 seconds</h2>
      ${videoSlot(AI_LANDING_VIDEO)}
    </div>
  </section>

  <section class="section section-paper ca-section" id="problem" aria-labelledby="problem-title">
    <div class="wrap">
      <span class="section-eyebrow">The problem</span>
      <h2 class="section-title" id="problem-title">Where your team’s week is going</h2>
      ${cards(PROBLEMS)}
      <p class="ca-p"><strong>The tools are not the advantage. The skills are.</strong> A workforce that knows which tool to use, for which task, and how to check the result gets the hours back and keeps your data safe.</p>
    </div>
  </section>

  ${offerSection("ai-workflow", code)}

  <section class="section section-paper ca-section" id="modules" aria-labelledby="modules-title">
    <div class="wrap">
      <span class="section-eyebrow">What your staff learn</span>
      <h2 class="section-title" id="modules-title">10 practical modules, ending with a workplace project</h2>
      <p class="ca-p">Short video lessons, practical exercises on everyday tasks and quick knowledge checks. For every department, from HR and finance to sales, operations and customer service. No technical background needed.</p>
      ${moduleList}
    </div>
  </section>

  <section class="section section-dark ca-section" id="why" aria-labelledby="why-title">
    <div class="wrap">
      <span class="section-eyebrow">For managers and HR</span>
      <h2 class="section-title" id="why-title">Why managers and HR teams choose it</h2>
      ${cards([
        ["Time back on routine work", "First drafts of reports, emails, minutes and summaries in minutes, so staff spend their time on work that needs judgement."],
        ["Clear, safe rules", `What may and may not go into an AI tool, in line with ${DATA_PROTECTION_LAW[code]}, so nobody puts the organisation at risk by accident.`],
        ["Full visibility for HR", "Your manager login shows who has joined, how far each person has got and who has finished. No chasing."],
        ["Works with your tools", "A method that works across tools such as ChatGPT, Claude, Gemini and Microsoft Copilot, focused on the ones you have approved."],
        ["No time away from work", "Staff learn in short sessions around their duties, on any device. No classroom, no travel, no venue."],
        ["Evidence for your files", "A certificate of completion for each learner and a dated attendance record for your training records."],
      ])}
    </div>
  </section>

  ${howSection()}

  ${pricingSection(code, "ai-workflow", true)}

  ${faqSection(faqs(code), corporateAiPath(code), `AI Workflow Productivity & Process Transformation in ${country}`)}

  ${enquiry(code, enquiryCopy, AI_FORM)}

  ${contactSection()}
</main>
${footer(ctx, home, false, home, true)}
${scripts(ctx)}
<script src="/corporate-ai.js" defer></script>
<script src="/corporate-buy.js" defer></script>
</body>
</html>
`;
}
