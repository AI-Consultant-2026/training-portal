import { QueryInterface, DataTypes } from "sequelize";

// Country waitlists (2026-10-30): WhatsApp numbers left on a "launching soon" country's
// homepage, with that country's ISO code.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("waitlist_signups", {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      country: { type: DataTypes.STRING(2), allowNull: false },
      whatsapp: { type: DataTypes.STRING, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });
    await queryInterface.addIndex("waitlist_signups", ["country", "whatsapp"], { unique: true });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("waitlist_signups");
  },
};
