import { QueryInterface } from "sequelize";

const COURSE_SLUG = "gis-and-drone-mapping";
const WEEK_NUMBER = 8;
const LESSON_TITLE = "Stakeholder Engagement and Delivering Results";

const NEW_CONTENT =
  "Last lesson covered how to define a clear project scope and estimate the budget, time, and personnel it requires. Now let's turn to the people side of project delivery: the stakeholders a GIS project actually serves, and how to deliver results they can trust and genuinely use.\n\n## Stakeholder Engagement\n\nGIS projects rarely exist purely for their own sake — they exist to inform real decisions made by real people: government officials, community leaders, business owners. **Stakeholder engagement** means actively involving these people throughout a project, not merely presenting a finished, completed analysis to them at the very end with no prior input.\n\nEffective stakeholder engagement includes understanding clearly, upfront, what specific decisions the stakeholders actually need to make, and consequently what information would genuinely help them most; sharing preliminary findings along the way for genuine feedback, rather than waiting until the entire project is fully complete; and presenting final results in a format that's genuinely accessible to the specific audience, which often means relying on the clear thematic mapping techniques from last week rather than dense, highly technical raw data.\n\nFor a project genuinely supporting government agricultural planning, this might mean directly engaging agricultural extension officers who understand real, current farming practices firsthand, or community leaders who understand the practical, lived realities of specific local farming communities in ways that raw data alone simply cannot fully capture.\n\n## Quality Assurance in GIS Projects\n\nWe covered data-level quality assurance back in week three; project-level quality assurance is broader still. This includes properly documenting your specific methodology, so results can genuinely be verified and, if necessary, meaningfully replicated later on; validating final results against independent, known reference information wherever that's genuinely possible; and having someone other than the original analyst review key findings before final delivery, since a genuinely fresh set of eyes often catches errors or unstated, unexamined assumptions the original analyst has simply become too close to the work to notice themselves.\n\n## Reporting and Visualization\n\nBuilding directly on last week's thematic mapping techniques, final project reporting should clearly connect analysis back to the original project goals: what specific question was being asked, what approach and methodology was actually used, what was genuinely found, and what specific recommendations follow from those findings. This mirrors reporting principles you've likely encountered in other contexts throughout your broader studies — clear structure and genuine actionability consistently matter more than sheer technical density or complexity.\n\n## Web Mapping and Interactive Maps\n\nFinally, let's briefly cover an increasingly important, modern delivery format: **web mapping** — interactive maps that stakeholders can genuinely explore directly in a web browser, panning, zooming, and toggling different layers on and off themselves, rather than only ever viewing a single static, fixed image.\n\nTools like QGIS's web export capabilities, or dedicated platforms built specifically for this purpose, allow you to publish genuinely interactive versions of your analysis. This can meaningfully increase real stakeholder engagement, since people can directly explore areas of specific personal interest to them themselves, rather than relying entirely on a single, fixed static view chosen in advance by the analyst.\n\n## Preparing Your Capstone Project\n\nYour capstone project asks you to support sustainable agriculture zone planning through a comprehensive GIS analysis, a full series of thematic maps, a complete drone survey report, and clear implementation recommendations. Treat this as one connected, cohesive story: your data collection choices, informed by Module 2, should directly support the remote sensing and drone analysis from Modules 3 and 4, which in turn directly feeds the spatial analysis techniques from last week, all clearly communicated through the thematic mapping and stakeholder-focused reporting we've discussed today.\n\nScope this realistically. A genuinely focused, well-executed analysis of one specific area or one specific resource constraint will serve both you and any real stakeholders far better than a superficial, thinly-spread attempt to comprehensively cover everything at once.\n\n## Bringing It Together\n\nThis lesson covered stakeholder engagement, project-level quality assurance, clear reporting, and interactive web mapping — the skills that turn a technically sound analysis into a genuinely trusted, usable deliverable.\n\nThat also closes out the full arc of this course: GIS fundamentals, careful data collection, satellite remote sensing, drone mapping, formal spatial analysis, and finally, the project management skills needed to deliver all of this professionally and effectively to real stakeholders. Your capstone project is your opportunity to demonstrate every single piece of this as one coherent, complete body of work.\n\nFor your assignment, create a full project timeline and resource plan. For your practical exercise, finalize your capstone project's scope and methodology, applying everything covered today.\n\nGood luck with your capstone project.";

const OLD_CONTENT =
  "Engaging stakeholders throughout a project, quality-checking findings, and reporting results through clear, interactive web maps.";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE lessons l
       SET content = ?
       FROM modules m, courses c
       WHERE l.module_id = m.id AND m.course_id = c.id
         AND c.slug = ? AND m.week_number = ? AND l.title = ?`,
      { replacements: [NEW_CONTENT, COURSE_SLUG, WEEK_NUMBER, LESSON_TITLE] },
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE lessons l
       SET content = ?
       FROM modules m, courses c
       WHERE l.module_id = m.id AND m.course_id = c.id
         AND c.slug = ? AND m.week_number = ? AND l.title = ?`,
      { replacements: [OLD_CONTENT, COURSE_SLUG, WEEK_NUMBER, LESSON_TITLE] },
    );
  },
};
