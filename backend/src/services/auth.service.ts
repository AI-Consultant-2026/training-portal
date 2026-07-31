import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config";
import * as emails from "../emails";
import { User } from "../models";
import { ApiError } from "../utils/ApiError";
import {
  findValidRefreshToken,
  generateAccessToken,
  issueRefreshToken,
  revokeRefreshToken,
  rotateRefreshToken,
} from "./token.service";

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResult {
  user: User;
  accessToken: string;
  refreshToken: string;
}

const PASSWORD_RESET_PURPOSE = "password-reset";

export async function register(input: RegisterInput): Promise<AuthResult> {
  const existing = await User.findOne({ where: { email: input.email } });
  if (existing) {
    throw ApiError.conflict("An account with this email already exists");
  }

  const passwordHash = await bcrypt.hash(input.password, config.bcryptSaltRounds);

  const user = await User.create({
    email: input.email,
    passwordHash,
    firstName: input.firstName,
    lastName: input.lastName,
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = await issueRefreshToken(user.id);

  await emails.sendWelcomeEmail(user);

  return { user, accessToken, refreshToken };
}

export async function login(input: LoginInput): Promise<AuthResult> {
  const user = await User.findOne({ where: { email: input.email } });
  if (!user || user.status !== "active") {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);
  if (!passwordMatches) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = await issueRefreshToken(user.id);

  return { user, accessToken, refreshToken };
}

export async function refresh(plainRefreshToken: string): Promise<AuthResult> {
  const tokenRecord = await findValidRefreshToken(plainRefreshToken);
  if (!tokenRecord) {
    throw ApiError.unauthorized("Invalid or expired refresh token");
  }

  const user = await User.findByPk(tokenRecord.userId);
  if (!user || user.status !== "active") {
    throw ApiError.unauthorized("Invalid or expired refresh token");
  }

  const newRefreshToken = await rotateRefreshToken(tokenRecord);
  const accessToken = generateAccessToken(user);

  return { user, accessToken, refreshToken: newRefreshToken };
}

export async function logout(plainRefreshToken: string): Promise<void> {
  const tokenRecord = await findValidRefreshToken(plainRefreshToken);
  if (tokenRecord) {
    await revokeRefreshToken(tokenRecord);
  }
}

export async function requestPasswordReset(email: string): Promise<void> {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    // Do not reveal whether the email exists.
    return;
  }

  const resetToken = jwt.sign({ sub: user.id, purpose: PASSWORD_RESET_PURPOSE }, config.jwt.accessSecret, {
    expiresIn: "1h",
  });

  const resetUrl = `${config.corsOrigin}/reset-password?token=${resetToken}`;
  await emails.sendPasswordResetEmail(user, resetUrl);
}

export async function confirmPasswordReset(token: string, newPassword: string): Promise<void> {
  let payload: { sub: string; purpose: string };
  try {
    payload = jwt.verify(token, config.jwt.accessSecret) as { sub: string; purpose: string };
  } catch {
    throw ApiError.badRequest("Invalid or expired reset token");
  }

  if (payload.purpose !== PASSWORD_RESET_PURPOSE) {
    throw ApiError.badRequest("Invalid or expired reset token");
  }

  const user = await User.findByPk(payload.sub);
  if (!user) {
    throw ApiError.badRequest("Invalid or expired reset token");
  }

  user.passwordHash = await bcrypt.hash(newPassword, config.bcryptSaltRounds);
  await user.save();
}
