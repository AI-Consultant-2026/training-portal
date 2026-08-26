import { config } from "../../config";
import { EmailMessage } from "../../utils/email";
import { formatEnrolmentDeadline } from "../enrolmentDate";
import { wrapHtml } from "../htmlWrapper";

export type ReminderStage = "21d" | "7d" | "1d";

const STAGE_COPY: Record<ReminderStage, { subject: string; opener: string }> = {
  "21d": {
    subject: "3 weeks left to register",
    opener: "Just a friendly heads-up: there are 3 weeks left to register",
  },
  "7d": {
    subject: "1 week left to register",
    opener: "Time's getting short — there's 1 week left to register",
  },
  "1d": {
    subject: "Last call — registration closes tomorrow",
    opener: "This is the final reminder: registration closes tomorrow",
  },
};

export function buildLeadReminderEmail(
  lead: { name: string; email: string; course: string },
  stage: ReminderStage,
): EmailMessage {
  const copy = STAGE_COPY[stage];
  const lines = [
    `Hi ${lead.name},`,
    `${copy.opener} for ${lead.course} at Paleon Training, on ${formatEnrolmentDeadline()}.`,
    `Register here: ${config.enrolment.registrationUrl}`,
    "Already registered? You can ignore this — thank you, and see you in class.",
  ];

  return {
    to: lead.email,
    subject: copy.subject,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
