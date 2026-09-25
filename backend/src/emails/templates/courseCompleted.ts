import { User } from "../../models";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

export function buildCourseCompletedEmail(
  user: User,
  course: { title: string },
  dashboardUrl: string,
): EmailMessage {
  const lines = [
    `Hi ${user.firstName},`,
    `Congratulations on completing "${course.title}"! Your certificate of completion is ready to download from your dashboard.`,
    dashboardUrl,
    `We'd love to hear how it went. Use "Share feedback" next to the course on your dashboard \u2014 it takes a minute, and it helps future learners decide.`,
  ];

  return {
    to: user.email,
    subject: `Congratulations on completing ${course.title}!`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
