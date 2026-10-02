import fs from "fs";
import path from "path";
import request from "supertest";
import { createApp } from "../../src/app";
import { REFEREE_REWARD_NGN, REFERRER_REWARD_NGN } from "../../src/constants/referral";

const app = createApp();
const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

describe("Ambassador walkthrough page", () => {
  it("serves /ambassador-walkthrough with the amounts filled in from constants/referral.ts", async () => {
    const res = await request(app).get("/ambassador-walkthrough");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/html/);
    expect(res.text).toContain(naira(REFERRER_REWARD_NGN));
    expect(res.text).toContain(naira(REFEREE_REWARD_NGN));
    expect(res.text).not.toMatch(/\{\{[A-Z0-9_]+\}\}/);
    expect(res.text).toContain('<link rel="canonical" href="https://paleontraining.com/ambassador-walkthrough">');
    // The friend's reward is airtime paid after payment: never money off, never their choice.
    expect(res.text).toContain(`${naira(REFEREE_REWARD_NGN)} in airtime`);
    expect(res.text).not.toMatch(/off (their|your) first course|their choice/i);
  });

  it("keeps its structured data valid JSON after substitution", async () => {
    const res = await request(app).get("/ambassador-walkthrough");
    const blocks = [...res.text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) =>
      JSON.parse(m[1]),
    );
    expect(blocks.map((b) => b["@type"])).toEqual(["WebPage", "BreadcrumbList", "FAQPage"]);
    expect(JSON.stringify(blocks)).toContain(naira(REFERRER_REWARD_NGN));
  });

  it("loads its script externally (the CSP blocks inline JS) and serves it", async () => {
    const html = (await request(app).get("/ambassador-walkthrough")).text;
    expect(html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "")).not.toMatch(/<script>/);
    expect(html).toContain('<script src="/ambassador-walkthrough.js" defer></script>');
    const js = await request(app).get("/ambassador-walkthrough.js");
    expect(js.status).toBe(200);
    expect(js.headers["content-type"]).toMatch(/javascript/);
  });

  it("serves every screenshot the page uses, and nothing outside that folder", async () => {
    const html = (await request(app).get("/ambassador-walkthrough")).text;
    const images = [...new Set([...html.matchAll(/\/images\/ambassador-walkthrough\/([a-z0-9-]+\.jpg)/g)].map((m) => m[1]))];
    expect(images.length).toBeGreaterThanOrEqual(10);
    const onDisk = fs.readdirSync(path.join(__dirname, "../../src/marketing/images/ambassador-walkthrough"));
    for (const file of images) {
      expect(onDisk).toContain(file);
      const img = await request(app).get(`/images/ambassador-walkthrough/${file}`);
      expect(img.status).toBe(200);
      expect(img.headers["content-type"]).toMatch(/image\/jpeg/);
    }
    expect((await request(app).get("/images/ambassador-walkthrough/..%2F..%2Fapp.ts")).status).not.toBe(200);
  });

  it("is in the sitemap, robots.txt and site search, and linked from /ambassadors", async () => {
    expect((await request(app).get("/sitemap.xml")).text).toContain("https://paleontraining.com/ambassador-walkthrough<");
    expect((await request(app).get("/robots.txt")).text).toContain("Allow: /ambassador-walkthrough");
    const index = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../../src/marketing/search-index.json"), "utf8"),
    ) as { url: string }[];
    expect(index.map((p) => p.url)).toContain("/ambassador-walkthrough");
    expect((await request(app).get("/ambassadors")).text).toContain('href="/ambassador-walkthrough"');
  });
});
