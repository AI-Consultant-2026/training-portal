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
  // Placeholder receiving-bank details shown on the bank-transfer payment page, and a
  // placeholder card-gateway API key (currently unused by paymentGateway.service.ts's
  // mock implementation). Intentionally always optional/defaulted, same reasoning as
  // `email` above: no real merchant account or receiving bank account has been confirmed
  // yet. Once Paleon Training Limited's account details are confirmed, set these env
  // vars (and swap paymentGateway.service.ts's mock for a real gateway call) -- nothing
  // else in the payment flow needs to change.
  bankTransfer: {
    // Master switch for the whole bank-transfer payment flow (the page's details and the
    // POST /payments/bank-transfer endpoint). ON unless BANK_TRANSFER_ENABLED=false is set,
    // so it can be paused and resumed by an env-var change alone. Turning it off does not
    // touch payments already submitted -- admins can still confirm those as usual.
    enabled: process.env.BANK_TRANSFER_ENABLED !== "false",
    // Shows the amber "Temporary payment arrangement" notice on the bank-transfer page
    // (payments currently go to an authorised interim account). ON unless
    // BANK_TRANSFER_TEMPORARY_NOTICE=false. Switching to the permanent business account is
    // then env-only: set the BANK_TRANSFER_* details below and turn this off.
    temporaryNotice: process.env.BANK_TRANSFER_TEMPORARY_NOTICE !== "false",
    bankName: process.env.BANK_TRANSFER_BANK_NAME ?? "PLACEHOLDER BANK NAME",
    accountName: process.env.BANK_TRANSFER_ACCOUNT_NAME ?? "Paleon Training Limited",
    accountNumber: process.env.BANK_TRANSFER_ACCOUNT_NUMBER ?? "0000000000",
    sortCodeOrIban: process.env.BANK_TRANSFER_SORT_CODE_OR_IBAN ?? "",
  },
  card: {
    // Master switch for card payments (POST /payments/card). OFF unless
    // CARD_PAYMENTS_ENABLED=true is set -- the opposite default to bank transfer, because
    // paymentGateway.service.ts is still a mock that approves any card number. Only turn
    // this on once chargeCard() calls a real gateway.
    enabled: process.env.CARD_PAYMENTS_ENABLED === "true",
  },
  cardGatewayApiKey: process.env.PAYMENT_GATEWAY_API_KEY ?? "",
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
