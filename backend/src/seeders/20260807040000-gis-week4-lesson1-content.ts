import { QueryInterface } from "sequelize";

const COURSE_SLUG = "gis-and-drone-mapping";
const WEEK_NUMBER = 4;
const LESSON_TITLE = "Remote Sensing Physics and Satellite Sources";

const NEW_CONTENT =
  "Welcome to Module 3. This week, we cover one of the most powerful tools available in modern GIS work: remote sensing, using satellite imagery to observe and analyze the earth's surface from orbit, without ever needing to physically visit a site at all.\n\n## Remote Sensing Concepts and Physics\n\n**Remote sensing** means gathering information about an object or area without any direct physical contact — in our context, using sensors mounted on satellites, and later in this course, drones, to observe the earth's surface from a genuine distance.\n\nThe core underlying physics is refreshingly straightforward at a conceptual level: every surface on earth reflects and emits electromagnetic radiation in genuinely distinct, characteristic patterns. Healthy, dense vegetation reflects light very differently than bare soil, and bare soil reflects light very differently than open, standing water. Satellite sensors measure these reflectance patterns across different specific wavelengths, or bands, of the electromagnetic spectrum, and analysts like you can then use those detailed patterns to identify precisely what's actually present on the ground below.\n\nThe **visible spectrum** — the same red, green, and blue light genuinely visible to the human eye — is one part of this picture. But remote sensing sensors typically also capture data well beyond visible light entirely, notably in the **near-infrared** range, which turns out to be genuinely crucial for accurately identifying vegetation, since healthy plant material strongly reflects near-infrared light in a very distinctive, characteristic way that bare soil and most other surfaces simply do not replicate.\n\n## Satellite Systems and Imagery Sources\n\nSeveral major satellite programs provide freely available imagery, which is a genuinely enormous, valuable resource for a field like this.\n\n**Landsat**, operated jointly by NASA and the United States Geological Survey, has continuously provided earth imagery since 1972, making it the longest-running, most valuable continuous satellite record available for reliably tracking long-term environmental change over many decades.\n\n**Sentinel**, operated by the European Space Agency as part of the Copernicus program, provides more frequent revisit times than Landsat and higher spatial resolution for many practical applications, making it especially valuable for more time-sensitive, current monitoring work.\n\n**MODIS**, another NASA program, provides considerably lower spatial resolution than either Landsat or Sentinel, but captures imagery of virtually the entire earth on a genuinely daily basis, making it especially well suited to tracking rapidly changing phenomena, like active wildfires or fast-moving storm systems.\n\nThe genuinely encouraging news for you: all three of these programs make their imagery completely freely available to the public. This means you can access globally consistent, scientifically rigorous satellite data covering the State and the entire surrounding region without any licensing cost whatsoever — a real, significant advantage for the practical work you'll do throughout the remainder of this course.\n\n## Bringing It Together\n\nThis lesson covered how remote sensing works at a fundamental physical level, and the three major satellite programs — Landsat, Sentinel, and MODIS — that provide freely available imagery, each with its own strengths.\n\nNext lesson turns to putting that raw imagery to work: spectral indices like NDVI and NDBI that extract meaningful information from imagery, image classification, and change detection analysis over time.";

const OLD_CONTENT =
  "How surfaces reflect electromagnetic radiation, and how Landsat, Sentinel, and MODIS each provide freely available satellite imagery.";

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
