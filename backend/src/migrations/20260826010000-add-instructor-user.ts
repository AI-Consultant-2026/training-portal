import { randomUUID } from "crypto";
import { QueryInterface } from "sequelize";

// Bcrypt hash of a generated password, created once for this migration.
// Plaintext was shared with the project owner directly and is not stored in the repo.
const INSTRUCTOR_PASSWORD_HASH = "$2a$10$BoGqovruhO4tEXZVMRoQ7OYSwidW/XW9bqgpjfG2KSjDJ6O2hL9Qq";
const INSTRUCTOR_EMAIL = "instructor@trainingportal.local";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Insert-if-missing alone isn't enough to guarantee a known working credential -- a
    // row with this email could already exist from an untracked source (this bit the
    // admin account: see 20260809030000 + the follow-up 20260809040000 reset). Probe
    // first and UPDATE unconditionally if it's already there, instead of assuming.
    const [existing] = (await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE email = :email",
      { replacements: { email: INSTRUCTOR_EMAIL } },
    )) as [Array<{ id: string }>, unknown];

    if (existing.length === 0) {
      await queryInterface.bulkInsert("users", [
        {
          id: randomUUID(),
          email: INSTRUCTOR_EMAIL,
          password_hash: INSTRUCTOR_PASSWORD_HASH,
          first_name: "Portal",
          last_name: "Instructor",
          role: "instructor",
          status: "active",
          profile_data: JSON.stringify({}),
          location: "Nigeria",
          // Instructor/admin accounts are always provisioned directly, never through the
          // self-service verify-email flow -- set this now or it sits permanently
          // unverified (see 20260819070000's backfill + its comment on future provisioning).
          email_verified_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    } else {
      await queryInterface.sequelize.query(
        `UPDATE users
         SET password_hash = :hash, role = 'instructor', status = 'active',
             email_verified_at = COALESCE(email_verified_at, now()), updated_at = now()
         WHERE email = :email`,
        { replacements: { hash: INSTRUCTOR_PASSWORD_HASH, email: INSTRUCTOR_EMAIL } },
      );
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("users", { email: INSTRUCTOR_EMAIL });
  },
};
