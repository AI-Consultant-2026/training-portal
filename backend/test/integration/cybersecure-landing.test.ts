import request from "supertest";
import { createApp } from "../../src/app";
import { MARKET_ORDER, COUNTRIES, formatMoney } from "../../src/constants/countries";
import { CORPORATE_PRICES } from "../../src/constants/corporatePricing";

// CyberSecure Workforce landing pages for buyers (2026-11-23): /<cc>/cybersecure-workforce.
const app = createApp();

describe("CyberSecure Workforce landing pages", () => {
  for (const code of MARKET_ORDER) {
    const path = `${COUNTRIES[code].site.path}/cybersecure-workforce`;
    it(`${path} sells seats with the buy form, video slot, incentives, contact and enquiry form`, async () => {
      const res = await request(app).get(path);
      expect(res.status).toBe(200);
      const html = res.text;
      expect(html).toContain(`<link rel="canonical" href="https://paleontraining.com${path}">`);
      expect(html).toContain(formatMoney(code, CORPORATE_PRICES.cybersecure[code]));
      expect(html).toContain('id="buy"');
      expect(html).toContain('id="caForm"');
      expect(html).toContain('data-programme="cybersecure-workforce"');
      expect(html).toContain("data-video-placeholder");
      expect(html).toContain("14-day money-back guarantee");
      expect(html).toContain("Pilot with your fee credited back");
      expect(html).toContain("corporate@paleontraining.com");
      expect(html).toContain("+44 7508 823495");
      expect(html).toContain("12 practical modules");
      // Online only: never live, classroom or facilitator-led delivery offered.
      expect(html).not.toMatch(/facilitator-led (training|sessions) (is|are) available|book a live session/i);
      if (code === "NG") expect(html).toContain("ITF");
      if (code === "ZA") expect(html).toContain("SETA");
    });
  }
});
