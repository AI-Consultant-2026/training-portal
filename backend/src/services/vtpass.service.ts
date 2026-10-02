import { randomBytes } from "crypto";
import { config } from "../config";
import { logger } from "../utils/logger";

// Thin client for the VTpass bills API (https://www.vtpass.com/documentation/), used to
// send referral airtime/data rewards (2026-10-02). POSTs authenticate with api-key +
// secret-key headers, GETs with api-key + public-key.

const SANDBOX_URL = "https://sandbox.vtpass.com/api";
const LIVE_URL = "https://vtpass.com/api";
const TIMEOUT_MS = 45_000;

export function isVtpassConfigured(): boolean {
  return config.vtpass.apiKey !== "" && config.vtpass.secretKey !== "";
}

function baseUrl(): string {
  if (config.vtpass.baseUrlOverride) return config.vtpass.baseUrlOverride.replace(/\/$/, "");
  return config.vtpass.live ? LIVE_URL : SANDBOX_URL;
}

// VTpass requires the first 12 characters to be the current Africa/Lagos time as
// YYYYMMDDHHmm. Lagos is UTC+1 all year (no daylight saving), so a fixed offset is exact.
export function generateRequestId(now = new Date()): string {
  const lagos = new Date(now.getTime() + 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  const stamp =
    `${lagos.getUTCFullYear()}${pad(lagos.getUTCMonth() + 1)}${pad(lagos.getUTCDate())}` +
    `${pad(lagos.getUTCHours())}${pad(lagos.getUTCMinutes())}`;
  return `${stamp}${randomBytes(6).toString("hex")}`;
}

// What a send/requery means for us:
// delivered -> the top-up reached the phone
// failed    -> VTpass definitely didn't deliver it (and didn't charge, or reversed the charge)
// pending   -> anything else, including timeouts and codes we don't recognise. VTpass's
//              own guidance is to treat unclear responses as pending and requery, never as
//              failed, because a "failed" here could let the admin pay the same reward twice.
export type VtpassOutcome = "delivered" | "failed" | "pending";

export interface VtpassResult {
  outcome: VtpassOutcome;
  code: string | null;
  message: string;
  transactionId: string | null;
  raw: unknown;
}

// Codes where VTpass says the transaction did not go through. 015 ("request id not used on
// our platform") only arises from a requery, and means the original send never arrived.
const FAILED_CODES: Record<string, string> = {
  "010": "Data plan code not recognised by VTpass",
  "011": "VTpass rejected the request as incomplete",
  "012": "VTpass doesn't offer that product",
  "013": "Amount is below VTpass's minimum",
  "015": "VTpass never received this send",
  "016": "VTpass reports the transaction failed",
  "017": "Amount is above VTpass's maximum",
  "018": "VTpass wallet balance is too low; top up the wallet and try again",
  "019": "VTpass blocked it as a likely duplicate; wait 30 seconds before retrying",
  "021": "VTpass account is locked",
  "022": "VTpass account is suspended",
  "023": "API access isn't enabled on the VTpass account",
  "024": "VTpass account is inactive",
  "027": "Server IP isn't whitelisted on VTpass; contact VTpass support",
  "028": "This product isn't whitelisted on the VTpass account",
  "034": "VTpass has suspended this service for now",
  "035": "VTpass has switched this service off for now",
  "040": "VTpass reversed the transaction to the wallet",
  "085": "VTpass rejected the request id",
  "087": "VTpass rejected the API keys; check VTPASS_* settings",
  "091": "VTpass did not process the transaction (no charge)",
};

interface VtpassBody {
  code?: string;
  response_description?: string;
  content?: { transactions?: { status?: string; transactionId?: string | number } };
}

export function interpret(body: unknown): VtpassResult {
  const b = (body ?? {}) as VtpassBody;
  const code = typeof b.code === "string" ? b.code : null;
  const tx = b.content?.transactions;
  const transactionId = tx?.transactionId != null ? String(tx.transactionId) : null;
  const description = b.response_description ?? "";

  if (code === "000") {
    const status = (tx?.status ?? "").toLowerCase();
    if (status === "delivered") {
      return { outcome: "delivered", code, message: "Delivered", transactionId, raw: body };
    }
    if (status === "failed" || status === "reversed") {
      return { outcome: "failed", code, message: `VTpass reports the top-up ${status}`, transactionId, raw: body };
    }
    return { outcome: "pending", code, message: "VTpass is still processing this", transactionId, raw: body };
  }
  if (code && FAILED_CODES[code]) {
    return { outcome: "failed", code, message: FAILED_CODES[code], transactionId, raw: body };
  }
  return {
    outcome: "pending",
    code,
    message: description ? `VTpass: ${description}` : "VTpass is still processing this",
    transactionId,
    raw: body,
  };
}

async function call(
  method: "GET" | "POST",
  path: string,
  body?: unknown,
  timeoutMs = TIMEOUT_MS,
): Promise<unknown> {
  const headers: Record<string, string> = {
    "api-key": config.vtpass.apiKey,
    "content-type": "application/json",
  };
  if (method === "POST") headers["secret-key"] = config.vtpass.secretKey;
  else headers["public-key"] = config.vtpass.publicKey;

  const res = await fetch(`${baseUrl()}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(timeoutMs),
  });
  return res.json();
}

// A send can fail in transit after VTpass has already acted on it, so a network error or
// timeout is reported as pending (requery later), never as failed.
async function send(path: string, payload: Record<string, unknown>): Promise<VtpassResult> {
  try {
    return interpret(await call("POST", path, payload));
  } catch (err) {
    logger.error(`VTpass ${path} for ${payload.request_id} got no clear answer`, err);
    return {
      outcome: "pending",
      code: null,
      message: "No clear answer from VTpass; check the status in a minute",
      transactionId: null,
      raw: { error: err instanceof Error ? err.message : String(err) },
    };
  }
}

export function buyAirtime(args: {
  requestId: string;
  serviceId: string;
  amountNgn: number;
  phone: string;
}): Promise<VtpassResult> {
  return send("/pay", {
    request_id: args.requestId,
    serviceID: args.serviceId,
    amount: args.amountNgn,
    phone: args.phone,
  });
}

export function buyData(args: {
  requestId: string;
  serviceId: string;
  variationCode: string;
  amountNgn: number;
  phone: string;
}): Promise<VtpassResult> {
  return send("/pay", {
    request_id: args.requestId,
    serviceID: args.serviceId,
    billersCode: args.phone,
    variation_code: args.variationCode,
    amount: args.amountNgn,
    phone: args.phone,
  });
}

export function requery(requestId: string): Promise<VtpassResult> {
  return send("/requery", { request_id: requestId });
}

export interface DataPlan {
  code: string;
  name: string;
  amountNgn: number;
}

export async function listDataPlans(serviceId: string): Promise<DataPlan[]> {
  const body = (await call("GET", `/service-variations?serviceID=${encodeURIComponent(serviceId)}`)) as {
    content?: { variations?: unknown[]; varations?: unknown[] };
  };
  // VTpass's response has historically carried the array under a misspelt "varations" key
  // as well as "variations"; accept either.
  const list = body.content?.variations ?? body.content?.varations ?? [];
  return (list as { variation_code?: string; name?: string; variation_amount?: string | number }[])
    .filter((v) => v.variation_code && v.name)
    .map((v) => ({ code: v.variation_code as string, name: v.name as string, amountNgn: Number(v.variation_amount) }))
    .filter((v) => Number.isFinite(v.amountNgn) && v.amountNgn > 0);
}

export async function getBalance(): Promise<number | null> {
  try {
    // Short timeout: the balance is a nice-to-have on the admin page, not worth stalling it.
    const body = (await call("GET", "/balance", undefined, 8_000)) as { contents?: { balance?: number | string } };
    const balance = Number(body.contents?.balance);
    return Number.isFinite(balance) ? balance : null;
  } catch (err) {
    logger.error("VTpass balance check failed", err);
    return null;
  }
}
