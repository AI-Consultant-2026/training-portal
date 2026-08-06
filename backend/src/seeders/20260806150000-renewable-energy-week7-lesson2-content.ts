import { QueryInterface } from "sequelize";

const COURSE_SLUG = "renewable-energy-digital-systems";
const WEEK_NUMBER = 7;
const LESSON_TITLE = "Budgeting, Quality Assurance, and Commissioning";

const PLACEHOLDER_CONTENT =
  "Building a realistic project budget and schedule, testing a finished installation for quality assurance, and properly commissioning and handing over a system to the customer.";

// Same pattern as the other renewable-energy content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last lesson covered everything that has to happen before and during the physical work of installation: site assessment, sequencing, safety, codes, and permitting. This lesson closes out Module 6 with what makes a project financially sound and genuinely complete: realistic budgeting, quality assurance testing, and the commissioning and handover process.\n\n## Project Budgeting and Scheduling\n\nBuilding directly on the cost estimation work from week three, complete project budgeting must also account for genuine installation labor, required permits, and any real contingency for unexpected site conditions genuinely discovered during the assessment we discussed last lesson. Realistic scheduling properly accounts for every stage we\'ve covered, along with reasonable, sensible buffer time for the kind of unexpected delays that are, frankly, common in real, physical construction and installation work.\n\n## Quality Assurance and Testing\n\nBefore considering any installation genuinely complete, thorough testing must confirm the system is safe and performing correctly. This includes verifying every electrical connection is properly, correctly secure, confirming actual measured output roughly matches the original design expectations from Module 2, and testing that the monitoring systems we covered in Module 4 are correctly and reliably reporting accurate data.\n\n## Commissioning and Handover Procedures\n\n**Commissioning** is the formal process of verifying a completed system is genuinely ready for full, ongoing operation. This includes comprehensive final testing, properly configuring the monitoring and alert systems from Module 4 and Module 5, and thoroughly documenting the final, as-built system configuration, which may differ somewhat from the original design if genuine site conditions required specific adjustments during actual installation.\n\n**Handover** transfers the fully completed, tested system to the customer, and should genuinely include clear operational training — how to properly read the monitoring dashboard we covered in Module 4, basic troubleshooting steps a non-technical customer can safely and confidently perform themselves, and clear contact information for any further professional support genuinely needed. A well-executed handover process meaningfully sets the tone for the entire ongoing customer relationship, and it\'s exactly the kind of professional deliverable that distinguishes a genuinely trustworthy installer from a purely transactional one.\n\n## Bringing It Together\n\nToday we covered honest project budgeting and scheduling, thorough quality assurance, and professional commissioning and handover. Combined with last lesson\'s site assessment, sequencing, and safety compliance, this connects every single technical topic from the previous five weeks into one genuinely complete, real-world project delivery process.\n\nFor your assignment, create a complete safety and compliance checklist for installations. For your practical exercise, develop a full installation plan for a genuinely complex solar project, applying everything covered across these two lessons.\n\nNext week, in our final lecture, we cover advanced integrated systems and business models, and we\'ll spend real, dedicated time preparing your capstone project.';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const [rows] = await queryInterface.sequelize.query(
      `SELECT l.id AS lesson_id
       FROM lessons l
       JOIN modules m ON m.id = l.module_id
       JOIN courses c ON c.id = m.course_id
       WHERE c.slug = ? AND m.week_number = ? AND l.title = ?`,
      { replacements: [COURSE_SLUG, WEEK_NUMBER, LESSON_TITLE] },
    );
    const row = (rows as { lesson_id: string }[])[0];
    if (!row) {
      throw new Error(`Could not find lesson "${LESSON_TITLE}" (week ${WEEK_NUMBER}) for ${COURSE_SLUG}`);
    }

    await queryInterface.sequelize.query(`UPDATE lessons SET content = ? WHERE id = ?`, {
      replacements: [FULL_CONTENT, row.lesson_id],
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE lessons l
       SET content = ?
       FROM modules m, courses c
       WHERE l.module_id = m.id AND m.course_id = c.id
         AND c.slug = ? AND m.week_number = ? AND l.title = ?`,
      { replacements: [PLACEHOLDER_CONTENT, COURSE_SLUG, WEEK_NUMBER, LESSON_TITLE] },
    );
  },
};
