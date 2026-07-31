import { User } from "../../models";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

export function buildQuizGradedEmail(
  user: User,
  quiz: { title: string },
  course: { title: string },
  score: number | null,
): EmailMessage {
  const lines = [
    `Hi ${user.firstName},`,
    `Your attempt on "${quiz.title}" in ${course.title} has been graded. Score: ${score ?? "N/A"}%.`,
  ];

  return {
    to: user.email,
    subject: `Your quiz "${quiz.title}" has been graded`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
