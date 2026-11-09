import request from "supertest";
import { createApp } from "../../src/app";
import { TRAINER_STANDARDS } from "../../src/views/trainerStandards";
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
    expect(res.text).toContain('id="trainers-title">How we choose our trainers</h2>');
    for (const s of TRAINER_STANDARDS) expect(res.text).toContain(`<h3>${s.h}</h3>`);
    expect(res.text).toContain("we send you your lead trainer's profile");
    expect(res.text.match(/id="trainers"/g)).toHaveLength(1);
  });

  it("answers the trainer question in the homepage FAQ and its schema", async () => {
    const res = await request(app).get("/");
    expect(res.text).toContain("Who delivers the training, and what qualifications do your trainers have?");
    expect(res.text).toContain('"name":"Who delivers the training, and what qualifications do your trainers have?"');
  });

  it("does not name or invent individual trainers", () => {
    const all = JSON.stringify(TRAINER_STANDARDS);
    expect(all).not.toMatch(/\b(CISSP|CISM)\b holder|years of experience/i);
  });
});
