import request from "supertest";
import { createApp } from "../../src/app";

const app = createApp();

const COURSES = ["cyber-security-fundamentals", "gis-and-drone-mapping", "digital-marketing", "hse-fundamentals"];

describe("Customer-experience changes on the public pages (2026-09-25)", () => {
  it.each(COURSES)("the %s course page offers the free lesson, the facts and a sample certificate", async (slug) => {
    const res = await request(app).get(`/${slug}-course`);
    expect(res.status).toBe(200);
    expect(res.text).toContain(`href="/preview/${slug}"`);
    expect(res.text).toContain(`href="/register?course=${slug}"`);
    expect(res.text).toContain('id="before-you-enrol"');
    expect(res.text).toContain("Lifetime access");
    expect(res.text).toContain("Self-paced, start anytime");
    expect(res.text).toContain(`/images/certificates/sample-${slug}.jpg`);
    expect(res.text).toMatch(/"name": ?"How long do I keep access\?"/);

    const img = await request(app).get(`/images/certificates/sample-${slug}.jpg`);
    expect(img.status).toBe(200);
    expect(img.headers["content-type"]).toMatch(/image\/jpeg/);
  });

  it("gives the homepage one clear start path, with free lessons and course-preselected sign-up", async () => {
    const res = await request(app).get("/welcome");
    expect(res.text).toContain('id="start"');
    expect(res.text).toContain('href="#start">Start here</a>');
    for (const slug of COURSES) {
      expect(res.text).toContain(`href="/preview/${slug}"`);
      expect(res.text).toContain(`href="/register?course=${slug}"`);
    }
    expect(res.text).not.toContain('href="/login">Enrol Now</a>');
    expect(res.text).not.toMatch(/50 FREE|free training place|first 50/i);
    expect(res.text).toContain('id="career-match"');
    expect(res.text).toContain("Get my free Career Match");
    expect(res.text).not.toContain("Try Day 1 free");
    expect(res.text).toContain("10am&ndash;7pm WAT");
  });

  it("puts in-portal reporting and the reply time first on the Support page", async () => {
    const res = await request(app).get("/support");
    expect(res.text).toContain('id="report-in-portal"');
    expect(res.text).toContain("We reply within 1 working day");
    expect(res.text.indexOf("report-in-portal")).toBeLessThan(res.text.indexOf("Tell us these five things"));
  });

  it.each(["/privacy", "/terms"])("%s describes the business as the owner specified, not as a registered company", async (page) => {
    const res = await request(app).get(page);
    expect(res.status).toBe(200);
    expect(res.text).not.toContain("registered in Nigeria");
    expect(res.text).toContain("Principal place of business / Nigerian operations:");
    expect(res.text).toContain("where Paleon Training will be registered");
    expect(res.text).toContain("Technology and management support:");
    expect(res.text).toContain("Market served:");
  });

  it("privacy policy covers the Career Match, follow-up emails, unsubscribing and problem reports", async () => {
    const res = await request(app).get("/privacy");
    for (const phrase of ["Career Match", "You can unsubscribe", "Problem reports", "screenshot", "WhatsApp"]) {
      expect(res.text).toContain(phrase);
    }
  });

  it("terms list only the current courses", async () => {
    const res = await request(app).get("/terms");
    expect(res.text).toContain("HSE\n      Fundamentals");
    expect(res.text).not.toContain("Social Media Management");
    expect(res.text).not.toContain("Renewable Energy");
  });

  it("lists the four free-lesson pages in the sitemap and allows them in robots.txt", async () => {
    const sitemap = (await request(app).get("/sitemap.xml")).text;
    for (const slug of COURSES) expect(sitemap).toContain(`<loc>https://paleontraining.com/preview/${slug}</loc>`);
    expect((await request(app).get("/robots.txt")).text).toContain("Allow: /preview/");
  });
});
