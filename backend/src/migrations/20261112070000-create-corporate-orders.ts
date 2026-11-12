import { DataTypes, QueryInterface } from "sequelize";

// Corporate online orders (2026-11-12). A company buys learner places on the corporate
// pages: the price is worked out on the server, then either
//   - paid on Flutterwave (NGN, GHS, KES, ZAR, or GBP for buyers outside the four
//     countries); when Flutterwave confirms, the company, its seats and its staff join
//     link are created automatically (status pending -> paid), or
//   - sent to Paleon as an invoice request (200+ learners, or the buyer asked for one).
// One row per order; client_id is the company created when it was paid.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("corporate_orders", {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      tx_ref: { type: DataTypes.STRING, allowNull: false, unique: true },
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
      organisation: { type: DataTypes.STRING, allowNull: false },
      contact_name: { type: DataTypes.STRING, allowNull: false },
      contact_email: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: true },
      // NG, GH, KE, ZA, or INTL (outside the four countries, paid in GBP).
      region: { type: DataTypes.STRING(4), allowNull: false },
      buyer_country: { type: DataTypes.STRING, allowNull: true },
      programme: { type: DataTypes.STRING, allowNull: false },
      seats: { type: DataTypes.INTEGER, allowNull: false },
      currency: { type: DataTypes.STRING(3), allowNull: false },
      unit_price: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
      discount_percent: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      total: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
      client_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: "corporate_clients", key: "id" },
        onDelete: "SET NULL",
      },
      flutterwave_transaction_id: { type: DataTypes.STRING, allowNull: true },
      paid_at: { type: DataTypes.DATE, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("corporate_orders");
  },
};
