import { QueryInterface } from "sequelize";

const COURSE_SLUG = "digital-marketing";
const WEEK_NUMBER = 3;
const LESSON_TITLE = "How Search Engines Work & On-Page SEO";

const PLACEHOLDER_CONTENT =
  "Crawling, indexing, and ranking explained, plus keyword research, meta tags, and content structure for on-page optimization.";

// Same pattern as the other digital-marketing content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Welcome to Module 2. Last week, we built a strategy identifying which channels deserve real investment. This week, we go deep on the channel that, for most local businesses, delivers the most consistent long-term value: Search Engine Optimization, or SEO.\n\n## How Search Engines Work\n\nBefore optimizing for search engines, you need a basic, working understanding of what they\'re actually doing. A search engine like Google continuously **crawls** the web — following links from page to page, discovering content. It then **indexes** what it finds, storing and organizing that content so it can be quickly retrieved later. Finally, when someone types a query, it **ranks** the indexed pages it judges most relevant and trustworthy for that specific search, in that specific order.\n\nGoogle\'s ranking decisions consider hundreds of factors, but they broadly reduce to two categories: **relevance** — does this page genuinely, substantively address what the searcher is actually looking for — and **authority** — is this a source that can genuinely be trusted, based on signals like the quality of its content and who else links to it. Everything we cover for the rest of this week exists to improve a page\'s standing on one or both of these two dimensions.\n\n## On-Page SEO\n\n**On-page SEO** covers everything you directly control on your own website to help both search engines and human visitors understand what a given page is actually about.\n\n**Keyword research** identifies the specific words and phrases real people actually type into a search engine when looking for what your business offers. Effective keyword research distinguishes between high-volume, highly competitive terms and more specific, so-called "long-tail" phrases — a phrase like "affordable tailor in Asaba" is far less competitive, and often converts considerably better, than a broad, generic term like "tailor," precisely because it signals clear, specific intent.\n\n**Meta tags** — particularly the title tag and meta description — are the actual text a searcher sees directly in search results, before ever clicking through to the page itself. A well-written title tag clearly includes the target keyword and genuinely, honestly communicates what the page offers, while a compelling meta description encourages the actual click.\n\n**Content structure** matters both for the searcher\'s experience and for how effectively search engines parse the page. Clear, properly hierarchical headings, genuinely substantive content that thoroughly addresses the search intent, and natural — never forced or repetitive — use of target keywords throughout, all directly support both goals at once.\n\n## Bringing It Together\n\nThis lesson covered how search engines fundamentally work — crawling, indexing, ranking on relevance and authority — and everything you directly control on your own page to improve both: keyword research, meta tags, and content structure.\n\nNext lesson turns to the factors outside your own website that also determine authority — backlinks and domain authority — plus the technical and local SEO practices that make sure your site\'s own infrastructure never quietly works against you.';

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
