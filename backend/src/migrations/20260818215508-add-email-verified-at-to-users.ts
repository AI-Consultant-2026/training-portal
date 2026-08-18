import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Nullable, no default: null means unverified. Existing rows stay null rather than
    // being backfilled as verified -- they predate this feature and were never actually
    // confirmed to belong to the person who registered them.
    await queryInterface.addColumn("users", "email_verified_at", {
      type: DataTypes.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("users", "email_verified_at");
  },
};
