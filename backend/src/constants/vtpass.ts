// Nigerian mobile networks as VTpass names them. 9mobile is still "etisalat" in their API.
export const VTPASS_NETWORKS = ["mtn", "airtel", "glo", "etisalat"] as const;
export type VtpassNetwork = (typeof VTPASS_NETWORKS)[number];

export const NETWORK_LABEL: Record<VtpassNetwork, string> = {
  mtn: "MTN",
  airtel: "Airtel",
  glo: "Glo",
  etisalat: "9mobile",
};

export function airtimeServiceId(network: VtpassNetwork): string {
  return network;
}

export function dataServiceId(network: VtpassNetwork): string {
  return `${network}-data`;
}

// First-four-digit prefixes. Only a starting guess for the admin's confirm dialog: numbers
// can be ported between networks, so the admin always confirms the network before sending.
const PREFIXES: Record<VtpassNetwork, string[]> = {
  mtn: ["0703", "0704", "0706", "0707", "0803", "0806", "0810", "0813", "0814", "0816", "0903", "0906", "0913", "0916"],
  airtel: ["0701", "0708", "0802", "0808", "0812", "0901", "0902", "0904", "0907", "0911", "0912"],
  glo: ["0705", "0805", "0807", "0811", "0815", "0905", "0915"],
  etisalat: ["0809", "0817", "0818", "0908", "0909"],
};

export function guessNetwork(localPhone: string): VtpassNetwork | null {
  const prefix = localPhone.slice(0, 4);
  for (const network of VTPASS_NETWORKS) {
    if (PREFIXES[network].includes(prefix)) return network;
  }
  return null;
}

// Students type numbers every which way ("+234 803...", "234803...", "803 ..."). VTpass
// wants the 11-digit local form. Returns null for anything that isn't a Nigerian mobile.
export function toLocalNigerianMobile(raw: string): string | null {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("234") && digits.length === 13) digits = `0${digits.slice(3)}`;
  if (digits.length === 10 && /^[789]/.test(digits)) digits = `0${digits}`;
  return /^0[789][01]\d{8}$/.test(digits) ? digits : null;
}
