import multer from "multer";
import { MAX_ATTACHMENT_BYTES } from "../services/emailCampaign.service";

// Email-client campaign attachments. Type and size are checked again in
// emailCampaign.service.ts addAttachment(), which gives the admin a clear message;
// this limit just stops an oversized upload from being buffered in full.
export const uploadAttachment = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_ATTACHMENT_BYTES + 1 },
}).single("file");
