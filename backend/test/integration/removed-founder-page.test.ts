import request from "supertest";
import { createApp } from "../../src/app";

const app = createApp();

describe("Removed founder page", () => {
  it("redirects the old bio URL to the home page instead of serving it", async () => {
    const res = await request(app).get("/about/ken-uwotu");
    expect(res.status).toBe(301);
    expect(res.headers.location).toBe("/welcome");
  });

  it("no longer serves the founder photo", async () => {
    const res = await request(app).get("/images/ken-uwotu.jpg");
    expect(res.status).toBe(404);
  });

  it("no longer links to the founder page from the welcome page", async () => {
    const res = await request(app).get("/welcome");
    expect(res.status).toBe(200);
    expect(res.text).not.toMatch(/ken-uwotu|About the Founder|Founded by/i);
  });
});
