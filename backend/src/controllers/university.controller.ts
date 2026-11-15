import { Request, Response } from "express";
import { CountryCode } from "../constants/countries";
import * as corporateService from "../services/corporate.service";
import * as universityOrderService from "../services/universityOrder.service";
import * as universityPricing from "../services/universityPricing.service";
import { User } from "../models";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

// University places (2026-11-15).

// POST /api/corporate/university-orders -- the buy form on /<country>/universities.
export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const b = req.body;
  const result = await universityOrderService.createUniversityOrder({
    organisation: b.organisation,
    contactName: b.contactName,
    contactEmail: b.contactEmail,
    phone: b.phone ?? null,
    country: b.country as CountryCode,
    items: b.items,
    payByInvoice: b.payByInvoice === true,
  });
  res.status(201).json(result);
});

// POST /api/corporate/me/orders -- a representative buys more places for their university.
export const topUp = asyncHandler(async (req: Request, res: Response) => {
  const { client } = await corporateService.requireUniversityManager(req.user!.id);
  const user = await User.findByPk(req.user!.id);
  if (!user) throw ApiError.notFound("User not found");
  const result = await universityOrderService.createUniversityOrder(
    {
      organisation: client.name,
      contactName: `${user.firstName} ${user.lastName}`.trim(),
      contactEmail: user.email,
      phone: req.body.phone ?? null,
      country: client.country as CountryCode,
      items: req.body.items,
      payByInvoice: req.body.payByInvoice === true,
    },
    client,
  );
  res.status(201).json(result);
});

// --- Admin: /admin/university-discounts ------------------------------------------

export const getDiscounts = asyncHandler(async (_req: Request, res: Response) => {
  res.json({ tiers: await universityPricing.getGroupDiscountTiers(), defaults: universityPricing.DEFAULT_TIERS });
});

export const setDiscounts = asyncHandler(async (req: Request, res: Response) => {
  res.json({ tiers: await universityPricing.setGroupDiscountTiers(req.body.tiers) });
});
