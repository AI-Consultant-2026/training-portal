import request from "supertest";
import { createApp } from "../../src/app";
import { config } from "../../src/config";

describe("GA4 analytics (/analytics.js)", () => {
  const original = config.analytics.ga4MeasurementId;
  afterEach(() => {
    config.analytics.ga4MeasurementId = original;
  });

  it("is off by default: serves a no-op stub that loads nothing from Google", async () => {
    expect(process.env.GA4_MEASUREMENT_ID).toBeUndefined();
    expect(original).toBe("");
    const res = await request(createApp()).get("/analytics.js");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/javascript/);
    expect(res.text).toContain("window.ptTrack=function(){}");
    expect(res.text).not.toContain("googletagmanager");
  });

  it("serves GA4 with consent mode and the configured ID once GA4_MEASUREMENT_ID is set", async () => {
    config.analytics.ga4MeasurementId = "G-TEST12345";
    const res = await request(createApp()).get("/analytics.js");
    expect(res.status).toBe(200);
    expect(res.text).toContain('var ID = "G-TEST12345"');
    expect(res.text).not.toContain("__GA4_MEASUREMENT_ID__");
    // Analytics cookies stay off until the visitor accepts; ads signals are always denied.
    expect(res.text).toMatch(/analytics_storage: choice === "granted" \? "granted" : "denied"/);
    expect(res.text).toContain('ad_storage: "denied"');
    expect(res.text).toContain("whatsapp_chat_click");
  });

  it("allows Google Analytics in the CSP without loosening anything else", async () => {
    const csp = (await request(createApp()).get("/welcome")).headers["content-security-policy"] as string;
    expect(csp).toMatch(/script-src 'self' https:\/\/www\.youtube\.com https:\/\/www\.googletagmanager\.com/);
    expect(csp).toContain("connect-src 'self' https://*.google-analytics.com");
    expect(csp).not.toContain("'unsafe-inline' https://www.googletagmanager.com");
    expect(csp).not.toMatch(/script-src[^;]*'unsafe-inline'/);
  });

  it("is loaded by the public marketing pages", async () => {
    const app = createApp();
    for (const page of ["/welcome", "/refer", "/privacy", "/gis-and-drone-mapping-course"]) {
      const res = await request(app).get(page);
      expect(res.status).toBe(200);
      expect(res.text).toContain('<script src="/analytics.js" defer></script>');
    }
  });
});
