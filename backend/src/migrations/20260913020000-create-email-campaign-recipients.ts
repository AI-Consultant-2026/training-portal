import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("email_campaign_recipients", {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      campaign_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "email_campaigns", key: "id" },
        onDelete: "CASCADE",
      },
      row_number: { type: DataTypes.INTEGER, allowNull: false },
      company: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      contact_name: { type: DataTypes.STRING, allowNull: false },
      subject: { type: DataTypes.STRING, allowNull: false },
      // "pending" | "queued" | "sending" | "sent" | "failed" | "skipped" | "invalid" | "duplicate"
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
      is_selected: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      validation_errors: { type: DataTypes.JSONB, allowNull: false, defaultValue: [] },
      error_message: { type: DataTypes.TEXT, allowNull: true },
      sent_at: { type: DataTypes.DATE, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });
    await queryInterface.addIndex("email_campaign_recipients", ["campaign_id"]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("email_campaign_recipients");
  },
};
