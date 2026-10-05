import {
  AdminReferral,
  DataPlan,
  PayoutConfig,
  PayoutOutcome,
  PayoutPreview,
  VtpassNetwork,
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

export async function setPayoutPhone(phone: string): Promise<string | null> {
  const res = await axiosClient.patch<{ phone: string | null }>("/referrals/me/payout-phone", { phone });
  return res.data.phone;
}

export type PrintKind = "flyer-a4" | "flyer-a5" | "cards";
export type PrintDesign =
  | "general"
  | "cyber-security-fundamentals"
  | "gis-and-drone-mapping"
  | "digital-marketing"
  | "hse-fundamentals";

// Same blob-download pattern as downloadCertificate: a plain <a href> can't carry the
// bearer token. The filename is built here rather than read from Content-Disposition,
// which the browser hides on cross-origin API responses (local dev) unless CORS exposes it.
const PRINT_FILE_LABEL: Record<PrintKind, string> = {
  "flyer-a4": "a4-poster",
  "flyer-a5": "a5-handbills",
  cards: "pocket-cards",
};

export async function downloadPrintKit(
  kind: PrintKind,
  design: PrintDesign,
  showName: boolean,
  code: string,
): Promise<void> {
  const res = await axiosClient.get(`/referrals/me/print/${kind}`, {
    params: { design, showName: String(showName) },
    responseType: "blob",
  });
  const filename = `paleon-${design}-${PRINT_FILE_LABEL[kind]}-${code}.pdf`;
  const url = window.URL.createObjectURL(res.data as Blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

// One of the /refer/me promo videos with the ambassador's name and code on its last 3
// seconds, rendered by the server (ambassadorVideo.service.ts). Takes about a second the
// first time, then it's cached.
export async function fetchPersonalisedVideo(file: string, showName: boolean): Promise<Blob> {
  const res = await axiosClient.get(`/referrals/me/videos/${file}`, {
    params: { showName: String(showName) },
    responseType: "blob",
    timeout: 90_000,
  });
  return res.data as Blob;
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

/* ------------------------- admin: VTpass airtime/data ------------------------ */

export async function fetchPayoutConfig(): Promise<PayoutConfig> {
  const res = await axiosClient.get<PayoutConfig>("/admin/referral-payouts/config");
  return res.data;
}

export async function fetchPayoutPreview(id: string, party: "referrer" | "referee"): Promise<PayoutPreview> {
  const res = await axiosClient.get<{ preview: PayoutPreview }>(`/admin/referrals/${id}/payout-preview`, {
    params: { party },
  });
  return res.data.preview;
}

export async function fetchDataPlans(network: VtpassNetwork, maxNgn: number): Promise<DataPlan[]> {
  const res = await axiosClient.get<{ plans: DataPlan[] }>("/admin/referral-payouts/data-plans", {
    params: { network, maxNgn },
  });
  return res.data.plans;
}

export async function sendReferralReward(
  id: string,
  body: { party: "referrer" | "referee"; network: VtpassNetwork; variationCode?: string },
): Promise<PayoutOutcome> {
  const res = await axiosClient.post<PayoutOutcome>(`/admin/referrals/${id}/send-reward`, body);
  return res.data;
}

export async function refreshReferralPayout(payoutId: string): Promise<PayoutOutcome> {
  const res = await axiosClient.post<PayoutOutcome>(`/admin/referral-payouts/${payoutId}/refresh`);
  return res.data;
}
