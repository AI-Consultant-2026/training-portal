import { axiosClient } from "./axiosClient";

// Corporate online orders (2026-11-12): see backend/src/services/corporateOrder.service.ts.

export type CorporateOrderStatus = "pending" | "paid" | "invoice_requested" | "failed" | "cancelled";

export interface CorporateOrder {
  id: string;
  txRef: string;
  status: CorporateOrderStatus;
  organisation: string;
  contactName: string;
  contactEmail: string;
  phone: string | null;
  region: string;
  buyerCountry: string | null;
  programme: string;
  programmeName: string;
  seats: number;
  currency: string;
  unitPrice: number;
  discountPercent: number;
  total: number;
  totalLabel: string;
  unitPriceLabel: string;
  paidAt: string | null;
  createdAt: string;
  flutterwaveTransactionId: string | null;
  client: { id: string; name: string } | null;
}

export async function fetchCorporateOrders(): Promise<CorporateOrder[]> {
  return (await axiosClient.get<{ orders: CorporateOrder[] }>("/admin/corporate-orders")).data.orders;
}

export async function markCorporateOrderPaid(id: string): Promise<CorporateOrder[]> {
  return (await axiosClient.post<{ orders: CorporateOrder[] }>(`/admin/corporate-orders/${id}/mark-paid`)).data.orders;
}

export async function cancelCorporateOrder(id: string): Promise<CorporateOrder[]> {
  return (await axiosClient.post<{ orders: CorporateOrder[] }>(`/admin/corporate-orders/${id}/cancel`)).data.orders;
}
