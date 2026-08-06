import { QueryInterface } from "sequelize";

const COURSE_SLUG = "digital-marketing";
const WEEK_NUMBER = 7;
const LESSON_TITLE = "Marketing Automation, CRM & Journey Mapping";

const PLACEHOLDER_CONTENT =
  "Setting up automated workflows triggered by customer behavior, centralizing customer data in a CRM, and mapping the customer journey.";

// Same pattern as the other digital-marketing content seeders in this series -- this
// lesson was already inserted (with placeholder content) by
// 20260731010000-full-curriculum-modules-lessons.ts, so this seeder updates the
// already-seeded row in place rather than re-running that insert.
const FULL_CONTENT =
  'Last lesson covered the specific dynamics of e-commerce marketing — product listings, cart abandonment, upselling and cross-selling. This lesson turns to the systems that let those tactics run continuously and consistently at scale.\n\n## Marketing Automation Platforms\n\n**Marketing automation** uses software to run marketing actions automatically, triggered by specific customer behavior, rather than requiring a person to manually send every single message by hand.\n\nA **trigger** is the specific event that starts an automated sequence — a cart abandonment, a first purchase, a certain number of days of complete inactivity. A **workflow** is the actual sequence of automated actions that follows that trigger — for instance, a cart abandonment workflow might send a gentle reminder email one hour later, a slightly more urgent follow-up the next day, and finally, a modest discount offer after three full days of continued inactivity.\n\nThis directly builds on the email automation concepts we introduced back in week four, now applied specifically to e-commerce-relevant triggers. The genuine value of automation is that it operates continuously and consistently, reaching every single customer at exactly the right, relevant moment, without requiring any ongoing, repeated manual effort once it\'s properly set up.\n\n## Customer Relationship Management Basics\n\nA **CRM, or Customer Relationship Management system**, centralizes all of a business\'s customer data and interaction history — contact information, purchase history, and every past communication — in one single, unified place.\n\nFor marketing purposes, a CRM directly enables the segmentation we discussed back in week four, but with considerably richer, more complete data than email activity alone can provide: for instance, targeting customers who purchased a specific product category, but haven\'t made any further purchase within the past several months. A CRM also naturally supports the customer relationship extending well beyond marketing alone, into sales and genuine customer support — all working from that exact same shared, unified customer record.\n\n## Personalization and Customer Journey Mapping\n\n**Personalization** means tailoring marketing content and specific offers based on what\'s genuinely known about an individual customer — their past purchases, their expressed interests, or precisely where they currently sit in the buying journey — rather than sending every single contact the exact same generic, undifferentiated message.\n\nThis connects directly to **customer journey mapping**: documenting, genuinely specifically, the actual real path a customer takes from first becoming aware of a business all the way through to becoming a genuinely loyal, repeat customer, and identifying every specific touchpoint — a search result, an email, an ad, a product page — along that complete path. This is exactly what this week\'s practical exercise asks you to build.\n\nA well-constructed journey map reveals precisely where personalization and automation deliver the most genuine value — often at points in the journey where a customer might otherwise reasonably drop off or lose real interest without some deliberate, well-timed intervention.\n\n## Bringing It Together\n\nToday we covered how automation lets a small team operate at genuinely far greater scale and consistency than manual effort alone could ever achieve, how a CRM centralizes the customer data that makes meaningful segmentation and personalization genuinely possible, and how journey mapping ties every channel we\'ve covered in this course together into one single, coherent customer experience.\n\nFor your assignment, design a complete marketing automation workflow — an abandoned cart sequence is an excellent, genuinely relevant starting point — for an e-commerce business. For your practical exercise, map a complete customer journey for a business, identifying specific touchpoints across every relevant channel.\n\nNext week, in our final lecture, we bring every single channel from this entire course together into one integrated strategy, and we\'ll spend real, dedicated time preparing your capstone project.';

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
