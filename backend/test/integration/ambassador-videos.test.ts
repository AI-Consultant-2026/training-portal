import fs from "fs";
import path from "path";
import request from "supertest";
import { createApp } from "../../src/app";

const app = createApp();

const VIDEO_DIR = path.join(__dirname, "..", "..", "src", "marketing", "videos", "ambassador");

describe("Ambassador video pack files (2026-10-05)", () => {
  it("serves a video with Range support and a poster image", async () => {
    const video = await request(app).get("/videos/ambassador/01-gis-good-cgpa.mp4").set("Range", "bytes=0-99");
    expect(video.status).toBe(206);
    expect(video.headers["content-type"]).toMatch(/video\/mp4/);
    expect(video.headers["content-disposition"]).toBeUndefined();

    const poster = await request(app).get("/videos/ambassador/01-gis-good-cgpa.jpg");
    expect(poster.status).toBe(200);
    expect(poster.headers["content-type"]).toMatch(/image\/jpeg/);
  });

  it("sends a download when asked", async () => {
    const res = await request(app).get("/videos/ambassador/03-cyber-one-click-bank.mp4?download=1").set("Range", "bytes=0-9");
    expect(res.headers["content-disposition"]).toBe('attachment; filename="paleon-03-cyber-one-click-bank.mp4"');
  });

  it("only serves whitelisted file names", async () => {
    const res = await request(app).get("/videos/ambassador/..%2F..%2Fapp.ts");
    expect(res.status).not.toBe(200);
  });

  // frontend/src/features/referrals/ambassadorVideos.ts lists these 10 by name; the
  // backend container can't see the frontend source, so this pins the shipped set instead.
  it("ships 10 videos, each with a poster", () => {
    const videos = fs.readdirSync(VIDEO_DIR).filter((f) => f.endsWith(".mp4"));
    expect(videos).toHaveLength(10);
    for (const file of videos) {
      expect(fs.existsSync(path.join(VIDEO_DIR, file.replace(/\.mp4$/, ".jpg")))).toBe(true);
    }
  });
});
