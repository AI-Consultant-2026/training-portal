import request from "supertest";
import { createApp } from "../../src/app";
import { TRAINERS, TRAINER_STANDARDS } from "../../src/views/trainerStandards";
import { PROGRAMMES } from "../../src/views/directorResources";
import { COUNTRIES, MARKET_ORDER } from "../../src/constants/countries";

const app = createApp();

describe("How we choose our trainers", () => {
  const pages = [
    "/",
    "/za/corporate-training",
    "/ke/corporate-training",
    "/gh/corporate-training",
    "/ng/corporate-training",
    ...MARKET_ORDER.flatMap((c) => Object.values(PROGRAMMES).map((p) => `${COUNTRIES[c].site.path}/${p.slug}`)),
  ];

  it.each(pages)("shows the trainer standards on %s", async (path) => {
    const res = await request(app).get(path);
    expect(res.status).toBe(200);
    expect(res.text).toContain('id="trainers-title">Meet our trainers</h2>');
    expect(res.text).toContain('<h3 class="tr-sub">How we choose our trainers</h3>');
    expect(res.text).toContain('<h3 id="tr-ken-uwotu">Ken Uwotu</h3>');
    expect(res.text).toContain("Master&#39;s degree with Distinction, Business Information Technology".replace("&#39;", "'"));
    expect(res.text).toContain('src="/images/team/ken-uwotu.jpg"');
    for (const s of TRAINER_STANDARDS) expect(res.text).toContain(`<h3>${s.h}</h3>`);
    expect(res.text).toContain("we send you your lead trainer's profile");
    expect(res.text.match(/id="trainers"/g)).toHaveLength(1);
  });

  it("answers the trainer question in the homepage FAQ and its schema", async () => {
    const res = await request(app).get("/");
    expect(res.text).toContain("Who delivers the training, and what qualifications do your trainers have?");
    expect(res.text).toContain('"name":"Who delivers the training, and what qualifications do your trainers have?"');
  });

  it("serves the trainer photo and lists Ken as a Person in the homepage schema", async () => {
    const img = await request(app).get("/images/team/ken-uwotu.jpg");
    expect(img.status).toBe(200);
    expect(img.headers["content-type"]).toBe("image/jpeg");
    expect((await request(app).get("/images/team/..%2Fapp.ts")).status).toBe(404);
    const res = await request(app).get("/");
    expect(res.text).toContain('"@type":"Person","@id":"https://paleontraining.com/#ken-uwotu"');
    expect(res.text).toContain('"sameAs":["https://www.linkedin.com/in/ken-uwotu-b687911a1/"]');
    expect(TRAINERS.map((t) => t.name)).toEqual(["Ken Uwotu"]);
  });

  it("does not name or invent individual trainers", () => {
    const all = JSON.stringify(TRAINER_STANDARDS);
    expect(all).not.toMatch(/\b(CISSP|CISM)\b holder|years of experience/i);
  });
});
