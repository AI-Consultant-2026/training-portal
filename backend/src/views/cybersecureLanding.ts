import { COUNTRIES, CountryCode, formatMoney } from "../constants/countries";
import { CORPORATE_PRICES, VOLUME_TIERS, seatPrice } from "../constants/corporatePricing";
import { CORPORATE_CONTACT, EnquiryCopy, cyberLandingPath, cyberSecurePath, enquiry } from "./corporateAiWorkflow";
import { CYBER_FORM, modules } from "./corporateCyberSecure";
import { CYBERSECURE_CONTENT } from "./corporateCyberSecureContent";
import { DATA_PROTECTION_LAW, ORGANIZATION_LD, countryCorporatePath } from "./corporateLocal";
import { cohortNotice, hasOnboardingSlots, slotsLeft, PILOT_STAFF, previewSignupPath } from "./corporateOffers";
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
export const LANDING_VIDEO: { src: string; poster: string; label: string } | null = {
  src: "/videos/corporate/cybersecure-workforce-promo.mp4?v=1",
  poster: "/videos/corporate/cybersecure-workforce-promo.jpg",
  label: "Video: CyberSecure Workforce (1 minute 24 seconds)",
};

const money = (code: CountryCode, n: number) => formatMoney(code, n);
const maxDiscount = Math.round(Math.max(...VOLUME_TIERS.map((t) => t.discount)) * 100);

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

function localSupport(code: CountryCode): string {
  if (code === "NG")
    return "Nigerian employers that pay the ITF training levy can use our attendance records and programme documentation to support a reimbursement claim. The ITF decides eligibility and the amount.";
  if (code === "ZA")
    return "Include the training in your Workplace Skills Plan and Annual Training Report for the SETA mandatory grant. Skills spend also counts towards the B-BBEE skills development element; your verification agency confirms how it is recognised.";
  return "";
}

function incentives(code: CountryCode): [string, string][] {
  const p = CORPORATE_PRICES.cybersecure[code];
  const list: [string, string][] = [
    [
      `Up to ${maxDiscount}% off for larger teams`,
      `10% off from 10 learners, 20% from 50 and ${maxDiscount}% from 200. For 200+ staff that is ${money(code, seatPrice("cybersecure", code, 200))} per learner instead of ${money(code, p)}.`,
    ],
    [
      "Pilot with your fee credited back",
      `Start with ${PILOT_STAFF} learners in one team. If you order a wider rollout within 90 days, the full pilot fee is credited against it.`,
    ],
    ["14-day money-back guarantee", "Full refund within 14 days of purchase if no learner has started."],
    ["Free preview for leaders", "See the course yourself before you buy. The leadership preview is free and takes one step to sign up."],
    ["Unused seats are never wasted", "Give an unused seat to another member of staff at any time during the 12 months’ access."],
    ["15% off all three programmes", "Add AI Workflow Productivity and the AI + Cybersecurity Professional Accelerator for the same person and save 15%."],
  ];
  const local = localSupport(code);
  // Six cards in a 3-column grid: the local funding card replaces the unused-seats one,
  // which the refund terms next to the order form already cover.
  if (local) list.splice(4, 1);
  if (local) list.push([code === "NG" ? "Support for ITF reimbursement" : "Counts towards SETA and B-BBEE", local]);
  return list;
}

function faqs(code: CountryCode): { q: string; a: string }[] {
  const country = COUNTRIES[code].name;
  return [
    {
      q: "How quickly can our staff start?",
      a: "The same day. Buy seats online, and once payment is confirmed we email you the sign-up link for your staff. Each person creates an account in about two minutes and the course is already on their dashboard.",
    },
    {
      q: "Is there a live trainer or a class to attend?",
      a: "No. CyberSecure Workforce is fully online and self-paced, in your organisation’s private training portal. Staff learn in short video lessons on a phone, laptop or office computer, whenever it suits their work.",
    },
    {
      q: "How do I see who has completed it?",
      a: "Sign up with the email address used on the order and your account becomes the manager login. You see who has joined, how far each person has got and who has finished.",
    },
    {
      q: "What do staff receive at the end?",
      a: "A certificate of completion, and a dated attendance record for your training files. It is a certificate of completion from Paleon Training, not an accredited qualification.",
    },
    {
      q: "Can we pay by invoice?",
      a: `Yes, for any order size. Tick “Send us an invoice” on the order form and we email one within one working day. Prices are per learner for 12 months’ access, plus VAT where applicable, in ${country}.`,
    },
    {
      q: "Is it relevant to data protection law?",
      a: `Yes. The course builds awareness of handling personal and customer data responsibly, in line with your obligations under ${DATA_PROTECTION_LAW[code]}. It supports your compliance programme; it is not legal advice.`,
    },
  ];
}

function videoSlot(): string {
  if (LANDING_VIDEO)
    return `<figure class="ca-video"><video controls playsinline preload="none" poster="${LANDING_VIDEO.poster}" aria-label="${escapeHtml(LANDING_VIDEO.label)}"><source src="${LANDING_VIDEO.src}" type="video/mp4"></video></figure>`;
  return `<div class="ca-video-ph" role="img" aria-label="Promotional video coming soon" data-video-placeholder>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M10 8.5v7l6-3.5z" fill="currentColor"/></svg>
        <span>Video coming soon</span>
      </div>`;
}

function jsonLd(code: CountryCode, url: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: `CyberSecure Workforce for staff in ${COUNTRIES[code].name}`,
        isPartOf: { "@id": `${ORIGIN}/#website` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs(code).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      ORGANIZATION_LD,
    ],
  };
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
    description: `Train every employee in ${country} to spot and stop phishing, payment fraud and deepfake scams. Online, self-paced, from ${price} per learner, with discounts up to ${maxDiscount}%. Start today.`,
    canonicalPath,
    alternatesFor: cyberLandingPath,
    xDefault: cyberLandingPath("NG"),
    jsonLd: jsonLd(code, url),
  })
    .replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1${ORIGIN}/images/og/cybersecure-workforce-${cc}.jpg"`)
    .replace("</head>", '<link rel="stylesheet" href="/corporate-ai.css">\n</head>');

  const threatCards = THREATS.map(([h, p]) => `<div class="ca-card"><h3>${escapeHtml(h)}</h3><p>${escapeHtml(p)}</p></div>`).join("");
  const offerCards = incentives(code).map(([h, p]) => `<div class="ca-card"><h3>${escapeHtml(h)}</h3><p>${escapeHtml(p)}</p></div>`).join("");
  const faqHtml = faqs(code)
    .map((f) => `<details class="ca-faq"><summary>${escapeHtml(f.q)}</summary><p>${escapeHtml(f.a)}</p></details>`)
    .join("\n");
  const urgency = hasOnboardingSlots()
    ? `<p class="ca-p"><strong>Company onboarding is limited:</strong> ${escapeHtml(slotsLeft())}. Individual seats bought online start today.</p>`
    : "";
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
          <li>Up to ${maxDiscount}% off for teams</li>
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
      ${videoSlot()}
    </div>
  </section>

  <section class="section section-paper ca-section" id="risk" aria-labelledby="risk-title">
    <div class="wrap">
      <span class="section-eyebrow">The risk</span>
      <h2 class="section-title" id="risk-title">Three messages your staff could receive this week</h2>
      <div class="ca-cards ca-cards-3">${threatCards}</div>
      <p class="ca-p"><strong>Your firewall can’t stop these. Your people can.</strong> When technology misses something, a trained employee who stops, checks and reports is the last line of defence.</p>
    </div>
  </section>

  <section class="section section-dark ca-section" id="offer" aria-labelledby="offer-title">
    <div class="wrap">
      <span class="section-eyebrow">Your incentives</span>
      <h2 class="section-title" id="offer-title">More value, less risk for your organisation</h2>
      <div class="ca-cards ca-cards-3">${offerCards}</div>
      ${urgency}
      <div class="ca-ctas">
        <a class="btn btn-signal btn-lg" href="#buy" data-landing-cta="buy-offer">See your price and buy seats</a>
        <a class="btn btn-outline-light btn-lg" href="${previewSignupPath(code, "cybersecure")}" data-preview-cta>Get the free leadership preview</a>
      </div>
    </div>
  </section>

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

  <section class="section section-paper ca-section" id="how" aria-labelledby="how-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">How it works</span>
      <h2 class="section-title" id="how-title">Three steps to a trained workforce</h2>
      <ol class="ca-steps">
        <li><strong>Buy your seats.</strong> Enter the number of staff below. Your volume discount is applied automatically. Pay online or ask for an invoice.</li>
        <li><strong>Share one link.</strong> We email you your staff sign-up link. Send it by email or WhatsApp; each person joins in about two minutes.</li>
        <li><strong>Track and certify.</strong> Follow progress from your manager login. Everyone who finishes gets a certificate of completion.</li>
      </ol>
    </div>
  </section>

  ${pricingSection(code, "cybersecure", true)}

  <section class="section section-paper ca-section" id="faq" aria-labelledby="faq-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Questions</span>
      <h2 class="section-title" id="faq-title">Before you buy</h2>
      ${faqHtml}
      <p class="ca-p">Want the full programme details? See <a href="${cyberSecurePath(code)}"><strong>CyberSecure Workforce in ${escapeHtml(country)}</strong></a>.</p>
    </div>
  </section>

  ${enquiry(code, enquiryCopy, CYBER_FORM)}

  <section class="section section-paper ca-section" id="contact" aria-labelledby="contact-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Contact Paleon Training</span>
      <h2 class="section-title" id="contact-title">Talk to our corporate team</h2>
      <ul class="ca-list">
        <li><strong>Email:</strong> <a href="mailto:corporate@paleontraining.com">corporate@paleontraining.com</a></li>
        <li><strong>WhatsApp:</strong> <a href="https://wa.me/447508823495" target="_blank" rel="noopener">+44 7508 823495</a></li>
        <li><strong>Website:</strong> <a href="/">paleontraining.com</a></li>
      </ul>
      <p class="ca-p">We reply within one working day. Or <a href="#enquiry" data-intent="proposal">send us your details</a> and we will contact you.</p>
    </div>
  </section>
</main>
${footer(ctx, home, false, home, true)}
${scripts(ctx)}
<script src="/corporate-ai.js" defer></script>
<script src="/corporate-buy.js" defer></script>
</body>
</html>
`;
}
