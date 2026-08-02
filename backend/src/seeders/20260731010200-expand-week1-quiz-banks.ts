import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { AnswerSeed, QuestionSeed } from "./data/curriculumTypes";

interface CourseExpansion {
  slug: string;
  questions: QuestionSeed[];
}

function mc(text: string, answers: AnswerSeed[]): QuestionSeed {
  return { text, type: "multiple_choice", points: 1, explanation: null, answers };
}

function tf(text: string, isTrue: boolean): QuestionSeed {
  return {
    text,
    type: "true_false",
    points: 1,
    explanation: null,
    answers: [
      { text: "True", isCorrect: isTrue },
      { text: "False", isCorrect: !isTrue },
    ],
  };
}

function sa(text: string, explanation: string): QuestionSeed {
  return { text, type: "short_answer", points: 1, explanation, answers: [] };
}

const EXPANSIONS: CourseExpansion[] = [
  {
    slug: "cyber-security-fundamentals",
    questions: [
      mc("What was 'Creeper,' the program described in the lecture as one of the first computer viruses?", [
        { text: "A largely harmless program that displayed a playful message on infected computers", isCorrect: true },
        { text: "A ransomware strain that encrypted files for payment", isCorrect: false },
        { text: "A modern nation-state espionage tool", isCorrect: false },
      ]),
      mc("What real-world event in 1988 led directly to the creation of the first Computer Emergency Response Teams?", [
        { text: "The Morris Worm accidentally taking down about ten percent of the internet", isCorrect: true },
        { text: "The founding of OWASP", isCorrect: false },
        { text: "The passage of GDPR", isCorrect: false },
      ]),
      mc("According to the lecture, who is targeted by cyberattacks today, beyond huge multinational companies?", [
        { text: "Small businesses, local government offices, schools, and hospitals", isCorrect: true },
        { text: "Only national militaries and intelligence agencies", isCorrect: false },
        { text: "Nobody outside of the technology industry", isCorrect: false },
      ]),
      mc("What is malware, as defined in the lecture?", [
        { text: "Any program designed to damage, disrupt, or gain unauthorized access to a computer system", isCorrect: true },
        { text: "A formally certified security audit standard", isCorrect: false },
        { text: "A type of firewall rule", isCorrect: false },
      ]),
      mc("Which type of malware spreads on its own across networks without needing a human to click anything?", [
        { text: "A worm", isCorrect: true },
        { text: "A trojan", isCorrect: false },
        { text: "Spyware", isCorrect: false },
      ]),
      mc("Which type of malware disguises itself as legitimate software, like a fake 'free antivirus' download?", [
        { text: "A trojan", isCorrect: true },
        { text: "A worm", isCorrect: false },
        { text: "A virus", isCorrect: false },
      ]),
      mc("What is an 'attack vector,' as defined in the lecture?", [
        { text: "The way malware or an attacker actually gets into a system, such as an infected USB drive or a malicious email attachment", isCorrect: true },
        { text: "The formula for calculating risk as likelihood times impact", isCorrect: false },
        { text: "A type of encrypted network tunnel", isCorrect: false },
      ]),
      mc("According to the lecture, what is generally the best defense against ransomware?", [
        { text: "Good backup practices and basic security hygiene", isCorrect: true },
        { text: "Always paying the ransom immediately", isCorrect: false },
        { text: "Disconnecting the organization from the internet permanently", isCorrect: false },
      ]),
      mc("What makes phishing so effective, according to the lecture?", [
        { text: "Psychology, such as creating urgency or fear, rather than clever technology", isCorrect: true },
        { text: "It always bypasses every firewall automatically", isCorrect: false },
        { text: "It only targets large organizations with weak defenses", isCorrect: false },
      ]),
      mc("What is 'pretexting,' as described in the lecture?", [
        { text: "An attacker inventing a believable scenario, like posing as IT support, to manipulate someone", isCorrect: true },
        { text: "Leaving an infected USB drive somewhere it's likely to be found", isCorrect: false },
        { text: "Encrypting a victim's files and demanding payment", isCorrect: false },
      ]),
      mc("What is 'baiting,' as described in the lecture?", [
        { text: "Leaving an infected USB drive somewhere it's likely to be found and plugged in out of curiosity", isCorrect: true },
        { text: "Sending a fake email pretending to be from a bank", isCorrect: false },
        { text: "Encrypting a victim's files and demanding a ransom", isCorrect: false },
      ]),
      mc("According to the lecture, what is social engineering an umbrella term for?", [
        { text: "Any attack that manipulates human psychology rather than exploiting a technical flaw", isCorrect: true },
        { text: "Any attack that specifically targets network infrastructure hardware", isCorrect: false },
        { text: "A formally certified compliance framework", isCorrect: false },
      ]),
      tf("The lecture states that a computer science degree is required to be good at cybersecurity.", false),
      tf("By the 2000s, cybercrime had become organized, involving criminal groups and eventually nation-states.", true),
      tf("A single employee clicking the wrong link can undo the protection provided by even the most expensive security software, according to the lecture.", true),
      sa(
        "In one or two sentences, explain why the lecture treats malware, ransomware, phishing, and social engineering as related rather than separate, unrelated threats.",
        "These attack types often work together in a single attack — for example, a phishing message (social engineering) might be the attack vector that delivers ransomware — so understanding them as interconnected gives a more realistic picture of how real attacks unfold.",
      ),
    ],
  },
  {
    slug: "social-media-management-content",
    questions: [
      mc("In what year did Facebook launch, originally just for university students?", [
        { text: "2004", isCorrect: true },
        { text: "2010", isCorrect: false },
        { text: "2018", isCorrect: false },
      ]),
      mc("What did TikTok's international launch in 2018 fundamentally prove about audience attention, per the lecture?", [
        { text: "That short-form video, driven by an algorithm rather than who you follow, could dominate people's attention", isCorrect: true },
        { text: "That long-form video content always outperforms short-form video", isCorrect: false },
        { text: "That platforms without an algorithm attract larger audiences", isCorrect: false },
      ]),
      mc("According to the lecture, what transferable skills remain constant even as platforms rise, evolve, and decline?", [
        { text: "Understanding an audience, telling a compelling story, and building genuine engagement", isCorrect: true },
        { text: "Knowing the exact pixel dimensions required by each platform", isCorrect: false },
        { text: "Memorizing each platform's terms of service", isCorrect: false },
      ]),
      mc("Which platform is described as especially strong for reaching an older demographic and for local community engagement?", [
        { text: "Facebook", isCorrect: true },
        { text: "TikTok", isCorrect: false },
        { text: "LinkedIn", isCorrect: false },
      ]),
      mc("Which platform is described as the professional network, valuable for B2B businesses and recruitment?", [
        { text: "LinkedIn", isCorrect: true },
        { text: "Instagram", isCorrect: false },
        { text: "YouTube", isCorrect: false },
      ]),
      mc("Which platform is described as the second-largest search engine in the world after Google itself?", [
        { text: "YouTube", isCorrect: true },
        { text: "Twitter/X", isCorrect: false },
        { text: "Facebook", isCorrect: false },
      ]),
      mc("What is described as most people's very first strategic decision when managing social media for a business?", [
        { text: "Which platforms actually match where the target audience spends their time and attention", isCorrect: true },
        { text: "How many posts to publish per day", isCorrect: false },
        { text: "Which photo editing app to purchase", isCorrect: false },
      ]),
      mc("Which goal is described as 'getting more people to know the business exists'?", [
        { text: "Brand awareness", isCorrect: true },
        { text: "Lead generation", isCorrect: false },
        { text: "Customer service", isCorrect: false },
      ]),
      mc("If the goal is engagement, which KPIs does the lecture say should be tracked?", [
        { text: "Likes, comments, shares, and saves", isCorrect: true },
        { text: "Only total follower count", isCorrect: false },
        { text: "Only click-through rate", isCorrect: false },
      ]),
      mc("What are 'vanity metrics,' as described in the lecture?", [
        { text: "Metrics like a large follower count that feel good but don't always reflect real business value", isCorrect: true },
        { text: "Metrics that can only be tracked using paid third-party software", isCorrect: false },
        { text: "The specific KPIs used to measure lead generation", isCorrect: false },
      ]),
      mc("What comparison does the lecture use to illustrate that follower count alone can be misleading?", [
        { text: "50,000 followers with little engagement versus 2,000 highly engaged followers who actually buy regularly", isCorrect: true },
        { text: "Facebook's launch year versus TikTok's launch year", isCorrect: false },
        { text: "Reach versus impressions", isCorrect: false },
      ]),
      mc("What is this week's assignment, according to the lecture?", [
        { text: "Analyze three brands on social media and document observations about their strategy", isCorrect: true },
        { text: "Build a full 8-week content calendar", isCorrect: false },
        { text: "Design a paid advertising campaign", isCorrect: false },
      ]),
      tf("Using a social media platform personally as a consumer is described as the same skill as managing it professionally for a business.", false),
      tf("KPIs should be chosen based on which numbers look most impressive, according to the lecture.", false),
      tf("Being excellent on two well-chosen platforms is described as better than being mediocre on all six.", true),
      sa(
        "In one or two sentences, explain why the lecture says platform history and evolution matter for a social media manager's career.",
        "Platforms rise, evolve, and sometimes decline, but the underlying skills of understanding an audience, telling a compelling story, and building genuine engagement remain constant, so focusing on those transferable skills matters more than mastering any one platform's current features.",
      ),
    ],
  },
  {
    slug: "gis-and-drone-mapping",
    questions: [
      mc("What is a Geographic Information System (GIS), as defined in the lecture?", [
        { text: "A system designed to capture, store, analyze, and display data that has a location component", isCorrect: true },
        { text: "A type of drone used exclusively for aerial photography", isCorrect: false },
        { text: "A satellite that provides free imagery to the public", isCorrect: false },
      ]),
      mc("What is 'attribute data,' as described in the lecture?", [
        { text: "Additional information combined with location, such as soil quality or crop yield history alongside farm boundaries", isCorrect: true },
        { text: "The exact pixel resolution of a satellite image", isCorrect: false },
        { text: "The coordinate system a dataset uses", isCorrect: false },
      ]),
      mc("Which of the following is listed as a core component of a GIS, alongside spatial data, software, and hardware?", [
        { text: "People — skilled analysts who know how to ask the right questions", isCorrect: true },
        { text: "A dedicated satellite launch program", isCorrect: false },
        { text: "A government regulatory license", isCorrect: false },
      ]),
      mc("How does vector data represent features, per the lecture?", [
        { text: "Using precise points, lines, and polygons defined by exact geographic coordinates", isCorrect: true },
        { text: "As a grid of cells, or pixels, each holding a specific value", isCorrect: false },
        { text: "As a continuous, un-gridded surface with no defined boundaries", isCorrect: false },
      ]),
      mc("How does raster data represent information, per the lecture?", [
        { text: "As a grid of cells, or pixels, each holding a specific value, similar to a digital photograph", isCorrect: true },
        { text: "Using precise points, lines, and polygons", isCorrect: false },
        { text: "As a list of GPS coordinates with no visual structure", isCorrect: false },
      ]),
      mc("A specific well location would typically be represented in a GIS as which vector feature type?", [
        { text: "A point", isCorrect: true },
        { text: "A line", isCorrect: false },
        { text: "A polygon", isCorrect: false },
      ]),
      mc("A road would typically be represented in a GIS as which vector feature type?", [
        { text: "A line", isCorrect: true },
        { text: "A point", isCorrect: false },
        { text: "A raster cell", isCorrect: false },
      ]),
      mc("Which of the following is given as an example of data that is typically represented as raster, not vector?", [
        { text: "Satellite imagery, elevation data, and rainfall measurements", isCorrect: true },
        { text: "A local government area boundary", isCorrect: false },
        { text: "A specific well location", isCorrect: false },
      ]),
      mc("In agriculture, what can GIS combine to identify where irrigation infrastructure investment would deliver the greatest benefit?", [
        { text: "Soil quality data, historical rainfall patterns, and existing crop yield records", isCorrect: true },
        { text: "Only satellite imagery with no other data", isCorrect: false },
        { text: "Only population census data", isCorrect: false },
      ]),
      mc("In water resources, what can GIS model to inform where flood defenses would be most urgently needed?", [
        { text: "How flooding is likely to spread during heavy rainy seasons", isCorrect: true },
        { text: "The exact chemical composition of local water supplies", isCorrect: false },
        { text: "The number of GIS software licenses purchased by the government", isCorrect: false },
      ]),
      mc("What is QGIS, as introduced in the lecture?", [
        { text: "A completely free, professional-grade GIS software package", isCorrect: true },
        { text: "A paid, subscription-only GIS software package", isCorrect: false },
        { text: "A type of drone used for aerial surveys", isCorrect: false },
      ]),
      mc("What is the goal of this week's very first practical exercise in QGIS, according to the lecture?", [
        { text: "Simply comfort and familiarity with the interface itself", isCorrect: true },
        { text: "Producing a polished, publication-ready final map", isCorrect: false },
        { text: "Calibrating a drone's GPS accuracy", isCorrect: false },
      ]),
      tf("A GIS combines location data with additional attribute information to become a more powerful decision-making tool.", true),
      tf("Vector data stays crisp and precise no matter how far you zoom in, according to the lecture.", true),
      tf("According to the lecture, GIS applications like agriculture and water resource planning are purely academic exercises with no real-world value.", false),
      sa(
        "In one or two sentences, explain the practical rule of thumb the lecture gives for choosing between vector and raster data.",
        "If you can clearly answer where exactly a feature starts and ends, it should almost certainly be vector data; if the value varies gradually and continuously across an area with no sharp boundary, it should almost certainly be raster data.",
      ),
    ],
  },
  {
    slug: "renewable-energy-digital-systems",
    questions: [
      mc("What does 'power' measure, as defined in the lecture?", [
        { text: "The rate at which energy is used or produced, measured in watts", isCorrect: true },
        { text: "The electrical pressure that pushes current through a circuit", isCorrect: false },
        { text: "The percentage of input energy converted into useful output", isCorrect: false },
      ]),
      mc("What does 'voltage' measure, as defined in the lecture?", [
        { text: "The electrical pressure that pushes electric current through a circuit", isCorrect: true },
        { text: "The rate of electric charge flowing through a circuit", isCorrect: false },
        { text: "The rate at which energy is used or produced", isCorrect: false },
      ]),
      mc("What does 'current' measure, as defined in the lecture?", [
        { text: "The actual rate of electric charge flowing through a circuit, measured in amps", isCorrect: true },
        { text: "The electrical pressure pushing charge through a circuit", isCorrect: false },
        { text: "The percentage of energy lost as heat", isCorrect: false },
      ]),
      mc("What does 'efficiency' measure, as defined in the lecture?", [
        { text: "What percentage of input energy is actually converted into useful output energy, rather than lost as heat", isCorrect: true },
        { text: "The rate at which energy is produced, measured in watts", isCorrect: false },
        { text: "The electrical pressure in a circuit, measured in volts", isCorrect: false },
      ]),
      mc("A solar panel with 20 percent efficiency converts what percentage of the sunlight energy that hits it into usable electricity?", [
        { text: "20 percent", isCorrect: true },
        { text: "80 percent", isCorrect: false },
        { text: "100 percent", isCorrect: false },
      ]),
      mc("Which renewable source converts kinetic energy from moving air into electricity?", [
        { text: "Wind", isCorrect: true },
        { text: "Biomass", isCorrect: false },
        { text: "Geothermal", isCorrect: false },
      ]),
      mc("Which renewable source converts the energy of flowing or falling water into electricity?", [
        { text: "Hydro", isCorrect: true },
        { text: "Solar", isCorrect: false },
        { text: "Wind", isCorrect: false },
      ]),
      mc("Which renewable source harnesses the earth's own internal heat, requiring specific geological conditions?", [
        { text: "Geothermal", isCorrect: true },
        { text: "Biomass", isCorrect: false },
        { text: "Hydro", isCorrect: false },
      ]),
      mc("What is photovoltaic (PV) technology, as defined in the lecture?", [
        { text: "Technology that directly converts sunlight into electricity using semiconductor materials like silicon", isCorrect: true },
        { text: "Technology that stores excess electricity for later use at night", isCorrect: false },
        { text: "Technology that monitors real-time performance of an installed system", isCorrect: false },
      ]),
      mc("What are individual PV cells combined into, before multiple of those are combined into a complete array?", [
        { text: "Panels, also called modules", isCorrect: true },
        { text: "Microgrids", isCorrect: false },
        { text: "Charge controllers", isCorrect: false },
      ]),
      mc("What does battery storage solve, according to the lecture?", [
        { text: "The challenge that solar panels only generate electricity while the sun is actually shining", isCorrect: true },
        { text: "The challenge of converting DC power into AC power", isCorrect: false },
        { text: "The challenge of connecting a system to the centralized grid", isCorrect: false },
      ]),
      mc("What is a microgrid, as defined in the lecture?", [
        { text: "A self-contained, localized energy system capable of operating independently from a larger centralized grid", isCorrect: true },
        { text: "A single small solar panel used for portable charging", isCorrect: false },
        { text: "A digital dashboard used to monitor system performance", isCorrect: false },
      ]),
      tf("Power equals voltage multiplied by current, according to the formula given in the lecture.", true),
      tf("A smart grid is described as a purely passive electrical grid with no real-time monitoring.", false),
      tf("The lecture states that the State experiences no meaningful seasonal variation in solar irradiance between wet and dry seasons.", false),
      sa(
        "In one or two sentences, explain why the lecture says solar is the most practical renewable option for the State specifically, compared to wind, hydro, or geothermal.",
        "Solar is broadly accessible and scalable given the State's abundant sunlight and comparatively lower upfront technical barriers, whereas wind needs consistent wind speeds, hydro needs suitable water flow, and geothermal needs specific geological conditions that aren't broadly available there.",
      ),
    ],
  },
  {
    slug: "digital-marketing",
    questions: [
      mc("What is the 'marketing funnel,' as described in the lecture?", [
        { text: "The sequence of stages a potential customer moves through, from first learning a business exists to becoming a repeat customer", isCorrect: true },
        { text: "A single advertising platform used for paid campaigns", isCorrect: false },
        { text: "A KPI used to measure email deliverability", isCorrect: false },
      ]),
      mc("At which funnel stage does someone first learn a business exists?", [
        { text: "Awareness", isCorrect: true },
        { text: "Consideration", isCorrect: false },
        { text: "Loyalty", isCorrect: false },
      ]),
      mc("At which funnel stage is someone actively comparing a business against alternatives?", [
        { text: "Consideration", isCorrect: true },
        { text: "Awareness", isCorrect: false },
        { text: "Conversion", isCorrect: false },
      ]),
      mc("At which funnel stage does someone actually take the desired action, like a purchase or sign-up?", [
        { text: "Conversion", isCorrect: true },
        { text: "Awareness", isCorrect: false },
        { text: "Consideration", isCorrect: false },
      ]),
      mc("What is the goal of the 'loyalty' or retention funnel stage, per the lecture?", [
        { text: "Keeping a customer engaged, satisfied, and likely to purchase again or refer others", isCorrect: true },
        { text: "Getting someone to learn the business exists for the very first time", isCorrect: false },
        { text: "Comparing the business against competitors", isCorrect: false },
      ]),
      mc("Per the lecture, which two funnel stages does SEO primarily work at?", [
        { text: "Awareness and consideration", isCorrect: true },
        { text: "Conversion and loyalty", isCorrect: false },
        { text: "Only the loyalty stage", isCorrect: false },
      ]),
      mc("Per the lecture, at which funnel stages is email marketing especially powerful?", [
        { text: "Consideration, conversion, and loyalty", isCorrect: true },
        { text: "Only awareness", isCorrect: false },
        { text: "Only conversion", isCorrect: false },
      ]),
      mc("What does the lecture say about how analytics fits into the marketing funnel?", [
        { text: "It doesn't sit within any single funnel stage; it measures performance across all of them", isCorrect: true },
        { text: "It only applies to the awareness stage", isCorrect: false },
        { text: "It replaces the need for a funnel model entirely", isCorrect: false },
      ]),
      mc("What are SMART goals, as defined in the lecture?", [
        { text: "Goals that are Specific, Measurable, Achievable, Relevant, and Time-bound", isCorrect: true },
        { text: "Goals set exclusively by a business's marketing software", isCorrect: false },
        { text: "Goals that only apply to paid advertising campaigns", isCorrect: false },
      ]),
      mc("Why is 'get more customers' described as not a SMART goal?", [
        { text: "It's a wish, not specific, measurable, or time-bound", isCorrect: true },
        { text: "It's too specific and narrow", isCorrect: false },
        { text: "It only applies to the loyalty funnel stage", isCorrect: false },
      ]),
      mc("If a business's goal is brand awareness for a new business, which KPIs does the lecture suggest?", [
        { text: "Reach, impressions, and branded search volume", isCorrect: true },
        { text: "Only email open rate", isCorrect: false },
        { text: "Only total ad spend", isCorrect: false },
      ]),
      mc("What mistake does the lecture describe when a business with a sales goal reports only on social media follower growth?", [
        { text: "Measuring the wrong thing entirely, since the KPI doesn't match the actual goal", isCorrect: true },
        { text: "Using a KPI that is illegal to track", isCorrect: false },
        { text: "Focusing too narrowly on the conversion funnel stage", isCorrect: false },
      ]),
      tf("A beautifully written blog post that nobody ever sees is described as failing at the awareness stage of the funnel.", true),
      tf("According to the lecture, digital marketing channels should be used independently, one at a time, rather than together.", false),
      tf("KPIs should be chosen based on which numbers look most impressive, rather than matching the actual goal, per the lecture.", false),
      sa(
        "In one or two sentences, explain why the lecture says a stunning ad campaign that drives traffic to a confusing website still counts as a failure.",
        "Even if the ad is successful at generating attention and traffic, if the destination website is confusing or hard to navigate, the campaign fails at the conversion stage of the funnel, since visitors don't complete the intended action.",
      ),
    ],
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const now = new Date();
    const slugs = EXPANSIONS.map((c) => c.slug);

    const [quizzes] = await queryInterface.sequelize.query(
      `SELECT q.id AS quiz_id, c.slug AS slug
       FROM quizzes q
       JOIN modules m ON m.id = q.module_id
       JOIN courses c ON c.id = m.course_id
       WHERE c.slug IN (${slugs.map(() => "?").join(",")}) AND q.title = 'Week 1 Quiz'`,
      { replacements: slugs },
    );
    const quizIdBySlug = new Map((quizzes as { quiz_id: string; slug: string }[]).map((q) => [q.slug, q.quiz_id]));

    const questionRows: Record<string, unknown>[] = [];
    const answerRows: Record<string, unknown>[] = [];

    EXPANSIONS.forEach((course) => {
      const quizId = quizIdBySlug.get(course.slug);
      if (!quizId) return;
      if (course.questions.length !== 16) {
        throw new Error(`Expected 16 new questions for ${course.slug}, got ${course.questions.length}`);
      }
      course.questions.forEach((q, qIndex) => {
        const questionId = crypto.randomUUID();
        questionRows.push({
          id: questionId,
          quiz_id: quizId,
          question_text: q.text,
          question_type: q.type,
          points: q.points,
          order: 5 + qIndex,
          explanation: q.explanation,
          created_at: now,
        });
        q.answers.forEach((a, aIndex) => {
          answerRows.push({
            id: crypto.randomUUID(),
            question_id: questionId,
            answer_text: a.text,
            is_correct: a.isCorrect,
            order: aIndex + 1,
          });
        });
      });
    });

    await queryInterface.bulkInsert("quiz_questions", questionRows);
    await queryInterface.bulkInsert("quiz_answers", answerRows);

    const quizIds = [...quizIdBySlug.values()];
    await queryInterface.sequelize.query(
      `UPDATE quizzes SET question_count = 10, time_limit_minutes = 20 WHERE id IN (${quizIds.map(() => "?").join(",")})`,
      { replacements: quizIds },
    );
  },

  down: async (queryInterface: QueryInterface) => {
    const slugs = EXPANSIONS.map((c) => c.slug);

    const [quizzes] = await queryInterface.sequelize.query(
      `SELECT q.id AS quiz_id, c.slug AS slug
       FROM quizzes q
       JOIN modules m ON m.id = q.module_id
       JOIN courses c ON c.id = m.course_id
       WHERE c.slug IN (${slugs.map(() => "?").join(",")}) AND q.title = 'Week 1 Quiz'`,
      { replacements: slugs },
    );
    const quizIdBySlug = new Map((quizzes as { quiz_id: string; slug: string }[]).map((q) => [q.slug, q.quiz_id]));
    if (quizIdBySlug.size === 0) return;

    for (const course of EXPANSIONS) {
      const quizId = quizIdBySlug.get(course.slug);
      if (!quizId) continue;
      const texts = course.questions.map((q) => q.text);
      const [questions] = await queryInterface.sequelize.query(
        `SELECT id FROM quiz_questions WHERE quiz_id = ? AND question_text IN (${texts.map(() => "?").join(",")})`,
        { replacements: [quizId, ...texts] },
      );
      const questionIds = (questions as { id: string }[]).map((q) => q.id);
      if (questionIds.length > 0) {
        await queryInterface.bulkDelete("quiz_answers", { question_id: questionIds });
        await queryInterface.bulkDelete("quiz_questions", { id: questionIds });
      }
    }

    const quizIds = [...quizIdBySlug.values()];
    await queryInterface.sequelize.query(
      `UPDATE quizzes SET question_count = 4, time_limit_minutes = 15 WHERE id IN (${quizIds.map(() => "?").join(",")})`,
      { replacements: quizIds },
    );
  },
};
