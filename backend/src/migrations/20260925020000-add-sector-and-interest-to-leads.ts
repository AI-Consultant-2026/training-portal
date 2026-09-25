import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Captured by the homepage's free Career Match form (2026-09-25), which replaced
    // the "50 free training places" offer: the industry the visitor is aiming for and
    // the kind of work they're drawn to. Optional, like the other lead extras.
    await queryInterface.addColumn("leads", "sector", { type: DataTypes.STRING, allowNull: true });
    await queryInterface.addColumn("leads", "interest", { type: DataTypes.STRING, allowNull: true });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("leads", "interest");
    await queryInterface.removeColumn("leads", "sector");
  },
};
