import bcrypt from "bcryptjs";
import request from "supertest";
import { createApp } from "../../src/app";
import { Partner, User } from "../../src/models";

const app = createApp();

async function createAdmin(email = "jest-admin@example.com") {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({ email, passwordHash, firstName: "Jest", lastName: "Admin", role: "admin" });
}

async function createStudent(email = "jest-student@example.com") {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({ email, passwordHash, firstName: "Jest", lastName: "Student", role: "student" });
}

async function loginAs(email: string, password = "Password123!") {
  const res = await request(app).post("/api/auth/login").send({ email, password });
  return res.body.accessToken as string;
}

describe("Admin partners", () => {
  it("rejects unauthenticated and non-admin callers on every partner route", async () => {
    const student = await createStudent();
    const studentToken = await loginAs(student.email);

    const routes: Array<[string, string]> = [
      ["get", "/api/admin/partners"],
      ["post", "/api/admin/partners"],
      ["patch", "/api/admin/partners/00000000-0000-0000-0000-000000000000"],
      ["delete", "/api/admin/partners/00000000-0000-0000-0000-000000000000"],
    ];

    for (const [method, url] of routes) {
      const anonRes = await (request(app) as any)[method](url);
      expect(anonRes.status).toBe(401);

      const studentRes = await (request(app) as any)[method](url).set(
        "Authorization",
        `Bearer ${studentToken}`,
      );
      expect(studentRes.status).toBe(403);
    }
  });

  it("creates, lists, updates, and deletes a partner as admin", async () => {
    const admin = await createAdmin();
    const token = await loginAs(admin.email);

    const createRes = await request(app)
      .post("/api/admin/partners")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Job Board",
        category: "Job Board",
        sector: "General",
        contact: "hello@testjobboard.com",
      });

    expect(createRes.status).toBe(201);
    expect(createRes.body.partner).toMatchObject({
      name: "Test Job Board",
      category: "Job Board",
      status: "not-started",
    });
    const partnerId = createRes.body.partner.id;

    const listRes = await request(app)
      .get("/api/admin/partners")
      .set("Authorization", `Bearer ${token}`);
    expect(listRes.status).toBe(200);
    expect(listRes.body.partners).toHaveLength(1);

    const updateRes = await request(app)
      .patch(`/api/admin/partners/${partnerId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "sent", lastContacted: "2026-08-27" });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body.partner).toMatchObject({ status: "sent", lastContacted: "2026-08-27" });

    const stored = await Partner.findByPk(partnerId);
    expect(stored?.status).toBe("sent");

    const deleteRes = await request(app)
      .delete(`/api/admin/partners/${partnerId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(deleteRes.status).toBe(204);

    expect(await Partner.findByPk(partnerId)).toBeNull();
  });

  it("rejects an invalid category or status", async () => {
    const admin = await createAdmin();
    const token = await loginAs(admin.email);

    const res = await request(app)
      .post("/api/admin/partners")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Bad Partner", category: "Not A Real Category" });

    expect(res.status).toBe(400);
  });

  it("rejects creating a partner without a name", async () => {
    const admin = await createAdmin();
    const token = await loginAs(admin.email);

    const res = await request(app)
      .post("/api/admin/partners")
      .set("Authorization", `Bearer ${token}`)
      .send({ category: "Job Board" });

    expect(res.status).toBe(400);
  });
});
