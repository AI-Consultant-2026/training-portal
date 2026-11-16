import { WEEKS } from "../../src/seeders/data/curriculumDataAnalytics";

// Data Analytics & BI: 36 two-part lessons, 2 a day (merged from 72 on 2026-11-15).
describe("Data Analytics & BI curriculum", () => {
  const lessons = WEEKS.flatMap((w) => w.lessons.map((l) => ({ day: w.weekNumber, ...l })));

  it("has 18 days of 2 lessons each, 36 in all", () => {
    expect(WEEKS).toHaveLength(18);
    for (const w of WEEKS) expect(w.lessons.map((l) => l.order)).toEqual([1, 2]);
    expect(lessons).toHaveLength(36);
  });

  it("keeps every part of the merged lessons: both videos, all sections, 10 knowledge-check questions", () => {
    for (const l of lessons) {
      expect(l.videoUrl).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=/);
      expect(l.resources?.links[0].url).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=/);
      expect(l.resources?.links[0].url).not.toBe(l.videoUrl);
      for (const heading of ["## Lesson introduction", "### Part 1: ", "### Part 2: ", "## Practical exercises", "## Knowledge check"]) {
        expect(l.content).toContain(heading);
      }
      const check = l.content.split("## Knowledge check")[1].split("\n## ")[0];
      expect(check.match(/^\d+\. /gm)).toHaveLength(10);
    }
  });

  it("only refers to lessons that exist", () => {
    const text = JSON.stringify(WEEKS);
    for (const [, day, n] of text.matchAll(/Lesson (\d+)\.(\d+)/g)) {
      expect(Number(day)).toBeLessThanOrEqual(18);
      expect(Number(n)).toBeLessThanOrEqual(2);
    }
  });

  it("keeps the daily question banks (30 a day, 20 on the capstone day)", () => {
    for (const w of WEEKS) expect(w.quizQuestions).toHaveLength(w.weekNumber === 18 ? 20 : 30);
  });

  it("has an accessible illustration under each part heading (two per lesson)", () => {
    for (const l of lessons) {
      const paras = l.content.split("\n\n");
      expect(l.images).toHaveLength(2);
      l.images!.forEach((img, i) => {
        expect(img.url).toMatch(/^data:image\/svg\+xml;base64,/);
        const svg = Buffer.from(img.url.split(",")[1], "base64").toString("utf8");
        expect(svg).toMatch(/role="img" aria-labelledby="t"/);
        expect(svg).toMatch(/<title id="t">[^<]{20,}<\/title>/);
        expect(img.caption.length).toBeGreaterThan(20);
        const heading = paras.findIndex((p) => p.startsWith(`### Part ${i + 1}: `));
        expect(img.afterParagraph).toBeGreaterThanOrEqual(heading);
        expect(img.afterParagraph).toBeLessThanOrEqual(heading + 1);
      });
    }
  });
});
