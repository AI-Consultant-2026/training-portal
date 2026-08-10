import { randomUUID } from "crypto";

// PLACEHOLDER CARD GATEWAY. No real payment processor is wired up yet -- this file is
// the only thing that should change once Paleon Training UK Limited has a confirmed
// merchant account: swap the body of chargeCard() for a real SDK call (e.g. Stripe/
// Paystack "create charge"/"create payment intent"), keep the same input/output shape,
// and nothing else in the payment flow needs to change.
//
// Security note, not just a placeholder detail: this function must never let the raw
// card number or CVV escape past its own return value. It reads them only to derive a
// brand and last 4 digits for the receipt -- callers must not log or persist `input`.

export interface CardChargeInput {
  amount: number;
  currency: string;
  cardholderName: string;
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvv: string;
}

export interface CardChargeResult {
  status: "succeeded" | "failed";
  gatewayReference: string;
  cardBrand: string;
  cardLast4: string;
}

export async function chargeCard(input: CardChargeInput): Promise<CardChargeResult> {
  return {
    status: "succeeded",
    gatewayReference: `MOCK-${randomUUID()}`,
    cardBrand: detectCardBrand(input.cardNumber),
    cardLast4: input.cardNumber.slice(-4),
  };
}

function detectCardBrand(cardNumber: string): string {
  if (/^4/.test(cardNumber)) return "visa";
  if (/^5[1-5]/.test(cardNumber)) return "mastercard";
  if (/^3[47]/.test(cardNumber)) return "amex";
  if (/^6(?:011|5)/.test(cardNumber)) return "discover";
  return "card";
}
