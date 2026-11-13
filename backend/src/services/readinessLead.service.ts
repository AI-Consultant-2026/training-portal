import * as emails from "../emails";
import { READINESS_BANDS, scoreReadiness } from "../constants/readinessCheck";
import { Lead } from "../models";
import { READINESS_CONSENT_TEXT, ReadinessLeadInput } from "../validators/readiness.validators";

// The AI & Cyber Readiness Check (2026-11-08). Saved as a corporate lead (source
// "ai-cyber-readiness": an employer, not a learner -- keep it out of learner emails). The
// course-lead nurture emails are stamped as done so those jobs skip it.
export const READINESS_LEAD_SOURCE = "ai-cyber-readiness";
export const READINESS_LEAD_COURSE = "AI & Cyber Readiness Check (Corporate)";

export async function createReadinessLead(input: ReadinessLeadInput): Promise<{ lead: Lead; result: ReturnType<typeof scoreReadiness> }> {
  const now = new Date();
  const result = scoreReadiness(input.answers);
  const details: Record<string, string> = {
    jobTitle: input.jobTitle,
    organisation: input.organisation,
    employees: input.employees,
    programme: "AI & Cyber Readiness Check",
    score: String(result.score),
    cyber: String(result.cyber),
    ai: String(result.ai),
    band: READINESS_BANDS[result.band].label,
    answers: input.answers.join(","),
    recommended: result.recommended.join(", "),
    consentAt: now.toISOString(),
    consentText: READINESS_CONSENT_TEXT,
  };
  if (input.page) details.page = input.page;
  if (input.proposal) details.wantsProposal = "yes";

  const lead = await Lead.create({
    name: input.name,
    email: input.email,
    phone: null,
    course: READINESS_LEAD_COURSE,
    source: READINESS_LEAD_SOURCE,
    sector: input.organisation,
    interest: `Readiness ${result.score}% (${READINESS_BANDS[result.band].label})`,
    country: input.country,
    marketingConsentAt: input.updates ? now : null,
    details,
    welcomeEmailSentAt: now,
    followUp1SentAt: now,
    followUp2SentAt: now,
    followUp3SentAt: now,
  });
  // Both best-effort (sendEmail logs failures): the lead is already saved.
  await emails.sendReadinessScorecardEmail({
    name: input.name,
    email: input.email,
    organisation: input.organisation,
    country: input.country,
    employees: input.employees,
    wantsProposal: Boolean(input.proposal),
    result,
  });
  await emails.sendReadinessNotificationEmail(lead);
  return { lead, result };
}
