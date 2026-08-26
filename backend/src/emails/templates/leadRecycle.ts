import { config } from "../../config";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

// Only ever called when config.enrolment.followingDeadline is set -- see
// leadNurture.service.ts's sendPendingRecycleEmails, which no-ops entirely otherwise.
export function buildLeadRecycleEmail(lead: { name: string; email: string; course: string }): EmailMessage {
  const nextDeadline = new Date(config.enrolment.followingDeadline).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const lines = [
    `Hi ${lead.name},`,
    `Registration for the cohort you looked at (${lead.course}) has closed — but the next one hasn't started yet, and applications are open now for the intake registering by ${nextDeadline}.`,
    `Register here: ${config.enrolment.registrationUrl}`,
    "No pressure if the timing's still not right — you won't hear from us again about this unless you register.",
  ];

  return {
    to: lead.email,
    subject: "You missed this one — the next Paleon Training intake is open",
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
