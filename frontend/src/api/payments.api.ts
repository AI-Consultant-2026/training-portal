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
