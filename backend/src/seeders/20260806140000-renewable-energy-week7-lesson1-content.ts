import { QueryInterface } from "sequelize";

const COURSE_SLUG = "renewable-energy-digital-systems";
const WEEK_NUMBER = 7;
const LESSON_TITLE = "Site Assessment, Sequencing, and Installation Safety";

const PLACEHOLDER_CONTENT =
  "Assessing a site before installation, following a proper installation sequence, and applying safety standards, electrical codes, and permitting requirements.";

// Same pattern as the other renewable-energy content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Welcome to Module 6. We\'ve now covered generation design, battery storage, digital monitoring, and troubleshooting. This week, we cover the genuinely real, practical work of actually installing a system — the planning, safety, and regulatory considerations that turn a completed design into a real, safely operating physical installation.\n\n## Installation Site Assessment\n\nBefore any real installation work begins, a thorough site assessment is genuinely essential. This includes verifying the specific site\'s actual solar resource matches the assumptions used back in the original design, referring directly back to Module 2; assessing physical mounting surface conditions — roof structural integrity for rooftop installations, or genuine ground conditions for ground-mounted systems; identifying potential shading sources not already accounted for in the original design, like nearby trees or neighboring buildings; and confirming safe, practical, reasonable access for both installation equipment and future maintenance work.\n\nA site assessment conducted carefully and thoroughly before installation begins genuinely prevents costly surprises discovered midway through an active project — precisely the kind of professional discipline that separates experienced installers from less experienced ones.\n\n## Installation Sequencing and Timelines\n\nA complex solar installation generally follows a logical, genuinely necessary sequence: mounting structure installation first, followed by panel installation, then electrical wiring and connections, inverter and battery installation, and finally, system testing and commissioning, which we\'ll cover in more depth next lesson.\n\nRealistic timeline planning accounts for genuinely reasonable time at each individual stage, appropriate weather contingency, since electrical installation work generally cannot safely proceed during genuinely poor weather conditions, and necessary coordination with any other trades genuinely involved in a larger project, such as electricians handling other, separate aspects of a building\'s overall electrical system.\n\n## Safety Standards and Regulations in Nigeria\n\nSolar installation involves genuinely serious safety considerations: working at height for rooftop installations, handling potentially hazardous electrical connections, and safely managing genuinely heavy equipment. Nigerian workplace safety regulations, along with specific electrical safety standards, govern much of this work, and full compliance is a genuine professional obligation, not merely an optional best practice.\n\nKey safety practices include proper fall protection for any work at height, correctly de-energizing and clearly labeling all electrical circuits before beginning any actual work on them, and appropriate personal protective equipment for every member of the installation team throughout every stage of the project.\n\n## Electrical Codes and Compliance\n\nBeyond general workplace safety, specific electrical codes govern exactly how solar systems must be properly installed — appropriate wiring methods and standards, correct circuit protection appropriately sized to the system, referring back to the component sizing principles we covered in week three, and proper, correct grounding.\n\nCompliance with these established codes isn\'t merely a bureaucratic formality — it genuinely ensures the resulting installation is safe for both the immediate installation team and for the customer over the system\'s entire, complete operational lifetime. This directly connects to the auditing and compliance concepts covered in the Cyber Security Fundamentals course: formal, external verification meaningfully confirms that stated standards are actually being met in practice, not merely assumed.\n\n## Permitting and Grid Connection Requirements\n\nDepending on system type and scale, formal permits may genuinely be required from local authorities before installation can legally proceed. For grid-tied and hybrid systems specifically, connecting to the existing centralized grid typically requires formal approval from the relevant utility provider, along with meeting specific defined technical requirements to ensure the new system genuinely doesn\'t create problems for the broader shared electrical grid.\n\nUnderstanding and properly navigating these specific requirements is a genuinely real, practical part of project planning, and skipping or rushing this step can create serious, sometimes very costly, delays later in an active project.\n\n## Bringing It Together\n\nThis lesson covered everything that has to happen before, and during, the physical work of installation: assessing the site honestly, sequencing the work correctly, and meeting the safety, electrical code, and permitting requirements that make an installation both legal and genuinely safe.\n\nNext lesson turns to what makes a project financially sound and truly complete: realistic budgeting, quality assurance testing, and the commissioning and handover process that finally puts a system in the customer\'s hands.';

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
