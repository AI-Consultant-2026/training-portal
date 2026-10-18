import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Email client, 2026-10-18: a campaign can carry file attachments (e.g. a signed partnership
    // letter) and CC addresses that are copied on every email in it. Files are kept in the
    // database rather than on disk because Render's disk is wiped on every deploy.
    await queryInterface.addColumn("email_campaigns", "cc_emails", {
      type: DataTypes.TEXT,
      allowNull: true,
    });

    await queryInterface.createTable("email_campaign_attachments", {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      campaign_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "email_campaigns", key: "id" },
        onDelete: "CASCADE",
      },
      filename: { type: DataTypes.STRING, allowNull: false },
      content_type: { type: DataTypes.STRING, allowNull: false },
      size_bytes: { type: DataTypes.INTEGER, allowNull: false },
      data: { type: DataTypes.BLOB, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });
    await queryInterface.addIndex("email_campaign_attachments", ["campaign_id"]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("email_campaign_attachments");
    await queryInterface.removeColumn("email_campaigns", "cc_emails");
  },
};
