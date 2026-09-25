import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Optional proof-of-payment a student uploads with a bank transfer (2026-09-25), so
    // the admin can match it against the bank statement faster.
    await queryInterface.addColumn("payments", "receipt_path", { type: DataTypes.STRING, allowNull: true });
    await queryInterface.addColumn("payments", "receipt_name", { type: DataTypes.STRING, allowNull: true });
    await queryInterface.addColumn("payments", "receipt_mime_type", { type: DataTypes.STRING, allowNull: true });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("payments", "receipt_mime_type");
    await queryInterface.removeColumn("payments", "receipt_name");
    await queryInterface.removeColumn("payments", "receipt_path");
  },
};
