import { QueryInterface } from "sequelize";

// AI Workflow Productivity: the final project is now a fictional business scenario (2026-11-16),
// but one lesson still said the learner's own workflow "becomes the starting point for your final
// project". Re-word that sentence in place. Idempotent; other courses and lessons are untouched.
const OLD = "You will apply it to a workflow from your own job, which becomes the starting point for your final project.";
const NEW = "You will practise it on a workflow from your own job, and use the same method in your final project.";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE lessons SET content = REPLACE(content, :old, :new)
       WHERE position(:old in content) > 0
         AND module_id IN (SELECT m.id FROM modules m JOIN courses c ON c.id = m.course_id
                           WHERE c.slug = 'ai-workflow-productivity')`,
      { replacements: { old: OLD, new: NEW } },
    );
  },
  down: async () => {},
};
