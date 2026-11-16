import { CsfAssessmentChanges } from "./curriculumCyberSecurityAssessment";

type Edit = { from: string; to: string };

// Digital Marketing, owner's changes of 2026-11-16 (applied by migration
// 20261116100000-digital-marketing-assessment-changes): a three-question knowledge check in every
// lesson (multiple choice, true or false, scenario), three learner reflections (lessons 2.2, 6.2,
// 8.2), a 30-question final assessment in place of the capstone and day assignments, and a course
// feedback questionnaire. Lesson sentences, the Day 8 module and lesson 8.2 titles, and four Day 2/8
// Quiz question stems that pointed to the removed assignments or capstone are re-worded. Keys are
// "<day>.<lesson order>".
export const DM_ASSESSMENT_CHANGES: Omit<CsfAssessmentChanges, "module18Description"> & {
  quizQuestionEdits: Edit[];
  lessonTitleEdits: Record<string, Edit>;
  module8: { title: Edit; description: Edit };
} = {
  "knowledgeChecks": {
    "1.1": [
      "**Knowledge check 1.1**",
      "**1.** At which funnel stage is someone comparing a business against its alternatives?",
      "- A. Awareness\n- B. Consideration\n- C. Conversion\n- D. Loyalty",
      "<details><summary>Show answer</summary>\n\n**B.** Awareness is first learning a business exists; consideration is weighing it against other options.\n\n</details>",
      "**2.** True or false: a well-written blog post that nobody sees still succeeds at the awareness stage.",
      "<details><summary>Show answer</summary>\n\n**False.** Awareness is about visibility. Content nobody sees fails at that stage, however good it is.\n\n</details>",
      "**3.** An ad campaign brings lots of visitors, but they leave a confusing website without buying. Where is the funnel failing?",
      "- A. At the conversion stage\n- B. At the awareness stage\n- C. At the loyalty stage\n- D. Nowhere, because traffic is the goal",
      "<details><summary>Show answer</summary>\n\n**A.** The ad did its awareness job; the website is losing people at the point of action.\n\n</details>"
    ],
    "1.2": [
      "**Knowledge check 1.2**",
      "**1.** Which of these is a SMART goal?",
      "- A. Get more customers\n- B. Become the best business in town\n- C. Generate 50 qualified leads through the website within the next three months\n- D. Post on social media more often",
      "<details><summary>Show answer</summary>\n\n**C.** It is specific, measurable and time-bound. \"Get more customers\" is a wish.\n\n</details>",
      "**2.** True or false: analytics sits within one funnel stage, usually conversion.",
      "<details><summary>Show answer</summary>\n\n**False.** Analytics measures performance across every stage of the funnel.\n\n</details>",
      "**3.** A new bakery's goal is brand awareness. Its marketer reports only on sales from existing customers. What's the problem?",
      "- A. Nothing, because sales are always the right KPI\n- B. The bakery should stop marketing\n- C. The goal should be removed\n- D. The KPIs don't match the goal; reach, impressions and branded search would show awareness",
      "<details><summary>Show answer</summary>\n\n**D.** KPIs must track progress toward the goal actually set.\n\n</details>"
    ],
    "2.1": [
      "**Knowledge check 2.1**",
      "**1.** What does a full buyer persona capture that a basic audience profile often misses?",
      "- A. The objections or hesitations that stop people buying\n- B. The customer's favourite colour\n- C. The business's logo\n- D. The competitor's prices only",
      "<details><summary>Show answer</summary>\n\n**A.** Knowing why interested people don't buy tells you what your marketing must address.\n\n</details>",
      "**2.** True or false: competitive analysis looks for gaps: customer needs or channels that competitors are underserving.",
      "<details><summary>Show answer</summary>\n\n**True.** Those gaps are often the best opportunities.\n\n</details>",
      "**3.** Research shows a clinic's prospects like its services but worry they can't trust a new provider. What should the marketing focus on?",
      "- A. Cutting prices immediately\n- B. Building trust, for example with reviews, credentials and clear information\n- C. Running more of the same ads\n- D. Ignoring the concern",
      "<details><summary>Show answer</summary>\n\n**B.** The persona's objection points straight to what the content must answer.\n\n</details>"
    ],
    "2.2": [
      "**Knowledge check 2.2**",
      "**1.** What is the lesson's main principle about how many channels to use?",
      "- A. Use every channel at once\n- B. Use only one channel, ever\n- C. Executing two or three channels well beats spreading thin effort across every channel\n- D. Choose channels at random",
      "<details><summary>Show answer</summary>\n\n**C.** Strong strategy is as much about where not to invest.\n\n</details>",
      "**2.** True or false: a channel strategy should consider the business's real time, budget and skills.",
      "<details><summary>Show answer</summary>\n\n**True.** A plan that can't be executed consistently delivers little value.\n\n</details>",
      "**3.** A plumber's customers search online when a pipe bursts. Which channels deserve priority?",
      "- A. SEO and paid search, because customers look on search engines first\n- B. A printed newsletter\n- C. Long-form video only\n- D. Nothing until next year",
      "<details><summary>Show answer</summary>\n\n**A.** Match channels to where the persona actually looks when the need arises.\n\n</details>",
      "**Learner reflection 1 of 3**",
      "> Think of a business you know well. Who is its ideal customer, what stops them buying, and which two or three channels would you choose for it, and why?",
      "Write your answer in your notes. There is no right or wrong answer, and it isn't marked."
    ],
    "3.1": [
      "**Knowledge check 3.1**",
      "**1.** What are the three core actions a search engine performs?",
      "- A. Design, build and host\n- B. Post, like and share\n- C. Bid, click and pay\n- D. Crawl, index and rank",
      "<details><summary>Show answer</summary>\n\n**D.** It discovers pages, stores them, then orders them for each search.\n\n</details>",
      "**2.** True or false: a long-tail phrase like \"affordable tailor in Asaba\" is usually less competitive than \"tailor\".",
      "<details><summary>Show answer</summary>\n\n**True.** It is more specific, signals clear intent and often converts better.\n\n</details>",
      "**3.** A page about wedding cakes has the title tag \"Home\". What should change first?",
      "- A. Add more pictures only\n- B. Write a title tag that includes the target keyword and says clearly what the page offers\n- C. Delete the page\n- D. Repeat \"wedding cakes\" fifty times in the text",
      "<details><summary>Show answer</summary>\n\n**B.** The title tag is what searchers see in results; forced keyword repetition hurts.\n\n</details>"
    ],
    "3.2": [
      "**Knowledge check 3.2**",
      "**1.** What do search engines generally treat a backlink from a reputable site as?",
      "- A. A vote of confidence\n- B. Spam\n- C. A paid ad\n- D. A technical error",
      "<details><summary>Show answer</summary>\n\n**A.** Links from relevant, reputable sites carry the most weight.\n\n</details>",
      "**2.** True or false: buying large numbers of low-quality links is a safe, quick way to build authority.",
      "<details><summary>Show answer</summary>\n\n**False.** Search engines increasingly detect and penalise artificial shortcuts.\n\n</details>",
      "**3.** A local restaurant doesn't appear in map results when people nearby search for food. What should it do first?",
      "- A. Buy a new domain name\n- B. Run display ads abroad\n- C. Claim and complete its Google Business Profile with hours, address, photos and reviews\n- D. Remove its website",
      "<details><summary>Show answer</summary>\n\n**C.** A complete Business Profile often decides who appears in local results.\n\n</details>"
    ],
    "4.1": [
      "**Knowledge check 4.1**",
      "**1.** What is a lead magnet?",
      "- A. A paid banner ad\n- B. Useful content, such as a guide or checklist, offered in exchange for contact details\n- C. A discount for existing customers only\n- D. A type of backlink",
      "<details><summary>Show answer</summary>\n\n**B.** It turns an anonymous visitor into a contact you can keep marketing to.\n\n</details>",
      "**2.** True or false: content marketing usually delivers big results in its first week.",
      "<details><summary>Show answer</summary>\n\n**False.** Like SEO, it compounds gradually over months.\n\n</details>",
      "**3.** A financial adviser's prospects keep searching \"how to start saving for retirement\". What content fits best?",
      "- A. A clear guide that answers that exact question, built from the keyword research\n- B. A post about the office party\n- C. A hard-sell advert with no information\n- D. Nothing; content can't help advisers",
      "<details><summary>Show answer</summary>\n\n**A.** Good content answers the questions the persona is already asking.\n\n</details>"
    ],
    "4.2": [
      "**Knowledge check 4.2**",
      "**1.** What is email segmentation?",
      "- A. Sending one email to everyone\n- B. Buying a bigger list\n- C. Deleting old contacts\n- D. Dividing a list into meaningful groups so each contact gets relevant messages",
      "<details><summary>Show answer</summary>\n\n**D.** Groups can be by interest, purchase history or journey stage.\n\n</details>",
      "**2.** True or false: an email with several different calls to action usually performs better than one with a single clear action.",
      "<details><summary>Show answer</summary>\n\n**False.** Splitting attention lowers results across all the actions.\n\n</details>",
      "**3.** A shop wants to grow its email list fast and is offered a purchased list of 20,000 addresses. What should it do?",
      "- A. Buy it and email everyone at once\n- B. Decline and grow the list through genuine opt-in, such as a lead magnet\n- C. Buy it but hide the unsubscribe link\n- D. Buy two lists",
      "<details><summary>Show answer</summary>\n\n**B.** Purchased lists perform poorly, hurt deliverability and can break the law.\n\n</details>"
    ],
    "5.1": [
      "**Knowledge check 5.1**",
      "**1.** Which Google Ads campaign type shows text ads in search results to people typing a relevant query?",
      "- A. Search campaigns\n- B. Display campaigns\n- C. Shopping campaigns\n- D. Video campaigns",
      "<details><summary>Show answer</summary>\n\n**A.** Search reaches people at the moment of active intent.\n\n</details>",
      "**2.** True or false: in Google Ads, the highest bid always wins the top position regardless of ad quality.",
      "<details><summary>Show answer</summary>\n\n**False.** Quality Score also matters; a relevant ad can pay less and rank higher.\n\n</details>",
      "**3.** An online electronics store wants its products, with pictures and prices, to show in search results. Which campaign type fits?",
      "- A. Shopping campaigns\n- B. Display campaigns\n- C. Search text ads only\n- D. No campaign; it isn't possible",
      "<details><summary>Show answer</summary>\n\n**A.** Shopping campaigns show product listings with images and prices.\n\n</details>"
    ],
    "5.2": [
      "**Knowledge check 5.2**",
      "**1.** In a Google Ads account, what sits directly beneath a campaign?",
      "- A. Ad groups\n- B. Keywords only\n- C. Landing pages\n- D. Invoices",
      "<details><summary>Show answer</summary>\n\n**A.** Campaign, then ad groups around tightly related keywords, then the ads.\n\n</details>",
      "**2.** True or false: without conversion tracking, you only know how many people clicked an ad, not whether they became customers.",
      "<details><summary>Show answer</summary>\n\n**True.** Conversion tracking links clicks to real outcomes like purchases or forms.\n\n</details>",
      "**3.** A beginner has a small budget for a first Google Ads campaign. What is the sensible approach?",
      "- A. Spend the whole budget on day one\n- B. Use manual bidding on hundreds of keywords\n- C. Start with a modest daily budget, watch real results closely, then scale what works\n- D. Skip tracking to save time",
      "<details><summary>Show answer</summary>\n\n**C.** Disciplined, incremental testing protects the budget.\n\n</details>"
    ],
    "6.1": [
      "**Knowledge check 6.1**",
      "**1.** Which Google Analytics report shows where visitors come from?",
      "- A. Behaviour\n- B. Traffic sources\n- C. Conversions\n- D. Audience age",
      "<details><summary>Show answer</summary>\n\n**B.** Organic search, paid search, direct, referral and social.\n\n</details>",
      "**2.** True or false: last-click attribution can undervalue channels that first introduced the customer to the business.",
      "<details><summary>Show answer</summary>\n\n**True.** It gives all the credit to the final touch before conversion.\n\n</details>",
      "**3.** Channel A brings 5,000 visits and 5 sales; Channel B brings 800 visits and 40 sales. With goals set up, what does this show?",
      "- A. Channel B is likely more valuable despite less traffic\n- B. Channel A is better because it has more visits\n- C. Both are equal\n- D. Neither can be judged",
      "<details><summary>Show answer</summary>\n\n**A.** Goals let you judge channels by outcomes, not visit counts.\n\n</details>"
    ],
    "6.2": [
      "**Knowledge check 6.2**",
      "**1.** How is Customer Acquisition Cost (CAC) calculated?",
      "- A. Revenue divided by visitors\n- B. Price minus cost of goods\n- C. Total marketing spend divided by the number of new customers acquired\n- D. Number of ads multiplied by clicks",
      "<details><summary>Show answer</summary>\n\n**C.** CAC is the average cost of winning one new customer.\n\n</details>",
      "**2.** True or false: a high CAC is always a sign of a bad marketing investment.",
      "<details><summary>Show answer</summary>\n\n**False.** A high CAC can be excellent value when Lifetime Value is high enough.\n\n</details>",
      "**3.** A business owner says your analytics report is \"too many numbers\". What should the dashboard lead with?",
      "- A. Every metric the platform offers\n- B. Performance against the SMART goals, broken down by channel, with trends over time\n- C. Raw data exports\n- D. Only today's numbers",
      "<details><summary>Show answer</summary>\n\n**B.** A dashboard should communicate clearly to the person deciding.\n\n</details>",
      "**Learner reflection 2 of 3**",
      "> If you ran marketing for that business, which one goal would you set first, and which three numbers would tell you whether it was working?",
      "Write your answer in your notes. There is no right or wrong answer, and it isn't marked."
    ],
    "7.1": [
      "**Knowledge check 7.1**",
      "**1.** Which is a common cause of cart abandonment?",
      "- A. Unexpected extra costs at checkout\n- B. Too few product photos on the homepage\n- C. A fast website\n- D. Free delivery",
      "<details><summary>Show answer</summary>\n\n**A.** Forced account creation and distraction are others.\n\n</details>",
      "**2.** True or false: upselling and cross-selling can raise average order value without extra marketing spend.",
      "<details><summary>Show answer</summary>\n\n**True.** The customer is already engaged in buying.\n\n</details>",
      "**3.** An online shop sees many carts abandoned at the final step, where delivery fees first appear. What is a sensible fix?",
      "- A. Hide delivery costs until after payment\n- B. Remove the checkout page\n- C. Raise all prices\n- D. Show delivery costs earlier and follow up with an abandoned-cart email sequence",
      "<details><summary>Show answer</summary>\n\n**D.** Remove the surprise, then recover the rest with automation.\n\n</details>"
    ],
    "7.2": [
      "**Knowledge check 7.2**",
      "**1.** In marketing automation, what is a trigger?",
      "- A. The final email in a sequence\n- B. The event that starts an automated sequence, such as an abandoned cart\n- C. A type of discount\n- D. A paid ad",
      "<details><summary>Show answer</summary>\n\n**B.** The workflow is the sequence of actions that follows the trigger.\n\n</details>",
      "**2.** True or false: a CRM keeps a customer's contact details, purchase history and past communications in one place.",
      "<details><summary>Show answer</summary>\n\n**True.** That shared record supports segmentation, sales and support.\n\n</details>",
      "**3.** A shop wants to win back customers who bought skincare but haven't bought anything for four months. What makes this possible?",
      "- A. CRM data used to segment those customers and send them a relevant, personalised offer\n- B. A broadcast to every contact\n- C. A new logo\n- D. A billboard",
      "<details><summary>Show answer</summary>\n\n**A.** CRM data allows segmentation that email activity alone can't.\n\n</details>"
    ],
    "8.1": [
      "**Knowledge check 8.1**",
      "**1.** What does a mature digital marketing strategy do with its channels?",
      "- A. Runs each channel in isolation\n- B. Uses only paid ads\n- C. Coordinates them around a shared goal so each reinforces the others\n- D. Changes channel every week",
      "<details><summary>Show answer</summary>\n\n**C.** Every channel supports a stage of the same funnel.\n\n</details>",
      "**2.** True or false: there is one correct budget split between channels that every business should use.",
      "<details><summary>Show answer</summary>\n\n**False.** The discipline is making the allocation deliberately and explaining it.\n\n</details>",
      "**3.** A brand-new online store has no website traffic yet. How might it reasonably allocate its budget at first?",
      "- A. Spend everything on SEO and wait a year\n- B. Lean more on paid channels for early traction while SEO and content build up\n- C. Spend nothing until traffic arrives\n- D. Split it randomly",
      "<details><summary>Show answer</summary>\n\n**B.** Paid delivers fast results while slower channels compound.\n\n</details>"
    ],
    "8.2": [
      "**Knowledge check 8.2**",
      "**1.** Why is the cookieless future shifting attention to first-party data?",
      "- A. Third-party tracking is being restricted, while email and CRM data belong to the business\n- B. Cookies are getting cheaper\n- C. Search engines are closing\n- D. Email is being banned",
      "<details><summary>Show answer</summary>\n\n**A.** Direct customer relationships keep working as tracking narrows.\n\n</details>",
      "**2.** True or false: voice searches tend to be longer and more conversational than typed searches.",
      "<details><summary>Show answer</summary>\n\n**True.** This links back to long-tail keywords.\n\n</details>",
      "**3.** You're building a strategy for a gym. Your persona research shows members find gyms by searching locally. Which plan is most coherent?",
      "- A. Every channel from the course at once\n- B. Display ads abroad only\n- C. A new logo and nothing else\n- D. Local SEO and paid search to win searchers, email to convert and retain them, analytics to measure it all",
      "<details><summary>Show answer</summary>\n\n**D.** An integrated strategy is one connected story, from persona to measurement.\n\n</details>",
      "**Learner reflection 3 of 3**",
      "> Which part of digital marketing do you most want to work in, such as SEO, email, paid ads or analytics? What will you practise first to build that skill?",
      "Write your answer in your notes. There is no right or wrong answer, and it isn't marked."
    ]
  },
  "closing": [
    "## Final assessment",
    "This course ends with a final assessment.",
    "- 30 multiple-choice questions covering the whole course.\n- Pass mark: 24 out of 30 (80%).\n- Time limit: 45 minutes. Question order is shuffled.\n- After you submit, you can see the correct answers with explanations.",
    "| Topic | Questions |\n| --- | --- |\n| Digital marketing funnel, channels and goals | 4 |\n| Audience research and channel strategy | 4 |\n| SEO: on-page, off-page, technical and local | 4 |\n| Content and email marketing | 4 |\n| Google Ads | 4 |\n| Analytics, attribution and ROI | 4 |\n| E-commerce and marketing automation | 3 |\n| Integrated strategy and emerging trends | 3 |\n| **Total** | **30** |",
    "Open **Final Assessment** from this day's quizzes when you are ready.",
    "## Course feedback questionnaire",
    "When you finish this lesson, the course shows as completed on your dashboard. Select **Share feedback** on the course card to answer five short questions:",
    "1. Overall, how would you rate this course?\n2. How relevant was the course to the job or career you want?\n3. How confident do you now feel about planning a digital marketing campaign for a business?\n4. How easy was the course to follow?\n5. What was most useful, and what one thing should we improve?",
    "It takes about two minutes. Your answers help us improve the course."
  ],
  "textEdits": {
    "1.2": [
      {
        "from": "For your assignment, analyze the digital marketing funnel for a real business of your choosing, and identify specifically which channels they're using at each stage — awareness, consideration, conversion, and loyalty. For your practical exercise, conduct a full digital marketing audit for a provided business, examining their website and the digital channels they currently use, or fail to use.",
        "to": "For your practical exercise, conduct a full digital marketing audit for a provided business, examining their website and the digital channels they currently use, or fail to use."
      }
    ],
    "2.2": [
      {
        "from": "For your assignment, develop full buyer personas and a genuine channel strategy for a fictional State business. For your practical exercise, create a complete digital marketing plan outline, pulling together the funnel thinking, channel overview, personas, and channel strategy from these first two days into one coherent document.",
        "to": "For your practical exercise, create a complete digital marketing plan outline, pulling together the funnel thinking, channel overview, personas, and channel strategy from these first two days into one coherent document."
      }
    ],
    "3.2": [
      {
        "from": "For your assignment, conduct real keyword research for a business and propose specific on-page optimization changes based on what you find. For your practical exercise, optimize a sample webpage's meta tags, content, and headers, applying everything covered across these two lessons.",
        "to": "For your practical exercise, optimize a sample webpage's meta tags, content, and headers, applying everything covered across these two lessons."
      }
    ],
    "4.2": [
      {
        "from": "For your assignment, create a complete email marketing campaign plan for a welcome series, for a business of your choosing. For your practical exercise, design and write three complete marketing emails for a specified campaign, applying the copywriting and structure principles covered today.",
        "to": "For your practical exercise, design and write three complete marketing emails for a specified campaign, applying the copywriting and structure principles covered today."
      },
      {
        "from": "is exactly what this day's assignment asks you to plan.",
        "to": "is one of the most valuable sequences you can plan."
      }
    ],
    "5.2": [
      {
        "from": "For your assignment, create a complete Google Ads campaign plan for a State business. For your practical exercise, set up a sample Google Ads campaign using free trial credits, applying everything covered across these two lessons — structure, keyword selection, and ad copy.",
        "to": "For your practical exercise, set up a sample Google Ads campaign using free trial credits, applying everything covered across these two lessons — structure, keyword selection, and ad copy."
      }
    ],
    "6.2": [
      {
        "from": "For your assignment, set up a complete Google Analytics reporting dashboard and template. For your practical exercise, analyze real website analytics data for a sample business and produce a genuine, complete insights report.",
        "to": "For your practical exercise, analyze real website analytics data for a sample business and produce a genuine, complete insights report."
      },
      {
        "from": "into one clear, visual view — precisely the kind of deliverable this day's assignment asks you to build.",
        "to": "into one clear, visual view."
      }
    ],
    "7.2": [
      {
        "from": "For your assignment, design a complete marketing automation workflow — an abandoned cart sequence is an excellent, genuinely relevant starting point — for an e-commerce business. For your practical exercise, map a complete customer journey for a business, identifying specific touchpoints across every relevant channel.",
        "to": "For your practical exercise, map a complete customer journey for a business, identifying specific touchpoints across every relevant channel."
      },
      {
        "from": ", and we'll spend real, dedicated time preparing your capstone project.",
        "to": "."
      }
    ],
    "8.2": [
      {
        "from": "For your assignment, finalize your capstone project's specific scope and overall approach. For your practical exercise, develop a complete integrated digital marketing campaign plan for a business, applying everything covered across these two lessons.",
        "to": "For your practical exercise, develop a complete integrated digital marketing campaign plan for a business, applying everything covered across these two lessons."
      },
      {
        "from": "then spends real, dedicated time preparing you for your capstone project.",
        "to": "then shows how to plan a complete, integrated strategy for a real business."
      },
      {
        "from": "## Preparing Your Capstone Project",
        "to": "## Planning an Integrated Strategy"
      },
      {
        "from": "Your capstone project asks you to build a complete digital marketing strategy for a business, integrating strategy, SEO, content and email, paid advertising, and analytics into one coherent plan. I want you to treat this as one connected story:",
        "to": "A complete digital marketing strategy for a business integrates strategy, SEO, content and email, paid advertising, and analytics into one coherent plan. Treat it as one connected story:"
      },
      {
        "from": "Your capstone project is your opportunity to demonstrate all of this as one coherent, professional body of work.",
        "to": "The final assessment at the end of this course checks all of it."
      },
      {
        "from": "Good luck with your capstone project, and we're looking forward to seeing the strategy you build.",
        "to": "Next up is the final assessment, below."
      }
    ],
    "2.1": [
      {
        "from": " This is exactly the kind of detail this day's assignment asks you to develop for a fictional State business.",
        "to": ""
      }
    ],
    "7.1": [
      {
        "from": ", and it directly sets up this day's assignment, since an automated abandoned cart email sequence is one of",
        "to": ". An automated abandoned cart email sequence is one of"
      }
    ],
    "8.1": [
      {
        "from": ", and spend real, dedicated time preparing you for your capstone project.",
        "to": "."
      },
      {
        "from": "This is precisely the kind of integrated thinking your capstone project needs to demonstrate — not eight disconnected weekly exercises,",
        "to": "This is the integrated thinking every real strategy needs — not eight disconnected exercises,"
      },
      {
        "from": "and spends real, dedicated time preparing you for your capstone project.",
        "to": "and shows how to plan a complete, integrated strategy."
      }
    ]
  },
  "quizQuestionEdits": [
    {
      "from": "This day's assignment asks students to develop buyer personas and a channel strategy for a real, currently operating international corporation.",
      "to": "A strong buyer persona and channel strategy can be built purely on the business's own internal assumptions about its customers, without external research."
    },
    {
      "from": "What does the lecture say the capstone project should demonstrate?",
      "to": "What does the lecture say an integrated digital marketing strategy should demonstrate?"
    },
    {
      "from": "The lecture recommends that the capstone's buyer personas and channel strategy should have no connection to the specific channels ultimately chosen.",
      "to": "The lecture recommends that a strategy's buyer personas and channel strategy should have no connection to the specific channels ultimately chosen."
    },
    {
      "from": "In one or two sentences, explain what it means for a capstone project to be treated as \"one connected story\" rather than eight disconnected exercises.",
      "to": "In one or two sentences, explain what it means for a digital marketing strategy to be treated as \"one connected story\" rather than eight disconnected exercises."
    }
  ],
  "lessonTitleEdits": {
    "8.2": {
      "from": "Emerging Trends & Capstone Planning",
      "to": "Emerging Trends & Integrated Strategy Planning"
    }
  },
  "module8": {
    "title": {
      "from": "Integrated Strategy & Capstone Planning",
      "to": "Integrated Strategy & Final Assessment"
    },
    "description": {
      "from": "Integrated campaign planning, budget allocation, emerging trends, and capstone preparation.",
      "to": "Integrated campaign planning, budget allocation, emerging trends, and the final assessment."
    }
  },
  "finalAssessment": [
    {
      "text": "Which funnel stage describes someone who has never heard of the business before?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Awareness is the stage of first learning a business exists.",
      "answers": [
        {
          "text": "Awareness",
          "isCorrect": true
        },
        {
          "text": "Conversion",
          "isCorrect": false
        },
        {
          "text": "Loyalty",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which of the following is an example of a SMART marketing goal?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "It is specific, measurable and time-bound.",
      "answers": [
        {
          "text": "Get more customers",
          "isCorrect": false
        },
        {
          "text": "Improve our brand",
          "isCorrect": false
        },
        {
          "text": "Generate 50 qualified leads through the website within 3 months",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "How does analytics fit into the marketing funnel?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Analytics measures performance across all funnel stages.",
      "answers": [
        {
          "text": "It replaces the need for a funnel model entirely",
          "isCorrect": false
        },
        {
          "text": "It doesn't sit within any single funnel stage; it measures performance across all of them",
          "isCorrect": true
        },
        {
          "text": "It only applies to the awareness stage",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "A business with a sales goal reports only on social media follower growth. What mistake is it making?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "The KPI doesn't measure progress toward the actual goal.",
      "answers": [
        {
          "text": "Measuring the wrong thing entirely, since the KPI doesn't match the actual goal",
          "isCorrect": true
        },
        {
          "text": "Using a KPI that is illegal to track",
          "isCorrect": false
        },
        {
          "text": "Focusing too narrowly on the conversion funnel stage",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which of these is part of a solid buyer persona?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Objections explain why interested prospects don't buy.",
      "answers": [
        {
          "text": "The persona's favorite streaming service",
          "isCorrect": false
        },
        {
          "text": "The exact font used on a competitor's website",
          "isCorrect": false
        },
        {
          "text": "The objections or hesitations that prevent conversion",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What does competitive analysis mean?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "It studies what businesses serving similar customers already do.",
      "answers": [
        {
          "text": "Filing a formal complaint against a competitor's advertising",
          "isCorrect": false
        },
        {
          "text": "Systematically studying what other businesses serving a similar customer are already doing",
          "isCorrect": true
        },
        {
          "text": "Copying a competitor's website design exactly",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "If a buyer persona turns first to a search engine when solving their problem, which channels deserve serious priority?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Search-first personas are best reached through SEO and paid search.",
      "answers": [
        {
          "text": "SEO and paid search",
          "isCorrect": true
        },
        {
          "text": "In-person direct mail only",
          "isCorrect": false
        },
        {
          "text": "Radio advertising",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What principle applies to spreading marketing effort across channels?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Doing two or three channels well beats thin effort everywhere.",
      "answers": [
        {
          "text": "A business should always use every available channel simultaneously",
          "isCorrect": false
        },
        {
          "text": "Channel choice should be revisited daily based on trends",
          "isCorrect": false
        },
        {
          "text": "It's far better to execute two or three channels genuinely well than to spread thin effort across every channel at once",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "Google's ranking decisions broadly reduce to which two categories?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Relevance to the query and the authority of the source.",
      "answers": [
        {
          "text": "Design and page count only",
          "isCorrect": false
        },
        {
          "text": "Relevance and authority",
          "isCorrect": true
        },
        {
          "text": "Price and popularity",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Why is a long-tail phrase like \"affordable tailor in Asaba\" often better than a broad term like \"tailor\"?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Specific phrases face less competition and signal clear intent.",
      "answers": [
        {
          "text": "It's less competitive and often converts better because it signals specific intent",
          "isCorrect": true
        },
        {
          "text": "It costs nothing to rank for any keyword",
          "isCorrect": false
        },
        {
          "text": "It guarantees the number one search ranking automatically",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What often determines whether a business appears in map results and local search listings?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "A complete Google Business Profile drives local visibility.",
      "answers": [
        {
          "text": "The number of blog posts published that week",
          "isCorrect": false
        },
        {
          "text": "The business's total advertising budget",
          "isCorrect": false
        },
        {
          "text": "A properly claimed and complete Google Business Profile",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What does a backlink generally represent to a search engine?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Links from reputable sites signal trust.",
      "answers": [
        {
          "text": "An automatic top-ranking guarantee",
          "isCorrect": false
        },
        {
          "text": "A vote of confidence from another website",
          "isCorrect": true
        },
        {
          "text": "A penalty against the linked site",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is a lead magnet?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Useful content exchanged for contact details.",
      "answers": [
        {
          "text": "A specific piece of content offered in exchange for a visitor's contact information",
          "isCorrect": true
        },
        {
          "text": "A paid search ad targeting existing customers",
          "isCorrect": false
        },
        {
          "text": "A physical product sample mailed to random addresses",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Why should a business avoid purchased email lists?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "They perform poorly and can carry legal risk.",
      "answers": [
        {
          "text": "They are more expensive than opt-in lists but otherwise equally effective",
          "isCorrect": false
        },
        {
          "text": "They automatically improve sender reputation",
          "isCorrect": false
        },
        {
          "text": "They typically produce poor results and can carry real legal risk",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is email segmentation?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Groups get messages relevant to them.",
      "answers": [
        {
          "text": "Sending the exact same broadcast to every contact regardless of interest",
          "isCorrect": false
        },
        {
          "text": "Dividing an email list into meaningful groups so each contact receives genuinely relevant messages",
          "isCorrect": true
        },
        {
          "text": "Deleting all contacts who haven't purchased within a week",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which two factors most influence email deliverability?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Sender reputation and list quality drive inbox placement.",
      "answers": [
        {
          "text": "Sender reputation and list quality",
          "isCorrect": true
        },
        {
          "text": "Email length and font choice",
          "isCorrect": false
        },
        {
          "text": "The day of the week an email is sent, exclusively",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which campaign type tends to offer the clearest route to qualified leads for most local businesses?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Search captures existing, active intent.",
      "answers": [
        {
          "text": "Display campaigns",
          "isCorrect": false
        },
        {
          "text": "Shopping campaigns",
          "isCorrect": false
        },
        {
          "text": "Search campaigns",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What benefit can a high Quality Score provide?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Relevant ads can pay less per click and still rank higher.",
      "answers": [
        {
          "text": "Exemption from all future billing",
          "isCorrect": false
        },
        {
          "text": "Paying meaningfully less per click while achieving a better ad position than a lower-scored competitor",
          "isCorrect": true
        },
        {
          "text": "An automatic, permanent number one ranking regardless of bid",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Why are tightly themed ad groups better than mixing many loosely related keywords together?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Specific ad copy per group supports Quality Score.",
      "answers": [
        {
          "text": "They allow genuinely relevant, specific ad copy, which directly supports Quality Score",
          "isCorrect": true
        },
        {
          "text": "They reduce the total number of keywords a business is allowed to use",
          "isCorrect": false
        },
        {
          "text": "They eliminate the need for any budget at all",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Without properly configured conversion tracking, what do you actually know?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Clicks alone don't show whether anyone became a customer.",
      "answers": [
        {
          "text": "The exact lifetime value of every customer",
          "isCorrect": false
        },
        {
          "text": "Nothing at all about the campaign's performance",
          "isCorrect": false
        },
        {
          "text": "Only how many people clicked the ad, not whether any became real customers",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What does properly configuring goals in Google Analytics allow?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Channels are judged on real outcomes, not visits.",
      "answers": [
        {
          "text": "Automatic removal of low-performing pages from a website",
          "isCorrect": false
        },
        {
          "text": "Every traffic source to be evaluated against real outcomes, not just raw visit counts",
          "isCorrect": true
        },
        {
          "text": "A business to eliminate the need for any advertising budget",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is a key limitation of last-click attribution?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Earlier awareness channels get no credit.",
      "answers": [
        {
          "text": "It can seriously undervalue awareness-stage channels like content and SEO that contributed earlier in the journey",
          "isCorrect": true
        },
        {
          "text": "It is illegal to use in most jurisdictions",
          "isCorrect": false
        },
        {
          "text": "It cannot be implemented in Google Analytics at all",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What does Customer Acquisition Cost, or CAC, calculate?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Total spend divided by new customers acquired.",
      "answers": [
        {
          "text": "The total lifetime revenue a customer will ever generate",
          "isCorrect": false
        },
        {
          "text": "The percentage of visitors who bounce from a homepage",
          "isCorrect": false
        },
        {
          "text": "The average total cost of acquiring one single new customer",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "When can a high CAC still represent excellent value?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "High lifetime value can justify a high acquisition cost.",
      "answers": [
        {
          "text": "A high CAC is never justified regardless of LTV",
          "isCorrect": false
        },
        {
          "text": "When LTV is high enough to comfortably justify it, such as a loyal customer who purchases for years",
          "isCorrect": true
        },
        {
          "text": "Only when the business has no competitors at all",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is cart abandonment?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Shoppers add items and leave without buying.",
      "answers": [
        {
          "text": "When shoppers add items to a cart and leave without completing the purchase",
          "isCorrect": true
        },
        {
          "text": "When a business removes a product from its online store",
          "isCorrect": false
        },
        {
          "text": "When a customer returns a purchased item for a refund",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which is one of the highest-return tactics in e-commerce marketing?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Automated reminders recover many abandoned carts.",
      "answers": [
        {
          "text": "A one-time print newspaper ad",
          "isCorrect": false
        },
        {
          "text": "A permanent storewide discount",
          "isCorrect": false
        },
        {
          "text": "An automated abandoned cart email sequence",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is a trigger, in the context of marketing automation?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "A trigger is the event that starts a sequence.",
      "answers": [
        {
          "text": "The software vendor that hosts the CRM",
          "isCorrect": false
        },
        {
          "text": "The specific event that starts an automated sequence, such as a cart abandonment or first purchase",
          "isCorrect": true
        },
        {
          "text": "The final discount offered at the end of a sale",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which three factors should inform budget allocation across channels?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Time to results, cost relative to return, and the business's goals.",
      "answers": [
        {
          "text": "Timeframe to results, realistic cost relative to return, and the business's specific goals",
          "isCorrect": true
        },
        {
          "text": "The founder's personal preference and nothing else",
          "isCorrect": false
        },
        {
          "text": "The number of employees and the office location",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What should you conclude about a channel that appears to underperform when measured in isolation?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "It may still contribute to the overall result.",
      "answers": [
        {
          "text": "It should always be eliminated immediately from any campaign",
          "isCorrect": false
        },
        {
          "text": "It has no possible connection to overall campaign results",
          "isCorrect": false
        },
        {
          "text": "It might still be making a meaningful contribution earlier in the customer journey",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What does the shift toward a cookieless future emphasise?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "First-party data from direct customer relationships.",
      "answers": [
        {
          "text": "Abandoning analytics and measurement altogether",
          "isCorrect": false
        },
        {
          "text": "First-party data — direct customer relationships built through email and CRM systems",
          "isCorrect": true
        },
        {
          "text": "Exclusively relying on third-party data brokers for targeting",
          "isCorrect": false
        }
      ]
    }
  ]
};
