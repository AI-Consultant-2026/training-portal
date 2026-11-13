import { config } from "../../config";
import { COUNTRIES, CountryCode, formatMoney } from "../../constants/countries";
import { READINESS_BANDS, ReadinessResult } from "../../constants/readinessCheck";
import { EmailMessage } from "../../utils/email";
import { BodyLine, escapeHtml, wrapHtml } from "../htmlWrapper";
import { CORPORATE_PRICES, PricedProgramme } from "../../constants/corporatePricing";
import { CALL_URL, PILOT_STAFF, brochurePath, businessCasePath, pilotTotal, workedExample } from "../../views/corporateOffers";

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

const PRICED: Record<ReadinessResult["recommended"][number], PricedProgramme> = {
  "cybersecure-workforce": "cybersecure",
  "ai-workflow": "ai-workflow",
  "ai-cyber-accelerator": "accelerator",
};

export function buildReadinessScorecardEmail(input: {
  name: string;
  email: string;
  organisation: string;
  country: string;
  employees?: string;
  wantsProposal?: boolean;
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
  // A tailored recommendation (2026-11-13): the first programme, why, what it costs in their
  // currency, a pilot, and the PDFs to forward, then the proposal offer.
  const code = (COUNTRIES[input.country as CountryCode] ? input.country : "NG") as CountryCode;
  const [top, ...others] = result.recommended;
  const topP = PROGRAMMES[top];
  const priced = PRICED[top];
  const reason =
    top === "ai-cyber-accelerator"
      ? `Your scores are strong in both areas (cybersecurity ${result.cyber}%, AI ${result.ai}%), so the next step is developing the specialists who will lead secure AI adoption.`
      : top === "cybersecure-workforce"
        ? `Cybersecurity (${result.cyber}%) is your weaker area, so we would start there: most incidents begin with a person, and this is the fastest gap to close.`
        : `AI use (${result.ai}%) is your weaker area, so we would start there: clear rules and practical training turn ad-hoc AI use into safe, measurable time savings.`;
  lines.push({ html: "<strong>Our recommendation for " + escapeHtml(input.organisation) + "</strong>" });
  lines.push(`Start with ${topP.name}. ${reason}`);
  lines.push(`What it gives you: ${topP.why}.`);
  lines.push(
    `Cost in ${COUNTRIES[code].name}: ${formatMoney(code, CORPORATE_PRICES[priced][code])} per learner, self-paced. For example, ${workedExample(priced, code)}. Or start with a ${PILOT_STAFF}-learner pilot for ${formatMoney(code, pilotTotal(priced, code))}. All training is self-paced online, per learner or in a private company portal.`,
  );
  lines.push(`Programme page: ${ORIGIN}${site}/${topP.slug}`);
  lines.push(`Brochure to forward: ${ORIGIN}${brochurePath(priced, code)}`);
  lines.push(`One-page business case: ${ORIGIN}${businessCasePath(priced, code)}`);
  if (others.length) {
    lines.push(`Also worth considering: ${others.map((k) => `${PROGRAMMES[k].name} (${ORIGIN}${site}/${PROGRAMMES[k].slug})`).join("; ")}.`);
  }
  lines.push({ html: "<strong>Your tailored proposal</strong>" });
  lines.push(
    input.wantsProposal
      ? `You asked for a proposal: we will send one shaped around ${input.organisation}${input.employees ? ` (${input.employees} employees)` : ""} and these results within one working day.`
      : "Would you like a proposal shaped around these results? Reply to this email with the number of staff you want to train and we will send one within one working day.",
  );
  lines.push(`Prefer to talk? Book a 20-minute call on WhatsApp: ${CALL_URL}`);
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
    `Wants a tailored proposal: ${d.wantsProposal === "yes" ? "YES, send one within one working day" : "no (offered in the scorecard)"}`,
    `Consent given at ${d.consentAt ?? "unknown"}.`,
    "Reply to this email to follow up with them directly.",
    `The lead is also in the admin Leads table: ${config.corsOrigin}/admin`,
  ];
  return {
    to: config.corporateEnquiriesEmail,
    replyTo: lead.email,
    subject: `${d.wantsProposal === "yes" ? "PROPOSAL WANTED · " : ""}Readiness Check: ${d.organisation ?? lead.name} (${countryName}) scored ${d.score ?? "?"}%`,
    text: lines.join("\n"),
    html: wrapHtml(lines),
  };
}
