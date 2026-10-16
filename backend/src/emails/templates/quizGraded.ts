import { User } from "../../models";
import { EmailMessage } from "../../utils/email";
import { BodyLine, escapeHtml, wrapHtml } from "../htmlWrapper";

export interface QuizAnswerFeedback {
  questionText: string | null;
  feedback: string;
}

export function buildQuizGradedEmail(
  user: User,
  quiz: { title: string },
  course: { title: string },
  score: number | null,
  feedback: QuizAnswerFeedback[] = [],
): EmailMessage {
  const lines = [
    `Hi ${user.firstName},`,
    `Your attempt on "${quiz.title}" in ${course.title} has been graded. Score: ${score ?? "N/A"}%.`,
  ];
  const textLines = [...lines];
  const htmlLines: BodyLine[] = [...lines];
  for (const f of feedback) {
    if (f.questionText) {
      textLines.push(`${f.questionText}\nFeedback: ${f.feedback}`);
      htmlLines.push({ html: `<strong>${escapeHtml(f.questionText)}</strong><br>Feedback: ${escapeHtml(f.feedback)}` });
    } else {
      textLines.push(`Feedback: ${f.feedback}`);
      htmlLines.push(`Feedback: ${f.feedback}`);
    }
  }

  return {
    to: user.email,
    subject: `Your quiz "${quiz.title}" has been graded`,
    text: textLines.join("\n\n"),
    html: wrapHtml(htmlLines),
  };
}
