import cron from "node-cron";
import { sendPendingFollowUpEmails, sendPendingWelcomeEmails } from "../services/leadNurture.service";
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

  // Once a day: the day-2 / day-5 / day-10 follow-ups, counted per lead from when it
  // arrived (see leadNurture.service.ts).
  cron.schedule("17 6 * * *", () => {
    sendPendingFollowUpEmails()
      .then(({ sent }) => {
        if (sent > 0) logger.info(`Lead nurture: sent ${sent} follow-up email(s)`);
      })
      .catch((err) => logger.error("Lead nurture: follow-up email job failed", err));
  });

  logger.info("Lead nurture jobs scheduled");
}
