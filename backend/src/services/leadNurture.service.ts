import * as emails from "../emails";
import { FollowUpStep } from "../emails/templates/leadNurture";
import { Enrollment, Lead, User } from "../models";
import { logger } from "../utils/logger";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

type FollowUpField = "followUp1SentAt" | "followUp2SentAt" | "followUp3SentAt";

// Per-lead follow-ups, counted from when the lead arrived (2026-09-25). Replaced the
// countdown to a shared intake deadline: courses are self-paced and start any time.
export const FOLLOW_UP_STEPS: Array<{ step: FollowUpStep; day: number; field: FollowUpField }> = [
  { step: 1, day: 2, field: "followUp1SentAt" },
  { step: 2, day: 5, field: "followUp2SentAt" },
  { step: 3, day: 10, field: "followUp3SentAt" },
];

// A step that's more than this many days overdue is skipped (and stamped) instead of
// sent -- so leads from before this sequence existed, or a job outage, never get a
// "day 2" email weeks later.
const GRACE_DAYS = 3;

function daysSince(date: Date): number {
  return Math.floor((Date.now() - date.getTime()) / MS_PER_DAY);
}

// A lead is a pre-signup contact with no FK to a User row (see Lead model) -- the only
// way to know "has this person since registered and paid" is a best-effort match on
// email. leads.email isn't unique and nothing guarantees it matches the email someone
// later registers with, so this can miss -- acceptable here since the cost of a false
// negative is one extra email, not a broken feature.
async function hasConfirmedPayment(email: string): Promise<boolean> {
  const user = await User.findOne({ where: { email } });
  if (!user) return false;
  const paidEnrollment = await Enrollment.findOne({ where: { studentId: user.id, paymentConfirmed: true } });
  return !!paidEnrollment;
}

export async function sendPendingWelcomeEmails(): Promise<{ sent: number }> {
  const leads = await Lead.findAll({ where: { welcomeEmailSentAt: null } });
  let sent = 0;

  for (const lead of leads) {
    try {
      await emails.sendLeadWelcomeEmail(lead);
      lead.welcomeEmailSentAt = new Date();
      await lead.save();
      sent++;
    } catch (err) {
      logger.error(`Failed to send lead welcome email (leadId=${lead.id})`, err);
    }
  }

  return { sent };
}

export async function sendPendingFollowUpEmails(): Promise<{ sent: number }> {
  const leads = await Lead.findAll();
  let sent = 0;

  for (const lead of leads) {
    if (!lead.welcomeEmailSentAt || !lead.createdAt) continue;
    const age = daysSince(lead.createdAt);
    const due = FOLLOW_UP_STEPS.filter((s) => age >= s.day && lead[s.field] === null);
    if (due.length === 0) continue;

    const now = new Date();
    // Only the latest due step is a candidate; any earlier ones are skipped, never
    // sent late or several on one day.
    const latest = due[due.length - 1];
    const tooLate = age > latest.day + GRACE_DAYS;

    if (!tooLate && !(await hasConfirmedPayment(lead.email))) {
      try {
        const didSend = await emails.sendLeadFollowUpEmail(lead, latest.step);
        if (didSend) sent++;
      } catch (err) {
        logger.error(`Failed to send lead follow-up email (leadId=${lead.id}, step=${latest.step})`, err);
        continue; // leave unstamped so the next run retries
      }
    }

    for (const s of due) {
      lead[s.field] = now;
    }
    await lead.save();
  }

  return { sent };
}
