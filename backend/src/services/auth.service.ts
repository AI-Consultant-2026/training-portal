import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config";
import * as emails from "../emails";
import { User } from "../models";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";
import { attachReferralOnRegister } from "./referral.service";
import { recordAttendance } from "./zoomAttendee.service";
import {
  findValidRefreshToken,
  generateAccessToken,
  issueRefreshToken,
  revokeRefreshToken,
  rotateRefreshToken,
} from "./token.service";
import { toLocalNigerianMobile } from "../constants/vtpass";

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location?: string;
  courseInterest?: string;
  university?: string;
  referralCode?: string;
  phone?: string;
  mobileNetwork?: string;
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

// The Ambassador Hour Zoom (Sat 10 Oct 2026, 2pm WAT) promoted by the homepage countdown.
// Anyone who signs up before the session ends (3pm WAT = 14:00 UTC) is also added to that
// session's list on /admin/zoom-attendees. After that, signups are no longer recorded.
const ZOOM_SESSION_DATE = "2026-10-10";
const ZOOM_SESSION_ENDS_AT = Date.parse("2026-10-10T14:00:00Z");

// Maps the register form's status onto the /zoom-attendees choices; "Current Student"
// has no exact match there, so it is left blank.
const ZOOM_STATUS_BY_REGISTRATION_STATUS: Record<string, string> = {
  Graduate: "Graduate",
  "Non-Graduate": "Non-graduate",
};

const PASSWORD_RESET_PURPOSE = "password-reset";
const EMAIL_VERIFICATION_PURPOSE = "email-verification";

function sendVerificationEmail(user: User): void {
  const verifyToken = jwt.sign({ sub: user.id, purpose: EMAIL_VERIFICATION_PURPOSE }, config.jwt.accessSecret, {
    expiresIn: "24h",
  });
  const verifyUrl = `${config.corsOrigin}/verify-email?token=${verifyToken}`;
  // Best-effort, not awaited -- same reasoning as sendWelcomeEmail below.
  emails
    .sendEmailVerificationEmail(user, verifyUrl)
    .catch((err) => logger.error("Failed to send email verification email", err));
}

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
    location: input.location ?? "Nigeria",
    courseInterest: input.courseInterest ?? null,
    university: input.university ?? null,
    // Stored where /refer and the admin payout flow already look for the payout number.
    profileData: {
      ...(input.phone ? { referralPayoutPhone: toLocalNigerianMobile(input.phone) ?? input.phone } : {}),
      ...(input.mobileNetwork ? { mobileNetwork: input.mobileNetwork } : {}),
    },
  });

  // Best-effort: a malformed or unknown referral code must never fail a real signup.
  // attachReferralOnRegister already swallows the "no such code" case; this guards
  // against anything unexpected (e.g. a transient DB error on the lookup).
  try {
    await attachReferralOnRegister(user.id, input.referralCode);
  } catch (err) {
    logger.error("Failed to attach referral on registration", err);
  }

  // Best-effort, same as the referral above: never fail a real signup over this.
  if (Date.now() < ZOOM_SESSION_ENDS_AT) {
    try {
      await recordAttendance({
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        dateAttended: ZOOM_SESSION_DATE,
        status: (input.university && ZOOM_STATUS_BY_REGISTRATION_STATUS[input.university]) || undefined,
        phone: input.phone || undefined,
      });
    } catch (err) {
      logger.error("Failed to add registration to the Zoom attendees list", err);
    }
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = await issueRefreshToken(user.id);

  // Best-effort, not awaited: an unreachable/slow SMTP provider must never hang
  // registration itself -- the account is already created and usable at this point.
  emails.sendWelcomeEmail(user).catch((err) => logger.error("Failed to send welcome email", err));
  sendVerificationEmail(user);

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
  // Best-effort, not awaited -- same reasoning as sendWelcomeEmail above.
  emails
    .sendPasswordResetEmail(user, resetUrl)
    .catch((err) => logger.error("Failed to send password reset email", err));
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

export async function verifyEmail(token: string): Promise<void> {
  let payload: { sub: string; purpose: string };
  try {
    payload = jwt.verify(token, config.jwt.accessSecret) as { sub: string; purpose: string };
  } catch {
    throw ApiError.badRequest("Invalid or expired verification link");
  }

  if (payload.purpose !== EMAIL_VERIFICATION_PURPOSE) {
    throw ApiError.badRequest("Invalid or expired verification link");
  }

  const user = await User.findByPk(payload.sub);
  if (!user) {
    throw ApiError.badRequest("Invalid or expired verification link");
  }

  // Idempotent: a student clicking an already-used link (double-click, stale tab)
  // should just see success again, not an error.
  if (!user.emailVerifiedAt) {
    user.emailVerifiedAt = new Date();
    await user.save();
  }
}

export async function resendVerificationEmail(userId: string): Promise<void> {
  const user = await User.findByPk(userId);
  if (!user || user.emailVerifiedAt) {
    return;
  }
  sendVerificationEmail(user);
}
