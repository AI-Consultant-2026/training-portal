import * as emails from "../emails";
import { Lead } from "../models";
import { logger } from "../utils/logger";
import { CORPORATE_CONSENT_TEXT, CorporateLeadInput } from "../validators/corporateLeads.validators";

// The programme name every corporate enquiry is filed under in the admin Leads table.
export const CORPORATE_LEAD_COURSE = "AI Workflow Productivity (Corporate)";
export const CORPORATE_LEAD_SOURCE = "corporate-ai-workflow";

// A corporate enquiry (2026-11-02) is saved as a lead so it shows in the admin Leads
// table, but it is not a learner: the course-lead welcome and follow-up emails are
// stamped as done at once so the nurture jobs skip it. The team replies by hand from
// corporate@, which gets the full enquiry by email.
export async function createCorporateLead(input: CorporateLeadInput): Promise<Lead> {
  const now = new Date();
  const details: Record<string, string> = {
    jobTitle: input.jobTitle,
    organisation: input.organisation,
    employees: input.employees,
    intent: input.intent,
    consentAt: now.toISOString(),
    consentText: CORPORATE_CONSENT_TEXT,
  };
  if (input.department) details.department = input.department;
  if (input.requirement) details.requirement = input.requirement;
  if (input.delivery) details.delivery = input.delivery;
  if (input.message) details.message = input.message;
  if (input.page) details.page = input.page;

  const lead = await Lead.create({
    name: input.name,
    email: input.email,
    phone: input.phone,
    course: CORPORATE_LEAD_COURSE,
    source: CORPORATE_LEAD_SOURCE,
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
