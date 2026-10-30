import { QueryInterface, DataTypes } from "sequelize";

// Consent tick-box on the Ghana, Kenya and South Africa Career Match forms (2026-10-30):
// when the lead agreed to be emailed. Existing (Nigerian) leads stay null.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn("leads", "marketing_consent_at", { type: DataTypes.DATE, allowNull: true });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("leads", "marketing_consent_at");
  },
};
