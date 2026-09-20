import { QueryInterface } from "sequelize";
import { ASSIGNMENT_BRIEFS, CAPSTONE_BRIEFS } from "../seeders/data/assignmentBriefs";

// Replaces the one-sentence assignment and capstone descriptions of the four live courses
// (Cyber Security Fundamentals, Digital Marketing, GIS and Drone Mapping, HSE Fundamentals)
// with full briefs: overview, instructions, deliverables, assessment criteria, a worked
// example and common mistakes. Only `description` and `grading_rubric` change -- titles,
// points, due dates and, above all, every student's submission and grade are untouched.
// Rows are matched by (course slug, module week number), so it is safe to run on a database
// where some of these courses don't exist (it simply updates nothing for them).
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    for (const [slug, weeks] of Object.entries(ASSIGNMENT_BRIEFS)) {
      for (const [week, brief] of Object.entries(weeks)) {
        await queryInterface.sequelize.query(
          `UPDATE assignments a
           SET description = :description, grading_rubric = CAST(:rubric AS jsonb), updated_at = NOW()
           FROM modules m, courses c
           WHERE a.module_id = m.id AND m.course_id = c.id
             AND c.slug = :slug AND m.week_number = :week`,
          {
            replacements: {
              description: brief.description,
              rubric: JSON.stringify(brief.rubric),
              slug,
              week: Number(week),
            },
          },
        );
      }
    }

    for (const [slug, brief] of Object.entries(CAPSTONE_BRIEFS)) {
      await queryInterface.sequelize.query(
        `UPDATE capstones cp
         SET description = :description, grading_rubric = CAST(:rubric AS jsonb), updated_at = NOW()
         FROM courses c
         WHERE cp.course_id = c.id AND c.slug = :slug`,
        {
          replacements: {
            description: brief.description,
            rubric: JSON.stringify(brief.rubric),
            slug,
          },
        },
      );
    }
  },

  // The previous one-sentence descriptions are not restored: they remain in the original
  // curriculum seeders, and the detailed briefs are a strict improvement, not something
  // to be rolled back per-row.
  down: async () => undefined,
};
