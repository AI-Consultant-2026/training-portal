import { Request, Response } from "express";
import { OrderProgramme, PriceRegion } from "../constants/corporatePricing";
import * as corporateOrderService from "../services/corporateOrder.service";
import { asyncHandler } from "../utils/asyncHandler";

// POST /api/corporate/orders -- "Buy learner places" on the corporate pages. Returns the
// Flutterwave checkout link, or confirms that an invoice request was sent.
export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const b = req.body;
  const result = await corporateOrderService.createCorporateOrder({
    organisation: b.organisation,
    contactName: b.contactName,
    contactEmail: b.contactEmail,
    phone: b.phone ?? null,
    region: b.region as PriceRegion,
    buyerCountry: b.buyerCountry ?? null,
    programme: b.programme as OrderProgramme,
    seats: b.seats,
    payByInvoice: b.payByInvoice === true,
  });
  res.status(201).json(result);
});

// --- Admin: /admin/corporate-orders ---------------------------------------------

export const listOrders = asyncHandler(async (_req: Request, res: Response) => {
  res.json({ orders: await corporateOrderService.listOrders() });
});

export const markPaid = asyncHandler(async (req: Request, res: Response) => {
  await corporateOrderService.adminMarkPaid(req.params.id);
  res.json({ orders: await corporateOrderService.listOrders() });
});

export const cancelOrder = asyncHandler(async (req: Request, res: Response) => {
  await corporateOrderService.adminCancel(req.params.id);
  res.json({ orders: await corporateOrderService.listOrders() });
});
