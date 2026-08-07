import { QueryInterface } from "sequelize";

interface LessonVideoSeed {
  weekNumber: number;
  lessonTitle: string;
  videoUrl: string;
}

const COURSE_SLUG = "digital-marketing";

// Every video below was found via web search and confirmed real + embeddable via the
// YouTube oEmbed endpoint (curl https://www.youtube.com/oembed?url=...&format=json)
// before being included here, mirroring 20260806010000-social-media-lesson-videos.ts,
// 20260807150000-renewable-energy-lesson-videos.ts, and 20260807160000-gis-lesson-videos.ts.
// Week 1 Lesson 1 ("The Digital Marketing Funnel") already had a video from an earlier
// seeder and is left untouched.
const CONTENT: LessonVideoSeed[] = [
  {
    weekNumber: 1,
    lessonTitle: "Digital Marketing Channels Overview",
    videoUrl: "https://www.youtube.com/watch?v=5n_3mWCj4mI",
  },
  {
    weekNumber: 2,
    lessonTitle: "Buyer Personas and Competitive Analysis",
    videoUrl: "https://www.youtube.com/watch?v=ScYthzVQqMc",
  },
  {
    weekNumber: 2,
    lessonTitle: "Building a Channel Strategy",
    videoUrl: "https://www.youtube.com/watch?v=ToZYDkBGkLo",
  },
  {
    weekNumber: 3,
    lessonTitle: "How Search Engines Work & On-Page SEO",
    videoUrl: "https://www.youtube.com/watch?v=ftF7N5liYc0",
  },
  {
    weekNumber: 3,
    lessonTitle: "Off-Page, Technical & Local SEO",
    videoUrl: "https://www.youtube.com/watch?v=DMj4_Jr-kjM",
  },
  {
    weekNumber: 4,
    lessonTitle: "Content Marketing & Lead Magnets",
    videoUrl: "https://www.youtube.com/watch?v=aaNTj4aJInM",
  },
  {
    weekNumber: 4,
    lessonTitle: "Email List Building, Segmentation & Deliverability",
    videoUrl: "https://www.youtube.com/watch?v=v_c2Zmo5IqI",
  },
  {
    weekNumber: 5,
    lessonTitle: "Google Ads Campaign Types & Quality Score",
    videoUrl: "https://www.youtube.com/watch?v=uKz8KzkoT5w",
  },
  {
    weekNumber: 5,
    lessonTitle: "Campaign Structure, Budgeting & Conversion Tracking",
    videoUrl: "https://www.youtube.com/watch?v=JB4_LUv7F_E",
  },
  {
    weekNumber: 6,
    lessonTitle: "Google Analytics & Attribution Models",
    videoUrl: "https://www.youtube.com/watch?v=zbNwPoVVCoQ",
  },
  {
    weekNumber: 6,
    lessonTitle: "Dashboards, ROI, CAC & LTV",
    videoUrl: "https://www.youtube.com/watch?v=E3_VI3RNY4I",
  },
  {
    weekNumber: 7,
    lessonTitle: "E-commerce Marketing & Cart Abandonment",
    videoUrl: "https://www.youtube.com/watch?v=M20cc26HkYg",
  },
  {
    weekNumber: 7,
    lessonTitle: "Marketing Automation, CRM & Journey Mapping",
    videoUrl: "https://www.youtube.com/watch?v=i6kE_cmeWg8",
  },
  {
    weekNumber: 8,
    lessonTitle: "Integrated Campaigns & Budget Allocation",
    videoUrl: "https://www.youtube.com/watch?v=u6KQ0l8xReg",
  },
  {
    weekNumber: 8,
    lessonTitle: "Emerging Trends & Capstone Planning",
    videoUrl: "https://www.youtube.com/watch?v=kd7APqf6X8g",
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
