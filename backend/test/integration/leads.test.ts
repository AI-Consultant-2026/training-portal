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
});
