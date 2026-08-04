import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { WEEKS as CYBER_SECURITY } from "./data/curriculumCyberSecurity";
import { WEEKS as DIGITAL_MARKETING } from "./data/curriculumDigitalMarketing";
import { WEEKS as GIS } from "./data/curriculumGis";
import { WEEKS as RENEWABLE_ENERGY } from "./data/curriculumRenewableEnergy";
import { WEEKS as SOCIAL_MEDIA } from "./data/curriculumSocialMedia";
import { WeekSeed } from "./data/curriculumTypes";

const COURSES: { slug: string; weeks: WeekSeed[] }[] = [
  { slug: "cyber-security-fundamentals", weeks: CYBER_SECURITY },
  { slug: "digital-marketing", weeks: DIGITAL_MARKETING },
  { slug: "gis-and-drone-mapping", weeks: GIS },
  { slug: "renewable-energy-digital-systems", weeks: RENEWABLE_ENERGY },
  { slug: "social-media-management-content", weeks: SOCIAL_MEDIA },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const now = new Date();
    const slugs = COURSES.map((c) => c.slug);

    const [courses] = await queryInterface.sequelize.query(
      `SELECT id AS course_id, slug FROM courses WHERE slug IN (${slugs.map(() => "?").join(",")})`,
      { replacements: slugs },
    );
    const courseIdBySlug = new Map(
      (courses as { course_id: string; slug: string }[]).map((c) => [c.slug, c.course_id]),
    );

    const moduleRows: Record<string, unknown>[] = [];
    const moduleIdByCourseAndWeek = new Map<string, string>();

    COURSES.forEach((course) => {
      const courseId = courseIdBySlug.get(course.slug);
      course.weeks.forEach((week) => {
        const moduleId = crypto.randomUUID();
        moduleIdByCourseAndWeek.set(`${course.slug}:${week.weekNumber}`, moduleId);
        moduleRows.push({
          id: moduleId,
          course_id: courseId,
          title: week.moduleTitle,
          description: week.moduleDescription,
          week_number: week.weekNumber,
          order: week.weekNumber,
          status: "published",
          created_at: now,
        });
      });
    });
    await queryInterface.bulkInsert("modules", moduleRows);

    const lessonRows: Record<string, unknown>[] = [];
    COURSES.forEach((course) => {
      course.weeks.forEach((week) => {
        const moduleId = moduleIdByCourseAndWeek.get(`${course.slug}:${week.weekNumber}`);
        week.lessons.forEach((lesson) => {
          lessonRows.push({
            id: crypto.randomUUID(),
            module_id: moduleId,
            title: lesson.title,
            content: lesson.content,
            video_url: null,
            resources: JSON.stringify({}),
            images: JSON.stringify(lesson.images ?? []),
            order: lesson.order,
            duration_minutes: lesson.durationMinutes,
            created_at: now,
          });
        });
      });
    });
    await queryInterface.bulkInsert("lessons", lessonRows);
  },

  down: async (queryInterface: QueryInterface) => {
    const moduleIds: string[] = [];
    for (const course of COURSES) {
      const weekNumbers = course.weeks.map((w) => w.weekNumber);
      const [modules] = await queryInterface.sequelize.query(
        `SELECT m.id AS module_id
         FROM modules m
         JOIN courses c ON c.id = m.course_id
         WHERE c.slug = ? AND m.week_number IN (${weekNumbers.map(() => "?").join(",")})`,
        { replacements: [course.slug, ...weekNumbers] },
      );
      moduleIds.push(...(modules as { module_id: string }[]).map((m) => m.module_id));
    }
    if (moduleIds.length === 0) return;

    await queryInterface.bulkDelete("lessons", { module_id: moduleIds });
    await queryInterface.bulkDelete("modules", { id: moduleIds });
  },
};
