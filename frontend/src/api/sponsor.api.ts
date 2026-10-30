import { SponsorPageInfo } from "../types/api";
import type { VerifiedCharge } from "./payments.api";
import { axiosClient } from "./axiosClient";

// Public "pay for a student" page -- no login needed (see backend sponsor.service.ts).
export async function fetchSponsorPage(token: string): Promise<SponsorPageInfo> {
  const res = await axiosClient.get<{ sponsor: SponsorPageInfo }>(`/sponsor/${encodeURIComponent(token)}`);
  return res.data.sponsor;
}

export async function startSponsorPayment(
  token: string,
  kind: "deposit" | "balance" | "full",
): Promise<{ paymentLink: string }> {
  const res = await axiosClient.post<{ paymentLink: string }>(`/sponsor/${encodeURIComponent(token)}/pay`, { kind });
  return res.data;
}

// Paystack's reference, or Flutterwave's transaction id (Ghana, Kenya, South Africa).
export async function verifySponsorPayment(
  token: string,
  charge: { reference: string } | { transactionId: string },
): Promise<VerifiedCharge> {
  const res = await axiosClient.post<VerifiedCharge>(`/sponsor/${encodeURIComponent(token)}/verify`, charge);
  return res.data;
}
