import { User } from "../../models";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

export function buildWelcomeEmail(user: User): EmailMessage {
  const lines = [
    `Hi ${user.firstName},`,
    "Welcome to Training Portal! Your account has been created and you're ready to start learning.",
    "Browse the course catalog to enroll in your first course.",
  ];

  return {
    to: user.email,
    subject: "Welcome to Training Portal",
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
