import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("payments", {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      enrollment_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "enrollments", key: "id" },
      },
      student_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      method: { type: DataTypes.ENUM("card", "bank_transfer"), allowNull: false },
      status: {
        type: DataTypes.ENUM("pending", "succeeded", "failed"),
        allowNull: false,
        defaultValue: "pending",
      },
      currency: { type: DataTypes.STRING(3), allowNull: false },
      amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
      // The course's authoritative NGN price at the time of this payment, independent of
      // which currency was actually charged -- kept so a payment record is still legible
      // once FX rates or course pricing change later.
      base_amount_ngn: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
      billing_country: { type: DataTypes.STRING, allowNull: false },
      // Card payments only -- never the full card number/CVV, see paymentGateway.service.ts.
      card_brand: { type: DataTypes.STRING, allowNull: true },
      card_last4: { type: DataTypes.STRING(4), allowNull: true },
      // Card: the placeholder gateway's mock reference. Bank transfer: the reference the
      // student says they used, for the admin to look up when reconciling their bank account.
      gateway_reference: { type: DataTypes.STRING, allowNull: true },
      notes: { type: DataTypes.TEXT, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });

    await queryInterface.addIndex("payments", ["enrollment_id"]);
    await queryInterface.addIndex("payments", ["student_id"]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("payments");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_payments_method"');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_payments_status"');
  },
};
