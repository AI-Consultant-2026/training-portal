import { DataTypes, QueryInterface } from "sequelize";

// University seats (2026-11-15). Universities buy places on the graduate courses for their
// students, reusing the corporate seat system (corporate_clients / seats / members):
//   - corporate_clients.client_type: "company" (staff training) or "university".
//   - corporate_clients.representative_emails: the university's representatives. Anyone
//     on this list who signs up with the university's link gets the manager login.
//   - corporate_clients.discount_percent: a group discount Paleon agreed with this
//     university; null = the standard group discount tiers.
//   - corporate_orders.order_type + items: a university order covers one or more courses,
//     each with its own number of places and discount.
//   - app_settings: small settings Paleon edits in /admin. The first is
//     "university_group_discounts", the group discount tiers (10% at 10-49 learners,
//     20% at 50-199, 30% at 200+ on each course).
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn("corporate_clients", "client_type", {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "company",
    });
    await queryInterface.addColumn("corporate_clients", "representative_emails", {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    });
    await queryInterface.addColumn("corporate_clients", "discount_percent", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("corporate_orders", "order_type", {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "company",
    });
    await queryInterface.addColumn("corporate_orders", "items", {
      type: DataTypes.JSONB,
      allowNull: true,
    });
    await queryInterface.createTable("app_settings", {
      key: { type: DataTypes.STRING(100), primaryKey: true, allowNull: false },
      value: { type: DataTypes.JSONB, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });
    const now = new Date();
    await queryInterface.bulkInsert("app_settings", [
      {
        key: "university_group_discounts",
        value: JSON.stringify([
          { minLearners: 10, percent: 10 },
          { minLearners: 50, percent: 20 },
          { minLearners: 200, percent: 30 },
        ]),
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("app_settings");
    await queryInterface.removeColumn("corporate_orders", "items");
    await queryInterface.removeColumn("corporate_orders", "order_type");
    await queryInterface.removeColumn("corporate_clients", "discount_percent");
    await queryInterface.removeColumn("corporate_clients", "representative_emails");
    await queryInterface.removeColumn("corporate_clients", "client_type");
  },
};
