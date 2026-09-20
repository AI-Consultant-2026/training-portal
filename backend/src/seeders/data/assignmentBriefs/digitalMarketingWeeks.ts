import { BriefSpec } from "./briefBuilder";

// Digital Marketing, Days 1-8. Keyed by module week_number.
export const DIGITAL_MARKETING_WEEKS: Record<number, BriefSpec> = {
  1: {
    overview:
      "Customers rarely buy the first time they see a business. They move through a **funnel**: becoming aware, considering options, deciding, and (ideally) coming back and recommending. In this assignment you act as a junior marketing analyst who studies how a **real** business uses digital channels at each stage of the funnel, and spots the gaps.",
    tasks: [
      "Choose **one real business** with a visible online presence (a Nigerian business is preferred, for example a restaurant, fashion brand, school, salon, fintech or online shop). You must be able to **find evidence** of its marketing online.",
      "Describe the business in 2-3 sentences: what it sells, to whom, and its website or main social pages.",
      "Map the business's **digital channels to the funnel stages** taught this day (for example Awareness, Consideration, Conversion, Retention or Loyalty). For every channel you list, give **evidence**: a link, a post, an ad, or a screenshot showing it is really used.",
      "Identify **at least two gaps**: funnel stages where the business does little or nothing, or channels that seem mismatched to the stage. Explain why each gap costs the business customers.",
      "Make **three practical recommendations** (each 2-3 sentences) to improve the funnel, saying which stage each fixes and how you would know it worked (a metric).",
    ],
    deliverables: [
      "A written analysis of **600-900 words** (typed answer, .docx, .pdf or .txt).",
      "A **funnel table** with columns *Funnel stage | Channels and activity found | Evidence (link or screenshot)*.",
    ],
    criteria: [
      { name: "Business choice and evidence", points: 20, description: "A real business; every channel listed is supported by verifiable evidence." },
      { name: "Funnel mapping", points: 30, description: "Channels are placed in the correct funnel stages with reasoning, not just listed." },
      { name: "Gap analysis", points: 20, description: "At least two genuine gaps explained in terms of lost customers." },
      { name: "Recommendations", points: 20, description: "Three practical recommendations, each tied to a stage and a measurable result." },
      { name: "Clarity", points: 10, description: "Clear structure and plain language." },
    ],
    example:
      "*Worked example (extract) for an invented business, \"Mama Tobi's Bakery\". Do not reuse its wording. Your business must be real and your evidence must be real.*\n\n| Funnel stage | Channels and activity | Evidence |\n|---|---|---|\n| Awareness | Instagram photos of cakes; Google Business profile listing | Profile link; screenshot of the listing with 120 reviews |\n| Consideration | Website menu page with prices | Link to the menu page |\n| Conversion | WhatsApp ordering button | Screenshot of the button on the site |\n| Retention | *Nothing found* | None |\n\n**Gap.** There is no retention activity: buyers get no follow-up, offer or reminder for the next birthday. A bakery's best customers are repeat orderers, so every one-off buyer who is not reminded is lost revenue.\n\n**Recommendation (extract).** Collect a WhatsApp opt-in at checkout and send one reminder before each customer's stated birthday. *Fixes:* retention. *Metric:* percentage of past customers who reorder within 12 months.",
    tips: [
      "Do not simply list channels. The marks are for placing each one in the right funnel stage and explaining why.",
      "\"No evidence found\" is a valid finding if you looked and can show where you looked. Never invent activity.",
      "A recommendation without a metric cannot be judged. Say how you would measure success.",
    ],
  },

  2: {
    overview:
      "Good marketing starts with knowing exactly who you are talking to. You will create **buyer personas** for a fictional Nigerian business, review its competition, and use both to decide which digital channels deserve the budget and which do not.",
    tasks: [
      "Invent a **business based in a Nigerian state** of your choice (for example a honey producer in Plateau, a tailoring studio in Enugu, a logistics start-up in Rivers). Describe what it sells and where, in 3-4 sentences.",
      "Create **at least two buyer personas**. For each, give: name and photo-free description, **demographics**, **goals and needs**, **where they get information** (specific platforms and habits), **objections** (why they might not buy) and a **buying trigger**.",
      "Do a short **competitive review** of **at least three real competitors** (or realistic local alternatives). For each, note which channels they use, what they do well and one weakness you could exploit.",
      "Build a **channel strategy**: choose **three or four channels** that genuinely deserve investment, and for each explain which persona it reaches and why. Include a suggested **percentage split of the budget**.",
      "Name **at least two channels you decided *not* to use** and explain why they are not worth it yet.",
    ],
    deliverables: [
      "A document (.docx or .pdf preferred, .txt also accepted) of **700-1,000 words**.",
      "Present each persona as a short profile or a table, and include a channel strategy table: *Channel | Persona reached | Why | Budget %*.",
    ],
    criteria: [
      { name: "Buyer personas", points: 30, description: "Detailed, believable and specific to the business; all required elements present and distinct between personas." },
      { name: "Competitive review", points: 20, description: "At least three competitors with evidence-based observations and a real opportunity identified." },
      { name: "Channel strategy", points: 30, description: "Channels are chosen because of the personas and competition, with sensible budget reasoning and clear rejected channels." },
      { name: "Consistency", points: 10, description: "The channels clearly follow from the personas rather than being generic." },
      { name: "Clarity", points: 10, description: "Well organised and readable." },
    ],
    example:
      "*Worked example (extract) for a different business, \"Jos Highland Honey\". Do not reuse its wording.*\n\n**Persona 1: Health-conscious professional, \"Ngozi\".** 32-45, works in Abuja or Lagos, mid-to-high income. **Needs:** trustworthy natural products for her family. **Information sources:** Instagram, WhatsApp groups, friends' recommendations. **Objections:** \"Is it real honey or sugar syrup?\" **Trigger:** a friend shares a lab-tested purity result.\n\n**Channel strategy (extract).**\n\n| Channel | Persona reached | Why | Budget % |\n|---|---|---|---|\n| Instagram | Ngozi | Visual proof of harvest and purity tests builds trust | 40% |\n| WhatsApp broadcast | Repeat buyers | Cheap, personal reordering | 20% |\n| Google Search (local) | Ngozi when researching | Captures people already looking for pure honey | 30% |\n| Email | Wholesale buyers | Longer B2B decisions | 10% |\n\n**Not chosen: TikTok ads.** Short-video ads would reach mostly younger users with low intent to pay a premium price, so I would test them later.",
    tips: [
      "\"25-40-year-olds who like social media\" is not a persona. Add habits, objections and triggers.",
      "Every channel must link back to a persona and to your competitor review.",
      "Saying no to a channel with a reason shows real strategic thinking. Do not skip that part.",
    ],
  },

  3: {
    overview:
      "People search using the words *they* use, not the words the business uses. You will carry out real keyword research for a business and then turn your findings into specific on-page changes that would help its site appear for the right searches.",
    tasks: [
      "Choose a business with a website (real, or your own small project). Describe what it offers in 2-3 sentences.",
      "Do **real keyword research** using free tools such as Google Keyword Planner, Google Trends and Google's search suggestions. Record **at least 15 keywords** in a table: *Keyword | Search intent (learn, compare, buy, local) | Approximate monthly searches or trend | Competition | Head term or long-tail*. Include screenshots of the tool as proof.",
      "Distinguish clearly between **high-volume terms** and **long-tail phrases**, and explain which you would target first and why.",
      "Choose **one page** of the site to optimise. Propose a new **title tag** (about 60 characters), **meta description** (about 155 characters), **H1**, **two or three H2 subheadings**, one sentence about **how you would use the main keyword naturally in the content**, **alt text** for one image, and **two internal links**.",
      "Explain in 3-4 sentences **how you will know if the changes worked** (for example rankings, clicks and impressions in Google Search Console).",
    ],
    deliverables: [
      "A document (.docx or .pdf preferred) of **600-900 words** with the keyword table and screenshots of your research.",
      "The proposed on-page changes presented as a *Current | Proposed* table.",
    ],
    criteria: [
      { name: "Keyword research", points: 30, description: "At least 15 real keywords with intent and data, with screenshots as proof." },
      { name: "Volume vs long-tail reasoning", points: 20, description: "Clearly explains the trade-off and picks sensible starting targets." },
      { name: "On-page changes", points: 30, description: "Title, description, headings, alt text and links are specific, the right length and use the keyword naturally." },
      { name: "Measurement", points: 10, description: "A realistic way to measure whether the changes worked." },
      { name: "Clarity", points: 10, description: "Tidy tables and clear explanation." },
    ],
    example:
      "*Worked example (extract) for an invented business, \"Ada Ankara Tailors\". Do not reuse its wording.*\n\n| Keyword | Intent | Volume (approx.) | Competition | Type |\n|---|---|---|---|---|\n| tailor in lagos | Local / buy | High | High | Head term |\n| ankara styles for owambe | Learn / inspire | Medium | Medium | Long-tail |\n| custom ankara jumpsuit lagos price | Buy | Low | Low | Long-tail |\n\n**Choice.** I would target *custom ankara jumpsuit lagos price* first: low volume but high buying intent and little competition.\n\n| Element | Current | Proposed |\n|---|---|---|\n| Title tag | Home | Custom Ankara Jumpsuits in Lagos, Made to Measure \\| Ada Ankara Tailors |\n| Meta description | (empty) | Order a made-to-measure Ankara jumpsuit in Lagos. See styles, prices and delivery times, and book a fitting today. |\n| H1 | Welcome | Custom Ankara Jumpsuits Made in Lagos |",
    tips: [
      "Do not copy long lists from a tool without saying what the intent behind each keyword is.",
      "Title tags and descriptions have length limits. Check yours, and make them read naturally for a person, not just a search engine.",
      "Screenshots are your proof of \"real\" research. Include them.",
    ],
  },

  4: {
    overview:
      "The first few emails a new subscriber receives set the tone for the whole relationship. You will plan an **automated welcome series** for a business of your choice, covering how it builds its list, how it segments subscribers and exactly what each email says.",
    tasks: [
      "Choose a business (real or fictional) and describe it in 2-3 sentences, including who its subscribers are.",
      "Explain your **list-building approach**: the **lead magnet** or reason to subscribe (for example a discount, guide or checklist), where the sign-up form appears, and how you obtain **clear consent** to email people (with reference to Nigerian data protection expectations).",
      "Explain **at least two segments** you will use (for example new customer vs. enquirer, or by interest or location) and how welcome content differs for each.",
      "Design a **sequence of four or five emails**. For each give: send timing, **goal**, **subject line**, a **preview text**, the key content in 2-3 lines, and the **single call to action**.",
      "Write the **full text of Email 1** (about 120-180 words) in a friendly, on-brand tone.",
      "Describe **deliverability practices**: sender name and address, an unsubscribe link, email authentication (SPF and DKIM), and keeping the list clean. Say which **metrics** you would track (open rate, click rate, unsubscribes) and what each tells you.",
    ],
    deliverables: [
      "A document (.docx, .pdf or .txt) of **800-1,200 words**.",
      "The sequence presented in a table: *Email | Timing | Goal | Subject line | Preview | Key content | CTA*, followed by the full text of Email 1.",
    ],
    criteria: [
      { name: "List building and consent", points: 20, description: "A credible lead magnet and clear, honest consent process." },
      { name: "Segmentation", points: 15, description: "At least two useful segments with different welcome content." },
      { name: "Email sequence design", points: 30, description: "Four or five emails with a logical build, clear goals, a single CTA each and sensible timing." },
      { name: "Email 1 copy", points: 15, description: "Well written, on-brand, with a strong subject line and clear CTA." },
      { name: "Deliverability and metrics", points: 20, description: "Correct good practice and a clear understanding of what each metric shows." },
    ],
    example:
      "*Worked example (extract) for an invented business, \"Bright Steps Learning Centre\". Do not reuse its wording.*\n\n| Email | Timing | Goal | Subject line | CTA |\n|---|---|---|---|---|\n| 1 | Immediately | Deliver the free \"reading at home\" guide and set expectations | Your reading guide is here, plus what to expect | Download the guide |\n| 2 | Day 2 | Build trust with a parent story | How Ifeoma's son went from hating books to asking for more | Read the story |\n| 3 | Day 5 | Educate | 3 mistakes parents make with bedtime reading | Book a free assessment |\n\n**Email 1 (extract).** *\"Hi Ada, welcome to Bright Steps! As promised, here is your free guide... In the next few days I will send you two short stories and a simple idea to try tonight. If you ever want to stop hearing from us, there is an unsubscribe link at the bottom of every email.\"*",
    tips: [
      "One email, one goal, one call to action. Do not try to do everything in every email.",
      "Consent must be clear. Do not add people to a list just because you have their number or email.",
      "Write the subject line as a person would type it. Avoid all capitals and spam-style wording.",
    ],
  },

  5: {
    overview:
      "A Google Ads campaign is only as good as its structure. Sloppy structure wastes money on clicks that never buy. You will design a complete **Google Ads Search campaign plan** for a business in a Nigerian state, from campaign choice down to the ad copy.",
    tasks: [
      "Describe a **business in a Nigerian state** (real or fictional), its goal (for example calls, bookings or sales), and a monthly budget in naira.",
      "Recommend the **campaign type** (for example Search, Performance Max or Display) and explain why it fits the goal better than the alternatives. Name the **conversion action** you will track.",
      "Design an **ad group structure** with **at least three ad groups**, each built around one tightly related theme. Show the structure as a list or table.",
      "For each ad group, list **target keywords** with their **match types** (broad, phrase or exact) and **at least five negative keywords** overall, with a reason for each negative.",
      "Choose a **bidding strategy** and justify it for this budget and goal.",
      "Write **sample ad copy** for one ad group: **at least five headlines (30 characters or fewer each)** and **at least two descriptions (90 characters or fewer each)**. Count the characters.",
      "Explain in 3-4 sentences how you would improve **Quality Score** and how you would track conversions.",
    ],
    deliverables: [
      "A campaign plan document of **800-1,200 words** (.docx, .pdf or .txt).",
      "An ad group table: *Ad group | Theme | Keywords (with match types) | Landing page*.",
      "The ad copy with the character count shown next to each line.",
    ],
    criteria: [
      { name: "Campaign type and goal fit", points: 15, description: "Sensible choice with reasons; a defined conversion action." },
      { name: "Ad group structure", points: 25, description: "Tight, themed ad groups that avoid mixing unrelated keywords." },
      { name: "Keywords and negatives", points: 20, description: "Relevant keywords with correct match types and a justified list of negatives." },
      { name: "Bidding and budget", points: 10, description: "A strategy that suits the budget and goal." },
      { name: "Ad copy", points: 20, description: "Persuasive, relevant, within character limits, with the keyword and a clear call to action." },
      { name: "Quality Score and tracking", points: 10, description: "Realistic steps to improve relevance and measure conversions." },
    ],
    example:
      "*Worked example (extract) for an invented business, \"Ibadan Driving School\". Do not reuse its wording.*\n\n| Ad group | Theme | Keywords | Landing page |\n|---|---|---|---|\n| Beginner lessons | First-time drivers | \"learn to drive ibadan\" (phrase), [driving lessons ibadan] (exact) | /beginner-lessons |\n| Licence test prep | Passing the test | \"driving test preparation\" (phrase) | /test-prep |\n\n**Negative keywords:** *free* (people who want free lessons will not pay), *jobs* (job seekers), *dvla* (a UK authority, so irrelevant), *car for sale*, *cheap used*.\n\n**Sample ad (Beginner lessons).**\n\nHeadlines: `Learn to Drive in Ibadan` (23) | `Patient Certified Instructors` (29) | `Book Your First Lesson Today` (28) | `Pass Your Test First Time` (25) | `Flexible Weekend Lessons` (24)\n\nDescriptions: `Friendly, patient instructors and modern cars. Book online in two minutes.` (73)",
    tips: [
      "Count characters. Ads that exceed the limits will simply be rejected by the platform.",
      "Mixing unrelated keywords in one ad group makes ads less relevant and lowers Quality Score.",
      "Negative keywords are half the skill: they stop you paying for people who will never buy.",
    ],
  },

  6: {
    overview:
      "Analytics is only useful if it answers the question *\"Are we winning?\"* You will build a reporting dashboard for a business, working from the data below, and write a short insight summary for its owner.",
    materials:
      "**Business (fictional): Sahel Shoes**, an online shoe shop.\n\n**SMART goals for June.** (1) Reach **₦6,500,000** online revenue in June. (2) Reach an overall **conversion rate of at least 2.5%** by the end of June.\n\n| Month | Channel | Sessions | Orders | Revenue (₦) | Ad spend (₦) |\n|---|---|---|---|---|---|\n| Apr | Organic search | 9,000 | 180 | 2,160,000 | 0 |\n| Apr | Paid search | 4,000 | 100 | 1,300,000 | 500,000 |\n| Apr | Email | 2,000 | 90 | 990,000 | 60,000 |\n| Apr | Social | 5,000 | 50 | 550,000 | 150,000 |\n| May | Organic search | 10,000 | 210 | 2,520,000 | 0 |\n| May | Paid search | 5,000 | 110 | 1,430,000 | 550,000 |\n| May | Email | 2,200 | 110 | 1,210,000 | 60,000 |\n| May | Social | 6,000 | 66 | 726,000 | 200,000 |\n| Jun | Organic search | 11,500 | 253 | 3,036,000 | 0 |\n| Jun | Paid search | 6,000 | 105 | 1,365,000 | 700,000 |\n| Jun | Email | 2,500 | 150 | 1,650,000 | 60,000 |\n| Jun | Social | 7,500 | 60 | 660,000 | 300,000 |",
    tasks: [
      "**Calculate** for each channel and month: **conversion rate** (orders divided by sessions), **cost per order** (spend divided by orders, where spend is above zero) and **ROI** ((revenue minus spend) divided by spend). Show your working for at least one channel.",
      "Build a **dashboard** (in Looker Studio, Google Sheets, Excel or a clear hand-made layout) with **five to seven widgets**. It must **lead with performance against the two SMART goals**, then show a **breakdown by channel**, then **trends over time**.",
      "Include a **screenshot or image** of the dashboard, and a short **legend** explaining each widget.",
      "Write an **insight summary of 150-250 words** for the business owner. State whether each goal was met, which channels are efficient or wasteful, and the **one action** you would take next month, with a reason.",
    ],
    deliverables: [
      "A single document (.docx or .pdf) containing your calculations, the dashboard image, the legend and the insight summary.",
      "Total written text about **500-800 words**.",
    ],
    criteria: [
      { name: "Calculations", points: 25, description: "Conversion rate, cost per order and ROI are calculated correctly with working shown." },
      { name: "Dashboard design", points: 30, description: "Leads with the SMART goals, then channel breakdown, then trends; widgets are clear and appropriate." },
      { name: "Insight summary", points: 30, description: "Correctly judges both goals, reads the channel data accurately and gives a justified next action." },
      { name: "Clarity", points: 15, description: "Neat presentation, legend and plain-language explanation." },
    ],
    example:
      "*Worked example (extract) using different numbers. Do not reuse its wording.*\n\nData: Email, July: 1,800 sessions, 90 orders, revenue ₦810,000, spend ₦40,000.\n\n- Conversion rate = 90 / 1,800 = **5.0%**\n- Cost per order = 40,000 / 90 = **₦444**\n- ROI = (810,000 - 40,000) / 40,000 = **1,925%**\n\n**Dashboard layout.** Top row: *Revenue vs ₦-goal* and *Conversion rate vs goal* as two large \"scorecards\". Middle: a bar chart of revenue by channel. Bottom: a line chart of orders per month.\n\n**Insight summary (extract).** *\"July revenue met the goal, but the conversion rate stayed below target. Email is the most efficient channel by a wide margin, so growing the email list is the best use of extra effort. Paid social is spending more each month but its orders are falling, so I recommend cutting its budget by a third and moving it to email list building.\"*",
    tips: [
      "Lead with the goals. A dashboard that starts with vanity numbers such as total sessions misses the point of this assignment.",
      "Do not just describe the chart. Say what it means and what to do about it.",
      "Check both goals separately. One can be met while the other is missed.",
    ],
  },

  7: {
    overview:
      "Most online shoppers who add something to their basket do not buy. **Marketing automation** brings some of them back without anyone lifting a finger. You will design a complete automated workflow, such as an **abandoned cart sequence**, for an e-commerce business.",
    tasks: [
      "Describe an **e-commerce business** (real or fictional), what it sells and its average order value.",
      "Define the workflow's **trigger** precisely (for example *a customer adds an item to their cart, does not check out within one hour and has an email address on file*) and any **entry conditions** or exclusions (for example exclude people who already bought).",
      "Design **at least three messages** with **timing** (for example 1 hour, 24 hours, 72 hours). For each, give the **channel** (email, SMS or WhatsApp), **subject or opening line**, the **purpose** and the **call to action**.",
      "Add **branching logic**: what happens if the customer **buys**, **opens but does not buy**, or **ignores everything**? State the **exit conditions**.",
      "Decide **if and when to offer an incentive** (for example a small discount or free delivery) and explain why you hold it back for later messages.",
      "Draw a **flowchart** of the workflow (hand-drawn, a free tool or a clear text diagram).",
      "State the **metrics** you would track (for example recovery rate, revenue recovered, unsubscribes) and one thing you would A/B test.",
    ],
    deliverables: [
      "A document (.docx or .pdf preferred) of **600-900 words** with the flowchart, a message table (*Step | Timing | Channel | Content | CTA*) and the metrics.",
    ],
    criteria: [
      { name: "Trigger and conditions", points: 15, description: "A precise trigger and sensible entry and exclusion rules." },
      { name: "Message sequence", points: 30, description: "At least three well-timed messages with distinct purposes and clear CTAs." },
      { name: "Branching and exit logic", points: 20, description: "Handles buyers, non-buyers and non-responders correctly; nobody is emailed after buying." },
      { name: "Incentive strategy", points: 10, description: "Sensible, reasoned use of discounts." },
      { name: "Flowchart and metrics", points: 25, description: "A clear diagram matching the written steps and realistic success measures with a test idea." },
    ],
    example:
      "*Worked example (extract) for a different automation: a post-purchase review request for an invented online bookshop. Do not reuse its wording.*\n\n**Trigger.** An order is marked *delivered*. **Exclusion.** Customers who already left a review or requested a refund.\n\n| Step | Timing | Channel | Content | CTA |\n|---|---|---|---|---|\n| 1 | 3 days after delivery | Email | \"How are you enjoying your book?\" with a one-tap star rating | Rate your book |\n| 2 | 7 days after delivery, only if no rating | WhatsApp (opted in) | Friendly reminder that reviews help other readers | Write a short review |\n\n**Branching.** If the customer gives 4-5 stars, invite them to post it publicly. If 1-3 stars, route to customer support instead of asking for a public review. **Exit:** review left, or 14 days pass.\n\n**Metric to track.** Review rate. **A/B test:** subject line with the book title vs. without.",
    tips: [
      "Test the logic: could a customer who has already bought still receive \"You left something behind\"? If yes, fix your exit rules.",
      "Do not offer a discount in message one. You teach customers to abandon carts on purpose.",
      "The flowchart and the written steps must match exactly.",
    ],
  },

  8: {
    overview:
      "Before the capstone, you must decide **exactly what you will build**. A capstone that tries to cover every channel is thin. A focused one across three or four well-chosen channels is far more convincing. This assignment is your **scope and approach**: get it right and the capstone becomes much easier.",
    tasks: [
      "Name the **specific business** for your capstone (real with permission, or a realistic fictional one) and describe it in 3-4 sentences.",
      "State the **single main business goal** the strategy will pursue, as a SMART goal (specific, measurable, achievable, relevant, time-bound).",
      "Choose **three or four channels** and explain briefly why each is included and why others are **excluded**.",
      "Write a **one-paragraph audience summary** based on your Day 2 personas.",
      "Set out your **budget split** by channel, your **timeline** in phases (for example days 1-2, 3-4, and so on) and the **KPIs** you will use to measure success for each channel.",
      "List **three risks** to your project (for example limited data or a small budget) and how you will manage each.",
    ],
    deliverables: [
      "A document (.docx, .pdf or .txt) of **400-700 words**.",
      "Include a *Scope table* with columns *Channel | Role in the funnel | Budget % | KPI | Timeline*.",
    ],
    criteria: [
      { name: "Business and SMART goal", points: 25, description: "A specific business and a genuinely SMART goal." },
      { name: "Channel choice and exclusions", points: 25, description: "Three or four channels with reasons, and excluded channels justified." },
      { name: "Budget, timeline and KPIs", points: 25, description: "Realistic and consistent with the goal." },
      { name: "Risks", points: 15, description: "Three realistic risks with mitigations." },
      { name: "Clarity and realism", points: 10, description: "Concise, focused and achievable within the course." },
    ],
    example:
      "*Worked example (extract) for an invented business, \"Zaria Print & Pack\". Do not reuse its wording.*\n\n**SMART goal.** *Generate 120 qualified quote requests from small businesses in Kaduna within 12 weeks, with a marketing budget of ₦400,000.*\n\n| Channel | Role in the funnel | Budget % | KPI | Timeline |\n|---|---|---|---|---|\n| Local SEO and Google Business profile | Awareness and consideration | 20% | Profile views and calls | Days 1-12 |\n| Google Search ads | Conversion | 45% | Cost per quote request | Days 3-12 |\n| Email | Nurture and follow-up | 15% | Quote-to-order rate | Days 4-12 |\n| WhatsApp Business | Conversion and retention | 20% | Response time and orders | Days 1-12 |\n\n**Excluded:** TikTok, because the target buyers (shop owners) are not looking for packaging on that platform.",
    tips: [
      "Resist the urge to add every channel. A tight scope shows judgement.",
      "Your goal must have a number and a deadline. \"Increase awareness\" is not SMART.",
      "Make sure your KPIs match your channel's role. Do not judge an awareness channel by sales alone.",
    ],
  },
};
