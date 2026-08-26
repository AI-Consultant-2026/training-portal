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
  // The active intake's registration deadline and destination link, used by the
  // lead-nurture countdown job (backend/src/jobs/leadNurture.job.ts) to send the
  // welcome/T-21/T-7/T-1 emails in backend/src/emails/templates/lead*.ts. Deliberately
  // env-overridable rather than hardcoded: the next cohort just needs a new date, which
  // should ship as a config change, not a code change.
  enrolment: {
    nextDeadline: process.env.ENROLMENT_DEADLINE ?? "2026-10-01",
    registrationUrl: process.env.ENROLMENT_REGISTRATION_URL ?? "https://paleontraining.com/welcome",
    // Empty by default -- the following cohort's deadline usually isn't decided yet
    // when this one opens. Leave unset and the recycle email
    // (backend/src/emails/templates/leadRecycle.ts) simply never sends; set it once the
    // next intake's date is known to start inviting leads who missed this one.
    followingDeadline: process.env.NEXT_ENROLMENT_DEADLINE ?? "",
  },
  // Optional, same reasoning as `email` above: error tracking is genuinely off (not
  // silently broken) until a Sentry project exists and this is set -- see
  // src/instrument.ts, which no-ops entirely when this is empty.
  sentryDsn: process.env.SENTRY_DSN ?? "",
  // Placeholder receiving-bank details shown on the bank-transfer payment page, and a
  // placeholder card-gateway API key (currently unused by paymentGateway.service.ts's
  // mock implementation). Intentionally always optional/defaulted, same reasoning as
  // `email` above: no real merchant account or receiving bank account has been confirmed
  // yet. Once Paleon Training UK Limited's account details are confirmed, set these env
  // vars (and swap paymentGateway.service.ts's mock for a real gateway call) -- nothing
  // else in the payment flow needs to change.
  bankTransfer: {
    bankName: process.env.BANK_TRANSFER_BANK_NAME ?? "PLACEHOLDER BANK NAME",
    accountName: process.env.BANK_TRANSFER_ACCOUNT_NAME ?? "Paleon Training UK Limited",
    accountNumber: process.env.BANK_TRANSFER_ACCOUNT_NUMBER ?? "0000000000",
    sortCodeOrIban: process.env.BANK_TRANSFER_SORT_CODE_OR_IBAN ?? "00-00-00",
  },
  cardGatewayApiKey: process.env.PAYMENT_GATEWAY_API_KEY ?? "",
};

function parseRefreshDays(value: string): number {
  const match = /^(\d+)d$/.exec(value);
  return match ? Number(match[1]) : 7;
}
