import { config } from "../../config";
import { COUNTRIES, CountryCode } from "../../constants/countries";
import { READINESS_BANDS, ReadinessResult } from "../../constants/readinessCheck";
import { EmailMessage } from "../../utils/email";
import { BodyLine, escapeHtml, wrapHtml } from "../htmlWrapper";

// The AI & Cyber Readiness Check (2026-11-08): the scorecard emailed to the employer, and
// the notification to corporate@ (Reply-To the employer).

const ORIGIN = "https://paleontraining.com";

const PROGRAMMES: Record<ReadinessResult["recommended"][number], { name: string; slug: string; why: string }> = {
  "cybersecure-workforce": {
    name: "CyberSecure Workforce",
    slug: "corporate-training/cybersecure-workforce",
    why: "cybersecurity awareness training so every employee can spot and report phishing, payment fraud and impersonation",
  },
  "ai-workflow": {
    name: "AI Workflow Productivity & Process Transformation",
    slug: "corporate-training/ai-workflow-productivity",
    why: "practical AI training so every team can use AI tools safely, with clear rules and human review",
  },
  "ai-cyber-accelerator": {
    name: "AI + Cybersecurity Professional Accelerator",
    slug: "corporate-training/ai-cybersecurity-professional-accelerator",
    why: "deeper skills for the IT, security, risk and data professionals who lead secure AI adoption",
  },
};

export function buildReadinessScorecardEmail(input: {
  name: string;
  email: string;
  organisation: string;
  country: string;
  result: ReadinessResult;
}): EmailMessage {
  const { result } = input;
  const band = READINESS_BANDS[result.band];
  const site = COUNTRIES[input.country as CountryCode]?.site.path ?? "/ng";
  const first = input.name.split(/\s+/)[0];
  const lines: BodyLine[] = [
    `Dear ${first},`,
    `Thank you for completing the AI & Cyber Readiness Check for ${input.organisation}. Here is your scorecard.`,
    { html: `<strong>Overall readiness: ${result.score}% (${escapeHtml(band.label)})</strong>` },
    `Cybersecurity: ${result.cyber}% · AI use: ${result.ai}%`,
    band.summary,
  ];
  if (result.gaps.length) {
    lines.push({ html: "<strong>Your priority gaps</strong>" });
    result.gaps.slice(0, 5).forEach((g, i) => lines.push(`${i + 1}. ${g}`));
  }
  lines.push({ html: "<strong>What we suggest</strong>" });
  for (const key of result.recommended) {
    const p = PROGRAMMES[key];
    lines.push(`${p.name}: ${p.why}.`);
    lines.push(`${ORIGIN}${site}/${p.slug}`);
  }
  lines.push("Would you like to talk it through? Reply to this email and we will arrange a short consultation about your organisation, your teams and your priorities.");
  lines.push("This scorecard is a quick self-assessment to help you prioritise. It is not an audit, a certification or legal advice.");
  lines.push("Paleon Training Limited · corporate@paleontraining.com");
  const text = lines.map((l) => (typeof l === "string" ? l : l.html.replace(/<[^>]+>/g, ""))).join("\n\n");
  return {
    to: input.email,
    replyTo: config.corporateEnquiriesEmail,
    subject: `Your AI & Cyber Readiness scorecard: ${result.score}% (${band.label})`,
    text,
    html: wrapHtml(lines),
  };
}

export function buildReadinessNotificationEmail(lead: {
  id: string;
  name: string;
  email: string;
  country: string;
  details?: Record<string, string> | null;
}): EmailMessage {
  const d = lead.details ?? {};
  const countryName = COUNTRIES[lead.country as CountryCode]?.name ?? lead.country;
  const lines = [
    `New AI & Cyber Readiness Check (${countryName}). The scorecard has been emailed to them.`,
    `Score: ${d.score ?? "?"}% overall (${d.band ?? ""}), cybersecurity ${d.cyber ?? "?"}%, AI ${d.ai ?? "?"}%`,
    `Name: ${lead.name}`,
    `Job title: ${d.jobTitle ?? ""}`,
    `Organisation: ${d.organisation ?? ""}`,
    `Employees: ${d.employees ?? ""}`,
    `Email: ${lead.email}`,
    `Suggested: ${d.recommended ?? ""}`,
    `Consent given at ${d.consentAt ?? "unknown"}.`,
    "Reply to this email to follow up with them directly.",
    `The lead is also in the admin Leads table: ${config.corsOrigin}/admin`,
  ];
  return {
    to: config.corporateEnquiriesEmail,
    replyTo: lead.email,
    subject: `Readiness Check: ${d.organisation ?? lead.name} (${countryName}) scored ${d.score ?? "?"}%`,
    text: lines.join("\n"),
    html: wrapHtml(lines),
  };
}
