import { QueryInterface } from "sequelize";
import { WEEKS } from "../seeders/data/curriculumDataAnalytics";

// Adds the Data Analytics & BI illustrations (one per part, two per lesson) to lessons
// that are already in the database. Fresh databases get them from the course migration,
// which inserts each lesson's images. Lessons are matched by day and lesson order.
// Idempotent; databases without the course are skipped.
const SLUG = "data-analytics-business-intelligence";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const [courseRows] = await queryInterface.sequelize.query(`SELECT id FROM courses WHERE slug = ?`, {
      replacements: [SLUG],
    });
    const course = (courseRows as { id: string }[])[0];
    if (!course) return;

    await queryInterface.sequelize.transaction(async (transaction) => {
      for (const week of WEEKS) {
        for (const lesson of week.lessons) {
          await queryInterface.sequelize.query(
            `UPDATE lessons SET images = CAST(:images AS jsonb)
             WHERE "order" = :order
               AND module_id = (SELECT id FROM modules WHERE course_id = :course AND week_number = :week)`,
            {
              replacements: {
                images: JSON.stringify(lesson.images ?? []),
                order: lesson.order,
                course: course.id,
                week: week.weekNumber,
              },
              transaction,
            },
          );
        }
      }
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE lessons SET images = '[]'::jsonb
       WHERE module_id IN (SELECT m.id FROM modules m JOIN courses c ON c.id = m.course_id WHERE c.slug = ?)`,
      { replacements: [SLUG] },
    );
  },
};
