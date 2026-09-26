import ExcelJS from "exceljs";
import { Op } from "sequelize";
import { escapeHtml } from "../emails/htmlWrapper";
import { CampaignFromAddress } from "../models/emailCampaign.model";
import { RecipientStatus } from "../models/emailCampaignRecipient.model";
import { EmailCampaign, EmailCampaignRecipient, User } from "../models";
import { ApiError } from "../utils/ApiError";
import { emailAdapter, EmailMessage } from "../utils/email";
import { logger } from "../utils/logger";
import { emailUnsubscribeUrl, findSuppressedEmails } from "./emailUnsubscribe.service";
import { htmlToPlainText, inlineEmailStyles, looksLikeHtml, sanitizeCampaignHtml } from "../utils/email/campaignBodyHtml";

const REQUIRED_COLUMNS = ["Company", "Email", "Subject", "Contact Name"] as const;

// A synchronous single-request parse + one JSON response of the whole recipient list
// (see emailCampaigns.controller.ts) is the simplest thing that works and matches how
// /admin/leads and /admin/partners already work in this app (fetch-everything, no
// pagination). This is the point past which that stops being reasonable -- an admin
// with a bigger list needs to split it into multiple campaigns. Chosen generously above
// what a real partnership/outreach list is likely to contain, not an arbitrary round
// number.
const MAX_ROWS = 2000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SEND_CONCURRENCY = 4;

interface ParsedRow {
  rowNumber: number;
  company: string;
  email: string;
  subject: string;
  contactName: string;
}

export interface UploadSummary {
  campaignId: string;
  imported: number;
  valid: number;
  invalid: number;
  duplicates: number;
}

// Cheap spreadsheet-injection guard: if this value is ever re-exported into a CSV/XLSX
// for the admin to reopen in Excel, a cell starting with =, +, -, or @ can execute as a
// formula in the spreadsheet app. Nothing here re-exports data today, but storing it
// neutralised is free insurance against a future export feature forgetting this itself.
function neutralizeFormulaPrefix(value: string): string {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function cellText(row: ExcelJS.Row, colNumber: number): string {
  const value = row.getCell(colNumber).value;
  if (value == null) return "";
  if (typeof value === "object") {
    const obj = value as unknown as Record<string, unknown>;
    if ("text" in obj) return String(obj.text ?? "").trim();
    if ("result" in obj) return String(obj.result ?? "").trim();
    if ("richText" in obj && Array.isArray(obj.richText)) {
      return (obj.richText as Array<{ text?: string }>).map((t) => t.text ?? "").join("").trim();
    }
  }
  return String(value).trim();
}

async function parseExcelBuffer(buffer: Buffer): Promise<ParsedRow[]> {
  const workbook = new ExcelJS.Workbook();
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- exceljs's bundled
    // Buffer type param doesn't line up with this project's @types/node Buffer; a plain
    // Node Buffer works fine at runtime.
    await workbook.xlsx.load(buffer as any);
  } catch {
    throw ApiError.badRequest("This does not appear to be a valid .xlsx file.");
  }

  const sheet = workbook.worksheets[0];
  if (!sheet) {
    throw ApiError.badRequest("The uploaded spreadsheet has no worksheet.");
  }

  const columnIndex = new Map<string, number>();
  sheet.getRow(1).eachCell((cell, colNumber) => {
    const value = String(cell.value ?? "").trim();
    if (value) columnIndex.set(value, colNumber);
  });

  const missing = REQUIRED_COLUMNS.filter((col) => !columnIndex.has(col));
  if (missing.length > 0) {
    throw ApiError.badRequest(
      `The spreadsheet is missing required column(s): ${missing.join(", ")}. Expected columns: ${REQUIRED_COLUMNS.join(", ")}.`,
    );
  }

  const companyCol = columnIndex.get("Company") as number;
  const emailCol = columnIndex.get("Email") as number;
  const subjectCol = columnIndex.get("Subject") as number;
  const contactNameCol = columnIndex.get("Contact Name") as number;

  const rows: ParsedRow[] = [];
  for (let r = 2; r <= sheet.rowCount; r++) {
    const row = sheet.getRow(r);
    const company = cellText(row, companyCol);
    const email = cellText(row, emailCol);
    const subject = cellText(row, subjectCol);
    const contactName = cellText(row, contactNameCol);

    if (!company && !email && !subject && !contactName) continue; // ignore fully empty rows

    if (rows.length >= MAX_ROWS) {
      throw ApiError.badRequest(
        `This spreadsheet has more than ${MAX_ROWS} contact rows. Split it into files of up to ${MAX_ROWS} rows and upload them as separate campaigns.`,
      );
    }

    rows.push({
      rowNumber: r,
      company: neutralizeFormulaPrefix(company),
      email,
      subject: neutralizeFormulaPrefix(subject),
      contactName: neutralizeFormulaPrefix(contactName),
    });
  }

  return rows;
}

function classifyRow(
  row: ParsedRow,
  seenEmails: Set<string>,
): { status: RecipientStatus; errors: string[] } {
  const errors: string[] = [];
  if (!row.company) errors.push("Company name is missing.");
  if (!row.contactName) errors.push("Contact Name is missing.");
  if (!row.subject) errors.push("Subject is missing.");
  if (!row.email) {
    errors.push("This contact does not have an email address.");
  } else if (!EMAIL_REGEX.test(row.email)) {
    errors.push("This does not appear to be a valid email address.");
  }

  if (errors.length > 0) {
    return { status: "invalid", errors };
  }

  const normalizedEmail = row.email.toLowerCase();
  if (seenEmails.has(normalizedEmail)) {
    return {
      status: "duplicate",
      errors: ["This email address appears more than once in the uploaded spreadsheet."],
    };
  }
  seenEmails.add(normalizedEmail);
  return { status: "pending", errors: [] };
}

export async function uploadCampaign(
  createdBy: string,
  file: { buffer: Buffer; originalname: string },
): Promise<UploadSummary> {
  if (!file.originalname.toLowerCase().endsWith(".xlsx")) {
    throw ApiError.badRequest("Please upload a .xlsx file.");
  }

  const rows = await parseExcelBuffer(file.buffer);
  if (rows.length === 0) {
    throw ApiError.badRequest("The spreadsheet has no contact rows to import.");
  }

  const seenEmails = new Set<string>();
  const suppressed = await findSuppressedEmails(rows.map((r) => r.email));
  let validCount = 0;
  let invalidCount = 0;
  let duplicateCount = 0;

  const recipientRows = rows.map((row) => {
    let { status, errors } = classifyRow(row, seenEmails);
    // Opted-out addresses are unsendable, so they're counted with the invalid rows.
    if ((status === "pending" || status === "duplicate") && suppressed.has(row.email.toLowerCase())) {
      status = "unsubscribed";
      errors = ["This address has unsubscribed from Paleon Training emails."];
    }
    if (status === "pending") validCount++;
    else if (status === "unsubscribed") invalidCount++;
    else if (status === "invalid") invalidCount++;
    else if (status === "duplicate") duplicateCount++;
    return {
      rowNumber: row.rowNumber,
      company: row.company,
      email: row.email,
      contactName: row.contactName,
      subject: row.subject,
      status,
      isSelected: status === "pending",
      validationErrors: errors,
    };
  });

  const campaign = await EmailCampaign.create({
    createdBy,
    originalFilename: file.originalname,
    status: "draft",
    totalRecipients: rows.length,
    validRecipients: validCount,
    invalidRecipients: invalidCount,
    duplicateRecipients: duplicateCount,
  });

  await EmailCampaignRecipient.bulkCreate(
    recipientRows.map((r) => ({ ...r, campaignId: campaign.id })),
  );

  return {
    campaignId: campaign.id,
    imported: rows.length,
    valid: validCount,
    invalid: invalidCount,
    duplicates: duplicateCount,
  };
}

export async function listCampaigns() {
  return EmailCampaign.findAll({
    order: [["createdAt", "DESC"]],
    include: [{ model: User, as: "creator", attributes: ["firstName", "lastName", "email"] }],
  });
}

export async function getCampaign(id: string) {
  const campaign = await EmailCampaign.findByPk(id, {
    include: [
      { model: EmailCampaignRecipient, as: "recipients" },
      { model: User, as: "creator", attributes: ["firstName", "lastName", "email"] },
    ],
  });
  if (!campaign) throw ApiError.notFound("Campaign not found");
  campaign.recipients?.sort((a, b) => a.rowNumber - b.rowNumber);
  return campaign;
}

export interface UpdateCampaignInput {
  fromEmail?: CampaignFromAddress;
  bodyTemplate?: string;
}

export async function updateCampaign(id: string, input: UpdateCampaignInput) {
  const campaign = await EmailCampaign.findByPk(id);
  if (!campaign) throw ApiError.notFound("Campaign not found");
  if (campaign.status !== "draft") {
    throw ApiError.conflict("This campaign has already been sent or is sending, and can no longer be edited.");
  }
  Object.assign(campaign, input);
  await campaign.save();
  return campaign;
}

export async function setRecipientSelected(campaignId: string, recipientId: string, isSelected: boolean) {
  const campaign = await EmailCampaign.findByPk(campaignId);
  if (!campaign) throw ApiError.notFound("Campaign not found");
  if (campaign.status !== "draft") {
    throw ApiError.conflict("This campaign has already been sent or is sending.");
  }
  const recipient = await EmailCampaignRecipient.findOne({ where: { id: recipientId, campaignId } });
  if (!recipient) throw ApiError.notFound("Recipient not found");
  if (isSelected && recipient.status === "invalid") {
    throw ApiError.badRequest("Invalid records cannot be selected for sending.");
  }
  if (isSelected && recipient.status === "unsubscribed") {
    throw ApiError.badRequest("This address has unsubscribed and cannot be selected for sending.");
  }
  recipient.isSelected = isSelected;
  await recipient.save();
  return recipient;
}

// Deletes a campaign and (via ON DELETE CASCADE) its recipient rows / delivery log.
// Allowed for drafts and finished campaigns, but never while a send is in progress --
// the in-process worker would be writing to rows that vanish under it. The status check
// is part of the DELETE itself, so a send that starts at the same moment can't slip past.
export async function deleteCampaign(campaignId: string): Promise<void> {
  const deleted = await EmailCampaign.destroy({
    where: { id: campaignId, status: { [Op.ne]: "sending" } },
  });
  if (deleted > 0) return;
  const campaign = await EmailCampaign.findByPk(campaignId);
  if (!campaign) throw ApiError.notFound("Campaign not found");
  throw ApiError.conflict("This campaign is still sending. Wait until it finishes, then delete it.");
}

export async function removeRecipient(campaignId: string, recipientId: string): Promise<void> {
  const campaign = await EmailCampaign.findByPk(campaignId);
  if (!campaign) throw ApiError.notFound("Campaign not found");
  if (campaign.status !== "draft") {
    throw ApiError.conflict("This campaign has already been sent or is sending.");
  }
  const recipient = await EmailCampaignRecipient.findOne({ where: { id: recipientId, campaignId } });
  if (!recipient) throw ApiError.notFound("Recipient not found");

  const countField =
    recipient.status === "pending"
      ? ("validRecipients" as const)
      : recipient.status === "invalid" || recipient.status === "unsubscribed"
        ? ("invalidRecipients" as const)
        : recipient.status === "duplicate"
          ? ("duplicateRecipients" as const)
          : null;

  await recipient.destroy();
  campaign.totalRecipients -= 1;
  if (countField) campaign[countField] -= 1;
  await campaign.save();
}

function personalize(template: string, vars: { contactName: string; company: string }): string {
  return template
    // Function replacements, so a "$&" / "$1" in a spreadsheet cell is inserted literally
    // instead of being read as a String.replace pattern.
    .replace(/\{\{\s*Contact Name\s*\}\}/gi, () => vars.contactName)
    .replace(/\{\{\s*Company\s*\}\}/gi, () => vars.company);
}

// Escaping happens AFTER personalisation, on the fully merged string -- so a malicious
// value in an uploaded Company/Contact Name cell (e.g. "<script>...") is escaped exactly
// like the admin's own template text, closing off HTML injection via spreadsheet data.
function wrapBodyHtml(inner: string): string {
  return `<div style="font-family: -apple-system, Helvetica, Arial, sans-serif; color: #111827; font-size: 15px; line-height: 1.5;">
${inner}
</div>`;
}

function renderBodyHtml(personalizedText: string): string {
  const paragraphs = personalizedText
    .split(/\n{2,}/)
    .map((para) => escapeHtml(para).replace(/\n/g, "<br>"));
  return wrapBodyHtml(paragraphs.map((p) => `<p style="margin: 0 0 16px;">${p}</p>`).join("\n"));
}

interface RecipientLike {
  email: string;
  company: string;
  contactName: string;
  subject: string;
}

// Every campaign email carries an unsubscribe link and List-Unsubscribe headers (2026-09-26),
// so mail apps can show their own button. The footer is added after the admin's body and is
// not editable from Compose.
function withUnsubscribe(message: EmailMessage): EmailMessage {
  const url = emailUnsubscribeUrl(message.to);
  const footerText = `You're receiving this email from Paleon Training. To stop receiving these emails, unsubscribe here: ${url}`;
  const footerHtml = `<p style="margin: 24px 0 0; padding-top: 12px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">You're receiving this email from Paleon Training. <a href="${escapeHtml(url)}" style="color: #6b7280;">Unsubscribe</a></p>`;
  return {
    ...message,
    text: `${message.text}\n\n--\n${footerText}`,
    // Inside wrapBodyHtml's outer <div>, so the footer picks up the same font.
    html: message.html.replace(/<\/div>\s*$/, `${footerHtml}\n</div>`),
    headers: {
      ...message.headers,
      "List-Unsubscribe": `<${url}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  };
}

export function buildEmailForRecipient(
  campaign: { fromEmail: string; bodyTemplate: string },
  recipient: RecipientLike,
): EmailMessage {
  return withUnsubscribe(buildCampaignBody(campaign, recipient));
}

function buildCampaignBody(
  campaign: { fromEmail: string; bodyTemplate: string },
  recipient: RecipientLike,
): EmailMessage {
  const vars = { contactName: recipient.contactName, company: recipient.company };
  const personalizedSubject = personalize(recipient.subject, vars);

  // Formatted body from the Compose editor: sanitise the admin's markup first, then merge
  // in HTML-escaped spreadsheet values (quotes too, in case a variable sits in a link).
  if (looksLikeHtml(campaign.bodyTemplate)) {
    const escapeValue = (v: string) => escapeHtml(v).replace(/"/g, "&quot;");
    const html = personalize(sanitizeCampaignHtml(campaign.bodyTemplate), {
      contactName: escapeValue(vars.contactName),
      company: escapeValue(vars.company),
    });
    return {
      to: recipient.email,
      subject: personalizedSubject,
      text: htmlToPlainText(html),
      html: wrapBodyHtml(inlineEmailStyles(html)),
      from: campaign.fromEmail,
    };
  }

  // Plain-text body (campaigns saved before the formatting editor existed).
  const personalizedText = personalize(campaign.bodyTemplate, vars);
  return {
    to: recipient.email,
    subject: personalizedSubject,
    text: personalizedText,
    html: renderBodyHtml(personalizedText),
    from: campaign.fromEmail,
  };
}

function requireDraftReadyToCompose(campaign: EmailCampaign): asserts campaign is EmailCampaign & {
  fromEmail: string;
  bodyTemplate: string;
} {
  if (!campaign.fromEmail || !campaign.bodyTemplate) {
    throw ApiError.badRequest("Select a sender address and write the email body first.");
  }
}

export async function previewRecipientEmail(campaignId: string, recipientId: string): Promise<EmailMessage> {
  const campaign = await EmailCampaign.findByPk(campaignId);
  if (!campaign) throw ApiError.notFound("Campaign not found");
  requireDraftReadyToCompose(campaign);
  const recipient = await EmailCampaignRecipient.findOne({ where: { id: recipientId, campaignId } });
  if (!recipient) throw ApiError.notFound("Recipient not found");
  return buildEmailForRecipient(campaign, recipient);
}

export async function sendTestEmail(
  campaignId: string,
  testEmail: string,
  sampleRecipientId?: string,
): Promise<void> {
  const campaign = await EmailCampaign.findByPk(campaignId);
  if (!campaign) throw ApiError.notFound("Campaign not found");
  requireDraftReadyToCompose(campaign);

  // Built as a plain object, not `{ ...recipientModelInstance }` -- spreading a
  // Sequelize model instance does not reliably copy its attributes as own enumerable
  // properties, which silently produced a `subject: undefined` here at runtime.
  function toRecipientLike(r: EmailCampaignRecipient): RecipientLike {
    return { email: r.email, company: r.company, contactName: r.contactName, subject: r.subject };
  }

  let sample: RecipientLike;
  if (sampleRecipientId) {
    const recipient = await EmailCampaignRecipient.findOne({
      where: { id: sampleRecipientId, campaignId },
    });
    if (!recipient) throw ApiError.notFound("Sample recipient not found");
    sample = toRecipientLike(recipient);
  } else {
    const recipient = await EmailCampaignRecipient.findOne({
      where: { campaignId, status: "pending" },
      order: [["rowNumber", "ASC"]],
    });
    sample = recipient
      ? toRecipientLike(recipient)
      : {
          email: testEmail,
          company: "Example Company",
          contactName: "Example Contact",
          subject: "Example subject",
        };
  }

  const message = buildEmailForRecipient(campaign, { ...sample, email: testEmail });
  // Section 9: this must fail loudly, unlike most transactional sends elsewhere in this
  // app (emails/index.ts's sendEmail() wrapper swallows and logs) -- the admin clicked
  // "Send test" specifically to find out whether sending actually works.
  await emailAdapter.send({ ...message, subject: `[TEST] ${message.subject}` });
}

export async function confirmSend(campaignId: string): Promise<void> {
  const campaign = await EmailCampaign.findByPk(campaignId);
  if (!campaign) throw ApiError.notFound("Campaign not found");
  requireDraftReadyToCompose(campaign);

  const selectedCount = await EmailCampaignRecipient.count({
    where: { campaignId, isSelected: true, status: { [Op.in]: ["pending", "duplicate"] } },
  });
  if (selectedCount === 0) {
    throw ApiError.badRequest("No recipients are selected to send to.");
  }

  // Atomic guard against double-clicking "Confirm & Send" or a duplicate submission from
  // a page refresh: only the request that actually flips draft -> sending wins; any
  // other concurrent/duplicate request sees affectedCount 0 and is rejected outright.
  const [affectedCount] = await EmailCampaign.update(
    { status: "sending" },
    { where: { id: campaignId, status: "draft" } },
  );
  if (affectedCount === 0) {
    throw ApiError.conflict("This campaign has already been sent or is currently sending.");
  }

  // Selected duplicate rows are being sent because the admin explicitly opted in
  // (see setRecipientSelected) -- promote them to "queued" alongside ordinary valid rows.
  await EmailCampaignRecipient.update(
    { status: "queued" },
    { where: { campaignId, isSelected: true, status: { [Op.in]: ["pending", "duplicate"] } } },
  );
  // Valid rows the admin explicitly deselected are "skipped", not silently left "pending".
  await EmailCampaignRecipient.update(
    { status: "skipped" },
    { where: { campaignId, isSelected: false, status: "pending" } },
  );

  processCampaignSend(campaignId).catch((err) => {
    logger.error(`Campaign ${campaignId} processing crashed`, err);
  });
}

// Deliberately not awaited by its callers (confirmSend / resumeInterruptedCampaigns) --
// the HTTP request that triggers a send returns immediately with status "sending", and
// the frontend polls GET /admin/email-campaigns/:id for progress. There's no separate
// job queue in this app (no Redis/Bull); this in-process worker pool is the pragmatic
// equivalent for a few thousand recipients at most. See resumeInterruptedCampaigns for
// the mitigation against a server restart stranding a campaign mid-send.
export async function processCampaignSend(campaignId: string): Promise<void> {
  const campaign = await EmailCampaign.findByPk(campaignId);
  if (!campaign || !campaign.fromEmail || !campaign.bodyTemplate) return;
  const fromEmail = campaign.fromEmail;
  const bodyTemplate = campaign.bodyTemplate;

  const recipients = await EmailCampaignRecipient.findAll({
    where: { campaignId, status: { [Op.in]: ["queued", "sending"] } },
    order: [["rowNumber", "ASC"]],
  });

  // Re-checked at send time: someone may have unsubscribed after the spreadsheet was uploaded.
  const suppressed = await findSuppressedEmails(recipients.map((r) => r.email));

  let cursor = 0;
  async function worker() {
    for (;;) {
      const recipient = recipients[cursor++];
      if (!recipient) return;
      if (suppressed.has(recipient.email.toLowerCase())) {
        recipient.status = "unsubscribed";
        recipient.errorMessage = "Not sent: this address has unsubscribed from Paleon Training emails.";
        await recipient.save();
        continue;
      }
      recipient.status = "sending";
      await recipient.save();
      try {
        const message = buildEmailForRecipient({ fromEmail, bodyTemplate }, recipient);
        await emailAdapter.send(message);
        recipient.status = "sent";
        recipient.sentAt = new Date();
        recipient.errorMessage = null;
        await recipient.save();
        await EmailCampaign.increment("sentCount", { where: { id: campaignId } });
      } catch (err) {
        // One recipient failing must never stop the rest of the campaign (section 25).
        recipient.status = "failed";
        recipient.errorMessage = err instanceof Error ? err.message : "Failed to send this email.";
        await recipient.save();
        await EmailCampaign.increment("failedCount", { where: { id: campaignId } });
        logger.error(`Failed to send campaign ${campaignId} email to ${recipient.email}`, err);
      }
    }
  }

  await Promise.all(Array.from({ length: SEND_CONCURRENCY }, worker));

  await EmailCampaign.update({ status: "completed" }, { where: { id: campaignId } });
}

// Called once at server boot (see server.ts). A send that was in progress when the
// process last stopped otherwise leaves its campaign stuck on "sending" forever with
// recipients stranded in "queued"/"sending" -- this re-picks up exactly those rows.
export async function resumeInterruptedCampaigns(): Promise<void> {
  const stuck = await EmailCampaign.findAll({ where: { status: "sending" } });
  for (const campaign of stuck) {
    logger.info(`Resuming interrupted email campaign ${campaign.id}`);
    processCampaignSend(campaign.id).catch((err) => {
      logger.error(`Failed to resume campaign ${campaign.id}`, err);
    });
  }
}
