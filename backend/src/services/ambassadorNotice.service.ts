import { Op } from "sequelize";
import { AmbassadorNotice } from "../models";

export interface AmbassadorNoticeInput {
  title: string;
  body: string;
  linkUrl?: string | null;
  linkLabel?: string | null;
  expiresAt?: string | null;
}

function toValues(input: AmbassadorNoticeInput) {
  const linkUrl = input.linkUrl?.trim() || null;
  return {
    title: input.title.trim(),
    body: input.body.trim(),
    linkUrl,
    // A label without a link would render as a dead button, so drop it.
    linkLabel: linkUrl ? input.linkLabel?.trim() || null : null,
    expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
  };
}

// What ambassadors see on /refer/me: unexpired notices, newest first.
export async function listActiveNotices(now = new Date()): Promise<AmbassadorNotice[]> {
  return AmbassadorNotice.findAll({
    where: { [Op.or]: [{ expiresAt: null }, { expiresAt: { [Op.gt]: now } }] },
    order: [["createdAt", "DESC"]],
  });
}

export async function listAllNotices(): Promise<AmbassadorNotice[]> {
  return AmbassadorNotice.findAll({ order: [["createdAt", "DESC"]] });
}

export async function createNotice(input: AmbassadorNoticeInput): Promise<AmbassadorNotice> {
  return AmbassadorNotice.create(toValues(input));
}

export async function updateNotice(id: string, input: AmbassadorNoticeInput): Promise<AmbassadorNotice | null> {
  const notice = await AmbassadorNotice.findByPk(id);
  if (!notice) return null;
  await notice.update(toValues(input));
  return notice;
}

export async function deleteNotice(id: string): Promise<boolean> {
  return (await AmbassadorNotice.destroy({ where: { id } })) > 0;
}
