import request from "supertest";
import { createApp } from "../../src/app";
import { GUIDES } from "../../src/constants/corporateGuides";

const app = createApp();

// Corporate guides content cluster (2026-11-09).
describe("Corporate guides", () => {
  it("serves the hub, linking every guide, with no hreflang alternates", async () => {
    const res = await request(app).get("/corporate-guides");
    expect(res.status).toBe(200);
    expect(res.text).toContain('<link rel="canonical" href="https://paleontraining.com/corporate-guides">');
    expect(res.text).toContain('"@type":"CollectionPage"');
    expect(res.text).not.toContain('rel="alternate" hreflang');
    for (const g of GUIDES) expect(res.text).toContain(`href="/corporate-guides/${g.slug}"`);
  });

  it.each(GUIDES.map((g) => [g.slug, g]))("serves /corporate-guides/%s", async (slug, g) => {
    const res = await request(app).get(`/corporate-guides/${slug}`);
    expect(res.status).toBe(200);
    expect(res.text).toContain(`<link rel="canonical" href="https://paleontraining.com/corporate-guides/${slug}">`);
    expect(res.text).toContain('"@type":"Article"');
    expect(res.text).toContain('"@type":"FAQPage"');
    expect(res.text).toContain("not legal advice");
    expect(res.text).not.toContain('rel="alternate" hreflang');
    expect(res.text).toContain('href="/ai-cyber-readiness-check');
    for (const r of g.related) expect(res.text).toContain(`href="/corporate-guides/${r}"`);
  });

  it("has unique titles, related links that exist, and sensible meta lengths", () => {
    const slugs = new Set(GUIDES.map((g) => g.slug));
    expect(new Set(GUIDES.map((g) => g.title)).size).toBe(GUIDES.length);
    for (const g of GUIDES) {
      for (const r of g.related) expect(slugs.has(r)).toBe(true);
      expect(g.title.length).toBeLessThanOrEqual(70);
      expect(g.description.length).toBeLessThanOrEqual(170);
    }
  });

  it("404s an unknown guide", async () => {
    expect((await request(app).get("/corporate-guides/not-a-guide")).status).toBe(404);
  });

  it("links the guides from the homepage and each country corporate page", async () => {
    expect((await request(app).get("/")).text).toContain('href="/corporate-guides"');
    const za = (await request(app).get("/za/corporate-training")).text;
    expect(za).toContain('href="/corporate-guides/popia-training-for-staff-south-africa"');
    expect((await request(app).get("/ng/corporate-training")).text).toContain('href="/corporate-guides/ndpa-data-protection-training-nigeria"');
  });
});
