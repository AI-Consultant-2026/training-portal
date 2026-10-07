import { config } from "../config";
import { VtpassNetwork, airtimeServiceId, dataServiceId } from "../constants/vtpass";
import type { BalanceResult, DataPlan, VtpassResult } from "./vtpass.service";
import * as vtpass from "./vtpass.service";
import * as vtung from "./vtung.service";

// Which airtime/data API sends referral rewards (2026-10-07). VTU.ng is used whenever its
// login is set (it needs no business KYC); otherwise VTpass, as before. Each payout row
// stores the provider that sent it, so a send still processing is always requeried with
// the same provider even after a switch.

export type ProviderId = "vtpass" | "vtung";

export interface PayoutProvider {
  id: ProviderId;
  label: string;
  isConfigured(): boolean;
  // VTU.ng has no sandbox, so it is always live.
  live(): boolean;
  // Set when the balance can't be read for a known setup reason.
  setupProblem(): string | null;
  buyAirtime(args: { requestId: string; network: VtpassNetwork; amountNgn: number; phone: string }): Promise<VtpassResult>;
  buyData(args: { requestId: string; network: VtpassNetwork; plan: DataPlan; phone: string }): Promise<VtpassResult>;
  requery(requestId: string): Promise<VtpassResult>;
  listDataPlans(network: VtpassNetwork): Promise<DataPlan[]>;
  getBalance(): Promise<BalanceResult>;
}

const vtpassProvider: PayoutProvider = {
  id: "vtpass",
  label: "VTpass",
  isConfigured: vtpass.isVtpassConfigured,
  live: () => config.vtpass.live,
  setupProblem: () => (config.vtpass.publicKey ? null : "VTPASS_PUBLIC_KEY isn't set"),
  buyAirtime: (a) => vtpass.buyAirtime({ ...a, serviceId: airtimeServiceId(a.network) }),
  buyData: (a) =>
    vtpass.buyData({
      requestId: a.requestId,
      serviceId: dataServiceId(a.network),
      variationCode: a.plan.code,
      amountNgn: a.plan.amountNgn,
      phone: a.phone,
    }),
  requery: vtpass.requery,
  listDataPlans: (network) => vtpass.listDataPlans(dataServiceId(network)),
  getBalance: vtpass.getBalance,
};

const vtungProvider: PayoutProvider = {
  id: "vtung",
  label: "VTU.ng",
  isConfigured: vtung.isVtungConfigured,
  live: () => true,
  setupProblem: () => null,
  buyAirtime: vtung.buyAirtime,
  buyData: (a) => vtung.buyData({ requestId: a.requestId, network: a.network, planCode: a.plan.code, phone: a.phone }),
  requery: vtung.requery,
  listDataPlans: vtung.listDataPlans,
  getBalance: vtung.getBalance,
};

const PROVIDERS: Record<ProviderId, PayoutProvider> = { vtpass: vtpassProvider, vtung: vtungProvider };

// The provider new sends go through.
export function activeProvider(): PayoutProvider {
  return vtungProvider.isConfigured() ? vtungProvider : vtpassProvider;
}

export function providerById(id: string): PayoutProvider {
  return PROVIDERS[id as ProviderId] ?? vtpassProvider;
}

export function providerLabel(id: string): string {
  return providerById(id).label;
}
