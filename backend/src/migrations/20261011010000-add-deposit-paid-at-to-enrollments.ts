import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Instalment payments (2026-10-11): set when a student pays the deposit that unlocks
    // the first two days of a course. payment_confirmed still means "paid in full".
    await queryInterface.addColumn("enrollments", "deposit_paid_at", {
      type: DataTypes.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("enrollments", "deposit_paid_at");
  },
};
