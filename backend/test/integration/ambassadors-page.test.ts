import request from "supertest";
import { createApp } from "../../src/app";
import { REFEREE_REWARD_NGN, REFERRER_REWARD_NGN } from "../../src/constants/referral";

const app = createApp();
const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

describe("Student Ambassador Programme page", () => {
  it("serves /ambassadors with every amount filled in from constants/referral.ts", async () => {
    const res = await request(app).get("/ambassadors");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/html/);
    expect(res.text).toContain(naira(REFERRER_REWARD_NGN));
    expect(res.text).toContain(naira(REFEREE_REWARD_NGN));
    expect(res.text).toContain(naira(REFERRER_REWARD_NGN * 5));
    expect(res.text).toContain(naira(REFERRER_REWARD_NGN * 10));
    expect(res.text).not.toMatch(/\{\{[A-Z0-9_]+\}\}/);
    expect(res.text).toContain('<link rel="canonical" href="https://paleontraining.com/ambassadors">');
    // Describes the friend's reward correctly: paid after payment, never money off.
    expect(res.text).toContain("welcome reward after their first payment");
    expect(res.text).not.toMatch(/off (their|your) first course/i);
  });

  it("keeps its structured data valid JSON after substitution", async () => {
    const res = await request(app).get("/ambassadors");
    const blocks = [...res.text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) =>
      JSON.parse(m[1]),
    );
    expect(blocks.map((b) => b["@type"])).toEqual(["WebPage", "BreadcrumbList", "FAQPage"]);
    expect(JSON.stringify(blocks)).toContain(naira(REFERRER_REWARD_NGN));
  });

  it("loads its script externally (the CSP blocks inline JS) along with the shared widgets", async () => {
    const html = (await request(app).get("/ambassadors")).text;
    expect(html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "")).not.toMatch(/<script>/);
    for (const src of ["/ambassadors.js", "/analytics.js", "/whatsapp-float.js", "/search.js"]) {
      expect(html).toContain(`<script src="${src}" defer></script>`);
    }
    const js = await request(app).get("/ambassadors.js");
    expect(js.status).toBe(200);
    expect(js.headers["content-type"]).toMatch(/javascript/);
    expect(js.text).toContain("data-present-start");
  });

  it("puts the sign-up call to action in the hero and straight after the rewards, not only at the bottom", async () => {
    const html = (await request(app).get("/ambassadors")).text;
    const hero = html.slice(0, html.indexOf('id="what"'));
    expect(hero).toContain('<a class="btn btn-signal" href="/register">Create your free account</a>');
    const join = html.indexOf('id="join"');
    expect(join).toBeGreaterThan(html.indexOf('id="rewards"'));
    expect(join).toBeLessThan(html.indexOf('id="get-started"'));
    expect(html.slice(join, html.indexOf('id="get-started"'))).toContain('href="/register"');
  });

  it("is crawlable, in the sitemap, and linked from /refer and the homepage", async () => {
    expect((await request(app).get("/robots.txt")).text).toContain("Allow: /ambassadors");
    expect((await request(app).get("/sitemap.xml")).text).toContain("https://paleontraining.com/ambassadors<");
    expect((await request(app).get("/refer")).text).toContain('href="/ambassadors"');
    expect((await request(app).get("/welcome")).text).toContain('href="/ambassadors"');
  });
});
