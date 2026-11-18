import { DiscountCode } from "../models";
import { ApiError } from "../utils/ApiError";

// Discount codes (2026-11-18): a percentage off the course price for a candidate who pays
// in full. They never apply to the ₦20,000-style deposit or to the balance, so a deposit
// plan always costs the full price. Any candidate can use an active code.

export function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

export const INVALID_DISCOUNT_MESSAGE = "This discount code isn't valid or has expired.";

// The active, unexpired code, or a 400 the payment page shows next to the code box.
export async function requireValidCode(code: string, now = new Date()): Promise<DiscountCode> {
  const found = await DiscountCode.findOne({ where: { code: normalizeCode(code) } });
  if (!found || !found.active || (found.expiresAt && found.expiresAt <= now)) {
    throw new ApiError(400, INVALID_DISCOUNT_MESSAGE, { code: "INVALID_DISCOUNT_CODE" });
  }
  return found;
}

// Whole units of the checkout currency (naira, cedis, shillings, rand), rounded to the
// nearest unit, as the gateways are charged in whole units.
export function discountedAmount(price: number, percentOff: number): number {
  return Math.round((price * (100 - percentOff)) / 100);
}

// --- Admin -------------------------------------------------------------------------------

export interface DiscountCodeInput {
  code: string;
  percentOff: number;
  description?: string | null;
  active?: boolean;
  expiresAt?: string | null;
}

function toValues(input: DiscountCodeInput) {
  return {
    code: normalizeCode(input.code),
    percentOff: input.percentOff,
    description: input.description?.trim() || null,
    active: input.active ?? true,
    expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
  };
}

export async function listCodes(): Promise<DiscountCode[]> {
  return DiscountCode.findAll({ order: [["createdAt", "DESC"]] });
}

async function assertUnique(code: string, exceptId?: string) {
  const existing = await DiscountCode.findOne({ where: { code: normalizeCode(code) } });
  if (existing && existing.id !== exceptId) throw ApiError.conflict("A discount code with this name already exists");
}

export async function createCode(input: DiscountCodeInput): Promise<DiscountCode> {
  await assertUnique(input.code);
  return DiscountCode.create(toValues(input));
}

export async function updateCode(id: string, input: DiscountCodeInput): Promise<DiscountCode | null> {
  const found = await DiscountCode.findByPk(id);
  if (!found) return null;
  await assertUnique(input.code, id);
  await found.update(toValues(input));
  return found;
}

export async function deleteCode(id: string): Promise<boolean> {
  return (await DiscountCode.destroy({ where: { id } })) > 0;
}
