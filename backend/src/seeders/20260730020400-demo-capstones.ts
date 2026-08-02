import crypto from "crypto";
import { QueryInterface } from "sequelize";

interface CapstoneSeed {
  slug: string;
  title: string;
  description: string;
}

const CONTENT: CapstoneSeed[] = [
  {
    slug: "cyber-security-fundamentals",
    title: "Security Consulting Capstone",
    description:
      "Act as a security consultant for a mid-sized manufacturing company here in the State that's had a minor security incident and wants to seriously improve its cybersecurity posture. Produce a security audit report, a remediation roadmap, an incident response plan, and a final presentation. Treat this as one connected story, not twelve separate topics: your audit findings should directly drive your remediation roadmap, your risk assessment should justify your prioritization, and your incident response plan should be tailored to this company's actual environment and constraints. Scope realistically for a fifty-employee manufacturing company with a limited IT budget.",
  },
  {
    slug: "digital-marketing",
    title: "Integrated Digital Marketing Strategy Capstone",
    description:
      "Build a complete digital marketing strategy for a business, integrating strategy, SEO, content and email, paid advertising, and analytics into one coherent plan. Treat this as one connected story: your buyer personas and channel strategy should directly justify your specific channel choices, your SEO and content work should build the awareness that email and paid advertising then convert, and your analytics plan should honestly measure whether the integrated strategy is working. A focused strategy across three or four well-chosen channels, executed thoroughly, will demonstrate far stronger understanding than a thin attempt to cover every channel at once.",
  },
  {
    slug: "gis-and-drone-mapping",
    title: "Sustainable Agriculture GIS Capstone",
    description:
      "Support sustainable agriculture zone planning through a comprehensive GIS analysis, a full series of thematic maps, a complete drone survey report, and clear implementation recommendations. Treat this as one connected story: your data collection choices should directly support your remote sensing and drone analysis, which in turn feeds your spatial analysis, all clearly communicated through thematic mapping and stakeholder-focused reporting. Scope this realistically — a focused, well-executed analysis of one specific area or resource constraint will serve you and any real stakeholders far better than a thin attempt to cover everything at once.",
  },
  {
    slug: "renewable-energy-digital-systems",
    title: "Community Renewable Energy System Capstone",
    description:
      "Design and plan a complete renewable energy system for a community center, school, or health facility here in the State, explicitly serving as a demonstration and training facility for the surrounding community. Treat this as one connected story: your energy audit and load calculation should build on proper sizing methodology, your system design should incorporate sound battery storage decisions, your monitoring design should apply solid dashboard principles, your installation plan should apply safety and sequencing considerations, and your community engagement plan should be adapted for a genuinely broader community audience, not a single customer.",
  },
  {
    slug: "social-media-management-content",
    title: "Tourism Business Social Media Capstone",
    description:
      "Build a complete social media presence for a new tourism business right here in the State — hotels, cultural tours, food experiences — starting from zero existing followers. Treat this as one connected story, not disconnected weekly assignments: your strategy document should draw directly on audience personas and positioning work, your content package should apply ideation, calendar planning, and visual/video production skills, your ad campaign plan should apply targeting and budgeting, and your analytics dashboard should apply sound reporting principles.",
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const now = new Date();

    const slugs = CONTENT.map((c) => c.slug);
    const [courses] = await queryInterface.sequelize.query(
      `SELECT id, slug, duration_weeks FROM courses WHERE slug IN (${slugs.map(() => "?").join(",")})`,
      { replacements: slugs },
    );
    const courseBySlug = new Map(
      (courses as { id: string; slug: string; duration_weeks: number }[]).map((c) => [c.slug, c]),
    );

    const capstoneRows = CONTENT.filter((c) => courseBySlug.has(c.slug)).map((c) => {
      const course = courseBySlug.get(c.slug)!;
      const dueDate = new Date(now.getTime() + course.duration_weeks * 7 * 24 * 60 * 60 * 1000);
      return {
        id: crypto.randomUUID(),
        course_id: course.id,
        title: c.title,
        description: c.description,
        due_date: dueDate,
        file_required: true,
        grading_rubric: null,
        points_total: 100,
        created_at: now,
        updated_at: now,
      };
    });
    if (capstoneRows.length === 0) return;

    await queryInterface.bulkInsert("capstones", capstoneRows);
  },

  down: async (queryInterface: QueryInterface) => {
    const slugs = CONTENT.map((c) => c.slug);
    const [courses] = await queryInterface.sequelize.query(
      `SELECT id FROM courses WHERE slug IN (${slugs.map(() => "?").join(",")})`,
      { replacements: slugs },
    );
    const courseIds = (courses as { id: string }[]).map((c) => c.id);
    if (courseIds.length === 0) return;

    await queryInterface.bulkDelete("capstones", { course_id: courseIds });
  },
};
