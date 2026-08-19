import { QueryInterface, DataTypes } from "sequelize";

// Admin-controlled kill switch, independent of the existing lesson-completion lock in
// quiz.service.ts's start() -- lets specific quizzes be pulled from student access
// (content not ready, needs rework, etc.) without deleting them or touching the
// lesson-completion gating logic. Defaults true so every existing/future quiz stays
// exactly as available as it is today unless explicitly turned off.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn("quizzes", "is_enabled", {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    // Disabled on request: Social Media Management & Content Week 2, and GIS & Drone
    // Mapping Weeks 1 and 8.
    await queryInterface.sequelize.query(
      `UPDATE quizzes q
       SET is_enabled = false
       FROM modules m, courses c
       WHERE q.module_id = m.id
         AND m.course_id = c.id
         AND (
           (c.slug = 'social-media-management-content' AND m.week_number = 2)
           OR (c.slug = 'gis-and-drone-mapping' AND m.week_number IN (1, 8))
         )`,
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("quizzes", "is_enabled");
  },
};
