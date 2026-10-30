import {
  COUNTRIES,
  CountryCode,
  HOMEPAGE_COURSES,
  HomepageCourse,
  MARKET_ORDER,
  TBC_PREFIX,
  coursePriceLabel,
  depositLabel,
  isLive,
} from "../constants/countries";
import { LEAD_INTERESTS, REGISTRATION_STATUSES, leadSourcesFor } from "../validators/leads.validators";
import { flagSvg } from "./flags";

// Country homepages (2026-10-30): /ng, /za, /ke, /gh, and the hub at / (the same page with
// the country picker, showing the visitor's remembered country or Nigeria). Everything
// country-specific comes from COUNTRIES[code].site in constants/countries.ts; this file
// only holds the layout and the copy that's the same in every country. Styles are in
// marketing/country-home.css and behaviour (country menu, banner, cookie, waitlist,
// Career Match) in marketing/country-home.js, because the site CSP blocks inline scripts.

const ORIGIN = "https://paleontraining.com";
export const COUNTRY_COOKIE = "paleon_country";

interface CourseInfo {
  tag: string;
  title: string;
  page: string;
  desc: string;
  days: number;
  lessons: number;
  law: "cyber" | "hse" | null;
  why: string;
  icon: string;
}

const COURSE_INFO: Record<HomepageCourse, CourseInfo> = {
  "cyber-security-fundamentals": {
    tag: "Security",
    title: "Cyber Security Fundamentals",
    page: "/cyber-security-fundamentals-course",
    desc: "Identify threats, assess risk, protect systems and respond to incidents, with dedicated industry pathways.",
    days: 18,
    lessons: 36,
    law: "cyber",
    why: "Cybersecurity sits behind every bank, telecoms network and energy company. You\u2019ll learn to identify threats, assess risk and protect systems, with pathways for the industry you\u2019re aiming for.",
    icon: '<path d="M23 5 L39 11 V22 C39 32 32 38 23 41 C14 38 7 32 7 22 V11 Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="23" cy="21" r="4.5" stroke="currentColor" stroke-width="1.8"/><path d="M23 25.5 V31" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  },
  "gis-and-drone-mapping": {
    tag: "Geospatial",
    title: "GIS and Drone Mapping",
    page: "/gis-and-drone-mapping-course",
    desc: "Capture, analyse and visualise location data with GIS, drone mapping, photogrammetry and satellite imagery.",
    days: 9,
    lessons: 18,
    law: null,
    why: "Maps, drones and satellite data are used to plan pipelines, mines, masts, farms and infrastructure. You\u2019ll learn GIS, drone mapping and photogrammetry, and how each is applied in industry.",
    icon: '<rect x="17" y="19" width="12" height="8" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M17 21 L7 13 M29 21 L39 13 M17 25 L7 33 M29 25 L39 33" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="7" cy="13" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="39" cy="13" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="33" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="39" cy="33" r="4" stroke="currentColor" stroke-width="1.6"/>',
  },
  "digital-marketing": {
    tag: "Growth",
    title: "Digital Marketing",
    page: "/digital-marketing-course",
    desc: "SEO, paid search, content, email and analytics to attract audiences, generate leads and measure results.",
    days: 8,
    lessons: 16,
    law: null,
    why: "Banks, telecoms companies and every business that sells online need people who can attract and convert customers. You\u2019ll learn SEO, paid search, content, email marketing and analytics, and how to measure what works.",
    icon: '<circle cx="19" cy="27" r="14" stroke="currentColor" stroke-width="1.8"/><circle cx="19" cy="27" r="8" stroke="currentColor" stroke-width="1.8"/><circle cx="19" cy="27" r="2.4" fill="currentColor"/><path d="M27 19 L39 7 M39 7 H31 M39 7 V15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  "hse-fundamentals": {
    tag: "Safety",
    title: "HSE Fundamentals",
    page: "/hse-fundamentals-course",
    desc: "Identify hazards, assess risk, control workplace exposure and respond effectively when things go wrong.",
    days: 8,
    lessons: 16,
    law: "hse",
    why: "Health, Safety and Environment is central to energy, mining, construction and industrial work. You\u2019ll learn to identify hazards, assess risk, control workplace exposure and respond effectively when things go wrong.",
    icon: '<path d="M7 27 A16 16 0 0 1 39 27" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><rect x="4" y="27" width="38" height="6" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M23 27 V12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="14" cy="21" r="1.6" fill="currentColor"/><circle cx="32" cy="21" r="1.6" fill="currentColor"/>',
  },
};

// The Career Match "kind of work" options (LEAD_INTERESTS) and the course each points to.
const INTEREST_COURSE: Record<string, HomepageCourse> = {
  "Protecting systems and data": "cyber-security-fundamentals",
  "Maps, drones and location data": "gis-and-drone-mapping",
  "Marketing, content and online growth": "digital-marketing",
  "Health, safety and site operations": "hse-fundamentals",
};

const TOTAL_LESSONS = HOMEPAGE_COURSES.reduce((sum, slug) => sum + COURSE_INFO[slug].lessons, 0);

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
}

// Escapes, and highlights any "[TBC: ...]" placeholder so it can't be missed on the page.
function text(value: string): string {
  const escaped = escapeHtml(value);
  if (!value.includes(TBC_PREFIX)) return escaped;
  return escaped.replace(/\[TBC: [^\]]*\]/g, (m) => `<mark class="tbc">${m}</mark>`);
}

function plain(value: string): string {
  return escapeHtml(value.replace(/\[TBC: [^\]]*\]/g, "").trim());
}

export function ambassadorsPath(country: CountryCode): string {
  return country === "NG" ? "/ambassadors" : `${COUNTRIES[country].site.path}/ambassadors`;
}

function referHowPath(country: CountryCode): string {
  return country === "NG" ? "/refer" : `${ambassadorsPath(country)}#how`;
}

// hreflang alternates: the four country versions, plus x-default at the hub.
function alternates(pathFor: (code: CountryCode) => string): string {
  return [
    ...MARKET_ORDER.map(
      (code) => `<link rel="alternate" hreflang="${COUNTRIES[code].site.locale}" href="${ORIGIN}${pathFor(code)}">`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${ORIGIN}/">`,
  ].join("\n");
}

const LOGO_MARK = (stroke: string) =>
  `<svg class="logo-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true"><rect x="1" y="1" width="38" height="38" rx="4" stroke="${stroke}" stroke-width="1.4"/><path d="M8 27 L15 14 L20 21 L25 11 L32 27" stroke="#E8863C" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" fill="none"/><circle cx="15" cy="14" r="1.8" fill="${stroke}"/><circle cx="25" cy="11" r="1.8" fill="${stroke}"/></svg>`;

const CHECK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 10l4 4 8-9" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const SEARCH_OVERLAY = `<button class="pt-search-trigger" id="pt-search-trigger" aria-label="Search the site" title="Search (press /)">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
</button>
<div class="pt-search-overlay" id="pt-search-overlay" hidden>
  <div class="pt-search-panel" role="dialog" aria-modal="true" aria-label="Search Paleon Training">
    <div class="pt-search-input-row">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input class="pt-search-input" id="pt-search-input" type="text" placeholder="Search guides, courses, careers..." autocomplete="off" aria-label="Search">
      <button class="pt-search-close" id="pt-search-close">Close</button>
    </div>
    <div class="pt-search-results" id="pt-search-results"></div>
    <div class="pt-search-hint"><span><kbd>&uarr;</kbd><kbd>&darr;</kbd> navigate</span><span><kbd>&crarr;</kbd> open</span><span><kbd>Esc</kbd> close</span></div>
  </div>
</div>`;

export interface PageContext {
  /** Whose courses, prices and copy the page shows. */
  country: CountryCode;
  /** The hub at /: same page, its own URL. */
  hub: boolean;
  /** Visitor's country from the CDN header, if it's one we serve. */
  detected: CountryCode | null;
  /** Country the visitor picked before (cookie), if any. */
  chosen: CountryCode | null;
}

// "Looks like you're in Kenya..." -- shown when the CDN places the visitor in another
// country we serve and they haven't picked a country yet. Never redirects.
function geoBanner(ctx: PageContext): string {
  const { detected, country } = ctx;
  if (!detected || detected === country || ctx.chosen) return "";
  const geo = COUNTRIES[detected];
  const here = COUNTRIES[country];
  return `<div class="geo-banner" id="geoBanner" role="region" aria-label="Country suggestion">
  <div class="wrap geo-row">
    ${flagSvg(detected, "flag flag-sm")}
    <p class="geo-text">Looks like you&rsquo;re in <strong>${escapeHtml(geo.name)}</strong>. See courses and prices in ${escapeHtml(geo.site.currency.code)}?</p>
    <div class="geo-actions">
      <a class="btn btn-ink" href="${geo.site.path}" data-pick-country="${detected}">Switch to ${escapeHtml(geo.name)}</a>
      <button type="button" class="btn btn-outline-ink" data-stay-country="${country}">Stay on ${escapeHtml(here.name)}</button>
    </div>
  </div>
</div>`;
}

function countryMenu(ctx: PageContext): string {
  const c = COUNTRIES[ctx.country];
  const items = MARKET_ORDER.map((code) => {
    const k = COUNTRIES[code];
    const current = code === ctx.country && !ctx.hub;
    return `<li><a class="country-menu-item" href="${k.site.path}" data-pick-country="${code}"${current ? ' aria-current="page"' : ""}>${flagSvg(code, "flag flag-md")}<span class="cm-name">${escapeHtml(k.name)}</span><span class="cm-cur">${escapeHtml(k.site.currency.symbol)} ${escapeHtml(k.site.currency.code)}</span>${code === ctx.country ? '<svg class="cm-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>' : ""}</a></li>`;
  }).join("\n");
  return `<div class="country-switch">
  <button type="button" class="country-btn" id="countryBtn" aria-expanded="false" aria-controls="countryMenu" aria-label="Change country, currently ${escapeHtml(c.name)}">
    ${flagSvg(ctx.country, "flag flag-sm")}<span>${ctx.country} &middot; ${escapeHtml(c.site.currency.symbol)}</span>
    <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
  </button>
  <div class="country-menu" id="countryMenu" hidden>
    <p class="country-menu-title">Choose your country</p>
    <ul>${items}</ul>
  </div>
</div>`;
}

function header(ctx: PageContext, home: string): string {
  const c = COUNTRIES[ctx.country];
  return `<header class="site-header">
  <div class="wrap header-row">
    <a class="logo" href="${home}">
      ${LOGO_MARK("#211D17")}
      <span>
        <span class="logo-word">Paleon Training</span>
        <span class="logo-sub">Digital skills &middot; ${ctx.hub ? "Africa" : escapeHtml(c.name)}</span>
      </span>
    </a>
    <nav class="main-nav" aria-label="Main">
      <ul class="nav-links" id="navLinks">
        <li><a href="${home}#courses">Courses</a></li>
        <li><a href="${home}#career-match">Career Match</a></li>
        <li><a href="${home}#how">How it works</a></li>
        <li><a href="${home}#why">Why Paleon</a></li>
        <li><a href="${home}#employers">For employers</a></li>
        <li><a href="${home}#refer-earn">Refer &amp; Earn</a></li>
        <li class="nav-phone-only"><a href="/support">Support</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
    <div class="header-actions">
      ${countryMenu(ctx)}
      <a class="btn btn-signal header-cta" href="${home}#courses">Get started</a>
      <button type="button" class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke-linecap="round"/></svg>
      </button>
    </div>
  </div>
</header>`;
}

function countryCards(ctx: PageContext): string {
  const cards = MARKET_ORDER.map((code) => {
    const k = COUNTRIES[code];
    const selected = code === ctx.country && (!ctx.hub || ctx.chosen === code);
    return `<li><a class="ctry-card${selected ? " is-selected" : ""}" href="${k.site.path}" data-pick-country="${code}"${selected && !ctx.hub ? ' aria-current="page"' : ""}>
      ${flagSvg(code, "flag flag-lg")}
      <span class="ctry-body"><span class="ctry-name">${escapeHtml(k.name)}</span><span class="ctry-meta">Prices in ${escapeHtml(k.site.currency.symbol)} ${escapeHtml(k.site.currency.code)} &middot; ${k.site.path}</span></span>
      <span class="ctry-status${isLive(code) ? " is-live" : ""}">${isLive(code) ? "Live" : "Coming soon"}</span>
    </a></li>`;
  }).join("\n");
  return `<div class="ctry-picker">
    <h2 class="ctry-title" id="chooseCountry">Choose your country</h2>
    <ul class="ctry-grid" aria-labelledby="chooseCountry">${cards}</ul>
  </div>`;
}

function waitlistBox(country: CountryCode, id = "waitlist"): string {
  const c = COUNTRIES[country];
  return `<div class="waitlist" id="${id}">
    <div class="waitlist-copy">
      <h2 class="waitlist-title">Courses in ${escapeHtml(c.name)} are launching soon</h2>
      <p>Join the waitlist for launch pricing in ${escapeHtml(c.site.currency.code)} and a free first lesson. We&rsquo;ll message you on WhatsApp.</p>
    </div>
    <form class="waitlist-form" data-waitlist-form data-country="${country}" novalidate>
      <div class="waitlist-field">
        <label for="${id}Phone">WhatsApp number</label>
        <input type="tel" id="${id}Phone" name="whatsapp" required autocomplete="tel" inputmode="tel" placeholder="${escapeHtml(c.site.whatsappPlaceholder)}">
      </div>
      <label class="consent-check" for="${id}Consent">
        <input type="checkbox" id="${id}Consent" name="consent" required>
        <span>I agree to Paleon Training messaging me on WhatsApp about courses in ${escapeHtml(c.name)}. I can opt out at any time. See our <a href="/privacy">privacy policy</a>.</span>
      </label>
      <button type="submit" class="btn btn-signal">Join the waitlist</button>
      <p class="waitlist-msg" role="status" aria-live="polite"></p>
    </form>
  </div>`;
}

function hero(ctx: PageContext, home: string): string {
  const c = COUNTRIES[ctx.country];
  return `<section class="hero" id="top">
    <div class="wrap hero-inner">
      <span class="eyebrow">Four courses &middot; ${TOTAL_LESSONS} lessons &middot; paleontraining.com${ctx.hub ? "" : c.site.path}</span>
      <h1 class="hero-title">Digital skills built for careers in <em>${text(c.site.headlineIndustries)}</em></h1>
      <p class="hero-sub">Practical, illustrated courses with a video for every lesson and a real capstone project to show employers. <strong>Led from London, delivered in ${escapeHtml(c.name)}.</strong></p>
      <div class="hero-ctas">
        <a class="btn btn-signal btn-lg" href="${home}#courses">Browse the 4 courses</a>
        <a class="btn btn-outline-light btn-lg" href="${home}#courses">Try a free lesson</a>
        <a class="hero-link" href="${home}#career-match">Not sure? Get matched in 2 minutes</a>
      </div>
      ${countryCards(ctx)}
      ${isLive(ctx.country) ? "" : waitlistBox(ctx.country)}
    </div>
  </section>`;
}

function depositStrip(ctx: PageContext): string {
  const c = COUNTRIES[ctx.country];
  return `<div class="deposit-strip">
    <div class="wrap deposit-row">
      <p><strong>Start any course for ${text(depositLabel(ctx.country))}</strong> and pay the balance later. Try a free lesson first.</p>
      <p class="deposit-pay">Pay with ${text(c.site.paymentMethods)}</p>
    </div>
  </div>`;
}

function courseCards(ctx: PageContext, home: string): string {
  const { country } = ctx;
  const c = COUNTRIES[country];
  const live = isLive(country);
  const deposit = depositLabel(country);
  const cards = HOMEPAGE_COURSES.map((slug) => {
    const info = COURSE_INFO[slug];
    const law = info.law ? c.site.laws[info.law] : null;
    // Course pages and checkout are Naira-priced, so only a live country links to them.
    const title = live ? `<a href="${info.page}">${info.title}</a>` : info.title;
    const start = live
      ? `<a class="btn btn-ink btn-block" href="/register?course=${slug}${country === "NG" ? "" : `&amp;country=${country}`}">Start for ${text(deposit)}</a>`
      : `<a class="btn btn-ink btn-block" href="${home}#waitlist">Join the waitlist</a>`;
    return `<article class="course-card">
      <svg class="course-icon" viewBox="0 0 46 46" fill="none" aria-hidden="true">${info.icon}</svg>
      <span class="course-tag">${info.tag}</span>
      <h3 class="course-title">${title}</h3>
      <p class="course-desc">${info.desc}</p>
      <dl class="course-facts">
        <div><dt>Pathways</dt><dd>${text(c.site.pathways[slug])}</dd></div>
        ${law ? `<div><dt>Local rules covered</dt><dd>${text(law)}</dd></div>` : ""}
      </dl>
      <ul class="course-meta" aria-label="Course length">
        <li>${info.days} days</li><li>${info.lessons} lessons</li><li>Beginner</li>
      </ul>
      <div class="course-price">
        <span class="price-label">Course fee</span>
        <span class="price-value">${text(coursePriceLabel(country, slug))}</span>
        <span class="price-deposit">or start with ${text(deposit)}</span>
      </div>
      <div class="course-actions">
        <a class="btn btn-outline-dark btn-block" href="/preview/${slug}">Free lesson</a>
        ${start}
      </div>
    </article>`;
  }).join("\n");
  return `<section class="section section-paper" id="courses" aria-labelledby="coursesTitle">
    <div class="wrap">
      <div class="section-head">
        <div>
          <span class="section-eyebrow">The courses &middot; ${escapeHtml(c.name)}</span>
          <h2 class="section-title" id="coursesTitle">Four fields. Real depth in each.</h2>
        </div>
        <p class="section-desc">Every course has a full curriculum, an illustrated lesson and matching video for each topic, and a capstone project that mirrors the work you&rsquo;d be hired to do.</p>
      </div>
      ${
        live
          ? `<p class="deposit-note">Can&rsquo;t pay it all at once? A ${text(deposit)} deposit unlocks Days 1&ndash;2 straight away, and you pay the balance whenever you&rsquo;re ready to carry on. Same total price, no extra fees. Payments are taken securely by Paystack, with a <a href="/terms#refunds">7-day refund</a> if you haven&rsquo;t started Day 2.</p>`
          : `<p class="deposit-note">Courses in ${escapeHtml(c.name)} open soon. Every first lesson is free to try now, and <a href="${home}#waitlist">the waitlist</a> gets launch pricing first.</p>`
      }
      <div class="course-grid">${cards}</div>
    </div>
  </section>`;
}

function careerMatch(ctx: PageContext, home: string): string {
  const c = COUNTRIES[ctx.country];
  const option = (v: string) => `<option>${escapeHtml(v)}</option>`;
  return `<section class="section register-section" id="career-match" aria-labelledby="matchHeading">
    <span id="register" class="anchor-alias" aria-hidden="true"></span>
    <div class="wrap register-grid">
      <div class="register-copy">
        <span class="section-eyebrow">Free Career Match</span>
        <h2 class="section-title" id="matchHeading">Not sure which skill will get you hired? Find your match in 2 minutes.</h2>
        <p class="register-lede">Tell us where you are and the industry you&rsquo;re aiming for in ${escapeHtml(c.name)}. We&rsquo;ll match you to the course that fits, with a free lesson you can start today.</p>
        <ul class="register-list">
          <li>${CHECK}<span><strong>Your recommended course</strong>, and why it fits your goal</span></li>
          <li>${CHECK}<span><strong>A free lesson</strong> you can open straight away, no account needed</span></li>
          <li>${CHECK}<span><strong>Free, no obligation</strong>: no payment details, ever</span></li>
        </ul>
      </div>
      <form class="register-form" id="registerForm" novalidate>
        <div class="form-row">
          <label class="form-label" for="regName">Full name</label>
          <input class="form-input" type="text" id="regName" name="name" required autocomplete="name">
        </div>
        <div class="form-row">
          <label class="form-label" for="regEmail">Email address</label>
          <input class="form-input" type="email" id="regEmail" name="email" required autocomplete="email">
        </div>
        <div class="form-row">
          <label class="form-label" for="regPhone">WhatsApp / phone number <span class="optional">(optional)</span></label>
          <input class="form-input" type="tel" id="regPhone" name="phone" autocomplete="tel" inputmode="tel" placeholder="${escapeHtml(c.site.whatsappPlaceholder)}">
        </div>
        <div class="form-row">
          <label class="form-label" for="regSector">Which industry are you aiming for?</label>
          <select class="form-select" id="regSector" name="sector" required>
            <option value="" disabled selected>Choose one&hellip;</option>
            ${c.site.industryOptions.map((o) => option(o.label)).join("")}
            <option>Not sure yet</option>
          </select>
        </div>
        <div class="form-row">
          <label class="form-label" for="regInterest">What kind of work interests you most?</label>
          <select class="form-select" id="regInterest" name="interest" required>
            <option value="" disabled selected>Choose one&hellip;</option>
            ${LEAD_INTERESTS.map(option).join("")}
          </select>
        </div>
        <div class="form-row">
          <label class="form-label" for="regUniversity">Where are you now?</label>
          <select class="form-select" id="regUniversity" name="university" required>
            ${REGISTRATION_STATUSES.map((s, i) => `<option${i === 0 ? " selected" : ""}>${escapeHtml(s)}</option>`).join("")}
          </select>
        </div>
        <div class="form-row">
          <label class="form-label" for="regSource">How did you hear about us?</label>
          <select class="form-select" id="regSource" name="source" required>
            <option value="" disabled selected>Choose one&hellip;</option>
            ${leadSourcesFor(c.site.nationalServiceOption).map(option).join("")}
          </select>
        </div>
        ${
          ctx.country === "NG"
            ? ""
            : `<label class="consent-check" for="regConsent">
          <input type="checkbox" id="regConsent" name="consent" required>
          <span>I agree to Paleon Training emailing me my Career Match, course information and occasional updates, and contacting me on WhatsApp if I give my number. I can unsubscribe at any time.</span>
        </label>`
        }
        <button class="btn btn-ink btn-block btn-lg" type="submit" id="registerSubmit">Get my free Career Match</button>
        <p class="form-note">Free and instant. We&rsquo;ll email you your match and a few tips about the course, and our team may follow up by email or WhatsApp. You can unsubscribe at any time. See our <a href="/privacy">privacy policy</a>.</p>
        <p class="form-error" id="formError" role="alert" hidden>Something went wrong sending that. Please try again, or email <a href="mailto:hello@paleontraining.com">hello@paleontraining.com</a>.</p>
      </form>
      <div class="match-result" id="matchResult" hidden aria-live="polite">
        <span class="section-eyebrow">Your Career Match</span>
        <h3 class="match-title" id="matchTitle"></h3>
        <p class="match-why" id="matchWhy"></p>
        <p class="match-meta" id="matchMeta"></p>
        <div class="match-actions">
          <a class="btn btn-signal" id="matchPreview" href="#">Try a free lesson</a>
          <a class="btn btn-outline-dark" id="matchCourse" href="#">${isLive(ctx.country) ? "See the course" : "Join the waitlist"}</a>
        </div>
        <p class="match-note">${
          isLive(ctx.country)
            ? `Ready to start? <a id="matchEnrol" href="/register">Create your account and enrol</a>. Self-paced, with lifetime access.`
            : `Courses in ${escapeHtml(c.name)} open soon: <a href="${home}#waitlist">join the waitlist</a> for launch pricing.`
        }</p>
      </div>
    </div>
  </section>`;
}

function steps(ctx: PageContext, home: string): string {
  const c = COUNTRIES[ctx.country];
  const live = isLive(ctx.country);
  return `<section class="section start-section" id="how" aria-labelledby="howTitle">
    <div class="wrap">
      <span class="section-eyebrow">How it works</span>
      <h2 class="section-title" id="howTitle">Three steps to start learning</h2>
      <ol class="start-steps">
        <li class="start-step"><span class="start-num" aria-hidden="true">1</span><h3>Choose a course</h3><p>Four practical courses. <a href="${home}#courses">Compare them</a>, or <a href="${home}#career-match">get your free Career Match</a>.</p></li>
        <li class="start-step"><span class="start-num" aria-hidden="true">2</span><h3>Try a free lesson</h3><p>Read and watch the first lesson before you pay. No account needed.</p></li>
        <li class="start-step"><span class="start-num" aria-hidden="true">3</span><h3>Enrol for ${text(depositLabel(ctx.country))}</h3><p>Pay with ${text(c.site.paymentMethods)}. Self-paced, lifetime access.${live ? ` <a href="/register">Create your free account</a>.` : ` Opening soon in ${escapeHtml(c.name)}: <a href="${home}#waitlist">join the waitlist</a>.`}</p></li>
      </ol>
    </div>
  </section>`;
}

function why(ctx: PageContext): string {
  const c = COUNTRIES[ctx.country];
  const items: [string, string][] = [
    ["Every lesson illustrated", "A hand-drawn diagram built for each concept, not stock slides."],
    ["A video for every lesson", "Read it, watch it, or both. No exceptions."],
    [`Grounded in ${c.name}`, "Local regulations, employers and case studies, not borderless material."],
    ["Ends in a real capstone", "A project built to show an employer, not just a badge."],
  ];
  return `<section class="section section-paper why-section" id="why" aria-labelledby="whyTitle">
    <div class="wrap">
      <span class="section-eyebrow">Why Paleon</span>
      <h2 class="section-title" id="whyTitle">Not a video library. Not a certificate mill.</h2>
      <ul class="why-grid">${items
        .map(([t, d], i) => `<li class="why-item"><span class="why-num">0${i + 1}</span><h3 class="why-title">${escapeHtml(t)}</h3><p class="why-desc">${escapeHtml(d)}</p></li>`)
        .join("")}</ul>
    </div>
  </section>`;
}

function employers(ctx: PageContext): string {
  const c = COUNTRIES[ctx.country];
  const s = c.site;
  const whatsapp = s.whatsapp.link
    ? `<a href="${s.whatsapp.link}" target="_blank" rel="noopener">${text(s.whatsapp.display)}</a>`
    : text(s.whatsapp.display);
  return `<section class="section section-dark" id="employers" aria-labelledby="statTitle">
    <div class="wrap stat-grid">
      <div class="stat-copy">
        <span class="section-eyebrow" id="statTitle">The graduate reality in ${escapeHtml(c.name)}</span>
        <p class="stat-figure">${text(s.graduateStat.figure)}</p>
        <p class="stat-text">${text(s.graduateStat.text)}</p>
        <p class="stat-source">${text(s.graduateStat.source)}</p>
      </div>
      <ul class="stat-cards">
        <li class="stat-card"><span class="stat-card-label">Pay in ${escapeHtml(s.currency.code)}</span><strong>${text(s.paymentMethods)}</strong></li>
        <li class="stat-card"><span class="stat-card-label">WhatsApp support in ${escapeHtml(c.name)}</span><strong>${whatsapp}</strong></li>
        <li class="stat-card"><span class="stat-card-label">Training a team?</span><strong><a href="${s.corporateTraining.href}">${escapeHtml(s.corporateTraining.label)}</a></strong></li>
      </ul>
    </div>
  </section>`;
}

function referBand(ctx: PageContext): string {
  const c = COUNTRIES[ctx.country];
  return `<section class="refer-band-section" id="refer-earn" aria-labelledby="referTitle">
    <div class="wrap">
      <div class="refer-band">
        <div class="refer-band-copy">
          <span class="section-eyebrow">Refer &amp; Earn</span>
          <p class="refer-band-title" id="referTitle">Know someone who should learn this? Earn ${text(c.site.referralReward)} when they enrol.</p>
        </div>
        <div class="refer-band-actions">
          <a class="btn btn-outline-dark" href="${referHowPath(ctx.country)}">How it works</a>
          <a class="btn btn-ink" href="${ambassadorsPath(ctx.country)}">Become an Ambassador</a>
        </div>
      </div>
    </div>
  </section>`;
}

const NIGERIA_GUIDES: [string, string][] = [
  ["/digital-skills-training-nigeria", "Digital Skills Training Guide"],
  ["/digital-skills-jobs-nigeria", "Digital Skills &amp; Jobs Guide"],
  ["/oil-and-gas-careers-nigeria", "Oil &amp; Gas Careers Guide"],
  ["/hse-training-nigeria", "HSE Careers &amp; Training"],
  ["/corporate-training-nigeria", "Corporate Training"],
  ["/banking-telecom-training-nigeria", "Banking &amp; Telecom Training"],
  ["/degree-but-no-job-nigeria", "Degree But No Job?"],
  ["/nysc-digital-skills", "NYSC Digital Skills"],
  ["/oil-gas-banking-telecoms-digital-skills", "Oil, Banking &amp; Telecoms Guide"],
  ["/four-digital-skills-nigerian-graduates", "4 Digital Skills for Graduates"],
  ["/graduate-to-job-ready-nigeria", "Graduate to Job-Ready Roadmap"],
];

function footer(ctx: PageContext, home: string): string {
  const countries = MARKET_ORDER.map((code) => {
    const k = COUNTRIES[code];
    return `<li><a class="footer-country" href="${k.site.path}" data-pick-country="${code}">${flagSvg(code, "flag flag-sm")}<span>${escapeHtml(k.name)}</span><span class="footer-path">${k.site.path}</span></a></li>`;
  }).join("");
  const guides = ctx.country === "NG" ? NIGERIA_GUIDES.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("") : "";
  return `<footer class="site-footer">
  <div class="wrap footer-top">
    <div class="footer-brand">
      <a class="logo" href="${home}">${LOGO_MARK("#F7F4EC")}<span class="logo-word">Paleon Training</span></a>
      <p class="footer-tag">Digital skills for Africa&rsquo;s growth industries. Led from London, delivered in Nigeria, South Africa, Kenya and Ghana.</p>
      <p class="footer-tag">Paleon Training Limited<br>No.5 Beji Court, Off NNPC Junior Staff Club 10<br>Warri, 320001, Delta State, Nigeria<br><a href="tel:+2347077149215">+234 707 714 9215 / +234 707 714 9989 (WhatsApp/Call)</a></p>
    </div>
    <nav aria-label="Countries">
      <h2 class="footer-heading">Countries</h2>
      <ul class="footer-links">${countries}</ul>
    </nav>
    <nav aria-label="Courses">
      <h2 class="footer-heading">Courses</h2>
      <ul class="footer-links">
        ${HOMEPAGE_COURSES.map((slug) => `<li><a href="${home}#courses">${COURSE_INFO[slug].title}</a></li>`).join("")}
      </ul>
      <h2 class="footer-heading footer-heading-gap">Paleon</h2>
      <ul class="footer-links">
        <li><a href="${home}#why">Why Paleon</a></li>
        <li><a href="${home}#career-match">Free Career Match</a></li>
        <li><a href="${ambassadorsPath(ctx.country)}">Ambassadors</a></li>
        <li><a href="/support">Support</a></li>
        <li><a href="/consultancy">Consultancy</a></li>
        <li><a href="/university-partners">University Partnerships</a></li>
        ${guides}
      </ul>
    </nav>
    <div>
      <h2 class="footer-heading">Contact</h2>
      <ul class="footer-contact">
        <li><a href="tel:+447508823495">+44 7508 823495 (WhatsApp/Call)</a></li>
        <li>Courses &amp; fees: <a href="mailto:hello@paleontraining.com">hello@paleontraining.com</a></li>
        <li>Portal problems: <a href="/support">Support</a> &middot; <a href="mailto:support@paleontraining.com">support@paleontraining.com</a></li>
        <li>Paleon Training (Operations)<br>42 Okemore Gardens, Orpington, Kent BR5 3PH, United Kingdom</li>
      </ul>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <span>&copy; 2026 Paleon Training Limited. All rights reserved.</span>
    <span class="footer-legal"><a href="/terms">Terms of Service</a> &middot; <a href="/privacy">Privacy Policy</a></span>
  </div>
</footer>`;
}

// Read by country-home.js for the Career Match result and lead payload.
function pageData(ctx: PageContext, home: string): string {
  const { country } = ctx;
  const live = isLive(country);
  const courses = Object.fromEntries(
    HOMEPAGE_COURSES.map((slug) => {
      const info = COURSE_INFO[slug];
      const price = coursePriceLabel(country, slug).replace(/\[TBC: [^\]]*\]/g, "fee to be confirmed");
      return [
        slug,
        {
          title: info.title,
          meta: `${info.days} days \u00b7 ${info.lessons} lessons \u00b7 ${price} \u00b7 self-paced`,
          why: info.why,
          preview: `/preview/${slug}`,
          page: live ? info.page : `${home}#waitlist`,
          enrol: live ? `/register?course=${slug}${country === "NG" ? "" : `&country=${country}`}` : `${home}#waitlist`,
        },
      ];
    }),
  );
  const data = {
    country,
    courses,
    bySector: Object.fromEntries(COUNTRIES[country].site.industryOptions.map((o) => [o.label, o.course])),
    byInterest: INTEREST_COURSE,
  };
  return `<script type="application/json" id="ptHomeData">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

function head(ctx: PageContext, opts: { title: string; description: string; canonicalPath: string; alternatesFor: (code: CountryCode) => string; jsonLd: object }): string {
  const c = COUNTRIES[ctx.country];
  const url = `${ORIGIN}${opts.canonicalPath}`;
  const image = `${ORIGIN}${c.site.ogImage}`;
  return `<!DOCTYPE html>
<html lang="${ctx.hub ? "en" : c.site.locale}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="facebook-domain-verification" content="ve6zluduyln37gyt3nx9nrrqyfl8tz" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<title>${escapeHtml(opts.title)}</title>
<meta name="description" content="${escapeHtml(opts.description)}">
<link rel="canonical" href="${url}">
${alternates(opts.alternatesFor)}
<link rel="preload" as="font" type="font/woff2" href="/fonts/source-serif-4-variable.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="/fonts/source-sans-3-variable.woff2" crossorigin>
<meta property="og:type" content="website">
<meta property="og:site_name" content="Paleon Training">
<meta property="og:title" content="${escapeHtml(opts.title)}">
<meta property="og:description" content="${escapeHtml(opts.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${image}">
<meta name="twitter:title" content="${escapeHtml(opts.title)}">
<meta name="twitter:description" content="${escapeHtml(opts.description)}">
<script type="application/ld+json">${JSON.stringify(opts.jsonLd).replace(/</g, "\\u003c")}</script>
<link rel="stylesheet" href="/country-home.css">
<link rel="stylesheet" href="/search-widget.css">
${isLive(ctx.country) ? '<link rel="stylesheet" href="/whatsapp-float.css">' : ""}
</head>`;
}

function scripts(ctx: PageContext): string {
  // The floating WhatsApp button dials the Nigerian line, so only live countries get it.
  return `<script src="/country-home.js" defer></script>
<script src="/search.js" defer></script>
${isLive(ctx.country) ? '<script src="/whatsapp-float.js" defer></script>' : ""}
<script src="/email-links.js" defer></script>
<script src="/analytics.js" defer></script>
<script src="/learner-voices.js" defer></script>`;
}

function homeJsonLd(ctx: PageContext, url: string): object {
  const c = COUNTRIES[ctx.country];
  const prices = c.site.coursePrices;
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Paleon Training",
    url,
    description: `Digital skills training for graduates in ${ctx.hub ? "Nigeria, South Africa, Kenya and Ghana" : c.name}: Cyber Security, GIS and Drone Mapping, Digital Marketing and HSE Fundamentals.`,
    areaServed: (ctx.hub ? MARKET_ORDER : [ctx.country]).map((code) => ({ "@type": "Country", name: COUNTRIES[code].name })),
    sameAs: [
      "https://www.facebook.com/profile.php?id=61593708334223",
      "https://www.linkedin.com/company/146121029/",
      "https://www.instagram.com/paleontraining/",
    ],
    hasCourse: HOMEPAGE_COURSES.map((slug) => ({
      "@type": "Course",
      name: COURSE_INFO[slug].title,
      description: COURSE_INFO[slug].desc,
      provider: { "@type": "EducationalOrganization", name: "Paleon Training", sameAs: `${ORIGIN}/` },
      hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: `P${COURSE_INFO[slug].days}D` },
      // Only real, confirmed prices go into search results.
      ...(isLive(ctx.country) && prices
        ? { offers: { "@type": "Offer", priceCurrency: c.site.currency.code, price: String(prices[slug]) } }
        : {}),
    })),
  };
}

export function renderCountryHome(ctx: PageContext): string {
  const c = COUNTRIES[ctx.country];
  const home = ctx.hub ? "/" : c.site.path;
  const canonicalPath = home;
  const title = ctx.hub
    ? "Paleon Training | Digital skills for careers in Nigeria, South Africa, Kenya and Ghana"
    : `Paleon Training ${c.name} | Digital skills for ${plain(c.site.headlineIndustries)} careers`;
  const description = `Practical digital skills for ${plain(c.site.headlineIndustries)} careers in ${ctx.hub ? "Africa" : c.name}. Cyber Security, GIS & Drones, Digital Marketing, HSE. First lesson free.`;
  return `${head(ctx, {
    title,
    description,
    canonicalPath,
    alternatesFor: (code) => COUNTRIES[code].site.path,
    jsonLd: homeJsonLd(ctx, `${ORIGIN}${canonicalPath}`),
  })}
<body data-country="${ctx.country}"${ctx.hub ? " data-hub" : ""}>
${SEARCH_OVERLAY}
<a class="skip-link" href="#main">Skip to main content</a>
${geoBanner(ctx)}
<div class="util-bar">
  <div class="wrap util-row">
    <a href="mailto:hello@paleontraining.com">hello@paleontraining.com</a>
    <span>Paleon Training Limited</span>
    <span class="util-note">Mon&ndash;Fri, 10am&ndash;7pm WAT (9am&ndash;6pm GMT)</span>
  </div>
</div>
${header(ctx, home)}
<main id="main">
  ${hero(ctx, home)}
  ${depositStrip(ctx)}
  ${courseCards(ctx, home)}
  ${careerMatch(ctx, home)}
  ${steps(ctx, home)}
  ${why(ctx)}
  ${employers(ctx)}
  <section class="section learner-voices" data-learner-voices hidden>
    <div class="wrap">
      <p class="section-eyebrow">From our learners</p>
      <h2 class="section-title">What learners say</h2>
      <div class="voice-grid" data-learner-voices-list></div>
      <p class="voice-note">Real feedback from students who completed the course, shared with their permission.</p>
    </div>
  </section>
  ${referBand(ctx)}
</main>
${footer(ctx, home)}
${pageData(ctx, home)}
${scripts(ctx)}
</body>
</html>
`;
}

// /za/ambassadors, /ke/ambassadors, /gh/ambassadors (2026-10-30): the programme isn't
// running there yet, so this says so and takes waitlist sign-ups. Nigeria's programme
// page stays at /ambassadors.
export function renderComingSoonAmbassadors(ctx: PageContext): string {
  const c = COUNTRIES[ctx.country];
  const home = c.site.path;
  const path = ambassadorsPath(ctx.country);
  const title = `Paleon Ambassadors in ${c.name} | Paleon Training`;
  const description = `The Paleon Student Ambassador programme is coming to ${c.name}. Share free digital-skills lessons and earn a reward for every friend who enrols.`;
  return `${head(ctx, {
    title,
    description,
    canonicalPath: path,
    alternatesFor: (code) => ambassadorsPath(code),
    jsonLd: { "@context": "https://schema.org", "@type": "WebPage", name: title, url: `${ORIGIN}${path}` },
  })}
<body data-country="${ctx.country}">
${SEARCH_OVERLAY}
<a class="skip-link" href="#main">Skip to main content</a>
${geoBanner(ctx)}
${header(ctx, home)}
<main id="main">
  <section class="hero" id="top">
    <div class="wrap hero-inner">
      <span class="eyebrow">Paleon Ambassadors &middot; ${escapeHtml(c.name)}</span>
      <h1 class="hero-title">Help a friend learn a job-ready skill. <em>Earn ${text(c.site.referralReward)} when they enrol.</em></h1>
      <p class="hero-sub">The Student Ambassador programme opens in ${escapeHtml(c.name)} when courses launch here. It&rsquo;s free to join, with no sales targets.</p>
      ${waitlistBox(ctx.country)}
    </div>
  </section>
  <section class="section section-paper" id="how" aria-labelledby="ambHowTitle">
    <div class="wrap">
      <span class="section-eyebrow">How it will work</span>
      <h2 class="section-title" id="ambHowTitle">Three steps</h2>
      <ol class="start-steps">
        <li class="start-step"><span class="start-num" aria-hidden="true">1</span><h3>Register free</h3><p>Open <em>Refer &amp; earn</em> in your account. Your personal code is waiting.</p></li>
        <li class="start-step"><span class="start-num" aria-hidden="true">2</span><h3>Share ready-made posts</h3><p>Free lessons, share cards, videos and flyers, all carrying your code.</p></li>
        <li class="start-step"><span class="start-num" aria-hidden="true">3</span><h3>Get rewarded</h3><p>Earn ${text(c.site.referralReward)} when a friend&rsquo;s course is paid in full.</p></li>
      </ol>
      <p class="deposit-note">See how the programme runs in Nigeria today: <a href="/ambassadors">the Nigerian Ambassador programme</a>.</p>
    </div>
  </section>
</main>
${footer(ctx, home)}
${scripts(ctx)}
</body>
</html>
`;
}
