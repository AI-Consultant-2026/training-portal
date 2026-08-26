import { config } from "../../config";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

export function buildLeadNotificationEmail(lead: {
  name: string;
  email: string;
  phone?: string | null;
  course: string;
  university?: string | null;
  source?: string | null;
}): EmailMessage {
  const lines = [
    "New course interest submitted via the website.",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Course: ${lead.course}`,
  ];
  // Surfaced first among the optional fields on purpose -- phone is the fastest way
  // to follow up (WhatsApp/call), so it shouldn't get buried below university/source.
  if (lead.phone) lines.push(`Phone: ${lead.phone}`);
  if (lead.university) lines.push(`University: ${lead.university}`);
  if (lead.source) lines.push(`Heard about us via: ${lead.source}`);

  return {
    to: config.leadsNotifyEmail,
    subject: `New course interest: ${lead.course}`,
    text: lines.join("\n"),
    html: wrapHtml(lines),
  };
}
