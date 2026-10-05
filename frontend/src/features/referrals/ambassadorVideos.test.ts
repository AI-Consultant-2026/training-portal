import { describe, expect, it } from "vitest";
import { AMBASSADOR_VIDEOS, buildCaption, CaptionPlatform } from "./ambassadorVideos";

const ctx = {
  code: "PLNK7MQ3X",
  shareUrl: "https://paleontraining.com/register?ref=PLNK7MQ3X",
  welcomeBonus: "₦3,000",
  referrerReward: "₦5,000",
};
const PLATFORMS: CaptionPlatform[] = ["whatsapp", "instagram", "short"];

describe("ambassador video captions", () => {
  it.each(AMBASSADOR_VIDEOS.map((v) => [v.file, v] as const))("%s carries the code on every platform", (_, video) => {
    for (const platform of PLATFORMS) {
      const caption = buildCaption(video, platform, ctx);
      expect(caption).toContain(ctx.code);
      // The friend's reward is airtime after payment, never money off a price.
      expect(caption).not.toMatch(/₦[\d,]+ off/i);
    }
    expect(buildCaption(video, "whatsapp", ctx)).toContain(ctx.shareUrl);
  });

  it("keeps TikTok/X captions within X's 280 characters (a link counts as 23)", () => {
    for (const video of AMBASSADOR_VIDEOS) {
      const caption = buildCaption(video, "short", ctx).replace(ctx.shareUrl, "x".repeat(23));
      expect([...caption].length).toBeLessThanOrEqual(280);
    }
  });

  it("states the payment condition wherever the friend's reward is mentioned", () => {
    for (const video of AMBASSADOR_VIDEOS) {
      const caption = buildCaption(video, "whatsapp", ctx);
      expect(caption).toContain("once your first course payment is confirmed");
    }
  });
});
