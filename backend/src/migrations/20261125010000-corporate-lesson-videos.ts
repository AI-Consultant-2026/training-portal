import { QueryInterface } from "sequelize";
import { CORPORATE_LESSON_VIDEOS } from "../seeders/data/curriculumCorporateVideos";

// Loads the 105 corporate lesson videos (2026-11-25): CyberSecure Workforce 39, AI Workflow 30,
// AI + Cybersecurity Accelerator 36. For each lesson (matched by course slug, module number and
// lesson order) it sets lessons.video_url and replaces the lesson's "> **Video coming soon…"
// paragraph with the <!-- lesson-video --> marker, so the player appears exactly where the note
// was and the diagram positions (afterParagraph) don't move. Only that paragraph changes; the
// rest of the lesson text is left as it is in the database. Safe to re-run.
const LEGACY_NOTE = "> \\*\\*Video coming soon[^\\n]*";
const MARKER = "<!-- lesson-video -->";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const q = queryInterface.sequelize;
    await q.transaction(async (transaction) => {
      for (const [slug, videos] of Object.entries(CORPORATE_LESSON_VIDEOS)) {
        for (const [key, url] of Object.entries(videos)) {
          const [moduleNumber, order] = key.split(".").map(Number);
          await q.query(
            `UPDATE lessons
                SET video_url = :url,
                    content = regexp_replace(content, :note, :marker)
              WHERE "order" = :order
                AND module_id = (
                  SELECT m.id FROM modules m JOIN courses c ON c.id = m.course_id
                   WHERE c.slug = :slug AND m.week_number = :moduleNumber
                )`,
            { replacements: { url, note: LEGACY_NOTE, marker: MARKER, order, slug, moduleNumber }, transaction },
          );
        }
      }
    });
  },

  // Takes the videos off again; the marker stays (it renders as nothing without a video).
  down: async (queryInterface: QueryInterface) => {
    const q = queryInterface.sequelize;
    for (const [slug, videos] of Object.entries(CORPORATE_LESSON_VIDEOS)) {
      for (const key of Object.keys(videos)) {
        const [moduleNumber, order] = key.split(".").map(Number);
        await q.query(
          `UPDATE lessons SET video_url = NULL
            WHERE "order" = :order
              AND module_id = (
                SELECT m.id FROM modules m JOIN courses c ON c.id = m.course_id
                 WHERE c.slug = :slug AND m.week_number = :moduleNumber
              )`,
          { replacements: { order, slug, moduleNumber } },
        );
      }
    }
  },
};
