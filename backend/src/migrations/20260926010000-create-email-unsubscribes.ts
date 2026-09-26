import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Opt-outs from /admin/email-client campaigns (2026-09-26). One row per lowercased
    // address; campaigns never send to an address listed here (or to a lead who
    // unsubscribed from the lead follow-up emails -- see emailUnsubscribe.service.ts).
    await queryInterface.createTable("email_unsubscribes", {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      source: { type: DataTypes.STRING, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("email_unsubscribes");
  },
};
