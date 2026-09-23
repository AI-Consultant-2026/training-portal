import { Request, Response } from "express";
import * as emailCampaignService from "../services/emailCampaign.service";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const uploadCampaign = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw ApiError.badRequest("No file was uploaded. Choose a .xlsx file.");
  }
  const summary = await emailCampaignService.uploadCampaign(req.user!.id, {
    buffer: req.file.buffer,
    originalname: req.file.originalname,
  });
  res.status(201).json(summary);
});

export const listCampaigns = asyncHandler(async (_req: Request, res: Response) => {
  const campaigns = await emailCampaignService.listCampaigns();
  res.json({ campaigns });
});

export const getCampaign = asyncHandler(async (req: Request, res: Response) => {
  const campaign = await emailCampaignService.getCampaign(req.params.id as string);
  res.json({ campaign });
});

export const updateCampaign = asyncHandler(async (req: Request, res: Response) => {
  const campaign = await emailCampaignService.updateCampaign(req.params.id as string, req.body);
  res.json({ campaign });
});

export const deleteCampaign = asyncHandler(async (req: Request, res: Response) => {
  await emailCampaignService.deleteCampaign(req.params.id as string);
  res.status(204).end();
});

export const setRecipientSelected = asyncHandler(async (req: Request, res: Response) => {
  const recipient = await emailCampaignService.setRecipientSelected(
    req.params.id as string,
    req.params.recipientId as string,
    req.body.isSelected,
  );
  res.json({ recipient });
});

export const removeRecipient = asyncHandler(async (req: Request, res: Response) => {
  await emailCampaignService.removeRecipient(req.params.id as string, req.params.recipientId as string);
  res.status(204).end();
});

export const previewRecipient = asyncHandler(async (req: Request, res: Response) => {
  const preview = await emailCampaignService.previewRecipientEmail(
    req.params.id as string,
    req.params.recipientId as string,
  );
  res.json({ preview });
});

export const sendTestEmail = asyncHandler(async (req: Request, res: Response) => {
  await emailCampaignService.sendTestEmail(
    req.params.id as string,
    req.body.testEmail,
    req.body.sampleRecipientId,
  );
  res.status(204).end();
});

export const confirmSend = asyncHandler(async (req: Request, res: Response) => {
  await emailCampaignService.confirmSend(req.params.id as string);
  res.status(202).json({ status: "sending" });
});
