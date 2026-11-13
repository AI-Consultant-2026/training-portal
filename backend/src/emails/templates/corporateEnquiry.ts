import { config } from "../../config";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";
import { COUNTRIES, CountryCode } from "../../constants/countries";

// Sent to corporate@ for every enquiry from the AI Workflow Productivity and CyberSecure Workforce corporate pages
// (2026-11-02). Reply-To is the enquirer, so answering the email answers them.
export function buildCorporateEnquiryEmail(lead: {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  country: string;
  details?: Record<string, string> | null;
}): EmailMessage {
  const d = lead.details ?? {};
  const countryName = COUNTRIES[lead.country as CountryCode]?.name ?? lead.country;
  // Older AI Workflow enquiries have no programme stored.
  const programme = d.programme ?? "";
  const topic = /accelerator/i.test(programme)
    ? "AI + cybersecurity training"
    : /cybersecure/i.test(programme)
      ? "cybersecurity training"
      : "AI training";
  const wants =
    d.intent === "proposal"
      ? "a corporate training proposal"
      : d.intent === "reserve"
        ? "to reserve places in the December 2026 cohort"
        : d.intent === "taster"
          ? "a free leadership taster session"
          : "a consultation";
  const lines = [
    `New corporate ${topic} enquiry (${countryName}). They asked for ${wants}.`,
    `Programme: ${d.programme ?? "AI Workflow Productivity"}`,
    `Name: ${lead.name}`,
    ...(d.jobTitle ? [`Job title: ${d.jobTitle}`] : []),
    `Organisation: ${d.organisation ?? ""}`,
    `Email: ${lead.email}`,
  ];
  if (lead.phone) lines.push(`Phone / WhatsApp: ${lead.phone}`);
  lines.push(`Headcount: ${d.employees ?? ""}`);
  if (d.department) lines.push(`Department / team: ${d.department}`);
  if (d.requirement) lines.push(`Training requirement: ${d.requirement}`);
  if (d.delivery) lines.push(`Preferred delivery: ${d.delivery}`);
  if (d.message) lines.push(`Message: ${d.message}`);
  lines.push(`Consent to reply given at ${d.consentAt ?? "unknown"}.`);
  lines.push("We promise a reply within one working day. Reply to this email to answer them directly.");
  lines.push(`The enquiry is also in the admin Leads table: ${config.corsOrigin}/admin`);

  return {
    to: config.corporateEnquiriesEmail,
    replyTo: lead.email,
    subject: `${d.intent === "reserve" ? "Cohort reservation" : d.intent === "taster" ? "Leadership taster request" : `Corporate ${topic} enquiry`}: ${d.organisation ?? lead.name} (${countryName})`,
    text: lines.join("\n"),
    html: wrapHtml(lines),
  };
}
