import { randomUUID } from "crypto";
import { QueryInterface } from "sequelize";

// A test company and learner login (2026-11-12) so Paleon can see the corporate courses
// the way a company's staff member does: lessons unlocking in order, module assessments,
// the 3-attempt / 24-hour rules on the finals, and the /company manager page.
//
// - Company "Paleon Test Company (internal)" with 5 seats on each corporate course.
// - Learner test.learner@paleon-test.example, enrolled (payment confirmed, 1 seat each)
//   on all three corporate courses, and ticked as a manager so /company works too.
//
// The password's plaintext was shared with the project owner in chat and is not stored
// in the repo, only this bcrypt hash. The .example domain can't receive email, and the
// account is marked as corporate staff, so learner email agents leave it out.
// Re-running is safe: existing rows are reused, and the password is reset.

const COMPANY_NAME = "Paleon Test Company (internal)";
const JOIN_CODE = "8btdfx9jfy";
const EMAIL = "test.learner@paleon-test.example";
const PASSWORD_HASH = "$2a$10$KsMHR5thV0zuWtXcmfVVi.Pr9cInNGEvQCft5SgRNUl3edqxdYSp6";
const COURSE_SLUGS = [
  "cybersecure-workforce-essentials",
  "ai-workflow-productivity",
  "ai-cybersecurity-professional-accelerator",
];
const SEATS_PER_COURSE = 5;

type Rows<T> = [T[], unknown];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const q = queryInterface.sequelize;
    const now = new Date();

    await q.transaction(async (transaction) => {
      // Company
      let [companies] = (await q.query("SELECT id FROM corporate_clients WHERE join_code = :code", {
        replacements: { code: JOIN_CODE },
        transaction,
      })) as Rows<{ id: string }>;
      let clientId = companies[0]?.id;
      if (!clientId) {
        clientId = randomUUID();
        await queryInterface.bulkInsert(
          "corporate_clients",
          [
            {
              id: clientId,
              name: COMPANY_NAME,
              country: "NG",
              contact_name: "Paleon Training",
              contact_email: null,
              join_code: JOIN_CODE,
              email_domain: null,
              status: "active",
              notes: "Internal test company for checking the corporate courses. Not a customer.",
              created_at: now,
              updated_at: now,
            },
          ],
          { transaction },
        );
      }

      // Learner
      const [users] = (await q.query("SELECT id FROM users WHERE email = :email", {
        replacements: { email: EMAIL },
        transaction,
      })) as Rows<{ id: string }>;
      let userId = users[0]?.id;
      if (!userId) {
        userId = randomUUID();
        await queryInterface.bulkInsert(
          "users",
          [
            {
              id: userId,
              email: EMAIL,
              password_hash: PASSWORD_HASH,
              first_name: "Test",
              last_name: "Learner",
              role: "student",
              status: "active",
              profile_data: JSON.stringify({ corporateClient: COMPANY_NAME }),
              location: "Nigeria",
              country: "NG",
              email_verified_at: now,
              created_at: now,
              updated_at: now,
            },
          ],
          { transaction },
        );
      } else {
        await q.query(
          `UPDATE users
           SET password_hash = :hash, role = 'student', status = 'active',
               email_verified_at = COALESCE(email_verified_at, now()), updated_at = now()
           WHERE id = :id`,
          { replacements: { hash: PASSWORD_HASH, id: userId }, transaction },
        );
      }

      // Membership (manager, so /company shows the manager view)
      const [members] = (await q.query("SELECT id FROM corporate_members WHERE user_id = :userId", {
        replacements: { userId },
        transaction,
      })) as Rows<{ id: string }>;
      if (members.length === 0) {
        await queryInterface.bulkInsert(
          "corporate_members",
          [
            {
              id: randomUUID(),
              client_id: clientId,
              user_id: userId,
              is_manager: true,
              job_title: "Test learner",
              department: "Paleon Training",
              created_at: now,
              updated_at: now,
            },
          ],
          { transaction },
        );
      }

      // Seats and enrollments
      const [courses] = (await q.query("SELECT id, slug FROM courses WHERE slug IN (:slugs)", {
        replacements: { slugs: COURSE_SLUGS },
        transaction,
      })) as Rows<{ id: string; slug: string }>;
      for (const course of courses) {
        const [seats] = (await q.query(
          "SELECT id FROM corporate_seats WHERE client_id = :clientId AND course_id = :courseId",
          { replacements: { clientId, courseId: course.id }, transaction },
        )) as Rows<{ id: string }>;
        if (seats.length === 0) {
          await queryInterface.bulkInsert(
            "corporate_seats",
            [
              {
                id: randomUUID(),
                client_id: clientId,
                course_id: course.id,
                seats: SEATS_PER_COURSE,
                expires_at: null,
                created_at: now,
                updated_at: now,
              },
            ],
            { transaction },
          );
        }

        const [enrollments] = (await q.query(
          "SELECT id FROM enrollments WHERE student_id = :userId AND course_id = :courseId",
          { replacements: { userId, courseId: course.id }, transaction },
        )) as Rows<{ id: string }>;
        if (enrollments.length === 0) {
          await queryInterface.bulkInsert(
            "enrollments",
            [
              {
                id: randomUUID(),
                course_id: course.id,
                student_id: userId,
                enrolled_date: now,
                status: "active",
                progress_percent: 0,
                payment_confirmed: true,
                payment_confirmed_at: now,
                corporate_client_id: clientId,
              },
            ],
            { transaction },
          );
        }
      }
    });
  },

  down: async (queryInterface: QueryInterface) => {
    const q = queryInterface.sequelize;
    await q.transaction(async (transaction) => {
      const replacements = { email: EMAIL, code: JOIN_CODE };
      const opts = { replacements, transaction };
      await q.query("DELETE FROM enrollments WHERE student_id IN (SELECT id FROM users WHERE email = :email)", opts);
      await q.query("DELETE FROM corporate_members WHERE user_id IN (SELECT id FROM users WHERE email = :email)", opts);
      await q.query("DELETE FROM users WHERE email = :email", opts);
      await q.query(
        "DELETE FROM corporate_seats WHERE client_id IN (SELECT id FROM corporate_clients WHERE join_code = :code)",
        opts,
      );
      await q.query("DELETE FROM corporate_clients WHERE join_code = :code", opts);
    });
  },
};
