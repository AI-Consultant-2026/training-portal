import { QueryInterface } from "sequelize";

const COURSE_SLUG = "gis-and-drone-mapping";
const WEEK_NUMBER = 6;
const LESSON_TITLE = "3D Point Clouds and LiDAR";

const NEW_CONTENT =
  "Last lesson covered the drone image processing workflow and how it produces a single, accurately scaled orthomosaic. Now let's turn to the other major output of that same process: elevation.\n\n## 3D Point Cloud Creation and Visualization\n\nBeyond a flat, two-dimensional orthomosaic, photogrammetry processing can also generate a **3D point cloud** — a genuinely large collection of individual points in three-dimensional space, each representing a specific real-world location along with its measured elevation.\n\nPoint clouds are especially valuable for applications genuinely requiring elevation information: calculating precise stockpile volumes at a mining or construction site, generating an accurate digital elevation model for reliable flood risk modeling, connecting directly back to the water resource applications we discussed back in week one, or creating a genuinely detailed 3D visualization of a construction site's real, current progress compared against the original design plans.\n\nPoint cloud data can be further processed into a proper 3D mesh, effectively creating a complete digital twin of the actual physical site — a photorealistic three-dimensional model that stakeholders can genuinely explore and examine from any viewing angle, without ever needing to physically visit the actual site in person.\n\n## LiDAR Basics\n\nWhile photogrammetry derives structure indirectly from photographs, **LiDAR**, which stands for Light Detection and Ranging, takes a fundamentally different technical approach: it works by actively emitting rapid laser pulses and precisely measuring exactly how long each pulse takes to reflect back, directly calculating true distance from that measured time.\n\nLiDAR offers one genuinely significant practical advantage over standard photogrammetry: its laser pulses can partially penetrate through vegetation canopy gaps, allowing it to capture accurate ground elevation data even in genuinely forested or heavily vegetated areas, where photogrammetry alone would only ever capture the visible top surface of the vegetation canopy itself, never the true ground beneath it. This makes LiDAR especially valuable for forestry applications and detailed flood modeling in areas with meaningful vegetation cover.\n\nThe clear tradeoff is cost: LiDAR sensors remain considerably more expensive than standard drone cameras, which is precisely why standard photogrammetry remains the more common, accessible choice for many genuinely practical projects, with LiDAR reserved specifically for applications where its unique capabilities are genuinely, specifically needed.\n\n## Bringing It Together\n\nToday we covered the complete processing pipeline from raw, individual drone photographs through to finished, genuinely usable mapping products: orthomosaics for accurate, detailed 2D analysis, and 3D point clouds and models for applications genuinely requiring elevation and volumetric information. Combined with everything from last week, you now have a complete, working picture of the full drone mapping workflow, from initial planning all the way through to a finished, genuinely usable deliverable.\n\nFor your assignment, create a full drone survey specifications document for a project of your choosing. For your practical exercise, process real drone imagery using simulation software and produce both a finished orthomosaic and a 3D model.\n\nNext week, we move into Module 5: GIS Analysis and Mapping Applications, where we apply real, formal spatial analysis techniques to the rich data we've now learned to collect from multiple different sources.";

const OLD_CONTENT =
  "Generating 3D point clouds and models from drone imagery, and how LiDAR captures ground elevation beneath vegetation.";

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
