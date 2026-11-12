import { DataTypes, QueryInterface } from "sequelize";

// Optional attempt limit per quiz (null = unlimited, as before). Set to 3 on the final
// assessments of the three corporate courses, whose rules say "up to 3 attempts".
const FINAL_ASSESSMENT_ATTEMPTS = 3;

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn("quizzes", "max_attempts", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.sequelize.query(
      `UPDATE quizzes SET max_attempts = ?
         WHERE title = 'Final Assessment'
           AND module_id IN (
             SELECT m.id FROM modules m JOIN courses c ON c.id = m.course_id
              WHERE c.metadata->>'corporate' = 'true'
           )`,
      { replacements: [FINAL_ASSESSMENT_ATTEMPTS] },
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("quizzes", "max_attempts");
  },
};
