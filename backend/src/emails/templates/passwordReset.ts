import { User } from "../../models";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

export function buildPasswordResetEmail(user: User, resetUrl: string): EmailMessage {
  const lines = [
    `Hi ${user.firstName},`,
    "We received a request to reset your Training Portal password. Click the link below to choose a new one. This link expires in 1 hour.",
    resetUrl,
    "If you didn't request this, you can safely ignore this email.",
  ];

  return {
    to: user.email,
    subject: "Reset your Training Portal password",
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
