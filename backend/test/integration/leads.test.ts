import request from "supertest";
import { createApp } from "../../src/app";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";
import { config } from "../../src/config";

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;

const validLead = {
  name: "Amara Chukwu",
  email: "amara.chukwu@example.com",
  course: "GIS and Drone Mapping",
};

describe("Leads", () => {
  it("creates a lead and sends a notification email", async () => {
    const res = await request(app).post("/api/leads").send(validLead);

    expect(res.status).toBe(201);
    expect(res.body.id).toEqual(expect.any(String));

    expect(memAdapter.sentMessages).toHaveLength(1);
    expect(memAdapter.sentMessages[0]).toMatchObject({
      to: config.leadsNotifyEmail,
      subject: expect.stringContaining(validLead.course),
    });
  });

  it("rejects a submission with an invalid email", async () => {
    const res = await request(app).post("/api/leads").send({ ...validLead, email: "not-an-email" });

    expect(res.status).toBe(400);
  });

  it("rejects a submission missing a name", async () => {
    const res = await request(app).post("/api/leads").send({ ...validLead, name: "" });

    expect(res.status).toBe(400);
  });

  it("accepts and persists a university and source from the allow-lists, included in the notification email", async () => {
    const res = await request(app)
      .post("/api/leads")
      .send({ ...validLead, university: "University of Lagos", source: "NYSC Camp" });

    expect(res.status).toBe(201);

    expect(memAdapter.sentMessages[0].text).toContain("University: University of Lagos");
    expect(memAdapter.sentMessages[0].text).toContain("Heard about us via: NYSC Camp");
  });

  it("rejects a university that isn't on the allow-list", async () => {
    const res = await request(app)
      .post("/api/leads")
      .send({ ...validLead, university: "Not A Real University" });

    expect(res.status).toBe(400);
  });

  it("rejects a source that isn't on the allow-list", async () => {
    const res = await request(app).post("/api/leads").send({ ...validLead, source: "Carrier Pigeon" });

    expect(res.status).toBe(400);
  });

  it("accepts an optional phone number and includes it in the notification email", async () => {
    const res = await request(app).post("/api/leads").send({ ...validLead, phone: "0801 234 5678" });

    expect(res.status).toBe(201);
    expect(memAdapter.sentMessages[0].text).toContain("Phone: 0801 234 5678");
  });

  it("still creates a lead when phone is omitted entirely", async () => {
    const res = await request(app).post("/api/leads").send(validLead);

    expect(res.status).toBe(201);
    expect(memAdapter.sentMessages[0].text).not.toContain("Phone:");
  });

  it("rejects a phone number that's obviously not one", async () => {
    const res = await request(app).post("/api/leads").send({ ...validLead, phone: "call me maybe" });

    expect(res.status).toBe(400);
  });
});
