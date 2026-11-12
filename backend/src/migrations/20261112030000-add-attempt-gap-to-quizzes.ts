import { DataTypes, QueryInterface } from "sequelize";

// Optional minimum gap between attempts at a quiz, in hours (null = none, as before).
// Set to 24 on the final assessments of the three corporate courses, whose rules say
// "up to 3 attempts, at least 24 hours apart".
const FINAL_ASSESSMENT_GAP_HOURS = 24;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn("quizzes", "min_hours_between_attempts", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.sequelize.query(
      `UPDATE quizzes SET min_hours_between_attempts = ?
         WHERE title = 'Final Assessment'
           AND module_id IN (
             SELECT m.id FROM modules m JOIN courses c ON c.id = m.course_id
              WHERE c.metadata->>'corporate' = 'true'
           )`,
      { replacements: [FINAL_ASSESSMENT_GAP_HOURS] },
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("quizzes", "min_hours_between_attempts");
  },
};
