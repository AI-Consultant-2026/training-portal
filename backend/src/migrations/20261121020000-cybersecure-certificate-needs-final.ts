import { QueryInterface } from "sequelize";

// Certificates now need a passed final assessment (owner, 2026-11-21; certificate.service.ts).
// CyberSecure lesson 13.3 said the certificate comes "when the course shows as completed";
// re-word that sentence in place. Idempotent; other courses and lessons are untouched.
const OLD = "When the course shows as completed, you can download your Certificate of Completion from Paleon Training.";
const NEW = "Once you pass the final assessment, you can download your Certificate of Completion from Paleon Training on your dashboard.";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE lessons SET content = REPLACE(content, :old, :new)
       WHERE position(:old in content) > 0
         AND module_id IN (SELECT m.id FROM modules m JOIN courses c ON c.id = m.course_id
                           WHERE c.slug = 'cybersecure-workforce-essentials')`,
      { replacements: { old: OLD, new: NEW } },
    );
  },
  down: async () => {},
};
