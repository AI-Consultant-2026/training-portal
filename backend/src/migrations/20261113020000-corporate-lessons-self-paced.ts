import { QueryInterface } from "sequelize";
import { CorporateCourseSeed } from "../seeders/data/curriculumCorporateTypes";
import { CYBERSECURE_WORKFORCE } from "../seeders/data/curriculumCorporateCyberSecure";
import { AI_WORKFLOW } from "../seeders/data/curriculumCorporateAiWorkflow";
import { AI_CYBER_ACCELERATOR } from "../seeders/data/curriculumCorporateAccelerator";

// Corporate training is online and in-house only (owner, 2026-11-13): self-paced, never live,
// facilitator-led or hybrid. The lessons said "your facilitator provides…" for practical
// materials that were never in the lesson; those materials are now written into each activity,
// and capstone feedback comes from a "Paleon reviewer". This rewrites lesson content, module
// descriptions and capstone descriptions from the data files (matched by course slug, module
// number and lesson order), plus the intro-quiz and Accelerator course descriptions. Safe to re-run.
const COURSES: CorporateCourseSeed[] = [CYBERSECURE_WORKFORCE, AI_WORKFLOW, AI_CYBER_ACCELERATOR];
const MODULE_SQL = `SELECT m.id FROM modules m JOIN courses c ON c.id = m.course_id WHERE c.slug = ? AND m.week_number = ?`;
const INTRO_OLD = "It isn't scored: it shows you, and your facilitator, which modules need the most attention.";
const INTRO_NEW = "It isn't scored: it shows you which modules need the most attention.";
const ACC_OLD = "a capstone project with facilitator feedback";
const ACC_NEW = "a capstone project with written reviewer feedback";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const q = queryInterface.sequelize;
    for (const course of COURSES) {
      for (const mod of course.modules) {
        await q.query(`UPDATE modules SET description = ? WHERE id = (${MODULE_SQL})`, {
          replacements: [mod.description, course.slug, mod.moduleNumber],
        });
        for (const lesson of mod.lessons) {
          await q.query(`UPDATE lessons SET content = ? WHERE "order" = ? AND module_id = (${MODULE_SQL})`, {
            replacements: [lesson.content, lesson.order, course.slug, mod.moduleNumber],
          });
        }
      }
      await q.query(`UPDATE capstones SET description = ? WHERE course_id = (SELECT id FROM courses WHERE slug = ?)`, {
        replacements: [course.capstone.description, course.slug],
      });
    }
    await q.query(`UPDATE quizzes SET description = replace(description, ?, ?) WHERE description LIKE ?`, {
      replacements: [INTRO_OLD, INTRO_NEW, `%${INTRO_OLD}%`],
    });
    await q.query(`UPDATE courses SET description = replace(description, ?, ?) WHERE slug = 'ai-cybersecurity-professional-accelerator'`, {
      replacements: [ACC_OLD, ACC_NEW],
    });
  },

  // Content is re-written from the data files; only the two plain-text swaps are reversed.
  down: async (queryInterface: QueryInterface) => {
    const q = queryInterface.sequelize;
    await q.query(`UPDATE quizzes SET description = replace(description, ?, ?) WHERE description LIKE ?`, {
      replacements: [INTRO_NEW, INTRO_OLD, `%${INTRO_NEW}%`],
    });
    await q.query(`UPDATE courses SET description = replace(description, ?, ?) WHERE slug = 'ai-cybersecurity-professional-accelerator'`, {
      replacements: [ACC_NEW, ACC_OLD],
    });
  },
};
