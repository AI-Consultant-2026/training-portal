import { axiosClient } from "./axiosClient";

export interface HumanCheckQuestion {
  question: string;
  token: string;
}

/** A fresh human-check sum for a public form (2026-11-26). The answer stays on the server. */
export async function fetchHumanCheck(): Promise<HumanCheckQuestion> {
  return (await axiosClient.get<HumanCheckQuestion>("/human-check", { headers: { "Cache-Control": "no-cache" } })).data;
}
