import { QueryInterface } from "sequelize";

interface LessonVideoSeed {
  weekNumber: number;
  lessonTitle: string;
  videoUrl: string;
}

const COURSE_SLUG = "uav-drone-consultant-pathway";

// Second pass of video research for this course, following the same verification
// technique documented at the top of 20260905030000-uav-consultant-pathway-lesson-videos.ts
// (YouTube oEmbed existence check + a direct lengthSeconds duration check, <=5 minutes,
// official/reputable sources only). This covers 3 of the 23 lessons that had no video
// after the first pass; the search effort for the remaining 20 came up empty against the
// same bar and their "Recommended Videos" sections say so honestly rather than settling
// for a weak or overlong match. Week 15's "Your UAV Consultant Toolkit" lesson content is
// also updated (in the companion seeder 20260905050000) to list these in its library, but
// that lesson itself has no single "primary" video, so it's not in this list.
const CONTENT: LessonVideoSeed[] = [
  {
    weekNumber: 12,
    lessonTitle: "GIS Foundations: Points, Lines, Polygons, Layers, Maps",
    videoUrl: "https://www.youtube.com/watch?v=_CSUvsq7lVk",
  },
  {
    weekNumber: 13,
    lessonTitle: "Photogrammetry, Orthomosaics, and Digital Elevation Models",
    videoUrl: "https://www.youtube.com/watch?v=oYR3pK6vASY",
  },
  {
    weekNumber: 14,
    lessonTitle: "UAV Applications Across Industries",
    videoUrl: "https://www.youtube.com/watch?v=1q1iOFm4sTk",
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
