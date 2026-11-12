import { QueryInterface } from "sequelize";
import { CORPORATE_LESSON_IMAGES } from "../seeders/data/curriculumCorporateImages";

// One illustrative diagram per lesson on the three corporate courses (2026-11-12),
// 105 in all. Each sits at the end of the section it illustrates (before any video
// note, activity or knowledge check), using the lesson images the graduate courses
// already use: { url, caption, afterParagraph }. The SVG is stored as text in the data
// file and turned into a data: URL here.
//
// A migration because seeders never run in production. Lessons are matched by course
// slug, module number and lesson title; a lesson that isn't found is skipped.

function toImages(entry: (typeof CORPORATE_LESSON_IMAGES)[number]) {
  const url = `data:image/svg+xml;base64,${Buffer.from(entry.svg, "utf8").toString("base64")}`;
  return [{ url, caption: entry.caption, afterParagraph: entry.afterParagraph }];
}

const LESSON_ID_SQL = `
  SELECT l.id FROM lessons l
  JOIN modules m ON m.id = l.module_id
  JOIN courses c ON c.id = m.course_id
  WHERE c.slug = :slug AND m.week_number = :moduleNumber AND l.title = :title`;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const q = queryInterface.sequelize;
    await q.transaction(async (transaction) => {
      for (const entry of CORPORATE_LESSON_IMAGES) {
        await q.query(`UPDATE lessons SET images = CAST(:images AS jsonb) WHERE id IN (${LESSON_ID_SQL})`, {
          replacements: {
            images: JSON.stringify(toImages(entry)),
            slug: entry.courseSlug,
            moduleNumber: entry.moduleNumber,
            title: entry.lessonTitle,
          },
          transaction,
        });
      }
    });
  },

  down: async (queryInterface: QueryInterface) => {
    const q = queryInterface.sequelize;
    await q.transaction(async (transaction) => {
      for (const entry of CORPORATE_LESSON_IMAGES) {
        await q.query(`UPDATE lessons SET images = '[]'::jsonb WHERE id IN (${LESSON_ID_SQL})`, {
          replacements: { slug: entry.courseSlug, moduleNumber: entry.moduleNumber, title: entry.lessonTitle },
          transaction,
        });
      }
    });
  },
};
