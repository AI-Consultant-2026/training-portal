import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Refunds (2026-10-12): set when an admin records a cooling-off refund. Recording one
    // also locks the course (payment_confirmed false, deposit_paid_at null).
    await queryInterface.addColumn("enrollments", "refunded_at", {
      type: DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("enrollments", "refund_note", {
      type: DataTypes.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("enrollments", "refund_note");
    await queryInterface.removeColumn("enrollments", "refunded_at");
  },
};
