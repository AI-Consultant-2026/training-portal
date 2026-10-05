import { execFileSync } from "child_process";
import fs from "fs";
import os from "os";
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

describe("Personalised ambassador videos (2026-10-05)", () => {
  async function studentToken(email: string, firstName = "Ada") {
    await request(app)
      .post("/api/auth/register")
      .send({ email, password: "Password123!", firstName, lastName: "Student" });
    const res = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
    return res.body.accessToken as string;
  }

  function getVideo(url: string, token: string) {
    return request(app)
      .get(url)
      .set("Authorization", `Bearer ${token}`)
      .buffer(true)
      .parse((r, cb) => {
        const chunks: Buffer[] = [];
        r.on("data", (chunk) => chunks.push(chunk));
        r.on("end", () => cb(null, Buffer.concat(chunks)));
      });
  }

  function probeDuration(file: string): number {
    return Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString());
  }

  it("requires auth", async () => {
    const res = await request(app).get("/api/referrals/me/videos/01-gis-good-cgpa");
    expect(res.status).toBe(401);
  });

  it("404s for a video that isn't in the pack", async () => {
    const token = await studentToken("video-404@example.com");
    const res = await request(app).get("/api/referrals/me/videos/99-not-a-video").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

  it("returns the full-length video, cleanly joined, named with the ambassador's code", async () => {
    const token = await studentToken("video-ok@example.com");
    const me = await request(app).get("/api/referrals/me").set("Authorization", `Bearer ${token}`);
    const code = me.body.referral.code as string;

    const res = await getVideo("/api/referrals/me/videos/03-cyber-one-click-bank", token);
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/video\/mp4/);
    expect(res.headers["content-disposition"]).toBe(`attachment; filename="paleon-03-cyber-one-click-bank-${code}.mp4"`);

    const out = path.join(os.tmpdir(), `jest-personalised-${Date.now()}.mp4`);
    fs.writeFileSync(out, res.body as Buffer);
    try {
      const stock = probeDuration(path.join(VIDEO_DIR, "03-cyber-one-click-bank.mp4"));
      expect(Math.abs(probeDuration(out) - stock)).toBeLessThan(0.1);
      // Decoding the whole file reports nothing: no timestamp or bitstream errors at the join.
      const errors = execFileSync("ffmpeg", ["-v", "error", "-i", out, "-f", "null", "-"], {
        stdio: ["ignore", "pipe", "pipe"],
      }).toString();
      expect(errors).toBe("");
    } finally {
      fs.rmSync(out, { force: true });
    }
  }, 60_000);
});
