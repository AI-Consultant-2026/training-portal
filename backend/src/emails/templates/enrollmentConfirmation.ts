import { User } from "../../models";
import { EmailMessage } from "../../utils/email";
import { escapeHtml, wrapHtml } from "../htmlWrapper";

export function buildEnrollmentConfirmationEmail(
  user: User,
  course: { title: string },
): EmailMessage {
  const title = escapeHtml(course.title);

  const paragraphs = [
    {
      text: `You are now officially enrolled in ${course.title} 🎓 — an important step towards developing practical skills that can strengthen your career opportunities.`,
      html: `You are now officially enrolled in <strong>${title}</strong> 🎓 — an important step towards developing practical skills that can strengthen your career opportunities.`,
    },
    {
      text: "You can begin working through the course modules immediately, subject to payment for the course. Take your time, engage with the lessons, complete the quizzes and assignments, and make the most of every opportunity to build your knowledge.",
      html: "You can begin working through the course modules immediately, subject to payment for the course. Take your time, engage with the lessons, complete the quizzes and assignments, and make the most of every opportunity to build your knowledge.",
    },
    {
      text: "🚀 Your learning journey starts now. Keep learning. Keep building. Keep moving forward.",
      html: "🚀 <strong>Your learning journey starts now. Keep learning. Keep building. Keep moving forward.</strong>",
    },
    {
      text: "We’re delighted to have you with us at Paleon Training and look forward to seeing you progress!",
      html: "We’re delighted to have you with us at <strong>Paleon Training</strong> and look forward to seeing you progress!",
    },
  ];

  return {
    to: user.email,
    subject: `You're enrolled in ${course.title}`,
    text: [`Hi ${user.firstName},`, ...paragraphs.map((p) => p.text)].join("\n\n"),
    html: wrapHtml([`Hi ${user.firstName},`, ...paragraphs.map((p) => ({ html: p.html }))]),
  };
}
