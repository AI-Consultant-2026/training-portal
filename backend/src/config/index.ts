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
};

function parseRefreshDays(value: string): number {
  const match = /^(\d+)d$/.exec(value);
  return match ? Number(match[1]) : 7;
}
