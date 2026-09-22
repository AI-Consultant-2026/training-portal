import { QueryInterface } from "sequelize";

// Reverses the rest of 20260819190000-add-is-enabled-to-quizzes.ts: that migration
// disabled three quizzes on request (Social Media Management & Content Week 2, GIS &
// Drone Mapping Days 1 and 8). Social Media Week 2 was already re-enabled by
// 20260828150000-reenable-social-media-week2-quiz.ts; this re-enables the remaining two
// so every GIS and Drone Mapping quiz, including the new Day 9 quiz, is consistently
// available.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE quizzes q
       SET is_enabled = true
       FROM modules m, courses c
       WHERE q.module_id = m.id
         AND m.course_id = c.id
         AND c.slug = 'gis-and-drone-mapping'
         AND m.week_number IN (1, 8)`,
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE quizzes q
       SET is_enabled = false
       FROM modules m, courses c
       WHERE q.module_id = m.id
         AND m.course_id = c.id
         AND c.slug = 'gis-and-drone-mapping'
         AND m.week_number IN (1, 8)`,
    );
  },
};
