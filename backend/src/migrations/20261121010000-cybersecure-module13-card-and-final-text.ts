import { QueryInterface } from "sequelize";
import { CYBERSECURE_WORKFORCE } from "../seeders/data/curriculumCorporateCyberSecure";

// CyberSecure Workforce Essentials, owner's changes of 2026-11-21, to match Videos 13.1 and 13.3:
// - lesson 13.1 gets the quick reference card (Ken tells learners to keep it beside them);
// - lesson 13.3 now says answers are shown after every attempt (not "after you pass"), adds the
//   45-minute limit, the 20 scenarios, how to prepare, question tips and the certificate note;
// - module 13's description drops the old 25-question / 68% wording.
// Content is re-written from the data file (lessons matched by module 13 and lesson order).
// Idempotent; a database without the course is skipped.
const SLUG = CYBERSECURE_WORKFORCE.slug;
const LESSON_ORDERS = [1, 3];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const q = queryInterface.sequelize;
    const [courseRows] = await q.query(`SELECT id FROM courses WHERE slug = ?`, { replacements: [SLUG] });
    const course = (courseRows as { id: string }[])[0];
    if (!course) return;

    const mod = CYBERSECURE_WORKFORCE.modules.find((m) => m.moduleNumber === 13);
    if (!mod) throw new Error("CyberSecure module 13 missing from the data file");

    await q.transaction(async (transaction) => {
      await q.query(
        `UPDATE modules SET description = :description
         WHERE course_id = :course AND week_number = 13`,
        { replacements: { description: mod.description, course: course.id }, transaction },
      );
      for (const order of LESSON_ORDERS) {
        const lesson = mod.lessons.find((l) => l.order === order);
        if (!lesson) throw new Error(`CyberSecure lesson 13.${order} missing from the data file`);
        await q.query(
          `UPDATE lessons SET content = :content
           WHERE "order" = :order
             AND module_id = (SELECT id FROM modules WHERE course_id = :course AND week_number = 13)`,
          { replacements: { content: lesson.content, order, course: course.id }, transaction },
        );
      }
    });
  },

  down: async () => {},
};
