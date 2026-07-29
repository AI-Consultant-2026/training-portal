import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("enrollments", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      course_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "courses", key: "id" },
        onDelete: "CASCADE",
      },
      student_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      enrolled_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      status: {
        type: DataTypes.ENUM("active", "completed", "dropped", "suspended"),
        allowNull: false,
        defaultValue: "active",
      },
      completion_date: { type: DataTypes.DATE, allowNull: true },
      progress_percent: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      grade: { type: DataTypes.STRING, allowNull: true },
    });

    await queryInterface.addIndex("enrollments", ["course_id", "student_id"], {
      unique: true,
      name: "enrollments_course_student_unique",
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("enrollments");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_enrollments_status";');
  },
};
