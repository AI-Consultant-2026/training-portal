import request from "supertest";
import { createApp } from "../../src/app";
import { MARKET_ORDER, COUNTRIES, formatMoney } from "../../src/constants/countries";
import { CORPORATE_PRICES } from "../../src/constants/corporatePricing";

// AI + Cybersecurity Accelerator landing pages for buyers (2026-11-23): /<cc>/ai-cybersecurity-accelerator.
const app = createApp();

describe("AI + Cybersecurity Accelerator landing pages", () => {
  for (const code of MARKET_ORDER) {
    const path = `${COUNTRIES[code].site.path}/ai-cybersecurity-accelerator`;
    it(`${path} sells seats with the buy form, video slot, incentives, contact and enquiry form`, async () => {
      const res = await request(app).get(path);
      expect(res.status).toBe(200);
      const html = res.text;
      expect(html).toContain(`<link rel="canonical" href="https://paleontraining.com${path}">`);
      expect(html).toContain(formatMoney(code, CORPORATE_PRICES.accelerator[code]));
      expect(html).toContain('id="buy"');
      expect(html).toContain('id="caForm"');
      expect(html).toContain('data-programme="ai-cyber-accelerator"');
      expect(html).toContain("data-video-placeholder");
      expect(html).toContain("Who should we enrol?");
      expect(html).not.toMatch(/facilitator-led|classroom sessions|live sessions/i);
      expect(html).toContain("14-day money-back guarantee");
      expect(html).toContain("Add CyberSecure Workforce and the AI Workflow Productivity");
      expect(html).toContain("corporate@paleontraining.com");
      expect(html).toContain("+44 7508 823495");
      expect(html).toContain("12 professional modules");
      expect(html.match(/<div class="ca-card"><h3>/g)?.length).toBe(15);
      if (code === "NG") expect(html).toContain("ITF");
      if (code === "ZA") expect(html).toContain("SETA");
    });
  }
});
