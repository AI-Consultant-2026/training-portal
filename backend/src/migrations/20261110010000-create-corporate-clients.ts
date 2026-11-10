import { randomUUID } from "crypto";
import { DataTypes, QueryInterface } from "sequelize";

// Corporate staff portal (2026-11-10). A corporate client (a company that bought one or
// more of the three corporate programmes) gets:
//   - corporate_clients: the company, with a secret join code for its staff sign-up link
//     (/company/join/<code>) and an optional work-email domain staff must sign up with.
//   - corporate_seats: how many staff seats it paid for on each course.
//   - corporate_members: which users belong to the company; is_manager users (e.g. the
//     HR or L&D lead) can see seats and staff progress at /company and invite staff.
// enrollments.corporate_client_id marks a seat in use: those enrollments are created
// paid (payment_confirmed) because the company paid Paleon directly.
//
// The three corporate courses are added as published but corporate-only courses
// (metadata.corporate = true): hidden from the public catalogue, no self-enrolment and
// no public preview. Their lessons are loaded separately. Seeders never run in
// production, so they are created here. Re-running is a no-op for an existing slug.
const CORPORATE_COURSES = [
  {
    slug: "cybersecure-workforce-essentials",
    title: "CyberSecure Workforce Essentials",
    description:
      "Practical cybersecurity awareness for every employee: spotting phishing and social engineering, passwords and multi-factor authentication, safe devices and remote working, handling data, reporting incidents, and the Stop, Check, Report habit.",
    modules: 13,
    level: "beginner",
  },
  {
    slug: "ai-workflow-productivity",
    title: "AI Workflow Productivity & Process Transformation",
    description:
      "How teams use AI tools safely to save time and improve everyday work: writing good prompts, checking AI output, protecting company data, finding processes worth improving and leading a workplace AI improvement project, using the Protect, Prompt, Check habit.",
    modules: 10,
    level: "beginner",
  },
  {
    slug: "ai-cybersecurity-professional-accelerator",
    title: "AI + Cybersecurity Professional Accelerator",
    description:
      "For managers, IT and security staff: securing AI use across the organisation, AI-assisted defensive security work, risk and governance, verifying AI output, and a capstone project with facilitator feedback, using the Secure, Prompt, Verify habit.",
    modules: 12,
    level: "intermediate",
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("corporate_clients", {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING(2), allowNull: false, defaultValue: "NG" },
      contact_name: { type: DataTypes.STRING, allowNull: true },
      contact_email: { type: DataTypes.STRING, allowNull: true },
      join_code: { type: DataTypes.STRING, allowNull: false, unique: true },
      email_domain: { type: DataTypes.STRING, allowNull: true },
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: "active" },
      notes: { type: DataTypes.TEXT, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });

    await queryInterface.createTable("corporate_seats", {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      client_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "corporate_clients", key: "id" },
        onDelete: "CASCADE",
      },
      course_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "courses", key: "id" },
        onDelete: "CASCADE",
      },
      seats: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      expires_at: { type: DataTypes.DATE, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });
    await queryInterface.addIndex("corporate_seats", ["client_id", "course_id"], { unique: true });

    await queryInterface.createTable("corporate_members", {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      client_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "corporate_clients", key: "id" },
        onDelete: "CASCADE",
      },
      // One company per user.
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      is_manager: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      job_title: { type: DataTypes.STRING, allowNull: true },
      department: { type: DataTypes.STRING, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });

    await queryInterface.addColumn("enrollments", "corporate_client_id", {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "corporate_clients", key: "id" },
      onDelete: "SET NULL",
    });

    const now = new Date();
    for (const course of CORPORATE_COURSES) {
      const [rows] = await queryInterface.sequelize.query(`SELECT id FROM courses WHERE slug = ?`, {
        replacements: [course.slug],
      });
      if ((rows as unknown[]).length > 0) continue;
      await queryInterface.bulkInsert("courses", [
        {
          id: randomUUID(),
          title: course.title,
          slug: course.slug,
          description: course.description,
          instructor_id: null,
          // Shown as the module count for corporate courses (see CourseCard).
          duration_weeks: course.modules,
          level: course.level,
          status: "published",
          metadata: JSON.stringify({ corporate: true }),
          created_at: now,
          updated_at: now,
        },
      ]);
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("enrollments", "corporate_client_id");
    await queryInterface.dropTable("corporate_members");
    await queryInterface.dropTable("corporate_seats");
    await queryInterface.dropTable("corporate_clients");
    // The three courses are left in place: they may hold lessons and learner progress.
  },
};
