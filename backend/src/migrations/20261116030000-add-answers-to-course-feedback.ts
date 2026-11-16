import { DataTypes, QueryInterface } from "sequelize";

// Answers to a course's feedback questionnaire (see constants/feedbackQuestionnaires.ts),
// keyed by question id. Null for feedback given as a plain rating and comment.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn("course_feedback", "answers", { type: DataTypes.JSONB, allowNull: true });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("course_feedback", "answers");
  },
};
