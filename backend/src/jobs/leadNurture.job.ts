import cron from "node-cron";
import {
  sendPendingRecycleEmails,
  sendPendingReminderEmails,
  sendPendingWelcomeEmails,
} from "../services/leadNurture.service";
import { logger } from "../utils/logger";

// Runs in-process on the single web dyno this app currently deploys as (see
// render.yaml) -- fine at today's scale. If this ever scales to multiple instances,
// move it to a dedicated Render Cron Job service instead, to avoid a double-send race
// (both jobs are idempotent via the *_sent_at columns on the Lead model, but only
// within a single process at a time).
export function startLeadNurtureJobs(): void {
  // Checks for brand-new leads every 15 minutes.
  cron.schedule("*/15 * * * *", () => {
    sendPendingWelcomeEmails()
      .then(({ sent }) => {
        if (sent > 0) logger.info(`Lead nurture: sent ${sent} welcome email(s)`);
      })
      .catch((err) => logger.error("Lead nurture: welcome email job failed", err));
  });

  // Runs the T-21/T-14/T-7/T-1/T-0 countdown pass, then the post-deadline recycle
  // pass (a no-op until config.enrolment.followingDeadline is set), once a day.
  cron.schedule("17 6 * * *", () => {
    sendPendingReminderEmails()
      .then(({ sent }) => {
        if (sent > 0) logger.info(`Lead nurture: sent ${sent} reminder email(s)`);
      })
      .catch((err) => logger.error("Lead nurture: reminder email job failed", err));

    sendPendingRecycleEmails()
      .then(({ sent }) => {
        if (sent > 0) logger.info(`Lead nurture: sent ${sent} recycle email(s)`);
      })
      .catch((err) => logger.error("Lead nurture: recycle email job failed", err));
  });

  logger.info("Lead nurture jobs scheduled");
}
