import { SponsorPageInfo } from "../types/api";
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

export async function verifySponsorPayment(token: string, reference: string): Promise<{ outcome: string }> {
  const res = await axiosClient.post<{ outcome: string }>(`/sponsor/${encodeURIComponent(token)}/verify`, {
    reference,
  });
  return res.data;
}
