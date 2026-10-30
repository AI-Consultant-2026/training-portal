import { User } from "../models";
import { emailAdapter, EmailMessage } from "../utils/email";
import { logger } from "../utils/logger";
import { config } from "../config";
import { COUNTRIES, CountryCode } from "../constants/countries";
import { buildAssignmentGradedEmail } from "./templates/assignmentGraded";
import { buildCapstoneGradedEmail } from "./templates/capstoneGraded";
import { buildCourseCompletedEmail } from "./templates/courseCompleted";
import { buildEmailVerificationEmail } from "./templates/emailVerification";
import { buildEnrollmentConfirmationEmail } from "./templates/enrollmentConfirmation";
import { buildLeadNotificationEmail } from "./templates/leadNotification";
import {
  buildDepositConfirmedEmail,
  buildPaymentConfirmedEmail,
  buildPaystackUnmatchedEmail,
} from "./templates/payments";
import { buildLeadFollowUpEmail, buildLeadWelcomeEmail, FollowUpStep } from "./templates/leadNurture";
import { buildPasswordResetEmail } from "./templates/passwordReset";
import { buildQuizGradedEmail, QuizAnswerFeedback } from "./templates/quizGraded";
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
  feedback: QuizAnswerFeedback[] = [],
): Promise<void> {
  await sendEmail(buildQuizGradedEmail(user, quiz, course, score, feedback));
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
}

// A WhatsApp number left on a "launching soon" country's waitlist (2026-10-30).
export async function sendWaitlistNotificationEmail(signup: { country: string; whatsapp: string }): Promise<void> {
  const name = COUNTRIES[signup.country as CountryCode]?.name ?? signup.country;
  await sendEmail({
    to: config.leadsNotifyEmail,
    subject: `New ${name} waitlist sign-up`,
    text: `Someone joined the ${name} waitlist on paleontraining.com.\n\nWhatsApp: ${signup.whatsapp}\nCountry: ${name}\n\nAll sign-ups are listed on the admin dashboard.`,
    html: `<p>Someone joined the ${escapeHtml(name)} waitlist on paleontraining.com.</p><p>WhatsApp: ${escapeHtml(signup.whatsapp)}<br>Country: ${escapeHtml(name)}</p><p>All sign-ups are listed on the admin dashboard.</p>`,
  });
}

export async function sendLeadNotificationEmail(lead: {
  name: string;
  email: string;
  phone?: string | null;
  course: string;
  university?: string | null;
  source?: string | null;
  sector?: string | null;
  interest?: string | null;
}): Promise<void> {
  await sendEmail(buildLeadNotificationEmail(lead));
}

export async function sendLeadWelcomeEmail(lead: {
  id: string;
  name: string;
  email: string;
  course: string;
  sector?: string | null;
}): Promise<void> {
  await sendEmail(buildLeadWelcomeEmail(lead));
}

// Returns false when there was nothing to send (leads whose course isn't one of the
// four live courses only get the welcome email).
export async function sendLeadFollowUpEmail(
  lead: { id: string; name: string; email: string; course: string; sector?: string | null },
  step: FollowUpStep,
): Promise<boolean> {
  const message = buildLeadFollowUpEmail(lead, step);
  if (!message) return false;
  await sendEmail(message);
  return true;
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


export async function sendDepositConfirmedEmail(input: Parameters<typeof buildDepositConfirmedEmail>[0]): Promise<void> {
  await sendEmail(buildDepositConfirmedEmail(input));
}

export async function sendPaymentConfirmedEmail(input: Parameters<typeof buildPaymentConfirmedEmail>[0]): Promise<void> {
  await sendEmail(buildPaymentConfirmedEmail(input));
}

export async function sendPaystackUnmatchedEmail(input: Parameters<typeof buildPaystackUnmatchedEmail>[0]): Promise<void> {
  await sendEmail(buildPaystackUnmatchedEmail(input));
}
