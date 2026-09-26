import request from "supertest";
import { createApp } from "../../src/app";

// Meta Business domain verification for paleontraining.com (2026-09-26). Meta re-checks
// the tag periodically, so removing it un-verifies the domain.
describe("Facebook domain verification", () => {
  it("serves the verification meta tag inside <head> on the home page", async () => {
    const app = createApp();
    for (const path of ["/", "/welcome"]) {
      const res = await request(app).get(path);
      expect(res.status).toBe(200);
      const head = res.text.slice(0, res.text.indexOf("</head>"));
      expect(head).toContain('<meta name="facebook-domain-verification" content="ve6zluduyln37gyt3nx9nrrqyfl8tz" />');
    }
  });
});
