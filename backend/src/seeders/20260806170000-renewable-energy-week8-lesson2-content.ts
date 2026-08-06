import { QueryInterface } from "sequelize";

const COURSE_SLUG = "renewable-energy-digital-systems";
const WEEK_NUMBER = 8;
const LESSON_TITLE = "Customer Engagement, Scaling, and Capstone Planning";

const PLACEHOLDER_CONTENT =
  "Educating customers honestly, the operational challenges of scaling a renewable energy business, emerging AI and blockchain applications, and how to scope the capstone project.";

// Same pattern as the other renewable-energy content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert. This completes the
// full 8-week / 16-lesson curriculum for this course.
const FULL_CONTENT =
  'Last lesson covered how solar integrates with other sources and the business models available for delivering renewable energy services. This final lesson turns to the customer-facing and forward-looking side of the work, then spends real, dedicated time preparing you for your capstone project.\n\n## Customer Engagement and Education\n\nThroughout this course, we\'ve repeatedly returned to the importance of genuinely clear communication — in monitoring dashboards, in troubleshooting, and now here, in the business context specifically. Many potential customers genuinely don\'t fully understand solar technology, and effective customer education is a real, significant part of successfully growing this business.\n\nThis includes clearly explaining realistic expected system performance and honest limitations, setting genuinely realistic expectations around maintenance needs and true system lifespan, and being fully transparent about total costs and realistic payback periods, connecting directly back to the ROI concepts we first introduced back in week three. Customers who feel genuinely well-informed and are treated honestly are considerably more likely to become long-term, satisfied customers, and to actively refer new customers to a business they trust.\n\n## Scaling Renewable Energy Projects\n\nAs a renewable energy business genuinely grows, new operational challenges emerge. Efficiently managing an expanding installation team, maintaining consistent, reliable quality standards across an increasing number of active projects, and effectively managing an increasingly large portfolio of monitored, ongoing systems — the digital monitoring approaches we covered in Module 4 become genuinely essential specifically at this larger scale, since manually checking each individual system\'s status one at a time simply doesn\'t remain practical once you\'re managing many dozens, or eventually hundreds, of active installations simultaneously.\n\n## Future Technologies: AI and Blockchain in Energy\n\nLet\'s briefly look forward at where this field is genuinely heading. **Artificial intelligence** is increasingly being applied to energy management: more accurately predicting generation output based on detailed weather forecasting, optimizing genuinely complex battery charging and discharging patterns automatically, and meaningfully improving the predictive maintenance concepts we discussed back in Module 5 through more sophisticated pattern recognition across accumulated historical data.\n\n**Blockchain technology** is being explored specifically for peer-to-peer energy trading — allowing individual solar system owners to directly sell genuine excess generated electricity to nearby neighbors, without necessarily requiring a traditional centralized utility company to broker every single transaction. This remains a genuinely emerging area, but it represents an interesting, real possible future direction, particularly relevant for microgrid contexts, referring back to what we covered in week four.\n\nI mention these emerging developments not because you need to master them today, but because this field is genuinely, continuously evolving — the fundamental underlying principles you\'ve built throughout this course will remain valuable and relevant even as the specific available tools and technologies continue to change around them.\n\n## Preparing Your Capstone Project\n\nYour capstone project asks you to design and plan a complete renewable energy system for a community center, school, or health facility here in the State, explicitly serving as a demonstration and training facility for the surrounding community.\n\nI want you to treat this as one genuinely connected story. Your energy audit and load calculation should build directly on Module 1\'s fundamentals and Module 2\'s proper sizing methodology. Your system design should incorporate the battery storage decisions from Module 3. Your monitoring design should apply Module 4\'s dashboard principles. Your installation plan should apply Module 6\'s safety and sequencing considerations. And your community engagement plan should apply the customer education principles we just covered today, adapted specifically for a genuinely broader community audience, not merely a single individual customer.\n\nThink carefully and specifically about what makes this particular project distinctive: it\'s explicitly meant to serve as a demonstration and training facility, meaning your design and community engagement plan should genuinely support that broader educational purpose, not solely focus on raw technical performance alone.\n\n## Bringing It Together\n\nWe\'ve now covered the complete arc of this course: energy fundamentals, solar system design, battery storage, digital monitoring, diagnostics and troubleshooting, installation planning, and finally, the genuine business and forward-looking considerations that complete a truly professional understanding of this field. Your capstone project is your opportunity to demonstrate every single piece of this as one coherent, complete, and genuinely practical body of work.\n\nFor your assignment, finalize your capstone project\'s specific scope and overall approach. For your practical exercise, develop a complete business plan for a renewable energy service, applying everything covered across these two lessons.\n\nGood luck with your capstone project, and we\'re looking forward to seeing the community facility you help bring to life.';

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
