import * as emails from "../emails";
import { Lead } from "../models";

export interface CreateLeadInput {
  name: string;
  email: string;
  course: string;
}

export async function createLead(input: CreateLeadInput): Promise<Lead> {
  const lead = await Lead.create(input);
  await emails.sendLeadNotificationEmail(lead);
  return lead;
}
