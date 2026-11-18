import { QueryInterface, DataTypes } from "sequelize";
import { randomUUID } from "crypto";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Discount codes (2026-11-18): a percentage off the course price when a candidate pays
    // in full (never the deposit or balance). Managed by admins at /admin/discount-codes.
    await queryInterface.createTable("discount_codes", {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      code: { type: DataTypes.STRING(40), allowNull: false, unique: true },
      percent_off: { type: DataTypes.INTEGER, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      expires_at: { type: DataTypes.DATE, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });

    // The code a checkout was opened with, so the confirmation can expect the discounted
    // amount rather than the full price.
    await queryInterface.addColumn("payments", "discount_code", { type: DataTypes.STRING(40), allowNull: true });

    // First code, live as soon as this deploys (seeders never run in prod).
    const now = new Date();
    await queryInterface.bulkInsert("discount_codes", [
      {
        id: randomUUID(),
        code: "FULLPAY15",
        percent_off: 15,
        description: "15% off when you pay for a course in full",
        active: true,
        expires_at: null,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("payments", "discount_code");
    await queryInterface.dropTable("discount_codes");
  },
};
