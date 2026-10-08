import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { User, ZoomAttendee } from "../../src/models";

const app = createApp();

const valid = { name: "Chiamaka Okafor", email: "Chiamaka.Okafor@example.com", dateAttended: "2026-10-10" };

async function adminToken() {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  await User.create({ email: "zoom-admin@example.com", passwordHash, firstName: "Ad", lastName: "Min", role: "admin" });
  const res = await request(app).post("/api/auth/login").send({ email: "zoom-admin@example.com", password: "Password123!" });
  return res.body.accessToken as string;
}

describe("Zoom attendance register", () => {
  it("serves the page at /Zooom-Attendees (any case) with its script and images", async () => {
    for (const path of ["/Zooom-Attendees", "/zooom-attendees", "/Zoom-Attendees"]) {
      const res = await request(app).get(path);
      expect(res.status).toBe(200);
      expect(res.text).toContain('value="2026-10-10"');
      expect(res.text).toContain('content="noindex, nofollow"');
      expect(res.text).not.toMatch(/<script>(?!\s*<\/script>)/);
    }
    expect((await request(app).get("/zoom-attendees.js")).status).toBe(200);
    expect((await request(app).get("/images/zoom-attendees/nigerian-students-flag.jpg")).status).toBe(200);
  });

  it("records an attendee with only the required fields", async () => {
    const res = await request(app).post("/api/zoom-attendees").send(valid);
    expect(res.status).toBe(201);
    const row = await ZoomAttendee.findByPk(res.body.id);
    expect(row).toMatchObject({ email: "chiamaka.okafor@example.com", dateAttended: "2026-10-10", status: null });
  });

  it("accepts the optional status, WhatsApp number and updates opt-in", async () => {
    const res = await request(app)
      .post("/api/zoom-attendees")
      .send({ ...valid, status: "NYSC member", phone: "0803 123 4567", wantsUpdates: true });
    expect(res.status).toBe(201);
    expect(await ZoomAttendee.findByPk(res.body.id)).toMatchObject({ status: "NYSC member", wantsUpdates: true });
  });

  it("treats blank optional fields as not given", async () => {
    const res = await request(app).post("/api/zoom-attendees").send({ ...valid, phone: "", status: "", website: "" });
    expect(res.status).toBe(201);
  });

  it("updates rather than duplicates a second sign-in for the same session", async () => {
    await request(app).post("/api/zoom-attendees").send(valid);
    const again = await request(app)
      .post("/api/zoom-attendees")
      .send({ ...valid, email: "chiamaka.okafor@EXAMPLE.com", status: "Graduate" });
    expect(again.status).toBe(200);
    expect(again.body.alreadyRegistered).toBe(true);
    expect(await ZoomAttendee.count()).toBe(1);

    await request(app).post("/api/zoom-attendees").send(valid);
    expect(await ZoomAttendee.findOne()).toMatchObject({ status: "Graduate" });

    const otherSession = await request(app).post("/api/zoom-attendees").send({ ...valid, dateAttended: "2026-10-17" });
    expect(otherSession.status).toBe(201);
  });

  it.each([
    ["a missing name", { ...valid, name: "" }],
    ["a bad email", { ...valid, email: "nope" }],
    ["a bad date", { ...valid, dateAttended: "10/10/2026" }],
    ["an unknown status", { ...valid, status: "Lecturer" }],
    ["a filled honeypot", { ...valid, website: "http://spam.example" }],
  ])("rejects %s", async (_label, body) => {
    expect((await request(app).post("/api/zoom-attendees").send(body)).status).toBe(400);
  });

  it("lists and deletes attendees for admins only", async () => {
    const created = await request(app).post("/api/zoom-attendees").send(valid);
    expect((await request(app).get("/api/admin/zoom-attendees")).status).toBe(401);

    const token = await adminToken();
    const list = await request(app).get("/api/admin/zoom-attendees").set("Authorization", `Bearer ${token}`);
    expect(list.status).toBe(200);
    expect(list.body.attendees).toHaveLength(1);
    expect(list.body.attendees[0]).toMatchObject({ name: "Chiamaka Okafor", dateAttended: "2026-10-10" });

    const del = await request(app)
      .delete(`/api/admin/zoom-attendees/${created.body.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(del.status).toBe(204);
    expect(await ZoomAttendee.count()).toBe(0);
  });
});
