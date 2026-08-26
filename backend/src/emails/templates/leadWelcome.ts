import { config } from "../../config";
import { EmailMessage } from "../../utils/email";
import { formatEnrolmentDeadline } from "../enrolmentDate";
import { wrapHtml } from "../htmlWrapper";

export function buildLeadWelcomeEmail(lead: { name: string; email: string; course: string }): EmailMessage {
  const lines = [
    `Hi ${lead.name},`,
    `Thanks for registering your interest in ${lead.course} at Paleon Training.`,
    `Our next intake closes on ${formatEnrolmentDeadline()} — spaces are limited, so it's worth registering early.`,
    `Register here: ${config.enrolment.registrationUrl}`,
    "Questions before then? Just reply to this email — we read every one.",
  ];

  return {
    to: lead.email,
    subject: `Welcome to Paleon Training — ${lead.course}`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
