import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("quizzes", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      module_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "modules", key: "id" },
        onDelete: "CASCADE",
      },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      due_date: { type: DataTypes.DATE, allowNull: true },
      time_limit_minutes: { type: DataTypes.INTEGER, allowNull: true },
      passing_score: { type: DataTypes.INTEGER, allowNull: false },
      question_count: { type: DataTypes.INTEGER, allowNull: false },
      shuffle_questions: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("quizzes");
  },
};
