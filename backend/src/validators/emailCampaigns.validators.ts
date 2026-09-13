import { z } from "zod";
import { CAMPAIGN_FROM_ADDRESSES } from "../models/emailCampaign.model";

export const updateCampaignSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    fromEmail: z.enum(CAMPAIGN_FROM_ADDRESSES).optional(),
    bodyTemplate: z.string().min(1).max(50_000).optional(),
  }),
});

export const toggleRecipientSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
    recipientId: z.string().uuid(),
  }),
  body: z.object({
    isSelected: z.boolean(),
  }),
});

export const removeRecipientSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
    recipientId: z.string().uuid(),
  }),
});

export const sendTestEmailSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    testEmail: z.string().email(),
    sampleRecipientId: z.string().uuid().optional(),
  }),
});

export const campaignIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
