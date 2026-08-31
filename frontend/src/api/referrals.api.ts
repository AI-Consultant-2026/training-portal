import {
  AdminReferral,
  AdminReferralOverview,
  MyReferralSummary,
  ReferralLeaderboard,
  ReferralRewardType,
} from "../types/api";
import { axiosClient } from "./axiosClient";

export async function fetchMyReferralSummary(): Promise<MyReferralSummary> {
  const res = await axiosClient.get<{ referral: MyReferralSummary }>("/referrals/me");
  return res.data.referral;
}

export async function setRewardPreference(rewardType: ReferralRewardType): Promise<ReferralRewardType> {
  const res = await axiosClient.patch<{ rewardType: ReferralRewardType }>("/referrals/me/reward-preference", {
    rewardType,
  });
  return res.data.rewardType;
}

export async function fetchLeaderboard(): Promise<ReferralLeaderboard> {
  const res = await axiosClient.get<{ leaderboard: ReferralLeaderboard }>("/referrals/leaderboard");
  return res.data.leaderboard;
}

export interface CodeValidation {
  valid: boolean;
  referrerName: string | null;
}

export async function validateReferralCode(code: string): Promise<CodeValidation> {
  const res = await axiosClient.post<CodeValidation>("/referrals/validate-code", { code });
  return res.data;
}

/* ---------------------------------- admin ---------------------------------- */

export async function fetchAdminReferrals(filter?: {
  status?: string;
  rewardStatus?: string;
}): Promise<{ referrals: AdminReferral[]; overview: AdminReferralOverview }> {
  const res = await axiosClient.get<{ referrals: AdminReferral[]; overview: AdminReferralOverview }>(
    "/admin/referrals",
    { params: filter },
  );
  return res.data;
}

export async function issueReferralReward(
  id: string,
  party: "referrer" | "referee",
): Promise<AdminReferral> {
  const res = await axiosClient.post<{ referral: AdminReferral }>(`/admin/referrals/${id}/issue-reward`, {
    party,
  });
  return res.data.referral;
}

export async function voidReferral(id: string, reason?: string): Promise<AdminReferral> {
  const res = await axiosClient.post<{ referral: AdminReferral }>(`/admin/referrals/${id}/void`, { reason });
  return res.data.referral;
}
