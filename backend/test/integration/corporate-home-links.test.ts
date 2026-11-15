import request from "supertest";
import { createApp } from "../../src/app";
import { MARKET_ORDER, COUNTRIES } from "../../src/constants/countries";
import { GUIDES } from "../../src/constants/corporateGuides";
import { SECTORS, SECTORS_PATH } from "../../src/views/corporateSectorsData";

// Every corporate training page is linked from the homepage "/" (2026-11-15).
const app = createApp();

describe("Corporate homepage links every corporate training page", () => {
  let html = "";
  let links: Set<string>;
  beforeAll(async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    html = res.text;
    links = new Set([...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]));
  });

  it("links every corporate guide, set in the page's own text", () => {
    for (const g of GUIDES) expect(links).toContain(`/corporate-guides/${g.slug}`);
    expect(GUIDES).toHaveLength(25);
    // Inline, not a bare list: e.g. the data protection law names and the CyberSecure examples.
    expect(html).toContain('<a href="/corporate-guides/popia-training-for-staff-south-africa">Protection of Personal Information Act (POPIA)</a>');
    expect(html).toContain('<a href="/corporate-guides/invoice-and-payment-fraud-prevention-training">a fake invoice</a>');
  });

  it("links the programmes, country pages, sectors and resources", () => {
    const pages = [
      "/corporate-guides",
      "/corporate-training/online-staff-training",
      "/corporate-training/free-preview",
      SECTORS_PATH,
      ...SECTORS.map((s) => `${SECTORS_PATH}/${s.slug}`),
      "/Promotion-AI-Workflow-Productivity",
      "/ai-cyber-readiness-check",
      "/ai-use-policy-template",
      "/board-cyber-risk-briefing",
      "/corporate-training/samples/certificate.pdf",
      "/corporate-training/samples/attendance-record.pdf",
    ];
    for (const code of MARKET_ORDER) {
      const f = COUNTRIES[code].site.path;
      pages.push(
        `${f}/corporate-training`,
        `${f}/corporate-training/cybersecure-workforce`,
        `${f}/corporate-training/ai-workflow-productivity`,
        `${f}/corporate-training/ai-cybersecurity-professional-accelerator`,
        `/corporate-training/how-the-company-portal-works-${code.toLowerCase()}.pdf`,
      );
    }
    for (const p of pages) expect(links).toContain(p);
  });

  it("every guide link opens a real page", async () => {
    for (const g of GUIDES.slice(0, 5)) {
      expect((await request(app).get(`/corporate-guides/${g.slug}`)).status).toBe(200);
    }
  });
});
