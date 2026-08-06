import { QueryInterface } from "sequelize";

const COURSE_SLUG = "digital-marketing";
const WEEK_NUMBER = 5;
const LESSON_TITLE = "Google Ads Campaign Types & Quality Score";

const PLACEHOLDER_CONTENT =
  "Search, display, and shopping campaigns compared, plus how keyword bidding and Quality Score together determine cost and position.";

// Same pattern as the other digital-marketing content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Welcome to Module 4. SEO, which we covered in week three, builds valuable reach gradually over months. This week, we cover the channel that delivers results immediately: paid advertising, and specifically, Google Ads — the dominant platform for capturing people at the exact moment they\'re actively searching.\n\n## Google Ads Fundamentals\n\nGoogle Ads offers several distinct campaign types, and understanding which one fits a given goal genuinely matters before spending any real budget.\n\n**Search campaigns** show text ads directly within Google\'s search results, specifically to people actively typing in a relevant query — the most direct, high-intent format available, since you\'re reaching someone at the exact moment they\'re genuinely looking for something related to what you offer.\n\n**Display campaigns** show visual ads across a vast network of partner websites and apps, generally better suited to building awareness among people who aren\'t actively searching in that specific moment, rather than driving immediate conversions.\n\n**Shopping campaigns** show product listings, complete with images and pricing, directly within search results — particularly valuable for e-commerce businesses selling specific, identifiable products.\n\nFor most of the local businesses you\'ll work with, search campaigns tend to offer the clearest, most direct route to genuinely qualified leads, precisely because they capture existing, active intent rather than trying to create interest from scratch.\n\n## Keyword Bidding and Quality Score\n\nSearch campaigns work through **keyword bidding**: you specify which search terms should trigger your ad, and you set a maximum amount you\'re willing to pay each time someone actually clicks it — a system called **pay-per-click, or PPC**.\n\nAd position and actual cost aren\'t determined by bid amount alone, however. Google also calculates a **Quality Score**, based on your ad\'s relevance to the specific keyword, your expected click-through rate, and the quality and relevance of the landing page the ad actually leads to. A genuinely high Quality Score can mean paying meaningfully less per click than a competitor with a lower score, even while achieving a better ad position — a real, direct incentive to build genuinely relevant, well-targeted campaigns rather than simply outbidding competitors on raw budget alone.\n\n## Bringing It Together\n\nThis lesson covered the major Google Ads campaign types and when each one genuinely fits, and how keyword bidding and Quality Score together determine both cost and ad position. Understanding these two fundamentals is what lets the next lesson\'s campaign structure and budget decisions actually work well.\n\nNext lesson turns to structuring a campaign effectively, writing genuinely compelling ad copy, choosing between automated and manual bidding, and setting up conversion tracking so you actually know whether the spend is working.';

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
