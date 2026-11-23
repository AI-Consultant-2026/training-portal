import { COUNTRIES, CountryCode, formatMoney } from "../constants/countries";
import { CORPORATE_PRICES, PRICED_PROGRAMMES, PROGRAMME_NAMES, PricedProgramme, VOLUME_TIERS, seatPrice } from "../constants/corporatePricing";
import { DATA_PROTECTION_LAW, ORGANIZATION_LD } from "./corporateLocal";
import { hasOnboardingSlots, slotsLeft, PILOT_STAFF, previewSignupPath } from "./corporateOffers";
import { ORIGIN, escapeHtml } from "./countryHome";

// Shared parts of the programme landing pages for buyers (2026-11-23): /<cc>/cybersecure-workforce
// (cybersecureLanding.ts) and /<cc>/ai-workflow-productivity (aiWorkflowLanding.ts). Every
// incentive is an offer the corporate pages already make; nothing new is promised.

export interface LandingVideo {
  src: string;
  poster: string;
  label: string;
}
export interface Faq {
  q: string;
  a: string;
}

export const money = (code: CountryCode, n: number) => formatMoney(code, n);
export const MAX_DISCOUNT = Math.round(Math.max(...VOLUME_TIERS.map((t) => t.discount)) * 100);

export function cards(list: [string, string][]): string {
  return `<div class="ca-cards ca-cards-3">${list.map(([h, p]) => `<div class="ca-card"><h3>${escapeHtml(h)}</h3><p>${escapeHtml(p)}</p></div>`).join("")}</div>`;
}

/** The promo video, or a 16:9 "Video coming soon" placeholder while there is none. */
export function videoSlot(video: LandingVideo | null): string {
  if (video)
    return `<figure class="ca-video"><video controls playsinline preload="none" poster="${video.poster}" aria-label="${escapeHtml(video.label)}"><source src="${video.src}" type="video/mp4"></video></figure>`;
  return `<div class="ca-video-ph" role="img" aria-label="Promotional video coming soon" data-video-placeholder>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M10 8.5v7l6-3.5z" fill="currentColor"/></svg>
        <span>Video coming soon</span>
      </div>`;
}

function localSupport(code: CountryCode): string {
  if (code === "NG")
    return "Nigerian employers that pay the ITF training levy can use our attendance records and programme documentation to support a reimbursement claim. The ITF decides eligibility and the amount.";
  if (code === "ZA")
    return "Include the training in your Workplace Skills Plan and Annual Training Report for the SETA mandatory grant. Skills spend also counts towards the B-BBEE skills development element; your verification agency confirms how it is recognised.";
  return "";
}

export function incentives(programme: PricedProgramme, code: CountryCode): [string, string][] {
  const others = PRICED_PROGRAMMES.filter((p) => p !== programme).map((p) => PROGRAMME_NAMES[p].replace(" & Process Transformation", ""));
  const list: [string, string][] = [
    [
      `Up to ${MAX_DISCOUNT}% off for larger teams`,
      `10% off from 10 learners, 20% from 50 and ${MAX_DISCOUNT}% from 200. For 200+ staff that is ${money(code, seatPrice(programme, code, 200))} per learner instead of ${money(code, CORPORATE_PRICES[programme][code])}.`,
    ],
    [
      "Pilot with your fee credited back",
      `Start with ${PILOT_STAFF} learners in one team. If you order a wider rollout within 90 days, the full pilot fee is credited against it.`,
    ],
    ["14-day money-back guarantee", "Full refund within 14 days of purchase if no learner has started."],
    ["Free preview for leaders", "See the course yourself before you buy. The leadership preview is free and takes one step to sign up."],
    ["Unused seats are never wasted", "Give an unused seat to another member of staff at any time during the 12 months’ access."],
    ["15% off all three programmes", `Add ${others[0]} and the ${others[1]} for the same person and save 15%.`],
  ];
  const local = localSupport(code);
  // Six cards in a 3-column grid: the local funding card replaces the unused-seats one,
  // which the refund terms next to the order form already cover.
  if (local) {
    list.splice(4, 1);
    list.push([code === "NG" ? "Support for ITF reimbursement" : "Counts towards SETA and B-BBEE", local]);
  }
  return list;
}

export function offerSection(programme: PricedProgramme, code: CountryCode): string {
  const urgency = hasOnboardingSlots()
    ? `<p class="ca-p"><strong>Company onboarding is limited:</strong> ${escapeHtml(slotsLeft())}. Individual seats bought online start today.</p>`
    : "";
  return `<section class="section section-dark ca-section" id="offer" aria-labelledby="offer-title">
    <div class="wrap">
      <span class="section-eyebrow">Your incentives</span>
      <h2 class="section-title" id="offer-title">More value, less risk for your organisation</h2>
      ${cards(incentives(programme, code))}
      ${urgency}
      <div class="ca-ctas">
        <a class="btn btn-signal btn-lg" href="#buy" data-landing-cta="buy-offer">See your price and buy seats</a>
        <a class="btn btn-outline-light btn-lg" href="${previewSignupPath(code, programme)}" data-preview-cta>Get the free leadership preview</a>
      </div>
    </div>
  </section>`;
}

export function howSection(): string {
  return `<section class="section section-paper ca-section" id="how" aria-labelledby="how-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">How it works</span>
      <h2 class="section-title" id="how-title">Three steps to a trained workforce</h2>
      <ol class="ca-steps">
        <li><strong>Buy your seats.</strong> Enter the number of staff below. Your volume discount is applied automatically. Pay online or ask for an invoice.</li>
        <li><strong>Share one link.</strong> We email you your staff sign-up link. Send it by email or WhatsApp; each person joins in about two minutes.</li>
        <li><strong>Track and certify.</strong> Follow progress from your manager login. Everyone who finishes gets a certificate of completion.</li>
      </ol>
    </div>
  </section>`;
}

/** The questions every buyer asks, worded for the programme. */
export function commonFaqs(programme: PricedProgramme, code: CountryCode, dataProtection: string): Faq[] {
  const name = PROGRAMME_NAMES[programme];
  return [
    {
      q: "How quickly can our staff start?",
      a: "The same day. Buy seats online, and once payment is confirmed we email you the sign-up link for your staff. Each person creates an account in about two minutes and the course is already on their dashboard.",
    },
    {
      q: "Is there a live trainer or a class to attend?",
      a: `No. ${name} is fully online and self-paced, in your organisation’s private training portal. Staff learn in short video lessons on a phone, laptop or office computer, whenever it suits their work.`,
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
      a: `Yes, for any order size. Tick “Send us an invoice” on the order form and we email one within one working day. Prices are per learner for 12 months’ access, plus VAT where applicable, in ${COUNTRIES[code].name}.`,
    },
    {
      q: "Is it relevant to data protection law?",
      a: `Yes. ${dataProtection} in line with your obligations under ${DATA_PROTECTION_LAW[code]}. It supports your compliance programme; it is not legal advice.`,
    },
  ];
}

export function faqSection(list: Faq[], fullHref: string, fullLabel: string): string {
  const items = list.map((f) => `<details class="ca-faq"><summary>${escapeHtml(f.q)}</summary><p>${escapeHtml(f.a)}</p></details>`).join("\n");
  return `<section class="section section-paper ca-section" id="faq" aria-labelledby="faq-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Questions</span>
      <h2 class="section-title" id="faq-title">Before you buy</h2>
      ${items}
      <p class="ca-p">Want the full programme details? See <a href="${fullHref}"><strong>${escapeHtml(fullLabel)}</strong></a>.</p>
    </div>
  </section>`;
}

export function contactSection(): string {
  return `<section class="section section-paper ca-section" id="contact" aria-labelledby="contact-title">
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
  </section>`;
}

export function landingJsonLd(name: string, url: string, faqList: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": url, url, name, isPartOf: { "@id": `${ORIGIN}/#website` } },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqList.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      ORGANIZATION_LD,
    ],
  };
}
