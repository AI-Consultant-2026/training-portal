import { QueryInterface } from "sequelize";
import { CorporateCourseSeed } from "../seeders/data/curriculumCorporateTypes";
import { CYBERSECURE_WORKFORCE } from "../seeders/data/curriculumCorporateCyberSecure";
import { AI_WORKFLOW } from "../seeders/data/curriculumCorporateAiWorkflow";
import { AI_CYBER_ACCELERATOR } from "../seeders/data/curriculumCorporateAccelerator";

// Puts a "Video coming soon" note in every corporate lesson, where the course docs place
// the lesson's video (title and length from the docs). The lessons were loaded by
// 20261112010000 without them, so this rewrites each lesson's content and duration from
// the data files, matched by course, module number and lesson order. Safe to re-run.
const COURSES: CorporateCourseSeed[] = [CYBERSECURE_WORKFORCE, AI_WORKFLOW, AI_CYBER_ACCELERATOR];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    for (const course of COURSES) {
      for (const mod of course.modules) {
        for (const lesson of mod.lessons) {
          await queryInterface.sequelize.query(
            `UPDATE lessons SET content = ?, duration_minutes = ?
               WHERE "order" = ?
                 AND module_id = (
                   SELECT m.id FROM modules m JOIN courses c ON c.id = m.course_id
                    WHERE c.slug = ? AND m.week_number = ?
                 )`,
            { replacements: [lesson.content, lesson.durationMinutes, lesson.order, course.slug, mod.moduleNumber] },
          );
        }
      }
    }
  },

  // Removes just the video notes again.
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE lessons SET content = regexp_replace(content, E'\\n*> \\\\*\\\\*Video coming soon:[^\\n]*', '', 'g')
         WHERE content LIKE '%Video coming soon:%'`,
    );
  },
};
