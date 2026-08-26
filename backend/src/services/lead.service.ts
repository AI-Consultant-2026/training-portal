import * as emails from "../emails";
import { Lead } from "../models";
import { logger } from "../utils/logger";

export interface CreateLeadInput {
  name: string;
  email: string;
  phone?: string;
  course: string;
  university?: string;
  source?: string;
}

export async function createLead(input: CreateLeadInput): Promise<Lead> {
  const lead = await Lead.create(input);
  // Best-effort, not awaited -- an unreachable/slow SMTP provider must never hang the
  // marketing site's lead-capture form; the lead itself is already saved at this point.
  emails.sendLeadNotificationEmail(lead).catch((err) => logger.error("Failed to send lead notification email", err));
  return lead;
}
