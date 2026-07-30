import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("progress_tracking", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      student_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      lesson_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "lessons", key: "id" },
        onDelete: "CASCADE",
      },
      completed_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });

    // The unique constraint IS the idempotency guard: marking the same lesson complete
    // twice for the same student hits this index rather than needing an app-level check.
    await queryInterface.addIndex("progress_tracking", ["student_id", "lesson_id"], {
      unique: true,
      name: "progress_tracking_student_lesson_unique",
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("progress_tracking");
  },
};
