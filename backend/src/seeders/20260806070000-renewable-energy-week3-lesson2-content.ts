import { QueryInterface } from "sequelize";

const COURSE_SLUG = "renewable-energy-digital-systems";
const WEEK_NUMBER = 3;
const LESSON_TITLE = "Design Software, Safety, and Cost Analysis";

const PLACEHOLDER_CONTENT =
  "An overview of PVsyst and HOMER design software, essential electrical safety practices, and how to estimate system cost and calculate return on investment.";

// Same pattern as the other renewable-energy content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last lesson covered load calculation and component sizing — the technical core of every solar system design. This lesson closes out the design process: the professional software that helps verify these calculations, the electrical safety practices that make a design actually installable, and how to estimate cost and calculate return on investment.\n\n## System Design Software\n\nProfessional solar designers commonly rely on specialized software to properly perform these calculations reliably and accurately, going well beyond simple manual estimation alone.\n\n**PVsyst** is widely used specifically for detailed solar system simulation, allowing designers to model real, specific system configurations against actual historical local climate data and get genuinely reliable, detailed performance predictions before any real, physical installation work ever begins.\n\n**HOMER** specializes specifically in optimizing hybrid systems — those combining solar with other generation sources, or, importantly for this region, with existing diesel generator backup, which is a genuinely common and realistic setup in many parts of Nigeria. HOMER can help identify the most cost-effective overall combination of components for a given, specific set of real requirements.\n\nLearning to work confidently with tools like these is genuinely valuable, but I want to reinforce something important: understanding the fundamental underlying calculations from last lesson is what allows you to properly sanity-check whatever output any software actually produces, rather than blindly trusting a tool\'s results without any real, meaningful understanding of what\'s actually happening underneath.\n\n## Electrical Design and Safety\n\nSolar installations involve genuinely real electrical hazards, and proper safety design is absolutely non-negotiable, not merely an optional nice-to-have consideration.\n\nKey safety considerations include proper grounding to protect against dangerous electrical faults, appropriately rated circuit breakers and fuses to reliably protect against overcurrent conditions, and correct, careful component placement to reasonably minimize fire risk and to ensure genuinely safe, practical ongoing access for future maintenance work. Any real, professional system design should also comply with relevant, applicable local electrical codes and standards, precisely the kind of formal compliance requirement we\'ll return to in Module 6 when we cover installation planning in real, dedicated depth.\n\n## Cost Estimation and ROI Calculation\n\nFinally, every real system design needs an honest, complete cost estimate and a clear calculation of expected return on investment.\n\n**Cost estimation** should include every major component — panels, inverter, charge controller, batteries if genuinely included, wiring, mounting hardware — along with realistic installation labor costs and appropriate ongoing maintenance costs.\n\n**Return on investment, ROI**, compares this total system cost against the resulting savings on electricity costs over the system\'s realistic operational lifetime, or against the meaningful value of genuinely improved reliability in areas with poor, inconsistent centralized grid access. A simple, useful **payback period** calculation — total system cost divided by realistic estimated annual savings — gives customers a genuinely clear, easily understood sense of exactly how long a system will practically take to fully pay for itself.\n\nThis week\'s assignment asks you to produce a complete system design document including a full **Bill of Materials, or BOM** — an itemized list of every single component required, along with quantities and cost, exactly the kind of genuinely professional deliverable real solar installation businesses produce for every actual customer.\n\n## Bringing It Together\n\nToday we brought together professional design software, essential safety principles, and honest cost analysis, completing the full design process alongside last lesson\'s load calculation and component sizing. Together, these two lessons represent the technical core of solar system design work, connecting resource assessment from Module 2\'s start through to the installation planning we\'ll cover later in Module 6.\n\nFor your assignment, create a complete system design document with a full bill of materials for a specific customer scenario. For your practical exercise, design a genuinely complete solar system for either a residential or commercial customer, applying every technique covered across these past two lessons.\n\nNext week, we move into Module 3: Battery Storage and Energy Management, covering battery technology and smart energy management in real, dedicated depth.';

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
