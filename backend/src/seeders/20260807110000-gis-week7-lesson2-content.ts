import { QueryInterface } from "sequelize";

const COURSE_SLUG = "gis-and-drone-mapping";
const WEEK_NUMBER = 7;
const LESSON_TITLE = "Network Analysis and Thematic Mapping";

const NEW_CONTENT =
  "Last lesson covered buffering, overlay, proximity analysis, and interpolation. Now let's turn to connected systems, and how to communicate all of this analysis clearly.\n\n## Network Analysis\n\n**Network analysis** works specifically with genuinely connected, linear systems — road networks, water pipe systems, electrical grids. It answers questions like: what is the fastest available route between two specific points, which specific areas fall within a defined travel time of a hospital, or where exactly would a break in this particular water pipe network leave certain communities without any service at all.\n\nThis directly builds on the vector data concepts we introduced back in week one — roads and pipes are naturally represented as connected line features, and network analysis tools use that underlying connectivity to answer genuinely practical, real-world routing and accessibility questions.\n\n## Thematic Mapping Techniques\n\nNow that we can perform this kind of genuine analysis, we need to communicate the results clearly and effectively — exactly the purpose of **thematic mapping**, creating maps specifically designed to clearly show a particular theme or pattern, rather than simply displaying every available piece of raw data indiscriminately.\n\n**Choropleth maps** use color shading across defined areas, like local government areas, to represent a data value — population density or literacy rate are both common, effective examples. **Graduated symbol maps** use symbols of varying size to represent varying data values at specific points — a larger circle at a location with meaningfully higher measured rainfall, for instance. **Heat maps** show the intensity of a phenomenon continuously across an entire area, often effectively used for visualizing something like disease incidence or measured flood risk.\n\nEffective thematic mapping requires real, deliberate design discipline: choosing color schemes that are both intuitive and genuinely accessible, including to viewers with color vision deficiencies, selecting sensible, clearly interpretable data classification breaks, and always including that clear legend we discussed back in week two, so that any reader can correctly and confidently interpret exactly what they're looking at.\n\n## Infrastructure and Environmental Monitoring Mapping\n\nLet's bring all of this together with two genuinely practical, common applications you'll very likely encounter in real professional work.\n\n**Infrastructure mapping** combines network analysis with overlay techniques to plan and manage roads, utilities, and public buildings — identifying underserved areas genuinely needing new infrastructure investment, or planning efficient, sensible maintenance routes across an existing large infrastructure network.\n\n**Environmental monitoring mapping** combines the remote sensing and change detection techniques we covered back in Module 3 with the spatial analysis techniques from today, tracking things like deforestation rates, flood risk zones, or water quality patterns over time — directly supporting the kind of disaster risk assessment mapping this week's assignment specifically asks you to demonstrate.\n\n## Bringing It Together\n\nToday we covered the core spatial analysis toolkit that transforms carefully collected data into genuinely meaningful, actionable answers: buffering and overlay for relationship-based questions, interpolation and surface analysis for working confidently with continuous data, network analysis for connected systems, and thematic mapping for communicating your results clearly and effectively to others. This is genuinely the analytical heart of professional GIS work, and it draws directly on absolutely everything we've built together across the previous six weeks.\n\nFor your assignment, create a full series of thematic maps for a specific State resource of your choosing — water, agriculture, or infrastructure are all excellent, genuinely relevant starting points. For your practical exercise, perform real spatial analysis for a resource management problem, applying the specific techniques covered today.\n\nNext week, in our final lecture, we cover project planning and preparation for your capstone project, where all of this genuinely comes together into one complete, comprehensive analysis.";

const OLD_CONTENT =
  "Analyzing connected systems like roads and pipes, and communicating results through choropleth, graduated symbol, and heat maps.";

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
