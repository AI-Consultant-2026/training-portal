import { Enrollment, Payment, PaymentQuote } from "../types/api";
import { axiosClient } from "./axiosClient";

export async function fetchPaymentQuote(courseId: string): Promise<PaymentQuote> {
  const res = await axiosClient.get<{ quote: PaymentQuote }>(`/payments/quote/${courseId}`);
  return res.data.quote;
}

// Enrols the student if needed and records a pending card payment; returns the course's
// Paystack payment page, where the student actually pays.
export async function startCardPayment(
  courseId: string,
): Promise<{ paymentLink: string; payment: Payment; enrollment: Enrollment }> {
  const res = await axiosClient.post<{ paymentLink: string; payment: Payment; enrollment: Enrollment }>(
    "/payments/card",
    { courseId },
  );
  return res.data;
}

// Instalments: opens Paystack checkout for the deposit (unlocks the first days) or the
// balance (unlocks the rest of the course). The server confirms it from Paystack's webhook.
export async function startInstalmentPayment(
  courseId: string,
  kind: "deposit" | "balance",
): Promise<{ paymentLink: string; payment: Payment; enrollment: Enrollment }> {
  const res = await axiosClient.post<{ paymentLink: string; payment: Payment; enrollment: Enrollment }>(
    "/payments/instalment",
    { courseId, kind },
  );
  return res.data;
}

// Backup for Paystack's webhook: on returning from checkout, ask the server to check the
// charge with Paystack and apply it straight away.
export async function verifyInstalmentPayment(reference: string): Promise<{ outcome: string }> {
  const res = await axiosClient.post<{ outcome: string }>("/payments/instalment/verify", { reference });
  return res.data;
}
