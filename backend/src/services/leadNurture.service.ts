import { config } from "../config";
import * as emails from "../emails";
import { ReminderStage } from "../emails/templates/leadReminder";
import { Enrollment, Lead, User } from "../models";
import { logger } from "../utils/logger";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

type ReminderField =
  | "reminder21dSentAt"
  | "reminder14dSentAt"
  | "reminder7dSentAt"
  | "reminder1dSentAt"
  | "reminder0dSentAt";

const REMINDER_STAGES: Array<{ stage: ReminderStage; days: number; field: ReminderField }> = [
  { stage: "21d", days: 21, field: "reminder21dSentAt" },
  { stage: "14d", days: 14, field: "reminder14dSentAt" },
  { stage: "7d", days: 7, field: "reminder7dSentAt" },
  { stage: "1d", days: 1, field: "reminder1dSentAt" },
  { stage: "0d", days: 0, field: "reminder0dSentAt" },
];

function daysUntilDeadline(): number {
  const deadline = new Date(config.enrolment.nextDeadline);
  const today = new Date();
  const deadlineUtc = Date.UTC(deadline.getUTCFullYear(), deadline.getUTCMonth(), deadline.getUTCDate());
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  return Math.round((deadlineUtc - todayUtc) / MS_PER_DAY);
}

// A lead is a pre-signup contact with no FK to a User row (see Lead model) -- the only
// way to know "has this person since registered and paid" is a best-effort match on
// email. leads.email isn't unique and nothing guarantees it matches the email someone
// later registers with, so this can miss -- acceptable here since the cost of a false
// negative is one extra reminder email, not a broken feature.
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

export async function sendPendingReminderEmails(): Promise<{ sent: number }> {
  const daysLeft = daysUntilDeadline();
  if (daysLeft < 0) {
    return { sent: 0 };
  }

  const leads = await Lead.findAll();
  let sent = 0;

  for (const lead of leads) {
    const applicable = REMINDER_STAGES.filter((s) => daysLeft <= s.days && lead[s.field] === null);
    if (applicable.length === 0) continue;

    if (await hasConfirmedPayment(lead.email)) {
      continue;
    }

    // Send only the most urgent stage that's due -- if a missed run means several
    // thresholds were crossed at once (e.g. the job was down from day -21 to day -1),
    // sending "3 weeks left" the same day as "tomorrow's the last day" would be
    // confusing. Backfill the skipped stages' timestamps too, so they never fire late.
    const mostUrgent = applicable.reduce((a, b) => (a.days < b.days ? a : b));

    try {
      await emails.sendLeadReminderEmail(lead, mostUrgent.stage);
      const now = new Date();
      for (const s of applicable) {
        lead[s.field] = now;
      }
      await lead.save();
      sent++;
    } catch (err) {
      logger.error(`Failed to send lead reminder email (leadId=${lead.id}, stage=${mostUrgent.stage})`, err);
    }
  }

  return { sent };
}

// Invites a lead who never converted by the current deadline to the next cohort,
// instead of simply losing them once config.enrolment.nextDeadline passes. Gracefully
// no-ops until config.enrolment.followingDeadline is actually set -- see that config
// comment for why it's empty by default.
export async function sendPendingRecycleEmails(): Promise<{ sent: number }> {
  if (!config.enrolment.followingDeadline) {
    return { sent: 0 };
  }
  if (daysUntilDeadline() >= 0) {
    return { sent: 0 };
  }

  const leads = await Lead.findAll({ where: { recycleEmailSentAt: null } });
  let sent = 0;

  for (const lead of leads) {
    if (await hasConfirmedPayment(lead.email)) {
      // They converted after all -- backfill so we stop re-checking them every run.
      lead.recycleEmailSentAt = new Date();
      await lead.save();
      continue;
    }

    try {
      await emails.sendLeadRecycleEmail(lead);
      lead.recycleEmailSentAt = new Date();
      await lead.save();
      sent++;
    } catch (err) {
      logger.error(`Failed to send lead recycle email (leadId=${lead.id})`, err);
    }
  }

  return { sent };
}
