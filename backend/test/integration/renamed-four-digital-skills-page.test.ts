import request from "supertest";
import { createApp } from "../../src/app";

const app = createApp();

describe("Renamed four-digital-skills article", () => {
  it("serves the article at its new URL with a matching canonical", async () => {
    const res = await request(app).get("/four-digital-skills-nigerian-graduates");
    expect(res.status).toBe(200);
    expect(res.text).toContain(
      '<link rel="canonical" href="https://paleontraining.com/four-digital-skills-nigerian-graduates">',
    );
    expect(res.text).toContain("4 Digital Skills Every Nigerian Graduate Should Learn");
  });

  it("permanently redirects the old six- URL to the new one", async () => {
    const res = await request(app).get("/six-digital-skills-nigerian-graduates");
    expect(res.status).toBe(301);
    expect(res.headers.location).toBe("/four-digital-skills-nigerian-graduates");
  });

  it("no longer links to the old URL from any page that pointed at it", async () => {
    const pages = [
      "/welcome",
      "/digital-skills-training-nigeria",
      "/degree-but-no-job-nigeria",
      "/graduate-to-job-ready-nigeria",
      "/oil-gas-banking-telecoms-digital-skills",
      "/digital-skills-nigeria-career-intelligence-guide",
      "/paleon-training-employability-content-hub",
    ];
    for (const page of pages) {
      const res = await request(app).get(page);
      expect(res.status).toBe(200);
      expect(res.text).not.toContain("six-digital-skills-nigerian-graduates");
      expect(res.text).toContain("/four-digital-skills-nigerian-graduates");
    }
  });

  it("lists only the new URL in the sitemap and robots.txt", async () => {
    const sitemap = await request(app).get("/sitemap.xml");
    expect(sitemap.text).toContain("/four-digital-skills-nigerian-graduates");
    expect(sitemap.text).not.toContain("six-digital-skills-nigerian-graduates");
    const robots = await request(app).get("/robots.txt");
    expect(robots.text).toContain("Allow: /four-digital-skills-nigerian-graduates");
    expect(robots.text).not.toContain("six-digital-skills-nigerian-graduates");
  });
});
