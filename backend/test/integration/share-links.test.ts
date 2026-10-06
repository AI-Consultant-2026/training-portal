import fs from "fs";
import path from "path";
import request from "supertest";
import { createApp } from "../../src/app";
import { SHARE_VIDEOS } from "../../src/services/shareLink.service";

const app = createApp();

const VIDEO_DIR = path.join(__dirname, "..", "..", "src", "marketing", "videos", "ambassador");

async function ambassadorCode(email: string, firstName: string): Promise<string> {
  await request(app).post("/api/auth/register").send({ email, password: "Password123!", firstName, lastName: "Student" });
  const login = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
  const me = await request(app).get("/api/referrals/me").set("Authorization", `Bearer ${login.body.accessToken}`);
  return me.body.referral.code as string;
}

function binary(req: request.Test) {
  return req.buffer(true).parse((r, cb) => {
    const chunks: Buffer[] = [];
    r.on("data", (c: Buffer) => chunks.push(c));
    r.on("end", () => cb(null, Buffer.concat(chunks)));
  });
}

// PNG and JPEG keep their pixel size in the header.
function imageSize(buf: Buffer): { width: number; height: number } {
  if (buf.subarray(1, 4).toString() === "PNG") return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  let i = 2;
  while (i < buf.length) {
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xc2) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    i += 2 + buf.readUInt16BE(i + 2);
  }
  throw new Error("no size found");
}

describe("Ambassador share links (2026-10-06)", () => {
  let code: string;

  // test/setup.ts empties the database after every test.
  beforeEach(async () => {
    code = await ambassadorCode("share-links@example.com", "Ada");
  });

  it("serves a share page whose preview image is the card", async () => {
    const res = await request(app).get(`/s/${code}/friend?n=1`);
    expect(res.status).toBe(200);
    expect(res.text).toContain(`<meta property="og:image" content="http://localhost:5173/s/${code}/friend/link.jpg?n=1&amp;v=1">`);
    expect(res.text).toContain('<meta name="twitter:card" content="summary_large_image">');
    expect(res.text).toContain("Ada sent you ₦3,000 airtime");
    expect(res.text).toContain(`href="http://localhost:5173/register?ref=${code}"`);
    expect(res.text).toContain('content="noindex, follow"');
  });

  it("leaves the name out unless the ambassador chose to show it", async () => {
    const res = await request(app).get(`/s/${code}/cyber-security-fundamentals`);
    expect(res.status).toBe(200);
    expect(res.text).not.toContain("Ada");
    expect(res.text).toContain('href="/preview/cyber-security-fundamentals"');
  });

  it("accepts a lower-case code", async () => {
    const res = await request(app).get(`/s/${code.toLowerCase()}/friend`);
    expect(res.status).toBe(200);
  });

  it("draws the link preview at 1200x630 and the downloads at full size", async () => {
    const link = await binary(request(app).get(`/s/${code}/friend/link.jpg?n=1`));
    expect(link.status).toBe(200);
    expect(link.headers["content-type"]).toMatch(/image\/jpeg/);
    expect(imageSize(link.body)).toEqual({ width: 1200, height: 630 });
    // WhatsApp only shows small preview images.
    expect(link.body.length).toBeLessThan(300_000);

    const square = await binary(request(app).get(`/s/${code}/hse-fundamentals/square.png`));
    expect(square.headers["content-type"]).toMatch(/image\/png/);
    expect(imageSize(square.body)).toEqual({ width: 1080, height: 1080 });

    const status = await binary(request(app).get(`/s/${code}/digital-marketing/status.png?download=1`));
    expect(imageSize(status.body)).toEqual({ width: 1080, height: 1920 });
    expect(status.headers["content-disposition"]).toBe(`attachment; filename="paleon-digital-marketing-status-${code}.png"`);
  });

  it("serves a video's share page and preview", async () => {
    const page = await request(app).get(`/s/${code}/v/03-cyber-one-click-bank`);
    expect(page.status).toBe(200);
    expect(page.text).toContain('src="/videos/ambassador/03-cyber-one-click-bank.mp4"');
    expect(page.text).toContain(`/s/${code}/v/03-cyber-one-click-bank/link.jpg?v=1`);

    const image = await binary(request(app).get(`/s/${code}/v/03-cyber-one-click-bank/link.jpg`));
    expect(image.status).toBe(200);
    expect(imageSize(image.body)).toEqual({ width: 1200, height: 630 });
  });

  it("404s unknown codes, designs, formats and videos", async () => {
    expect((await request(app).get("/s/PLNZZZZZZ/friend")).status).toBe(404);
    expect((await request(app).get("/s/not-a-code/friend")).status).toBe(404);
    expect((await request(app).get(`/s/${code}/nope`)).status).toBe(404);
    expect((await request(app).get(`/s/${code}/friend/square.jpg`)).status).toBe(404);
    expect((await request(app).get(`/s/${code}/friend/link.png`)).status).toBe(404);
    expect((await request(app).get(`/s/${code}/v/99-nope`)).status).toBe(404);
  });

  it("has a share title for every shipped video", () => {
    const shipped = fs.readdirSync(VIDEO_DIR).filter((f) => f.endsWith(".mp4")).map((f) => f.replace(/\.mp4$/, ""));
    expect(Object.keys(SHARE_VIDEOS).sort()).toEqual(shipped.sort());
  });
});
