import { Enrollment, Payment, PaymentQuote } from "../types/api";
import { axiosClient } from "./axiosClient";

export async function fetchPaymentQuote(courseId: string, billingCountry?: string): Promise<PaymentQuote> {
  const res = await axiosClient.get<{ quote: PaymentQuote }>(`/payments/quote/${courseId}`, {
    params: billingCountry ? { billingCountry } : undefined,
  });
  return res.data.quote;
}

export interface CardPaymentInput {
  courseId: string;
  cardholderName: string;
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvv: string;
  billingCountry: string;
  billingAddressLine1: string;
  billingCity: string;
  billingPostalCode: string;
}

export async function payWithCard(
  input: CardPaymentInput,
): Promise<{ payment: Payment; enrollment: Enrollment }> {
  const res = await axiosClient.post<{ payment: Payment; enrollment: Enrollment }>("/payments/card", input);
  return res.data;
}

export interface BankTransferInput {
  courseId: string;
  transferReference: string;
  notes?: string;
}

export async function submitBankTransfer(
  input: BankTransferInput,
): Promise<{ payment: Payment; enrollment: Enrollment }> {
  const res = await axiosClient.post<{ payment: Payment; enrollment: Enrollment }>(
    "/payments/bank-transfer",
    input,
  );
  return res.data;
}
