import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("capstones", {
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
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      due_date: { type: DataTypes.DATE, allowNull: true },
      file_required: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      grading_rubric: { type: DataTypes.JSONB, allowNull: true },
      points_total: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 100 },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });

    // At most one capstone per course. There's no create API (capstones are seed-only),
    // so this can never actually be violated through the app -- it's a data-integrity
    // guard, not something request handlers need to catch.
    await queryInterface.addIndex("capstones", ["course_id"], {
      unique: true,
      name: "capstones_course_unique",
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("capstones");
  },
};
