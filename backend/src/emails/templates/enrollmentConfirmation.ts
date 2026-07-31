import { User } from "../../models";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

export function buildEnrollmentConfirmationEmail(
  user: User,
  course: { title: string },
): EmailMessage {
  const lines = [
    `Hi ${user.firstName},`,
    `You're now enrolled in "${course.title}". You can start working through the course modules right away.`,
  ];

  return {
    to: user.email,
    subject: `You're enrolled in ${course.title}`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
