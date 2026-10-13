import { z } from "zod";

// Empty strings from the admin form's optional fields are treated as "not given".
const optional = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? null : v), schema.nullable().optional());

const noticeBody = z.object({
  title: z.string().trim().min(3).max(200),
  body: z.string().trim().min(1).max(5000),
  linkUrl: optional(z.string().trim().url().max(500).refine((v) => /^https?:\/\//i.test(v), "Use an http(s) link")),
  linkLabel: optional(z.string().trim().max(60)),
  expiresAt: optional(z.string().refine((v) => !Number.isNaN(Date.parse(v)), "Invalid date")),
});

export const createNoticeSchema = z.object({ body: noticeBody });

export const updateNoticeSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: noticeBody,
});

export const noticeIdSchema = z.object({ params: z.object({ id: z.string().uuid() }) });
