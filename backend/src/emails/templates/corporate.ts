import { config } from "../../config";
import { EmailMessage } from "../../utils/email";
import { wrapHtml } from "../htmlWrapper";

// Corporate staff portal emails (2026-11-10).

export function corporateJoinUrl(joinCode: string): string {
  return `${config.corsOrigin}/company/join/${joinCode}`;
}

// Sent by Paleon (admin) or a company manager to staff who still need to create their login.
export function buildCorporateInviteEmail(input: {
  to: string;
  companyName: string;
  joinCode: string;
  courseTitles: string[];
  invitedBy?: string | null;
}): EmailMessage {
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
}): EmailMessage {
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
