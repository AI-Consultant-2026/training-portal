import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Per-lead follow-up emails (days 2, 5 and 10 after the lead arrives), which
    // replaced the countdown to a shared intake deadline (2026-09-25). The old
    // reminder_*_sent_at / recycle_email_sent_at columns are left in place, unused,
    // as a record of what was sent under the old sequence.
    await queryInterface.addColumn("leads", "follow_up_1_sent_at", { type: DataTypes.DATE, allowNull: true });
    await queryInterface.addColumn("leads", "follow_up_2_sent_at", { type: DataTypes.DATE, allowNull: true });
    await queryInterface.addColumn("leads", "follow_up_3_sent_at", { type: DataTypes.DATE, allowNull: true });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("leads", "follow_up_3_sent_at");
    await queryInterface.removeColumn("leads", "follow_up_2_sent_at");
    await queryInterface.removeColumn("leads", "follow_up_1_sent_at");
  },
};
