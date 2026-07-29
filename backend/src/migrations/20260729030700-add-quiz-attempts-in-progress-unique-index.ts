import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Guarantees at most one in-progress attempt per student per quiz at the DB level,
    // closing the check-then-create race in quiz.service.ts's start() function (two
    // concurrent start calls - e.g. a double-click, a retry, or React StrictMode's
    // dev-mode double effect invocation - could otherwise both pass the "no existing
    // in-progress attempt" check before either insert commits).
    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX quiz_attempts_one_in_progress_per_student
      ON quiz_attempts (quiz_id, student_id)
      WHERE status = 'in_progress'
    `);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(`DROP INDEX IF EXISTS quiz_attempts_one_in_progress_per_student`);
  },
};
