import crypto from "crypto";
import { Op, fn, col, where } from "sequelize";
import { config } from "../config";
import { Lead } from "../models";

// Signed, per-lead unsubscribe links for the lead follow-up emails (2026-09-25). The
// link carries only the lead id and an HMAC of it -- no email address in the URL.
function sign(leadId: string): string {
  return crypto
    .createHmac("sha256", config.jwt.accessSecret)
    .update(`lead-unsubscribe:${leadId}`)
    .digest("base64url")
    .slice(0, 32);
}

export function leadUnsubscribeUrl(leadId: string): string {
  const base = config.corsOrigin.replace(/\/$/, "");
  return `${base}/api/leads/unsubscribe?id=${encodeURIComponent(leadId)}&t=${sign(leadId)}`;
}

function tokenMatches(leadId: string, token: string): boolean {
  const expected = Buffer.from(sign(leadId));
  const given = Buffer.from(token);
  return given.length === expected.length && crypto.timingSafeEqual(given, expected);
}

// Opts out every lead record with the same email address (someone who filled in the form
// twice gets one opt-out, not one per record). Returns false for an invalid link.
export async function unsubscribeLead(leadId: string, token: string): Promise<boolean> {
  if (!leadId || !token || !tokenMatches(leadId, token)) return false;
  const lead = await Lead.findByPk(leadId).catch(() => null);
  if (!lead) return false;
  await Lead.update(
    { unsubscribedAt: new Date() },
    {
      where: {
        [Op.and]: [where(fn("lower", col("email")), lead.email.toLowerCase()), { unsubscribedAt: null }],
      },
    },
  );
  return true;
}

export async function isEmailUnsubscribed(email: string): Promise<boolean> {
  const count = await Lead.count({
    where: {
      [Op.and]: [where(fn("lower", col("email")), email.toLowerCase()), { unsubscribedAt: { [Op.ne]: null } }],
    },
  });
  return count > 0;
}
