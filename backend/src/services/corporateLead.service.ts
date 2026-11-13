import * as emails from "../emails";
import { Lead } from "../models";
import { logger } from "../utils/logger";
import { CORPORATE_CONSENT_TEXT, CorporateLeadInput, CorporateProgramme } from "../validators/corporateLeads.validators";

// The programme name and source each corporate enquiry is filed under in the admin Leads
// table. CyberSecure Workforce and the AI + Cybersecurity Professional Accelerator added 2026-11-02. Both sources are corporate buyers, not
// learners: keep them out of learner emails.
export const CORPORATE_LEAD_PROGRAMMES: Record<CorporateProgramme, { course: string; source: string; label: string }> = {
  "ai-workflow": { course: "AI Workflow Productivity (Corporate)", source: "corporate-ai-workflow", label: "AI training" },
  "cybersecure-workforce": { course: "CyberSecure Workforce (Corporate)", source: "cybersecure-workforce", label: "cybersecurity training" },
  "ai-cyber-accelerator": {
    course: "AI + Cybersecurity Professional Accelerator (Corporate)",
    source: "ai-cyber-accelerator",
    label: "AI + cybersecurity training",
  },
};
export const CORPORATE_LEAD_COURSE = CORPORATE_LEAD_PROGRAMMES["ai-workflow"].course;
export const CORPORATE_LEAD_SOURCE = CORPORATE_LEAD_PROGRAMMES["ai-workflow"].source;

// A corporate enquiry (2026-11-02) is saved as a lead so it shows in the admin Leads
// table, but it is not a learner: the course-lead welcome and follow-up emails are
// stamped as done at once so the nurture jobs skip it. The team replies by hand from
// corporate@, which gets the full enquiry by email.
export async function createCorporateLead(input: CorporateLeadInput): Promise<Lead> {
  const now = new Date();
  const programme = CORPORATE_LEAD_PROGRAMMES[input.programme ?? "ai-workflow"];
  const details: Record<string, string> = {
    organisation: input.organisation,
    employees: input.employees,
    intent: input.intent,
    programme: programme.course.replace(" (Corporate)", ""),
    consentAt: now.toISOString(),
    consentText: CORPORATE_CONSENT_TEXT,
  };
  if (input.jobTitle) details.jobTitle = input.jobTitle;
  if (input.department) details.department = input.department;
  if (input.requirement) details.requirement = input.requirement;
  if (input.delivery) details.delivery = input.delivery;
  if (input.message) details.message = input.message;
  if (input.page) details.page = input.page;

  const lead = await Lead.create({
    name: input.name,
    email: input.email,
    phone: input.phone ?? null,
    course: programme.course,
    source: programme.source,
    sector: input.organisation,
    interest: input.requirement ?? null,
    country: input.country,
    marketingConsentAt: input.updates ? now : null,
    details,
    welcomeEmailSentAt: now,
    followUp1SentAt: now,
    followUp2SentAt: now,
    followUp3SentAt: now,
  });
  // Best-effort, like the course-lead notification: the enquiry is already saved.
  try {
    await emails.sendCorporateEnquiryEmail(lead);
  } catch (err) {
    logger.error(`Failed to send corporate enquiry email (leadId=${lead.id})`, err);
  }
  return lead;
}
