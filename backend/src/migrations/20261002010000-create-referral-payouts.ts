import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Airtime/data top-ups sent through VTpass for referral rewards (2026-10-02). One row per
    // attempt, so a failed send and its retry are both kept. The partial unique index below
    // is the double-pay guard: at most one processing-or-delivered payout per reward.
    await queryInterface.createTable("referral_payouts", {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      referral_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "referrals", key: "id" },
        onDelete: "CASCADE",
      },
      party: { type: DataTypes.STRING, allowNull: false },
      kind: { type: DataTypes.STRING, allowNull: false },
      network: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      amount_ngn: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
      variation_code: { type: DataTypes.STRING, allowNull: true },
      variation_name: { type: DataTypes.STRING, allowNull: true },
      request_id: { type: DataTypes.STRING, allowNull: false, unique: true },
      status: { type: DataTypes.STRING, allowNull: false },
      provider_code: { type: DataTypes.STRING, allowNull: true },
      provider_message: { type: DataTypes.TEXT, allowNull: true },
      provider_transaction_id: { type: DataTypes.STRING, allowNull: true },
      provider_response: { type: DataTypes.JSONB, allowNull: true },
      live: { type: DataTypes.BOOLEAN, allowNull: false },
      sent_by_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: "users", key: "id" },
        onDelete: "SET NULL",
      },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });
    await queryInterface.addIndex("referral_payouts", ["referral_id", "party"], {
      unique: true,
      name: "referral_payouts_one_active_per_reward",
      where: { status: ["processing", "delivered"] },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("referral_payouts");
  },
};
