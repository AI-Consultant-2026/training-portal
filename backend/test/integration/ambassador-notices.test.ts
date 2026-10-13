import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { AmbassadorNotice, User } from "../../src/models";

const app = createApp();

async function tokenFor(role: "admin" | "student", email: string) {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  await User.create({ email, passwordHash, firstName: "Test", lastName: "User", role });
  const res = await request(app).post("/api/auth/login").send({ email, password: "Password123!" });
  return res.body.accessToken as string;
}

const zoomNotice = {
  title: "Ambassadors Hour on Zoom",
  body: "Meeting ID: 881 3248 8948\nPasscode: 695936",
  linkUrl: "https://us06web.zoom.us/j/88132488948",
  linkLabel: "Join Zoom meeting",
  expiresAt: "2099-10-17T14:30:00Z",
};

describe("Ambassador notice board", () => {
  it("requires login to read notices", async () => {
    expect((await request(app).get("/api/referrals/notices")).status).toBe(401);
  });

  it("shows ambassadors unexpired notices, newest first", async () => {
    await AmbassadorNotice.create({ title: "Old news", body: "Gone", expiresAt: new Date("2020-01-01T00:00:00Z") });
    await AmbassadorNotice.create({ title: "No expiry", body: "Stays up" });
    await AmbassadorNotice.create({ ...zoomNotice, expiresAt: new Date(zoomNotice.expiresAt) });
    const token = await tokenFor("student", "amb@example.com");

    const res = await request(app).get("/api/referrals/notices").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.notices.map((n: { title: string }) => n.title)).toEqual([
      "Ambassadors Hour on Zoom",
      "No expiry",
    ]);
    expect(res.body.notices[0].body).toContain("Passcode: 695936");
  });

  it("lets admins create, edit and delete notices", async () => {
    const token = await tokenFor("admin", "notice-admin@example.com");
    const auth = { Authorization: `Bearer ${token}` };

    const created = await request(app).post("/api/admin/notices").set(auth).send(zoomNotice);
    expect(created.status).toBe(201);
    const id = created.body.notice.id;

    const edited = await request(app)
      .patch(`/api/admin/notices/${id}`)
      .set(auth)
      .send({ ...zoomNotice, title: "Ambassadors Hour (updated)", linkUrl: "", linkLabel: "Ignored", expiresAt: "" });
    expect(edited.status).toBe(200);
    expect(edited.body.notice).toMatchObject({
      title: "Ambassadors Hour (updated)",
      linkUrl: null,
      linkLabel: null,
      expiresAt: null,
    });

    const all = await request(app).get("/api/admin/notices").set(auth);
    expect(all.body.notices).toHaveLength(1);

    expect((await request(app).delete(`/api/admin/notices/${id}`).set(auth)).status).toBe(204);
    expect(await AmbassadorNotice.count()).toBe(0);
  });

  it("rejects bad input and non-admins", async () => {
    const admin = await tokenFor("admin", "notice-admin2@example.com");
    const bad = await request(app)
      .post("/api/admin/notices")
      .set("Authorization", `Bearer ${admin}`)
      .send({ ...zoomNotice, linkUrl: "javascript:alert(1)" });
    expect(bad.status).toBe(400);

    const student = await tokenFor("student", "amb2@example.com");
    const forbidden = await request(app)
      .post("/api/admin/notices")
      .set("Authorization", `Bearer ${student}`)
      .send(zoomNotice);
    expect(forbidden.status).toBe(403);
  });
});
