import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("lessons", {
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
      content: { type: DataTypes.TEXT, allowNull: false, defaultValue: "" },
      video_url: { type: DataTypes.STRING, allowNull: true },
      resources: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
      order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      duration_minutes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });

    await queryInterface.addIndex("lessons", ["module_id", "order"]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("lessons");
  },
};
