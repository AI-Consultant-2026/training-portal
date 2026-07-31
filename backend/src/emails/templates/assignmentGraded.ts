import { User } from "../../models";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

export function buildAssignmentGradedEmail(
  user: User,
  assignment: { title: string },
  course: { title: string },
  submission: { score: number | null; feedback: string | null },
): EmailMessage {
  const lines = [
    `Hi ${user.firstName},`,
    `Your submission for "${assignment.title}" in ${course.title} has been graded. Score: ${submission.score ?? "N/A"}.`,
  ];
  if (submission.feedback) {
    lines.push(`Feedback: ${submission.feedback}`);
  }

  return {
    to: user.email,
    subject: `Your assignment "${assignment.title}" has been graded`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
