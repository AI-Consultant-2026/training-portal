import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("referrals", {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      // The ambassador. CASCADE matches enrollments/progress: if the account is deleted
      // the referral history goes with it (and deleteInactiveCandidates already skips
      // anyone with payment history, which every qualified referral's referee has).
      referrer_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      // The referred student. UNIQUE: a person can only be referred once, ever.
      referee_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      code: { type: DataTypes.STRING, allowNull: false },
      // "pending" | "qualified" | "void"
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
      qualified_at: { type: DataTypes.DATE, allowNull: true },
      qualifying_enrollment_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: "enrollments", key: "id" },
        onDelete: "SET NULL",
      },
      // "airtime" | "data" | "discount"
      referrer_reward_type: { type: DataTypes.STRING, allowNull: false, defaultValue: "airtime" },
      referrer_reward_amount_ngn: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
      // "pending" | "issued"
      referrer_reward_status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
      referrer_reward_issued_at: { type: DataTypes.DATE, allowNull: true },
      referee_reward_type: { type: DataTypes.STRING, allowNull: false, defaultValue: "airtime" },
      referee_reward_amount_ngn: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
      referee_reward_status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
      referee_reward_issued_at: { type: DataTypes.DATE, allowNull: true },
      notes: { type: DataTypes.TEXT, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });

    await queryInterface.addIndex("referrals", ["referrer_id"]);
    await queryInterface.addIndex("referrals", ["status"]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("referrals");
  },
};
