import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("assignments", {
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
      file_required: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      grading_rubric: { type: DataTypes.JSONB, allowNull: true },
      points_total: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 100 },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("assignments");
  },
};
