import * as Sentry from "@sentry/react";

// Imported first in main.tsx, mirroring the backend's own src/instrument.ts. No-ops
// entirely when VITE_SENTRY_DSN isn't set at build time (e.g. local dev, or before a
// Sentry project has actually been created for this app).
const dsn = import.meta.env.VITE_SENTRY_DSN;
if (dsn) {
  Sentry.init({ dsn });
}
