import { QueryInterface } from "sequelize";

const COURSE_SLUG = "digital-marketing";
const WEEK_NUMBER = 3;
const LESSON_TITLE = "Off-Page, Technical & Local SEO";

const PLACEHOLDER_CONTENT =
  "Backlinks and domain authority, site speed and sitemaps, and optimizing a Google Business Profile for local search.";

// Same pattern as the other digital-marketing content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last lesson covered how search engines work and everything you directly control on your own page — keyword research, meta tags, content structure. This lesson turns to the factors outside your own website, the technical infrastructure that quietly determines whether your content even gets a fair chance, and local SEO specifically.\n\n## Off-Page SEO\n\n**Off-page SEO** covers factors outside your own website that influence how search engines judge its authority. The most important of these is **backlinks** — other websites linking to yours. Search engines generally treat a link from another site as a vote of confidence, and links from genuinely reputable, relevant sites carry considerably more weight than links from low-quality or entirely unrelated ones.\n\n**Domain authority** is a composite score, calculated by third-party tools, estimating a site\'s overall likely ranking strength, based heavily on its backlink profile. Building genuine off-page authority takes real time, and it comes primarily through creating content genuinely worth linking to, building real relationships within an industry, and earning legitimate media or blog coverage — not through quick, artificial shortcuts, which search engines have become increasingly effective at detecting and penalizing.\n\n## Technical SEO Basics\n\n**Technical SEO** ensures a website\'s underlying infrastructure doesn\'t quietly get in the way of otherwise strong content and authority.\n\n**Site speed** matters directly, since a slow-loading page frustrates real visitors and is explicitly, directly factored into search engine ranking decisions. **Mobile-friendliness** is essential given how much search traffic today comes from mobile devices — a site that displays poorly on a phone screen is genuinely penalized in rankings. A **sitemap** is a structured file explicitly listing a site\'s pages, helping search engines discover and properly index content more efficiently, particularly valuable for larger sites.\n\n## Local SEO\n\nFor most of the small and mid-sized businesses you\'ll work with, **local SEO** deserves particular, real attention. A properly claimed and complete **Google Business Profile** — including accurate business hours, address, photos, and genuine customer reviews — is often what determines whether a business appears in the specific map results and local search listings that a great many nearby customers actually rely on when searching for a business genuinely near them.\n\nLocal SEO also benefits from consistent business information across the web, and from genuinely, actively encouraging satisfied customers to leave honest reviews — both of which meaningfully signal trustworthiness to search engines evaluating a local business.\n\n## Bringing It Together\n\nToday we covered the full range of SEO practice — off-page, technical, and local — that together with last lesson\'s on-page work determine whether a business gets found by the customers actively searching for exactly what it offers. SEO is a genuinely long-term channel; results build steadily over months, not overnight, which is precisely why it deserves early, deliberate strategic priority rather than being treated as an afterthought.\n\nFor your assignment, conduct real keyword research for a business and propose specific on-page optimization changes based on what you find. For your practical exercise, optimize a sample webpage\'s meta tags, content, and headers, applying everything covered across these two lessons.\n\nNext week, we move into Module 3: Content Marketing and Email Marketing — the channels that turn search-driven visibility into genuine, ongoing relationships.';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const [rows] = await queryInterface.sequelize.query(
      `SELECT l.id AS lesson_id
       FROM lessons l
       JOIN modules m ON m.id = l.module_id
       JOIN courses c ON c.id = m.course_id
       WHERE c.slug = ? AND m.week_number = ? AND l.title = ?`,
      { replacements: [COURSE_SLUG, WEEK_NUMBER, LESSON_TITLE] },
    );
    const row = (rows as { lesson_id: string }[])[0];
    if (!row) {
      throw new Error(`Could not find lesson "${LESSON_TITLE}" (week ${WEEK_NUMBER}) for ${COURSE_SLUG}`);
    }

    await queryInterface.sequelize.query(`UPDATE lessons SET content = ? WHERE id = ?`, {
      replacements: [FULL_CONTENT, row.lesson_id],
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE lessons l
       SET content = ?
       FROM modules m, courses c
       WHERE l.module_id = m.id AND m.course_id = c.id
         AND c.slug = ? AND m.week_number = ? AND l.title = ?`,
      { replacements: [PLACEHOLDER_CONTENT, COURSE_SLUG, WEEK_NUMBER, LESSON_TITLE] },
    );
  },
};
