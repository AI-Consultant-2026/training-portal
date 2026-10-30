import { CheckoutInfo } from "../../types/api";

// Shared wording for the payment pages (2026-10-30): Nigeria pays in Naira through
// Paystack, a live Ghana, Kenya or South Africa in its own currency through Flutterwave.
// A quote without checkout info is Naira on Paystack, as before.

export function formatPrice(checkout: CheckoutInfo | undefined, amount: number): string {
  if (!checkout) return `₦${amount.toLocaleString()}`;
  const { symbol, spaced } = checkout.currency;
  return `${symbol}${spaced ? " " : ""}${amount.toLocaleString()}`;
}

export function gatewayName(checkout: CheckoutInfo | undefined): "Paystack" | "Flutterwave" {
  return checkout?.gateway === "flutterwave" ? "Flutterwave" : "Paystack";
}

export function isFlutterwave(checkout: CheckoutInfo | undefined): boolean {
  return checkout?.gateway === "flutterwave";
}
