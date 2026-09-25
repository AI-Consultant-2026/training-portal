import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Set when a lead clicks "Unsubscribe" in a follow-up email (2026-09-25). Stops all
    // further lead emails to that address; the row is kept as the record of the opt-out.
    await queryInterface.addColumn("leads", "unsubscribed_at", { type: DataTypes.DATE, allowNull: true });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("leads", "unsubscribed_at");
  },
};
