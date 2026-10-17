import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Commission sales reps (2026-10-17), managed at /admin/sales-reps. A rep is not a user
    // account: they get a REP code that students enter at registration, like an ambassador
    // code, but it earns commission (salesRep.service.ts) instead of a referral reward.
    await queryInterface.createTable("sales_reps", {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: true },
      code: { type: DataTypes.STRING, allowNull: false, unique: true },
      started_at: { type: DataTypes.DATEONLY, allowNull: false },
      // Set when the agreement ends: the code stops working, and sales still qualify for 30 days.
      ended_at: { type: DataTypes.DATEONLY, allowNull: true },
      notes: { type: DataTypes.TEXT, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });

    // Which rep brought in a student: one row per student, written at registration.
    await queryInterface.createTable("sales_rep_students", {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      sales_rep_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "sales_reps", key: "id" },
        onDelete: "CASCADE",
      },
      student_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      code: { type: DataTypes.STRING, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });

    // Money paid to a rep, recorded by an admin after paying by bank transfer.
    // kind: commission (commission + bonuses; reduces the balance owed), allowance, other.
    await queryInterface.createTable("sales_rep_payments", {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      sales_rep_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "sales_reps", key: "id" },
        onDelete: "CASCADE",
      },
      kind: { type: DataTypes.STRING, allowNull: false },
      amount_ngn: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
      paid_on: { type: DataTypes.DATEONLY, allowNull: false },
      note: { type: DataTypes.TEXT, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("sales_rep_payments");
    await queryInterface.dropTable("sales_rep_students");
    await queryInterface.dropTable("sales_reps");
  },
};
