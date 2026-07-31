import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("capstone_submissions", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      capstone_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "capstones", key: "id" },
        onDelete: "CASCADE",
      },
      student_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      submission_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      file_path: { type: DataTypes.STRING, allowNull: true },
      submission_text: { type: DataTypes.TEXT, allowNull: true },
      status: {
        type: DataTypes.ENUM("submitted", "graded", "returned"),
        allowNull: false,
        defaultValue: "submitted",
      },
      score: { type: DataTypes.INTEGER, allowNull: true },
      feedback: { type: DataTypes.TEXT, allowNull: true },
      graded_date: { type: DataTypes.DATE, allowNull: true },
    });

    await queryInterface.addIndex("capstone_submissions", ["capstone_id", "student_id"]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("capstone_submissions");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_capstone_submissions_status";');
  },
};
