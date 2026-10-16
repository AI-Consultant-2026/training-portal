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
    // Keep the marker's paragraphs: each blank-line-separated block becomes its own <p>.
    const paragraphs = feedback.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    lines.push(`Feedback: ${paragraphs[0] ?? ""}`, ...paragraphs.slice(1));
  }

  return {
    to: user.email,
    subject: `Your capstone "${capstone.title}" has been graded`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
