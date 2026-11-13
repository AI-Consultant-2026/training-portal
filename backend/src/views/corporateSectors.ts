import { COUNTRIES, CountryCode, MARKET_ORDER, formatMoney } from "../constants/countries";
import { CORPORATE_PRICES, PROGRAMME_NAMES } from "../constants/corporatePricing";
import { CORPORATE_CONTACT, CORPORATE_HUB_PATH, WORKFORCE_CTA, ctaButton, cyberSecurePath, enquiry } from "./corporateAiWorkflow";
import { CYBER_FORM } from "./corporateCyberSecure";
import { DATA_PROTECTION_LAW, ORGANIZATION_LD } from "./corporateLocal";
import {
  forwardSection,
  pilotSection,
  programmePagePath,
  readinessButton,
  waysToBuyBrief,
} from "./corporateOffers";
import { SECTORS, SECTORS_PATH, Sector } from "./corporateSectorsData";
import { ORIGIN, PageContext, escapeHtml } from "./countryHome";
import { flagSvg } from "./flags";
import { shell } from "./directorResources";

// The corporate sector pages (2026-11-13): /corporate-training/sectors and one page per
// sector (copy in corporateSectorsData.ts). One page for all four countries; ?country= (or the
// remembered country) sets the prices, the data protection law and the buy links.

export { SECTORS_PATH } from "./corporateSectorsData";

function contextFor(country: CountryCode | null, chosen: CountryCode | null): PageContext {
  return country
    ? { country, hub: false, detected: null, chosen: country }
    : { country: chosen ?? "NG", hub: true, detected: null, chosen };
}

function countrySwitch(path: string, current: CountryCode): string {
  return `<p class="co-country-switch">Prices and law shown for <strong>${escapeHtml(COUNTRIES[current].name)}</strong>. Change: ${MARKET_ORDER.map(
    (k) =>
      `<a href="${path}?country=${k.toLowerCase()}"${k === current ? ' aria-current="true"' : ""}>${flagSvg(k, "flag flag-sm")} ${escapeHtml(COUNTRIES[k].name)}</a>`,
  ).join(" ")}</p>`;
}

function sectorLd(s: Sector, url: string): object {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION_LD,
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: s.title,
        description: s.description,
        breadcrumb: { "@id": `${url}#breadcrumb` },
        about: { "@id": `${url}#service` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: s.h1,
        serviceType: "Corporate cybersecurity awareness and AI training",
        description: s.description,
        url,
        provider: { "@id": `${ORIGIN}/#organization` },
        areaServed: MARKET_ORDER.map((k) => ({ "@type": "Country", name: COUNTRIES[k].name })),
        audience: { "@type": "BusinessAudience", audienceType: s.name },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Corporate training", item: `${ORIGIN}${CORPORATE_HUB_PATH}` },
          { "@type": "ListItem", position: 2, name: "Sectors", item: `${ORIGIN}${SECTORS_PATH}` },
          { "@type": "ListItem", position: 3, name: s.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
}

const cards = (items: { h: string; p: string }[]) =>
  `<div class="ca-cards">${items.map((i) => `<div class="ca-card"><h3>${escapeHtml(i.h)}</h3><p>${escapeHtml(i.p)}</p></div>`).join("")}</div>`;

export function renderSector(slug: string, country: CountryCode | null, chosen: CountryCode | null): string | null {
  const s = SECTORS.find((x) => x.slug === slug);
  if (!s) return null;
  const ctx = contextFor(country, chosen);
  const code = ctx.country;
  const path = `${SECTORS_PATH}/${s.slug}`;
  const url = `${ORIGIN}${path}`;
  const fit = s.fit
    .map(
      (f) => `<div class="ca-card">
          <h3><a href="${programmePagePath(f.programme, code)}">${escapeHtml(PROGRAMME_NAMES[f.programme])}</a></h3>
          <p>${escapeHtml(f.why)}</p>
          <p class="cs-meta"><strong>Self-paced:</strong> ${escapeHtml(formatMoney(code, CORPORATE_PRICES[f.programme][code]))} per learner. Live or in-house: by quote.</p>
          <p class="ca-card-link"><a href="${programmePagePath(f.programme, code)}">See the programme &rarr;</a></p>
        </div>`,
    )
    .join("");
  const body = `
  <section class="hero ca-hero" id="top">
    <div class="wrap cs-crumb-wrap"><p class="pw-crumb"><a href="${CORPORATE_HUB_PATH}">Corporate training</a> <span aria-hidden="true">/</span> <a href="${SECTORS_PATH}">Sectors</a> <span aria-hidden="true">/</span> ${escapeHtml(s.name)}</p></div>
    <div class="wrap">
      <div class="hero-inner ca-hero-copy co-sector-hero">
        <span class="eyebrow">Corporate training by sector &middot; ${escapeHtml(s.name)}</span>
        <h1 class="hero-title ca-hero-title">${escapeHtml(s.h1)}</h1>
        <p class="hero-sub">${escapeHtml(s.lead)}</p>
        <div class="hero-ctas">
          ${ctaButton(WORKFORCE_CTA, true, `${cyberSecurePath(code)}#buy`)}
          ${readinessButton(code, true)}
        </div>
        ${countrySwitch(path, code)}
      </div>
    </div>
  </section>

  <section class="section section-paper ca-section" id="outcomes" aria-labelledby="outcomes-title">
    <div class="wrap">
      <span class="section-eyebrow">Business outcomes</span>
      <h2 class="section-title" id="outcomes-title">What changes for your organisation</h2>
      <ul class="ca-list co-outcome-list">${s.outcomes.map((o) => `<li><strong>${escapeHtml(o)}</strong></li>`).join("")}</ul>
      <p class="ca-p">Who takes part: ${escapeHtml(s.teams.join(", ").toLowerCase().replace(/^./, (c) => c.toUpperCase()))}.</p>
    </div>
  </section>

  <section class="section section-dark ca-section" id="threats" aria-labelledby="threats-title">
    <div class="wrap">
      <span class="section-eyebrow">Tailored scenarios</span>
      <h2 class="section-title" id="threats-title">The situations your staff practise</h2>
      ${cards(s.threats)}
      <p class="ca-p">Data protection, in plain language: the training builds awareness of handling personal data responsibly, in line with your obligations under ${escapeHtml(DATA_PROTECTION_LAW[code])}. It supports your compliance programme; it is not legal advice.</p>
    </div>
  </section>

  <section class="section section-paper ca-section" id="ai" aria-labelledby="ai-title">
    <div class="wrap">
      <span class="section-eyebrow">Safe AI at work</span>
      <h2 class="section-title" id="ai-title">Where AI saves time in ${escapeHtml(s.name.toLowerCase())}</h2>
      ${cards(s.aiUses)}
    </div>
  </section>

  <section class="section section-dark ca-section" id="programmes" aria-labelledby="programmes-title">
    <div class="wrap">
      <span class="section-eyebrow">Which programme</span>
      <h2 class="section-title" id="programmes-title">The right programme for each group</h2>
      <div class="ca-cards ca-cards-3">${fit}</div>
      <h3 class="cp-subtitle">Two ways to buy</h3>
      ${waysToBuyBrief(code, true)}
    </div>
  </section>

  ${pilotSection(code, null, false)}
  ${forwardSection(code, null, true)}

  <section class="section section-paper ca-section" id="faq" aria-labelledby="faq-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Questions</span>
      <h2 class="section-title" id="faq-title">Frequently asked questions</h2>
      ${s.faq.map((f) => `<details class="ca-faq"><summary>${escapeHtml(f.q)}</summary><p>${escapeHtml(f.a)}</p></details>`).join("\n")}
      <p class="ca-p">Other sectors: ${SECTORS.filter((x) => x.slug !== s.slug)
        .map((x) => `<a href="${SECTORS_PATH}/${x.slug}">${escapeHtml(x.name)}</a>`)
        .join(" &middot; ")}.</p>
    </div>
  </section>

  ${enquiry(
    country,
    {
      title: `Tell us about your ${s.name.toLowerCase()} organisation`,
      lede: "Five quick details and we will reply within one working day to arrange a 20-minute call.",
      note: "We will then send a proposal shaped around your teams, locations and dates.",
      contact: CORPORATE_CONTACT,
    },
    CYBER_FORM,
  )}`;
  return shell(ctx, {
    title: s.title,
    description: s.description,
    path,
    jsonLd: sectorLd(s, url),
    body,
    extraScript: '<script src="/corporate-ai.js" defer></script>',
  });
}

export function renderSectorsIndex(country: CountryCode | null, chosen: CountryCode | null): string {
  const ctx = contextFor(country, chosen);
  const url = `${ORIGIN}${SECTORS_PATH}`;
  const title = "Corporate Cybersecurity & AI Training by Sector | Paleon Training";
  const description =
    "Cybersecurity awareness and AI training tailored to banking, healthcare, the public sector and oil & gas, for organisations in Nigeria, South Africa, Kenya and Ghana.";
  const body = `
  <section class="hero ca-hero" id="top">
    <div class="wrap cs-crumb-wrap"><p class="pw-crumb"><a href="${CORPORATE_HUB_PATH}">Corporate training</a> <span aria-hidden="true">/</span> Sectors</p></div>
    <div class="wrap">
      <div class="hero-inner ca-hero-copy co-sector-hero">
        <span class="eyebrow">Corporate training by sector</span>
        <h1 class="hero-title ca-hero-title">Cybersecurity and AI training shaped around your sector</h1>
        <p class="hero-sub">The same three programmes, with scenarios, exercises and workplace projects taken from your industry.</p>
        <div class="hero-ctas">${readinessButton(country ?? chosen, true)}</div>
      </div>
    </div>
  </section>
  <section class="section section-paper ca-section" id="sectors" aria-labelledby="sectors-title">
    <div class="wrap">
      <h2 class="section-title" id="sectors-title">Choose your sector</h2>
      <div class="ca-cards">${SECTORS.map(
        (s) => `<div class="ca-card">
          <h3><a href="${SECTORS_PATH}/${s.slug}">${escapeHtml(s.name)}</a></h3>
          <p>${escapeHtml(s.card)}</p>
          <p class="ca-card-link"><a href="${SECTORS_PATH}/${s.slug}">${escapeHtml(s.name)} training &rarr;</a></p>
        </div>`,
      ).join("\n")}</div>
      <p class="ca-p">Another sector? We adapt every programme to telecoms, manufacturing, education, professional services and more: <a href="${CORPORATE_HUB_PATH}#enquiry">tell us about your organisation</a>.</p>
    </div>
  </section>`;
  return shell(ctx, {
    title,
    description,
    path: SECTORS_PATH,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_LD,
        {
          "@type": "CollectionPage",
          "@id": `${url}#page`,
          url,
          name: title,
          description,
          hasPart: SECTORS.map((s) => ({ "@type": "WebPage", url: `${url}/${s.slug}`, name: s.h1 })),
        },
      ],
    },
    body,
  });
}
