import "dotenv/config";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const nodeEnv = process.env.NODE_ENV ?? "development";

export const config = {
  nodeEnv,
  port: Number(process.env.PORT ?? 4000),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS ?? 10),
  jwt: {
    accessSecret: requireEnv("JWT_ACCESS_SECRET"),
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",
    refreshExpiresInDays: parseRefreshDays(process.env.JWT_REFRESH_EXPIRES_IN ?? "7d"),
  },
  storageDriver: process.env.STORAGE_DRIVER ?? "local",
  uploadRoot: process.env.UPLOAD_ROOT ?? "/app/uploads",
  // Intentionally always optional/defaulted, even in production, unlike jwt.accessSecret above:
  // no real SMTP provider has been chosen yet (a deliberate follow-up, not done this pass), and
  // email sends are already best-effort/non-fatal (see backend/src/emails/index.ts) - the app
  // must still boot and serve traffic with email silently no-op'ing until a provider is set.
  email: {
    smtpHost: process.env.SMTP_HOST ?? "mailhog",
    smtpPort: Number(process.env.SMTP_PORT ?? 1025),
    smtpSecure: (process.env.SMTP_SECURE ?? "false") === "true",
    smtpUser: process.env.SMTP_USER ?? "",
    smtpPass: process.env.SMTP_PASS ?? "",
    fromAddress: process.env.EMAIL_FROM_ADDRESS ?? "no-reply@trainingportal.local",
  },
  leadsNotifyEmail: process.env.LEADS_NOTIFY_EMAIL ?? "hello@paleontraining.com",
  // Where the in-portal "Report a problem" form sends reports (2026-09-25).
  supportEmail: process.env.SUPPORT_EMAIL ?? "support@paleontraining.com",
  // Optional, same reasoning as `email` above: error tracking is genuinely off (not
  // silently broken) until a Sentry project exists and this is set -- see
  // src/instrument.ts, which no-ops entirely when this is empty.
  sentryDsn: process.env.SENTRY_DSN ?? "",
  analytics: {
    // Google Analytics 4 Measurement ID ("G-XXXXXXXXXX"). Unset or malformed = analytics
    // off: /analytics.js serves a no-op stub, so no Google script loads and no consent
    // banner shows. See marketing/analytics.js for the consent behaviour.
    ga4MeasurementId: /^G-[A-Z0-9]{4,}$/.test(process.env.GA4_MEASUREMENT_ID ?? "")
      ? (process.env.GA4_MEASUREMENT_ID as string)
      : "",
    // Meta Pixel ID (digits only, from Meta Events Manager), for measuring Facebook/Instagram
    // ads (2026-09-26). Unset or malformed = no Pixel. Only loads after the visitor accepts
    // cookies -- see marketing/analytics.js.
    metaPixelId: /^\d{10,20}$/.test(process.env.META_PIXEL_ID ?? "") ? (process.env.META_PIXEL_ID as string) : "",
  },
};

function parseRefreshDays(value: string): number {
  const match = /^(\d+)d$/.exec(value);
  return match ? Number(match[1]) : 7;
}
