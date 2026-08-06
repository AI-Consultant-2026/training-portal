import { QueryInterface } from "sequelize";

interface LessonVideoSeed {
  weekNumber: number;
  lessonTitle: string;
  videoUrl: string;
}

const COURSE_SLUG = "social-media-management-content";

// Every video below was found via web search and confirmed real + embeddable via the
// YouTube oEmbed endpoint (curl https://www.youtube.com/oembed?url=...&format=json)
// before being included here, mirroring 20260801020100-demo-video-checkpoints.ts. No
// checkpoints here (unlike that seeder) -- these are supplementary viewing per lesson,
// not interactive quizzes.
const CONTENT: LessonVideoSeed[] = [
  {
    weekNumber: 1,
    lessonTitle: "Platform Comparison",
    videoUrl: "https://www.youtube.com/watch?v=wbZBVu1AQSQ",
  },
  {
    // DB title is "Audience Personas" (a known pre-existing title/content mismatch --
    // see [[training-portal-social-media-curriculum]] memory), but the actual lesson
    // content is entirely about goals and KPIs, so the video matches the content.
    weekNumber: 1,
    lessonTitle: "Audience Personas",
    videoUrl: "https://www.youtube.com/watch?v=Xwrsg7lLhfY",
  },
  {
    weekNumber: 2,
    lessonTitle: "Audience Personas & Brand Positioning",
    videoUrl: "https://www.youtube.com/watch?v=XGxNpXaZSvQ",
  },
  {
    weekNumber: 2,
    lessonTitle: "Competitive Analysis & Content Pillars",
    videoUrl: "https://www.youtube.com/watch?v=PFB7r-LghZw",
  },
  {
    weekNumber: 3,
    lessonTitle: "Ideation Frameworks & Writing for Social Media",
    videoUrl: "https://www.youtube.com/watch?v=YggREBXkVqk",
  },
  {
    weekNumber: 3,
    lessonTitle: "Content Calendars, Batching & Repurposing",
    videoUrl: "https://www.youtube.com/watch?v=rl9ZtPKEdRg",
  },
  {
    weekNumber: 4,
    lessonTitle: "Photography, Graphics & Video Fundamentals",
    videoUrl: "https://www.youtube.com/watch?v=YnKov5AmGUM",
  },
  {
    weekNumber: 4,
    lessonTitle: "User-Generated Content & Trends vs. Evergreen",
    videoUrl: "https://www.youtube.com/watch?v=cLAt1KjRutY",
  },
  {
    weekNumber: 5,
    lessonTitle: "Community Management, Voice & Engagement",
    videoUrl: "https://www.youtube.com/watch?v=PDNHam880Sk",
  },
  {
    weekNumber: 5,
    lessonTitle: "Customer Service, Crisis Response & Moderation",
    videoUrl: "https://www.youtube.com/watch?v=wcq08_rMKtw",
  },
  {
    weekNumber: 6,
    lessonTitle: "Ad Platforms, Campaign Structure & Targeting",
    videoUrl: "https://www.youtube.com/watch?v=2ZnFPJ8yYW8",
  },
  {
    weekNumber: 6,
    lessonTitle: "Ad Creative, Budgeting, Testing & Optimization",
    videoUrl: "https://www.youtube.com/watch?v=HTVKLyHu5FU",
  },
  {
    weekNumber: 7,
    lessonTitle: "Key Metrics & Analytics Tools",
    videoUrl: "https://www.youtube.com/watch?v=aRnK_UQc3wY",
  },
  {
    weekNumber: 7,
    lessonTitle: "Interpreting Data, Calculating ROI & Reporting",
    videoUrl: "https://www.youtube.com/watch?v=m6yGF3Z8Ve0",
  },
  {
    weekNumber: 8,
    lessonTitle: "Influencer Identification, Vetting & Partnerships",
    videoUrl: "https://www.youtube.com/watch?v=tDo2sBEGpf4",
  },
  {
    weekNumber: 8,
    lessonTitle: "Video Strategy & Capstone Preparation",
    videoUrl: "https://www.youtube.com/watch?v=Tld_2Vw50XE",
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
