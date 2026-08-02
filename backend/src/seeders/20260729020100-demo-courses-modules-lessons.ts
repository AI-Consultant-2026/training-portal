import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { INSTRUCTOR_ID } from "../utils/seedIds";

interface LessonSeed {
  title: string;
  content: string;
  order: number;
  durationMinutes: number;
  videoUrl?: string;
  resources?: { links: { label: string; url: string }[] };
}

interface ModuleSeed {
  title: string;
  description: string;
  weekNumber: number;
  order: number;
  lessons: LessonSeed[];
}

interface CourseSeed {
  title: string;
  slug: string;
  description: string;
  durationWeeks: number;
  modules: ModuleSeed[];
}

const COURSES: CourseSeed[] = [
  {
    title: "Cyber Security Fundamentals",
    slug: "cyber-security-fundamentals",
    description:
      "A beginner-friendly, hands-on introduction to cybersecurity covering network security, ethical hacking, risk assessment, incident response, and cloud/data security.",
    durationWeeks: 12,
    modules: [
      {
        title: "Cybersecurity Foundations",
        description: "Threats, attack vectors, the CIA Triad, and the OWASP Top 10.",
        weekNumber: 1,
        order: 1,
        lessons: [
          {
            title: "History of Cybersecurity",
            content: "An overview of how cybersecurity threats and defenses have evolved.",
            order: 1,
            durationMinutes: 30,
          },
          {
            title: "The CIA Triad",
            content: "Confidentiality, Integrity, and Availability as the foundation of security.",
            order: 2,
            durationMinutes: 25,
            videoUrl: "https://www.youtube.com/watch?v=CIA-triad-explained",
            resources: {
              links: [
                { label: "NIST: Security and Privacy Controls", url: "https://csrc.nist.gov/publications/sp800" },
                { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    title: "Social Media Management & Content",
    slug: "social-media-management-content",
    description:
      "Build practical social media strategy, content creation, community management, and analytics skills for real businesses.",
    durationWeeks: 8,
    modules: [
      {
        title: "Social Media Fundamentals & Strategy",
        description: "Platform landscape, audience personas, and content pillars.",
        weekNumber: 1,
        order: 1,
        lessons: [
          {
            title: "Platform Comparison",
            content: "Facebook, Instagram, TikTok, LinkedIn, Twitter, and YouTube compared.",
            order: 1,
            durationMinutes: 20,
          },
          {
            title: "Audience Personas",
            content: "Researching and developing audience personas for a business.",
            order: 2,
            durationMinutes: 30,
          },
        ],
      },
    ],
  },
  {
    title: "GIS and Drone Mapping",
    slug: "gis-and-drone-mapping",
    description:
      "Learn geographic information systems, remote sensing, and drone survey mapping with real State use cases.",
    durationWeeks: 8,
    modules: [
      {
        title: "GIS Fundamentals & Spatial Concepts",
        description: "Raster vs. vector data, coordinate systems, and mapping principles.",
        weekNumber: 1,
        order: 1,
        lessons: [
          {
            title: "Raster vs. Vector Data",
            content: "Understanding the two core spatial data models used in GIS.",
            order: 1,
            durationMinutes: 25,
          },
          {
            title: "Coordinate Systems and Projections",
            content: "How GIS software represents locations on a curved earth in 2D maps.",
            order: 2,
            durationMinutes: 30,
          },
        ],
      },
    ],
  },
  {
    title: "Renewable Energy Digital Systems",
    slug: "renewable-energy-digital-systems",
    description:
      "Design solar PV systems, battery storage, and digital monitoring/control systems for renewable energy installations.",
    durationWeeks: 8,
    modules: [
      {
        title: "Renewable Energy Fundamentals",
        description: "Energy basics, renewable sources, and digital monitoring systems.",
        weekNumber: 1,
        order: 1,
        lessons: [
          {
            title: "Energy Basics",
            content: "Power, voltage, current, and efficiency explained for beginners.",
            order: 1,
            durationMinutes: 25,
          },
          {
            title: "Solar PV Technology Overview",
            content: "How solar photovoltaic systems convert sunlight into usable electricity.",
            order: 2,
            durationMinutes: 30,
          },
        ],
      },
    ],
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description:
      "Build practical, hands-on digital marketing skills across SEO, email, paid advertising, and analytics for real State businesses.",
    durationWeeks: 8,
    modules: [
      {
        title: "Digital Marketing Fundamentals & Strategy",
        description: "The marketing funnel, channel landscape, and buyer personas.",
        weekNumber: 1,
        order: 1,
        lessons: [
          {
            title: "The Digital Marketing Funnel",
            content: "Awareness, consideration, conversion, and loyalty stages explained.",
            order: 1,
            durationMinutes: 25,
          },
          {
            title: "Digital Marketing Channels Overview",
            content: "SEO, email, content, paid, and social channels compared.",
            order: 2,
            durationMinutes: 25,
          },
        ],
      },
    ],
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const now = new Date();

    const courseRows = COURSES.map((course) => ({
      id: crypto.randomUUID(),
      title: course.title,
      slug: course.slug,
      description: course.description,
      instructor_id: INSTRUCTOR_ID,
      duration_weeks: course.durationWeeks,
      level: "beginner",
      status: "published",
      metadata: JSON.stringify({}),
      created_at: now,
      updated_at: now,
    }));

    await queryInterface.bulkInsert("courses", courseRows);

    const moduleRows: Record<string, unknown>[] = [];
    const moduleIdsByCourseSlug: Record<string, string[]> = {};

    COURSES.forEach((course, courseIndex) => {
      const courseId = courseRows[courseIndex].id;
      moduleIdsByCourseSlug[course.slug] = [];

      course.modules.forEach((mod) => {
        const moduleId = crypto.randomUUID();
        moduleIdsByCourseSlug[course.slug].push(moduleId);
        moduleRows.push({
          id: moduleId,
          course_id: courseId,
          title: mod.title,
          description: mod.description,
          week_number: mod.weekNumber,
          order: mod.order,
          status: "published",
          created_at: now,
        });
      });
    });

    await queryInterface.bulkInsert("modules", moduleRows);

    const lessonRows: Record<string, unknown>[] = [];

    COURSES.forEach((course) => {
      course.modules.forEach((mod, modIndex) => {
        const moduleId = moduleIdsByCourseSlug[course.slug][modIndex];
        mod.lessons.forEach((lesson) => {
          lessonRows.push({
            id: crypto.randomUUID(),
            module_id: moduleId,
            title: lesson.title,
            content: lesson.content,
            video_url: lesson.videoUrl ?? null,
            resources: JSON.stringify(lesson.resources ?? {}),
            order: lesson.order,
            duration_minutes: lesson.durationMinutes,
            created_at: now,
          });
        });
      });
    });

    await queryInterface.bulkInsert("lessons", lessonRows);
  },

  down: async (queryInterface: QueryInterface) => {
    const slugs = COURSES.map((c) => c.slug);
    const [courses] = await queryInterface.sequelize.query(
      `SELECT id FROM courses WHERE slug IN (${slugs.map(() => "?").join(",")})`,
      { replacements: slugs },
    );
    const courseIds = (courses as { id: string }[]).map((c) => c.id);
    if (courseIds.length === 0) return;

    const [modules] = await queryInterface.sequelize.query(
      `SELECT id FROM modules WHERE course_id IN (${courseIds.map(() => "?").join(",")})`,
      { replacements: courseIds },
    );
    const moduleIds = (modules as { id: string }[]).map((m) => m.id);

    if (moduleIds.length > 0) {
      await queryInterface.bulkDelete("lessons", { module_id: moduleIds });
      await queryInterface.bulkDelete("modules", { id: moduleIds });
    }
    await queryInterface.bulkDelete("courses", { id: courseIds });
  },
};
