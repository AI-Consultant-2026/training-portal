import { QueryInterface } from "sequelize";

interface LessonVideoSeed {
  weekNumber: number;
  lessonTitle: string;
  videoUrl: string;
}

const COURSE_SLUG = "cyber-security-fundamentals";

// The 20260918120000 revision retargeted weeks 1, 2, 5, 6, 8, and 10 to entirely
// different topics and nulled their now-mismatched video_url values (the old videos
// belonged to Ethical Hacking / Pentest Tools / Digital Forensics / CIA Triad & OWASP,
// not the new Password & Auth / Phishing & Social Engineering / Malware & Ransomware /
// Access Control & IAM / Security Awareness content sitting there now), and it inserted
// 12 brand-new lessons across weeks 13-18 (the Oil & Gas, Banking, and Telecom sector
// pathways) that never had videos at all. This seeder fills in all 24 of those lessons.
// Weeks 3, 4, 7, 9, 11, and 12 already have correct videos from 20260807180000 and are
// left untouched.
//
// Every video below was found via web search and confirmed real + embeddable via the
// YouTube oEmbed endpoint (curl https://www.youtube.com/oembed?url=...&format=json)
// before being included here, mirroring 20260807180000-cyber-security-lesson-videos.ts
// and 20260819240000-hse-lesson-videos.ts.
const CONTENT: LessonVideoSeed[] = [
  {
    weekNumber: 1,
    lessonTitle: "What Cybersecurity Protects, and From Whom",
    videoUrl: "https://www.youtube.com/watch?v=sONRYl1z8gQ",
  },
  {
    weekNumber: 1,
    lessonTitle: "Vulnerability Management and Thinking in Risk",
    videoUrl: "https://www.youtube.com/watch?v=zAo7iVPb2mI",
  },
  {
    weekNumber: 2,
    lessonTitle: "Passwords, Credential Theft, and How Accounts Get Compromised",
    videoUrl: "https://www.youtube.com/watch?v=aqkSdZuGkFM",
  },
  {
    weekNumber: 2,
    lessonTitle: "MFA, Authentication vs. Authorisation, and Secure Practices",
    videoUrl: "https://www.youtube.com/watch?v=wKjAuRtC0s8",
  },
  {
    weekNumber: 5,
    lessonTitle: "Phishing, Spear Phishing, and Business Email Compromise",
    videoUrl: "https://www.youtube.com/watch?v=sXAsQgEyY6w",
  },
  {
    weekNumber: 5,
    lessonTitle: "Smishing, Vishing, and Building Organisational Resistance",
    videoUrl: "https://www.youtube.com/watch?v=-CpsP_peJ_U",
  },
  {
    weekNumber: 6,
    lessonTitle: "Malware: Types, Delivery, and Endpoint Protection",
    videoUrl: "https://www.youtube.com/watch?v=N8zvaS-xSPI",
  },
  {
    weekNumber: 6,
    lessonTitle: "Ransomware: How It Works, and Response Across Three Sectors",
    videoUrl: "https://www.youtube.com/watch?v=jEnMEM-Uh_8",
  },
  {
    weekNumber: 8,
    lessonTitle: "Least Privilege, Role-Based Access, and Privileged Accounts",
    videoUrl: "https://www.youtube.com/watch?v=130ioey4isw",
  },
  {
    weekNumber: 8,
    lessonTitle: "Insider Threats, Joiner/Mover/Leaver, and Contractor Access",
    videoUrl: "https://www.youtube.com/watch?v=5GLNKHJCSkg",
  },
  {
    weekNumber: 10,
    lessonTitle: "Cyber Hygiene: Passwords, Devices, and Email in Daily Practice",
    videoUrl: "https://www.youtube.com/watch?v=tZ0XWpEp8LU",
  },
  {
    weekNumber: 10,
    lessonTitle: "Reporting, Remote Work, and Physical Security Awareness",
    videoUrl: "https://www.youtube.com/watch?v=88VS4SOHm70",
  },
  {
    weekNumber: 13,
    lessonTitle: "IT vs OT: Why Oil & Gas Security Works Differently",
    videoUrl: "https://www.youtube.com/watch?v=ucLrnaAgym4",
  },
  {
    weekNumber: 13,
    lessonTitle: "SCADA, Industrial Control Systems, and Nigeria's Oil & Gas Landscape",
    videoUrl: "https://www.youtube.com/watch?v=jOahDrs33VI",
  },
  {
    weekNumber: 14,
    lessonTitle: "Remote Access, Contractor Risk, and Production System Security",
    videoUrl: "https://www.youtube.com/watch?v=T8zt2yUWdbM",
  },
  {
    weekNumber: 14,
    lessonTitle: "Ransomware, Pipeline Security, and Managing OT Risk",
    videoUrl: "https://www.youtube.com/watch?v=w7CasqH5ebI",
  },
  {
    weekNumber: 15,
    lessonTitle: "Online Banking, Mobile Banking, and Account Takeover",
    videoUrl: "https://www.youtube.com/watch?v=PkHwqGt-_oI",
  },
  {
    weekNumber: 15,
    lessonTitle: "Payment-System Security and Transaction Monitoring",
    videoUrl: "https://www.youtube.com/watch?v=Svm6WGEg3hM",
  },
  {
    weekNumber: 16,
    lessonTitle: "Identity & Access Management and Financial Fraud",
    videoUrl: "https://www.youtube.com/watch?v=fuF7EUDy9sA",
  },
  {
    weekNumber: 16,
    lessonTitle: "Customer Data Protection and Social Engineering in Practice",
    videoUrl: "https://www.youtube.com/watch?v=eRoy_bT_0tI",
  },
  {
    weekNumber: 17,
    lessonTitle: "Mobile Network Security and Core Infrastructure",
    videoUrl: "https://www.youtube.com/watch?v=FI5l7QfTzFI",
  },
  {
    weekNumber: 17,
    lessonTitle: "SIM Fraud, Customer Data, and Physical Infrastructure",
    videoUrl: "https://www.youtube.com/watch?v=kwWAzoRDOA8",
  },
  {
    weekNumber: 18,
    lessonTitle: "Identity, Availability, and Insider Risk",
    videoUrl: "https://www.youtube.com/watch?v=vc60x7ZvqzY",
  },
  {
    weekNumber: 18,
    lessonTitle: "5G Security Fundamentals and Telecom Incident Response",
    videoUrl: "https://www.youtube.com/watch?v=nXDWFyTrz98",
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
