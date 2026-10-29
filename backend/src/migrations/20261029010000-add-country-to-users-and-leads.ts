import { QueryInterface, DataTypes } from "sequelize";

// Ghana, Kenya and South Africa (2026-10-29): which country a student or lead is in, as
// an ISO code (see constants/countries.ts). Everyone before this was Nigerian, so the
// default backfills existing rows with "NG".
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    for (const table of ["users", "leads"]) {
      await queryInterface.addColumn(table, "country", {
        type: DataTypes.STRING(2),
        allowNull: false,
        defaultValue: "NG",
      });
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("users", "country");
    await queryInterface.removeColumn("leads", "country");
  },
};
