import { QueryInterface } from "sequelize";

const COURSE_SLUG = "digital-marketing";
const WEEK_NUMBER = 1;
const LESSON_TITLE = "Digital Marketing Channels Overview";

const PLACEHOLDER_CONTENT = "SEO, email, content, paid, and social channels compared.";

// Same pattern as 20260806180000 for lesson 1 -- the demo seeder (20260729020100)
// already inserted this lesson with placeholder content, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last lesson covered the marketing funnel — the lens we\'ll use throughout this course to evaluate any marketing activity. This lesson surveys the major channels themselves, where each one typically sits within that funnel, and the discipline of setting real goals before any of them get used.\n\n## Digital Marketing Channels Overview\n\nLet\'s survey the major channels you\'ll learn throughout this course, and where each one typically sits within the funnel we covered last lesson.\n\n**Search Engine Optimization, or SEO**, which we cover in depth next week, works primarily at the awareness and consideration stages — helping a business get found by people actively searching for what it offers.\n\n**Content marketing** — blogs, videos, guides — builds awareness and consideration by providing genuine value before ever asking for a sale, and it\'s a topic we\'ll cover in Module 3.\n\n**Email marketing**, also covered in Module 3, is especially powerful at the consideration, conversion, and loyalty stages, since it reaches people who\'ve already shown some real interest by giving you their contact information.\n\n**Paid advertising** — Google Ads, and the paid social advertising some of you may already know from a related course — can be deliberately targeted at any single funnel stage, which is exactly why understanding the funnel matters so much before you spend any actual advertising budget.\n\n**Analytics**, covered in Module 5, doesn\'t sit within any single funnel stage — it measures performance across all of them, and it\'s what tells you honestly whether your efforts are actually working.\n\nI want you to notice something important: these channels aren\'t independent, separate tools you use one at a time. A genuinely effective digital marketing strategy uses several of them together, deliberately, with each one supporting a specific stage of the same overall funnel for the same business.\n\n## Setting SMART Marketing Goals and KPIs\n\nBefore any of these channels get used effectively, you need real clarity on what you\'re actually trying to achieve. This is where **SMART goals** come in — goals that are Specific, Measurable, Achievable, Relevant, and Time-bound.\n\n"Get more customers" is not a SMART goal — it\'s a wish. "Generate 50 qualified leads through the website within the next three months" is a SMART goal — it\'s specific about the outcome, measurable through lead tracking, and bounded by a clear timeframe.\n\nOnce a goal is set, you need **Key Performance Indicators, or KPIs**, to track genuine progress toward it. If the goal is lead generation, relevant KPIs might include website traffic, conversion rate on a contact form, and cost per lead. If the goal is brand awareness for a new business, relevant KPIs might instead be reach, impressions, and branded search volume — how many people are searching for the business by name.\n\nI want you to hold onto a principle we\'ll return to constantly throughout this course: choose KPIs that genuinely match your specific goal, not whichever numbers happen to look impressive. A business with a goal of driving sales that instead reports only on social media follower growth is measuring the wrong thing entirely, however good that follower number might look on its own.\n\n## Bringing It Together\n\nToday we surveyed the major channels and where they typically sit within the funnel, and the discipline of setting SMART goals with genuinely matching KPIs before any real work begins. Combined with last lesson\'s funnel, every week from here forward will connect back to this foundation.\n\nFor your assignment, analyze the digital marketing funnel for a real business of your choosing, and identify specifically which channels they\'re using at each stage — awareness, consideration, conversion, and loyalty. For your practical exercise, conduct a full digital marketing audit for a provided business, examining their website and the digital channels they currently use, or fail to use.\n\nNext week, we go deep into our first specific channel: Search Engine Optimization.';

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
