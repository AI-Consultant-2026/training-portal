import { QueryInterface } from "sequelize";

// Email verification (20260818215508) only ever gates self-service student enrollment
// (see enrollments.controller.ts) -- admin/instructor accounts are always provisioned
// directly (there's no self-registration path for those roles; today that means a
// migration like 20260809030000, not an in-app flow), never go through the verify-email
// flow, and would otherwise sit permanently unverified. Backfills existing non-student
// rows once. Any future way of provisioning an admin/instructor account should set
// email_verified_at directly rather than relying on another one-off migration like this.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE users
       SET email_verified_at = now()
       WHERE role != 'student' AND email_verified_at IS NULL`,
    );
  },

  down: async () => {
    // No-op: intentionally not un-verifying accounts on rollback -- there's no way to
    // tell which rows this migration touched apart from ones a real admin verified by
    // some other means in the meantime.
  },
};
