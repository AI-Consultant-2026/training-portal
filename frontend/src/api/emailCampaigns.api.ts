import {
  CampaignFromAddress,
  EmailCampaign,
  EmailCampaignAttachment,
  EmailCampaignRecipient,
  EmailPreview,
  UploadCampaignSummary,
} from "../types/api";
import { axiosClient } from "./axiosClient";

export async function uploadCampaign(file: File): Promise<UploadCampaignSummary> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosClient.post<UploadCampaignSummary>("/admin/email-campaigns/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function fetchCampaigns(): Promise<EmailCampaign[]> {
  const res = await axiosClient.get<{ campaigns: EmailCampaign[] }>("/admin/email-campaigns");
  return res.data.campaigns;
}

export async function fetchCampaign(id: string): Promise<EmailCampaign> {
  const res = await axiosClient.get<{ campaign: EmailCampaign }>(`/admin/email-campaigns/${id}`);
  return res.data.campaign;
}

export async function deleteCampaign(id: string): Promise<void> {
  await axiosClient.delete(`/admin/email-campaigns/${id}`);
}

export interface UpdateCampaignInput {
  fromEmail?: CampaignFromAddress;
  bodyTemplate?: string;
  ccEmails?: string;
}

export async function updateCampaign(id: string, input: UpdateCampaignInput): Promise<EmailCampaign> {
  const res = await axiosClient.patch<{ campaign: EmailCampaign }>(`/admin/email-campaigns/${id}`, input);
  return res.data.campaign;
}

export async function addAttachment(campaignId: string, file: File): Promise<EmailCampaignAttachment> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosClient.post<{ attachment: EmailCampaignAttachment }>(
    `/admin/email-campaigns/${campaignId}/attachments`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return res.data.attachment;
}

export async function removeAttachment(campaignId: string, attachmentId: string): Promise<void> {
  await axiosClient.delete(`/admin/email-campaigns/${campaignId}/attachments/${attachmentId}`);
}

export async function setRecipientSelected(
  campaignId: string,
  recipientId: string,
  isSelected: boolean,
): Promise<EmailCampaignRecipient> {
  const res = await axiosClient.patch<{ recipient: EmailCampaignRecipient }>(
    `/admin/email-campaigns/${campaignId}/recipients/${recipientId}`,
    { isSelected },
  );
  return res.data.recipient;
}

export async function removeRecipient(campaignId: string, recipientId: string): Promise<void> {
  await axiosClient.delete(`/admin/email-campaigns/${campaignId}/recipients/${recipientId}`);
}

export async function previewRecipient(campaignId: string, recipientId: string): Promise<EmailPreview> {
  const res = await axiosClient.get<{ preview: EmailPreview }>(
    `/admin/email-campaigns/${campaignId}/recipients/${recipientId}/preview`,
  );
  return res.data.preview;
}

export async function sendTestEmail(
  campaignId: string,
  testEmail: string,
  sampleRecipientId?: string,
): Promise<void> {
  await axiosClient.post(`/admin/email-campaigns/${campaignId}/test-email`, {
    testEmail,
    sampleRecipientId,
  });
}

export async function confirmSend(campaignId: string): Promise<void> {
  await axiosClient.post(`/admin/email-campaigns/${campaignId}/send`);
}
