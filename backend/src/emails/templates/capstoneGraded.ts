import { User } from "../../models";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

export function buildCapstoneGradedEmail(
  user: User,
  capstone: { title: string },
  course: { title: string },
  score: number,
  feedback: string | null | undefined,
): EmailMessage {
  const lines = [
    `Hi ${user.firstName},`,
    `Your capstone submission for "${capstone.title}" in ${course.title} has been graded. Score: ${score}.`,
  ];
  if (feedback) {
    lines.push(`Feedback: ${feedback}`);
  }

  return {
    to: user.email,
    subject: `Your capstone "${capstone.title}" has been graded`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
