import { QueryInterface } from "sequelize";

const COURSE_SLUG = "gis-and-drone-mapping";
const WEEK_NUMBER = 6;
const LESSON_TITLE = "Photogrammetry and Orthomosaic Generation";

const NEW_CONTENT =
  "Last week we covered how to plan and safely execute a drone mapping flight. This week, we cover what happens next: turning potentially hundreds, or even thousands, of individual overlapping photos into a single, finished, genuinely usable mapping product.\n\n## Drone Image Processing Workflows\n\nA typical drone mapping project produces a genuinely large number of individual, overlapping photographs — the overlap we discussed last week is precisely what makes the next processing step possible at all. The overall processing workflow generally follows a consistent sequence: importing all captured images along with their embedded GPS location data, aligning those images by identifying matching features that clearly appear across multiple overlapping photos, incorporating the ground control points from last week's lecture to properly refine overall positional accuracy, and finally generating the actual finished output products, which we're about to cover in detail.\n\nThis entire workflow relies heavily on specialized photogrammetry software — options range from open-source tools all the way up to commercial platforms like Pix4D or DroneDeploy. The underlying core concepts remain genuinely consistent across virtually all of these tools, which is exactly why we focus in this course primarily on understanding those transferable principles rather than memorizing any single specific software interface.\n\n## Photogrammetry Basics\n\n**Photogrammetry** is the genuinely foundational science underlying all of this: extracting reliable, accurate measurements and three-dimensional structure from two-dimensional photographs.\n\nThe core underlying principle is called **stereophotogrammetry**: when the same real-world object or location is captured from two or more sufficiently different camera angles or positions, software can mathematically calculate its true three-dimensional position and structure, in a manner genuinely similar to how human binocular vision, using two eyes set slightly apart, perceives depth and distance in the physical world.\n\nThis is precisely why the image overlap we discussed last week matters so critically. Each specific point on the ground genuinely needs to appear in multiple photographs, captured from slightly different drone positions, for the software to accurately triangulate its true three-dimensional position. Insufficient overlap between images produces gaps or genuine errors in the final processed output.\n\nThe software's alignment process specifically identifies distinctive, recognizable features — a fence corner, a distinctive rock, a building edge — appearing consistently across multiple overlapping photographs, then uses the drone's own known flight path and positional data to calculate precisely where each individual photo was actually taken from, and consequently, the true three-dimensional position of everything genuinely visible within it.\n\n## Orthomosaic Generation\n\nThe most common and widely used finished output from a drone mapping project is an **orthomosaic** — a single, large, seamless image created by properly stitching together all of the individual overlapping photographs, while simultaneously correcting for both camera lens distortion and terrain-related displacement.\n\nThis last correction is genuinely important and often not fully appreciated by beginners: a simple photo taken from directly above still isn't perfectly geometrically accurate, because taller features, like buildings or trees, appear to lean or shift somewhat in a raw, unprocessed photo, purely due to the specific camera angle relative to their true height. An orthomosaic corrects for this specific effect, producing an image with consistent, reliable scale throughout — meaning accurate distance and area measurements can genuinely be taken directly from it, exactly the same way you would measure accurately from a properly prepared traditional map.\n\nOrthomosaics are exactly what you'll typically import directly into QGIS for further genuine analysis — measuring precise field areas, digitizing new infrastructure features, or combining directly with the satellite-derived data we covered back in Module 3, for direct, meaningful comparison at a much finer level of local detail.\n\n## Bringing It Together\n\nThis lesson covered the full drone image processing workflow, the underlying photogrammetry principle of stereophotogrammetry that makes it possible, and how those processed photos become a single, accurately scaled orthomosaic.\n\nNext lesson turns to the other major output of drone image processing: 3D point clouds, and how LiDAR offers a different technical approach to capturing elevation, including beneath vegetation.";

const OLD_CONTENT =
  "How overlapping drone photos are aligned and stitched into a single, accurately scaled orthomosaic.";

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
