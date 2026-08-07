import { QueryInterface } from "sequelize";

interface LessonVideoSeed {
  weekNumber: number;
  lessonTitle: string;
  videoUrl: string;
}

const COURSE_SLUG = "cyber-security-fundamentals";

// Every video below was found via web search and confirmed real + embeddable via the
// YouTube oEmbed endpoint (curl https://www.youtube.com/oembed?url=...&format=json)
// before being included here, mirroring 20260806010000-social-media-lesson-videos.ts,
// 20260807150000-renewable-energy-lesson-videos.ts, 20260807160000-gis-lesson-videos.ts,
// and 20260807170000-digital-marketing-lesson-videos.ts. Week 1 Lesson 2 ("The CIA Triad")
// already had a video from an earlier seeder and is left untouched. Note: Week 1 Lesson 2
// and Week 2 Lesson 1 share the identical title "The CIA Triad" (Week 2's lesson is a
// legitimate deeper revisit covering trade-offs between the three goals, not a duplicate) --
// the lookup below still resolves each unambiguously because it matches on weekNumber too.
const CONTENT: LessonVideoSeed[] = [
  {
    weekNumber: 1,
    lessonTitle: "History of Cybersecurity",
    videoUrl: "https://www.youtube.com/watch?v=FqOs2C2KJg8",
  },
  {
    weekNumber: 2,
    lessonTitle: "The CIA Triad",
    videoUrl: "https://www.youtube.com/watch?v=cMIGajqJ9gQ",
  },
  {
    weekNumber: 2,
    lessonTitle: "OWASP Top 10 and Career Paths",
    videoUrl: "https://www.youtube.com/watch?v=hs6O9mSaoRc",
  },
  {
    weekNumber: 3,
    lessonTitle: "The OSI Model",
    videoUrl: "https://www.youtube.com/watch?v=EzCWG1R14Ek",
  },
  {
    weekNumber: 3,
    lessonTitle: "TCP/IP and Network Segmentation",
    videoUrl: "https://www.youtube.com/watch?v=S2swWjQ0vNI",
  },
  {
    weekNumber: 4,
    lessonTitle: "Firewalls and IDS/IPS",
    videoUrl: "https://www.youtube.com/watch?v=G46XNYc9-3Y",
  },
  {
    weekNumber: 4,
    lessonTitle: "VPNs and Network Monitoring",
    videoUrl: "https://www.youtube.com/watch?v=zCEpl0Cov0k",
  },
  {
    weekNumber: 5,
    lessonTitle: "Hacker vs. Ethical Hacker",
    videoUrl: "https://www.youtube.com/watch?v=9K8Xn0y5CU4",
  },
  {
    weekNumber: 5,
    lessonTitle: "Pentest Frameworks and Reconnaissance",
    videoUrl: "https://www.youtube.com/watch?v=ChdUC32lsYQ",
  },
  {
    weekNumber: 6,
    lessonTitle: "Vulnerability Assessment and Tools",
    videoUrl: "https://www.youtube.com/watch?v=rY-yaAS6Pks",
  },
  {
    weekNumber: 6,
    lessonTitle: "Reporting Vulnerabilities Responsibly",
    videoUrl: "https://www.youtube.com/watch?v=6qsJt3_LXbY",
  },
  {
    weekNumber: 7,
    lessonTitle: "Risk Management Frameworks",
    videoUrl: "https://www.youtube.com/watch?v=hfcIlUfWqz0",
  },
  {
    weekNumber: 7,
    lessonTitle: "Identifying and Measuring Risk",
    videoUrl: "https://www.youtube.com/watch?v=kG6KwbfbtvU",
  },
  {
    weekNumber: 8,
    lessonTitle: "Compliance Frameworks and Auditing",
    videoUrl: "https://www.youtube.com/watch?v=grgO-Y1e7zc",
  },
  {
    weekNumber: 8,
    lessonTitle: "Business Continuity and Disaster Recovery",
    videoUrl: "https://www.youtube.com/watch?v=F-bUf0dtYvg",
  },
  {
    weekNumber: 9,
    lessonTitle: "The Six Phases of Incident Response",
    videoUrl: "https://www.youtube.com/watch?v=X4lPEpATNxg",
  },
  {
    weekNumber: 9,
    lessonTitle: "Monitoring, Alerting, and Prioritization",
    videoUrl: "https://www.youtube.com/watch?v=k9c1PBynVpA",
  },
  {
    weekNumber: 10,
    lessonTitle: "Digital Forensics and Chain of Custody",
    videoUrl: "https://www.youtube.com/watch?v=3qTQUVYaGGk",
  },
  {
    weekNumber: 10,
    lessonTitle: "Conducting a Post-Incident Review",
    videoUrl: "https://www.youtube.com/watch?v=DjH5IyoTokw",
  },
  {
    weekNumber: 11,
    lessonTitle: "IaaS, PaaS, and SaaS",
    videoUrl: "https://www.youtube.com/watch?v=FWneEKRs-Tg",
  },
  {
    weekNumber: 11,
    lessonTitle: "The Shared Responsibility Model",
    videoUrl: "https://www.youtube.com/watch?v=Y2dYkoiNhA4",
  },
  {
    weekNumber: 12,
    lessonTitle: "Data Classification and Encryption",
    videoUrl: "https://www.youtube.com/watch?v=K9Uz6Xfx4Ko",
  },
  {
    weekNumber: 12,
    lessonTitle: "Breach Notification and Capstone Planning",
    videoUrl: "https://www.youtube.com/watch?v=BWSiByBL4oo",
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
