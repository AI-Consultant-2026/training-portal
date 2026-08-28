import { QueryInterface } from "sequelize";

// Reverses part of 20260819190000-add-is-enabled-to-quizzes.ts: that migration disabled
// three quizzes on request (Social Media Management & Content Week 2, GIS & Drone
// Mapping Weeks 1 and 8). Social Media Week 2 is being turned back on here -- the other
// two are untouched and stay disabled.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE quizzes q
       SET is_enabled = true
       FROM modules m, courses c
       WHERE q.module_id = m.id
         AND m.course_id = c.id
         AND c.slug = 'social-media-management-content'
         AND m.week_number = 2`,
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE quizzes q
       SET is_enabled = false
       FROM modules m, courses c
       WHERE q.module_id = m.id
         AND m.course_id = c.id
         AND c.slug = 'social-media-management-content'
         AND m.week_number = 2`,
    );
  },
};
