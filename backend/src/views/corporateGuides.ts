import { COUNTRIES, CountryCode, MARKET_ORDER } from "../constants/countries";
import { GUIDES, GUIDE_BY_SLUG, GUIDE_CATEGORIES, Guide, ProgrammeKey } from "../constants/corporateGuides";
import { CORPORATE_HUB_PATH } from "./corporateAiWorkflow";
import { ORGANIZATION_LD, countryCorporatePath } from "./corporateLocal";
import { ORIGIN, PageContext, escapeHtml } from "./countryHome";
import { AI_POLICY_PATH, BOARD_BRIEFING_PATH, PROGRAMMES, READINESS_PATH, article, countryLinks, shell, toc } from "./directorResources";

// Corporate guides (2026-11-09): the hub at /corporate-guides and one article per guide at
// /corporate-guides/<slug>. Content lives in constants/corporateGuides.ts. Each page exists
// once for every country, so it carries no hreflang alternates: the canonical alone.

export const GUIDES_PATH = "/corporate-guides";
export const guidePath = (slug: string) => `${GUIDES_PATH}/${slug}`;
const DATE = "2026-11-09";

const programmeUrl = (key: ProgrammeKey, country: CountryCode) => `${COUNTRIES[country].site.path}/${PROGRAMMES[key].slug}`;

function noAlternates(html: string): string {
  return html.replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*">\n?/g, "");
}

function crumbs(items: { name: string; href?: string }[]): string {
  return `<div class="wrap cs-crumb-wrap"><p class="pw-crumb">${items
    .map((i) => (i.href ? `<a href="${i.href}">${escapeHtml(i.name)}</a>` : escapeHtml(i.name)))
    .join(' <span aria-hidden="true">/</span> ')}</p></div>`;
}

function breadcrumbLd(url: string, items: { name: string; path: string }[]): object {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: items.map((i, n) => ({ "@type": "ListItem", position: n + 1, name: i.name, item: `${ORIGIN}${i.path}` })),
  };
}

function programmeBlock(g: Guide): string {
  const countries = g.country ? [g.country] : MARKET_ORDER;
  const items = g.programmes
    .map((key) => {
      const links = countries
        .map((c) => `<a href="${programmeUrl(key, c)}">${g.country ? "Programme details" : escapeHtml(COUNTRIES[c].name)}</a>`)
        .join(" &middot; ");
      return `<li><strong>${escapeHtml(PROGRAMMES[key].name)}</strong>: ${links}</li>`;
    })
    .join("");
  return `<section class="rs-section" id="programmes" aria-labelledby="programmes-title">
        <h2 class="section-title" id="programmes-title">Related training programmes</h2>
        <ul class="ca-list">${items}</ul>
      </section>`;
}

function faqBlock(g: Guide): string {
  return `<section class="rs-section" id="faq" aria-labelledby="faq-title">
        <h2 class="section-title" id="faq-title">Frequently asked questions</h2>
        ${g.faqs.map((f) => `<h3>${escapeHtml(f.q)}</h3>\n        <p class="ca-p">${escapeHtml(f.a)}</p>`).join("\n        ")}
      </section>`;
}

function relatedBlock(g: Guide): string {
  const links = g.related
    .map((s) => GUIDE_BY_SLUG[s])
    .filter(Boolean)
    .map((r) => `<li><a href="${guidePath(r.slug)}">${escapeHtml(r.h1)}</a></li>`)
    .join("");
  return `<section class="rs-section" id="related" aria-labelledby="related-title">
        <h2 class="section-title" id="related-title">Related guides</h2>
        <ul class="ca-list">${links}<li><a href="${GUIDES_PATH}">All corporate training guides</a></li></ul>
        <p class="ca-p">Free tools for directors: <a href="${READINESS_PATH}">AI &amp; Cyber Readiness Check</a> &middot; <a href="${AI_POLICY_PATH}">AI use policy template</a> &middot; <a href="${BOARD_BRIEFING_PATH}">board cyber-risk briefing</a></p>
      </section>`;
}

function guideCta(g: Guide): string {
  const consult = g.country ? `${countryCorporatePath(g.country)}#enquiry` : "/#enquiry";
  const where = g.country
    ? `organisations in ${escapeHtml(COUNTRIES[g.country].name)}`
    : `organisations in ${countryLinks()}`;
  return `<section class="section section-dark ca-section" aria-labelledby="cta-title">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Next step</span>
      <h2 class="section-title" id="cta-title">Talk to us about training your teams</h2>
      <p class="ca-p">Paleon Training runs corporate AI and cybersecurity training for ${where}. Start with the free readiness check, or book a consultation and we will recommend a format for your organisation.</p>
      <div class="ca-ctas"><a class="btn btn-signal btn-lg" href="${READINESS_PATH}${g.country ? `?country=${g.country}` : ""}">Take the free readiness check</a> <a class="btn btn-outline-light btn-lg" href="${consult}">Book a consultation</a></div>
    </div>
  </section>`;
}

export function renderGuide(slug: string, chosen: CountryCode | null): string | null {
  const g = GUIDE_BY_SLUG[slug];
  if (!g) return null;
  const path = guidePath(g.slug);
  const url = `${ORIGIN}${path}`;
  const ctx: PageContext = { country: g.country ?? chosen ?? "NG", hub: true, detected: null, chosen };
  const crumbItems = [
    { name: "Corporate training", path: CORPORATE_HUB_PATH },
    { name: "Guides", path: GUIDES_PATH },
    { name: g.h1, path },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION_LD,
      {
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        headline: g.h1,
        name: g.title,
        description: g.description,
        inLanguage: "en",
        author: { "@id": `${ORIGIN}/#organization` },
        publisher: { "@id": `${ORIGIN}/#organization` },
        datePublished: DATE,
        dateModified: DATE,
        mainEntityOfPage: url,
        ...(g.country ? { spatialCoverage: { "@type": "Country", name: COUNTRIES[g.country].name } } : {}),
        about: GUIDE_CATEGORIES.find((c) => c.key === g.category)?.name,
        audience: { "@type": "BusinessAudience", audienceType: "Business owners, directors, HR and IT leaders" },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: g.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      breadcrumbLd(url, crumbItems),
    ],
  };
  const body = `  <section class="hero ca-hero" id="top">
    ${crumbs([
      { name: "Corporate training", href: CORPORATE_HUB_PATH },
      { name: "Guides", href: GUIDES_PATH },
      { name: GUIDE_CATEGORIES.find((c) => c.key === g.category)?.name ?? "Guide" },
    ])}
    <div class="wrap"><div class="hero-inner ca-hero-copy">
      <span class="eyebrow">Guide for employers${g.country ? ` in ${escapeHtml(COUNTRIES[g.country].name)}` : ""}</span>
      <h1 class="hero-title ca-hero-title">${escapeHtml(g.h1)}</h1>
      <p class="hero-sub">${escapeHtml(g.lead)}</p>
    </div></div>
  </section>
  <section class="section section-paper ca-section">
    <div class="wrap ca-narrow">
      ${toc(g.sections)}
      ${article(g.sections)}
      ${programmeBlock(g)}
      ${faqBlock(g)}
      ${relatedBlock(g)}
      <p class="ca-p"><em>Published ${DATE.split("-").reverse().join("/")} by Paleon Training Limited. General guidance, not legal advice.</em></p>
    </div>
  </section>
  ${guideCta(g)}`;
  return noAlternates(
    shell(ctx, { title: `${g.title}`, description: g.description, path, jsonLd, body }),
  );
}

export function renderGuidesHub(chosen: CountryCode | null): string {
  const ctx: PageContext = { country: chosen ?? "NG", hub: true, detected: null, chosen };
  const url = `${ORIGIN}${GUIDES_PATH}`;
  const name = "Corporate AI & Cybersecurity Training Guides";
  const description =
    "Free guides for employers in Nigeria, South Africa, Kenya and Ghana: data protection training, cybersecurity awareness, training levies, AI for staff and sector advice.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION_LD,
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name,
        description,
        inLanguage: "en",
        publisher: { "@id": `${ORIGIN}/#organization` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: GUIDES.map((g, i) => ({ "@type": "ListItem", position: i + 1, url: `${ORIGIN}${guidePath(g.slug)}`, name: g.h1 })),
        },
      },
      breadcrumbLd(url, [
        { name: "Corporate training", path: CORPORATE_HUB_PATH },
        { name: "Guides", path: GUIDES_PATH },
      ]),
    ],
  };
  const groups = GUIDE_CATEGORIES.map((c) => {
    const items = GUIDES.filter((g) => g.category === c.key);
    return `<section class="rs-section" id="${c.key}" aria-labelledby="${c.key}-title">
        <h2 class="section-title" id="${c.key}-title">${escapeHtml(c.name)}</h2>
        <p class="ca-p">${escapeHtml(c.intro)}</p>
        <div class="ca-cards">${items
          .map(
            (g) => `<div class="ca-card"><h3><a href="${guidePath(g.slug)}">${escapeHtml(g.h1)}</a></h3><p>${escapeHtml(g.description)}</p></div>`,
          )
          .join("")}</div>
      </section>`;
  }).join("\n      ");
  const body = `  <section class="hero ca-hero" id="top">
    ${crumbs([{ name: "Corporate training", href: CORPORATE_HUB_PATH }, { name: "Guides" }])}
    <div class="wrap"><div class="hero-inner ca-hero-copy">
      <span class="eyebrow">Free guides for employers</span>
      <h1 class="hero-title ca-hero-title">Corporate AI and cybersecurity training guides</h1>
      <p class="hero-sub">Practical guidance for business owners, directors, HR and IT leaders in Nigeria, South Africa, Kenya and Ghana: what the law expects, how to fund staff training, the threats your people face and how to use AI safely.</p>
    </div></div>
  </section>
  <section class="section section-paper ca-section">
    <div class="wrap">
      ${groups}
    </div>
  </section>
  ${guideCta({ country: null } as Guide)}`;
  return noAlternates(
    shell(ctx, { title: "Corporate AI & Cybersecurity Training Guides | Paleon Training", description, path: GUIDES_PATH, jsonLd, body }),
  );
}

export const GUIDE_SITEMAP_PATHS = [GUIDES_PATH, ...GUIDES.map((g) => guidePath(g.slug))];
