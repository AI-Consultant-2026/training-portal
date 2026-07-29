import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("quiz_questions", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      quiz_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "quizzes", key: "id" },
        onDelete: "CASCADE",
      },
      question_text: { type: DataTypes.TEXT, allowNull: false },
      question_type: {
        type: DataTypes.ENUM("multiple_choice", "true_false", "short_answer"),
        allowNull: false,
      },
      points: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      explanation: { type: DataTypes.TEXT, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("quiz_questions");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_quiz_questions_question_type";');
  },
};
