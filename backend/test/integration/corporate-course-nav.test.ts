import request from "supertest";
import { createApp } from "../../src/app";
import { CORPORATE_COURSES } from "../../src/views/corporateCourseNav";

// Finding the other corporate courses from any course page (owner, 2026-11-26).
const app = createApp();
const COUNTRIES = ["ng", "za", "ke", "gh"];

describe("Corporate course navigation", () => {
  it("shows all three courses at the top of every course page, current one marked, in the same country", async () => {
    for (const cc of COUNTRIES) {
      for (const current of CORPORATE_COURSES) {
        const html = (await request(app).get(`/${cc}/${current.slug}`)).text;
        const hero = html.slice(html.indexOf('id="top"'), html.indexOf('class="hero-inner'));
        for (const c of CORPORATE_COURSES) {
          expect(hero).toContain(`href="/${cc}/${c.slug}"`);
        }
        expect(hero.match(/aria-current="page" data-course-switch="([a-z-]+)"/)?.[1]).toBe(current.programme);
      }
    }
  });

  it("compares the three courses just after pricing, with local prices and links", async () => {
    const html = (await request(app).get("/za/corporate-training/ai-workflow-productivity")).text;
    const compare = html.slice(html.indexOf('id="compare-courses"'), html.indexOf("</section>", html.indexOf('id="compare-courses"')));
    expect(compare).toContain("Compare the three courses");
    expect(compare.match(/data-compare-course=/g)).toHaveLength(3);
    expect(compare).toContain("You are viewing this course");
    expect(compare).toContain('href="/za/corporate-training/cybersecure-workforce"');
    expect(compare).toContain('href="/za/corporate-training/ai-cybersecurity-professional-accelerator"');
    expect(compare).toMatch(/From R ?[\d,]+ per learner/);
    expect(compare).toContain("Readiness Check");
    // Placed after the price table, before the pilot section.
    const prices = html.indexOf("prices in South Africa");
    expect(prices).toBeGreaterThan(-1);
    expect(html.indexOf('id="compare-courses"')).toBeGreaterThan(prices);
  });

  it("lists the three courses for the reader's country under Corporate Training in the menu", async () => {
    for (const [path, cc] of [["/ke/corporate-training/cybersecure-workforce", "ke"], ["/gh", "gh"], ["/za/corporate-training", "za"]] as const) {
      const html = (await request(app).get(path)).text;
      const nav = html.slice(html.indexOf('class="nav-courses"'), html.indexOf("</ul>", html.indexOf('class="nav-courses-menu"')));
      for (const c of CORPORATE_COURSES) expect(nav).toContain(`href="/${cc}/${c.slug}"`);
      expect(nav).toContain(`href="/${cc}/corporate-training"`);
    }
  });

  it("homepage: one line per course for the visitor's country, with the others linked (2026-11-26)", async () => {
    const html = (await request(app).get("/?country=ke")).text;
    expect(html).not.toContain('class="ca-country"');
    expect(html.match(/data-hub-go=/g)).toHaveLength(3);
    expect(html).toContain('href="/ke/corporate-training/cybersecure-workforce" hreflang="en-KE">View CyberSecure Workforce in Kenya');
    expect(html).toContain('<a class="btn btn-outline-ink btn-lg" href="/ke/cybersecure-workforce">Buy seats online</a>');
    for (const cc of ["ng", "za", "gh"]) {
      expect(html).toContain(`href="/${cc}/corporate-training/ai-workflow-productivity"`);
      expect(html).toContain(`href="/${cc}/ai-cybersecurity-accelerator"`);
    }
  });

  it("no longer has a Related section on the course pages", async () => {
    for (const cc of COUNTRIES) {
      for (const c of CORPORATE_COURSES) {
        expect((await request(app).get(`/${cc}/${c.slug}`)).text).not.toContain('id="related-title"');
      }
    }
  });
});
