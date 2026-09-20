import { QueryInterface } from "sequelize";
import { applyBriefs } from "../seeders/data/assignmentBriefs/applyBriefs";

// Course modules are now presented as "Day N" instead of "Week N". The UI labels are code
// changes; this migration carries the stored text across for existing databases:
//   - quiz titles ("Week 3 Quiz" -> "Day 3 Quiz") and descriptions ("Covers Week 3: ...")
//   - assignment and capstone briefs, whose cross-references to modules ("as in Week 2")
//     are re-applied from the updated brief data (the earlier briefs migrations have
//     already run in production, so they can't deliver this edit themselves).
// Lesson body text is deliberately untouched.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE quizzes SET title = regexp_replace(title, '^Week (\\d+) Quiz$', 'Day \\1 Quiz') WHERE title ~ '^Week \\d+ Quiz$'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE quizzes SET description = regexp_replace(description, '\\mWeek (\\d+)\\M', 'Day \\1', 'g') WHERE description ~ '\\mWeek \\d+\\M'`,
    );
    await applyBriefs(queryInterface);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE quizzes SET title = regexp_replace(title, '^Day (\\d+) Quiz$', 'Week \\1 Quiz') WHERE title ~ '^Day \\d+ Quiz$'`,
    );
  },
};
