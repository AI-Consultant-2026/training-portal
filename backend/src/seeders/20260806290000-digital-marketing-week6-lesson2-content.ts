import { QueryInterface } from "sequelize";

const COURSE_SLUG = "digital-marketing";
const WEEK_NUMBER = 6;
const LESSON_TITLE = "Dashboards, ROI, CAC & LTV";

const PLACEHOLDER_CONTENT =
  "Building a clear reporting dashboard and calculating ROI, Customer Acquisition Cost, and Lifetime Value.";

// Same pattern as the other digital-marketing content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last lesson covered how to read Google Analytics and how attribution models fairly credit multiple touchpoints in a customer\'s journey. This lesson turns to presenting that data clearly, and connecting it directly to real, honest business value through three essential financial metrics.\n\n## Dashboards and Reporting\n\nRaw analytics data, sitting inside a native platform interface, rarely communicates clearly to a business owner on its own. A well-designed **dashboard** consolidates the most relevant metrics into one clear, visual view — precisely the kind of deliverable this week\'s assignment asks you to build.\n\nAn effective marketing dashboard generally leads with performance against the SMART goals established back in week one, breaks down results clearly by channel, so a viewer can immediately see which specific investments are genuinely paying off, and highlights meaningful trends over time, not just a single isolated snapshot of current performance.\n\n## ROI, CAC, and LTV Calculations\n\nFinally, let\'s connect all of this directly back to real, genuine business value, using three essential financial metrics.\n\n**Return on investment, ROI**, compares the actual revenue a marketing effort generated against its total cost. **Customer Acquisition Cost, CAC**, calculates the average total cost of acquiring one single new customer — total marketing spend divided by the number of new customers actually acquired during that same period. **Lifetime Value, LTV**, estimates the total revenue a business can reasonably expect from one customer across their entire, complete relationship with that business, not merely their very first purchase.\n\nThese three metrics genuinely work together to reveal the full, honest picture. A high CAC can still represent excellent value if LTV is high enough to comfortably justify it — a business that spends more up front to acquire a customer who then remains loyal and continues purchasing for years is often making a genuinely sound, wise investment. Conversely, a low CAC paired with low LTV may still represent a considerably less healthy business than it initially appears, if those newly acquired customers rarely make any real, meaningful repeat purchase.\n\n## Bringing It Together\n\nToday we covered how to build a genuinely clear reporting dashboard, and the essential financial metrics that connect all of this marketing activity directly back to real, honest business value. Combined with last lesson\'s Google Analytics fundamentals and attribution models, this analytical discipline is what separates a marketer who\'s genuinely improving results over time from one who\'s simply guessing and hoping.\n\nFor your assignment, set up a complete Google Analytics reporting dashboard and template. For your practical exercise, analyze real website analytics data for a sample business and produce a genuine, complete insights report.\n\nNext week, we move into Module 6: E-commerce and Marketing Automation, where we apply everything covered so far to online selling specifically.';

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
