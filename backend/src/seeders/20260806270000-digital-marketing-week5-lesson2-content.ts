import { QueryInterface } from "sequelize";

const COURSE_SLUG = "digital-marketing";
const WEEK_NUMBER = 5;
const LESSON_TITLE = "Campaign Structure, Budgeting & Conversion Tracking";

const PLACEHOLDER_CONTENT =
  "Structuring campaigns into ad groups and ads, choosing an automated or manual bidding strategy, and tracking conversions.";

// Same pattern as the other digital-marketing content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last lesson covered the major Google Ads campaign types and how keyword bidding and Quality Score together determine cost and position. This lesson turns to putting that into an actual, well-structured campaign — with a real budget and a way to measure whether it\'s actually working.\n\n## Campaign Structure and Ad Copywriting\n\nA well-organized Google Ads account follows a clear hierarchy: a **campaign**, defining an overall budget and objective; **ad groups** within that campaign, each organized around a tightly related set of keywords; and the actual **ads** themselves within each ad group.\n\nTightly themed ad groups — rather than mixing many loosely related keywords together in one broad group — allow for genuinely relevant, specific ad copy for each distinct group, which directly supports the Quality Score we discussed last lesson.\n\nEffective **ad copywriting** for search ads follows many of the same principles we covered for email subject lines and social captions: be specific rather than generic, directly address the searcher\'s actual need, and include one genuinely clear call to action. Given the tightly limited character count search ads allow, every single word needs to earn its place.\n\n## Budgeting and Bidding Strategies\n\nGoogle Ads offers both **automated bidding**, where the platform\'s own algorithm optimizes bids to meet a stated goal, generally the sensible, recommended starting point for beginners, and **manual bidding**, offering direct, granular control but requiring meaningfully more experience to use well.\n\nA genuinely important practical principle, especially for beginners: start with a modest daily budget, and monitor real, actual performance closely before meaningfully scaling spend upward. This mirrors the disciplined, incremental testing approach used in paid social advertising, and it\'s precisely the approach you\'ll practice hands-on in this week\'s practical exercise, using free trial advertising credits.\n\n## Conversion Tracking Basics\n\nNone of this budget and bidding effort means anything without properly measuring what it actually produces. **Conversion tracking** connects an actual ad click through to a genuine, meaningful outcome — a completed purchase, a submitted form, a phone call — typically through a small tracking code installed directly on a business\'s website.\n\nWithout properly configured conversion tracking, you genuinely only know how many people clicked an ad, not whether any of them actually became real customers — a critical, meaningful gap that undermines honest budget decisions. We\'ll cover this specific measurement discipline in considerably more depth next week, when we move fully into marketing analytics.\n\n## Bringing It Together\n\nToday we covered how to structure a campaign effectively and write genuinely compelling ad copy, choosing between automated and manual bidding, and the basics of conversion tracking. Combined with last lesson\'s campaign types and Quality Score, paid advertising complements the organic channels from the previous two weeks by delivering immediate, deliberately targeted reach, precisely when a business genuinely needs faster results than SEO alone can reasonably provide.\n\nFor your assignment, create a complete Google Ads campaign plan for a State business. For your practical exercise, set up a sample Google Ads campaign using free trial credits, applying everything covered across these two lessons — structure, keyword selection, and ad copy.\n\nNext week, we move into Module 5: Marketing Analytics and Measurement, where we cover exactly how to properly evaluate whether all of this — SEO, content, email, and paid advertising together — is genuinely working.';

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
