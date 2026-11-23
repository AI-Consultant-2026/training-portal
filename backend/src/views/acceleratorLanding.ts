import { COUNTRIES, CountryCode } from "../constants/countries";
import { CORPORATE_PRICES } from "../constants/corporatePricing";
import { CORPORATE_CONTACT, EnquiryCopy, accLandingPath, acceleratorPath, enquiry } from "./corporateAiWorkflow";
import { ACC_FORM } from "./corporateAccelerator";
import { DATA_PROTECTION_LAW, countryCorporatePath } from "./corporateLocal";
import { cohortNotice } from "./corporateOffers";
import { pricingSection } from "./corporatePricing";
import { ORIGIN, PageContext, SEARCH_OVERLAY, escapeHtml, corporateUtilBar, footer, head, header, scripts, whatsappAttr } from "./countryHome";
import { Faq, LandingVideo, MAX_DISCOUNT, cards, commonFaqs, contactSection, faqSection, howSection, landingJsonLd, money, offerSection, videoSlot } from "./landingShared";

// AI + Cybersecurity Professional Accelerator landing pages (2026-11-23, owner request): one
// short, direct sales page per country at /<cc>/ai-cybersecurity-accelerator, for managers and
// HR leads buying seats for the people who will lead secure AI adoption (IT, security, risk,
// data and digital staff). The full programme page stays at
// /<cc>/corporate-training/ai-cybersecurity-professional-accelerator. Same layout and incentives
// as the CyberSecure and AI Workflow landing pages (landingShared.ts); nothing new is promised.
// Online, self-paced, private company portal only. Programme length is never promised (it is
// agreed in the proposal); the capstone uses a fictional organisation; the certificate is a
// certificate of completion, not an accredited qualification.
// The promotional video slot shows a placeholder until ACC_LANDING_VIDEO is set.

export { accLandingPath };

/** Set to { src, poster, label } once the promo video is in /videos/corporate/. */
export const ACC_LANDING_VIDEO: LandingVideo | null = null;

/** The 12 modules, in order (corporateAcceleratorContent.ts, "Programme structure"). */
export const ACC_MODULES = [
  "AI Fundamentals for Professionals",
  "Cybersecurity Fundamentals",
  "AI-Powered Cyber Threats",
  "Using AI for Cybersecurity",
  "Prompt Engineering for AI & Security",
  "AI Security Risks",
  "AI Governance & Responsible AI",
  "AI for Risk & Business Decision-Making",
  "Security Operations & Incident Response",
  "AI-Enabled Digital Transformation",
  "Professional AI + Cybersecurity Workflows",
  "Professional Capstone Project",
];

const PROBLEMS: [string, string][] = [
  [
    "AI arrived before the rules",
    "Staff already use AI tools at work. Few organisations have decided which tools are approved, what data may go into them, or who checks the output.",
  ],
  [
    "Attackers use AI too",
    "AI-written phishing with no spelling mistakes, cloned voices, deepfake video calls and faster automated attacks. Yesterday’s awareness training doesn’t cover them.",
  ],
  [
    "Nobody in-house owns it",
    "AI sits between IT, security, risk and the business, so it falls through the gaps. Outside consultants are expensive, and their knowledge leaves when they do.",
  ],
];

function faqs(code: CountryCode): Faq[] {
  const list = commonFaqs("accelerator", code, "Participants learn AI governance, data protection and AI security risks,");
  list.splice(
    2,
    0,
    {
      q: "Who should we enrol?",
      a: "The people who will lead secure AI adoption: IT, information security, risk and compliance, data and digital transformation staff, and the managers who will own AI policy. No coding is required; a working knowledge of IT and business processes helps.",
    },
    {
      q: "How long does it take?",
      a: "It is self-paced, so participants fit it around their work. For a company portal, the timetable and completion deadline are agreed in your proposal.",
    },
  );
  return list;
}

export function renderAccLanding(code: CountryCode): string {
  const country = COUNTRIES[code].name;
  const cc = code.toLowerCase();
  const home = COUNTRIES[code].site.path;
  const ctx: PageContext = { country: code, hub: false, detected: null, chosen: null };
  const canonicalPath = accLandingPath(code);
  const url = `${ORIGIN}${canonicalPath}`;
  const price = money(code, CORPORATE_PRICES.accelerator[code]);
  const headHtml = head(ctx, {
    title: `AI + Cybersecurity Training for Your Team in ${country} | Professional Accelerator`,
    description: `Develop in-house leaders for secure AI adoption in ${country}: 12 professional modules on AI, cyber threats and governance. Online, self-paced, from ${price} per learner, up to ${MAX_DISCOUNT}% off for teams.`,
    canonicalPath,
    alternatesFor: accLandingPath,
    xDefault: accLandingPath("NG"),
    jsonLd: landingJsonLd(`AI + Cybersecurity Professional Accelerator for teams in ${country}`, url, faqs(code)),
  })
    .replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1${ORIGIN}/images/og/ai-cyber-accelerator-${cc}.jpg"`)
    .replace("</head>", '<link rel="stylesheet" href="/corporate-ai.css">\n</head>');

  const enquiryCopy: EnquiryCopy = {
    title: "Start the process today",
    lede: `Tell us how many people you want to develop and which teams they lead. We will reply within one working day with a proposal for your organisation in ${country}, including your volume discount and a suggested timetable.`,
    note: "Prefer to buy straight away? **Use the order form above** and your team can start today.",
    contact: CORPORATE_CONTACT,
  };
  const moduleList = `<ol class="cs-modules pw-modules">${ACC_MODULES.map((m, i) => `<li><span class="cs-num">${i + 1}</span><span>${escapeHtml(m)}</span></li>`).join("")}</ol>`;

  return `${headHtml}
<body data-country="${code}"${whatsappAttr(code)}>
${SEARCH_OVERLAY}
<a class="skip-link" href="#main">Skip to main content</a>
${corporateUtilBar(home, code)}
${header(ctx, home, "/", true)}
<main id="main">
  <section class="hero ca-hero" id="top">
    <div class="wrap cs-crumb-wrap"><p class="pw-crumb"><a href="${countryCorporatePath(code)}">Corporate training in ${escapeHtml(country)}</a> <span aria-hidden="true">/</span> AI + Cybersecurity Accelerator for your team</p></div>
    <div class="wrap ca-hero-grid">
      <div class="hero-inner ca-hero-copy">
        <span class="eyebrow">AI + Cybersecurity Professional Accelerator &middot; ${escapeHtml(country)}</span>
        <h1 class="hero-title ca-hero-title">Build your own team of secure AI leaders</h1>
        <p class="ca-headline">Attackers already use AI. Your people need to use it safely, and defend against it. Online and self-paced, from ${escapeHtml(price)} per learner.</p>
        <p class="hero-sub">For your IT, security, risk, data and digital staff. They learn to use AI in their work, recognise the cyber threats it brings, and set the rules your organisation needs to adopt it safely. Twelve professional modules, ending with a capstone project. Buy seats today and your team can start today.</p>
        ${cohortNotice("accelerator")}
        <div class="hero-ctas">
          <a class="btn btn-signal btn-lg" href="#buy" data-landing-cta="buy">Buy seats for your team</a>
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
        <img src="/images/accelerator/${cc}-hero.jpg" alt="IT and security professionals reviewing AI and cyber risks in ${escapeHtml(country)}" width="1600" height="900" fetchpriority="high" decoding="async">
      </div>
    </div>
  </section>

  <section class="section section-dark ca-section" id="video" aria-labelledby="video-title">
    <div class="wrap">
      <span class="section-eyebrow">Watch</span>
      <h2 class="section-title" id="video-title">The Accelerator in 90 seconds</h2>
      ${videoSlot(ACC_LANDING_VIDEO)}
    </div>
  </section>

  <section class="section section-paper ca-section" id="problem" aria-labelledby="problem-title">
    <div class="wrap">
      <span class="section-eyebrow">The problem</span>
      <h2 class="section-title" id="problem-title">AI is already in your organisation. Is anyone in charge of it?</h2>
      ${cards(PROBLEMS)}
      <p class="ca-p"><strong>You don’t need more consultants. You need your own people who understand both AI and security.</strong> They make better decisions, write rules that fit how you work, and stay when the project ends.</p>
    </div>
  </section>

  ${offerSection("accelerator", code)}

  <section class="section section-paper ca-section" id="modules" aria-labelledby="modules-title">
    <div class="wrap">
      <span class="section-eyebrow">What your team learns</span>
      <h2 class="section-title" id="modules-title">12 professional modules, ending with a capstone project</h2>
      <p class="ca-p">Four stages: foundations, AI meets security, govern and decide, transform and apply. Short video lessons, realistic workplace scenarios, knowledge checks and a final assessment. In the capstone, each participant writes an improvement proposal for a fictional organisation, bringing together AI opportunities, cyber risks, controls and governance, and receives written feedback.</p>
      ${moduleList}
    </div>
  </section>

  <section class="section section-dark ca-section" id="why" aria-labelledby="why-title">
    <div class="wrap">
      <span class="section-eyebrow">For managers and HR</span>
      <h2 class="section-title" id="why-title">Why managers and HR teams choose it</h2>
      ${cards([
        ["Leadership you keep", "Your own staff become the people who guide AI adoption and security, instead of relying on outside consultants."],
        ["Practical, work-ready skills", "Risk assessments, policy reviews, incident write-ups and management reports, practised on realistic scenarios with AI support and human checks."],
        ["Governance and data protection", `AI policy, acceptable use, human oversight and data protection in line with ${DATA_PROTECTION_LAW[code]}.`],
        ["Full visibility for HR", "Your manager login shows who has joined, how far each person has got and who has finished. No chasing."],
        ["No time away from work", "Self-paced, in short sessions around real duties, on any device. No classroom, no travel, no venue."],
        ["Evidence for your files", "A certificate of completion for each participant, capstone feedback and a dated attendance record for your training records."],
      ])}
    </div>
  </section>

  ${howSection()}

  ${pricingSection(code, "accelerator", true)}

  ${faqSection(faqs(code), acceleratorPath(code), `AI + Cybersecurity Professional Accelerator in ${country}`)}

  ${enquiry(code, enquiryCopy, ACC_FORM)}

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
