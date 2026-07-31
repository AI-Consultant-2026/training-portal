import { WeekSeed } from "./curriculumTypes";

export const WEEKS: WeekSeed[] = [
  {
    weekNumber: 2,
    moduleTitle: "Audience Personas, Positioning & Content Pillars",
    moduleDescription: "Audience personas, brand positioning, competitive analysis, and content pillars.",
    lessons: [
      {
        title: "Audience Personas & Brand Positioning",
        content: "Building research-based audience personas and defining consistent brand positioning and visual identity.",
        order: 1,
        durationMinutes: 25,
      },
      {
        title: "Competitive Analysis & Content Pillars",
        content: "Structured competitive analysis and organizing content around consistent pillars and a messaging framework.",
        order: 2,
        durationMinutes: 25,
      },
    ],
    assignmentTitle: "Audience Persona Development",
    assignmentDescription:
      "Develop detailed, specific audience personas for a fictional Delta State business, covering demographic details, psychographic details, platform behavior, and content preferences.",
    fileRequired: false,
    quizQuestions: [
      { text: "What are audience personas built from, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Real research rather than guesswork", isCorrect: true },
        { text: "The social media manager's personal assumptions about the target market", isCorrect: false },
        { text: "A single customer survey conducted once a year", isCorrect: false },
      ]},
      { text: "The 'Chidinma, 28, runs a small tailoring business in Asaba...' example is used in the lecture to illustrate what?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A specific, actionable persona, as opposed to a vague category", isCorrect: true },
        { text: "A real case study of a failed social media campaign", isCorrect: false },
        { text: "A competitor's brand positioning statement", isCorrect: false },
      ]},
      { text: "Where does the lecture say persona research should start?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Data the business already has, like customer records and existing analytics", isCorrect: true },
        { text: "Exclusively with paid third-party market research firms", isCorrect: false },
        { text: "Guessing based on what competitors seem to be doing", isCorrect: false },
      ]},
      { text: "How is brand positioning defined in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The specific place a brand occupies in a customer's mind relative to alternatives", isCorrect: true },
        { text: "The number of followers a brand has compared to competitors", isCorrect: false },
        { text: "The physical location of a business's storefront", isCorrect: false },
      ]},
      { text: "On social media, brand positioning shows up through which combination of elements, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Consistent voice and tone, visual identity, and value proposition", isCorrect: true },
        { text: "Posting frequency alone", isCorrect: false },
        { text: "Total advertising budget spent", isCorrect: false },
      ]},
      { text: "What test does the lecture suggest for checking whether brand positioning is distinct enough?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Removing the business's name and logo and seeing if the post is still recognizable", isCorrect: true },
        { text: "Comparing follower counts month over month", isCorrect: false },
        { text: "Checking whether the post got more than 100 likes", isCorrect: false },
      ]},
      { text: "What is the stated purpose of competitive analysis in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Understanding the landscape well enough to make deliberate, informed choices", isCorrect: true },
        { text: "Copying competitors' content as closely as possible", isCorrect: false },
        { text: "Determining which competitor has the most followers", isCorrect: false },
      ]},
      { text: "Which of these is explicitly named as part of a structured competitive analysis?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Content themes and formats that perform well, judged by engagement, not just follower count", isCorrect: true },
        { text: "The competitor's internal staffing budget", isCorrect: false },
        { text: "The competitor's tax filings", isCorrect: false },
      ]},
      { text: "What are content pillars?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Three to five core themes every piece of content should fall under", isCorrect: true },
        { text: "A list of every hashtag a brand has ever used", isCorrect: false },
        { text: "The specific days of the week content gets posted", isCorrect: false },
      ]},
      { text: "In the lecture's restaurant example, which is listed as a content pillar?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Behind-the-scenes kitchen content", isCorrect: true },
        { text: "Quarterly financial reports", isCorrect: false },
        { text: "Competitor price comparisons", isCorrect: false },
      ]},
      { text: "What is a messaging framework?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The specific language and key messages a brand consistently uses", isCorrect: true },
        { text: "A spreadsheet tracking follower growth", isCorrect: false },
        { text: "A schedule for when ads will run", isCorrect: false },
      ]},
      { text: "Why does the lecture say 'our audience is young people' is a poor way to describe an audience?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It is too broad to actually guide content decisions", isCorrect: true },
        { text: "It is factually incorrect for every business", isCorrect: false },
        { text: "It focuses too heavily on psychographic detail", isCorrect: false },
      ]},
      { text: "What does the lecture say direct conversations with real customers provide compared to guessing?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "They teach more than hours of guessing, even just a handful of honest conversations", isCorrect: true },
        { text: "They are less reliable than social media analytics alone", isCorrect: false },
        { text: "They should be avoided in favor of formal surveys only", isCorrect: false },
      ]},
      { text: "What is this week's practical exercise, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Write a full 5 to 10 page social media strategy document", isCorrect: true },
        { text: "Create a social media audit for a provided business", isCorrect: false },
        { text: "Manage a mock social media account for a week", isCorrect: false },
      ]},
      { text: "Content pillars are three to five core themes that every piece of content posted should fall under.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Competitive analysis is primarily about copying exactly what competitors do.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "A messaging framework defines the specific language and key messages a brand consistently uses.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Vague audience descriptions like 'business owners' are sufficient to guide content decisions, per the lecture.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "In one or two sentences, explain what an audience persona is and why specificity matters when creating one.", type: "short_answer", points: 1, explanation: "An audience persona is a detailed, semi-fictional representation of an ideal customer built from real research covering demographics, psychographics, platform behavior, and content preferences; making it specific rather than a vague category is what makes it actually useful for guiding content decisions.", answers: [] },
      { text: "In one or two sentences, explain the purpose of content pillars in a social media strategy.", type: "short_answer", points: 1, explanation: "Content pillars are three to five core themes that structure what a business posts, giving content consistency and making planning faster without needing a brand-new idea for every single post.", answers: [] },
    ],
  },
  {
    weekNumber: 3,
    moduleTitle: "Content Ideation, Copywriting & Calendar Planning",
    moduleDescription: "Content ideation, caption writing, hashtags, and content calendar planning.",
    lessons: [
      {
        title: "Ideation Frameworks & Writing for Social Media",
        content: "Structured ideation frameworks and writing captions, copy, and hashtags that work for how people scroll.",
        order: 1,
        durationMinutes: 25,
      },
      {
        title: "Content Calendars, Batching & Repurposing",
        content: "Planning a content calendar for consistency, and producing content efficiently through batching and repurposing.",
        order: 2,
        durationMinutes: 25,
      },
    ],
    assignmentTitle: "Content Calendar Template & 8-Week Calendar",
    assignmentDescription:
      "Build a reusable content calendar template and populate a full sample 8-week calendar, including dates, platforms, content pillars, captions, and required visual assets.",
    fileRequired: true,
    quizQuestions: [
      { text: "Why do professionals rely on structured ideation frameworks rather than waiting for inspiration?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Inspiration is unreliable, and a business needs consistent content regardless of how anyone feels", isCorrect: true },
        { text: "Frameworks are required by every platform's terms of service", isCorrect: false },
        { text: "Inspiration always produces lower-quality content than frameworks", isCorrect: false },
      ]},
      { text: "What is the 'content pillar rotation' framework?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Cycling systematically through established content pillars for each new post", isCorrect: true },
        { text: "Rotating which employee manages the account each week", isCorrect: false },
        { text: "Randomly selecting a platform to post on each day", isCorrect: false },
      ]},
      { text: "In the 'educate, entertain, inspire, convert' framework, what does conversion content do?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Directly and explicitly asks for a specific action, like a purchase or sign-up", isCorrect: true },
        { text: "Teaches the audience something useful without asking for action", isCorrect: false },
        { text: "Exists purely for enjoyment and shareability", isCorrect: false },
      ]},
      { text: "Why are customer questions a valuable source of content ideas, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "If one customer is asking, many more are silently wondering the same thing", isCorrect: true },
        { text: "They guarantee viral reach on every platform", isCorrect: false },
        { text: "They eliminate the need for a content calendar entirely", isCorrect: false },
      ]},
      { text: "Why does a caption's opening hook matter so much, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Most platforms truncate captions, showing only the first line before a 'see more' prompt", isCorrect: true },
        { text: "Platforms rank captions solely by total word count", isCorrect: false },
        { text: "The opening line is the only part audiences are required to read", isCorrect: false },
      ]},
      { text: "What three parts make up a strong caption structure, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "An opening hook, the substance or story, and a clear call to action", isCorrect: true },
        { text: "A hashtag list, a price list, and a disclaimer", isCorrect: false },
        { text: "A greeting, a company history, and a signature", isCorrect: false },
      ]},
      { text: "How does the lecture describe effective social media copywriting?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Shorter sentences, conversational language, and specific concrete details", isCorrect: true },
        { text: "Long, formal sentences that read like a legal document", isCorrect: false },
        { text: "Vague, general claims that apply to as many products as possible", isCorrect: false },
      ]},
      { text: "What specific, practical function do hashtags serve, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Extending content's discoverability beyond existing followers", isCorrect: true },
        { text: "Automatically improving caption grammar", isCorrect: false },
        { text: "Scheduling when a post goes live", isCorrect: false },
      ]},
      { text: "What hashtag mix does the lecture recommend?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A small number of broad, high-volume hashtags with a larger number of specific, niche hashtags", isCorrect: true },
        { text: "Only the single most popular hashtag available", isCorrect: false },
        { text: "As many hashtags as technically allowed, regardless of relevance", isCorrect: false },
      ]},
      { text: "What does a solid content calendar template include for each planned post, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Date and time, platform, content pillar, description, caption draft, and required visual assets", isCorrect: true },
        { text: "Only the final published engagement numbers", isCorrect: false },
        { text: "The personal social media passwords of the whole team", isCorrect: false },
      ]},
      { text: "What does planning content in advance allow for, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Consistency and proper quality control", isCorrect: true },
        { text: "Eliminating the need for captions altogether", isCorrect: false },
        { text: "Guaranteed virality for every post", isCorrect: false },
      ]},
      { text: "What is 'content batching'?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Creating multiple pieces of content in a single, focused work session", isCorrect: true },
        { text: "Posting identical content on every platform at the same time", isCorrect: false },
        { text: "Deleting underperforming posts in bulk", isCorrect: false },
      ]},
      { text: "What is 'repurposing,' as described in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Adapting one piece of core content into multiple different formats for different platforms", isCorrect: true },
        { text: "Reposting the identical file to every platform with no changes", isCorrect: false },
        { text: "Archiving old content that is no longer usable", isCorrect: false },
      ]},
      { text: "What is this week's assignment, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Build a content calendar template and populate a full sample 8-week calendar", isCorrect: true },
        { text: "Develop audience personas for a fictional business", isCorrect: false },
        { text: "Write a case study on a successful content campaign", isCorrect: false },
      ]},
      { text: "Repurposing means copy-pasting the same content identically across every platform.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "A strong caption should include a clear call to action telling the reader exactly what to do next.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Content batching is described in the lecture as less efficient than creating one post at a time, every day.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Effective hashtags help extend content's reach beyond an account's existing followers.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In one or two sentences, explain why a content calendar helps a social media manager maintain consistency and quality.", type: "short_answer", points: 1, explanation: "A content calendar maps out what gets posted, where, and when, in advance, which supports a predictable posting schedule that algorithms and audiences reward, and allows content to be reviewed before it's posted rather than created under last-minute pressure.", answers: [] },
      { text: "In one or two sentences, explain the difference between content batching and repurposing.", type: "short_answer", points: 1, explanation: "Batching means producing multiple pieces of content in one focused session instead of daily one-off creation, while repurposing means adapting a single piece of core content into different formats suited to different platforms.", answers: [] },
    ],
  },
  {
    weekNumber: 4,
    moduleTitle: "Visual & Video Content, UGC, and Trends vs. Evergreen",
    moduleDescription: "Visual and video content fundamentals, user-generated content, and trends vs. evergreen content.",
    lessons: [
      {
        title: "Photography, Graphics & Video Fundamentals",
        content: "Photography and graphic design fundamentals, plus short-form, long-form, and live video basics.",
        order: 1,
        durationMinutes: 25,
      },
      {
        title: "User-Generated Content & Trends vs. Evergreen",
        content: "Encouraging user-generated content and community engagement, and balancing trends against evergreen content.",
        order: 2,
        durationMinutes: 25,
      },
    ],
    assignmentTitle: "Successful Content Campaign Case Study",
    assignmentDescription:
      "Write a case study analyzing one genuinely successful content campaign, identifying what made it work and how it balanced trend-driven and evergreen elements.",
    fileRequired: false,
    quizQuestions: [
      { text: "What design principle does the lecture describe as placing the main subject along imagined gridlines rather than dead-center?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The rule of thirds", isCorrect: true },
        { text: "The golden hashtag rule", isCorrect: false },
        { text: "The engagement-first principle", isCorrect: false },
      ]},
      { text: "According to the lecture, what generally beats artificial lighting for product and lifestyle shots?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Good, natural lighting", isCorrect: true },
        { text: "A ring light set to maximum brightness", isCorrect: false },
        { text: "Flash photography", isCorrect: false },
      ]},
      { text: "What free tool does the lecture specifically mention for accessible graphic design?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Canva", isCorrect: true },
        { text: "Photoshop", isCorrect: false },
        { text: "Excel", isCorrect: false },
      ]},
      { text: "What is emphasized as critical for graphics, given that most social content is viewed on small mobile screens?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Readable, appropriately sized typography", isCorrect: true },
        { text: "Using as many colors as possible", isCorrect: false },
        { text: "Including the maximum amount of text allowed", isCorrect: false },
      ]},
      { text: "How long does short-form video (Reels, TikToks, YouTube Shorts) typically run, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Under 60 seconds", isCorrect: true },
        { text: "Between 10 and 20 minutes", isCorrect: false },
        { text: "Exactly 5 minutes", isCorrect: false },
      ]},
      { text: "How much time does short-form video generally have to hook a viewer, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The first one to three seconds", isCorrect: true },
        { text: "The first full minute", isCorrect: false },
        { text: "There is no meaningful time limit", isCorrect: false },
      ]},
      { text: "What does the lecture say viewers will forgive more readily than bad audio?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Imperfect visuals", isCorrect: true },
        { text: "A missing call to action", isCorrect: false },
        { text: "A video with no captions", isCorrect: false },
      ]},
      { text: "What is 'user-generated content' (UGC), per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Customer photos, reviews, and testimonials shared organically or through a branded hashtag or contest", isCorrect: true },
        { text: "Content exclusively produced by a business's in-house design team", isCorrect: false },
        { text: "Paid advertisements run through an ads manager", isCorrect: false },
      ]},
      { text: "Why does UGC carry genuine strategic value beyond saving production time, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It functions as authentic social proof that customers trust more than polished brand content", isCorrect: true },
        { text: "It is always cheaper to produce than paid advertising", isCorrect: false },
        { text: "It guarantees a higher follower count within a week", isCorrect: false },
      ]},
      { text: "What does the lecture say about accounts that consistently engage in two-way conversation versus accounts that only broadcast?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Engaging accounts build meaningfully stronger, more loyal audiences over time", isCorrect: true },
        { text: "There is no measurable difference between the two approaches", isCorrect: false },
        { text: "Broadcasting-only accounts always perform better long-term", isCorrect: false },
      ]},
      { text: "What is 'trending content,' as defined in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Content that capitalizes on a current cultural moment, like a popular audio clip or viral format", isCorrect: true },
        { text: "Content that has been posted for over a year without edits", isCorrect: false },
        { text: "Content created entirely by an automated tool", isCorrect: false },
      ]},
      { text: "What is the key risk of content built purely around chasing trends, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Trends fade extremely quickly, leaving little lasting long-term value", isCorrect: true },
        { text: "Trending content violates most platforms' terms of service", isCorrect: false },
        { text: "Trending content always costs more to produce than evergreen content", isCorrect: false },
      ]},
      { text: "What is 'evergreen content'?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Content that stays genuinely relevant and useful indefinitely, like a how-to guide", isCorrect: true },
        { text: "Content that can only be posted once per year", isCorrect: false },
        { text: "Content that is automatically deleted after 24 hours", isCorrect: false },
      ]},
      { text: "What does a well-balanced content strategy do regarding trends and evergreen content, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Uses both deliberately, rather than leaning entirely on just one", isCorrect: true },
        { text: "Avoids trending content completely in every case", isCorrect: false },
        { text: "Relies exclusively on trending content for long-term growth", isCorrect: false },
      ]},
      { text: "Modern smartphone cameras are described in the lecture as capable enough to begin producing content without expensive professional equipment.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Long-form video is where the lecture says an extremely strong hook is needed within the first one to three seconds.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Live video creates real-time engagement and a sense of authenticity that pre-recorded content can't replicate.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Evergreen content generates no further engagement once its initial posting moment has passed.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "In one or two sentences, explain what user-generated content is and why it's strategically valuable to a business.", type: "short_answer", points: 1, explanation: "User-generated content is customer photos, reviews, and testimonials shared organically or through a branded hashtag or contest; it's valuable because potential customers trust it as authentic social proof more readily than obviously brand-produced content.", answers: [] },
      { text: "In one or two sentences, explain the tradeoff between trending content and evergreen content.", type: "short_answer", points: 1, explanation: "Trending content can produce a dramatic short-term spike in reach but fades quickly and provides little lasting value, while evergreen content stays relevant and keeps generating engagement for months or years, so a balanced strategy uses both deliberately.", answers: [] },
    ],
  },
  {
    weekNumber: 5,
    moduleTitle: "Community Management, Brand Voice & Crisis Response",
    moduleDescription: "Community management, brand voice and tone, customer service, and crisis communication.",
    lessons: [
      {
        title: "Community Management, Voice & Engagement",
        content: "Community management best practices, developing a documented brand voice and tone, and driving deeper engagement.",
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "Customer Service, Crisis Response & Moderation",
        content: "Handling customer service, crisis communication, brand loyalty, and moderating trolls.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Community Management Playbook",
    assignmentDescription:
      "Develop a full community management playbook, including specific escalation procedures for handling negative feedback and crisis situations.",
    fileRequired: true,
    quizQuestions: [
      { text: "What is community management, as defined in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The ongoing, daily work of engaging with an audience rather than treating an account as one-way broadcast", isCorrect: true },
        { text: "The process of designing a brand's logo and visual identity", isCorrect: false },
        { text: "Scheduling posts weeks in advance with no further interaction", isCorrect: false },
      ]},
      { text: "How quickly does the lecture say audiences increasingly expect a reply, especially for customer service questions?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Within hours, not days", isCorrect: true },
        { text: "Within 30 days", isCorrect: false },
        { text: "There is no meaningful expectation for reply time", isCorrect: false },
      ]},
      { text: "What does the lecture warn against regarding replies to comments and messages?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Generic, obviously copy-pasted replies", isCorrect: true },
        { text: "Replying too quickly to customer questions", isCorrect: false },
        { text: "Using the brand's own established voice", isCorrect: false },
      ]},
      { text: "How does the lecture define 'voice,' as distinguished from 'tone'?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The consistent underlying personality of a brand", isCorrect: true },
        { text: "How a brand adapts to one specific situation", isCorrect: false },
        { text: "The specific hashtags a brand always uses", isCorrect: false },
      ]},
      { text: "How does the lecture define 'tone,' as distinguished from 'voice'?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "How the underlying voice adapts appropriately to different specific situations", isCorrect: true },
        { text: "The brand's permanent, unchanging personality", isCorrect: false },
        { text: "The total number of followers a brand has", isCorrect: false },
      ]},
      { text: "What does the lecture recommend every community manager work from?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A documented voice and tone guide with example phrases to use and avoid", isCorrect: true },
        { text: "A purely improvised approach with no written guidance", isCorrect: false },
        { text: "A single generic script used for every reply", isCorrect: false },
      ]},
      { text: "Which of the following is listed as a practical engagement tactic in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Asking direct, specific questions in captions to invite comments", isCorrect: true },
        { text: "Disabling comments to reduce moderation workload", isCorrect: false },
        { text: "Posting only promotional, sales-focused content", isCorrect: false },
      ]},
      { text: "What does the lecture say about acknowledging a customer service issue?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Acknowledge it publicly and promptly, even if resolution moves to a private message or call", isCorrect: true },
        { text: "Always resolve every issue entirely in public comments", isCorrect: false },
        { text: "Ignore it until the customer stops posting about it", isCorrect: false },
      ]},
      { text: "What should a community manager avoid when handling routine negative feedback, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Getting defensive or deleting legitimate criticism", isCorrect: true },
        { text: "Responding with genuine empathy", isCorrect: false },
        { text: "Offering a clear, concrete path toward resolution", isCorrect: false },
      ]},
      { text: "What does the lecture identify as a genuine crisis, as opposed to routine negative feedback?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A significant public backlash, a damaging story spreading rapidly, or a major service failure affecting many customers", isCorrect: true },
        { text: "A single customer leaving one negative comment", isCorrect: false },
        { text: "A post receiving fewer likes than usual", isCorrect: false },
      ]},
      { text: "According to the lecture, what is silence often interpreted as during a crisis?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Guilt, indifference, or incompetence", isCorrect: true },
        { text: "Careful, deliberate strategy", isCorrect: false },
        { text: "A neutral, harmless choice", isCorrect: false },
      ]},
      { text: "What does effective crisis communication require a business to have prepared in advance, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A documented escalation plan specifying who needs to be informed and involved", isCorrect: true },
        { text: "A pre-written denial statement for every possible incident", isCorrect: false },
        { text: "A plan to delete all negative comments immediately", isCorrect: false },
      ]},
      { text: "How is brand loyalty built, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Consistent, authentic engagement, recognizing loyal members, and reliably delivering real value", isCorrect: true },
        { text: "Posting exclusively promotional, sales-driven content", isCorrect: false },
        { text: "Responding to comments only once a month", isCorrect: false },
      ]},
      { text: "What does the lecture recommend when dealing with a persistent, bad-faith troll?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Know when and how to block or report them rather than engaging emotionally", isCorrect: true },
        { text: "Always engage them publicly and argue every point", isCorrect: false },
        { text: "Delete the entire account to avoid the interaction", isCorrect: false },
      ]},
      { text: "The lecture recommends deleting legitimate criticism to protect a brand's public image.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "A brand's voice can appropriately shift into a more serious, empathetic tone when responding to a genuine complaint.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Taking clear, visible ownership when a business is at fault is part of effective crisis communication, per the lecture.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Engaging emotionally with a troll is the recommended way to shut down bad-faith behavior.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "In one or two sentences, explain the difference between brand voice and brand tone.", type: "short_answer", points: 1, explanation: "Voice is a brand's consistent underlying personality, such as playful or authoritative, while tone is how that same voice adapts to fit a specific situation, such as becoming more serious and empathetic when handling a complaint.", answers: [] },
      { text: "In one or two sentences, explain why having a documented escalation plan matters for crisis communication.", type: "short_answer", points: 1, explanation: "A documented escalation plan specifies in advance who needs to be informed and involved once a situation crosses a defined severity threshold, so the team can respond quickly and calmly instead of improvising for the first time under real pressure.", answers: [] },
    ],
  },
  {
    weekNumber: 6,
    moduleTitle: "Paid Advertising: Platforms, Targeting & Budgeting",
    moduleDescription: "Ad platforms, campaign structure, audience targeting, budgeting, and A/B testing.",
    lessons: [
      {
        title: "Ad Platforms, Campaign Structure & Targeting",
        content: "Comparing Facebook, Instagram, LinkedIn, and TikTok ad platforms, campaign structure, and audience targeting.",
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "Ad Creative, Budgeting, Testing & Optimization",
        content: "Designing ad creative, budgeting and bid strategies, A/B testing, and performance optimization.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Ad Campaign Plan",
    assignmentDescription:
      "Create a comprehensive ad campaign plan for a Delta State business, including clear objectives, a defined target audience, and a realistic proposed budget.",
    fileRequired: true,
    quizQuestions: [
      { text: "Which platform's Ads Manager also controls advertising for Instagram, since Meta owns both?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Facebook Ads Manager", isCorrect: true },
        { text: "LinkedIn Ads", isCorrect: false },
        { text: "TikTok Ads", isCorrect: false },
      ]},
      { text: "Why are LinkedIn Ads worthwhile for B2B businesses despite a higher cost per click, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "They offer uniquely valuable professional targeting by job title, industry, or company size", isCorrect: true },
        { text: "They are the cheapest ad platform available", isCorrect: false },
        { text: "They require no minimum budget to run", isCorrect: false },
      ]},
      { text: "What does the lecture say tends to happen when a TikTok ad simply repurposes a polished, traditional ad video?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It tends to substantially underperform", isCorrect: true },
        { text: "It performs identically to native TikTok-style content", isCorrect: false },
        { text: "It is automatically rejected by TikTok", isCorrect: false },
      ]},
      { text: "What sits at the top of the ad campaign hierarchy, where the overall objective is selected?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The campaign", isCorrect: true },
        { text: "The ad set", isCorrect: false },
        { text: "The individual ad creative", isCorrect: false },
      ]},
      { text: "What does an ad set define, within the campaign hierarchy?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A specific audience, budget, and schedule", isCorrect: true },
        { text: "The overall campaign objective", isCorrect: false },
        { text: "The business's logo and brand colors", isCorrect: false },
      ]},
      { text: "Why does the lecture say choosing the right campaign objective matters, beyond being a technical setting?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Platforms actively optimize ad delivery toward whatever objective is selected", isCorrect: true },
        { text: "It only affects how the report looks, not actual delivery", isCorrect: false },
        { text: "It determines which country the ad can run in", isCorrect: false },
      ]},
      { text: "What is a 'custom audience,' per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "People who have already directly interacted with the business, like website visitors or an email list", isCorrect: true },
        { text: "People the platform has randomly selected with no prior connection", isCorrect: false },
        { text: "A group defined solely by age and gender", isCorrect: false },
      ]},
      { text: "What is a 'lookalike audience'?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "New people the platform identifies as closely resembling existing best customers", isCorrect: true },
        { text: "Everyone who has ever seen a competitor's ad", isCorrect: false },
        { text: "A list manually compiled by the business owner", isCorrect: false },
      ]},
      { text: "What does effective ad creative need, beyond the visual and video principles already covered, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A genuinely clear, unmistakable call to action", isCorrect: true },
        { text: "A minimum of five different fonts", isCorrect: false },
        { text: "No text of any kind", isCorrect: false },
      ]},
      { text: "What is a 'lifetime budget,' as described in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A fixed total amount spread intelligently across a campaign's entire specified duration", isCorrect: true },
        { text: "A set spending amount per day", isCorrect: false },
        { text: "An unlimited amount with no cap", isCorrect: false },
      ]},
      { text: "What bidding approach does the lecture recommend for beginners just starting out?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Automatic bidding, letting the platform's algorithm optimize spending", isCorrect: true },
        { text: "Manual bidding, for maximum control from day one", isCorrect: false },
        { text: "The highest possible bid on every ad", isCorrect: false },
      ]},
      { text: "What is the core discipline of effective A/B testing, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Changing only one variable at a time", isCorrect: true },
        { text: "Changing every variable simultaneously to save time", isCorrect: false },
        { text: "Testing only after a campaign has already ended", isCorrect: false },
      ]},
      { text: "What does 'cost per conversion' tell you, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "How efficiently the budget is actually being spent", isCorrect: true },
        { text: "How many people saw the ad at least once", isCorrect: false },
        { text: "The total lifetime value of a customer", isCorrect: false },
      ]},
      { text: "What does 'optimization' mean in the context of ad performance tracking, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Using performance data to pause underperforming ads and reallocate budget toward what's working", isCorrect: true },
        { text: "Running the exact same ad indefinitely without changes", isCorrect: false },
        { text: "Increasing the budget on every ad equally, regardless of performance", isCorrect: false },
      ]},
      { text: "A genuinely important practical principle for beginners is to start with a small test budget before committing significant money to a campaign.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Manual bidding is generally the recommended, sensible choice for beginners just starting out.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Return on ad spend compares the actual revenue generated against total ad spend.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Effective A/B testing changes multiple variables at once so results can be gathered faster.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "In one or two sentences, explain the difference between a custom audience and a lookalike audience in ad targeting.", type: "short_answer", points: 1, explanation: "A custom audience targets people who have already directly interacted with the business, such as past website visitors or an email list, while a lookalike audience targets new people the platform identifies as closely resembling those existing best customers.", answers: [] },
      { text: "In one or two sentences, explain why changing only one variable at a time matters in A/B testing.", type: "short_answer", points: 1, explanation: "If multiple variables like the image and headline are changed simultaneously, you can't tell which specific change actually caused any shift in performance, so isolating one variable is what makes the test results meaningful.", answers: [] },
    ],
  },
  {
    weekNumber: 7,
    moduleTitle: "Analytics, Reporting & ROI",
    moduleDescription: "Key metrics, analytics tools, ROI calculation, and stakeholder reporting.",
    lessons: [
      {
        title: "Key Metrics & Analytics Tools",
        content: "Core metrics like reach, impressions, engagement, and CTR, plus native and third-party analytics tools.",
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "Interpreting Data, Calculating ROI & Reporting",
        content: "Interpreting data, calculating ROI, and building actionable reports for stakeholders.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Analytics Dashboard & Reporting Template",
    assignmentDescription:
      "Develop a full social media analytics dashboard and accompanying reporting template that can be reused for future clients.",
    fileRequired: true,
    quizQuestions: [
      { text: "What is 'reach,' as defined in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The number of unique people who saw a piece of content at least once", isCorrect: true },
        { text: "Every single time content was displayed, including repeat views", isCorrect: false },
        { text: "The total number of comments a post receives", isCorrect: false },
      ]},
      { text: "What is 'impressions'?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Every single time content was displayed, including multiple views by the same person", isCorrect: true },
        { text: "The number of unique people reached", isCorrect: false },
        { text: "The percentage of viewers who clicked a link", isCorrect: false },
      ]},
      { text: "Why will impressions always be equal to or greater than reach, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Because impressions count repeat views by the same person, while reach counts each person once", isCorrect: true },
        { text: "Because impressions only count paid content", isCorrect: false },
        { text: "Because reach is measured monthly and impressions daily", isCorrect: false },
      ]},
      { text: "Why does the lecture say engagement rate is often more meaningful than raw follower count?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It reflects real audience interest rather than an inflated or inactive follower total", isCorrect: true },
        { text: "It is the only metric platforms allow businesses to see", isCorrect: false },
        { text: "It always produces a higher number than follower count", isCorrect: false },
      ]},
      { text: "What does 'click-through rate (CTR)' measure?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The percentage of people who saw content and actually clicked an included link", isCorrect: true },
        { text: "The percentage of people who left a comment", isCorrect: false },
        { text: "The total revenue generated from a campaign", isCorrect: false },
      ]},
      { text: "What does 'conversion rate' measure, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "What percentage of people who clicked through actually completed the desired action", isCorrect: true },
        { text: "The total number of people who saw a post", isCorrect: false },
        { text: "The number of hashtags used in a post", isCorrect: false },
      ]},
      { text: "What does the lecture say happens when every metric is tracked equally without clear prioritization?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It produces confusing noise rather than real, actionable clarity", isCorrect: true },
        { text: "It always improves overall campaign performance", isCorrect: false },
        { text: "It automatically satisfies stakeholder reporting requirements", isCorrect: false },
      ]},
      { text: "What does TikTok Analytics offer that the lecture specifically highlights as useful?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Video-specific data like average watch time and where viewers commonly drop off", isCorrect: true },
        { text: "Direct access to competitor ad budgets", isCorrect: false },
        { text: "Automatic caption translation into other languages", isCorrect: false },
      ]},
      { text: "What is the main limitation of native, built-in platform analytics tools, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Each one only shows data for its own single platform, in its own format", isCorrect: true },
        { text: "They are only available to paid advertisers", isCorrect: false },
        { text: "They cannot display engagement metrics at all", isCorrect: false },
      ]},
      { text: "What core value proposition do Hootsuite, Sprout Social, and Buffer share, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Consolidating scheduling, publishing, and analytics across multiple platforms into one dashboard", isCorrect: true },
        { text: "Guaranteeing a fixed increase in follower count", isCorrect: false },
        { text: "Replacing the need for any content strategy", isCorrect: false },
      ]},
      { text: "What does 'data interpretation' mean, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Looking beyond individual numbers to find genuinely meaningful patterns", isCorrect: true },
        { text: "Recording raw numbers exactly as they appear with no further analysis", isCorrect: false },
        { text: "Comparing a business only to its single largest competitor", isCorrect: false },
      ]},
      { text: "How is ROI typically calculated for social media, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The actual value generated divided by the total cost involved, expressed as a percentage or ratio", isCorrect: true },
        { text: "The total number of followers divided by the number of posts", isCorrect: false },
        { text: "The number of likes multiplied by the number of comments", isCorrect: false },
      ]},
      { text: "What does the lecture say is often the single hardest part of social media analytics?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Connecting social media metrics all the way through to real business outcomes", isCorrect: true },
        { text: "Counting the total number of likes on a post", isCorrect: false },
        { text: "Choosing which platform's native analytics to use", isCorrect: false },
      ]},
      { text: "What should an effective stakeholder report include, beyond a summary of performance, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Clear, specific, actionable recommendations, not just a passive recap", isCorrect: true },
        { text: "Only raw, unformatted spreadsheet exports", isCorrect: false },
        { text: "A complete history of every post ever made", isCorrect: false },
      ]},
      { text: "Impressions can be lower than reach if enough people view the same content multiple times.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Data visualization presents data through clear charts and graphs rather than dense spreadsheets, making patterns easier to grasp.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "According to the lecture, tracking every metric equally without prioritization produces clearer, more actionable insights.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "An effective report should include actionable recommendations rather than just a recap of what already happened.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In one or two sentences, explain the difference between reach and impressions.", type: "short_answer", points: 1, explanation: "Reach is the number of unique people who saw a piece of content at least once, while impressions count every single display of that content, including repeat views by the same person, so impressions are always equal to or greater than reach.", answers: [] },
      { text: "In one or two sentences, explain what makes a social media report to stakeholders genuinely useful, per the lecture.", type: "short_answer", points: 1, explanation: "A useful report leads with a clear summary of performance against the original stated goals, uses visualizations instead of dense data, and includes specific, actionable recommendations rather than just recapping what happened.", answers: [] },
    ],
  },
  {
    weekNumber: 8,
    moduleTitle: "Influencer Marketing & Video Strategy",
    moduleDescription: "Influencer marketing, partnership negotiation, and video marketing strategy.",
    lessons: [
      {
        title: "Influencer Identification, Vetting & Partnerships",
        content: "Identifying and vetting influencers, and negotiating partnership deliverables, compensation, and disclosure.",
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "Video Strategy & Capstone Preparation",
        content: "Matching video formats to strategic goals, platform-specific optimization, and capstone project preparation.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Video Marketing Strategy & Sample Content",
    assignmentDescription:
      "Create a full video marketing strategy along with actual sample video content, applying platform-specific formats and optimization principles.",
    fileRequired: true,
    quizQuestions: [
      { text: "How does the lecture define a 'micro-influencer'?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Someone with roughly one thousand to one hundred thousand followers", isCorrect: true },
        { text: "Someone with over ten million followers", isCorrect: false },
        { text: "Any influencer who charges no fee at all", isCorrect: false },
      ]},
      { text: "What does the lecture say micro-influencers very often deliver compared to major celebrities?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Dramatically better engagement rates and more affordable costs", isCorrect: true },
        { text: "Guaranteed viral reach on every single post", isCorrect: false },
        { text: "Access to exclusive platform features unavailable to celebrities", isCorrect: false },
      ]},
      { text: "What does 'relevance' mean when identifying the right influencer, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Whether the influencer's actual audience genuinely overlaps with the target personas", isCorrect: true },
        { text: "Whether the influencer has the highest follower count available", isCorrect: false },
        { text: "Whether the influencer lives in the same city as the business", isCorrect: false },
      ]},
      { text: "What can low, unresponsive engagement on a large influencer account sometimes indicate, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Purchased or fake followers", isCorrect: true },
        { text: "An unusually loyal, high-value audience", isCorrect: false },
        { text: "A recent change in the platform's algorithm", isCorrect: false },
      ]},
      { text: "What does 'vetting' an influencer involve, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Reviewing past content quality, checking for controversies, and assessing alignment with brand values", isCorrect: true },
        { text: "Simply confirming their follower count exceeds 10,000", isCorrect: false },
        { text: "Signing a contract before any research is done", isCorrect: false },
      ]},
      { text: "Which of the following must a partnership agreement clearly address, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Deliverables, compensation, usage rights, and disclosure requirements", isCorrect: true },
        { text: "Only the influencer's preferred filming location", isCorrect: false },
        { text: "The influencer's personal social media password", isCorrect: false },
      ]},
      { text: "What does the lecture say about disclosure requirements for paid partnerships in most jurisdictions, including Nigeria?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Paid partnerships must be clearly, honestly disclosed to the audience", isCorrect: true },
        { text: "Disclosure is optional and left entirely to the influencer's discretion", isCorrect: false },
        { text: "Disclosure is only required for partnerships over a certain dollar amount", isCorrect: false },
      ]},
      { text: "What does the lecture recommend regarding informal, verbal partnership agreements?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Never rely purely on an informal, verbal agreement for a paid partnership", isCorrect: true },
        { text: "Verbal agreements are sufficient for any partnership under three months", isCorrect: false },
        { text: "Written contracts are only needed for celebrity-level influencers", isCorrect: false },
      ]},
      { text: "What balance should influencer content guidelines strike, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Enough guidance to protect brand messaging while leaving genuine creative freedom", isCorrect: true },
        { text: "A fully scripted post with zero input from the influencer", isCorrect: false },
        { text: "No guidance at all, leaving everything to the influencer", isCorrect: false },
      ]},
      { text: "What does 'Reels and Shorts' prioritize, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Discovery through each platform's recommendation algorithm", isCorrect: true },
        { text: "Only reaching a business's existing followers", isCorrect: false },
        { text: "In-depth, long-form tutorial content", isCorrect: false },
      ]},
      { text: "What benefit does long-form YouTube content get, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It benefits from YouTube acting as a long-term search engine", isCorrect: true },
        { text: "It is automatically promoted to every user regardless of relevance", isCorrect: false },
        { text: "It requires no captions since viewers always watch with sound on", isCorrect: false },
      ]},
      { text: "Why does the lecture emphasize enabling captions on video content?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A very large share of video is watched with sound off, especially in public settings", isCorrect: true },
        { text: "Captions are required by every platform's terms of service", isCorrect: false },
        { text: "Captions automatically increase a video's follower count", isCorrect: false },
      ]},
      { text: "How should influencer campaign conversions be attributed, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Using unique tracking links or dedicated discount codes", isCorrect: true },
        { text: "By asking the influencer to self-report an estimated number", isCorrect: false },
        { text: "Conversions from influencer campaigns cannot be measured", isCorrect: false },
      ]},
      { text: "What is the subject of the capstone project described in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Building a complete social media presence for a new Delta State tourism business starting from zero followers", isCorrect: true },
        { text: "Auditing an already-established multinational brand's global campaign", isCorrect: false },
        { text: "Writing a research paper with no practical deliverable", isCorrect: false },
      ]},
      { text: "Micro-influencers are defined in the lecture as having between one thousand and one hundred thousand followers.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Vertical framing is recommended for Reels, TikTok, and Shorts because they are consumed almost entirely on mobile phones held vertically.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "The lecture recommends relying on a verbal agreement alone for paid influencer partnerships.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Live video is described in the lecture as creating a genuine sense of authenticity and immediacy.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In one or two sentences, explain why the lecture recommends vetting an influencer before entering a partnership.", type: "short_answer", points: 1, explanation: "Vetting means reviewing an influencer's past content quality, checking for prior controversies, and honestly assessing whether their style and values align with the brand, since a poor-fit or risky partnership could create real brand risk.", answers: [] },
      { text: "In one or two sentences, explain what the capstone project asks students to build, and how it should draw on earlier weeks.", type: "short_answer", points: 1, explanation: "The capstone asks students to build a complete social media presence for a new Delta State tourism business with zero existing followers, connecting the strategy, content, advertising, and analytics work from every earlier module into one coherent professional deliverable.", answers: [] },
    ],
  },
];
