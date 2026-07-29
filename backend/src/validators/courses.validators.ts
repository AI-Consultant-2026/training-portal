import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    slug: z.string().regex(slugRegex, "Slug must be lowercase, alphanumeric, and hyphen-separated"),
    description: z.string().optional(),
    durationWeeks: z.number().int().positive(),
    level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  }),
});

export const updateCourseSchema = z.object({
  body: z
    .object({
      title: z.string().min(1).optional(),
      description: z.string().optional(),
      durationWeeks: z.number().int().positive().optional(),
      level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
      status: z.enum(["draft", "published", "archived"]).optional(),
    })
    .strict(),
});
