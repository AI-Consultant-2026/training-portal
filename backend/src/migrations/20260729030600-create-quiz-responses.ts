import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("quiz_responses", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      attempt_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "quiz_attempts", key: "id" },
        onDelete: "CASCADE",
      },
      question_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "quiz_questions", key: "id" },
        onDelete: "CASCADE",
      },
      student_answer: { type: DataTypes.TEXT, allowNull: false },
      is_correct: { type: DataTypes.BOOLEAN, allowNull: true },
      points_earned: { type: DataTypes.INTEGER, allowNull: true },
      marked_at: { type: DataTypes.DATE, allowNull: true },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("quiz_responses");
  },
};
