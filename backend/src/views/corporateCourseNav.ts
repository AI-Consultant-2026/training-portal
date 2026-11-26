import { COUNTRIES, CountryCode, formatMoney } from "../constants/countries";
import { CORPORATE_PRICES, PRICED_PROGRAMMES, PROGRAMME_NAMES, PricedProgramme } from "../constants/corporatePricing";
import { countryCorporatePath } from "./corporateLocal";

// Finding the other corporate courses (owner, 2026-11-26): readers on one course page had no
// quick way to see the other two in their country. Three aids, all country-specific:
//  1. courseSwitcher(): a bar at the top of every course page with all three courses;
//  2. compareCourses(): a "Compare the three courses" section just after pricing;
//  3. corporateNavItem(): a "Corporate Training" drop-down in the site menu.
// Only wording already on the course pages is used (hub headlines, "Who should attend?",
// module counts, list prices). No view imports beyond corporateLocal, so countryHome.ts can
// use it without a circular import.

export interface CourseInfo {
  programme: PricedProgramme;
  slug: string;
  short: string;
  forWhom: string;
  who: string;
  outcome: string;
  modules: string;
}

export const CORPORATE_COURSES: CourseInfo[] = [
  {
    programme: "cybersecure",
    slug: "corporate-training/cybersecure-workforce",
    short: "CyberSecure Workforce",
    forWhom: "Every employee",
    who: "All staff, in every role and department, from leadership to front-line teams.",
    outcome: "Fewer incidents that start with a person.",
    modules: "12 practical modules",
  },
  {
    programme: "ai-workflow",
    slug: "corporate-training/ai-workflow-productivity",
    short: "AI Workflow Productivity",
    forWhom: "Teams using AI at work",
    who: "Leaders, HR, operations and the teams that use AI tools in their daily work.",
    outcome: "Hours saved every week, with the risks managed.",
    modules: "10 practical modules",
  },
  {
    programme: "accelerator",
    slug: "corporate-training/ai-cybersecurity-professional-accelerator",
    short: "AI + Cybersecurity Accelerator",
    forWhom: "IT, security and risk professionals",
    who: "Technology, cybersecurity, risk, business and management professionals.",
    outcome: "Your own people leading secure AI adoption.",
    modules: "12 professional modules",
  },
];

// Same order as the pricing constants, so the bar, cards and menu always agree.
if (CORPORATE_COURSES.map((c) => c.programme).join() !== PRICED_PROGRAMMES.join()) {
  throw new Error("CORPORATE_COURSES must follow PRICED_PROGRAMMES order");
}

function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function coursePath(code: CountryCode, course: CourseInfo): string {
  return `${COUNTRIES[code].site.path}/${course.slug}`;
}

/** 1. The bar of all three courses at the top of a course page (current one highlighted). */
export function courseSwitcher(code: CountryCode, current: PricedProgramme): string {
  const items = CORPORATE_COURSES.map((c) => {
    const here = c.programme === current;
    return `<li><a class="cp-switch-link${here ? " is-current" : ""}" href="${coursePath(code, c)}"${here ? ' aria-current="page"' : ""} data-course-switch="${c.programme}"><span class="cp-switch-name">${esc(c.short)}</span><span class="cp-switch-for">${esc(c.forWhom)}</span></a></li>`;
  }).join("");
  return `<nav class="wrap cp-switch" aria-label="Corporate courses in ${esc(COUNTRIES[code].name)}">
      <span class="cp-switch-label">Our 3 corporate courses</span>
      <ul class="cp-switch-list">${items}</ul>
    </nav>`;
}

/** 2. "Compare the three courses": three cards, placed just after pricing. */
export function compareCourses(code: CountryCode, current: PricedProgramme, readinessHref: string): string {
  const country = COUNTRIES[code].name;
  const cards = CORPORATE_COURSES.map((c) => {
    const here = c.programme === current;
    const price = formatMoney(code, CORPORATE_PRICES[c.programme][code]);
    const action = here
      ? `<span class="cp-card-here">You are viewing this course</span>`
      : `<a class="btn btn-outline-ink cp-card-btn" href="${coursePath(code, c)}">View course</a>`;
    return `<article class="cp-card${here ? " is-current" : ""}" data-compare-course="${c.programme}">
        <span class="cp-card-for">For: ${esc(c.forWhom)}</span>
        <h3>${esc(PROGRAMME_NAMES[c.programme])}</h3>
        <p class="cp-card-outcome">${esc(c.outcome)}</p>
        <p class="cp-card-who">${esc(c.who)}</p>
        <ul class="cp-card-facts"><li>${esc(c.modules)}</li><li>Online and self-paced</li><li>From ${esc(price)} per learner</li></ul>
        ${action}
      </article>`;
  }).join("");
  return `<section class="section ca-section cp-compare" id="compare-courses" aria-labelledby="compare-title">
    <div class="wrap">
      <span class="section-eyebrow">Corporate training in ${esc(country)}</span>
      <h2 class="section-title" id="compare-title">Compare the three courses</h2>
      <div class="cp-cards">${cards}</div>
      <p class="ca-p cp-compare-help">Not sure which fits your staff? <a href="${readinessHref}">Take the free Readiness Check</a> and get a recommendation, or see <a href="${countryCorporatePath(code)}">all corporate training in ${esc(country)}</a>.</p>
    </div>
  </section>`;
}

/** 3. The "Corporate Training" menu item with the three courses for the reader's country. */
export function corporateNavItem(hubHref: string, code: CountryCode): string {
  const country = COUNTRIES[code].name;
  const items = CORPORATE_COURSES.map((c) => `<li><a href="${coursePath(code, c)}">${esc(c.short)}<span class="nav-courses-for">${esc(c.forWhom)}</span></a></li>`).join("");
  return `<li class="nav-courses">
          <a href="${hubHref}" class="nav-courses-top">Corporate Training<svg class="nav-courses-caret" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></a>
          <ul class="nav-courses-menu" aria-label="Corporate courses in ${esc(country)}">
            ${items}
            <li class="nav-courses-all"><a href="${countryCorporatePath(code)}">All corporate training in ${esc(country)}</a></li>
          </ul>
        </li>`;
}
