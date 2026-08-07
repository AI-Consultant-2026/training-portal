import { QueryInterface } from "sequelize";

interface LessonVideoSeed {
  weekNumber: number;
  lessonTitle: string;
  videoUrl: string;
}

const COURSE_SLUG = "gis-and-drone-mapping";

// Every video below was found via web search and confirmed real + embeddable via the
// YouTube oEmbed endpoint (curl https://www.youtube.com/oembed?url=...&format=json)
// before being included here, mirroring 20260806010000-social-media-lesson-videos.ts and
// 20260807150000-renewable-energy-lesson-videos.ts. Week 1 Lesson 1 ("Raster vs. Vector
// Data") already had a video from an earlier seeder and is left untouched.
const CONTENT: LessonVideoSeed[] = [
  {
    weekNumber: 1,
    lessonTitle: "Real-World GIS Use Cases & Getting Started with QGIS",
    videoUrl: "https://www.youtube.com/watch?v=NHolzMgaqwE",
  },
  {
    weekNumber: 2,
    lessonTitle: "Latitude, Longitude, and Map Projections",
    videoUrl: "https://www.youtube.com/watch?v=pWAOghajt7A",
  },
  {
    weekNumber: 2,
    lessonTitle: "Map Elements and GIS Software Landscape",
    videoUrl: "https://www.youtube.com/watch?v=49QydETVNwg",
  },
  {
    weekNumber: 3,
    lessonTitle: "Where Spatial Data Comes From",
    videoUrl: "https://www.youtube.com/watch?v=7BkblClMKbk",
  },
  {
    weekNumber: 3,
    lessonTitle: "Data Quality, Cleaning, and Storage",
    videoUrl: "https://www.youtube.com/watch?v=mp-jneQXD50",
  },
  {
    weekNumber: 4,
    lessonTitle: "Remote Sensing Physics and Satellite Sources",
    videoUrl: "https://www.youtube.com/watch?v=jVXgWGK9Kr8",
  },
  {
    weekNumber: 4,
    lessonTitle: "Spectral Indices, Classification, and Change Detection",
    videoUrl: "https://www.youtube.com/watch?v=Kyzql8FriIY",
  },
  {
    weekNumber: 5,
    lessonTitle: "Drone Types and Nigerian Regulations",
    videoUrl: "https://www.youtube.com/watch?v=H1MfT4p_q24",
  },
  {
    weekNumber: 5,
    lessonTitle: "Flight Planning and Ground Control Points",
    videoUrl: "https://www.youtube.com/watch?v=vpw7BcJVEzo",
  },
  {
    weekNumber: 6,
    lessonTitle: "Photogrammetry and Orthomosaic Generation",
    videoUrl: "https://www.youtube.com/watch?v=Blr3suSQt-Q",
  },
  {
    weekNumber: 6,
    lessonTitle: "3D Point Clouds and LiDAR",
    videoUrl: "https://www.youtube.com/watch?v=EYbhNSUnIdU",
  },
  {
    weekNumber: 7,
    lessonTitle: "Buffering, Overlay, and Surface Analysis",
    videoUrl: "https://www.youtube.com/watch?v=qUilbyGUFqU",
  },
  {
    weekNumber: 7,
    lessonTitle: "Network Analysis and Thematic Mapping",
    videoUrl: "https://www.youtube.com/watch?v=HlWB4mYgCkg",
  },
  {
    weekNumber: 8,
    lessonTitle: "Scoping and Resourcing a GIS Project",
    videoUrl: "https://www.youtube.com/watch?v=XcP8DLFECTE",
  },
  {
    weekNumber: 8,
    lessonTitle: "Stakeholder Engagement and Delivering Results",
    videoUrl: "https://www.youtube.com/watch?v=6l3G7FDw_-I",
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    for (const item of CONTENT) {
      const [rows] = await queryInterface.sequelize.query(
        `SELECT l.id AS lesson_id
         FROM lessons l
         JOIN modules m ON m.id = l.module_id
         JOIN courses c ON c.id = m.course_id
         WHERE c.slug = ? AND m.week_number = ? AND l.title = ?`,
        { replacements: [COURSE_SLUG, item.weekNumber, item.lessonTitle] },
      );
      const row = (rows as { lesson_id: string }[])[0];
      if (!row) {
        throw new Error(`Could not find lesson "${item.lessonTitle}" (week ${item.weekNumber}) for ${COURSE_SLUG}`);
      }

      await queryInterface.sequelize.query(`UPDATE lessons SET video_url = ? WHERE id = ?`, {
        replacements: [item.videoUrl, row.lesson_id],
      });
    }
  },

  down: async (queryInterface: QueryInterface) => {
    for (const item of CONTENT) {
      await queryInterface.sequelize.query(
        `UPDATE lessons l
         SET video_url = NULL
         FROM modules m, courses c
         WHERE l.module_id = m.id AND m.course_id = c.id
           AND c.slug = ? AND m.week_number = ? AND l.title = ?`,
        { replacements: [COURSE_SLUG, item.weekNumber, item.lessonTitle] },
      );
    }
  },
};
