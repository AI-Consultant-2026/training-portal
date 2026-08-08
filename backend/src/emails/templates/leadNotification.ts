import { config } from "../../config";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

export function buildLeadNotificationEmail(lead: { name: string; email: string; course: string }): EmailMessage {
  const lines = [
    "New course interest submitted via the website.",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Course: ${lead.course}`,
  ];

  return {
    to: config.leadsNotifyEmail,
    subject: `New course interest: ${lead.course}`,
    text: lines.join("\n"),
    html: wrapHtml(lines),
  };
}
