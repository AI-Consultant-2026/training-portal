import request from "supertest";
import { createApp } from "../../src/app";
import { PROGRAMMES } from "../../src/views/directorResources";
import { COUNTRIES, MARKET_ORDER } from "../../src/constants/countries";

const app = createApp();

function graph(html: string): any[] {
  const out: any[] = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const d = JSON.parse(m[1]);
    out.push(...(d["@graph"] ?? [d]));
  }
  return out;
}

describe("Corporate SEO signals (2026-11-10)", () => {
  const pages = [
    "/",
    "/Promotion-AI-Workflow-Productivity",
    ...MARKET_ORDER.map((c) => `${COUNTRIES[c].site.path}/corporate-training`),
    ...MARKET_ORDER.flatMap((c) => Object.values(PROGRAMMES).map((p) => `${COUNTRIES[c].site.path}/${p.slug}`)),
    "/corporate-guides",
    "/corporate-guides/ndpa-data-protection-training-nigeria",
    "/ai-cyber-readiness-check",
    "/ai-use-policy-template",
  ];

  it.each(pages)("has one full Organization node with logo, phone and company profiles on %s", async (path) => {
    const res = await request(app).get(path);
    expect(res.status).toBe(200);
    const orgs = graph(res.text).filter((n) => n["@type"] === "Organization");
    expect(orgs).toHaveLength(1);
    const o = orgs[0];
    expect(o["@id"]).toBe("https://paleontraining.com/#organization");
    expect(o.logo.url).toBe("https://paleontraining.com/images/og/paleon-training-logo.jpg");
    expect(o.telephone).toBe("+234-707-714-9215");
    expect(o.address.postalCode).toBe("320001");
    expect(o.sameAs).toContain("https://www.linkedin.com/company/146121029/");
  });

  it("serves the logo and the readiness share image", async () => {
    for (const f of ["paleon-training-logo", "ai-cyber-readiness-check"]) {
      const r = await request(app).get(`/images/og/${f}.jpg`);
      expect(r.status).toBe(200);
      expect(r.headers["content-type"]).toContain("image/jpeg");
    }
    const page = await request(app).get("/ai-cyber-readiness-check");
    expect(page.text).toContain('content="https://paleontraining.com/images/og/ai-cyber-readiness-check.jpg"');
  });

  it("marks up the three homepage videos", async () => {
    const res = await request(app).get("/");
    const videos = graph(res.text).filter((n) => n["@type"] === "VideoObject");
    expect(videos.map((v) => v.duration)).toEqual(["PT1M48S", "PT1M54S", "PT1M55S"]);
    for (const v of videos) {
      expect(res.text).toContain(`<source src="${v.contentUrl.replace("https://paleontraining.com", "")}"`);
      const thumb = await request(app).get(v.thumbnailUrl.replace("https://paleontraining.com", ""));
      expect(thumb.status).toBe(200);
    }
  });

  it("serves llms.txt listing the corporate programmes and guides", async () => {
    const res = await request(app).get("/llms.txt");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("text/plain");
    expect(res.text).toMatch(/^# Paleon Training/);
    expect(res.text).toContain("https://paleontraining.com/ng/corporate-training/cybersecure-workforce");
    expect(res.text).toContain("https://paleontraining.com/corporate-guides/ndpa-data-protection-training-nigeria");
  });
});
