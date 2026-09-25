import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Feedback a student leaves after completing a course (2026-09-25), with separate
    // opt-ins for quoting it publicly and showing their capstone. Nothing is published
    // until an admin approves it.
    await queryInterface.createTable("course_feedback", {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      enrollment_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: { model: "enrollments", key: "id" },
        onDelete: "CASCADE",
      },
      student_id: { type: DataTypes.UUID, allowNull: false, references: { model: "users", key: "id" }, onDelete: "CASCADE" },
      course_id: { type: DataTypes.UUID, allowNull: false, references: { model: "courses", key: "id" }, onDelete: "CASCADE" },
      rating: { type: DataTypes.INTEGER, allowNull: false },
      comment: { type: DataTypes.TEXT, allowNull: false },
      consent_quote: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      consent_capstone: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      approved: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("course_feedback");
  },
};
