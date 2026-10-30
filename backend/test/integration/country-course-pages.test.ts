import request from "supertest";
import { createApp } from "../../src/app";

// Ghana, Kenya and South Africa course pages (SEO, 2026-10-30).
const app = createApp();
const ORIGIN = "https://paleontraining.com";
const SLUGS = ["cyber-security-fundamentals", "gis-and-drone-mapping", "digital-marketing", "hse-fundamentals"];
const COUNTRIES: [string, string, string, RegExp][] = [
  ["gh", "en-GH", "Ghana", /GH₵[\d,]+/],
  ["ke", "en-KE", "Kenya", /KSh [\d,]+/],
  ["za", "en-ZA", "South Africa", /R[\d,]+/],
];

const main = (html: string) => html.slice(html.indexOf("<main"), html.indexOf("</main>"));

describe("Country course pages", () => {
  it("serves each course in each country in local money, with no Naira and one H1", async () => {
    for (const [folder, lang, name, money] of COUNTRIES) {
      for (const slug of SLUGS) {
        const path = `/${folder}/${slug}-course`;
        const res = await request(app).get(path);
        expect(res.status).toBe(200);
        expect(res.text).toContain(`<html lang="${lang}">`);
        expect(res.text).toContain(`<link rel="canonical" href="${ORIGIN}${path}">`);
        expect(res.text).toMatch(new RegExp(`<title>[^<]*${name}[^<]*</title>`));
        expect(main(res.text)).toMatch(money);
        expect(main(res.text)).not.toContain("₦");
        expect(res.text.match(/<h1[\s>]/g)).toHaveLength(1);
        // Honest about where the course comes from: Nigerian worked examples, no local office.
        expect(res.text).toContain("Paleon Training Limited");
        expect(res.text).not.toContain("Local rules covered");
      }
    }
  });

  it("links every country version of a course with hreflang, x-default on the Nigerian page", async () => {
    for (const slug of SLUGS) {
      const pages = [`/${slug}-course`, `/gh/${slug}-course`, `/ke/${slug}-course`, `/za/${slug}-course`];
      for (const path of pages) {
        const res = await request(app).get(path);
        expect(res.status).toBe(200);
        for (const [lang, href] of [
          ["en-NG", `/${slug}-course`],
          ["en-GH", `/gh/${slug}-course`],
          ["en-KE", `/ke/${slug}-course`],
          ["en-ZA", `/za/${slug}-course`],
          ["x-default", `/${slug}-course`],
        ]) {
          expect(res.text).toContain(`<link rel="alternate" hreflang="${lang}" href="${ORIGIN}${href}">`);
        }
      }
    }
  });

  it("has valid Course, BreadcrumbList and FAQPage JSON-LD and no inline scripts", async () => {
    const res = await request(app).get("/ke/gis-and-drone-mapping-course");
    const blocks = [...res.text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    const types = blocks.flatMap((b) => (JSON.parse(b[1])["@graph"] ?? [JSON.parse(b[1])]).map((n: { "@type": string }) => n["@type"]));
    expect(types).toEqual(expect.arrayContaining(["Course", "BreadcrumbList", "FAQPage"]));
    expect(res.text).not.toMatch(/<script(?![^>]*(?:\bsrc=|type="application\/(?:ld\+)?json"))[^>]*>/);
  });

  it("returns 404 for a course or country that doesn't exist", async () => {
    expect((await request(app).get("/ke/underwater-welding-course")).status).toBe(404);
    expect((await request(app).get("/ng/cyber-security-fundamentals-course")).status).toBe(404);
  });

  it("links the country homepage's courses to that country's course pages and jobs board", async () => {
    const res = await request(app).get("/za");
    for (const slug of SLUGS) expect(res.text).toContain(`href="/za/${slug}-course"`);
    expect(res.text).toContain('href="/za/latest-jobs-board"');
    const ng = await request(app).get("/ng");
    expect(ng.text).toContain('href="/cyber-security-fundamentals-course"');
    expect(ng.text).toContain("Local rules covered");
  });

  it("gives every jobs board the full four-country hreflang set", async () => {
    for (const path of ["/latest-jobs-board", "/gh/latest-jobs-board", "/ke/latest-jobs-board", "/za/latest-jobs-board"]) {
      const res = await request(app).get(path);
      expect(res.text.match(/hreflang=/g)).toHaveLength(5);
      expect(res.text).toContain(`<link rel="alternate" hreflang="x-default" href="${ORIGIN}/latest-jobs-board">`);
      expect(res.text).toMatch(/"@type": ?"CollectionPage"/);
    }
  });
});
