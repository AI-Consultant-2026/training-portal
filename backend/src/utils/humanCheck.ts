import crypto from "crypto";
import { config } from "../config";

/**
 * Human check for public forms (2026-11-26): a small sum ("What is seven + 4?").
 *
 * Stateless and signed: the browser gets the question plus a token
 * "expiry.nonce.hmac(answer|expiry|nonce)"; the answer itself never leaves the server.
 * Each token is accepted once (used nonces kept in memory until they expire).
 */
export const HUMAN_CHECK_TTL_MS = 30 * 60 * 1000;

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];

function key(): string {
  return process.env.HUMAN_CHECK_SECRET || crypto.createHash("sha256").update(`human-check|${config.jwt.accessSecret}`).digest("hex");
}

function sign(answer: number, exp: number, nonce: string): string {
  return crypto.createHmac("sha256", key()).update(`${answer}|${exp}|${nonce}`).digest("hex");
}

export function createHumanCheck(now = Date.now()): { question: string; token: string } {
  const a = crypto.randomInt(2, 10);
  const b = crypto.randomInt(1, 10);
  const exp = now + HUMAN_CHECK_TTL_MS;
  const nonce = crypto.randomBytes(8).toString("hex");
  const first = crypto.randomInt(0, 2) ? WORDS[a] : String(a);
  return { question: `What is ${first} + ${b}?`, token: `${exp}.${nonce}.${sign(a + b, exp, nonce)}` };
}

/** "11", " 11 " or "eleven" -> 11; anything else -> null. */
export function parseHumanAnswer(raw: unknown): number | null {
  if (typeof raw === "number" && Number.isInteger(raw)) return raw;
  if (typeof raw !== "string") return null;
  const v = raw.trim().toLowerCase();
  if (/^\d{1,3}$/.test(v)) return Number(v);
  const i = WORDS.indexOf(v);
  return i === -1 ? null : i;
}

const used = new Map<string, number>(); // nonce -> expiry

function sweep(now: number) {
  if (used.size < 500) return;
  for (const [n, exp] of used) if (exp < now) used.delete(n);
}

export function verifyHumanCheck(token: unknown, answer: unknown, now = Date.now()): boolean {
  if (typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expRaw, nonce, sig] = parts;
  if (!/^\d{10,16}$/.test(expRaw) || !/^[0-9a-f]{16}$/.test(nonce) || !/^[0-9a-f]{64}$/.test(sig)) return false;
  const exp = Number(expRaw);
  if (exp < now) return false;
  const n = parseHumanAnswer(answer);
  if (n === null) return false;
  const want = Buffer.from(sign(n, exp, nonce), "hex");
  if (!crypto.timingSafeEqual(want, Buffer.from(sig, "hex"))) return false;
  sweep(now);
  if (used.has(nonce)) return false;
  used.set(nonce, exp);
  return true;
}
