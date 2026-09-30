import request from "supertest";
import { createApp } from "../../src/app";

const app = createApp();

describe("Renamed four-course curriculum press release", () => {
  it("serves the release at its new URL with a matching canonical and four courses", async () => {
    const res = await request(app).get("/paleon-training-four-course-digital-skills-curriculum");
    expect(res.status).toBe(200);
    expect(res.text).toContain(
      '<link rel="canonical" href="https://paleontraining.com/paleon-training-four-course-digital-skills-curriculum">',
    );
    expect(res.text).toContain("Completes Four-Course Digital Skills Curriculum");
    expect(res.text).toContain("images/og/paleon-training-four-course-digital-skills-curriculum.jpg");
  });

  it("permanently redirects the old six-course URL to the new one", async () => {
    const res = await request(app).get("/paleon-training-six-course-digital-skills-curriculum");
    expect(res.status).toBe(301);
    expect(res.headers.location).toBe("/paleon-training-four-course-digital-skills-curriculum");
  });

  it("links to the new URL from the content hub", async () => {
    const res = await request(app).get("/paleon-training-employability-content-hub");
    expect(res.status).toBe(200);
    expect(res.text).not.toContain("six-course-digital-skills-curriculum");
    expect(res.text).toContain("/paleon-training-four-course-digital-skills-curriculum");
  });

  it("lists only the new URL in the sitemap and robots.txt", async () => {
    const sitemap = await request(app).get("/sitemap.xml");
    expect(sitemap.text).toContain("/paleon-training-four-course-digital-skills-curriculum");
    expect(sitemap.text).not.toContain("six-course-digital-skills-curriculum");
    const robots = await request(app).get("/robots.txt");
    expect(robots.text).toContain("Allow: /paleon-training-four-course-digital-skills-curriculum");
    expect(robots.text).not.toContain("six-course-digital-skills-curriculum");
  });

  it("no longer says public guides teach an archived renewable energy course", async () => {
    for (const page of [
      "/renewable-energy-careers-nigeria",
      "/solar-energy-training-in-nigeria",
      "/renewable-energy-job-opportunities-guide",
      "/gis-for-solar-site-assessment-nigeria",
    ]) {
      const res = await request(app).get(page);
      expect(res.status).toBe(200);
      expect(res.text).not.toContain("Renewable Energy Digital Systems");
    }
  });
});
