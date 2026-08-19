import * as Sentry from "@sentry/node";
import { config } from "./config";

// Imported first (before anything else) in server.ts, per Sentry's own documented
// setup convention -- lets it instrument express/pg/etc. as they're required
// afterward. No-ops entirely when SENTRY_DSN isn't set (e.g. local dev, or before a
// Sentry project has actually been created for this app).
if (config.sentryDsn) {
  Sentry.init({
    dsn: config.sentryDsn,
    environment: config.nodeEnv,
  });
}
