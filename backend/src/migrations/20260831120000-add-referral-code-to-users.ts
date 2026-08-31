import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Every user's own ambassador code. Nullable: existing rows have none, and it's
    // generated lazily the first time a user opens the Refer & earn page (new signups
    // get one at registration). Unique so a code resolves to exactly one ambassador.
    await queryInterface.addColumn("users", "referral_code", {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("users", "referral_code");
  },
};
