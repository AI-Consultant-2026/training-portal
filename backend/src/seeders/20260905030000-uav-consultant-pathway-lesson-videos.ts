import { QueryInterface } from "sequelize";

interface LessonVideoSeed {
  weekNumber: number;
  lessonTitle: string;
  videoUrl: string;
}

const COURSE_SLUG = "uav-drone-consultant-pathway";

// Every video below was found via web search and confirmed real + embeddable via the
// YouTube oEmbed endpoint (curl https://www.youtube.com/oembed?url=...&format=json),
// then (for this first pass only -- see note below) confirmed under 5 minutes by
// inspecting the video page's own lengthSeconds value directly
// (curl -A "Mozilla/5.0" <watch-url> | grep lengthSeconds) -- mirroring
// 20260807180000-cyber-security-lesson-videos.ts and the other lesson-video seeders in
// this series. Only 6 of this course's 29 lessons turned up a video meeting both bars
// (official/reputable source + under 5 minutes) within a reasonable search effort on
// this first pass -- the other 23 lessons' own "Recommended Videos" section said so
// honestly rather than including a weak, overlong, or unverified match.
//
// NOTE: the 5-minute duration cap above was a rule for this pass only. It was later
// lifted at the user's explicit request (a long official/reputable video is preferred
// over a padded-out short one) -- see 20260905040000-uav-consultant-pathway-lesson-videos-2.ts
// and 20260905060000-uav-consultant-pathway-lesson-videos-3.ts for the passes made under
// the no-cap rule, which cover most of the lessons this first pass left uncovered. The
// full, current reasoning per lesson lives in curriculumUav.ts's "Recommended Videos"
// sections and in Week 15's "Your UAV Consultant Toolkit" lesson.
const CONTENT: LessonVideoSeed[] = [
  {
    weekNumber: 1,
    lessonTitle: "What Are Drones, UAVs, and UAS? The Big Picture",
    videoUrl: "https://www.youtube.com/watch?v=TMX7wCbWGac",
  },
  {
    weekNumber: 1,
    lessonTitle: "Types of UAVs and Their Real-World Uses",
    videoUrl: "https://www.youtube.com/watch?v=2TFzMC4VBIA",
  },
  {
    weekNumber: 3,
    lessonTitle: "GPS and GNSS: How a Drone Knows Where It Is",
    videoUrl: "https://www.youtube.com/watch?v=urLfpVSaBIs",
  },
  {
    weekNumber: 3,
    lessonTitle: "Latitude, Longitude, and Altitude",
    videoUrl: "https://www.youtube.com/watch?v=NldgslCvJrI",
  },
  {
    weekNumber: 10,
    lessonTitle: "Waypoints, Altitude, Overlap, and Geofences",
    videoUrl: "https://www.youtube.com/watch?v=kraT1L0j0Ds",
  },
  {
    weekNumber: 13,
    lessonTitle: "UAV Sensors and Data: RGB, Thermal, Multispectral, LiDAR",
    videoUrl: "https://www.youtube.com/watch?v=T_6c5sGQGIQ",
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
