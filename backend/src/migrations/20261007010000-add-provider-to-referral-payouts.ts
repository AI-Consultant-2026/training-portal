import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Referral payouts can now go through VTU.ng as well as VTpass (2026-10-07). Every row
    // before this was a VTpass send, so the default marks them that way and a payout still
    // processing is requeried with VTpass, not VTU.ng.
    await queryInterface.addColumn("referral_payouts", "provider", {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "vtpass",
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("referral_payouts", "provider");
  },
};
