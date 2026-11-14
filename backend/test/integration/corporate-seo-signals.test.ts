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
    expect(o.telephone).toBe("+44-7508-823495");
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

describe("Search titles and course data for company buyers (2026-11-14)", () => {
  const PAGES = [
    "/",
    "/corporate-training/online-staff-training",
    ...["ng", "za", "ke", "gh"].flatMap((cc) => [
      `/${cc}/corporate-training`,
      `/${cc}/corporate-training/cybersecure-workforce`,
      `/${cc}/corporate-training/ai-workflow-productivity`,
      `/${cc}/corporate-training/ai-cybersecurity-professional-accelerator`,
    ]),
  ];
  const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"');

  it("keeps titles within 65 and descriptions within 160 characters, all unique", async () => {
    const titles = new Set<string>();
    for (const path of PAGES) {
      const html = (await request(app).get(path)).text;
      const title = decode(/<title>([^<]*)<\/title>/.exec(html)![1]);
      const desc = decode(/<meta name="description" content="([^"]*)"/.exec(html)![1]);
      expect([path, title.length <= 65]).toEqual([path, true]);
      expect([path, desc.length <= 160]).toEqual([path, true]);
      expect(titles.has(title)).toBe(false);
      titles.add(title);
    }
  });

  it("leads with the phrases buyers search for", async () => {
    const get = async (p: string) => decode(/<title>([^<]*)<\/title>/.exec((await request(app).get(p)).text)![1]);
    expect(await get("/ng/corporate-training")).toMatch(/^Corporate Training in Nigeria/);
    expect(await get("/za/corporate-training/cybersecure-workforce")).toMatch(/^Security Awareness Training for Employees/);
    expect(await get("/ke/corporate-training/ai-workflow-productivity")).toMatch(/^AI Training for Employees in Kenya/);
    expect(await get("/corporate-training/online-staff-training")).toMatch(/^Online Staff Training for Companies/);
  });

  it("marks programmes as online courses with a real price and study time", async () => {
    const html = (await request(app).get("/gh/corporate-training/cybersecure-workforce")).text;
    expect(html).not.toMatch(/"onsite"|"blended"/);
    expect(html).toContain('"courseMode":"online"');
    expect(html).toMatch(/"courseWorkload":"PT\d+H/);
    expect(html).toContain('"priceCurrency":"GHS"');
    expect(html).toContain('"price":650');
  });

  it("serves the online staff training page with FAQ data, linked from the footer and sitemap", async () => {
    const res = await request(app).get("/corporate-training/online-staff-training");
    expect(res.status).toBe(200);
    expect(res.text).toContain("<h1");
    expect(res.text).toContain('"FAQPage"');
    expect(res.text).toContain('id="how-it-works"');
    const home = (await request(app).get("/")).text;
    expect(home).toContain('href="/corporate-training/online-staff-training"');
    expect((await request(app).get("/sitemap.xml")).text).toContain("/corporate-training/online-staff-training");
  });
});
