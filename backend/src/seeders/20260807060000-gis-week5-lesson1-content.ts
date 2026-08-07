import { QueryInterface } from "sequelize";

const COURSE_SLUG = "gis-and-drone-mapping";
const WEEK_NUMBER = 5;
const LESSON_TITLE = "Drone Types and Nigerian Regulations";

const NEW_CONTENT =
  "Welcome to Module 4. We've now covered GIS fundamentals, data collection, and satellite remote sensing. This week, we bring the camera much, much closer to the ground: drone mapping, a technology that has genuinely transformed how detailed, high-resolution spatial data gets collected over the past decade.\n\nBefore we discuss any techniques at all, I want to be completely direct about something: drones are aircraft, fully regulated by aviation authorities, and operating one without proper authorization carries genuinely serious legal consequences. Everything in this module assumes full compliance with applicable regulations, which we'll cover directly today.\n\n## Drone Types and Applications\n\nDrones used for mapping generally fall into two main categories. **Multirotor drones**, using multiple rotors, most commonly four, offer excellent stability and vertical takeoff and landing, along with the ability to hover precisely in place, but they generally have more limited flight time and can cover a comparatively smaller total area per single flight. **Fixed-wing drones**, resembling a small airplane, can cover considerably larger areas per flight and generally achieve longer flight times, but they require a longer clear runway for takeoff and landing and lack the fine hovering precision that multirotor designs offer.\n\nFor most of the practical mapping applications you'll encounter in this course — agricultural monitoring, construction site progress tracking, infrastructure inspection — multirotor drones are the more common and typically more accessible practical choice, and it's precisely what most of this module's hands-on work will assume.\n\n## Drone Regulations and Safety in Nigeria\n\nThe **Nigeria Civil Aviation Authority, NCAA**, regulates all drone operations within Nigerian airspace. Understanding these requirements isn't optional background information — it's a genuine legal necessity for anyone operating drones professionally, and it's exactly what this week's assignment asks you to research in careful detail.\n\nKey regulatory requirements generally include mandatory registration of drones above a certain specified weight threshold, required permits for commercial drone operations, meaning any use beyond purely personal, non-commercial purposes, restrictions around flying near airports and other genuinely sensitive locations, and specific limitations on maximum flight altitude and requirements around maintaining direct visual line of sight with the aircraft at all times during flight.\n\nBeyond formal legal compliance, responsible drone operation also demands genuine safety discipline: always maintaining clear situational awareness of surrounding people, structures, and other aircraft, checking current weather conditions carefully before every single flight, since strong wind and rain can both genuinely endanger a drone and seriously compromise data quality, and always having a clear, pre-planned emergency landing procedure ready in case something unexpected goes wrong mid-flight.\n\nI want to emphasize something important here: regulatory compliance protects you personally as an operator, it protects the genuine safety of people and property on the ground, and it protects the entire drone mapping industry's overall reputation. Operating outside these clear rules, even unintentionally through simple ignorance, creates real risk for everyone.\n\n## Bringing It Together\n\nThis lesson covered the two main types of mapping drones and their respective tradeoffs, and the genuinely serious legal and safety framework the NCAA sets for drone operations in Nigeria.\n\nNext lesson turns to putting a compliant, well-equipped drone to work: planning an effective mapping mission, and using ground control points to ensure the resulting map is accurately positioned in real-world space.";

const OLD_CONTENT =
  "Multirotor versus fixed-wing drones, and the NCAA rules governing legal, safe drone operation in Nigeria.";

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
