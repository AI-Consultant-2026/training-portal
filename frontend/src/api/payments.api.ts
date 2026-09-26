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

export interface BankTransferInput {
  courseId: string;
  transferReference: string;
  notes?: string;
  receipt?: File | null;
}

export async function submitBankTransfer(
  input: BankTransferInput,
): Promise<{ payment: Payment; enrollment: Enrollment }> {
  // Multipart, so an optional receipt image/PDF can go with it.
  const form = new FormData();
  form.append("courseId", input.courseId);
  form.append("transferReference", input.transferReference);
  if (input.notes) form.append("notes", input.notes);
  if (input.receipt) form.append("receipt", input.receipt);
  const res = await axiosClient.post<{ payment: Payment; enrollment: Enrollment }>("/payments/bank-transfer", form);
  return res.data;
}
