import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("quiz_answers", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      question_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "quiz_questions", key: "id" },
        onDelete: "CASCADE",
      },
      answer_text: { type: DataTypes.STRING, allowNull: false },
      is_correct: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("quiz_answers");
  },
};
