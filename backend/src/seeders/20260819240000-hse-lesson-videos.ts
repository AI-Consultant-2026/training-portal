import { QueryInterface } from "sequelize";

interface LessonVideoSeed {
  weekNumber: number;
  lessonTitle: string;
  videoUrl: string;
}

const COURSE_SLUG = "hse-fundamentals";

// Every video below was found via web search and confirmed real + embeddable via the
// YouTube oEmbed endpoint (curl https://www.youtube.com/oembed?url=...&format=json)
// before being included here, mirroring the *-lesson-videos.ts pattern used for the
// other 5 courses.
const CONTENT: LessonVideoSeed[] = [
  {
    weekNumber: 1,
    lessonTitle: "What Is HSE? Core Concepts and Why It Matters",
    videoUrl: "https://www.youtube.com/watch?v=2v2fGcHvXK4",
  },
  {
    weekNumber: 1,
    lessonTitle: "HSE in Nigeria's Oil & Gas Industry",
    videoUrl: "https://www.youtube.com/watch?v=7XMUOBxd8Mg",
  },
  {
    weekNumber: 2,
    lessonTitle: "Types of Hazards on Oil & Gas Sites",
    videoUrl: "https://www.youtube.com/watch?v=hkmsqi58g4Q",
  },
  {
    weekNumber: 2,
    lessonTitle: "Risk Assessment Methods (HIRA)",
    videoUrl: "https://www.youtube.com/watch?v=dJFdeRsfcfI",
  },
  {
    weekNumber: 3,
    lessonTitle: "Nigerian Oil & Gas HSE Regulations",
    videoUrl: "https://www.youtube.com/watch?v=4q3ia3E6AH0",
  },
  {
    weekNumber: 3,
    lessonTitle: "International Standards: ISO 45001",
    videoUrl: "https://www.youtube.com/watch?v=jzZuKptPUMo",
  },
  {
    weekNumber: 4,
    lessonTitle: "PPE Selection and Use",
    videoUrl: "https://www.youtube.com/watch?v=U9vMMzLx3sA",
  },
  {
    weekNumber: 4,
    lessonTitle: "Permit to Work Systems and Safe Work Procedures",
    videoUrl: "https://www.youtube.com/watch?v=y1nynqoKHPA",
  },
  {
    weekNumber: 5,
    lessonTitle: "Emergency Response Planning",
    videoUrl: "https://www.youtube.com/watch?v=8upsUbRZTQw",
  },
  {
    weekNumber: 5,
    lessonTitle: "Fire Safety and First Aid Basics",
    videoUrl: "https://www.youtube.com/watch?v=rzILK4c9Q7E",
  },
  {
    weekNumber: 6,
    lessonTitle: "Incident Classification and Reporting Procedures",
    videoUrl: "https://www.youtube.com/watch?v=QK-2gv5M2Og",
  },
  {
    weekNumber: 6,
    lessonTitle: "Root Cause Analysis Techniques",
    videoUrl: "https://www.youtube.com/watch?v=IRT42cT01LI",
  },
  {
    weekNumber: 7,
    lessonTitle: "Environmental Impact and Pollution Control",
    videoUrl: "https://www.youtube.com/watch?v=LuYTBN2eoeo",
  },
  {
    weekNumber: 7,
    lessonTitle: "Waste Management and Oil Spill Response",
    videoUrl: "https://www.youtube.com/watch?v=FjVvjjTH3KE",
  },
  {
    weekNumber: 8,
    lessonTitle: "Building a Safety Culture and Leadership",
    videoUrl: "https://www.youtube.com/watch?v=qV6rOUjZ5fU",
  },
  {
    weekNumber: 8,
    lessonTitle: "HSE Auditing, Inspection, and Career Pathways",
    videoUrl: "https://www.youtube.com/watch?v=TOm0XdUAxv8",
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
