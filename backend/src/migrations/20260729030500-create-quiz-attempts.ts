import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("quiz_attempts", {
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
      student_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      start_time: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      end_time: { type: DataTypes.DATE, allowNull: true },
      score: { type: DataTypes.INTEGER, allowNull: true },
      status: {
        type: DataTypes.ENUM("in_progress", "submitted", "graded"),
        allowNull: false,
        defaultValue: "in_progress",
      },
      attempt_number: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    });

    await queryInterface.addIndex("quiz_attempts", ["quiz_id", "student_id"]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("quiz_attempts");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_quiz_attempts_status";');
  },
};
