import { runDueScheduledCampaigns } from "../services/emailCampaign.service";
import { logger } from "../utils/logger";

// Starts scheduled email campaigns when their time comes (2026-11-11). Runs in-process, like
// leadNurture.job.ts -- fine on the single web instance this app deploys as. Each due campaign
// is claimed atomically before it starts, so an overlapping tick can't send it twice.
const INTERVAL_MS = 30_000;

export function startEmailCampaignScheduleJob(): void {
  let running = false;
  setInterval(() => {
    if (running) return;
    running = true;
    runDueScheduledCampaigns()
      .then(({ started, failed }) => {
        if (started + failed > 0) logger.info(`Campaign scheduler: ${started} started, ${failed} failed`);
      })
      .catch((err) => logger.error("Campaign scheduler run failed", err))
      .finally(() => {
        running = false;
      });
  }, INTERVAL_MS);
  logger.info("Email campaign scheduler started");
}
