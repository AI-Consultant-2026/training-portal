import { User } from "../../models";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

export function buildEmailVerificationEmail(user: User, verifyUrl: string): EmailMessage {
  const lines = [
    `Hi ${user.firstName},`,
    "Please confirm this is your email address so you can enroll in a course. Click the link below to verify. This link expires in 24 hours.",
    verifyUrl,
    "If you didn't create a Training Portal account, you can safely ignore this email.",
  ];

  return {
    to: user.email,
    subject: "Verify your Training Portal email",
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
