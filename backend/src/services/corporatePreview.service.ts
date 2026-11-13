import crypto from "crypto";
import { config } from "../config";
import { PricedProgramme } from "../constants/corporatePricing";
import * as emails from "../emails";
import { Lead } from "../models";
import { AI_CYBER_ACCELERATOR } from "../seeders/data/curriculumCorporateAccelerator";
import { AI_WORKFLOW } from "../seeders/data/curriculumCorporateAiWorkflow";
import { CYBERSECURE_WORKFORCE } from "../seeders/data/curriculumCorporateCyberSecure";
import { CorporateModuleSeed } from "../seeders/data/curriculumCorporateTypes";
import { CorporatePreviewInput } from "../validators/corporateLeads.validators";
import { logger } from "../utils/logger";
import { CORPORATE_CONSENT_TEXT } from "../validators/corporateLeads.validators";
import { CORPORATE_LEAD_PROGRAMMES } from "./corporateLead.service";

// Free leadership preview (owner, 2026-11-13): a one-step sign-up that opens sample modules
// straight away, instead of the general enquiry form. The sign-up is saved as a corporate
// lead (intent "taster") so corporate@ hears about it and can ask for feedback later; the
// sample pages need a signed link, so they are only reached through the sign-up.

export const PREVIEW_PROGRAMMES: PricedProgramme[] = ["cybersecure", "ai-workflow", "accelerator"];

const LEAD_PROGRAMME: Record<PricedProgramme, keyof typeof CORPORATE_LEAD_PROGRAMMES> = {
  cybersecure: "cybersecure-workforce",
  "ai-workflow": "ai-workflow",
  accelerator: "ai-cyber-accelerator",
};

/** The sample: module 1 of each programme (three lessons each). */
export function sampleModule(programme: PricedProgramme): CorporateModuleSeed {
  const course = programme === "cybersecure" ? CYBERSECURE_WORKFORCE : programme === "ai-workflow" ? AI_WORKFLOW : AI_CYBER_ACCELERATOR;
  return course.modules[0];
}

function sign(leadId: string): string {
  return crypto.createHmac("sha256", config.jwt.accessSecret).update(`corporate-preview:${leadId}`).digest("base64url").slice(0, 32);
}

export function previewToken(leadId: string): string {
  return `${leadId}.${sign(leadId)}`;
}

export function isValidPreviewToken(token: string | undefined): boolean {
  if (!token) return false;
  const [id, mac] = token.split(".");
  if (!id || !mac) return false;
  const expected = sign(id);
  return mac.length === expected.length && crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected));
}

export function previewUrl(programme: PricedProgramme, token: string): string {
  return `/corporate-training/free-preview/${programme}?t=${encodeURIComponent(token)}`;
}

export async function createPreviewSignup(input: CorporatePreviewInput): Promise<{ url: string }> {
  const now = new Date();
  const programme = input.programme;
  const meta = CORPORATE_LEAD_PROGRAMMES[LEAD_PROGRAMME[programme]];
  const details: Record<string, string> = {
    organisation: input.organisation,
    intent: "taster",
    programme: meta.course.replace(" (Corporate)", ""),
    consentAt: now.toISOString(),
    consentText: CORPORATE_CONSENT_TEXT,
  };
  if (input.jobTitle) details.jobTitle = input.jobTitle;
  if (input.page) details.page = input.page;
  const lead = await Lead.create({
    name: input.name,
    email: input.email,
    phone: null,
    course: meta.course,
    source: meta.source,
    sector: input.organisation,
    interest: "Free leadership preview",
    country: input.country,
    marketingConsentAt: input.updates ? now : null,
    details,
    // Not a learner: the course-lead nurture emails are stamped as done so the jobs skip it.
    welcomeEmailSentAt: now,
    followUp1SentAt: now,
    followUp2SentAt: now,
    followUp3SentAt: now,
  });
  const token = previewToken(lead.id);
  const url = previewUrl(programme, token);
  // Best-effort: the visitor is sent straight to the sample, so a mail failure must not block it.
  try {
    await emails.sendCorporatePreviewEmail({
      to: input.email,
      name: input.name,
      organisation: input.organisation,
      links: PREVIEW_PROGRAMMES.map((p) => ({ programme: p, url: `${config.corsOrigin}${previewUrl(p, token)}` })),
    });
  } catch (err) {
    logger.error(`Failed to send corporate preview email (leadId=${lead.id})`, err);
  }
  try {
    await emails.sendCorporateEnquiryEmail(lead);
  } catch (err) {
    logger.error(`Failed to send corporate preview notice (leadId=${lead.id})`, err);
  }
  return { url };
}
