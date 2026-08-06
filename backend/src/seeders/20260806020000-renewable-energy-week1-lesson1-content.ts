import { QueryInterface } from "sequelize";

const COURSE_SLUG = "renewable-energy-digital-systems";
const WEEK_NUMBER = 1;
const LESSON_TITLE = "Energy Basics";

const PLACEHOLDER_CONTENT = "Power, voltage, current, and efficiency explained for beginners.";

// The demo seeder (20260729020100) already inserted this lesson with placeholder
// content before the full lesson was written -- this seeder swaps it for the real
// content, mirroring how 20260806010000-social-media-lesson-videos.ts updates
// already-seeded rows in place rather than re-running the original insert.
const FULL_CONTENT =
  'Welcome to Renewable Energy Digital Systems. Over the next eight weeks, this course teaches you how to design, monitor, and maintain renewable energy systems, with a particular focus on solar power, since it\'s genuinely the most practical and accessible starting point for this region.\n\nLet\'s be honest from the very start: this course involves some real electrical concepts and calculations. If terms like voltage and current feel unfamiliar right now, that\'s completely fine — this lesson builds that foundation carefully, from the ground up, and we\'ll return to and reinforce these fundamentals repeatedly throughout the rest of the course.\n\n## Power, Voltage, and Current\n\nLet\'s start with three terms you\'ll use constantly throughout this entire course.\n\n**Power** measures the rate at which energy is used or genuinely produced, measured in watts. A one-hundred-watt light bulb consumes energy at a rate of one hundred watts, every single second it\'s switched on.\n\n**Voltage**, measured in volts, is the electrical pressure that pushes electric current through a circuit — genuinely similar to how water pressure pushes water reliably through a pipe.\n\n**Current**, measured in amperes, or amps, is the actual rate of electric charge flowing through a circuit — continuing that same water analogy, this is the actual volume of water genuinely flowing through the pipe.\n\nThese three quantities relate through a simple, foundational formula you\'ll use repeatedly throughout this course: power equals voltage multiplied by current. If you know any two of these three values, you can always calculate the third. A solar panel rated at 12 volts producing 5 amps, for example, is delivering 60 watts of power — and that same formula is exactly what lets you check a component\'s specification sheet against what a system actually needs.\n\n## Efficiency\n\n**Efficiency** measures what percentage of input energy is actually converted into genuinely useful output energy, rather than being lost, most commonly as heat. A solar panel with 20 percent efficiency converts 20 percent of the sunlight energy that hits it into usable electricity; the remaining 80 percent is lost.\n\nEfficiency directly affects both system performance and, importantly, overall system cost, since higher-efficiency equipment can generate the exact same power output using a genuinely smaller, and often meaningfully cheaper, physical installation. Later in this course, when we size real systems for real customers, efficiency is one of the first numbers you\'ll need.\n\n## Renewable Energy Sources\n\nLet\'s survey the major renewable energy sources, since understanding all of them, even the ones we won\'t focus on heavily, helps you correctly recognize when solar genuinely is, or perhaps isn\'t, the right practical choice for a specific situation.\n\n**Solar** converts sunlight directly into electricity, and we\'ll spend considerable time on it throughout this course, precisely because it\'s the most broadly accessible and genuinely scalable option for the State context. **Wind** converts kinetic energy from moving air into electricity, generally requiring meaningfully consistent wind speeds to be genuinely practical and cost-effective. **Hydro** converts the energy of flowing or falling water into electricity, requiring appropriate river or water flow conditions that aren\'t universally available everywhere. **Biomass** converts organic material — agricultural waste, wood, and similar materials — into usable energy, often through direct combustion or controlled digestion processes. **Geothermal** harnesses the earth\'s own internal heat, though this generally requires genuinely specific geological conditions that aren\'t broadly available in most regions.\n\n## Why Solar Makes Sense Here\n\nFor most of Nigeria, and especially for the State specifically, solar represents the single most practical and immediately accessible renewable option, given genuinely abundant available sunlight and comparatively lower upfront technical barriers relative to the other sources we just discussed. It doesn\'t depend on a river running through the property, a consistently windy site, or specific geology — just a reasonably unobstructed patch of sky, which is exactly why it\'s the option most of this course is built around.\n\n## Bringing It Together\n\nThis lesson covered the foundational vocabulary — power, voltage, current, efficiency — and surveyed the renewable energy landscape, with a clear, deliberate focus on why solar makes genuine practical sense for this specific region. This vocabulary is exactly what makes every remaining week of this course meaningfully accessible, even the more technically detailed weeks ahead.\n\nNext lesson turns to the technology itself: how solar photovoltaic cells actually convert sunlight into usable electricity, and how individual cells become panels and complete arrays.';

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
