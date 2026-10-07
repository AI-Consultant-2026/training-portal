import { config } from "../config";
import type { VtpassNetwork } from "../constants/vtpass";
import { logger } from "../utils/logger";
import type { BalanceResult, DataPlan, VtpassOutcome, VtpassResult } from "./vtpass.service";

// Thin client for the VTU.ng v2 API (https://vtu.ng/api/), which replaced VTpass for
// referral airtime/data rewards on 2026-10-07 because it needs no business KYC: an
// email-verified reseller account can send up to ₦50,000 a day (₦500,000 once BVN is
// verified). There is NO sandbox: every send spends real money from the VTU.ng wallet.
//
// Auth is a JWT from the account's username + password. It lasts 7 days and only the
// newest token works, so one token is shared by every request in this process and is only
// replaced when it is old or VTU.ng rejects it.

const BASE_URL = "https://vtu.ng/wp-json";
const TIMEOUT_MS = 45_000;
const TOKEN_MAX_AGE_MS = 6 * 24 * 60 * 60 * 1000;

export function isVtungConfigured(): boolean {
  return config.vtung.username !== "" && config.vtung.password !== "";
}

// VTU.ng still calls 9mobile by its own name; our stored network value is VTpass's "etisalat".
function serviceIdOf(network: VtpassNetwork): string {
  return network === "etisalat" ? "9mobile" : network;
}

/* ---------------------------------- token ---------------------------------- */

let token: string | null = null;
let tokenAt = 0;
let pendingLogin: Promise<string> | null = null;

async function login(): Promise<string> {
  const res = await fetch(`${BASE_URL}/jwt-auth/v1/token`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username: config.vtung.username, password: config.vtung.password }),
    signal: AbortSignal.timeout(15_000),
  });
  const body = (await res.json().catch(() => ({}))) as { token?: string; code?: string };
  if (!body.token) {
    // Log the code only; the message can echo the username.
    logger.error(`VTU.ng login refused: ${body.code ?? `HTTP ${res.status}`}`);
    throw new VtungAuthError();
  }
  token = body.token;
  tokenAt = Date.now();
  return token;
}

class VtungAuthError extends Error {
  constructor() {
    super("VTU.ng rejected the login; check VTUNG_USERNAME and VTUNG_PASSWORD");
  }
}

// Concurrent callers share one login, otherwise each new token would cancel the last.
function getToken(forceNew = false): Promise<string> {
  if (!forceNew && token && Date.now() - tokenAt < TOKEN_MAX_AGE_MS) return Promise.resolve(token);
  if (!pendingLogin) {
    pendingLogin = login().finally(() => {
      pendingLogin = null;
    });
  }
  return pendingLogin;
}

// Only for tests.
export function resetVtungToken() {
  token = null;
  tokenAt = 0;
  pendingLogin = null;
}

/* ---------------------------------- calls ---------------------------------- */

interface VtungBody {
  code?: string;
  message?: string;
  data?: { status?: string | number; order_id?: string | number; balance?: number | string } | unknown[];
}

async function call(
  method: "GET" | "POST",
  path: string,
  body?: unknown,
  timeoutMs = TIMEOUT_MS,
): Promise<{ status: number; body: VtungBody }> {
  const send = async (bearer: string) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: { authorization: `Bearer ${bearer}`, "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
    });
    return { status: res.status, body: (await res.json().catch(() => ({}))) as VtungBody };
  };
  const first = await send(await getToken());
  // A stale or replaced token comes back 403 before any order is created, so one retry
  // with a fresh token is safe.
  if (first.status === 403 && /^(jwt_auth|rest_forbidden)/.test(first.body.code ?? "")) {
    return send(await getToken(true));
  }
  return first;
}

/* ------------------------------ interpretation ----------------------------- */

// VTU.ng error codes where we know no order was placed (or it was refused before charging),
// so marking the payout failed is safe and the admin can retry.
const FAILED_CODES: Record<string, string> = {
  missing_fields: "VTU.ng rejected the request as incomplete",
  invalid_field: "VTU.ng rejected the phone number or network",
  invalid_service: "The phone number doesn't match that network on VTU.ng",
  invalid_service_id: "VTU.ng doesn't offer that network",
  invalid_variation_id: "Data plan not recognised by VTU.ng",
  invalid_request_id: "VTU.ng rejected the request id",
  below_minimum_amount: "Amount is below VTU.ng's minimum",
  above_maximum_amount: "Amount is above VTU.ng's maximum",
  invalid_product: "VTU.ng doesn't offer that product",
  product_unavailable: "That plan is out of stock on VTU.ng; pick another",
  order_failed: "VTU.ng couldn't create the order",
  insufficient_funds: "VTU.ng wallet balance is too low; top up the wallet and try again",
  jwt_auth_failed: "VTU.ng rejected the login; check VTUNG_USERNAME and VTUNG_PASSWORD",
  jwt_auth_invalid_token: "VTU.ng rejected the login token",
  rest_forbidden: "VTU.ng refused access: check API access is enabled and the server IP is whitelisted",
  rest_no_route: "VTU.ng API route not found",
  duplicate_order: "VTU.ng blocked it as a duplicate; wait 3 minutes before retrying",
  rate_limit_exceeded: "Too many requests to VTU.ng; wait a minute and retry",
  wallet_busy: "VTU.ng wallet was busy; retry in a moment",
  order_not_found: "VTU.ng never received this send",
};

const FAILED_STATUSES = new Set(["refunded", "failed", "cancelled"]);

export function interpret(body: unknown): VtpassResult {
  const b = (body ?? {}) as VtungBody;
  const code = typeof b.code === "string" ? b.code : null;
  const data = (b.data && !Array.isArray(b.data) ? b.data : {}) as { status?: unknown; order_id?: unknown };
  const transactionId = data.order_id != null ? String(data.order_id) : null;
  const message = typeof b.message === "string" ? b.message : "";

  if (code === "success") {
    const status = String(data.status ?? "").toLowerCase();
    let outcome: VtpassOutcome = "pending";
    if (status === "completed-api" || status === "completed") outcome = "delivered";
    else if (FAILED_STATUSES.has(status)) outcome = "failed";
    const text =
      outcome === "delivered"
        ? "Delivered"
        : outcome === "failed"
          ? `VTU.ng reports the top-up ${status} (the wallet is refunded)`
          : "VTU.ng is still processing this";
    return { outcome, code: status || code, message: text, transactionId, raw: body };
  }
  if (code && FAILED_CODES[code]) {
    return { outcome: "failed", code, message: FAILED_CODES[code], transactionId, raw: body };
  }
  // duplicate_request_id, request_id_error, anything new: the order may exist, so requery.
  return {
    outcome: "pending",
    code,
    message: message ? `VTU.ng: ${message}` : "VTU.ng is still processing this",
    transactionId,
    raw: body,
  };
}

// A send can fail in transit after VTU.ng has acted on it, so a network error or timeout
// is pending (requery later), never failed. A login failure happens before any order is
// placed, so that one is a clear failure.
async function send(path: string, payload: Record<string, unknown>): Promise<VtpassResult> {
  try {
    return interpret((await call("POST", path, payload)).body);
  } catch (err) {
    if (err instanceof VtungAuthError) {
      return { outcome: "failed", code: "jwt_auth_failed", message: err.message, transactionId: null, raw: null };
    }
    logger.error(`VTU.ng ${path} for ${payload.request_id} got no clear answer`, err);
    return {
      outcome: "pending",
      code: null,
      message: "No clear answer from VTU.ng; check the status in a minute",
      transactionId: null,
      raw: { error: err instanceof Error ? err.message : String(err) },
    };
  }
}

export function buyAirtime(args: {
  requestId: string;
  network: VtpassNetwork;
  amountNgn: number;
  phone: string;
}): Promise<VtpassResult> {
  return send("/api/v2/airtime", {
    request_id: args.requestId,
    phone: args.phone,
    service_id: serviceIdOf(args.network),
    amount: args.amountNgn,
  });
}

export function buyData(args: {
  requestId: string;
  network: VtpassNetwork;
  planCode: string;
  phone: string;
}): Promise<VtpassResult> {
  return send("/api/v2/data", {
    request_id: args.requestId,
    phone: args.phone,
    service_id: serviceIdOf(args.network),
    variation_id: args.planCode,
  });
}

export function requery(requestId: string): Promise<VtpassResult> {
  return send("/api/v2/requery", { request_id: requestId });
}

// Public endpoint (no token). Plans marked "Unavailable" are left out.
export async function listDataPlans(network: VtpassNetwork): Promise<DataPlan[]> {
  const res = await fetch(
    `${BASE_URL}/api/v2/variations/data?service_id=${encodeURIComponent(serviceIdOf(network))}`,
    { signal: AbortSignal.timeout(15_000) },
  );
  const body = (await res.json()) as { data?: unknown };
  const list = Array.isArray(body.data) ? body.data : [];
  return (list as { variation_id?: string | number; data_plan?: string; price?: string | number; availability?: string }[])
    .filter((v) => v.variation_id != null && v.data_plan && (v.availability ?? "Available") === "Available")
    .map((v) => ({ code: String(v.variation_id), name: v.data_plan as string, amountNgn: Number(v.price) }))
    .filter((v) => Number.isFinite(v.amountNgn) && v.amountNgn > 0);
}

export async function getBalance(): Promise<BalanceResult> {
  try {
    const { body } = await call("GET", "/api/v2/balance", undefined, 8_000);
    const data = (body.data && !Array.isArray(body.data) ? body.data : {}) as { balance?: unknown };
    const balance = Number(data.balance);
    if (body.code === "success" && Number.isFinite(balance)) return { balanceNgn: balance, problem: null };
    const code = body.code ?? "";
    logger.error(`VTU.ng balance check refused: code ${code || "none"}`);
    return { balanceNgn: null, problem: FAILED_CODES[code] ?? (body.message ? `VTU.ng: ${body.message}` : "VTU.ng didn't return a balance") };
  } catch (err) {
    if (err instanceof VtungAuthError) return { balanceNgn: null, problem: err.message };
    logger.error("VTU.ng balance check failed", err);
    return { balanceNgn: null, problem: "Couldn't reach VTU.ng to check the balance" };
  }
}
