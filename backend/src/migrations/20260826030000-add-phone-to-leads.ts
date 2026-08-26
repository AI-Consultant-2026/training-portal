import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Optional, same reasoning as university/source: only the /welcome form itself
    // enforces anything. Exists so admins can follow up by WhatsApp/call, not just
    // email -- the higher-converting channel for this audience.
    await queryInterface.addColumn("leads", "phone", {
      type: DataTypes.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("leads", "phone");
  },
};
