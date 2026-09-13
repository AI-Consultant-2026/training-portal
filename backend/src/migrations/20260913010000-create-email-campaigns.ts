import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("email_campaigns", {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      // "hello@paleontraining.com" | "corporate@paleontraining.com" -- app-level (zod)
      // enum, same reasoning as partners.category: this is a short fixed list enforced
      // in code, a string column avoids an ALTER TYPE migration if a third address is
      // ever approved.
      from_email: { type: DataTypes.STRING, allowNull: true },
      body_template: { type: DataTypes.TEXT, allowNull: true },
      // "draft" | "sending" | "completed"
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: "draft" },
      original_filename: { type: DataTypes.STRING, allowNull: false },
      total_recipients: { type: DataTypes.INTEGER, allowNull: false },
      valid_recipients: { type: DataTypes.INTEGER, allowNull: false },
      invalid_recipients: { type: DataTypes.INTEGER, allowNull: false },
      duplicate_recipients: { type: DataTypes.INTEGER, allowNull: false },
      sent_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      failed_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("email_campaigns");
  },
};
