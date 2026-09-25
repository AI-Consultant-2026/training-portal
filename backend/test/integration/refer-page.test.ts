import request from "supertest";
import { createApp } from "../../src/app";
import { REFEREE_REWARD_NGN, REFERRER_REWARD_NGN } from "../../src/constants/referral";

const app = createApp();
const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

describe("Public Refer & Earn page", () => {
  it("serves /refer publicly with the reward amounts filled in from constants/referral.ts", async () => {
    const res = await request(app).get("/refer");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/html/);
    expect(res.text).toContain(naira(REFERRER_REWARD_NGN));
    expect(res.text).toContain(naira(REFEREE_REWARD_NGN));
    // No unfilled template tokens may ever reach a visitor (visible text or JSON-LD).
    expect(res.text).not.toMatch(/\{\{[A-Z_]+\}\}/);
    expect(res.text).toContain('<link rel="canonical" href="https://paleontraining.com/refer">');
    // Students are sent to their own dashboard, which lives at /refer/me.
    expect(res.text).toContain('href="/refer/me"');
  });

  it("keeps the FAQ structured data valid JSON after the amounts are substituted", async () => {
    const res = await request(app).get("/refer");
    const blocks = [...res.text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) =>
      JSON.parse(m[1]),
    );
    const faq = blocks.find((b) => b["@type"] === "FAQPage");
    expect(faq).toBeDefined();
    expect(JSON.stringify(faq)).toContain(naira(REFERRER_REWARD_NGN));
  });

  it("is crawlable while the logged-in dashboard stays out of search", async () => {
    const robots = (await request(app).get("/robots.txt")).text;
    expect(robots).toContain("Allow: /refer$");
    expect(robots).toContain("Disallow: /refer/me");
    expect(robots).not.toMatch(/^Disallow: \/refer$/m);
    expect((await request(app).get("/sitemap.xml")).text).toContain("https://paleontraining.com/refer<");
  });

  it("links the homepage referral section to the public page and to the student dashboard", async () => {
    const welcome = (await request(app).get("/welcome")).text;
    expect(welcome).toContain('href="/refer"');
    expect(welcome).toContain('href="/refer/me"');
    expect(welcome).not.toContain("&#8358;3,000 off");
  });
});
