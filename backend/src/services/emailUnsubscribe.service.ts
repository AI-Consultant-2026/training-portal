import crypto from "crypto";
import { Op, fn, col, where } from "sequelize";
import { config } from "../config";
import { EmailUnsubscribe, Lead } from "../models";

// Signed unsubscribe links for /admin/email-client campaigns (2026-09-26). Campaign
// recipients are arbitrary spreadsheet rows, not leads, so unlike leadUnsubscribe.service
// the link carries the (base64url) address itself plus an HMAC of it; it has to keep
// working after the campaign that sent it is deleted.
function sign(email: string): string {
  return crypto
    .createHmac("sha256", config.jwt.accessSecret)
    .update(`email-unsubscribe:${email}`)
    .digest("base64url")
    .slice(0, 32);
}

export function emailUnsubscribeUrl(email: string): string {
  const normalized = email.trim().toLowerCase();
  const base = config.corsOrigin.replace(/\/$/, "");
  const e = Buffer.from(normalized, "utf8").toString("base64url");
  return `${base}/api/email/unsubscribe?e=${e}&t=${sign(normalized)}`;
}

function decodeAndVerify(encoded: string, token: string): string | null {
  if (!encoded || !token) return null;
  let email: string;
  try {
    email = Buffer.from(encoded, "base64url").toString("utf8").trim().toLowerCase();
  } catch {
    return null;
  }
  if (!email.includes("@")) return null;
  const expected = Buffer.from(sign(email));
  const given = Buffer.from(token);
  if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) return null;
  return email;
}

// Records the opt-out, and also stops the lead follow-up emails for the same address:
// someone who says "stop emailing me" means all of Paleon's marketing email.
export async function unsubscribeEmail(encoded: string, token: string): Promise<boolean> {
  const email = decodeAndVerify(encoded, token);
  if (!email) return false;
  await EmailUnsubscribe.findOrCreate({ where: { email }, defaults: { email, source: "email-client" } });
  await Lead.update(
    { unsubscribedAt: new Date() },
    { where: { [Op.and]: [where(fn("lower", col("email")), email), { unsubscribedAt: null }] } },
  );
  return true;
}

// The lowercased addresses from `emails` that must not receive campaign email: anyone who
// unsubscribed from a campaign, or from the lead follow-up emails.
export async function findSuppressedEmails(emails: string[]): Promise<Set<string>> {
  const wanted = Array.from(new Set(emails.map((e) => e.trim().toLowerCase()).filter(Boolean)));
  if (wanted.length === 0) return new Set();
  const [optOuts, leads] = await Promise.all([
    EmailUnsubscribe.findAll({ where: { email: { [Op.in]: wanted } }, attributes: ["email"] }),
    Lead.findAll({
      where: { [Op.and]: [where(fn("lower", col("email")), { [Op.in]: wanted }), { unsubscribedAt: { [Op.ne]: null } }] },
      attributes: ["email"],
    }),
  ]);
  return new Set([...optOuts.map((o) => o.email), ...leads.map((l) => l.email.toLowerCase())]);
}
