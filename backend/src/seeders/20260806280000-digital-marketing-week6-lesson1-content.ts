import { QueryInterface } from "sequelize";

const COURSE_SLUG = "digital-marketing";
const WEEK_NUMBER = 6;
const LESSON_TITLE = "Google Analytics & Attribution Models";

const PLACEHOLDER_CONTENT =
  "Traffic sources, behavior, and conversions in Google Analytics, plus last-click, first-click, and multi-touch attribution.";

// Same pattern as the other digital-marketing content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Welcome to Module 5. Over the past four weeks, we\'ve covered SEO, content, email, and paid advertising. This week, we cover the discipline that ties all of them together and honestly answers the question every business owner genuinely wants answered: is any of this actually working?\n\n## Google Analytics Fundamentals\n\n**Google Analytics** is the most widely used web analytics platform, and understanding its core reporting categories is essential for any digital marketer.\n\n**Traffic sources** show precisely where website visitors are actually coming from — organic search, connecting directly back to the SEO work from week three; paid search, connecting to the Google Ads work from last week; direct traffic, people typing the address in directly or using a saved bookmark; referral traffic from other websites; and social traffic from platforms like Facebook or Instagram.\n\n**Behavior** reporting shows what visitors actually do once they arrive — which pages they view, how long they stay, and where they typically leave the site.\n\n**Conversions** track whether visitors complete meaningful, defined actions — exactly the conversion tracking concept we introduced last week, now viewed in considerably more analytical depth.\n\nTogether, these three categories answer the essential question underlying all of digital marketing: where are people coming from, what are they actually doing once they arrive, and are they ultimately converting.\n\n## Setting Up Conversion Tracking and Goals\n\nBuilding directly on last week\'s introduction, properly configuring **goals** within Google Analytics — a completed purchase, a submitted contact form, a specific number of pages viewed in one visit — allows every single traffic source to be evaluated against real, genuine outcomes, not just raw visit counts.\n\nThis distinction matters enormously in practice: a channel driving a large volume of website visits that rarely convert into anything meaningful is, from a genuine business perspective, often less valuable than a channel driving a smaller volume of visits that convert reliably and consistently. Without properly configured goals, this crucial difference remains completely invisible.\n\n## Marketing Attribution Models\n\nHere\'s a genuinely important complication: a real customer\'s actual path to conversion very often involves multiple different channels — perhaps they first discovered a business through an organic search result, later saw a paid ad, and finally converted after clicking a link in a marketing email. Which channel genuinely deserves credit for that resulting sale?\n\nThis is the question **attribution models** attempt to answer. **Last-click attribution** gives full credit entirely to the final channel touched before conversion — simple to understand and to implement, but it can seriously undervalue the awareness-stage channels, like content and SEO, that meaningfully contributed earlier in that same customer\'s actual journey. **First-click attribution** instead gives full credit to the very first touchpoint. **Multi-touch attribution** distributes credit more fairly across every touchpoint involved in that full journey.\n\nThere\'s no single, universally correct attribution model for every business — the genuinely important discipline is choosing one deliberately, understanding its real limitations, and applying it consistently, rather than switching models opportunistically whenever a different one happens to produce a more flattering-looking result for a particular channel.\n\n## Bringing It Together\n\nThis lesson covered how to properly read Google Analytics — traffic sources, behavior, conversions — how to configure meaningful goals, and how to fairly attribute credit across multiple different marketing touchpoints using an attribution model chosen deliberately and applied consistently.\n\nNext lesson turns to presenting all of this clearly through a dashboard, and the essential financial metrics — ROI, CAC, and LTV — that connect marketing activity directly back to real business value.';

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
