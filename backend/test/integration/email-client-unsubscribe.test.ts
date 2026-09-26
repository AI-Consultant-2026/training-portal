import bcrypt from "bcryptjs";
import ExcelJS from "exceljs";
import request from "supertest";
import { createApp } from "../../src/app";
import { EmailCampaign, EmailCampaignRecipient, EmailUnsubscribe, Lead, User } from "../../src/models";
import {
  buildEmailForRecipient,
  processCampaignSend,
  setRecipientSelected,
  uploadCampaign,
} from "../../src/services/emailCampaign.service";
import { emailUnsubscribeUrl } from "../../src/services/emailUnsubscribe.service";
import { emailAdapter, MemoryEmailAdapter } from "../../src/utils/email";

const app = createApp();
const memAdapter = emailAdapter as MemoryEmailAdapter;

async function createAdmin() {
  const passwordHash = await bcrypt.hash("Password123!", 4);
  return User.create({ email: "jest-admin@example.com", passwordHash, firstName: "Jest", lastName: "Admin", role: "admin" });
}

async function spreadsheet(emails: string[]): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Contacts");
  sheet.addRow(["Company", "Email", "Subject", "Contact Name"]);
  emails.forEach((email, i) => sheet.addRow([`Company ${i}`, email, "Hello", `Contact ${i}`]));
  return Buffer.from(await workbook.xlsx.writeBuffer());
}

function unsubscribePath(email: string): string {
  return new URL(emailUnsubscribeUrl(email)).pathname + new URL(emailUnsubscribeUrl(email)).search;
}

describe("Email client unsubscribe", () => {
  it("adds an unsubscribe footer and List-Unsubscribe headers to every campaign email", () => {
    const msg = buildEmailForRecipient(
      { fromEmail: "hello@paleontraining.com", bodyTemplate: "Hi {{Contact Name}}, try a free lesson." },
      { email: "Ada@Example.com", company: "Uni", contactName: "Ada", subject: "Hello" },
    );
    const url = emailUnsubscribeUrl("ada@example.com");
    expect(url).toMatch(/\/api\/email\/unsubscribe\?e=[\w-]+&t=[\w-]{32}$/);
    expect(msg.text).toContain(`unsubscribe here: ${url}`);
    expect(msg.html).toContain(">Unsubscribe</a>");
    expect(msg.html.trim().endsWith("</div>")).toBe(true);
    expect(msg.headers?.["List-Unsubscribe"]).toBe(`<${url}>`);
    expect(msg.headers?.["List-Unsubscribe-Post"]).toBe("List-Unsubscribe=One-Click");
  });

  it("records the opt-out from the link, and stops lead follow-ups for the same address", async () => {
    await Lead.create({ name: "Ada Obi", email: "Ada@Example.com", course: "HSE Fundamentals" });

    const res = await request(app).get(unsubscribePath("ada@example.com"));

    expect(res.status).toBe(200);
    expect(res.text).toContain("You're unsubscribed");
    expect(await EmailUnsubscribe.count({ where: { email: "ada@example.com" } })).toBe(1);
    const lead = await Lead.findOne({ where: { email: "Ada@Example.com" } });
    expect(lead?.unsubscribedAt).toBeInstanceOf(Date);

    // Clicking twice (or a mail app's one-click POST after the click) is harmless.
    const again = await request(app).post(unsubscribePath("ada@example.com"));
    expect(again.status).toBe(200);
    expect(await EmailUnsubscribe.count()).toBe(1);
  });

  it("rejects a tampered link without recording anything", async () => {
    const path = unsubscribePath("ada@example.com");
    const otherEmail = Buffer.from("someone@example.com").toString("base64url");
    const res = await request(app).get(path.replace(/e=[^&]+/, `e=${otherEmail}`));
    expect(res.status).toBe(400);
    expect(res.text).toContain("isn't valid");
    expect(await EmailUnsubscribe.count()).toBe(0);
  });

  it("marks opted-out addresses as unsubscribed at upload, unselected and unselectable", async () => {
    const admin = await createAdmin();
    await EmailUnsubscribe.create({ email: "optout@example.com", source: "email-client" });
    await Lead.create({ name: "Lead", email: "lead@example.com", course: "HSE Fundamentals", unsubscribedAt: new Date() });

    const summary = await uploadCampaign(admin.id, {
      originalname: "contacts.xlsx",
      buffer: await spreadsheet(["OptOut@example.com", "lead@example.com", "fine@example.com"]),
    });

    expect(summary).toMatchObject({ imported: 3, valid: 1, invalid: 2, duplicates: 0 });
    const rows = await EmailCampaignRecipient.findAll({ where: { campaignId: summary.campaignId }, order: [["rowNumber", "ASC"]] });
    expect(rows.map((r) => [r.email, r.status, r.isSelected])).toEqual([
      ["OptOut@example.com", "unsubscribed", false],
      ["lead@example.com", "unsubscribed", false],
      ["fine@example.com", "pending", true],
    ]);
    await expect(setRecipientSelected(summary.campaignId, rows[0].id, true)).rejects.toThrow(/unsubscribed/);
  });

  it("skips an address that unsubscribed after upload, and still sends to everyone else", async () => {
    const admin = await createAdmin();
    const summary = await uploadCampaign(admin.id, {
      originalname: "contacts.xlsx",
      buffer: await spreadsheet(["late@example.com", "fine@example.com"]),
    });
    await EmailCampaign.update(
      { fromEmail: "hello@paleontraining.com", bodyTemplate: "Hi {{Contact Name}}", status: "sending" },
      { where: { id: summary.campaignId } },
    );
    await EmailCampaignRecipient.update({ status: "queued" }, { where: { campaignId: summary.campaignId } });
    await request(app).get(unsubscribePath("late@example.com")).expect(200);

    await processCampaignSend(summary.campaignId);

    expect(memAdapter.sentMessages.map((m) => m.to)).toEqual(["fine@example.com"]);
    const late = await EmailCampaignRecipient.findOne({ where: { campaignId: summary.campaignId, email: "late@example.com" } });
    expect(late?.status).toBe("unsubscribed");
    const campaign = await EmailCampaign.findByPk(summary.campaignId);
    expect(campaign).toMatchObject({ status: "completed", sentCount: 1, failedCount: 0 });
  });
});
