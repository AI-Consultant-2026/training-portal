import { QueryInterface } from "sequelize";

const COURSE_SLUG = "digital-marketing";
const WEEK_NUMBER = 4;
const LESSON_TITLE = "Email List Building, Segmentation & Deliverability";

const PLACEHOLDER_CONTENT =
  "Growing an email list through genuine opt-in, segmenting and automating campaigns like a welcome series, and protecting deliverability and compliance.";

// Same pattern as the other digital-marketing content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last lesson covered how content marketing earns real trust and how a well-designed lead magnet turns that trust into an actual contact. This lesson turns to what happens once you have that contact: building the list the right way, segmenting it, designing campaigns that actually get read, and protecting deliverability.\n\n## Email Marketing Fundamentals\n\nOnce you have a contact\'s email address, ideally through a genuinely valuable lead magnet, **email marketing** becomes one of the highest-return channels available, precisely because you\'re reaching someone who has already shown real, voluntary interest.\n\n**List building** is the ongoing, continuous process of legitimately growing your email list — always through genuine opt-in, never through purchased lists, which typically produce poor results and, in many jurisdictions, carry real legal risk we\'ll address shortly.\n\n**Segmentation** means dividing your list into meaningful groups — by expressed interest, by purchase history, by where they are in the customer journey — so that each contact receives genuinely relevant messages, rather than everyone receiving the exact same generic broadcast regardless of their specific situation.\n\n**Automation** sets up email sequences that trigger automatically based on a specific action — a **welcome series**, sent automatically when someone first joins a list, is exactly what this week\'s assignment asks you to plan. A well-designed welcome series introduces the business, delivers genuine value, and gradually builds toward a first purchase, all without requiring anyone to manually send a single email.\n\n## Email Campaign Design and Copywriting\n\nEffective marketing emails share a few consistent qualities. A genuinely strong **subject line** is specific and creates real interest, since it directly determines whether an email even gets opened at all. The **body** should focus on one clear, primary message rather than trying to cram in several unrelated topics at once, and it should read in a genuinely personal, conversational voice, much like the caption-writing principles from social media content, rather than sounding like a stiff, impersonal corporate broadcast.\n\nEvery effective marketing email includes one clear **call to action** — a single, obvious next step, whether that\'s visiting a page, replying with a question, or making a purchase. Emails that ask for several different actions at once tend to see meaningfully lower results across all of them, since a reader\'s attention genuinely narrows once it\'s split across too many competing options.\n\n## Deliverability and Compliance\n\nNone of this matters if an email never actually reaches the inbox. **Deliverability** refers to whether a sent email actually lands in someone\'s inbox, rather than their spam folder. This is genuinely influenced by sender reputation, built over time through consistent, legitimate sending practices, and by list quality — sending regularly to genuinely engaged, opted-in contacts protects deliverability, while sending to old, unengaged, or purchased lists actively damages it.\n\n**Compliance** matters just as much. Most jurisdictions have specific laws governing commercial email — generally requiring clear, genuine consent to be added to a list, an easy, functioning way to unsubscribe, and honest, non-deceptive subject lines and sender information. Beyond the real legal requirement, respecting these principles is simply good practice: a list built through genuine consent is more engaged, performs better, and protects the sender\'s reputation far more reliably than one built through any shortcut.\n\n## Bringing It Together\n\nToday we covered how careful list building, thoughtful segmentation, and effective automation — combined with genuinely well-written campaigns and disciplined deliverability practices — turn last lesson\'s content-earned trust into an ongoing, direct, and highly effective relationship. Together, these connect the awareness work of content directly through to the conversion and loyalty stages of the funnel we introduced back in week one.\n\nFor your assignment, create a complete email marketing campaign plan for a welcome series, for a business of your choosing. For your practical exercise, design and write three complete marketing emails for a specified campaign, applying the copywriting and structure principles covered today.\n\nNext week, we move into Module 4: Paid Advertising, where we cover Google Ads and how to reach an audience directly through a deliberate media budget.';

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
