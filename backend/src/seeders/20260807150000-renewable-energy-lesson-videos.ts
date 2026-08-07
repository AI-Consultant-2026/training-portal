import { QueryInterface } from "sequelize";

interface LessonVideoSeed {
  weekNumber: number;
  lessonTitle: string;
  videoUrl: string;
}

const COURSE_SLUG = "renewable-energy-digital-systems";

// Every video below was found via web search and confirmed real + embeddable via the
// YouTube oEmbed endpoint (curl https://www.youtube.com/oembed?url=...&format=json)
// before being included here, mirroring 20260806010000-social-media-lesson-videos.ts.
// Week 1 Lesson 2 ("Solar PV Technology Overview") already had a video assigned from an
// earlier seeder and is left untouched by not including it here.
const CONTENT: LessonVideoSeed[] = [
  {
    weekNumber: 1,
    lessonTitle: "Energy Basics",
    videoUrl: "https://www.youtube.com/watch?v=fkmZ-IcEC6Y",
  },
  {
    weekNumber: 2,
    lessonTitle: "Real-World Solar Efficiency Factors",
    videoUrl: "https://www.youtube.com/watch?v=V0arzCpmIa4",
  },
  {
    weekNumber: 2,
    lessonTitle: "System Architectures and Solar Resource Assessment",
    videoUrl: "https://www.youtube.com/watch?v=pajmtcTTCJg",
  },
  {
    weekNumber: 3,
    lessonTitle: "Load Calculation and Component Sizing",
    videoUrl: "https://www.youtube.com/watch?v=cH_UlCo_r6Y",
  },
  {
    weekNumber: 3,
    lessonTitle: "Design Software, Safety, and Cost Analysis",
    videoUrl: "https://www.youtube.com/watch?v=dpqQuLe7Re4",
  },
  {
    weekNumber: 4,
    lessonTitle: "Battery Chemistry and Sizing",
    videoUrl: "https://www.youtube.com/watch?v=3wUea4gjRcs",
  },
  {
    weekNumber: 4,
    lessonTitle: "Battery Management, Smart Energy Systems, and Microgrids",
    videoUrl: "https://www.youtube.com/watch?v=ybBn3L6_Evw",
  },
  {
    weekNumber: 5,
    lessonTitle: "IoT Sensors, Communication Protocols, and SCADA",
    videoUrl: "https://www.youtube.com/watch?v=OF6mRt7qjys",
  },
  {
    weekNumber: 5,
    lessonTitle: "Real-Time Monitoring, Data Logging, and Dashboards",
    videoUrl: "https://www.youtube.com/watch?v=HUAFI0TtYnI",
  },
  {
    weekNumber: 6,
    lessonTitle: "Performance Metrics and Fault Diagnosis",
    videoUrl: "https://www.youtube.com/watch?v=2yyb2DDngWo",
  },
  {
    weekNumber: 6,
    lessonTitle: "Preventive Maintenance, Predictive Analytics, and Security",
    videoUrl: "https://www.youtube.com/watch?v=5nkgrsesDqs",
  },
  {
    weekNumber: 7,
    lessonTitle: "Site Assessment, Sequencing, and Installation Safety",
    videoUrl: "https://www.youtube.com/watch?v=uEwklZSrfyA",
  },
  {
    weekNumber: 7,
    lessonTitle: "Budgeting, Quality Assurance, and Commissioning",
    videoUrl: "https://www.youtube.com/watch?v=bglqvqbKlz4",
  },
  {
    weekNumber: 8,
    lessonTitle: "Integrated Systems and Renewable Energy Business Models",
    videoUrl: "https://www.youtube.com/watch?v=0wq5MpUftwE",
  },
  {
    weekNumber: 8,
    lessonTitle: "Customer Engagement, Scaling, and Capstone Planning",
    videoUrl: "https://www.youtube.com/watch?v=IthQ_fmuS2Y",
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
