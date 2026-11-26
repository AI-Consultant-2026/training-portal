import { COUNTRIES, CountryCode } from "../constants/countries";
import { CORPORATE_PRICES } from "../constants/corporatePricing";
import { CORPORATE_CONTACT, EnquiryCopy, cyberLandingPath, cyberSecurePath, enquiry } from "./corporateAiWorkflow";
import { CYBER_FORM, modules } from "./corporateCyberSecure";
import { CYBERSECURE_CONTENT } from "./corporateCyberSecureContent";
import { DATA_PROTECTION_LAW, countryCorporatePath } from "./corporateLocal";
import { cohortNotice } from "./corporateOffers";
import { Faq, LandingVideo, MAX_DISCOUNT, cards, commonFaqs, contactSection, faqSection, howSection, landingJsonLd, money, offerSection, videoSlot } from "./landingShared";
import { pricingSection } from "./corporatePricing";
import { ORIGIN, PageContext, SEARCH_OVERLAY, escapeHtml, corporateUtilBar, footer, head, header, scripts, whatsappAttr } from "./countryHome";

// CyberSecure Workforce landing pages (2026-11-23, owner request): one short, direct sales page
// per country at /<cc>/cybersecure-workforce, for managers and HR leads buying seats for their
// staff. Ads, emails and the promo videos point here; the full programme page stays at
// /<cc>/corporate-training/cybersecure-workforce. Every incentive here already exists on the
// corporate pages (volume discounts, the all-three bundle, the pilot guarantee, the 14-day
// refund, the free leadership preview, December onboarding slots, ITF/SETA support): nothing new
// is promised. Online, self-paced, private company portal only; never live or facilitator-led.
// The promotional video slot plays LANDING_VIDEO (CyberSecureWorkforce.mp4, 2026-11-23, 720p);
// set it to null to show the placeholder again.

export { cyberLandingPath };

/** Set to { src, poster, label } once the promo video is uploaded to /videos/corporate/. */
export const LANDING_VIDEO: LandingVideo | null = {
  src: "/videos/corporate/cybersecure-workforce-promo.mp4?v=1",
  poster: "/videos/corporate/cybersecure-workforce-promo.jpg",
  label: "Video: CyberSecure Workforce (1 minute 24 seconds)",
};


const THREATS: [string, string][] = [
  [
    "The email with no link",
    "“Our bank details have changed. Please pay today’s invoice to the new account.” No link, no attachment, nothing for a filter to catch. One busy person pays it.",
  ],
  [
    "Monday morning",
    "Every screen shows the same message: your files are encrypted. Email, payroll and customer systems stop, often because one person opened one attachment.",
  ],
  [
    "The call from the boss",
    "It is the Managing Director’s face and voice on a video call, asking for an urgent, confidential payment. Except it isn’t them. AI can now copy both.",
  ],
];

function faqs(code: CountryCode): Faq[] {
  return commonFaqs("cybersecure", code, "The course builds awareness of handling personal and customer data responsibly,");
}

export function renderCyberLanding(code: CountryCode): string {
  const country = COUNTRIES[code].name;
  const cc = code.toLowerCase();
  const home = COUNTRIES[code].site.path;
  const ctx: PageContext = { country: code, hub: false, detected: null, chosen: null };
  const canonicalPath = cyberLandingPath(code);
  const url = `${ORIGIN}${canonicalPath}`;
  const price = money(code, CORPORATE_PRICES.cybersecure[code]);
  const headHtml = head(ctx, {
    title: `Cybersecurity Training for Your Staff in ${country} | CyberSecure Workforce`,
    description: `Train every employee in ${country} to spot and stop phishing, payment fraud and deepfake scams. Online, self-paced, from ${price} per learner, with discounts up to ${MAX_DISCOUNT}%. Start today.`,
    canonicalPath,
    alternatesFor: cyberLandingPath,
    xDefault: cyberLandingPath("NG"),
    jsonLd: landingJsonLd(`CyberSecure Workforce for staff in ${country}`, url, faqs(code)),
  })
    .replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1${ORIGIN}/images/og/cybersecure-workforce-${cc}.jpg"`)
    .replace("</head>", '<link rel="stylesheet" href="/corporate-ai.css">\n</head>');

  const enquiryCopy: EnquiryCopy = {
    title: "Start the process today",
    lede: `Tell us how many staff you want to train and we will reply within one working day with a proposal for your organisation in ${country}, including your volume discount.`,
    note: "Prefer to buy straight away? **Use the order form above** and your staff can start today.",
    contact: CORPORATE_CONTACT,
  };

  return `${headHtml}
<body data-country="${code}"${whatsappAttr(code)}>
${SEARCH_OVERLAY}
<a class="skip-link" href="#main">Skip to main content</a>
${corporateUtilBar(home, code)}
${header(ctx, home, "/", true)}
<main id="main">
  <section class="hero ca-hero" id="top">
    <div class="wrap cs-crumb-wrap"><p class="pw-crumb"><a href="${countryCorporatePath(code)}">Corporate training in ${escapeHtml(country)}</a> <span aria-hidden="true">/</span> CyberSecure Workforce for your staff</p></div>
    <div class="wrap ca-hero-grid">
      <div class="hero-inner ca-hero-copy">
        <span class="eyebrow">CyberSecure Workforce &middot; ${escapeHtml(country)}</span>
        <h1 class="hero-title ca-hero-title">Train every employee to stop cyberattacks</h1>
        <p class="ca-headline">Most attacks start with one person. Online and self-paced, from ${escapeHtml(price)} per learner.</p>
        <p class="hero-sub">Fake invoices, phishing, ransomware and AI voice scams all need one person to click, pay or share. CyberSecure Workforce teaches every employee to <strong>Stop, Check and Report</strong>, in plain language, in your own private company portal. Buy seats today and your staff can start today.</p>
        ${cohortNotice("cybersecure")}
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
        <img src="/images/cybersecure/${cc}-hero.jpg" alt="Staff at work in an office in ${escapeHtml(country)}" width="1600" height="900" fetchpriority="high" decoding="async">
      </div>
    </div>
  </section>

  <section class="section section-dark ca-section" id="video" aria-labelledby="video-title">
    <div class="wrap">
      <span class="section-eyebrow">Watch &middot; 1 min 24 s</span>
      <h2 class="section-title" id="video-title">CyberSecure Workforce in 90 seconds</h2>
      ${videoSlot(LANDING_VIDEO)}
    </div>
  </section>

  <section class="section section-paper ca-section" id="risk" aria-labelledby="risk-title">
    <div class="wrap">
      <span class="section-eyebrow">The risk</span>
      <h2 class="section-title" id="risk-title">Three messages your staff could receive this week</h2>
      ${cards(THREATS)}
      <p class="ca-p"><strong>Your firewall can’t stop these. Your people can.</strong> When technology misses something, a trained employee who stops, checks and reports is the last line of defence.</p>
    </div>
  </section>

  ${offerSection("cybersecure", code)}

  <section class="section section-paper ca-section" id="modules" aria-labelledby="modules-title">
    <div class="wrap">
      <span class="section-eyebrow">What your staff learn</span>
      <h2 class="section-title" id="modules-title">12 practical modules, ending with the CyberSecure Workforce Challenge</h2>
      <p class="ca-p">Short video lessons, realistic workplace scenarios and quick knowledge checks. No technical background needed: built for every employee, from the front desk to the boardroom.</p>
      ${modules(CYBERSECURE_CONTENT[code])}
    </div>
  </section>

  <section class="section section-dark ca-section" id="why" aria-labelledby="why-title">
    <div class="wrap">
      <span class="section-eyebrow">For managers and HR</span>
      <h2 class="section-title" id="why-title">Why managers and HR teams choose it</h2>
      <div class="ca-cards ca-cards-3">
        <div class="ca-card"><h3>No time away from work</h3><p>Staff learn in short sessions around their duties, on any device. No classroom, no travel, no venue.</p></div>
        <div class="ca-card"><h3>Full visibility for HR</h3><p>Your manager login shows who has joined, how far each person has got and who has finished. No chasing.</p></div>
        <div class="ca-card"><h3>Evidence for your files</h3><p>A certificate of completion for each learner and a dated attendance record for audits, insurers and clients.</p></div>
        <div class="ca-card"><h3>Data protection, in plain language</h3><p>Builds awareness of your obligations under ${escapeHtml(DATA_PROTECTION_LAW[code])}.</p></div>
        <div class="ca-card"><h3>AI scams included</h3><p>Deepfake calls, AI-written phishing and what is safe to share with AI tools, not just yesterday’s threats.</p></div>
        <div class="ca-card"><h3>Private to your organisation</h3><p>Your own company space on the Paleon portal, with a sign-up link only your staff can use.</p></div>
      </div>
    </div>
  </section>

  ${howSection()}

  ${pricingSection(code, "cybersecure", true)}

  ${faqSection(faqs(code), cyberSecurePath(code), `CyberSecure Workforce in ${country}`)}

  ${enquiry(code, enquiryCopy, CYBER_FORM)}

  ${contactSection()}
</main>
${footer(ctx, home, false, home, true)}
${scripts(ctx)}
<script src="/human-check.js" defer></script><script src="/corporate-ai.js" defer></script>
<script src="/corporate-buy.js" defer></script>
</body>
</html>
`;
}
