import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { config } from "../config";
import { RefreshToken, User } from "../models";
import { UserRole } from "../models/user.model";

export interface AccessTokenPayload {
  sub: string;
  role: UserRole;
}

function hashToken(plainToken: string): string {
  return crypto.createHash("sha256").update(plainToken).digest("hex");
}

function refreshExpiryDate(): Date {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + config.jwt.refreshExpiresInDays);
  return expiresAt;
}

export function generateAccessToken(user: Pick<User, "id" | "role">): string {
  const payload: AccessTokenPayload = { sub: user.id, role: user.role };
  return jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  } as jwt.SignOptions);
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, config.jwt.accessSecret) as AccessTokenPayload;
}

export async function issueRefreshToken(userId: string): Promise<string> {
  const plainToken = crypto.randomBytes(40).toString("hex");
  await RefreshToken.create({
    userId,
    tokenHash: hashToken(plainToken),
    expiresAt: refreshExpiryDate(),
  });
  return plainToken;
}

export async function findValidRefreshToken(plainToken: string): Promise<RefreshToken | null> {
  const tokenHash = hashToken(plainToken);
  return RefreshToken.findOne({
    where: {
      tokenHash,
      revokedAt: null,
      expiresAt: { [Op.gt]: new Date() },
    },
  });
}

export async function rotateRefreshToken(existing: RefreshToken): Promise<string> {
  const plainToken = crypto.randomBytes(40).toString("hex");
  const next = await RefreshToken.create({
    userId: existing.userId,
    tokenHash: hashToken(plainToken),
    expiresAt: refreshExpiryDate(),
  });

  existing.revokedAt = new Date();
  existing.replacedByTokenId = next.id;
  await existing.save();

  return plainToken;
}

export async function revokeRefreshToken(existing: RefreshToken): Promise<void> {
  existing.revokedAt = new Date();
  await existing.save();
}
