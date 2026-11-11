import bcrypt from "bcryptjs";
import ExcelJS from "exceljs";
import request from "supertest";
import { createApp } from "../../src/app";
import { EmailCampaign, User } from "../../src/models";
import { runDueScheduledCampaigns } from "../../src/services/emailCampaign.service";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;

async function adminToken() {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  await User.create({ email: "jest-sched@example.com", passwordHash, firstName: "Jest", lastName: "Admin", role: "admin" });
  const res = await request(app).post("/api/auth/login").send({ email: "jest-sched@example.com", password: "Password123!" });
  return res.body.accessToken as string;
}

async function readyCampaign(auth: Record<string, string>): Promise<string> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Contacts");
  sheet.addRow(["Company", "Email", "Subject", "Contact Name"]);
  sheet.addRow(["Acme Ltd", "md@acme.example.com", "Training for {{Company}}", "Ada"]);
  const xlsx = Buffer.from(await workbook.xlsx.writeBuffer());
  const up = await request(app).post("/api/admin/email-campaigns/upload").set(auth).attach("file", xlsx, "acme.xlsx");
  expect(up.status).toBe(201);
  const id = up.body.campaignId as string;
  const patch = await request(app)
    .patch(`/api/admin/email-campaigns/${id}`)
    .set(auth)
    .send({ fromEmail: "corporate@paleontraining.com", bodyTemplate: "Dear {{Contact Name}}, hello." });
  expect(patch.status).toBe(200);
  return id;
}

async function waitForStatus(id: string, status: string) {
  for (let i = 0; i < 50; i++) {
    const c = await EmailCampaign.findByPk(id);
    if (c?.status === status) return c;
    await new Promise((r) => setTimeout(r, 50));
  }
  throw new Error(`campaign never reached ${status}`);
}

describe("Email client scheduled sending", () => {
  beforeEach(() => memAdapter.clear());

  it("queues a draft, refuses past times, and sends it once when due", async () => {
    const token = await adminToken();
    const auth = { Authorization: `Bearer ${token}` };
    const id = await readyCampaign(auth);

    const past = await request(app)
      .put(`/api/admin/email-campaigns/${id}/schedule`)
      .set(auth)
      .send({ sendAt: new Date(Date.now() - 60_000).toISOString() });
    expect(past.status).toBe(400);

    const sendAt = new Date(Date.now() + 5 * 60_000);
    const ok = await request(app).put(`/api/admin/email-campaigns/${id}/schedule`).set(auth).send({ sendAt: sendAt.toISOString() });
    expect(ok.status).toBe(200);
    expect(new Date(ok.body.campaign.scheduledAt).getTime()).toBe(sendAt.getTime());

    // Not due yet: nothing happens.
    expect(await runDueScheduledCampaigns(new Date())).toEqual({ started: 0, failed: 0 });
    expect((await EmailCampaign.findByPk(id))?.status).toBe("draft");

    // Due: starts once, even if the job runs twice.
    const later = new Date(sendAt.getTime() + 1000);
    const [a, b] = await Promise.all([runDueScheduledCampaigns(later), runDueScheduledCampaigns(later)]);
    expect(a.started + b.started).toBe(1);
    const done = await waitForStatus(id, "completed");
    expect(done.scheduledAt).toBeNull();
    expect(memAdapter.sentMessages).toHaveLength(1);
    expect(memAdapter.sentMessages[0].subject).toBe("Training for Acme Ltd");
  });

  it("can cancel a schedule", async () => {
    const token = await adminToken();
    const auth = { Authorization: `Bearer ${token}` };
    const id = await readyCampaign(auth);
    const sendAt = new Date(Date.now() + 5 * 60_000).toISOString();
    await request(app).put(`/api/admin/email-campaigns/${id}/schedule`).set(auth).send({ sendAt });
    const del = await request(app).delete(`/api/admin/email-campaigns/${id}/schedule`).set(auth);
    expect(del.status).toBe(200);
    expect(del.body.campaign.scheduledAt).toBeNull();
    expect(await runDueScheduledCampaigns(new Date(Date.now() + 10 * 60_000))).toEqual({ started: 0, failed: 0 });
  });
});
