import "./instrument";
import { createApp } from "./app";
import { config } from "./config";
import { startLeadNurtureJobs } from "./jobs/leadNurture.job";
import { sequelize } from "./models";
import { logger } from "./utils/logger";

const app = createApp();

async function start() {
  await sequelize.authenticate();
  logger.info("Database connection established");

  const server = app.listen(config.port, () => {
    logger.info(`Backend listening on port ${config.port} (${config.nodeEnv})`);
  });

  // Skipped in tests -- avoids a lingering cron timer keeping the test process alive if
  // this file is ever imported from a test context (integration tests currently import
  // createApp() directly and never run this file, but this guard costs nothing).
  if (config.nodeEnv !== "test") {
    startLeadNurtureJobs();
  }

  function shutdown(signal: string) {
    logger.info(`Received ${signal}, shutting down gracefully`);
    server.close(() => {
      process.exit(0);
    });
  }

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

start().catch((err) => {
  logger.error("Failed to start server:", err);
  process.exit(1);
});
