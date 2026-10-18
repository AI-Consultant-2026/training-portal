import bcrypt from "bcryptjs";
import ExcelJS from "exceljs";
import request from "supertest";
import { createApp } from "../../src/app";
import { EmailCampaign, EmailCampaignRecipient, User } from "../../src/models";
import { processCampaignSend } from "../../src/services/emailCampaign.service";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;
const PDF = Buffer.from("%PDF-1.4\n% test letter\n");

async function adminToken() {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  await User.create({ email: "jest-admin@example.com", passwordHash, firstName: "Jest", lastName: "Admin", role: "admin" });
  const res = await request(app).post("/api/auth/login").send({ email: "jest-admin@example.com", password: "Password123!" });
  return res.body.accessToken as string;
}

async function createCampaign(token: string): Promise<string> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Contacts");
  sheet.addRow(["Company", "Email", "Subject", "Contact Name"]);
  sheet.addRow(["NCDMB", "info@ncdmb.example.com", "Partnership proposal", "Executive Secretary"]);
  const xlsx = Buffer.from(await workbook.xlsx.writeBuffer());
  const res = await request(app)
    .post("/api/admin/email-campaigns/upload")
    .set("Authorization", `Bearer ${token}`)
    .attach("file", xlsx, "ncdmb.xlsx");
  expect(res.status).toBe(201);
  return res.body.campaignId as string;
}

describe("Email client attachments and CC", () => {
  beforeEach(() => memAdapter.clear());

  it("sends every email with the campaign's attachments and CC, without exposing the file in the API", async () => {
    const token = await adminToken();
    const id = await createCampaign(token);
    const auth = { Authorization: `Bearer ${token}` };

    const patch = await request(app)
      .patch(`/api/admin/email-campaigns/${id}`)
      .set(auth)
      .send({
        fromEmail: "corporate@paleontraining.com",
        bodyTemplate: "Dear {{Contact Name}}, please find our letter attached.",
        ccEmails: " a@example.com; B@example.com,a@example.com ",
      });
    expect(patch.status).toBe(200);
    expect(patch.body.campaign.ccEmails).toBe("a@example.com, B@example.com");

    const up = await request(app)
      .post(`/api/admin/email-campaigns/${id}/attachments`)
      .set(auth)
      .attach("file", PDF, { filename: "02-ncdmb.pdf", contentType: "application/pdf" });
    expect(up.status).toBe(201);
    expect(up.body.attachment).toMatchObject({ filename: "02-ncdmb.pdf", contentType: "application/pdf", sizeBytes: PDF.length });
    expect(up.body.attachment.data).toBeUndefined();

    const got = await request(app).get(`/api/admin/email-campaigns/${id}`).set(auth);
    expect(got.body.campaign.attachments).toHaveLength(1);
    expect(got.body.campaign.attachments[0].data).toBeUndefined();

    // A test email gets the attachment but never the real CC list.
    const test = await request(app)
      .post(`/api/admin/email-campaigns/${id}/test-email`)
      .set(auth)
      .send({ testEmail: "admin@example.com" });
    expect(test.status).toBe(204);
    expect(memAdapter.sentMessages[0].cc).toBeUndefined();
    expect(memAdapter.sentMessages[0].attachments?.[0].filename).toBe("02-ncdmb.pdf");
    memAdapter.clear();

    await EmailCampaign.update({ status: "sending" }, { where: { id } });
    await EmailCampaignRecipient.update({ status: "queued" }, { where: { campaignId: id } });
    await processCampaignSend(id);

    expect(memAdapter.sentMessages).toHaveLength(1);
    const sent = memAdapter.sentMessages[0];
    expect(sent.to).toBe("info@ncdmb.example.com");
    expect(sent.cc).toBe("a@example.com, B@example.com");
    expect(sent.attachments).toHaveLength(1);
    expect(sent.attachments?.[0]).toMatchObject({ filename: "02-ncdmb.pdf", contentType: "application/pdf" });
    expect(Buffer.compare(sent.attachments![0].content, PDF)).toBe(0);
  });

  it("rejects bad CC addresses, unsupported files, and changes after sending; removes attachments", async () => {
    const token = await adminToken();
    const id = await createCampaign(token);
    const auth = { Authorization: `Bearer ${token}` };

    const badCc = await request(app).patch(`/api/admin/email-campaigns/${id}`).set(auth).send({ ccEmails: "not-an-email" });
    expect(badCc.status).toBe(400);

    const exe = await request(app)
      .post(`/api/admin/email-campaigns/${id}/attachments`)
      .set(auth)
      .attach("file", Buffer.from("MZ"), { filename: "run.exe", contentType: "application/x-msdownload" });
    expect(exe.status).toBe(400);

    const up = await request(app)
      .post(`/api/admin/email-campaigns/${id}/attachments`)
      .set(auth)
      .attach("file", PDF, { filename: "letter.pdf", contentType: "application/pdf" });
    const attachmentId = up.body.attachment.id as string;

    const del = await request(app).delete(`/api/admin/email-campaigns/${id}/attachments/${attachmentId}`).set(auth);
    expect(del.status).toBe(204);
    const again = await request(app).delete(`/api/admin/email-campaigns/${id}/attachments/${attachmentId}`).set(auth);
    expect(again.status).toBe(404);

    await EmailCampaign.update({ status: "completed" }, { where: { id } });
    const late = await request(app)
      .post(`/api/admin/email-campaigns/${id}/attachments`)
      .set(auth)
      .attach("file", PDF, { filename: "letter.pdf", contentType: "application/pdf" });
    expect(late.status).toBe(409);
  });

  it("is admin-only", async () => {
    const res = await request(app).post("/api/admin/email-campaigns/00000000-0000-0000-0000-000000000000/attachments");
    expect(res.status).toBe(401);
  });
});
