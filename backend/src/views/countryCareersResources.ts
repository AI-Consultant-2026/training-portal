import { COUNTRIES, CountryCode, HOMEPAGE_COURSES, MARKET_ORDER } from "../constants/countries";
import {
  COURSE_INFO,
  PageContext,
  SEARCH_OVERLAY,
  escapeHtml,
  footer,
  head,
  header,
  jobsBoardPath,
  previewHref,
  scripts,
  whatsappAttr,
} from "./countryHome";
import { universitiesPath } from "./countryUniversities";

// /ng, /za, /ke and /gh/careers-office-resources (2026-11-17): one page per country for
// university careers offices, student bodies and associations to share with students, and
// to link to. Everything on it is free and already live: the jobs board, the graduate
// guides (Nigeria), free first lessons, Career Match and a free online careers talk
// (online only, as offered to universities since 2026-10-12). Links point at the country
// homepage, the page Google should show students in that country.

const ORIGIN = "https://paleontraining.com";

export function careersResourcesPath(country: CountryCode): string {
  return `${COUNTRIES[country].site.path}/careers-office-resources`;
}

// Nigeria has its own graduate career guides; the other countries don't yet.
const NG_GUIDES: [string, string][] = [
  ["/how-to-build-a-graduate-cv-nigeria", "How to build a graduate CV"],
  ["/linkedin-profile-tips-nigerian-graduates", "LinkedIn profile tips for graduates"],
  ["/entry-level-jobs-in-nigeria-no-experience", "Entry-level jobs with no experience"],
  ["/digital-skills-for-students-nigeria", "Digital skills for students"],
  ["/how-to-get-a-remote-job-in-nigeria", "How to get a remote job"],
  ["/what-to-do-after-nysc", "What to do after NYSC"],
];

export function renderCountryCareersResources(country: CountryCode): string {
  const c = COUNTRIES[country];
  const home = c.site.path;
  const ctx: PageContext = { country, hub: false, detected: null, chosen: null };
  const page = careersResourcesPath(country);
  const name = escapeHtml(c.name);
  const title = `Free Career Resources for Students in ${c.name} | Paleon`;
  const description = `For university careers offices and student bodies in ${c.name}: a free jobs board, free first lessons, Career Match and a free online careers talk to share with students.`;
  const whatsapp = c.site.whatsapp.link ? c.site.whatsapp : COUNTRIES.NG.site.whatsapp;
  const homeUrl = `${ORIGIN}${home}`;
  const guides =
    country === "NG"
      ? `<li class="start-step"><span class="start-num" aria-hidden="true">2</span><h3>Graduate career guides</h3><p>Free, practical guides students can read today:</p><ul class="cr-list">${NG_GUIDES.map(
          ([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`,
        ).join("")}</ul></li>`
      : `<li class="start-step"><span class="start-num" aria-hidden="true">2</span><h3>Career Match</h3><p>Students answer a few questions and get matched to the digital skill that fits the career they want in ${name}, in about two minutes. <a href="${home}#career-match">Open Career Match</a>.</p></li>`;
  const lessons = HOMEPAGE_COURSES.map(
    (slug) => `<li><a href="${previewHref(country, slug)}">${escapeHtml(COURSE_INFO[slug].title)}</a></li>`,
  ).join("");
  return `${head(ctx, {
    title,
    description,
    canonicalPath: page,
    alternatesFor: (code) => careersResourcesPath(code),
    xDefault: careersResourcesPath("NG"),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      url: `${ORIGIN}${page}`,
      description,
      audience: { "@type": "EducationalAudience", audienceType: "University careers offices and student bodies" },
      provider: { "@type": "EducationalOrganization", name: "Paleon Training", url: ORIGIN },
    },
  }).replace("</head>", '<link rel="stylesheet" href="/corporate-ai.css">\n</head>')}
<body data-country="${country}"${whatsappAttr(country)}>
${SEARCH_OVERLAY}
<a class="skip-link" href="#main">Skip to main content</a>
${header(ctx, home)}
<main id="main">
  <section class="hero">
    <div class="wrap hero-inner">
      <span class="section-eyebrow">For university careers offices and student bodies in ${name}</span>
      <h1 class="hero-title">Free career resources to share with your students</h1>
      <p class="hero-sub">Everything on this page is free for students in ${name}, with no partnership or sign-up needed for your office. Share the links in your newsletters, on your careers pages or with student groups.</p>
      <div class="hero-ctas"><a class="btn btn-signal btn-lg" href="#resources">See the resources</a><a class="hero-link" href="#talk">Book a free careers talk</a></div>
    </div>
  </section>

  <section class="section start-section" id="resources" aria-labelledby="resourcesTitle">
    <div class="wrap">
      <span class="section-eyebrow">Free to share</span>
      <h2 class="section-title" id="resourcesTitle">What your students can use today</h2>
      <ol class="start-steps">
        <li class="start-step"><span class="start-num" aria-hidden="true">1</span><h3>Latest jobs board for ${name}</h3><p>Current vacancies from employers in ${name}, with the skills each one asks for. <a href="${jobsBoardPath(country)}">Open the jobs board</a>.</p></li>
        ${guides}
        <li class="start-step"><span class="start-num" aria-hidden="true">3</span><h3>A free first lesson on every course</h3><p>Students can read and watch the first lesson before paying anything:</p><ul class="cr-list">${lessons}</ul></li>
      </ol>
    </div>
  </section>

  <section class="section section-paper ca-section" id="talk" aria-labelledby="talkTitle">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Free online careers talk</span>
      <h2 class="section-title" id="talkTitle">A free online talk for your students</h2>
      <p class="ca-p">Our Managing Director, Ken Uwotu, gives a free online talk on the digital skills employers in ${name} are hiring for, and how students can show those skills at interview. Talks are online, so any faculty, hall or student group can join.</p>
      <p class="ca-p">To book one, email <a href="mailto:hello@paleontraining.com?subject=Careers%20talk%20request">hello@paleontraining.com</a> or WhatsApp <a href="${escapeHtml(whatsapp.link)}" rel="noopener">${escapeHtml(whatsapp.display)}</a> with your university and a few possible dates.</p>
      <p class="ca-p"><strong>Want to pay for places for your students?</strong> See <a href="${universitiesPath(country)}">course places for universities in ${name}</a>, with group discounts.</p>
    </div>
  </section>

  <section class="section ca-section" id="link" aria-labelledby="linkTitle">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Adding us to your resources page</span>
      <h2 class="section-title" id="linkTitle">How to link to Paleon Training</h2>
      <p class="ca-p">If you list career resources for students, please link to our ${name} homepage, which has the courses, prices in ${escapeHtml(c.currencyName)} and the free lessons:</p>
      <p class="ca-p"><strong>Link:</strong> <a href="${home}">${escapeHtml(homeUrl)}</a><br><strong>Suggested text:</strong> Paleon Training: job-ready digital skills courses for students and graduates in ${name}</p>
      <p class="ca-p"><strong>In another country?</strong> ${MARKET_ORDER.filter((k) => k !== country)
        .map((k) => `<a href="${careersResourcesPath(k)}">${escapeHtml(COUNTRIES[k].name)}</a>`)
        .join(" &middot; ")}</p>
    </div>
  </section>
</main>
${footer(ctx, home, country === "NG")}
${scripts(ctx)}
</body>
</html>
`;
}
