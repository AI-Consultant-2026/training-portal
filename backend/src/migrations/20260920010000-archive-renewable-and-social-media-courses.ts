import { QueryInterface } from "sequelize";

// Takes Renewable Energy Digital Systems and Social Media Management & Content off the
// public /courses catalog. "archived" (not deleted, not admin-only) is deliberate:
// listPublishedCourses stops returning them and enrollStudent rejects new enrolments,
// but every existing enrolment, lesson, and progress record is left intact and a
// direct /courses/<slug> link still resolves for students already enrolled.
// Reversible: down() re-publishes them.
const SLUGS = ["renewable-energy-digital-systems", "social-media-management-content"];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE courses SET status = 'archived', updated_at = NOW()
       WHERE slug IN (:slugs) AND status = 'published'`,
      { replacements: { slugs: SLUGS } },
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE courses SET status = 'published', updated_at = NOW()
       WHERE slug IN (:slugs) AND status = 'archived'`,
      { replacements: { slugs: SLUGS } },
    );
  },
};
