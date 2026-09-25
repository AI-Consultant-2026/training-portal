import request from "supertest";
import { createApp } from "../../src/app";

const app = createApp();

describe("Security headers", () => {
  // helmet's default is "no-referrer", which strips the Referer from the embedded YouTube
  // player's requests; YouTube then rejects the embed (onError 153), mostly on phones.
  it("sends the origin as referrer cross-origin so YouTube embeds are accepted", async () => {
    const res = await request(app).get("/api/health");
    expect(res.headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  });

  it("still allows the YouTube frame and script sources in the CSP", async () => {
    const res = await request(app).get("/api/health");
    expect(res.headers["content-security-policy"]).toContain("frame-src 'self' https://www.youtube.com");
  });

  it("lets the browser send Sentry error reports (US and EU ingest hosts)", async () => {
    const res = await request(app).get("/api/health");
    const connectSrc = (res.headers["content-security-policy"] as string).match(/connect-src ([^;]*)/)?.[1] ?? "";
    expect(connectSrc).toContain("https://*.ingest.sentry.io");
    expect(connectSrc).toContain("https://*.ingest.de.sentry.io");
  });
});
