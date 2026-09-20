import { QueryInterface } from "sequelize";
import { ASSIGNMENT_BRIEFS, CAPSTONE_BRIEFS } from "./index";

// Writes the current briefs into assignments.description / grading_rubric and
// capstones.description / grading_rubric, matched by (course slug, module week number) and
// course slug. Only those two columns change -- titles, points, due dates and every
// student's submission and grade are untouched -- and it is idempotent, so a later
// migration can safely re-apply the same (edited) briefs to a database that already has
// an earlier version. Courses missing from the database are simply skipped.
export async function applyBriefs(queryInterface: QueryInterface): Promise<void> {
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
}
