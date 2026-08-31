import { randomInt } from "crypto";
import { Op } from "sequelize";
import {
  DEFAULT_REWARD_TYPE,
  REFERRAL_CODE_ALPHABET,
  REFERRAL_CODE_BODY_LENGTH,
  REFERRAL_CODE_PREFIX,
  REFERRAL_LEADERBOARD_SIZE,
  REFERRER_REWARD_NGN,
  REFEREE_REWARD_NGN,
  REFERRAL_REWARD_TYPES,
  ReferralRewardType,
} from "../constants/referral";
import { Enrollment, Referral, User } from "../models";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";

type RewardParty = "referrer" | "referee";

function isRewardType(value: unknown): value is ReferralRewardType {
  return typeof value === "string" && (REFERRAL_REWARD_TYPES as readonly string[]).includes(value);
}

// A user's chosen payout method for the rewards they earn, stored on profileData so it
// needs no dedicated column. Snapshotted onto each Referral row when it qualifies, so
// changing the preference later only affects rewards not yet issued.
function rewardPreferenceOf(user: User): ReferralRewardType {
  const stored = (user.profileData as Record<string, unknown>)?.referralRewardType;
  return isRewardType(stored) ? stored : DEFAULT_REWARD_TYPE;
}

function generateCandidateCode(): string {
  let body = "";
  for (let i = 0; i < REFERRAL_CODE_BODY_LENGTH; i += 1) {
    body += REFERRAL_CODE_ALPHABET[randomInt(REFERRAL_CODE_ALPHABET.length)];
  }
  return `${REFERRAL_CODE_PREFIX}${body}`;
}

export function normaliseCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

// Idempotent: returns the user's existing code, or generates and persists one. Retries on
// the (astronomically unlikely) collision rather than trusting the first draw.
export async function ensureReferralCode(user: User): Promise<string> {
  if (user.referralCode) return user.referralCode;

  for (let attempt = 0; attempt < 6; attempt += 1) {
    const candidate = generateCandidateCode();
    const clash = await User.findOne({ where: { referralCode: candidate }, attributes: ["id"] });
    if (clash) continue;
    user.referralCode = candidate;
    await user.save();
    return candidate;
  }
  throw ApiError.badRequest("Could not generate a referral code, please try again");
}

export async function ensureReferralCodeForUserId(userId: string): Promise<string> {
  const user = await User.findByPk(userId);
  if (!user) throw ApiError.notFound("User not found");
  return ensureReferralCode(user);
}

// Called (best-effort) from auth.service.register. Never throws past the caller in a way
// that would fail the signup itself -- a bad or missing code just means no referral.
export async function attachReferralOnRegister(refereeId: string, rawCode?: string | null): Promise<void> {
  if (!rawCode) return;
  const code = normaliseCode(rawCode);
  if (!code) return;

  const referrer = await User.findOne({ where: { referralCode: code } });
  if (!referrer) {
    logger.info(`Referral code "${code}" used at registration did not match any user`);
    return;
  }
  if (referrer.id === refereeId) return;

  const existing = await Referral.findOne({ where: { refereeId } });
  if (existing) return;

  await Referral.create({
    referrerId: referrer.id,
    refereeId,
    code,
    status: "pending",
    referrerRewardType: rewardPreferenceOf(referrer),
    referrerRewardAmountNgn: REFERRER_REWARD_NGN,
    refereeRewardType: DEFAULT_REWARD_TYPE,
    refereeRewardAmountNgn: REFEREE_REWARD_NGN,
  });
}

// The reward trigger. Called after any code path confirms a course payment (self-service
// card, admin bank-transfer confirmation, admin manual enrolment). Idempotent and safe to
// call on every payment: it only acts on a still-"pending" referral for this student, and
// only the first time.
export async function handleQualifyingPayment(enrollment: Enrollment): Promise<void> {
  if (!enrollment.paymentConfirmed) return;

  const referral = await Referral.findOne({ where: { refereeId: enrollment.studentId, status: "pending" } });
  if (!referral) return;

  const referrer = await User.findByPk(referral.referrerId);

  referral.status = "qualified";
  referral.qualifiedAt = new Date();
  referral.qualifyingEnrollmentId = enrollment.id;
  referral.referrerRewardType = referrer ? rewardPreferenceOf(referrer) : referral.referrerRewardType;
  referral.referrerRewardAmountNgn = REFERRER_REWARD_NGN;
  referral.refereeRewardAmountNgn = REFEREE_REWARD_NGN;
  await referral.save();

  logger.info(
    `Referral ${referral.id} qualified: ${referral.referrerId} earns a reward for referring ${referral.refereeId}`,
  );
}

function fullName(user?: User | null): string {
  if (!user) return "";
  return `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
}

function refereeDisplayName(referee?: User | null): string {
  return fullName(referee) || "A student";
}

export interface MyReferralSummary {
  code: string;
  shareUrl: string;
  rewardType: ReferralRewardType;
  rewardPerReferralNgn: number;
  welcomeBonusNgn: number;
  counts: { invited: number; joined: number; qualified: number };
  earnings: { pendingNgn: number; issuedNgn: number; totalNgn: number };
  referrals: {
    id: string;
    refereeName: string;
    status: "pending" | "qualified" | "void";
    rewardStatus: "pending" | "issued";
    joinedAt: string;
    qualifiedAt: string | null;
  }[];
  leaderboardRank: number | null;
}

export async function getMyReferralSummary(userId: string, appOrigin: string): Promise<MyReferralSummary> {
  const user = await User.findByPk(userId);
  if (!user) throw ApiError.notFound("User not found");

  const code = await ensureReferralCode(user);
  const rows = await Referral.findAll({
    where: { referrerId: userId },
    include: [{ model: User, as: "referee", attributes: ["firstName", "lastName"] }],
    order: [["createdAt", "DESC"]],
  });

  const qualified = rows.filter((r) => r.status === "qualified");
  const pendingNgn = qualified
    .filter((r) => r.referrerRewardStatus === "pending")
    .reduce((sum, r) => sum + Number(r.referrerRewardAmountNgn), 0);
  const issuedNgn = qualified
    .filter((r) => r.referrerRewardStatus === "issued")
    .reduce((sum, r) => sum + Number(r.referrerRewardAmountNgn), 0);

  const leaderboard = await getLeaderboard();
  const rankIndex = leaderboard.allTime.findIndex((entry) => entry.userId === userId);

  return {
    code,
    shareUrl: `${appOrigin}/register?ref=${code}`,
    rewardType: rewardPreferenceOf(user),
    rewardPerReferralNgn: REFERRER_REWARD_NGN,
    welcomeBonusNgn: REFEREE_REWARD_NGN,
    counts: {
      invited: rows.length,
      joined: rows.filter((r) => r.status !== "void").length,
      qualified: qualified.length,
    },
    earnings: { pendingNgn, issuedNgn, totalNgn: pendingNgn + issuedNgn },
    referrals: rows.map((r) => ({
      id: r.id,
      refereeName: refereeDisplayName((r as unknown as { referee?: User }).referee),
      status: r.status as "pending" | "qualified" | "void",
      rewardStatus: r.referrerRewardStatus as "pending" | "issued",
      joinedAt: r.createdAt.toISOString(),
      qualifiedAt: r.qualifiedAt ? r.qualifiedAt.toISOString() : null,
    })),
    leaderboardRank: rankIndex >= 0 ? rankIndex + 1 : null,
  };
}

export async function setRewardPreference(userId: string, rewardType: ReferralRewardType): Promise<ReferralRewardType> {
  const user = await User.findByPk(userId);
  if (!user) throw ApiError.notFound("User not found");

  user.profileData = { ...(user.profileData as Record<string, unknown>), referralRewardType: rewardType };
  await user.save();

  // Re-point rewards that haven't been paid out yet; anything already issued keeps the
  // type it was paid in.
  await Referral.update(
    { referrerRewardType: rewardType },
    { where: { referrerId: userId, referrerRewardStatus: "pending" } },
  );

  return rewardType;
}

export interface CodeValidation {
  valid: boolean;
  referrerName: string | null;
}

export async function validateCode(rawCode: string): Promise<CodeValidation> {
  const code = normaliseCode(rawCode);
  if (!code) return { valid: false, referrerName: null };

  const referrer = await User.findOne({
    where: { referralCode: code },
    attributes: ["firstName", "lastName"],
  });
  if (!referrer) return { valid: false, referrerName: null };

  return { valid: true, referrerName: fullName(referrer) || null };
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  university: string | null;
  qualifiedReferrals: number;
}

async function buildLeaderboard(since?: Date): Promise<LeaderboardEntry[]> {
  const where: Record<string, unknown> = { status: "qualified" };
  if (since) where.qualifiedAt = { [Op.gte]: since };

  const rows = await Referral.findAll({
    where,
    include: [{ model: User, as: "referrer", attributes: ["id", "firstName", "lastName", "university"] }],
  });

  const byUser = new Map<string, { user: User; count: number }>();
  for (const row of rows) {
    const referrer = (row as unknown as { referrer?: User }).referrer;
    if (!referrer) continue;
    const entry = byUser.get(referrer.id) ?? { user: referrer, count: 0 };
    entry.count += 1;
    byUser.set(referrer.id, entry);
  }

  return [...byUser.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, REFERRAL_LEADERBOARD_SIZE)
    .map((entry, index) => ({
      rank: index + 1,
      userId: entry.user.id,
      name: fullName(entry.user),
      university: entry.user.university,
      qualifiedReferrals: entry.count,
    }));
}

export async function getLeaderboard(): Promise<{ allTime: LeaderboardEntry[]; thisMonth: LeaderboardEntry[] }> {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const [allTime, thisMonth] = await Promise.all([buildLeaderboard(), buildLeaderboard(monthStart)]);
  return { allTime, thisMonth };
}

/* ---------------------------------- admin ---------------------------------- */

export interface AdminReferralRow {
  id: string;
  code: string;
  status: "pending" | "qualified" | "void";
  referrer: { id: string; name: string; email: string } | null;
  referee: { id: string; name: string; email: string } | null;
  referrerReward: { type: string; amountNgn: number; status: "pending" | "issued"; issuedAt: string | null };
  refereeReward: { type: string; amountNgn: number; status: "pending" | "issued"; issuedAt: string | null };
  joinedAt: string;
  qualifiedAt: string | null;
  notes: string | null;
}

function personOf(user?: User | null): { id: string; name: string; email: string } | null {
  if (!user) return null;
  return { id: user.id, name: `${user.firstName} ${user.lastName}`.trim(), email: user.email };
}

function serializeAdminRow(row: Referral): AdminReferralRow {
  return {
    id: row.id,
    code: row.code,
    status: row.status as "pending" | "qualified" | "void",
    referrer: personOf((row as unknown as { referrer?: User }).referrer),
    referee: personOf((row as unknown as { referee?: User }).referee),
    referrerReward: {
      type: row.referrerRewardType,
      amountNgn: Number(row.referrerRewardAmountNgn),
      status: row.referrerRewardStatus as "pending" | "issued",
      issuedAt: row.referrerRewardIssuedAt ? row.referrerRewardIssuedAt.toISOString() : null,
    },
    refereeReward: {
      type: row.refereeRewardType,
      amountNgn: Number(row.refereeRewardAmountNgn),
      status: row.refereeRewardStatus as "pending" | "issued",
      issuedAt: row.refereeRewardIssuedAt ? row.refereeRewardIssuedAt.toISOString() : null,
    },
    joinedAt: row.createdAt.toISOString(),
    qualifiedAt: row.qualifiedAt ? row.qualifiedAt.toISOString() : null,
    notes: row.notes,
  };
}

export async function listReferralsForAdmin(filter?: {
  status?: "pending" | "qualified" | "void";
  rewardStatus?: "pending" | "issued";
}): Promise<AdminReferralRow[]> {
  const where = filter?.status ? { status: filter.status } : undefined;

  const rows = await Referral.findAll({
    where,
    include: [
      { model: User, as: "referrer", attributes: ["id", "firstName", "lastName", "email"] },
      { model: User, as: "referee", attributes: ["id", "firstName", "lastName", "email"] },
    ],
    order: [["createdAt", "DESC"]],
  });

  const serialized = rows.map(serializeAdminRow);
  if (!filter?.rewardStatus) return serialized;
  // A row matches if either side's reward is in the requested state -- small admin list,
  // so this post-filter is clearer than an Op.or across two columns in the query.
  return serialized.filter(
    (r) =>
      r.referrerReward.status === filter.rewardStatus || r.refereeReward.status === filter.rewardStatus,
  );
}

export async function markRewardIssued(referralId: string, party: RewardParty): Promise<AdminReferralRow> {
  const referral = await Referral.findByPk(referralId, {
    include: [
      { model: User, as: "referrer", attributes: ["id", "firstName", "lastName", "email"] },
      { model: User, as: "referee", attributes: ["id", "firstName", "lastName", "email"] },
    ],
  });
  if (!referral) throw ApiError.notFound("Referral not found");
  if (referral.status !== "qualified") {
    throw ApiError.badRequest("Only a qualified referral has a reward to issue");
  }

  if (party === "referrer") {
    referral.referrerRewardStatus = "issued";
    referral.referrerRewardIssuedAt = new Date();
  } else {
    referral.refereeRewardStatus = "issued";
    referral.refereeRewardIssuedAt = new Date();
  }
  await referral.save();
  return serializeAdminRow(referral);
}

export async function voidReferral(referralId: string, reason?: string): Promise<AdminReferralRow> {
  const referral = await Referral.findByPk(referralId, {
    include: [
      { model: User, as: "referrer", attributes: ["id", "firstName", "lastName", "email"] },
      { model: User, as: "referee", attributes: ["id", "firstName", "lastName", "email"] },
    ],
  });
  if (!referral) throw ApiError.notFound("Referral not found");
  if (referral.referrerRewardStatus === "issued" || referral.refereeRewardStatus === "issued") {
    throw ApiError.badRequest("This referral has an already-issued reward and cannot be voided");
  }

  referral.status = "void";
  referral.notes = reason ? `${referral.notes ? `${referral.notes}\n` : ""}Voided: ${reason}` : referral.notes;
  await referral.save();
  return serializeAdminRow(referral);
}

export async function getReferralOverview(): Promise<{
  totalReferrers: number;
  pendingReferrals: number;
  qualifiedReferrals: number;
  rewardsToPayNgn: number;
}> {
  const rows = await Referral.findAll();
  const referrers = new Set(rows.filter((r) => r.status !== "void").map((r) => r.referrerId));
  const qualified = rows.filter((r) => r.status === "qualified");
  const rewardsToPayNgn = qualified.reduce((sum, r) => {
    let owed = 0;
    if (r.referrerRewardStatus === "pending") owed += Number(r.referrerRewardAmountNgn);
    if (r.refereeRewardStatus === "pending") owed += Number(r.refereeRewardAmountNgn);
    return sum + owed;
  }, 0);

  return {
    totalReferrers: referrers.size,
    pendingReferrals: rows.filter((r) => r.status === "pending").length,
    qualifiedReferrals: qualified.length,
    rewardsToPayNgn,
  };
}
