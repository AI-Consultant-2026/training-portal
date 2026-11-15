import { config } from "../../config";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

// Corporate staff portal emails (2026-11-10).

// Universities' students use /university/join/<code> (2026-11-15); the same page.
export function corporateJoinUrl(joinCode: string, clientType: string = "company"): string {
  return `${config.corsOrigin}/${clientType === "university" ? "university" : "company"}/join/${joinCode}`;
}

// Sent by Paleon (admin) or a company manager to staff who still need to create their login.
export function buildCorporateInviteEmail(input: {
  to: string;
  companyName: string;
  joinCode: string;
  courseTitles: string[];
  invitedBy?: string | null;
  university?: boolean;
}): EmailMessage {
  if (input.university) return buildUniversityInviteEmail(input);
  const url = corporateJoinUrl(input.joinCode);
  const lines = [
    "Hello,",
    `${input.invitedBy ? `${input.invitedBy} at ` : ""}${input.companyName} has given you access to staff training with Paleon Training.`,
    input.courseTitles.length === 1
      ? `Your course: ${input.courseTitles[0]}.`
      : `Your courses: ${input.courseTitles.join("; ")}.`,
    "Create your login (it takes a minute) with this link:",
    url,
    "Use your work email address. After that, log in any time at " + `${config.corsOrigin}/login.`,
    "If you weren't expecting this email, you can ignore it.",
  ];
  return {
    to: input.to,
    subject: `${input.companyName}: set up your Paleon Training staff login`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}

export function buildCorporateWelcomeEmail(input: {
  to: string;
  firstName: string;
  companyName: string;
  courseTitles: string[];
  university?: boolean;
}): EmailMessage {
  if (input.university) return buildUniversityWelcomeEmail(input);
  const lines = [
    `Hi ${input.firstName},`,
    `Your Paleon Training staff login for ${input.companyName} is ready.`,
    input.courseTitles.length > 0
      ? `You have access to: ${input.courseTitles.join("; ")}.`
      : "Your company will add your courses shortly.",
    "Log in any time to continue where you left off:",
    `${config.corsOrigin}/login`,
    "Forgot your password? Use \"Forgot password\" on the login page.",
  ];
  return {
    to: input.to,
    subject: `Welcome to Paleon Training (${input.companyName})`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}

// University places (2026-11-15): the same emails, worded for students.
function buildUniversityInviteEmail(input: {
  to: string;
  companyName: string;
  joinCode: string;
  courseTitles: string[];
  invitedBy?: string | null;
}): EmailMessage {
  const url = corporateJoinUrl(input.joinCode, "university");
  const lines = [
    "Hello,",
    `${input.invitedBy ? `${input.invitedBy} at ` : ""}${input.companyName} has paid for your place on a Paleon Training course.`,
    input.courseTitles.length === 1
      ? `The course: ${input.courseTitles[0]}.`
      : `Choose from: ${input.courseTitles.join("; ")}.`,
    "Create your student login (it takes a minute) with this link, and start straight away:",
    url,
    "After that, log in any time at " + `${config.corsOrigin}/login.`,
    "If you weren't expecting this email, you can ignore it.",
  ];
  return {
    to: input.to,
    subject: `${input.companyName}: your paid place on a Paleon Training course`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}

function buildUniversityWelcomeEmail(input: {
  to: string;
  firstName: string;
  companyName: string;
  courseTitles: string[];
}): EmailMessage {
  const lines = [
    `Hi ${input.firstName},`,
    `Your Paleon Training login is ready. ${input.companyName} has paid for your place.`,
    input.courseTitles.length > 0
      ? `Your course${input.courseTitles.length === 1 ? "" : "s"}: ${input.courseTitles.join("; ")}.`
      : "Your university will add your course shortly.",
    "Log in any time to continue where you left off:",
    `${config.corsOrigin}/login`,
    "Forgot your password? Use \"Forgot password\" on the login page.",
  ];
  return {
    to: input.to,
    subject: `Welcome to Paleon Training (${input.companyName})`,
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
