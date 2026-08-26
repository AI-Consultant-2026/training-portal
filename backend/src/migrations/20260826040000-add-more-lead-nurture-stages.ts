import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Two more countdown touchpoints (see 20260826020000 for the original 21d/7d/1d):
    // 14d fills the gap for leads who sign up more than 21 days out and would
    // otherwise go quiet until the 7-day mark, and 0d fires the morning of the
    // deadline itself -- typically the highest-converting touch in any deadline
    // sequence, and the original sequence never actually sent on the day itself.
    await queryInterface.addColumn("leads", "reminder_14d_sent_at", {
      type: DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("leads", "reminder_0d_sent_at", {
      type: DataTypes.DATE,
      allowNull: true,
    });
    // Marks whether a lead who never converted by the deadline has been invited to
    // the *next* cohort (see config.enrolment.followingDeadline) -- without this,
    // every lead who doesn't register in time is simply lost.
    await queryInterface.addColumn("leads", "recycle_email_sent_at", {
      type: DataTypes.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("leads", "reminder_14d_sent_at");
    await queryInterface.removeColumn("leads", "reminder_0d_sent_at");
    await queryInterface.removeColumn("leads", "recycle_email_sent_at");
  },
};
