import fs from "fs";
import path from "path";
import request from "supertest";
import { createApp } from "../../src/app";
import { FIRST_LESSON_VIDEOS } from "../../src/views/corporateOffers";

// Module 1, Lesson 1 (v2) on every country's corporate course page, just under the
// "Company onboarding" line in the hero (owner, 2026-11-26).
const app = createApp();
const PAGES = [
  ["corporate-training/cybersecure-workforce", "cybersecure"],
  ["corporate-training/ai-workflow-productivity", "ai-workflow"],
  ["corporate-training/ai-cybersecurity-professional-accelerator", "accelerator"],
] as const;

describe("Module 1, Lesson 1 videos on the corporate course pages", () => {
  it("shows each programme's lesson right under the onboarding line, in all four countries", async () => {
    for (const cc of ["ng", "za", "ke", "gh"]) {
      for (const [slug, programme] of PAGES) {
        const html = (await request(app).get(`/${cc}/${slug}`)).text;
        const hero = html.slice(html.indexOf('id="top"'), html.indexOf("</section>", html.indexOf('id="top"')));
        expect(hero).toMatch(new RegExp(`Individual places bought online start today\\.</p>\\s*<figure class="ca-video ca-lesson-video" data-first-lesson-video="${programme}">`));
        expect(hero).toContain(`/videos/corporate/${FIRST_LESSON_VIDEOS[programme].slug}.mp4`);
        expect(html.match(/data-first-lesson-video=/g)).toHaveLength(1);
      }
    }
  });

  it("serves every lesson video and poster", async () => {
    for (const { slug } of Object.values(FIRST_LESSON_VIDEOS)) {
      for (const ext of ["mp4", "jpg"]) {
        expect(fs.existsSync(path.join(__dirname, "../../src/marketing/videos/corporate", `${slug}.${ext}`))).toBe(true);
        const res = await request(app).get(`/videos/corporate/${slug}.${ext}`).set("Range", "bytes=0-99");
        expect([200, 206]).toContain(res.status);
      }
    }
  });
});
