import { User } from "../models";
import { emailAdapter, EmailMessage } from "../utils/email";
import { logger } from "../utils/logger";
import { buildAssignmentGradedEmail } from "./templates/assignmentGraded";
import { buildCapstoneGradedEmail } from "./templates/capstoneGraded";
import { buildCourseCompletedEmail } from "./templates/courseCompleted";
import { buildEmailVerificationEmail } from "./templates/emailVerification";
import { buildEnrollmentConfirmationEmail } from "./templates/enrollmentConfirmation";
import { buildLeadNotificationEmail } from "./templates/leadNotification";
import { buildLeadReminderEmail, ReminderStage } from "./templates/leadReminder";
import { buildLeadWelcomeEmail } from "./templates/leadWelcome";
import { buildPasswordResetEmail } from "./templates/passwordReset";
import { buildQuizGradedEmail } from "./templates/quizGraded";
import { buildWelcomeEmail } from "./templates/welcome";

async function sendEmail(message: EmailMessage): Promise<void> {
  try {
    await emailAdapter.send(message);
  } catch (err) {
    logger.error(`Failed to send email (to=${message.to}, subject="${message.subject}")`, err);
  }
}

export async function sendWelcomeEmail(user: User): Promise<void> {
  await sendEmail(buildWelcomeEmail(user));
}

export async function sendPasswordResetEmail(user: User, resetUrl: string): Promise<void> {
  await sendEmail(buildPasswordResetEmail(user, resetUrl));
}

export async function sendEmailVerificationEmail(user: User, verifyUrl: string): Promise<void> {
  await sendEmail(buildEmailVerificationEmail(user, verifyUrl));
}

export async function sendEnrollmentConfirmationEmail(
  user: User,
  course: { title: string },
): Promise<void> {
  await sendEmail(buildEnrollmentConfirmationEmail(user, course));
}

export async function sendAssignmentGradedEmail(
  user: User,
  assignment: { title: string },
  course: { title: string },
  submission: { score: number | null; feedback: string | null },
): Promise<void> {
  await sendEmail(buildAssignmentGradedEmail(user, assignment, course, submission));
}

export async function sendQuizGradedEmail(
  user: User,
  quiz: { title: string },
  course: { title: string },
  score: number | null,
): Promise<void> {
  await sendEmail(buildQuizGradedEmail(user, quiz, course, score));
}

export async function sendLeadNotificationEmail(lead: {
  name: string;
  email: string;
  course: string;
  university?: string | null;
  source?: string | null;
}): Promise<void> {
  await sendEmail(buildLeadNotificationEmail(lead));
}

export async function sendLeadWelcomeEmail(lead: {
  name: string;
  email: string;
  course: string;
}): Promise<void> {
  await sendEmail(buildLeadWelcomeEmail(lead));
}

export async function sendLeadReminderEmail(
  lead: { name: string; email: string; course: string },
  stage: ReminderStage,
): Promise<void> {
  await sendEmail(buildLeadReminderEmail(lead, stage));
}

export async function sendCapstoneGradedEmail(
  user: User,
  capstone: { title: string },
  course: { title: string },
  score: number,
  feedback: string | null | undefined,
): Promise<void> {
  await sendEmail(buildCapstoneGradedEmail(user, capstone, course, score, feedback));
}

// Deliberately does NOT go through sendEmail()'s swallow-and-log wrapper -- every other
// send in this file is a side effect of some other primary action (register, enroll,
// grade) that must never fail because of a broken mail server. This one's sole purpose
// IS sending an email (an admin clicked "Send email" specifically to notify a student),
// so the admin needs to see a real failure if SMTP is down, not a false "sent" toast.
export async function sendCourseCompletedEmail(
  user: User,
  course: { title: string },
  dashboardUrl: string,
): Promise<void> {
  await emailAdapter.send(buildCourseCompletedEmail(user, course, dashboardUrl));
}
