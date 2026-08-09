import { QueryInterface } from "sequelize";

// The previous migration (20260809030000) inserted a dedicated admin account only if
// admin@trainingportal.local didn't already exist -- it turned out a row with that email
// already existed in production (predating this feature, password unknown), so the insert
// was silently skipped there. This migration resets that row's password to a known value
// instead, and makes sure it's actually an active admin regardless of how it got there.
// Plaintext was shared with the project owner directly and is not stored in the repo.
const ADMIN_PASSWORD_HASH = "$2a$10$zCM61/wkA4pPShszJhUtWuNgxoXh7oXNn6wgqhK4WrYHPhnrgs5XO";
const ADMIN_EMAIL = "admin@trainingportal.local";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE users
       SET password_hash = :passwordHash, role = 'admin', status = 'active', updated_at = now()
       WHERE email = :email`,
      { replacements: { passwordHash: ADMIN_PASSWORD_HASH, email: ADMIN_EMAIL } },
    );
  },

  down: async () => {
    // No-op: the prior password (whatever it was before this migration) isn't recoverable.
  },
};
