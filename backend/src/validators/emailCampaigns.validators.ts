import { z } from "zod";
import { CAMPAIGN_FROM_ADDRESSES } from "../models/emailCampaign.model";

export const updateCampaignSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    fromEmail: z.enum(CAMPAIGN_FROM_ADDRESSES).optional(),
    bodyTemplate: z.string().min(1).max(50_000).optional(),
    ccEmails: z.string().max(2_000).optional(),
  }),
});

export const attachmentIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
    attachmentId: z.string().uuid(),
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

export const scheduleCampaignSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    // ISO 8601 with a timezone, e.g. 2026-11-30T09:00:00.000Z
    sendAt: z.string().datetime({ offset: true }),
  }),
});
