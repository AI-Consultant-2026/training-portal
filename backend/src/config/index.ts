import "dotenv/config";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS ?? 10),
  jwt: {
    accessSecret: requireEnv("JWT_ACCESS_SECRET"),
    refreshSecret: requireEnv("JWT_REFRESH_SECRET"),
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",
    refreshExpiresInDays: parseRefreshDays(process.env.JWT_REFRESH_EXPIRES_IN ?? "7d"),
  },
  storageDriver: process.env.STORAGE_DRIVER ?? "local",
  uploadRoot: process.env.UPLOAD_ROOT ?? "/app/uploads",
};

function parseRefreshDays(value: string): number {
  const match = /^(\d+)d$/.exec(value);
  return match ? Number(match[1]) : 7;
}
