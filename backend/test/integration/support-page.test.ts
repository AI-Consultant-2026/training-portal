import request from "supertest";
import { createApp } from "../../src/app";

const app = createApp();

describe("Support page", () => {
  it("serves /support with the reporting instructions and the support address", async () => {
    const res = await request(app).get("/support");
    expect(res.status).toBe(200);
    expect(res.text).toContain("How to report an issue");
    expect(res.text).toContain("support@paleontraining.com");
    for (const field of ["Full name", "Email", "Phone number", "Type of phone", "Browser"]) {
      expect(res.text).toContain(field);
    }
    expect(res.text).toContain("John Obadan");
    expect(res.text).toContain("/images/support-example-screenshot.jpg");
    expect(res.text).toContain('<link rel="canonical" href="https://paleontraining.com/support">');
  });

  it("serves the example screenshot as a JPEG", async () => {
    const res = await request(app).get("/images/support-example-screenshot.jpg");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/image\/jpeg/);
  });

  it("links to /support from the welcome page menu and footer and from other marketing pages", async () => {
    const welcome = await request(app).get("/welcome");
    expect(welcome.text.match(/href="\/support"/g)?.length).toBeGreaterThanOrEqual(2);
    for (const page of ["/university-partners", "/digital-skills-training-nigeria"]) {
      const res = await request(app).get(page);
      expect(res.status).toBe(200);
      expect(res.text).toContain('href="/support"');
    }
  });

  it("is listed in the sitemap and robots.txt", async () => {
    expect((await request(app).get("/sitemap.xml")).text).toContain("https://paleontraining.com/support");
    expect((await request(app).get("/robots.txt")).text).toContain("Allow: /support");
  });
});
