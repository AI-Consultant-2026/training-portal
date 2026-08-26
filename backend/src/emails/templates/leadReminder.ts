import { config } from "../../config";
import { EmailMessage } from "../../utils/email";
import { formatEnrolmentDeadline } from "../enrolmentDate";
import { wrapHtml } from "../htmlWrapper";

export type ReminderStage = "21d" | "14d" | "7d" | "1d" | "0d";

interface LeadFields {
  name: string;
  course: string;
}

interface StageCopy {
  subject: (lead: LeadFields) => string;
  // Replaces the generic "X days left" opener -- lets 14d carry a value-add pitch
  // instead of pure urgency, since a lead 14 days out has usually already seen the
  // urgency framing once (at 21d) and needs a different reason to act.
  body: (lead: LeadFields) => string[];
}

const STAGE_COPY: Record<ReminderStage, StageCopy> = {
  "21d": {
    subject: () => "3 weeks left to register",
    body: (lead) => [
      `Just a friendly heads-up: there are 3 weeks left to register for ${lead.course} at Paleon Training, on ${formatEnrolmentDeadline()}.`,
    ],
  },
  "14d": {
    subject: (lead) => `What you'll build in ${lead.course}`,
    body: (lead) => [
      `Two weeks out from registration closing, so here's what the next 8 weeks of ${lead.course} actually look like: illustrated lessons, real assignments, and a capstone project you finish with — something concrete to show, not just a certificate.`,
      "Most people who register do it in this window, once they've seen the syllabus rather than just the headline.",
    ],
  },
  "7d": {
    subject: () => "1 week left to register",
    body: (lead) => [
      `Time's getting short — there's 1 week left to register for ${lead.course} at Paleon Training, on ${formatEnrolmentDeadline()}.`,
    ],
  },
  "1d": {
    subject: () => "Last call — registration closes tomorrow",
    body: (lead) => [
      `This is the final reminder: registration for ${lead.course} at Paleon Training closes tomorrow, ${formatEnrolmentDeadline()}.`,
    ],
  },
  "0d": {
    subject: () => "Today's the last day to register",
    body: (lead) => [
      `Today's the day — registration for ${lead.course} at Paleon Training closes at the end of today, ${formatEnrolmentDeadline()}.`,
      "If you've been meaning to do this, now's the moment.",
    ],
  },
};

export function buildLeadReminderEmail(lead: LeadFields & { email: string }, stage: ReminderStage): EmailMessage {
  const copy = STAGE_COPY[stage];
  const lines = [
    `Hi ${lead.name},`,
    ...copy.body(lead),
    `Register here: ${config.enrolment.registrationUrl}`,
    "Already registered? You can ignore this — thank you, and see you in class.",
  ];

  return {
    to: lead.email,
    subject: copy.subject(lead),
    text: lines.join("\n\n"),
    html: wrapHtml(lines),
  };
}
