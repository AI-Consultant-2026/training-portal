import { COUNTRIES, CountryCode, HOMEPAGE_COURSES, MARKET_ORDER, formatMoney } from "../constants/countries";
import { PAYMENT_METHODS } from "../constants/corporatePricing";
import { DiscountTier, listPrice, tierLabel } from "../services/universityPricing.service";
import {
  COURSE_INFO,
  PageContext,
  SEARCH_OVERLAY,
  coursePagePath,
  escapeHtml,
  footer,
  head,
  header,
  previewHref,
  scripts,
  whatsappAttr,
} from "./countryHome";

// /ng, /za, /ke and /gh/universities (2026-11-15): universities and colleges buy places on
// the graduate courses for their students, with the group discount Paleon sets in /admin
// (University discounts). The buy form posts to /api/corporate/university-orders; the
// server prices the order again from the same fees and tiers.

const ORIGIN = "https://paleontraining.com";

export function universitiesPath(country: CountryCode): string {
  return `${COUNTRIES[country].site.path}/universities`;
}

function priceTable(country: CountryCode, tiers: DiscountTier[]): string {
  const money = (n: number) => escapeHtml(formatMoney(country, n));
  const headCells = tiers
    .map((t, i) => `<th scope="col">${escapeHtml(tierLabel(tiers, i))}<br><span class="uni-off">${t.percent}% off</span></th>`)
    .join("");
  const rows = HOMEPAGE_COURSES.map((slug) => {
    const fee = listPrice(country, slug);
    const cells = tiers.map((t) => `<td><strong>${money(Math.round(fee * (1 - t.percent / 100)))}</strong></td>`).join("");
    return `<tr><th scope="row"><a href="${coursePagePath(country, slug)}">${escapeHtml(COURSE_INFO[slug].title)}</a></th><td>${money(fee)}</td>${cells}</tr>`;
  }).join("");
  return `<div class="cp-table-wrap">
        <table class="cp-table">
          <caption>Price per student, by the number of places on each course</caption>
          <thead><tr><th scope="col">Course</th><th scope="col">1&ndash;${tiers[0] ? tiers[0].minLearners - 1 : ""} students<br><span class="uni-off">course fee</span></th>${headCells}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
}

function buyForm(country: CountryCode, tiers: DiscountTier[]): string {
  const c = COUNTRIES[country];
  const data = escapeHtml(
    JSON.stringify({
      country,
      symbol: c.site.currency.symbol,
      spaced: c.site.currency.spaced,
      prices: Object.fromEntries(HOMEPAGE_COURSES.map((slug) => [slug, listPrice(country, slug)])),
      tiers: tiers.map((t) => [t.minLearners, t.percent]),
    }),
  );
  const rows = HOMEPAGE_COURSES.map(
    (slug) => `<div class="uni-row">
            <label class="form-label" for="uni-${slug}">${escapeHtml(COURSE_INFO[slug].title)} <span class="optional">(${escapeHtml(formatMoney(country, listPrice(country, slug)))} each before discount)</span></label>
            <input class="form-input uni-seats" id="uni-${slug}" name="seats-${slug}" data-course="${slug}" type="number" inputmode="numeric" min="0" max="20000" step="1" value="0">
          </div>`,
  ).join("");
  return `<form class="ca-form cp-buy" id="uniBuy" novalidate data-prices="${data}">
        <h3 class="cp-buy-title" id="buy">Buy places for your students</h3>
        <p class="cp-buy-lede">Enter the number of students for each course. Each course gets its own group discount. Pay securely on Flutterwave by ${escapeHtml(PAYMENT_METHODS[country])}, or tick &ldquo;Send us an invoice&rdquo;. The student sign-up link is emailed to you as soon as payment is confirmed.</p>
        <fieldset class="uni-courses"><legend class="form-label">Places on each course</legend>${rows}</fieldset>
        <div class="ca-grid">
          <div class="form-row"><label class="form-label" for="uni-org">University, polytechnic or college</label><input class="form-input" id="uni-org" name="organisation" autocomplete="organization" required maxlength="200"></div>
          <div class="form-row"><label class="form-label" for="uni-name">Your name (the university representative)</label><input class="form-input" id="uni-name" name="contactName" autocomplete="name" required maxlength="150"></div>
          <div class="form-row"><label class="form-label" for="uni-email">Your email</label><input class="form-input" id="uni-email" name="contactEmail" type="email" autocomplete="email" required maxlength="200"></div>
          <div class="form-row"><label class="form-label" for="uni-phone">Phone / WhatsApp <span class="optional">(optional)</span></label><input class="form-input" id="uni-phone" name="phone" type="tel" autocomplete="tel" maxlength="30"></div>
        </div>
        <input type="hidden" name="country" value="${country}">
        <div class="cp-total" id="uniTotal" aria-live="polite"></div>
        <label class="consent-check"><input type="checkbox" name="payByInvoice" id="uni-invoice"> <span>Send us an invoice <span class="optional">(pay by bank transfer)</span></span></label>
        <div class="ca-hp" aria-hidden="true"><label for="uni-website">Website</label><input id="uni-website" name="website" tabindex="-1" autocomplete="off"></div>
        <label class="consent-check"><input type="checkbox" name="consent" required> <span>I agree to the <a href="/terms">Terms</a> and that Paleon Training may use these details to process this order, as described in the <a href="/privacy">Privacy Policy</a>.</span></label>
        <p class="form-error" id="uniError" role="alert" hidden></p>
        <button type="submit" class="btn btn-signal btn-lg btn-block" id="uniSubmit">Continue to secure payment</button>
        <p class="form-note">You will use this email to create your representative login. Each student who signs up for a course uses one place on it.</p>
      </form>
      <div class="ca-thanks" id="uniThanks" hidden tabindex="-1">
        <h3>Thank you. Your invoice request has reached our team.</h3>
        <p>We will email the invoice, with bank transfer details, within one working day. As soon as it is paid we set up your students&rsquo; places and email you the link your students use to sign up.</p>
      </div>`;
}

function faq(country: CountryCode, tiers: DiscountTier[]): string {
  const top = tiers.length ? tiers[tiers.length - 1] : null;
  const items: [string, string][] = [
    [
      "Who gets the manager login?",
      "The person who places the order. When you create your login with the student sign-up link we email you, using the same email address, you become your university&rsquo;s representative. You see how many places are left, which students have signed up and how far each one has got, and you can invite students by email. To add more representatives (for example a head of department or careers officer), email corporate@paleontraining.com.",
    ],
    [
      "How do students join?",
      "You share one sign-up link, for example in a department notice or class WhatsApp group. Each student creates a login, picks a course your university has places on, and starts straight away. Each student uses one place on the course they pick.",
    ],
    [
      "How does the group discount work?",
      `It is worked out on each course separately, by the number of places you buy on it: ${tiers
        .map((t, i) => `${t.percent}% for ${escapeHtml(tierLabel(tiers, i))}`)
        .join(", ")}.${top ? ` For partnerships larger than ${top.minLearners} students a course, email us and we can agree a rate with your university.` : ""}`,
    ],
    [
      "How long do the places last?",
      "Students can sign up with your link for 12 months from payment. Once a student has started a course, they keep it, with lifetime access, the full curriculum, quizzes, the course's capstone project or final assessment, and a certificate when they finish.",
    ],
    [
      "Can we buy more places later?",
      "Yes. Your representative can buy more places from their university page at any time, and your students keep using the same link.",
    ],
    [
      "Can we try a course first?",
      `Yes. The first lesson of every course is free to read and watch: for example <a href="${previewHref(country, "cyber-security-fundamentals")}">Cyber Security Fundamentals</a>.`,
    ],
  ];
  return items.map(([q, a]) => `<details class="ca-faq"><summary>${escapeHtml(q)}</summary><p>${a}</p></details>`).join("");
}

export function renderCountryUniversities(country: CountryCode, tiers: DiscountTier[]): string {
  const c = COUNTRIES[country];
  const home = c.site.path;
  const ctx: PageContext = { country, hub: false, detected: null, chosen: null };
  const page = universitiesPath(country);
  const top = tiers.length ? Math.max(...tiers.map((t) => t.percent)) : 0;
  const title = `Course Places for University Students in ${c.name} | Paleon Training`;
  const description = `Universities and colleges in ${c.name}: buy places on Paleon Training's digital skills courses for your students${top ? `, with group discounts up to ${top}%` : ""}. One sign-up link, progress tracking for your representative.`;
  const html = `${head(ctx, {
    title,
    description,
    canonicalPath: page,
    alternatesFor: (code) => universitiesPath(code),
    xDefault: universitiesPath("NG"),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      url: `${ORIGIN}${page}`,
      description,
      provider: { "@type": "EducationalOrganization", name: "Paleon Training", url: ORIGIN },
    },
  }).replace("</head>", '<link rel="stylesheet" href="/corporate-ai.css">\n<link rel="stylesheet" href="/universities.css">\n</head>')}
<body data-country="${country}"${whatsappAttr(country)}>
${SEARCH_OVERLAY}
<a class="skip-link" href="#main">Skip to main content</a>
${header(ctx, home)}
<main id="main">
  <section class="hero">
    <div class="wrap hero-inner">
      <span class="section-eyebrow">For universities, polytechnics and colleges in ${escapeHtml(c.name)}</span>
      <h1 class="hero-title">Job-ready digital skills for your students, <em>paid for by your university</em></h1>
      <p class="hero-sub">Buy places on our five online courses for your students${top ? `, with <strong>group discounts of up to ${top}%</strong> on each course` : ""}. Students join with one link and learn at their own pace. Your representative gets a manager login to track every student&rsquo;s progress.</p>
      <div class="hero-ctas"><a class="btn btn-signal btn-lg" href="#buy">Buy student places</a><a class="hero-link" href="#prices">See group prices</a></div>
    </div>
  </section>

  <section class="section start-section" id="how" aria-labelledby="howTitle">
    <div class="wrap">
      <span class="section-eyebrow">How it works</span>
      <h2 class="section-title" id="howTitle">Four steps from order to learning</h2>
      <ol class="start-steps">
        <li class="start-step"><span class="start-num" aria-hidden="true">1</span><h3>Choose courses and places</h3><p>Pick how many students go on each course. The group discount is worked out per course.</p></li>
        <li class="start-step"><span class="start-num" aria-hidden="true">2</span><h3>Pay or ask for an invoice</h3><p>Pay online in ${escapeHtml(c.currencyName)}, or request an invoice and pay by bank transfer.</p></li>
        <li class="start-step"><span class="start-num" aria-hidden="true">3</span><h3>Get your representative login</h3><p>We email you the student sign-up link. Create your login with it first: that gives you the manager view.</p></li>
        <li class="start-step"><span class="start-num" aria-hidden="true">4</span><h3>Students join and learn</h3><p>Share the link. Each student picks their course and starts straight away. You see who has started and how far they have got.</p></li>
      </ol>
    </div>
  </section>

  <section class="section section-paper ca-section" id="prices" aria-labelledby="pricesTitle">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Group prices &middot; ${escapeHtml(c.name)}</span>
      <h2 class="section-title" id="pricesTitle">The more students on a course, the less each place costs</h2>
      ${priceTable(country, tiers)}
      <p class="ca-p ca-hint">Each course is priced on its own number of places. Prices are per student, in ${escapeHtml(c.currencyName)}, for the full self-paced course with lifetime access and a certificate on completion.</p>
      ${buyForm(country, tiers)}
      <p class="ca-p cp-after"><strong>In another country?</strong> ${MARKET_ORDER.filter((k) => k !== country)
        .map((k) => `<a href="${universitiesPath(k)}">${escapeHtml(COUNTRIES[k].name)}</a>`)
        .join(" &middot; ")}</p>
    </div>
  </section>

  <section class="section ca-section" id="faq" aria-labelledby="faqTitle">
    <div class="wrap ca-narrow">
      <span class="section-eyebrow">Questions</span>
      <h2 class="section-title" id="faqTitle">Questions universities ask</h2>
      ${faq(country, tiers)}
      <p class="ca-p">Something else? Email <a href="mailto:corporate@paleontraining.com">corporate@paleontraining.com</a> or WhatsApp <a href="${escapeHtml(c.site.whatsapp.link || COUNTRIES.NG.site.whatsapp.link)}" rel="noopener">${escapeHtml(c.site.whatsapp.display || COUNTRIES.NG.site.whatsapp.display)}</a>.</p>
    </div>
  </section>
</main>
${footer(ctx, home, country === "NG")}
${scripts(ctx)}
<script src="/human-check.js" defer></script><script src="/university-buy.js" defer></script>
</body>
</html>
`;
  return html;
}
