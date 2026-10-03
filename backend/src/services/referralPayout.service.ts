import { UniqueConstraintError } from "sequelize";
import { config } from "../config";
import {
  NETWORK_LABEL,
  VtpassNetwork,
  airtimeServiceId,
  dataServiceId,
  guessNetwork,
  toLocalNigerianMobile,
} from "../constants/vtpass";
import { Referral, ReferralPayout, User } from "../models";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";
import {
  AdminReferralRow,
  RewardParty,
  loadAdminReferral,
  payoutPhoneOf,
  serializeAdminRow,
} from "./referral.service";
import * as vtpass from "./vtpass.service";

// Sends referral airtime/data rewards through VTpass from /admin/referrals (2026-10-02).
// Each send is a referral_payouts row written BEFORE calling VTpass, so the request id is
// never lost and a crash mid-send can still be requeried. A partial unique index allows only
// one processing-or-delivered payout per reward, which is the double-pay guard. Course
// credit is still paid by hand: Paystack payment links are fixed-price.

export interface PayoutConfig {
  enabled: boolean;
  live: boolean;
  balanceNgn: number | null;
  balanceProblem: string | null;
}

export async function getPayoutConfig(): Promise<PayoutConfig> {
  if (!vtpass.isVtpassConfigured()) return { enabled: false, live: false, balanceNgn: null, balanceProblem: null };
  if (!config.vtpass.publicKey) {
    return { enabled: true, live: config.vtpass.live, balanceNgn: null, balanceProblem: "VTPASS_PUBLIC_KEY isn't set" };
  }
  const { balanceNgn, problem } = await vtpass.getBalance();
  return { enabled: true, live: config.vtpass.live, balanceNgn, balanceProblem: problem };
}

function requireConfigured() {
  if (!vtpass.isVtpassConfigured()) {
    throw ApiError.badRequest("VTpass isn't set up yet; pay this reward by hand");
  }
}

function rewardOf(referral: Referral, party: RewardParty) {
  return party === "referrer"
    ? { type: referral.referrerRewardType, amountNgn: Number(referral.referrerRewardAmountNgn), status: referral.referrerRewardStatus }
    : { type: referral.refereeRewardType, amountNgn: Number(referral.refereeRewardAmountNgn), status: referral.refereeRewardStatus };
}

function personFor(referral: Referral, party: RewardParty): User | undefined {
  return (referral as unknown as { referrer?: User; referee?: User })[party];
}

// Everything the confirm dialog needs, worked out server-side so the checks the dialog
// shows are the same ones the send enforces.
export interface PayoutPreview {
  kind: "airtime" | "data";
  amountNgn: number;
  name: string;
  phone: string;
  suggestedNetwork: VtpassNetwork | null;
  live: boolean;
}

function assertPayable(referral: Referral, party: RewardParty) {
  if (referral.status !== "qualified") throw ApiError.badRequest("Only a qualified referral has a reward to send");
  const reward = rewardOf(referral, party);
  if (reward.status !== "pending") throw ApiError.badRequest("This reward has already been paid");
  if (reward.type !== "airtime" && reward.type !== "data") {
    throw ApiError.badRequest("Course credit can't be sent through VTpass; pay it by hand");
  }
  const person = personFor(referral, party);
  const saved = person ? payoutPhoneOf(person) : null;
  if (!saved) throw ApiError.badRequest("No phone number saved for this person yet");
  const phone = toLocalNigerianMobile(saved);
  if (!phone) throw ApiError.badRequest(`"${saved}" isn't a Nigerian mobile number; ask them to correct it on /refer`);
  return { reward: { ...reward, type: reward.type as "airtime" | "data" }, person: person as User, phone };
}

export async function previewPayout(referralId: string, party: RewardParty): Promise<PayoutPreview> {
  requireConfigured();
  const referral = await loadAdminReferral(referralId);
  const { reward, person, phone } = assertPayable(referral, party);
  return {
    kind: reward.type,
    amountNgn: reward.amountNgn,
    name: `${person.firstName} ${person.lastName}`.trim(),
    phone,
    suggestedNetwork: guessNetwork(phone),
    live: config.vtpass.live,
  };
}

// Plans that fit within the reward, biggest first, so the dialog can preselect the best one.
export async function listDataPlansWithin(network: VtpassNetwork, maxNgn: number): Promise<vtpass.DataPlan[]> {
  requireConfigured();
  const plans = await vtpass.listDataPlans(dataServiceId(network));
  return plans.filter((p) => p.amountNgn <= maxNgn).sort((a, b) => b.amountNgn - a.amountNgn);
}

async function applyResult(payout: ReferralPayout, result: vtpass.VtpassResult) {
  payout.providerCode = result.code;
  payout.providerMessage = result.message;
  payout.providerTransactionId = result.transactionId ?? payout.providerTransactionId;
  payout.providerResponse = result.raw;
  if (result.outcome === "delivered") payout.status = "delivered";
  else if (result.outcome === "failed") payout.status = "failed";
  await payout.save();

  if (payout.status === "delivered") {
    const referral = await Referral.findByPk(payout.referralId);
    if (referral) {
      if (payout.party === "referrer" && referral.referrerRewardStatus === "pending") {
        referral.referrerRewardStatus = "issued";
        referral.referrerRewardIssuedAt = new Date();
      } else if (payout.party === "referee" && referral.refereeRewardStatus === "pending") {
        referral.refereeRewardStatus = "issued";
        referral.refereeRewardIssuedAt = new Date();
      }
      await referral.save();
    }
  }
  logger.info(`Referral payout ${payout.id} (${payout.requestId}) is ${payout.status}: ${result.message}`);
}

export interface PayoutOutcome {
  referral: AdminReferralRow;
  status: "processing" | "delivered" | "failed";
  message: string;
}

export async function sendReward(args: {
  referralId: string;
  party: RewardParty;
  network: VtpassNetwork;
  variationCode?: string;
  adminId: string;
}): Promise<PayoutOutcome> {
  requireConfigured();
  const referral = await loadAdminReferral(args.referralId);
  const { reward, phone } = assertPayable(referral, args.party);

  let amountNgn = reward.amountNgn;
  let plan: vtpass.DataPlan | null = null;
  if (reward.type === "data") {
    if (!args.variationCode) throw ApiError.badRequest("Choose a data plan");
    const plans = await vtpass.listDataPlans(dataServiceId(args.network));
    plan = plans.find((p) => p.code === args.variationCode) ?? null;
    if (!plan) throw ApiError.badRequest(`That plan isn't available on ${NETWORK_LABEL[args.network]}`);
    if (plan.amountNgn > reward.amountNgn) throw ApiError.badRequest("That plan costs more than the reward");
    amountNgn = plan.amountNgn;
  }

  let payout: ReferralPayout;
  try {
    payout = await ReferralPayout.create({
      referralId: referral.id,
      party: args.party,
      kind: reward.type,
      network: args.network,
      phone,
      amountNgn,
      variationCode: plan?.code ?? null,
      variationName: plan?.name ?? null,
      requestId: vtpass.generateRequestId(),
      status: "processing",
      live: config.vtpass.live,
      sentById: args.adminId,
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      throw ApiError.badRequest("This reward is already being sent or was delivered");
    }
    throw err;
  }

  const result =
    reward.type === "airtime"
      ? await vtpass.buyAirtime({
          requestId: payout.requestId,
          serviceId: airtimeServiceId(args.network),
          amountNgn,
          phone,
        })
      : await vtpass.buyData({
          requestId: payout.requestId,
          serviceId: dataServiceId(args.network),
          variationCode: plan!.code,
          amountNgn,
          phone,
        });
  await applyResult(payout, result);

  return {
    referral: serializeAdminRow(await loadAdminReferral(referral.id)),
    status: payout.status,
    message: result.message,
  };
}

// For a send still marked processing: ask VTpass where it got to.
export async function refreshPayout(payoutId: string): Promise<PayoutOutcome> {
  requireConfigured();
  const payout = await ReferralPayout.findByPk(payoutId);
  if (!payout) throw ApiError.notFound("Payout not found");
  if (payout.status !== "processing") {
    return {
      referral: serializeAdminRow(await loadAdminReferral(payout.referralId)),
      status: payout.status,
      message: payout.providerMessage ?? "",
    };
  }
  const result = await vtpass.requery(payout.requestId);
  await applyResult(payout, result);
  return {
    referral: serializeAdminRow(await loadAdminReferral(payout.referralId)),
    status: payout.status,
    message: result.message,
  };
}
