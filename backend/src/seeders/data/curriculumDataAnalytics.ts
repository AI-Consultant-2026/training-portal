import { WeekSeed } from "./curriculumTypes";

// Data Analytics & Business Intelligence: 18 days, 4 lessons a day, each with an embedded
// YouTube video. A day's question bank is its 10-question module quiz plus the four lessons'
// 5-question knowledge checks (30 questions; Day 18, which has no module quiz, has 20).
// Generated from the course document; edit this file directly from now on. Examples are
// general rather than tied to any one country, every organisation and person is fictional,
// and the content quotes no prices or currencies. Every videoUrl was confirmed real and
// embeddable via the YouTube oEmbed endpoint before use. Lessons link the course data files
// served from /course-files/data-analytics/.
export const INTRO_VIDEO_URL = "https://www.youtube.com/watch?v=yZvFH7B6gKI";

export const WEEKS: WeekSeed[] = [
  {
    weekNumber: 1,
    moduleTitle: "Introduction to Data Analytics and Business Intelligence",
    moduleDescription: "In this module, learners find out what data is, how organisations turn it into decisions, and the six steps every analysis follows. They also set up the free accounts the course needs. No software skills are needed yet.",
    lessons: [
      {
        title: "What data is and why every organisation needs it",
        order: 1,
        durationMinutes: 60,
        videoUrl: "https://www.youtube.com/watch?v=PEWMgtu-1e4",
        content: "## Lesson introduction\n\n- **What you will study:** what data is, where it hides in everyday life, and why businesses collect it.\n- **Why it matters:** every report, dashboard and decision in this course starts with data. If you can spot data, you can start to use it.\n- **After this lesson you can:** define data, find data in everyday situations and explain how one business uses it.\n- **Estimated time:** 60 minutes.\n\n## The topic in simple English\n\nData is a record of something that happened.\n\nWhen a shop sells a bottle of water, it records what was sold, how many, the price and the time. Each of those facts is a piece of data.\n\nOne fact on its own tells you very little. Hundreds of facts together start to show patterns. For example, a shop may see that it sells more water on hot afternoons.\n\nThink of data as footprints. One footprint tells you someone walked past. Thousands of footprints show you the busiest paths.\n\n## Learning objectives\n\nBy the end of this lesson you will be able to:\n\n1. Define data in one sentence, in your own words.\n2. List at least five pieces of data recorded during a normal shop purchase.\n3. Explain the difference between data and information.\n4. Give two examples of decisions a business makes using data.\n\n## Main teaching content\n\n**1. What data is**\n\n- **What it means:** data is facts recorded about people, things or events, such as numbers, words, dates or yes/no answers.\n- **Why it is useful:** recorded facts can be counted, compared and checked later. Memory cannot.\n- **Everyday example:** your phone records every call: who, when and how long.\n- **Business example:** a supermarket's till records every item sold, its price and the time of sale.\n- **How it is used:** at the end of the day the manager adds up the records to see total sales.\n\n**2. Data versus information**\n\nData is the raw facts. Information is what you get after you organise those facts so they answer a question.\n\n- Data: \"Order 1004, Hilltop branch, 6 drinks, 350 each.\"\n- Information: \"Hilltop sold more drinks than any other branch this week.\"\n\nA simple way to remember it: data is the ingredients; information is the cooked meal.\n\n**3. Where data comes from in daily life**\n\nData is recorded everywhere, usually without anyone noticing:\n\n- A mobile money transfer records the sender, receiver, amount, date and time.\n- A hospital records each patient's visit, symptoms and treatment.\n- A school records attendance and exam scores.\n- A bus company records how many tickets are sold on each route.\n- A telecom network records every call, text and megabyte of data used.\n\n**4. Why organisations need data**\n\nWithout data, managers guess. With data, they can check. Data helps organisations to:\n\n1. **See what is happening:** how much did we sell last month?\n2. **Understand why:** why did sales fall in one branch?\n3. **Plan ahead:** how much stock do we need next month?\n4. **Measure results:** did the new advert bring in more customers?\n\n**5. Meet Sunrise Mart**\n\nThroughout this course you will help Sunrise Mart, a fictional supermarket with three branches: Central, Riverside and Hilltop. All its names and numbers are invented for learning. Here are its first ten sales records. Money is shown as plain numbers.\n\n| OrderID | Date | Branch | Category | Quantity | UnitPrice | Total |\n| --- | --- | --- | --- | --- | --- | --- |\n| 1001 | 2026-03-02 | Central | Drinks | 4 | 350 | 1,400 |\n| 1002 | 2026-03-02 | Riverside | Snacks | 2 | 500 | 1,000 |\n| 1003 | 2026-03-02 | Central | Groceries | 1 | 2,500 | 2,500 |\n| 1004 | 2026-03-03 | Hilltop | Drinks | 6 | 350 | 2,100 |\n| 1005 | 2026-03-03 | Riverside | Drinks | 3 | 350 | 1,050 |\n| 1006 | 2026-03-03 | Central | Snacks | 5 | 500 | 2,500 |\n| 1007 | 2026-03-04 | Hilltop | Groceries | 2 | 2,500 | 5,000 |\n| 1008 | 2026-03-04 | Riverside | Groceries | 1 | 2,500 | 2,500 |\n| 1009 | 2026-03-04 | Hilltop | Drinks | 8 | 350 | 2,800 |\n| 1010 | 2026-03-04 | Central | Drinks | 2 | 350 | 700 |\n\nEach row is one sale. Each column is one kind of fact about that sale. You will use this exact table again in Lessons 1.3 and 3.3.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Data | Recorded facts about events, people or things | Facts written down or saved | The time on a bus ticket | The price on a till record |\n| Information | Data organised to answer a question | Facts that tell you something useful | \"The 7am bus is always full\" | \"Hilltop sells the most drinks\" |\n| Record (row) | One complete entry in a dataset | One line in a list | One contact in your phone | One sale |\n| Field (column) | One type of fact stored for every record | One heading in a list | The phone number of every contact | The Quantity of every sale |\n| Dataset | A collection of records arranged in a table | A list of facts in rows and columns | Your class register | Sunrise Mart's sales table |\n\n## Step-by-step demonstration: finding the data in a receipt\n\nThis lesson has no software. The demonstration shows how to read a receipt as data.\n\n1. Take any shop receipt, or use this invented one: *Sunrise Mart, Riverside. 2026-03-05, 17:42. 2 × Bottled water @ 350. 1 × Bread @ 900. Total 1,600. Paid by card. Cashier 07.*\n2. Draw a table with two columns: **Field** and **Value**.\n3. Write each fact on its own row: Branch = Riverside; Date = 2026-03-05; Time = 17:42; Item 1 = Bottled water; Quantity 1 = 2; Price 1 = 350; Item 2 = Bread; Quantity 2 = 1; Price 2 = 900; Total = 1,600; Payment method = Card; Cashier = 07.\n4. Count your rows. You should have 12 pieces of data from one small receipt.\n5. **Check your work:** 2 × 350 = 700, plus 900, equals 1,600. The total on the receipt matches. Checking that numbers agree is the first habit of a good analyst.\n\n## Practical exercise: a week of your own data\n\n- **Task:** record one kind of data from your own life for 7 days.\n- **What you need:** paper, or a note on your phone.\n- **Steps:**\n  1. Choose one thing to track: your mobile data use (MB), your daily spending, your hours of sleep or the time you leave home.\n  2. Draw a table with four columns: Day, Date, Value, Note.\n  3. Fill in one row each day for 7 days.\n  4. At the end, write two sentences of information you can see. Example: \"I used the most data on Saturday. I sleep less on weekdays.\"\n- **Expected output:** a 7-row table and two sentences of information.\n- **Submit:** a photo or screenshot of your table plus your two sentences.\n\n## Knowledge check\n\n1. Which of these is the best description of data?\n   - A) Recorded facts about events, people or things\n   - B) A computer program\n   - C) A chart in a report\n   - D) A business decision\n2. \"Hilltop sold more drinks than any other branch this week.\" Is this data or information?\n   - A) Data, because it contains a number\n   - B) Neither\n   - C) A dataset\n   - D) Information, because it organises facts to answer a question\n3. In a sales table, what does one row usually represent?\n   - A) One type of fact, such as Price\n   - B) The whole shop\n   - C) One sale\n   - D) One month\n4. Which is NOT a reason organisations collect data?\n   - A) To see what is happening\n   - B) To understand why something happened\n   - C) To plan ahead\n   - D) To avoid ever having to make a decision\n5. A receipt shows 3 items at 200 each and a total of 700. What should an analyst do first?\n   - A) Ignore it\n   - B) Note that the total does not match and check it\n   - C) Delete the receipt\n   - D) Change the price to 233\n\n## Lesson summary\n\n1. Data is a record of something that happened.\n2. Information is data organised to answer a question.\n3. A dataset is a table: each row is one record and each column is one type of fact.\n4. Organisations use data to see, understand, plan and measure.\n5. Always check that numbers agree before you trust them.\n\n## Completion check\n\n- [ ] I can explain data and information in my own words.\n- [ ] I can find at least ten pieces of data on a receipt.\n- [ ] I know what a row and a column represent in a dataset.\n- [ ] I have recorded seven days of my own data.",
      },
      {
        title: "Data analytics and business intelligence explained",
        order: 2,
        durationMinutes: 60,
        videoUrl: "https://www.youtube.com/watch?v=wjILmMxantI",
        content: "## Lesson introduction\n\n- **What you will study:** what data analytics and business intelligence (BI) mean, how they differ, and the four types of analytics.\n- **Why it matters:** job adverts use these words all the time. Knowing exactly what they mean helps you understand what employers want.\n- **After this lesson you can:** explain analytics and BI, and sort any business question into one of four types.\n- **Estimated time:** 60 minutes.\n\n## The topic in simple English\n\n**Data analytics** means studying data to answer a question. It is detective work: you look at the facts to find out what happened and why.\n\n**Business intelligence** means giving managers regular, easy-to-read reports and dashboards so they can see how the business is doing at any time. It is like the dashboard of a car: one glance tells you speed, fuel and warnings.\n\nAnalytics answers a new question. BI keeps answering the same important questions every day, week or month.\n\n## Learning objectives\n\n1. Define data analytics and business intelligence in one sentence each.\n2. Explain one difference between analytics and BI with an example.\n3. Name the four types of analytics in order.\n4. Classify eight business questions by type of analytics.\n\n## Main teaching content\n\n**1. Data analytics**\n\n- **What it means:** examining data to answer a question or solve a problem.\n- **Why it is useful:** it replaces guesses with evidence.\n- **Everyday example:** you check your phone bill to find out why it was higher this month.\n- **Business example:** Sunrise Mart studies its sales to find out why Riverside sold less than the other branches.\n- **How it is used:** an analyst gathers the data, organises it, calculates totals and comparisons, and writes up what they found.\n\n**2. Business intelligence (BI)**\n\n- **What it means:** the tools and processes that turn data into regular reports and dashboards for decision-makers.\n- **Why it is useful:** managers see the important numbers without asking an analyst every time.\n- **Everyday example:** a football league table, updated after every match.\n- **Business example:** a bank's daily dashboard showing deposits, withdrawals and new accounts by branch.\n- **How it is used:** an analyst builds the dashboard once and sets it to refresh with new data automatically. You will build these in Power BI from Module 9.\n\n**3. The four types of analytics**\n\nAnalytics questions grow from simple to advanced. Each type builds on the one before.\n\n| Type | Question it answers | Sunrise Mart example | Difficulty |\n| --- | --- | --- | --- |\n| Descriptive | What happened? | How much did each branch sell last week? | Easiest |\n| Diagnostic | Why did it happen? | Why did Riverside sell less than Hilltop? | Moderate |\n| Predictive | What is likely to happen? | How many drinks will Hilltop sell next week? | Harder |\n| Prescriptive | What should we do? | Should we move drinks stock from Riverside to Hilltop? | Hardest |\n\nMost entry-level analyst work is descriptive and diagnostic. This course focuses on those two, with an introduction to the others.\n\n**4. Where analytics and BI meet**\n\nThey work together. An analyst investigates a question (analytics). If the answer matters every week, they turn it into a dashboard (BI). For example, once Sunrise Mart knows drinks drive Hilltop's sales, a \"drinks sales by branch\" chart goes on the weekly dashboard.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Data analytics | Examining data to answer questions and support decisions | Detective work with facts | Working out why your bill went up | Finding why one branch sells less |\n| Business intelligence (BI) | Tools and processes that deliver data as reports and dashboards | A business's car dashboard | A league table | A daily sales dashboard |\n| Dashboard | One screen of charts and key numbers | A summary at a glance | Your phone's battery and signal icons | Sales, profit and customers on one page |\n| KPI (key performance indicator) | A number that shows progress towards an important goal | The score that matters most | Your exam average | Daily sales against target |\n| Descriptive analytics | Analysis of what happened | The \"what\" | \"I spent more this month\" | \"Sales fell 10%\" |\n| Diagnostic analytics | Analysis of why it happened | The \"why\" | \"Because I travelled\" | \"Because a branch closed for 2 days\" |\n\n## Step-by-step demonstration: sorting questions by type\n\nFor each question, ask yourself: is it about **what** happened, **why**, **what next**, or **what to do**?\n\n1. \"How many customers visited Central branch in March?\" → asks *what happened* → **Descriptive**.\n2. \"Why did complaints rise in April?\" → asks *why* → **Diagnostic**.\n3. \"How many customers will we have in December?\" → asks *what next* → **Predictive**.\n4. \"Which branch should get the new freezer?\" → asks *what to do* → **Prescriptive**.\n\n**Tip:** look for the key word. \"How many\" or \"how much\" in the past means descriptive. \"Why\" means diagnostic. \"Will\" means predictive. \"Should\" means prescriptive.\n\n## Practical exercise\n\n- **Task:** classify eight questions and write two of your own.\n- **Questions:**\n  1. What was the total revenue last quarter?\n  2. Why did more customers cancel their data plans in June?\n  3. How many loan applications will we receive next month?\n  4. Should we open a fourth branch near the university?\n  5. Which product sold the most last week?\n  6. Why did machine downtime double at the plant in May?\n  7. Which customers are likely to stop using our service?\n  8. Which delivery route should drivers take to save fuel?\n- **Steps:** for each question, write its type and the key word that told you.\n- **Then:** write one descriptive and one diagnostic question about a business you know, such as a pharmacy or a transport company.\n- **Expected output:** 8 classifications and 2 new questions.\n- **Submit:** your list.\n\n## Knowledge check\n\n1. Which statement best describes business intelligence?\n   - A) Writing computer games\n   - B) Collecting data by hand only\n   - C) Regular reports and dashboards that help managers see performance\n   - D) Predicting the weather\n2. \"Why did sales fall at Riverside?\" is which type of analytics?\n   - A) Diagnostic\n   - B) Descriptive\n   - C) Predictive\n   - D) Prescriptive\n3. \"How many drinks will Hilltop sell next week?\" is which type?\n   - A) Descriptive\n   - B) Diagnostic\n   - C) Predictive\n   - D) Prescriptive\n4. What is a KPI?\n   - A) A type of chart\n   - B) A database\n   - C) A spreadsheet formula\n   - D) A number that shows progress towards an important goal\n5. Which type of analytics is the most common in entry-level analyst jobs?\n   - A) Prescriptive only\n   - B) Descriptive and diagnostic\n   - C) Predictive only\n   - D) None of them\n\n## Lesson summary\n\n1. Data analytics is detective work: answering a question with data.\n2. Business intelligence delivers the same important numbers regularly, through reports and dashboards.\n3. The four types are descriptive (what), diagnostic (why), predictive (what next) and prescriptive (what to do).\n4. Key words help: \"how many\", \"why\", \"will\", \"should\".\n5. Analytics finds the answer; BI keeps showing it.\n\n## Completion check\n\n- [ ] I can explain analytics and BI to a friend.\n- [ ] I can name the four types of analytics in order.\n- [ ] I classified all eight practice questions.\n- [ ] I wrote one descriptive and one diagnostic question of my own.",
      },
      {
        title: "The data analysis process: from question to decision",
        order: 3,
        durationMinutes: 75,
        videoUrl: "https://www.youtube.com/watch?v=lgCNTuLBMK4",
        content: "## Lesson introduction\n\n- **What you will study:** the six steps every analysis follows, from asking a question to taking action.\n- **Why it matters:** analysts who follow a process get reliable answers. Analysts who jump straight to charts often answer the wrong question.\n- **After this lesson you can:** name the six steps and carry out a complete small analysis by hand.\n- **Estimated time:** 75 minutes.\n\n## The topic in simple English\n\nAnalysing data is like cooking a meal. You decide what to cook (the question). You buy ingredients (collect data). You wash and cut them (clean the data). You cook (analyse). You serve it nicely on a plate (visualise). Then people eat and decide whether to order it again (act).\n\nSkip a step and the meal goes wrong. Serve unwashed vegetables and nobody trusts the cook.\n\n## Learning objectives\n\n1. Name the six steps of the data analysis process in order.\n2. Explain what happens in each step in one sentence.\n3. Turn a vague business worry into a clear, answerable question.\n4. Complete a six-step analysis on ten sales records by hand.\n\n## Main teaching content\n\n**Step 1. Ask: define the question**\n\n- **What it means:** write down exactly what you need to find out.\n- **Why it is useful:** a clear question tells you which data you need and when you are finished.\n- **Everyday example:** \"Am I spending too much?\" is vague. \"How much did I spend on transport each week in March?\" is clear.\n- **Business example:** \"Sales are bad\" becomes \"Which branch had the lowest sales in the first week of March, and in which category?\"\n- **How it is used:** a good question names *what* to measure, *where* and *over what time*.\n\n**Step 2. Collect: gather the data**\n\nFind the data that answers the question. It may already exist (the till system) or you may need to collect it (a customer survey). Module 2 covers this in detail.\n\n**Step 3. Clean: fix the mistakes**\n\nReal data has errors: missing values, spelling mistakes, duplicates, numbers stored as text. Cleaning means finding and fixing them before analysis. Analysts often spend a large share of their time here. Module 4 teaches it in Excel.\n\n**Step 4. Analyse: calculate and compare**\n\nAdd, count, average and compare to answer the question. For example: total sales per branch.\n\n**Step 5. Visualise: show the result**\n\nPresent the answer as a chart or simple table so people understand it quickly. Module 8 covers this.\n\n**Step 6. Act: decide and follow up**\n\nUse the answer to make a decision, then measure the result. The result often raises a new question, and the cycle starts again.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Business question | A specific question an analysis must answer | What exactly we want to know | \"How much did I spend on transport in March?\" | \"Which branch sold the least?\" |\n| Data cleaning | Finding and correcting errors in data before use | Fixing mistakes in a list before using it | Correcting a misspelt name in your contacts | Removing a sale entered twice |\n| Analysis | Calculating and comparing data to answer a question | Doing the maths | Adding up your weekly costs | Totalling sales per branch |\n| Visualisation | Showing data as a chart, graph or table | A picture of the numbers | A bar on a fuel gauge | A bar chart of branch sales |\n| Insight | A useful finding that can guide a decision | The \"aha\" moment | \"I spend most on Fridays\" | \"Hilltop sells 61% of our drinks\" |\n\n## Step-by-step demonstration: a complete analysis by hand\n\nSunrise Mart's manager says: \"I think we should stock more drinks somewhere, but I don't know where.\"\n\n**1. Ask.** Rewrite the worry as a clear question: *\"Between 2 and 4 March 2026, which branch sold the most drinks, and how much were they worth?\"*\n\n**2. Collect.** Use the ten sales records from Lesson 1.1. They cover 2–4 March.\n\n**3. Clean.** Check each row:\n\n- Is any row missing a value? No.\n- Is any order number repeated? No: 1001 to 1010 appear once each.\n- Does Quantity × UnitPrice equal Total on every row? Check order 1004: 6 × 350 = 2,100. Correct. Check all ten the same way. All are correct.\n\n**4. Analyse.** Keep only the Drinks rows: 1001, 1004, 1005, 1009 and 1010. Then total them by branch.\n\n| Branch | Drinks orders | Units sold | Drinks sales |\n| --- | --- | --- | --- |\n| Hilltop | 1004, 1009 | 6 + 8 = 14 | 2,100 + 2,800 = 4,900 |\n| Central | 1001, 1010 | 4 + 2 = 6 | 1,400 + 700 = 2,100 |\n| Riverside | 1005 | 3 | 1,050 |\n| **All branches** | 5 orders | **23** | **8,050** |\n\n**Check:** 23 units × 350 = 8,050. The total matches.\n\nHilltop's share of drinks units: 14 ÷ 23 = 0.61, or **61%**.\n\n**5. Visualise.** Draw a bar chart with one bar per branch: Hilltop 14 units, Central 6, Riverside 3. The tallest bar shows the answer at a glance.\n\n**6. Act.** Write the recommendation:\n\n> \"Hilltop sold 14 of the 23 drinks units (61%) between 2 and 4 March. We recommend a two-week trial of extra drinks stock at Hilltop. Three days is a short period, so we should check the next two weeks of sales before making it permanent.\"\n\nNotice the last sentence. A good analyst always says how strong the evidence is.\n\n## Practical exercise\n\n- **Task:** use the same ten records to answer a new question by following all six steps.\n- **Question:** *\"Which branch had the highest total sales across all categories between 2 and 4 March 2026?\"*\n- **Steps:**\n  1. Write the question in your own words (Ask).\n  2. Note which records you will use (Collect).\n  3. Check every row: missing values, repeated orders, Quantity × UnitPrice = Total (Clean).\n  4. Add up Total for each branch, then the grand total. Check that the three branch totals add up to the grand total (Analyse).\n  5. Draw a simple bar chart (Visualise).\n  6. Write a two-sentence recommendation that includes a note on how much data you had (Act).\n- **Expected output:** three branch totals, a grand total, one chart and a recommendation.\n- **Submit:** a photo of your working, chart and recommendation.\n\n## Knowledge check\n\n1. What is the correct order of the six steps?\n   - A) Collect, Ask, Analyse, Clean, Act, Visualise\n   - B) Analyse, Visualise, Ask, Act, Clean, Collect\n   - C) Ask, Analyse, Collect, Visualise, Clean, Act\n   - D) Ask, Collect, Clean, Analyse, Visualise, Act\n2. Which is the clearest business question?\n   - A) \"Are sales bad?\"\n   - B) \"What is happening?\"\n   - C) \"Which product had the lowest sales in Riverside branch in March?\"\n   - D) \"Can we do better?\"\n3. Why do we clean data before analysing it?\n   - A) Because errors in the data lead to wrong answers\n   - B) To make the file smaller\n   - C) Because charts need it\n   - D) It is optional\n4. Drinks units were Hilltop 14, Central 6, Riverside 3. What is Central's share?\n   - A) 6%\n   - B) About 26%\n   - C) About 61%\n   - D) 13%\n5. Why did the recommendation suggest a two-week trial?\n   - A) Because the numbers were wrong\n   - B) Because the manager asked for it\n   - C) Because three days of data is limited evidence\n   - D) Because drinks expire in two weeks\n\n## Lesson summary\n\n1. Every analysis follows six steps: Ask, Collect, Clean, Analyse, Visualise, Act.\n2. A clear question names what to measure, where and over what time.\n3. Cleaning comes before analysis, always.\n4. Check totals two ways: row by row, and parts adding up to the whole.\n5. A good recommendation says how strong the evidence is.\n\n## Completion check\n\n- [ ] I can list the six steps from memory.\n- [ ] I can rewrite a vague worry as a clear question.\n- [ ] I completed the branch totals exercise and my totals add up.\n- [ ] My recommendation mentions how much data it is based on.",
      },
      {
        title: "Data careers, tools and how this course works",
        order: 4,
        durationMinutes: 75,
        videoUrl: "https://www.youtube.com/watch?v=YRJbhFLLPyE",
        content: "## Lesson introduction\n\n- **What you will study:** the jobs data skills lead to, the tools you will learn, how the course is assessed, and how to set up your free accounts.\n- **Why it matters:** knowing where you are going makes the 18 weeks easier to plan. Setting up now means no delays later.\n- **After this lesson you can:** describe three data roles, name the course tools and their purpose, and open Excel for the web.\n- **Estimated time:** 75 minutes.\n\n## The topic in simple English\n\nData skills are used in almost every kind of organisation: banks, telecom companies, oil and gas firms, hospitals, shops, government offices and charities.\n\nIn this course you learn four main tools. Think of them as kitchen tools, each good at a different job:\n\n- **Excel** is your chopping board: quick, flexible and good for small and medium jobs.\n- **SQL** is your pantry key: it fetches exactly the ingredients you need from a large store.\n- **Power BI** is your serving dish: it presents results as interactive dashboards.\n- **Python** is your food processor: powerful for big, repeated or complex jobs.\n\n## Learning objectives\n\n1. Describe what three entry-level data roles do.\n2. Match each course tool to its main purpose.\n3. Explain how the course is assessed and what you need to pass.\n4. Open Excel for the web and create a course folder.\n\n## Main teaching content\n\n**1. Entry-level data roles**\n\n| Role | What they do day to day | Main tools |\n| --- | --- | --- |\n| Junior data analyst | Cleans data, calculates figures, answers questions from managers | Excel, SQL, Power BI |\n| Reporting analyst | Produces regular weekly and monthly reports and dashboards | Excel, Power BI |\n| Junior business analyst | Works out what a team needs, then uses data to support decisions | Excel, Power BI, written reports |\n| Customer insights analyst | Studies customer behaviour, such as who buys what and who leaves | Excel, SQL, Python |\n| Operations data analyst | Tracks production, downtime, costs and performance | Excel, Power BI |\n\nModule 18 includes a full career guide for nine roles. Completing this course builds skills and a portfolio. It does not guarantee a job, and some roles also ask for experience or other qualifications.\n\n**2. The tools and when you learn them**\n\n| Tool | What it is | What you use it for | Modules |\n| --- | --- | --- | --- |\n| Excel | A spreadsheet program | Organising, calculating, cleaning and summarising data | 3–4 |\n| SQL | A language for asking questions of a database | Retrieving and summarising data from large tables | 5–6 |\n| Power BI | Microsoft's reporting and dashboard tool | Interactive reports and dashboards | 9–11 |\n| Python | A programming language | Cleaning, analysing and charting larger datasets | 12–13 |\n\n**3. How the course works**\n\n- Each day in the portal is one module of four lessons. Lesson 1 opens first; once you have submitted that day's quiz and assignment, Lessons 2 to 4 open. Work at your own pace.\n- Each lesson ends with a 5-question knowledge check.\n- Each day has a 10-question quiz, drawn from a bank of questions on that day's topics, and a practical assignment.\n- The course ends with a capstone project chosen from four options.\n- You complete the course with 60% or more overall, provided you submit every required capstone item.\n\n**4. Your study habits**\n\n1. Set fixed study times, such as one hour on four evenings a week.\n2. Do every exercise yourself. Watching is not the same as doing.\n3. Keep all your work in one folder. It becomes your portfolio.\n4. Ask your instructor when you are stuck for more than 20 minutes.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Spreadsheet | A grid of rows and columns for storing and calculating data | A smart table | A class register | A sales list with totals |\n| Database | An organised store of data held in tables | A digital filing cabinet | Your phone's contact list | A bank's customer records |\n| SQL | Structured Query Language, used to ask a database for data | Polite instructions to the filing cabinet | \"Show me all contacts named Ada\" | \"Show all transactions over 100,000\" |\n| Portfolio | A collection of work that shows your skills | Your proof of ability | An artist's sketchbook | Dashboards and reports you built |\n| Cloud tool | Software you use in a web browser | An app you don't install | Web email | Excel for the web, Google Colab |\n\n## Step-by-step demonstration: setting up your workspace\n\n**Part 1. Open Excel for the web (free)**\n\n1. Open a web browser (Chrome, Edge or Safari) and go to **office.com**.\n2. Click **Sign in**. If you have no Microsoft account, click **Create one** and follow the steps with your own email address.\n3. After signing in, click the **Excel** icon on the left side of the page.\n4. Click **Blank workbook**. A grid of empty boxes appears. You are now in Excel.\n5. Click the name **Book** at the top of the screen and type **Course practice**. Press **Enter**. Excel saves the file to your OneDrive automatically.\n\n**Part 2. Create your course folder**\n\n1. Go to **onedrive.com** (same account).\n2. Click **+ Create or upload**, then **Folder**. Name it **Data Analytics Course**.\n3. Inside it, create three folders: **Exercises**, **Assignments** and **Portfolio**.\n4. Move your **Course practice** workbook into **Exercises**.\n\n**Part 3. Google account for later**\n\nModule 12 uses Google Colab, which needs a free Google account. If you have Gmail, you already have one. You do not need it before Module 12.\n\n**Check:** you can open **Course practice** from your **Exercises** folder.\n\n## Practical exercise\n\n- **Task:** set up your workspace and plan your study week.\n- **Steps:**\n  1. Complete Parts 1 and 2 of the demonstration.\n  2. In **Course practice**, click cell **A1** and type **Day**. In **B1** type **Study time**. In **C1** type **Hours**.\n  3. In cells A2 to A8, type the seven days of the week.\n  4. In column B, type the time you plan to study each day, or \"Rest\".\n  5. In column C, type the hours as a number, such as 1 or 1.5.\n- **Expected output:** a seven-row study plan in Excel adding up to 5–7 hours.\n- **Submit:** a screenshot of your study plan and of your folder structure.\n\n## Knowledge check\n\n1. Which tool is mainly used to ask questions of a database?\n   - A) Power BI\n   - B) Excel\n   - C) SQL\n   - D) A web browser\n2. What does a reporting analyst mainly do?\n   - A) Repairs computers\n   - B) Sells products\n   - C) Writes contracts\n   - D) Produces regular reports and dashboards\n3. What overall score do you need to complete the course?\n   - A) 60%, with all capstone items submitted\n   - B) 40%\n   - C) 50%\n   - D) 100%\n4. Why should you keep all your work in one folder?\n   - A) Excel requires it\n   - B) It becomes your portfolio\n   - C) It makes files smaller\n   - D) There is no reason\n5. Which statement about this course is true?\n   - A) Completing it guarantees a job\n   - B) It is a university degree\n   - C) It needs paid software\n   - D) It builds skills and a portfolio, but does not guarantee a job\n\n## Lesson summary\n\n1. Data skills are used in banking, telecoms, oil and gas, retail, health and government.\n2. Excel, SQL, Power BI and Python each do a different job.\n3. Each day has four lessons, a quiz and an assignment; the course ends with a capstone.\n4. Excel for the web is free with a Microsoft account.\n5. Your course folder will become your portfolio.\n\n## Completion check\n\n- [ ] I can describe three data roles.\n- [ ] I can open Excel for the web.\n- [ ] My course folder has Exercises, Assignments and Portfolio folders.\n- [ ] My study plan is saved in Excel.",
      },
    ],
    assignmentTitle: "A data audit of a small business",
    assignmentDescription: "A small business owner near you, such as a pharmacy, a phone shop, a mobile money agent, a restaurant or a transport company, wants to start using data.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "A dataset is best described as:",
        type: "multiple_choice",
        points: 1,
        explanation: "A dataset is records in rows and columns",
        answers: [
          {
            text: "A collection of records arranged in rows and columns",
            isCorrect: true,
          },
          {
            text: "A single number",
            isCorrect: false,
          },
          {
            text: "A chart",
            isCorrect: false,
          },
          {
            text: "A computer",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is information rather than raw data?",
        type: "multiple_choice",
        points: 1,
        explanation: "It organises facts into a finding",
        answers: [
          {
            text: "\"Order 1007, Hilltop, Groceries, 2\"",
            isCorrect: false,
          },
          {
            text: "\"2026-03-04\"",
            isCorrect: false,
          },
          {
            text: "\"Groceries brought in the most money at Hilltop this week\"",
            isCorrect: true,
          },
          {
            text: "\"350\"",
            isCorrect: false,
          },
        ],
      },
      {
        text: "\"Should we close the Riverside branch on Sundays?\" is which type of analytics?",
        type: "multiple_choice",
        points: 1,
        explanation: "\"Should\" asks what to do: prescriptive",
        answers: [
          {
            text: "Descriptive",
            isCorrect: false,
          },
          {
            text: "Diagnostic",
            isCorrect: false,
          },
          {
            text: "Predictive",
            isCorrect: false,
          },
          {
            text: "Prescriptive",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which best describes the difference between analytics and BI?",
        type: "multiple_choice",
        points: 1,
        explanation: "Analytics investigates; BI reports regularly",
        answers: [
          {
            text: "There is no difference",
            isCorrect: false,
          },
          {
            text: "Analytics investigates a question; BI delivers important figures regularly through reports and dashboards",
            isCorrect: true,
          },
          {
            text: "BI is only for banks",
            isCorrect: false,
          },
          {
            text: "Analytics uses only charts",
            isCorrect: false,
          },
        ],
      },
      {
        text: "In the six-step process, what comes straight after Collect?",
        type: "multiple_choice",
        points: 1,
        explanation: "Clean comes straight after Collect",
        answers: [
          {
            text: "Analyse",
            isCorrect: false,
          },
          {
            text: "Clean",
            isCorrect: true,
          },
          {
            text: "Visualise",
            isCorrect: false,
          },
          {
            text: "Act",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A row shows Quantity 4, UnitPrice 500, Total 2,500. What is the problem?",
        type: "multiple_choice",
        points: 1,
        explanation: "4 × 500 = 2,000, so the row needs checking",
        answers: [
          {
            text: "Nothing; it is correct",
            isCorrect: false,
          },
          {
            text: "The quantity is too small",
            isCorrect: false,
          },
          {
            text: "The price is too high",
            isCorrect: false,
          },
          {
            text: "The total should be 2,000, so the row needs checking",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which is a KPI for a telecom company?",
        type: "multiple_choice",
        points: 1,
        explanation: "Monthly customer loss (churn) is a KPI",
        answers: [
          {
            text: "The percentage of customers who leave each month",
            isCorrect: true,
          },
          {
            text: "The colour of its logo",
            isCorrect: false,
          },
          {
            text: "The name of its CEO",
            isCorrect: false,
          },
          {
            text: "The office address",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Branch drinks sales were 4,900, 2,100 and 1,050. What is the total?",
        type: "multiple_choice",
        points: 1,
        explanation: "4,900 + 2,100 + 1,050 = 8,050",
        answers: [
          {
            text: "7,000",
            isCorrect: false,
          },
          {
            text: "7,950",
            isCorrect: false,
          },
          {
            text: "8,050",
            isCorrect: true,
          },
          {
            text: "8,500",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which tool will you use to build interactive dashboards?",
        type: "multiple_choice",
        points: 1,
        explanation: "Power BI builds interactive dashboards",
        answers: [
          {
            text: "SQL",
            isCorrect: false,
          },
          {
            text: "Power BI",
            isCorrect: true,
          },
          {
            text: "Google Colab",
            isCorrect: false,
          },
          {
            text: "A calculator",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why should a recommendation mention how much data it is based on?",
        type: "multiple_choice",
        points: 1,
        explanation: "Decision-makers need to know how strong the evidence is",
        answers: [
          {
            text: "So decision-makers know how strong the evidence is",
            isCorrect: true,
          },
          {
            text: "Because the template requires it",
            isCorrect: false,
          },
          {
            text: "To hide mistakes",
            isCorrect: false,
          },
          {
            text: "To make it longer",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which of these is the best description of data?",
        type: "multiple_choice",
        points: 1,
        explanation: "data is recorded facts",
        answers: [
          {
            text: "Recorded facts about events, people or things",
            isCorrect: true,
          },
          {
            text: "A computer program",
            isCorrect: false,
          },
          {
            text: "A chart in a report",
            isCorrect: false,
          },
          {
            text: "A business decision",
            isCorrect: false,
          },
        ],
      },
      {
        text: "\"Hilltop sold more drinks than any other branch this week.\" Is this data or information?",
        type: "multiple_choice",
        points: 1,
        explanation: "it organises facts to answer a question",
        answers: [
          {
            text: "Data, because it contains a number",
            isCorrect: false,
          },
          {
            text: "Neither",
            isCorrect: false,
          },
          {
            text: "A dataset",
            isCorrect: false,
          },
          {
            text: "Information, because it organises facts to answer a question",
            isCorrect: true,
          },
        ],
      },
      {
        text: "In a sales table, what does one row usually represent?",
        type: "multiple_choice",
        points: 1,
        explanation: "one row is one sale",
        answers: [
          {
            text: "One type of fact, such as Price",
            isCorrect: false,
          },
          {
            text: "The whole shop",
            isCorrect: false,
          },
          {
            text: "One sale",
            isCorrect: true,
          },
          {
            text: "One month",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is NOT a reason organisations collect data?",
        type: "multiple_choice",
        points: 1,
        explanation: "data supports decisions, it doesn't replace them",
        answers: [
          {
            text: "To see what is happening",
            isCorrect: false,
          },
          {
            text: "To understand why something happened",
            isCorrect: false,
          },
          {
            text: "To plan ahead",
            isCorrect: false,
          },
          {
            text: "To avoid ever having to make a decision",
            isCorrect: true,
          },
        ],
      },
      {
        text: "A receipt shows 3 items at 200 each and a total of 700. What should an analyst do first?",
        type: "multiple_choice",
        points: 1,
        explanation: "3 × 200 = 600, not 700, so check it",
        answers: [
          {
            text: "Ignore it",
            isCorrect: false,
          },
          {
            text: "Note that the total does not match and check it",
            isCorrect: true,
          },
          {
            text: "Delete the receipt",
            isCorrect: false,
          },
          {
            text: "Change the price to 233",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which statement best describes business intelligence?",
        type: "multiple_choice",
        points: 1,
        explanation: "regular reports and dashboards",
        answers: [
          {
            text: "Writing computer games",
            isCorrect: false,
          },
          {
            text: "Collecting data by hand only",
            isCorrect: false,
          },
          {
            text: "Regular reports and dashboards that help managers see performance",
            isCorrect: true,
          },
          {
            text: "Predicting the weather",
            isCorrect: false,
          },
        ],
      },
      {
        text: "\"Why did sales fall at Riverside?\" is which type of analytics?",
        type: "multiple_choice",
        points: 1,
        explanation: "\"why\" means diagnostic",
        answers: [
          {
            text: "Diagnostic",
            isCorrect: true,
          },
          {
            text: "Descriptive",
            isCorrect: false,
          },
          {
            text: "Predictive",
            isCorrect: false,
          },
          {
            text: "Prescriptive",
            isCorrect: false,
          },
        ],
      },
      {
        text: "\"How many drinks will Hilltop sell next week?\" is which type?",
        type: "multiple_choice",
        points: 1,
        explanation: "\"will\" means predictive",
        answers: [
          {
            text: "Descriptive",
            isCorrect: false,
          },
          {
            text: "Diagnostic",
            isCorrect: false,
          },
          {
            text: "Predictive",
            isCorrect: true,
          },
          {
            text: "Prescriptive",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is a KPI?",
        type: "multiple_choice",
        points: 1,
        explanation: "a KPI tracks progress to a goal",
        answers: [
          {
            text: "A type of chart",
            isCorrect: false,
          },
          {
            text: "A database",
            isCorrect: false,
          },
          {
            text: "A spreadsheet formula",
            isCorrect: false,
          },
          {
            text: "A number that shows progress towards an important goal",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which type of analytics is the most common in entry-level analyst jobs?",
        type: "multiple_choice",
        points: 1,
        explanation: "most entry-level work is descriptive and diagnostic",
        answers: [
          {
            text: "Prescriptive only",
            isCorrect: false,
          },
          {
            text: "Descriptive and diagnostic",
            isCorrect: true,
          },
          {
            text: "Predictive only",
            isCorrect: false,
          },
          {
            text: "None of them",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the correct order of the six steps?",
        type: "multiple_choice",
        points: 1,
        explanation: "Ask, Collect, Clean, Analyse, Visualise, Act",
        answers: [
          {
            text: "Collect, Ask, Analyse, Clean, Act, Visualise",
            isCorrect: false,
          },
          {
            text: "Analyse, Visualise, Ask, Act, Clean, Collect",
            isCorrect: false,
          },
          {
            text: "Ask, Analyse, Collect, Visualise, Clean, Act",
            isCorrect: false,
          },
          {
            text: "Ask, Collect, Clean, Analyse, Visualise, Act",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which is the clearest business question?",
        type: "multiple_choice",
        points: 1,
        explanation: "it names what, where and when",
        answers: [
          {
            text: "\"Are sales bad?\"",
            isCorrect: false,
          },
          {
            text: "\"What is happening?\"",
            isCorrect: false,
          },
          {
            text: "\"Which product had the lowest sales in Riverside branch in March?\"",
            isCorrect: true,
          },
          {
            text: "\"Can we do better?\"",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why do we clean data before analysing it?",
        type: "multiple_choice",
        points: 1,
        explanation: "errors lead to wrong answers",
        answers: [
          {
            text: "Because errors in the data lead to wrong answers",
            isCorrect: true,
          },
          {
            text: "To make the file smaller",
            isCorrect: false,
          },
          {
            text: "Because charts need it",
            isCorrect: false,
          },
          {
            text: "It is optional",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Drinks units were Hilltop 14, Central 6, Riverside 3. What is Central's share?",
        type: "multiple_choice",
        points: 1,
        explanation: "6 ÷ 23 = 26%",
        answers: [
          {
            text: "6%",
            isCorrect: false,
          },
          {
            text: "About 26%",
            isCorrect: true,
          },
          {
            text: "About 61%",
            isCorrect: false,
          },
          {
            text: "13%",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why did the recommendation suggest a two-week trial?",
        type: "multiple_choice",
        points: 1,
        explanation: "three days is limited evidence",
        answers: [
          {
            text: "Because the numbers were wrong",
            isCorrect: false,
          },
          {
            text: "Because the manager asked for it",
            isCorrect: false,
          },
          {
            text: "Because three days of data is limited evidence",
            isCorrect: true,
          },
          {
            text: "Because drinks expire in two weeks",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which tool is mainly used to ask questions of a database?",
        type: "multiple_choice",
        points: 1,
        explanation: "SQL queries databases",
        answers: [
          {
            text: "Power BI",
            isCorrect: false,
          },
          {
            text: "Excel",
            isCorrect: false,
          },
          {
            text: "SQL",
            isCorrect: true,
          },
          {
            text: "A web browser",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does a reporting analyst mainly do?",
        type: "multiple_choice",
        points: 1,
        explanation: "regular reports and dashboards",
        answers: [
          {
            text: "Repairs computers",
            isCorrect: false,
          },
          {
            text: "Sells products",
            isCorrect: false,
          },
          {
            text: "Writes contracts",
            isCorrect: false,
          },
          {
            text: "Produces regular reports and dashboards",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What overall score do you need to complete the course?",
        type: "multiple_choice",
        points: 1,
        explanation: "60% with all capstone items submitted",
        answers: [
          {
            text: "60%, with all capstone items submitted",
            isCorrect: true,
          },
          {
            text: "40%",
            isCorrect: false,
          },
          {
            text: "50%",
            isCorrect: false,
          },
          {
            text: "100%",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why should you keep all your work in one folder?",
        type: "multiple_choice",
        points: 1,
        explanation: "the folder becomes your portfolio",
        answers: [
          {
            text: "Excel requires it",
            isCorrect: false,
          },
          {
            text: "It becomes your portfolio",
            isCorrect: true,
          },
          {
            text: "It makes files smaller",
            isCorrect: false,
          },
          {
            text: "There is no reason",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which statement about this course is true?",
        type: "multiple_choice",
        points: 1,
        explanation: "no job guarantee",
        answers: [
          {
            text: "Completing it guarantees a job",
            isCorrect: false,
          },
          {
            text: "It is a university degree",
            isCorrect: false,
          },
          {
            text: "It needs paid software",
            isCorrect: false,
          },
          {
            text: "It builds skills and a portfolio, but does not guarantee a job",
            isCorrect: true,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 2,
    moduleTitle: "Data Collection, Data Types and Data Sources",
    moduleDescription: "Learners find out where data comes from, the different kinds of data and why the kind matters, how to collect data well, and how to judge quality and handle personal data responsibly. The module introduces the Sunrise Mart customer records, which are deliberately messy so learners can practise spotting problems.",
    lessons: [
      {
        title: "Where data comes from",
        order: 1,
        durationMinutes: 60,
        videoUrl: "https://www.youtube.com/watch?v=ei9IIyao40A",
        content: "## Lesson introduction\n\n- **What you will study:** the main sources of data an organisation uses, and how to tell them apart.\n- **Why it matters:** before you analyse anything you must know where the data came from and whether you can trust it.\n- **After this lesson you can:** name common data sources and sort them into primary or secondary, and internal or external.\n- **Estimated time:** 60 minutes.\n\n## The topic in simple English\n\nData comes from somewhere: a till, an app, a form, a machine or someone else's report.\n\nThink of data sources like places you get water. Some water comes from your own tap at home (internal). Some you buy from a shop (external). Some you collect yourself from the rain (primary). Some someone else collected and bottled (secondary).\n\nKnowing the source tells you how fresh, how reliable and how complete your data is likely to be.\n\n## Learning objectives\n\n1. Explain the difference between primary and secondary data.\n2. Explain the difference between internal and external data.\n3. Name at least five systems that create business data.\n4. Classify ten data sources correctly.\n\n## Main teaching content\n\n**1. Primary and secondary data**\n\n- **Primary data** is data you collect yourself, for your own question. *Everyday:* you ask five friends which phone network they use. *Business:* Sunrise Mart surveys 200 shoppers about opening hours.\n- **Secondary data** is data someone else collected for another purpose, which you reuse. *Everyday:* you read a published report on phone network coverage. *Business:* Sunrise Mart uses a government population report to decide where to open a branch.\n- **Why it matters:** primary data fits your question exactly but takes time and money. Secondary data is fast and cheap but may not fit perfectly or may be out of date.\n\n**2. Internal and external data**\n\n- **Internal data** comes from inside the organisation: its own sales, staff, customers and machines.\n- **External data** comes from outside: market reports, official statistics, weather data, social media, suppliers.\n\n**3. Systems that create business data**\n\n| System | What it records | Sector example |\n| --- | --- | --- |\n| Point of sale (POS) or till | Every sale: items, prices, time, payment method | Supermarkets, pharmacies |\n| Customer relationship management (CRM) | Customer details, contacts, complaints | Banks, telecoms |\n| Enterprise resource planning (ERP) | Finance, stock, purchasing, payroll | Large companies in every sector |\n| Core banking system | Accounts, deposits, withdrawals, loans | Banks, microfinance |\n| Network systems and call records | Calls, texts, data used, dropped calls | Telecom operators |\n| Sensors and control systems | Pressure, flow, temperature, machine status | Oil & gas, power, factories |\n| Websites and mobile apps | Visits, clicks, sign-ups, purchases | Online shops, banks |\n| Forms and surveys | Answers people give | Every sector |\n\n**4. How to judge a source**\n\nAsk four questions about any source:\n\n1. **Who** collected it, and why?\n2. **When** was it collected? Is it still current?\n3. **How** was it collected? Could there be mistakes?\n4. **Does it cover** what you need: the right places, people and dates?\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Data source | The place or system data comes from | Where the facts come from | Your bank statement | The till system |\n| Primary data | Data collected first-hand for a specific purpose | Data you collect yourself | Asking friends a question | A customer survey |\n| Secondary data | Existing data collected by someone else | Data someone else collected | A published report | Official population figures |\n| Internal data | Data generated inside the organisation | Your own records | Your own diary | Company sales records |\n| External data | Data from outside the organisation | Other people's records | A weather forecast | Industry market report |\n| CRM | Customer relationship management system | The customer address book and history | Your contact list with notes | A bank's record of every customer contact |\n\n## Step-by-step demonstration: classifying sources\n\nFor each source, ask two questions: *Did we collect it ourselves for this question?* (primary or secondary) and *Did it come from inside our organisation?* (internal or external).\n\n1. **Sunrise Mart's till records, used to study sales.** Collected by Sunrise Mart: internal. Collected to process sales, not for this study: secondary. → **Internal, secondary.**\n2. **A survey Sunrise Mart runs to ask shoppers about prices.** Inside, for this question → **Internal, primary.**\n3. **A published report on household spending.** Outside, collected by others → **External, secondary.**\n\n**Tip:** a company's own system data is usually *internal secondary*, because it was recorded to run the business, not to answer your specific question.\n\n## Practical exercise\n\n- **Task:** classify ten sources as primary or secondary, and internal or external.\n- **Sources:**\n  1. A bank's record of all card transactions last year, used to study spending.\n  2. A telecom company's survey asking 500 customers about network quality.\n  3. Official census figures used by a retailer to choose a new location.\n  4. Pressure readings from sensors on an oil pipeline.\n  5. Comments about a brand found on social media.\n  6. A hospital's patient visit records, used to plan staffing.\n  7. Interviews a consultant holds with 10 shop owners for a study.\n  8. Fuel prices published by a news website.\n  9. Staff attendance records from the HR system.\n  10. A competitor's published annual report.\n- **Expected output:** a table with columns Source, Primary/Secondary, Internal/External, Reason.\n- **Submit:** your table.\n\n## Knowledge check\n\n1. Data you collect yourself for your own question is:\n   - A) Primary data\n   - B) Secondary data\n   - C) External data\n   - D) Unstructured data\n2. Which is an example of external data?\n   - A) Your company's payroll records\n   - B) Your shop's till records\n   - C) Official population statistics\n   - D) Your own customer survey\n3. What does a CRM system mainly store?\n   - A) Machine temperatures\n   - B) Weather data\n   - C) Video files\n   - D) Customer details and contact history\n4. Which question is NOT one of the four questions for judging a source?\n   - A) Who collected it and why?\n   - B) What colour is the report cover?\n   - C) When was it collected?\n   - D) Does it cover what I need?\n5. Sensors on a pipeline recording pressure every minute are an example of:\n   - A) Machine-generated internal data\n   - B) Survey data\n   - C) Secondary external data\n   - D) Social media data\n\n## Lesson summary\n\n1. Every dataset has a source; know it before you trust it.\n2. Primary data is collected for your question; secondary data is reused.\n3. Internal data comes from inside the organisation; external data from outside.\n4. Business data comes from tills, CRMs, ERPs, banking systems, networks, sensors, apps and forms.\n5. Judge any source by who, when, how and coverage.\n\n## Completion check\n\n- [ ] I can explain primary versus secondary and internal versus external.\n- [ ] I can name five systems that create business data.\n- [ ] I classified all ten sources with a reason.",
      },
      {
        title: "Types of data: numbers, text, dates and categories",
        order: 2,
        durationMinutes: 75,
        videoUrl: "https://www.youtube.com/watch?v=hZxnzfnt5v8",
        content: "## Lesson introduction\n\n- **What you will study:** the main types of data and why each type is handled differently.\n- **Why it matters:** using the wrong type causes wrong answers. You cannot average phone numbers, and a date stored as text will not sort correctly.\n- **After this lesson you can:** identify the type of every column in a dataset and say what you can and cannot do with it.\n- **Estimated time:** 75 minutes.\n\n## The topic in simple English\n\nDifferent kinds of data are like different kinds of containers in a kitchen. You pour water into a jug, keep rice in a bag and store eggs in a tray. Use the wrong container and you make a mess.\n\nData works the same way. Amounts and counts are **numbers**. Labels like \"Hilltop\" are **categories**. Names and comments are **text**. Days and times are **dates**. Yes/no answers are **true/false** values.\n\nEach type allows different actions. You can add numbers. You can count categories. You can sort dates from oldest to newest.\n\n## Learning objectives\n\n1. Name five data types and give an example of each.\n2. Explain the difference between discrete and continuous numbers.\n3. Explain the difference between nominal and ordinal categories.\n4. Identify the type of each column in the Sunrise Mart customer records.\n5. Explain why some \"numbers\", such as phone numbers, should be stored as text.\n\n## Main teaching content\n\n**1. Numerical data (numbers you can calculate with)**\n\n- **Discrete:** counted in whole steps. *Everyday:* number of children in a family. *Business:* number of items in an order.\n- **Continuous:** measured, can have decimals. *Everyday:* your height. *Business:* litres of fuel used, data used in GB.\n- **What you can do:** add, average, find highest and lowest.\n\n**2. Categorical data (labels that sort things into groups)**\n\n- **Nominal:** groups with no natural order. *Everyday:* favourite colour. *Business:* branch name, payment method.\n- **Ordinal:** groups with a natural order. *Everyday:* small, medium, large. *Business:* customer satisfaction from \"Very poor\" to \"Very good\".\n- **What you can do:** count how many are in each group, find the most common. For ordinal, you can also sort in order.\n- **What you cannot do:** add or average labels. \"Central + Hilltop\" means nothing.\n\n**3. Text data**\n\nFree words such as names, addresses and complaint comments. You can search, count and group it, but not calculate with it.\n\n**4. Date and time data**\n\nDays, months, years and times. You can sort, find the gap between two dates, and group by week or month. Dates must be stored in one consistent format. This course uses **YYYY-MM-DD**, for example 2026-03-04, because it sorts correctly and cannot be confused between day-first and month-first countries.\n\n**5. True/false (Boolean) data**\n\nOnly two possible values: yes/no, true/false, 1/0. *Business:* \"Did the customer leave?\" (Churned: Yes/No).\n\n**6. The phone number trap**\n\nSome values look like numbers but are really labels: phone numbers, account numbers, ID numbers. Store them as **text**, because:\n\n- You never add or average them.\n- Stored as numbers, they lose their leading zero: 0700 555 0101 becomes 7005550101.\n- Long account numbers can be rounded by a spreadsheet and silently changed.\n\n**7. Structured and unstructured data**\n\n- **Structured:** neat rows and columns, like a sales table. Easy to analyse. Most of this course uses structured data.\n- **Unstructured:** no fixed format, like emails, photos, voice notes and social media posts. Harder to analyse.\n- **Semi-structured:** some organisation, like a web form's saved responses or an app's log file.\n\n**8. Meet the Sunrise Mart customer records**\n\nSunrise Mart keeps a list of loyalty-scheme customers. This sample has some deliberate problems; you will find them in Lesson 2.4. All people and contact details are invented.\n\n| CustomerID | FullName | Gender | DateOfBirth | City | Phone | Email | SignupDate | Channel |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| C001 | Amara Mensah | F | 1998-04-12 | Riverside | 0700 555 0101 | amara.m@example.com | 2026-01-05 | App |\n| C002 | john kamau | Male | 12/07/1995 | central | 0700 555 0102 | john.kamau@example | 2026-01-05 | Branch |\n| C003 | Thandi Nkosi | F | 2001-11-30 | Hilltop |  | thandi.n@example.com | 2026-01-06 | Website |\n| C004 | Amara Mensah | F | 1998-04-12 | Riverside | 0700 555 0101 | amara.m@example.com | 2026-01-05 | App |\n| C005 | Chinedu Eze | M | 2030-02-14 | Central | 0700 555 0105 | chinedu.eze@example.com | 2026-01-07 | Branch |\n| C006 | Wanjiru Otieno | F | 1990-06-21 | Hiltop | 0700-555-0106 | wanjiru.o@example.com | 2026-01-08 | app |\n| C007 | Kwame Boateng | M |  | Central | 0700 555 0107 |  | 2026-01-08 | Branch |\n| C008 |   Fatima Bello   | F | 1993-09-03 | Riverside | 0700 555 0108 | fatima.bello@example.com | 2026-01-09 | Website |\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Data type | The kind of value a column holds | What sort of fact it is | A price versus a name | Quantity is a number, Branch is a category |\n| Discrete | Numbers counted in whole steps | Countable things | 3 children | 5 items in an order |\n| Continuous | Numbers measured on a scale | Measured things | 1.72 m tall | 2.6 GB of data used |\n| Nominal | Categories with no order | Labels | Colours | Payment method |\n| Ordinal | Categories with a natural order | Ranked labels | Small, medium, large | Satisfaction rating |\n| Boolean | A value that is only true or false | Yes or no | \"Is it raining?\" | \"Did the customer leave?\" |\n| Structured data | Data in fixed rows and columns | A neat table | A timetable | A sales table |\n| Unstructured data | Data without a fixed format | Loose information | A voice note | Customer emails |\n\n## Step-by-step demonstration: typing every column\n\nFor each column of the customer records, ask: *Would I ever add or average this?* If yes, it is numerical. If not, ask whether it is a label, free words, a date or yes/no.\n\n| Column | Would I add or average it? | Type | Why |\n| --- | --- | --- | --- |\n| CustomerID | No | Text (identifier) | A label that names one customer |\n| FullName | No | Text | Free words |\n| Gender | No | Categorical, nominal | Groups with no order |\n| DateOfBirth | No (but can calculate age) | Date | A day in time |\n| City | No | Categorical, nominal | Groups with no order |\n| Phone | No | Text | Looks like a number but is a label; keeps its leading zero |\n| Email | No | Text | Free characters |\n| SignupDate | No | Date | A day in time |\n| Channel | No | Categorical, nominal | App, Branch or Website |\n\n**Check:** this table has no numerical columns at all. That is normal for customer lists. The numbers live in sales data, which links to customers through CustomerID. You will join these two tables in Module 6.\n\n## Practical exercise\n\n- **Task:** identify the type of every column in the Sunrise Mart sales table from Lesson 1.1, and in an invented telecom table.\n- **Telecom columns:** CustomerID, Plan (Basic, Standard, Premium), Region, TenureMonths, MonthlyCharge, DataUsageGB, SatisfactionScore (1 = very poor to 5 = very good), Churned (Yes/No).\n- **Steps:**\n  1. Copy the column names into a table with columns: Column, Type, Sub-type, One thing I can calculate or do with it.\n  2. Decide the type of each column using the \"would I add it?\" test.\n  3. For categorical columns, decide nominal or ordinal. For numbers, decide discrete or continuous.\n- **Expected output:** 15 rows (7 sales columns and 8 telecom columns).\n- **Submit:** your table.\n\n## Knowledge check\n\n1. Which column is continuous numerical data?\n   - A) Number of children\n   - B) Branch name\n   - C) Customer ID\n   - D) Data used in GB\n2. Customer satisfaction rated \"Poor, Fair, Good, Excellent\" is:\n   - A) Ordinal\n   - B) Nominal\n   - C) Continuous\n   - D) Boolean\n3. Why should phone numbers be stored as text?\n   - A) They are too long to see\n   - B) Text is faster\n   - C) You never calculate with them, and as numbers they can lose leading zeros\n   - D) Excel requires it\n4. Which date format does this course use?\n   - A) DD/MM/YY\n   - B) YYYY-MM-DD\n   - C) MM-DD-YYYY\n   - D) Any format\n5. A folder of customer voice notes is an example of:\n   - A) Structured data\n   - B) Boolean data\n   - C) Ordinal data\n   - D) Unstructured data\n\n## Lesson summary\n\n1. The main data types are numerical, categorical, text, date/time and true/false.\n2. Numbers can be discrete (counted) or continuous (measured).\n3. Categories can be nominal (no order) or ordinal (ordered).\n4. IDs and phone numbers look like numbers but should be stored as text.\n5. Use one date format, YYYY-MM-DD, everywhere.\n\n## Completion check\n\n- [ ] I can name five data types with examples.\n- [ ] I can apply the \"would I add it?\" test.\n- [ ] I typed all 15 columns in the exercise.",
      },
      {
        title: "How data is collected: forms, systems and surveys",
        order: 3,
        durationMinutes: 75,
        videoUrl: "https://www.youtube.com/watch?v=Rf-fIpB4D50",
        content: "## Lesson introduction\n\n- **What you will study:** the main ways data is collected, and how to design a form that collects clean, useful data.\n- **Why it matters:** bad collection creates messy data that takes hours to clean. A well-designed form prevents most mistakes before they happen.\n- **After this lesson you can:** choose a collection method, design a short form with the right question types, and spot biased sampling.\n- **Estimated time:** 75 minutes.\n\n## The topic in simple English\n\nThere are three main ways to collect data:\n\n1. **Systems record it automatically,** like a till recording each sale.\n2. **People fill in forms,** like a customer registration form.\n3. **You ask questions in a survey,** like a satisfaction questionnaire.\n\nThe best data is collected well from the start. It is much easier to stop mud getting into water than to filter it out afterwards.\n\n## Learning objectives\n\n1. Compare automatic, form and survey collection.\n2. Choose the right question type for each piece of information.\n3. Add simple rules (validation) to a form to prevent errors.\n4. Explain what sampling bias is, with an example.\n\n## Main teaching content\n\n**1. Automatic system collection**\n\n- **What it means:** software or machines record data as things happen.\n- **Why it is useful:** fast, complete and usually accurate, with no typing errors.\n- **Everyday example:** your phone counts your steps.\n- **Business example:** a telecom network records every call's start time, end time and whether it dropped.\n- **Watch out for:** a broken sensor or system outage creates gaps.\n\n**2. Forms**\n\n- **What it means:** people type or select answers on paper or a screen.\n- **Why it is useful:** collects details only a person knows, such as their name or opinion.\n- **Watch out for:** spelling mistakes, different formats, blanks.\n\n**3. Surveys**\n\nA survey is a set of questions asked to a group of people to learn about their opinions or behaviour. It may run online, by phone or in person.\n\n**4. Choose the right question type**\n\n| Information wanted | Best question type | Why |\n| --- | --- | --- |\n| Branch visited | Drop-down list: Central, Riverside, Hilltop | No spelling mistakes; every answer matches |\n| Satisfaction | Rating scale 1–5 with labels | Ordered, easy to average and compare |\n| Date of visit | Date picker | One consistent format |\n| Number of items bought | Number box, whole numbers only, 1–100 | Stops text and impossible values |\n| Suggestions | Short free-text box | Captures ideas you didn't think of |\n| Would you recommend us? | Yes/No choice | Clean true/false data |\n\n**Rule of thumb:** use choices wherever the answers are known in advance. Use free text only when you truly need people's own words.\n\n**5. Validation: rules that block mistakes**\n\nValidation means the form checks an answer before accepting it. Examples:\n\n- Required: the question cannot be skipped.\n- Range: age must be between 16 and 100.\n- Format: email must contain \"@\" and a dot.\n- Type: quantity must be a whole number.\n\n**6. Sampling and bias**\n\nYou usually cannot ask everyone, so you ask a **sample**. The sample must represent the whole group.\n\n- **Biased example:** Sunrise Mart surveys shoppers only at Central branch on Saturday mornings, then claims \"customers want longer weekday hours\". Weekday shoppers and other branches were never asked.\n- **Better:** survey shoppers at all three branches, on different days and times.\n\n**7. Ask only what you need**\n\nEvery question costs the respondent time and creates data you must protect. If you will not use an answer, do not ask the question. Lesson 2.4 explains why this matters for privacy.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Survey | A structured set of questions asked to a group | A questionnaire | A class vote | A customer satisfaction survey |\n| Validation | Rules that check input before it is accepted | A form's gatekeeper | A website rejecting a short password | Blocking an email without \"@\" |\n| Drop-down list | A question where the answer is picked from fixed options | A menu to pick from | Choosing your country on a website | Choosing a branch |\n| Sample | The part of a group you collect data from | A taste of the whole pot | Tasting one spoon of soup | Surveying 200 of 5,000 customers |\n| Sampling bias | A sample that does not represent the whole group | Asking the wrong people | Asking only your friends who like football | Surveying only one branch |\n| Respondent | A person who answers a survey or form | The person answering | A voter | A customer filling a form |\n\n## Step-by-step demonstration: building a feedback form in Microsoft Forms\n\nMicrosoft Forms is free with the Microsoft account you created in Lesson 1.4. Menu names may change slightly over time; look for the same words.\n\n1. Go to **forms.office.com** and sign in.\n2. Click **New Form**. Click **Untitled form** and type **Sunrise Mart customer feedback**.\n3. Click **+ Add new**, then **Choice**. Type the question **Which branch did you visit?** Type three options: **Central**, **Riverside**, **Hilltop**. Turn on **Required**.\n4. Click **+ Add new**, then **Date**. Question: **Date of your visit**. Turn on **Required**.\n5. Click **+ Add new**, then **Rating**. Question: **How satisfied were you today?** Set **Levels** to **5**. Turn on **Required**.\n6. Click **+ Add new**, then **Text**. Question: **How many items did you buy?** Open the **…** menu on the question, choose **Restrictions**, then **Number** and **Between 1 and 100**.\n7. Click **+ Add new**, then **Choice**. Question: **Would you recommend Sunrise Mart to a friend?** Options **Yes** and **No**.\n8. Click **+ Add new**, then **Text**. Question: **Any suggestions?** Leave it optional.\n9. Click **Preview** and fill the form once yourself. Try typing \"ten\" in the items question. The form should refuse it.\n10. Click **Responses**. Your test answer appears. Click **Open results in Excel** to see how each answer becomes a column.\n\n**Check:** your Excel file has one row (your test) and one column per question, with the branch spelled exactly as in the options.\n\n## Practical exercise\n\n- **Task:** design a 6-question form for a business of your choice, such as a pharmacy, gym, bus company or mobile money agent.\n- **Steps:**\n  1. Decide what decision the business wants to make (for example, \"which opening hours to offer\").\n  2. Write six questions that help with that decision.\n  3. For each question, choose a question type and at least one validation rule.\n  4. Build the form in Microsoft Forms and test it once.\n  5. Write two sentences on how you would avoid sampling bias when sharing it.\n- **Expected output:** a working form, a table of Question / Type / Validation / Why, and two sentences on sampling.\n- **Submit:** the form link or screenshots, plus your table and sentences.\n\n## Knowledge check\n\n1. Which question type is best for \"Which branch did you visit?\"\n   - A) Free text\n   - B) Number box\n   - C) Drop-down or choice list\n   - D) Date picker\n2. What does validation do?\n   - A) Checks answers against rules before accepting them\n   - B) Makes the form colourful\n   - C) Sends the form by email\n   - D) Deletes old answers\n3. Surveying only Saturday-morning shoppers at one branch is an example of:\n   - A) Validation\n   - B) Unstructured data\n   - C) A good sample\n   - D) Sampling bias\n4. Which is a benefit of automatic system collection?\n   - A) It never has gaps\n   - B) It is fast and avoids typing errors\n   - C) It captures opinions\n   - D) It needs no electricity\n5. When should you use a free-text question?\n   - A) Always\n   - B) For dates\n   - C) For yes/no questions\n   - D) Only when you need people's own words\n\n## Lesson summary\n\n1. Data is collected by systems, forms and surveys.\n2. Use fixed choices whenever the possible answers are known.\n3. Validation rules stop mistakes at the door.\n4. A sample must represent the whole group, or the results are biased.\n5. Ask only for data you will actually use.\n\n## Completion check\n\n- [ ] I built and tested a form in Microsoft Forms.\n- [ ] Each of my questions has a sensible type and validation rule.\n- [ ] I can explain sampling bias with an example.",
      },
      {
        title: "Data quality, privacy and responsible data handling",
        order: 4,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=5HcDJ8e9NwY",
        content: "## Lesson introduction\n\n- **What you will study:** the six signs of good-quality data, how to audit a dataset for problems, and how to handle personal data responsibly.\n- **Why it matters:** decisions made on bad data are bad decisions. Careless handling of personal data harms people and can break the law.\n- **After this lesson you can:** audit a dataset against six quality checks and apply five privacy principles.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\n**Data quality** means how fit your data is for use. Good data is correct, complete, consistent, up to date, sensible and free of repeats.\n\nImagine a class register where some names are spelled two ways, some students appear twice and some days are blank. You could not trust its attendance totals. Data works the same way.\n\n**Privacy** means respecting people's personal information. If someone gives you their phone number to receive receipts, you should not sell it or share it without permission.\n\n## Learning objectives\n\n1. Name and explain six data quality dimensions.\n2. Audit a dataset and record each problem with its row, column and dimension.\n3. Suggest a fix for each problem.\n4. Explain five principles of responsible personal data handling.\n\n## Main teaching content\n\n**1. Six dimensions of data quality**\n\n| Dimension | Question to ask | Everyday example of a problem | Business example of a problem |\n| --- | --- | --- | --- |\n| Accuracy | Is it correct? | A misspelt name in your contacts | \"Hiltop\" instead of Hilltop |\n| Completeness | Is anything missing? | A contact with no number | A customer with no phone |\n| Consistency | Is the same thing written the same way? | \"Mum\" and \"Mother\" for one person | \"M\" in one row, \"Male\" in another |\n| Validity | Does it follow the rules and make sense? | A birthday on 31 February | A date of birth in the future |\n| Uniqueness | Is anything repeated? | The same contact saved twice | One customer registered twice |\n| Timeliness | Is it up to date? | An old address | Last year's prices used for this year |\n\n**2. How to audit a dataset**\n\nAn audit is a careful check. Go column by column, then row by row, asking the six questions. Record every problem in an **issue log**: Row, Column, Problem, Dimension, Suggested fix. Do not fix anything yet. First understand the full picture.\n\n**3. Five principles of responsible data handling**\n\nMany countries have data protection laws. The details differ, so learn the law where you work. These five principles appear in most of them:\n\n1. **Consent and transparency:** tell people what you collect and why, and get permission where needed.\n2. **Purpose limitation:** use data only for the purpose you collected it for.\n3. **Data minimisation:** collect only what you need.\n4. **Security:** protect data with passwords, access controls and care. Do not leave customer lists on shared computers or in group chats.\n5. **Anonymisation for analysis:** remove or mask names, phone numbers and emails when you do not need them. Analysts usually need the CustomerID, not the customer's name.\n\n**4. Personal data**\n\nPersonal data is any information that identifies a person: name, phone, email, address, ID number, date of birth, account number. Some is especially sensitive, such as health or financial details. Treat all of it with care, including in your practice work.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Data quality | How fit data is for its intended use | How trustworthy the data is | A tidy, correct register | Clean sales records |\n| Data audit | A systematic check of data for problems | A health check for data | Checking a receipt | Reviewing a customer list |\n| Issue log | A list of problems found, with details | A to-fix list | A list of repairs needed at home | A table of data errors |\n| Personal data | Information that identifies a living person | Facts about a specific person | Your phone number | A customer's email |\n| Anonymisation | Removing details that identify people | Hiding who is who | Blurring faces in a photo | Replacing names with IDs |\n| Data minimisation | Collecting only the data needed | Don't ask what you won't use | Not asking a delivery driver's age | A feedback form without date of birth |\n\n## Step-by-step demonstration: auditing the customer records\n\nOpen the Sunrise Mart customer records from Lesson 2.2. Work through the six questions one at a time.\n\n1. **Completeness.** Look for blank cells. C003 has no Phone. C007 has no DateOfBirth and no Email. **3 problems.**\n2. **Uniqueness.** Look for repeated people. C004 has the same name, date of birth, phone and email as C001. It is one person registered twice under two IDs. **1 problem.**\n3. **Validity.** Look for impossible or rule-breaking values. C005 was \"born\" on 2030-02-14, which is in the future. C002's email \"john.kamau@example\" has no ending such as \".com\". **2 problems.**\n4. **Consistency.** Look for the same thing written differently.\n   - C002: name in lower case (\"john kamau\"), Gender \"Male\" instead of \"M\", date of birth as 12/07/1995 instead of YYYY-MM-DD, City \"central\" in lower case.\n   - C006: City \"Hiltop\" is misspelt, Phone uses dashes, Channel \"app\" in lower case.\n   - C008: name has extra spaces before and after.\n   - **8 problems.**\n5. **Accuracy.** Some issues above are also accuracy problems; \"Hiltop\" is wrong as well as inconsistent. Record each issue once, under its main dimension.\n6. **Timeliness.** All sign-ups are from January 2026. Nothing appears out of date. **0 problems.**\n\n**Total: 14 issues** in 8 rows. Here is the start of the issue log:\n\n| Row | Column | Problem | Dimension | Suggested fix |\n| --- | --- | --- | --- | --- |\n| C003 | Phone | Blank | Completeness | Ask the customer at next visit; leave blank meanwhile |\n| C004 | All | Duplicate of C001 | Uniqueness | Remove C004 and keep C001 |\n| C005 | DateOfBirth | Future date | Validity | Check with the customer; possibly 2003 |\n| C002 | Gender | \"Male\" instead of \"M\" | Consistency | Change to \"M\" |\n| C006 | City | \"Hiltop\" | Consistency / accuracy | Change to \"Hilltop\" |\n\n**Check:** 3 + 1 + 2 + 8 + 0 = 14. In Module 4 you will fix all 14 in Excel.\n\n**Privacy check:** before sharing this file with a colleague for sales analysis, remove FullName, Phone and Email. CustomerID is enough to link customers to their purchases.\n\n## Practical exercise\n\n- **Task:** complete the issue log for all 14 problems.\n- **Steps:**\n  1. Copy the five issue-log columns into a new Excel workbook.\n  2. Add one row for each of the 14 problems found in the demonstration.\n  3. Write a sensible suggested fix for each.\n  4. Below the log, list which columns you would remove before sharing the data for a sales analysis, and why.\n- **Expected output:** a 14-row issue log and a short privacy note.\n- **Submit:** your Excel file.\n\n## Knowledge check\n\n1. One customer saved twice under two IDs is a problem of:\n   - A) Timeliness\n   - B) Validity\n   - C) Completeness\n   - D) Uniqueness\n2. A date of birth in the future breaks which dimension?\n   - A) Validity\n   - B) Consistency\n   - C) Uniqueness\n   - D) Timeliness\n3. \"M\" in some rows and \"Male\" in others is a problem of:\n   - A) Completeness\n   - B) Uniqueness\n   - C) Consistency\n   - D) Timeliness\n4. What does data minimisation mean?\n   - A) Making files smaller\n   - B) Collecting only the data you need\n   - C) Deleting all data\n   - D) Using small fonts\n5. A colleague needs your customer file to analyse sales by city. What should you do?\n   - A) Send it as it is\n   - B) Post it in a group chat\n   - C) Remove names, phones and emails first, keeping CustomerID and City\n   - D) Refuse to share any data\n\n## Lesson summary\n\n1. Good data is accurate, complete, consistent, valid, unique and timely.\n2. Audit before you clean: record every problem in an issue log.\n3. Check that the problem counts add up, just like sales totals.\n4. Personal data identifies people and must be protected.\n5. Share only what the task needs; usually an ID is enough.\n\n## Completion check\n\n- [ ] I can name the six quality dimensions.\n- [ ] My issue log has all 14 problems with fixes.\n- [ ] I know which columns to remove before sharing.",
      },
    ],
    assignmentTitle: "The Connectwave complaints log",
    assignmentDescription: "Connectwave Telecom (fictional) records customer complaints in a shared spreadsheet.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "A telecom company uses its own call records to study dropped calls. The data is:",
        type: "multiple_choice",
        points: 1,
        explanation: "Own records (internal), recorded for operations and reused (secondary)",
        answers: [
          {
            text: "External primary",
            isCorrect: false,
          },
          {
            text: "External secondary",
            isCorrect: false,
          },
          {
            text: "Internal secondary",
            isCorrect: true,
          },
          {
            text: "Unstructured",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which column should be stored as text?",
        type: "multiple_choice",
        points: 1,
        explanation: "Account numbers are labels, never calculated",
        answers: [
          {
            text: "Account number",
            isCorrect: true,
          },
          {
            text: "Quantity",
            isCorrect: false,
          },
          {
            text: "Monthly charge",
            isCorrect: false,
          },
          {
            text: "Data used in GB",
            isCorrect: false,
          },
        ],
      },
      {
        text: "\"Low, Medium, High\" risk ratings are:",
        type: "multiple_choice",
        points: 1,
        explanation: "Ordered categories are ordinal",
        answers: [
          {
            text: "Nominal",
            isCorrect: false,
          },
          {
            text: "Continuous",
            isCorrect: false,
          },
          {
            text: "Boolean",
            isCorrect: false,
          },
          {
            text: "Ordinal",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which date is written in the course's standard format?",
        type: "multiple_choice",
        points: 1,
        explanation: "YYYY-MM-DD",
        answers: [
          {
            text: "04/03/26",
            isCorrect: false,
          },
          {
            text: "2026-03-04",
            isCorrect: true,
          },
          {
            text: "4 March 2026",
            isCorrect: false,
          },
          {
            text: "03-04-2026",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which form question is MOST likely to produce messy data?",
        type: "multiple_choice",
        points: 1,
        explanation: "Free text invites spelling variants",
        answers: [
          {
            text: "A drop-down list of branches",
            isCorrect: false,
          },
          {
            text: "A 1–5 rating",
            isCorrect: false,
          },
          {
            text: "A free-text box asking \"Which branch?\"",
            isCorrect: true,
          },
          {
            text: "A date picker",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A form refuses an age of 250. This is an example of:",
        type: "multiple_choice",
        points: 1,
        explanation: "A range rule is validation",
        answers: [
          {
            text: "Validation",
            isCorrect: true,
          },
          {
            text: "Sampling",
            isCorrect: false,
          },
          {
            text: "Anonymisation",
            isCorrect: false,
          },
          {
            text: "Bias",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A bank surveys only customers who use its app. What is the risk?",
        type: "multiple_choice",
        points: 1,
        explanation: "Non-app users are left out: sampling bias",
        answers: [
          {
            text: "The data will be unstructured",
            isCorrect: false,
          },
          {
            text: "There is no risk",
            isCorrect: false,
          },
          {
            text: "The survey will be too short",
            isCorrect: false,
          },
          {
            text: "Customers who never use the app are not represented",
            isCorrect: true,
          },
        ],
      },
      {
        text: "\"Hiltop\" instead of \"Hilltop\" is mainly a problem of:",
        type: "multiple_choice",
        points: 1,
        explanation: "It is wrong (accuracy) and differs from \"Hilltop\" (consistency)",
        answers: [
          {
            text: "Timeliness",
            isCorrect: false,
          },
          {
            text: "Accuracy and consistency",
            isCorrect: true,
          },
          {
            text: "Uniqueness",
            isCorrect: false,
          },
          {
            text: "Completeness",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is personal data?",
        type: "multiple_choice",
        points: 1,
        explanation: "A phone number identifies a person",
        answers: [
          {
            text: "A customer's phone number",
            isCorrect: true,
          },
          {
            text: "The number of drinks sold at Hilltop",
            isCorrect: false,
          },
          {
            text: "The average order value",
            isCorrect: false,
          },
          {
            text: "The name of a branch",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why do analysts record problems in an issue log before fixing them?",
        type: "multiple_choice",
        points: 1,
        explanation: "Understand the whole picture first and keep a record of changes",
        answers: [
          {
            text: "Because Excel requires it",
            isCorrect: false,
          },
          {
            text: "To make the file longer",
            isCorrect: false,
          },
          {
            text: "To understand the full picture and keep a record of changes",
            isCorrect: true,
          },
          {
            text: "It is not necessary",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Data you collect yourself for your own question is:",
        type: "multiple_choice",
        points: 1,
        explanation: "collected yourself = primary",
        answers: [
          {
            text: "Primary data",
            isCorrect: true,
          },
          {
            text: "Secondary data",
            isCorrect: false,
          },
          {
            text: "External data",
            isCorrect: false,
          },
          {
            text: "Unstructured data",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is an example of external data?",
        type: "multiple_choice",
        points: 1,
        explanation: "official statistics come from outside",
        answers: [
          {
            text: "Your company's payroll records",
            isCorrect: false,
          },
          {
            text: "Your shop's till records",
            isCorrect: false,
          },
          {
            text: "Official population statistics",
            isCorrect: true,
          },
          {
            text: "Your own customer survey",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does a CRM system mainly store?",
        type: "multiple_choice",
        points: 1,
        explanation: "CRM stores customer details and contacts",
        answers: [
          {
            text: "Machine temperatures",
            isCorrect: false,
          },
          {
            text: "Weather data",
            isCorrect: false,
          },
          {
            text: "Video files",
            isCorrect: false,
          },
          {
            text: "Customer details and contact history",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which question is NOT one of the four questions for judging a source?",
        type: "multiple_choice",
        points: 1,
        explanation: "cover colour is irrelevant",
        answers: [
          {
            text: "Who collected it and why?",
            isCorrect: false,
          },
          {
            text: "What colour is the report cover?",
            isCorrect: true,
          },
          {
            text: "When was it collected?",
            isCorrect: false,
          },
          {
            text: "Does it cover what I need?",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Sensors on a pipeline recording pressure every minute are an example of:",
        type: "multiple_choice",
        points: 1,
        explanation: "sensors create internal machine data",
        answers: [
          {
            text: "Machine-generated internal data",
            isCorrect: true,
          },
          {
            text: "Survey data",
            isCorrect: false,
          },
          {
            text: "Secondary external data",
            isCorrect: false,
          },
          {
            text: "Social media data",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which column is continuous numerical data?",
        type: "multiple_choice",
        points: 1,
        explanation: "GB is measured, so continuous",
        answers: [
          {
            text: "Number of children",
            isCorrect: false,
          },
          {
            text: "Branch name",
            isCorrect: false,
          },
          {
            text: "Customer ID",
            isCorrect: false,
          },
          {
            text: "Data used in GB",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Customer satisfaction rated \"Poor, Fair, Good, Excellent\" is:",
        type: "multiple_choice",
        points: 1,
        explanation: "ordered labels are ordinal",
        answers: [
          {
            text: "Ordinal",
            isCorrect: true,
          },
          {
            text: "Nominal",
            isCorrect: false,
          },
          {
            text: "Continuous",
            isCorrect: false,
          },
          {
            text: "Boolean",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why should phone numbers be stored as text?",
        type: "multiple_choice",
        points: 1,
        explanation: "never calculated; leading zeros lost",
        answers: [
          {
            text: "They are too long to see",
            isCorrect: false,
          },
          {
            text: "Text is faster",
            isCorrect: false,
          },
          {
            text: "You never calculate with them, and as numbers they can lose leading zeros",
            isCorrect: true,
          },
          {
            text: "Excel requires it",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which date format does this course use?",
        type: "multiple_choice",
        points: 1,
        explanation: "YYYY-MM-DD",
        answers: [
          {
            text: "DD/MM/YY",
            isCorrect: false,
          },
          {
            text: "YYYY-MM-DD",
            isCorrect: true,
          },
          {
            text: "MM-DD-YYYY",
            isCorrect: false,
          },
          {
            text: "Any format",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A folder of customer voice notes is an example of:",
        type: "multiple_choice",
        points: 1,
        explanation: "voice notes have no fixed format",
        answers: [
          {
            text: "Structured data",
            isCorrect: false,
          },
          {
            text: "Boolean data",
            isCorrect: false,
          },
          {
            text: "Ordinal data",
            isCorrect: false,
          },
          {
            text: "Unstructured data",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which question type is best for \"Which branch did you visit?\"",
        type: "multiple_choice",
        points: 1,
        explanation: "fixed choices prevent spelling variants",
        answers: [
          {
            text: "Free text",
            isCorrect: false,
          },
          {
            text: "Number box",
            isCorrect: false,
          },
          {
            text: "Drop-down or choice list",
            isCorrect: true,
          },
          {
            text: "Date picker",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does validation do?",
        type: "multiple_choice",
        points: 1,
        explanation: "rules check answers before accepting",
        answers: [
          {
            text: "Checks answers against rules before accepting them",
            isCorrect: true,
          },
          {
            text: "Makes the form colourful",
            isCorrect: false,
          },
          {
            text: "Sends the form by email",
            isCorrect: false,
          },
          {
            text: "Deletes old answers",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Surveying only Saturday-morning shoppers at one branch is an example of:",
        type: "multiple_choice",
        points: 1,
        explanation: "one branch and time is not representative",
        answers: [
          {
            text: "Validation",
            isCorrect: false,
          },
          {
            text: "Unstructured data",
            isCorrect: false,
          },
          {
            text: "A good sample",
            isCorrect: false,
          },
          {
            text: "Sampling bias",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which is a benefit of automatic system collection?",
        type: "multiple_choice",
        points: 1,
        explanation: "fast and no typing errors",
        answers: [
          {
            text: "It never has gaps",
            isCorrect: false,
          },
          {
            text: "It is fast and avoids typing errors",
            isCorrect: true,
          },
          {
            text: "It captures opinions",
            isCorrect: false,
          },
          {
            text: "It needs no electricity",
            isCorrect: false,
          },
        ],
      },
      {
        text: "When should you use a free-text question?",
        type: "multiple_choice",
        points: 1,
        explanation: "only when you need people's own words",
        answers: [
          {
            text: "Always",
            isCorrect: false,
          },
          {
            text: "For dates",
            isCorrect: false,
          },
          {
            text: "For yes/no questions",
            isCorrect: false,
          },
          {
            text: "Only when you need people's own words",
            isCorrect: true,
          },
        ],
      },
      {
        text: "One customer saved twice under two IDs is a problem of:",
        type: "multiple_choice",
        points: 1,
        explanation: "a repeat is a uniqueness problem",
        answers: [
          {
            text: "Timeliness",
            isCorrect: false,
          },
          {
            text: "Validity",
            isCorrect: false,
          },
          {
            text: "Completeness",
            isCorrect: false,
          },
          {
            text: "Uniqueness",
            isCorrect: true,
          },
        ],
      },
      {
        text: "A date of birth in the future breaks which dimension?",
        type: "multiple_choice",
        points: 1,
        explanation: "impossible values break validity",
        answers: [
          {
            text: "Validity",
            isCorrect: true,
          },
          {
            text: "Consistency",
            isCorrect: false,
          },
          {
            text: "Uniqueness",
            isCorrect: false,
          },
          {
            text: "Timeliness",
            isCorrect: false,
          },
        ],
      },
      {
        text: "\"M\" in some rows and \"Male\" in others is a problem of:",
        type: "multiple_choice",
        points: 1,
        explanation: "same thing written differently",
        answers: [
          {
            text: "Completeness",
            isCorrect: false,
          },
          {
            text: "Uniqueness",
            isCorrect: false,
          },
          {
            text: "Consistency",
            isCorrect: true,
          },
          {
            text: "Timeliness",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does data minimisation mean?",
        type: "multiple_choice",
        points: 1,
        explanation: "collect only what you need",
        answers: [
          {
            text: "Making files smaller",
            isCorrect: false,
          },
          {
            text: "Collecting only the data you need",
            isCorrect: true,
          },
          {
            text: "Deleting all data",
            isCorrect: false,
          },
          {
            text: "Using small fonts",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A colleague needs your customer file to analyse sales by city. What should you do?",
        type: "multiple_choice",
        points: 1,
        explanation: "keep CustomerID and City, remove identifiers",
        answers: [
          {
            text: "Send it as it is",
            isCorrect: false,
          },
          {
            text: "Post it in a group chat",
            isCorrect: false,
          },
          {
            text: "Remove names, phones and emails first, keeping CustomerID and City",
            isCorrect: true,
          },
          {
            text: "Refuse to share any data",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 3,
    moduleTitle: "Introduction to Microsoft Excel for Data Analysis",
    moduleDescription: "Learners open Excel for the first time, enter and format a dataset properly, write their first formulas and produce a simple sorted and filtered report. Every step works in the free Excel for the web; the desktop app works the same way. The module uses the Sunrise Mart sales records from Lesson 1.1, so learners can check Excel's answers against the totals they worked out by hand.",
    lessons: [
      {
        title: "Getting started: workbooks, sheets, cells and ranges",
        order: 1,
        durationMinutes: 75,
        videoUrl: "https://www.youtube.com/watch?v=1zbs6WhDabQ",
        content: "## Lesson introduction\n\n- **What you will study:** the parts of the Excel screen, how cells are named, and how to move around and select data.\n- **Why it matters:** every Excel skill in this course depends on knowing exactly which cell you are working in.\n- **After this lesson you can:** name any cell, select a range, enter the Sunrise Mart data and save it in your course folder.\n- **Estimated time:** 75 minutes.\n\n## The topic in simple English\n\nExcel is a giant grid, like squared paper in an exercise book.\n\n- Columns run **up and down** and are named with letters: A, B, C.\n- Rows run **across** and are named with numbers: 1, 2, 3.\n- Each box is a **cell**. Its name is its column letter then its row number, like a seat number in a cinema: C4 is column C, row 4.\n\nA file is called a **workbook**. A workbook holds one or more **sheets**, like pages in a notebook.\n\n## Learning objectives\n\n1. Identify the ribbon, formula bar, name box, columns, rows, cells and sheet tabs.\n2. Name any cell by its address.\n3. Select a single cell, a range and a whole column.\n4. Enter a 10-row dataset accurately and save it.\n\n## Main teaching content\n\n**1. The Excel screen**\n\n| Part | Where it is | What it does |\n| --- | --- | --- |\n| Ribbon | Across the top | Tabs (Home, Insert, Data, View) holding all the buttons |\n| Name box | Left, just above the grid | Shows the address of the selected cell |\n| Formula bar | Right of the name box | Shows what is really inside the selected cell |\n| Column letters | Above the grid | A, B, C… |\n| Row numbers | Left of the grid | 1, 2, 3… |\n| Sheet tabs | Bottom left | Switch between sheets; + adds a new one |\n\n**2. Cells and addresses**\n\n- **What it means:** every cell has an address made of its column letter and row number.\n- **Why it is useful:** formulas use addresses to find numbers, such as \"multiply E2 by F2\".\n- **Everyday example:** a seat number in a stadium: block E, row 2.\n- **Business example:** in the Sunrise Mart sheet, cell G2 holds the total of the first order.\n\n**3. Ranges**\n\nA **range** is a block of cells, written as first cell, colon, last cell. **G2:G11** means G2 down to G11, ten cells. **A1:G11** means the whole rectangle from A1 to G11.\n\n**4. Moving and selecting**\n\n| To do this | Do this |\n| --- | --- |\n| Select one cell | Click it |\n| Move one cell | Arrow keys |\n| Select a range | Click the first cell, hold Shift, click the last cell |\n| Select a whole column | Click its letter |\n| Jump to the end of the data | Ctrl + arrow key (Cmd + arrow on a Mac) |\n| Undo a mistake | Ctrl + Z (Cmd + Z on a Mac) |\n\n**5. Saving**\n\nExcel for the web saves automatically to OneDrive every few seconds. There is no Save button to forget. The desktop app needs Ctrl + S.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Workbook | An Excel file | The whole notebook | A notebook | Sunrise Mart sales.xlsx |\n| Worksheet (sheet) | One grid inside a workbook | One page | A page in the notebook | A sheet for March sales |\n| Cell | One box in the grid, at a column and row | One box | A seat in a stadium | G2: the first order's total |\n| Cell reference (address) | The column letter and row number of a cell | The seat number | Block E, row 2 | E2 |\n| Range | A rectangular group of cells | A block of boxes | A row of seats | G2:G11 |\n| Ribbon | The toolbar of tabs and buttons | The menu bar | The buttons on a TV remote | Home, Insert, Data tabs |\n| Formula bar | The bar showing a cell's true contents | Where you see what's really inside | Reading the label on a jar | Seeing =E2\\*F2 behind 1,400 |\n\n## Step-by-step demonstration: entering the Sunrise Mart sales\n\n1. Go to **office.com**, open **Excel**, and click **Blank workbook**.\n2. Click the file name at the top, type **Sunrise Mart sales**, and press **Enter**.\n3. At the bottom left, double-click the tab **Sheet1**, type **Sales**, and press **Enter**.\n4. Click cell **A1** and type the headings, pressing **Tab** after each one to move right: **OrderID**, **Date**, **Branch**, **Category**, **Quantity**, **UnitPrice**, **Total**. Press **Enter** after the last one.\n5. Click **A2**. Type the first order, pressing **Tab** between cells: **1001**, **2026-03-02**, **Central**, **Drinks**, **4**, **350**. Leave column G empty; you will calculate it with a formula in Lesson 3.3. Press **Enter**. Excel jumps to A3.\n6. Enter the other nine orders from Lesson 1.1 the same way, rows 3 to 11. Do not type the Total column.\n7. **Check your typing:** **s**elect **E2:E11** by clicking E2, holding **Shift** and clicking E11. The status bar at the bottom right of the screen shows **Sum: 34**. Select **F2:F11**. It shows **Sum: 10,250**. If your numbers differ, find the typing mistake.\n8. Click **A1** and look at the name box. It says **A1**. Click **F****4. The name box says F4** and the formula bar shows **2500**.\n\n**Why the dates may look different:** Excel recognises 2026-03-02 as a date and may display it as 02/03/2026 or 3/2/2026, depending on your computer's region. The date is stored correctly. In Lesson 3.2 you will make it display as 2026-03-02.\n\n## Practical exercise\n\n- **Task:** practise cell addresses and enter a second small dataset.\n- **Steps:**\n  1. In your Sales sheet, write down what is in cells **C5**, **D8** and **F10**. (Answers: Hilltop, Groceries, 350.)\n  2. Write the range address that covers all the Branch values.\n  3. Click **+** at the bottom to add a sheet. Rename it **My data**.\n  4. Enter your 7-day personal data table from Lesson 1.1 (Day, Date, Value, Note).\n  5. Select the Value column and read the sum and average from the status bar.\n- **Expected output:** three cell values, one range address, and a My data sheet with 8 rows (heading plus 7 days).\n- **Submit:** a screenshot of each sheet showing the status bar.\n\n## Knowledge check\n\n1. What is the address of the cell in column D, row 7?\n   - A) D7\n   - B) 7D\n   - C) D:7\n   - D) Row7ColD\n2. How many cells are in the range B2:B11?\n   - A) 9\n   - B) 11\n   - C) 10\n   - D) 2\n3. Where can you see what is really inside a cell?\n   - A) The sheet tab\n   - B) The ribbon\n   - C) The column letter\n   - D) The formula bar\n4. What is a workbook?\n   - A) One cell\n   - B) An Excel file that holds one or more sheets\n   - C) One row\n   - D) A chart\n5. You select E2:E11 and the status bar shows Sum: 33 instead of 34. What should you do?\n   - A) Ignore it\n   - B) Delete the sheet\n   - C) Check the Quantity column for a typing mistake\n   - D) Change one number to make it 34\n\n## Lesson summary\n\n1. Columns are letters, rows are numbers, and a cell's address is column then row.\n2. A range is written first cell:last cell, such as G2:G11.\n3. The formula bar shows what is really in a cell.\n4. The status bar gives a quick sum and average of any selection.\n5. Excel for the web saves automatically.\n\n## Completion check\n\n- [ ] I can name any cell and range.\n- [ ] My Sales sheet has 10 orders in rows 2–11.\n- [ ] Quantity sums to 34 and UnitPrice to 10,250.",
      },
      {
        title: "Entering and formatting data correctly",
        order: 2,
        durationMinutes: 75,
        videoUrl: "https://www.youtube.com/watch?v=z2ML5AVy_ys",
        content: "## Lesson introduction\n\n- **What you will study:** the rules for laying out data so Excel can analyse it, and how to format numbers, dates and headings.\n- **Why it matters:** a badly laid-out sheet breaks formulas, sorting and filtering. Good layout now saves hours later.\n- **After this lesson you can:** lay out a dataset correctly, format it clearly and keep the headings visible while you scroll.\n- **Estimated time:** 75 minutes.\n\n## The topic in simple English\n\nExcel is very good at maths but very literal. It does exactly what the data says. If one cell says \"350\" and another says \"350 each\", Excel treats the first as a number and the second as words.\n\nSo we follow a few simple layout rules, like keeping a tidy filing cabinet: one item per folder, every folder labelled, nothing stuffed in sideways.\n\n**Formatting** changes how data *looks*, not what it *is*. A number formatted as 1,400 is still 1400 underneath.\n\n## Learning objectives\n\n1. Apply the five rules of a well-structured dataset.\n2. Format numbers with thousands separators and dates as YYYY-MM-DD.\n3. Store IDs and phone numbers as text.\n4. Format a header row and freeze it.\n\n## Main teaching content\n\n**1. Five rules of a well-structured dataset**\n\n1. **One header row** at the top, with a short, clear name for each column.\n2. **One record per row.** Each row is one sale, one customer or one transaction.\n3. **One fact per cell.** Write \"350\" in UnitPrice, not \"350 each\". Put first and last names in separate columns if you need to sort by surname.\n4. **No blank rows or columns** inside the data. Excel treats a blank row as the end of the data.\n5. **No merged cells** inside the data. Merging breaks sorting and filtering.\n\n- **Why it is useful:** these rules let Excel, SQL, Power BI and Python all read your data without errors.\n- **Everyday example:** a phone contact list: one contact per entry, name in the name field, number in the number field.\n- **Business example:** a bank statement export: one transaction per row, date, description and amount in separate columns.\n\n**2. Numbers versus text**\n\nExcel lines up numbers on the right of a cell and text on the left. This is a quick visual check. If a number sits on the left, Excel thinks it is text and will not add it.\n\nIDs and phone numbers are the exception: you *want* them stored as text (Lesson 2.2). To store a value as text, type an apostrophe first: **'0700 555 0101**. The apostrophe does not show in the cell.\n\n**3. Number formats**\n\n| Format | What it shows | Use for |\n| --- | --- | --- |\n| Number with thousands separator | 2,500 | Amounts and counts |\n| Number with 2 decimals | 2,500.00 | Amounts that need cents |\n| Percentage | 23.2% | Shares and rates |\n| Custom date yyyy-mm-dd | 2026-03-02 | All dates in this course |\n| Text | 0700 555 0101 | IDs and phone numbers |\n\n**4. Making headings stand out**\n\nBold, a fill colour and a bottom border make the header row clear. Freezing the top row keeps the headings visible when you scroll through hundreds of rows.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Header row | The first row, holding column names | The labels | The titles on a timetable | OrderID, Date, Branch… |\n| Number format | How a value is displayed | The value's outfit | Writing a price with commas | 2,500 instead of 2500 |\n| Merged cell | Several cells joined into one | Boxes glued together | A big title across a poster | A title across A1:G1 (avoid inside data) |\n| Freeze panes | Keeping rows or columns visible while scrolling | Pinning the labels | A sticky note at the top of a page | Headings stay on screen |\n| Text value | A cell Excel treats as words | Not for maths | A name | A phone number stored with ' |\n\n## Step-by-step demonstration: formatting the Sales sheet\n\nOpen your **Sunrise Mart sales** workbook, **Sales** sheet.\n\n**Format the dates**\n\n1. Click the column letter **B** to select the Date column.\n2. Right-click inside the selection and choose **Number Format** (in some versions, **Format Cells**).\n3. Choose **Custom**. In the **Type** box, type **yyyy-mm-dd**. Click **OK**.\n4. **Check:** B2 now shows **2026-03-02**.\n\n**Format the money columns**\n\n5. Select **F2:F11** (click F2, hold Shift, click F11).\n6. On the **Home** tab, open the **Number Format** drop-down and choose **Number**. Click **Decrease Decimal** twice to remove the decimals. Click the **Comma Style** button (the \",\" icon) if your version shows decimals again, then decrease decimals.\n7. **Check:** F4 shows **2,500**.\n8. Select column **G** and apply the same number format now, ready for the totals in Lesson 3.3.\n\n**Format the header row**\n\n9. Click the row number **1** to select the header row.\n10. On the **Home** tab, click **Bold** (B). Open **Fill Color** (the paint bucket) and pick a light colour. Open **Borders** and choose **Bottom Border**.\n11. Select columns **A to G** (click A, hold Shift, click G). Double-click the line between any two column letters. Each column widens to fit its contents.\n\n**Freeze the header row**\n\n12. Click the **View** tab, then **Freeze Panes**, then **Freeze Top Row**.\n13. **Check:** scroll down. Row 1 stays at the top of the screen.\n\n**Check the alignment**\n\n14. Look at columns E and F. All numbers should sit on the **right** of their cells. If any sits on the left, retype it.\n\n## Practical exercise\n\n- **Task:** lay out and format a small customer list correctly.\n- **Steps:**\n  1. Add a new sheet called **Customers**.\n  2. Enter the first three customers from Lesson 2.2 (C001, C003, C005), with the same nine column headings.\n  3. Store phone numbers as text using an apostrophe. Check the leading zero shows.\n  4. Format both date columns as yyyy-mm-dd.\n  5. Make the header row bold with a fill colour and freeze it.\n  6. Leave C003's phone blank; do not type \"none\" or \"N/A\".\n- **Expected output:** a 4-row formatted sheet (header plus three customers) with phone numbers keeping their leading zero.\n- **Submit:** a screenshot.\n\n## Knowledge check\n\n1. Which breaks the rules of a well-structured dataset?\n   - A) One header row\n   - B) One record per row\n   - C) A blank row in the middle of the data\n   - D) One fact per cell\n2. A UnitPrice cell contains \"350 each\". What is the problem?\n   - A) Excel treats it as text and will not calculate with it\n   - B) Nothing\n   - C) The font is wrong\n   - D) The cell is too wide\n3. How do you store 0700 555 0101 as text in a cell?\n   - A) Type it in bold\n   - B) Merge two cells\n   - C) Use a percentage format\n   - D) Type an apostrophe first: '0700 555 0101\n4. What does Freeze Top Row do?\n   - A) Stops anyone editing row 1\n   - B) Keeps row 1 visible while you scroll\n   - C) Deletes row 1\n   - D) Locks the file\n5. A cell formatted to show 1,400 contains:\n   - A) The text \"1,400\"\n   - B) The number 14\n   - C) A formula\n   - D) The number 1400; formatting changes only how it looks\n\n## Lesson summary\n\n1. One header row, one record per row, one fact per cell, no blank rows, no merged cells.\n2. Formatting changes how data looks, not what it is.\n3. Numbers align right and text aligns left: a quick check.\n4. Store IDs and phone numbers as text.\n5. Format dates as yyyy-mm-dd and freeze the header row.\n\n## Completion check\n\n- [ ] My Sales sheet shows dates as 2026-03-02 and prices with commas.\n- [ ] My header row is bold, coloured and frozen.\n- [ ] My Customers sheet keeps the leading zero on phone numbers.",
      },
      {
        title: "Your first formulas: SUM, AVERAGE, COUNT, MIN, MAX",
        order: 3,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=LsZCXXM-63g",
        content: "## Lesson introduction\n\n- **What you will study:** how to write formulas, copy them down a column, and use five essential functions.\n- **Why it matters:** formulas are what make Excel powerful. Change one number and every total updates by itself.\n- **After this lesson you can:** calculate each order's total, the overall sales, the average order value, the smallest and largest orders, and each order's share of sales.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nA **formula** is an instruction that tells Excel to calculate something. Every formula starts with an equals sign (=).\n\nInstead of typing 1,400 into the Total column, you tell Excel: \"multiply this row's quantity by its price\". Excel does the maths and redoes it whenever a number changes.\n\nA **function** is a ready-made formula with a name. SUM adds things up. AVERAGE finds the average. You just tell it which cells to use.\n\nIt is like a calculator that remembers what you asked it, forever.\n\n## Learning objectives\n\n1. Write a formula using cell references and the operators + − \\* /.\n2. Copy a formula down a column with the fill handle.\n3. Use SUM, AVERAGE, COUNT, MIN and MAX on a range.\n4. Use an absolute reference (dollar signs) to divide every row by one fixed total.\n5. Check formula results against a hand calculation.\n\n## Main teaching content\n\n**1. Writing a formula**\n\n| You want | Type | Operator |\n| --- | --- | --- |\n| Add | `=E2+F2` | + |\n| Subtract | `=E2-F2` | − |\n| Multiply | `=E2*F2` | \\* (star) |\n| Divide | `=E2/F2` | / (slash) |\n\n- **What it means:** a formula uses cell addresses, so it calculates with whatever is in those cells.\n- **Why it is useful:** if a price changes, the total updates automatically.\n- **Everyday example:** \"my monthly transport cost = daily fare × working days\".\n- **Business example:** Total = Quantity × UnitPrice, for every order.\n\n**2. The five essential functions**\n\n| Function | What it does | Example | Business question it answers |\n| --- | --- | --- | --- |\n| SUM | Adds all numbers in a range | `=SUM(G2:G11)` | What were total sales? |\n| AVERAGE | Adds them, then divides by how many there are | `=AVERAGE(G2:G11)` | How much does a typical order bring in? |\n| COUNT | Counts cells that contain numbers | `=COUNT(G2:G11)` | How many orders were there? |\n| MIN | Finds the smallest number | `=MIN(G2:G11)` | What was the smallest order? |\n| MAX | Finds the largest number | `=MAX(G2:G11)` | What was the largest order? |\n\n**COUNT versus COUNTA:** COUNT counts only numbers. COUNTA counts any cell that is not empty, including text. To count customers by name, use COUNTA.\n\n**3. Relative and absolute references**\n\nWhen you copy `=E2*F2` down one row, Excel changes it to `=E3*F3`. This is a **relative reference**: it moves with the formula. That is usually what you want.\n\nSometimes one cell must stay fixed, such as the overall total when calculating each order's share. Add dollar signs to lock it: `$G$13`. This is an **absolute reference**. When copied, it still points to G13.\n\n*Everyday example:* each pupil's share of a class prize fund. Each pupil's amount changes row by row, but the fund total stays the same.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Formula | An instruction that calculates a value, starting with = | A calculation Excel remembers | \"fare × days\" | `=E2*F2` |\n| Function | A named, built-in formula | A ready-made calculation | The % button on a calculator | SUM, AVERAGE |\n| Argument | The input a function needs, inside brackets | What you give the function | The numbers you type into a calculator | G2:G11 in `=SUM(G2:G11)` |\n| Fill handle | The small square at the bottom-right of a selected cell | The copy-down dot | Dragging to copy a pattern | Copying `=E2*F2` down to row 11 |\n| Relative reference | A reference that changes when copied | Moves with the formula | \"The person next to me\" | E2 becomes E3 |\n| Absolute reference | A reference fixed with dollar signs | Stays put when copied | \"The class teacher\" | `$G$13` |\n\n## Step-by-step demonstration: calculating Sunrise Mart's sales\n\nOpen **Sunrise Mart sales**, **Sales** sheet. Columns A to F hold the ten orders in rows 2–11. Column G (Total) is empty.\n\n**Part 1. Each order's total**\n\n1. Click **G2**. Type `=E2*F2` and press **Enter**. G2 shows **1,400** (4 × 350).\n2. Click **G2** again. Move the mouse to the small square at its bottom-right corner (the fill handle). The pointer becomes a thin black cross.\n3. Double-click the fill handle. The formula copies down to G11 automatically. (Or drag it down to G11.)\n4. Click **G8**. The formula bar shows `=E8*F8` and the cell shows **5,000** (2 × 2,500). Excel adjusted the row numbers for you.\n5. **Check:** the totals match the Total column in Lesson 1.1, row by row.\n\n**Part 2. A summary below the data**\n\nLeave row 12 empty so the summary is clearly separate from the data. Type the labels in column F and the formulas in column G:\n\n| Cell | Type this | Cell | Type this | Result |\n| --- | --- | --- | --- | --- |\n| F13 | Total sales | G13 | `=SUM(G2:G11)` | 21,550 |\n| F14 | Number of orders | G14 | `=COUNT(G2:G11)` | 10 |\n| F15 | Average order value | G15 | `=AVERAGE(G2:G11)` | 2,155 |\n| F16 | Smallest order | G16 | `=MIN(G2:G11)` | 700 |\n| F17 | Largest order | G17 | `=MAX(G2:G11)` | 5,000 |\n| F18 | Units sold | G18 | `=SUM(E2:E11)` | 34 |\n\n**Check your results three ways:**\n\n- **Against Lesson 1.3:** the branch totals you worked out by hand were 7,100 + 4,550 + 9,900 = 21,550. Excel agrees.\n- **Average check:** 21,550 ÷ 10 orders = 2,155. Excel agrees.\n- **Status bar:** select G2:G11. The status bar shows Sum 21,550 and Average 2,155.\n\n**Shortcut:** the **AutoSum** button (Σ) on the Home tab writes the SUM formula for you. Its small arrow also offers Average, Count, Max and Min.\n\n**Part 3. Each order's share of sales**\n\n6. Click **H1** and type **Share**.\n7. Click **H2** and type `=G2/$G$13`. Press **Enter**. The dollar signs lock the reference to the total sales cell.\n8. Copy H2 down to H11 with the fill handle.\n9. Select **H2:H11**. On the **Home** tab, click the **%** (Percent Style) button, then **Increase Decimal** once.\n10. **Check:** H8 (order 1007) shows **23.2%**, because 5,000 ÷ 21,550 = 0.232. Select H2:H11: the status bar sum is **100.0%**.\n\n**What goes wrong without the dollar signs:** if H2 were `=G2/G13`, copying it down gives `=G3/G14` in H3, which divides by the order count, not total sales. The answers would be nonsense. The dollar signs prevent this.\n\n**Part 4. See the power of formulas**\n\n11. Change **F2** (order 1001's price) from 350 to **400**. Watch G2 become 1,600 and G13 become 21,750. Every share in column H updates too.\n12. Press **Ctrl + Z** (Cmd + Z on a Mac) to undo. Everything returns to the original values.\n\n## Practical exercise: planning a price increase\n\n- **Task:** Sunrise Mart is considering a 10% price rise. Calculate the new prices and the effect on sales.\n- **Steps:**\n  1. Right-click the Sales sheet tab, choose Duplicate, and rename the copy Price test. Do this whole exercise on Price test, so the Sales sheet stays clean for Lesson 3.4. In **J1** type **Increase**. In **J2** type **10%**.\n  2. In **I1** type **NewPrice**. In **I2** type `=F2*(1+$J$2)` and copy it down to I11.\n  3. In **F20** type **Sales at new prices**. In **G20** type `=SUMPRODUCT(E2:E11,I2:I11)`. SUMPRODUCT multiplies each quantity by its new price and adds the results.\n  4. Also calculate the average quantity per order (`=AVERAGE(E2:E11)`), the largest quantity (`=MAX(E2:E11)`) and the smallest (`=MIN(E2:E11)`) in cells you label yourself.\n  5. Change J2 to **5%** and note how the new prices and G20 change.\n- **Expected output:** at 10%, I2 = 385, I4 = 2,750 and G20 = 23,705. Average quantity = 3.4, largest = 8, smallest = 1. At 5%, G20 = 22,627.50.\n- **Submit:** a screenshot showing columns I and J and your results at 10%.\n\n## Knowledge check\n\n1. What must every Excel formula start with?\n   - A) An equals sign (=)\n   - B) A letter\n   - C) A bracket\n   - D) A dollar sign\n2. Which formula calculates the average of G2:G11?\n   - A) `=SUM(G2:G11)/2`\n   - B) `=MEAN(G2,G11)`\n   - C) `=AVG G2 to G11`\n   - D) `=AVERAGE(G2:G11)`\n3. You copy `=E2*F2` from G2 down to G3. What formula appears in G3?\n   - A) `=E2*F2`\n   - B) `=F3*G3`\n   - C) `=E3*F3`\n   - D) `=E2*F3`\n4. Why do we write `$G$13` in the share formula?\n   - A) To show it is money\n   - B) To keep the reference fixed on the total when the formula is copied\n   - C) To make it bold\n   - D) Excel requires dollar signs in every formula\n5. Sales are 1,000, 2,000 and 3,000. What does MAX return?\n   - A) 1,000\n   - B) 2,000\n   - C) 3,000\n   - D) 6,000\n\n## Lesson summary\n\n1. Formulas start with = and use cell addresses, so they update automatically.\n2. Copy a formula down with the fill handle; relative references adjust row by row.\n3. SUM, AVERAGE, COUNT, MIN and MAX answer the most common business questions.\n4. Use dollar signs to lock a reference that must not move, such as a total.\n5. Always check a result another way: by hand, with the status bar, or by adding the parts.\n\n## Completion check\n\n- [ ] Column G shows each order's total and G13 shows 21,550.\n- [ ] My summary block shows count 10, average 2,155, min 700, max 5,000 and 34 units.\n- [ ] Column H shares add up to 100%.\n- [ ] My price-increase exercise gives 23,705 at 10%.",
      },
      {
        title: "Sorting, filtering and your first simple report",
        order: 4,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=Trpx8b5m-vM",
        content: "## Lesson introduction\n\n- **What you will study:** how to sort data, filter it to show only what you need, calculate totals for the visible rows, and turn the results into a one-page report with a chart.\n- **Why it matters:** managers rarely want all the data. They want the answer: biggest orders, one branch, one category.\n- **After this lesson you can:** sort by one or two columns, filter by any value, use SUBTOTAL, and build a simple branch sales report.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\n**Sorting** puts rows in order, like arranging exam scripts from highest mark to lowest.\n\n**Filtering** hides the rows you don't need for now, like asking a librarian to show only the books by one author. The other rows are not deleted, just hidden.\n\nA **report** is the answer written up clearly for someone else: a short title, a small table, a chart and two or three sentences.\n\n## Learning objectives\n\n1. Sort a dataset by one column and by two columns.\n2. Apply and clear filters on any column.\n3. Use SUBTOTAL to total only the visible rows.\n4. Build a one-page report with a summary table, a column chart and written findings.\n\n## Main teaching content\n\n**1. Sorting**\n\n- **What it means:** rearranging rows by the values in one or more columns.\n- **Why it is useful:** shows the biggest, smallest, newest or oldest at the top.\n- **Everyday example:** sorting your contacts A to Z.\n- **Business example:** sorting orders by Total, largest first, to see the most valuable sales.\n- **How it is used:** smallest to largest (ascending) or largest to smallest (descending). For text, A to Z or Z to A.\n\n**Golden rule:** always sort the whole table, never a single column. Sorting one column alone separates values from their rows and scrambles the data.\n\n**2. Sorting by two levels**\n\nSort first by Branch (A to Z), then within each branch by Total (largest first). The result groups the branches together, each with its biggest orders at the top.\n\n**3. Filtering**\n\nFilter buttons appear as small arrows on each heading. Pick the values to show. Filtered columns show a funnel icon, and the row numbers change colour so you know rows are hidden.\n\n**4. SUBTOTAL: totals for visible rows only**\n\nSUM adds every row, hidden or not. **SUBTOTAL** ignores rows hidden by a filter. Its first argument says which calculation to do: **9 means SUM**, 1 means AVERAGE, 2 means COUNT.\n\n`=SUBTOTAL(9,G2:G11)` adds only the rows you can see.\n\n**5. What a simple report contains**\n\n1. A clear title with the dates covered.\n2. A small summary table.\n3. One chart that shows the main point.\n4. Two or three sentences of findings, with numbers.\n5. A note on the data's limits.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Sort | Reorder rows by the values in a column | Put in order | Contacts A to Z | Orders by Total, largest first |\n| Ascending | Smallest to largest, A to Z, oldest to newest | Going up | 1, 2, 3 | Lowest sales first |\n| Descending | Largest to smallest, Z to A, newest to oldest | Going down | 3, 2, 1 | Highest sales first |\n| Filter | Temporarily show only rows that meet a condition | Hide what you don't need | Showing only unread messages | Only Hilltop orders |\n| SUBTOTAL | A function that can ignore filtered-out rows | Total of what you can see | Counting only the people in the room | Hilltop sales while filtered |\n| Report | A short, structured summary of findings | The answer, written up | A school report card | Weekly branch sales report |\n\n## Step-by-step demonstration\n\nOpen **Sunrise Mart sales**, **Sales** sheet, as you left it after Lesson 3.3: data in A1:H11 and the summary in F13:G18.\n\n**Part 1. Sort by Total, largest first**\n\n1. Click any cell inside the data, for example **C4**. Do not select a single column.\n2. Click the **Data** tab, then **Sort** (in some versions **Custom Sort**).\n3. Tick **My data has headers**. In **Sort by**, choose **Total**. In **Order**, choose **Largest to Smallest**. Click **OK**.\n4. **Check:** row 2 is now order **1007** (5,000), row 3 is **1009** (2,800), then the three 2,500 orders (1003, 1006, 1008). Order **1010** (700) is last. Each row still has its own branch and category, so whole rows moved together. The summary in row 13 onwards did not move, because the empty row 12 separates it from the data.\n\n**Part 2. Sort by two levels**\n\n5. Open **Data**, **Sort** again. Set **Sort by** to **Branch**, **A to Z**.\n6. Click **Add Level**. Set **Then by** to **Total**, **Largest to Smallest**. Click **OK**.\n7. **Check:** Central's four orders come first (2,500, 2,500, 1,400, 700), then Hilltop (5,000, 2,800, 2,100), then Riverside (2,500, 1,050, 1,000).\n8. To return to the original order, sort by **OrderID**, **Smallest to Largest**.\n\n**Part 3. Filter and SUBTOTAL**\n\n9. In **F19** type **Visible sales**. In **G19** type `=SUBTOTAL(9,G2:G11)`. It shows **21,550**, the same as G13, because no rows are hidden yet.\n10. Click any cell in the data. On the **Data** tab, click **Filter**. Arrows appear on every heading.\n11. Click the arrow on **Branch**. Untick **Select All**, tick **Hilltop** only, and click **OK** (or **Apply**).\n12. **Check:** three rows remain (1004, 1007, 1009). G19 shows **9,900**. G13 still shows 21,550, because SUM counts hidden rows.\n13. Change the filter to **Central** only. G19 shows **7,100**. Change it to **Riverside**. G19 shows **4,550**. Write the three figures down.\n14. Open the **Branch** arrow and choose **Clear Filter**. Now filter **Category** to **Drinks**. G19 shows **8,050**, matching Lesson 1.3.\n15. Clear all filters: on the **Data** tab click **Clear**, or click **Filter** again to switch filters off.\n\n**Part 4. Build the report**\n\n16. Click **+** to add a sheet. Rename it **Report**.\n17. In **A1** type **Sunrise Mart sales by branch, 2–4 March 2026** and make it bold.\n18. Type this table, starting in A3:\n\n| Cell | Value | Cell | Value |\n| --- | --- | --- | --- |\n| A3 | Branch | B3 | Sales |\n| A4 | Hilltop | B4 | 9900 |\n| A5 | Central | B5 | 7100 |\n| A6 | Riverside | B6 | 4550 |\n| A7 | Total | B7 | `=SUM(B4:B6)` |\n\n19. **Check:** B7 shows **21,550**, the same as the Sales sheet's G13. If not, one of your filtered figures is wrong.\n20. In **C3** type **Share**. In **C4** type `=B4/$B$7`, copy it to C6 and format as a percentage with one decimal: **45.9%**, **32.9%** and **21.1%**.\n21. Select **A3:B6**. Click **Insert**, then **Column** (or **Bar**), and choose the first **Clustered Column** chart.\n22. Click the chart title and type **Hilltop had the highest sales**. A title that states the finding is more useful than one that just says \"Sales\".\n23. Below the chart, type the findings:\n\n> Hilltop had the highest sales, 9,900 (45.9% of the total), mainly from groceries and drinks. Riverside had the lowest, 4,550 (21.1%). These figures cover only 10 orders over three days, so they should be checked against a longer period before any decision is made.\n\n**Note on rounding:** 45.9% + 32.9% + 21.1% = 99.9%, not 100%, because each share was rounded to one decimal. This is normal. Mention it if a reader might notice.\n\n**Looking ahead:** typing the branch totals by hand works for three branches. In Module 4 you will use SUMIFS and PivotTables to calculate them automatically for any number of branches.\n\n## Practical exercise: a category report\n\n- **Task:** produce a second report showing sales by category.\n- **Steps:**\n  1. Filter the Sales sheet by Category, one at a time, and record each SUBTOTAL result.\n  2. Add a **Category report** sheet with a title, a table (Category, Sales, Share), a column chart and two sentences of findings.\n  3. Check that your three category totals add up to 21,550.\n  4. Sort your report table from the highest to the lowest sales.\n- **Expected output:** Groceries 10,000 (46.4%), Drinks 8,050 (37.4%), Snacks 3,500 (16.2%); total 21,550.\n- **Submit:** a screenshot of the report.\n\n## Knowledge check\n\n1. Why should you never sort a single column on its own?\n   - A) It is slower\n   - B) Excel will delete the column\n   - C) It separates values from the rest of their row and scrambles the data\n   - D) It changes the formulas to text\n2. Sorting Total from largest to smallest is:\n   - A) Descending\n   - B) Ascending\n   - C) Filtering\n   - D) Grouping\n3. A filter shows only Hilltop orders. What does `=SUM(G2:G11)` return?\n   - A) Only Hilltop's sales\n   - B) Zero\n   - C) An error\n   - D) The total for all orders, including hidden rows\n4. What does the 9 in `=SUBTOTAL(9,G2:G11)` mean?\n   - A) Count nine rows\n   - B) Use SUM on the visible rows\n   - C) Round to nine decimals\n   - D) Show the ninth row\n5. Which chart title is most useful in a report?\n   - A) \"Hilltop had the highest sales\"\n   - B) \"Chart 1\"\n   - C) \"Sales\"\n   - D) \"Column chart\"\n\n## Lesson summary\n\n1. Sort the whole table; use two levels to group and then rank.\n2. Filters hide rows without deleting them.\n3. SUBTOTAL with 9 totals only the visible rows; SUM totals everything.\n4. A simple report has a title, a summary table, one chart, findings with numbers and a note on limits.\n5. Check that your report's parts add up to the overall total.\n\n## Completion check\n\n- [ ] I can sort by Total and by Branch then Total.\n- [ ] My SUBTOTAL figures are Hilltop 9,900, Central 7,100, Riverside 4,550.\n- [ ] My Report sheet has a title, table, chart and findings.\n- [ ] My category totals add up to 21,550.",
      },
    ],
    assignmentTitle: "Brightpath Services performance report",
    assignmentDescription: "Brightpath Services (fictional) is a small professional services company with three departments: Consulting, Training and IT Support.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "What does the range A2:A11 contain?",
        type: "multiple_choice",
        points: 1,
        explanation: "Ten cells, A2 to A11",
        answers: [
          {
            text: "Two cells",
            isCorrect: false,
          },
          {
            text: "Eleven cells in row 2",
            isCorrect: false,
          },
          {
            text: "The whole sheet",
            isCorrect: false,
          },
          {
            text: "Ten cells in column A, rows 2 to 11",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which layout rule prevents sorting problems?",
        type: "multiple_choice",
        points: 1,
        explanation: "Merged cells and blank rows break sorting",
        answers: [
          {
            text: "Merge the header cells",
            isCorrect: false,
          },
          {
            text: "Avoid merged cells and blank rows inside the data",
            isCorrect: true,
          },
          {
            text: "Leave a blank row after every 5 rows",
            isCorrect: false,
          },
          {
            text: "Put two facts in each cell",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A cell shows 23.2% but contains 0.232. Why?",
        type: "multiple_choice",
        points: 1,
        explanation: "Formatting changes display only",
        answers: [
          {
            text: "A percentage format changes how it is displayed, not its value",
            isCorrect: true,
          },
          {
            text: "Excel made an error",
            isCorrect: false,
          },
          {
            text: "The formula is wrong",
            isCorrect: false,
          },
          {
            text: "It is stored as text",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which formula gives the total of G2:G11?",
        type: "multiple_choice",
        points: 1,
        explanation: "=SUM(G2:G11)",
        answers: [
          {
            text: "=TOTAL(G2:G11)",
            isCorrect: false,
          },
          {
            text: "=SUM(G2:G11)",
            isCorrect: true,
          },
          {
            text: "=ADD(G2-G11)",
            isCorrect: false,
          },
          {
            text: "=G2:G11",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Orders were 700, 1,000 and 1,300. What is the average?",
        type: "multiple_choice",
        points: 1,
        explanation: "(700 + 1,000 + 1,300) ÷ 3 = 1,000",
        answers: [
          {
            text: "900",
            isCorrect: false,
          },
          {
            text: "1,300",
            isCorrect: false,
          },
          {
            text: "1,000",
            isCorrect: true,
          },
          {
            text: "3,000",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which counts every non-empty cell, including text?",
        type: "multiple_choice",
        points: 1,
        explanation: "COUNTA counts any non-empty cell",
        answers: [
          {
            text: "COUNTA",
            isCorrect: true,
          },
          {
            text: "COUNT",
            isCorrect: false,
          },
          {
            text: "SUM",
            isCorrect: false,
          },
          {
            text: "MAX",
            isCorrect: false,
          },
        ],
      },
      {
        text: "In =G5/$G$13, which part stays fixed when copied down?",
        type: "multiple_choice",
        points: 1,
        explanation: "The dollar signs fix G13",
        answers: [
          {
            text: "G5",
            isCorrect: false,
          },
          {
            text: "Both",
            isCorrect: false,
          },
          {
            text: "Neither",
            isCorrect: false,
          },
          {
            text: "$G$13",
            isCorrect: true,
          },
        ],
      },
      {
        text: "You filter for Riverside and see 3 rows. What does =SUBTOTAL(9,G2:G11) return?",
        type: "multiple_choice",
        points: 1,
        explanation: "SUBTOTAL 9 sums visible rows only",
        answers: [
          {
            text: "The total of all 10 orders",
            isCorrect: false,
          },
          {
            text: "3",
            isCorrect: false,
          },
          {
            text: "The total of the 3 visible Riverside orders",
            isCorrect: true,
          },
          {
            text: "9",
            isCorrect: false,
          },
        ],
      },
      {
        text: "You want branches grouped together, with each branch's biggest order first. How do you sort?",
        type: "multiple_choice",
        points: 1,
        explanation: "Two-level sort: Branch, then Total",
        answers: [
          {
            text: "By Branch A to Z, then by Total largest to smallest",
            isCorrect: true,
          },
          {
            text: "By Total only",
            isCorrect: false,
          },
          {
            text: "By Date only",
            isCorrect: false,
          },
          {
            text: "Filter instead of sorting",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Your report's branch totals add up to 21,450, but total sales are 21,550. What should you do?",
        type: "multiple_choice",
        points: 1,
        explanation: "Parts must add to the whole; find the error of 100",
        answers: [
          {
            text: "Change the total to 21,450",
            isCorrect: false,
          },
          {
            text: "Ignore it; it is close enough",
            isCorrect: false,
          },
          {
            text: "Delete the report",
            isCorrect: false,
          },
          {
            text: "Recheck each branch figure; one is wrong by 100",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What is the address of the cell in column D, row 7?",
        type: "multiple_choice",
        points: 1,
        explanation: "column then row",
        answers: [
          {
            text: "D7",
            isCorrect: true,
          },
          {
            text: "7D",
            isCorrect: false,
          },
          {
            text: "D:7",
            isCorrect: false,
          },
          {
            text: "Row7ColD",
            isCorrect: false,
          },
        ],
      },
      {
        text: "How many cells are in the range B2:B11?",
        type: "multiple_choice",
        points: 1,
        explanation: "rows 2 to 11 inclusive = 10",
        answers: [
          {
            text: "9",
            isCorrect: false,
          },
          {
            text: "11",
            isCorrect: false,
          },
          {
            text: "10",
            isCorrect: true,
          },
          {
            text: "2",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Where can you see what is really inside a cell?",
        type: "multiple_choice",
        points: 1,
        explanation: "formula bar",
        answers: [
          {
            text: "The sheet tab",
            isCorrect: false,
          },
          {
            text: "The ribbon",
            isCorrect: false,
          },
          {
            text: "The column letter",
            isCorrect: false,
          },
          {
            text: "The formula bar",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What is a workbook?",
        type: "multiple_choice",
        points: 1,
        explanation: "a file holding sheets",
        answers: [
          {
            text: "One cell",
            isCorrect: false,
          },
          {
            text: "An Excel file that holds one or more sheets",
            isCorrect: true,
          },
          {
            text: "One row",
            isCorrect: false,
          },
          {
            text: "A chart",
            isCorrect: false,
          },
        ],
      },
      {
        text: "You select E2:E11 and the status bar shows Sum: 33 instead of 34. What should you do?",
        type: "multiple_choice",
        points: 1,
        explanation: "find the typing mistake",
        answers: [
          {
            text: "Ignore it",
            isCorrect: false,
          },
          {
            text: "Delete the sheet",
            isCorrect: false,
          },
          {
            text: "Check the Quantity column for a typing mistake",
            isCorrect: true,
          },
          {
            text: "Change one number to make it 34",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which breaks the rules of a well-structured dataset?",
        type: "multiple_choice",
        points: 1,
        explanation: "blank rows end the data",
        answers: [
          {
            text: "One header row",
            isCorrect: false,
          },
          {
            text: "One record per row",
            isCorrect: false,
          },
          {
            text: "A blank row in the middle of the data",
            isCorrect: true,
          },
          {
            text: "One fact per cell",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A UnitPrice cell contains \"350 each\". What is the problem?",
        type: "multiple_choice",
        points: 1,
        explanation: "\"350 each\" is text",
        answers: [
          {
            text: "Excel treats it as text and will not calculate with it",
            isCorrect: true,
          },
          {
            text: "Nothing",
            isCorrect: false,
          },
          {
            text: "The font is wrong",
            isCorrect: false,
          },
          {
            text: "The cell is too wide",
            isCorrect: false,
          },
        ],
      },
      {
        text: "How do you store 0700 555 0101 as text in a cell?",
        type: "multiple_choice",
        points: 1,
        explanation: "apostrophe stores it as text",
        answers: [
          {
            text: "Type it in bold",
            isCorrect: false,
          },
          {
            text: "Merge two cells",
            isCorrect: false,
          },
          {
            text: "Use a percentage format",
            isCorrect: false,
          },
          {
            text: "Type an apostrophe first: '0700 555 0101",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What does Freeze Top Row do?",
        type: "multiple_choice",
        points: 1,
        explanation: "keeps row 1 visible",
        answers: [
          {
            text: "Stops anyone editing row 1",
            isCorrect: false,
          },
          {
            text: "Keeps row 1 visible while you scroll",
            isCorrect: true,
          },
          {
            text: "Deletes row 1",
            isCorrect: false,
          },
          {
            text: "Locks the file",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A cell formatted to show 1,400 contains:",
        type: "multiple_choice",
        points: 1,
        explanation: "format changes look only",
        answers: [
          {
            text: "The text \"1,400\"",
            isCorrect: false,
          },
          {
            text: "The number 14",
            isCorrect: false,
          },
          {
            text: "A formula",
            isCorrect: false,
          },
          {
            text: "The number 1400; formatting changes only how it looks",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What must every Excel formula start with?",
        type: "multiple_choice",
        points: 1,
        explanation: "=",
        answers: [
          {
            text: "An equals sign (=)",
            isCorrect: true,
          },
          {
            text: "A letter",
            isCorrect: false,
          },
          {
            text: "A bracket",
            isCorrect: false,
          },
          {
            text: "A dollar sign",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which formula calculates the average of G2:G11?",
        type: "multiple_choice",
        points: 1,
        explanation: "AVERAGE",
        answers: [
          {
            text: "=SUM(G2:G11)/2",
            isCorrect: false,
          },
          {
            text: "=MEAN(G2,G11)",
            isCorrect: false,
          },
          {
            text: "=AVG G2 to G11",
            isCorrect: false,
          },
          {
            text: "=AVERAGE(G2:G11)",
            isCorrect: true,
          },
        ],
      },
      {
        text: "You copy =E2*F2 from G2 down to G3. What formula appears in G3?",
        type: "multiple_choice",
        points: 1,
        explanation: "relative references move down",
        answers: [
          {
            text: "=E2*F2",
            isCorrect: false,
          },
          {
            text: "=F3*G3",
            isCorrect: false,
          },
          {
            text: "=E3*F3",
            isCorrect: true,
          },
          {
            text: "=E2*F3",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why do we write $G$13 in the share formula?",
        type: "multiple_choice",
        points: 1,
        explanation: "locks the total cell",
        answers: [
          {
            text: "To show it is money",
            isCorrect: false,
          },
          {
            text: "To keep the reference fixed on the total when the formula is copied",
            isCorrect: true,
          },
          {
            text: "To make it bold",
            isCorrect: false,
          },
          {
            text: "Excel requires dollar signs in every formula",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Sales are 1,000, 2,000 and 3,000. What does MAX return?",
        type: "multiple_choice",
        points: 1,
        explanation: "the largest is 3,000",
        answers: [
          {
            text: "1,000",
            isCorrect: false,
          },
          {
            text: "2,000",
            isCorrect: false,
          },
          {
            text: "3,000",
            isCorrect: true,
          },
          {
            text: "6,000",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why should you never sort a single column on its own?",
        type: "multiple_choice",
        points: 1,
        explanation: "rows get scrambled",
        answers: [
          {
            text: "It is slower",
            isCorrect: false,
          },
          {
            text: "Excel will delete the column",
            isCorrect: false,
          },
          {
            text: "It separates values from the rest of their row and scrambles the data",
            isCorrect: true,
          },
          {
            text: "It changes the formulas to text",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Sorting Total from largest to smallest is:",
        type: "multiple_choice",
        points: 1,
        explanation: "largest first is descending",
        answers: [
          {
            text: "Descending",
            isCorrect: true,
          },
          {
            text: "Ascending",
            isCorrect: false,
          },
          {
            text: "Filtering",
            isCorrect: false,
          },
          {
            text: "Grouping",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A filter shows only Hilltop orders. What does =SUM(G2:G11) return?",
        type: "multiple_choice",
        points: 1,
        explanation: "SUM includes hidden rows",
        answers: [
          {
            text: "Only Hilltop's sales",
            isCorrect: false,
          },
          {
            text: "Zero",
            isCorrect: false,
          },
          {
            text: "An error",
            isCorrect: false,
          },
          {
            text: "The total for all orders, including hidden rows",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What does the 9 in =SUBTOTAL(9,G2:G11) mean?",
        type: "multiple_choice",
        points: 1,
        explanation: "9 = SUM of visible rows",
        answers: [
          {
            text: "Count nine rows",
            isCorrect: false,
          },
          {
            text: "Use SUM on the visible rows",
            isCorrect: true,
          },
          {
            text: "Round to nine decimals",
            isCorrect: false,
          },
          {
            text: "Show the ninth row",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which chart title is most useful in a report?",
        type: "multiple_choice",
        points: 1,
        explanation: "the title states the finding",
        answers: [
          {
            text: "\"Hilltop had the highest sales\"",
            isCorrect: true,
          },
          {
            text: "\"Chart 1\"",
            isCorrect: false,
          },
          {
            text: "\"Sales\"",
            isCorrect: false,
          },
          {
            text: "\"Column chart\"",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 4,
    moduleTitle: "Excel Data Cleaning and Advanced Analysis",
    moduleDescription: "Learners fix the 14 problems they logged in Lesson 2.4, then learn the functions analysts use every day: text and date functions, IF, COUNTIFS, SUMIFS, XLOOKUP and PivotTables. By the end of the week they can turn a messy list into a clean, linked, summarised workbook. All figures in this module were checked by recalculating them in a separate program.",
    lessons: [
      {
        title: "Cleaning data: duplicates, blanks and extra spaces",
        order: 1,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=ADArCWLz55Y",
        content: "## Lesson introduction\n\n- **What you will study:** a safe cleaning routine: keep the original, turn the data into a Table, remove duplicates, find and replace errors, handle blanks and impossible values, and record every change.\n- **Why it matters:** in Lesson 2.4 you found 14 problems in eight customer records. Real lists have thousands of rows, so you need tools, not just eyes.\n- **After this lesson you can:** clean a dataset in Excel without losing the original, and explain every change you made.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nCleaning data is like washing vegetables before cooking. You keep the good parts, remove the bad parts, and you never throw away the shopping bag until you are sure the meal is right.\n\nThe golden rule: **never clean your only copy.** Keep the raw data untouched on one sheet and clean a copy on another. If you make a mistake, you can always start again.\n\nThe second rule: **write down what you change.** A short change log lets anyone check your work later.\n\n## Learning objectives\n\n1. Keep a raw copy and clean a duplicate sheet.\n2. Convert a range into an Excel Table.\n3. Remove duplicate records using the right columns.\n4. Use Find and Replace safely with \"Match entire cell contents\".\n5. Find blanks with a filter and decide how to handle them.\n\n## Main teaching content\n\n**1. The cleaning routine**\n\n1. Copy the raw data to a new sheet. Never edit the raw sheet.\n2. Convert the copy to a Table.\n3. Remove duplicates.\n4. Fix wrong and inconsistent values.\n5. Handle blanks and impossible values.\n6. Record every change in a change log.\n7. Check the row count and totals before and after.\n\n**2. Excel Tables**\n\n- **What it means:** a Table is a range Excel treats as one dataset, with a name, banded rows and filter buttons.\n- **Why it is useful:** formulas copy down automatically, new rows join the Table, and PivotTables and charts update when it grows.\n- **Everyday example:** a labelled storage box: everything for one purpose kept together.\n- **Business example:** a sales Table that grows every day while the monthly PivotTable keeps up.\n\n**3. Duplicates: choose the columns that identify a person**\n\nIn the customer list, C001 and C004 are the same person with different IDs. If Excel compares *every* column, it sees two different rows, because the IDs differ. Compare only the columns that identify the person: FullName, DateOfBirth, Phone and Email.\n\n**4. Find and Replace safely**\n\nFind and Replace changes every match at once. Turn on **Match entire cell contents**, so replacing \"Male\" with \"M\" does not also change \"Female\" into \"FeM\".\n\n**5. Blanks and impossible values**\n\nDo not invent data. For a missing phone number, leave the cell blank; never type \"none\" or \"N/A\", which turn a blank into a fake value. For an impossible value such as a birth date in the future, clear it and note it in the change log so someone can confirm it with the customer.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Raw data | Data exactly as received, before changes | The original, untouched | The shopping before washing | The customer export from the till |\n| Excel Table | A named range Excel manages as one dataset | A smart, labelled list | A labelled storage box | The Customers Table |\n| Duplicate | A record that repeats another | The same thing twice | Saving a contact twice | One customer with two IDs |\n| Find and Replace | A tool that changes every match at once | Search and swap | Correcting a name in every document | Hiltop → Hilltop in 3,000 rows |\n| Change log | A record of every cleaning change | A diary of fixes | Notes on a recipe you changed | \"C004 removed: duplicate of C001\" |\n\n## Step-by-step demonstration: cleaning the customer records, part 1\n\n**Set up**\n\n1. Create a new workbook called **Sunrise Mart customers**. Rename Sheet1 to **Raw**.\n2. Enter the eight customer records from Lesson 2.2 exactly as printed, mistakes included, in A1:I9. Type phone numbers with an apostrophe so they stay text.\n3. Right-click the **Raw** tab and choose **Duplicate**. Rename the copy **Clean**. All further steps happen on **Clean**.\n4. Add a third sheet called **Change log** with headings: Row, Column, Old value, New value, Reason.\n\n**Make it a Table**\n\n5. On **Clean**, click any cell in the data. Click **Insert**, then **Table**. Tick **My table has headers** and click **OK**. Banded rows and filter arrows appear.\n6. On the **Table Design** tab (or **Table** tab), type **Customers** in the **Table Name** box.\n\n**Remove the duplicate**\n\n7. Click inside the Table. Click **Data**, then **Remove Duplicates**.\n8. Click **Unselect All**, then tick only **FullName**, **DateOfBirth**, **Phone** and **Email**. Click **OK**.\n9. Excel reports **1 duplicate value found and removed; 7 unique values remain**. Row C004 has gone; C001 stays because it came first.\n10. In the change log, record: C004 | All | (whole row) | removed | Duplicate of C001.\n\n**Find and Replace**\n\n11. Press **Ctrl + H** (Cmd + H on some Macs; or **Home**, **Find & Select**, **Replace**).\n12. Find **Hiltop**, replace with **Hilltop**. Tick **Match entire cell contents**. Click **Replace All**. One replacement is made (C006).\n13. Find **Male**, replace with **M**, with **Match entire cell contents** ticked. One replacement (C002).\n14. Find **app**, replace with **App**, with **Match entire cell contents** ticked. Excel ignores capital letters when searching, so it also \"replaces\" C001's App with App, which does no harm.\n15. Log each change.\n\n**Blanks**\n\n16. Click the filter arrow on **Phone**. Untick **Select All**, tick **(Blanks)**, and click **OK**. One row shows: C003. Clear the filter.\n17. Repeat for **DateOfBirth** (C007) and **Email** (C007). Leave all three blank. Log them as \"Missing; to collect at next visit\".\n\n**Impossible value**\n\n18. Click C005's DateOfBirth (2030-02-14). Press **Delete**. Log it: Old value 2030-02-14, New value blank, Reason \"Future date; confirm with customer\".\n\n**Check**\n\n19. The Table has **7 rows** (8 minus the duplicate). Your change log has 8 entries: 1 duplicate, 3 replacements, 3 blanks and 1 impossible date. The other 6 problems are fixed with formulas in Lesson 4.2.\n\n## Practical exercise\n\n- **Task:** clean a short product list.\n- **Data:** type this into a new sheet called **Products raw**:\n\n| ProductID | Product | Category | UnitPrice |\n| --- | --- | --- | --- |\n| P01 | Bottled water | Drinks | 350 |\n| P02 | Bread | groceries | 900 |\n| P03 | Crisps | Snacks | 500 |\n| P04 | Bottled water | Drinks | 350 |\n| P05 | Rice 5kg | Groceries |  |\n| P06 | Juice | Drink | 600 |\n\n- **Steps:** duplicate the sheet, make it a Table, remove the duplicate product (compare Product, Category and UnitPrice), fix the two category errors with Find and Replace, find the blank price with a filter, and keep a change log.\n- **Expected output:** 5 products remaining, categories exactly \"Drinks\", \"Groceries\" or \"Snacks\", one blank price logged, and 4 change-log entries.\n- **Submit:** a screenshot of the cleaned Table and the change log.\n\n## Knowledge check\n\n1. What is the first step before cleaning any data?\n   - A) Delete the blanks\n   - B) Sort the data\n   - C) Keep an untouched raw copy and clean a duplicate\n   - D) Make a chart\n2. C001 and C004 are the same person with different IDs. Which columns should Remove Duplicates compare?\n   - A) FullName, DateOfBirth, Phone and Email\n   - B) All columns including CustomerID\n   - C) CustomerID only\n   - D) Channel only\n3. Why tick \"Match entire cell contents\" when replacing \"Male\" with \"M\"?\n   - A) It is faster\n   - B) It makes the text bold\n   - C) It deletes blanks\n   - D) So \"Female\" does not become \"FeM\"\n4. A customer's phone number is missing. What should you do?\n   - A) Type \"N/A\"\n   - B) Leave it blank and note it in the change log\n   - C) Copy another customer's number\n   - D) Delete the customer\n5. What is a change log for?\n   - A) Recording every cleaning change so others can check it\n   - B) Storing passwords\n   - C) Making charts\n   - D) Counting rows\n\n## Lesson summary\n\n1. Never clean your only copy.\n2. Tables keep data together and make formulas, PivotTables and charts easier.\n3. Remove duplicates by comparing the columns that identify a record, not its ID.\n4. Use Find and Replace with \"Match entire cell contents\".\n5. Do not invent data; leave blanks blank and log what you changed.\n\n## Completion check\n\n- [ ] My workbook has Raw, Clean and Change log sheets.\n- [ ] The Clean Table has 7 rows.\n- [ ] My change log has 8 entries.\n- [ ] I cleaned the product list exercise.",
      },
      {
        title: "Text and date functions",
        order: 2,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=4mwaiA4rL4o",
        content: "## Lesson introduction\n\n- **What you will study:** functions that tidy text (TRIM, PROPER, SUBSTITUTE, LEFT, FIND, LEN) and handle dates (DATE, TEXT, DATEDIF), plus how to turn formula results into fixed values.\n- **Why it matters:** retyping 3,000 names by hand is slow and error-prone. One formula fixes them all.\n- **After this lesson you can:** fix the remaining six customer problems with formulas, calculate ages and signup months, and flag invalid emails.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nText functions are like a tailor for words: they trim off extra bits, fix capital letters and swap one character for another.\n\nDate functions treat dates as real dates, so you can build a date from its parts, show it in any format, or work out how many years lie between two dates.\n\nThe method is always the same: write the formula in a **helper column** next to the data, check the results, then paste the results back as fixed values.\n\n## Learning objectives\n\n1. Clean names with TRIM and PROPER.\n2. Replace characters with SUBSTITUTE.\n3. Extract part of a text value with LEFT and FIND.\n4. Build and format dates with DATE and TEXT, and calculate age with DATEDIF.\n5. Convert formula results into values with Paste Values.\n\n## Main teaching content\n\n**1. Text functions**\n\n| Function | What it does | Example | Result |\n| --- | --- | --- | --- |\n| TRIM | Removes spaces at the start and end, and double spaces inside | `=TRIM(\"  Fatima Bello  \")` | Fatima Bello |\n| PROPER | Capital first letter of each word | `=PROPER(\"john kamau\")` | John Kamau |\n| UPPER / LOWER | All capitals / all small letters | `=UPPER(\"riverside\")` | RIVERSIDE |\n| SUBSTITUTE | Replaces one piece of text with another | `=SUBSTITUTE(\"0700-555-0106\",\"-\",\" \")` | 0700 555 0106 |\n| LEN | Counts characters | `=LEN(\"0700 555 0101\")` | 13 |\n| FIND | Finds the position of a character | `=FIND(\" \",\"Amara Mensah\")` | 6 |\n| LEFT | Takes characters from the left | `=LEFT(\"Amara Mensah\",5)` | Amara |\n\nFunctions can be combined. `=PROPER(TRIM(B2))` trims first, then fixes capitals. The first name is `=LEFT(B2,FIND(\" \",B2)-1)`: find the space, then take everything before it.\n\n**2. Date functions**\n\nExcel stores a date as a number (the count of days since 1 January 1900) and only displays it as a date. That is why you can subtract one date from another.\n\n| Function | What it does | Example | Result |\n| --- | --- | --- | --- |\n| DATE | Builds a date from year, month, day | `=DATE(1995,7,12)` | 1995-07-12 |\n| TEXT | Shows a value in a chosen format, as text | `=TEXT(H2,\"yyyy-mm\")` | 2026-01 |\n| YEAR / MONTH | Takes the year or month from a date | `=YEAR(H2)` | 2026 |\n| DATEDIF | Whole years, months or days between two dates | `=DATEDIF(D2,DATE(2026,3,31),\"Y\")` | 27 for C001 |\n\n**Watch out:** DATEDIF on a blank date treats the blank as the year 1900 and returns a huge age. Always guard it: `=IF(D2=\"\",\"\",DATEDIF(D2,DATE(2026,3,31),\"Y\"))`.\n\n**3. Helper columns and Paste Values**\n\n1. Write the formula in an empty column next to the data.\n2. Check every result.\n3. Copy the helper column, then right-click the original column and choose **Paste Special**, **Paste Values** (or **Paste Values** from the paste options).\n4. Delete the helper column.\n\n**4. Formulas inside a Table**\n\nWhen you click cells inside a Table, Excel writes column names instead of addresses, for example `=PROPER(TRIM([@FullName]))`. It means \"this row's FullName\". The result is the same, and the formula fills the whole column automatically.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Text function | A function that changes or measures text | A word tool | Correcting capitals in a letter | Fixing customer names |\n| Nested function | A function inside another function | Two tools in one step | Peel then slice | `=PROPER(TRIM(B2))` |\n| Helper column | A temporary column used to build results | A scratch area | Rough work in the margin | A column of cleaned names |\n| Paste Values | Pasting results without the formulas behind them | Keep the answer, drop the working | Writing the final answer neatly | Fixing cleaned names in place |\n| Date serial number | Excel's internal count of days for a date | How Excel stores dates | Counting days on a calendar | 2026-03-31 is stored as a number |\n\n## Step-by-step demonstration: cleaning the customer records, part 2\n\nOpen **Sunrise Mart customers**, **Clean** sheet. Seven customers remain, in rows 2–8.\n\n**Names (fixes C002 and C008)**\n\n1. In the first empty column to the right of the Table, type the heading **NameFixed**. The Table grows to include it.\n2. In the first row of NameFixed, type `=PROPER(TRIM([@FullName]))` (or click the FullName cell instead of typing its name). The formula fills the whole column.\n3. **Check:** \"john kamau\" became **John Kamau**; \"  Fatima Bello  \" became **Fatima Bello**.\n4. Select the NameFixed results, copy them, click the first FullName cell, and choose **Paste Values**. Delete the NameFixed column.\n\n**City (fixes C002)**\n\n5. Add a helper column **CityFixed** with `=PROPER([@City])`. Check that \"central\" became **Central**. Paste Values over City and delete the helper.\n\n**Phone (fixes C006)**\n\n6. Add **PhoneFixed** with `=SUBSTITUTE([@Phone],\"-\",\" \")`. C006 becomes **0700 555 0106**.\n7. Add **PhoneLength** with `=LEN([@PhoneFixed])`. Every filled phone shows **13**. A different number would reveal a typing error.\n8. Paste PhoneFixed values over Phone and delete both helpers.\n\n**Date of birth (fixes C002)**\n\n9. C002's date was typed as 12/07/1995, which could mean 12 July or 7 December. Suppose the customer confirms 12 July 1995. Click C002's DateOfBirth and type `=DATE(1995,7,12)`. Then copy and **Paste Values** onto the same cell so it holds a plain date.\n10. Format the DateOfBirth and SignupDate columns as **yyyy-mm-dd** (Lesson 3.2).\n\n**Email check (flags C002 and C007)**\n\n11. Add a column **EmailCheck** with `=IF([@Email]=\"\",\"Missing\",IF(ISNUMBER(SEARCH(\"@*.*\",[@Email])),\"OK\",\"Check\"))`. SEARCH looks for an @ followed later by a dot.\n12. **Check:** C002 shows **Check** (\"john.kamau@example\" has no dot after the @); C007 shows **Missing**; the rest show **OK**. Keep this column; it tells the team who to contact.\n\n**New information: age and signup month**\n\n13. Add **Age** with `=IF([@DateOfBirth]=\"\",\"\",DATEDIF([@DateOfBirth],DATE(2026,3,31),\"Y\"))`. This gives each customer's age on 31 March 2026.\n14. **Check:** C001 **27**, C002 **30**, C003 **24**, C006 **35**, C008 **32**; C005 and C007 are blank.\n15. Below the Table, type **Average age** and `=AVERAGE(Customers[Age])`. Result: **29.6**. AVERAGE ignores the blank cells, so this is the average of the five known ages.\n16. Add **SignupMonth** with `=TEXT([@SignupDate],\"yyyy-mm\")`. Every row shows **2026-01**.\n17. Log the six fixes in your change log. Together with the eight from Lesson 4.1, all 14 problems from Lesson 2.4 are now dealt with: 13 fixed and C002's email flagged for follow-up.\n\n## Practical exercise\n\n- **Task:** clean a list of staff names and start dates.\n- **Data:** in a new sheet, type: \"  ADA OBI \", 2024-02-01; \"musa ali\", 2025-06-15; \"Grace  Mwangi\", 2023-11-20 (note the double space).\n- **Steps:**\n  1. Clean the names with `=PROPER(TRIM(A2))`.\n  2. Extract each first name with LEFT and FIND.\n  3. Calculate whole years of service on 2026-03-31 with DATEDIF.\n  4. Show each start month with `=TEXT(B2,\"yyyy-mm\")`.\n- **Expected output:** Ada Obi (Ada, 2 years, 2024-02); Musa Ali (Musa, 0 years, 2025-06); Grace Mwangi (Grace, 2 years, 2023-11).\n- **Submit:** a screenshot showing the formulas in the formula bar and the results.\n\n## Knowledge check\n\n1. What does `=TRIM(\"  Ada Obi  \")` return?\n   - A) \"Ada Obi\"\n   - B) \"  Ada Obi\"\n   - C) \"ADA OBI\"\n   - D) \"AdaObi\"\n2. Which formula turns \"john kamau\" into \"John Kamau\"?\n   - A) `=UPPER(B2)`\n   - B) `=TRIM(B2)`\n   - C) `=LEN(B2)`\n   - D) `=PROPER(B2)`\n3. Why should you guard DATEDIF with IF when a date might be blank?\n   - A) DATEDIF is slow\n   - B) A blank is treated as 1900 and gives a huge, wrong age\n   - C) Blanks become text\n   - D) It is not necessary\n4. What does Paste Values do?\n   - A) Pastes the formulas only\n   - B) Pastes the formatting only\n   - C) Pastes the results without the formulas behind them\n   - D) Deletes the column\n5. What does `=SUBSTITUTE(\"0700-555-0106\",\"-\",\" \")` return?\n   - A) 07005550106\n   - B) 0700-555-0106\n   - C) 0700 555-0106\n   - D) 0700 555 0106\n\n## Lesson summary\n\n1. TRIM and PROPER fix spacing and capitals; SUBSTITUTE swaps characters.\n2. LEFT, FIND and LEN pull out and measure parts of text.\n3. Excel stores dates as numbers, so DATE, TEXT and DATEDIF can build, format and compare them.\n4. Guard formulas against blanks with IF.\n5. Work in helper columns, check, then Paste Values.\n\n## Completion check\n\n- [ ] All seven names, cities and phones are clean.\n- [ ] C002's date of birth is a real date, 1995-07-12.\n- [ ] My EmailCheck column flags C002 and C007.\n- [ ] My Age column shows an average of 29.6.\n- [ ] I finished the staff names exercise.",
      },
      {
        title: "Logical and lookup functions",
        order: 3,
        durationMinutes: 100,
        videoUrl: "https://www.youtube.com/watch?v=y5H6Yi3V4cw",
        content: "## Lesson introduction\n\n- **What you will study:** IF for decisions, COUNTIFS, SUMIFS and AVERAGEIFS for totals that meet conditions, XLOOKUP for joining two lists, and IFERROR for handling errors.\n- **Why it matters:** managers rarely ask for one total. They ask \"How much did Hilltop sell in Drinks?\" These functions answer that in one cell.\n- **After this lesson you can:** label orders, calculate totals by branch and category, and bring customer names from one sheet into another.\n- **Estimated time:** 100 minutes.\n\n## The topic in simple English\n\nIF is a fork in the road: if something is true, go one way; if not, go the other.\n\nCOUNTIFS, SUMIFS and AVERAGEIFS are like asking a shop assistant: \"Count only the red shirts, size medium.\" They look at every row and only use the rows that match all your conditions.\n\nXLOOKUP is like looking up a name in a phone book. You know the ID; it finds the matching row and hands you the name.\n\n## Learning objectives\n\n1. Write an IF formula that labels each row.\n2. Use COUNTIFS, SUMIFS and AVERAGEIFS with one or more conditions.\n3. Use XLOOKUP to bring data from another sheet.\n4. Use IFERROR to show a clear message instead of an error.\n5. Build a small summary table from formulas.\n\n## Main teaching content\n\n**1. IF**\n\n`=IF(test, value_if_true, value_if_false)`\n\n- **What it means:** Excel checks the test, then shows one of two results.\n- **Everyday example:** if it is raining, take an umbrella; otherwise, do not.\n- **Business example:** `=IF(H2>=2500,\"Large\",\"Small\")` labels each order by size.\n\nTests use comparison signs: = equal, <> not equal, > greater than, < less than, >= at least, <= at most. Text in a test goes in quotes: `=IF(C2=\"Hilltop\",\"Yes\",\"No\")`.\n\n**2. Conditional totals**\n\n| Function | Pattern | Example | Meaning |\n| --- | --- | --- | --- |\n| COUNTIFS | `=COUNTIFS(range1, criteria1, ...)` | `=COUNTIFS(C2:C11,\"Central\")` | How many Central orders? |\n| SUMIFS | `=SUMIFS(sum_range, range1, criteria1, ...)` | `=SUMIFS(H2:H11,C2:C11,\"Hilltop\")` | Total Hilltop sales |\n| AVERAGEIFS | `=AVERAGEIFS(avg_range, range1, criteria1, ...)` | `=AVERAGEIFS(H2:H11,C2:C11,\"Central\")` | Average Central order |\n\nEach extra pair adds a condition, and a row must match all of them. `=SUMIFS(H2:H11,C2:C11,\"Hilltop\",E2:E11,\"Drinks\")` means \"total of Hilltop rows that are also Drinks\".\n\nFor numbers, put the comparison in quotes: `=COUNTIFS(H2:H11,\">=2500\")`.\n\nNote that in SUMIFS and AVERAGEIFS the range you add up comes **first**. This is the most common mistake.\n\n**3. XLOOKUP**\n\n`=XLOOKUP(lookup_value, lookup_range, return_range, if_not_found)`\n\n- **What it means:** find the lookup value in one column and return the value from the same row of another column.\n- **Business example:** the Sales sheet has CustomerID C003; XLOOKUP finds C003 on the Customers sheet and returns \"Thandi Nkosi\".\n- **Older Excel:** XLOOKUP is in Excel for the web and Microsoft 365. In older versions use `=VLOOKUP(D2,Customers!A:B,2,FALSE)`. FALSE means \"exact match only\"; always include it.\n\n**4. IFERROR**\n\n`=IFERROR(formula, value_if_error)` shows a friendly value when a formula fails, for example `=IFERROR(VLOOKUP(D2,Customers!A:B,2,FALSE),\"Not found\")`.\n\nUse it carefully. An error is often a useful warning that data is missing. Show a clear message such as \"Not found\"; never hide errors behind a 0 that looks like a real answer.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Logical test | A comparison that is either TRUE or FALSE | A yes-or-no question | Is it raining? | Is the order at least 2,500? |\n| Criteria | The condition a row must meet | The rule for choosing rows | Only red shirts | Branch = \"Hilltop\" |\n| Conditional total | A sum, count or average of matching rows only | A total with a filter built in | Money spent on food only | Hilltop Drinks sales |\n| Lookup | Finding a value in a list using a key | Looking something up | Finding a number in a phone book | A customer name from an ID |\n| Error value | A code Excel shows when a formula fails | Excel saying \"I can't\" | A wrong number dialled | #N/A when an ID is missing |\n\n## Step-by-step demonstration: Sunrise Mart summary table\n\n**Prepare the workbook**\n\n1. Open **Sunrise Mart analysis**. The **Sales** sheet holds the 10 orders in A1:H11: OrderID, Date, Branch, CustomerID, Category, Quantity, UnitPrice, Total.\n2. Open **Sunrise Mart customers**, copy the cleaned Customers Table (7 customers), and paste it into a new sheet called **Customers** in Sunrise Mart analysis, starting at A1. Column A is CustomerID and column B is FullName.\n\n**IF: label each order**\n\n3. On **Sales**, type **Size** in I1. In I2 type `=IF(H2>=2500,\"Large\",\"Small\")` and copy down to I11.\n4. **Check:** orders 1003, 1006, 1007, 1008 and 1009 are **Large**; the other five are **Small**.\n\n**XLOOKUP: bring in customer names**\n\n5. Type **CustomerName** in J1. In J2 type `=XLOOKUP(D2,Customers!A:A,Customers!B:B,\"Not found\")` and copy down.\n6. **Check:** J2 shows **Amara Mensah** (C001), J4 shows **Chinedu Eze** (C005) and J8 shows **Wanjiru Otieno** (C006).\n7. Test the safety net: type C099 in D2. J2 shows **Not found**. Press **Ctrl + Z** to undo.\n\n**Branch summary**\n\n8. In L1:O1 type the headings Branch, Orders, Sales, Average order. In L2:L4 type Central, Hilltop and Riverside.\n9. In M2 type `=COUNTIFS($C$2:$C$11,L2)`. Copy down to M4.\n10. In N2 type `=SUMIFS($H$2:$H$11,$C$2:$C$11,L2)`. Copy down.\n11. In O2 type `=AVERAGEIFS($H$2:$H$11,$C$2:$C$11,L2)`. Copy down and format with no decimals.\n12. In L5 type **Total**; in M5 and N5 use SUM.\n\nThe dollar signs lock the data ranges (Lesson 3.3) while L2 moves down to the next branch name.\n\n13. **Check your summary:**\n\n| Branch | Orders | Sales | Average order |\n| --- | --- | --- | --- |\n| Central | 4 | 7,100 | 1,775 |\n| Hilltop | 3 | 9,900 | 3,300 |\n| Riverside | 3 | 4,550 | 1,517 |\n| Total | 10 | 21,550 |  |\n\n**Two conditions**\n\n14. In L7 type **Hilltop Drinks** and in N7: `=SUMIFS(H2:H11,C2:C11,\"Hilltop\",E2:E11,\"Drinks\")`. Result: **4,900**.\n15. In L8 type **Large orders** and in M8: `=COUNTIFS(H2:H11,\">=2500\")`. Result: **5**, matching the Size column.\n\n**Customer spend**\n\n16. On **Customers**, add a column **TotalSpend** with `=SUMIFS(Sales!H:H,Sales!D:D,[@CustomerID])`.\n17. **Check:** C001 3,900, C002 1,700, C003 4,900, C005 2,500, C006 5,000, C007 2,500, C008 1,050. The total is 21,550, the same as the Sales sheet, so no sale is missing. The top customer is **C006, Wanjiru Otieno**.\n\n## Practical exercise\n\n- **Task:** answer four manager questions with formulas on the Sales sheet.\n- **Questions:**\n  1. What were total Drinks sales? (SUMIFS)\n  2. How many Riverside orders were Drinks? (COUNTIFS, two conditions)\n  3. What was the average Groceries order? (AVERAGEIFS)\n  4. What were total sales on 4 March 2026? (SUMIFS on the Date column with the criteria `DATE(2026,3,4)`)\n- **Expected output:** 8,050; 1; 3,333.33; 11,000.\n- **Submit:** a screenshot with each formula visible, and one sentence per answer for the manager.\n\n## Knowledge check\n\n1. What does `=IF(H2>=2500,\"Large\",\"Small\")` show when H2 is 2,500?\n   - A) Small\n   - B) Large\n   - C) An error\n   - D) 2500\n2. In SUMIFS, which argument comes first?\n   - A) The criteria\n   - B) The criteria range\n   - C) The range to add up\n   - D) The sheet name\n3. What does `=COUNTIFS(C2:C11,\"Central\")` return for the Sunrise Mart data?\n   - A) 4\n   - B) 3\n   - C) 7,100\n   - D) 10\n4. What does XLOOKUP do?\n   - A) Sorts a list\n   - B) Removes duplicates\n   - C) Adds up a column\n   - D) Finds a value in one column and returns the matching value from another\n5. Why should you avoid using IFERROR to show 0 when a lookup fails?\n   - A) It is slower\n   - B) A 0 looks like a real answer and hides missing data\n   - C) IFERROR only works with text\n   - D) It deletes the formula\n\n## Lesson summary\n\n1. IF chooses between two results based on a test.\n2. COUNTIFS, SUMIFS and AVERAGEIFS use only the rows that meet every condition.\n3. In SUMIFS and AVERAGEIFS, the range to calculate comes first.\n4. XLOOKUP joins two lists using a shared key such as CustomerID.\n5. Check summary totals against the grand total to make sure nothing is missing.\n\n## Completion check\n\n- [ ] My Size and CustomerName columns are correct.\n- [ ] My branch summary matches the check table.\n- [ ] My Customers sheet shows total spend adding up to 21,550.\n- [ ] I answered the four manager questions.",
      },
      {
        title: "PivotTables",
        order: 4,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=dvbLrwD2SpA",
        content: "## Lesson introduction\n\n- **What you will study:** how to build a PivotTable, arrange rows, columns and values, change the calculation, show percentages, refresh after new data, and add a PivotChart and slicer.\n- **Why it matters:** the branch summary you built with formulas in Lesson 4.3 took 15 minutes. A PivotTable builds it in under a minute, and you can rearrange it with a drag.\n- **After this lesson you can:** summarise any clean Table by any column in a few clicks.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nA PivotTable is a summary machine. You give it a list of rows, then tell it: \"Put branches down the side, categories across the top, and add up the sales in the middle.\" It does the counting and adding for you.\n\n\"Pivot\" means turn. You can turn the summary around at any time, for example by putting categories down the side instead, without writing a single formula. The original data never changes.\n\n## Learning objectives\n\n1. Create a PivotTable from an Excel Table.\n2. Place fields in Rows, Columns and Values.\n3. Change a value from Sum to Count or Average, and show it as a percentage of the total.\n4. Refresh a PivotTable after the data changes.\n5. Add a PivotChart and a slicer, or a manual chart where these are not available.\n\n## Main teaching content\n\n**1. The four areas**\n\n| Area | What it does | Sunrise Mart example |\n| --- | --- | --- |\n| Rows | One row for each different value | One row per branch |\n| Columns | One column for each different value | One column per category |\n| Values | The numbers to calculate | Sum of Total |\n| Filters | Show only some of the data | Only 4 March |\n\n**2. Sum, Count and Average**\n\nExcel adds up numbers by default. If you drag OrderID into Values, Excel adds up the order numbers (1001 + 1002 + ...) and shows 10,055, which means nothing. Change it to **Count** to get the number of orders: 10. Always ask: \"Does this calculation make sense?\"\n\n**3. Show Values As**\n\nThe same numbers can be shown as **% of Grand Total**, which tells you each branch's share of all sales.\n\n**4. Refresh**\n\nA PivotTable is a snapshot. When the data changes, it does not update until you click **Refresh**. If the source is an Excel Table, new rows are included automatically when you refresh. If the source is a plain range, new rows below it are missed. This is why you build PivotTables from Tables.\n\n**5. PivotCharts and slicers**\n\n- A **PivotChart** is a chart linked to a PivotTable; it changes when the PivotTable changes.\n- A **slicer** is a set of buttons that filters the PivotTable with one click, for example one button per branch.\n- Both are fully available in desktop Excel. Excel for the web has been adding them; if your version does not show them, use the Filters area instead of a slicer, and build an ordinary chart from the PivotTable values (Lesson 3.4).\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| PivotTable | An interactive summary of a table | A summary machine | A class register totalled by month | Sales by branch and category |\n| Field | A column of the source data used in a PivotTable | A column you can drag | A heading on a form | Branch, Category, Total |\n| Value field setting | The calculation used on a value field | Sum, count or average | Adding receipts or counting them | Count of OrderID |\n| Refresh | Recalculating a PivotTable from its source | Update the summary | Reprinting a timetable after a change | Adding today's sales |\n| Slicer | Buttons that filter a PivotTable | One-click filter | Channel buttons on a remote | A button per branch |\n\n## Step-by-step demonstration: Sunrise Mart PivotTable\n\n**Make the source a Table**\n\n1. On the **Sales** sheet, click any cell in A1:J11. Click **Insert**, **Table**, tick **My table has headers**, click **OK**. Name the Table **SalesData**.\n\n**Create the PivotTable**\n\n2. With a cell in SalesData selected, click **Insert**, then **PivotTable**. Choose **From Table/Range** if asked. Check that the source says **SalesData**, choose **New worksheet**, and click **OK**.\n3. Rename the new sheet **Pivot**. The **PivotTable Fields** pane opens on the right.\n\n**Sales by branch**\n\n4. Drag **Branch** into **Rows** and **Total** into **Values**. Excel shows **Sum of Total**.\n5. **Check:** Central 7,100; Hilltop 9,900; Riverside 4,550; Grand Total 21,550. These match your formulas from Lesson 4.3.\n\n**Add categories across the top**\n\n6. Drag **Category** into **Columns**.\n7. **Check:**\n\n| Sum of Total | Drinks | Groceries | Snacks | Grand Total |\n| --- | --- | --- | --- | --- |\n| Central | 2,100 | 2,500 | 2,500 | 7,100 |\n| Hilltop | 4,900 | 5,000 |  | 9,900 |\n| Riverside | 1,050 | 2,500 | 1,000 | 4,550 |\n| Grand Total | 8,050 | 10,000 | 3,500 | 21,550 |\n\nThe blank for Hilltop Snacks means Hilltop sold no snacks in these three days, which is worth asking about.\n\n**Show shares**\n\n8. Drag **Category** back out of Columns. In **Values**, click **Sum of Total**, choose **Value Field Settings**, open **Show Values As**, choose **% of Grand Total**, and click **OK**.\n9. **Check:** Central 32.9%, Hilltop 45.9%, Riverside 21.1%. These add to 99.9% only because of rounding to one decimal.\n10. Set it back to **No Calculation**.\n\n**Count orders**\n\n11. Drag **OrderID** into **Values**. Excel shows **Sum of OrderID** = 10,055 in total. That is meaningless.\n12. Click **Sum of OrderID**, choose **Value Field Settings**, choose **Count**, and click **OK**. Now the counts read Central 4, Hilltop 3, Riverside 3, total 10.\n\n**Refresh**\n\n13. On **Sales**, type a new order in row 12: 1011, 2026-03-04, Hilltop, C006, Snacks, 3, 500. The Table grows and the Total formula fills in (1,500).\n14. Go to **Pivot**. Nothing has changed yet. Right-click the PivotTable and choose **Refresh** (or **Data**, **Refresh All**). Hilltop becomes 11,400 and the count becomes 11.\n15. Delete row 12 on Sales and refresh again, so your workbook matches the rest of the course.\n\n**PivotChart and slicer**\n\n16. Click inside the PivotTable. In desktop Excel, click **PivotTable Analyze**, then **PivotChart**, and choose **Clustered Column**. Click **Insert Slicer**, tick **Category** and click **OK**. Clicking **Drinks** filters both the PivotTable and the chart.\n17. In Excel for the web, look for **Insert**, **Chart** and **Insert**, **Slicer** with the PivotTable selected. If they are not there, drag **Category** into **Filters** and use its drop-down instead, and build a normal column chart from the PivotTable values.\n\n## Practical exercise\n\n- **Task:** build two more PivotTables from SalesData on new sheets.\n- **PivotTable 1:** Rows = Date, Values = Sum of Total.\n- **PivotTable 2:** Rows = Category, Values = Count of OrderID and Sum of Quantity.\n- **Expected output:**\n  - PivotTable 1: 2026-03-02 4,900; 2026-03-03 5,650; 2026-03-04 11,000; total 21,550. Newer Excel may group dates by month; if so, click the + to expand, or right-click and choose **Ungroup**.\n  - PivotTable 2: Drinks 5 orders, 23 units; Groceries 3 orders, 4 units; Snacks 2 orders, 7 units; total 10 orders, 34 units.\n- **Submit:** screenshots of both PivotTables and two sentences: which day was busiest, and which category sells the most units.\n\n## Knowledge check\n\n1. Which area of a PivotTable gives one row for each branch?\n   - A) Values\n   - B) Filters\n   - C) Columns\n   - D) Rows\n2. You drag OrderID into Values and get 10,055. What should you do?\n   - A) Delete the PivotTable\n   - B) Change the calculation from Sum to Count\n   - C) Sort the data\n   - D) Nothing; it is correct\n3. You add new rows to the source data. What must you do to see them in the PivotTable?\n   - A) Rebuild it\n   - B) Save the file\n   - C) Refresh it\n   - D) Nothing; it updates instantly\n4. Why build a PivotTable from an Excel Table rather than a plain range?\n   - A) New rows are included when you refresh\n   - B) It makes the numbers bigger\n   - C) Plain ranges cannot be summed\n   - D) Tables are coloured\n5. What does \"% of Grand Total\" show for Hilltop?\n   - A) Its number of orders\n   - B) Its average order\n   - C) Its share of all sales, 45.9%\n   - D) Its growth since last week\n\n## Lesson summary\n\n1. A PivotTable summarises a Table by dragging fields into Rows, Columns, Values and Filters.\n2. Check that every calculation makes sense; change Sum to Count where needed.\n3. Show Values As turns totals into shares.\n4. PivotTables do not update until you Refresh; build them from Tables.\n5. PivotCharts and slicers make summaries visual and interactive; use filters and normal charts where they are not available.\n\n## Completion check\n\n- [ ] My Pivot sheet shows sales by branch and category, matching the check table.\n- [ ] I changed a value to Count and to % of Grand Total.\n- [ ] I refreshed after adding a row, then removed it again.\n- [ ] I built the two exercise PivotTables.",
      },
    ],
    assignmentTitle: "Connectwave customer churn workbook",
    assignmentDescription: "Connectwave Telecom is worried that customers are leaving (\"churning\").",
    fileRequired: true,
    quizQuestions: [
      {
        text: "Before cleaning a dataset, what should you always do first?",
        type: "multiple_choice",
        points: 1,
        explanation: "Never clean the only copy",
        answers: [
          {
            text: "Sort it by date",
            isCorrect: false,
          },
          {
            text: "Keep an untouched raw copy and clean a duplicate",
            isCorrect: true,
          },
          {
            text: "Delete all blanks",
            isCorrect: false,
          },
          {
            text: "Turn it into a chart",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Two rows describe the same customer but have different CustomerIDs. Which columns should Remove Duplicates compare?",
        type: "multiple_choice",
        points: 1,
        explanation: "IDs differ, so compare identifying details",
        answers: [
          {
            text: "Every column",
            isCorrect: false,
          },
          {
            text: "CustomerID only",
            isCorrect: false,
          },
          {
            text: "SignupDate only",
            isCorrect: false,
          },
          {
            text: "The columns that identify the person, such as name, date of birth and phone",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What does =PROPER(TRIM(\"  mary  ann  \")) return?",
        type: "multiple_choice",
        points: 1,
        explanation: "TRIM removes outer and double spaces, then PROPER capitalises",
        answers: [
          {
            text: "\"Mary Ann\"",
            isCorrect: true,
          },
          {
            text: "\"MARY ANN\"",
            isCorrect: false,
          },
          {
            text: "\"mary ann\"",
            isCorrect: false,
          },
          {
            text: "\"  Mary  Ann  \"",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A date of birth cell is blank. What does =DATEDIF(D2,DATE(2026,3,31),\"Y\") return?",
        type: "multiple_choice",
        points: 1,
        explanation: "Blanks are treated as day zero in 1900; guard with IF",
        answers: [
          {
            text: "0",
            isCorrect: false,
          },
          {
            text: "A blank",
            isCorrect: false,
          },
          {
            text: "A huge, wrong age, because the blank is treated as 1900",
            isCorrect: true,
          },
          {
            text: "An error message saying \"blank\"",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which formula gives total Hilltop sales from the Sunrise Mart Sales sheet?",
        type: "multiple_choice",
        points: 1,
        explanation: "Sum range first, then criteria range and criteria",
        answers: [
          {
            text: "=SUMIFS(H2:H11,C2:C11,\"Hilltop\")",
            isCorrect: true,
          },
          {
            text: "=SUMIFS(C2:C11,H2:H11,\"Hilltop\")",
            isCorrect: false,
          },
          {
            text: "=COUNTIFS(C2:C11,\"Hilltop\")",
            isCorrect: false,
          },
          {
            text: "=SUM(C2:C11)",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does =COUNTIFS(H2:H11,\">=2500\") return for the Sunrise Mart orders?",
        type: "multiple_choice",
        points: 1,
        explanation: "Orders 1003, 1006, 1007, 1008 and 1009",
        answers: [
          {
            text: "3",
            isCorrect: false,
          },
          {
            text: "5",
            isCorrect: true,
          },
          {
            text: "10",
            isCorrect: false,
          },
          {
            text: "12,500",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Sales has a CustomerID; Customers has CustomerID and FullName. Which function brings the name into Sales?",
        type: "multiple_choice",
        points: 1,
        explanation: "XLOOKUP joins two lists on a key",
        answers: [
          {
            text: "TRIM",
            isCorrect: false,
          },
          {
            text: "SUBSTITUTE",
            isCorrect: false,
          },
          {
            text: "AVERAGEIFS",
            isCorrect: false,
          },
          {
            text: "XLOOKUP",
            isCorrect: true,
          },
        ],
      },
      {
        text: "In a PivotTable of Sunrise Mart sales, which field would you put in Columns to show one column per category?",
        type: "multiple_choice",
        points: 1,
        explanation: "Columns area, one column per category",
        answers: [
          {
            text: "Total",
            isCorrect: false,
          },
          {
            text: "OrderID",
            isCorrect: false,
          },
          {
            text: "Category",
            isCorrect: true,
          },
          {
            text: "Date",
            isCorrect: false,
          },
        ],
      },
      {
        text: "You add five new orders to a PivotTable's source Table. The PivotTable still shows the old totals. Why?",
        type: "multiple_choice",
        points: 1,
        explanation: "PivotTables update only on Refresh",
        answers: [
          {
            text: "PivotTables cannot include new rows",
            isCorrect: false,
          },
          {
            text: "The file is read-only",
            isCorrect: false,
          },
          {
            text: "The new orders are duplicates",
            isCorrect: false,
          },
          {
            text: "It has not been refreshed",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which is the safest way to handle a missing phone number during cleaning?",
        type: "multiple_choice",
        points: 1,
        explanation: "Never invent data; log the gap",
        answers: [
          {
            text: "Type \"none\"",
            isCorrect: false,
          },
          {
            text: "Leave it blank and record it in the change log",
            isCorrect: true,
          },
          {
            text: "Delete the customer",
            isCorrect: false,
          },
          {
            text: "Copy the previous row's number",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the first step before cleaning any data?",
        type: "multiple_choice",
        points: 1,
        explanation: "keep a raw copy first",
        answers: [
          {
            text: "Delete the blanks",
            isCorrect: false,
          },
          {
            text: "Sort the data",
            isCorrect: false,
          },
          {
            text: "Keep an untouched raw copy and clean a duplicate",
            isCorrect: true,
          },
          {
            text: "Make a chart",
            isCorrect: false,
          },
        ],
      },
      {
        text: "C001 and C004 are the same person with different IDs. Which columns should Remove Duplicates compare?",
        type: "multiple_choice",
        points: 1,
        explanation: "compare the identifying columns, not the ID",
        answers: [
          {
            text: "FullName, DateOfBirth, Phone and Email",
            isCorrect: true,
          },
          {
            text: "All columns including CustomerID",
            isCorrect: false,
          },
          {
            text: "CustomerID only",
            isCorrect: false,
          },
          {
            text: "Channel only",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why tick \"Match entire cell contents\" when replacing \"Male\" with \"M\"?",
        type: "multiple_choice",
        points: 1,
        explanation: "stops \"Female\" becoming \"FeM\"",
        answers: [
          {
            text: "It is faster",
            isCorrect: false,
          },
          {
            text: "It makes the text bold",
            isCorrect: false,
          },
          {
            text: "It deletes blanks",
            isCorrect: false,
          },
          {
            text: "So \"Female\" does not become \"FeM\"",
            isCorrect: true,
          },
        ],
      },
      {
        text: "A customer's phone number is missing. What should you do?",
        type: "multiple_choice",
        points: 1,
        explanation: "leave blank and log it",
        answers: [
          {
            text: "Type \"N/A\"",
            isCorrect: false,
          },
          {
            text: "Leave it blank and note it in the change log",
            isCorrect: true,
          },
          {
            text: "Copy another customer's number",
            isCorrect: false,
          },
          {
            text: "Delete the customer",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is a change log for?",
        type: "multiple_choice",
        points: 1,
        explanation: "records every change for checking",
        answers: [
          {
            text: "Recording every cleaning change so others can check it",
            isCorrect: true,
          },
          {
            text: "Storing passwords",
            isCorrect: false,
          },
          {
            text: "Making charts",
            isCorrect: false,
          },
          {
            text: "Counting rows",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does =TRIM(\"  Ada Obi  \") return?",
        type: "multiple_choice",
        points: 1,
        explanation: "TRIM removes outer spaces",
        answers: [
          {
            text: "\"Ada Obi\"",
            isCorrect: true,
          },
          {
            text: "\"  Ada Obi\"",
            isCorrect: false,
          },
          {
            text: "\"ADA OBI\"",
            isCorrect: false,
          },
          {
            text: "\"AdaObi\"",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which formula turns \"john kamau\" into \"John Kamau\"?",
        type: "multiple_choice",
        points: 1,
        explanation: "PROPER capitalises each word",
        answers: [
          {
            text: "=UPPER(B2)",
            isCorrect: false,
          },
          {
            text: "=TRIM(B2)",
            isCorrect: false,
          },
          {
            text: "=LEN(B2)",
            isCorrect: false,
          },
          {
            text: "=PROPER(B2)",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Why should you guard DATEDIF with IF when a date might be blank?",
        type: "multiple_choice",
        points: 1,
        explanation: "a blank is read as 1900",
        answers: [
          {
            text: "DATEDIF is slow",
            isCorrect: false,
          },
          {
            text: "A blank is treated as 1900 and gives a huge, wrong age",
            isCorrect: true,
          },
          {
            text: "Blanks become text",
            isCorrect: false,
          },
          {
            text: "It is not necessary",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does Paste Values do?",
        type: "multiple_choice",
        points: 1,
        explanation: "results without formulas",
        answers: [
          {
            text: "Pastes the formulas only",
            isCorrect: false,
          },
          {
            text: "Pastes the formatting only",
            isCorrect: false,
          },
          {
            text: "Pastes the results without the formulas behind them",
            isCorrect: true,
          },
          {
            text: "Deletes the column",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does =SUBSTITUTE(\"0700-555-0106\",\"-\",\" \") return?",
        type: "multiple_choice",
        points: 1,
        explanation: "every dash becomes a space",
        answers: [
          {
            text: "07005550106",
            isCorrect: false,
          },
          {
            text: "0700-555-0106",
            isCorrect: false,
          },
          {
            text: "0700 555-0106",
            isCorrect: false,
          },
          {
            text: "0700 555 0106",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What does =IF(H2>=2500,\"Large\",\"Small\") show when H2 is 2,500?",
        type: "multiple_choice",
        points: 1,
        explanation: "2,500 >= 2,500 is true",
        answers: [
          {
            text: "Small",
            isCorrect: false,
          },
          {
            text: "Large",
            isCorrect: true,
          },
          {
            text: "An error",
            isCorrect: false,
          },
          {
            text: "2500",
            isCorrect: false,
          },
        ],
      },
      {
        text: "In SUMIFS, which argument comes first?",
        type: "multiple_choice",
        points: 1,
        explanation: "the range to add up comes first",
        answers: [
          {
            text: "The criteria",
            isCorrect: false,
          },
          {
            text: "The criteria range",
            isCorrect: false,
          },
          {
            text: "The range to add up",
            isCorrect: true,
          },
          {
            text: "The sheet name",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does =COUNTIFS(C2:C11,\"Central\") return for the Sunrise Mart data?",
        type: "multiple_choice",
        points: 1,
        explanation: "4 Central orders",
        answers: [
          {
            text: "4",
            isCorrect: true,
          },
          {
            text: "3",
            isCorrect: false,
          },
          {
            text: "7,100",
            isCorrect: false,
          },
          {
            text: "10",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does XLOOKUP do?",
        type: "multiple_choice",
        points: 1,
        explanation: "finds and returns a matching value",
        answers: [
          {
            text: "Sorts a list",
            isCorrect: false,
          },
          {
            text: "Removes duplicates",
            isCorrect: false,
          },
          {
            text: "Adds up a column",
            isCorrect: false,
          },
          {
            text: "Finds a value in one column and returns the matching value from another",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Why should you avoid using IFERROR to show 0 when a lookup fails?",
        type: "multiple_choice",
        points: 1,
        explanation: "a 0 looks like a real answer",
        answers: [
          {
            text: "It is slower",
            isCorrect: false,
          },
          {
            text: "A 0 looks like a real answer and hides missing data",
            isCorrect: true,
          },
          {
            text: "IFERROR only works with text",
            isCorrect: false,
          },
          {
            text: "It deletes the formula",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which area of a PivotTable gives one row for each branch?",
        type: "multiple_choice",
        points: 1,
        explanation: "Rows gives one row per value",
        answers: [
          {
            text: "Values",
            isCorrect: false,
          },
          {
            text: "Filters",
            isCorrect: false,
          },
          {
            text: "Columns",
            isCorrect: false,
          },
          {
            text: "Rows",
            isCorrect: true,
          },
        ],
      },
      {
        text: "You drag OrderID into Values and get 10,055. What should you do?",
        type: "multiple_choice",
        points: 1,
        explanation: "change Sum to Count",
        answers: [
          {
            text: "Delete the PivotTable",
            isCorrect: false,
          },
          {
            text: "Change the calculation from Sum to Count",
            isCorrect: true,
          },
          {
            text: "Sort the data",
            isCorrect: false,
          },
          {
            text: "Nothing; it is correct",
            isCorrect: false,
          },
        ],
      },
      {
        text: "You add new rows to the source data. What must you do to see them in the PivotTable?",
        type: "multiple_choice",
        points: 1,
        explanation: "PivotTables need a Refresh",
        answers: [
          {
            text: "Rebuild it",
            isCorrect: false,
          },
          {
            text: "Save the file",
            isCorrect: false,
          },
          {
            text: "Refresh it",
            isCorrect: true,
          },
          {
            text: "Nothing; it updates instantly",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why build a PivotTable from an Excel Table rather than a plain range?",
        type: "multiple_choice",
        points: 1,
        explanation: "Tables include new rows on refresh",
        answers: [
          {
            text: "New rows are included when you refresh",
            isCorrect: true,
          },
          {
            text: "It makes the numbers bigger",
            isCorrect: false,
          },
          {
            text: "Plain ranges cannot be summed",
            isCorrect: false,
          },
          {
            text: "Tables are coloured",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does \"% of Grand Total\" show for Hilltop?",
        type: "multiple_choice",
        points: 1,
        explanation: "Hilltop's share, 45.9%",
        answers: [
          {
            text: "Its number of orders",
            isCorrect: false,
          },
          {
            text: "Its average order",
            isCorrect: false,
          },
          {
            text: "Its share of all sales, 45.9%",
            isCorrect: true,
          },
          {
            text: "Its growth since last week",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 5,
    moduleTitle: "Introduction to Databases and SQL",
    moduleDescription: "Spreadsheets are good for thousands of rows; organisations keep millions in databases. This week learners meet relational databases and SQL, the language used to ask them questions. They build the Sunrise Mart database themselves and write their first queries. Every SQL statement and result in Modules 5 and 6 was run in SQLite, the engine inside DB Browser for SQLite, and the results shown are the actual output.",
    lessons: [
      {
        title: "What a database is: tables, rows and keys",
        order: 1,
        durationMinutes: 60,
        videoUrl: "https://www.youtube.com/watch?v=OqjJjpjDRLc",
        content: "## Lesson introduction\n\n- **What you will study:** what a relational database is, how it differs from a spreadsheet, and the idea of primary and foreign keys that link tables together.\n- **Why it matters:** most business data lives in databases. SQL is listed in more data analyst job adverts than almost any other skill.\n- **After this lesson you can:** describe the Sunrise Mart data as two linked tables and explain which column links them.\n- **Estimated time:** 60 minutes.\n\n## The topic in simple English\n\nA database is a well-organised filing cabinet. Each drawer is a **table** that holds one kind of thing: one drawer for customers, one for sales. Each card in a drawer is a **row**, and every card has the same boxes to fill in, called **columns**.\n\nEvery card has a unique number written on it, like a student number. That is the **primary key**. When a sales card mentions a customer, it writes the customer's number rather than copying their whole name and address. That number is a **foreign key**: it points to a card in another drawer.\n\n## Learning objectives\n\n1. Explain what a relational database is.\n2. Name three differences between a database and a spreadsheet.\n3. Identify tables, rows, columns and data types.\n4. Explain primary keys and foreign keys with examples.\n5. Explain what SQL is and what it is used for.\n\n## Main teaching content\n\n**1. Relational databases**\n\n- **What it means:** a database that stores data in tables which are linked through shared key columns.\n- **Why it is useful:** each fact is stored once. If a customer changes their city, you change one row, and every sale linked to that customer shows the new city.\n- **Everyday example:** a school keeps one list of students and a separate list of exam results that uses student numbers.\n- **Business example:** a bank keeps accounts in one table and millions of transactions in another, linked by account number.\n\n**2. Database or spreadsheet?**\n\n|  | Spreadsheet | Database |\n| --- | --- | --- |\n| Size | Comfortable up to tens of thousands of rows | Millions or billions of rows |\n| Users | Usually one person editing at a time | Many people and systems at once |\n| Rules | Anyone can type anything in any cell | Each column has a type and rules; bad data can be refused |\n| Linking | Lookups between sheets | Tables linked by keys |\n| Asking questions | Formulas and PivotTables | SQL queries |\n\nAnalysts use both: they pull data from a database with SQL, then often finish the work in Excel or Power BI.\n\n**3. Tables, rows, columns and data types**\n\nEach column has a **data type**. In SQLite, the database you will use, the main types are:\n\n| Type | Holds | Example |\n| --- | --- | --- |\n| INTEGER | Whole numbers | 4, 1001 |\n| REAL | Numbers with decimals | 3.5 |\n| TEXT | Words, codes and dates written as text | 'Hilltop', '2026-03-04' |\n| NULL | The special value for \"no value\" | A missing date of birth |\n\nSQLite stores dates as text in the form YYYY-MM-DD. Because that format sorts correctly, comparisons such as \"before 2026-03-04\" work.\n\n**4. Primary and foreign keys**\n\n- **Primary key:** a column whose value is unique for every row and never empty. In `customers` it is `customer_id`; in `sales` it is `order_id`.\n- **Foreign key:** a column that holds another table's primary key. `sales.customer_id` points to `customers.customer_id`.\n- **Why keys matter:** the duplicate customer in Lesson 2.4 (C001 and C004) could happen because nothing stopped it. A primary key prevents the same ID twice, and good systems add rules against the same person twice.\n\n**5. SQL**\n\nSQL (Structured Query Language, said \"S-Q-L\" or \"sequel\") is the language for asking a database questions. A question is called a **query**. The same basic SQL works in SQLite, MySQL, PostgreSQL, SQL Server and many cloud tools, with small differences.\n\nIn this course you only **read** data with SQL, except when you build your own practice database. In a real job you will usually have read-only access, which protects the company's data.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Relational database | Data stored in linked tables | Linked lists | Student list and results list | Customers and sales |\n| Table | A set of rows with the same columns | One drawer of cards | A class register | The sales table |\n| Primary key | A unique, non-empty identifier for each row | The row's own ID | A student number | order\\_id |\n| Foreign key | A column holding another table's primary key | A pointer to another table | A results slip with a student number | sales.customer\\_id |\n| Query | A request for data written in SQL | A question to the database | Asking a librarian for a book | \"Show Hilltop's orders\" |\n| NULL | The marker for a missing value | Empty, unknown | A blank box on a form | C007's date of birth |\n\n## Step-by-step demonstration: design the Sunrise Mart database on paper\n\n1. Look at the Sales sheet from Module 4. It mixes two kinds of thing: orders and customers.\n2. Draw two boxes: **customers** and **sales**.\n3. In **customers**, list: customer\\_id, full\\_name, gender, date\\_of\\_birth, city, signup\\_date, channel. Mark customer\\_id as **PK**.\n4. Notice what is missing: phone and email. The analysis does not need them, so they stay out of the analysis database. This is data minimisation (Lesson 2.3).\n5. In **sales**, list: order\\_id, order\\_date, branch, customer\\_id, category, quantity, unit\\_price. Mark order\\_id as **PK** and customer\\_id as **FK**.\n6. Notice that there is no Total column. Total is quantity × unit\\_price, so the database calculates it when asked. Storing it would risk the two disagreeing.\n7. Draw a line from sales.customer\\_id to customers.customer\\_id. Write \"1\" at the customers end and \"many\" at the sales end: one customer can have many orders.\n8. Write a data type next to every column: INTEGER for order\\_id, quantity and unit\\_price; TEXT for everything else.\n\n## Practical exercise\n\n- **Task:** design a two-table database for a small library.\n- **Information to store:** members (name, joining date, phone) and loans (which book, which member, date borrowed, date returned).\n- **Steps:** draw two tables; choose a primary key for each; add the foreign key; give every column a data type; mark which column may be NULL.\n- **Expected output:** members (member\\_id PK INTEGER, full\\_name TEXT, joined\\_date TEXT, phone TEXT) and loans (loan\\_id PK INTEGER, member\\_id FK INTEGER, book\\_title TEXT, borrowed\\_date TEXT, returned\\_date TEXT, NULL while the book is still out).\n- **Submit:** a photo or drawing of your design.\n\n## Knowledge check\n\n1. What is a primary key?\n   - A) The first column in any table\n   - B) A password for the database\n   - C) A column that links to another table\n   - D) A unique, non-empty identifier for each row\n2. In the Sunrise Mart database, what is `sales.customer_id`?\n   - A) A foreign key pointing to customers\n   - B) The primary key of sales\n   - C) A calculated column\n   - D) A data type\n3. Why does the sales table not store a Total column?\n   - A) SQLite cannot store numbers\n   - B) Totals are secret\n   - C) It can be calculated from quantity × unit\\_price, so storing it risks disagreement\n   - D) It is too long\n4. What does NULL mean?\n   - A) Zero\n   - B) No value, missing or unknown\n   - C) The word \"null\"\n   - D) An error\n5. Which is an advantage of a database over a spreadsheet?\n   - A) Many users and systems can work with very large data at once, with rules on each column\n   - B) It has more colours\n   - C) It needs no structure\n   - D) It cannot be shared\n\n## Lesson summary\n\n1. A relational database stores data in linked tables.\n2. Every column has a data type; NULL marks a missing value.\n3. A primary key identifies each row; a foreign key points to a row in another table.\n4. Store each fact once and calculate values such as totals when you need them.\n5. SQL is the language used to ask databases questions.\n\n## Completion check\n\n- [ ] I can explain primary and foreign keys with the Sunrise Mart example.\n- [ ] I drew the two-table design.\n- [ ] I designed the library database.",
      },
      {
        title: "Setting up DB Browser for SQLite and building your database",
        order: 2,
        durationMinutes: 75,
        videoUrl: "https://www.youtube.com/watch?v=b0Dplx4M5zg",
        content: "**Files for this lesson:** [products.csv](/course-files/data-analytics/products.csv) · [sunrise.db](/course-files/data-analytics/sunrise.db). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** how to install DB Browser for SQLite, create a database file, build tables with CREATE TABLE, add rows with INSERT, and import a CSV file.\n- **Why it matters:** you learn SQL by writing it. Having your own database means you can practise safely; you cannot break anything important.\n- **After this lesson you can:** build the Sunrise Mart database from a script and look at its tables.\n- **Estimated time:** 75 minutes.\n\n## The topic in simple English\n\nSQLite is a small database that lives in a single file on your computer, like a Word document. DB Browser for SQLite is a free program that opens that file and lets you look inside, run SQL and see the results.\n\nYou will build the database with a **script**: a set of SQL instructions run in one go. It is like following a recipe card: the same instructions always give the same result.\n\n## Learning objectives\n\n1. Install DB Browser for SQLite and create a new database file.\n2. Run a SQL script in the Execute SQL tab.\n3. Explain what CREATE TABLE and INSERT do.\n4. Save changes with Write Changes.\n5. Import a CSV file as a new table.\n\n## Main teaching content\n\n**1. The tool**\n\nDB Browser for SQLite is free and open source, from **sqlitebrowser.org**. There are versions for Windows, Mac and Linux. If you cannot install software, for example on a work laptop or Chromebook, ask your tutor for a browser-based SQLite editor; the SQL in this course works the same there.\n\nThe four tabs you will use:\n\n| Tab | What it shows |\n| --- | --- |\n| Database Structure | The tables and their columns |\n| Browse Data | The rows inside a table, like a spreadsheet |\n| Execute SQL | A box to type SQL, and the results below it |\n| Edit Pragmas | Database settings; you will not need it |\n\n**2. CREATE TABLE**\n\n```sql\nCREATE TABLE customers (\n  customer_id   TEXT PRIMARY KEY,\n  full_name     TEXT NOT NULL,\n  city          TEXT\n);\n```\n\n- Each line inside the brackets is one column: its name, then its type, then any rules.\n- `PRIMARY KEY` makes the column the unique ID.\n- `NOT NULL` means the value cannot be missing.\n- A statement ends with a semicolon `;`.\n\n**3. INSERT**\n\n```sql\nINSERT INTO customers VALUES ('C001', 'Amara Mensah', 'Riverside');\n```\n\nValues are listed in the same order as the columns. Text goes in single quotes; numbers do not. NULL (no quotes) means missing.\n\n**4. Saving**\n\nDB Browser holds your changes until you click **Write Changes** (Ctrl + S). If you close without writing, the changes are lost. SELECT queries change nothing, so they never need saving.\n\n**5. Importing a CSV**\n\nMost real data arrives as files. **File**, **Import**, **Table from CSV file** turns a CSV into a new table. Tick **Column names in first line**, check the preview, and click **OK**. Imported columns are often all TEXT, so check the types in Database Structure.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| SQLite | A database engine that stores a whole database in one file | A database in a file | A notebook you carry around | sunrise.db |\n| Script | A set of SQL statements run together | A recipe card | Assembly instructions | The script that builds sunrise.db |\n| CREATE TABLE | The statement that makes a new table | Build an empty drawer | Printing a blank form | Creating the sales table |\n| INSERT | The statement that adds rows | Fill in cards | Writing in a register | Adding the 10 orders |\n| Constraint | A rule on a column, such as PRIMARY KEY or NOT NULL | A rule the data must follow | \"Name is required\" on a form | full\\_name cannot be missing |\n\n## Step-by-step demonstration: build sunrise.db\n\n**Install and create**\n\n1. Go to **sqlitebrowser.org**, click **Download**, and choose the installer for your system. Install it like any program.\n2. Open DB Browser for SQLite. Click **New Database**. Make a folder called **Data Analytics course**, name the file **sunrise.db**, and click **Save**.\n3. A window called **Edit table definition** opens. Click **Cancel**; you will create the tables with SQL instead.\n\n**Run the build script**\n\n4. Click the **Execute SQL** tab. Type or paste the whole script below into the box. (The tutor's copy is in the course files.)\n\n```sql\nCREATE TABLE customers (\n  customer_id   TEXT PRIMARY KEY,\n  full_name     TEXT NOT NULL,\n  gender        TEXT,\n  date_of_birth TEXT,\n  city          TEXT,\n  signup_date   TEXT,\n  channel       TEXT\n);\nINSERT INTO customers VALUES\n  ('C001','Amara Mensah','F','1998-04-12','Riverside','2026-01-05','App'),\n  ('C002','John Kamau','M','1995-07-12','Central','2026-01-05','Branch'),\n  ('C003','Thandi Nkosi','F','2001-11-30','Hilltop','2026-01-06','Website'),\n  ('C005','Chinedu Eze','M',NULL,'Central','2026-01-07','Branch'),\n  ('C006','Wanjiru Otieno','F','1990-06-21','Hilltop','2026-01-08','App'),\n  ('C007','Kwame Boateng','M',NULL,'Central','2026-01-08','Branch'),\n  ('C008','Fatima Bello','F','1993-09-03','Riverside','2026-01-09','Website'),\n  ('C009','Lindiwe Dube','F','1999-02-17','Riverside','2026-01-10','App');\nCREATE TABLE sales (\n  order_id    INTEGER PRIMARY KEY,\n  order_date  TEXT NOT NULL,\n  branch      TEXT NOT NULL,\n  customer_id TEXT REFERENCES customers(customer_id),\n  category    TEXT NOT NULL,\n  quantity    INTEGER NOT NULL,\n  unit_price  INTEGER NOT NULL\n);\nINSERT INTO sales VALUES\n  (1001,'2026-03-02','Central','C001','Drinks',4,350),\n  (1002,'2026-03-02','Riverside','C002','Snacks',2,500),\n  (1003,'2026-03-02','Central','C005','Groceries',1,2500),\n  (1004,'2026-03-03','Hilltop','C003','Drinks',6,350),\n  (1005,'2026-03-03','Riverside','C008','Drinks',3,350),\n  (1006,'2026-03-03','Central','C007','Snacks',5,500),\n  (1007,'2026-03-04','Hilltop','C006','Groceries',2,2500),\n  (1008,'2026-03-04','Riverside','C001','Groceries',1,2500),\n  (1009,'2026-03-04','Hilltop','C003','Drinks',8,350),\n  (1010,'2026-03-04','Central','C002','Drinks',2,350);\n```\n\n5. Click **Execute all** (the play button, or press **Ctrl + Return** or **F5**). The message area at the bottom should say the statements ran without errors.\n6. Click **Write Changes** (Ctrl + S).\n\nThe customers table holds the seven clean customers from Module 4, without phone and email, plus one new customer: **C009, Lindiwe Dube**, who signed up on 10 January and has not bought anything yet. You will meet this customer again in Lesson 6.3. C005's impossible date of birth is NULL, as it was cleared in Lesson 4.1.\n\n**Look inside**\n\n7. Click **Database Structure**. You see two tables, customers and sales. Click the arrows to see their columns and types.\n8. Click **Browse Data** and choose **sales** from the Table list. The 10 orders appear. Switch to **customers**: 8 rows.\n\n**Check with SQL**\n\n9. Go back to **Execute SQL**, delete the script, and run:\n\n```sql\nSELECT COUNT(*) FROM sales;\n```\n\nResult: **10**. Then run `SELECT COUNT(*) FROM customers;` Result: **8**.\n\n**Try the safety rules**\n\n10. Run `INSERT INTO customers VALUES ('C001','Test Person','F',NULL,'Central','2026-02-01','App');`. SQLite refuses with an error saying the UNIQUE constraint failed on customers.customer\\_id. The primary key stopped a duplicate ID. Nothing was added.\n\n## Practical exercise\n\n- **Task:** add a products table by importing a CSV.\n- **Data:** in a text editor such as Notepad or TextEdit (plain-text mode), create a file called **products.csv** containing these four lines:\n\n```\nproduct_id,product,category,unit_price\nP01,Bottled water,Drinks,350\nP02,Crisps,Snacks,500\nP03,Rice 5kg,Groceries,2500\n```\n\n- **Steps:**\n  1. In DB Browser, click **File**, **Import**, **Table from CSV file**, and choose products.csv.\n  2. Tick **Column names in first line**, name the table **products**, and click **OK**.\n  3. Click **Write Changes**.\n  4. Run `SELECT COUNT(*) FROM products;`.\n- **Expected output:** a products table with 3 rows and 4 columns; the count query returns 3.\n- **Submit:** a screenshot of Database Structure showing all three tables.\n\n## Knowledge check\n\n1. What is SQLite?\n   - A) A spreadsheet program\n   - B) A database engine that stores a whole database in one file\n   - C) A programming course\n   - D) A website\n2. What happens if you close DB Browser without clicking Write Changes?\n   - A) Everything is saved automatically\n   - B) The file is deleted\n   - C) Only the tables are saved\n   - D) Your changes since the last write are lost\n3. What does `NOT NULL` mean in a CREATE TABLE statement?\n   - A) The column cannot be left empty\n   - B) The column must be zero\n   - C) The column is a number\n   - D) The column is hidden\n4. You insert a second customer with ID C001. What happens?\n   - A) Both rows are kept\n   - B) The old row is replaced\n   - C) SQLite refuses, because customer\\_id is the primary key\n   - D) The ID is changed to C010\n5. How are text values written in an INSERT statement?\n   - A) In brackets\n   - B) In capital letters\n   - C) In single quotes, like 'Hilltop'\n   - D) Without any marks\n\n## Lesson summary\n\n1. DB Browser for SQLite is a free tool for working with SQLite database files.\n2. CREATE TABLE builds a table; INSERT adds rows.\n3. Constraints such as PRIMARY KEY and NOT NULL protect data quality.\n4. Click Write Changes to save; SELECT never changes data.\n5. File, Import, Table from CSV file loads real-world files.\n\n## Completion check\n\n- [ ] DB Browser for SQLite is installed.\n- [ ] sunrise.db has customers (8 rows) and sales (10 rows).\n- [ ] I saw the primary key refuse a duplicate ID.\n- [ ] I imported products.csv.",
      },
      {
        title: "Your first queries: SELECT, WHERE and ORDER BY",
        order: 3,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=5tEApCGgpEQ",
        content: "**Files for this lesson:** [sunrise.db](/course-files/data-analytics/sunrise.db). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** how to choose columns with SELECT, calculate new columns, name them with AS, choose rows with WHERE, sort with ORDER BY and limit results with LIMIT.\n- **Why it matters:** these five keywords appear in almost every query you will ever write.\n- **After this lesson you can:** answer simple business questions from the Sunrise Mart database.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nA query is a polite, precise request: \"From the sales drawer, give me the order number and branch, only for Hilltop, with the biggest orders first.\" SQL puts that request into fixed words in a fixed order:\n\n```sql\nSELECT   -- which columns\nFROM     -- which table\nWHERE    -- which rows\nORDER BY -- in what order\nLIMIT    -- how many\n```\n\nText after `--` is a **comment**. SQLite ignores it; it is a note for humans.\n\n## Learning objectives\n\n1. Select all columns or chosen columns from a table.\n2. Create a calculated column and name it with AS.\n3. Filter rows with WHERE and comparison operators.\n4. Sort results with ORDER BY, ascending and descending.\n5. Return only the top rows with LIMIT.\n\n## Main teaching content\n\n**1. SELECT and FROM**\n\n- `SELECT * FROM sales;` returns every column. The star means \"all columns\". Use it to explore; in real work, name the columns you need.\n- `SELECT order_id, branch, category FROM sales;` returns just those three columns, in that order.\n\n**2. Calculated columns and aliases**\n\n```sql\nSELECT order_id, quantity * unit_price AS total\nFROM sales;\n```\n\n`quantity * unit_price` is calculated for each row. `AS total` gives the new column a name, called an **alias**. Without it, the column heading would be the whole calculation.\n\n**3. WHERE**\n\nWHERE keeps only rows where the condition is true. It uses the same comparison signs as Excel: `=`, `<>` (not equal), `>`, `<`, `>=`, `<=`.\n\n- Text and dates go in single quotes: `WHERE branch = 'Hilltop'`, `WHERE date_of_birth < '1996-01-01'`.\n- Numbers do not: `WHERE quantity >= 5`.\n- Text comparison with `=` is **case-sensitive** in SQLite: `'hilltop'` does not match `'Hilltop'`. This is one more reason cleaning matters.\n- To filter on a calculation, repeat the calculation: `WHERE quantity * unit_price >= 2500`. Standard SQL does not let you use the alias in WHERE.\n\n**4. ORDER BY and LIMIT**\n\n- `ORDER BY total` sorts from smallest to largest (ascending, ASC, the default). `ORDER BY total DESC` sorts largest first.\n- You can sort by more than one column: `ORDER BY total DESC, order_id` sorts by total, and breaks ties by order number.\n- `LIMIT 3` returns only the first three rows of the sorted result. Always use ORDER BY with LIMIT; otherwise \"the first three\" is whatever order the database happens to use.\n\n**5. Writing style**\n\nSQL keywords are not case-sensitive, but the habit is to write them in capitals and put each clause on a new line. It makes queries easy to read and check. End each query with a semicolon.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| SELECT | The clause that lists the columns to return | Which boxes to show | Choosing which details to read out | order\\_id, branch |\n| WHERE | The clause that filters rows | Which rows to keep | \"Only people over 18\" | branch = 'Hilltop' |\n| ORDER BY | The clause that sorts the result | Put in order | Sorting a playlist | Biggest orders first |\n| Alias | A temporary name given with AS | A nickname | Calling Robert \"Bob\" | AS total |\n| Comment | Text after `--` that SQL ignores | A note to yourself | A sticky note | `-- Hilltop only` |\n\n## Step-by-step demonstration: questions for the Sunrise Mart manager\n\nOpen **sunrise.db** in DB Browser and click **Execute SQL**. For each query, type it, click **Execute all** (or press **Ctrl + Return**), and compare with the result shown. To run only one query when several are in the box, select it first, then press **Ctrl + Return**.\n\n**1. Look at everything**\n\n```sql\nSELECT * FROM sales;\n```\n\nResult: 10 rows and 7 columns. The first row is 1001, 2026-03-02, Central, C001, Drinks, 4, 350.\n\n**2. Calculate the total of each order**\n\n```sql\nSELECT order_id, branch, quantity * unit_price AS total\nFROM sales;\n```\n\nResult: 10 rows with a new column called total, for example 1001 Central 1400 and 1007 Hilltop 5000. These match the Total column in Excel.\n\n**3. Hilltop's orders only**\n\n```sql\nSELECT order_id, category, quantity, unit_price\nFROM sales\nWHERE branch = 'Hilltop';\n```\n\nResult:\n\n| order\\_id | category | quantity | unit\\_price |\n| --- | --- | --- | --- |\n| 1004 | Drinks | 6 | 350 |\n| 1007 | Groceries | 2 | 2500 |\n| 1009 | Drinks | 8 | 350 |\n\n**4. Case matters**\n\nChange `'Hilltop'` to `'hilltop'` and run it again. Result: no rows. The database is not broken; the text does not match exactly.\n\n**5. The three biggest orders**\n\n```sql\nSELECT order_id, branch, quantity * unit_price AS total\nFROM sales\nORDER BY total DESC, order_id\nLIMIT 3;\n```\n\nResult: 1007 Hilltop 5000; 1009 Hilltop 2800; 1003 Central 2500.\n\nThree orders tie at 2,500 (1003, 1006 and 1008). Sorting by order\\_id as well makes sure the same one, 1003, appears every time. Tell the manager about the tie rather than hiding it.\n\n**6. Riverside, smallest first**\n\n```sql\nSELECT order_id, quantity * unit_price AS total\nFROM sales\nWHERE branch = 'Riverside'\nORDER BY total;\n```\n\nResult: 1002 1000; 1005 1050; 1008 2500.\n\n**7. Older customers**\n\n```sql\nSELECT customer_id, full_name, date_of_birth\nFROM customers\nWHERE date_of_birth < '1996-01-01';\n```\n\nResult: C002 John Kamau 1995-07-12; C006 Wanjiru Otieno 1990-06-21; C008 Fatima Bello 1993-09-03. C005 and C007 have NULL dates, so they are not included; a missing value is never \"less than\" anything.\n\n## Practical exercise\n\n- **Task:** write four queries on sunrise.db.\n- **Questions:**\n  1. Show full\\_name, city and channel for every customer.\n  2. Show the names and cities of customers who signed up through the App, in alphabetical order of name.\n  3. Show order\\_id, branch and quantity for orders of 5 or more items.\n  4. Show the two smallest orders by total.\n- **Expected output:**\n  1. 8 rows.\n  2. Amara Mensah (Riverside), Lindiwe Dube (Riverside), Wanjiru Otieno (Hilltop).\n  3. 1004 Hilltop 6; 1006 Central 5; 1009 Hilltop 8.\n  4. 1010 (700) and 1002 (1000).\n- **Submit:** a text file with your four queries, and a screenshot of each result.\n\n## Knowledge check\n\n1. What does `SELECT * FROM sales;` return?\n   - A) Every column and every row of sales\n   - B) Only the first row\n   - C) Only the order\\_id column\n   - D) The number of rows\n2. What does `AS total` do in `SELECT quantity * unit_price AS total`?\n   - A) Adds up the whole column\n   - B) Sorts the result\n   - C) Names the calculated column \"total\"\n   - D) Saves the column into the table\n3. `WHERE branch = 'hilltop'` returns no rows. Why?\n   - A) The table is empty\n   - B) WHERE does not work with text\n   - C) The database is broken\n   - D) Text comparison is case-sensitive and the data says 'Hilltop'\n4. Which query returns the three biggest orders?\n   - A) `... ORDER BY total LIMIT 3`\n   - B) `... ORDER BY total DESC LIMIT 3`\n   - C) `... LIMIT 3`\n   - D) `... WHERE total = 3`\n5. Why should LIMIT be used with ORDER BY?\n   - A) LIMIT does not work without it\n   - B) It is faster\n   - C) It removes duplicates\n   - D) Without a sort, \"the first rows\" are in no guaranteed order\n\n## Lesson summary\n\n1. SELECT chooses columns, FROM chooses the table, WHERE chooses rows.\n2. Calculated columns are named with AS.\n3. Text and dates go in single quotes, and `=` on text is case-sensitive.\n4. ORDER BY sorts (ASC by default, DESC for largest first); add a second column to break ties.\n5. LIMIT returns the top rows of a sorted result.\n\n## Completion check\n\n- [ ] I ran all seven demonstration queries and matched the results.\n- [ ] I wrote the four exercise queries.\n- [ ] I can explain why 'hilltop' returned nothing.",
      },
      {
        title: "Filtering with AND, OR, IN, BETWEEN, LIKE and NULL",
        order: 4,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=cMUJFau5Wvg",
        content: "**Files for this lesson:** [sunrise.db](/course-files/data-analytics/sunrise.db). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** how to combine conditions with AND and OR, use brackets, and use the shortcuts IN, BETWEEN, LIKE, IS NULL and DISTINCT.\n- **Why it matters:** real questions have several conditions: \"Central or Riverside, on 4 March, under 2,500.\" Getting the logic wrong gives a confident, wrong answer.\n- **After this lesson you can:** write accurate filters with several conditions and find missing values.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nAND is strict: both things must be true. \"Tea AND biscuits\" means you get both. OR is generous: either one is enough. \"Tea OR coffee\" means you get one or the other, or both.\n\nIN is a shortcut for a list: \"branch is one of Central or Riverside\". BETWEEN is a range: \"from 1,000 to 2,500\". LIKE matches a pattern: \"names starting with K\". IS NULL finds the empty boxes.\n\n## Learning objectives\n\n1. Combine conditions with AND and OR.\n2. Use brackets to control the order of AND and OR.\n3. Use IN and BETWEEN as shortcuts.\n4. Match patterns with LIKE and the % wildcard.\n5. Find missing values with IS NULL and list unique values with DISTINCT.\n\n## Main teaching content\n\n**1. AND, OR and NOT**\n\n| Operator | Keeps a row when | Example |\n| --- | --- | --- |\n| AND | Both conditions are true | `branch = 'Central' AND category = 'Drinks'` |\n| OR | At least one is true | `category = 'Snacks' OR branch = 'Hilltop'` |\n| NOT / <> | The condition is false | `category <> 'Drinks'` |\n\n**2. Brackets**\n\nSQL does AND before OR, just as maths does × before +. So\n\n`category = 'Snacks' OR category = 'Drinks' AND branch = 'Central'`\n\nmeans \"Snacks anywhere, or Drinks in Central\", which is not what most people mean. Brackets make it clear:\n\n`(category = 'Snacks' OR category = 'Drinks') AND branch = 'Central'`\n\n**Rule:** whenever a query mixes AND and OR, use brackets.\n\n**3. IN and BETWEEN**\n\n- `branch IN ('Central', 'Riverside')` is the same as `branch = 'Central' OR branch = 'Riverside'`, but shorter and safer.\n- `quantity * unit_price BETWEEN 1000 AND 2500` includes both ends: 1,000 and 2,500 are in.\n- BETWEEN works on dates written as YYYY-MM-DD: `order_date BETWEEN '2026-03-03' AND '2026-03-04'`.\n\n**4. LIKE**\n\n| Pattern | Matches | Example result |\n| --- | --- | --- |\n| `'K%'` | Starts with K | Kwame Boateng |\n| `'%o'` | Ends with o | Wanjiru Otieno, Fatima Bello |\n| `'%an%'` | Contains \"an\" anywhere | Thandi Nkosi, Wanjiru Otieno |\n\n`%` means \"any number of characters, including none\". `_` means exactly one character. In SQLite, LIKE ignores capital letters for English letters; `=` does not.\n\n**5. NULL**\n\nNULL means \"unknown\", so it is not equal to anything, not even another NULL. `WHERE date_of_birth = NULL` returns nothing. Always write `IS NULL` or `IS NOT NULL`.\n\n**6. DISTINCT**\n\n`SELECT DISTINCT branch FROM sales;` lists each branch once. `COUNT(DISTINCT customer_id)` counts different customers rather than orders.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Logical operator | AND, OR or NOT, used to combine conditions | Joining words for rules | \"Hot AND sunny\" | Central AND Drinks |\n| Operator precedence | The order in which operators are applied | What gets done first | × before + in maths | AND before OR |\n| Wildcard | A symbol that stands for unknown characters | A blank tile | \"Any word starting with K\" | LIKE 'K%' |\n| IS NULL | The test for a missing value | \"Is the box empty?\" | Unanswered questions on a form | Customers with no date of birth |\n| DISTINCT | Keyword that removes repeated values from a result | Each value once | A guest list without repeats | The list of branches |\n\n## Step-by-step demonstration: sharper questions\n\nOpen **sunrise.db**, **Execute SQL**.\n\n**1. AND: Central Drinks orders**\n\n```sql\nSELECT order_id, branch, quantity * unit_price AS total\nFROM sales\nWHERE branch = 'Central' AND category = 'Drinks';\n```\n\nResult: 1001 Central 1400; 1010 Central 700.\n\n**2. OR: Snacks, or anything at Hilltop**\n\n```sql\nSELECT order_id, branch, category\nFROM sales\nWHERE category = 'Snacks' OR branch = 'Hilltop';\n```\n\nResult: 5 rows: 1002 Riverside Snacks; 1004 Hilltop Drinks; 1006 Central Snacks; 1007 Hilltop Groceries; 1009 Hilltop Drinks.\n\n**3. The bracket trap**\n\nThe manager asks: \"Show Central's Snacks and Drinks orders.\" First try it without brackets:\n\n```sql\nSELECT order_id, branch, category\nFROM sales\nWHERE category = 'Snacks' OR category = 'Drinks' AND branch = 'Central';\n```\n\nResult: 4 rows, including **1002 Riverside Snacks**, which is not in Central. Now add brackets:\n\n```sql\nSELECT order_id, branch, category\nFROM sales\nWHERE (category = 'Snacks' OR category = 'Drinks') AND branch = 'Central';\n```\n\nResult: 3 rows: 1001, 1006 and 1010, all Central. This is the right answer.\n\n**4. IN**\n\n```sql\nSELECT order_id, branch\nFROM sales\nWHERE branch IN ('Central', 'Riverside') AND order_date = '2026-03-04';\n```\n\nResult: 1008 Riverside; 1010 Central.\n\n**5. BETWEEN on numbers and dates**\n\n```sql\nSELECT order_id, quantity * unit_price AS total\nFROM sales\nWHERE quantity * unit_price BETWEEN 1000 AND 2500;\n```\n\nResult: 7 rows: 1001 (1400), 1002 (1000), 1003 (2500), 1004 (2100), 1005 (1050), 1006 (2500), 1008 (2500). The orders of exactly 1,000 and 2,500 are included.\n\nThen run `SELECT order_id, order_date FROM sales WHERE order_date BETWEEN '2026-03-03' AND '2026-03-04';` Result: 7 rows, orders 1004 to 1010.\n\n**6. LIKE**\n\n```sql\nSELECT full_name FROM customers WHERE full_name LIKE 'K%';\n```\n\nResult: Kwame Boateng. Change the pattern to `'%o'`: Wanjiru Otieno and Fatima Bello.\n\n**7. Missing values**\n\n```sql\nSELECT customer_id, full_name\nFROM customers\nWHERE date_of_birth IS NULL;\n```\n\nResult: C005 Chinedu Eze; C007 Kwame Boateng. Now try `WHERE date_of_birth = NULL`: no rows, even though two are missing. That is why you must use IS NULL.\n\n**8. DISTINCT**\n\n```sql\nSELECT DISTINCT branch FROM sales;\nSELECT COUNT(DISTINCT customer_id) FROM sales;\n```\n\nResults: three branches (Central, Riverside, Hilltop); **7** different customers placed the 10 orders.\n\n## Practical exercise\n\n- **Task:** write five filtered queries on sunrise.db.\n- **Questions:**\n  1. Orders placed by customers C001 or C003 (use IN).\n  2. Customers who signed up between 6 and 8 January 2026.\n  3. Non-Drinks orders with a total under 2,500.\n  4. Female customers in Riverside, in name order.\n  5. The different signup channels.\n- **Expected output:**\n  1. 1001, 1004, 1008, 1009.\n  2. C003, C005, C006, C007.\n  3. 1002 Riverside 1000 only.\n  4. Amara Mensah, Fatima Bello, Lindiwe Dube.\n  5. App, Branch, Website.\n- **Submit:** your five queries and screenshots of the results.\n\n## Knowledge check\n\n1. Which rows does `WHERE branch = 'Central' AND category = 'Drinks'` keep?\n   - A) All Central rows and all Drinks rows\n   - B) Only Drinks rows\n   - C) Only rows that are both Central and Drinks\n   - D) No rows\n2. Why use brackets in `(category = 'Snacks' OR category = 'Drinks') AND branch = 'Central'`?\n   - A) Brackets make queries faster\n   - B) SQL does AND before OR, so without brackets the meaning changes\n   - C) Brackets are required around every condition\n   - D) To sort the result\n3. Does `BETWEEN 1000 AND 2500` include an order of exactly 2,500?\n   - A) Yes, BETWEEN includes both ends\n   - B) No, only the lower end\n   - C) No, neither end\n   - D) Only for dates\n4. How do you find customers with no date of birth?\n   - A) `WHERE date_of_birth = NULL`\n   - B) `WHERE date_of_birth = ''`\n   - C) `WHERE date_of_birth = 0`\n   - D) `WHERE date_of_birth IS NULL`\n5. What does `LIKE 'K%'` match?\n   - A) Text that ends with K\n   - B) Text that starts with K\n   - C) Only the letter K\n   - D) Text containing a percent sign\n\n## Lesson summary\n\n1. AND needs every condition; OR needs at least one.\n2. SQL does AND before OR; use brackets whenever you mix them.\n3. IN is a short list; BETWEEN is an inclusive range.\n4. LIKE matches patterns with % and \\_.\n5. Use IS NULL to find missing values, and DISTINCT to list unique values.\n\n## Completion check\n\n- [ ] I saw the bracket trap give 4 rows, then 3 with brackets.\n- [ ] I found the two customers with no date of birth.\n- [ ] I wrote the five exercise queries.",
      },
    ],
    assignmentTitle: "Connectwave subscriber queries",
    assignmentDescription: "Connectwave's data team has loaded the cleaned customer list from your Module 4 assignment into a database table called subscribers.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "In a relational database, what links the sales table to the customers table?",
        type: "multiple_choice",
        points: 1,
        explanation: "Foreign key to primary key",
        answers: [
          {
            text: "A foreign key in sales that holds the customer's primary key",
            isCorrect: true,
          },
          {
            text: "The table names",
            isCorrect: false,
          },
          {
            text: "The order of the rows",
            isCorrect: false,
          },
          {
            text: "A shared colour",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which statement adds new rows to a table?",
        type: "multiple_choice",
        points: 1,
        explanation: "INSERT adds rows",
        answers: [
          {
            text: "SELECT",
            isCorrect: false,
          },
          {
            text: "CREATE TABLE",
            isCorrect: false,
          },
          {
            text: "WHERE",
            isCorrect: false,
          },
          {
            text: "INSERT",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which column should be the primary key of the sales table?",
        type: "multiple_choice",
        points: 1,
        explanation: "order_id is unique for every sale",
        answers: [
          {
            text: "branch",
            isCorrect: false,
          },
          {
            text: "order_id",
            isCorrect: true,
          },
          {
            text: "category",
            isCorrect: false,
          },
          {
            text: "quantity",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which query lists only the branch and category columns?",
        type: "multiple_choice",
        points: 1,
        explanation: "SELECT columns FROM table",
        answers: [
          {
            text: "SELECT * FROM sales;",
            isCorrect: false,
          },
          {
            text: "SELECT sales FROM branch, category;",
            isCorrect: false,
          },
          {
            text: "SELECT branch, category FROM sales;",
            isCorrect: true,
          },
          {
            text: "FROM sales SELECT branch, category;",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which clause keeps only Riverside orders?",
        type: "multiple_choice",
        points: 1,
        explanation: "WHERE filters rows",
        answers: [
          {
            text: "ORDER BY branch = 'Riverside'",
            isCorrect: false,
          },
          {
            text: "WHERE branch = 'Riverside'",
            isCorrect: true,
          },
          {
            text: "LIMIT 'Riverside'",
            isCorrect: false,
          },
          {
            text: "SELECT 'Riverside'",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does ORDER BY total DESC do?",
        type: "multiple_choice",
        points: 1,
        explanation: "DESC means largest first",
        answers: [
          {
            text: "Sorts from the largest total to the smallest",
            isCorrect: true,
          },
          {
            text: "Sorts from the smallest total to the largest",
            isCorrect: false,
          },
          {
            text: "Deletes the total column",
            isCorrect: false,
          },
          {
            text: "Describes the table",
            isCorrect: false,
          },
        ],
      },
      {
        text: "How many rows does SELECT order_id FROM sales WHERE quantity >= 5; return for Sunrise Mart?",
        type: "multiple_choice",
        points: 1,
        explanation: "1004, 1006 and 1009",
        answers: [
          {
            text: "10",
            isCorrect: false,
          },
          {
            text: "5",
            isCorrect: false,
          },
          {
            text: "3",
            isCorrect: true,
          },
          {
            text: "0",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which filter is the same as branch = 'Central' OR branch = 'Hilltop'?",
        type: "multiple_choice",
        points: 1,
        explanation: "IN is a short OR list",
        answers: [
          {
            text: "branch BETWEEN 'Central' AND 'Hilltop'",
            isCorrect: false,
          },
          {
            text: "branch LIKE 'Central Hilltop'",
            isCorrect: false,
          },
          {
            text: "branch = 'Central' AND branch = 'Hilltop'",
            isCorrect: false,
          },
          {
            text: "branch IN ('Central', 'Hilltop')",
            isCorrect: true,
          },
        ],
      },
      {
        text: "A query returns no rows for WHERE date_of_birth = NULL, but two customers have no date of birth. What is wrong?",
        type: "multiple_choice",
        points: 1,
        explanation: "NULL is never equal to anything",
        answers: [
          {
            text: "NULL must be tested with IS NULL",
            isCorrect: true,
          },
          {
            text: "The table is empty",
            isCorrect: false,
          },
          {
            text: "NULL must be in quotes",
            isCorrect: false,
          },
          {
            text: "Dates cannot be NULL",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does SELECT COUNT(DISTINCT customer_id) FROM sales; return for Sunrise Mart?",
        type: "multiple_choice",
        points: 1,
        explanation: "Seven different customers placed the 10 orders",
        answers: [
          {
            text: "10, the number of orders",
            isCorrect: false,
          },
          {
            text: "8, the number of customers in the customers table",
            isCorrect: false,
          },
          {
            text: "7, the number of different customers who placed orders",
            isCorrect: true,
          },
          {
            text: "3, the number of branches",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is a primary key?",
        type: "multiple_choice",
        points: 1,
        explanation: "unique and never empty",
        answers: [
          {
            text: "The first column in any table",
            isCorrect: false,
          },
          {
            text: "A password for the database",
            isCorrect: false,
          },
          {
            text: "A column that links to another table",
            isCorrect: false,
          },
          {
            text: "A unique, non-empty identifier for each row",
            isCorrect: true,
          },
        ],
      },
      {
        text: "In the Sunrise Mart database, what is sales.customer_id?",
        type: "multiple_choice",
        points: 1,
        explanation: "it points to customers",
        answers: [
          {
            text: "A foreign key pointing to customers",
            isCorrect: true,
          },
          {
            text: "The primary key of sales",
            isCorrect: false,
          },
          {
            text: "A calculated column",
            isCorrect: false,
          },
          {
            text: "A data type",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why does the sales table not store a Total column?",
        type: "multiple_choice",
        points: 1,
        explanation: "calculated, so not stored",
        answers: [
          {
            text: "SQLite cannot store numbers",
            isCorrect: false,
          },
          {
            text: "Totals are secret",
            isCorrect: false,
          },
          {
            text: "It can be calculated from quantity × unit_price, so storing it risks disagreement",
            isCorrect: true,
          },
          {
            text: "It is too long",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does NULL mean?",
        type: "multiple_choice",
        points: 1,
        explanation: "missing or unknown",
        answers: [
          {
            text: "Zero",
            isCorrect: false,
          },
          {
            text: "No value, missing or unknown",
            isCorrect: true,
          },
          {
            text: "The word \"null\"",
            isCorrect: false,
          },
          {
            text: "An error",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is an advantage of a database over a spreadsheet?",
        type: "multiple_choice",
        points: 1,
        explanation: "large data, many users, column rules",
        answers: [
          {
            text: "Many users and systems can work with very large data at once, with rules on each column",
            isCorrect: true,
          },
          {
            text: "It has more colours",
            isCorrect: false,
          },
          {
            text: "It needs no structure",
            isCorrect: false,
          },
          {
            text: "It cannot be shared",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is SQLite?",
        type: "multiple_choice",
        points: 1,
        explanation: "a database in one file",
        answers: [
          {
            text: "A spreadsheet program",
            isCorrect: false,
          },
          {
            text: "A database engine that stores a whole database in one file",
            isCorrect: true,
          },
          {
            text: "A programming course",
            isCorrect: false,
          },
          {
            text: "A website",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What happens if you close DB Browser without clicking Write Changes?",
        type: "multiple_choice",
        points: 1,
        explanation: "unsaved changes are lost",
        answers: [
          {
            text: "Everything is saved automatically",
            isCorrect: false,
          },
          {
            text: "The file is deleted",
            isCorrect: false,
          },
          {
            text: "Only the tables are saved",
            isCorrect: false,
          },
          {
            text: "Your changes since the last write are lost",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What does NOT NULL mean in a CREATE TABLE statement?",
        type: "multiple_choice",
        points: 1,
        explanation: "the value cannot be missing",
        answers: [
          {
            text: "The column cannot be left empty",
            isCorrect: true,
          },
          {
            text: "The column must be zero",
            isCorrect: false,
          },
          {
            text: "The column is a number",
            isCorrect: false,
          },
          {
            text: "The column is hidden",
            isCorrect: false,
          },
        ],
      },
      {
        text: "You insert a second customer with ID C001. What happens?",
        type: "multiple_choice",
        points: 1,
        explanation: "the primary key refuses it",
        answers: [
          {
            text: "Both rows are kept",
            isCorrect: false,
          },
          {
            text: "The old row is replaced",
            isCorrect: false,
          },
          {
            text: "SQLite refuses, because customer_id is the primary key",
            isCorrect: true,
          },
          {
            text: "The ID is changed to C010",
            isCorrect: false,
          },
        ],
      },
      {
        text: "How are text values written in an INSERT statement?",
        type: "multiple_choice",
        points: 1,
        explanation: "single quotes",
        answers: [
          {
            text: "In brackets",
            isCorrect: false,
          },
          {
            text: "In capital letters",
            isCorrect: false,
          },
          {
            text: "In single quotes, like 'Hilltop'",
            isCorrect: true,
          },
          {
            text: "Without any marks",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does SELECT * FROM sales; return?",
        type: "multiple_choice",
        points: 1,
        explanation: "all columns, all rows",
        answers: [
          {
            text: "Every column and every row of sales",
            isCorrect: true,
          },
          {
            text: "Only the first row",
            isCorrect: false,
          },
          {
            text: "Only the order_id column",
            isCorrect: false,
          },
          {
            text: "The number of rows",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does AS total do in SELECT quantity * unit_price AS total?",
        type: "multiple_choice",
        points: 1,
        explanation: "names the column",
        answers: [
          {
            text: "Adds up the whole column",
            isCorrect: false,
          },
          {
            text: "Sorts the result",
            isCorrect: false,
          },
          {
            text: "Names the calculated column \"total\"",
            isCorrect: true,
          },
          {
            text: "Saves the column into the table",
            isCorrect: false,
          },
        ],
      },
      {
        text: "WHERE branch = 'hilltop' returns no rows. Why?",
        type: "multiple_choice",
        points: 1,
        explanation: "= on text is case-sensitive",
        answers: [
          {
            text: "The table is empty",
            isCorrect: false,
          },
          {
            text: "WHERE does not work with text",
            isCorrect: false,
          },
          {
            text: "The database is broken",
            isCorrect: false,
          },
          {
            text: "Text comparison is case-sensitive and the data says 'Hilltop'",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which query returns the three biggest orders?",
        type: "multiple_choice",
        points: 1,
        explanation: "DESC puts the largest first",
        answers: [
          {
            text: "... ORDER BY total LIMIT 3",
            isCorrect: false,
          },
          {
            text: "... ORDER BY total DESC LIMIT 3",
            isCorrect: true,
          },
          {
            text: "... LIMIT 3",
            isCorrect: false,
          },
          {
            text: "... WHERE total = 3",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why should LIMIT be used with ORDER BY?",
        type: "multiple_choice",
        points: 1,
        explanation: "no sort means no guaranteed order",
        answers: [
          {
            text: "LIMIT does not work without it",
            isCorrect: false,
          },
          {
            text: "It is faster",
            isCorrect: false,
          },
          {
            text: "It removes duplicates",
            isCorrect: false,
          },
          {
            text: "Without a sort, \"the first rows\" are in no guaranteed order",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which rows does WHERE branch = 'Central' AND category = 'Drinks' keep?",
        type: "multiple_choice",
        points: 1,
        explanation: "both must be true",
        answers: [
          {
            text: "All Central rows and all Drinks rows",
            isCorrect: false,
          },
          {
            text: "Only Drinks rows",
            isCorrect: false,
          },
          {
            text: "Only rows that are both Central and Drinks",
            isCorrect: true,
          },
          {
            text: "No rows",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why use brackets in (category = 'Snacks' OR category = 'Drinks') AND branch = 'Central'?",
        type: "multiple_choice",
        points: 1,
        explanation: "AND is done before OR",
        answers: [
          {
            text: "Brackets make queries faster",
            isCorrect: false,
          },
          {
            text: "SQL does AND before OR, so without brackets the meaning changes",
            isCorrect: true,
          },
          {
            text: "Brackets are required around every condition",
            isCorrect: false,
          },
          {
            text: "To sort the result",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Does BETWEEN 1000 AND 2500 include an order of exactly 2,500?",
        type: "multiple_choice",
        points: 1,
        explanation: "BETWEEN includes both ends",
        answers: [
          {
            text: "Yes, BETWEEN includes both ends",
            isCorrect: true,
          },
          {
            text: "No, only the lower end",
            isCorrect: false,
          },
          {
            text: "No, neither end",
            isCorrect: false,
          },
          {
            text: "Only for dates",
            isCorrect: false,
          },
        ],
      },
      {
        text: "How do you find customers with no date of birth?",
        type: "multiple_choice",
        points: 1,
        explanation: "IS NULL",
        answers: [
          {
            text: "WHERE date_of_birth = NULL",
            isCorrect: false,
          },
          {
            text: "WHERE date_of_birth = ''",
            isCorrect: false,
          },
          {
            text: "WHERE date_of_birth = 0",
            isCorrect: false,
          },
          {
            text: "WHERE date_of_birth IS NULL",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What does LIKE 'K%' match?",
        type: "multiple_choice",
        points: 1,
        explanation: "starts with K",
        answers: [
          {
            text: "Text that ends with K",
            isCorrect: false,
          },
          {
            text: "Text that starts with K",
            isCorrect: true,
          },
          {
            text: "Only the letter K",
            isCorrect: false,
          },
          {
            text: "Text containing a percent sign",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 6,
    moduleTitle: "SQL for Data Analysis",
    moduleDescription: "Learners move from listing rows to answering business questions: totals and averages by group, filters on those totals, joins between tables, labels with CASE, and comparisons against an average with subqueries. By the end of the week they can reproduce, in SQL, every summary they built in Excel in Module 4. All queries and results were run in SQLite.",
    lessons: [
      {
        title: "Summarising data: aggregate functions and GROUP BY",
        order: 1,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=jcoJuc5e3RE",
        content: "**Files for this lesson:** [sunrise.db](/course-files/data-analytics/sunrise.db). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** the aggregate functions COUNT, SUM, AVG, MIN and MAX, ROUND, and GROUP BY for one summary row per group.\n- **Why it matters:** managers want summaries, not 10 million rows. GROUP BY is SQL's PivotTable.\n- **After this lesson you can:** produce sales by branch, by category and by day with one query each.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nImagine sorting a pile of receipts into one pile per branch, then adding up each pile. GROUP BY makes the piles. COUNT, SUM and AVG tell you about each pile: how many receipts, how much money, the average receipt.\n\nWithout GROUP BY, an aggregate function treats the whole table as one big pile.\n\n## Learning objectives\n\n1. Use COUNT, SUM, AVG, MIN and MAX on a whole table.\n2. Round results with ROUND.\n3. Group rows with GROUP BY and calculate one result per group.\n4. Group by two columns.\n5. Follow the rule for which columns may appear in a grouped SELECT.\n\n## Main teaching content\n\n**1. Aggregate functions**\n\n| Function | Returns | Sunrise Mart example | Result |\n| --- | --- | --- | --- |\n| `COUNT(*)` | Number of rows | `SELECT COUNT(*) FROM sales;` | 10 |\n| `SUM(x)` | Total | `SUM(quantity * unit_price)` | 21550 |\n| `AVG(x)` | Average | `AVG(quantity * unit_price)` | 2155.0 |\n| `MIN(x)` | Smallest | `MIN(quantity * unit_price)` | 700 |\n| `MAX(x)` | Largest | `MAX(quantity * unit_price)` | 5000 |\n\n`COUNT(*)` counts rows; `COUNT(column)` counts only rows where that column is not NULL. All the others ignore NULLs, just like Excel's AVERAGE ignored blank ages in Lesson 4.2.\n\n`ROUND(x, 2)` rounds to two decimal places: `ROUND(AVG(quantity * unit_price), 2)`.\n\n**2. GROUP BY**\n\n```sql\nSELECT branch, SUM(quantity * unit_price) AS sales\nFROM sales\nGROUP BY branch;\n```\n\nOne row comes back for each branch, with that branch's total.\n\n**3. The grouping rule**\n\nEvery column in SELECT must either be in GROUP BY or be inside an aggregate function. `SELECT branch, category, SUM(...) ... GROUP BY branch` breaks the rule: which category should SQL show for a branch that sells three? Most databases refuse such a query. **SQLite runs it anyway and picks a value**, so the mistake is silent. Check your SELECT against your GROUP BY every time.\n\n**4. Grouping by two columns**\n\n`GROUP BY branch, category` makes one row for every branch and category combination that exists. Unlike a PivotTable, a combination with no sales (Hilltop Snacks) does not appear as a blank; it simply is not there.\n\n**5. Clause order so far**\n\nSELECT → FROM → WHERE → GROUP BY → ORDER BY → LIMIT. WHERE filters rows **before** grouping.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Aggregate function | A function that turns many values into one | A summary number | The total on a till receipt | SUM of sales |\n| GROUP BY | The clause that creates one result row per group | Sort into piles | Receipts in piles by shop | Sales by branch |\n| Grain | What one row of a result represents | The level of detail | One row per day in a diary | One row per branch |\n| ROUND | A function that rounds a number | Tidy the decimals | Rounding a bill | Average order to 2 decimals |\n| NULL handling | How functions treat missing values | Blanks are skipped | Not counting absent pupils | AVG ignores NULL ages |\n\n## Step-by-step demonstration: Sunrise Mart summaries in SQL\n\nOpen **sunrise.db**, **Execute SQL**.\n\n**1. Whole-table summary**\n\n```sql\nSELECT COUNT(*) AS orders,\n       SUM(quantity * unit_price) AS total_sales,\n       MIN(quantity * unit_price) AS smallest,\n       MAX(quantity * unit_price) AS largest,\n       ROUND(AVG(quantity * unit_price), 2) AS average_order\nFROM sales;\n```\n\nResult: 10 orders; total 21550; smallest 700; largest 5000; average 2155.0.\n\n**2. Sales by branch**\n\n```sql\nSELECT branch,\n       COUNT(*) AS orders,\n       SUM(quantity * unit_price) AS sales,\n       ROUND(AVG(quantity * unit_price), 2) AS average_order\nFROM sales\nGROUP BY branch\nORDER BY sales DESC;\n```\n\nResult:\n\n| branch | orders | sales | average\\_order |\n| --- | --- | --- | --- |\n| Hilltop | 3 | 9900 | 3300.0 |\n| Central | 4 | 7100 | 1775.0 |\n| Riverside | 3 | 4550 | 1516.67 |\n\nCompare with your Excel branch summary from Lesson 4.3: the numbers are identical. Two tools, one truth.\n\n**3. Sales by category, with units**\n\n```sql\nSELECT category,\n       COUNT(*) AS orders,\n       SUM(quantity) AS units,\n       SUM(quantity * unit_price) AS sales\nFROM sales\nGROUP BY category\nORDER BY sales DESC;\n```\n\nResult: Groceries 3 orders, 4 units, 10000; Drinks 5, 23, 8050; Snacks 2, 7, 3500.\n\n**4. Branch and category**\n\n```sql\nSELECT branch, category, SUM(quantity * unit_price) AS sales\nFROM sales\nGROUP BY branch, category\nORDER BY branch, category;\n```\n\nResult: 8 rows. Central Drinks 2100, Central Groceries 2500, Central Snacks 2500, Hilltop Drinks 4900, Hilltop Groceries 5000, Riverside Drinks 1050, Riverside Groceries 2500, Riverside Snacks 1000. There is no Hilltop Snacks row.\n\n**5. Sales by day**\n\n```sql\nSELECT order_date, COUNT(*) AS orders, SUM(quantity * unit_price) AS sales\nFROM sales\nGROUP BY order_date;\n```\n\nResult: 2026-03-02 3 orders 4900; 2026-03-03 3 orders 5650; 2026-03-04 4 orders 11000.\n\n**6. WHERE before GROUP BY**\n\n```sql\nSELECT branch, COUNT(*) AS large_orders\nFROM sales\nWHERE quantity * unit_price >= 2500\nGROUP BY branch;\n```\n\nResult: Central 2, Hilltop 2, Riverside 1. WHERE kept the 5 large orders first, then GROUP BY counted them by branch.\n\n## Practical exercise\n\n- **Task:** write three summary queries on sunrise.db.\n- **Questions:**\n  1. For each customer\\_id in sales, show the number of orders and total spend, highest spend first.\n  2. For each branch, show the number of units sold (SUM of quantity).\n  3. For Drinks only, show total sales by branch, highest first.\n- **Expected output:**\n  1. 7 rows: C006 1 order 5000; C003 2 orders 4900; C001 2 orders 3900; C005 and C007 1 order 2500 each (they tie, so either may come first); C002 2 orders 1700; C008 1 order 1050.\n  2. Central 12; Hilltop 16; Riverside 6.\n  3. Hilltop 4900; Central 2100; Riverside 1050.\n- **Submit:** your three queries and screenshots of the results.\n\n## Knowledge check\n\n1. What does `SELECT COUNT(*) FROM sales;` return for Sunrise Mart?\n   - A) 21550\n   - B) 10\n   - C) 7\n   - D) 3\n2. What does GROUP BY branch do?\n   - A) Sorts the branches alphabetically\n   - B) Deletes duplicate branches\n   - C) Filters to one branch\n   - D) Creates one result row for each branch\n3. Which query is safe and correct?\n   - A) `SELECT branch, SUM(quantity * unit_price) FROM sales GROUP BY branch;`\n   - B) `SELECT branch, category, SUM(quantity * unit_price) FROM sales GROUP BY branch;`\n   - C) `SELECT SUM(branch) FROM sales;`\n   - D) `SELECT branch FROM sales GROUP BY SUM(quantity);`\n4. A column has two NULLs among ten rows. What does AVG of that column do?\n   - A) Treats NULLs as zero\n   - B) Returns NULL\n   - C) Averages the eight non-NULL values\n   - D) Returns an error\n5. Where does WHERE go in a grouped query?\n   - A) Before GROUP BY; it filters rows before grouping\n   - B) After ORDER BY\n   - C) Inside the aggregate function\n   - D) WHERE cannot be used with GROUP BY\n\n## Lesson summary\n\n1. COUNT, SUM, AVG, MIN and MAX turn many rows into one number.\n2. GROUP BY gives one result row per group, like a PivotTable.\n3. Every SELECT column must be grouped or aggregated; SQLite will not warn you.\n4. Group by two columns for combinations; missing combinations simply do not appear.\n5. WHERE filters rows before grouping.\n\n## Completion check\n\n- [ ] My SQL branch summary matches my Excel branch summary.\n- [ ] I grouped by two columns and noticed the missing Hilltop Snacks row.\n- [ ] I wrote the three exercise queries.",
      },
      {
        title: "Filtering groups with HAVING, and business metrics",
        order: 2,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=nNrgRVIzeHg",
        content: "## Lesson introduction\n\n- **What you will study:** the difference between WHERE and HAVING, how to filter groups, and how to calculate common business metrics such as average order value, items per order and share of total.\n- **Why it matters:** questions like \"Which customers ordered more than once?\" filter on a total, which WHERE cannot do.\n- **After this lesson you can:** find groups that meet a condition and present key sales metrics.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nWHERE checks each receipt before it goes into a pile. HAVING checks each pile after it has been added up.\n\n\"Only receipts over 2,500\" is a WHERE question. \"Only branches whose pile adds up to more than 5,000\" is a HAVING question.\n\n## Learning objectives\n\n1. Explain the difference between WHERE and HAVING.\n2. Filter groups with HAVING.\n3. Use WHERE and HAVING in the same query.\n4. Calculate average order value, items per order and share of total.\n5. Write clauses in the correct order.\n\n## Main teaching content\n\n**1. WHERE or HAVING?**\n\n|  | WHERE | HAVING |\n| --- | --- | --- |\n| Filters | Individual rows | Groups |\n| Runs | Before GROUP BY | After GROUP BY |\n| Can use aggregates such as SUM? | No | Yes |\n| Example | `WHERE category = 'Drinks'` | `HAVING SUM(quantity * unit_price) > 5000` |\n\nIf you put an aggregate in WHERE, SQLite stops with the error **misuse of aggregate: COUNT()** (or SUM, and so on).\n\n**2. The full clause order**\n\nSELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT.\n\nA way to remember it: \"**S**ome **F**riendly **W**orkers **G**o **H**ome **O**n **L**unch.\"\n\n**3. Business metrics**\n\n| Metric | Formula | Sunrise Mart value |\n| --- | --- | --- |\n| Total sales (revenue) | SUM of order totals | 21,550 |\n| Number of orders | COUNT of orders | 10 |\n| Average order value (AOV) | Total sales ÷ number of orders | 2,155 |\n| Items per order | Total units ÷ number of orders | 3.4 |\n| Share of total | Group sales ÷ all sales × 100 | Hilltop 45.9% |\n| Repeat customers | Customers with more than one order | 3 of 7 |\n\n**4. Whole numbers and division**\n\nIn SQLite, dividing one whole number by another gives a whole number: `34 / 10` returns 3, not 3.4. Multiply by `1.0` first to keep decimals: `SUM(quantity) * 1.0 / COUNT(*)` returns 3.4. Checking results against a calculator catches this kind of mistake.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| HAVING | The clause that filters groups after aggregation | Check each pile | Only shops that took over 5,000 | Branches with sales over 5,000 |\n| Metric | A number that measures performance | A score | Your average exam mark | Average order value |\n| Average order value | Total sales divided by number of orders | Typical spend per order | Typical size of a shopping bill | 2,155 |\n| Repeat customer | A customer with more than one purchase | Someone who comes back | A regular at a café | C001, C002, C003 |\n| Integer division | Dividing whole numbers and dropping the remainder | Losing the decimals | 7 sweets for 2 children: 3 each | 34 / 10 = 3 in SQLite |\n\n## Step-by-step demonstration: Sunrise Mart metrics\n\n**1. The error first**\n\n```sql\nSELECT branch, COUNT(*)\nFROM sales\nWHERE COUNT(*) > 3\nGROUP BY branch;\n```\n\nSQLite stops with **misuse of aggregate: COUNT()**. WHERE cannot see groups.\n\n**2. Branches with sales over 5,000**\n\n```sql\nSELECT branch, SUM(quantity * unit_price) AS sales\nFROM sales\nGROUP BY branch\nHAVING SUM(quantity * unit_price) > 5000;\n```\n\nResult: Central 7100; Hilltop 9900. Riverside (4550) is filtered out.\n\n**3. Repeat customers**\n\n```sql\nSELECT customer_id, COUNT(*) AS orders, SUM(quantity * unit_price) AS spend\nFROM sales\nGROUP BY customer_id\nHAVING COUNT(*) > 1;\n```\n\nResult: C001 2 orders 3900; C002 2 orders 1700; C003 2 orders 4900. Three of the seven buying customers came back.\n\n**4. WHERE and HAVING together**\n\n```sql\nSELECT branch, COUNT(*) AS drinks_orders\nFROM sales\nWHERE category = 'Drinks'\nGROUP BY branch\nHAVING COUNT(*) >= 2;\n```\n\nResult: Central 2; Hilltop 2. WHERE kept the 5 Drinks orders; GROUP BY counted them per branch; HAVING kept branches with at least 2. Riverside had only 1.\n\n**5. Headline metrics**\n\n```sql\nSELECT SUM(quantity * unit_price) AS total_sales,\n       COUNT(*) AS orders,\n       ROUND(SUM(quantity * unit_price) * 1.0 / COUNT(*), 2) AS average_order_value,\n       ROUND(SUM(quantity) * 1.0 / COUNT(*), 1) AS items_per_order\nFROM sales;\n```\n\nResult: 21550; 10; 2155.0; 3.4. Remove the `* 1.0` from items\\_per\\_order and run it again: you get 3. That is integer division.\n\n**6. Share of total**\n\n```sql\nSELECT branch,\n       SUM(quantity * unit_price) AS sales,\n       ROUND(SUM(quantity * unit_price) * 100.0 /\n             (SELECT SUM(quantity * unit_price) FROM sales), 1) AS pct_of_total\nFROM sales\nGROUP BY branch\nORDER BY sales DESC;\n```\n\nResult: Hilltop 9900 45.9; Central 7100 32.9; Riverside 4550 21.1. These match the % of Grand Total PivotTable from Lesson 4.4. The query in brackets is a **subquery**; you will learn it properly in Lesson 6.4.\n\n## Practical exercise\n\n- **Task:** answer three manager questions with HAVING.\n- **Questions:**\n  1. Which categories had total sales over 5,000?\n  2. Which branches had an average order above 2,000?\n  3. How many large orders (2,500 or more) did each branch have? Show only branches with 2 or more.\n- **Expected output:**\n  1. Groceries 10000; Drinks 8050.\n  2. Hilltop 3300 only.\n  3. Central 2; Hilltop 2.\n- **Submit:** your queries, screenshots, and one sentence per question for the manager.\n\n## Knowledge check\n\n1. What is the difference between WHERE and HAVING?\n   - A) There is no difference\n   - B) HAVING works only on text\n   - C) WHERE is newer\n   - D) WHERE filters rows before grouping; HAVING filters groups after\n2. Which clause finds customers with more than one order?\n   - A) `HAVING COUNT(*) > 1`\n   - B) `WHERE COUNT(*) > 1`\n   - C) `ORDER BY COUNT(*) > 1`\n   - D) `LIMIT 1`\n3. What is the correct order of clauses?\n   - A) SELECT, WHERE, FROM, HAVING, GROUP BY\n   - B) SELECT, FROM, GROUP BY, WHERE, HAVING\n   - C) SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY\n   - D) FROM, SELECT, HAVING, WHERE, ORDER BY\n4. What is Sunrise Mart's average order value?\n   - A) 21,550\n   - B) 2,155\n   - C) 3.4\n   - D) 10\n5. In SQLite, `SELECT 34 / 10;` returns 3. Why?\n   - A) SQLite cannot divide\n   - B) Dividing two whole numbers gives a whole number\n   - C) The answer is rounded up\n   - D) It is a typing error\n\n## Lesson summary\n\n1. WHERE filters rows; HAVING filters groups.\n2. Aggregates cannot go in WHERE.\n3. The clause order is SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT.\n4. Average order value, items per order and share of total are core sales metrics.\n5. Multiply by 1.0 to avoid integer division, and check results against a calculator.\n\n## Completion check\n\n- [ ] I saw the \"misuse of aggregate\" error and fixed it with HAVING.\n- [ ] I found the three repeat customers.\n- [ ] My share-of-total results match my PivotTable.\n- [ ] I answered the three exercise questions.",
      },
      {
        title: "Combining tables with JOIN",
        order: 3,
        durationMinutes: 100,
        videoUrl: "https://www.youtube.com/watch?v=zGSv0VaOtR0",
        content: "**Files for this lesson:** [sunrise.db](/course-files/data-analytics/sunrise.db). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** INNER JOIN and LEFT JOIN, the ON condition, table aliases, and how to group joined data.\n- **Why it matters:** answers usually need more than one table. \"Sales by signup channel\" needs sales for the money and customers for the channel.\n- **After this lesson you can:** join sales to customers, summarise by any customer detail, and find customers who never bought.\n- **Estimated time:** 100 minutes.\n\n## The topic in simple English\n\nA JOIN is like matching two lists using a shared number. You hold the sales list in one hand and the customer list in the other. For each sale, you look up its customer number in the customer list and write the name next to it. That is exactly what XLOOKUP did in Lesson 4.3.\n\nAn **INNER JOIN** keeps only matches. A **LEFT JOIN** keeps everything from the first (left) list, even when there is no match, and leaves the missing details empty.\n\n## Learning objectives\n\n1. Explain what a JOIN does and why keys matter.\n2. Write an INNER JOIN with an ON condition.\n3. Use table aliases to shorten queries.\n4. Write a LEFT JOIN and find unmatched rows with IS NULL.\n5. Group and summarise joined data.\n\n## Main teaching content\n\n**1. INNER JOIN**\n\n```sql\nSELECT s.order_id, c.full_name, s.branch\nFROM sales AS s\nINNER JOIN customers AS c\n  ON s.customer_id = c.customer_id;\n```\n\n- `FROM sales AS s` gives the table a short alias, s.\n- `ON s.customer_id = c.customer_id` is the matching rule: foreign key = primary key.\n- `s.order_id` means \"order\\_id from the sales table\". Prefixing columns avoids confusion when both tables have a column with the same name, such as customer\\_id.\n- `JOIN` on its own means INNER JOIN.\n\n**2. LEFT JOIN**\n\n```sql\nSELECT c.customer_id, c.full_name, s.order_id\nFROM customers AS c\nLEFT JOIN sales AS s\n  ON s.customer_id = c.customer_id;\n```\n\nEvery customer appears. A customer with no sales appears once, with NULL in the sales columns. Adding `WHERE s.order_id IS NULL` keeps only those customers: a classic way to find \"customers who signed up but never bought\".\n\n**3. Row counts tell you what happened**\n\n| Join | Rows for Sunrise Mart | Why |\n| --- | --- | --- |\n| sales INNER JOIN customers | 10 | Every sale has a matching customer |\n| customers LEFT JOIN sales | 11 | 10 matched sale rows, plus 1 row for C009, who has no sales |\n\nAlways check the row count after a join. If it is bigger than expected, a key may be duplicated. If it is smaller, some rows did not match.\n\n**4. Grouping after a join**\n\nOnce tables are joined, you can GROUP BY any column from either table, for example sales by customer channel, or by customer city.\n\n**5. Branch is not the same as city**\n\nThe sales table records the **branch** where the order was placed. The customers table records the customer's home **city**. Amara Mensah lives in Riverside but bought once in Central. Sales by branch and sales by customer city are different questions with different answers. Say clearly which one you are reporting.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| JOIN | Combining rows from two tables using a matching rule | Matching two lists | Matching names to exam numbers | Sales with customer names |\n| INNER JOIN | A join that keeps only matching rows | Matches only | Guests who replied and came | Sales that have a customer |\n| LEFT JOIN | A join that keeps all rows from the left table | Everyone on the first list | Every invited guest, came or not | All customers, buyers or not |\n| ON | The clause that states the matching rule | How to match | \"Match on student number\" | s.customer\\_id = c.customer\\_id |\n| Table alias | A short name for a table in a query | A nickname | \"Mum\" instead of a full name | sales AS s |\n\n## Step-by-step demonstration: joining sales and customers\n\nOpen **sunrise.db**, **Execute SQL**.\n\n**1. Customer names on every order**\n\n```sql\nSELECT s.order_id, c.full_name, s.branch,\n       s.quantity * s.unit_price AS total\nFROM sales AS s\nINNER JOIN customers AS c\n  ON s.customer_id = c.customer_id\nORDER BY s.order_id;\n```\n\nResult: 10 rows, from 1001 Amara Mensah Central 1400 to 1010 John Kamau Central 700. Compare with the CustomerName column you built with XLOOKUP in Lesson 4.3: they match.\n\n**2. Sales by signup channel**\n\n```sql\nSELECT c.channel,\n       COUNT(*) AS orders,\n       SUM(s.quantity * s.unit_price) AS sales\nFROM sales AS s\nJOIN customers AS c ON s.customer_id = c.customer_id\nGROUP BY c.channel\nORDER BY sales DESC;\n```\n\nResult:\n\n| channel | orders | sales |\n| --- | --- | --- |\n| App | 3 | 8900 |\n| Branch | 4 | 6700 |\n| Website | 3 | 5950 |\n\nCustomers who joined through the App spent the most in these three days. With only 7 buying customers this is a clue, not proof.\n\n**3. Sales by customer city**\n\n```sql\nSELECT c.city, SUM(s.quantity * s.unit_price) AS sales\nFROM sales AS s\nJOIN customers AS c ON s.customer_id = c.customer_id\nGROUP BY c.city\nORDER BY sales DESC;\n```\n\nResult: Hilltop 9900; Central 6700; Riverside 4950. Compare with sales by branch (Hilltop 9900; Central 7100; Riverside 4550). Central and Riverside differ because some customers shop away from home.\n\n**4. Every customer, buyers or not**\n\n```sql\nSELECT c.customer_id, c.full_name,\n       COUNT(s.order_id) AS orders,\n       SUM(s.quantity * s.unit_price) AS spend\nFROM customers AS c\nLEFT JOIN sales AS s ON s.customer_id = c.customer_id\nGROUP BY c.customer_id, c.full_name\nORDER BY spend DESC;\n```\n\nResult: 8 rows. The last is **C009 Lindiwe Dube, 0 orders, spend empty (NULL)**. `COUNT(s.order_id)` gives 0 because it counts only non-NULL order IDs. `COUNT(*)` would wrongly give 1.\n\n**5. Customers who never bought**\n\n```sql\nSELECT c.customer_id, c.full_name, c.signup_date\nFROM customers AS c\nLEFT JOIN sales AS s ON s.customer_id = c.customer_id\nWHERE s.order_id IS NULL;\n```\n\nResult: C009 Lindiwe Dube, 2026-01-10. The marketing team could send this customer a welcome offer.\n\n**6. Check the row counts**\n\nRun `SELECT COUNT(*) FROM customers AS c INNER JOIN sales AS s ON s.customer_id = c.customer_id;` (10), then the same with LEFT JOIN (11). The difference is C009.\n\n## Practical exercise\n\n- **Task:** write three join queries on sunrise.db.\n- **Questions:**\n  1. Show each order's order\\_id, the customer's full\\_name and gender, and the category, for Hilltop orders only.\n  2. Show total sales by customer gender.\n  3. List customers from Riverside with their number of orders, including anyone with none.\n- **Expected output:**\n  1. 1004 Thandi Nkosi F Drinks; 1007 Wanjiru Otieno F Groceries; 1009 Thandi Nkosi F Drinks.\n  2. F 14850; M 6700.\n  3. Amara Mensah 2; Fatima Bello 1; Lindiwe Dube 0.\n- **Submit:** your three queries and screenshots of the results.\n\n## Knowledge check\n\n1. What does an INNER JOIN return?\n   - A) Every row from both tables\n   - B) Only rows from the first table\n   - C) Only rows that have a match in both tables\n   - D) Rows that do not match\n2. Which ON condition correctly joins sales to customers?\n   - A) `ON s.order_id = c.customer_id`\n   - B) `ON s.customer_id = c.customer_id`\n   - C) `ON s.branch = c.city`\n   - D) `ON sales = customers`\n3. customers LEFT JOIN sales returns 11 rows, but there are only 10 sales. Why?\n   - A) There is a duplicate sale\n   - B) The join is wrong\n   - C) A sale was added\n   - D) C009 has no sales but still appears once, with NULLs\n4. How do you find customers who have never bought anything?\n   - A) LEFT JOIN customers to sales and keep rows where the sales key IS NULL\n   - B) INNER JOIN and keep rows where the total is 0\n   - C) Use DISTINCT on customers\n   - D) It cannot be done in SQL\n5. Why might sales by customer city differ from sales by branch?\n   - A) The join loses rows\n   - B) SQL rounds the numbers\n   - C) Cities are text\n   - D) Some customers buy at a branch outside their home city\n\n## Lesson summary\n\n1. A JOIN matches rows using a key: foreign key = primary key.\n2. INNER JOIN keeps matches only; LEFT JOIN keeps every row of the left table.\n3. LEFT JOIN plus IS NULL finds rows with no match.\n4. Check row counts after every join.\n5. Use COUNT(column) rather than COUNT(\\*) after a LEFT JOIN, and say clearly which column you grouped by.\n\n## Completion check\n\n- [ ] My join results match my XLOOKUP results from Lesson 4.3.\n- [ ] I found C009 with a LEFT JOIN.\n- [ ] I can explain why the LEFT JOIN returns 11 rows.\n- [ ] I wrote the three exercise queries.",
      },
      {
        title: "CASE expressions and subqueries",
        order: 4,
        durationMinutes: 100,
        videoUrl: "https://www.youtube.com/watch?v=mf_IFI3I7to",
        content: "**Files for this lesson:** [sunrise.db](/course-files/data-analytics/sunrise.db). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** CASE for labelling rows inside SQL, grouping by those labels, and subqueries: a query inside another query.\n- **Why it matters:** managers think in bands (\"small, medium, large\") and comparisons (\"above average\"). CASE and subqueries let SQL answer in those terms.\n- **After this lesson you can:** band orders by size, compare each order with the average, and find rows missing from another table.\n- **Estimated time:** 100 minutes.\n\n## The topic in simple English\n\nCASE is SQL's version of Excel's IF, but it can have as many branches as you like: \"If the order is 2,500 or more, call it Large; if it is 1,000 or more, call it Medium; otherwise call it Small.\"\n\nA subquery is a question inside a question. To find \"orders above average\", SQL first answers \"What is the average?\" and then uses that answer to filter.\n\n## Learning objectives\n\n1. Write a CASE expression with several conditions and an ELSE.\n2. Group by a CASE label to count and total each band.\n3. Use CASE inside SUM to make side-by-side totals.\n4. Use a subquery that returns one value inside WHERE.\n5. Use IN and NOT IN with a subquery.\n\n## Main teaching content\n\n**1. CASE**\n\n```sql\nCASE\n  WHEN quantity * unit_price >= 2500 THEN 'Large'\n  WHEN quantity * unit_price >= 1000 THEN 'Medium'\n  ELSE 'Small'\nEND AS order_size\n```\n\n- SQL checks the WHEN lines from top to bottom and uses the **first** one that is true. So the order matters: put the highest band first.\n- ELSE catches everything else. Without ELSE, unmatched rows get NULL.\n- The whole CASE ... END is one column, named with AS.\n\n**2. Grouping by a CASE label**\n\nWrite the CASE in SELECT and group by its alias: `GROUP BY order_size`. SQLite accepts the alias in GROUP BY; some databases need you to repeat the whole CASE.\n\n**3. CASE inside SUM**\n\n`SUM(CASE WHEN category = 'Drinks' THEN quantity * unit_price ELSE 0 END) AS drinks` adds up only Drinks sales. One such column per category gives a PivotTable-style layout, with 0 instead of a blank where there are no sales.\n\n**4. Subqueries**\n\n| Type | Example | What it does |\n| --- | --- | --- |\n| One value | `WHERE quantity * unit_price > (SELECT AVG(quantity * unit_price) FROM sales)` | Compares each row with the average |\n| A list, with IN | `WHERE customer_id IN (SELECT customer_id FROM sales)` | Keeps customers who appear in sales |\n| A list, with NOT IN | `WHERE customer_id NOT IN (SELECT customer_id FROM sales)` | Keeps customers who never appear in sales |\n\nThe subquery in brackets runs first; its answer is used by the outer query.\n\n**Watch out with NOT IN:** if the subquery's list contains a NULL, NOT IN returns no rows at all. Here sales.customer\\_id is never NULL, so it is safe. When in doubt, use the LEFT JOIN and IS NULL method from Lesson 6.3.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| CASE expression | A conditional that returns a value from the first true WHEN | SQL's IF with many branches | Grading marks into A, B, C | Large, Medium, Small orders |\n| Band | A range of values given one label | A size group | Age groups at a sports club | Order size bands |\n| Subquery | A query inside another query, in brackets | A question inside a question | \"Who is taller than the average pupil?\" | Orders above the average order |\n| Scalar subquery | A subquery that returns exactly one value | One-number answer | The class average | AVG of all orders |\n| NOT IN | Keeps rows whose value is not in a list | \"Not on the list\" | Guests not on the RSVP list | Customers never in sales |\n\n## Step-by-step demonstration: banding and comparing Sunrise Mart orders\n\nOpen **sunrise.db**, **Execute SQL**.\n\n**1. Label every order**\n\n```sql\nSELECT order_id,\n       quantity * unit_price AS total,\n       CASE\n         WHEN quantity * unit_price >= 2500 THEN 'Large'\n         WHEN quantity * unit_price >= 1000 THEN 'Medium'\n         ELSE 'Small'\n       END AS order_size\nFROM sales;\n```\n\nResult: Large for 1003, 1006, 1007, 1008, 1009; Medium for 1001 (1400), 1002 (1000), 1004 (2100), 1005 (1050); Small for 1010 (700). The Large orders are the same five as in Excel's IF column in Lesson 4.3.\n\n**2. Count and total each band**\n\n```sql\nSELECT CASE\n         WHEN quantity * unit_price >= 2500 THEN 'Large'\n         WHEN quantity * unit_price >= 1000 THEN 'Medium'\n         ELSE 'Small'\n       END AS order_size,\n       COUNT(*) AS orders,\n       SUM(quantity * unit_price) AS sales\nFROM sales\nGROUP BY order_size\nORDER BY sales DESC;\n```\n\nResult: Large 5 orders 15300; Medium 4 orders 5550; Small 1 order 700. Half the orders bring in about 71% of the money (15,300 of 21,550).\n\n**3. A PivotTable layout with CASE**\n\n```sql\nSELECT branch,\n       SUM(CASE WHEN category = 'Drinks' THEN quantity * unit_price ELSE 0 END) AS drinks,\n       SUM(CASE WHEN category = 'Groceries' THEN quantity * unit_price ELSE 0 END) AS groceries,\n       SUM(CASE WHEN category = 'Snacks' THEN quantity * unit_price ELSE 0 END) AS snacks\nFROM sales\nGROUP BY branch;\n```\n\nResult: Central 2100, 2500, 2500; Hilltop 4900, 5000, 0; Riverside 1050, 2500, 1000. This is your Lesson 4.4 PivotTable, with 0 for Hilltop Snacks.\n\n**4. Orders above the average**\n\nFirst run the inner question alone: `SELECT AVG(quantity * unit_price) FROM sales;` Result: 2155.0. Then use it as a subquery:\n\n```sql\nSELECT order_id, branch, quantity * unit_price AS total\nFROM sales\nWHERE quantity * unit_price > (SELECT AVG(quantity * unit_price) FROM sales)\nORDER BY total DESC, order_id;\n```\n\nResult: 1007 Hilltop 5000; 1009 Hilltop 2800; 1003 Central 2500; 1006 Central 2500; 1008 Riverside 2500. If tomorrow's orders change the average, the query still works; you never type 2155 by hand.\n\n**5. Customers who never bought, with NOT IN**\n\n```sql\nSELECT customer_id, full_name\nFROM customers\nWHERE customer_id NOT IN (SELECT customer_id FROM sales);\n```\n\nResult: C009 Lindiwe Dube, the same answer as the LEFT JOIN in Lesson 6.3. Two methods agreeing is a good check.\n\n## Practical exercise\n\n- **Task:** write three queries using CASE and subqueries.\n- **Questions:**\n  1. Label each customer's age group on 31 March 2026: NULL dates of birth as \"Unknown\", dates on or before 1996-03-31 as \"30 and over\", and the rest as \"Under 30\". Count customers in each group.\n  2. List orders whose quantity is above the average quantity per order.\n  3. List the names of customers who placed at least one Drinks order, using IN with a subquery.\n- **Expected output:**\n  1. 30 and over 3 (C002, C006, C008); Under 30 3 (C001, C003, C009); Unknown 2 (C005, C007). The IS NULL test must come first in the CASE. These groups agree with the ages you calculated in Lesson 4.2.\n  2. The average quantity is 3.4, so: 1001 (4), 1004 (6), 1006 (5), 1009 (8).\n  3. Amara Mensah, John Kamau, Thandi Nkosi, Fatima Bello.\n- **Submit:** your three queries and screenshots of the results.\n\n## Knowledge check\n\n1. In a CASE expression, which WHEN is used if more than one is true?\n   - A) The first true one, from the top\n   - B) The last true one\n   - C) All of them\n   - D) None; it returns an error\n2. What happens to a row that matches no WHEN, if there is no ELSE?\n   - A) It is deleted\n   - B) It is labelled 'Small'\n   - C) It gets NULL\n   - D) The query fails\n3. What does `(SELECT AVG(quantity * unit_price) FROM sales)` return?\n   - A) A list of all order totals\n   - B) One value: the average order, 2155.0\n   - C) The number of orders\n   - D) The largest order\n4. Which query lists customers who never bought?\n   - A) `SELECT * FROM customers WHERE customer_id IN (SELECT customer_id FROM sales);`\n   - B) `SELECT DISTINCT customer_id FROM sales;`\n   - C) `SELECT * FROM sales WHERE customer_id IS NULL;`\n   - D) `SELECT * FROM customers WHERE customer_id NOT IN (SELECT customer_id FROM sales);`\n5. Why write the subquery instead of typing 2155 into the query?\n   - A) Typing numbers is not allowed in SQL\n   - B) Subqueries run faster\n   - C) The query stays correct when the data, and so the average, changes\n   - D) 2155 is a secret\n\n## Lesson summary\n\n1. CASE labels rows using the first true WHEN; always add ELSE.\n2. Group by a CASE label to summarise bands.\n3. SUM with CASE builds side-by-side totals, like a PivotTable.\n4. A subquery answers an inner question first, such as the average.\n5. IN and NOT IN compare with a list; prefer LEFT JOIN and IS NULL if the list could contain NULLs.\n\n## Completion check\n\n- [ ] I banded the orders and got 5 Large, 4 Medium and 1 Small.\n- [ ] My CASE layout matches my PivotTable.\n- [ ] I found the five above-average orders with a subquery.\n- [ ] I wrote the three exercise queries.",
      },
    ],
    assignmentTitle: "Harbour Bank transaction analysis",
    assignmentDescription: "Harbour Bank's operations manager wants a picture of one month of account activity: which channels are busiest, how personal and business customers differ, which accounts are inactive, and whether any transactions look unusual enough for the fraud team to check.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "Which query gives total sales for each branch?",
        type: "multiple_choice",
        points: 1,
        explanation: "GROUP BY branch with SUM",
        answers: [
          {
            text: "SELECT branch, quantity * unit_price FROM sales;",
            isCorrect: false,
          },
          {
            text: "SELECT SUM(quantity * unit_price) FROM sales;",
            isCorrect: false,
          },
          {
            text: "SELECT branch FROM sales ORDER BY branch;",
            isCorrect: false,
          },
          {
            text: "SELECT branch, SUM(quantity * unit_price) FROM sales GROUP BY branch;",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which clause keeps only branches with total sales over 5,000?",
        type: "multiple_choice",
        points: 1,
        explanation: "Aggregates are filtered with HAVING",
        answers: [
          {
            text: "WHERE SUM(quantity * unit_price) > 5000",
            isCorrect: false,
          },
          {
            text: "HAVING SUM(quantity * unit_price) > 5000",
            isCorrect: true,
          },
          {
            text: "ORDER BY SUM(quantity * unit_price) > 5000",
            isCorrect: false,
          },
          {
            text: "LIMIT 5000",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the correct order of these clauses?",
        type: "multiple_choice",
        points: 1,
        explanation: "WHERE, GROUP BY, HAVING, ORDER BY",
        answers: [
          {
            text: "WHERE, GROUP BY, HAVING, ORDER BY",
            isCorrect: true,
          },
          {
            text: "GROUP BY, WHERE, ORDER BY, HAVING",
            isCorrect: false,
          },
          {
            text: "HAVING, WHERE, GROUP BY, ORDER BY",
            isCorrect: false,
          },
          {
            text: "ORDER BY, HAVING, GROUP BY, WHERE",
            isCorrect: false,
          },
        ],
      },
      {
        text: "In SQLite, what does SELECT 7 / 2; return?",
        type: "multiple_choice",
        points: 1,
        explanation: "Two whole numbers give a whole number",
        answers: [
          {
            text: "3.5",
            isCorrect: false,
          },
          {
            text: "4",
            isCorrect: false,
          },
          {
            text: "3",
            isCorrect: true,
          },
          {
            text: "An error",
            isCorrect: false,
          },
        ],
      },
      {
        text: "You need each sale with its customer's channel. Which join keeps only sales that have a matching customer?",
        type: "multiple_choice",
        points: 1,
        explanation: "INNER JOIN keeps matches only",
        answers: [
          {
            text: "A LEFT JOIN from customers to sales",
            isCorrect: false,
          },
          {
            text: "An INNER JOIN between sales and customers on customer_id",
            isCorrect: true,
          },
          {
            text: "A join on branch = city",
            isCorrect: false,
          },
          {
            text: "No join is needed",
            isCorrect: false,
          },
        ],
      },
      {
        text: "customers LEFT JOIN sales, with WHERE s.order_id IS NULL, returns what?",
        type: "multiple_choice",
        points: 1,
        explanation: "The unmatched customers",
        answers: [
          {
            text: "Every sale",
            isCorrect: false,
          },
          {
            text: "Sales with no customer",
            isCorrect: false,
          },
          {
            text: "Nothing, ever",
            isCorrect: false,
          },
          {
            text: "Customers who have no sales",
            isCorrect: true,
          },
        ],
      },
      {
        text: "A CASE has WHEN total >= 1000 THEN 'Medium' above WHEN total >= 2500 THEN 'Large'. What happens to an order of 5,000?",
        type: "multiple_choice",
        points: 1,
        explanation: "The first true WHEN wins, so put the highest band first",
        answers: [
          {
            text: "It is labelled Medium, because the first true WHEN wins",
            isCorrect: true,
          },
          {
            text: "It is labelled Large",
            isCorrect: false,
          },
          {
            text: "It gets NULL",
            isCorrect: false,
          },
          {
            text: "The query fails",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which query finds orders above the average order?",
        type: "multiple_choice",
        points: 1,
        explanation: "A subquery supplies the average",
        answers: [
          {
            text: "... WHERE total > AVG(total)",
            isCorrect: false,
          },
          {
            text: "... HAVING total > 2155",
            isCorrect: false,
          },
          {
            text: "... WHERE quantity * unit_price > (SELECT AVG(quantity * unit_price) FROM sales)",
            isCorrect: true,
          },
          {
            text: "... ORDER BY AVG(total)",
            isCorrect: false,
          },
        ],
      },
      {
        text: "After a LEFT JOIN, why use COUNT(s.order_id) rather than COUNT(*) to count each customer's orders?",
        type: "multiple_choice",
        points: 1,
        explanation: "COUNT(*) counts the NULL row",
        answers: [
          {
            text: "COUNT(*) is slower",
            isCorrect: false,
          },
          {
            text: "COUNT(s.order_id) includes NULLs",
            isCorrect: false,
          },
          {
            text: "COUNT(*) only works on one table",
            isCorrect: false,
          },
          {
            text: "COUNT(*) counts the NULL row as 1 for a customer with no orders",
            isCorrect: true,
          },
        ],
      },
      {
        text: "SQLite runs SELECT branch, category, SUM(quantity) FROM sales GROUP BY branch; without an error. What is the problem?",
        type: "multiple_choice",
        points: 1,
        explanation: "SQLite picks a category without warning",
        answers: [
          {
            text: "category is neither grouped nor aggregated, so the category shown is arbitrary",
            isCorrect: true,
          },
          {
            text: "There is no problem",
            isCorrect: false,
          },
          {
            text: "SUM cannot be used with GROUP BY",
            isCorrect: false,
          },
          {
            text: "branch should be inside SUM",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does SELECT COUNT(*) FROM sales; return for Sunrise Mart?",
        type: "multiple_choice",
        points: 1,
        explanation: "10 rows",
        answers: [
          {
            text: "21550",
            isCorrect: false,
          },
          {
            text: "10",
            isCorrect: true,
          },
          {
            text: "7",
            isCorrect: false,
          },
          {
            text: "3",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does GROUP BY branch do?",
        type: "multiple_choice",
        points: 1,
        explanation: "one row per branch",
        answers: [
          {
            text: "Sorts the branches alphabetically",
            isCorrect: false,
          },
          {
            text: "Deletes duplicate branches",
            isCorrect: false,
          },
          {
            text: "Filters to one branch",
            isCorrect: false,
          },
          {
            text: "Creates one result row for each branch",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which query is safe and correct?",
        type: "multiple_choice",
        points: 1,
        explanation: "every column grouped or aggregated",
        answers: [
          {
            text: "SELECT branch, SUM(quantity * unit_price) FROM sales GROUP BY branch;",
            isCorrect: true,
          },
          {
            text: "SELECT branch, category, SUM(quantity * unit_price) FROM sales GROUP BY branch;",
            isCorrect: false,
          },
          {
            text: "SELECT SUM(branch) FROM sales;",
            isCorrect: false,
          },
          {
            text: "SELECT branch FROM sales GROUP BY SUM(quantity);",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A column has two NULLs among ten rows. What does AVG of that column do?",
        type: "multiple_choice",
        points: 1,
        explanation: "NULLs are skipped",
        answers: [
          {
            text: "Treats NULLs as zero",
            isCorrect: false,
          },
          {
            text: "Returns NULL",
            isCorrect: false,
          },
          {
            text: "Averages the eight non-NULL values",
            isCorrect: true,
          },
          {
            text: "Returns an error",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Where does WHERE go in a grouped query?",
        type: "multiple_choice",
        points: 1,
        explanation: "WHERE filters before grouping",
        answers: [
          {
            text: "Before GROUP BY; it filters rows before grouping",
            isCorrect: true,
          },
          {
            text: "After ORDER BY",
            isCorrect: false,
          },
          {
            text: "Inside the aggregate function",
            isCorrect: false,
          },
          {
            text: "WHERE cannot be used with GROUP BY",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the difference between WHERE and HAVING?",
        type: "multiple_choice",
        points: 1,
        explanation: "rows before, groups after",
        answers: [
          {
            text: "There is no difference",
            isCorrect: false,
          },
          {
            text: "HAVING works only on text",
            isCorrect: false,
          },
          {
            text: "WHERE is newer",
            isCorrect: false,
          },
          {
            text: "WHERE filters rows before grouping; HAVING filters groups after",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which clause finds customers with more than one order?",
        type: "multiple_choice",
        points: 1,
        explanation: "HAVING filters groups",
        answers: [
          {
            text: "HAVING COUNT(*) > 1",
            isCorrect: true,
          },
          {
            text: "WHERE COUNT(*) > 1",
            isCorrect: false,
          },
          {
            text: "ORDER BY COUNT(*) > 1",
            isCorrect: false,
          },
          {
            text: "LIMIT 1",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the correct order of clauses?",
        type: "multiple_choice",
        points: 1,
        explanation: "S F W G H O L",
        answers: [
          {
            text: "SELECT, WHERE, FROM, HAVING, GROUP BY",
            isCorrect: false,
          },
          {
            text: "SELECT, FROM, GROUP BY, WHERE, HAVING",
            isCorrect: false,
          },
          {
            text: "SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY",
            isCorrect: true,
          },
          {
            text: "FROM, SELECT, HAVING, WHERE, ORDER BY",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is Sunrise Mart's average order value?",
        type: "multiple_choice",
        points: 1,
        explanation: "21,550 ÷ 10",
        answers: [
          {
            text: "21,550",
            isCorrect: false,
          },
          {
            text: "2,155",
            isCorrect: true,
          },
          {
            text: "3.4",
            isCorrect: false,
          },
          {
            text: "10",
            isCorrect: false,
          },
        ],
      },
      {
        text: "In SQLite, SELECT 34 / 10; returns 3. Why?",
        type: "multiple_choice",
        points: 1,
        explanation: "integer division",
        answers: [
          {
            text: "SQLite cannot divide",
            isCorrect: false,
          },
          {
            text: "Dividing two whole numbers gives a whole number",
            isCorrect: true,
          },
          {
            text: "The answer is rounded up",
            isCorrect: false,
          },
          {
            text: "It is a typing error",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does an INNER JOIN return?",
        type: "multiple_choice",
        points: 1,
        explanation: "matches only",
        answers: [
          {
            text: "Every row from both tables",
            isCorrect: false,
          },
          {
            text: "Only rows from the first table",
            isCorrect: false,
          },
          {
            text: "Only rows that have a match in both tables",
            isCorrect: true,
          },
          {
            text: "Rows that do not match",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which ON condition correctly joins sales to customers?",
        type: "multiple_choice",
        points: 1,
        explanation: "foreign key = primary key",
        answers: [
          {
            text: "ON s.order_id = c.customer_id",
            isCorrect: false,
          },
          {
            text: "ON s.customer_id = c.customer_id",
            isCorrect: true,
          },
          {
            text: "ON s.branch = c.city",
            isCorrect: false,
          },
          {
            text: "ON sales = customers",
            isCorrect: false,
          },
        ],
      },
      {
        text: "customers LEFT JOIN sales returns 11 rows, but there are only 10 sales. Why?",
        type: "multiple_choice",
        points: 1,
        explanation: "C009 adds one row of NULLs",
        answers: [
          {
            text: "There is a duplicate sale",
            isCorrect: false,
          },
          {
            text: "The join is wrong",
            isCorrect: false,
          },
          {
            text: "A sale was added",
            isCorrect: false,
          },
          {
            text: "C009 has no sales but still appears once, with NULLs",
            isCorrect: true,
          },
        ],
      },
      {
        text: "How do you find customers who have never bought anything?",
        type: "multiple_choice",
        points: 1,
        explanation: "LEFT JOIN plus IS NULL",
        answers: [
          {
            text: "LEFT JOIN customers to sales and keep rows where the sales key IS NULL",
            isCorrect: true,
          },
          {
            text: "INNER JOIN and keep rows where the total is 0",
            isCorrect: false,
          },
          {
            text: "Use DISTINCT on customers",
            isCorrect: false,
          },
          {
            text: "It cannot be done in SQL",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why might sales by customer city differ from sales by branch?",
        type: "multiple_choice",
        points: 1,
        explanation: "people shop away from home",
        answers: [
          {
            text: "The join loses rows",
            isCorrect: false,
          },
          {
            text: "SQL rounds the numbers",
            isCorrect: false,
          },
          {
            text: "Cities are text",
            isCorrect: false,
          },
          {
            text: "Some customers buy at a branch outside their home city",
            isCorrect: true,
          },
        ],
      },
      {
        text: "In a CASE expression, which WHEN is used if more than one is true?",
        type: "multiple_choice",
        points: 1,
        explanation: "the first true WHEN",
        answers: [
          {
            text: "The first true one, from the top",
            isCorrect: true,
          },
          {
            text: "The last true one",
            isCorrect: false,
          },
          {
            text: "All of them",
            isCorrect: false,
          },
          {
            text: "None; it returns an error",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What happens to a row that matches no WHEN, if there is no ELSE?",
        type: "multiple_choice",
        points: 1,
        explanation: "NULL",
        answers: [
          {
            text: "It is deleted",
            isCorrect: false,
          },
          {
            text: "It is labelled 'Small'",
            isCorrect: false,
          },
          {
            text: "It gets NULL",
            isCorrect: true,
          },
          {
            text: "The query fails",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does (SELECT AVG(quantity * unit_price) FROM sales) return?",
        type: "multiple_choice",
        points: 1,
        explanation: "one value, 2155.0",
        answers: [
          {
            text: "A list of all order totals",
            isCorrect: false,
          },
          {
            text: "One value: the average order, 2155.0",
            isCorrect: true,
          },
          {
            text: "The number of orders",
            isCorrect: false,
          },
          {
            text: "The largest order",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which query lists customers who never bought?",
        type: "multiple_choice",
        points: 1,
        explanation: "NOT IN the list of buyers",
        answers: [
          {
            text: "SELECT * FROM customers WHERE customer_id IN (SELECT customer_id FROM sales);",
            isCorrect: false,
          },
          {
            text: "SELECT DISTINCT customer_id FROM sales;",
            isCorrect: false,
          },
          {
            text: "SELECT * FROM sales WHERE customer_id IS NULL;",
            isCorrect: false,
          },
          {
            text: "SELECT * FROM customers WHERE customer_id NOT IN (SELECT customer_id FROM sales);",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Why write the subquery instead of typing 2155 into the query?",
        type: "multiple_choice",
        points: 1,
        explanation: "stays right as data changes",
        answers: [
          {
            text: "Typing numbers is not allowed in SQL",
            isCorrect: false,
          },
          {
            text: "Subqueries run faster",
            isCorrect: false,
          },
          {
            text: "The query stays correct when the data, and so the average, changes",
            isCorrect: true,
          },
          {
            text: "2155 is a secret",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 7,
    moduleTitle: "Introduction to Statistics for Data Analytics",
    moduleDescription: "Learners meet the few statistical ideas an analyst uses every day: averages, spread, percentages and growth, and correlation. The maths is kept to what Excel can calculate, and the focus is on choosing the right number and not being misled by it. All figures in this module were recalculated in a separate program; Excel's QUARTILE.INC, STDEV.S and CORREL use the same methods.",
    lessons: [
      {
        title: "Mean, median and mode",
        order: 1,
        durationMinutes: 75,
        videoUrl: "https://www.youtube.com/watch?v=B1HEzNTGeZ4",
        content: "## Lesson introduction\n\n- **What you will study:** the three kinds of average, how one extreme value can pull the mean, and which average to report.\n- **Why it matters:** \"the average order\" sounds like one number, but the mean, median and mode can tell three different stories. Choosing badly can mislead a manager.\n- **After this lesson you can:** calculate all three in Excel and explain which one best describes the data.\n- **Estimated time:** 75 minutes.\n\n## The topic in simple English\n\nAn average is one number that stands for a whole list.\n\n- The **mean** shares everything out equally: add up all the values and divide by how many there are.\n- The **median** is the middle value when the list is put in order.\n- The **mode** is the value that appears most often.\n\nImagine ten people in a room earning modest salaries. A very rich person walks in. The mean salary jumps; the median hardly moves. That is why the median is often the fairer \"typical\" value.\n\n## Learning objectives\n\n1. Calculate the mean, median and mode by hand and in Excel.\n2. Explain what an outlier is and how it affects each average.\n3. Choose the most suitable average for a dataset.\n4. Report an average with the right context: how many values, and whether there are outliers.\n\n## Main teaching content\n\n**1. The mean**\n\n- **What it means:** total ÷ count. In Excel, `=AVERAGE(range)`.\n- **Why it is useful:** it uses every value, and it links directly to totals: mean × count = total.\n- **Weakness:** one very large or very small value pulls it.\n- **Business example:** average order value (Lesson 6.2) is a mean.\n\n**2. The median**\n\n- **What it means:** the middle value of the sorted list. With an even number of values, it is the mean of the two middle ones. In Excel, `=MEDIAN(range)`.\n- **Why it is useful:** extreme values hardly affect it.\n- **Business example:** typical house prices and typical salaries are usually reported as medians.\n\n**3. The mode**\n\n- **What it means:** the most common value. In Excel, `=MODE.SNGL(range)` for numbers.\n- **Why it is useful:** it works for categories too, such as the most popular payment method.\n- **Weakness:** there may be no mode, or several.\n\n**4. Outliers**\n\nAn **outlier** is a value far from the rest. It might be an error (a typing mistake), or real and important (one huge order). Never delete an outlier just because it is inconvenient: check it, then decide, and say what you did.\n\n**5. Which average should you report?**\n\n| Situation | Best choice |\n| --- | --- |\n| Values fairly even, no extreme values | Mean |\n| A few very large or very small values | Median, and mention the outliers |\n| Categories, or \"most common\" questions | Mode |\n| You need to link back to totals | Mean |\n\nWhen in doubt, report the mean and the median together. If they are far apart, the data is lopsided, and that is worth saying.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Mean | Sum of values divided by their count | Share it out equally | Splitting a bill evenly | Average order value |\n| Median | The middle value of the sorted data | The one in the middle | The middle child by age | Typical order size |\n| Mode | The most frequent value | The most common | The most popular shirt size | Most common order total |\n| Outlier | A value far from the others | The odd one out | A very tall person in a class photo | A 5,000 order among 1,000s |\n| Skewed data | Data with a long tail on one side | Lopsided | A few very rich people in a town | A few very large orders |\n\n## Step-by-step demonstration: what is a typical Sunrise Mart order?\n\n1. Open **Sunrise Mart analysis**, **Sales** sheet. The order totals are in H2:H11.\n2. In K15 type **Mean**, and in L15 `=AVERAGE(H2:H11)`. Result: **2,155**.\n3. In K16 type **Median**, and in L16 `=MEDIAN(H2:H11)`. Result: **2,300**.\n4. In K17 type **Mode**, and in L17 `=MODE.SNGL(H2:H11)`. Result: **2,500** (three orders).\n5. **Check the median by hand.** Sorted, the totals are 700, 1,000, 1,050, 1,400, 2,100, 2,500, 2,500, 2,500, 2,800, 5,000. The two middle values are 2,100 and 2,500, so the median is (2,100 + 2,500) ÷ 2 = 2,300.\n6. **Test the outlier.** Copy H2:H11 to a spare column, delete the 5,000 (order 1007) from the copy, and recalculate. Mean: **1,838.89**; median: **2,100**. Removing one order moved the mean by more than 300, and the median by 200.\n7. **Write the sentence for the manager:** \"Across 10 orders, the median order was 2,300 and the mean 2,155. One large Hilltop order of 5,000 is well above the rest; it is genuine, so it stays in.\"\n\n## Practical exercise\n\n- **Task:** find the typical monthly revenue at Brightpath Services.\n- **Data:** your Brightpath workbook from Module 3. Department revenues for January to April are: Consulting 120,000, 110,000, 135,000, 128,000; Training 60,000, 72,000, 66,000, 80,000; IT Support 45,000, 48,000, 52,000, 50,000.\n- **Steps:** for the 12 department-month revenues, calculate the mean and median, and say which better describes a \"typical\" department-month and why.\n- **Expected output:** mean 80,500; median 69,000. The mean is higher because Consulting's large figures pull it up; the median is the better \"typical\" value, but neither describes any single department well. Better still, report each department separately.\n- **Submit:** a screenshot and two sentences.\n\n## Knowledge check\n\n1. What is the median of 3, 8, 1, 9, 4?\n   - A) 5\n   - B) 4\n   - C) 9\n   - D) 25\n2. Which average is least affected by one very large value?\n   - A) The median\n   - B) The mean\n   - C) The total\n   - D) The maximum\n3. Which Excel function gives the most common number in a range?\n   - A) `=MEDIAN()`\n   - B) `=AVERAGE()`\n   - C) `=COUNT()`\n   - D) `=MODE.SNGL()`\n4. You find an order of 5,000 when most are around 2,000. What should you do first?\n   - A) Delete it\n   - B) Replace it with the mean\n   - C) Check whether it is genuine or an error\n   - D) Ignore averages\n5. The mean of Sunrise Mart orders is 2,155 and the median is 2,300. What is the best way to report this?\n   - A) Report only the mean\n   - B) Report both, with the number of orders and a note on the large order\n   - C) Report only the mode\n   - D) Round both to 2,000\n\n## Lesson summary\n\n1. The mean is total ÷ count; the median is the middle value; the mode is the most common.\n2. Outliers pull the mean but hardly move the median.\n3. Check outliers before deciding what to do with them, and say what you did.\n4. When in doubt, report the mean and median together, with the count.\n\n## Completion check\n\n- [ ] I calculated all three averages for Sunrise Mart.\n- [ ] I saw how one order changes the mean.\n- [ ] I completed the Brightpath exercise.",
      },
      {
        title: "Spread: range, quartiles and standard deviation",
        order: 2,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=qNKOi08NxHs",
        content: "## Lesson introduction\n\n- **What you will study:** how to measure how spread out data is, using the range, quartiles and interquartile range (IQR), and the standard deviation. You will also use a simple rule to flag outliers.\n- **Why it matters:** two branches can have the same average and very different behaviour. Spread tells you how predictable something is, and helps you spot unusual values.\n- **After this lesson you can:** describe the spread of a dataset and flag unusual values with a clear rule.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nTwo buses both arrive \"on average\" at 8:00. One always comes between 7:58 and 8:02. The other comes anywhere between 7:30 and 8:30. Same average, very different experience. Spread measures that difference.\n\nThe **range** is the gap between the smallest and largest value. **Quartiles** cut the sorted list into four equal parts; the middle half lies between the first quartile (Q1) and the third quartile (Q3). The **standard deviation** is roughly the typical distance of values from the mean.\n\n## Learning objectives\n\n1. Calculate the range and quartiles in Excel.\n2. Calculate the interquartile range and use it to flag outliers.\n3. Calculate and interpret the standard deviation.\n4. Compare the spread of two groups fairly.\n\n## Main teaching content\n\n**1. Range**\n\nRange = maximum − minimum. It is quick, but it depends on just two values, so a single outlier changes it completely.\n\n**2. Quartiles and the interquartile range**\n\n- Q1 (`=QUARTILE.INC(range,1)`): a quarter of the values are below it.\n- Q2 is the median.\n- Q3 (`=QUARTILE.INC(range,3)`): three-quarters are below it.\n- **IQR = Q3 − Q1**: the spread of the middle half. Outliers do not affect it much.\n\n**3. The 1.5 × IQR rule for outliers**\n\nA common rule of thumb flags a value as a possible outlier if it is:\n\n- above Q3 + 1.5 × IQR (the upper fence), or\n- below Q1 − 1.5 × IQR (the lower fence).\n\nIt is a rule for **flagging**, not for deleting. A flagged value needs a closer look.\n\n**4. Standard deviation**\n\n- **What it means:** roughly how far a typical value sits from the mean. Small = values are close together; large = they are spread out.\n- **In Excel:** `=STDEV.S(range)` when your data is a sample (most business data); `=STDEV.P(range)` only when you truly have every value that exists. The two give slightly different answers.\n- **Comparing groups with different sizes:** divide the standard deviation by the mean to get the **coefficient of variation** (CV). A CV of 0.2 means values typically vary by about 20% of the mean.\n\n**5. Box plots**\n\nA box plot draws Q1, the median and Q3 as a box, with lines (\"whiskers\") out to the smallest and largest values that are not outliers. Excel's **Box and Whisker** chart draws one (Insert, Charts, Statistical) in desktop Excel; check whether your Excel for the web shows it. You will meet charts properly in Module 8.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Spread | How far values are scattered | How different values are | Bus arrival times | Transaction sizes |\n| Range | Maximum minus minimum | Biggest minus smallest | Hottest minus coldest day | 5,000 − 700 = 4,300 |\n| Quartile | A value that splits sorted data into quarters | Quarter markers | Runners in the first quarter of a race | Q1 of order totals |\n| Interquartile range | Q3 − Q1 | Spread of the middle half | The middle half of a class's heights | IQR of transactions |\n| Standard deviation | A measure of typical distance from the mean | Typical wobble | How much your journey time varies | Variation in daily sales |\n\n## Step-by-step demonstration: personal and business transactions at Harbour Bank\n\nHarbour Bank's operations team wants to know how predictable transaction sizes are for personal and business accounts. You will use the 20 March transactions from the Module 6 assignment.\n\n1. In a new workbook called **Harbour statistics**, type two columns:\n   - **Personal** (A2:A13): 500, 200, 150, 250, 100, 120, 80, 2400, 60, 90, 100, 1500\n   - **Business** (B2:B9): 8000, 3500, 4200, 7500, 1800, 2500, 1500, 2200\n2. In D1:F1 type the headings Measure, Personal, Business. In D2:D12 type: Count, Mean, Median, Min, Max, Range, Q1, Q3, IQR, Upper fence, Standard deviation.\n3. Fill column E for Personal: `=COUNT(A2:A13)`, `=AVERAGE(A2:A13)`, `=MEDIAN(A2:A13)`, `=MIN(A2:A13)`, `=MAX(A2:A13)`, `=E6-E5`, `=QUARTILE.INC(A2:A13,1)`, `=QUARTILE.INC(A2:A13,3)`, `=E9-E8`, `=E9+1.5*E10`, `=STDEV.S(A2:A13)`. Do the same in column F for B2:B9.\n4. **Check:**\n\n| Measure | Personal | Business |\n| --- | --- | --- |\n| Count | 12 | 8 |\n| Mean | 462.5 | 3,900 |\n| Median | 135 | 3,000 |\n| Min / Max | 60 / 2,400 | 1,500 / 8,000 |\n| Range | 2,340 | 6,500 |\n| Q1 / Q3 | 97.5 / 312.5 | 2,100 / 5,025 |\n| IQR | 215 | 2,925 |\n| Upper fence | 635 | 9,412.5 |\n| Standard deviation | 730.54 | 2,536.59 |\n\n5. **Flag outliers.** In C2 type `=IF(A2>$E$11,\"Check\",\"\")` and copy down to C13. Two personal transactions are flagged: **2,400** and **1,500**. These are T008 and T020, the same two you found with a SQL subquery in Module 6. No business transaction is above its fence of 9,412.5.\n6. **Compare fairly.** Business amounts have a much larger standard deviation, but they are also much larger. Calculate the CV: Personal 730.54 ÷ 462.5 = **1.58**; Business 2,536.59 ÷ 3,900 = **0.65**. Relative to their size, personal transactions are the less predictable.\n7. Notice that the personal mean (462.5) is more than three times the median (135). Two large transactions pull the mean up; the median describes a typical personal transaction better.\n\n## Practical exercise\n\n- **Task:** describe the spread of Sunrise Mart order totals.\n- **Data:** the 10 order totals in Sales!H2:H11.\n- **Steps:** calculate the range, Q1, Q3, IQR, upper fence, standard deviation (STDEV.S) and CV. Flag any order above the upper fence.\n- **Expected output:** range 4,300; Q1 1,137.5; Q3 2,500; IQR 1,362.5; upper fence 4,543.75; standard deviation 1,252.21; CV 0.58. One order is flagged: **1007 (5,000)**, the same order you tested in Lesson 7.1.\n- **Submit:** a screenshot and one sentence on what the flag means.\n\n## Knowledge check\n\n1. What does the range measure?\n   - A) The middle value\n   - B) The most common value\n   - C) The gap between the largest and smallest values\n   - D) The total\n2. Q1 is 2,100 and Q3 is 5,025. What is the IQR?\n   - A) 7,125\n   - B) 3,562.5\n   - C) 2,100\n   - D) 2,925\n3. Which Excel function should you normally use for the standard deviation of business data?\n   - A) `=STDEV.S()`\n   - B) `=STDEV.P()`\n   - C) `=MEDIAN()`\n   - D) `=QUARTILE.INC()`\n4. A value is above Q3 + 1.5 × IQR. What should you do?\n   - A) Delete it\n   - B) Flag it and check it\n   - C) Replace it with the median\n   - D) Nothing; it is normal\n5. Why compare groups with the coefficient of variation rather than the standard deviation alone?\n   - A) It adjusts for groups whose values are of very different sizes\n   - B) It is easier to type\n   - C) It ignores outliers\n   - D) It is always smaller\n\n## Lesson summary\n\n1. Spread shows how predictable data is; averages alone hide it.\n2. The range is quick but fragile; the IQR describes the middle half.\n3. The 1.5 × IQR rule flags possible outliers for checking.\n4. Standard deviation is the typical distance from the mean; use STDEV.S for samples.\n5. Use the CV to compare spread between groups of different sizes.\n\n## Completion check\n\n- [ ] My Harbour summary table matches the check table.\n- [ ] My outlier flags found T008 and T020.\n- [ ] I described the spread of Sunrise Mart orders.",
      },
      {
        title: "Percentages, growth rates and comparisons",
        order: 3,
        durationMinutes: 75,
        videoUrl: "https://www.youtube.com/watch?v=jAcDJDjQk2g",
        content: "## Lesson introduction\n\n- **What you will study:** percentages of a total, percentage change and growth, percentage points, and index numbers.\n- **Why it matters:** most business reports compare: this month against last month, this branch against that one. A small mistake with percentages can turn \"slightly worse\" into \"halved\".\n- **After this lesson you can:** calculate and explain growth and shares correctly, and avoid the most common percentage traps.\n- **Estimated time:** 75 minutes.\n\n## The topic in simple English\n\nA percentage is \"out of 100\". If 51 of every 100 Brightpath sales come from Consulting, Consulting's share is 51%.\n\nPercentage change compares a new number with an old one: \"How much bigger or smaller is it, compared with where we started?\" Always divide by the **old** number, the starting point.\n\n## Learning objectives\n\n1. Calculate a share of a total.\n2. Calculate percentage change (growth) between two periods.\n3. Tell the difference between a percentage change and a change in percentage points.\n4. Build an index that starts at 100.\n5. Choose a fair comparison.\n\n## Main teaching content\n\n**1. Share of a total**\n\nShare = part ÷ total. In Excel, `=B2/B$5`, formatted as a percentage. Shares of a whole should add up to 100% (allowing for rounding).\n\n**2. Percentage change**\n\nPercentage change = (new − old) ÷ old. In Excel, `=(C2-B2)/B2` or `=C2/B2-1`.\n\n- A positive result is growth; a negative result is a fall.\n- **Trap:** a 50% fall followed by a 50% rise does **not** get you back to where you started. 100 → 50 → 75.\n\n**3. Percentage points**\n\nWhen the numbers you compare are already percentages, say how many **percentage points** they moved. If a margin falls from 15.6% to 8.0%, it fell by **7.6 percentage points**. As a percentage change, that is a fall of almost half (48.6%). Both are true; say which you mean.\n\n**4. Index numbers**\n\nAn index sets a starting period to 100 and shows every other period relative to it: index = value ÷ starting value × 100. An index of 112.4 means \"12.4% above the start\". Indexes make it easy to compare series of very different sizes on one chart.\n\n**5. Fair comparisons**\n\n- Compare like with like: same length of period, same kind of measure.\n- Compare rates, not raw totals, when groups differ in size. A branch with twice the customers will usually have twice the complaints.\n- Watch small bases: growth from 2 to 4 is \"100% growth\" but only 2 more.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Share | A part divided by the whole | Slice of the pie | Your share of a shared bill | Consulting's share of revenue |\n| Percentage change | (New − old) ÷ old | How much it grew or fell | A price going up by 10% | Revenue up 10% in March |\n| Percentage point | The arithmetic difference between two percentages | The gap between two percentages | A test mark going from 60% to 65% | Margin down 7.6 points |\n| Index | A value relative to a base set to 100 | Compared with the start | A price index | Revenue index, January = 100 |\n| Base | The starting value used for comparison | Where you measure from | Last year's price | January's revenue |\n\n## Step-by-step demonstration: Brightpath's growth, January to April\n\nOpen your **Brightpath performance** workbook from Module 3 and add a new sheet called **Growth**.\n\n1. Type the monthly totals in A1:B5: Month, Revenue; Jan 225,000; Feb 230,000; Mar 253,000; Apr 258,000. (These are the sums of the three departments for each month.)\n2. **Month-on-month growth.** In C1 type **Change**. In C3 type `=(B3-B2)/B2` and copy to C5. Format as a percentage with one decimal.\n3. **Check:** Feb **+2.2%**; Mar **+10.0%**; Apr **+2.0%**. Over the whole period, `=(B5-B2)/B2` gives **+14.7%**.\n4. **Index.** In D1 type **Index**. In D2 type `=B2/B$2*100` and copy down. Results: 100; 102.2; 112.4; 114.7.\n5. **Department shares.** Below, make a table of total revenue by department for January to April: Consulting 493,000; Training 278,000; IT Support 195,000; total 966,000. Share of each: `=B9/B$12`. Results: Consulting **51.0%**, Training **28.8%**, IT Support **20.2%**.\n6. **Department growth, January to April.** Consulting 120,000 → 128,000 is **+6.7%**; Training 60,000 → 80,000 is **+33.3%**; IT Support 45,000 → 50,000 is **+11.1%**. Training is the smallest department but the fastest-growing.\n7. **Percentage points.** IT Support's margin was 15.6% in January (7,000 profit on 45,000) and 8.0% in April (4,000 on 50,000). Write both statements: \"IT Support's margin fell by 7.6 percentage points\" and \"its margin almost halved (down 48.6%)\". Revenue grew, but profit per sale shrank.\n\n## Practical exercise\n\n- **Task:** compare Sunrise Mart's three days of sales.\n- **Data:** daily sales from Lesson 6.1: 2 March 4,900; 3 March 5,650; 4 March 11,000.\n- **Steps:** calculate the day-on-day percentage change, an index with 2 March = 100, and each day's share of the three-day total.\n- **Expected output:** change +15.3% then +94.7%; index 100, 115.3, 224.5; shares 22.7%, 26.2%, 51.0%.\n- **Submit:** a screenshot and one sentence explaining why \"sales almost doubled on 4 March\" needs a caution with only three days of data.\n\n## Knowledge check\n\n1. Revenue went from 230,000 to 253,000. What is the percentage change?\n   - A) +10.0%\n   - B) +9.1%\n   - C) +23%\n   - D) +23,000%\n2. A price falls 50% and then rises 50%. Compared with the start, it is now:\n   - A) The same\n   - B) 25% higher\n   - C) 25% lower\n   - D) 50% lower\n3. A margin moves from 15.6% to 8.0%. Which statement is correct?\n   - A) It fell by 7.6%\n   - B) It fell by 7.6 percentage points\n   - C) It rose by 7.6 points\n   - D) It fell by 15.6 points\n4. In an index with January = 100, April is 114.7. What does this mean?\n   - A) April revenue was 114.7\n   - B) April was 14.7% below January\n   - C) There were 114.7 sales\n   - D) April was 14.7% above January\n5. A branch with twice as many customers has twice as many complaints. What is the fair comparison?\n   - A) Total complaints\n   - B) The branch with the most complaints\n   - C) Complaints per customer\n   - D) Complaints per branch\n\n## Lesson summary\n\n1. Share = part ÷ total; shares add to 100%.\n2. Percentage change = (new − old) ÷ old: always divide by the starting value.\n3. Differences between percentages are percentage points.\n4. An index sets a base to 100 for easy comparison.\n5. Compare rates, not raw totals, and be careful with small bases.\n\n## Completion check\n\n- [ ] My Growth sheet shows +2.2%, +10.0% and +2.0%.\n- [ ] I wrote the IT Support margin both ways.\n- [ ] I completed the Sunrise Mart daily comparison.",
      },
      {
        title: "Correlation and avoiding misleading conclusions",
        order: 4,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=VMUQSMFGBDo",
        content: "## Lesson introduction\n\n- **What you will study:** scatter plots, the correlation coefficient, the difference between correlation and causation, and common ways data misleads.\n- **Why it matters:** \"When X goes up, Y goes up\" is one of the most useful findings in analysis, and one of the most misused.\n- **After this lesson you can:** measure how strongly two things move together and explain carefully what that does and does not prove.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nTwo things are **correlated** when they tend to move together. On hot days, a shop sells more cold drinks: temperature and drinks sales are correlated.\n\nBut moving together does not mean one causes the other. Ice cream sales and drowning accidents both rise in summer. Ice cream does not cause drowning; hot weather drives both. Analysts must always ask: \"Could something else explain this?\"\n\n## Learning objectives\n\n1. Draw and read a scatter plot.\n2. Calculate and interpret the correlation coefficient with CORREL.\n3. Explain the difference between correlation and causation.\n4. Recognise common misleading patterns: hidden causes, small samples and cherry-picking.\n5. Write a finding in careful, honest language.\n\n## Main teaching content\n\n**1. Scatter plots**\n\nA scatter plot puts one measure on the horizontal axis and another on the vertical axis, with one dot per item. A cloud rising to the right suggests a positive relationship; falling to the right, a negative one; a shapeless cloud, little relationship.\n\n**2. The correlation coefficient (r)**\n\n`=CORREL(range1, range2)` returns a number from −1 to +1.\n\n| r | Meaning |\n| --- | --- |\n| Close to +1 | Strong positive: as one rises, the other rises |\n| Close to −1 | Strong negative: as one rises, the other falls |\n| Close to 0 | Little or no straight-line relationship |\n\nAs a rough guide, above 0.7 (or below −0.7) is strong and 0.3 to 0.7 is moderate. The size of the sample matters: with only 10 or 12 points, a strong r can still happen by chance.\n\n**3. Correlation is not causation**\n\nA strong correlation can come from:\n\n- **X causes Y** (heat increases drinks sales);\n- **Y causes X** (busy stores hire more staff, not the other way round);\n- **a hidden third factor** causing both (summer drives ice cream and swimming);\n- **coincidence**, especially in small samples.\n\nTo show cause, you usually need a test: change one thing on purpose and watch the result, keeping everything else the same.\n\n**4. Other ways data misleads**\n\n- **Cherry-picking:** choosing only the dates or groups that support your story.\n- **Small samples:** 12 customers cannot prove anything about 1 million.\n- **Survivorship:** looking only at customers who stayed hides why others left.\n- **Misleading charts:** a vertical axis that does not start at zero can make a 2% change look huge (Module 8).\n\n**5. Careful language**\n\n| Avoid | Write instead |\n| --- | --- |\n| \"Complaints cause churn.\" | \"Customers who complained more were more likely to leave.\" |\n| \"Hot weather will add 4 drinks sales a day.\" | \"Over these 10 days, hotter days had higher drinks sales.\" |\n| \"This proves...\" | \"This suggests... and could be tested by...\" |\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Scatter plot | A chart of paired values as dots | Dots showing two measures | Height against shoe size | Temperature against drinks sales |\n| Correlation | A tendency of two measures to move together | Moving together | Taller people tend to have bigger feet | Hotter days, more drinks |\n| Correlation coefficient | A number from −1 to +1 measuring straight-line relationship | How strongly they move together | — | r = 0.95 |\n| Causation | One thing directly producing a change in another | One thing makes the other happen | Rain makes the ground wet | A price cut raising sales |\n| Confounding factor | A hidden cause of both measures | The thing behind both | Summer behind ice cream and swimming | A holiday behind sales and footfall |\n\n## Step-by-step demonstration: temperature and drinks at Sunrise Mart\n\nThe Sunrise Mart manager suspects that hot weather sells drinks. The Riverside branch recorded the midday temperature (°C) and the number of Drinks orders for 10 days.\n\n1. In a new sheet called **Weather**, type in A1:C11: Day, Temperature, DrinksOrders; then days 1–10 with temperatures 24, 26, 29, 31, 27, 33, 35, 30, 28, 25 and Drinks orders 20, 19, 27, 28, 24, 31, 38, 26, 27, 18.\n2. **Scatter plot.** Select B1:C11. Click **Insert**, choose **Scatter** (X Y). Add the title \"Hotter days, more drinks orders\" and axis titles \"Temperature (°C)\" and \"Drinks orders\".\n3. The dots rise from bottom left to top right.\n4. **Correlation.** In E2 type `=CORREL(B2:B11,C2:C11)`. Result: **0.95**, a strong positive relationship.\n5. **A hidden factor?** The manager also records umbrella sales: 2, 1, 0, 0, 1, 0, 0, 0, 1, 3. Type them in column D and calculate `=CORREL(B2:B11,D2:D11)`. Result: **−0.81**. Umbrellas sell on cooler days, which are often rainy. Nobody would say \"umbrellas stop people buying drinks\"; the weather drives both.\n6. **A business example.** For the 12 Connectwave customers from Module 4, tenure (months) and complaints have r = **−0.68**: customers who have been with Connectwave longer tend to have complained less. That could mean complaints drive customers away early, or that happy customers stay, or both. The data alone cannot say which.\n7. **Write the finding carefully:** \"Over 10 days at Riverside, hotter days had more Drinks orders (r = 0.95). This supports stocking extra drinks when hot weather is forecast. With only 10 days, we should keep tracking before relying on it.\"\n\n## Practical exercise\n\n- **Task:** decide what each correlation does and does not show.\n- **Statements:** for each, say whether it proves cause and suggest a possible hidden factor or alternative explanation.\n  1. Branches with more staff have more sales (r = 0.9).\n  2. Students who attend more Zoom sessions get higher course marks (r = 0.6).\n  3. Months with more advertising had more sales (r = 0.8).\n- **Expected output:** none proves cause. Possible explanations: (1) busier branches hire more staff; (2) more motivated students both attend more and study more; (3) advertising may be timed for busy seasons, so a test month with and without advertising would be needed.\n- **Submit:** a short paragraph for each statement.\n\n## Knowledge check\n\n1. `=CORREL()` returns −0.81. What does this mean?\n   - A) No relationship\n   - B) A weak positive relationship\n   - C) An error\n   - D) A strong negative relationship\n2. Ice cream sales and drowning accidents are correlated. What is the most likely explanation?\n   - A) Ice cream causes drowning\n   - B) Hot weather increases both\n   - C) Drowning causes ice cream sales\n   - D) It is a calculation mistake\n3. Which of these is the most careful way to state a finding?\n   - A) \"Complaints cause churn.\"\n   - B) \"This proves complaints make people leave.\"\n   - C) \"Customers who complained more were more likely to leave.\"\n   - D) \"Complaints have nothing to do with churn.\"\n4. What is usually needed to show that one thing causes another?\n   - A) A test where you change one thing on purpose and keep the rest the same\n   - B) A higher correlation\n   - C) A bigger chart\n   - D) More decimal places\n5. Why should you be careful with a strong correlation from 12 customers?\n   - A) CORREL needs at least 100 values\n   - B) Correlations above 0.5 are always wrong\n   - C) Twelve is too many\n   - D) Small samples can show strong patterns by chance\n\n## Lesson summary\n\n1. Scatter plots show how two measures move together.\n2. CORREL gives r from −1 to +1; the sign shows direction and the size shows strength.\n3. Correlation is not causation: look for hidden factors, reverse causes and chance.\n4. Beware of cherry-picking, small samples and misleading charts.\n5. Write findings in careful language that matches the evidence.\n\n## Completion check\n\n- [ ] My scatter plot rises to the right and r = 0.95.\n- [ ] I found the umbrella correlation and explained it.\n- [ ] I wrote careful explanations for the three statements.",
      },
    ],
    assignmentTitle: "Delta Ridge Energy production statistics",
    assignmentDescription: "Delta Ridge Energy (fictional) operates two production assets, DR-01 and DR-02.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "Sorted order totals are 700, 1,000, 1,050, 1,400, 2,100, 2,500, 2,500, 2,500, 2,800, 5,000. What is the median?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "2,155",
            isCorrect: false,
          },
          {
            text: "2,500",
            isCorrect: false,
          },
          {
            text: "2,300",
            isCorrect: true,
          },
          {
            text: "2,100",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which measure best describes a \"typical\" value when a few values are extremely large?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "The median",
            isCorrect: true,
          },
          {
            text: "The mean",
            isCorrect: false,
          },
          {
            text: "The range",
            isCorrect: false,
          },
          {
            text: "The total",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which statement about the standard deviation is true?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "It is the middle value",
            isCorrect: false,
          },
          {
            text: "It is always zero",
            isCorrect: false,
          },
          {
            text: "It measures roughly how far values typically are from the mean",
            isCorrect: true,
          },
          {
            text: "It only works with text",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Q1 is 97.5 and Q3 is 312.5. Using the 1.5 × IQR rule, which value would be flagged as a possible outlier?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "250",
            isCorrect: false,
          },
          {
            text: "300",
            isCorrect: false,
          },
          {
            text: "500",
            isCorrect: false,
          },
          {
            text: "2,400",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Revenue rose from 225,000 to 258,000. What is the percentage change?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "+14.7%",
            isCorrect: true,
          },
          {
            text: "+12.8%",
            isCorrect: false,
          },
          {
            text: "+33%",
            isCorrect: false,
          },
          {
            text: "+3.3%",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Unemployment falls from 10% to 8%. Which is correct?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "It fell 2%",
            isCorrect: false,
          },
          {
            text: "It fell 20 percentage points",
            isCorrect: false,
          },
          {
            text: "It rose 2 points",
            isCorrect: false,
          },
          {
            text: "It fell 2 percentage points, a 20% fall",
            isCorrect: true,
          },
        ],
      },
      {
        text: "=CORREL(A2:A11,B2:B11) returns 0.05. What does this suggest?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "A strong positive relationship",
            isCorrect: false,
          },
          {
            text: "Little or no straight-line relationship",
            isCorrect: true,
          },
          {
            text: "A strong negative relationship",
            isCorrect: false,
          },
          {
            text: "One causes the other",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Branches with more staff have higher sales. What can you safely conclude?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Hiring staff will raise sales",
            isCorrect: false,
          },
          {
            text: "Sales cause hiring",
            isCorrect: false,
          },
          {
            text: "The two move together; the cause needs more investigation",
            isCorrect: true,
          },
          {
            text: "Staff numbers are wrong",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Two groups have standard deviations of 730 and 2,537, but means of 462.5 and 3,900. How should you compare their spread fairly?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Compare the standard deviations directly",
            isCorrect: false,
          },
          {
            text: "Compare the totals",
            isCorrect: false,
          },
          {
            text: "Compare the modes",
            isCorrect: false,
          },
          {
            text: "Divide each standard deviation by its mean (the CV)",
            isCorrect: true,
          },
        ],
      },
      {
        text: "An analyst shows only the three months when sales rose and leaves out the two when they fell. What is this called?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Cherry-picking",
            isCorrect: true,
          },
          {
            text: "Indexing",
            isCorrect: false,
          },
          {
            text: "Correlation",
            isCorrect: false,
          },
          {
            text: "Sampling",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the median of 3, 8, 1, 9, 4?",
        type: "multiple_choice",
        points: 1,
        explanation: "sorted 1, 3, 4, 8, 9, middle is 4",
        answers: [
          {
            text: "5",
            isCorrect: false,
          },
          {
            text: "4",
            isCorrect: true,
          },
          {
            text: "9",
            isCorrect: false,
          },
          {
            text: "25",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which average is least affected by one very large value?",
        type: "multiple_choice",
        points: 1,
        explanation: "the median ignores how big the extreme is",
        answers: [
          {
            text: "The median",
            isCorrect: true,
          },
          {
            text: "The mean",
            isCorrect: false,
          },
          {
            text: "The total",
            isCorrect: false,
          },
          {
            text: "The maximum",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which Excel function gives the most common number in a range?",
        type: "multiple_choice",
        points: 1,
        explanation: "=MODE.SNGL()",
        answers: [
          {
            text: "=MEDIAN()",
            isCorrect: false,
          },
          {
            text: "=AVERAGE()",
            isCorrect: false,
          },
          {
            text: "=COUNT()",
            isCorrect: false,
          },
          {
            text: "=MODE.SNGL()",
            isCorrect: true,
          },
        ],
      },
      {
        text: "You find an order of 5,000 when most are around 2,000. What should you do first?",
        type: "multiple_choice",
        points: 1,
        explanation: "check it is genuine first",
        answers: [
          {
            text: "Delete it",
            isCorrect: false,
          },
          {
            text: "Replace it with the mean",
            isCorrect: false,
          },
          {
            text: "Check whether it is genuine or an error",
            isCorrect: true,
          },
          {
            text: "Ignore averages",
            isCorrect: false,
          },
        ],
      },
      {
        text: "The mean of Sunrise Mart orders is 2,155 and the median is 2,300. What is the best way to report this?",
        type: "multiple_choice",
        points: 1,
        explanation: "both, with n and a note",
        answers: [
          {
            text: "Report only the mean",
            isCorrect: false,
          },
          {
            text: "Report both, with the number of orders and a note on the large order",
            isCorrect: true,
          },
          {
            text: "Report only the mode",
            isCorrect: false,
          },
          {
            text: "Round both to 2,000",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does the range measure?",
        type: "multiple_choice",
        points: 1,
        explanation: "largest minus smallest",
        answers: [
          {
            text: "The middle value",
            isCorrect: false,
          },
          {
            text: "The most common value",
            isCorrect: false,
          },
          {
            text: "The gap between the largest and smallest values",
            isCorrect: true,
          },
          {
            text: "The total",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Q1 is 2,100 and Q3 is 5,025. What is the IQR?",
        type: "multiple_choice",
        points: 1,
        explanation: "5,025 − 2,100 = 2,925",
        answers: [
          {
            text: "7,125",
            isCorrect: false,
          },
          {
            text: "3,562.5",
            isCorrect: false,
          },
          {
            text: "2,100",
            isCorrect: false,
          },
          {
            text: "2,925",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which Excel function should you normally use for the standard deviation of business data?",
        type: "multiple_choice",
        points: 1,
        explanation: "=STDEV.S() for a sample",
        answers: [
          {
            text: "=STDEV.S()",
            isCorrect: true,
          },
          {
            text: "=STDEV.P()",
            isCorrect: false,
          },
          {
            text: "=MEDIAN()",
            isCorrect: false,
          },
          {
            text: "=QUARTILE.INC()",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A value is above Q3 + 1.5 × IQR. What should you do?",
        type: "multiple_choice",
        points: 1,
        explanation: "flag and check",
        answers: [
          {
            text: "Delete it",
            isCorrect: false,
          },
          {
            text: "Flag it and check it",
            isCorrect: true,
          },
          {
            text: "Replace it with the median",
            isCorrect: false,
          },
          {
            text: "Nothing; it is normal",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why compare groups with the coefficient of variation rather than the standard deviation alone?",
        type: "multiple_choice",
        points: 1,
        explanation: "adjusts for different sizes",
        answers: [
          {
            text: "It adjusts for groups whose values are of very different sizes",
            isCorrect: true,
          },
          {
            text: "It is easier to type",
            isCorrect: false,
          },
          {
            text: "It ignores outliers",
            isCorrect: false,
          },
          {
            text: "It is always smaller",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Revenue went from 230,000 to 253,000. What is the percentage change?",
        type: "multiple_choice",
        points: 1,
        explanation: "23,000 ÷ 230,000 = +10.0%",
        answers: [
          {
            text: "+10.0%",
            isCorrect: true,
          },
          {
            text: "+9.1%",
            isCorrect: false,
          },
          {
            text: "+23%",
            isCorrect: false,
          },
          {
            text: "+23,000%",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A price falls 50% and then rises 50%. Compared with the start, it is now:",
        type: "multiple_choice",
        points: 1,
        explanation: "0.5 × 1.5 = 0.75, 25% lower",
        answers: [
          {
            text: "The same",
            isCorrect: false,
          },
          {
            text: "25% higher",
            isCorrect: false,
          },
          {
            text: "25% lower",
            isCorrect: true,
          },
          {
            text: "50% lower",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A margin moves from 15.6% to 8.0%. Which statement is correct?",
        type: "multiple_choice",
        points: 1,
        explanation: "7.6 percentage points",
        answers: [
          {
            text: "It fell by 7.6%",
            isCorrect: false,
          },
          {
            text: "It fell by 7.6 percentage points",
            isCorrect: true,
          },
          {
            text: "It rose by 7.6 points",
            isCorrect: false,
          },
          {
            text: "It fell by 15.6 points",
            isCorrect: false,
          },
        ],
      },
      {
        text: "In an index with January = 100, April is 114.7. What does this mean?",
        type: "multiple_choice",
        points: 1,
        explanation: "14.7% above January",
        answers: [
          {
            text: "April revenue was 114.7",
            isCorrect: false,
          },
          {
            text: "April was 14.7% below January",
            isCorrect: false,
          },
          {
            text: "There were 114.7 sales",
            isCorrect: false,
          },
          {
            text: "April was 14.7% above January",
            isCorrect: true,
          },
        ],
      },
      {
        text: "A branch with twice as many customers has twice as many complaints. What is the fair comparison?",
        type: "multiple_choice",
        points: 1,
        explanation: "complaints per customer",
        answers: [
          {
            text: "Total complaints",
            isCorrect: false,
          },
          {
            text: "The branch with the most complaints",
            isCorrect: false,
          },
          {
            text: "Complaints per customer",
            isCorrect: true,
          },
          {
            text: "Complaints per branch",
            isCorrect: false,
          },
        ],
      },
      {
        text: "=CORREL() returns −0.81. What does this mean?",
        type: "multiple_choice",
        points: 1,
        explanation: "strong negative",
        answers: [
          {
            text: "No relationship",
            isCorrect: false,
          },
          {
            text: "A weak positive relationship",
            isCorrect: false,
          },
          {
            text: "An error",
            isCorrect: false,
          },
          {
            text: "A strong negative relationship",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Ice cream sales and drowning accidents are correlated. What is the most likely explanation?",
        type: "multiple_choice",
        points: 1,
        explanation: "hot weather drives both",
        answers: [
          {
            text: "Ice cream causes drowning",
            isCorrect: false,
          },
          {
            text: "Hot weather increases both",
            isCorrect: true,
          },
          {
            text: "Drowning causes ice cream sales",
            isCorrect: false,
          },
          {
            text: "It is a calculation mistake",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which of these is the most careful way to state a finding?",
        type: "multiple_choice",
        points: 1,
        explanation: "describes, does not claim cause",
        answers: [
          {
            text: "\"Complaints cause churn.\"",
            isCorrect: false,
          },
          {
            text: "\"This proves complaints make people leave.\"",
            isCorrect: false,
          },
          {
            text: "\"Customers who complained more were more likely to leave.\"",
            isCorrect: true,
          },
          {
            text: "\"Complaints have nothing to do with churn.\"",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is usually needed to show that one thing causes another?",
        type: "multiple_choice",
        points: 1,
        explanation: "a controlled test",
        answers: [
          {
            text: "A test where you change one thing on purpose and keep the rest the same",
            isCorrect: true,
          },
          {
            text: "A higher correlation",
            isCorrect: false,
          },
          {
            text: "A bigger chart",
            isCorrect: false,
          },
          {
            text: "More decimal places",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why should you be careful with a strong correlation from 12 customers?",
        type: "multiple_choice",
        points: 1,
        explanation: "small samples mislead",
        answers: [
          {
            text: "CORREL needs at least 100 values",
            isCorrect: false,
          },
          {
            text: "Correlations above 0.5 are always wrong",
            isCorrect: false,
          },
          {
            text: "Twelve is too many",
            isCorrect: false,
          },
          {
            text: "Small samples can show strong patterns by chance",
            isCorrect: true,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 8,
    moduleTitle: "Data Visualisation and Storytelling",
    moduleDescription: "Learners learn to choose the right chart, design it so the message is obvious, combine charts into a simple one-page dashboard, and turn findings into a short story a manager can act on. Everything is built in Excel, so the skills carry straight into Power BI from Module 9. All figures in this module were recalculated in a separate program.",
    lessons: [
      {
        title: "Choosing the right chart",
        order: 1,
        durationMinutes: 75,
        videoUrl: "https://www.youtube.com/watch?v=o7F-tbBl_hA",
        content: "## Lesson introduction\n\n- **What you will study:** which chart answers which kind of question: comparison, change over time, part of a whole, relationship and distribution.\n- **Why it matters:** the wrong chart hides the answer. The right one makes it obvious in five seconds.\n- **After this lesson you can:** pick a suitable chart for any business question and build it in Excel.\n- **Estimated time:** 75 minutes.\n\n## The topic in simple English\n\nA chart is a picture of numbers. Different questions need different pictures, just as different journeys need different maps.\n\nStart with the question, not the chart. \"Which branch sold most?\" is a comparison: use bars. \"How did revenue change each month?\" is about time: use a line. \"Do hotter days sell more drinks?\" is a relationship: use a scatter plot.\n\n## Learning objectives\n\n1. Name the five common question types a chart answers.\n2. Match each question type to a suitable chart.\n3. Explain when a table is better than a chart.\n4. Explain when not to use a pie chart.\n5. Build bar, line and scatter charts in Excel.\n\n## Main teaching content\n\n**1. Question first, chart second**\n\n| Question type | Example | Best chart |\n| --- | --- | --- |\n| Comparison between items | Which branch sold most? | Bar or column chart |\n| Change over time | How did revenue change each month? | Line chart (column chart for a few periods) |\n| Part of a whole | What share does each department bring in? | Stacked bar, or pie for 2–4 parts |\n| Relationship | Do hotter days sell more drinks? | Scatter plot |\n| Distribution | How are order sizes spread out? | Histogram or box plot |\n\n**2. Bars and columns**\n\n- Columns are vertical; bars are horizontal. Use horizontal bars when category names are long.\n- Sort bars from largest to smallest unless the categories have a natural order (such as months).\n\n**3. Lines**\n\n- Use lines when the horizontal axis is time and the points are connected in order.\n- Several lines on one chart are fine, up to about four. More than that becomes a tangle.\n\n**4. Pie charts: use with care**\n\nPeople are poor at comparing angles. Use a pie only for a few parts (two to four) that add up to a meaningful whole, when one part is clearly the biggest. Otherwise, use a bar chart.\n\n**5. When a table is better**\n\nIf people need exact values (a price list, a list of customers to call), or there are only two or three numbers, a table or a single sentence is clearer than a chart.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Column chart | Vertical bars showing values for categories | Standing bars | Heights of children | Sales by branch |\n| Bar chart | Horizontal bars showing values for categories | Lying-down bars | A race results board | Sales by product, long names |\n| Line chart | Points joined in time order | A trend line | A temperature graph | Monthly revenue |\n| Pie chart | A circle split into slices of a whole | Pizza slices | Sharing a pizza | Share of revenue |\n| Histogram | Columns showing how many values fall into each range | How values are spread | Ages of people at an event | Number of orders by size range |\n\n## Step-by-step demonstration: four questions, four charts\n\n**1. Comparison: sales by branch**\n\n1. Open **Sunrise Mart analysis** and your branch summary from Lesson 4.3 (L1:N4). Select the Branch and Sales columns (L1:L4 and N1:N4; hold **Ctrl** to select both).\n2. Click **Insert**, then the **Bar chart** button, and choose **Clustered Bar**.\n3. Sort the summary by Sales, largest first, so the bars run Hilltop 9,900, Central 7,100, Riverside 4,550. (In a bar chart, Excel draws the first row at the bottom; tick **Categories in reverse order** in the vertical axis options if needed.)\n\n**2. Change over time: Brightpath revenue**\n\n4. Open **Brightpath performance**, **Growth** sheet (Lesson 7.3). Select A1:B5. Click **Insert**, **Line**. The line rises from 225,000 in January to 258,000 in April.\n\n**3. Part of a whole: Brightpath department shares**\n\n5. Select the department totals (Consulting 493,000; Training 278,000; IT Support 195,000). Insert a **Pie** chart, then a **Bar** chart of the same data. Compare: the pie shows Consulting is about half; the bar chart shows the exact order and sizes more clearly. Either is acceptable for three parts.\n\n**4. Relationship: temperature and drinks**\n\n6. Your scatter plot from Lesson 7.4 is already the right chart.\n\n**5. A chart that does not work**\n\n7. Try a pie chart of Brightpath's monthly revenue (four months). The slices look almost equal and the order in time is lost. Delete it: time needs a line or column chart.\n\n## Practical exercise\n\n- **Task:** choose a chart for each manager question and say why.\n- **Questions:**\n  1. Which of the three Sunrise Mart categories sold most?\n  2. How did Connectwave's number of customers change over six months?\n  3. Do Connectwave customers with longer tenure make fewer complaints?\n  4. What are the exact phone numbers of the customers to call this week?\n  5. How are Harbour Bank's 20 transaction amounts spread out?\n- **Expected output:** (1) a sorted bar or column chart; (2) a line chart; (3) a scatter plot; (4) a table, not a chart; (5) a histogram or box plot.\n- **Submit:** one line per question, and build chart 1 in Excel (Groceries 10,000; Drinks 8,050; Snacks 3,500).\n\n## Knowledge check\n\n1. Which chart is best for showing monthly revenue over a year?\n   - A) A line chart\n   - B) A pie chart\n   - C) A scatter plot\n   - D) A table of colours\n2. When is a pie chart acceptable?\n   - A) For twelve months of sales\n   - B) For comparing 15 products\n   - C) For showing a relationship\n   - D) For two to four parts of a meaningful whole\n3. Which chart shows whether two measures move together?\n   - A) A pie chart\n   - B) A scatter plot\n   - C) A line chart of one measure\n   - D) A table\n4. A manager needs the exact phone numbers of ten customers. What should you give them?\n   - A) A bar chart\n   - B) A pie chart\n   - C) A table\n   - D) A scatter plot\n5. How should bars for branches normally be ordered?\n   - A) From largest to smallest\n   - B) In random order\n   - C) By the colour of the bar\n   - D) By the length of the branch name\n\n## Lesson summary\n\n1. Start with the question; then choose the chart.\n2. Bars compare, lines show time, scatter plots show relationships, histograms show distributions.\n3. Use pies only for a few parts of a whole.\n4. Use a table when people need exact values.\n5. Sort bars unless the categories have a natural order.\n\n## Completion check\n\n- [ ] I built a bar, a line and a pie chart, and saw why a pie of months fails.\n- [ ] I matched the five questions to charts.\n- [ ] I built the Sunrise category chart.",
      },
      {
        title: "Designing clear, honest charts",
        order: 2,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=kfmofpf6xtQ",
        content: "## Lesson introduction\n\n- **What you will study:** how to make a chart easy to read: a title that states the message, clean axes, few colours, direct labels and an honest scale.\n- **Why it matters:** Excel's default chart is a starting point, not a finished product. A cluttered or misleading chart wastes the reader's time or, worse, gives the wrong impression.\n- **After this lesson you can:** turn a default Excel chart into a clear, honest one in a few minutes.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nA good chart is like a good road sign: it says one thing, clearly, at a glance. Remove anything that does not help the message. Use colour to point at what matters, not to decorate.\n\nAn honest chart shows sizes fairly. If a bar chart's axis starts at 220,000 instead of 0, a 10% difference can look like a 300% difference. That is misleading, even if every number is correct.\n\n## Learning objectives\n\n1. Write chart titles that state the finding.\n2. Remove clutter: gridlines, borders, unneeded legends and 3D effects.\n3. Use colour on purpose, and in a way colour-blind readers can follow.\n4. Start bar and column axes at zero.\n5. Add data labels and short notes where they help.\n\n## Main teaching content\n\n**1. Titles that tell**\n\n| Weak title | Strong title |\n| --- | --- |\n| Sales by category | Groceries brought in almost half of sales |\n| Revenue | Revenue grew every month, up 14.7% since January |\n| Chart 1 | IT Support's margin almost halved |\n\n**2. Remove clutter**\n\n- Delete heavy gridlines, chart borders and background colours.\n- Remove the legend when there is only one series, or label lines directly at their ends.\n- Never use 3D effects; they distort sizes.\n- Use one decimal place or none, and thousands separators.\n\n**3. Colour with purpose**\n\n- Use one neutral colour (grey or a soft blue) for everything, and one strong colour for the item you are talking about.\n- Avoid relying on red against green: about 1 in 12 men cannot easily tell them apart. Use labels as well as colour.\n- Keep the same colour for the same thing across all charts (for example, Hilltop is always the same colour).\n\n**4. Honest scales**\n\n- Bar and column charts must start at zero, because readers compare bar lengths.\n- Line charts may start above zero to show detail, but say so clearly and do not exaggerate small changes.\n- Do not change the scale between charts that people will compare.\n\n**5. Labels and notes**\n\nAdd data labels when there are few bars. Add a short note (an annotation) for anything unusual, such as \"one large order of 5,000\".\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Chart clutter | Visual elements that do not carry information | Unnecessary decoration | Too many signs on one post | Heavy gridlines and borders |\n| Data label | A value printed on or beside a chart element | The number on the bar | A price tag | \"9,900\" on Hilltop's bar |\n| Axis | The scale line along the side or bottom of a chart | The ruler | A ruler's markings | Sales from 0 to 10,000 |\n| Truncated axis | An axis that does not start at zero | A cut-off ruler | Measuring height from 1 metre up | A revenue axis starting at 220,000 |\n| Annotation | A short note added to a chart | A sticky note on the chart | A note on a map | \"Promotion week\" beside a peak |\n\n## Step-by-step demonstration: fixing two charts\n\n**Chart 1: Sunrise Mart sales by category**\n\n1. Make a small table: Category, Sales; Groceries 10,000; Drinks 8,050; Snacks 3,500. Insert a **Clustered Column** chart. This is the default.\n2. **Title:** click the title and type \"Groceries brought in almost half of sales\". (Groceries is 46.4% of 21,550.)\n3. **Clutter:** click the gridlines and press **Delete**. Delete the legend; there is only one series.\n4. **Labels:** click a column, then **Chart Elements** (the + button, or **Chart Design**, **Add Chart Element**), and tick **Data Labels**.\n5. **Colour:** format all columns in grey, then click once on the Groceries column alone (click once to select the series, again to select one column) and colour it dark blue.\n6. **Axis:** check that the vertical axis starts at 0. With data labels showing, you can delete the axis entirely.\n\n**Chart 2: the truncated axis trap**\n\n7. Using Brightpath's monthly revenue (225,000; 230,000; 253,000; 258,000), insert a column chart.\n8. Right-click the vertical axis, choose **Format Axis**, and set **Minimum** to 220,000. The April column now looks about seven times taller than January's, though April is only 14.7% higher.\n9. Set **Minimum** back to **Auto** (0). The columns now look fairly similar, which is the truth: steady growth.\n10. If the small monthly changes are the message, use a **line** chart instead, and title it \"Revenue grew every month, up 14.7% since January\".\n\n## Practical exercise\n\n- **Task:** make a clear, honest chart of Sunrise Mart branch sales.\n- **Data:** Hilltop 9,900; Central 7,100; Riverside 4,550.\n- **Steps:** a sorted bar chart; a title stating the finding; no gridlines or legend; data labels; Hilltop highlighted; axis starting at 0.\n- **Expected output:** a three-bar chart titled, for example, \"Hilltop sold the most, 46% of all sales\", with Hilltop in the strong colour.\n- **Submit:** a screenshot of the before and after versions.\n\n## Knowledge check\n\n1. Which is the strongest chart title?\n   - A) Sales chart\n   - B) Chart 1\n   - C) Groceries brought in almost half of sales\n   - D) Data\n2. Why must a column chart's axis start at zero?\n   - A) Excel requires it\n   - B) Readers compare column lengths, so a cut-off axis exaggerates differences\n   - C) It looks more colourful\n   - D) It makes the chart smaller\n3. What is the best use of colour in a business chart?\n   - A) A different bright colour for every bar\n   - B) Red and green only\n   - C) Rainbow colours for fun\n   - D) One neutral colour and one strong colour for the point you are making\n4. Should you use 3D effects in charts?\n   - A) No, they distort sizes and add clutter\n   - B) Yes, always\n   - C) Only in pie charts\n   - D) Only for managers\n5. A chart has one data series. What should you do with the legend?\n   - A) Make it bigger\n   - B) Delete it; the title says what the bars show\n   - C) Move it inside the bars\n   - D) Add a second legend\n\n## Lesson summary\n\n1. Write titles that state the finding.\n2. Remove clutter: gridlines, borders, unneeded legends, 3D.\n3. Use one neutral and one strong colour; do not rely on red and green.\n4. Start bars at zero; never exaggerate small changes.\n5. Add labels and short notes where they help.\n\n## Completion check\n\n- [ ] I fixed the category chart step by step.\n- [ ] I saw how a truncated axis misleads.\n- [ ] I made a clear branch sales chart.",
      },
      {
        title: "Laying out a simple dashboard",
        order: 3,
        durationMinutes: 100,
        videoUrl: "https://www.youtube.com/watch?v=s0E2pmXQcPA",
        content: "## Lesson introduction\n\n- **What you will study:** what a dashboard is, how to choose its few key numbers (KPIs), and how to arrange KPI cards and charts on one screen.\n- **Why it matters:** managers rarely read long reports. A good one-page dashboard answers \"how are we doing?\" in under a minute.\n- **After this lesson you can:** build a one-page Excel dashboard with KPI cards and two or three clear charts.\n- **Estimated time:** 100 minutes.\n\n## The topic in simple English\n\nA dashboard is like the panel in front of a driver. It does not show everything about the car, only the few things the driver must watch: speed, fuel, warning lights.\n\nA business dashboard works the same way. Pick the three to five numbers that matter most, show them big at the top, and put two or three charts underneath that explain them.\n\n## Learning objectives\n\n1. Explain what a dashboard is for and who it is for.\n2. Choose three to five KPIs for a given audience.\n3. Build KPI cards in Excel that update from the data.\n4. Arrange cards and charts in a clear reading order.\n5. Make the dashboard fit and print on one page.\n\n## Main teaching content\n\n**1. Audience first**\n\nAsk: who will read this, and what decision do they make? A branch manager needs daily sales; a director needs monthly trends and problems. One dashboard cannot serve everyone.\n\n**2. KPIs: the few numbers that matter**\n\nA key performance indicator (KPI) is a number that shows whether a goal is being met. Good KPIs are:\n\n- **few:** three to five, not fifteen;\n- **comparable:** shown against a target, the last period or the start of the year;\n- **clearly labelled:** \"Revenue, Jan–Apr\" rather than \"Total\".\n\n**3. Reading order**\n\nPeople read a screen like a page: top left first, then across, then down. Put the most important KPI top left, the KPI cards in a row across the top, and the explaining charts below.\n\n```\n+-----------+-----------+-----------+-----------+\n|  KPI 1    |  KPI 2    |  KPI 3    |  KPI 4    |\n+-----------+-----------+-----------+-----------+\n|  Main trend chart     |  Breakdown chart      |\n|                       |                       |\n+-----------------------+-----------------------+\n|  One-line note: what to look at and why       |\n+-----------------------------------------------+\n```\n\n**4. Keep it consistent**\n\n- Same fonts, same number formats, same colour for the same thing.\n- Line up the edges of charts and cards.\n- Leave white space; a crowded dashboard is hard to read.\n\n**5. Formulas, not typed numbers**\n\nKPI cards should be formulas that point at the data (for example `=SUM(B2:B5)`), so the dashboard updates when next month's data is added.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Dashboard | A single screen of key measures and charts for monitoring performance | A one-page summary panel | A car's dashboard | A monthly sales dashboard |\n| KPI | Key performance indicator: a measure tied to a goal | A number that shows how you are doing | Your fuel gauge | Churn rate, revenue growth |\n| KPI card | A box showing one KPI in large type with a label | A big number with a caption | A scoreboard | \"Revenue Jan–Apr: 966,000\" |\n| Layout | The arrangement of items on the page | Where things go | Arranging furniture | KPIs on top, charts below |\n| White space | Empty space left between items | Breathing room | Margins on a page | Gaps between charts |\n\n## Step-by-step demonstration: a Brightpath dashboard\n\nAudience: Brightpath's director, who wants to know how January to April went.\n\n**1. Prepare the sheet**\n\n1. Open **Brightpath performance**. Add a new sheet and name it **Dashboard**.\n2. Click **View** and untick **Gridlines** so the sheet looks like a clean page.\n3. Make columns B to I about the same width.\n\n**2. Build four KPI cards**\n\n4. In B2 type the label \"Revenue, Jan–Apr\". In B3 enter a formula that adds the four monthly totals from the **Growth** sheet, for example `=SUM(Growth!B2:B5)`. It should show 966,000.\n5. In D2 type \"Growth, Jan to Apr\"; in D3 enter `=Growth!B5/Growth!B2-1` and format as a percentage with one decimal place: 14.7%.\n6. In F2 type \"Consulting share\"; in F3 point at your department share for Consulting from Lesson 7.3: 51.0%.\n7. In H2 type \"IT Support margin, Apr\"; in H3 point at the April margin: 8.0%. In H4 type a small note: \"was 15.6% in Jan\".\n8. Make the numbers in row 3 large (about 20 point) and bold, and the labels in row 2 small and grey. Put a light border or fill around each card.\n\n**3. Add two charts**\n\n9. Copy your monthly revenue line chart from Lesson 8.1. Paste it into the **Dashboard** sheet under the first two cards. Title it \"Revenue grew every month, up 14.7%\".\n10. Copy the department bar chart and paste it under the other two cards. Title it \"Consulting brings in half of revenue\".\n11. Hold **Alt** while you drag a chart's edges so it snaps to the cell grid. Make both charts the same height and line up their tops.\n\n**4. Add the note and check the page**\n\n12. In row 20, type a one-line note: \"Watch: IT Support's margin fell from 15.6% to 8.0% while its revenue grew.\"\n13. Click **File**, **Print**, and check the preview. In **Page Layout**, set **Orientation** to **Landscape** and **Fit to 1 page**.\n\n## Practical exercise\n\n- **Task:** build a small Sunrise Mart dashboard for the regional manager.\n- **KPIs:** total sales (21,550), number of orders (10), average order value (2,155) and best branch (Hilltop, 9,900).\n- **Charts:** a sorted bar chart of sales by branch and a column chart of sales by category.\n- **Expected output:** one landscape page with four cards along the top and two charts below, every title stating a finding, and KPI cards built with formulas such as `=SUM()`, `=COUNT()` and `=AVERAGE()`.\n- **Submit:** a screenshot of the dashboard and of one KPI formula.\n\n## Knowledge check\n\n1. What is the main purpose of a dashboard?\n   - A) To store every row of the data\n   - B) To replace the database\n   - C) To show as many charts as possible\n   - D) To show a few key measures so a reader can see quickly how things are going\n2. How many KPIs should a simple dashboard usually show?\n   - A) Three to five\n   - B) Twenty or more\n   - C) Exactly one\n   - D) One for every column in the data\n3. Where should the most important KPI go?\n   - A) Bottom right\n   - B) On a second page\n   - C) Top left\n   - D) Hidden behind a chart\n4. Why should KPI cards use formulas instead of typed numbers?\n   - A) Typed numbers are not allowed in Excel\n   - B) So the cards update when new data is added\n   - C) Formulas make the text bigger\n   - D) Formulas use less colour\n5. What should you decide before choosing the KPIs?\n   - A) The chart colours\n   - B) The font size\n   - C) The file name\n   - D) Who the audience is and what decision they make\n\n## Lesson summary\n\n1. A dashboard shows the few numbers that matter, for a specific audience.\n2. Choose three to five clearly labelled KPIs, with a comparison.\n3. KPI cards across the top, explaining charts below, a short note at the bottom.\n4. Keep fonts, colours and sizes consistent; leave white space.\n5. Build cards with formulas and check the page fits when printed.\n\n## Completion check\n\n- [ ] I built the Brightpath dashboard with four KPI cards and two charts.\n- [ ] My KPI cards are formulas, not typed numbers.\n- [ ] I built the Sunrise Mart dashboard and it fits on one page.",
      },
      {
        title: "Turning numbers into a message",
        order: 4,
        durationMinutes: 80,
        videoUrl: "https://www.youtube.com/watch?v=r5_34YnCmMY",
        content: "## Lesson introduction\n\n- **What you will study:** how to turn your analysis into a short, clear message: what happened, why it matters and what to do next.\n- **Why it matters:** analysis only creates value when someone acts on it. Managers remember a clear story, not a page of numbers.\n- **After this lesson you can:** write a short data story and present it with one supporting chart.\n- **Estimated time:** 80 minutes.\n\n## The topic in simple English\n\nImagine telling a friend about a football match. You do not list every pass. You say who won, the moment that decided it, and what it means for the league table.\n\nA data story works the same way. Lead with the main finding, give the evidence, explain what it means, and suggest what to do.\n\n## Learning objectives\n\n1. Use the \"What? So what? Now what?\" structure.\n2. Lead with the main finding, not the method.\n3. Support each claim with one clear number or chart.\n4. Separate what the data shows from what you suspect.\n5. Write a short message a busy manager can act on.\n\n## Main teaching content\n\n**1. What? So what? Now what?**\n\n| Part | Question it answers | Example (Brightpath) |\n| --- | --- | --- |\n| What? | What did we find? | IT Support's margin fell from 15.6% in January to 8.0% in April. |\n| So what? | Why does it matter? | Its revenue grew, but each sale now earns about half as much. |\n| Now what? | What should happen next? | Review IT Support's costs and pricing before May's budget. |\n\n**2. Lead with the answer**\n\nManagers want the conclusion first. Write \"Hilltop sold the most\" before explaining how you grouped the orders. Put the method at the end or in an appendix.\n\n**3. One message, one chart**\n\nEach chart in a presentation should support one sentence. If a chart supports nothing you are saying, remove it.\n\n**4. Be honest about certainty**\n\n- Say what the data shows: \"Complaints and churn rose together.\"\n- Mark what you suspect: \"This may mean complaints are causing customers to leave; we should check.\"\n- Remember Lesson 7.4: two measures moving together does not prove one causes the other.\n- Mention important limits: \"based on four months only\", \"one order of 5,000 lifts the average\".\n\n**5. Plain words**\n\nWrite for a reader who did not do the analysis. Replace \"the coefficient of variation is 1.58\" with \"personal transaction sizes vary a lot\". Round numbers sensibly: \"about half\", \"up 15%\".\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Data story | A message built from analysis, with evidence and a recommendation | Explaining what the numbers mean | Telling someone about a match | A one-page churn summary |\n| Insight | A finding that changes understanding or action | Something useful you learned | Learning the shop is cheaper on Mondays | \"Most dropped calls come from two sites\" |\n| Recommendation | A suggested action based on the findings | What we should do | \"Shop on Mondays\" | \"Inspect sites S04 and S02 first\" |\n| Caveat | A limit on how far a finding can be trusted | A warning label | \"Only if it doesn't rain\" | \"Based on four months only\" |\n| Executive summary | A short opening section with the main findings | The top lines | A film trailer | Three sentences at the top of a report |\n\n## Step-by-step demonstration: a Sunrise Mart message\n\n**1. List what you found**\n\n1. Write down your findings from earlier modules, one per line:\n   - Total sales 21,550 from 10 orders.\n   - Hilltop 9,900 (46%), Central 7,100, Riverside 4,550.\n   - Average order 2,155, median 2,300.\n   - Order 1007 (5,000) is an outlier; without it the average is 1,838.89.\n   - Groceries 10,000 (46%), Drinks 8,050, Snacks 3,500.\n\n**2. Choose the main message**\n\n2. Ask: which finding would the regional manager most want to act on? Here it is the branch gap: Hilltop sold more than twice as much as Riverside.\n\n**3. Write What? So what? Now what?**\n\n3. **What?** \"Hilltop sold 9,900 in the period, 46% of all sales and more than twice Riverside's 4,550.\"\n4. **So what?** \"Riverside is the weakest branch. Part of Hilltop's lead comes from one large order of 5,000, so the gap is smaller in everyday trading.\"\n5. **Now what?** \"Look at Riverside's opening hours, stock and footfall, and check whether large orders like 1007 can be won again.\"\n\n**4. Add one chart and a caveat**\n\n6. Use your branch bar chart from Lesson 8.2 with Riverside highlighted.\n7. Add the caveat: \"This covers 10 orders only; a longer period is needed before changing staffing.\"\n\n## Practical exercise\n\n- **Task:** write a short message to Brightpath's director about IT Support.\n- **Use:** IT Support revenue 195,000 (20.2% of the total), department growth +11.1%, margin 15.6% in January and 8.0% in April.\n- **Steps:** one sentence each for What?, So what? and Now what?; one caveat; one chart (a column chart of IT Support's January and April margin, axis starting at 0).\n- **Expected output:** about five sentences, leading with the margin fall, recommending a cost and pricing review, and noting that four months is a short period.\n- **Submit:** the message and a screenshot of the chart.\n\n## Knowledge check\n\n1. In \"What? So what? Now what?\", what does \"So what?\" answer?\n   - A) Which software was used\n   - B) Why the finding matters\n   - C) How the data was collected\n   - D) Who made the chart\n2. What should come first in a message to a busy manager?\n   - A) A description of how you cleaned the data\n   - B) A list of every number you calculated\n   - C) The main finding\n   - D) An apology for the length\n3. Complaints and churn rose together. Which sentence is most honest?\n   - A) \"Complaints and churn rose together; complaints may be driving churn, and we should check.\"\n   - B) \"Complaints definitely caused all the churn.\"\n   - C) \"Churn has nothing to do with complaints.\"\n   - D) \"The data proves customers hate us.\"\n4. A chart in your presentation does not support anything you are saying. What should you do?\n   - A) Make it bigger\n   - B) Add more colours\n   - C) Move it to the front\n   - D) Remove it\n5. Which is the best example of a caveat?\n   - A) \"Revenue is good.\"\n   - B) \"Use a bar chart.\"\n   - C) \"Based on four months only; a longer period is needed.\"\n   - D) \"Hilltop is the best branch.\"\n\n## Lesson summary\n\n1. Structure every message as What? So what? Now what?\n2. Lead with the main finding; put the method last.\n3. Support each point with one number or one chart.\n4. Separate what the data shows from what you suspect, and state caveats.\n5. Use plain words and sensible rounding.\n\n## Completion check\n\n- [ ] I wrote the Sunrise Mart message in three parts.\n- [ ] I wrote the Brightpath IT Support message with a chart and a caveat.\n- [ ] I can explain why correlation is not proof of cause in a message.",
      },
    ],
    assignmentTitle: "Connectwave customer dashboard",
    assignmentDescription: "Connectwave Telecom's customer director wants one page that shows how the customer base changed from January to June 2026 and where network problems are worst.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "Which chart is best for comparing sales across six branches?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "A sorted bar chart",
            isCorrect: true,
          },
          {
            text: "A pie chart with six slices",
            isCorrect: false,
          },
          {
            text: "A scatter plot",
            isCorrect: false,
          },
          {
            text: "A line chart",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which chart best shows whether ad spend and sales move together?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "A pie chart",
            isCorrect: false,
          },
          {
            text: "A scatter plot",
            isCorrect: true,
          },
          {
            text: "A stacked bar",
            isCorrect: false,
          },
          {
            text: "A table of totals",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A column chart's axis starts at 220,000. What is the problem?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "The chart will not print",
            isCorrect: false,
          },
          {
            text: "The colours change",
            isCorrect: false,
          },
          {
            text: "Excel will show an error",
            isCorrect: false,
          },
          {
            text: "Small differences look much bigger than they are",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which title is best for a chart of monthly churn?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Churn",
            isCorrect: false,
          },
          {
            text: "Chart 3",
            isCorrect: false,
          },
          {
            text: "Churn rose every month, from 4.1% to 6.7%",
            isCorrect: true,
          },
          {
            text: "Data from the system",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why should you avoid relying on red against green alone?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Excel does not support them",
            isCorrect: false,
          },
          {
            text: "Many colour-blind readers cannot easily tell them apart",
            isCorrect: true,
          },
          {
            text: "They print too dark",
            isCorrect: false,
          },
          {
            text: "They are too bright",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A dashboard for a director should usually show:",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "three to five KPIs with a few explaining charts",
            isCorrect: true,
          },
          {
            text: "every row of the data",
            isCorrect: false,
          },
          {
            text: "fifteen charts of equal size",
            isCorrect: false,
          },
          {
            text: "only a logo and a title",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is a KPI?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "The name of the spreadsheet",
            isCorrect: false,
          },
          {
            text: "The chart colour",
            isCorrect: false,
          },
          {
            text: "The font size",
            isCorrect: false,
          },
          {
            text: "Monthly churn rate",
            isCorrect: true,
          },
        ],
      },
      {
        text: "In \"What? So what? Now what?\", which part is the recommendation?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "What?",
            isCorrect: false,
          },
          {
            text: "So what?",
            isCorrect: false,
          },
          {
            text: "Now what?",
            isCorrect: true,
          },
          {
            text: "None of them",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A manager needs to look up each customer's account number. What should you show?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "A table",
            isCorrect: true,
          },
          {
            text: "A pie chart",
            isCorrect: false,
          },
          {
            text: "A line chart",
            isCorrect: false,
          },
          {
            text: "A 3D column chart",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which statement is a caveat?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "\"Use one strong colour.\"",
            isCorrect: false,
          },
          {
            text: "\"One large order of 5,000 lifts the average.\"",
            isCorrect: true,
          },
          {
            text: "\"Hilltop sold most.\"",
            isCorrect: false,
          },
          {
            text: "\"Put the KPI top left.\"",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which chart is best for showing monthly revenue over a year?",
        type: "multiple_choice",
        points: 1,
        explanation: "line for time",
        answers: [
          {
            text: "A line chart",
            isCorrect: true,
          },
          {
            text: "A pie chart",
            isCorrect: false,
          },
          {
            text: "A scatter plot",
            isCorrect: false,
          },
          {
            text: "A table of colours",
            isCorrect: false,
          },
        ],
      },
      {
        text: "When is a pie chart acceptable?",
        type: "multiple_choice",
        points: 1,
        explanation: "two to four parts of a whole",
        answers: [
          {
            text: "For twelve months of sales",
            isCorrect: false,
          },
          {
            text: "For comparing 15 products",
            isCorrect: false,
          },
          {
            text: "For showing a relationship",
            isCorrect: false,
          },
          {
            text: "For two to four parts of a meaningful whole",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which chart shows whether two measures move together?",
        type: "multiple_choice",
        points: 1,
        explanation: "scatter plot",
        answers: [
          {
            text: "A pie chart",
            isCorrect: false,
          },
          {
            text: "A scatter plot",
            isCorrect: true,
          },
          {
            text: "A line chart of one measure",
            isCorrect: false,
          },
          {
            text: "A table",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A manager needs the exact phone numbers of ten customers. What should you give them?",
        type: "multiple_choice",
        points: 1,
        explanation: "a table for exact values",
        answers: [
          {
            text: "A bar chart",
            isCorrect: false,
          },
          {
            text: "A pie chart",
            isCorrect: false,
          },
          {
            text: "A table",
            isCorrect: true,
          },
          {
            text: "A scatter plot",
            isCorrect: false,
          },
        ],
      },
      {
        text: "How should bars for branches normally be ordered?",
        type: "multiple_choice",
        points: 1,
        explanation: "largest to smallest",
        answers: [
          {
            text: "From largest to smallest",
            isCorrect: true,
          },
          {
            text: "In random order",
            isCorrect: false,
          },
          {
            text: "By the colour of the bar",
            isCorrect: false,
          },
          {
            text: "By the length of the branch name",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is the strongest chart title?",
        type: "multiple_choice",
        points: 1,
        explanation: "the title states the finding",
        answers: [
          {
            text: "Sales chart",
            isCorrect: false,
          },
          {
            text: "Chart 1",
            isCorrect: false,
          },
          {
            text: "Groceries brought in almost half of sales",
            isCorrect: true,
          },
          {
            text: "Data",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why must a column chart's axis start at zero?",
        type: "multiple_choice",
        points: 1,
        explanation: "readers compare lengths",
        answers: [
          {
            text: "Excel requires it",
            isCorrect: false,
          },
          {
            text: "Readers compare column lengths, so a cut-off axis exaggerates differences",
            isCorrect: true,
          },
          {
            text: "It looks more colourful",
            isCorrect: false,
          },
          {
            text: "It makes the chart smaller",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the best use of colour in a business chart?",
        type: "multiple_choice",
        points: 1,
        explanation: "one neutral, one strong",
        answers: [
          {
            text: "A different bright colour for every bar",
            isCorrect: false,
          },
          {
            text: "Red and green only",
            isCorrect: false,
          },
          {
            text: "Rainbow colours for fun",
            isCorrect: false,
          },
          {
            text: "One neutral colour and one strong colour for the point you are making",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Should you use 3D effects in charts?",
        type: "multiple_choice",
        points: 1,
        explanation: "no 3D",
        answers: [
          {
            text: "No, they distort sizes and add clutter",
            isCorrect: true,
          },
          {
            text: "Yes, always",
            isCorrect: false,
          },
          {
            text: "Only in pie charts",
            isCorrect: false,
          },
          {
            text: "Only for managers",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A chart has one data series. What should you do with the legend?",
        type: "multiple_choice",
        points: 1,
        explanation: "delete a single-series legend",
        answers: [
          {
            text: "Make it bigger",
            isCorrect: false,
          },
          {
            text: "Delete it; the title says what the bars show",
            isCorrect: true,
          },
          {
            text: "Move it inside the bars",
            isCorrect: false,
          },
          {
            text: "Add a second legend",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the main purpose of a dashboard?",
        type: "multiple_choice",
        points: 1,
        explanation: "a few key measures at a glance",
        answers: [
          {
            text: "To store every row of the data",
            isCorrect: false,
          },
          {
            text: "To replace the database",
            isCorrect: false,
          },
          {
            text: "To show as many charts as possible",
            isCorrect: false,
          },
          {
            text: "To show a few key measures so a reader can see quickly how things are going",
            isCorrect: true,
          },
        ],
      },
      {
        text: "How many KPIs should a simple dashboard usually show?",
        type: "multiple_choice",
        points: 1,
        explanation: "three to five",
        answers: [
          {
            text: "Three to five",
            isCorrect: true,
          },
          {
            text: "Twenty or more",
            isCorrect: false,
          },
          {
            text: "Exactly one",
            isCorrect: false,
          },
          {
            text: "One for every column in the data",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Where should the most important KPI go?",
        type: "multiple_choice",
        points: 1,
        explanation: "top left",
        answers: [
          {
            text: "Bottom right",
            isCorrect: false,
          },
          {
            text: "On a second page",
            isCorrect: false,
          },
          {
            text: "Top left",
            isCorrect: true,
          },
          {
            text: "Hidden behind a chart",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why should KPI cards use formulas instead of typed numbers?",
        type: "multiple_choice",
        points: 1,
        explanation: "cards update with new data",
        answers: [
          {
            text: "Typed numbers are not allowed in Excel",
            isCorrect: false,
          },
          {
            text: "So the cards update when new data is added",
            isCorrect: true,
          },
          {
            text: "Formulas make the text bigger",
            isCorrect: false,
          },
          {
            text: "Formulas use less colour",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What should you decide before choosing the KPIs?",
        type: "multiple_choice",
        points: 1,
        explanation: "audience and decision first",
        answers: [
          {
            text: "The chart colours",
            isCorrect: false,
          },
          {
            text: "The font size",
            isCorrect: false,
          },
          {
            text: "The file name",
            isCorrect: false,
          },
          {
            text: "Who the audience is and what decision they make",
            isCorrect: true,
          },
        ],
      },
      {
        text: "In \"What? So what? Now what?\", what does \"So what?\" answer?",
        type: "multiple_choice",
        points: 1,
        explanation: "why it matters",
        answers: [
          {
            text: "Which software was used",
            isCorrect: false,
          },
          {
            text: "Why the finding matters",
            isCorrect: true,
          },
          {
            text: "How the data was collected",
            isCorrect: false,
          },
          {
            text: "Who made the chart",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What should come first in a message to a busy manager?",
        type: "multiple_choice",
        points: 1,
        explanation: "the main finding first",
        answers: [
          {
            text: "A description of how you cleaned the data",
            isCorrect: false,
          },
          {
            text: "A list of every number you calculated",
            isCorrect: false,
          },
          {
            text: "The main finding",
            isCorrect: true,
          },
          {
            text: "An apology for the length",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Complaints and churn rose together. Which sentence is most honest?",
        type: "multiple_choice",
        points: 1,
        explanation: "states the link, marks the suspicion",
        answers: [
          {
            text: "\"Complaints and churn rose together; complaints may be driving churn, and we should check.\"",
            isCorrect: true,
          },
          {
            text: "\"Complaints definitely caused all the churn.\"",
            isCorrect: false,
          },
          {
            text: "\"Churn has nothing to do with complaints.\"",
            isCorrect: false,
          },
          {
            text: "\"The data proves customers hate us.\"",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A chart in your presentation does not support anything you are saying. What should you do?",
        type: "multiple_choice",
        points: 1,
        explanation: "remove it",
        answers: [
          {
            text: "Make it bigger",
            isCorrect: false,
          },
          {
            text: "Add more colours",
            isCorrect: false,
          },
          {
            text: "Move it to the front",
            isCorrect: false,
          },
          {
            text: "Remove it",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which is the best example of a caveat?",
        type: "multiple_choice",
        points: 1,
        explanation: "a limit on the finding",
        answers: [
          {
            text: "\"Revenue is good.\"",
            isCorrect: false,
          },
          {
            text: "\"Use a bar chart.\"",
            isCorrect: false,
          },
          {
            text: "\"Based on four months only; a longer period is needed.\"",
            isCorrect: true,
          },
          {
            text: "\"Hilltop is the best branch.\"",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 9,
    moduleTitle: "Introduction to Power BI",
    moduleDescription: "Learners meet Power BI, the business intelligence tool used by many employers. They learn what each part of Power BI is for, load the Sunrise Mart data, clean it in Power Query and build a first interactive report. Data files for this module: sunrise_sales.csv and sunrise_customers.csv (lessons) and harbour_accounts.csv and harbour_transactions.csv (assignment), exported from the course databases. The totals quoted below were checked against those files in a separate program; the Power BI screens have not yet been clicked through on a current version (see the status section).",
    lessons: [
      {
        title: "What Power BI is and how it is organised",
        order: 1,
        durationMinutes: 70,
        videoUrl: "https://www.youtube.com/watch?v=kGPr-RYZT2o",
        content: "## Lesson introduction\n\n- **What you will study:** what Power BI is, the difference between Power BI Desktop, the Power BI service and the mobile app, the main licence types, and a tour of Power BI Desktop.\n- **Why it matters:** \"Power BI\" appears in a large share of data analyst job adverts. Knowing its parts helps you learn faster and talk about it confidently in interviews.\n- **After this lesson you can:** install Power BI Desktop (or choose a Mac route) and find your way around its views and panes.\n- **Estimated time:** 70 minutes.\n\n## The topic in simple English\n\nPower BI is a set of Microsoft tools for turning data into interactive reports and dashboards.\n\nThink of a restaurant. **Power BI Desktop** is the kitchen: you prepare the data and cook the report on your own computer. The **Power BI service** is the dining room: you publish the report online so other people can view it in a web browser. The **mobile app** is the takeaway: people view the same report on their phones.\n\n## Learning objectives\n\n1. Explain what business intelligence (BI) tools do.\n2. Describe Power BI Desktop, the Power BI service and the mobile app.\n3. Explain, in general terms, what the free and paid licences allow.\n4. Install Power BI Desktop, or choose a suitable route on a Mac.\n5. Name the main views and panes of Power BI Desktop.\n\n## Main teaching content\n\n**1. What a BI tool adds to Excel**\n\nExcel is excellent for calculations and small reports. A BI tool adds: connecting to many data sources at once, refreshing reports automatically, handling much larger data, and sharing interactive reports where readers click to filter.\n\n**2. The three parts of Power BI**\n\n| Part | Where it runs | What you do there |\n| --- | --- | --- |\n| Power BI Desktop | A free Windows program | Get and clean data, build the model, design reports |\n| Power BI service | A website (app.powerbi.com) | Publish, share, schedule refresh, build dashboards |\n| Power BI Mobile | Phone and tablet apps | View and explore published reports |\n\n**3. Licences in general terms**\n\n- **Power BI Desktop** is free to download and use on your own computer. Everything in this course's Power BI lessons can be done in Desktop.\n- **Signing in to the Power BI service** needs a work or school email address; personal email addresses are generally not accepted. You can still use Desktop without signing in.\n- **Free licence:** you can publish to your own personal area (My workspace), but sharing reports with colleagues generally needs a paid licence.\n- **Paid licences** (such as Pro and Premium Per User) add sharing and collaboration. Employers usually provide these.\n- Microsoft changes licence rules from time to time; check Microsoft's current Power BI licensing page before relying on any detail.\n\n**4. Installing Power BI Desktop (Windows)**\n\nInstall it from the **Microsoft Store** (search for \"Power BI Desktop\"); the Store version updates itself. It can also be downloaded from Microsoft's website. Power BI Desktop is updated every month, so your screen may look slightly different from the screenshots.\n\n**5. A tour of Power BI Desktop**\n\n| Area | What it is for |\n| --- | --- |\n| Report view | The canvas where you build charts and pages |\n| Table view | Shows the rows of each loaded table |\n| Model view | Shows tables and the relationships between them |\n| Visualizations pane | Choose chart types and set their fields and format |\n| Data pane | Lists your tables and columns (fields) |\n| Filters pane | Filters for one visual, one page or the whole report |\n\nThe three views are switched with the icons down the left edge of the window. Newer versions also show extra views (such as a DAX query view) that this course does not need.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Business intelligence (BI) | Tools and methods for turning business data into information for decisions | Turning data into reports people use | A school's report cards | Monthly sales reports for managers |\n| Power BI Desktop | Microsoft's free Windows program for building reports | The kitchen where reports are made | Cooking at home | An analyst building a sales report |\n| Power BI service | Microsoft's online platform for publishing and sharing reports | The dining room where reports are viewed | A restaurant's dining room | Managers viewing the report in a browser |\n| Visual | A single chart, card, table or map on a report page | One chart | One photo on a wall | A bar chart of sales by branch |\n| Report | One or more pages of visuals built on the same data | A set of chart pages | A photo album | A monthly sales report with three pages |\n\n## Step-by-step demonstration: first look at Power BI Desktop\n\n1. On Windows, open the **Microsoft Store**, search for **Power BI Desktop** and click **Get** (or **Install**).\n2. Open Power BI Desktop. If a sign-in box appears, you may close it; you do not need an account for this course.\n3. On the start screen, choose **Blank report**.\n4. Find the three view icons on the left: **Report view**, **Table view** and **Model view**. Click each one. They are empty because no data is loaded yet.\n5. On the right, find the **Visualizations** pane, the **Data** pane and the **Filters** pane. If one is hidden, open it from the **View** tab.\n6. In the **Visualizations** pane, hover over the icons and read their names: Stacked bar chart, Clustered column chart, Line chart, Pie chart, Card, Table, Slicer.\n7. Click **File**, **Save as**, and save the empty report as **Sunrise report.pbix** in your course folder. A .pbix file holds the data, the model and the report together.\n\n**Mac route:** open Excel and find **Data**, **Get Data**. Note the menu options; you will use them in Lesson 9.2.\n\n## Practical exercise\n\n- **Task:** prepare your Power BI environment and explain Power BI in your own words.\n- **Steps:** install Power BI Desktop (or choose your Mac route); save an empty **Sunrise report.pbix**; write three sentences explaining Desktop, the service and the mobile app to a friend who has never used them.\n- **Expected output:** a saved .pbix file (or an Excel workbook for the Mac route) and three plain sentences, for example \"Desktop is where I build the report on my computer.\"\n- **Submit:** a screenshot of Power BI Desktop (or Excel's Get Data menu) and your three sentences.\n\n## Knowledge check\n\n1. Where do you build reports and clean data in Power BI?\n   - A) Power BI Mobile\n   - B) An email\n   - C) Power BI Desktop\n   - D) The printer settings\n2. What is the Power BI service mainly used for?\n   - A) Publishing and sharing reports online\n   - B) Writing letters\n   - C) Installing Windows\n   - D) Editing photos\n3. On which operating system does Power BI Desktop run?\n   - A) Every operating system\n   - B) Only on phones\n   - C) Only on Mac\n   - D) Windows\n4. Which view shows the tables and the relationships between them?\n   - A) Report view\n   - B) Model view\n   - C) The Filters pane\n   - D) The Visualizations pane\n5. What does a .pbix file contain?\n   - A) The data, the model and the report together\n   - B) Only the chart colours\n   - C) Only a picture of the report\n   - D) A Word document\n\n## Lesson summary\n\n1. Power BI turns data into interactive reports.\n2. Desktop builds, the service shares, the mobile app views.\n3. Desktop is free; sharing in the service generally needs a paid licence and a work or school account.\n4. Desktop runs on Windows only; Mac learners have three routes.\n5. Report, Table and Model views, plus the Visualizations, Data and Filters panes.\n\n## Completion check\n\n- [ ] I installed Power BI Desktop or chose my Mac route.\n- [ ] I found the three views and three panes.\n- [ ] I saved Sunrise report.pbix.",
      },
      {
        title: "Getting data into Power BI",
        order: 2,
        durationMinutes: 75,
        videoUrl: "https://www.youtube.com/watch?v=VaOhNqNtGGE",
        content: "**Files for this lesson:** [harbour_accounts.csv](/course-files/data-analytics/harbour_accounts.csv) · [harbour_transactions.csv](/course-files/data-analytics/harbour_transactions.csv) · [sunrise.db](/course-files/data-analytics/sunrise.db) · [sunrise_customers.csv](/course-files/data-analytics/sunrise_customers.csv) · [sunrise_sales.csv](/course-files/data-analytics/sunrise_sales.csv). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** how to connect Power BI to files, preview the data before loading, load two tables and check them.\n- **Why it matters:** every report starts with getting the right data in. Mistakes here (wrong file, wrong types) carry into every chart.\n- **After this lesson you can:** load CSV files into Power BI and check that the rows and totals are right.\n- **Estimated time:** 75 minutes.\n\n## The topic in simple English\n\nBefore cooking, you bring the ingredients into the kitchen and check them. Getting data is the same: you tell Power BI where the data is, look at a preview, and then load it.\n\nPower BI can read many kinds of source: Excel workbooks, CSV files, databases, websites and online services. In this lesson we use two CSV files from Sunrise Mart.\n\n## Learning objectives\n\n1. Name common data sources Power BI can connect to.\n2. Connect to a CSV file using Get data.\n3. Read the preview window and choose Load or Transform data.\n4. Check loaded tables in Table view.\n5. Explain what refreshing data means.\n\n## Main teaching content\n\n**1. Common sources**\n\n| Source | Example |\n| --- | --- |\n| Excel workbook | A monthly sales workbook |\n| Text/CSV file | An export from a till or banking system |\n| Database | SQL Server, MySQL, PostgreSQL, Oracle |\n| Folder | Twelve monthly files combined into one table |\n| Web and online services | A web table, SharePoint, an online form |\n\nA SQLite file like **sunrise.db** needs an extra driver to connect, so this course exports the tables as CSV files instead. In a workplace you would usually connect straight to the company database.\n\n**2. Load or Transform data?**\n\nAfter choosing a file, Power BI shows a preview with two main buttons:\n\n- **Load:** bring the data in as it is.\n- **Transform data:** open Power Query first to clean it (Lesson 9.3).\n\nIf you see any problem in the preview (wrong headers, odd values, blank rows), choose **Transform data**.\n\n**3. Data types**\n\nPower BI guesses a type for each column: whole number, decimal number, text, date. Wrong types cause problems: a number stored as text cannot be summed; a date stored as text cannot be grouped by month.\n\n**4. Refresh**\n\nPower BI remembers where each table came from. When the source file changes, click **Refresh** and every table and chart updates. This is why you should not copy and paste data into Power BI.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Data source | The file, database or service data is read from | Where the data lives | The market you buy food from | The bank's transactions system |\n| Connector | The part of Power BI that knows how to read one kind of source | A plug for one kind of socket | A phone charger for one phone type | The Text/CSV connector |\n| Preview | A sample of rows shown before loading | A first look | Looking at fruit before buying | Checking the first 20 rows of sales |\n| Data type | The kind of value a column holds | Number, text or date | Sorting coins from notes | order\\_date set as Date |\n| Refresh | Re-reading the source to update the data | Getting the latest copy | Checking for new messages | Updating the report with today's sales |\n\n## Step-by-step demonstration: loading Sunrise Mart\n\n1. Open **Sunrise report.pbix**.\n2. On the **Home** tab, click **Get data**, then **Text/CSV**.\n3. Choose **sunrise\\_sales.csv** and click **Open**. The preview shows columns order\\_id, order\\_date, branch, customer\\_id, category, quantity and unit\\_price, and 10 rows.\n4. Check the preview: the first row has been used as headers, and the numbers look right. Click **Load**.\n5. Repeat for **sunrise\\_customers.csv**. The preview shows 8 customers. Notice that two customers (C005 and C007) have an empty date\\_of\\_birth. Click **Load** for now; we will deal with this in Lesson 9.3.\n6. Open **Table view** (left edge). Click **sunrise\\_sales** in the **Data** pane. Check that there are 10 rows. (Power BI names each table after its file; right-click a table and choose **Rename** to call it **sales**, and rename **sunrise\\_customers** to **customers**. The rest of this module uses these short names.)\n7. Click the **quantity** column header and look at the type shown on the **Column tools** tab: it should be **Whole number**. Click **order\\_date**: it should be **Date**. If not, it will be fixed in Lesson 9.3.\n8. Open **Model view**. You should see the two tables. Power BI may already have drawn a line between them on **customer\\_id**; this is a relationship (Lesson 9.4).\n9. Save the file.\n\n**Mac route:** in Excel, click **Data**, **Get Data**, **From Text/CSV** (the menu wording may differ slightly by version), choose the same files, and click **Load**. Each file becomes a table on its own sheet.\n\n## Practical exercise\n\n- **Task:** load the Harbour Bank files and check them.\n- **Steps:** in a new report, load **harbour\\_accounts.csv** and **harbour\\_transactions.csv** and rename the tables **accounts** and **transactions**. In Table view, count the rows in each table and check the data type of **amount** and **txn\\_date**.\n- **Expected output:** accounts has 6 rows and transactions has 20 rows; amount is a whole number and txn\\_date is a date. Save as **Harbour report.pbix**.\n- **Submit:** a screenshot of Table view for each table, with the row count visible at the bottom of the window.\n\n## Knowledge check\n\n1. Which button do you use to bring a CSV file into Power BI?\n   - A) Publish\n   - B) Get data\n   - C) Format painter\n   - D) Print\n2. You notice problems in the preview window. What should you choose?\n   - A) Load, then delete the report\n   - B) Close Power BI\n   - C) Publish straight away\n   - D) Transform data\n3. Why does the data type of a column matter?\n   - A) Wrong types stop you summing numbers or grouping dates\n   - B) It changes the chart colours\n   - C) It changes the file name\n   - D) It does not matter at all\n4. What does Refresh do?\n   - A) Deletes all charts\n   - B) Changes the theme\n   - C) Re-reads the sources so the report shows the latest data\n   - D) Turns off the computer\n5. Why does this course give you CSV files instead of sunrise.db for Power BI?\n   - A) Power BI cannot open any database\n   - B) SQLite needs an extra driver, while CSV works straight away\n   - C) CSV files are always larger\n   - D) Databases are not used at work\n\n## Lesson summary\n\n1. Power BI connects to files, databases, folders and online services.\n2. Use Get data, check the preview, then Load or Transform data.\n3. Check row counts and data types after loading.\n4. Refresh re-reads the sources; never copy and paste data in.\n5. Mac learners use Excel's Get Data for the same steps.\n\n## Completion check\n\n- [ ] I loaded both Sunrise files and found 10 sales and 8 customers.\n- [ ] I checked the data types in Table view.\n- [ ] I loaded and checked both Harbour files.",
      },
      {
        title: "Cleaning data with Power Query",
        order: 3,
        durationMinutes: 100,
        videoUrl: "https://www.youtube.com/watch?v=q-7dqxXz4c4",
        content: "## Lesson introduction\n\n- **What you will study:** the Power Query Editor, applied steps, setting data types, adding a calculated column, renaming, removing columns and handling blanks.\n- **Why it matters:** Power Query records every cleaning step, so next month's data is cleaned automatically when you click Refresh. This saves hours compared with cleaning by hand in Excel.\n- **After this lesson you can:** clean a table in Power Query and explain each applied step.\n- **Estimated time:** 100 minutes.\n\n## The topic in simple English\n\nPower Query is like a recipe card. Each time you do something to the data (change a type, add a column), Power Query writes it down as a step. Next time new data arrives, Power BI follows the same recipe again, in the same order.\n\nYou cleaned data by hand in Module 4. Power Query does the same jobs, but it remembers them.\n\n## Learning objectives\n\n1. Open the Power Query Editor and find the Applied steps list.\n2. Set correct data types.\n3. Add a custom column that calculates a value.\n4. Rename and remove columns.\n5. Handle blank values and close and apply the changes.\n\n## Main teaching content\n\n**1. The Power Query Editor**\n\n| Area | What it is for |\n| --- | --- |\n| Queries list (left) | One query for each table |\n| Data preview (middle) | The rows after the steps so far |\n| Query settings (right) | The query name and the **Applied steps** list |\n| Ribbon (top) | Commands: Home, Transform, Add column, View |\n\n**2. Applied steps**\n\nEvery action becomes a step. Click an earlier step to see the data at that point. Click the **X** beside a step to delete it. Steps run in order from top to bottom, so deleting an early step can break later ones.\n\n**3. Common cleaning steps**\n\n| Task | Where to find it |\n| --- | --- |\n| Set a data type | Click the icon at the left of the column header |\n| Rename a column | Double-click the header |\n| Remove a column | Right-click the header, **Remove** |\n| Trim spaces | **Transform**, **Format**, **Trim** |\n| Replace values | **Transform**, **Replace values** |\n| Remove blank or error rows | **Home**, **Remove rows** |\n| Add a calculated column | **Add column**, **Custom column** |\n\n**4. Blanks: remove, replace or keep?**\n\nTwo Sunrise customers have no date of birth. Removing those rows would also remove them from any customer count, so do not remove them. Leave the value empty (Power Query shows it as **null**) and say in the report that age is unknown for two customers. This is the same thinking as Module 4: decide based on what the report needs.\n\n**5. Close & Apply**\n\nChanges in Power Query take effect only when you click **Close & Apply** on the **Home** tab.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Power Query | The data preparation tool in Power BI and Excel | The cleaning room | A kitchen's prep table | Cleaning the till export |\n| Query | The set of steps that produces one table | One recipe | A recipe for one dish | The sales query |\n| Applied steps | The recorded list of actions in a query | The recipe's steps | \"1. Wash rice. 2. Boil water.\" | Changed type, Added custom |\n| Custom column | A new column calculated from other columns | A worked-out column | Adding up a bill | order\\_total = quantity × unit\\_price |\n| null | Power Query's word for an empty value | Nothing there | A blank box on a form | A missing date of birth |\n\n## Step-by-step demonstration: cleaning the Sunrise tables\n\n**1. Open Power Query**\n\n1. Open **Sunrise report.pbix**. On the **Home** tab, click **Transform data**. The Power Query Editor opens.\n2. Click the **sales** query on the left. On the right, look at **Applied steps**: Source, Promoted Headers and Changed Type. Power BI created these when you loaded the file.\n\n**2. Check types**\n\n3. Look at each column header's type icon. order\\_id, quantity and unit\\_price should show **123** (whole number); order\\_date should show a calendar (Date); branch, customer\\_id and category should show **ABC** (text).\n4. If order\\_date shows ABC, click the icon and choose **Date**.\n\n**3. Add the order total**\n\n5. Click **Add column**, **Custom column**.\n6. Name the new column **order\\_total**. In the formula box, double-click **quantity** in the list, type `*`, then double-click **unit\\_price**, so the formula reads `[quantity] * [unit_price]`. Click **OK**.\n7. Set the new column's type to **Whole number**. Check order 1007: 2 × 2,500 = 5,000.\n\n**4. Tidy names**\n\n8. Double-click the **branch** header and rename it **Branch**. Do the same for **category** (**Category**). Clear names appear in charts later.\n\n**5. Clean the customers table**\n\n9. Click the **customers** query. Right-click **gender** and choose **Remove**; this report does not need it.\n10. Look at **date\\_of\\_birth**: C005 and C007 show **null**. Leave them; set the column type to **Date**.\n11. Right-click **full\\_name** and choose **Transform**, **Trim** (no change here, but a safe habit for names).\n\n**6. Apply**\n\n12. Look at both Applied steps lists and read each step's name. Click **Home**, **Close & Apply**.\n13. In **Table view**, check that **sales** now has an **order\\_total** column. Save.\n\n**Mac route:** in Excel, click any cell in the sales table, then **Data**, **Get Data**, **Launch Power Query Editor** (or right-click the query in **Queries & Connections** and choose **Edit**). The same steps apply; finish with **Close & Load**.\n\n## Practical exercise\n\n- **Task:** clean the Harbour Bank tables in Power Query.\n- **Steps:** check that amount is a whole number and txn\\_date and opened\\_date are dates; rename txn\\_type to **Type** and customer\\_segment to **Segment**; add a custom column **is\\_large** with the formula `if [amount] >= 1000 then \"Yes\" else \"No\"`; close and apply.\n- **Expected output:** the transactions table has a new is\\_large column with 10 \"Yes\" rows (amounts of 1,000 or more) and 10 \"No\" rows.\n- **Submit:** a screenshot of each query's Applied steps list, and the count of \"Yes\" rows.\n\n## Knowledge check\n\n1. What does the Applied steps list show?\n   - A) The chart colours\n   - B) The file size\n   - C) The names of the report pages\n   - D) Every action you have taken on the query, in order\n2. Why is cleaning in Power Query better than cleaning by hand for a monthly report?\n   - A) It changes the source file permanently\n   - B) The steps are repeated automatically when the data is refreshed\n   - C) It makes the data smaller\n   - D) It hides mistakes\n3. Which formula creates an order total in a custom column?\n   - A) `=SUM(quantity)`\n   - B) `quantity + unit_price`\n   - C) `[quantity] * [unit_price]`\n   - D) `TOTAL()`\n4. What does Power Query show for an empty value?\n   - A) null\n   - B) zero\n   - C) error\n   - D) N/A\n5. You have finished cleaning. What must you click so the changes reach the report?\n   - A) Refresh preview only\n   - B) Close & Apply\n   - C) Undo\n   - D) New source\n\n## Lesson summary\n\n1. Power Query records each cleaning action as an applied step.\n2. Set correct data types first.\n3. Custom columns calculate new values, such as `[quantity] * [unit_price]`.\n4. Decide about blanks based on the report's needs; often keep them and say so.\n5. Click Close & Apply to send changes to the report.\n\n## Completion check\n\n- [ ] I added order\\_total and checked order 1007 = 5,000.\n- [ ] I cleaned the customers table and kept the two blank dates.\n- [ ] I cleaned the Harbour tables and counted 10 large transactions.",
      },
      {
        title: "Building your first report",
        order: 4,
        durationMinutes: 120,
        videoUrl: "https://www.youtube.com/watch?v=c7LrqSxjJQQ",
        content: "## Lesson introduction\n\n- **What you will study:** relationships between tables, simple measures, and building a one-page interactive report with cards, charts, a table and a slicer.\n- **Why it matters:** this is the everyday work of a Power BI analyst. Interactive filtering lets managers answer their own follow-up questions.\n- **After this lesson you can:** build and save a one-page Power BI report from two related tables.\n- **Estimated time:** 120 minutes.\n\n## The topic in simple English\n\nA relationship tells Power BI how two tables connect, just as a customer ID links a receipt to a customer's details. Once tables are related, a chart can use columns from both.\n\nA measure is a saved calculation, such as \"total sales\". You write it once and use it in any chart. When a reader clicks a slicer, every measure recalculates for what they selected.\n\n## Learning objectives\n\n1. Create and check a one-to-many relationship.\n2. Write simple measures with SUM, AVERAGE, COUNTROWS and DISTINCTCOUNT.\n3. Build card, bar, column and table visuals.\n4. Add a slicer and see how visuals interact.\n5. Format the report page following Module 8's design rules.\n\n## Main teaching content\n\n**1. Relationships**\n\nIn Sunrise Mart, one customer can have many orders. So the relationship goes from **customers** (the \"one\" side, each customer\\_id once) to **sales** (the \"many\" side). This is the same link you used with JOIN in Module 6.\n\n**2. Measures in DAX**\n\nMeasures are written in DAX (Data Analysis Expressions), Power BI's formula language. Simple DAX looks like Excel:\n\n| Measure | Formula | Sunrise result |\n| --- | --- | --- |\n| Total sales | `Total Sales = SUM(sales[order_total])` | 21,550 |\n| Orders | `Orders = COUNTROWS(sales)` | 10 |\n| Average order value | `Avg Order Value = AVERAGE(sales[order_total])` | 2,155 |\n| Customers who bought | `Buying Customers = DISTINCTCOUNT(sales[customer_id])` | 7 |\n\n`sales[order_total]` means \"the order\\_total column in the sales table\".\n\n**3. Visual interactions**\n\nClick a bar in one chart and the other visuals on the page filter or highlight to match. A **slicer** is an on-page filter, such as a list of branches to click.\n\n**4. Good design still applies**\n\nAll of Module 8 applies: KPI cards along the top, titles that state the finding, one highlight colour, sorted bars and axes from zero.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Relationship | A link between two tables on a matching column | How tables connect | A receipt number linking a receipt to a sale | customers to sales on customer\\_id |\n| One-to-many | Each value appears once on one side and many times on the other | One parent, many children | One teacher, many students | One customer, many orders |\n| Measure | A saved calculation that responds to filters | A reusable formula | A calculator button | Total Sales |\n| DAX | Data Analysis Expressions, Power BI's formula language | Power BI's formulas | Excel formulas | `SUM(sales[order_total])` |\n| Slicer | An on-page filter that readers click | A filter button | A TV channel selector | Choosing a branch |\n\n## Step-by-step demonstration: the Sunrise Mart report\n\n**1. Check the relationship**\n\n1. Open **Sunrise report.pbix** and go to **Model view**.\n2. If there is a line between **customers** and **sales**, double-click it and check: customers\\[customer\\_id\\] to sales\\[customer\\_id\\], cardinality **One to many (1:\\*)**. Click **OK**.\n3. If there is no line, drag **customer\\_id** from customers onto **customer\\_id** in sales, then check it in the same way.\n\n**2. Write four measures**\n\n4. Go to **Report view**. In the **Data** pane, right-click **sales** and choose **New measure**.\n5. In the formula bar type `Total Sales = SUM(sales[order_total])` and press **Enter**.\n6. Create three more measures the same way: `Orders = COUNTROWS(sales)`, `Avg Order Value = AVERAGE(sales[order_total])` and `Buying Customers = DISTINCTCOUNT(sales[customer_id])`.\n\n**3. Add KPI cards**\n\n7. Click an empty part of the canvas, then the **Card** visual. Drag **Total Sales** into it. It may show 21.55K; in the format options set **Display units** to **None** to show 21,550.\n8. Add three more cards for Orders (10), Avg Order Value (2,155) and Buying Customers (7). Line them up across the top.\n\n**4. Add charts and a table**\n\n9. Add a **Clustered bar chart**. Drag **Branch** to the Y-axis and **Total Sales** to the X-axis. Sort by Total Sales, descending (the **...** menu on the visual). Title it \"Hilltop sold the most, 46% of all sales\".\n10. Add a **Clustered column chart** with **Category** and **Total Sales**. Title it \"Groceries brought in almost half of sales\".\n11. Add a **Table** visual with **full\\_name** (from customers) and **Total Sales**. Because of the relationship, each customer's total appears. Sort by Total Sales: Wanjiru Otieno (5,000) is first, then Thandi Nkosi (4,900). Lindiwe Dube does not appear, because this customer has never placed an order.\n\n**5. Add a slicer and test it**\n\n12. Add a **Slicer** with **city** from customers. Click **Riverside**. The cards change to Total Sales 4,950, Orders 3 and Buying Customers 2. This is sales to customers who live in Riverside, which is not the same as sales at the Riverside branch (4,550).\n13. Clear the slicer. Click a bar in the branch chart and watch the other visuals respond. Click it again to clear.\n\n**6. Finish**\n\n14. Add a title text box: \"Sunrise Mart sales, 2–4 March 2026\". Save the file.\n\n**Mac route:** build the same page in Excel with a PivotTable of the sales table (sum of order\\_total by branch and by category), PivotCharts and a slicer for branch.\n\n## Practical exercise\n\n- **Task:** explore the report with the slicer and answer three questions.\n- **Questions:**\n  1. What are Total Sales to customers who live in Central?\n  2. How many orders came from customers who live in Hilltop?\n  3. Why do sales to Riverside customers (4,950) differ from sales at the Riverside branch (4,550)?\n- **Expected output:** (1) 6,700; (2) 3 orders (C003 twice and C006 once), 9,900 in total; (3) customers can shop at any branch, for example Riverside customer C001 placed order 1001 at Central.\n- **Submit:** a screenshot of the report with each city selected, and your three answers.\n\n## Knowledge check\n\n1. What does a relationship between customers and sales allow?\n   - A) Charts can use columns from both tables together\n   - B) It deletes duplicate rows\n   - C) It changes data types\n   - D) It publishes the report\n2. Which is the \"one\" side of the Sunrise relationship?\n   - A) sales\n   - B) The slicer\n   - C) customers\n   - D) The card visual\n3. What does `COUNTROWS(sales)` return for the Sunrise data?\n   - A) 7\n   - B) 10\n   - C) 21,550\n   - D) 8\n4. What is a slicer?\n   - A) A chart type for time\n   - B) A data type\n   - C) A relationship\n   - D) An on-page filter that readers click\n5. Which measure counts how many different customers bought something?\n   - A) `SUM(sales[customer_id])`\n   - B) `AVERAGE(sales[order_total])`\n   - C) `DISTINCTCOUNT(sales[customer_id])`\n   - D) `COUNTROWS(customers)`\n\n## Lesson summary\n\n1. Relationships link tables, usually one-to-many on an ID column.\n2. Measures are saved DAX calculations that respond to filters.\n3. Cards, bars, columns and tables cover most first reports.\n4. Slicers and clicks let readers filter the whole page.\n5. Apply Module 8's design rules to every Power BI page.\n\n## Completion check\n\n- [ ] I checked the one-to-many relationship.\n- [ ] I wrote four measures and they show 21,550, 10, 2,155 and 7.\n- [ ] I built the report and tested the slicer.",
      },
    ],
    assignmentTitle: "Harbour Bank March transactions report",
    assignmentDescription: "Harbour Bank's operations manager wants a one-page interactive report on March 2026 transactions, to see where the money moves and which transactions need a check.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "What is Power BI Desktop mainly used for?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Sending email",
            isCorrect: false,
          },
          {
            text: "Viewing reports on a phone only",
            isCorrect: false,
          },
          {
            text: "Writing documents",
            isCorrect: false,
          },
          {
            text: "Getting and cleaning data and building reports",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What usually needs a paid Power BI licence?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Sharing reports with colleagues in the Power BI service",
            isCorrect: true,
          },
          {
            text: "Installing Power BI Desktop",
            isCorrect: false,
          },
          {
            text: "Building a chart in Desktop",
            isCorrect: false,
          },
          {
            text: "Loading a CSV file",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which Desktop view shows the rows of a loaded table?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Model view",
            isCorrect: false,
          },
          {
            text: "Report view",
            isCorrect: false,
          },
          {
            text: "Table view",
            isCorrect: true,
          },
          {
            text: "The Filters pane",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Where do you see the list of cleaning actions in Power Query?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "The Visualizations pane",
            isCorrect: false,
          },
          {
            text: "Applied steps",
            isCorrect: true,
          },
          {
            text: "The Format pane",
            isCorrect: false,
          },
          {
            text: "Model view",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A column of amounts was loaded as text. What is the main problem?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "The amounts cannot be summed correctly until the type is changed",
            isCorrect: true,
          },
          {
            text: "The column will be deleted",
            isCorrect: false,
          },
          {
            text: "The report cannot be saved",
            isCorrect: false,
          },
          {
            text: "There is no problem",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does Power Query do with its steps when the data is refreshed?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Deletes them",
            isCorrect: false,
          },
          {
            text: "Asks you to redo them by hand",
            isCorrect: false,
          },
          {
            text: "Repeats them automatically on the new data",
            isCorrect: true,
          },
          {
            text: "Turns them into charts",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which DAX formula gives total sales?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "COUNTROWS(sales)",
            isCorrect: false,
          },
          {
            text: "DISTINCTCOUNT(sales[branch])",
            isCorrect: false,
          },
          {
            text: "AVERAGE(sales[order_total])",
            isCorrect: false,
          },
          {
            text: "SUM(sales[order_total])",
            isCorrect: true,
          },
        ],
      },
      {
        text: "One customer can place many orders. What kind of relationship is customers to sales?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Many-to-many",
            isCorrect: false,
          },
          {
            text: "One-to-many",
            isCorrect: true,
          },
          {
            text: "One-to-one",
            isCorrect: false,
          },
          {
            text: "No relationship",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which visual is best for showing a single number such as total sales?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Scatter chart",
            isCorrect: false,
          },
          {
            text: "Line chart",
            isCorrect: false,
          },
          {
            text: "Table",
            isCorrect: false,
          },
          {
            text: "Card",
            isCorrect: true,
          },
        ],
      },
      {
        text: "A Mac user wants to follow the Power Query steps. What is one suitable route?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Use Power Query in a recent Microsoft 365 version of Excel for Mac",
            isCorrect: true,
          },
          {
            text: "Install Power BI Desktop directly on macOS",
            isCorrect: false,
          },
          {
            text: "Use the Power BI mobile app to build the model",
            isCorrect: false,
          },
          {
            text: "There is no way to learn these skills on a Mac",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Where do you build reports and clean data in Power BI?",
        type: "multiple_choice",
        points: 1,
        explanation: "Power BI Desktop",
        answers: [
          {
            text: "Power BI Mobile",
            isCorrect: false,
          },
          {
            text: "An email",
            isCorrect: false,
          },
          {
            text: "Power BI Desktop",
            isCorrect: true,
          },
          {
            text: "The printer settings",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the Power BI service mainly used for?",
        type: "multiple_choice",
        points: 1,
        explanation: "publishing and sharing",
        answers: [
          {
            text: "Publishing and sharing reports online",
            isCorrect: true,
          },
          {
            text: "Writing letters",
            isCorrect: false,
          },
          {
            text: "Installing Windows",
            isCorrect: false,
          },
          {
            text: "Editing photos",
            isCorrect: false,
          },
        ],
      },
      {
        text: "On which operating system does Power BI Desktop run?",
        type: "multiple_choice",
        points: 1,
        explanation: "Windows",
        answers: [
          {
            text: "Every operating system",
            isCorrect: false,
          },
          {
            text: "Only on phones",
            isCorrect: false,
          },
          {
            text: "Only on Mac",
            isCorrect: false,
          },
          {
            text: "Windows",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which view shows the tables and the relationships between them?",
        type: "multiple_choice",
        points: 1,
        explanation: "Model view",
        answers: [
          {
            text: "Report view",
            isCorrect: false,
          },
          {
            text: "Model view",
            isCorrect: true,
          },
          {
            text: "The Filters pane",
            isCorrect: false,
          },
          {
            text: "The Visualizations pane",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does a .pbix file contain?",
        type: "multiple_choice",
        points: 1,
        explanation: "data, model and report",
        answers: [
          {
            text: "The data, the model and the report together",
            isCorrect: true,
          },
          {
            text: "Only the chart colours",
            isCorrect: false,
          },
          {
            text: "Only a picture of the report",
            isCorrect: false,
          },
          {
            text: "A Word document",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which button do you use to bring a CSV file into Power BI?",
        type: "multiple_choice",
        points: 1,
        explanation: "Get data",
        answers: [
          {
            text: "Publish",
            isCorrect: false,
          },
          {
            text: "Get data",
            isCorrect: true,
          },
          {
            text: "Format painter",
            isCorrect: false,
          },
          {
            text: "Print",
            isCorrect: false,
          },
        ],
      },
      {
        text: "You notice problems in the preview window. What should you choose?",
        type: "multiple_choice",
        points: 1,
        explanation: "Transform data",
        answers: [
          {
            text: "Load, then delete the report",
            isCorrect: false,
          },
          {
            text: "Close Power BI",
            isCorrect: false,
          },
          {
            text: "Publish straight away",
            isCorrect: false,
          },
          {
            text: "Transform data",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Why does the data type of a column matter?",
        type: "multiple_choice",
        points: 1,
        explanation: "sums and dates fail",
        answers: [
          {
            text: "Wrong types stop you summing numbers or grouping dates",
            isCorrect: true,
          },
          {
            text: "It changes the chart colours",
            isCorrect: false,
          },
          {
            text: "It changes the file name",
            isCorrect: false,
          },
          {
            text: "It does not matter at all",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does Refresh do?",
        type: "multiple_choice",
        points: 1,
        explanation: "re-reads the sources",
        answers: [
          {
            text: "Deletes all charts",
            isCorrect: false,
          },
          {
            text: "Changes the theme",
            isCorrect: false,
          },
          {
            text: "Re-reads the sources so the report shows the latest data",
            isCorrect: true,
          },
          {
            text: "Turns off the computer",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why does this course give you CSV files instead of sunrise.db for Power BI?",
        type: "multiple_choice",
        points: 1,
        explanation: "SQLite needs a driver",
        answers: [
          {
            text: "Power BI cannot open any database",
            isCorrect: false,
          },
          {
            text: "SQLite needs an extra driver, while CSV works straight away",
            isCorrect: true,
          },
          {
            text: "CSV files are always larger",
            isCorrect: false,
          },
          {
            text: "Databases are not used at work",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does the Applied steps list show?",
        type: "multiple_choice",
        points: 1,
        explanation: "every action, in order",
        answers: [
          {
            text: "The chart colours",
            isCorrect: false,
          },
          {
            text: "The file size",
            isCorrect: false,
          },
          {
            text: "The names of the report pages",
            isCorrect: false,
          },
          {
            text: "Every action you have taken on the query, in order",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Why is cleaning in Power Query better than cleaning by hand for a monthly report?",
        type: "multiple_choice",
        points: 1,
        explanation: "steps repeat on refresh",
        answers: [
          {
            text: "It changes the source file permanently",
            isCorrect: false,
          },
          {
            text: "The steps are repeated automatically when the data is refreshed",
            isCorrect: true,
          },
          {
            text: "It makes the data smaller",
            isCorrect: false,
          },
          {
            text: "It hides mistakes",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which formula creates an order total in a custom column?",
        type: "multiple_choice",
        points: 1,
        explanation: "[quantity] * [unit_price]",
        answers: [
          {
            text: "=SUM(quantity)",
            isCorrect: false,
          },
          {
            text: "quantity + unit_price",
            isCorrect: false,
          },
          {
            text: "[quantity] * [unit_price]",
            isCorrect: true,
          },
          {
            text: "TOTAL()",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does Power Query show for an empty value?",
        type: "multiple_choice",
        points: 1,
        explanation: "null",
        answers: [
          {
            text: "null",
            isCorrect: true,
          },
          {
            text: "zero",
            isCorrect: false,
          },
          {
            text: "error",
            isCorrect: false,
          },
          {
            text: "N/A",
            isCorrect: false,
          },
        ],
      },
      {
        text: "You have finished cleaning. What must you click so the changes reach the report?",
        type: "multiple_choice",
        points: 1,
        explanation: "Close & Apply",
        answers: [
          {
            text: "Refresh preview only",
            isCorrect: false,
          },
          {
            text: "Close & Apply",
            isCorrect: true,
          },
          {
            text: "Undo",
            isCorrect: false,
          },
          {
            text: "New source",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does a relationship between customers and sales allow?",
        type: "multiple_choice",
        points: 1,
        explanation: "use columns from both tables",
        answers: [
          {
            text: "Charts can use columns from both tables together",
            isCorrect: true,
          },
          {
            text: "It deletes duplicate rows",
            isCorrect: false,
          },
          {
            text: "It changes data types",
            isCorrect: false,
          },
          {
            text: "It publishes the report",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is the \"one\" side of the Sunrise relationship?",
        type: "multiple_choice",
        points: 1,
        explanation: "customers",
        answers: [
          {
            text: "sales",
            isCorrect: false,
          },
          {
            text: "The slicer",
            isCorrect: false,
          },
          {
            text: "customers",
            isCorrect: true,
          },
          {
            text: "The card visual",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does COUNTROWS(sales) return for the Sunrise data?",
        type: "multiple_choice",
        points: 1,
        explanation: "10 rows",
        answers: [
          {
            text: "7",
            isCorrect: false,
          },
          {
            text: "10",
            isCorrect: true,
          },
          {
            text: "21,550",
            isCorrect: false,
          },
          {
            text: "8",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is a slicer?",
        type: "multiple_choice",
        points: 1,
        explanation: "an on-page filter",
        answers: [
          {
            text: "A chart type for time",
            isCorrect: false,
          },
          {
            text: "A data type",
            isCorrect: false,
          },
          {
            text: "A relationship",
            isCorrect: false,
          },
          {
            text: "An on-page filter that readers click",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which measure counts how many different customers bought something?",
        type: "multiple_choice",
        points: 1,
        explanation: "DISTINCTCOUNT(sales[customer_id])",
        answers: [
          {
            text: "SUM(sales[customer_id])",
            isCorrect: false,
          },
          {
            text: "AVERAGE(sales[order_total])",
            isCorrect: false,
          },
          {
            text: "DISTINCTCOUNT(sales[customer_id])",
            isCorrect: true,
          },
          {
            text: "COUNTROWS(customers)",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 10,
    moduleTitle: "Power BI Data Modelling and DAX",
    moduleDescription: "Learners learn how professional Power BI models are built: fact and dimension tables arranged in a star schema, a date table, and measures written in DAX, including CALCULATE, DIVIDE and time intelligence (year to date and the same period last year). Data files for this module: sunrise_fact_sales.csv, sunrise_dim_branch.csv and sunrise_dim_product.csv (lessons) and brightpath_fact_finance.csv and brightpath_dim_department.csv (assignment). Every total quoted below was calculated from these files in a separate program; the Power BI screens have not yet been clicked through (see the status section).",
    lessons: [
      {
        title: "Fact and dimension tables",
        order: 1,
        durationMinutes: 75,
        videoUrl: "https://www.youtube.com/watch?v=hQvCOBv_-LE",
        content: "**Files for this lesson:** [brightpath_dim_department.csv](/course-files/data-analytics/brightpath_dim_department.csv) · [brightpath_fact_finance.csv](/course-files/data-analytics/brightpath_fact_finance.csv) · [sunrise_dim_branch.csv](/course-files/data-analytics/sunrise_dim_branch.csv) · [sunrise_dim_product.csv](/course-files/data-analytics/sunrise_dim_product.csv) · [sunrise_fact_sales.csv](/course-files/data-analytics/sunrise_fact_sales.csv). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** the two kinds of table in a good data model, fact tables and dimension tables, and what the \"grain\" of a fact table means.\n- **Why it matters:** a well-shaped model makes every report simpler, faster and more accurate. A badly shaped one causes wrong totals that are hard to spot.\n- **After this lesson you can:** look at any business dataset and say which tables are facts and which are dimensions.\n- **Estimated time:** 75 minutes.\n\n## The topic in simple English\n\nThink of a shop's till receipts and its product catalogue. The receipts record **what happened**: how many of what were sold, when and where. The catalogue **describes things**: each product's name, category and price.\n\nIn a data model, the receipts are a **fact table** and the catalogue is a **dimension table**. Facts are the events you count and add up. Dimensions are the descriptions you use to group and filter them.\n\n## Learning objectives\n\n1. Define fact tables and dimension tables.\n2. Identify measures (numbers to add up) and attributes (descriptions) in a dataset.\n3. State the grain of a fact table.\n4. Explain why descriptions belong in dimension tables, not repeated in the fact table.\n5. Load the Sunrise Mart fact and dimension tables into Power BI.\n\n## Main teaching content\n\n**1. Facts and dimensions**\n\n|  | Fact table | Dimension table |\n| --- | --- | --- |\n| Holds | Events or measurements | Descriptions of things |\n| Typical columns | IDs, dates, numbers to add up | One ID, then names, categories, groups |\n| Number of rows | Many, and grows every day | Few, and changes slowly |\n| Sunrise example | fact\\_sales: month, branch, product, quantity | dim\\_branch, dim\\_product |\n\n**2. The grain**\n\nThe grain is what one row of the fact table represents. In **sunrise\\_fact\\_sales**, one row is \"one product sold at one branch in one month\". Always write the grain down before building a report: it tells you what you can and cannot answer. With a monthly grain you cannot answer \"which day of the week sells most?\"\n\n**3. Why separate the descriptions?**\n\nIf every fact row repeated the branch name, area, product name, category and price, then:\n\n- the table would be much larger;\n- a renamed product would have to be changed on every row;\n- a typing slip on one row (\"Hiltop\") would create a false extra branch.\n\nKeeping each description once, in a dimension, avoids these problems. This is the same idea as the customers and sales tables in Module 5.\n\n**4. Keys**\n\nEach dimension has a unique key (branch\\_id, product\\_id). The fact table holds the same keys so each row can be linked to its descriptions.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Fact table | A table of events or measurements, linked to dimensions by keys | The \"what happened\" table | Till receipts | Monthly sales by branch and product |\n| Dimension table | A table that describes the things facts refer to | The \"describe it\" table | A product catalogue | dim\\_product: name, category, price |\n| Grain | What a single row of a fact table represents | The level of detail | One line on a receipt | One product, one branch, one month |\n| Attribute | A descriptive column in a dimension | A label | A product's colour | Category, area |\n| Data model | The set of tables and relationships a report uses | How the tables fit together | A family tree | The Sunrise star schema |\n\n## Step-by-step demonstration: loading the Sunrise model\n\n1. Open Power BI Desktop and start a **Blank report**. Save it as **Sunrise model.pbix**.\n2. Click **Get data**, **Text/CSV**, and load **sunrise\\_fact\\_sales.csv**. Repeat for **sunrise\\_dim\\_branch.csv** and **sunrise\\_dim\\_product.csv**.\n3. In the **Data** pane, rename the tables **fact\\_sales**, **dim\\_branch** and **dim\\_product** (right-click, **Rename**). The prefixes show at a glance which tables are facts and which are dimensions.\n4. Open **Table view**. Check the row counts: fact\\_sales 162 (18 months × 3 branches × 3 products), dim\\_branch 3, dim\\_product 3.\n5. In fact\\_sales, check that **month\\_start** is a **Date** and **quantity** a **Whole number**. In dim\\_product, check that **unit\\_price** is a **Whole number**.\n6. Write the grain in a text box on the report page: \"fact\\_sales: one row per product, per branch, per month, January 2025 to June 2026\".\n7. Save the file.\n\n## Practical exercise\n\n- **Task:** classify the columns and tables of the Brightpath finance files.\n- **Steps:** open **brightpath\\_fact\\_finance.csv** and **brightpath\\_dim\\_department.csv** (in Excel or Power BI). For each table, say whether it is a fact or a dimension; list its key; list its numbers to add up or its descriptive attributes; and write the grain of the fact table.\n- **Expected output:** brightpath\\_fact\\_finance is the fact table (key entry\\_id; links on dept\\_id; numbers revenue and cost; grain \"one department in one month\", 48 rows); brightpath\\_dim\\_department is a dimension (key dept\\_id; attributes department and head\\_count; 3 rows).\n- **Submit:** a short table of your answers.\n\n## Knowledge check\n\n1. Which table holds the events you add up, such as quantities sold?\n   - A) A dimension table\n   - B) A fact table\n   - C) A date format\n   - D) A slicer\n2. What does the grain of a fact table describe?\n   - A) The colour of the table in Model view\n   - B) The number of columns\n   - C) The file size\n   - D) What one row represents\n3. Which column belongs in a dimension table?\n   - A) Product category\n   - B) Quantity sold\n   - C) Revenue for the month\n   - D) Number of transactions\n4. Why should a product's name be stored once in dim\\_product rather than on every sales row?\n   - A) Power BI cannot store text in fact tables\n   - B) It makes the charts brighter\n   - C) It avoids repetition and inconsistent spellings, and changes happen in one place\n   - D) Names are not needed at all\n5. fact\\_sales has a monthly grain. Which question can it NOT answer?\n   - A) Which day of the week sells most?\n   - B) Which branch sold most in March 2026?\n   - C) How did Groceries revenue change from 2025 to 2026?\n   - D) Which product sold most in the first half of 2026?\n\n## Lesson summary\n\n1. Fact tables record events; dimension tables describe things.\n2. Facts hold keys and numbers; dimensions hold one key and descriptive attributes.\n3. Always state the grain of a fact table.\n4. Store each description once, in its dimension.\n5. Name tables fact\\_ and dim\\_ so the model is easy to read.\n\n## Completion check\n\n- [ ] I loaded and renamed the three Sunrise tables.\n- [ ] I checked 162, 3 and 3 rows.\n- [ ] I classified the Brightpath tables and wrote the grain.",
      },
      {
        title: "Relationships and the star schema",
        order: 2,
        durationMinutes: 100,
        videoUrl: "https://www.youtube.com/watch?v=vZndrBBPiQc",
        content: "**Files for this lesson:** [brightpath_dim_department.csv](/course-files/data-analytics/brightpath_dim_department.csv) · [brightpath_fact_finance.csv](/course-files/data-analytics/brightpath_fact_finance.csv). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** the star schema, one-to-many relationships, cross-filter direction, and adding a proper date table.\n- **Why it matters:** the star schema is the shape Microsoft recommends for Power BI models. It keeps DAX simple and totals correct.\n- **After this lesson you can:** build a star schema with a date table in Power BI and check that filters flow the right way.\n- **Estimated time:** 100 minutes.\n\n## The topic in simple English\n\nDraw the fact table in the middle of a page and the dimension tables around it, each joined to the middle by a line. It looks like a star. That is a star schema.\n\nFilters travel along the lines from the dimensions into the fact table. Click \"Hilltop\" in dim\\_branch and only Hilltop's sales rows are counted.\n\n## Learning objectives\n\n1. Describe a star schema and why it is preferred.\n2. Create one-to-many relationships between dimensions and a fact table.\n3. Explain cross-filter direction and why single direction is the safe default.\n4. Create and mark a date table.\n5. Test that each dimension filters the fact table correctly.\n\n## Main teaching content\n\n**1. The star schema**\n\n```\n          dim_branch\n              |\n Calendar --- fact_sales --- dim_product\n```\n\nEvery dimension connects directly to the fact table. Dimensions do not connect to each other.\n\n**2. One-to-many**\n\nEach branch\\_id appears once in dim\\_branch (the \"one\" side) and many times in fact\\_sales (the \"many\" side). In Model view the line shows **1** at the dimension end and **\\*** at the fact end.\n\n**3. Cross-filter direction**\n\nThe small arrow on a relationship line shows which way filters flow. **Single** (from the dimension to the fact) is the safe default. **Both** directions can be useful in special cases but can create confusing or slow results; avoid it until you have a clear reason.\n\n**4. Why a date table?**\n\nPower BI's time intelligence functions (Lesson 10.4) need a table with one row for every date, with no gaps, covering whole years. You create it with DAX:\n\n`Calendar = CALENDAR(DATE(2025,1,1), DATE(2026,12,31))`\n\nThen add Year, Month name and Month number columns, and **mark it as a date table** so Power BI knows to use it for dates.\n\n**5. Flat tables versus stars**\n\nOne big flat table can work for a small, one-off report. As soon as you have more than one fact (for example sales and targets) or need time intelligence, a star schema is easier and safer.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Star schema | A model with one fact table joined directly to several dimension tables | Facts in the middle, descriptions around it | A wheel with spokes | fact\\_sales with dim\\_branch, dim\\_product, Calendar |\n| Cardinality | Whether a relationship is one-to-many, one-to-one or many-to-many | How many matches on each side | One teacher, many pupils | One branch, many sales rows |\n| Cross-filter direction | The direction filters travel along a relationship | Which way the filter flows | Water flowing downhill | From dim\\_branch into fact\\_sales |\n| Date table | A table with one row per date, used for time calculations | A calendar in the model | A wall calendar | Calendar\\[Date\\] from 2025 to 2026 |\n| Mark as date table | A setting that tells Power BI which table and column hold the dates | Labelling the official calendar | Pinning one calendar on the wall | Table tools, Mark as date table |\n\n## Step-by-step demonstration: building the Sunrise star\n\n**1. Relationships**\n\n1. Open **Sunrise model.pbix** and go to **Model view**. Drag the tables so fact\\_sales is in the middle.\n2. If Power BI has not already done so, drag **branch\\_id** from dim\\_branch onto **branch\\_id** in fact\\_sales. Double-click the line and check: **One to many (1:\\*)**, cross-filter direction **Single**. Click **OK**.\n3. Do the same for **product\\_id** from dim\\_product to fact\\_sales.\n\n**2. The date table**\n\n4. Go to **Table view**. On the **Table tools** tab (or **Modeling** tab), click **New table** and type: `Calendar = CALENDAR(DATE(2025,1,1), DATE(2026,12,31))`. Press **Enter**. The table has 730 rows (365 days in each of the two years).\n5. With Calendar selected, click **New column** and add, one at a time:\n   - `Year = YEAR('Calendar'[Date])`\n   - `Month Number = MONTH('Calendar'[Date])`\n   - `Month = FORMAT('Calendar'[Date], \"MMM\")`\n6. Select the **Month** column, click **Sort by column** and choose **Month Number**, so months sort Jan, Feb, Mar rather than alphabetically.\n7. Click **Mark as date table** and choose the **Date** column.\n8. In **Model view**, drag **Date** from Calendar onto **month\\_start** in fact\\_sales. Check it is one-to-many, single direction.\n\n**3. Test the filters**\n\n9. In **Report view**, add a **Table** visual with **branch** (dim\\_branch) and **quantity** (fact\\_sales, summed). You should see Central, Hilltop and Riverside with their total quantities, adding up to 33,646.\n10. Add a slicer on **Year** (Calendar) and click 2026. The total quantity changes to the 2026 rows only. Filters are flowing from Calendar into fact\\_sales.\n\n## Practical exercise\n\n- **Task:** build the Brightpath star schema.\n- **Steps:** load **brightpath\\_fact\\_finance.csv** and **brightpath\\_dim\\_department.csv** into a new report (**Brightpath model.pbix**); rename them fact\\_finance and dim\\_department; create the dept\\_id relationship; add the same Calendar table, columns and sort order; mark it as a date table; relate Calendar\\[Date\\] to fact\\_finance\\[month\\_start\\].\n- **Expected output:** a three-table star; a table visual of department and summed revenue showing Consulting 1,848,000, IT Support 708,000 and Training 954,000 (3,510,000 in total for January 2025 to April 2026).\n- **Submit:** a screenshot of Model view and of the table visual.\n\n## Knowledge check\n\n1. In a star schema, what is in the middle?\n   - A) The date table only\n   - B) A slicer\n   - C) The fact table\n   - D) The largest dimension\n2. Which way should filters normally flow?\n   - A) From the dimension to the fact table (single direction)\n   - B) Both ways on every relationship\n   - C) From the fact table to the dimension only\n   - D) Filters do not flow\n3. Why does a model need a date table?\n   - A) To store product prices\n   - B) To replace the fact table\n   - C) To make the file smaller\n   - D) Time intelligence functions need a complete calendar of dates\n4. Why set the Month column to sort by Month Number?\n   - A) To make months appear in red\n   - B) So months appear Jan, Feb, Mar instead of alphabetically\n   - C) To delete empty months\n   - D) It is required to save the file\n5. Which is the correct cardinality from dim\\_branch to fact\\_sales?\n   - A) One-to-one\n   - B) Many-to-many\n   - C) None\n   - D) One-to-many\n\n## Lesson summary\n\n1. A star schema has one fact table joined directly to its dimensions.\n2. Relationships run one (dimension) to many (fact).\n3. Single cross-filter direction is the safe default.\n4. Build a full-year date table, add Year and Month columns, and mark it as a date table.\n5. Test every relationship with a quick table visual and a slicer.\n\n## Completion check\n\n- [ ] I built the Sunrise star with four tables.\n- [ ] My Calendar table has 730 rows and is marked as a date table.\n- [ ] I built the Brightpath star and checked the department totals.",
      },
      {
        title: "Calculated columns versus measures",
        order: 3,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=ePPi1LLX0sA",
        content: "## Lesson introduction\n\n- **What you will study:** the two ways of adding calculations in Power BI, calculated columns and measures, when to use each, and the SUMX function.\n- **Why it matters:** choosing wrongly gives wrong averages and percentages, and slow, bloated models. Interviewers often ask about this difference.\n- **After this lesson you can:** decide between a column and a measure and write both correctly.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nA **calculated column** works out one value for each row and stores it, like adding a new column in Excel and filling it down.\n\nA **measure** is not stored on any row. It is worked out on the spot for whatever the reader is looking at: one branch, one month or everything. Think of a calculator that re-runs every time the reader clicks a slicer.\n\n## Learning objectives\n\n1. Explain the difference between a calculated column and a measure.\n2. Write a calculated column with RELATED.\n3. Write measures with SUM and SUMX.\n4. Explain why ratios and averages must be measures.\n5. Choose the right option for a given business need.\n\n## Main teaching content\n\n**1. The difference**\n\n|  | Calculated column | Measure |\n| --- | --- | --- |\n| Calculated | Once, for every row, when data is refreshed | Each time a visual needs it |\n| Stored | Yes, takes memory | No |\n| Responds to slicers | Its values are fixed per row | Yes, recalculates for the selection |\n| Use for | Row-level labels and values to slice by, such as a price band | Totals, averages, ratios, percentages |\n\n**2. RELATED**\n\nIn a calculated column on the fact table, `RELATED()` fetches a value from the dimension on the \"one\" side, like XLOOKUP in Excel:\n\n`Revenue = fact_sales[quantity] * RELATED(dim_product[unit_price])`\n\n**3. SUM and SUMX**\n\n- `SUM(fact_sales[Revenue])` adds up an existing column.\n- `SUMX(fact_sales, fact_sales[quantity] * RELATED(dim_product[unit_price]))` goes through the table row by row, works out quantity × price, then adds the results. It gives the same total without storing a column.\n\nFunctions ending in X (SUMX, AVERAGEX) are called **iterators**: they repeat a calculation for every row.\n\n**4. Ratios must be measures**\n\nThe average price per unit sold is total revenue ÷ total quantity. If you instead average the unit\\_price column, every row counts equally, whether it sold 40 bags of rice or 560 bottles of water, and the answer is badly wrong. The demonstration shows this.\n\n**5. A rule of thumb**\n\nIf you want to **slice or filter by it**, use a column. If you want to **add, average or divide it**, use a measure.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Calculated column | A DAX column computed for every row and stored in the model | A filled-down formula column | Writing each item's total on a receipt | Revenue for each sales row |\n| Measure | A DAX formula evaluated for the current filter selection | A live calculation | A calculator total | Total Revenue |\n| RELATED | A DAX function that returns a value from the related \"one\" side table | Look up the matching value | Looking up a price on the shelf | The product's unit price |\n| Iterator | A function that evaluates an expression row by row, then combines the results | Do it for each row, then add | Adding up each line on a bill | SUMX over fact\\_sales |\n| Filter context | The set of filters (slicers, rows, columns) applied when a measure is evaluated | What the reader is looking at | Looking at one aisle of a shop | Branch = Hilltop, Year = 2026 |\n\n## Step-by-step demonstration: revenue and average price\n\n**1. A calculated column**\n\n1. Open **Sunrise model.pbix**. In **Table view**, select **fact\\_sales**.\n2. Click **New column** and type `Revenue = fact_sales[quantity] * RELATED(dim_product[unit_price])`. Press **Enter**. Check the first row: S001 is 368 bottles of water × 350 = 128,800.\n\n**2. Measures**\n\n3. In the **Data** pane, right-click fact\\_sales and choose **New measure**: `Total Revenue = SUM(fact_sales[Revenue])`.\n4. Add another: `Total Revenue X = SUMX(fact_sales, fact_sales[quantity] * RELATED(dim_product[unit_price]))`.\n5. Add both to two **Card** visuals (display units **None**). Both show **20,031,300**: the same answer, one using a stored column and one not.\n6. Add `Units Sold = SUM(fact_sales[quantity])`. It shows 33,646.\n\n**3. The averaging trap**\n\n7. In fact\\_sales add a column `Row Price = RELATED(dim_product[unit_price])`, drag it into a card and set it to **Average**. It shows about **1,116.67**: the plain average of 350, 500 and 2,500 over the 162 rows.\n8. Now create the measure `Avg Price per Unit = DIVIDE([Total Revenue], [Units Sold])`. It shows about **595.35**.\n9. Which is right? The measure. Most units sold are bottles of water at 350, so the true average price paid per unit is far below the plain average of the price list. Delete the Row Price column; it is not needed.\n\n**4. Measures follow the slicer**\n\n10. Add a **Year** slicer. Select 2025: Total Revenue 13,225,050. Select 2026: 6,806,250 (January to June only). The measure recalculates; the Revenue column's row values do not change.\n\n## Practical exercise\n\n- **Task:** add calculations to the Brightpath model.\n- **Steps:** in **Brightpath model.pbix**, create measures `Total Revenue = SUM(fact_finance[revenue])`, `Total Cost = SUM(fact_finance[cost])`, `Margin = [Total Revenue] - [Total Cost]` and `Margin % = DIVIDE([Margin], [Total Revenue])`. Then decide: should a \"Size band\" label (Large if revenue is 100,000 or more in the month, otherwise Small) be a column or a measure? Create it.\n- **Expected output:** for all 16 months together, Total Revenue 3,510,000, Total Cost 2,423,000, Margin 1,087,000, Margin % 31.0%. Size band is a calculated column (`Size Band = IF(fact_finance[revenue] >= 100000, \"Large\", \"Small\")`) because you want to slice by it; 16 rows are Large (all of them Consulting).\n- **Submit:** screenshots of the four measures in cards and of a table showing Size Band with a count of rows.\n\n## Knowledge check\n\n1. You want a total that changes when the reader picks a different year. What should you create?\n   - A) A measure\n   - B) A calculated column\n   - C) A new CSV file\n   - D) A text box\n2. What does `RELATED(dim_product[unit_price])` do in a fact table column?\n   - A) Deletes the price\n   - B) Creates a relationship\n   - C) Fetches the matching product's price from the dimension\n   - D) Sorts the table\n3. Why does SUMX give the same total as SUM of a Revenue column?\n   - A) It rounds the numbers\n   - B) It calculates quantity × price row by row and then adds the results\n   - C) It ignores the prices\n   - D) It only uses the first row\n4. Why is averaging the unit\\_price column wrong for \"average price per unit sold\"?\n   - A) Prices cannot be averaged in Power BI\n   - B) The column is text\n   - C) It gives a bigger total\n   - D) Every row counts equally, however many units it sold; the right answer is revenue ÷ units\n5. You want to filter a report by a \"High value / Low value\" label on each row. What should you use?\n   - A) A measure\n   - B) A calculated column\n   - C) A card visual\n   - D) A tooltip\n\n## Lesson summary\n\n1. Calculated columns are worked out per row and stored; measures are worked out live for the selection.\n2. Use RELATED to bring a dimension value into the fact table.\n3. SUMX calculates row by row and adds, without storing a column.\n4. Ratios and averages of totals must be measures, usually with DIVIDE.\n5. Slice or filter by it: column. Add, average or divide it: measure.\n\n## Completion check\n\n- [ ] I created the Revenue column and both Total Revenue measures (20,031,300).\n- [ ] I saw the averaging trap: 1,116.67 versus 595.35.\n- [ ] I added the Brightpath measures and the Size Band column.",
      },
      {
        title: "CALCULATE, DIVIDE and time intelligence",
        order: 4,
        durationMinutes: 120,
        videoUrl: "https://www.youtube.com/watch?v=1UdswHPRE2c",
        content: "## Lesson introduction\n\n- **What you will study:** CALCULATE (changing the filters inside a measure), DIVIDE (safe division), ALL (removing a filter for percentages of a total), and time intelligence: year to date and same period last year.\n- **Why it matters:** these are the formulas behind almost every business KPI: share of total, growth on last year, year-to-date sales.\n- **After this lesson you can:** write share-of-total, year-to-date and year-on-year measures and check their results.\n- **Estimated time:** 120 minutes.\n\n## The topic in simple English\n\nA measure normally answers for whatever the reader has selected. **CALCULATE** lets you say \"work this out, but with these filters changed\": for Groceries only, for all branches, or for last year instead of this year.\n\nTime intelligence functions are shortcuts for common date filters: \"from 1 January up to now\" (year to date) and \"the same months last year\".\n\n## Learning objectives\n\n1. Use CALCULATE to apply a filter inside a measure.\n2. Use DIVIDE for safe division.\n3. Use ALL to calculate a share of total.\n4. Write year-to-date and same-period-last-year measures.\n5. Calculate year-on-year growth and recognise the incomplete-year trap.\n\n## Main teaching content\n\n**1. CALCULATE**\n\n`Groceries Revenue = CALCULATE([Total Revenue], dim_product[category] = \"Groceries\")`\n\nThe first part is the measure; the second is the filter to apply. Whatever the reader selects, this measure only counts Groceries.\n\n**2. DIVIDE**\n\n`DIVIDE(a, b)` gives a ÷ b, but returns blank instead of an error when b is zero or blank. Always use DIVIDE rather than the / sign in measures.\n\n**3. Share of total with ALL**\n\n`Branch Share = DIVIDE([Total Revenue], CALCULATE([Total Revenue], ALL(dim_branch)))`\n\nALL(dim\\_branch) removes the branch filter, so the bottom of the fraction is always the total for all branches. In a table of branches, each row shows that branch's share.\n\n**4. Time intelligence**\n\n| Measure | DAX |\n| --- | --- |\n| Year to date | `Revenue YTD = TOTALYTD([Total Revenue], 'Calendar'[Date])` |\n| Same period last year | `Revenue LY = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR('Calendar'[Date]))` |\n| Year-on-year growth | `Revenue YoY % = DIVIDE([Total Revenue] - [Revenue LY], [Revenue LY])` |\n\nThese only work properly with a marked date table related to the fact table (Lesson 10.2).\n\n**5. The incomplete-year trap**\n\nSunrise's 2026 data stops at June. If you compare the whole of 2026 with the whole of 2025, the \"last year\" figure includes July to December 2025 and growth looks like a large fall. Compare like with like: filter both years to January–June, or compare month by month.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| CALCULATE | Evaluates an expression with modified filters | Work it out, but with these filters | \"Count only the red cars\" | Groceries Revenue |\n| DIVIDE | Safe division that returns blank on divide-by-zero | Division that never errors | Sharing sweets when nobody is there | Margin % |\n| ALL | Removes filters from a table or column | Ignore the selection | Looking at the whole class, not one pupil | Share of all branches |\n| Year to date (YTD) | Total from the start of the year to the current date | So far this year | Savings since January | Revenue YTD at June |\n| Year on year (YoY) | Change compared with the same period one year earlier | Compared with last year | This March against last March | March 2026 +7.3% |\n\n## Step-by-step demonstration: Sunrise KPIs\n\n**1. CALCULATE and DIVIDE**\n\n1. Open **Sunrise model.pbix**. Create `Groceries Revenue = CALCULATE([Total Revenue], dim_product[category] = \"Groceries\")`. In a card it shows 8,112,500.\n2. Create `Groceries Share = DIVIDE([Groceries Revenue], [Total Revenue])` and format it as a percentage: 40.5%.\n\n**2. Share of total**\n\n3. Create `Branch Share = DIVIDE([Total Revenue], CALCULATE([Total Revenue], ALL(dim_branch)))`, formatted as a percentage.\n4. Add a **Table** visual with **branch**, **Total Revenue** and **Branch Share**, and a **Year** slicer set to 2026. You should see Hilltop 3,086,650 (45.4%), Central 2,315,600 (34.0%) and Riverside 1,404,000 (20.6%).\n\n**3. Year to date and last year**\n\n5. Create `Revenue YTD`, `Revenue LY` and `Revenue YoY %` exactly as in section D.\n6. Clear the slicer. Add a **Matrix** visual: rows **Year** then **Month** (from Calendar); values **Total Revenue**, **Revenue YTD**, **Revenue LY** and **Revenue YoY %**.\n7. Expand 2026 and read March: Total Revenue 1,159,600; Revenue LY 1,080,500; YoY +7.3%; Revenue YTD 3,269,850.\n8. Read June 2026: Revenue YTD 6,806,250. Every month of 2026 is up about 7.2–7.5% on the same month of 2025.\n\n**4. Spot the trap**\n\n9. Collapse the matrix to years. The 2026 row shows Total Revenue 6,806,250 and Revenue LY 13,225,050, so YoY looks like −48.5%. This is wrong as a business conclusion: 2026 has six months of data and 2025 has twelve.\n10. Add a slicer on **Month Number** and select 1 to 6. Now the 2026 row shows Revenue LY 6,344,600 and YoY **+7.3%**, the honest like-for-like comparison.\n\n**5. Branch growth**\n\n11. Keep months 1–6 selected and add a table of **branch** with **Total Revenue**, **Revenue LY** and **Revenue YoY %** for 2026: Hilltop +11.9%, Central +8.1%, Riverside −2.8%. Riverside is the only branch selling less than last year.\n\n## Practical exercise\n\n- **Task:** add time intelligence to the Brightpath model.\n- **Steps:** create Revenue YTD, Revenue LY and Revenue YoY % for Brightpath (using your Total Revenue measure), and `IT Support Revenue = CALCULATE([Total Revenue], dim_department[department] = \"IT Support\")`. Build a matrix of Year and Month with these measures; then filter Month Number to 1–4.\n- **Expected output:** April 2026 Revenue YTD 966,000; for January–April, 2026 revenue 966,000 against 808,000 in 2025, YoY +19.6%; IT Support Revenue for January–April 2026 195,000.\n- **Submit:** a screenshot of the matrix with the Month Number filter applied.\n\n## Knowledge check\n\n1. What does CALCULATE do?\n   - A) Creates a new table\n   - B) Sorts a column\n   - C) Formats a number\n   - D) Evaluates a measure with changed filters\n2. Why use DIVIDE instead of the / sign?\n   - A) DIVIDE is faster to type\n   - B) DIVIDE returns blank instead of an error when dividing by zero\n   - C) The / sign is not allowed in DAX\n   - D) DIVIDE rounds the answer\n3. In `CALCULATE([Total Revenue], ALL(dim_branch))`, what does ALL do?\n   - A) Adds all the columns together\n   - B) Selects the largest branch\n   - C) Removes the branch filter so the result is the total for all branches\n   - D) Deletes the branch table\n4. What does TOTALYTD return for June 2026?\n   - A) Revenue from 1 January 2026 to the end of June 2026\n   - B) Revenue for June only\n   - C) Revenue for the whole of 2025\n   - D) Revenue since the shop opened\n5. 2026 data stops in June. Why is a full-year 2026 versus 2025 comparison misleading?\n   - A) DAX cannot compare years\n   - B) 2025 had more branches\n   - C) It compares six months with twelve; compare the same months instead\n   - D) Prices changed every month\n\n## Lesson summary\n\n1. CALCULATE changes the filters a measure uses.\n2. DIVIDE is safe division; use it for every ratio.\n3. ALL removes a filter, which gives you a share of total.\n4. TOTALYTD and SAMEPERIODLASTYEAR need a marked date table.\n5. Always compare like with like: the same months in each year.\n\n## Completion check\n\n- [ ] Groceries Revenue shows 8,112,500 and Groceries Share 40.5%.\n- [ ] My matrix shows March 2026 +7.3% and June 2026 YTD 6,806,250.\n- [ ] I fixed the incomplete-year trap with a Month Number filter.",
      },
    ],
    assignmentTitle: "Brightpath finance model",
    assignmentDescription: "Brightpath Services' finance director wants a reliable Power BI model of revenue and cost by department, January 2025 to April 2026, and an honest comparison of January–April 2026 with the same months of 2025.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "Which table should hold quantities sold each month?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "A dimension table",
            isCorrect: false,
          },
          {
            text: "A fact table",
            isCorrect: true,
          },
          {
            text: "The Calendar table",
            isCorrect: false,
          },
          {
            text: "A slicer",
            isCorrect: false,
          },
        ],
      },
      {
        text: "In a star schema, how do dimension tables connect?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "To each other in a chain",
            isCorrect: false,
          },
          {
            text: "Only through the Calendar table",
            isCorrect: false,
          },
          {
            text: "They do not connect",
            isCorrect: false,
          },
          {
            text: "Each one directly to the fact table",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What must you do so Power BI uses your Calendar table for time intelligence?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Mark it as a date table",
            isCorrect: true,
          },
          {
            text: "Rename it \"Dates\"",
            isCorrect: false,
          },
          {
            text: "Put it on a report page",
            isCorrect: false,
          },
          {
            text: "Delete the month_start column",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which should normally be a measure?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "A product's category",
            isCorrect: false,
          },
          {
            text: "A branch's area",
            isCorrect: false,
          },
          {
            text: "Margin %",
            isCorrect: true,
          },
          {
            text: "A customer's name",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the grain of fact_sales?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "One product, at one branch, in one month",
            isCorrect: true,
          },
          {
            text: "One customer",
            isCorrect: false,
          },
          {
            text: "One day",
            isCorrect: false,
          },
          {
            text: "One branch",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which DAX gives revenue for the same months last year?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "SUM(fact_sales[quantity])",
            isCorrect: false,
          },
          {
            text: "TOTALYTD([Total Revenue], 'Calendar'[Date])",
            isCorrect: false,
          },
          {
            text: "DIVIDE([Total Revenue], 12)",
            isCorrect: false,
          },
          {
            text: "CALCULATE([Total Revenue], SAMEPERIODLASTYEAR('Calendar'[Date]))",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Total revenue for 2026 is 6,806,250 and the same period last year is 6,344,600. What is the growth?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "+6.8%",
            isCorrect: false,
          },
          {
            text: "+46.2%",
            isCorrect: false,
          },
          {
            text: "+7.3%",
            isCorrect: true,
          },
          {
            text: "−7.3%",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which formula gives each branch's share of all branches' revenue?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "SUM(dim_branch[branch])",
            isCorrect: false,
          },
          {
            text: "DIVIDE([Total Revenue], CALCULATE([Total Revenue], ALL(dim_branch)))",
            isCorrect: true,
          },
          {
            text: "[Total Revenue] / 3",
            isCorrect: false,
          },
          {
            text: "COUNTROWS(dim_branch)",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does an iterator such as SUMX do?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Calculates an expression for each row, then combines the results",
            isCorrect: true,
          },
          {
            text: "Removes filters",
            isCorrect: false,
          },
          {
            text: "Creates a relationship",
            isCorrect: false,
          },
          {
            text: "Sorts a column by another column",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why is single cross-filter direction the safe default?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Both directions are not allowed",
            isCorrect: false,
          },
          {
            text: "Single direction deletes duplicates",
            isCorrect: false,
          },
          {
            text: "It makes visuals colourful",
            isCorrect: false,
          },
          {
            text: "Filters flow predictably from dimensions to facts; both directions can give confusing or slow results",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which table holds the events you add up, such as quantities sold?",
        type: "multiple_choice",
        points: 1,
        explanation: "facts hold events",
        answers: [
          {
            text: "A dimension table",
            isCorrect: false,
          },
          {
            text: "A fact table",
            isCorrect: true,
          },
          {
            text: "A date format",
            isCorrect: false,
          },
          {
            text: "A slicer",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does the grain of a fact table describe?",
        type: "multiple_choice",
        points: 1,
        explanation: "what one row represents",
        answers: [
          {
            text: "The colour of the table in Model view",
            isCorrect: false,
          },
          {
            text: "The number of columns",
            isCorrect: false,
          },
          {
            text: "The file size",
            isCorrect: false,
          },
          {
            text: "What one row represents",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which column belongs in a dimension table?",
        type: "multiple_choice",
        points: 1,
        explanation: "category describes",
        answers: [
          {
            text: "Product category",
            isCorrect: true,
          },
          {
            text: "Quantity sold",
            isCorrect: false,
          },
          {
            text: "Revenue for the month",
            isCorrect: false,
          },
          {
            text: "Number of transactions",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why should a product's name be stored once in dim_product rather than on every sales row?",
        type: "multiple_choice",
        points: 1,
        explanation: "one place, consistent",
        answers: [
          {
            text: "Power BI cannot store text in fact tables",
            isCorrect: false,
          },
          {
            text: "It makes the charts brighter",
            isCorrect: false,
          },
          {
            text: "It avoids repetition and inconsistent spellings, and changes happen in one place",
            isCorrect: true,
          },
          {
            text: "Names are not needed at all",
            isCorrect: false,
          },
        ],
      },
      {
        text: "fact_sales has a monthly grain. Which question can it NOT answer?",
        type: "multiple_choice",
        points: 1,
        explanation: "no day-level detail",
        answers: [
          {
            text: "Which day of the week sells most?",
            isCorrect: true,
          },
          {
            text: "Which branch sold most in March 2026?",
            isCorrect: false,
          },
          {
            text: "How did Groceries revenue change from 2025 to 2026?",
            isCorrect: false,
          },
          {
            text: "Which product sold most in the first half of 2026?",
            isCorrect: false,
          },
        ],
      },
      {
        text: "In a star schema, what is in the middle?",
        type: "multiple_choice",
        points: 1,
        explanation: "the fact table",
        answers: [
          {
            text: "The date table only",
            isCorrect: false,
          },
          {
            text: "A slicer",
            isCorrect: false,
          },
          {
            text: "The fact table",
            isCorrect: true,
          },
          {
            text: "The largest dimension",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which way should filters normally flow?",
        type: "multiple_choice",
        points: 1,
        explanation: "single, dimension to fact",
        answers: [
          {
            text: "From the dimension to the fact table (single direction)",
            isCorrect: true,
          },
          {
            text: "Both ways on every relationship",
            isCorrect: false,
          },
          {
            text: "From the fact table to the dimension only",
            isCorrect: false,
          },
          {
            text: "Filters do not flow",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why does a model need a date table?",
        type: "multiple_choice",
        points: 1,
        explanation: "complete calendar needed",
        answers: [
          {
            text: "To store product prices",
            isCorrect: false,
          },
          {
            text: "To replace the fact table",
            isCorrect: false,
          },
          {
            text: "To make the file smaller",
            isCorrect: false,
          },
          {
            text: "Time intelligence functions need a complete calendar of dates",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Why set the Month column to sort by Month Number?",
        type: "multiple_choice",
        points: 1,
        explanation: "calendar order",
        answers: [
          {
            text: "To make months appear in red",
            isCorrect: false,
          },
          {
            text: "So months appear Jan, Feb, Mar instead of alphabetically",
            isCorrect: true,
          },
          {
            text: "To delete empty months",
            isCorrect: false,
          },
          {
            text: "It is required to save the file",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is the correct cardinality from dim_branch to fact_sales?",
        type: "multiple_choice",
        points: 1,
        explanation: "one-to-many",
        answers: [
          {
            text: "One-to-one",
            isCorrect: false,
          },
          {
            text: "Many-to-many",
            isCorrect: false,
          },
          {
            text: "None",
            isCorrect: false,
          },
          {
            text: "One-to-many",
            isCorrect: true,
          },
        ],
      },
      {
        text: "You want a total that changes when the reader picks a different year. What should you create?",
        type: "multiple_choice",
        points: 1,
        explanation: "a measure responds to filters",
        answers: [
          {
            text: "A measure",
            isCorrect: true,
          },
          {
            text: "A calculated column",
            isCorrect: false,
          },
          {
            text: "A new CSV file",
            isCorrect: false,
          },
          {
            text: "A text box",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does RELATED(dim_product[unit_price]) do in a fact table column?",
        type: "multiple_choice",
        points: 1,
        explanation: "fetches the related price",
        answers: [
          {
            text: "Deletes the price",
            isCorrect: false,
          },
          {
            text: "Creates a relationship",
            isCorrect: false,
          },
          {
            text: "Fetches the matching product's price from the dimension",
            isCorrect: true,
          },
          {
            text: "Sorts the table",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why does SUMX give the same total as SUM of a Revenue column?",
        type: "multiple_choice",
        points: 1,
        explanation: "row by row, then adds",
        answers: [
          {
            text: "It rounds the numbers",
            isCorrect: false,
          },
          {
            text: "It calculates quantity × price row by row and then adds the results",
            isCorrect: true,
          },
          {
            text: "It ignores the prices",
            isCorrect: false,
          },
          {
            text: "It only uses the first row",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why is averaging the unit_price column wrong for \"average price per unit sold\"?",
        type: "multiple_choice",
        points: 1,
        explanation: "rows weighted equally",
        answers: [
          {
            text: "Prices cannot be averaged in Power BI",
            isCorrect: false,
          },
          {
            text: "The column is text",
            isCorrect: false,
          },
          {
            text: "It gives a bigger total",
            isCorrect: false,
          },
          {
            text: "Every row counts equally, however many units it sold; the right answer is revenue ÷ units",
            isCorrect: true,
          },
        ],
      },
      {
        text: "You want to filter a report by a \"High value / Low value\" label on each row. What should you use?",
        type: "multiple_choice",
        points: 1,
        explanation: "a column to slice by",
        answers: [
          {
            text: "A measure",
            isCorrect: false,
          },
          {
            text: "A calculated column",
            isCorrect: true,
          },
          {
            text: "A card visual",
            isCorrect: false,
          },
          {
            text: "A tooltip",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does CALCULATE do?",
        type: "multiple_choice",
        points: 1,
        explanation: "changes the filters",
        answers: [
          {
            text: "Creates a new table",
            isCorrect: false,
          },
          {
            text: "Sorts a column",
            isCorrect: false,
          },
          {
            text: "Formats a number",
            isCorrect: false,
          },
          {
            text: "Evaluates a measure with changed filters",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Why use DIVIDE instead of the / sign?",
        type: "multiple_choice",
        points: 1,
        explanation: "blank, not an error",
        answers: [
          {
            text: "DIVIDE is faster to type",
            isCorrect: false,
          },
          {
            text: "DIVIDE returns blank instead of an error when dividing by zero",
            isCorrect: true,
          },
          {
            text: "The / sign is not allowed in DAX",
            isCorrect: false,
          },
          {
            text: "DIVIDE rounds the answer",
            isCorrect: false,
          },
        ],
      },
      {
        text: "In CALCULATE([Total Revenue], ALL(dim_branch)), what does ALL do?",
        type: "multiple_choice",
        points: 1,
        explanation: "removes the branch filter",
        answers: [
          {
            text: "Adds all the columns together",
            isCorrect: false,
          },
          {
            text: "Selects the largest branch",
            isCorrect: false,
          },
          {
            text: "Removes the branch filter so the result is the total for all branches",
            isCorrect: true,
          },
          {
            text: "Deletes the branch table",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does TOTALYTD return for June 2026?",
        type: "multiple_choice",
        points: 1,
        explanation: "1 Jan to end of June",
        answers: [
          {
            text: "Revenue from 1 January 2026 to the end of June 2026",
            isCorrect: true,
          },
          {
            text: "Revenue for June only",
            isCorrect: false,
          },
          {
            text: "Revenue for the whole of 2025",
            isCorrect: false,
          },
          {
            text: "Revenue since the shop opened",
            isCorrect: false,
          },
        ],
      },
      {
        text: "2026 data stops in June. Why is a full-year 2026 versus 2025 comparison misleading?",
        type: "multiple_choice",
        points: 1,
        explanation: "six months against twelve",
        answers: [
          {
            text: "DAX cannot compare years",
            isCorrect: false,
          },
          {
            text: "2025 had more branches",
            isCorrect: false,
          },
          {
            text: "It compares six months with twelve; compare the same months instead",
            isCorrect: true,
          },
          {
            text: "Prices changed every month",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 11,
    moduleTitle: "Building Interactive Power BI Dashboards",
    moduleDescription: "Learners turn the Module 10 model into a dashboard that managers can explore: planned around business questions, with slicers, filters, drill-down and drill-through, KPI cards, conditional formatting and tooltips, and finally shared and reviewed. Lessons use Sunrise model.pbix from Module 10; the assignment uses Brightpath model.pbix. Every figure quoted was calculated from the course files in a separate program. Menu names in Power BI Desktop change from version to version, so wording may differ slightly; the Power BI steps have not yet been clicked through (see the status section).",
    lessons: [
      {
        title: "Planning a dashboard around business questions",
        order: 1,
        durationMinutes: 75,
        videoUrl: "https://www.youtube.com/watch?v=t3cAUt7sOQg",
        content: "## Lesson introduction\n\n- **What you will study:** how to plan a dashboard before building it: the audience, their questions, the KPIs that answer them, and a simple sketch (wireframe).\n- **Why it matters:** most weak dashboards fail at the planning stage. They show what is easy to chart rather than what the reader needs to decide.\n- **After this lesson you can:** write a one-page dashboard plan and sketch the layout.\n- **Estimated time:** 75 minutes.\n\n## The topic in simple English\n\nBefore building a house, you draw a plan: how many rooms, who lives there, where the doors go. A dashboard is the same. Ask the people who will use it what they need to know, then decide what goes on each page.\n\nA good plan fits on one sheet of paper: who it is for, the three to five questions it answers, the KPI for each question, and a sketch of the page.\n\n## Learning objectives\n\n1. Identify the audience and the decisions they make.\n2. Turn vague requests into specific business questions.\n3. Choose a KPI and a visual for each question.\n4. Sketch a wireframe with a clear reading order.\n5. Decide which pages, slicers and detail views are needed.\n\n## Main teaching content\n\n**1. From request to questions**\n\nManagers often ask for \"a sales dashboard\". Ask follow-up questions until you have specific ones:\n\n| Vague request | Specific question | KPI |\n| --- | --- | --- |\n| \"How are we doing?\" | Are sales up on the same months last year? | Revenue YoY % |\n| \"Which shops are struggling?\" | Which branch is growing slowest or shrinking? | YoY % by branch |\n| \"What sells?\" | Which category brings in most revenue? | Revenue and share by category |\n| \"Is it getting better?\" | How is revenue moving month by month? | Monthly revenue against last year |\n\n**2. The dashboard plan**\n\n| Part | Sunrise example |\n| --- | --- |\n| Audience | Regional manager, reviews monthly |\n| Decisions | Where to send support, stock and promotions |\n| Questions | The four in the table above |\n| Filters | Year, month, branch, category |\n| Detail | A branch detail page reached by drill-through |\n| Refresh | Monthly, after month-end figures arrive |\n\n**3. The wireframe**\n\n```\n+-----------------------------------------------------------+\n| Title                         [Year] [Month] [Category]   |\n+--------------+--------------+--------------+--------------+\n| Revenue      | vs last year | Units sold   | Avg price    |\n+--------------+--------------+--------------+--------------+\n| Monthly revenue, this year    | Revenue and growth by     |\n| against last year (line)      | branch (bar)              |\n+-------------------------------+---------------------------+\n| Revenue by category (column)  | Note: what to look at     |\n+-------------------------------+---------------------------+\n```\n\n**4. Keep it to what matters**\n\nFor each visual, ask: \"which question does this answer?\" If none, leave it out. Two focused pages beat one crowded page.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Requirement | A documented need the dashboard must meet | What the user needs | A shopping list | \"Show growth by branch\" |\n| Stakeholder | A person affected by or interested in the work | Someone who cares about the result | Parents at a school meeting | The regional manager |\n| Wireframe | A simple sketch of a page layout | A rough drawing | A floor plan | Boxes for cards and charts |\n| User story | A short statement of who needs what and why | A need in one sentence | \"As a cook I need sharp knives to chop fast\" | \"As a manager I need branch growth to target support\" |\n| Scope | What is included and excluded | The boundaries | What a ticket covers | Monthly data only, no daily view |\n\n## Step-by-step demonstration: planning the Sunrise dashboard\n\n1. **Interview.** Write five questions to ask the regional manager: What decisions will you make with this? How often will you look? Which comparisons matter? What would worry you? Who else will see it?\n2. **Write user stories.** For example: \"As the regional manager, I need to see each branch's growth on last year, so I can decide where to send support.\"\n3. **List questions and KPIs.** Use the table in section D.\n4. **Check the data can answer them.** The model has monthly data from January 2025 to June 2026, so like-for-like growth for January–June is possible; daily patterns are not (Lesson 10.1).\n5. **Sketch the wireframe** on paper or in a blank Power BI page using rectangles (**Insert**, **Shapes**).\n6. **Plan a second page:** \"Branch detail\", reached by drill-through, showing one branch's categories and monthly trend.\n7. Save the plan as a short document with your project files.\n\n## Practical exercise\n\n- **Task:** plan a dashboard for Brightpath's finance director.\n- **Steps:** write three user stories; list four questions with a KPI for each (using the Module 10 measures); choose slicers; sketch a two-page wireframe (Overview and Department detail).\n- **Expected output:** questions such as \"Is revenue up on the same months last year?\" (Revenue YoY %), \"Which department is least profitable?\" (Margin % by department), \"Is IT Support's margin recovering?\" (monthly IT Support Margin %), \"How much have we earned so far this year?\" (Revenue YTD); slicers for Year, Month Number and Department.\n- **Submit:** the plan and a photo or screenshot of the wireframe.\n\n## Knowledge check\n\n1. What should you do first when asked for \"a sales dashboard\"?\n   - A) Ask about the audience, their decisions and their specific questions\n   - B) Add every chart type available\n   - C) Choose the colours\n   - D) Publish an empty report\n2. Which is a specific business question?\n   - A) \"Show me the data\"\n   - B) \"Which branch is growing slowest compared with the same months last year?\"\n   - C) \"Make it look good\"\n   - D) \"Add some charts\"\n3. What is a wireframe?\n   - A) A type of relationship\n   - B) A DAX function\n   - C) A simple sketch of where each item goes on the page\n   - D) A security setting\n4. A visual does not answer any of the planned questions. What should you do?\n   - A) Make it the largest visual\n   - B) Add a second copy\n   - C) Move it to the top\n   - D) Leave it out\n5. The data is monthly. Which request should you tell the manager the dashboard cannot answer?\n   - A) Growth on last year by branch\n   - B) Revenue by category\n   - C) Busiest hour of the day\n   - D) Monthly revenue trend\n\n## Lesson summary\n\n1. Plan before you build: audience, decisions, questions.\n2. Turn vague requests into specific questions, each with a KPI.\n3. Check that the data's grain can answer each question.\n4. Sketch a wireframe with KPIs at the top and explaining visuals below.\n5. Every visual must answer a planned question.\n\n## Completion check\n\n- [ ] I wrote user stories and questions for the Sunrise dashboard.\n- [ ] I sketched a two-page wireframe.\n- [ ] I planned the Brightpath dashboard.",
      },
      {
        title: "Slicers, filters and drill-down",
        order: 2,
        durationMinutes: 110,
        videoUrl: "https://www.youtube.com/watch?v=BbplhqDCWOM",
        content: "## Lesson introduction\n\n- **What you will study:** slicers, the three levels of filter in the Filters pane, editing interactions between visuals, syncing slicers across pages, drill-down through a hierarchy, and drill-through to a detail page.\n- **Why it matters:** interactivity lets managers answer their own follow-up questions without asking for a new report each time.\n- **After this lesson you can:** build a dashboard page whose visuals filter, cross-highlight, drill down and drill through correctly.\n- **Estimated time:** 110 minutes.\n\n## The topic in simple English\n\nA slicer is a set of buttons on the page; filters are settings in a side panel. Both narrow down what the visuals count.\n\nDrill-down is like zooming in on a map: from years to months, or from category to product. Drill-through is like clicking a town on a map to open a page all about that town.\n\n## Learning objectives\n\n1. Add and format slicers, including a dropdown and a between (range) slicer.\n2. Use visual, page and report filters in the Filters pane.\n3. Edit interactions so a click filters only the visuals it should.\n4. Sync a slicer across pages.\n5. Build drill-down and drill-through.\n\n## Main teaching content\n\n**1. Slicers or filters?**\n\n|  | Slicer | Filters pane |\n| --- | --- | --- |\n| Where | On the page | In a side panel |\n| Best for | Choices readers change often (year, branch) | Fixed settings or less-used choices |\n| Levels | One page (can be synced across pages) | One visual, one page, or all pages |\n\n**2. Interactions**\n\nBy default, clicking a bar filters or highlights the other visuals on the page. Use **Format**, **Edit interactions** to choose, for each other visual, **Filter**, **Highlight** or **None**. For example, KPI cards that should always show the whole year can be set to None for a monthly chart.\n\n**3. Sync slicers**\n\n**View**, **Sync slicers** lets one Year slicer control several pages, so a reader who picks 2026 on page 1 still sees 2026 on page 2.\n\n**4. Drill-down**\n\nPut more than one field in a chart's axis, for example **Year** then **Month**. Arrows appear on the visual: turn on drill mode (the single down arrow) and click a year to see its months, or use \"go to the next level\" (the double down arrow).\n\n**5. Drill-through**\n\nCreate a detail page and put **branch** in its **Drill through** box. On any other page, right-click a branch's bar and choose **Drill through**, then the page name. The detail page opens filtered to that branch, with a back button to return.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Slicer | An on-canvas visual that filters other visuals | Filter buttons on the page | TV channel buttons | A Year slicer |\n| Filters pane | The side panel holding visual, page and report filters | The hidden filter settings | Settings on a phone | Page filter: Year = 2026 |\n| Cross-highlighting | Highlighting the matching part of other visuals when one is clicked | Click one, the rest light up | Pointing at a place on two maps | Clicking Hilltop highlights its share in other charts |\n| Drill-down | Moving from a summary level to a more detailed level in a hierarchy | Zooming in | Country, then city, then street | Year, then month |\n| Drill-through | Jumping to a detail page filtered to the selected item | Opening the details page | Clicking a product to see its page | Branch detail page |\n\n## Step-by-step demonstration: an interactive Sunrise overview\n\n**1. Slicers**\n\n1. Open **Sunrise model.pbix** and add a new page called **Overview**.\n2. Add a slicer with **Year**. In its format options, set the style to **Tile** (buttons).\n3. Add a slicer with **Month Number** and set its style to **Between**, then drag it to 1–6. This keeps comparisons like for like (Lesson 10.4).\n4. Add a **Dropdown** slicer with **category**.\n\n**2. Visuals**\n\n5. Add a clustered bar chart of **branch** with **Revenue YoY %**. With 2026 and months 1–6 selected it shows Hilltop +11.9%, Central +8.1% and Riverside −2.8%.\n6. Add a line chart with **Month** on the X-axis and **Total Revenue** and **Revenue LY** as values.\n7. Add a column chart with **Year** then **Month** on the X-axis and **Total Revenue** as the value.\n\n**3. Interactions**\n\n8. Click the branch bar chart, then **Format**, **Edit interactions**. On the line chart, choose **Filter** (the funnel icon). Click **Edit interactions** again to finish. Now clicking Riverside shows Riverside's monthly line.\n\n**4. Drill-down**\n\n9. On the Year-Month column chart, turn on drill mode (single down arrow) and click the 2025 column. It shows 2025's twelve months. Click the up arrow to go back.\n\n**5. Drill-through**\n\n10. Add a page called **Branch detail**. Drag **branch** into the **Drill through** box in the Visualizations pane. Add a card with **Total Revenue**, a column chart of **category** with Total Revenue and Revenue LY, and a line chart by Month.\n11. Go back to **Overview**, right-click Riverside's bar and choose **Drill through**, **Branch detail**. For 2026, months 1–6, the page shows every Riverside category below last year: Drinks 518,000 (−3.0%), Groceries 572,500 (−2.6%) and Snacks 313,500 (−2.9%). The fall is across all categories, which suggests fewer customers rather than one product problem.\n12. Click **View**, **Sync slicers** and tick the Year and Month Number slicers for both pages.\n\n## Practical exercise\n\n- **Task:** add interactivity to the Brightpath model.\n- **Steps:** add Year (tile), Month Number (between) and Department (dropdown) slicers; a bar chart of department with Revenue YoY %; a column chart with Year then Month for Total Revenue; a Department detail drill-through page with monthly Margin %; sync the slicers across both pages.\n- **Expected output:** with 2026 and months 1–4, the bar chart shows Training +28.1%, IT Support +18.9% and Consulting +15.5%; drilling through to IT Support shows its monthly margin falling from 15.6% in January to 8.0% in April.\n- **Submit:** screenshots of both pages and of the drill-through menu.\n\n## Knowledge check\n\n1. What is the difference between drill-down and drill-through?\n   - A) There is no difference\n   - B) Drill-down deletes data; drill-through adds it\n   - C) Drill-down moves to a more detailed level in the same visual; drill-through opens a detail page for the selected item\n   - D) Drill-through only works on maps\n2. A reader picks 2026 on page 1 and wants page 2 to show 2026 too. What should you use?\n   - A) A text box\n   - B) Conditional formatting\n   - C) A tooltip\n   - D) Sync slicers\n3. You want a click on a bar to filter a line chart but not the KPI cards. What should you use?\n   - A) Edit interactions\n   - B) Mark as date table\n   - C) A calculated column\n   - D) Publish to web\n4. Which filter level applies to every page of a report?\n   - A) Visual-level filter\n   - B) Report-level filter (filters on all pages)\n   - C) Page-level filter\n   - D) Slicer on one page only\n5. Why does the demonstration set the Month Number slicer to 1–6?\n   - A) Power BI only shows six months\n   - B) To hide the totals\n   - C) To make the chart smaller\n   - D) To compare the same months in each year, because 2026 data stops in June\n\n## Lesson summary\n\n1. Slicers sit on the page; the Filters pane works at visual, page and report level.\n2. Edit interactions controls what each click affects.\n3. Sync slicers keeps choices the same across pages.\n4. Drill-down zooms within a hierarchy; drill-through opens a detail page.\n5. Keep comparisons like for like with a month range slicer.\n\n## Completion check\n\n- [ ] My Overview page has three slicers and three visuals with edited interactions.\n- [ ] I drilled down from year to month.\n- [ ] I drilled through to Riverside and found every category down.",
      },
      {
        title: "KPI cards, conditional formatting and tooltips",
        order: 3,
        durationMinutes: 100,
        videoUrl: "https://www.youtube.com/watch?v=AnrGyoYsTmI",
        content: "## Lesson introduction\n\n- **What you will study:** KPI visuals that compare a value with a target, conditional formatting (colour rules, data bars and icons), dynamic titles, and custom tooltip pages.\n- **Why it matters:** these features make the important things jump out: a red flag on a falling branch, a bar that shows size at a glance, extra detail on hover without cluttering the page.\n- **After this lesson you can:** add comparison KPIs, rule-based formatting and a report-page tooltip to a dashboard.\n- **Estimated time:** 100 minutes.\n\n## The topic in simple English\n\nA KPI card says \"here is the number, and here is how it compares\". Conditional formatting is like a teacher marking a test in red pen: the cells that need attention are coloured so your eye goes straight to them.\n\nA tooltip is the small box that appears when you hover over a chart. You can design your own, so hovering over a branch shows a mini chart of that branch's months.\n\n## Learning objectives\n\n1. Build a KPI visual with a value, a trend and a target.\n2. Apply rule-based conditional formatting to a table.\n3. Add data bars and icons without relying on colour alone.\n4. Create a dynamic title with a measure.\n5. Build and attach a report-page tooltip.\n\n## Main teaching content\n\n**1. Comparison KPIs**\n\nA number on its own means little. Always pair it with a comparison: last year, a target or the previous month. The **KPI** visual takes a **Value** (Total Revenue), a **Trend axis** (Month) and a **Target** (Revenue LY), and shows whether the value is above or below the target.\n\n**2. Conditional formatting**\n\nIn a table or matrix, open a field's menu in the **Columns** (or **Values**) box and choose **Conditional formatting**:\n\n| Type | Use it for |\n| --- | --- |\n| Background or font colour, by rules | Flagging values below a threshold, such as YoY % below 0 |\n| Data bars | Showing size inside the cell, like a mini bar chart |\n| Icons | Up and down arrows that work without colour |\n\nAbout 1 in 12 men have difficulty telling red from green, so pair colours with icons or labels (Module 8).\n\n**3. Dynamic titles**\n\nA title can change with the slicers. Create a measure such as:\n\n`Page Title = \"Sunrise Mart revenue, \" & SELECTEDVALUE('Calendar'[Year], \"all years\")`\n\nThen, in the visual's title settings, click the **fx** button and choose this measure. The title now reads \"Sunrise Mart revenue, 2026\" when 2026 is selected.\n\n**4. Report-page tooltips**\n\nA tooltip page is a small report page shown when hovering. Set it up once and attach it to any visual; it automatically filters to the item under the mouse.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| KPI visual | A visual showing a value against a target, with a trend | Number plus \"on track or not\" | A fuel gauge with a reserve mark | Revenue against last year |\n| Conditional formatting | Formatting that changes with the value | Automatic highlighting | Red ink for low marks | YoY % below 0 shown in orange |\n| Data bars | Bars drawn inside table cells in proportion to the value | A mini chart in a cell | A thermometer | Revenue by branch |\n| Dynamic title | A title produced by a measure, so it reflects the selection | A title that updates | A scoreboard naming the current game | \"Sunrise Mart revenue, 2026\" |\n| Report-page tooltip | A small report page shown on hover, filtered to that item | A pop-up mini report | A price tag that flips to show details | Hover over a branch to see its months |\n\n## Step-by-step demonstration: highlighting what matters\n\n**1. KPI cards**\n\n1. On the **Overview** page, with 2026 and months 1–6 selected, add a **KPI** visual. Value: **Total Revenue**; Trend axis: **Month**; Target: **Revenue LY**. It shows 6,806,250 against a target of 6,344,600, with the indicator showing above target.\n2. Add **Card** visuals for **Revenue YoY %** (+7.3%), **Units Sold** (11,431) and **Avg Price per Unit** (595.42). Line all four up across the top as in the wireframe.\n\n**2. Conditional formatting**\n\n3. Add a **Table** visual with **branch**, **Total Revenue**, **Revenue LY** and **Revenue YoY %**.\n4. In the **Columns** box, open the menu on **Revenue YoY %**, choose **Conditional formatting**, **Font color**. Set **Format style** to **Rules**: if value is less than 0, dark orange; if value is greater than or equal to 0, dark blue. Click **OK**. Riverside's −2.8% now stands out.\n5. Open the same menu, choose **Conditional formatting**, **Icons**, and keep the default up and down arrows. The table now works without colour too.\n6. On **Total Revenue**, add **Data bars**.\n\n**3. Dynamic title**\n\n7. Create the **Page Title** measure from section D. Add a **Card** at the top of the page with this measure, or use **fx** on a chart's title. Select 2025 in the Year slicer and watch it change.\n\n**4. Tooltip page**\n\n8. Add a new page named **Branch tooltip**. In **Format page**, turn on **Allow use as tooltip** (under Page information) and set **Canvas settings** type to **Tooltip**.\n9. On this small page, add a line chart of **Month** with **Total Revenue** and **Revenue LY**, and a card with **Revenue YoY %**.\n10. Go back to **Overview**, select the branch bar chart, open its **Format** options, **General**, **Tooltips**, set **Type** to **Report page** and **Page** to **Branch tooltip**.\n11. Hover over Hilltop: the tooltip shows Hilltop's monthly lines and +11.9%.\n\n## Practical exercise\n\n- **Task:** highlight the problems in the Brightpath dashboard.\n- **Steps:** add a KPI visual (Total Revenue against Revenue LY by Month); a table of department with Total Revenue, Margin % and Revenue YoY %; a rule that colours Margin % below 15% dark orange, with icons; data bars on Total Revenue; a dynamic title; and a Department tooltip page showing monthly Margin %.\n- **Expected output:** with 2026 and months 1–4, the KPI shows 966,000 against 808,000; the table shows Margin % of Consulting 36.1%, Training 34.9% and IT Support 12.8%, with only IT Support flagged.\n- **Submit:** a screenshot of the page and of the conditional formatting rules window.\n\n## Knowledge check\n\n1. What does a KPI visual add that a plain card does not?\n   - A) A larger font\n   - B) A list of rows\n   - C) A map\n   - D) A comparison with a target and a trend\n2. Why add icons as well as colour to a YoY % column?\n   - A) So readers who cannot easily tell colours apart still see the direction\n   - B) Icons make the file smaller\n   - C) Colour does not work in tables\n   - D) Icons are required by Power BI\n3. Which conditional formatting option draws a bar inside each cell?\n   - A) Font colour\n   - B) Data bars\n   - C) Web URL\n   - D) Background colour by rules\n4. What does `SELECTEDVALUE('Calendar'[Year], \"all years\")` return when no single year is selected?\n   - A) An error\n   - B) The first year\n   - C) The text \"all years\"\n   - D) Zero\n5. What is a report-page tooltip?\n   - A) A small report page shown on hover, filtered to the item under the mouse\n   - B) A printed help guide\n   - C) A type of relationship\n   - D) A button that publishes the report\n\n## Lesson summary\n\n1. Pair every KPI with a comparison; the KPI visual does this with a target.\n2. Use rule-based colours to flag problems.\n3. Add icons or labels so meaning does not depend on colour.\n4. Dynamic titles use a measure and the fx button.\n5. Report-page tooltips add detail without clutter.\n\n## Completion check\n\n- [ ] My KPI visual shows 6,806,250 against 6,344,600.\n- [ ] Riverside is flagged by colour and icon.\n- [ ] My tooltip page appears when I hover over a branch.",
      },
      {
        title: "Sharing options and dashboard review",
        order: 4,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=tlUGF9CdKY0",
        content: "## Lesson introduction\n\n- **What you will study:** the ways to share a Power BI report, which need a paid licence, what to avoid with confidential data, and how to review a dashboard for accuracy, clarity, speed and accessibility before release.\n- **Why it matters:** a dashboard is only useful if the right people can see it, and only trusted if it is right. One wrong total can undo months of credibility.\n- **After this lesson you can:** choose a sensible sharing route and run a structured review of any dashboard.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nSharing a report is like sharing a document: you can print it (export to PDF), send it to named colleagues (share in the Power BI service), or pin it on a public noticeboard (publish to web). The noticeboard is seen by anyone, so never put private information there.\n\nBefore sharing, check your work the way a pilot checks a plane: the same list, every time.\n\n## Learning objectives\n\n1. Describe the main sharing routes and what each needs.\n2. Explain why publish to web must not be used for confidential data.\n3. Export a report to PDF from Power BI Desktop.\n4. Reconcile dashboard totals with the source data.\n5. Run an accessibility and performance check.\n\n## Main teaching content\n\n**1. Sharing routes**\n\n| Route | What it does | What it generally needs |\n| --- | --- | --- |\n| Export to PDF (Desktop) | A static copy of every page | Nothing extra |\n| Publish to My workspace | Puts the report in the Power BI service for you | A work or school account |\n| Share or a workspace | Named colleagues can view and interact | Paid licences (such as Pro) for sharer and viewers, unless the organisation has a capacity that covers viewers |\n| App | A packaged set of reports for a wider audience | As above |\n| Publish to web | A public link anyone on the internet can open | Admin permission; only for public, non-sensitive data |\n\nLicence rules change; check your organisation's settings and Microsoft's current licensing page.\n\n**2. Refresh after publishing**\n\nA report built on files on your own computer will not refresh by itself in the service. Organisations usually store source files in shared cloud storage or connect to a database, sometimes through a gateway. Ask your IT team which route your organisation uses.\n\n**3. The review checklist**\n\n| Area | Check |\n| --- | --- |\n| Accuracy | Totals match the source (reconcile at least one total); like-for-like periods; filters reset correctly |\n| Clarity | Every visual answers a planned question; titles state findings; units and periods labelled |\n| Interactivity | Slicers, interactions, drill-through and tooltips behave as intended |\n| Performance | Pages load in a few seconds; use **Performance analyzer** to find slow visuals |\n| Accessibility | Alt text on visuals; enough colour contrast; meaning not shown by colour alone; sensible tab order |\n| Security | No confidential data where it should not be; never published to web |\n\n**4. Peer review**\n\nAsk someone who did not build the dashboard to use it for five minutes and tell you what they understood. If they cannot answer the planned questions, change the design.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Workspace | A shared area in the Power BI service for a team's content | A team folder | A shared drawer | The Finance workspace |\n| Publish to web | A feature that creates a public link to a report | Anyone with the link can see it | A public noticeboard | A public statistics page |\n| Reconcile | Check that two sources give the same figure | Make sure the totals agree | Checking your receipt against your bank statement | Dashboard total equals the CSV total |\n| Alt text | A text description of a visual for screen readers | Words describing the picture | A caption read aloud | \"Bar chart: revenue growth by branch\" |\n| Performance analyzer | A Power BI tool that times each visual | A stopwatch for visuals | Timing each runner | Finding the slowest chart |\n\n## Step-by-step demonstration: release-ready Sunrise dashboard\n\n**1. Reconcile**\n\n1. Clear all slicers. Check that a card of **Total Revenue** shows 20,031,300 and **Units Sold** 33,646. These match the totals worked out from the CSV files (quantity × price, all 162 rows).\n2. Select 2025 and check 13,225,050; select 2026 and check 6,806,250.\n\n**2. Accessibility**\n\n3. Select each visual, open **Format**, **General**, **Alt text**, and write one sentence such as \"Bar chart of revenue growth on last year by branch\".\n4. Check that the YoY % column uses icons as well as colour (Lesson 11.3).\n5. Open **View**, **Selection** and check the tab order: title, slicers, KPI cards, then charts.\n\n**3. Performance**\n\n6. Open **Performance analyzer** (on the **Optimize** or **View** tab, depending on version), click **Start recording**, then **Refresh visuals**. Each visual should take well under a second with this small model. Click **Stop**.\n\n**4. Export and share**\n\n7. Click **File**, **Export**, **Export to PDF**. Open the PDF and check every page.\n8. If you have a work or school account, click **Home**, **Publish** and choose **My workspace**. Open the report in the browser. Do not use **Publish to web** for business data.\n\n**5. Peer review**\n\n9. Ask a classmate to use the dashboard for five minutes and answer: which branch needs support, and why? Expected answer: Riverside, the only branch below last year (−2.8%), with every category down.\n\n## Practical exercise\n\n- **Task:** review a classmate's (or your own) Brightpath dashboard with the checklist.\n- **Steps:** score each checklist area 1–5 with one comment; reconcile Total Revenue (all months 3,510,000) and Total Cost (2,423,000); export the dashboard to PDF.\n- **Expected output:** a completed checklist with at least one improvement per area scored below 4, and a PDF.\n- **Submit:** the checklist and the PDF.\n\n## Knowledge check\n\n1. Which route gives a static copy of the report without any extra licence?\n   - A) Publish to web\n   - B) Export to PDF from Power BI Desktop\n   - C) An app\n   - D) A shared workspace\n2. Why must you not use publish to web for business data?\n   - A) It is too slow\n   - B) It removes the slicers\n   - C) Anyone on the internet with the link can see it\n   - D) It deletes the model\n3. What does reconciling a dashboard mean?\n   - A) Changing the colours to match the logo\n   - B) Adding more pages\n   - C) Publishing it twice\n   - D) Checking that its totals match the source data\n4. Which tool times how long each visual takes to load?\n   - A) Performance analyzer\n   - B) Sync slicers\n   - C) Mark as date table\n   - D) Edit interactions\n5. What is alt text for?\n   - A) Changing the font\n   - B) Describing a visual for people using screen readers\n   - C) Translating DAX\n   - D) Hiding a visual\n\n## Lesson summary\n\n1. Export to PDF needs nothing extra; sharing in the service generally needs paid licences.\n2. Never publish confidential data to the web.\n3. Reconcile at least one total before release.\n4. Check accessibility: alt text, contrast, not colour alone, tab order.\n5. Get a peer to test the dashboard against the planned questions.\n\n## Completion check\n\n- [ ] I reconciled 20,031,300 and 33,646.\n- [ ] I added alt text to every visual and exported a PDF.\n- [ ] I reviewed a Brightpath dashboard with the checklist.",
      },
    ],
    assignmentTitle: "Brightpath interactive finance dashboard",
    assignmentDescription: "Brightpath's finance director has seen your Module 10 model and wants a dashboard to use in monthly reviews: an overview of revenue and margin against last year, and a way to look into any department.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "What should a dashboard plan start with?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "The colour theme",
            isCorrect: false,
          },
          {
            text: "The number of pages",
            isCorrect: false,
          },
          {
            text: "The audience, their decisions and their questions",
            isCorrect: true,
          },
          {
            text: "The file name",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which feature opens a detail page filtered to the item you right-clicked?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Drill-through",
            isCorrect: true,
          },
          {
            text: "Drill-down",
            isCorrect: false,
          },
          {
            text: "Data bars",
            isCorrect: false,
          },
          {
            text: "Sync slicers",
            isCorrect: false,
          },
        ],
      },
      {
        text: "You want one Year slicer to control three pages. What do you use?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "A tooltip page",
            isCorrect: false,
          },
          {
            text: "Conditional formatting",
            isCorrect: false,
          },
          {
            text: "Publish to web",
            isCorrect: false,
          },
          {
            text: "Sync slicers",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which slicer style lets readers pick a range of months, such as 1 to 6?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Tile",
            isCorrect: false,
          },
          {
            text: "Between",
            isCorrect: true,
          },
          {
            text: "Dropdown",
            isCorrect: false,
          },
          {
            text: "Card",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A KPI visual needs a Value, a Trend axis and:",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "a relationship",
            isCorrect: false,
          },
          {
            text: "a tooltip",
            isCorrect: false,
          },
          {
            text: "a calculated column",
            isCorrect: false,
          },
          {
            text: "a Target",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which is the best way to flag negative growth for every reader?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "A colour rule plus up and down icons",
            isCorrect: true,
          },
          {
            text: "Red text only",
            isCorrect: false,
          },
          {
            text: "A larger font only",
            isCorrect: false,
          },
          {
            text: "Hiding the negative rows",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What makes the title \"Sunrise Mart revenue, 2026\" change with the slicer?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "A data bar",
            isCorrect: false,
          },
          {
            text: "A static text box",
            isCorrect: false,
          },
          {
            text: "A measure used with the fx button",
            isCorrect: true,
          },
          {
            text: "A drill-through filter",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which sharing route must never be used for confidential data?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Export to PDF",
            isCorrect: false,
          },
          {
            text: "Publish to web",
            isCorrect: true,
          },
          {
            text: "My workspace",
            isCorrect: false,
          },
          {
            text: "A secure shared workspace",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Clicking a bar should filter the line chart but not the cards. Where do you set this?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Edit interactions",
            isCorrect: true,
          },
          {
            text: "Performance analyzer",
            isCorrect: false,
          },
          {
            text: "Model view",
            isCorrect: false,
          },
          {
            text: "Alt text",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Before release, the dashboard shows total revenue 20,031,300 and the CSV total is 20,031,300. What have you done?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Drilled down",
            isCorrect: false,
          },
          {
            text: "Published to web",
            isCorrect: false,
          },
          {
            text: "Reconciled the dashboard with the source",
            isCorrect: true,
          },
          {
            text: "Created a tooltip",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What should you do first when asked for \"a sales dashboard\"?",
        type: "multiple_choice",
        points: 1,
        explanation: "audience and decisions first",
        answers: [
          {
            text: "Ask about the audience, their decisions and their specific questions",
            isCorrect: true,
          },
          {
            text: "Add every chart type available",
            isCorrect: false,
          },
          {
            text: "Choose the colours",
            isCorrect: false,
          },
          {
            text: "Publish an empty report",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is a specific business question?",
        type: "multiple_choice",
        points: 1,
        explanation: "specific and measurable",
        answers: [
          {
            text: "\"Show me the data\"",
            isCorrect: false,
          },
          {
            text: "\"Which branch is growing slowest compared with the same months last year?\"",
            isCorrect: true,
          },
          {
            text: "\"Make it look good\"",
            isCorrect: false,
          },
          {
            text: "\"Add some charts\"",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is a wireframe?",
        type: "multiple_choice",
        points: 1,
        explanation: "a layout sketch",
        answers: [
          {
            text: "A type of relationship",
            isCorrect: false,
          },
          {
            text: "A DAX function",
            isCorrect: false,
          },
          {
            text: "A simple sketch of where each item goes on the page",
            isCorrect: true,
          },
          {
            text: "A security setting",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A visual does not answer any of the planned questions. What should you do?",
        type: "multiple_choice",
        points: 1,
        explanation: "leave it out",
        answers: [
          {
            text: "Make it the largest visual",
            isCorrect: false,
          },
          {
            text: "Add a second copy",
            isCorrect: false,
          },
          {
            text: "Move it to the top",
            isCorrect: false,
          },
          {
            text: "Leave it out",
            isCorrect: true,
          },
        ],
      },
      {
        text: "The data is monthly. Which request should you tell the manager the dashboard cannot answer?",
        type: "multiple_choice",
        points: 1,
        explanation: "data is monthly",
        answers: [
          {
            text: "Growth on last year by branch",
            isCorrect: false,
          },
          {
            text: "Revenue by category",
            isCorrect: false,
          },
          {
            text: "Busiest hour of the day",
            isCorrect: true,
          },
          {
            text: "Monthly revenue trend",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the difference between drill-down and drill-through?",
        type: "multiple_choice",
        points: 1,
        explanation: "same visual versus detail page",
        answers: [
          {
            text: "There is no difference",
            isCorrect: false,
          },
          {
            text: "Drill-down deletes data; drill-through adds it",
            isCorrect: false,
          },
          {
            text: "Drill-down moves to a more detailed level in the same visual; drill-through opens a detail page for the selected item",
            isCorrect: true,
          },
          {
            text: "Drill-through only works on maps",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A reader picks 2026 on page 1 and wants page 2 to show 2026 too. What should you use?",
        type: "multiple_choice",
        points: 1,
        explanation: "sync slicers",
        answers: [
          {
            text: "A text box",
            isCorrect: false,
          },
          {
            text: "Conditional formatting",
            isCorrect: false,
          },
          {
            text: "A tooltip",
            isCorrect: false,
          },
          {
            text: "Sync slicers",
            isCorrect: true,
          },
        ],
      },
      {
        text: "You want a click on a bar to filter a line chart but not the KPI cards. What should you use?",
        type: "multiple_choice",
        points: 1,
        explanation: "edit interactions",
        answers: [
          {
            text: "Edit interactions",
            isCorrect: true,
          },
          {
            text: "Mark as date table",
            isCorrect: false,
          },
          {
            text: "A calculated column",
            isCorrect: false,
          },
          {
            text: "Publish to web",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which filter level applies to every page of a report?",
        type: "multiple_choice",
        points: 1,
        explanation: "report-level filter",
        answers: [
          {
            text: "Visual-level filter",
            isCorrect: false,
          },
          {
            text: "Report-level filter (filters on all pages)",
            isCorrect: true,
          },
          {
            text: "Page-level filter",
            isCorrect: false,
          },
          {
            text: "Slicer on one page only",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why does the demonstration set the Month Number slicer to 1–6?",
        type: "multiple_choice",
        points: 1,
        explanation: "like-for-like months",
        answers: [
          {
            text: "Power BI only shows six months",
            isCorrect: false,
          },
          {
            text: "To hide the totals",
            isCorrect: false,
          },
          {
            text: "To make the chart smaller",
            isCorrect: false,
          },
          {
            text: "To compare the same months in each year, because 2026 data stops in June",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What does a KPI visual add that a plain card does not?",
        type: "multiple_choice",
        points: 1,
        explanation: "comparison with a target",
        answers: [
          {
            text: "A larger font",
            isCorrect: false,
          },
          {
            text: "A list of rows",
            isCorrect: false,
          },
          {
            text: "A map",
            isCorrect: false,
          },
          {
            text: "A comparison with a target and a trend",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Why add icons as well as colour to a YoY % column?",
        type: "multiple_choice",
        points: 1,
        explanation: "colour-independent",
        answers: [
          {
            text: "So readers who cannot easily tell colours apart still see the direction",
            isCorrect: true,
          },
          {
            text: "Icons make the file smaller",
            isCorrect: false,
          },
          {
            text: "Colour does not work in tables",
            isCorrect: false,
          },
          {
            text: "Icons are required by Power BI",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which conditional formatting option draws a bar inside each cell?",
        type: "multiple_choice",
        points: 1,
        explanation: "data bars",
        answers: [
          {
            text: "Font colour",
            isCorrect: false,
          },
          {
            text: "Data bars",
            isCorrect: true,
          },
          {
            text: "Web URL",
            isCorrect: false,
          },
          {
            text: "Background colour by rules",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does SELECTEDVALUE('Calendar'[Year], \"all years\") return when no single year is selected?",
        type: "multiple_choice",
        points: 1,
        explanation: "the fallback text",
        answers: [
          {
            text: "An error",
            isCorrect: false,
          },
          {
            text: "The first year",
            isCorrect: false,
          },
          {
            text: "The text \"all years\"",
            isCorrect: true,
          },
          {
            text: "Zero",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is a report-page tooltip?",
        type: "multiple_choice",
        points: 1,
        explanation: "hover page",
        answers: [
          {
            text: "A small report page shown on hover, filtered to the item under the mouse",
            isCorrect: true,
          },
          {
            text: "A printed help guide",
            isCorrect: false,
          },
          {
            text: "A type of relationship",
            isCorrect: false,
          },
          {
            text: "A button that publishes the report",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which route gives a static copy of the report without any extra licence?",
        type: "multiple_choice",
        points: 1,
        explanation: "export to PDF",
        answers: [
          {
            text: "Publish to web",
            isCorrect: false,
          },
          {
            text: "Export to PDF from Power BI Desktop",
            isCorrect: true,
          },
          {
            text: "An app",
            isCorrect: false,
          },
          {
            text: "A shared workspace",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why must you not use publish to web for business data?",
        type: "multiple_choice",
        points: 1,
        explanation: "public link",
        answers: [
          {
            text: "It is too slow",
            isCorrect: false,
          },
          {
            text: "It removes the slicers",
            isCorrect: false,
          },
          {
            text: "Anyone on the internet with the link can see it",
            isCorrect: true,
          },
          {
            text: "It deletes the model",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does reconciling a dashboard mean?",
        type: "multiple_choice",
        points: 1,
        explanation: "totals match the source",
        answers: [
          {
            text: "Changing the colours to match the logo",
            isCorrect: false,
          },
          {
            text: "Adding more pages",
            isCorrect: false,
          },
          {
            text: "Publishing it twice",
            isCorrect: false,
          },
          {
            text: "Checking that its totals match the source data",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which tool times how long each visual takes to load?",
        type: "multiple_choice",
        points: 1,
        explanation: "Performance analyzer",
        answers: [
          {
            text: "Performance analyzer",
            isCorrect: true,
          },
          {
            text: "Sync slicers",
            isCorrect: false,
          },
          {
            text: "Mark as date table",
            isCorrect: false,
          },
          {
            text: "Edit interactions",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is alt text for?",
        type: "multiple_choice",
        points: 1,
        explanation: "screen readers",
        answers: [
          {
            text: "Changing the font",
            isCorrect: false,
          },
          {
            text: "Describing a visual for people using screen readers",
            isCorrect: true,
          },
          {
            text: "Translating DAX",
            isCorrect: false,
          },
          {
            text: "Hiding a visual",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 12,
    moduleTitle: "Introduction to Python for Data Analysis",
    moduleDescription: "Learners write their first Python in Google Colab, a free notebook that runs in a web browser on any computer, including Macs and Chromebooks. They learn variables, data types and lists, decisions and loops, and how to load and inspect a dataset with the Pandas library. Data files: sunrise_sales.csv (lessons) and harbour_transactions.csv (assignment), the same files as Module 9. Every piece of code in this module was run in Python 3 with Pandas 2 and the outputs shown are the actual results; Colab's own screens have not yet been clicked through (see the status section). Small differences in how output is laid out can appear in other Pandas versions.",
    lessons: [
      {
        title: "Why Python, and starting in Google Colab",
        order: 1,
        durationMinutes: 70,
        videoUrl: "https://www.youtube.com/watch?v=5sgJsCah9bs",
        content: "## Lesson introduction\n\n- **What you will study:** why analysts use Python alongside Excel, SQL and Power BI; what a notebook is; and how to create, run and save a Google Colab notebook.\n- **Why it matters:** Python is one of the most requested skills in data analyst job adverts. It automates repeated work and handles data too large or messy for a spreadsheet.\n- **After this lesson you can:** open Colab, write and run code and text cells, and save your notebook.\n- **Estimated time:** 70 minutes.\n\n## The topic in simple English\n\nPython is a programming language: a way of giving a computer precise instructions in words and symbols. Excel is like cooking by hand; Python is like writing a recipe a robot can follow again and again, exactly the same way each time.\n\nA notebook mixes short blocks of code with notes in plain English, so your analysis reads like a report and anyone can re-run it.\n\n## Learning objectives\n\n1. Explain three reasons analysts use Python.\n2. Describe what a notebook, a code cell and a text cell are.\n3. Create a Colab notebook and run code.\n4. Use print and comments.\n5. Read a simple error message and fix the mistake.\n\n## Main teaching content\n\n**1. Why Python?**\n\n| Need | Excel | Python |\n| --- | --- | --- |\n| Repeat the same cleaning every month | Repeat the clicks by hand | Re-run the notebook |\n| Large files (millions of rows) | Slows down; limit of about one million rows per sheet | Handles them comfortably |\n| A record of every step | Hard to see what was done | Every step is written down in the code |\n| Advanced analysis and automation | Limited | Many free libraries |\n\nPython does not replace Excel, SQL or Power BI. Analysts use each where it fits.\n\n**2. Google Colab**\n\nColab (colab.research.google.com) runs Python on Google's computers through your browser. You need only a free Google account; nothing is installed. Notebooks are saved in your Google Drive, in a folder called **Colab Notebooks**.\n\n**3. Cells**\n\n- **Code cells** hold Python. Run one with the play button or **Shift+Enter**; the output appears underneath.\n- **Text cells** hold notes, headings and explanations.\n\n**4. print and comments**\n\n```python\n# This is a comment: Python ignores everything after the # sign\nprint(\"Hello, Sunrise Mart\")\nprint(21550 / 10)\n```\n\nOutput:\n\n```\nHello, Sunrise Mart\n2155.0\n```\n\n**5. Errors are normal**\n\nEveryone gets errors. Read the **last line** of the message first: it names the problem. For example, `print(\"Total: \" + 21550)` gives `TypeError: can only concatenate str (not \"int\") to str`, which means you tried to join text and a number.\n\n**6. A note on AI helpers**\n\nColab may offer AI suggestions as you type. In this course, write and understand each line yourself first; you will need to explain your code in interviews and fix it when it breaks.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Python | A general-purpose programming language widely used in data work | Instructions a computer can follow | A recipe | A monthly cleaning script |\n| Notebook | A document mixing runnable code, output and text | Code and notes together | A lab notebook | An analysis of March sales |\n| Cell | One block in a notebook, either code or text | One step | One paragraph | A cell that loads the data |\n| Runtime | The computer that runs the notebook's code | The engine | A kitchen's oven | Colab's hosted runtime |\n| Error message | Python's report of what went wrong and where | A warning note | A \"wrong password\" message | TypeError on line 2 |\n\n## Step-by-step demonstration: your first notebook\n\n1. Go to **colab.research.google.com** and sign in with your Google account.\n2. Click **New notebook** (or **File**, **New notebook in Drive**).\n3. Click the title at the top (\"Untitled0.ipynb\") and rename it **Module 12 practice**.\n4. Click **+ Text** and type `# Module 12 practice`. Click outside the cell; it becomes a heading.\n5. In the code cell, type `print(\"Hello, Sunrise Mart\")` and press **Shift+Enter**. The first run may take a few seconds while Colab connects.\n6. In a new code cell, type `21550 / 10` and run it. Colab shows `2155.0`: the last line of a cell is displayed even without print.\n7. In a new cell, type `print(\"Total: \" + 21550)` and run it. Read the last line of the error. Fix it by writing `print(\"Total:\", 21550)` and run it again: `Total: 21550`.\n8. Click **File**, **Save**. Find the notebook in Google Drive, in **Colab Notebooks**.\n\n## Practical exercise\n\n- **Task:** create and share a short notebook.\n- **Steps:** a text cell with your name and today's date; a code cell that prints \"Sunrise Mart sales analysis\"; a code cell that works out Hilltop's share of sales, 9900 / 21550 \\* 100; one deliberate error that you then fix, with a text cell explaining the fix.\n- **Expected output:** the share cell shows about 45.94; the explanation names the error type (for example TypeError or NameError).\n- **Submit:** a share link to the notebook (**Share**, **Anyone with the link**, **Viewer**) or a downloaded .ipynb file.\n\n## Knowledge check\n\n1. Which is a main reason analysts use Python?\n   - A) It replaces all spreadsheets\n   - B) It only works with charts\n   - C) Repeated work can be re-run exactly, and large data is handled well\n   - D) It needs no instructions\n2. What do you need to use Google Colab?\n   - A) A paid licence\n   - B) A free Google account and a web browser\n   - C) A Windows computer\n   - D) Python installed on your laptop\n3. What does Shift+Enter do in a Colab code cell?\n   - A) Runs the cell\n   - B) Deletes the cell\n   - C) Saves the file to your desktop\n   - D) Adds a text cell\n4. What does Python do with text after a # sign on a line?\n   - A) Prints it in bold\n   - B) Treats it as a number\n   - C) Stops the program\n   - D) Ignores it; it is a comment\n5. An error message appears. Which part should you read first?\n   - A) The last line, which names the problem\n   - B) The first word only\n   - C) None of it; restart the computer\n   - D) The notebook title\n\n## Lesson summary\n\n1. Python makes analysis repeatable and handles large data.\n2. Colab runs Python in the browser with a free Google account.\n3. Notebooks mix code cells and text cells.\n4. print shows output; # starts a comment.\n5. Read the last line of an error, fix, and run again.\n\n## Completion check\n\n- [ ] I created and renamed a Colab notebook.\n- [ ] I ran code, caused an error and fixed it.\n- [ ] I found the notebook in Google Drive.",
      },
      {
        title: "Variables, data types and lists",
        order: 2,
        durationMinutes: 85,
        videoUrl: "https://www.youtube.com/watch?v=cQT33yu9pY8",
        content: "## Lesson introduction\n\n- **What you will study:** variables, the four basic data types (whole numbers, decimals, text and true/false), and lists of values with the functions len, sum, min and max.\n- **Why it matters:** these are the building blocks of every Python analysis. Pandas, which you meet in Lesson 12.4, is built on the same ideas.\n- **After this lesson you can:** store values in variables, check their types, and summarise a list of numbers.\n- **Estimated time:** 85 minutes.\n\n## The topic in simple English\n\nA variable is a labelled box. You put a value in the box and use the label to get it back later: `total_sales = 9900`.\n\nA list is a row of boxes under one label, like a column of numbers in Excel: `order_totals = [1400, 1000, 2500]`.\n\n## Learning objectives\n\n1. Create variables with clear names.\n2. Recognise int, float, str and bool, and check types with type().\n3. Create a list and read items by position, remembering positions start at 0.\n4. Use len, sum, min, max and round.\n5. Format output with f-strings.\n\n## Main teaching content\n\n**1. Variables**\n\n- Use lower-case words joined by underscores: `total_sales`, not `ts` or `Total Sales`.\n- A name cannot start with a number or contain spaces.\n- `=` means \"store this value\", not \"is equal to\".\n\n**2. Data types**\n\n| Type | Name in Python | Example |\n| --- | --- | --- |\n| Whole number | int | `orders = 3` |\n| Decimal number | float | `average_order = 3300.0` |\n| Text | str | `branch = \"Hilltop\"` |\n| True or false | bool | `is_best_branch = True` |\n\nNumbers stored as text cannot be added: `\"7\" + \"3\"` gives `\"73\"`, while `7 + 3` gives `10`. This is the same problem as numbers stored as text in Excel (Module 4).\n\n**3. Lists**\n\n```python\norder_totals = [1400, 1000, 2500, 2100, 1050, 2500, 5000, 2500, 2800, 700]\nprint(len(order_totals), sum(order_totals), min(order_totals), max(order_totals))\n```\n\nOutput: `10 21550 700 5000`\n\nPositions start at **0**: `order_totals[0]` is 1400 (the first item), `order_totals[6]` is 5000 (the seventh) and `order_totals[-1]` is 700 (the last).\n\n**4. f-strings**\n\nPut `f` before the quotes and a variable in curly brackets to build tidy output. `:,.2f` adds thousands separators and two decimal places:\n\n```python\nmean = sum(order_totals) / len(order_totals)\nprint(f\"Average order: {mean:,.2f}\")\n```\n\nOutput: `Average order: 2,155.00`\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Variable | A name that refers to a stored value | A labelled box | A labelled jar | `total_sales = 9900` |\n| Data type | The kind of value: int, float, str, bool | Number, decimal, text or yes/no | Coins versus notes | Quantity is int, branch is str |\n| String (str) | A sequence of characters in quotes | Text | A name on a form | `\"Hilltop\"` |\n| List | An ordered collection of values in square brackets | A row of boxes | A shopping list | Ten order totals |\n| Index | The position of an item in a list, starting at 0 | The box number | Seat numbers | `order_totals[0]` |\n\n## Step-by-step demonstration: Sunrise Mart in variables and lists\n\n1. Open **Module 12 practice** and add a text cell: `## Lesson 12.2`.\n2. Run this cell:\n\n```python\nbranch = \"Hilltop\"\norders = 3\ntotal_sales = 9900\naverage_order = total_sales / orders\nis_best_branch = True\nprint(branch, orders, total_sales, average_order, is_best_branch)\nprint(type(branch), type(orders), type(average_order), type(is_best_branch))\n```\n\nOutput:\n\n```\nHilltop 3 9900 3300.0 True\n<class 'str'> <class 'int'> <class 'float'> <class 'bool'>\n```\n\nDividing two whole numbers gives a float (3300.0).\n\n3. Run the list code from section D and check: 10 orders, total 21,550, smallest 700, largest 5,000, average 2,155.00. These match Modules 4 and 7.\n4. Add a planned fourth branch to a list:\n\n```python\nbranches = [\"Central\", \"Hilltop\", \"Riverside\"]\nbranches.append(\"Lakeside\")\nprint(branches)\nprint(round(9900 / 21550 * 100, 1))\n```\n\nOutput:\n\n```\n['Central', 'Hilltop', 'Riverside', 'Lakeside']\n45.9\n```\n\n5. Run `print(\"7\" + \"3\", 7 + 3)` and see `73 10`: text is joined, numbers are added.\n\n## Practical exercise\n\n- **Task:** summarise Brightpath's monthly revenue with a list.\n- **Steps:** create `revenue = [225000, 230000, 253000, 258000]` for January to April 2026; print the number of months, total, lowest, highest and average with an f-string; print the April figure using its index; work out growth from January to April as a percentage, rounded to one decimal place.\n- **Expected output:** 4 months; total 966,000; lowest 225,000; highest 258,000; average 241,500.00; `revenue[3]` is 258000 (or `revenue[-1]`); growth 14.7.\n- **Submit:** a share link to your notebook.\n\n## Knowledge check\n\n1. Which is a good variable name?\n   - A) `2026sales`\n   - B) `total_sales`\n   - C) `total sales`\n   - D) `x`\n2. What type is the value `\"Hilltop\"`?\n   - A) int\n   - B) float\n   - C) bool\n   - D) str\n3. In `order_totals = [1400, 1000, 2500]`, what is `order_totals[0]`?\n   - A) 1000\n   - B) 2500\n   - C) 1400\n   - D) An error\n4. What does `\"7\" + \"3\"` give?\n   - A) `\"73\"`\n   - B) 10\n   - C) 21\n   - D) An error\n5. Which function gives the number of items in a list?\n   - A) `sum()`\n   - B) `max()`\n   - C) `len()`\n   - D) `print()`\n\n## Lesson summary\n\n1. Variables are labelled boxes; `=` stores a value.\n2. The basic types are int, float, str and bool; check with type().\n3. Lists hold many values; positions start at 0.\n4. len, sum, min, max and round summarise lists.\n5. f-strings make tidy, readable output.\n\n## Completion check\n\n- [ ] I created variables of all four types and checked them with type().\n- [ ] I summarised the ten Sunrise order totals.\n- [ ] I completed the Brightpath revenue list exercise.",
      },
      {
        title: "Decisions and repetition: if and for",
        order: 3,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=FvMPfrgGeKs",
        content: "## Lesson introduction\n\n- **What you will study:** comparison operators, if / elif / else decisions, for loops, range, and combining a loop with a decision to count and total values.\n- **Why it matters:** labelling, flagging and counting records are everyday analyst tasks. Loops and decisions are how a program does them for every row.\n- **After this lesson you can:** write code that goes through a list, labels each value and keeps running totals.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nAn `if` is a fork in the road: if the order is 2,500 or more, call it \"Large\"; otherwise, check the next rule.\n\nA `for` loop is like a cashier serving a queue: take the first customer, deal with them, take the next, until the queue is empty. Put an `if` inside the loop and you can sort every customer into the right group.\n\n## Learning objectives\n\n1. Use comparison operators: ==, !=, >, >=, <, <=.\n2. Write if, elif and else blocks with correct indentation.\n3. Loop through a list with for.\n4. Keep a running count and total inside a loop.\n5. Use range and positions to link two lists.\n\n## Main teaching content\n\n**1. Comparisons**\n\n| Operator | Meaning | Example | Result |\n| --- | --- | --- | --- |\n| == | equal to | `2500 == 2500` | True |\n| != | not equal to | `\"Hilltop\" != \"Central\"` | True |\n| > and >= | greater than; greater than or equal to | `2100 >= 2500` | False |\n| < and <= | less than; less than or equal to | `700 < 1000` | True |\n\nNote: `=` stores a value; `==` compares two values.\n\n**2. if, elif, else**\n\n```python\ntotal = 2100\nif total >= 2500:\n    print(\"Large\")\nelif total >= 1000:\n    print(\"Medium\")\nelse:\n    print(\"Small\")\n```\n\nOutput: `Medium`. Python checks the rules from top to bottom and runs the first one that is True. The line ends with a colon, and the lines inside are **indented** by four spaces. Forgetting the indent gives an IndentationError.\n\n**3. for loops**\n\n```python\nfor total in order_totals:\n    print(total)\n```\n\nThis prints each of the ten totals in turn. `total` takes each value in the list, one at a time.\n\n**4. Running totals**\n\nStart a counter at 0 before the loop and add to it inside the loop. This is how you count or add up only the values that meet a rule, like COUNTIF and SUMIF in Excel.\n\n**5. range**\n\n`range(10)` gives the positions 0 to 9. `for i in range(len(order_totals))` lets you use the same position in two lists, for example order IDs and order totals.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Condition | An expression that is True or False | A yes/no question | \"Is it raining?\" | `total >= 2500` |\n| if statement | Runs code only when a condition is True | Do this only if | \"If it rains, take an umbrella\" | Label large orders |\n| Loop | Code that repeats for each item | Do it again for each one | Marking a pile of tests | Label every order |\n| Indentation | Spaces at the start of a line that show which block it belongs to | Lining lines up inside a block | Sub-points in a list | The lines inside an if |\n| Accumulator | A variable that collects a running count or total | A tally | Counting votes with marks | `large_count = large_count + 1` |\n\n## Step-by-step demonstration: labelling Sunrise orders\n\n1. In **Module 12 practice**, add a text cell `## Lesson 12.3` and run:\n\n```python\norder_totals = [1400, 1000, 2500, 2100, 1050, 2500, 5000, 2500, 2800, 700]\nfor total in order_totals:\n    if total >= 2500:\n        print(total, \"Large\")\n    elif total >= 1000:\n        print(total, \"Medium\")\n    else:\n        print(total, \"Small\")\n```\n\nOutput: 1400 Medium, 1000 Medium, 2500 Large, 2100 Medium, 1050 Medium, 2500 Large, 5000 Large, 2500 Large, 2800 Large, 700 Small (one per line).\n\n2. Count and total the large orders:\n\n```python\nlarge_count = 0\nlarge_sum = 0\nfor total in order_totals:\n    if total >= 2500:\n        large_count = large_count + 1\n        large_sum = large_sum + total\nprint(\"Large orders:\", large_count, \"worth\", large_sum)\n```\n\nOutput: `Large orders: 5 worth 15300`\n\n3. Link order IDs to totals and flag outliers using the upper fence from Lesson 7.2 (4,543.75):\n\n```python\norder_ids = list(range(1001, 1011))\nfor i in range(len(order_totals)):\n    if order_totals[i] > 4543.75:\n        print(\"Check order\", order_ids[i], order_totals[i])\n```\n\nOutput: `Check order 1007 5000`. `range(1001, 1011)` stops before 1011, giving 1001 to 1010.\n\n4. Remove the four spaces before one `print` line and run it. Read the IndentationError, then put the spaces back.\n\n## Practical exercise\n\n- **Task:** flag Delta Ridge DR-02's low days.\n- **Steps:** create `dr02 = [805, 770, 790, 810, 800, 660, 795, 805, 735, 790, 800, 810, 795, 500]` (1–14 March, from Module 7). Loop with `range(len(dr02))` and print the day number (position + 1) and output for every day below the lower fence of 731.875. Then count the days below the plan of 800.\n- **Expected output:** day 6 (660) and day 14 (500) are flagged; 8 days are below 800.\n- **Submit:** a share link to your notebook.\n\n## Knowledge check\n\n1. What does `2100 >= 2500` give?\n   - A) False\n   - B) True\n   - C) 2100\n   - D) An error\n2. In an if / elif / else block, which rule runs?\n   - A) All the True ones\n   - B) Only the else\n   - C) The first rule that is True, checked from top to bottom\n   - D) The last rule\n3. What is the difference between `=` and `==`?\n   - A) There is none\n   - B) `==` stores a value; `=` compares\n   - C) `=` is only for text\n   - D) `=` stores a value; `==` compares two values\n4. Which numbers does `range(1001, 1011)` produce?\n   - A) 1001 to 1011\n   - B) 1001 to 1010\n   - C) 1000 to 1010\n   - D) Ten copies of 1001\n5. Why set `large_count = 0` before the loop?\n   - A) Python requires every program to start with 0\n   - B) To stop the loop\n   - C) To make the output bold\n   - D) The counter needs a starting value before the loop adds to it\n\n## Lesson summary\n\n1. Comparisons give True or False; `==` compares, `=` stores.\n2. if / elif / else runs the first True rule; indent the lines inside.\n3. for repeats code for each item in a list.\n4. Start counters at 0 before a loop; add inside it.\n5. range(len(list)) gives positions to link two lists.\n\n## Completion check\n\n- [ ] I labelled all ten orders Large, Medium or Small.\n- [ ] I counted 5 large orders worth 15,300 and flagged order 1007.\n- [ ] I flagged DR-02's days 6 and 14.",
      },
      {
        title: "Loading a dataset with Pandas",
        order: 4,
        durationMinutes: 110,
        videoUrl: "https://www.youtube.com/watch?v=4YI9z1qUpew",
        content: "**Files for this lesson:** [sunrise_sales.csv](/course-files/data-analytics/sunrise_sales.csv). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** the Pandas library, DataFrames, loading a CSV file into Colab, inspecting it (head, shape, columns, dtypes, info, describe), selecting columns, adding a calculated column, filtering rows and counting values.\n- **Why it matters:** Pandas is the standard Python tool for working with tables. Almost every Python data job starts with these few commands.\n- **After this lesson you can:** load any CSV file in Colab and answer simple questions about it with Pandas.\n- **Estimated time:** 110 minutes.\n\n## The topic in simple English\n\nPandas gives Python a table, called a **DataFrame**, that works like an Excel sheet: rows, named columns and a type for each column. One line loads a whole CSV file; a few more answer questions about it.\n\nYou already know the ideas: filtering (Module 3), calculated columns (Module 4), WHERE in SQL (Module 5). Pandas is a new way of writing them.\n\n## Learning objectives\n\n1. Import Pandas and load a CSV file into a DataFrame.\n2. Inspect a DataFrame with head, shape, columns, dtypes, info and describe.\n3. Select one or more columns.\n4. Add a calculated column and summarise it.\n5. Filter rows with a condition and count values.\n\n## Main teaching content\n\n**1. Getting the file into Colab**\n\nClick the **Files** icon (a folder) on the left of Colab, then **Upload to session storage**, and choose **sunrise\\_sales.csv**. Files uploaded this way are deleted when the session ends, so upload again next time, or store the file in Google Drive and connect Drive from the same Files panel.\n\n**2. Loading and inspecting**\n\n| Code | What it shows |\n| --- | --- |\n| `import pandas as pd` | Loads Pandas, nicknamed pd |\n| `sales = pd.read_csv(\"sunrise_sales.csv\")` | Reads the file into a DataFrame called sales |\n| `sales.head()` | The first 5 rows |\n| `sales.shape` | (rows, columns) |\n| `sales.columns` | The column names |\n| `sales.dtypes` | The type of each column |\n| `sales.info()` | Types, row count and missing values together |\n| `sales[\"column\"].describe()` | Count, mean, standard deviation, quartiles, min, max |\n\n**3. Selecting, calculating, filtering**\n\n| Task | Pandas | Excel or SQL equivalent |\n| --- | --- | --- |\n| One column | `sales[\"branch\"]` | Column B |\n| Several columns | `sales[[\"order_id\", \"branch\"]]` | `SELECT order_id, branch` |\n| New column | `sales[\"order_total\"] = sales[\"quantity\"] * sales[\"unit_price\"]` | A formula filled down |\n| Total | `sales[\"order_total\"].sum()` | `=SUM()` |\n| Filter | `sales[sales[\"branch\"] == \"Hilltop\"]` | `WHERE branch = 'Hilltop'` |\n| Count values | `sales[\"branch\"].value_counts()` | A COUNTIF for each value |\n\nNote the double square brackets when selecting several columns: the inner brackets are a list of names.\n\n**4. Types after loading**\n\nPandas shows whole numbers as **int64** and text as **object** (newer versions may show **str**). Dates are read as text unless you ask Pandas to convert them; you will do that in Module 13.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Library | A package of ready-made code you import | A toolbox | A set of kitchen tools | Pandas |\n| Pandas | Python's main library for working with tables | Excel tables in Python | A spreadsheet program | Loading sunrise\\_sales.csv |\n| DataFrame | A Pandas table of rows and named columns | A sheet | A printed table | The sales DataFrame |\n| Series | One column of a DataFrame | A single column | One column of a register | `sales[\"branch\"]` |\n| Boolean filter | A True/False test used to keep matching rows | Keep only the rows that pass | Picking only ripe fruit | `sales[\"branch\"] == \"Hilltop\"` |\n\n## Step-by-step demonstration: Sunrise Mart in Pandas\n\n1. In Colab, upload **sunrise\\_sales.csv** (section D). Add a text cell `## Lesson 12.4`.\n2. Load and look:\n\n```python\nimport pandas as pd\nsales = pd.read_csv(\"sunrise_sales.csv\")\nsales.head()\n```\n\nColab shows a table of orders 1001 to 1005 with seven columns: order\\_id, order\\_date, branch, customer\\_id, category, quantity and unit\\_price.\n\n3. Inspect it:\n\n```python\nprint(sales.shape)\nsales.info()\n```\n\nOutput starts `(10, 7)`: 10 rows and 7 columns. info() lists each column with **10 non-null** values (no blanks) and types int64 for order\\_id, quantity and unit\\_price, object for the rest.\n\n4. Add and summarise the order total:\n\n```python\nsales[\"order_total\"] = sales[\"quantity\"] * sales[\"unit_price\"]\nprint(sales[\"order_total\"].sum(), sales[\"order_total\"].mean(), sales[\"order_total\"].median())\nsales[\"order_total\"].describe()\n```\n\nOutput: `21550 2155.0 2300.0`, then count 10, mean 2155, std 1252.21, min 700, 25% 1137.5, 50% 2300, 75% 2500 and max 5000. These are the same figures you calculated in Excel in Module 7 (the quartiles use the same method as QUARTILE.INC).\n\n5. Filter Hilltop:\n\n```python\nhilltop = sales[sales[\"branch\"] == \"Hilltop\"]\nprint(hilltop[[\"order_id\", \"category\", \"order_total\"]])\nprint(hilltop[\"order_total\"].sum())\n```\n\nOutput: orders 1004 (Drinks, 2100), 1007 (Groceries, 5000) and 1009 (Drinks, 2800), then `9900`.\n\n6. Count and sort:\n\n```python\nprint(sales[\"branch\"].value_counts())\nprint(sales.sort_values(\"order_total\", ascending=False).head(2)[[\"order_id\", \"branch\", \"order_total\"]])\n```\n\nOutput: Central 4, Riverside 3, Hilltop 3; then the two largest orders, 1007 (Hilltop, 5000) and 1009 (Hilltop, 2800).\n\n7. Save the notebook (**File**, **Save**).\n\n## Practical exercise\n\n- **Task:** answer three manager questions with Pandas.\n- **Questions:**\n  1. How many orders were 2,500 or more?\n  2. What were total sales at Central?\n  3. How many orders were for Drinks?\n- **Expected output:** (1) `len(sales[sales[\"order_total\"] >= 2500])` gives 5; (2) 7,100; (3) `sales[\"category\"].value_counts()` shows Drinks 5.\n- **Submit:** a share link with each answer in its own code cell and a one-line text cell explaining it.\n\n## Knowledge check\n\n1. Which line loads a CSV file into a DataFrame?\n   - A) `pd.print(\"sunrise_sales.csv\")`\n   - B) `open.csv(\"sunrise_sales.csv\")`\n   - C) `import sunrise_sales.csv`\n   - D) `pd.read_csv(\"sunrise_sales.csv\")`\n2. `sales.shape` returns (10, 7). What does this mean?\n   - A) 10 rows and 7 columns\n   - B) 10 columns and 7 rows\n   - C) 70 cells are missing\n   - D) The file is 10 KB\n3. How do you select the order\\_id and branch columns together?\n   - A) `sales[\"order_id\", \"branch\"]`\n   - B) `sales[[\"order_id\", \"branch\"]]`\n   - C) `sales.order_id.branch`\n   - D) `select(order_id, branch)`\n4. Which line keeps only Hilltop's orders?\n   - A) `sales[\"branch\"] = \"Hilltop\"`\n   - B) `sales.head(\"Hilltop\")`\n   - C) `sales[sales[\"branch\"] == \"Hilltop\"]`\n   - D) `sales.describe(\"Hilltop\")`\n5. You uploaded a file to Colab's session storage yesterday and today it is gone. Why?\n   - A) Pandas deleted it\n   - B) Session storage is cleared when the session ends\n   - C) CSV files expire after one day\n   - D) The file was too large\n\n## Lesson summary\n\n1. `import pandas as pd`, then `pd.read_csv()` loads a file into a DataFrame.\n2. head, shape, columns, dtypes, info and describe show what you have.\n3. Select columns with single or double square brackets.\n4. New columns are calculated for every row at once.\n5. Filter with a condition inside square brackets; count with value\\_counts.\n\n## Completion check\n\n- [ ] I loaded sunrise\\_sales.csv and saw (10, 7).\n- [ ] My order\\_total column sums to 21,550 and describe() matches Module 7.\n- [ ] I answered the three manager questions.",
      },
    ],
    assignmentTitle: "Harbour Bank transactions in Python",
    assignmentDescription: "Harbour Bank's operations manager wants to know whether the analytics team can check March transactions with Python, so the checks can be re-run every month.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "What is Google Colab?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "A spreadsheet program",
            isCorrect: false,
          },
          {
            text: "A free browser-based notebook for running Python",
            isCorrect: true,
          },
          {
            text: "A database",
            isCorrect: false,
          },
          {
            text: "A Power BI add-in",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is a float?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "\"3300\"",
            isCorrect: false,
          },
          {
            text: "3300",
            isCorrect: false,
          },
          {
            text: "3300.0",
            isCorrect: true,
          },
          {
            text: "True",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Given prices = [350, 500, 2500], what is prices[-1]?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "2500",
            isCorrect: true,
          },
          {
            text: "350",
            isCorrect: false,
          },
          {
            text: "500",
            isCorrect: false,
          },
          {
            text: "An error",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does print(f\"{2155:,.2f}\") show?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "2155",
            isCorrect: false,
          },
          {
            text: "2155.0",
            isCorrect: false,
          },
          {
            text: "2,155",
            isCorrect: false,
          },
          {
            text: "2,155.00",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What happens if the lines inside an if block are not indented?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "They run twice",
            isCorrect: false,
          },
          {
            text: "Nothing; indentation is optional",
            isCorrect: false,
          },
          {
            text: "Python gives an IndentationError",
            isCorrect: true,
          },
          {
            text: "The values become text",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which loop adds up only the orders of 2,500 or more?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "A for loop over the totals with an if inside that adds to a running total",
            isCorrect: true,
          },
          {
            text: "A single print line",
            isCorrect: false,
          },
          {
            text: "A list with no loop",
            isCorrect: false,
          },
          {
            text: "An else block on its own",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does sales.head() show?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "The column types",
            isCorrect: false,
          },
          {
            text: "The last row",
            isCorrect: false,
          },
          {
            text: "The total of every column",
            isCorrect: false,
          },
          {
            text: "The first five rows",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which code adds a column of quantity times price?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "sales.add(\"order_total\")",
            isCorrect: false,
          },
          {
            text: "sales[\"order_total\"] = sales[\"quantity\"] * sales[\"unit_price\"]",
            isCorrect: true,
          },
          {
            text: "order_total = quantity * unit_price",
            isCorrect: false,
          },
          {
            text: "sales[\"quantity\" * \"unit_price\"]",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which shows how many orders each branch had?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "sales[\"branch\"].sum()",
            isCorrect: false,
          },
          {
            text: "sales.shape",
            isCorrect: false,
          },
          {
            text: "sales[\"branch\"].value_counts()",
            isCorrect: true,
          },
          {
            text: "sales.info()",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which statement about Python in analytics is true?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "It is used alongside Excel, SQL and Power BI, each where it fits best",
            isCorrect: true,
          },
          {
            text: "It replaces every other tool",
            isCorrect: false,
          },
          {
            text: "It only works on Windows",
            isCorrect: false,
          },
          {
            text: "It cannot read CSV files",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is a main reason analysts use Python?",
        type: "multiple_choice",
        points: 1,
        explanation: "repeatable and handles large data",
        answers: [
          {
            text: "It replaces all spreadsheets",
            isCorrect: false,
          },
          {
            text: "It only works with charts",
            isCorrect: false,
          },
          {
            text: "Repeated work can be re-run exactly, and large data is handled well",
            isCorrect: true,
          },
          {
            text: "It needs no instructions",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What do you need to use Google Colab?",
        type: "multiple_choice",
        points: 1,
        explanation: "free Google account and a browser",
        answers: [
          {
            text: "A paid licence",
            isCorrect: false,
          },
          {
            text: "A free Google account and a web browser",
            isCorrect: true,
          },
          {
            text: "A Windows computer",
            isCorrect: false,
          },
          {
            text: "Python installed on your laptop",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does Shift+Enter do in a Colab code cell?",
        type: "multiple_choice",
        points: 1,
        explanation: "runs the cell",
        answers: [
          {
            text: "Runs the cell",
            isCorrect: true,
          },
          {
            text: "Deletes the cell",
            isCorrect: false,
          },
          {
            text: "Saves the file to your desktop",
            isCorrect: false,
          },
          {
            text: "Adds a text cell",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does Python do with text after a # sign on a line?",
        type: "multiple_choice",
        points: 1,
        explanation: "a comment",
        answers: [
          {
            text: "Prints it in bold",
            isCorrect: false,
          },
          {
            text: "Treats it as a number",
            isCorrect: false,
          },
          {
            text: "Stops the program",
            isCorrect: false,
          },
          {
            text: "Ignores it; it is a comment",
            isCorrect: true,
          },
        ],
      },
      {
        text: "An error message appears. Which part should you read first?",
        type: "multiple_choice",
        points: 1,
        explanation: "the last line",
        answers: [
          {
            text: "The last line, which names the problem",
            isCorrect: true,
          },
          {
            text: "The first word only",
            isCorrect: false,
          },
          {
            text: "None of it; restart the computer",
            isCorrect: false,
          },
          {
            text: "The notebook title",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is a good variable name?",
        type: "multiple_choice",
        points: 1,
        explanation: "total_sales",
        answers: [
          {
            text: "2026sales",
            isCorrect: false,
          },
          {
            text: "total_sales",
            isCorrect: true,
          },
          {
            text: "total sales",
            isCorrect: false,
          },
          {
            text: "x",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What type is the value \"Hilltop\"?",
        type: "multiple_choice",
        points: 1,
        explanation: "str",
        answers: [
          {
            text: "int",
            isCorrect: false,
          },
          {
            text: "float",
            isCorrect: false,
          },
          {
            text: "bool",
            isCorrect: false,
          },
          {
            text: "str",
            isCorrect: true,
          },
        ],
      },
      {
        text: "In order_totals = [1400, 1000, 2500], what is order_totals[0]?",
        type: "multiple_choice",
        points: 1,
        explanation: "1400, position 0",
        answers: [
          {
            text: "1000",
            isCorrect: false,
          },
          {
            text: "2500",
            isCorrect: false,
          },
          {
            text: "1400",
            isCorrect: true,
          },
          {
            text: "An error",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does \"7\" + \"3\" give?",
        type: "multiple_choice",
        points: 1,
        explanation: "text is joined",
        answers: [
          {
            text: "\"73\"",
            isCorrect: true,
          },
          {
            text: "10",
            isCorrect: false,
          },
          {
            text: "21",
            isCorrect: false,
          },
          {
            text: "An error",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which function gives the number of items in a list?",
        type: "multiple_choice",
        points: 1,
        explanation: "len()",
        answers: [
          {
            text: "sum()",
            isCorrect: false,
          },
          {
            text: "max()",
            isCorrect: false,
          },
          {
            text: "len()",
            isCorrect: true,
          },
          {
            text: "print()",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does 2100 >= 2500 give?",
        type: "multiple_choice",
        points: 1,
        explanation: "False",
        answers: [
          {
            text: "False",
            isCorrect: true,
          },
          {
            text: "True",
            isCorrect: false,
          },
          {
            text: "2100",
            isCorrect: false,
          },
          {
            text: "An error",
            isCorrect: false,
          },
        ],
      },
      {
        text: "In an if / elif / else block, which rule runs?",
        type: "multiple_choice",
        points: 1,
        explanation: "the first True rule",
        answers: [
          {
            text: "All the True ones",
            isCorrect: false,
          },
          {
            text: "Only the else",
            isCorrect: false,
          },
          {
            text: "The first rule that is True, checked from top to bottom",
            isCorrect: true,
          },
          {
            text: "The last rule",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the difference between = and ==?",
        type: "multiple_choice",
        points: 1,
        explanation: "store versus compare",
        answers: [
          {
            text: "There is none",
            isCorrect: false,
          },
          {
            text: "== stores a value; = compares",
            isCorrect: false,
          },
          {
            text: "= is only for text",
            isCorrect: false,
          },
          {
            text: "= stores a value; == compares two values",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which numbers does range(1001, 1011) produce?",
        type: "multiple_choice",
        points: 1,
        explanation: "1001 to 1010",
        answers: [
          {
            text: "1001 to 1011",
            isCorrect: false,
          },
          {
            text: "1001 to 1010",
            isCorrect: true,
          },
          {
            text: "1000 to 1010",
            isCorrect: false,
          },
          {
            text: "Ten copies of 1001",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why set large_count = 0 before the loop?",
        type: "multiple_choice",
        points: 1,
        explanation: "a starting value",
        answers: [
          {
            text: "Python requires every program to start with 0",
            isCorrect: false,
          },
          {
            text: "To stop the loop",
            isCorrect: false,
          },
          {
            text: "To make the output bold",
            isCorrect: false,
          },
          {
            text: "The counter needs a starting value before the loop adds to it",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which line loads a CSV file into a DataFrame?",
        type: "multiple_choice",
        points: 1,
        explanation: "pd.read_csv()",
        answers: [
          {
            text: "pd.print(\"sunrise_sales.csv\")",
            isCorrect: false,
          },
          {
            text: "open.csv(\"sunrise_sales.csv\")",
            isCorrect: false,
          },
          {
            text: "import sunrise_sales.csv",
            isCorrect: false,
          },
          {
            text: "pd.read_csv(\"sunrise_sales.csv\")",
            isCorrect: true,
          },
        ],
      },
      {
        text: "sales.shape returns (10, 7). What does this mean?",
        type: "multiple_choice",
        points: 1,
        explanation: "rows, then columns",
        answers: [
          {
            text: "10 rows and 7 columns",
            isCorrect: true,
          },
          {
            text: "10 columns and 7 rows",
            isCorrect: false,
          },
          {
            text: "70 cells are missing",
            isCorrect: false,
          },
          {
            text: "The file is 10 KB",
            isCorrect: false,
          },
        ],
      },
      {
        text: "How do you select the order_id and branch columns together?",
        type: "multiple_choice",
        points: 1,
        explanation: "double brackets",
        answers: [
          {
            text: "sales[\"order_id\", \"branch\"]",
            isCorrect: false,
          },
          {
            text: "sales[[\"order_id\", \"branch\"]]",
            isCorrect: true,
          },
          {
            text: "sales.order_id.branch",
            isCorrect: false,
          },
          {
            text: "select(order_id, branch)",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which line keeps only Hilltop's orders?",
        type: "multiple_choice",
        points: 1,
        explanation: "a boolean filter",
        answers: [
          {
            text: "sales[\"branch\"] = \"Hilltop\"",
            isCorrect: false,
          },
          {
            text: "sales.head(\"Hilltop\")",
            isCorrect: false,
          },
          {
            text: "sales[sales[\"branch\"] == \"Hilltop\"]",
            isCorrect: true,
          },
          {
            text: "sales.describe(\"Hilltop\")",
            isCorrect: false,
          },
        ],
      },
      {
        text: "You uploaded a file to Colab's session storage yesterday and today it is gone. Why?",
        type: "multiple_choice",
        points: 1,
        explanation: "session storage is cleared",
        answers: [
          {
            text: "Pandas deleted it",
            isCorrect: false,
          },
          {
            text: "Session storage is cleared when the session ends",
            isCorrect: true,
          },
          {
            text: "CSV files expire after one day",
            isCorrect: false,
          },
          {
            text: "The file was too large",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 13,
    moduleTitle: "Python Data Analysis and Exploratory Data Analysis",
    moduleDescription: "Learners move from loading data to working with it in Pandas: cleaning messy values, filtering and grouping, drawing charts with Matplotlib, and running a complete exploratory data analysis (EDA). Data files: connectwave_subscribers_raw.csv (Lessons 13.1 and 13.4), sunrise_fact_sales.csv, sunrise_dim_branch.csv and sunrise_dim_product.csv (Lessons 13.2 and 13.3, the Module 10 star schema) and harbour_customers.csv (assignment). Every piece of code in this module was run in Python 3 with Pandas 2.3 and Matplotlib, and the outputs shown are the actual results. Colab's own screens have not yet been clicked through (see the status section).",
    lessons: [
      {
        title: "Cleaning data with Pandas",
        order: 1,
        durationMinutes: 80,
        videoUrl: "https://www.youtube.com/watch?v=Ck0QgwiCEIs",
        content: "**Files for this lesson:** [connectwave_subscribers_raw.csv](/course-files/data-analytics/connectwave_subscribers_raw.csv). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** how to find and fix the common problems in a raw file with Pandas: missing values, duplicate rows, inconsistent text and numbers stored as text.\n- **Why it matters:** real data is almost never clean. In Module 4 you cleaned data by hand in Excel; Python lets you write the cleaning down once and re-run it on next month's file.\n- **After this lesson you can:** inspect a raw file, clean it step by step and save a clean copy.\n- **Estimated time:** 80 minutes.\n\n## The topic in simple English\n\nCleaning data is like sorting a pile of forms before you count them. You remove the forms that were filled in twice, make everyone's handwriting say the same thing (\"north\", \"North\" and \"NORTH\" all become North), and take the units out of numbers so they can be added up.\n\nIn Pandas each fix is one line of code, so the whole clean-up becomes a recipe you can follow again.\n\n## Learning objectives\n\n1. Find missing values and duplicate rows with `isna()` and `duplicated()`.\n2. Remove duplicates with `drop_duplicates()`.\n3. Standardise text with `.str.strip()`, `.str.lower()` and `.str.title()`.\n4. Convert text to numbers with `pd.to_numeric()`.\n5. Decide, and write down, how to handle each missing value.\n\n## Main teaching content\n\n**1. Inspect before you fix**\n\nAlways look first. These four lines answer most questions about a new file:\n\n```python\nsubs.shape            # rows and columns\nsubs.dtypes           # the type of each column\nsubs.isna().sum()     # missing values per column\nsubs.duplicated().sum()  # rows that exactly repeat an earlier row\n```\n\n**2. The common problems and their fixes**\n\n| Problem | Example | Pandas fix |\n| --- | --- | --- |\n| Exact duplicate rows | The same customer appears twice | `df = df.drop_duplicates()` |\n| Extra spaces | `\" basic\"`, `\"Premium \"` | `df[\"plan\"].str.strip()` |\n| Mixed capitals | `\"STANDARD\"`, `\"premium\"` | `.str.title()` or `.str.lower()` |\n| Different codes for the same thing | `Y`, `yes`, `Yes` | `.replace({\"y\": \"yes\"})` after lowering |\n| Units inside numbers | `\"40 GB\"`, `\"3,150\"` | `.str.replace(\"GB\", \"\")` then `pd.to_numeric()` |\n| Missing values | A blank cell | Leave as missing, fill, or remove, and say why |\n\n**3. Text methods are chained**\n\n`.str` gives a column access to text methods, and you can chain them left to right: `subs[\"plan\"].str.strip().str.title()` first removes spaces, then changes `\"basic\"` to `\"Basic\"`.\n\n**4. Missing values: three choices**\n\n- **Leave them** as `NaN` (Pandas' \"not a number\" marker). Most calculations, such as `mean()`, skip them.\n- **Fill them** with `fillna()`, for example with the median, when a sensible value exists.\n- **Remove the rows** with `dropna()`, only when they would spoil the analysis and there are few of them.\n\nWhatever you choose, write it in a text cell. A reader must be able to see what you changed.\n\n**5. Never overwrite the raw file**\n\nLoad the raw file, clean it in the notebook, and save the result under a new name with `to_csv(\"..._clean.csv\", index=False)`. The raw file stays as your evidence.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| NaN | Pandas' marker for a missing value | An empty cell | A blank on a form | A customer with no usage recorded |\n| Duplicate | A row identical to an earlier row | A copy | A form handed in twice | A subscriber counted twice |\n| Standardise | Make values that mean the same thing look the same | Use one spelling | Writing all dates the same way | \"north\" and \"North\" become North |\n| Data type (dtype) | How Pandas stores a column: number, text, date | What kind of value it is | Money versus words | usage stored as text cannot be averaged |\n| Method chaining | Calling several methods one after another on a result | Doing steps in a row | Wash, rinse, dry | `.str.strip().str.title()` |\n\n## Step-by-step demonstration: cleaning Connectwave subscribers\n\nConnectwave's customer team exported 12 subscribers, but the file has 14 rows and several spelling problems. Upload **connectwave\\_subscribers\\_raw.csv** to Colab (folder icon, upload button).\n\n1. Load and inspect:\n\n```python\nimport pandas as pd\nsubs = pd.read_csv(\"connectwave_subscribers_raw.csv\")\nprint(subs.shape)\nprint(subs.isna().sum())\nprint(subs.duplicated().sum())\n```\n\nOutput: `(14, 7)`; every column shows 0 missing except `data_usage_gb 1`; and `2` duplicated rows (K1005 and K1009 appear twice).\n\n2. Remove the duplicates: `subs = subs.drop_duplicates()`. `subs.shape` is now `(12, 7)`.\n3. Standardise the text columns:\n\n```python\nsubs[\"plan\"] = subs[\"plan\"].str.strip().str.title()\nsubs[\"region\"] = subs[\"region\"].str.strip().str.title()\nprint(subs[\"plan\"].value_counts())\n```\n\nOutput: Basic 5, Standard 4, Premium 3. Before cleaning, \" basic\", \"STANDARD\", \"Premium \" and \"premium\" were all counted separately.\n\n4. Fix the churned column, which holds Yes, Y, yes, no and No:\n\n```python\nsubs[\"churned\"] = subs[\"churned\"].str.strip().str.lower().replace({\"y\": \"yes\"}).str.title()\nprint(subs[\"churned\"].value_counts())\n```\n\nOutput: No 7, Yes 5.\n\n5. Check the types: `subs.dtypes` shows `data_usage_gb` as `object` (text), because one value is \"40 GB\". Fix it:\n\n```python\nsubs[\"data_usage_gb\"] = subs[\"data_usage_gb\"].str.replace(\"GB\", \"\").str.strip()\nsubs[\"data_usage_gb\"] = pd.to_numeric(subs[\"data_usage_gb\"])\nprint(subs[\"data_usage_gb\"].mean())\n```\n\nOutput: `13.136363636363637`. The mean uses the 11 known values; K1011's usage is still missing.\n\n6. Decide on the missing value. `subs[subs[\"data_usage_gb\"].isna()]` shows K1011 only. We leave it as `NaN` because there is no sound way to guess one person's usage, and write that decision in a text cell.\n7. Final checks and save:\n\n```python\nprint(subs.shape, subs[\"customer_id\"].is_unique)\nsubs.to_csv(\"connectwave_subscribers_clean.csv\", index=False)\n```\n\nOutput: `(12, 7) True`. Download the clean file from the folder panel; Lessons 13.2 and 13.4 use it.\n\n## Practical exercise\n\n- **Task:** write a cleaning log for the Connectwave file.\n- **Steps:** repeat the demonstration in your own notebook. Above each code cell, add a text cell saying what problem the cell fixes and how many rows or values it changed.\n- **Expected output:** 12 rows, plans Basic 5 / Standard 4 / Premium 3, churned No 7 / Yes 5, `data_usage_gb` as float64 with one missing value, and a saved clean file.\n- **Submit:** your notebook link (Viewer access).\n\n## Knowledge check\n\n1. Which line counts the missing values in every column?\n   - A) `subs.shape`\n   - B) `subs.isna().sum()`\n   - C) `subs.duplicated()`\n   - D) `subs.head()`\n2. A column holds \" basic\", \"BASIC\" and \"Basic\". Which code makes them all \"Basic\"?\n   - A) `.str.upper()`\n   - B) `.drop_duplicates()`\n   - C) `pd.to_numeric()`\n   - D) `.str.strip().str.title()`\n3. Why can't Pandas average a usage column that contains \"40 GB\"?\n   - A) The column is stored as text, so it must be converted to numbers first\n   - B) Pandas cannot average more than ten values\n   - C) Averages only work on dates\n   - D) The column has no name\n4. What should you do with the raw file after cleaning?\n   - A) Delete it\n   - B) Overwrite it with the clean data\n   - C) Keep it unchanged and save the clean data under a new name\n   - D) Email it to every customer\n5. One subscriber's usage is missing and there is no reliable way to estimate it. What is the best choice here?\n   - A) Type in a number that looks reasonable\n   - B) Delete the whole column\n   - C) Fill every missing value with zero\n   - D) Leave it as missing and record that decision in the notebook\n\n## Lesson summary\n\n1. Inspect with shape, dtypes, isna().sum() and duplicated().sum() before fixing anything.\n2. drop\\_duplicates() removes repeated rows.\n3. .str.strip(), .str.lower() and .str.title() standardise text.\n4. pd.to\\_numeric() turns cleaned text into numbers.\n5. Record how you handled every missing value, and never overwrite the raw file.\n\n## Completion check\n\n- [ ] I cleaned the Connectwave file to 12 unique rows.\n- [ ] I converted usage to numbers and explained the missing value.\n- [ ] I saved a clean copy under a new name.",
      },
      {
        title: "Filtering, grouping and summarising",
        order: 2,
        durationMinutes: 80,
        videoUrl: "https://www.youtube.com/watch?v=VRmXto2YA2I",
        content: "**Files for this lesson:** [sunrise_dim_branch.csv](/course-files/data-analytics/sunrise_dim_branch.csv) · [sunrise_dim_product.csv](/course-files/data-analytics/sunrise_dim_product.csv) · [sunrise_fact_sales.csv](/course-files/data-analytics/sunrise_fact_sales.csv). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** how to select rows that meet conditions, join tables with `merge`, and summarise data with `groupby`, `agg` and `pivot_table`.\n- **Why it matters:** most business questions are \"how much, for which group?\" questions. These are the Python versions of SQL's WHERE and GROUP BY (Modules 5–6) and Excel PivotTables (Module 4).\n- **After this lesson you can:** answer grouped questions on the Sunrise Mart star schema in a few lines of code.\n- **Estimated time:** 80 minutes.\n\n## The topic in simple English\n\nFiltering is picking out the receipts you care about, such as only Riverside's, only this year's. Grouping is sorting the receipts into piles, one per branch, and adding up each pile.\n\nMerging is matching two lists using a shared code, like matching student numbers on a register to names on another sheet.\n\n## Learning objectives\n\n1. Filter rows with one or more conditions using `&`, `|` and `isin()`.\n2. Join a fact table to dimension tables with `merge`.\n3. Summarise by group with `groupby` and `agg`.\n4. Build a cross-table with `pivot_table` and add a growth column.\n5. Sort results to show the biggest groups first.\n\n## Main teaching content\n\n**1. Filtering**\n\nA condition in square brackets keeps only the matching rows:\n\n```python\nsales[sales[\"branch\"] == \"Riverside\"]\nsales[(sales[\"branch\"] == \"Riverside\") & (sales[\"year\"] == 2026)]\nsales[sales[\"category\"].isin([\"Drinks\", \"Snacks\"])]\n```\n\nUse `&` for \"and\", `|` for \"or\", and wrap each condition in brackets.\n\n**2. Merging tables**\n\nThe Sunrise star schema keeps quantities in the fact table and names and prices in dimension tables (Module 10). `merge` joins them on the shared key column:\n\n```python\nsales = fact.merge(branches, on=\"branch_id\").merge(products, on=\"product_id\")\n```\n\n**3. groupby and agg**\n\nFirst add a revenue column, as in the demonstration: `sales[\"revenue\"] = sales[\"quantity\"] * sales[\"unit_price\"]`. Then `groupby` splits the rows into groups, and a summary function runs on each group:\n\n```python\nsales.groupby(\"branch\")[\"revenue\"].sum()\nsales.groupby(\"category\").agg(units=(\"quantity\", \"sum\"), revenue=(\"revenue\", \"sum\"))\n```\n\n`agg` lets you name each result column and choose its function: sum, mean, count, min, max or median.\n\n**4. pivot\\_table**\n\n`pivot_table` lays one grouping down the side and another across the top, like an Excel PivotTable.\n\n| Excel or SQL | Pandas |\n| --- | --- |\n| Filter / WHERE | `df[condition]` |\n| VLOOKUP / JOIN | `merge` |\n| PivotTable rows / GROUP BY | `groupby` |\n| PivotTable rows and columns | `pivot_table` |\n| Sort / ORDER BY | `sort_values` |\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Boolean filter | A True/False condition used to select rows | Keep only matching rows | Only red cars in a car park | Only Riverside's 2026 sales |\n| merge | Joining two tables on a shared key | Match two lists | Register to student names | Fact table to branch names |\n| groupby | Splitting rows into groups to summarise each | Make piles | Sorting coins by value | Revenue per branch |\n| Aggregation | A summary of many values, such as sum or mean | One number for a pile | Total in a jar | Units sold per category |\n| Pivot table | A table summarised by two groupings | Rows and columns of totals | A timetable | Branch by year revenue |\n\n## Step-by-step demonstration: Sunrise Mart branch growth\n\nUpload the three Sunrise star-schema files (162 monthly rows, January 2025 to June 2026).\n\n1. Load, merge and add columns:\n\n```python\nimport pandas as pd\nfact = pd.read_csv(\"sunrise_fact_sales.csv\", parse_dates=[\"month_start\"])\nbranches = pd.read_csv(\"sunrise_dim_branch.csv\")\nproducts = pd.read_csv(\"sunrise_dim_product.csv\")\nsales = fact.merge(branches, on=\"branch_id\").merge(products, on=\"product_id\")\nsales[\"revenue\"] = sales[\"quantity\"] * sales[\"unit_price\"]\nsales[\"year\"] = sales[\"month_start\"].dt.year\nsales[\"month\"] = sales[\"month_start\"].dt.month\nprint(sales.shape)\n```\n\nOutput: `(162, 14)`. `parse_dates` makes `month_start` a real date, so `.dt.year` and `.dt.month` work.\n\n2. Revenue by branch, largest first:\n\n```python\nsales.groupby(\"branch\")[\"revenue\"].sum().sort_values(ascending=False)\n```\n\nOutput: Hilltop 8,833,400; Central 6,782,200; Riverside 4,415,700. These add up to 20,031,300, the same total as Module 10.\n\n3. A filter: `sales[(sales[\"branch\"] == \"Riverside\") & (sales[\"year\"] == 2026)]` returns 18 rows (6 months × 3 products) with revenue of 1,404,000.\n4. Compare like with like. 2026 has only six months, so compare January–June of each year (the incomplete-year trap from Module 10):\n\n```python\nh1 = sales[sales[\"month\"] <= 6]\ntable = h1.pivot_table(index=\"branch\", columns=\"year\", values=\"revenue\", aggfunc=\"sum\")\ntable[\"growth_%\"] = ((table[2026] / table[2025] - 1) * 100).round(1)\nprint(table)\n```\n\nOutput:\n\n```\nyear          2025     2026  growth_%\nbranch\nCentral    2142300  2315600       8.1\nHilltop    2757700  3086650      11.9\nRiverside  1444600  1404000      -2.8\n```\n\nThese match the Power BI results in Module 10: Riverside is the only branch shrinking.\n\n5. Several summaries at once:\n\n```python\nsales.groupby(\"category\").agg(units=(\"quantity\", \"sum\"), revenue=(\"revenue\", \"sum\"))\n```\n\nOutput: Drinks 21,878 units / 7,657,300; Groceries 3,245 units / 8,112,500; Snacks 8,523 units / 4,261,500. Groceries sells the fewest units but earns the most, because rice is the most expensive product.\n\n6. Grouping the clean Connectwave file from Lesson 13.1:\n\n```python\nsubs = pd.read_csv(\"connectwave_subscribers_clean.csv\")\nsubs[\"churn_flag\"] = (subs[\"churned\"] == \"Yes\").astype(int)\nsubs.groupby(\"plan\").agg(customers=(\"customer_id\", \"count\"), churn_rate=(\"churn_flag\", \"mean\")).round(2)\n```\n\nOutput: Basic 5 customers, churn rate 0.60; Premium 3, 0.33; Standard 4, 0.25. Turning Yes/No into 1/0 means the mean of the flag is the churn rate.\n\n## Practical exercise\n\n- **Task:** answer three questions for Sunrise's regional manager.\n- **Steps:** using the merged `sales` table, find (1) revenue by category for 2025 only; (2) the top product by total revenue; (3) total revenue by year.\n- **Expected output:** (2) Rice 5kg, 8,112,500; (3) 2025 13,225,050 and 2026 (January–June) 6,806,250, with a note that the years are not comparable as whole years.\n- **Submit:** your notebook link.\n\n## Knowledge check\n\n1. Which code keeps only Riverside's rows from 2026?\n   - A) `sales[(sales[\"branch\"] == \"Riverside\") & (sales[\"year\"] == 2026)]`\n   - B) `sales[\"Riverside\", 2026]`\n   - C) `sales.groupby(\"Riverside\")`\n   - D) `sales[sales[\"branch\"] == \"Riverside\" or 2026]`\n2. What does `merge` do?\n   - A) Adds up a column\n   - B) Deletes duplicate rows\n   - C) Joins two tables using a shared key column\n   - D) Draws a chart\n3. Which is the Pandas equivalent of SQL's GROUP BY?\n   - A) `sort_values`\n   - B) `groupby`\n   - C) `head`\n   - D) `to_csv`\n4. Why were January–June of both years compared, instead of the full years?\n   - A) Pandas cannot read December\n   - B) The full years give the same answer\n   - C) Pivot tables only allow six columns\n   - D) 2026 has only six months of data, so full-year totals are not like for like\n5. A churned column is turned into 1 for Yes and 0 for No. What does the mean of that column give?\n   - A) The churn rate\n   - B) The number of customers\n   - C) The average tenure\n   - D) Nothing useful\n\n## Lesson summary\n\n1. Filter rows with conditions in square brackets, combined with & and |.\n2. merge joins fact and dimension tables on a key.\n3. groupby plus sum, mean or agg summarises each group.\n4. pivot\\_table builds a two-way summary; add calculated columns to it.\n5. Compare like with like: equal periods, equal definitions.\n\n## Completion check\n\n- [ ] I merged the Sunrise tables into 162 rows.\n- [ ] I produced the branch growth table.\n- [ ] I calculated churn rate by plan.",
      },
      {
        title: "Charts with Matplotlib",
        order: 3,
        durationMinutes: 75,
        videoUrl: "https://www.youtube.com/watch?v=D4VlmL3G4_o",
        content: "## Lesson introduction\n\n- **What you will study:** how to draw bar, line, histogram and scatter charts in Python with Matplotlib, and how to make them clear.\n- **Why it matters:** charts are how you see patterns quickly during analysis, and how you show them to others. The design rules from Module 8 still apply.\n- **After this lesson you can:** turn a grouped result into a labelled chart and save it as an image.\n- **Estimated time:** 75 minutes.\n\n## The topic in simple English\n\nMatplotlib is Python's drawing kit. You give it the numbers, tell it which kind of chart you want, then add a title and axis labels. Pick the chart that suits the question: bars compare groups, lines show change over time, histograms show how values are spread, and scatter plots show whether two things move together.\n\n## Learning objectives\n\n1. Create a figure and axes with `plt.subplots()`.\n2. Draw bar, line, histogram and scatter charts.\n3. Add titles and axis labels, and start value axes at zero where needed.\n4. Choose the right chart for a question.\n5. Save a chart with `savefig`.\n\n## Main teaching content\n\n**1. The basic pattern**\n\nEvery chart in this course uses the same four steps:\n\n```python\nimport matplotlib.pyplot as plt\nfig, ax = plt.subplots(figsize=(7, 4))   # 1. an empty figure\nax.bar(names, values)                     # 2. draw\nax.set_title(\"A clear title\")             # 3. label\nfig.savefig(\"chart.png\", dpi=120)         # 4. save (optional)\n```\n\n`fig` is the whole picture; `ax` is the chart area you draw on.\n\n**2. Which chart for which question?**\n\n| Question | Chart | Matplotlib |\n| --- | --- | --- |\n| Which group is biggest? | Bar (horizontal for long names) | `ax.bar()` / `ax.barh()` |\n| How has it changed over time? | Line | `ax.plot()` |\n| How are the values spread? | Histogram | `ax.hist()` |\n| Do two measures move together? | Scatter | `ax.scatter()` |\n\n**3. Clarity rules (from Module 8)**\n\n- A title that says what the chart shows.\n- Axis labels with units.\n- Bar charts start at zero; set line charts to zero too when the size of the change matters (`ax.set_ylim(bottom=0)`).\n- Sort bars so the order means something.\n- One message per chart.\n\n**4. Pandas shortcut**\n\nA Pandas result can draw itself: `by_branch.plot(kind=\"barh\")`. It uses Matplotlib underneath. Use whichever you find easier, but always add a title and labels.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Matplotlib | Python's main charting library | The drawing kit | A set of pens | Monthly revenue line |\n| Figure and axes | The whole image, and the area inside it holding one chart | The page and the drawing on it | A poster and its picture | A dashboard image with one chart |\n| Histogram | Bars showing how many values fall in each range | How values spread | Ages of a class in bands | Spread of account balances |\n| Scatter plot | Points plotted by two measures | Do two things go together? | Height against shoe size | Tenure against data usage |\n| savefig | Saves a figure as an image file | Save the picture | Taking a photo | A PNG for a report |\n\n## Step-by-step demonstration: four Sunrise and Connectwave charts\n\nStart with the merged `sales` table from Lesson 13.2.\n\n1. Bar chart of revenue by branch:\n\n```python\nimport matplotlib.pyplot as plt\nby_branch = sales.groupby(\"branch\")[\"revenue\"].sum().sort_values()\nfig, ax = plt.subplots(figsize=(7, 4))\nax.barh(by_branch.index, by_branch.values)\nax.set_title(\"Revenue by branch, Jan 2025 to Jun 2026\")\nax.set_xlabel(\"Revenue\")\nfig.tight_layout()\n```\n\n`sort_values()` puts the largest bar at the top of a horizontal chart. `tight_layout()` stops labels being cut off.\n\n2. Line chart of monthly revenue:\n\n```python\nmonthly = sales.groupby(\"month_start\")[\"revenue\"].sum()\nfig, ax = plt.subplots(figsize=(8, 4))\nax.plot(monthly.index, monthly.values, marker=\"o\")\nax.set_title(\"Monthly revenue, all branches\")\nax.set_ylabel(\"Revenue\")\nax.set_ylim(bottom=0)\n```\n\nThe line has 18 points. The highest month is December 2025 (1,296,600) and the lowest is February 2025 (973,700); check this with `monthly.idxmax()` and `monthly.idxmin()`.\n\n3. Histogram of Connectwave tenure:\n\n```python\nsubs = pd.read_csv(\"connectwave_subscribers_clean.csv\")\nfig, ax = plt.subplots()\nax.hist(subs[\"tenure_months\"], bins=6)\nax.set_title(\"How long subscribers have been with us\")\nax.set_xlabel(\"Tenure (months)\")\nax.set_ylabel(\"Number of subscribers\")\n```\n\nMost subscribers are in the lower bands: half have been customers for 7.5 months or less (the median).\n\n4. Scatter of tenure against data usage:\n\n```python\nfig, ax = plt.subplots()\nax.scatter(subs[\"tenure_months\"], subs[\"data_usage_gb\"])\nax.set_title(\"Tenure against monthly data usage\")\nax.set_xlabel(\"Tenure (months)\")\nax.set_ylabel(\"Data usage (GB)\")\n```\n\nThe points rise from left to right: longer-standing subscribers tend to use more data. `subs[\"tenure_months\"].corr(subs[\"data_usage_gb\"])` gives 0.57 (Module 7: a moderate positive correlation). K1011, with no usage value, is simply not plotted.\n\n5. Save the bar chart: `fig.savefig(\"revenue_by_branch.png\", dpi=120)`, then download it from the folder panel.\n\n## Practical exercise\n\n- **Task:** a chart pack for Sunrise's manager.\n- **Steps:** draw (1) a bar chart of revenue by category, sorted; (2) a line chart of monthly revenue for Riverside only; (3) any one chart you think is useful, with a one-sentence reason. Every chart needs a title and axis labels.\n- **Expected output:** Groceries is the top category; Riverside's line covers 18 months.\n- **Submit:** your notebook link and the three PNG files.\n\n## Knowledge check\n\n1. Which chart best shows how monthly revenue changed over 18 months?\n   - A) Pie chart\n   - B) Histogram\n   - C) Line chart\n   - D) Scatter plot\n2. In `fig, ax = plt.subplots()`, what is `ax`?\n   - A) The chart area you draw on\n   - B) The file name\n   - C) The data table\n   - D) A colour setting\n3. Which chart shows how account balances are spread across ranges?\n   - A) Line chart\n   - B) Scatter plot\n   - C) Pie chart\n   - D) Histogram\n4. Why use `sort_values()` before drawing a bar chart?\n   - A) Matplotlib cannot draw unsorted data\n   - B) So the bar order shows which groups are biggest\n   - C) It removes missing values\n   - D) It changes the colours\n5. A scatter of tenure against usage shows points rising from left to right. What does that suggest?\n   - A) Tenure causes usage to rise\n   - B) The data is wrong\n   - C) Longer-standing subscribers tend to use more data\n   - D) There is no relationship\n\n## Lesson summary\n\n1. fig, ax = plt.subplots(), then draw, label and save.\n2. Bars compare groups, lines show time, histograms show spread, scatters show relationships.\n3. Every chart needs a clear title and labelled axes.\n4. Start value axes at zero when size matters, and sort bars.\n5. A pattern in a scatter shows association, not cause.\n\n## Completion check\n\n- [ ] I drew a bar, line, histogram and scatter chart.\n- [ ] Every chart has a title and axis labels.\n- [ ] I saved a chart as a PNG.",
      },
      {
        title: "Exploratory data analysis from start to finish",
        order: 4,
        durationMinutes: 85,
        videoUrl: "https://www.youtube.com/watch?v=Liv6eeb1VfE",
        content: "## Lesson introduction\n\n- **What you will study:** a repeatable, step-by-step EDA routine that takes you from a new file to a short list of evidence-based findings.\n- **Why it matters:** before building a dashboard or a model, an analyst must understand the data: what is in it, what is wrong with it, and what patterns are worth investigating.\n- **After this lesson you can:** run a full EDA in one notebook and write findings with honest limits.\n- **Estimated time:** 85 minutes.\n\n## The topic in simple English\n\nEDA is like a doctor's first check-up. Before any treatment, the doctor checks the basics (height, weight, temperature), looks for anything unusual, and asks questions. Only then do they decide what needs a closer look. EDA does the same for a dataset: check, clean, describe, compare, then write down what you found and how sure you are.\n\n## Learning objectives\n\n1. Follow a six-step EDA routine.\n2. Use `describe()` and `value_counts()` to describe a dataset.\n3. Compare an outcome across groups with `groupby`.\n4. Check relationships with `corr()` and scatter plots.\n5. Write findings that state the evidence and its limits.\n\n## Main teaching content\n\n**1. The six-step EDA routine**\n\n| Step | Question | Typical code |\n| --- | --- | --- |\n| 1. Question | What do we need to know? | A text cell |\n| 2. Inspect | What is in the file? | `shape`, `dtypes`, `head()` |\n| 3. Clean | What is wrong, and how did I fix it? | Lesson 13.1 |\n| 4. Describe | What does each column look like? | `describe()`, `value_counts()`, histograms |\n| 5. Compare | How does the outcome differ between groups? | `groupby`, bar charts |\n| 6. Relate and conclude | Which measures move together? What do I conclude? | `corr()`, scatter, text cell |\n\n**2. describe()**\n\n`df.describe()` gives count, mean, standard deviation, minimum, quartiles and maximum for each number column at once: a quick version of Module 7's summary statistics.\n\n**3. Outcome by group**\n\nWhen the outcome is Yes/No, turn it into a 1/0 flag and group it: the mean is the rate. Always show the count beside the rate. A 100% rate from 3 customers means much less than 40% from 300.\n\n**4. Honest findings**\n\nA good finding has four parts: what you found, the numbers, how sure you are, and what to check next. Avoid saying one thing causes another; EDA shows patterns, not proof.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| EDA | Exploratory data analysis: describing and investigating data before formal modelling or reporting | Getting to know the data | A first look round a new house | Checking churn data before a dashboard |\n| describe() | A Pandas summary of each number column | Quick stats | A school report's summary line | Mean tenure and usage |\n| Flag | A 1/0 column marking whether something happened | A tick box | Present or absent | Churned = 1 |\n| Rate | Events divided by the number at risk | How often, out of how many | 3 late days out of 20 | 5 churners out of 12 |\n| Sample size | The number of records behind a result | How much evidence | Asking 3 friends or 300 people | 3 customers per region |\n\n## Step-by-step demonstration: why do Connectwave subscribers leave?\n\n1. **Question.** In a text cell: \"Which subscribers are most likely to churn, and what should the retention team look at first?\"\n2. **Inspect and clean.** Load **connectwave\\_subscribers\\_clean.csv** from Lesson 13.1 (or re-run the cleaning cells). `subs.shape` is `(12, 7)`; `subs.isna().sum()` shows one missing usage value.\n3. **Describe.**\n\n```python\nprint(subs.describe().round(1))\nprint(subs[\"churned\"].value_counts())\n```\n\nOutput: tenure mean 10.7 months, median 7.5, range 1–30; usage mean 13.1 GB from 11 values; complaints mean 1.4, range 0–4. Churned: No 7, Yes 5, so the churn rate is 5 out of 12, 41.7%.\n\n4. **Compare groups.**\n\n```python\nsubs[\"churn_flag\"] = (subs[\"churned\"] == \"Yes\").astype(int)\nsubs.groupby(\"complaints\")[\"churn_flag\"].agg([\"sum\", \"count\"])\nsubs[\"new\"] = subs[\"tenure_months\"] <= 6\nsubs.groupby(\"new\")[\"churn_flag\"].agg([\"sum\", \"count\"])\nsubs.groupby(\"region\")[\"churn_flag\"].agg([\"sum\", \"count\"])\n```\n\nResults:\n\n- Complaints: 0 complaints, 0 of 3 churned; 1 complaint, 0 of 4; 2 or more, 5 of 5.\n- Tenure: subscribers of 6 months or less, 5 of 6 churned; over 6 months, 0 of 6.\n- Region: West 3 of 3, North 1 of 3, South 1 of 3, East 0 of 3.\n\n5. **Relate.**\n\n```python\nsubs[[\"tenure_months\", \"data_usage_gb\", \"complaints\", \"churn_flag\"]].corr().round(2)\n```\n\nThe churn flag correlates +0.84 with complaints and −0.73 with tenure. Complaints and tenure are also related (−0.68): newer subscribers complain more. So we cannot tell from this data which one matters more.\n\n6. **Conclude.** In a text cell:\n\n> All five churners had two or more complaints and had been with us six months or less; no subscriber with fewer than two complaints left. West lost all three of its subscribers. **Limits:** this is only 12 subscribers, so these are leads to investigate, not proven causes. **Next:** repeat this on the full subscriber base, and check what the complaints were about.\n\n## Practical exercise\n\n- **Task:** extend the Connectwave EDA.\n- **Steps:** add (1) churn rate by plan with counts; (2) mean usage of churners against non-churners; (3) one chart that supports your strongest finding, and one sentence on the sample-size limit.\n- **Expected output:** Basic 3 of 5 churned, Premium 1 of 3, Standard 1 of 4; mean usage 7.1 GB for churners against 18.2 GB for those who stayed.\n- **Submit:** your notebook link.\n\n## Knowledge check\n\n1. What is the first step of the EDA routine?\n   - A) Draw every possible chart\n   - B) Build a machine learning model\n   - C) Delete missing values\n   - D) Write down the question you need to answer\n2. What does `df.describe()` give?\n   - A) A list of column names only\n   - B) Count, mean, spread, quartiles, minimum and maximum for number columns\n   - C) The first five rows\n   - D) A bar chart\n3. Region West shows 3 of 3 subscribers churned. What is the right way to report this?\n   - A) \"West causes churn\"\n   - B) \"West has a 100% churn rate, so close West\"\n   - C) \"All 3 West subscribers churned; with so few customers this needs checking on more data\"\n   - D) Leave it out because it is unusual\n4. Complaints and tenure are both related to churn, and to each other. What can you conclude?\n   - A) The data alone cannot show which one matters more\n   - B) Complaints definitely cause churn\n   - C) Tenure has no effect\n   - D) Correlation proves cause\n5. Why show the count next to each churn rate?\n   - A) It makes the table longer\n   - B) A rate from a few customers is much less reliable than one from many\n   - C) Pandas requires it\n   - D) Counts and rates are the same thing\n\n## Lesson summary\n\n1. EDA: question, inspect, clean, describe, compare, relate and conclude.\n2. describe() and value\\_counts() give a fast picture of every column.\n3. A 1/0 flag grouped by category gives the rate per group; show counts too.\n4. Correlated factors can hide each other; say what the data cannot tell you.\n5. Findings state the evidence, the limits and the next check.\n\n## Completion check\n\n- [ ] I ran all six EDA steps on the Connectwave file.\n- [ ] I reported rates with their counts.\n- [ ] My findings include limits and a next step.",
      },
    ],
    assignmentTitle: "Harbour Bank account closures",
    assignmentDescription: "Harbour Bank's customer manager says: \"Too many customers closed their accounts this year.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "Which code removes exact duplicate rows?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "df = df.drop_duplicates()",
            isCorrect: true,
          },
          {
            text: "df.isna()",
            isCorrect: false,
          },
          {
            text: "df.describe()",
            isCorrect: false,
          },
          {
            text: "df.head()",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which turns the text \"3,150\" into a number Pandas can add up?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: ".str.title()",
            isCorrect: false,
          },
          {
            text: ".value_counts()",
            isCorrect: false,
          },
          {
            text: ".drop_duplicates()",
            isCorrect: false,
          },
          {
            text: "Remove the comma with .str.replace(\",\", \"\"), then use pd.to_numeric()",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which keeps rows where category is Drinks or Snacks?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "df[\"category\"] == \"Drinks\" and \"Snacks\"",
            isCorrect: false,
          },
          {
            text: "df.groupby(\"Drinks\")",
            isCorrect: false,
          },
          {
            text: "df[df[\"category\"].isin([\"Drinks\", \"Snacks\"])]",
            isCorrect: true,
          },
          {
            text: "df.sort_values(\"Snacks\")",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does sales.groupby(\"branch\")[\"revenue\"].sum() return?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "The number of rows per branch",
            isCorrect: false,
          },
          {
            text: "Total revenue for each branch",
            isCorrect: true,
          },
          {
            text: "The first branch only",
            isCorrect: false,
          },
          {
            text: "A chart",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which joins a fact table to a branch table on branch_id?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "fact.merge(branches, on=\"branch_id\")",
            isCorrect: true,
          },
          {
            text: "fact + branches",
            isCorrect: false,
          },
          {
            text: "fact.groupby(branches)",
            isCorrect: false,
          },
          {
            text: "pd.read_csv(branches)",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which chart shows whether two measures move together?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Pie chart",
            isCorrect: false,
          },
          {
            text: "Line chart",
            isCorrect: false,
          },
          {
            text: "Histogram",
            isCorrect: false,
          },
          {
            text: "Scatter plot",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What does ax.set_ylim(bottom=0) do?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Deletes values below zero",
            isCorrect: false,
          },
          {
            text: "Starts the vertical axis at zero",
            isCorrect: true,
          },
          {
            text: "Sorts the data",
            isCorrect: false,
          },
          {
            text: "Saves the chart",
            isCorrect: false,
          },
        ],
      },
      {
        text: "An EDA finds that customers with more complaints close their accounts more often. Which statement is correct?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Complaints are proven to cause closures",
            isCorrect: false,
          },
          {
            text: "The pattern is meaningless",
            isCorrect: false,
          },
          {
            text: "It is an association worth investigating, not proof of cause",
            isCorrect: true,
          },
          {
            text: "The analyst should hide it",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why compare January–June 2025 with January–June 2026 instead of full years?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Equal periods give a like-for-like comparison when 2026 is incomplete",
            isCorrect: true,
          },
          {
            text: "Pandas cannot handle 12 months",
            isCorrect: false,
          },
          {
            text: "The second half of the year never matters",
            isCorrect: false,
          },
          {
            text: "It always shows growth",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What should an analyst do with the raw file after cleaning it in Python?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Overwrite it",
            isCorrect: false,
          },
          {
            text: "Delete it",
            isCorrect: false,
          },
          {
            text: "Keep it unchanged and save the cleaned data under a new name",
            isCorrect: true,
          },
          {
            text: "Rename the raw file \"clean\"",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which line counts the missing values in every column?",
        type: "multiple_choice",
        points: 1,
        explanation: "isna().sum()",
        answers: [
          {
            text: "subs.shape",
            isCorrect: false,
          },
          {
            text: "subs.isna().sum()",
            isCorrect: true,
          },
          {
            text: "subs.duplicated()",
            isCorrect: false,
          },
          {
            text: "subs.head()",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A column holds \" basic\", \"BASIC\" and \"Basic\". Which code makes them all \"Basic\"?",
        type: "multiple_choice",
        points: 1,
        explanation: ".str.strip().str.title()",
        answers: [
          {
            text: ".str.upper()",
            isCorrect: false,
          },
          {
            text: ".drop_duplicates()",
            isCorrect: false,
          },
          {
            text: "pd.to_numeric()",
            isCorrect: false,
          },
          {
            text: ".str.strip().str.title()",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Why can't Pandas average a usage column that contains \"40 GB\"?",
        type: "multiple_choice",
        points: 1,
        explanation: "stored as text",
        answers: [
          {
            text: "The column is stored as text, so it must be converted to numbers first",
            isCorrect: true,
          },
          {
            text: "Pandas cannot average more than ten values",
            isCorrect: false,
          },
          {
            text: "Averages only work on dates",
            isCorrect: false,
          },
          {
            text: "The column has no name",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What should you do with the raw file after cleaning?",
        type: "multiple_choice",
        points: 1,
        explanation: "keep raw, save clean copy",
        answers: [
          {
            text: "Delete it",
            isCorrect: false,
          },
          {
            text: "Overwrite it with the clean data",
            isCorrect: false,
          },
          {
            text: "Keep it unchanged and save the clean data under a new name",
            isCorrect: true,
          },
          {
            text: "Email it to every customer",
            isCorrect: false,
          },
        ],
      },
      {
        text: "One subscriber's usage is missing and there is no reliable way to estimate it. What is the best choice here?",
        type: "multiple_choice",
        points: 1,
        explanation: "leave missing and record it",
        answers: [
          {
            text: "Type in a number that looks reasonable",
            isCorrect: false,
          },
          {
            text: "Delete the whole column",
            isCorrect: false,
          },
          {
            text: "Fill every missing value with zero",
            isCorrect: false,
          },
          {
            text: "Leave it as missing and record that decision in the notebook",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which code keeps only Riverside's rows from 2026?",
        type: "multiple_choice",
        points: 1,
        explanation: "two bracketed conditions with &",
        answers: [
          {
            text: "sales[(sales[\"branch\"] == \"Riverside\") & (sales[\"year\"] == 2026)]",
            isCorrect: true,
          },
          {
            text: "sales[\"Riverside\", 2026]",
            isCorrect: false,
          },
          {
            text: "sales.groupby(\"Riverside\")",
            isCorrect: false,
          },
          {
            text: "sales[sales[\"branch\"] == \"Riverside\" or 2026]",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does merge do?",
        type: "multiple_choice",
        points: 1,
        explanation: "joins on a shared key",
        answers: [
          {
            text: "Adds up a column",
            isCorrect: false,
          },
          {
            text: "Deletes duplicate rows",
            isCorrect: false,
          },
          {
            text: "Joins two tables using a shared key column",
            isCorrect: true,
          },
          {
            text: "Draws a chart",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is the Pandas equivalent of SQL's GROUP BY?",
        type: "multiple_choice",
        points: 1,
        explanation: "groupby",
        answers: [
          {
            text: "sort_values",
            isCorrect: false,
          },
          {
            text: "groupby",
            isCorrect: true,
          },
          {
            text: "head",
            isCorrect: false,
          },
          {
            text: "to_csv",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why were January–June of both years compared, instead of the full years?",
        type: "multiple_choice",
        points: 1,
        explanation: "2026 has only six months",
        answers: [
          {
            text: "Pandas cannot read December",
            isCorrect: false,
          },
          {
            text: "The full years give the same answer",
            isCorrect: false,
          },
          {
            text: "Pivot tables only allow six columns",
            isCorrect: false,
          },
          {
            text: "2026 has only six months of data, so full-year totals are not like for like",
            isCorrect: true,
          },
        ],
      },
      {
        text: "A churned column is turned into 1 for Yes and 0 for No. What does the mean of that column give?",
        type: "multiple_choice",
        points: 1,
        explanation: "the churn rate",
        answers: [
          {
            text: "The churn rate",
            isCorrect: true,
          },
          {
            text: "The number of customers",
            isCorrect: false,
          },
          {
            text: "The average tenure",
            isCorrect: false,
          },
          {
            text: "Nothing useful",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which chart best shows how monthly revenue changed over 18 months?",
        type: "multiple_choice",
        points: 1,
        explanation: "line chart",
        answers: [
          {
            text: "Pie chart",
            isCorrect: false,
          },
          {
            text: "Histogram",
            isCorrect: false,
          },
          {
            text: "Line chart",
            isCorrect: true,
          },
          {
            text: "Scatter plot",
            isCorrect: false,
          },
        ],
      },
      {
        text: "In fig, ax = plt.subplots(), what is ax?",
        type: "multiple_choice",
        points: 1,
        explanation: "the chart area",
        answers: [
          {
            text: "The chart area you draw on",
            isCorrect: true,
          },
          {
            text: "The file name",
            isCorrect: false,
          },
          {
            text: "The data table",
            isCorrect: false,
          },
          {
            text: "A colour setting",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which chart shows how account balances are spread across ranges?",
        type: "multiple_choice",
        points: 1,
        explanation: "histogram",
        answers: [
          {
            text: "Line chart",
            isCorrect: false,
          },
          {
            text: "Scatter plot",
            isCorrect: false,
          },
          {
            text: "Pie chart",
            isCorrect: false,
          },
          {
            text: "Histogram",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Why use sort_values() before drawing a bar chart?",
        type: "multiple_choice",
        points: 1,
        explanation: "order shows the biggest",
        answers: [
          {
            text: "Matplotlib cannot draw unsorted data",
            isCorrect: false,
          },
          {
            text: "So the bar order shows which groups are biggest",
            isCorrect: true,
          },
          {
            text: "It removes missing values",
            isCorrect: false,
          },
          {
            text: "It changes the colours",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A scatter of tenure against usage shows points rising from left to right. What does that suggest?",
        type: "multiple_choice",
        points: 1,
        explanation: "tend to use more data",
        answers: [
          {
            text: "Tenure causes usage to rise",
            isCorrect: false,
          },
          {
            text: "The data is wrong",
            isCorrect: false,
          },
          {
            text: "Longer-standing subscribers tend to use more data",
            isCorrect: true,
          },
          {
            text: "There is no relationship",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the first step of the EDA routine?",
        type: "multiple_choice",
        points: 1,
        explanation: "write down the question",
        answers: [
          {
            text: "Draw every possible chart",
            isCorrect: false,
          },
          {
            text: "Build a machine learning model",
            isCorrect: false,
          },
          {
            text: "Delete missing values",
            isCorrect: false,
          },
          {
            text: "Write down the question you need to answer",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What does df.describe() give?",
        type: "multiple_choice",
        points: 1,
        explanation: "count, mean, spread, quartiles",
        answers: [
          {
            text: "A list of column names only",
            isCorrect: false,
          },
          {
            text: "Count, mean, spread, quartiles, minimum and maximum for number columns",
            isCorrect: true,
          },
          {
            text: "The first five rows",
            isCorrect: false,
          },
          {
            text: "A bar chart",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Region West shows 3 of 3 subscribers churned. What is the right way to report this?",
        type: "multiple_choice",
        points: 1,
        explanation: "report 3 of 3 and check more data",
        answers: [
          {
            text: "\"West causes churn\"",
            isCorrect: false,
          },
          {
            text: "\"West has a 100% churn rate, so close West\"",
            isCorrect: false,
          },
          {
            text: "\"All 3 West subscribers churned; with so few customers this needs checking on more data\"",
            isCorrect: true,
          },
          {
            text: "Leave it out because it is unusual",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Complaints and tenure are both related to churn, and to each other. What can you conclude?",
        type: "multiple_choice",
        points: 1,
        explanation: "data cannot show which matters more",
        answers: [
          {
            text: "The data alone cannot show which one matters more",
            isCorrect: true,
          },
          {
            text: "Complaints definitely cause churn",
            isCorrect: false,
          },
          {
            text: "Tenure has no effect",
            isCorrect: false,
          },
          {
            text: "Correlation proves cause",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why show the count next to each churn rate?",
        type: "multiple_choice",
        points: 1,
        explanation: "few customers make a rate unreliable",
        answers: [
          {
            text: "It makes the table longer",
            isCorrect: false,
          },
          {
            text: "A rate from a few customers is much less reliable than one from many",
            isCorrect: true,
          },
          {
            text: "Pandas requires it",
            isCorrect: false,
          },
          {
            text: "Counts and rates are the same thing",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 14,
    moduleTitle: "Business Analysis, Reporting and Decision-Making",
    moduleDescription: "Learners turn analysis into decisions. They turn vague requests into clear business questions and KPIs, write short analytical reports, build recommendations from evidence, and present them to managers. The module reuses results learners have already produced: Sunrise Mart branch growth (Modules 10–13), Brightpath Services department margins (Module 10) and Harbour Bank account closures (Module 13 assignment). Data file: brightpath_fact_finance.csv with brightpath_dim_department.csv (Lessons 14.1 and 14.3). All figures quoted were calculated in Pandas from the course files.",
    lessons: [
      {
        title: "Business questions, KPIs and requirements",
        order: 1,
        durationMinutes: 70,
        videoUrl: "https://www.youtube.com/watch?v=ItZlTixh6Bs",
        content: "**Files for this lesson:** [brightpath_dim_department.csv](/course-files/data-analytics/brightpath_dim_department.csv) · [brightpath_fact_finance.csv](/course-files/data-analytics/brightpath_fact_finance.csv). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** how to turn a manager's vague request into a precise business question, choose and define KPIs, and write down requirements before you start analysing.\n- **Why it matters:** the most common reason analysis fails is that it answers the wrong question. Ten minutes of good questions saves days of wasted work.\n- **After this lesson you can:** run a short requirements conversation and produce a one-page analysis brief.\n- **Estimated time:** 70 minutes.\n\n## The topic in simple English\n\nWhen someone says \"I don't feel well\", a good doctor asks: where does it hurt, since when, how badly? Only then do they decide on tests. An analyst does the same. \"IT Support isn't doing well\" is a feeling. \"Why did IT Support's profit margin fall in January–April 2026 compared with last year?\" is a question you can answer with data.\n\nA KPI (key performance indicator) is one of the few numbers a team watches to know if it is doing well, like the fuel gauge and speedometer on a car dashboard.\n\n## Learning objectives\n\n1. Turn a vague request into a specific, measurable business question.\n2. Tell the difference between a metric and a KPI.\n3. Define a KPI fully: formula, data source, target, owner and frequency.\n4. Identify stakeholders and their needs.\n5. Write a one-page analysis brief.\n\n## Main teaching content\n\n**1. From vague to specific**\n\nA good business question says **what** is measured, **for whom**, **over what period**, **compared with what**, and **what decision** it supports.\n\n| Vague request | Specific business question |\n| --- | --- |\n| \"IT Support isn't doing well.\" | \"Why did IT Support's margin fall in January–April 2026 compared with January–April 2025, and what should we change?\" |\n| \"Are customers leaving?\" | \"What share of customers closed accounts in 2026, which groups closed most, and where should the retention campaign start?\" |\n| \"How is Riverside doing?\" | \"How did Riverside's January–June 2026 revenue compare with the same months of 2025, and with the other branches?\" |\n\n**2. Five questions to ask the requester**\n\n1. What decision will this help you make?\n2. What would you do differently depending on the answer?\n3. Which period and which part of the business?\n4. What do you already believe, and why?\n5. When do you need it, and in what form (one number, a report, a dashboard)?\n\n**3. Metric or KPI?**\n\nA **metric** is any number you can measure. A **KPI** is a metric linked to a goal, with a target, that someone is responsible for. A business has hundreds of metrics but should watch only a handful of KPIs per team.\n\n**4. Defining a KPI fully**\n\n| Part | Example: department margin % |\n| --- | --- |\n| Name | Department margin % |\n| Formula | (revenue − cost) ÷ revenue × 100 |\n| Data source | brightpath\\_fact\\_finance, monthly |\n| Target | At least 20% each month |\n| Owner | Head of each department |\n| Frequency | Monthly, reviewed at the management meeting |\n| Direction | Higher is better |\n\nWriting the formula down stops arguments later. Two people asked for \"churn\" can easily calculate it two different ways.\n\n**5. Leading and lagging indicators**\n\nA **lagging** indicator tells you what has already happened (accounts closed this year). A **leading** indicator warns you early (complaints this month). Good KPI sets include both.\n\n**6. The analysis brief**\n\nBefore starting, write one page: the business question, the decision it supports, stakeholders, KPIs and definitions, data sources, scope (what is in and out), deadline and format, and known risks. Ask the requester to agree it.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Business question | A specific, measurable question linked to a decision | What we really need to know | \"Which bus gets me there by 9?\" | Why did IT Support's margin fall? |\n| KPI | A key metric tied to a goal, with a target and an owner | One of the few numbers that matter | A car's fuel gauge | Monthly department margin % |\n| Stakeholder | Anyone who affects or is affected by the work | People with an interest | Parents at a school meeting | Finance director, department heads |\n| Requirements | The agreed needs the analysis must meet | What has been asked for | A shopping list | \"Monthly margin by department, by Friday\" |\n| Leading indicator | A measure that changes before the outcome | An early warning | Dark clouds before rain | Complaints before closures |\n\n## Step-by-step demonstration: an analysis brief for Brightpath\n\nBrightpath's managing director tells the analyst: \"IT Support isn't doing well. Look into it.\"\n\n1. **Ask the five questions.** The answers: the decision is whether to change IT Support's pricing or staffing; the period is January–April 2026 against the same months of 2025; the director believes costs have grown.\n2. **Write the question:** \"Why did IT Support's margin fall in January–April 2026 compared with January–April 2025, and what should Brightpath change?\"\n3. **Choose KPIs:** department margin %, revenue growth % and cost growth % (each with its formula).\n4. **List stakeholders:** managing director (decides), head of IT Support (owns the KPI), finance team (owns the data).\n5. **Check the data quickly.** Load the finance files in Python and confirm they hold monthly revenue and cost for IT Support from January 2025 to April 2026:\n\n```python\nimport pandas as pd\nfin = pd.read_csv(\"brightpath_fact_finance.csv\", parse_dates=[\"month_start\"])\ndept = pd.read_csv(\"brightpath_dim_department.csv\")\nfin = fin.merge(dept, on=\"dept_id\")\nit = fin[fin[\"department\"] == \"IT Support\"]\nprint(len(it), it[\"month_start\"].min(), it[\"month_start\"].max())\n```\n\nOutput: `16 2025-01-01 00:00:00 2026-04-01 00:00:00`, meaning 16 monthly rows from January 2025 to April 2026.\n\n6. **Write the brief:**\n\n| Section | Content |\n| --- | --- |\n| Question | Why did IT Support's margin fall in Jan–Apr 2026 against Jan–Apr 2025, and what should change? |\n| Decision | Pricing and staffing for IT Support |\n| KPIs | Margin % = (revenue − cost) ÷ revenue × 100; revenue growth %; cost growth % |\n| Data | brightpath\\_fact\\_finance and dim\\_department, monthly, Jan 2025–Apr 2026 |\n| Scope | IT Support, compared with Consulting and Training; no data on individual contracts |\n| Stakeholders | Managing director, head of IT Support, finance |\n| Deadline and format | One-page report and five slides, next Friday |\n| Risks | Monthly figures only; no breakdown of cost type |\n\n## Practical exercise\n\n- **Task:** write an analysis brief for Connectwave.\n- **Scenario:** the customer director says, \"We're losing too many customers.\"\n- **Steps:** write the five questions you would ask with likely answers, a specific business question, two KPIs with full definitions (one leading, one lagging), and a complete brief table.\n- **Expected output:** for example, churn rate = customers who left in the month ÷ customers at the start of the month × 100 (lagging), and complaints per 100 customers (leading).\n- **Submit:** a one-page document.\n\n## Knowledge check\n\n1. Which is the best business question?\n   - A) \"Look at the sales data.\"\n   - B) \"Is everything fine?\"\n   - C) \"How did Riverside's January–June 2026 revenue compare with the same months of 2025?\"\n   - D) \"Make a dashboard.\"\n2. What makes a metric a KPI?\n   - A) It is linked to a goal, has a target and has an owner\n   - B) It is the biggest number in the dataset\n   - C) It is shown in red\n   - D) It is calculated in Python\n3. Why write the formula down when defining a KPI?\n   - A) Formulas look professional\n   - B) Managers enjoy reading them\n   - C) It is required by law\n   - D) So everyone calculates it the same way\n4. Which is a leading indicator of account closures?\n   - A) Accounts closed last year\n   - B) Complaints made this month\n   - C) Total revenue in 2025\n   - D) The number of branches\n5. What is the first question to ask someone who requests an analysis?\n   - A) What decision will this help you make?\n   - B) Which chart colours do you like?\n   - C) How many rows does the data have?\n   - D) Can I use Python?\n\n## Lesson summary\n\n1. Turn feelings into specific questions: what, who, when, compared with what, for which decision.\n2. A KPI is a metric with a goal, a target and an owner.\n3. Define every KPI fully, including its formula.\n4. Combine leading and lagging indicators.\n5. Agree a one-page brief before starting.\n\n## Completion check\n\n- [ ] I can rewrite a vague request as a business question.\n- [ ] I defined two KPIs fully.\n- [ ] I wrote an analysis brief.",
      },
      {
        title: "Writing clear analytical reports",
        order: 2,
        durationMinutes: 75,
        videoUrl: "https://www.youtube.com/watch?v=vgZuTpOj9fE",
        content: "## Lesson introduction\n\n- **What you will study:** how to structure a short analytical report so a busy manager gets the answer in the first few lines, and how to write findings clearly and honestly.\n- **Why it matters:** managers often read only the first paragraph. If the answer is buried on page three, your analysis has no effect.\n- **After this lesson you can:** write a one-page report with the answer first, evidence, recommendation and limits.\n- **Estimated time:** 75 minutes.\n\n## The topic in simple English\n\nA report is like a news story: the headline and first sentence tell you what happened; details follow for those who want them. Start with the answer, then show how you know, then say what to do and how sure you are.\n\n## Learning objectives\n\n1. Structure a report with the main answer first.\n2. Write findings that pair a claim with a number and a comparison.\n3. Choose tables and charts that support each finding.\n4. State method, limits and assumptions honestly.\n5. Edit for plain, short, precise language.\n\n## Main teaching content\n\n**1. The one-page report structure**\n\n| Section | What it holds | Length |\n| --- | --- | --- |\n| Title | The main message, not just the topic | One line |\n| Summary | The answer, the key number, the recommendation | Two to three sentences |\n| Findings | Three to five findings, most important first | One short paragraph or bullet each |\n| Recommendation | What to do, who should do it, by when | Two to four bullets |\n| Method and limits | Data, period, what was not checked | Three to five lines |\n| Appendix | Extra tables and charts | Optional |\n\n**2. Titles that say something**\n\n\"Riverside sales report\" names the topic. \"Riverside is the only branch with falling sales\" gives the message. Use message titles for reports, charts and slides.\n\n**3. Writing a finding**\n\nA strong finding has a **claim**, a **number** and a **comparison**: \"Riverside's January–June revenue fell 2.8% (1,444,600 to 1,404,000), while Hilltop grew 11.9% and Central 8.1%.\"\n\n**4. Plain language rules**\n\n- Short sentences, one idea each.\n- Everyday words: \"use\" not \"utilise\", \"fell\" not \"experienced a decline\".\n- Round numbers sensibly: 2.8%, not 2.8106%.\n- Define any technical term the reader may not know, or remove it.\n- No unsupported words like \"huge\" or \"dramatic\"; give the number.\n\n**5. Honesty about limits**\n\nSay what the data does not cover and what you assumed. This protects the reader from over-reading results and protects you. \"We have sales but no footfall data, so we cannot tell whether fewer customers came or each spent less.\"\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Executive summary | The opening section giving the answer and recommendation | The short version | The back cover of a book | Three sentences on Riverside |\n| Message title | A title stating the conclusion | A headline | A newspaper headline | \"Riverside is the only branch shrinking\" |\n| Finding | A supported statement of what the data shows | What we learned | \"It rained every Monday\" | Riverside fell 2.8% |\n| Limitation | Something the analysis cannot show or did not cover | What we can't say | \"I only asked my friends\" | No footfall data |\n| Appendix | Supporting detail placed at the end | Extra pages | A recipe's notes | Full branch-by-month table |\n\n## Step-by-step demonstration: a one-page Riverside report\n\nYou calculated these figures in Modules 10–13 (January–June of each year):\n\n| Branch | 2025 | 2026 | Change |\n| --- | --- | --- | --- |\n| Hilltop | 2,757,700 | 3,086,650 | +11.9% |\n| Central | 2,142,300 | 2,315,600 | +8.1% |\n| Riverside | 1,444,600 | 1,404,000 | −2.8% |\n\nRiverside by category, January–June 2026 against 2025: Drinks −3.0%, Groceries −2.6%, Snacks −2.9%.\n\n1. **Write the message title:** \"Riverside is the only Sunrise branch with falling sales.\"\n2. **Write the summary:** \"Riverside's January–June 2026 revenue fell 2.8% on last year, while Hilltop grew 11.9% and Central 8.1%. The fall is spread evenly across all three categories, which points to fewer customers or smaller baskets rather than one product. We recommend a short customer count and basket study at Riverside before any price or range changes.\"\n3. **Write three findings,** each with claim, number and comparison: the branch comparison; the even category fall (−2.6% to −3.0%); and Riverside's share of 2026 revenue, 20.6%.\n4. **Write the recommendation:** who (Riverside branch manager with the analytics team), what (count customers and average basket for four weeks), by when (end of next month).\n5. **Write method and limits:** \"Monthly sales from the Sunrise star schema, January 2025–June 2026; equal periods compared. No footfall, price-change or competitor data, so the cause is not yet known.\"\n6. **Edit:** cut every sentence that does not help the reader decide. Read it aloud; rewrite anything you stumble over.\n\n## Practical exercise\n\n- **Task:** a one-page report on Connectwave churn from your Module 13 EDA.\n- **Steps:** use the six-section structure. The title must state a message; every finding must have a number and a comparison; include the 12-subscriber limit.\n- **Expected output:** a summary such as \"All five churners had two or more complaints and had been with us six months or less.\"\n- **Submit:** one page (PDF or document link).\n\n## Knowledge check\n\n1. What should come first in a report for a busy manager?\n   - A) The method\n   - B) The answer and the recommendation\n   - C) A history of the company\n   - D) All the code\n2. Which is the best report title?\n   - A) \"Sales data\"\n   - B) \"Report number 7\"\n   - C) \"Branch analysis\"\n   - D) \"Riverside is the only branch with falling sales\"\n3. Which finding is written best?\n   - A) \"Riverside did badly.\"\n   - B) \"Sales fell dramatically.\"\n   - C) \"Riverside's revenue fell 2.8%, while Hilltop grew 11.9% and Central 8.1%.\"\n   - D) \"Riverside sales were 1,404,000.\"\n4. Why include limitations in a report?\n   - A) So readers do not over-read the results\n   - B) To make the report longer\n   - C) Because managers like bad news\n   - D) To avoid giving a recommendation\n5. Which is plain English?\n   - A) \"Revenue experienced a negative trajectory.\"\n   - B) \"Utilisation of resources was suboptimal.\"\n   - C) \"The metric demonstrated a downward vector.\"\n   - D) \"Revenue fell.\"\n\n## Lesson summary\n\n1. Answer first: summary, findings, recommendation, then method and limits.\n2. Titles state the message, not just the topic.\n3. Findings combine a claim, a number and a comparison.\n4. Use short sentences, everyday words and sensible rounding.\n5. Be honest about what the data cannot show.\n\n## Completion check\n\n- [ ] I wrote a message title and a three-sentence summary.\n- [ ] Each of my findings has a number and a comparison.\n- [ ] My report states its limits.",
      },
      {
        title: "From insight to recommendation",
        order: 3,
        durationMinutes: 80,
        videoUrl: "https://www.youtube.com/watch?v=xlyLxvUfTzc",
        content: "## Lesson introduction\n\n- **What you will study:** how to move from \"what happened\" to \"what should we do\": explaining causes, generating options, comparing them against criteria and recommending one.\n- **Why it matters:** managers do not pay for charts; they pay for better decisions. An analyst who can recommend with evidence becomes a trusted adviser.\n- **After this lesson you can:** build a recommendation with options, criteria, expected impact and risks.\n- **Estimated time:** 80 minutes.\n\n## The topic in simple English\n\nAn insight says \"the car is using more fuel than last year\". A recommendation says \"get the tyres checked this week, because under-inflated tyres are the most likely reason and the check is cheap\". Good recommendations explain why, compare choices, and say what to do first.\n\n## Learning objectives\n\n1. Use the \"what, so what, now what\" chain.\n2. Break a change into its parts to find the driver.\n3. Generate at least three options and compare them against clear criteria.\n4. Estimate impact using the data, with assumptions stated.\n5. Write a recommendation with an owner, a timescale, a measure of success and risks.\n\n## Main teaching content\n\n**1. What, so what, now what**\n\n| Step | Question | Example |\n| --- | --- | --- |\n| What | What happened? | IT Support's margin fell from 20.1% to 12.8%. |\n| So what | Why does it matter, and why did it happen? | Margin fell 8,000 although revenue grew; costs grew faster. |\n| Now what | What should we do? | Review costs from March 2026 and the pricing of IT contracts. |\n\n**2. Find the driver**\n\nBreak the result into parts. Margin = revenue − cost, so ask: did revenue fall, did cost rise, or both? Then ask *when*: a sudden step points to one event; a steady drift points to a trend.\n\n**3. Options and criteria**\n\nNever offer only one option. List three or four, including \"do nothing\", and compare them against criteria the business cares about: impact, speed, effort, risk.\n\n**4. Estimating impact**\n\nUse simple arithmetic and say what you assumed: \"If IT Support's costs had grown at the same rate as its revenue (18.9%), January–April costs would have been about 155,800 instead of 170,000, and the margin about 39,200.\" Round the result and call it an estimate.\n\n**5. Recommendation checklist**\n\n- One clear action, stated first.\n- Owner and timescale.\n- How success will be measured (the KPI and target).\n- Main risks and what would change your mind.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Insight | A finding that explains something important | Something we learned that matters | \"The bus is always late on Mondays\" | Costs grew faster than revenue |\n| Driver | The factor that causes most of a change | The main reason | A flat tyre slowing a bike | March 2026 cost step |\n| Option | A possible course of action | A choice | Bus, taxi or walk | Re-price contracts |\n| Criteria | Standards used to compare options | What matters when choosing | Cost, time, comfort | Impact, speed, effort, risk |\n| Assumption | Something taken as true for an estimate | What we are taking for granted | \"The shop will be open\" | Costs grow in line with revenue |\n\n## Step-by-step demonstration: Brightpath IT Support\n\n1. **What happened.** Using the merged `fin` table from Lesson 14.1:\n\n```python\nfin[\"year\"] = fin[\"month_start\"].dt.year\nfin[\"month\"] = fin[\"month_start\"].dt.month\njan_apr = fin[fin[\"month\"] <= 4]\nt = jan_apr.groupby([\"department\", \"year\"])[[\"revenue\", \"cost\"]].sum()\nt[\"margin\"] = t[\"revenue\"] - t[\"cost\"]\nt[\"margin_%\"] = (t[\"margin\"] / t[\"revenue\"] * 100).round(1)\nprint(t)\n```\n\nOutput:\n\n```\n                 revenue    cost  margin  margin_%\ndepartment year\nConsulting 2025   427000  283000  144000      33.7\n           2026   493000  315000  178000      36.1\nIT Support 2025   164000  131000   33000      20.1\n           2026   195000  170000   25000      12.8\nTraining   2025   217000  150000   67000      30.9\n           2026   278000  181000   97000      34.9\n```\n\nIT Support is the only department whose margin fell.\n\n2. **So what: find the driver.** IT Support's revenue grew 31,000 (+18.9%) but its cost grew 39,000 (+29.8%), so margin fell 8,000 (−24.2%). Look at the months:\n\n```python\nit = fin[fin[\"department\"] == \"IT Support\"]\nprint(it[it[\"year\"] == 2026][[\"month_start\", \"revenue\", \"cost\"]])\n```\n\nCosts were 38,000 and 39,000 in January and February, then jumped to 47,000 in March and 46,000 in April. In 2025 they were between 32,000 and 37,000 all year. The monthly margin fell from 15.6% and 18.8% to 9.6% and 8.0%. This is a step in March, not a slow drift.\n\n3. **Options.**\n\n| Option | Impact | Speed | Effort | Risk |\n| --- | --- | --- | --- | --- |\n| A. Do nothing | None; margin stays near 8–10% | Immediate | None | Losses grow if the March costs are permanent |\n| B. Find what changed in March and fix it | Could restore most of the margin | Weeks | Low | Low; facts first |\n| C. Raise IT contract prices | Raises margin on renewal | Months | Medium | Customers may leave |\n| D. Reduce IT Support staff | Lowers cost quickly | Weeks | High | Service quality falls |\n\n4. **Estimate impact.** If costs had grown in line with revenue (+18.9%), January–April 2026 costs would have been about 155,800 (131,000 × 1.189), giving a margin of about 39,200 instead of 25,000. Assumption: the extra March–April cost is not needed to earn the revenue.\n5. **Recommendation:** \"Ask the head of IT Support and finance to identify, within two weeks, what caused the cost rise of about 8,000 a month from March 2026 (for example new staff, contractors or equipment). If the cost is temporary, remove it; if it is permanent, review IT contract prices at renewal. Measure success by IT Support's monthly margin returning to at least 20%. Risk: the data shows totals only, not cost types, so the cause must be confirmed from finance records.\"\n\n## Practical exercise\n\n- **Task:** a recommendation for Sunrise's Riverside branch.\n- **Steps:** write the what / so what / now what chain; list four options (including do nothing) and compare them against four criteria; estimate the revenue Riverside would have earned in January–June 2026 at the company's other branches' combined growth rate, stating your assumption; write a recommendation using the checklist.\n- **Expected output:** Hilltop and Central together grew from 4,900,000 to 5,402,250 (+10.25%); at that rate Riverside would have earned about 1,592,700 instead of 1,404,000.\n- **Submit:** one page.\n\n## Knowledge check\n\n1. In \"what, so what, now what\", what does \"now what\" cover?\n   - A) The action to take\n   - B) The raw data\n   - C) The chart colours\n   - D) The history of the company\n2. Revenue rose 18.9% but margin fell. What should the analyst check next?\n   - A) Nothing; margin always falls\n   - B) The number of slides\n   - C) Whether costs rose faster than revenue, and when\n   - D) The branch names\n3. Why include \"do nothing\" as an option?\n   - A) It is always the best choice\n   - B) It shows the cost of not acting, for comparison\n   - C) Managers expect jokes\n   - D) It replaces the recommendation\n4. An impact estimate is based on an assumption. What should the analyst do?\n   - A) Hide the assumption\n   - B) Give the estimate to the last decimal place\n   - C) Avoid giving any estimate\n   - D) State the assumption and present the result as a rounded estimate\n5. Which recommendation is most complete?\n   - A) \"Fix IT Support.\"\n   - B) \"Costs are high.\"\n   - C) \"Finance and the head of IT Support find the March cost rise within two weeks; success is margin back to 20%.\"\n   - D) \"Look into it further at some point.\"\n\n## Lesson summary\n\n1. Move from what happened, to why it matters, to what to do.\n2. Break results into parts and look at timing to find the driver.\n3. Compare several options, including doing nothing, against clear criteria.\n4. Estimate impact with simple arithmetic and stated assumptions.\n5. A recommendation names the action, owner, timescale, measure and risks.\n\n## Completion check\n\n- [ ] I found the driver of IT Support's margin fall.\n- [ ] I compared options against criteria.\n- [ ] I wrote a complete recommendation.",
      },
      {
        title: "Presenting to managers and stakeholders",
        order: 4,
        durationMinutes: 80,
        videoUrl: "https://www.youtube.com/watch?v=jizZKNnx9wA",
        content: "## Lesson introduction\n\n- **What you will study:** how to plan a short presentation, design slides with message titles, speak to different audiences and handle questions, including ones you cannot answer.\n- **Why it matters:** analysts are often judged on a ten-minute presentation. Clear presenting is one of the skills employers ask about most in interviews.\n- **After this lesson you can:** build and deliver a five-slide presentation of an analysis.\n- **Estimated time:** 80 minutes.\n\n## The topic in simple English\n\nA presentation is a guided conversation, not a reading of your report. You tell the audience the answer, show the two or three pieces of evidence that matter, say what you recommend, and then listen. Each slide carries one message, written as its title.\n\n## Learning objectives\n\n1. Plan a presentation around the audience and the decision.\n2. Structure five slides: answer, evidence, evidence, recommendation, next steps.\n3. Write message titles and keep one idea per slide.\n4. Adjust detail for executives, managers and technical colleagues.\n5. Handle questions and uncertainty honestly.\n\n## Main teaching content\n\n**1. Know your audience**\n\n| Audience | Wants | Give them |\n| --- | --- | --- |\n| Senior executives | The decision and its impact | Answer first, one chart, the ask |\n| Managers | What to do and how | Findings, actions, owners, timescales |\n| Technical colleagues | How you know | Method, data checks, limits |\n\n**2. The five-slide structure**\n\n1. **The answer:** message title, one-sentence summary, the key number.\n2. **Evidence 1:** the main finding, one chart.\n3. **Evidence 2:** the driver or comparison, one chart or small table.\n4. **Recommendation:** the options compared, the one you recommend.\n5. **Next steps and the ask:** owner, timescale, measure, the decision you need today.\n\nPut the method, limits and detailed tables in backup slides.\n\n**3. Slide design rules**\n\n- A message title on every slide.\n- One chart or one table per slide; highlight the part that matters (Module 8).\n- Few words: the slide supports you; it does not replace you.\n- Large text that can be read from the back of the room or on a phone.\n\n**4. Speaking**\n\n- Start with the answer, not the background.\n- Explain each chart in one sentence: \"This shows... The key point is...\".\n- Rehearse aloud with a timer; aim to finish early.\n\n**5. Handling questions**\n\n- Listen to the whole question; repeat it if helpful.\n- Answer briefly with the evidence.\n- If you do not know, say so and promise a follow-up: \"I don't have cost types in this data; I will check with finance and reply by Wednesday.\"\n- Never guess a number.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Audience analysis | Working out what listeners know, need and will decide | Knowing who is in the room | Talking differently to a child and a teacher | Executives want the decision |\n| Message title | A slide title stating the conclusion | A headline | A newspaper headline | \"IT Support's costs jumped in March\" |\n| Backup slide | Extra detail kept after the main slides | Spare slides for questions | A spare tyre | Method and data checks |\n| The ask | The decision or support you need from the audience | What you want them to do | \"Can I borrow the car?\" | Approve a two-week cost review |\n| Storyline | The order of messages across the slides | The thread of the story | Beginning, middle, end | Answer, evidence, recommendation |\n\n## Step-by-step demonstration: five slides for Brightpath's directors\n\nUse the analysis from Lesson 14.3.\n\n1. **Plan:** audience = managing director and finance director; decision = approve a cost review for IT Support; time = 10 minutes.\n2. **Slide 1, the answer.** Title: \"IT Support's margin fell to 12.8% because costs jumped in March.\" Text: \"January–April margin 20.1% in 2025, 12.8% in 2026. We recommend a two-week cost review.\"\n3. **Slide 2, evidence.** Title: \"IT Support is the only department with a falling margin.\" Bar chart: margin % by department, January–April 2025 and 2026 (Consulting 33.7% to 36.1%, Training 30.9% to 34.9%, IT Support 20.1% to 12.8%). Highlight IT Support.\n4. **Slide 3, the driver.** Title: \"Costs rose about 8,000 a month from March, faster than revenue.\" Line chart: IT Support monthly revenue and cost, January 2025–April 2026.\n5. **Slide 4, options.** Title: \"Finding the cause first is the quickest, lowest-risk step.\" The options table from Lesson 14.3, with option B highlighted.\n6. **Slide 5, the ask.** Title: \"Decision needed today: approve a two-week cost review.\" Owner, timescale, success measure (margin at least 20%), and the fallback (review contract prices at renewal).\n7. **Backup slides:** method and data (monthly totals, January 2025–April 2026); limit (no cost types).\n8. **Rehearse** with a timer and prepare answers to three likely questions: \"Is the revenue growth real?\", \"Could this be a one-off?\", \"What would re-pricing do to customers?\"\n\n## Practical exercise\n\n- **Task:** present the Riverside recommendation from Lesson 14.3.\n- **Steps:** build five slides with message titles plus one backup slide; record yourself presenting in under five minutes (phone video or a video call recording); write answers to three likely questions.\n- **Expected output:** slide 1 states the answer and the 2.8% fall; every slide title is a message.\n- **Submit:** the slides (PDF) and a link to the recording.\n\n## Knowledge check\n\n1. What should the first slide of an analysis presentation show?\n   - A) The company history\n   - B) The project team\n   - C) The full method\n   - D) The answer, with its key number\n2. A senior executive mainly wants:\n   - A) every line of code\n   - B) the decision, its impact and what is needed from them\n   - C) the raw data\n   - D) a long list of definitions\n3. Where should the detailed method go?\n   - A) In backup slides\n   - B) On the first slide\n   - C) Nowhere\n   - D) In the slide titles\n4. You are asked a question you cannot answer from the data. What should you do?\n   - A) Guess a number\n   - B) Change the subject\n   - C) Say you don't know, explain why, and promise a follow-up by a date\n   - D) End the meeting\n5. Which slide title is best?\n   - A) \"Chart 3\"\n   - B) \"Costs rose about 8,000 a month from March, faster than revenue\"\n   - C) \"IT Support data\"\n   - D) \"Monthly figures\"\n\n## Lesson summary\n\n1. Plan around the audience and the decision you need.\n2. Five slides: answer, evidence, evidence, recommendation, the ask.\n3. Message titles, one idea per slide, method in backup.\n4. Explain each chart in one sentence; rehearse with a timer.\n5. Never guess: say what you don't know and follow up.\n\n## Completion check\n\n- [ ] I built five slides with message titles.\n- [ ] I recorded a presentation under five minutes.\n- [ ] I prepared answers to likely questions.",
      },
    ],
    assignmentTitle: "Harbour Bank retention report and presentation",
    assignmentDescription: "Harbour Bank's customer manager has your Module 13 analysis of account closures.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "Which is a specific business question?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "\"Tell me about customers.\"",
            isCorrect: false,
          },
          {
            text: "\"Which customer groups closed accounts most often in 2026, and where should retention start?\"",
            isCorrect: true,
          },
          {
            text: "\"Do some analysis.\"",
            isCorrect: false,
          },
          {
            text: "\"Is the data good?\"",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is NOT part of a full KPI definition?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Formula",
            isCorrect: false,
          },
          {
            text: "Target",
            isCorrect: false,
          },
          {
            text: "Owner",
            isCorrect: false,
          },
          {
            text: "The analyst's favourite colour",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Complaints this month help predict next month's closures. They are a:",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "leading indicator",
            isCorrect: true,
          },
          {
            text: "lagging indicator",
            isCorrect: false,
          },
          {
            text: "data type",
            isCorrect: false,
          },
          {
            text: "slide title",
            isCorrect: false,
          },
        ],
      },
      {
        text: "In a one-page report, where does the recommendation first appear?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Only in the appendix",
            isCorrect: false,
          },
          {
            text: "After the method",
            isCorrect: false,
          },
          {
            text: "In the summary at the top",
            isCorrect: true,
          },
          {
            text: "It should not appear",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which finding includes a claim, a number and a comparison?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "\"Sales were good.\"",
            isCorrect: false,
          },
          {
            text: "\"Hilltop grew 11.9%, against −2.8% at Riverside.\"",
            isCorrect: true,
          },
          {
            text: "\"Hilltop is a branch.\"",
            isCorrect: false,
          },
          {
            text: "\"We looked at sales.\"",
            isCorrect: false,
          },
        ],
      },
      {
        text: "IT Support's revenue rose 18.9% and its cost rose 29.8%. What happened to its margin?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "It rose",
            isCorrect: false,
          },
          {
            text: "It stayed the same",
            isCorrect: false,
          },
          {
            text: "It fell",
            isCorrect: true,
          },
          {
            text: "It cannot be known",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why compare options against criteria such as impact, speed, effort and risk?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "To make the choice transparent and balanced",
            isCorrect: true,
          },
          {
            text: "To avoid making a recommendation",
            isCorrect: false,
          },
          {
            text: "To make the report longer",
            isCorrect: false,
          },
          {
            text: "Because there is only one option",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which recommendation is most complete?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "\"Do better.\"",
            isCorrect: false,
          },
          {
            text: "\"Costs are a problem.\"",
            isCorrect: false,
          },
          {
            text: "\"Someone should look at it.\"",
            isCorrect: false,
          },
          {
            text: "\"Finance reviews March costs within two weeks; success is margin back to 20%.\"",
            isCorrect: true,
          },
        ],
      },
      {
        text: "How many main ideas should a slide carry?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "As many as fit",
            isCorrect: false,
          },
          {
            text: "One",
            isCorrect: true,
          },
          {
            text: "Five",
            isCorrect: false,
          },
          {
            text: "None",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A director asks something your data cannot answer. The best response is:",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "\"I don't have that in this data; I'll check and reply by Wednesday.\"",
            isCorrect: true,
          },
          {
            text: "A confident guess",
            isCorrect: false,
          },
          {
            text: "\"That's not important.\"",
            isCorrect: false,
          },
          {
            text: "Silence",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is the best business question?",
        type: "multiple_choice",
        points: 1,
        explanation: "the Riverside January–June question",
        answers: [
          {
            text: "\"Look at the sales data.\"",
            isCorrect: false,
          },
          {
            text: "\"Is everything fine?\"",
            isCorrect: false,
          },
          {
            text: "\"How did Riverside's January–June 2026 revenue compare with the same months of 2025?\"",
            isCorrect: true,
          },
          {
            text: "\"Make a dashboard.\"",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What makes a metric a KPI?",
        type: "multiple_choice",
        points: 1,
        explanation: "goal, target and owner",
        answers: [
          {
            text: "It is linked to a goal, has a target and has an owner",
            isCorrect: true,
          },
          {
            text: "It is the biggest number in the dataset",
            isCorrect: false,
          },
          {
            text: "It is shown in red",
            isCorrect: false,
          },
          {
            text: "It is calculated in Python",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why write the formula down when defining a KPI?",
        type: "multiple_choice",
        points: 1,
        explanation: "everyone calculates it the same way",
        answers: [
          {
            text: "Formulas look professional",
            isCorrect: false,
          },
          {
            text: "Managers enjoy reading them",
            isCorrect: false,
          },
          {
            text: "It is required by law",
            isCorrect: false,
          },
          {
            text: "So everyone calculates it the same way",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which is a leading indicator of account closures?",
        type: "multiple_choice",
        points: 1,
        explanation: "complaints this month",
        answers: [
          {
            text: "Accounts closed last year",
            isCorrect: false,
          },
          {
            text: "Complaints made this month",
            isCorrect: true,
          },
          {
            text: "Total revenue in 2025",
            isCorrect: false,
          },
          {
            text: "The number of branches",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the first question to ask someone who requests an analysis?",
        type: "multiple_choice",
        points: 1,
        explanation: "what decision it supports",
        answers: [
          {
            text: "What decision will this help you make?",
            isCorrect: true,
          },
          {
            text: "Which chart colours do you like?",
            isCorrect: false,
          },
          {
            text: "How many rows does the data have?",
            isCorrect: false,
          },
          {
            text: "Can I use Python?",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What should come first in a report for a busy manager?",
        type: "multiple_choice",
        points: 1,
        explanation: "answer and recommendation",
        answers: [
          {
            text: "The method",
            isCorrect: false,
          },
          {
            text: "The answer and the recommendation",
            isCorrect: true,
          },
          {
            text: "A history of the company",
            isCorrect: false,
          },
          {
            text: "All the code",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is the best report title?",
        type: "multiple_choice",
        points: 1,
        explanation: "\"Riverside is the only branch with falling sales\"",
        answers: [
          {
            text: "\"Sales data\"",
            isCorrect: false,
          },
          {
            text: "\"Report number 7\"",
            isCorrect: false,
          },
          {
            text: "\"Branch analysis\"",
            isCorrect: false,
          },
          {
            text: "\"Riverside is the only branch with falling sales\"",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which finding is written best?",
        type: "multiple_choice",
        points: 1,
        explanation: "claim, number and comparison",
        answers: [
          {
            text: "\"Riverside did badly.\"",
            isCorrect: false,
          },
          {
            text: "\"Sales fell dramatically.\"",
            isCorrect: false,
          },
          {
            text: "\"Riverside's revenue fell 2.8%, while Hilltop grew 11.9% and Central 8.1%.\"",
            isCorrect: true,
          },
          {
            text: "\"Riverside sales were 1,404,000.\"",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why include limitations in a report?",
        type: "multiple_choice",
        points: 1,
        explanation: "so readers don't over-read",
        answers: [
          {
            text: "So readers do not over-read the results",
            isCorrect: true,
          },
          {
            text: "To make the report longer",
            isCorrect: false,
          },
          {
            text: "Because managers like bad news",
            isCorrect: false,
          },
          {
            text: "To avoid giving a recommendation",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is plain English?",
        type: "multiple_choice",
        points: 1,
        explanation: "\"Revenue fell.\"",
        answers: [
          {
            text: "\"Revenue experienced a negative trajectory.\"",
            isCorrect: false,
          },
          {
            text: "\"Utilisation of resources was suboptimal.\"",
            isCorrect: false,
          },
          {
            text: "\"The metric demonstrated a downward vector.\"",
            isCorrect: false,
          },
          {
            text: "\"Revenue fell.\"",
            isCorrect: true,
          },
        ],
      },
      {
        text: "In \"what, so what, now what\", what does \"now what\" cover?",
        type: "multiple_choice",
        points: 1,
        explanation: "the action",
        answers: [
          {
            text: "The action to take",
            isCorrect: true,
          },
          {
            text: "The raw data",
            isCorrect: false,
          },
          {
            text: "The chart colours",
            isCorrect: false,
          },
          {
            text: "The history of the company",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Revenue rose 18.9% but margin fell. What should the analyst check next?",
        type: "multiple_choice",
        points: 1,
        explanation: "whether costs rose faster, and when",
        answers: [
          {
            text: "Nothing; margin always falls",
            isCorrect: false,
          },
          {
            text: "The number of slides",
            isCorrect: false,
          },
          {
            text: "Whether costs rose faster than revenue, and when",
            isCorrect: true,
          },
          {
            text: "The branch names",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why include \"do nothing\" as an option?",
        type: "multiple_choice",
        points: 1,
        explanation: "shows the cost of not acting",
        answers: [
          {
            text: "It is always the best choice",
            isCorrect: false,
          },
          {
            text: "It shows the cost of not acting, for comparison",
            isCorrect: true,
          },
          {
            text: "Managers expect jokes",
            isCorrect: false,
          },
          {
            text: "It replaces the recommendation",
            isCorrect: false,
          },
        ],
      },
      {
        text: "An impact estimate is based on an assumption. What should the analyst do?",
        type: "multiple_choice",
        points: 1,
        explanation: "state it, round the estimate",
        answers: [
          {
            text: "Hide the assumption",
            isCorrect: false,
          },
          {
            text: "Give the estimate to the last decimal place",
            isCorrect: false,
          },
          {
            text: "Avoid giving any estimate",
            isCorrect: false,
          },
          {
            text: "State the assumption and present the result as a rounded estimate",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which recommendation is most complete?",
        type: "multiple_choice",
        points: 1,
        explanation: "owner, timescale and measure",
        answers: [
          {
            text: "\"Fix IT Support.\"",
            isCorrect: false,
          },
          {
            text: "\"Costs are high.\"",
            isCorrect: false,
          },
          {
            text: "\"Finance and the head of IT Support find the March cost rise within two weeks; success is margin back to 20%.\"",
            isCorrect: true,
          },
          {
            text: "\"Look into it further at some point.\"",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What should the first slide of an analysis presentation show?",
        type: "multiple_choice",
        points: 1,
        explanation: "the answer and key number",
        answers: [
          {
            text: "The company history",
            isCorrect: false,
          },
          {
            text: "The project team",
            isCorrect: false,
          },
          {
            text: "The full method",
            isCorrect: false,
          },
          {
            text: "The answer, with its key number",
            isCorrect: true,
          },
        ],
      },
      {
        text: "A senior executive mainly wants:",
        type: "multiple_choice",
        points: 1,
        explanation: "decision, impact, the ask",
        answers: [
          {
            text: "every line of code",
            isCorrect: false,
          },
          {
            text: "the decision, its impact and what is needed from them",
            isCorrect: true,
          },
          {
            text: "the raw data",
            isCorrect: false,
          },
          {
            text: "a long list of definitions",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Where should the detailed method go?",
        type: "multiple_choice",
        points: 1,
        explanation: "backup slides",
        answers: [
          {
            text: "In backup slides",
            isCorrect: true,
          },
          {
            text: "On the first slide",
            isCorrect: false,
          },
          {
            text: "Nowhere",
            isCorrect: false,
          },
          {
            text: "In the slide titles",
            isCorrect: false,
          },
        ],
      },
      {
        text: "You are asked a question you cannot answer from the data. What should you do?",
        type: "multiple_choice",
        points: 1,
        explanation: "say so and follow up by a date",
        answers: [
          {
            text: "Guess a number",
            isCorrect: false,
          },
          {
            text: "Change the subject",
            isCorrect: false,
          },
          {
            text: "Say you don't know, explain why, and promise a follow-up by a date",
            isCorrect: true,
          },
          {
            text: "End the meeting",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which slide title is best?",
        type: "multiple_choice",
        points: 1,
        explanation: "\"Costs rose about 8,000 a month...\"",
        answers: [
          {
            text: "\"Chart 3\"",
            isCorrect: false,
          },
          {
            text: "\"Costs rose about 8,000 a month from March, faster than revenue\"",
            isCorrect: true,
          },
          {
            text: "\"IT Support data\"",
            isCorrect: false,
          },
          {
            text: "\"Monthly figures\"",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 15,
    moduleTitle: "Data Analytics in Oil & Gas, Energy and Industrial Operations",
    moduleDescription: "Learners apply everything so far to an industrial operation: the fictional Delta Ridge Energy, which runs three production assets, DR-01, DR-02 and DR-03. They learn how operations teams use data, measure production performance and downtime, track maintenance, cost and safety, and design an operations dashboard. Data files (all January–June 2026): delta_ridge_production.csv (543 rows: one row per asset per day), delta_ridge_maintenance.csv (80 work orders) and delta_ridge_safety.csv (18 rows: one per asset per month). Volumes are in barrels; costs are plain numbers with no currency. All code was run in Python 3 with Pandas 2.3 and Matplotlib, and the outputs shown are the actual results. The Power BI and Excel steps in Lesson 15.4 have not yet been clicked through (see the status section). The same methods apply to power plants, mines, factories and water works.",
    lessons: [
      {
        title: "How operations use data",
        order: 1,
        durationMinutes: 70,
        videoUrl: "https://www.youtube.com/watch?v=-uqnJM2gAJc",
        content: "**Files for this lesson:** [delta_ridge_production.csv](/course-files/data-analytics/delta_ridge_production.csv) · [delta_ridge_safety.csv](/course-files/data-analytics/delta_ridge_safety.csv). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** where data comes from in an industrial operation, who uses it, and the main operational KPIs.\n- **Why it matters:** oil and gas, power, mining and manufacturing employ many analysts. Their data is different from sales data: it is measured by sensors every few seconds, it follows a plan, and safety comes first.\n- **After this lesson you can:** describe an operation's data sources, name its key KPIs and calculate plan attainment.\n- **Estimated time:** 70 minutes.\n\n## The topic in simple English\n\nAn oil field or factory works to a plan: \"today we should produce 1,200 barrels\". Sensors and staff record what really happened: how much was produced, when equipment stopped and why, what was repaired and whether anyone was hurt. The analyst's job is to compare the actual with the plan, find what caused the gap, and help the team close it safely.\n\n## Learning objectives\n\n1. Name the main data sources in an industrial operation.\n2. Explain the difference between plan and actual, and calculate attainment.\n3. Describe the main production, maintenance, cost and safety KPIs.\n4. Explain why safety KPIs come first.\n5. Load and inspect daily production data in Python.\n\n## Main teaching content\n\n**1. Where operational data comes from**\n\n| Source | What it records | Example |\n| --- | --- | --- |\n| Control and sensor systems (often called SCADA) and data historians | Pressures, temperatures, flow rates, every few seconds | Flow rate of a well each minute |\n| Production reports | Daily volumes against plan | DR-01 produced 1,190 barrels against a plan of 1,200 |\n| Downtime logs | When equipment stopped, for how long, and why | 6 hours, equipment failure |\n| Maintenance system (often called a CMMS) | Work orders, repair hours, parts, cost | Corrective work order on a compressor |\n| HSE (health, safety and environment) records | Hours worked, near misses, injuries | One near miss reported at DR-02 |\n| Finance | Operating costs | Maintenance cost per month |\n\nAnalysts rarely use second-by-second sensor data directly; it is usually summarised to hourly or daily figures first.\n\n**2. Plan versus actual**\n\n**Attainment % = actual ÷ planned × 100.** An asset that produced 1,140 barrels against a plan of 1,200 achieved 95%. The gap, 60 barrels, is **lost production**.\n\n**3. The main operational KPIs**\n\n| Area | KPI | Formula |\n| --- | --- | --- |\n| Production | Attainment % | actual ÷ planned × 100 |\n| Production | Availability % | (scheduled hours − downtime hours) ÷ scheduled hours × 100 |\n| Production | Lost production | planned − actual |\n| Maintenance | MTBF (mean time between failures) | operating hours ÷ number of failures |\n| Maintenance | MTTR (mean time to repair) | total repair hours ÷ number of repairs |\n| Maintenance | Preventive share | preventive work orders ÷ all work orders × 100 |\n| Cost | Maintenance cost per barrel | maintenance cost ÷ barrels produced |\n| Safety | TRIR (total recordable incident rate) | recordable injuries × 200,000 ÷ hours worked |\n| Safety | LTIF (lost time injury frequency) | lost time injuries × 1,000,000 ÷ hours worked |\n\nThe 200,000 in TRIR is about the hours 100 people work in a year, so TRIR reads as \"injuries per 100 workers per year\". Companies use different bases (200,000 or 1,000,000 hours); always state which one you use.\n\n**4. Safety first**\n\nIn operations, no production result is good if people were hurt. Operations reports usually start with safety. Near misses (events that could have caused harm but did not) are a **leading** indicator: a rise in near misses is a warning before injuries happen (Module 14).\n\n**5. Who uses the data**\n\nControl room operators (minutes), production engineers (days), maintenance planners (weeks), managers (months) and regulators (often quarterly or yearly). Design each report for its user.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Asset | A producing unit such as a well, platform, plant or production line | One \"machine\" or site | One bakery oven | DR-01 |\n| Attainment | Actual output as a percentage of planned output | How close to plan | Running 9 of 10 planned km | DR-01 at 97.6% |\n| Downtime | Time an asset is not producing | Stopped time | A shop closed for repairs | 6 hours, equipment failure |\n| SCADA / historian | Systems that collect and store sensor readings over time | The machine's diary | A fitness tracker | Minute-by-minute flow rates |\n| Near miss | An event that could have caused harm but did not | A close call | Nearly slipping on a wet floor | A dropped tool near a worker |\n\n## Step-by-step demonstration: first look at Delta Ridge production\n\nUpload **delta\\_ridge\\_production.csv** to Colab.\n\n1. Load and inspect:\n\n```python\nimport pandas as pd\nprod = pd.read_csv(\"delta_ridge_production.csv\", parse_dates=[\"date\"])\nprint(prod.shape, prod[\"asset\"].nunique(), prod[\"date\"].min().date(), prod[\"date\"].max().date())\nprod.head()\n```\n\nOutput: `(543, 6) 3 2026-01-01 2026-06-30`, which is 3 assets × 181 days. Columns: date, asset, planned\\_bbl, actual\\_bbl, downtime\\_hours, downtime\\_cause. Daily plans are 1,200 barrels for DR-01, 800 for DR-02 and 1,500 for DR-03.\n\n2. Overall attainment:\n\n```python\nprint(prod[\"actual_bbl\"].sum(), prod[\"planned_bbl\"].sum(), round(prod[\"actual_bbl\"].sum() / prod[\"planned_bbl\"].sum() * 100, 1))\n```\n\nOutput: `616585 633500 97.3`. Delta Ridge produced 616,585 barrels against a plan of 633,500: 97.3% attainment, 16,915 barrels short.\n\n3. Check the causes column: `prod[\"downtime_cause\"].value_counts()` gives No downtime 509, Equipment failure 15, Power supply 8, Planned maintenance 6, Weather 5. So 34 of the 543 asset-days had some downtime.\n4. Write, in a text cell, which KPIs you could calculate from this file (attainment, availability, lost production, downtime by cause) and which need the other two files (MTBF, MTTR and cost need maintenance data; TRIR needs safety data).\n\n## Practical exercise\n\n- **Task:** a KPI map for Delta Ridge.\n- **Steps:** load all three files and list their columns. Build a table with one row per KPI from section D.3: KPI, formula, which file and columns it needs, and who would use it.\n- **Expected output:** for example, \"TRIR: recordable\\_injuries × 200,000 ÷ hours\\_worked, from delta\\_ridge\\_safety.csv, used by the HSE manager monthly\".\n- **Submit:** your notebook link.\n\n## Knowledge check\n\n1. An asset produced 1,140 barrels against a plan of 1,200. What is its attainment?\n   - A) 60%\n   - B) 105%\n   - C) 1,140%\n   - D) 95%\n2. Where are work orders, repair hours and maintenance costs usually recorded?\n   - A) The sales system\n   - B) The maintenance system (CMMS)\n   - C) The production plan\n   - D) Social media\n3. Which is a leading safety indicator?\n   - A) Near misses reported\n   - B) Lost time injuries last year\n   - C) Barrels produced\n   - D) Maintenance cost\n4. Why do operations reports usually start with safety?\n   - A) Safety figures are the shortest\n   - B) Regulators forbid charts\n   - C) No production result is good if people were hurt\n   - D) Safety data is always zero\n5. TRIR is calculated per 200,000 hours worked. Why that number?\n   - A) It is about the hours 100 people work in a year\n   - B) It is the number of barrels in a tank\n   - C) It is required for every chart\n   - D) It makes the rate look smaller\n\n## Lesson summary\n\n1. Operational data comes from sensors, production reports, downtime logs, maintenance and HSE systems.\n2. Attainment = actual ÷ planned; the gap is lost production.\n3. Key KPIs cover production, maintenance, cost and safety.\n4. Safety comes first; near misses warn before injuries.\n5. Delta Ridge reached 97.3% attainment in January–June 2026.\n\n## Completion check\n\n- [ ] I can name five operational data sources.\n- [ ] I calculated overall attainment for Delta Ridge.\n- [ ] I mapped each KPI to the file that feeds it.",
      },
      {
        title: "Production performance and downtime",
        order: 2,
        durationMinutes: 80,
        videoUrl: "https://www.youtube.com/watch?v=oCc6VU2kYQI",
        content: "## Lesson introduction\n\n- **What you will study:** how to measure each asset's attainment and availability, quantify lost production, and find the biggest causes of downtime with a Pareto analysis.\n- **Why it matters:** every hour of unplanned downtime is lost output. Showing which causes matter most tells engineers where to focus.\n- **After this lesson you can:** build an asset performance table and a downtime Pareto in Python.\n- **Estimated time:** 80 minutes.\n\n## The topic in simple English\n\nIf a bus company wants fewer late buses, it first counts how late each bus was and why: traffic, breakdowns, missing drivers. Usually a few causes explain most of the delay. Fix those first. This is the Pareto idea, sometimes called the 80/20 rule: a small number of causes often explains most of the problem.\n\n## Learning objectives\n\n1. Calculate attainment and availability per asset.\n2. Calculate lost production and split it into downtime and slow running.\n3. Build a Pareto table of downtime causes with a cumulative percentage.\n4. Explain why hours and barrels lost can rank causes differently.\n5. Track attainment month by month.\n\n## Main teaching content\n\n**1. Availability and attainment are different**\n\n**Availability** asks \"was it running?\"; **attainment** asks \"did it produce the planned amount?\". An asset can be available all day but run slowly, so attainment falls while availability stays at 100%.\n\n**2. Lost production has two parts**\n\n- Lost during downtime: the asset was stopped.\n- Lost while running: the asset ran below its planned rate (slow running).\n\nSplitting them points to different fixes: reliability for the first, process tuning for the second.\n\n**3. Pareto analysis**\n\nSort causes from largest to smallest, then add a cumulative percentage. The causes that reach about 80% are the \"vital few\". A Pareto chart is a sorted bar chart, often with a cumulative line.\n\n**4. Hours or barrels?**\n\nAn hour lost on a large asset costs more output than an hour on a small one. Rank causes both ways and say which you used.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Availability | Share of scheduled time an asset was running | Was it on? | A shop open 6 of 7 days | DR-02 at 97.1% |\n| Planned downtime | Stops scheduled in advance, such as maintenance | Planned closure | A shop's stocktaking day | DR-01's April shutdown |\n| Unplanned downtime | Stops that were not scheduled, such as failures | Breakdowns | A burst pipe | Compressor failure |\n| Slow running | Producing below planned rate while running | Running, but slowly | A car stuck in second gear | Shortfall on days with no downtime |\n| Pareto analysis | Ranking causes by size with a cumulative share | Find the vital few | Most mess comes from one room | Equipment failure is 41.3% of downtime hours |\n\n## Step-by-step demonstration: asset performance and downtime Pareto\n\nContinue with `prod` from Lesson 15.1.\n\n1. Asset performance table:\n\n```python\nprod[\"lost_bbl\"] = prod[\"planned_bbl\"] - prod[\"actual_bbl\"]\nassets = prod.groupby(\"asset\").agg(planned=(\"planned_bbl\", \"sum\"), actual=(\"actual_bbl\", \"sum\"), downtime_h=(\"downtime_hours\", \"sum\"), days=(\"date\", \"count\"))\nassets[\"attainment_%\"] = (assets[\"actual\"] / assets[\"planned\"] * 100).round(1)\nassets[\"availability_%\"] = ((1 - assets[\"downtime_h\"] / (assets[\"days\"] * 24)) * 100).round(1)\nprint(assets)\n```\n\nOutput:\n\n```\n       planned  actual  downtime_h  days  attainment_%  availability_%\nasset\nDR-01   217200  212045          79   181          97.6            98.2\nDR-02   144800  139715         126   181          96.5            97.1\nDR-03   271500  264825          88   181          97.5            98.0\n```\n\nAcross all three assets, availability is 97.8% (293 downtime hours out of 13,032 scheduled hours). DR-02 has the most downtime even though it is the smallest asset.\n\n2. Split the lost production:\n\n```python\nstops = prod[prod[\"downtime_hours\"] > 0]\nprint(prod[\"lost_bbl\"].sum(), stops[\"lost_bbl\"].sum(), prod[prod[\"downtime_hours\"] == 0][\"lost_bbl\"].sum())\n```\n\nOutput: `16915 13680 3235`. About 81% of the shortfall came on days with downtime; the other 3,235 barrels were slow running.\n\n3. Downtime Pareto:\n\n```python\npareto = stops.groupby(\"downtime_cause\").agg(stop_days=(\"downtime_hours\", \"count\"), hours=(\"downtime_hours\", \"sum\"), lost_bbl=(\"lost_bbl\", \"sum\")).sort_values(\"hours\", ascending=False)\npareto[\"cum_%\"] = (pareto[\"hours\"].cumsum() / pareto[\"hours\"].sum() * 100).round(1)\nprint(pareto)\n```\n\nOutput:\n\n```\n                     stop_days  hours  lost_bbl  cum_%\ndowntime_cause\nEquipment failure           15    121      4325   41.3\nPlanned maintenance          6    104      5440   76.8\nPower supply                 8     43      2595   91.5\nWeather                      5     25      1320 100.0\n```\n\nEquipment failure is the largest cause by hours (41.3%); with planned maintenance it makes up 76.8% of downtime. By barrels, planned maintenance is largest (5,440), because it took the two biggest assets offline for whole days.\n\n4. Monthly attainment:\n\n```python\nprod[\"month\"] = prod[\"date\"].dt.to_period(\"M\")\nmonthly = prod.groupby(\"month\")[[\"planned_bbl\", \"actual_bbl\"]].sum()\nmonthly[\"attainment_%\"] = (monthly[\"actual_bbl\"] / monthly[\"planned_bbl\"] * 100).round(1)\n```\n\nMonthly attainment: January 98.5%, February 97.4%, March 98.1%, April 96.3%, May 96.5%, June 97.1%. The second quarter is weaker; the assignment asks you to find out why.\n\n5. Draw the Pareto as a sorted bar chart (Lesson 13.3) with the title \"Equipment failure causes the most downtime hours\".\n\n## Practical exercise\n\n- **Task:** a downtime report for DR-03.\n- **Steps:** filter `stops` to DR-03, group by cause and month, and count the power-supply stops in each month.\n- **Expected output:** six power-supply stops (37 hours), all in January–March and none in April–June.\n- **Submit:** your notebook link and a two-sentence note for the DR-03 engineer.\n\n## Knowledge check\n\n1. An asset ran all day but produced 90% of plan. What are its availability and attainment?\n   - A) Availability 100%, attainment 90%\n   - B) Both 90%\n   - C) Availability 90%, attainment 100%\n   - D) Both 100%\n2. What does a Pareto analysis show?\n   - A) The average downtime per day\n   - B) Every cause in alphabetical order\n   - C) Causes ranked by size with a cumulative share, so the vital few stand out\n   - D) Only planned maintenance\n3. Delta Ridge lost 3,235 barrels on days with no downtime. What is this called?\n   - A) Planned maintenance\n   - B) Weather loss\n   - C) A safety incident\n   - D) Slow running\n4. Why can planned maintenance lose the most barrels while equipment failure has the most hours?\n   - A) Barrels are measured incorrectly\n   - B) Planned maintenance stopped the largest assets for whole days\n   - C) Hours and barrels are always the same\n   - D) Equipment failure never loses barrels\n5. Which formula gives availability?\n   - A) actual ÷ planned\n   - B) failures ÷ hours\n   - C) planned − actual\n   - D) (scheduled hours − downtime hours) ÷ scheduled hours\n\n## Lesson summary\n\n1. Availability asks \"was it running?\"; attainment asks \"did it hit plan?\".\n2. Lost production splits into downtime losses and slow running.\n3. A Pareto ranks causes and shows the vital few.\n4. Rank by hours and by barrels; they can differ.\n5. Delta Ridge's April–June attainment is weaker than January–March.\n\n## Completion check\n\n- [ ] I built the asset performance table.\n- [ ] I built a downtime Pareto with cumulative %.\n- [ ] I split lost production into downtime and slow running.",
      },
      {
        title: "Maintenance, costs and safety indicators",
        order: 3,
        durationMinutes: 85,
        videoUrl: "https://www.youtube.com/watch?v=Gcih3JUyAeA",
        content: "**Files for this lesson:** [delta_ridge_maintenance.csv](/course-files/data-analytics/delta_ridge_maintenance.csv) · [delta_ridge_safety.csv](/course-files/data-analytics/delta_ridge_safety.csv). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** how to analyse maintenance work orders (preventive versus corrective, MTBF and MTTR), maintenance cost per barrel, and safety rates such as TRIR and LTIF.\n- **Why it matters:** maintenance is one of the largest operating costs, and safety performance decides whether an operation is allowed to continue. Analysts who can link the two to production are highly valued.\n- **After this lesson you can:** calculate reliability, cost and safety KPIs and explain what they mean.\n- **Estimated time:** 85 minutes.\n\n## The topic in simple English\n\nPreventive maintenance is servicing your car before it breaks; corrective maintenance is repairing it after it breaks down at the roadside. Too much corrective work means more surprises, more cost and more risk. MTBF says how long equipment usually runs before failing; MTTR says how long a repair takes.\n\nSafety rates turn injury counts into fair comparisons: one injury among 10 workers is far more worrying than one among 1,000.\n\n## Learning objectives\n\n1. Summarise work orders by type, hours and cost.\n2. Calculate MTBF and MTTR per asset.\n3. Calculate maintenance cost per barrel.\n4. Calculate TRIR and LTIF and explain why rates are used instead of counts.\n5. Use near misses as a leading indicator.\n\n## Main teaching content\n\n**1. Work order types**\n\n- **Preventive:** scheduled servicing to stop failures.\n- **Corrective:** repairs after a failure.\n- **Shutdown:** a planned stop of a whole asset for major work.\n\nA rising share of corrective work is a warning sign.\n\n**2. Reliability: MTBF and MTTR**\n\n**MTBF = operating hours ÷ number of failures.** Higher is better. **MTTR = repair hours ÷ number of repairs.** Lower is better. In this course a failure is a corrective work order.\n\n**3. Cost per unit**\n\nTotal cost means little on its own; a bigger asset spends more. Divide by output: **maintenance cost per barrel = maintenance cost ÷ barrels produced**.\n\n**4. Safety rates**\n\nCounts depend on how many people worked. Rates make assets of different sizes comparable:\n\n- **TRIR = recordable injuries × 200,000 ÷ hours worked**\n- **LTIF = lost time injuries × 1,000,000 ÷ hours worked**\n\nWith small numbers, rates jump around: one injury can double a rate. Report the counts and hours beside the rates.\n\n**5. Leading indicators**\n\nNear misses, overdue maintenance and corrective work orders often rise before injuries and failures. Watching them lets managers act before harm happens.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Work order | A record of a maintenance job: what, where, hours, cost | A repair ticket | A car service booking | WO017, compressor repair |\n| Preventive maintenance | Scheduled work to stop failures | Servicing before it breaks | An oil change | Monthly pump service |\n| MTBF | Mean time between failures: operating hours ÷ failures | How long it usually runs | A phone lasting two years | DR-01 at 1,066 hours |\n| MTTR | Mean time to repair: repair hours ÷ repairs | How long a fix takes | Two days at the garage | 6.5 hours at DR-01 |\n| TRIR | Recordable injuries × 200,000 ÷ hours worked | Injury rate per 100 workers per year | Accidents per 100 drivers | 4.74 for Delta Ridge |\n\n## Step-by-step demonstration: Delta Ridge maintenance and safety\n\nUpload **delta\\_ridge\\_maintenance.csv** and **delta\\_ridge\\_safety.csv**. Keep `prod` and `assets` from Lesson 15.2.\n\n1. Work orders by type:\n\n```python\nwo = pd.read_csv(\"delta_ridge_maintenance.csv\", parse_dates=[\"raised\"])\nprint(wo.shape)\nwo.groupby(\"wo_type\").agg(orders=(\"wo_id\", \"count\"), hours=(\"repair_hours\", \"sum\"), cost=(\"cost\", \"sum\"))\n```\n\nOutput: 80 work orders. Corrective 23 orders, 214 hours, cost 118,100; Preventive 54, 203 hours, 60,700; Shutdown 3, 104 hours, 45,000. Corrective work is only 29% of the orders but 52.8% of the 223,800 total cost: failures are expensive.\n\n2. MTBF and MTTR per asset:\n\n```python\nfailures = wo[wo[\"wo_type\"] == \"Corrective\"].groupby(\"asset\").agg(failures=(\"wo_id\", \"count\"), mttr_h=(\"repair_hours\", \"mean\"))\nfailures[\"operating_h\"] = assets[\"days\"] * 24 - assets[\"downtime_h\"]\nfailures[\"mtbf_h\"] = (failures[\"operating_h\"] / failures[\"failures\"]).round(0)\nprint(failures.round(1))\n```\n\nOutput:\n\n```\n       failures  mttr_h  operating_h  mtbf_h\nasset\nDR-01         4     6.5         4265  1066.0\nDR-02        12    11.4         4218   352.0\nDR-03         7     7.3         4256   608.0\n```\n\nDR-02 fails about three times as often as DR-01 and takes longer to repair. Group DR-02's corrective orders by equipment and you find 11 of its 12 failures are on the compressor.\n\n3. Cost per barrel: `round(wo[\"cost\"].sum() / prod[\"actual_bbl\"].sum(), 2)` gives `0.36`, about 0.36 of maintenance cost per barrel produced. Compare it by asset in the exercise.\n4. Safety rates:\n\n```python\nsafety = pd.read_csv(\"delta_ridge_safety.csv\")\ntot = safety[[\"hours_worked\", \"near_misses\", \"recordable_injuries\", \"lost_time_injuries\"]].sum()\nprint(tot.to_dict(), round(tot[\"recordable_injuries\"] * 200000 / tot[\"hours_worked\"], 2), round(tot[\"lost_time_injuries\"] * 1000000 / tot[\"hours_worked\"], 2))\n```\n\nOutput: 168,600 hours worked, 41 near misses, 4 recordable injuries and 1 lost time injury, so TRIR 4.74 and LTIF 5.93. With only four injuries, one more or one fewer would change TRIR by about 1.2, so report the counts as well.\n\n5. In a text cell, note which of these KPIs are leading (near misses, corrective work orders) and which are lagging (injuries, cost).\n\n## Practical exercise\n\n- **Task:** a reliability and cost table by asset.\n- **Steps:** calculate maintenance cost per barrel for each asset; calculate TRIR for each asset from the safety file; list DR-02's corrective work orders by equipment.\n- **Expected output:** cost per barrel about 0.28 (DR-01), 0.71 (DR-02) and 0.25 (DR-03); TRIR 3.56 (DR-01), 8.85 (DR-02) and 2.98 (DR-03); DR-02 compressor 11 corrective orders.\n- **Submit:** your notebook link.\n\n## Knowledge check\n\n1. Which is preventive maintenance?\n   - A) Repairing a pump after it fails\n   - B) Servicing a pump on schedule before it fails\n   - C) Buying a new asset\n   - D) Recording a near miss\n2. An asset ran 4,218 hours and had 12 failures. What is its MTBF?\n   - A) About 352 hours\n   - B) 12 hours\n   - C) 4,230 hours\n   - D) About 0.003 hours\n3. Why use TRIR instead of simply counting injuries?\n   - A) Counts are always zero\n   - B) TRIR includes production\n   - C) A rate allows fair comparison between sites with different hours worked\n   - D) Regulators ban counts\n4. Corrective orders are 29% of work orders but 52.8% of maintenance cost. What does this suggest?\n   - A) Preventive maintenance is too expensive\n   - B) The data is wrong\n   - C) Cost does not matter\n   - D) Failures are costly, so preventing them could save money\n5. Which is a leading indicator?\n   - A) Lost time injuries last quarter\n   - B) Near misses reported this month\n   - C) Total maintenance cost last year\n   - D) Barrels produced last month\n\n## Lesson summary\n\n1. Split work orders into preventive, corrective and shutdown; watch the corrective share.\n2. MTBF (higher is better) and MTTR (lower is better) measure reliability.\n3. Divide costs by output to compare assets fairly.\n4. TRIR and LTIF turn injury counts into comparable rates; show counts too.\n5. Near misses and corrective orders are early warnings.\n\n## Completion check\n\n- [ ] I summarised work orders by type.\n- [ ] I calculated MTBF and MTTR per asset.\n- [ ] I calculated TRIR and LTIF.",
      },
      {
        title: "Building an operations dashboard",
        order: 4,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=xyoVcPy28jY",
        content: "## Lesson introduction\n\n- **What you will study:** how to design an operations dashboard for a manager, choose its KPIs and charts, and build it in Power BI, Excel or Python.\n- **Why it matters:** operations meetings run on dashboards. A clear one shows in seconds whether the operation is safe, on plan and reliable, and where to act.\n- **After this lesson you can:** sketch, build and explain a one-page operations dashboard.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nAn operations dashboard is like the dashboard of a car: the few gauges you need to drive safely, readable at a glance. You do not show every sensor; you show safety, output against plan, the main reasons for lost output, and equipment reliability, with the problems easy to spot.\n\n## Learning objectives\n\n1. Choose the KPIs and charts for an operations dashboard.\n2. Lay out a dashboard in the order safety, production, downtime, reliability.\n3. Write the measures for attainment, availability and TRIR.\n4. Build a dashboard in Power BI (or Excel), or as a Python figure.\n5. Explain the dashboard in a short briefing.\n\n## Main teaching content\n\n**1. The operations dashboard layout**\n\n| Area | Content | Chart |\n| --- | --- | --- |\n| Top row | KPI cards: TRIR, attainment %, availability %, lost barrels, MTBF | Cards with a comparison to target or last period |\n| Middle left | Attainment trend by month | Line chart |\n| Middle right | Downtime by cause | Sorted bar (Pareto) |\n| Bottom left | Asset table: attainment, availability, MTBF, cost per barrel | Table with conditional colours |\n| Bottom right | Near misses and injuries by month | Column chart |\n| Side | Filters: asset, month | Slicers |\n\n**2. Targets and colours**\n\nShow each KPI beside its target. Use colour only for exceptions, such as red when attainment is below 95% (Module 8). Avoid traffic-light colours everywhere; they create noise.\n\n**3. Measures (Power BI DAX)**\n\n```\nAttainment % = DIVIDE(SUM(production[actual_bbl]), SUM(production[planned_bbl]))\nAvailability % = 1 - DIVIDE(SUM(production[downtime_hours]), COUNTROWS(production) * 24)\nLost bbl = SUM(production[planned_bbl]) - SUM(production[actual_bbl])\nTRIR = DIVIDE(SUM(safety[recordable_injuries]) * 200000, SUM(safety[hours_worked]))\n```\n\nFormat Attainment % and Availability % as percentages. In Excel, the same calculations work as PivotTable calculated fields or cells next to a PivotTable (Modules 4 and 9).\n\n**4. Connecting the three files**\n\nThe files share **asset**. In Power BI, create a small **Assets** table (DR-01, DR-02, DR-03) and relate it to all three files on asset, so one asset slicer filters every visual (Module 10). Dates need care: production is daily and safety is monthly, so compare them at month level.\n\n**5. Building it as a Python figure**\n\nWhen Power BI is not available, a Matplotlib figure with several charts (`plt.subplots(2, 2)`) gives a static dashboard you can paste into a report.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| KPI card | A visual showing one key number, often with a target | One big number | A car's speedometer | Attainment 97.3% |\n| Target | The value a KPI is expected to reach | What good looks like | A savings goal | Attainment at least 97% |\n| Exception highlighting | Using colour only for values outside target | Point out problems | Red ink for overdue bills | DR-02 in red |\n| Slicer | An on-screen filter | A selector | Choosing a TV channel | Asset = DR-02 |\n| Subplots | Several charts arranged in one figure | Charts in a grid | A photo collage | A 2 × 2 operations figure |\n\n## Step-by-step demonstration: the Delta Ridge operations dashboard\n\n1. **Sketch first.** On paper, draw the layout in section D.1. Write the question each chart answers.\n2. **Power BI route.** Get data, Text/CSV, and load the three files, naming them production, maintenance and safety. Enter an Assets table (**Home**, **Enter data**) with one column, asset, and the rows DR-01, DR-02 and DR-03. In Model view, relate Assets\\[asset\\] to the asset column of each file (one-to-many). Create the measures in D.3. Add cards for TRIR, Attainment %, Availability % and Lost bbl; a line chart of Attainment % by date (month level); a bar chart of downtime\\_hours by downtime\\_cause, filtered to exclude \"No downtime\" and sorted; a table by asset; and an asset slicer from the Assets table.\n3. **Check the numbers.** With no filter, the cards should show Attainment 97.3%, Availability 97.8%, Lost bbl 16,915 and TRIR 4.74. Select DR-02 in the slicer: Attainment 96.5%, Availability 97.1%. If they differ, check the relationships and measure formulas.\n4. **Python route.** Using `assets`, `monthly`, `pareto` and `failures` from Lessons 15.2 and 15.3:\n\n```python\nimport matplotlib.pyplot as plt\nfig, axes = plt.subplots(2, 2, figsize=(12, 7))\naxes[0, 0].bar(assets.index, assets[\"attainment_%\"]); axes[0, 0].set_ylim(90, 100); axes[0, 0].set_title(\"Attainment % by asset\")\naxes[0, 1].plot(monthly.index.astype(str), monthly[\"attainment_%\"], marker=\"o\"); axes[0, 1].set_title(\"Monthly attainment %\")\naxes[1, 0].bar(pareto.index, pareto[\"hours\"]); axes[1, 0].set_title(\"Downtime hours by cause\")\naxes[1, 1].bar(failures.index, failures[\"mtbf_h\"]); axes[1, 1].set_title(\"MTBF (hours)\")\nfig.suptitle(\"Delta Ridge operations, January to June 2026\")\nfig.tight_layout()\nfig.savefig(\"ops_dashboard.png\", dpi=120)\n```\n\nThe attainment bar chart starts at 90% so the differences can be seen. Because that breaks the start-at-zero rule, label the axis clearly and say so in the caption.\n\n5. **Brief the manager in three sentences:** \"Delta Ridge reached 97.3% of plan in January–June, with 97.8% availability. Equipment failure caused the most downtime hours, and DR-02 is the least reliable asset (MTBF 352 hours against 1,066 at DR-01). April–June attainment was lower than January–March; next we compare the quarters.\"\n\n## Practical exercise\n\n- **Task:** add a safety panel.\n- **Steps:** add near misses by month (column chart) and a TRIR card to your dashboard, or a third row to the Python figure. Add an asset slicer (Power BI) or one chart per asset (Python).\n- **Expected output:** 41 near misses in total; each asset's monthly near misses visible.\n- **Submit:** a screenshot or PNG of your dashboard and one paragraph explaining it.\n\n## Knowledge check\n\n1. What usually goes first on an operations dashboard?\n   - A) Company history\n   - B) The most colourful chart\n   - C) Safety KPIs\n   - D) A list of every sensor\n2. Which DAX measure gives attainment?\n   - A) `SUM(production[downtime_hours])`\n   - B) `COUNTROWS(production)`\n   - C) `SUM(safety[hours_worked])`\n   - D) `DIVIDE(SUM(production[actual_bbl]), SUM(production[planned_bbl]))`\n3. Why create an Assets table related to all three files?\n   - A) To delete duplicate rows\n   - B) So one asset slicer filters every visual\n   - C) To make the file smaller\n   - D) Power BI requires exactly four tables\n4. Where should colour be used on the dashboard?\n   - A) Mainly to highlight exceptions, such as values below target\n   - B) On every number, in traffic-light colours\n   - C) Nowhere\n   - D) Only on titles\n5. A bar axis starts at 90% instead of zero. What should you do?\n   - A) Hide the axis\n   - B) Nothing; this is never a problem\n   - C) Label the axis clearly and mention it in the caption\n   - D) Delete the chart\n\n## Lesson summary\n\n1. Sketch the dashboard and the question each chart answers before building.\n2. Order: safety, production, downtime, reliability.\n3. Show KPIs against targets; use colour for exceptions only.\n4. One related Assets table lets one slicer filter every visual.\n5. A 2 × 2 Python figure is a quick static alternative.\n\n## Completion check\n\n- [ ] I sketched the dashboard layout.\n- [ ] I built it in Power BI, Excel or Python and checked the numbers.\n- [ ] I briefed the dashboard in three sentences.",
      },
    ],
    assignmentTitle: "Delta Ridge second-quarter operations review",
    assignmentDescription: "Delta Ridge's operations manager says: \"April to June looked worse than January to March.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "An asset planned 800 barrels and produced 760. What is its attainment?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "40%",
            isCorrect: false,
          },
          {
            text: "105%",
            isCorrect: false,
          },
          {
            text: "95%",
            isCorrect: true,
          },
          {
            text: "76%",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does MTTR measure?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "The average time to repair a failure",
            isCorrect: true,
          },
          {
            text: "The time between failures",
            isCorrect: false,
          },
          {
            text: "The number of near misses",
            isCorrect: false,
          },
          {
            text: "The cost per barrel",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which ranks downtime causes and shows a cumulative share?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "A pie chart",
            isCorrect: false,
          },
          {
            text: "A scatter plot",
            isCorrect: false,
          },
          {
            text: "A KPI card",
            isCorrect: false,
          },
          {
            text: "A Pareto analysis",
            isCorrect: true,
          },
        ],
      },
      {
        text: "An asset is running all day but below its planned rate. What is this?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Planned downtime",
            isCorrect: false,
          },
          {
            text: "Slow running",
            isCorrect: true,
          },
          {
            text: "A lost time injury",
            isCorrect: false,
          },
          {
            text: "A shutdown",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Site A has 1 injury in 20,000 hours; site B has 2 injuries in 400,000 hours. Which has the higher TRIR?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Site B",
            isCorrect: false,
          },
          {
            text: "They are equal",
            isCorrect: false,
          },
          {
            text: "It cannot be calculated",
            isCorrect: false,
          },
          {
            text: "Site A",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which is a leading indicator of future injuries?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "A rise in near misses",
            isCorrect: true,
          },
          {
            text: "Last year's lost time injuries",
            isCorrect: false,
          },
          {
            text: "Total barrels produced",
            isCorrect: false,
          },
          {
            text: "The number of assets",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why divide maintenance cost by barrels produced?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "To make the cost look smaller",
            isCorrect: false,
          },
          {
            text: "Because barrels are free",
            isCorrect: false,
          },
          {
            text: "To compare assets of different sizes fairly",
            isCorrect: true,
          },
          {
            text: "It is required for DAX",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A rising share of corrective work orders usually means:",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "the assets are becoming more reliable",
            isCorrect: false,
          },
          {
            text: "more failures are happening, so reliability may be falling",
            isCorrect: true,
          },
          {
            text: "preventive maintenance has improved",
            isCorrect: false,
          },
          {
            text: "nothing at all",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What should an operations dashboard show beside each KPI?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "The analyst's name",
            isCorrect: false,
          },
          {
            text: "A random colour",
            isCorrect: false,
          },
          {
            text: "The raw sensor data",
            isCorrect: false,
          },
          {
            text: "A target or the previous period, for comparison",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which systems typically store second-by-second sensor readings?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "The sales system",
            isCorrect: false,
          },
          {
            text: "The maintenance system",
            isCorrect: false,
          },
          {
            text: "SCADA and data historians",
            isCorrect: true,
          },
          {
            text: "The HR system",
            isCorrect: false,
          },
        ],
      },
      {
        text: "An asset produced 1,140 barrels against a plan of 1,200. What is its attainment?",
        type: "multiple_choice",
        points: 1,
        explanation: "95%",
        answers: [
          {
            text: "60%",
            isCorrect: false,
          },
          {
            text: "105%",
            isCorrect: false,
          },
          {
            text: "1,140%",
            isCorrect: false,
          },
          {
            text: "95%",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Where are work orders, repair hours and maintenance costs usually recorded?",
        type: "multiple_choice",
        points: 1,
        explanation: "the maintenance system (CMMS)",
        answers: [
          {
            text: "The sales system",
            isCorrect: false,
          },
          {
            text: "The maintenance system (CMMS)",
            isCorrect: true,
          },
          {
            text: "The production plan",
            isCorrect: false,
          },
          {
            text: "Social media",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is a leading safety indicator?",
        type: "multiple_choice",
        points: 1,
        explanation: "near misses",
        answers: [
          {
            text: "Near misses reported",
            isCorrect: true,
          },
          {
            text: "Lost time injuries last year",
            isCorrect: false,
          },
          {
            text: "Barrels produced",
            isCorrect: false,
          },
          {
            text: "Maintenance cost",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why do operations reports usually start with safety?",
        type: "multiple_choice",
        points: 1,
        explanation: "no result is good if people were hurt",
        answers: [
          {
            text: "Safety figures are the shortest",
            isCorrect: false,
          },
          {
            text: "Regulators forbid charts",
            isCorrect: false,
          },
          {
            text: "No production result is good if people were hurt",
            isCorrect: true,
          },
          {
            text: "Safety data is always zero",
            isCorrect: false,
          },
        ],
      },
      {
        text: "TRIR is calculated per 200,000 hours worked. Why that number?",
        type: "multiple_choice",
        points: 1,
        explanation: "about 100 people's hours in a year",
        answers: [
          {
            text: "It is about the hours 100 people work in a year",
            isCorrect: true,
          },
          {
            text: "It is the number of barrels in a tank",
            isCorrect: false,
          },
          {
            text: "It is required for every chart",
            isCorrect: false,
          },
          {
            text: "It makes the rate look smaller",
            isCorrect: false,
          },
        ],
      },
      {
        text: "An asset ran all day but produced 90% of plan. What are its availability and attainment?",
        type: "multiple_choice",
        points: 1,
        explanation: "availability 100%, attainment 90%",
        answers: [
          {
            text: "Availability 100%, attainment 90%",
            isCorrect: true,
          },
          {
            text: "Both 90%",
            isCorrect: false,
          },
          {
            text: "Availability 90%, attainment 100%",
            isCorrect: false,
          },
          {
            text: "Both 100%",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does a Pareto analysis show?",
        type: "multiple_choice",
        points: 1,
        explanation: "ranked causes with cumulative share",
        answers: [
          {
            text: "The average downtime per day",
            isCorrect: false,
          },
          {
            text: "Every cause in alphabetical order",
            isCorrect: false,
          },
          {
            text: "Causes ranked by size with a cumulative share, so the vital few stand out",
            isCorrect: true,
          },
          {
            text: "Only planned maintenance",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Delta Ridge lost 3,235 barrels on days with no downtime. What is this called?",
        type: "multiple_choice",
        points: 1,
        explanation: "slow running",
        answers: [
          {
            text: "Planned maintenance",
            isCorrect: false,
          },
          {
            text: "Weather loss",
            isCorrect: false,
          },
          {
            text: "A safety incident",
            isCorrect: false,
          },
          {
            text: "Slow running",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Why can planned maintenance lose the most barrels while equipment failure has the most hours?",
        type: "multiple_choice",
        points: 1,
        explanation: "largest assets stopped for whole days",
        answers: [
          {
            text: "Barrels are measured incorrectly",
            isCorrect: false,
          },
          {
            text: "Planned maintenance stopped the largest assets for whole days",
            isCorrect: true,
          },
          {
            text: "Hours and barrels are always the same",
            isCorrect: false,
          },
          {
            text: "Equipment failure never loses barrels",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which formula gives availability?",
        type: "multiple_choice",
        points: 1,
        explanation: "(scheduled − downtime) ÷ scheduled",
        answers: [
          {
            text: "actual ÷ planned",
            isCorrect: false,
          },
          {
            text: "failures ÷ hours",
            isCorrect: false,
          },
          {
            text: "planned − actual",
            isCorrect: false,
          },
          {
            text: "(scheduled hours − downtime hours) ÷ scheduled hours",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which is preventive maintenance?",
        type: "multiple_choice",
        points: 1,
        explanation: "servicing on schedule",
        answers: [
          {
            text: "Repairing a pump after it fails",
            isCorrect: false,
          },
          {
            text: "Servicing a pump on schedule before it fails",
            isCorrect: true,
          },
          {
            text: "Buying a new asset",
            isCorrect: false,
          },
          {
            text: "Recording a near miss",
            isCorrect: false,
          },
        ],
      },
      {
        text: "An asset ran 4,218 hours and had 12 failures. What is its MTBF?",
        type: "multiple_choice",
        points: 1,
        explanation: "about 352 hours",
        answers: [
          {
            text: "About 352 hours",
            isCorrect: true,
          },
          {
            text: "12 hours",
            isCorrect: false,
          },
          {
            text: "4,230 hours",
            isCorrect: false,
          },
          {
            text: "About 0.003 hours",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why use TRIR instead of simply counting injuries?",
        type: "multiple_choice",
        points: 1,
        explanation: "fair comparison across hours worked",
        answers: [
          {
            text: "Counts are always zero",
            isCorrect: false,
          },
          {
            text: "TRIR includes production",
            isCorrect: false,
          },
          {
            text: "A rate allows fair comparison between sites with different hours worked",
            isCorrect: true,
          },
          {
            text: "Regulators ban counts",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Corrective orders are 29% of work orders but 52.8% of maintenance cost. What does this suggest?",
        type: "multiple_choice",
        points: 1,
        explanation: "failures are costly",
        answers: [
          {
            text: "Preventive maintenance is too expensive",
            isCorrect: false,
          },
          {
            text: "The data is wrong",
            isCorrect: false,
          },
          {
            text: "Cost does not matter",
            isCorrect: false,
          },
          {
            text: "Failures are costly, so preventing them could save money",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which is a leading indicator?",
        type: "multiple_choice",
        points: 1,
        explanation: "near misses this month",
        answers: [
          {
            text: "Lost time injuries last quarter",
            isCorrect: false,
          },
          {
            text: "Near misses reported this month",
            isCorrect: true,
          },
          {
            text: "Total maintenance cost last year",
            isCorrect: false,
          },
          {
            text: "Barrels produced last month",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What usually goes first on an operations dashboard?",
        type: "multiple_choice",
        points: 1,
        explanation: "safety KPIs",
        answers: [
          {
            text: "Company history",
            isCorrect: false,
          },
          {
            text: "The most colourful chart",
            isCorrect: false,
          },
          {
            text: "Safety KPIs",
            isCorrect: true,
          },
          {
            text: "A list of every sensor",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which DAX measure gives attainment?",
        type: "multiple_choice",
        points: 1,
        explanation: "DIVIDE actual by planned",
        answers: [
          {
            text: "SUM(production[downtime_hours])",
            isCorrect: false,
          },
          {
            text: "COUNTROWS(production)",
            isCorrect: false,
          },
          {
            text: "SUM(safety[hours_worked])",
            isCorrect: false,
          },
          {
            text: "DIVIDE(SUM(production[actual_bbl]), SUM(production[planned_bbl]))",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Why create an Assets table related to all three files?",
        type: "multiple_choice",
        points: 1,
        explanation: "one slicer filters every visual",
        answers: [
          {
            text: "To delete duplicate rows",
            isCorrect: false,
          },
          {
            text: "So one asset slicer filters every visual",
            isCorrect: true,
          },
          {
            text: "To make the file smaller",
            isCorrect: false,
          },
          {
            text: "Power BI requires exactly four tables",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Where should colour be used on the dashboard?",
        type: "multiple_choice",
        points: 1,
        explanation: "highlight exceptions",
        answers: [
          {
            text: "Mainly to highlight exceptions, such as values below target",
            isCorrect: true,
          },
          {
            text: "On every number, in traffic-light colours",
            isCorrect: false,
          },
          {
            text: "Nowhere",
            isCorrect: false,
          },
          {
            text: "Only on titles",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A bar axis starts at 90% instead of zero. What should you do?",
        type: "multiple_choice",
        points: 1,
        explanation: "label it and mention it",
        answers: [
          {
            text: "Hide the axis",
            isCorrect: false,
          },
          {
            text: "Nothing; this is never a problem",
            isCorrect: false,
          },
          {
            text: "Label the axis clearly and mention it in the caption",
            isCorrect: true,
          },
          {
            text: "Delete the chart",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 16,
    moduleTitle: "Data Analytics in Banking and Financial Services",
    moduleDescription: "Learners apply their skills to the fictional Harbour Bank: how banks use data, spotting unusual transactions, segmenting customers to keep them, and building a financial performance dashboard. Data files: harbour_branch_monthly.csv (36 rows: three branches, July 2025–June 2026; all money figures in thousands, with no currency), harbour_txn_q1_2026.csv (1,601 transactions, January–March 2026) and harbour_customers_clean.csv (the 60 customers cleaned in Module 13). All code was run in Python 3 with Pandas 2.3, and the outputs shown are the actual results. The Power BI steps in Lesson 16.4 have not yet been clicked through (see the status section). The data is invented for teaching: real banking data is confidential and protected by law.",
    lessons: [
      {
        title: "How banks use data",
        order: 1,
        durationMinutes: 70,
        videoUrl: "https://www.youtube.com/watch?v=wUPs8yyQeBo",
        content: "**Files for this lesson:** [harbour_branch_monthly.csv](/course-files/data-analytics/harbour_branch_monthly.csv). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** how a bank makes money, the data it holds, and the KPIs its managers and regulators watch.\n- **Why it matters:** banks and other financial firms (insurers, microfinance lenders, payment and fintech companies) employ many analysts. Knowing the business is what turns a data analyst into a useful one.\n- **After this lesson you can:** explain the main banking KPIs and calculate them from monthly branch data.\n- **Estimated time:** 70 minutes.\n\n## The topic in simple English\n\nA bank takes in deposits from customers and lends much of that money out as loans. It earns interest on loans and fees on services, and pays for staff, branches and systems. If borrowers stop repaying, those loans become \"non-performing\" and the bank may lose money. Analysts help the bank grow safely: more good customers, fewer bad loans, lower costs, and no fraud.\n\n## Learning objectives\n\n1. Explain how a bank earns income.\n2. Name the main data sources in a bank.\n3. Calculate the NPL ratio, cost-to-income ratio and loan-to-deposit ratio.\n4. Explain why banking data must be handled with strict privacy and security.\n5. Load and summarise monthly branch data in Python.\n\n## Main teaching content\n\n**1. How a bank earns money**\n\n| Part | Meaning |\n| --- | --- |\n| Deposits | Money customers keep at the bank |\n| Loans | Money the bank lends, earning interest |\n| Interest income | Interest received on loans (minus interest paid on deposits, in a full analysis) |\n| Fee income | Charges for services such as transfers and cards |\n| Operating cost | Staff, branches, systems |\n| Non-performing loans (NPLs) | Loans whose repayments are seriously overdue |\n\n**2. Data sources**\n\nCore banking system (accounts and balances), transaction systems (cards, transfers, ATMs, mobile and online banking), loan systems (applications, repayments, arrears), customer relationship systems (contacts, complaints), and finance systems (income and cost).\n\n**3. Key banking KPIs**\n\n| KPI | Formula | Good direction |\n| --- | --- | --- |\n| NPL ratio | non-performing loans ÷ total loans × 100 | Lower |\n| Cost-to-income ratio | operating cost ÷ income × 100 | Lower |\n| Loan-to-deposit ratio | loans ÷ deposits × 100 | Within the bank's target range |\n| Deposit growth | change in deposits ÷ earlier deposits × 100 | Higher |\n| Customer closure (attrition) rate | customers who closed ÷ customers at start × 100 | Lower |\n\n**4. Privacy and security**\n\nBank data is among the most sensitive data there is. Work only with the data you need, never copy customer data to personal devices or public AI tools, use customer IDs rather than names in analysis, and follow the data protection law of your country and the bank's own policies. A flagged transaction is a reason to check, never proof that a customer did anything wrong.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Non-performing loan | A loan with repayments seriously overdue | A loan not being repaid | A friend who stopped paying you back | 4,160 at Harbour in June 2026 |\n| NPL ratio | NPLs as a percentage of all loans | Share of loans in trouble | 1 of 20 friends not repaying | 3.91% |\n| Cost-to-income ratio | Operating cost as a percentage of income | How much of each 100 earned is spent | Spending 72 of every 100 you earn | 72.2% |\n| Loan-to-deposit ratio | Loans as a percentage of deposits | How much deposit money is lent out | Lending out 77 of every 100 saved | 77.5% |\n| Attrition | Customers leaving | Losing customers | Members leaving a club | 19 closures in 2026 |\n\n## Step-by-step demonstration: Harbour Bank's KPIs\n\nUpload **harbour\\_branch\\_monthly.csv** to Colab.\n\n1. Load and inspect: `fin = pd.read_csv(\"harbour_branch_monthly.csv\")`. `fin.shape` is `(36, 8)`: three branches × 12 months from 2025-07 to 2026-06. Columns: month, branch, deposits, loans, non\\_performing\\_loans, interest\\_income, fee\\_income and operating\\_cost.\n2. Add up the branches for each month and calculate the KPIs:\n\n```python\nbank = fin.groupby(\"month\").sum(numeric_only=True)\nbank[\"income\"] = bank[\"interest_income\"] + bank[\"fee_income\"]\nbank[\"profit\"] = bank[\"income\"] - bank[\"operating_cost\"]\nbank[\"npl_%\"] = (bank[\"non_performing_loans\"] / bank[\"loans\"] * 100).round(2)\nbank[\"cost_to_income_%\"] = (bank[\"operating_cost\"] / bank[\"income\"] * 100).round(1)\nbank[\"loan_to_deposit_%\"] = (bank[\"loans\"] / bank[\"deposits\"] * 100).round(1)\nprint(bank.loc[\"2026-06\"])\n```\n\n`numeric_only=True` adds only the number columns, so the branch names are left out.\n\n3. Read the June 2026 results: deposits 137,320; loans 106,480; NPLs 4,160; income 1,364 (interest 1,132 plus fees 232); operating cost 985; profit 379. NPL ratio **3.91%**, cost-to-income **72.2%**, loan-to-deposit **77.5%**.\n4. Compare with July 2025: NPL ratio 2.91%, cost-to-income 73.8%, loan-to-deposit 79.1%, profit 344. Profit is higher and costs are under control, but the share of loans in trouble has risen by a full percentage point. Lesson 16.4 and the assignment look at which branch is responsible.\n\n## Practical exercise\n\n- **Task:** a KPI table for each branch for June 2026.\n- **Steps:** filter `fin` to 2026-06 and calculate NPL ratio, cost-to-income and loan-to-deposit for each branch.\n- **Expected output:** NPL ratio Central 3.20%, Eastgate 2.99%, Westfield 5.75%.\n- **Submit:** your notebook link and two sentences on what stands out.\n\n## Knowledge check\n\n1. What is a non-performing loan?\n   - A) A loan whose repayments are seriously overdue\n   - B) A loan with a low interest rate\n   - C) A new loan\n   - D) A deposit account\n2. Which formula gives the cost-to-income ratio?\n   - A) loans ÷ deposits\n   - B) income − cost\n   - C) operating cost ÷ income × 100\n   - D) NPLs ÷ deposits\n3. Harbour's NPL ratio rose from 2.91% to 3.91%. Is that good or bad?\n   - A) Good: more loans are being repaid\n   - B) Bad: a larger share of loans are not being repaid\n   - C) It makes no difference\n   - D) It means deposits fell\n4. Which is the right way to handle customer data during analysis?\n   - A) Copy it to a personal laptop\n   - B) Paste it into a public AI tool\n   - C) Share it on social media\n   - D) Use only the data needed, with IDs rather than names, following policy and law\n5. In `fin.groupby(\"month\").sum(numeric_only=True)`, what does `numeric_only=True` do?\n   - A) Deletes the month column\n   - B) Adds up only number columns, leaving text such as branch names out\n   - C) Rounds the numbers\n   - D) Sorts the months\n\n## Lesson summary\n\n1. Banks earn interest and fees on top of deposits and loans, and pay operating costs.\n2. NPL ratio, cost-to-income and loan-to-deposit are core banking KPIs.\n3. Harbour's June 2026 NPL ratio is 3.91%, up from 2.91% in July 2025.\n4. Banking data is highly sensitive; handle it carefully and lawfully.\n5. A flag is a reason to check, not an accusation.\n\n## Completion check\n\n- [ ] I can explain how a bank earns money.\n- [ ] I calculated three banking KPIs.\n- [ ] I can state three rules for handling bank data.",
      },
      {
        title: "Transactions and unusual patterns",
        order: 2,
        durationMinutes: 85,
        videoUrl: "https://www.youtube.com/watch?v=7FjapNRy5YA",
        content: "**Files for this lesson:** [harbour_customers_clean.csv](/course-files/data-analytics/harbour_customers_clean.csv) · [harbour_txn_q1_2026.csv](/course-files/data-analytics/harbour_txn_q1_2026.csv). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** how analysts find unusual transactions using simple, explainable rules: amounts far above a customer's normal, night-time activity, bursts of repeated transactions, and repeated amounts just under a limit.\n- **Why it matters:** banks must detect fraud and report suspicious activity. Analysts build and tune the rules, and help investigators review alerts.\n- **After this lesson you can:** apply four detection rules in Pandas and explain each alert.\n- **Estimated time:** 85 minutes.\n\n## The topic in simple English\n\nIf a friend who usually spends a little each week suddenly spends a large sum at 2 a.m., you would ask if everything is all right. Detection rules do the same for thousands of customers at once. The skill is to compare each customer with their own normal, and to accept that most alerts will have an innocent explanation.\n\n## Learning objectives\n\n1. Explain why \"largest\" is not the same as \"unusual\".\n2. Compare each transaction with the customer's own median.\n3. Flag night-time transactions and bursts within one hour.\n4. Find repeated deposits just below a limit.\n5. Explain false positives and why alerts need human review.\n\n## Main teaching content\n\n**1. Compare with the customer's own normal**\n\nA business moving 9,500 may be normal; a personal customer who usually moves 200 doing so is not. Compare each amount with that customer's median (Module 7: the median is not pulled up by a few large values).\n\n**2. Common rule types**\n\n| Rule | What it looks for | Pandas idea |\n| --- | --- | --- |\n| Unusual amount | Amount at least 10 times the customer's median | `groupby(...).transform(\"median\")` |\n| Unusual time | Transactions between midnight and 6 a.m. | `dt.hour < 6` |\n| Burst | Several transactions in a short time | `rolling(\"60min\")` count per customer |\n| Just below a limit | Repeated amounts just under a limit (here 5,000) | `between(4500, 4999)` then count per customer |\n\nReal banks combine many rules and, increasingly, machine learning. Simple rules remain important because they are easy to explain to investigators and regulators.\n\n**3. False positives and false negatives**\n\nA **false positive** is an alert on an innocent transaction; a **false negative** is a real problem that was missed. Tight rules miss less but create more alerts to review. Analysts tune rules to balance the two.\n\n**4. Why one rule for everyone fails**\n\nApplying one IQR fence (Module 7) to all Personal transactions flags 41 of them, and to all Business transactions 48: far too many to review, and most are just larger customers. Customer-level rules give far fewer, better alerts.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Anomaly | A data point that differs markedly from the expected pattern | Something unusual | Snow in a hot season | A 9,500 transfer from a small account |\n| Baseline | The normal pattern for a customer or group | What's normal for them | Your usual bedtime | A customer's median amount |\n| Alert | A record flagged by a rule for review | A warning to check | A smoke alarm | T00918 flagged |\n| False positive | An alert on something that is actually fine | False alarm | Smoke alarm set off by toast | A legitimate large business payment |\n| Structuring | Splitting cash to stay under a reporting limit | Keeping just under the line | Several small bags to avoid a weight limit | Five deposits of about 4,950 |\n\n## Step-by-step demonstration: four rules on Harbour transactions\n\nUpload **harbour\\_txn\\_q1\\_2026.csv** and **harbour\\_customers\\_clean.csv**.\n\n1. Load and join the customer segment:\n\n```python\nt = pd.read_csv(\"harbour_txn_q1_2026.csv\", parse_dates=[\"txn_time\"])\ncust = pd.read_csv(\"harbour_customers_clean.csv\")\nt = t.merge(cust[[\"customer_id\", \"segment\"]], on=\"customer_id\")\nprint(t.shape, t[\"amount\"].max())\n```\n\nOutput: `(1601, 7) 9510`.\n\n2. Largest is not unusual. `t.nlargest(3, \"amount\")` shows T01593 (H020, Business, 9,510), T00918 (H014, Personal, 9,500) and T00308 (H056, Business, 7,980).\n3. **Rule 1, unusual amount for this customer:**\n\n```python\nt[\"cust_median\"] = t.groupby(\"customer_id\")[\"amount\"].transform(\"median\")\nt[\"x_median\"] = (t[\"amount\"] / t[\"cust_median\"]).round(1)\nt[t[\"x_median\"] >= 10]\n```\n\nOne alert: **T00918**, H014, an online transfer of 9,500 on 18 February at 02:40, which is **45.2 times** that customer's median. The largest transaction, H020's 9,510, is only 5.1 times its business median, so it is not flagged.\n\n4. **Rule 2, night-time:** `t[t[\"txn_time\"].dt.hour < 6]` returns one row, the same T00918. Two rules agree, which makes this the strongest alert.\n5. **Rule 3, bursts:**\n\n```python\nt = t.sort_values([\"customer_id\", \"txn_time\"])\nt[\"txns_last_hour\"] = t.groupby(\"customer_id\").rolling(\"60min\", on=\"txn_time\")[\"amount\"].count().values\nt[t[\"txns_last_hour\"] >= 4]\n```\n\nAlerts on H031: six ATM withdrawals of 400 between 23:05 and 23:48 on 7 March. The rows with 4, 5 and 6 transactions in the past hour are flagged. A possible stolen card, or a customer who needed cash urgently: the bank would contact the customer.\n\n6. **Rule 4, just below a limit:**\n\n```python\nnear = t[(t[\"txn_type\"] == \"Deposit\") & (t[\"amount\"].between(4500, 4999))]\nnear.groupby(\"customer_id\").agg(deposits=(\"txn_id\", \"count\"), total=(\"amount\", \"sum\"))\n```\n\nFour customers have such a deposit, but H004, H012 and H056 have only one each, which is ordinary. **H052** made five branch deposits between 4,900 and 4,980 from 2 to 9 March, 24,730 in total. A repeated pattern like this is passed to the bank's compliance team; the analyst does not decide what it means.\n\n7. **Write an alert log:** one row per alert with the rule, the evidence and \"for review\". Three customers out of 60 need review.\n\n## Practical exercise\n\n- **Task:** test a tighter and a looser amount rule.\n- **Steps:** count alerts for `x_median >= 5` and `x_median >= 20`. For each, list the customers and decide whether the extra alerts look worth reviewing.\n- **Expected output:** a short table showing that a lower threshold gives more alerts; explain the trade-off in two sentences.\n- **Submit:** your notebook link.\n\n## Knowledge check\n\n1. A business customer makes the bank's largest transaction, 9,510, about five times its usual amount. What should the analyst conclude?\n   - A) The data is wrong\n   - B) It must be fraud\n   - C) The customer should be closed\n   - D) Being the largest does not make it suspicious; for this customer it is below the 10-times rule\n2. Why compare each amount with the customer's own median?\n   - A) Normal amounts differ greatly between customers\n   - B) Pandas cannot calculate means\n   - C) Medians are easier to type\n   - D) To make every customer look the same\n3. What is a false positive?\n   - A) A missed fraud\n   - B) A transaction with a negative amount\n   - C) An alert on something that is actually fine\n   - D) A correct alert\n4. Five deposits of about 4,950 in one week, just under a 5,000 limit. What should the analyst do?\n   - A) Accuse the customer\n   - B) Pass the pattern to the compliance team for review\n   - C) Delete the rows\n   - D) Ignore it because each deposit is below the limit\n5. Which code counts each customer's transactions in the previous 60 minutes?\n   - A) `t.groupby(\"customer_id\").rolling(\"60min\", on=\"txn_time\")[\"amount\"].count()`\n   - B) `t[\"amount\"].sum()`\n   - C) `t.nlargest(60, \"amount\")`\n   - D) `t[\"txn_time\"].dt.hour < 6`\n\n## Lesson summary\n\n1. \"Largest\" is not \"unusual\"; compare with each customer's normal.\n2. Simple rules: unusual amount, unusual time, bursts, just below a limit.\n3. Alerts confirmed by more than one rule are stronger.\n4. Rules trade false positives against false negatives.\n5. Analysts flag and explain; investigators and compliance teams decide.\n\n## Completion check\n\n- [ ] I applied four detection rules.\n- [ ] I explained why the largest transaction was not flagged.\n- [ ] I wrote an alert log marked \"for review\".",
      },
      {
        title: "Customer segmentation and retention",
        order: 3,
        durationMinutes: 85,
        videoUrl: "https://www.youtube.com/watch?v=HwiBD8MB-14",
        content: "## Lesson introduction\n\n- **What you will study:** how to group customers into segments that need different treatment, and how to build an early warning that spots customers likely to leave.\n- **Why it matters:** keeping a customer usually costs far less than winning a new one. Segments help the bank offer the right thing to the right people.\n- **After this lesson you can:** build value segments, calculate closure rates per segment and test an activity-based early warning.\n- **Estimated time:** 85 minutes.\n\n## The topic in simple English\n\nA school does not teach every pupil the same way: some need extra help, some need a challenge. Segmentation sorts customers into groups with similar needs or value. Retention is noticing when a customer starts to drift away, for example when they use their account less and less, and acting before they leave.\n\n## Learning objectives\n\n1. Explain what a customer segment is and why banks use them.\n2. Create value segments from segment type and balance bands with `pd.cut`.\n3. Describe RFM (recency, frequency, monetary value) segmentation.\n4. Build an activity-trend early warning from transactions.\n5. Measure an early warning's hits and false alarms.\n\n## Main teaching content\n\n**1. Ways to segment**\n\n| Approach | Based on | Example segments |\n| --- | --- | --- |\n| Demographic | Age, type of customer | Students, retirees, small businesses |\n| Value | Balances, products, income to the bank | High, medium, low value |\n| Behaviour | How customers use the bank | Digital-first, branch-dependent |\n| RFM | Recency, frequency, monetary value of transactions | Champions, loyal, drifting away |\n\nSegments must be **useful**: each one should lead to a different action.\n\n**2. RFM**\n\n- **Recency:** days since the last transaction (fewer is better).\n- **Frequency:** number of transactions in the period.\n- **Monetary:** total amount transacted.\n\nEach is scored, often 1–3 or 1–5, and the scores combined. Customers who used to score high but are now slipping are retention targets.\n\n**3. Early warnings**\n\nCustomers rarely leave suddenly: activity falls first. Comparing each customer's activity this month with last month is a simple, explainable warning. Test it on past data: of those it flagged, how many really left? How many leavers did it miss?\n\n**4. A warning about circular evidence**\n\nIf you measure recency *after* customers closed their accounts, closed customers will obviously look inactive. To test an early warning fairly, use only data from **before** the outcome, as this lesson does with January and February.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Segment | A group of customers with similar characteristics or needs | A group treated alike | Age groups at a sports club | Personal Medium |\n| RFM | Scoring customers by recency, frequency and monetary value | How recent, how often, how much | A café's regulars | Drifting-away customers |\n| Retention | Keeping customers from leaving | Holding on to customers | A gym's renewal offer | Calling at-risk customers |\n| Early warning | A signal that an outcome is becoming more likely | A sign of trouble ahead | A cough before a cold | Activity down 25% or more |\n| Data leakage | Using information that would not be known at decision time | Peeking at the answer | Reading the answers before the exam | Recency measured after closure |\n\n## Step-by-step demonstration: Harbour segments and an early warning\n\nKeep `t` and `cust` from Lesson 16.2.\n\n1. **Value segments:**\n\n```python\ncust[\"balance_band\"] = pd.cut(cust[\"avg_balance\"], bins=[0, 1500, 5000, 1000000], labels=[\"Low\", \"Medium\", \"High\"])\ncust[\"value_segment\"] = cust[\"segment\"] + \" \" + cust[\"balance_band\"].astype(str)\ncust[\"closed\"] = (cust[\"closed_2026\"] == \"Yes\").astype(int)\ncust.groupby(\"value_segment\").agg(customers=(\"customer_id\", \"count\"), closed=(\"closed\", \"sum\"), avg_products=(\"products_held\", \"mean\")).round(1)\n```\n\nResult: Business High 13 customers (1 closed, 3.9 products on average); Business Medium 2 (1 closed); Personal Low 17 (7 closed, 2.2 products); Personal Medium 28 (10 closed, 1.9 products). No personal customer has an average balance above 5,000. Personal customers hold fewer products and close far more often: a cross-selling and retention target.\n\n2. **Activity trend, using only January and February:**\n\n```python\nt[\"month\"] = t[\"txn_time\"].dt.month\nact = t[t[\"month\"] <= 2].pivot_table(index=\"customer_id\", columns=\"month\", values=\"txn_id\", aggfunc=\"count\")\nact.columns = [\"jan\", \"feb\"]\nact[\"change_%\"] = ((act[\"feb\"] / act[\"jan\"] - 1) * 100).round(0)\nact = act.merge(cust[[\"customer_id\", \"segment\", \"closed_2026\"]], on=\"customer_id\")\nact[\"early_warning\"] = act[\"change_%\"] <= -25\npd.crosstab(act[\"early_warning\"], act[\"closed_2026\"])\n```\n\nOutput:\n\n```\nclosed_2026    No  Yes\nearly_warning\nFalse          38    0\nTrue            3   19\n```\n\n3. **Test the warning.** It flagged 22 customers at the start of March. 19 of them closed their accounts in 2026, and it caught all 19 customers who closed. Three flagged customers did not close (false positives), which is a cheap mistake: a friendly call.\n4. **Be honest.** This is teaching data, and a warning this accurate would be unusual in real life. In a real bank you would test it on many more customers and several periods before relying on it.\n5. **Action by segment:** call flagged customers within a week (Lesson 14.3), prioritising Personal customers with complaints (Module 13).\n\n## Practical exercise\n\n- **Task:** RFM scores as of 1 March.\n- **Steps:** using only January–February transactions, calculate recency (days before 1 March of the last transaction), frequency and monetary value per customer. Score each 1–3 with `pd.qcut` and add the scores. Compare the average RFM score of customers who later closed with those who did not.\n- **Expected output:** a table of 60 customers with R, F, M and total score, and one paragraph comparing RFM with the activity-trend warning.\n- **Submit:** your notebook link.\n\n## Knowledge check\n\n1. What makes a customer segment useful?\n   - A) It has an interesting name\n   - B) Each segment leads to a different action\n   - C) It contains exactly ten customers\n   - D) It uses every column\n2. What does the R in RFM stand for?\n   - A) Revenue\n   - B) Region\n   - C) Risk\n   - D) Recency\n3. Why was the early warning built from January–February data only?\n   - A) To avoid data leakage: only information available before the outcome is used\n   - B) March data is wrong\n   - C) Pandas cannot read March\n   - D) To make the result look better\n4. The warning flagged 22 customers; 19 closed and 3 did not. What are the 3?\n   - A) False negatives\n   - B) Missed closures\n   - C) False positives\n   - D) Segments\n5. Which code makes Low, Medium and High balance bands?\n   - A) `cust[\"avg_balance\"].sum()`\n   - B) `cust.sort_values(\"avg_balance\")`\n   - C) `cust[\"avg_balance\"].mean()`\n   - D) `pd.cut(cust[\"avg_balance\"], bins=[0, 1500, 5000, 1000000], labels=[\"Low\", \"Medium\", \"High\"])`\n\n## Lesson summary\n\n1. Segment customers so that each group gets a different, suitable action.\n2. Value, behaviour and RFM are common segmentation methods.\n3. Falling activity is an early sign that a customer may leave.\n4. Test warnings on data from before the outcome; count hits and false alarms.\n5. Harbour's activity warning caught all 19 closures with 3 false alarms in this teaching data.\n\n## Completion check\n\n- [ ] I built value segments with closure counts.\n- [ ] I built and tested the activity early warning.\n- [ ] I can explain data leakage.",
      },
      {
        title: "Building a financial performance dashboard",
        order: 4,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=i3AR0gt9SHA",
        content: "**Files for this lesson:** [harbour_branch_monthly.csv](/course-files/data-analytics/harbour_branch_monthly.csv). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** how to design and build a one-page financial performance dashboard for a bank's management team.\n- **Why it matters:** bank executives review performance every month: growth, profit, cost and risk. A clear dashboard lets them see problems early.\n- **After this lesson you can:** build a banking dashboard with KPI cards, trends and a branch comparison, and explain it.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nA bank dashboard answers four questions at a glance: Are we growing? Are we profitable? Are costs under control? Is risk rising? Each gets a number, a trend and a comparison between branches.\n\n## Learning objectives\n\n1. Choose KPIs for growth, profit, cost and risk.\n2. Write measures for NPL ratio and cost-to-income ratio.\n3. Explain why ratios must be calculated from totals, not averaged.\n4. Build the dashboard in Power BI, Excel or Python.\n5. Brief the management team in three sentences.\n\n## Main teaching content\n\n**1. Layout**\n\n| Area | Content |\n| --- | --- |\n| Top row cards | Deposits, loans, profit, NPL ratio, cost-to-income (latest month, with change against 12 months earlier) |\n| Middle | Trends: NPL ratio and cost-to-income by month |\n| Bottom | Branch table: deposit growth, NPL ratio, cost-to-income, profit |\n| Filters | Branch, month |\n\n**2. Measures (Power BI DAX)**\n\n```\nIncome = SUM(fin[interest_income]) + SUM(fin[fee_income])\nProfit = [Income] - SUM(fin[operating_cost])\nNPL ratio = DIVIDE(SUM(fin[non_performing_loans]), SUM(fin[loans]))\nCost to income = DIVIDE(SUM(fin[operating_cost]), [Income])\n```\n\n**3. Ratios from totals, never averaged**\n\nThe bank's NPL ratio is total NPLs ÷ total loans, not the average of the three branch ratios. Averaging gives every branch equal weight even though they lend different amounts (Module 10: the average-price trap). The DAX measures above are correct at any level because they divide totals.\n\n**4. Balances and flows**\n\nDeposits, loans and NPLs are **balances** (the amount at month end); do not add them across months. Income and cost are **flows**; add them across months. On a card for a period, show the last month's balance and the period's total income.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Balance | An amount at a point in time | How much there is now | Money in your wallet tonight | Deposits at the end of June |\n| Flow | An amount over a period | How much came in or went out | This week's spending | Income in March |\n| Weighted ratio | A ratio from totals, so bigger parts count more | A fair overall rate | Overall class score from all marks | Bank NPL ratio |\n| Trend line | A chart of a measure over time | Which way it's going | A child's height chart | NPL ratio by month |\n| Variance | The difference between two values, such as actual and last year | The change | This year's rent minus last year's | +1.0 point NPL ratio |\n\n## Step-by-step demonstration: the Harbour Bank dashboard\n\n1. **Power BI:** load harbour\\_branch\\_monthly.csv as **fin**. Set month as a date (Power Query: change type to Date; it becomes the first day of each month). Create the measures in D.2.\n2. **Cards:** filter the cards to 2026-06 (or use the latest-month filter): deposits 137,320; loans 106,480; NPL ratio 3.91%; cost-to-income 72.2%; profit 379.\n3. **Trends:** a line chart of NPL ratio by month, and one of cost-to-income by month.\n4. **Branch table:** branch, NPL ratio, cost-to-income, profit; with a branch slicer.\n5. **Check in Python** with `bank` from Lesson 16.1:\n\n```python\nprint(bank[[\"income\", \"operating_cost\", \"profit\", \"npl_%\", \"cost_to_income_%\"]])\n```\n\nThe bank's NPL ratio rises every month, from 2.91% in July 2025 to 3.91% in June 2026. Cost-to-income improved from 73.8% to 70.3% by February 2026, then jumped to 74.4% in March as operating cost rose from 958 to 992, and eased back to 72.2% by June. Monthly profit ranged from 342 (March 2026) to 404 (February 2026).\n\n6. **Brief the management team:** \"Harbour's profit was 379 in June, 35 higher than in July 2025. The NPL ratio has risen every month, from 2.91% to 3.91%, and operating costs stepped up in March 2026. The branch table shows where both changes come from; that is the next thing to investigate.\"\n\n## Practical exercise\n\n- **Task:** prove the averaging trap.\n- **Steps:** for June 2026, calculate the simple average of the three branch NPL ratios and compare it with the bank's NPL ratio from totals.\n- **Expected output:** the simple average is about 3.98%, against the correct 3.91%; explain the difference in one sentence.\n- **Submit:** your notebook link.\n\n## Knowledge check\n\n1. Which is a balance, not a flow?\n   - A) Interest income in March\n   - B) Fee income in the year\n   - C) Loans at the end of June\n   - D) Operating cost in April\n2. How should the bank's overall NPL ratio be calculated?\n   - A) Average the branch ratios\n   - B) Total NPLs ÷ total loans\n   - C) Take the highest branch ratio\n   - D) Add the branch ratios\n3. Which DAX measure gives cost-to-income?\n   - A) `SUM(fin[loans])`\n   - B) `[Income] - SUM(fin[operating_cost])`\n   - C) `AVERAGE(fin[operating_cost])`\n   - D) `DIVIDE(SUM(fin[operating_cost]), [Income])`\n4. Which four questions should a bank dashboard answer?\n   - A) Growth, profit, cost and risk\n   - B) Colours, fonts, logos and titles\n   - C) Only deposits\n   - D) Staff birthdays, weather, traffic and news\n5. The bank NPL ratio rose every month. What is the next step?\n   - A) Remove the chart\n   - B) Wait a year\n   - C) Use the branch table to find which branch drives the rise\n   - D) Average the ratios\n\n## Lesson summary\n\n1. A bank dashboard covers growth, profit, cost and risk.\n2. Calculate ratios from totals; never average them.\n3. Do not add balances across months; add flows.\n4. Harbour's NPL ratio rose from 2.91% to 3.91% while profit grew.\n5. Brief in three sentences and say what to investigate next.\n\n## Completion check\n\n- [ ] I built cards, trends and a branch table.\n- [ ] My NPL and cost-to-income figures match the Python check.\n- [ ] I briefed the dashboard in three sentences.",
      },
    ],
    assignmentTitle: "Harbour Bank branch performance review",
    assignmentDescription: "Harbour Bank's chief operating officer says: \"The bank's NPL ratio has risen every month and costs jumped in March.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "Which is the main source of a bank's interest income?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Deposits held in cash",
            isCorrect: false,
          },
          {
            text: "Staff salaries",
            isCorrect: false,
          },
          {
            text: "Branch buildings",
            isCorrect: false,
          },
          {
            text: "Loans to customers",
            isCorrect: true,
          },
        ],
      },
      {
        text: "A bank has loans of 100,000 and NPLs of 4,000. What is its NPL ratio?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "25%",
            isCorrect: false,
          },
          {
            text: "4%",
            isCorrect: true,
          },
          {
            text: "40%",
            isCorrect: false,
          },
          {
            text: "0.4%",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Operating cost is 985 and income 1,364. What is the cost-to-income ratio, to one decimal place?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "138.5%",
            isCorrect: false,
          },
          {
            text: "27.8%",
            isCorrect: false,
          },
          {
            text: "72.2%",
            isCorrect: true,
          },
          {
            text: "379%",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why compare a transaction with the customer's own median rather than with all customers?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "What is normal differs greatly between customers",
            isCorrect: true,
          },
          {
            text: "It is faster to type",
            isCorrect: false,
          },
          {
            text: "Medians are always zero",
            isCorrect: false,
          },
          {
            text: "Regulators ban comparisons",
            isCorrect: false,
          },
        ],
      },
      {
        text: "An alert turns out to be an innocent, legitimate payment. This is a:",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "false negative",
            isCorrect: false,
          },
          {
            text: "segment",
            isCorrect: false,
          },
          {
            text: "false positive",
            isCorrect: true,
          },
          {
            text: "balance",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Who decides what a suspicious pattern means?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "The analyst, alone",
            isCorrect: false,
          },
          {
            text: "The bank's investigators or compliance team, after review",
            isCorrect: true,
          },
          {
            text: "The customer's neighbours",
            isCorrect: false,
          },
          {
            text: "Nobody",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is an example of data leakage?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Using January data to predict March",
            isCorrect: false,
          },
          {
            text: "Cleaning duplicates",
            isCorrect: false,
          },
          {
            text: "Rounding to one decimal place",
            isCorrect: false,
          },
          {
            text: "Testing a closure warning with activity measured after customers closed",
            isCorrect: true,
          },
        ],
      },
      {
        text: "In RFM, frequency means:",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "how many transactions a customer made in the period",
            isCorrect: true,
          },
          {
            text: "how long ago the last transaction was",
            isCorrect: false,
          },
          {
            text: "the total amount",
            isCorrect: false,
          },
          {
            text: "the customer's age",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which should NOT be added across months?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Fee income",
            isCorrect: false,
          },
          {
            text: "Deposit balances",
            isCorrect: true,
          },
          {
            text: "Operating cost",
            isCorrect: false,
          },
          {
            text: "Interest income",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the correct way to get the bank's overall cost-to-income ratio from three branches?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Average the three branch ratios",
            isCorrect: false,
          },
          {
            text: "Take the lowest branch ratio",
            isCorrect: false,
          },
          {
            text: "Multiply the three ratios",
            isCorrect: false,
          },
          {
            text: "Total cost ÷ total income",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What is a non-performing loan?",
        type: "multiple_choice",
        points: 1,
        explanation: "repayments seriously overdue",
        answers: [
          {
            text: "A loan whose repayments are seriously overdue",
            isCorrect: true,
          },
          {
            text: "A loan with a low interest rate",
            isCorrect: false,
          },
          {
            text: "A new loan",
            isCorrect: false,
          },
          {
            text: "A deposit account",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which formula gives the cost-to-income ratio?",
        type: "multiple_choice",
        points: 1,
        explanation: "operating cost ÷ income × 100",
        answers: [
          {
            text: "loans ÷ deposits",
            isCorrect: false,
          },
          {
            text: "income − cost",
            isCorrect: false,
          },
          {
            text: "operating cost ÷ income × 100",
            isCorrect: true,
          },
          {
            text: "NPLs ÷ deposits",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Harbour's NPL ratio rose from 2.91% to 3.91%. Is that good or bad?",
        type: "multiple_choice",
        points: 1,
        explanation: "bad, more loans not repaid",
        answers: [
          {
            text: "Good: more loans are being repaid",
            isCorrect: false,
          },
          {
            text: "Bad: a larger share of loans are not being repaid",
            isCorrect: true,
          },
          {
            text: "It makes no difference",
            isCorrect: false,
          },
          {
            text: "It means deposits fell",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is the right way to handle customer data during analysis?",
        type: "multiple_choice",
        points: 1,
        explanation: "only what is needed, IDs, policy and law",
        answers: [
          {
            text: "Copy it to a personal laptop",
            isCorrect: false,
          },
          {
            text: "Paste it into a public AI tool",
            isCorrect: false,
          },
          {
            text: "Share it on social media",
            isCorrect: false,
          },
          {
            text: "Use only the data needed, with IDs rather than names, following policy and law",
            isCorrect: true,
          },
        ],
      },
      {
        text: "In fin.groupby(\"month\").sum(numeric_only=True), what does numeric_only=True do?",
        type: "multiple_choice",
        points: 1,
        explanation: "adds only number columns",
        answers: [
          {
            text: "Deletes the month column",
            isCorrect: false,
          },
          {
            text: "Adds up only number columns, leaving text such as branch names out",
            isCorrect: true,
          },
          {
            text: "Rounds the numbers",
            isCorrect: false,
          },
          {
            text: "Sorts the months",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A business customer makes the bank's largest transaction, 9,510, about five times its usual amount. What should the analyst conclude?",
        type: "multiple_choice",
        points: 1,
        explanation: "largest is not suspicious on its own",
        answers: [
          {
            text: "The data is wrong",
            isCorrect: false,
          },
          {
            text: "It must be fraud",
            isCorrect: false,
          },
          {
            text: "The customer should be closed",
            isCorrect: false,
          },
          {
            text: "Being the largest does not make it suspicious; for this customer it is below the 10-times rule",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Why compare each amount with the customer's own median?",
        type: "multiple_choice",
        points: 1,
        explanation: "normal amounts differ between customers",
        answers: [
          {
            text: "Normal amounts differ greatly between customers",
            isCorrect: true,
          },
          {
            text: "Pandas cannot calculate means",
            isCorrect: false,
          },
          {
            text: "Medians are easier to type",
            isCorrect: false,
          },
          {
            text: "To make every customer look the same",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is a false positive?",
        type: "multiple_choice",
        points: 1,
        explanation: "an alert on something fine",
        answers: [
          {
            text: "A missed fraud",
            isCorrect: false,
          },
          {
            text: "A transaction with a negative amount",
            isCorrect: false,
          },
          {
            text: "An alert on something that is actually fine",
            isCorrect: true,
          },
          {
            text: "A correct alert",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Five deposits of about 4,950 in one week, just under a 5,000 limit. What should the analyst do?",
        type: "multiple_choice",
        points: 1,
        explanation: "pass to compliance for review",
        answers: [
          {
            text: "Accuse the customer",
            isCorrect: false,
          },
          {
            text: "Pass the pattern to the compliance team for review",
            isCorrect: true,
          },
          {
            text: "Delete the rows",
            isCorrect: false,
          },
          {
            text: "Ignore it because each deposit is below the limit",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which code counts each customer's transactions in the previous 60 minutes?",
        type: "multiple_choice",
        points: 1,
        explanation: "the rolling 60-minute count",
        answers: [
          {
            text: "t.groupby(\"customer_id\").rolling(\"60min\", on=\"txn_time\")[\"amount\"].count()",
            isCorrect: true,
          },
          {
            text: "t[\"amount\"].sum()",
            isCorrect: false,
          },
          {
            text: "t.nlargest(60, \"amount\")",
            isCorrect: false,
          },
          {
            text: "t[\"txn_time\"].dt.hour < 6",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What makes a customer segment useful?",
        type: "multiple_choice",
        points: 1,
        explanation: "each segment leads to an action",
        answers: [
          {
            text: "It has an interesting name",
            isCorrect: false,
          },
          {
            text: "Each segment leads to a different action",
            isCorrect: true,
          },
          {
            text: "It contains exactly ten customers",
            isCorrect: false,
          },
          {
            text: "It uses every column",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does the R in RFM stand for?",
        type: "multiple_choice",
        points: 1,
        explanation: "recency",
        answers: [
          {
            text: "Revenue",
            isCorrect: false,
          },
          {
            text: "Region",
            isCorrect: false,
          },
          {
            text: "Risk",
            isCorrect: false,
          },
          {
            text: "Recency",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Why was the early warning built from January–February data only?",
        type: "multiple_choice",
        points: 1,
        explanation: "avoid data leakage",
        answers: [
          {
            text: "To avoid data leakage: only information available before the outcome is used",
            isCorrect: true,
          },
          {
            text: "March data is wrong",
            isCorrect: false,
          },
          {
            text: "Pandas cannot read March",
            isCorrect: false,
          },
          {
            text: "To make the result look better",
            isCorrect: false,
          },
        ],
      },
      {
        text: "The warning flagged 22 customers; 19 closed and 3 did not. What are the 3?",
        type: "multiple_choice",
        points: 1,
        explanation: "false positives",
        answers: [
          {
            text: "False negatives",
            isCorrect: false,
          },
          {
            text: "Missed closures",
            isCorrect: false,
          },
          {
            text: "False positives",
            isCorrect: true,
          },
          {
            text: "Segments",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which code makes Low, Medium and High balance bands?",
        type: "multiple_choice",
        points: 1,
        explanation: "the pd.cut bands",
        answers: [
          {
            text: "cust[\"avg_balance\"].sum()",
            isCorrect: false,
          },
          {
            text: "cust.sort_values(\"avg_balance\")",
            isCorrect: false,
          },
          {
            text: "cust[\"avg_balance\"].mean()",
            isCorrect: false,
          },
          {
            text: "pd.cut(cust[\"avg_balance\"], bins=[0, 1500, 5000, 1000000], labels=[\"Low\", \"Medium\", \"High\"])",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which is a balance, not a flow?",
        type: "multiple_choice",
        points: 1,
        explanation: "loans at the end of June",
        answers: [
          {
            text: "Interest income in March",
            isCorrect: false,
          },
          {
            text: "Fee income in the year",
            isCorrect: false,
          },
          {
            text: "Loans at the end of June",
            isCorrect: true,
          },
          {
            text: "Operating cost in April",
            isCorrect: false,
          },
        ],
      },
      {
        text: "How should the bank's overall NPL ratio be calculated?",
        type: "multiple_choice",
        points: 1,
        explanation: "total NPLs ÷ total loans",
        answers: [
          {
            text: "Average the branch ratios",
            isCorrect: false,
          },
          {
            text: "Total NPLs ÷ total loans",
            isCorrect: true,
          },
          {
            text: "Take the highest branch ratio",
            isCorrect: false,
          },
          {
            text: "Add the branch ratios",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which DAX measure gives cost-to-income?",
        type: "multiple_choice",
        points: 1,
        explanation: "DIVIDE cost by income",
        answers: [
          {
            text: "SUM(fin[loans])",
            isCorrect: false,
          },
          {
            text: "[Income] - SUM(fin[operating_cost])",
            isCorrect: false,
          },
          {
            text: "AVERAGE(fin[operating_cost])",
            isCorrect: false,
          },
          {
            text: "DIVIDE(SUM(fin[operating_cost]), [Income])",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which four questions should a bank dashboard answer?",
        type: "multiple_choice",
        points: 1,
        explanation: "growth, profit, cost, risk",
        answers: [
          {
            text: "Growth, profit, cost and risk",
            isCorrect: true,
          },
          {
            text: "Colours, fonts, logos and titles",
            isCorrect: false,
          },
          {
            text: "Only deposits",
            isCorrect: false,
          },
          {
            text: "Staff birthdays, weather, traffic and news",
            isCorrect: false,
          },
        ],
      },
      {
        text: "The bank NPL ratio rose every month. What is the next step?",
        type: "multiple_choice",
        points: 1,
        explanation: "use the branch table",
        answers: [
          {
            text: "Remove the chart",
            isCorrect: false,
          },
          {
            text: "Wait a year",
            isCorrect: false,
          },
          {
            text: "Use the branch table to find which branch drives the rise",
            isCorrect: true,
          },
          {
            text: "Average the ratios",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 17,
    moduleTitle: "Data Analytics in Telecommunications",
    moduleDescription: "Learners apply their skills to the fictional Connectwave Telecom: how operators use data, analysing customer churn, measuring network performance and call drop rates, and building a customer and network dashboard. Data files (April–June 2026, the second quarter): connectwave_customers_2026.csv (400 subscribers, with whether each one left during the quarter) and connectwave_network_daily.csv (728 rows: 8 network sites × 91 days). Monthly bills are plain numbers with no currency. All code was run in Python 3 with Pandas 2.3, and the outputs shown are the actual results. The Power BI steps in Lesson 17.4 have not yet been clicked through (see the status section).",
    lessons: [
      {
        title: "How telecom operators use data",
        order: 1,
        durationMinutes: 70,
        videoUrl: "https://www.youtube.com/watch?v=jmymVdxbKWU",
        content: "**Files for this lesson:** [connectwave_customers_2026.csv](/course-files/data-analytics/connectwave_customers_2026.csv) · [connectwave_network_daily.csv](/course-files/data-analytics/connectwave_network_daily.csv). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** how a mobile operator earns money, where its data comes from, and the KPIs it uses for customers and the network.\n- **Why it matters:** telecom operators collect huge amounts of data on every call, text and data session. They employ analysts in marketing, customer experience, network planning and finance.\n- **After this lesson you can:** explain the main telecom KPIs and calculate churn and ARPU in Python.\n- **Estimated time:** 70 minutes.\n\n## The topic in simple English\n\nA mobile operator sells airtime, data bundles and plans. It earns more when it keeps customers longer and when they use more. Customers leave (\"churn\") when they are unhappy with the price, service or network, or when a rival makes a better offer. Analysts watch two sides at once: the customers (who is leaving and why) and the network (where calls fail and data is slow).\n\n## Learning objectives\n\n1. Name the main telecom data sources.\n2. Define churn rate, ARPU and call drop rate.\n3. Explain the difference between prepaid and contract customers.\n4. Calculate churn rate and ARPU by plan.\n5. Estimate the monthly revenue lost through churn.\n\n## Main teaching content\n\n**1. Data sources**\n\n| Source | What it records |\n| --- | --- |\n| Call detail records (CDRs) | Every call, text and data session: who, when, how long, which site |\n| Network management systems | Site performance: calls attempted and dropped, speeds, outages |\n| Billing | Plans, bills, top-ups and payments |\n| Customer relationship management (CRM) | Contacts, complaints, offers and cancellations |\n| Surveys | Satisfaction and net promoter score |\n\n**2. Key KPIs**\n\n| KPI | Formula |\n| --- | --- |\n| Churn rate | customers who left in the period ÷ customers at the start × 100 |\n| ARPU (average revenue per user) | total revenue ÷ number of subscribers |\n| Call drop rate | dropped calls ÷ calls attempted × 100 |\n| Average data speed | mean of measured download speeds (Mbps) |\n| Outage minutes | minutes a site was not serving customers |\n\nAlways state the period: a **monthly** churn rate and a **quarterly** churn rate are very different numbers.\n\n**3. Prepaid and contract**\n\nPrepaid customers pay in advance and can leave at any time without telling the operator, so operators often count them as churned after a set number of days with no activity. Contract customers sign up for a fixed term. Prepaid churn is usually higher.\n\n**4. Why churn matters**\n\nEvery customer who leaves takes their monthly revenue with them, and replacing them costs money in marketing and offers. Even a small fall in churn can protect a lot of revenue.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Churn | Customers ending their service in a period | Customers leaving | Members leaving a gym | 81 of 400 in Q2 |\n| ARPU | Average revenue per user over a period | Average bill | Average spend per café customer | 51.19 per month |\n| CDR | A record created for each call, text or data session | The phone's receipt | A till receipt | A 4-minute call on site S03 |\n| Site | A mast or tower serving an area | The mast | A local post office | S06 in the West region |\n| Call drop | A call that ends unexpectedly because of the network | Call cut off | A conversation interrupted | 1.20% of calls in Q2 |\n\n## Step-by-step demonstration: Connectwave's churn and ARPU\n\nUpload both Connectwave files.\n\n1. Load and inspect:\n\n```python\nimport pandas as pd\nsubs = pd.read_csv(\"connectwave_customers_2026.csv\")\nprint(subs.shape)\n```\n\nOutput: `(400, 11)`. Columns: customer\\_id, region, home\\_site, plan, contract, tenure\\_months, data\\_usage\\_gb, monthly\\_bill, complaints\\_6m, dropped\\_calls\\_30d and churned\\_q2.\n\n2. Churn rate and ARPU:\n\n```python\nsubs[\"churn_flag\"] = (subs[\"churned_q2\"] == \"Yes\").astype(int)\nprint(subs[\"churn_flag\"].sum(), round(subs[\"churn_flag\"].mean() * 100, 1))\nprint(round(subs[\"monthly_bill\"].mean(), 2), subs[\"monthly_bill\"].sum())\n```\n\nOutput: `81 20.2` and `51.19 20475`. In the quarter, 81 of 400 subscribers left: **20.2% quarterly churn**. ARPU is 51.19 a month, from total monthly bills of 20,475.\n\n3. By plan:\n\n```python\nsubs.groupby(\"plan\").agg(subscribers=(\"customer_id\", \"count\"), arpu=(\"monthly_bill\", \"mean\"), avg_gb=(\"data_usage_gb\", \"mean\")).round(1)\n```\n\nBasic 194 subscribers, ARPU 31.1, 4.0 GB; Premium 82, 91.9, 29.3 GB; Standard 124, 55.8, 11.8 GB.\n\n4. Revenue lost:\n\n```python\nlost = subs.loc[subs[\"churn_flag\"] == 1, \"monthly_bill\"].sum()\nprint(lost, round(lost / subs[\"monthly_bill\"].sum() * 100, 1))\n```\n\nOutput: `4157 20.3`. Churners took 4,157 of monthly billing with them, 20.3% of the total.\n\n5. Inspect the network file: `net = pd.read_csv(\"connectwave_network_daily.csv\", parse_dates=[\"date\"])`. It has 728 rows, 8 sites, from 2026-04-01 to 2026-06-30. Lesson 17.3 analyses it.\n\n## Practical exercise\n\n- **Task:** churn and revenue by region.\n- **Steps:** for each region, calculate subscribers, churners, churn rate and monthly revenue lost.\n- **Expected output:** West has the highest churn rate, 27.6% (29 of 105).\n- **Submit:** your notebook link.\n\n## Knowledge check\n\n1. What does ARPU measure?\n   - A) The number of masts\n   - B) The average revenue per subscriber in a period\n   - C) The share of calls dropped\n   - D) The number of complaints\n2. Which records hold details of every call, text and data session?\n   - A) Surveys\n   - B) Billing addresses\n   - C) Staff rotas\n   - D) Call detail records (CDRs)\n3. 81 of 400 subscribers left during the quarter. What is the quarterly churn rate?\n   - A) 20.2%\n   - B) 81%\n   - C) 4.9%\n   - D) 400%\n4. Why is prepaid churn usually higher than contract churn?\n   - A) Prepaid customers pay more\n   - B) Prepaid networks are slower\n   - C) Prepaid customers can leave at any time without a fixed term\n   - D) Contract customers cannot make calls\n5. Why must you state the period of a churn rate?\n   - A) Monthly and quarterly churn rates are very different numbers\n   - B) Periods make charts colourful\n   - C) Churn is always yearly\n   - D) It is not necessary\n\n## Lesson summary\n\n1. Operators combine CDRs, network, billing, CRM and survey data.\n2. Churn rate, ARPU and call drop rate are core KPIs.\n3. Connectwave lost 81 of 400 subscribers in Q2 (20.2%).\n4. ARPU is 51.19; churners took 4,157 of monthly billing (20.3%).\n5. Always state the period for churn.\n\n## Completion check\n\n- [ ] I calculated churn rate and ARPU.\n- [ ] I calculated revenue lost through churn.\n- [ ] I can name five telecom data sources.",
      },
      {
        title: "Customer churn analysis",
        order: 2,
        durationMinutes: 85,
        videoUrl: "https://www.youtube.com/watch?v=iAhPEFaH_jo",
        content: "## Lesson introduction\n\n- **What you will study:** how to find which customers are most likely to leave, using churn rates by group and a simple, explainable risk score.\n- **Why it matters:** retention offers cost money. Sending them to the right customers saves money and keeps more customers.\n- **After this lesson you can:** compare churn across groups, build a points-based risk score and test how well it works.\n- **Estimated time:** 85 minutes.\n\n## The topic in simple English\n\nImagine a teacher wants to help pupils who might drop out. They notice that pupils who are new, often absent and unhappy are most at risk, so they give each pupil a point for each warning sign. Pupils with many points get help first. A churn risk score does the same for customers.\n\n## Learning objectives\n\n1. Calculate churn rate by contract type, tenure band and complaints.\n2. Explain why new customers often churn more.\n3. Build a points-based risk score.\n4. Test the score: churn rate by score band and the share of churners caught.\n5. Turn the score into a retention action list.\n\n## Main teaching content\n\n**1. Churn by group**\n\nGroup customers by one factor at a time and compare churn rates, always with counts (Module 13). Look for factors with a clear, sensible pattern: churn rising steadily with complaints is more convincing than a random jump.\n\n**2. A points-based risk score**\n\n| Warning sign | Points |\n| --- | --- |\n| Prepaid | 2 |\n| Monthly (no fixed term) | 1 |\n| Tenure of 12 months or less | 2 |\n| Two or more complaints in six months | 2 |\n\nAdd the points: 0–1 Low, 2–3 Medium, 4–6 High. The weights come from the patterns in the data and business judgement. Scores like this are easy to explain to marketing teams.\n\n**3. Testing a score**\n\nTwo questions: is churn much higher in the High band (does it **separate**)? What share of all churners are in the High band (does it **catch**)? A score that catches every churner by putting everyone in High is useless.\n\n**4. Beyond simple scores**\n\nMachine learning models (such as logistic regression or decision trees) can weigh many factors at once and often predict better. They are covered in the Paleon AI & Machine Learning course. The testing questions stay the same.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Churn driver | A factor associated with higher churn | A reason people leave | Long queues driving shoppers away | Complaints |\n| Tenure | How long a customer has been with the company | How long they've stayed | Years at a school | 6 months |\n| Risk score | A number estimating how likely an outcome is | Warning points | Points on a driving licence | Score 4 = High risk |\n| Separation | How different the outcome is between score bands | Does the score tell groups apart? | Exam marks of revisers against non-revisers | High 33.1% against Low 12.2% |\n| Capture rate | Share of all cases found in the targeted group | How many we catch | Fish caught by a net | 56.8% of churners in High |\n\n## Step-by-step demonstration: Connectwave churn drivers and a risk score\n\nKeep `subs` from Lesson 17.1.\n\n1. Churn by contract: `subs.groupby(\"contract\")[\"churn_flag\"].agg([\"sum\", \"count\", \"mean\"])`. 12-month 13.5% (10 of 74); Monthly 18.9% (25 of 132); Prepaid 23.7% (46 of 194).\n2. Churn by tenure band:\n\n```python\nsubs[\"tenure_band\"] = pd.cut(subs[\"tenure_months\"], bins=[0, 6, 12, 24, 72], labels=[\"0-6\", \"7-12\", \"13-24\", \"25+\"])\nsubs.groupby(\"tenure_band\", observed=True)[\"churn_flag\"].agg([\"sum\", \"count\", \"mean\"])\n```\n\n0–6 months 29.9% (26 of 87); 7–12 25.4% (18 of 71); 13–24 8.7% (4 of 46); 25+ 16.8% (33 of 196). Customers in their first year leave most.\n\n3. Churn by complaints: 0 complaints 14.7% (25 of 170); 1, 18.3% (21 of 115); 2, 26.6% (17 of 64); 3, 35.3% (18 of 51). Churn rises with every complaint.\n4. Build the score:\n\n```python\nsubs[\"risk_score\"] = 0\nsubs.loc[subs[\"contract\"] == \"Prepaid\", \"risk_score\"] += 2\nsubs.loc[subs[\"contract\"] == \"Monthly\", \"risk_score\"] += 1\nsubs.loc[subs[\"tenure_months\"] <= 12, \"risk_score\"] += 2\nsubs.loc[subs[\"complaints_6m\"] >= 2, \"risk_score\"] += 2\nsubs[\"risk_band\"] = pd.cut(subs[\"risk_score\"], bins=[-1, 1, 3, 6], labels=[\"Low\", \"Medium\", \"High\"])\nsubs.groupby(\"risk_band\", observed=True)[\"churn_flag\"].agg([\"sum\", \"count\", \"mean\"])\n```\n\nOutput: Low 12.2% (11 of 90); Medium 14.0% (24 of 171); High **33.1%** (46 of 139).\n\n5. Test it. High-risk customers churn at nearly three times the Low rate (separation). The 139 High customers are 35% of subscribers but contain 46 of the 81 churners, 56.8% (capture). The score helps, but it misses 35 churners, so a fourth warning sign may be needed: Lesson 17.3 and the assignment look at the network.\n6. **Action list:** sort the customers who are still active by score, highest first, and give the list to the retention team with the reason for each score.\n\n## Practical exercise\n\n- **Task:** churn by plan and by data usage.\n- **Steps:** calculate churn by plan; create usage bands with `pd.qcut(subs[\"data_usage_gb\"], 4)`; calculate churn by band; decide whether either should be added to the score.\n- **Expected output:** churn by plan Basic 21.1%, Premium 22.0%, Standard 17.7%: no clear pattern by plan, so plan is a weak addition to the score.\n- **Submit:** your notebook link and one paragraph.\n\n## Knowledge check\n\n1. Which group has the highest churn rate at Connectwave?\n   - A) 12-month contract customers\n   - B) Customers with 13–24 months' tenure\n   - C) Prepaid customers\n   - D) Customers with no complaints\n2. What makes a churn driver convincing?\n   - A) A clear, sensible pattern backed by counts, such as churn rising with each complaint\n   - B) One unusual group of three customers\n   - C) A random jump between groups\n   - D) A colourful chart\n3. A customer is prepaid, has 4 months' tenure and 1 complaint. What is their risk score?\n   - A) 2\n   - B) 3\n   - C) 6\n   - D) 4\n4. What does the capture rate of a score tell you?\n   - A) The average bill\n   - B) The share of all churners who fall in the targeted (High) group\n   - C) The number of sites\n   - D) The churn rate of the Low group\n5. Which code adds 2 points to every prepaid customer?\n   - A) `subs[\"risk_score\"] = 2`\n   - B) `subs[\"contract\"] + 2`\n   - C) `subs.groupby(\"contract\").sum()`\n   - D) `subs.loc[subs[\"contract\"] == \"Prepaid\", \"risk_score\"] += 2`\n\n## Lesson summary\n\n1. Compare churn across groups, with counts, one factor at a time.\n2. At Connectwave, prepaid, new and complaining customers churn most.\n3. A points score turns warning signs into a simple risk rating.\n4. Test scores for separation and capture.\n5. The High band churns at 33.1% and holds 56.8% of churners.\n\n## Completion check\n\n- [ ] I found three churn drivers with counts.\n- [ ] I built and tested the risk score.\n- [ ] I can explain separation and capture.",
      },
      {
        title: "Network performance and call drop rates",
        order: 3,
        durationMinutes: 80,
        videoUrl: "https://www.youtube.com/watch?v=unUxQ3R5zLc",
        content: "## Lesson introduction\n\n- **What you will study:** how to measure network quality by site and over time, find problem sites, and link network problems to customer experience.\n- **Why it matters:** a poor network is a major reason customers leave. Network teams need analysts to show where to invest first.\n- **After this lesson you can:** calculate drop rates correctly, spot a deteriorating site and check its link with outages.\n- **Estimated time:** 80 minutes.\n\n## The topic in simple English\n\nIf a bus route's buses keep breaking down, passengers on that route get fed up first. Network sites are the same: each mast serves an area, and when one mast has problems, the customers who rely on it feel it. The analyst finds which mast is struggling, since when, and why.\n\n## Learning objectives\n\n1. Calculate the call drop rate from totals, by site and by month.\n2. Rank sites and spot a deteriorating trend.\n3. Compare data speeds over time.\n4. Check the relationship between outages and dropped calls.\n5. Explain why network and customer data should be joined.\n\n## Main teaching content\n\n**1. Rates from totals**\n\nThe drop rate for a site or month is total dropped ÷ total attempted, not the average of daily rates (Module 16: ratios from totals). Days with more calls should count more.\n\n**2. Look at level and trend**\n\nA site can have a high rate that is stable (perhaps difficult terrain) or a normal rate that is worsening (something has changed). Worsening sites usually need action first.\n\n**3. Weekdays and weekends**\n\nCall volumes differ by day of the week: at Connectwave, the average site handles about 4,824 calls on a weekday and 3,780 at weekends. Compare like with like, or use whole weeks or months.\n\n**4. Outages**\n\nAn outage is a period when a site stops serving customers, for example after a power or equipment failure. Outages usually cause dropped calls and slow data. Correlation (Module 7) helps confirm the link, but engineers confirm the cause.\n\n**5. Join network to customers**\n\nEach customer has a home site. Joining customer data to site performance shows whether customers on poor sites complain and leave more: the link between network investment and revenue.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Drop rate | Dropped calls ÷ calls attempted × 100 | Share of calls cut off | Share of buses breaking down | 1.20% in Q2 |\n| Outage | A period when a site is not serving customers | The mast is down | A power cut | 1,195 minutes at S06 |\n| Throughput / speed | Data delivered per second, in megabits per second (Mbps) | How fast data loads | Water flow from a tap | 13.8 Mbps at S06 in June |\n| Home site | The site that mainly serves a customer | Their local mast | Your local bus stop | C0001's home site |\n| Deterioration | A worsening trend over time | Getting worse | A tyre slowly losing air | S06 from 1.07% to 2.90% |\n\n## Step-by-step demonstration: Connectwave's network in Q2\n\nKeep `net` from Lesson 17.1.\n\n1. Drop rate by site, from totals:\n\n```python\nsites = net.groupby([\"site_id\", \"region\"])[[\"calls_attempted\", \"calls_dropped\", \"outage_minutes\"]].sum()\nsites[\"drop_rate_%\"] = (sites[\"calls_dropped\"] / sites[\"calls_attempted\"] * 100).round(2)\nsites.sort_values(\"drop_rate_%\", ascending=False)\n```\n\nS06 (West) is worst at 1.90% with 1,195 outage minutes; the other seven sites range from 0.88% (S04) to 1.26% (S02 and S03). Across the network: 3,294,592 calls attempted, 39,562 dropped, **1.20%**, and 2,040 outage minutes.\n\n2. By month:\n\n```python\nnet[\"month\"] = net[\"date\"].dt.month\nm = net.groupby([\"site_id\", \"month\"])[[\"calls_attempted\", \"calls_dropped\"]].sum()\nm[\"drop_rate_%\"] = (m[\"calls_dropped\"] / m[\"calls_attempted\"] * 100).round(2)\nm[\"drop_rate_%\"].unstack()\n```\n\nEvery site is steady except S06: **1.07% in April, 1.73% in May, 2.90% in June**.\n\n3. Data speed: `net.groupby([\"site_id\", \"month\"])[\"avg_speed_mbps\"].mean().round(1).unstack()`. S06 fell from 19.3 to 17.6 to 13.8 Mbps; S01, for comparison, stayed between 21.5 and 22.4.\n4. Outages: `net[\"outage_minutes\"].corr(net[\"calls_dropped\"])` gives **0.82**, a strong positive relationship. S06 had outages on 15 days, 13 of them from 25 May onwards, and 1,154 of its 1,195 outage minutes came in that period. Something changed at S06 in late May: the network engineers should be asked what.\n5. Write the finding: \"S06's drop rate nearly tripled from April to June, its speeds fell by about 30%, and outages became frequent from 25 May. The other seven sites were stable.\"\n\n## Practical exercise\n\n- **Task:** a weekly view of S06.\n- **Steps:** filter to S06, group by week (`net[\"date\"].dt.to_period(\"W\")`), calculate the drop rate from totals and outage minutes per week, and draw a line chart.\n- **Expected output:** a clear step up from the last week of May.\n- **Submit:** your notebook link and chart.\n\n## Knowledge check\n\n1. How should a site's monthly drop rate be calculated?\n   - A) Total dropped ÷ total attempted for the month\n   - B) The average of daily drop rates\n   - C) The highest daily rate\n   - D) Dropped calls only\n2. Which site needs attention first?\n   - A) A site with a stable 1.26% rate\n   - B) A site with a stable 0.88% rate\n   - C) A site whose rate rose from 1.07% to 2.90% in three months\n   - D) All sites equally\n3. The correlation between outage minutes and dropped calls is 0.82. What does this show?\n   - A) Outages are unrelated to drops\n   - B) A strong positive relationship; engineers should confirm the cause\n   - C) Outages are proven to cause every drop\n   - D) The data is wrong\n4. Why compare whole weeks or months rather than single days?\n   - A) Single days are always wrong\n   - B) Pandas cannot handle days\n   - C) Months are shorter\n   - D) Call volumes differ between weekdays and weekends\n5. Why join network data to customer data?\n   - A) To make the file larger\n   - B) To see whether customers on poor sites complain and leave more\n   - C) To remove outages\n   - D) It is not useful\n\n## Lesson summary\n\n1. Calculate drop rates from totals.\n2. Watch both level and trend; worsening sites come first.\n3. Compare like with like: whole weeks or months.\n4. Outages and drops are strongly related (0.82) at Connectwave.\n5. S06 deteriorated sharply from late May.\n\n## Completion check\n\n- [ ] I ranked sites by drop rate.\n- [ ] I found S06's deterioration by month.\n- [ ] I checked the outage-drop relationship.",
      },
      {
        title: "Building a customer and network dashboard",
        order: 4,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=ImBgUbRrw3A",
        content: "## Lesson introduction\n\n- **What you will study:** how to design one dashboard that shows customer health and network quality together, so managers can see the link between them.\n- **Why it matters:** marketing, customer service and network teams often work separately. A shared dashboard helps them act together.\n- **After this lesson you can:** build a combined dashboard with region and site filters and explain it.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nA combined dashboard is like a doctor's chart that shows both symptoms (customers leaving) and test results (the network failing). Seeing both on one page makes the connection obvious, and points to the treatment.\n\n## Learning objectives\n\n1. Choose customer and network KPIs for one dashboard.\n2. Model the two files so a region or site filter works on both.\n3. Write measures for churn rate, ARPU and drop rate.\n4. Build the dashboard and check its numbers.\n5. Brief marketing and network managers together.\n\n## Main teaching content\n\n**1. Layout**\n\n| Area | Content |\n| --- | --- |\n| Top row cards | Subscribers, churn rate, ARPU, monthly revenue lost, network drop rate |\n| Left | Churn rate by risk band and by contract |\n| Right | Drop rate by site, and by month for the selected site |\n| Bottom | Churn rate and drop rate by site, side by side |\n| Filters | Region, site |\n\n**2. Modelling**\n\nThe customer file has one row per customer with a home\\_site; the network file has one row per site per day. Create a **Sites** table (site\\_id, region) and relate it to both files, so one site or region slicer filters both sides (Modules 10 and 15).\n\n**3. Measures (Power BI DAX)**\n\n```\nSubscribers = COUNTROWS(customers)\nChurn rate = DIVIDE(COUNTROWS(FILTER(customers, customers[churned_q2] = \"Yes\")), [Subscribers])\nARPU = AVERAGE(customers[monthly_bill])\nDrop rate = DIVIDE(SUM(network[calls_dropped]), SUM(network[calls_attempted]))\n```\n\n**4. One message**\n\nThe dashboard should make the main message obvious: here, where the network got worse, customers left. Use colour to highlight S06 and the West region.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Shared dimension | A table that filters two or more fact tables | A common filter | One remote for two screens | Sites table |\n| Combined dashboard | A dashboard joining data from different teams | One page, two views | A school report with marks and attendance | Churn and network |\n| Revenue at risk | Revenue from customers likely to leave | Money we might lose | Rent from tenants who may move | Monthly bills of High-risk customers |\n| Drill-down | Moving from a summary to more detail | Zooming in | From country to town on a map | Region to site to month |\n| Cross-filtering | Selecting a value in one visual filters others | Click to filter | Selecting a playlist shows its songs | Click S06 to see its customers |\n\n## Step-by-step demonstration: the Connectwave dashboard\n\n1. Load both files as **customers** and **network**. Create the **Sites** table with **Enter data** (S01 North, S02 North, S03 South, S04 South, S05 East, S06 West, S07 West, S08 East). Relate Sites\\[site\\_id\\] to customers\\[home\\_site\\] and to network\\[site\\_id\\].\n2. Create the measures in D.3.\n3. **Cards:** Subscribers 400; Churn rate 20.2%; ARPU 51.19; Drop rate 1.20%.\n4. **Visuals:** a column chart of churn rate by contract; a bar chart of drop rate by site; a line chart of drop rate by month; a table by site with subscribers, churn rate and drop rate.\n5. **Check:** select S06 in the slicer. Drop rate should show 1.90%; the monthly line should show 1.07%, 1.73% and 2.90%.\n6. **Python check** of churn by home site:\n\n```python\nsubs.groupby(\"home_site\")[\"churn_flag\"].agg([\"sum\", \"count\", \"mean\"]).round(3)\n```\n\nS06's subscribers churned at 37.9% (22 of 58); no other site is above 22.2%.\n\n7. **Brief both teams:** \"Connectwave lost 20.2% of subscribers in Q2. Site S06, whose drop rate rose from 1.07% to 2.90%, had the highest churn, 37.9%. Fixing S06 is a network priority, and its customers should be first on the retention list.\"\n\n## Practical exercise\n\n- **Task:** revenue at risk.\n- **Steps:** add a card for \"monthly revenue at risk\": the sum of monthly bills of High-risk customers (Lesson 17.2) who have not yet churned. In Python, calculate the same figure.\n- **Expected output:** one number, with a one-sentence explanation of what it means.\n- **Submit:** a screenshot of the card and your Python check.\n\n## Knowledge check\n\n1. Why create a Sites table related to both files?\n   - A) To delete outages\n   - B) To make the file smaller\n   - C) Power BI requires one\n   - D) So one site or region slicer filters both customer and network visuals\n2. Which DAX measure gives the drop rate?\n   - A) `SUM(network[calls_dropped])`\n   - B) `DIVIDE(SUM(network[calls_dropped]), SUM(network[calls_attempted]))`\n   - C) `AVERAGE(network[calls_attempted])`\n   - D) `COUNTROWS(network)`\n3. After selecting S06, the monthly drop rate shows 1.07%, 1.73% and 2.90%. What does this confirm?\n   - A) The slicer is broken\n   - B) S06 improved\n   - C) The dashboard matches the Python analysis\n   - D) All sites are the same\n4. What is revenue at risk?\n   - A) Monthly revenue from customers likely to leave\n   - B) Revenue already received\n   - C) The cost of a new mast\n   - D) ARPU multiplied by sites\n5. What should the dashboard's main message be?\n   - A) A list of every column\n   - B) That data is complicated\n   - C) Where the network got worse, customers left\n   - D) The colour scheme\n\n## Lesson summary\n\n1. One dashboard can show customers and network together.\n2. A shared Sites table lets one slicer filter both.\n3. Measures: churn rate, ARPU, drop rate, revenue at risk.\n4. S06 had the worst network trend and the highest churn (37.9%).\n5. Brief both teams with one shared message.\n\n## Completion check\n\n- [ ] I modelled both files with a Sites table.\n- [ ] My dashboard numbers match the Python checks.\n- [ ] I briefed the dashboard to both teams.",
      },
    ],
    assignmentTitle: "Connectwave West region retention and network plan",
    assignmentDescription: "Connectwave's commercial director and network director want a joint plan: \"Churn in the West region is higher than elsewhere.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "Total monthly bills are 20,475 from 400 subscribers. What is ARPU?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "51.19",
            isCorrect: true,
          },
          {
            text: "400",
            isCorrect: false,
          },
          {
            text: "20,475",
            isCorrect: false,
          },
          {
            text: "5.12",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which data source records every call, text and data session?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Billing addresses",
            isCorrect: false,
          },
          {
            text: "Satisfaction surveys",
            isCorrect: false,
          },
          {
            text: "Call detail records",
            isCorrect: true,
          },
          {
            text: "The HR system",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Customers in their first six months churned at 29.9%, against 16.8% for those over two years. What does this suggest?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Tenure has no effect",
            isCorrect: false,
          },
          {
            text: "Newer customers are more likely to leave",
            isCorrect: true,
          },
          {
            text: "Older customers always leave",
            isCorrect: false,
          },
          {
            text: "The data is wrong",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A risk score puts 35% of customers in High, and they include 56.8% of churners. The 56.8% is the:",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "churn rate",
            isCorrect: false,
          },
          {
            text: "ARPU",
            isCorrect: false,
          },
          {
            text: "drop rate",
            isCorrect: false,
          },
          {
            text: "capture rate",
            isCorrect: true,
          },
        ],
      },
      {
        text: "A site had 400,000 call attempts and 7,600 drops. What is its drop rate?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "1.9%",
            isCorrect: true,
          },
          {
            text: "7.6%",
            isCorrect: false,
          },
          {
            text: "0.19%",
            isCorrect: false,
          },
          {
            text: "19%",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why calculate a month's drop rate from totals rather than averaging daily rates?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Averages are illegal",
            isCorrect: false,
          },
          {
            text: "Daily rates are always zero",
            isCorrect: false,
          },
          {
            text: "Totals are smaller",
            isCorrect: false,
          },
          {
            text: "Busier days should count more",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which site needs investigating first?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "A stable site at 1.2%",
            isCorrect: false,
          },
          {
            text: "A stable site at 0.9%",
            isCorrect: false,
          },
          {
            text: "A site worsening from 1.1% to 2.9%",
            isCorrect: true,
          },
          {
            text: "The site with the most customers",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does joining customer data to network data allow?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Deleting churners",
            isCorrect: false,
          },
          {
            text: "Seeing whether customers on poor sites leave more",
            isCorrect: true,
          },
          {
            text: "Raising prices",
            isCorrect: false,
          },
          {
            text: "Removing outages",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Machine learning models for churn should be tested on:",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "separation and capture, like a points score",
            isCorrect: true,
          },
          {
            text: "colour and layout",
            isCorrect: false,
          },
          {
            text: "the number of columns",
            isCorrect: false,
          },
          {
            text: "nothing",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is NOT a telecom KPI?",
        type: "multiple_choice",
        points: 1,
        explanation: null,
        answers: [
          {
            text: "Churn rate",
            isCorrect: false,
          },
          {
            text: "ARPU",
            isCorrect: false,
          },
          {
            text: "The colour of the shop signs",
            isCorrect: true,
          },
          {
            text: "Call drop rate",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does ARPU measure?",
        type: "multiple_choice",
        points: 1,
        explanation: "average revenue per subscriber",
        answers: [
          {
            text: "The number of masts",
            isCorrect: false,
          },
          {
            text: "The average revenue per subscriber in a period",
            isCorrect: true,
          },
          {
            text: "The share of calls dropped",
            isCorrect: false,
          },
          {
            text: "The number of complaints",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which records hold details of every call, text and data session?",
        type: "multiple_choice",
        points: 1,
        explanation: "call detail records",
        answers: [
          {
            text: "Surveys",
            isCorrect: false,
          },
          {
            text: "Billing addresses",
            isCorrect: false,
          },
          {
            text: "Staff rotas",
            isCorrect: false,
          },
          {
            text: "Call detail records (CDRs)",
            isCorrect: true,
          },
        ],
      },
      {
        text: "81 of 400 subscribers left during the quarter. What is the quarterly churn rate?",
        type: "multiple_choice",
        points: 1,
        explanation: "20.2%",
        answers: [
          {
            text: "20.2%",
            isCorrect: true,
          },
          {
            text: "81%",
            isCorrect: false,
          },
          {
            text: "4.9%",
            isCorrect: false,
          },
          {
            text: "400%",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why is prepaid churn usually higher than contract churn?",
        type: "multiple_choice",
        points: 1,
        explanation: "can leave at any time",
        answers: [
          {
            text: "Prepaid customers pay more",
            isCorrect: false,
          },
          {
            text: "Prepaid networks are slower",
            isCorrect: false,
          },
          {
            text: "Prepaid customers can leave at any time without a fixed term",
            isCorrect: true,
          },
          {
            text: "Contract customers cannot make calls",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why must you state the period of a churn rate?",
        type: "multiple_choice",
        points: 1,
        explanation: "monthly and quarterly differ greatly",
        answers: [
          {
            text: "Monthly and quarterly churn rates are very different numbers",
            isCorrect: true,
          },
          {
            text: "Periods make charts colourful",
            isCorrect: false,
          },
          {
            text: "Churn is always yearly",
            isCorrect: false,
          },
          {
            text: "It is not necessary",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which group has the highest churn rate at Connectwave?",
        type: "multiple_choice",
        points: 1,
        explanation: "prepaid",
        answers: [
          {
            text: "12-month contract customers",
            isCorrect: false,
          },
          {
            text: "Customers with 13–24 months' tenure",
            isCorrect: false,
          },
          {
            text: "Prepaid customers",
            isCorrect: true,
          },
          {
            text: "Customers with no complaints",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What makes a churn driver convincing?",
        type: "multiple_choice",
        points: 1,
        explanation: "a clear, sensible pattern with counts",
        answers: [
          {
            text: "A clear, sensible pattern backed by counts, such as churn rising with each complaint",
            isCorrect: true,
          },
          {
            text: "One unusual group of three customers",
            isCorrect: false,
          },
          {
            text: "A random jump between groups",
            isCorrect: false,
          },
          {
            text: "A colourful chart",
            isCorrect: false,
          },
        ],
      },
      {
        text: "A customer is prepaid, has 4 months' tenure and 1 complaint. What is their risk score?",
        type: "multiple_choice",
        points: 1,
        explanation: "4 (2 + 2 + 0)",
        answers: [
          {
            text: "2",
            isCorrect: false,
          },
          {
            text: "3",
            isCorrect: false,
          },
          {
            text: "6",
            isCorrect: false,
          },
          {
            text: "4",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What does the capture rate of a score tell you?",
        type: "multiple_choice",
        points: 1,
        explanation: "share of churners in High",
        answers: [
          {
            text: "The average bill",
            isCorrect: false,
          },
          {
            text: "The share of all churners who fall in the targeted (High) group",
            isCorrect: true,
          },
          {
            text: "The number of sites",
            isCorrect: false,
          },
          {
            text: "The churn rate of the Low group",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which code adds 2 points to every prepaid customer?",
        type: "multiple_choice",
        points: 1,
        explanation: "the .loc[...] += 2 line",
        answers: [
          {
            text: "subs[\"risk_score\"] = 2",
            isCorrect: false,
          },
          {
            text: "subs[\"contract\"] + 2",
            isCorrect: false,
          },
          {
            text: "subs.groupby(\"contract\").sum()",
            isCorrect: false,
          },
          {
            text: "subs.loc[subs[\"contract\"] == \"Prepaid\", \"risk_score\"] += 2",
            isCorrect: true,
          },
        ],
      },
      {
        text: "How should a site's monthly drop rate be calculated?",
        type: "multiple_choice",
        points: 1,
        explanation: "totals for the month",
        answers: [
          {
            text: "Total dropped ÷ total attempted for the month",
            isCorrect: true,
          },
          {
            text: "The average of daily drop rates",
            isCorrect: false,
          },
          {
            text: "The highest daily rate",
            isCorrect: false,
          },
          {
            text: "Dropped calls only",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which site needs attention first?",
        type: "multiple_choice",
        points: 1,
        explanation: "the worsening site",
        answers: [
          {
            text: "A site with a stable 1.26% rate",
            isCorrect: false,
          },
          {
            text: "A site with a stable 0.88% rate",
            isCorrect: false,
          },
          {
            text: "A site whose rate rose from 1.07% to 2.90% in three months",
            isCorrect: true,
          },
          {
            text: "All sites equally",
            isCorrect: false,
          },
        ],
      },
      {
        text: "The correlation between outage minutes and dropped calls is 0.82. What does this show?",
        type: "multiple_choice",
        points: 1,
        explanation: "strong relationship, engineers confirm",
        answers: [
          {
            text: "Outages are unrelated to drops",
            isCorrect: false,
          },
          {
            text: "A strong positive relationship; engineers should confirm the cause",
            isCorrect: true,
          },
          {
            text: "Outages are proven to cause every drop",
            isCorrect: false,
          },
          {
            text: "The data is wrong",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why compare whole weeks or months rather than single days?",
        type: "multiple_choice",
        points: 1,
        explanation: "weekday and weekend volumes differ",
        answers: [
          {
            text: "Single days are always wrong",
            isCorrect: false,
          },
          {
            text: "Pandas cannot handle days",
            isCorrect: false,
          },
          {
            text: "Months are shorter",
            isCorrect: false,
          },
          {
            text: "Call volumes differ between weekdays and weekends",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Why join network data to customer data?",
        type: "multiple_choice",
        points: 1,
        explanation: "see whether poor sites lose customers",
        answers: [
          {
            text: "To make the file larger",
            isCorrect: false,
          },
          {
            text: "To see whether customers on poor sites complain and leave more",
            isCorrect: true,
          },
          {
            text: "To remove outages",
            isCorrect: false,
          },
          {
            text: "It is not useful",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why create a Sites table related to both files?",
        type: "multiple_choice",
        points: 1,
        explanation: "one slicer filters both",
        answers: [
          {
            text: "To delete outages",
            isCorrect: false,
          },
          {
            text: "To make the file smaller",
            isCorrect: false,
          },
          {
            text: "Power BI requires one",
            isCorrect: false,
          },
          {
            text: "So one site or region slicer filters both customer and network visuals",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Which DAX measure gives the drop rate?",
        type: "multiple_choice",
        points: 1,
        explanation: "DIVIDE dropped by attempted",
        answers: [
          {
            text: "SUM(network[calls_dropped])",
            isCorrect: false,
          },
          {
            text: "DIVIDE(SUM(network[calls_dropped]), SUM(network[calls_attempted]))",
            isCorrect: true,
          },
          {
            text: "AVERAGE(network[calls_attempted])",
            isCorrect: false,
          },
          {
            text: "COUNTROWS(network)",
            isCorrect: false,
          },
        ],
      },
      {
        text: "After selecting S06, the monthly drop rate shows 1.07%, 1.73% and 2.90%. What does this confirm?",
        type: "multiple_choice",
        points: 1,
        explanation: "matches the Python analysis",
        answers: [
          {
            text: "The slicer is broken",
            isCorrect: false,
          },
          {
            text: "S06 improved",
            isCorrect: false,
          },
          {
            text: "The dashboard matches the Python analysis",
            isCorrect: true,
          },
          {
            text: "All sites are the same",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is revenue at risk?",
        type: "multiple_choice",
        points: 1,
        explanation: "revenue from likely leavers",
        answers: [
          {
            text: "Monthly revenue from customers likely to leave",
            isCorrect: true,
          },
          {
            text: "Revenue already received",
            isCorrect: false,
          },
          {
            text: "The cost of a new mast",
            isCorrect: false,
          },
          {
            text: "ARPU multiplied by sites",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What should the dashboard's main message be?",
        type: "multiple_choice",
        points: 1,
        explanation: "where the network got worse, customers left",
        answers: [
          {
            text: "A list of every column",
            isCorrect: false,
          },
          {
            text: "That data is complicated",
            isCorrect: false,
          },
          {
            text: "Where the network got worse, customers left",
            isCorrect: true,
          },
          {
            text: "The colour scheme",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    weekNumber: 18,
    moduleTitle: "Final Capstone Project",
    moduleDescription: "Learners complete one capstone project from start to finish, the way an analyst would at work: plan it, prepare and analyse the data, build a dashboard and report, present it, and add it to a portfolio. There are four options, one for each industry in the course. Each option uses data files learners already know, so the effort goes into a complete, professional piece of work. There is no Module 18 quiz: the capstone replaces it and is marked out of 100 (see the rubric at the end of this module). The SQL in Lesson 18.2 was run in SQLite on the course files, with results checked against Python. DB Browser for SQLite's import screens have not yet been clicked through (see the status section).",
    lessons: [
      {
        title: "Choosing and planning your capstone",
        order: 1,
        durationMinutes: 60,
        videoUrl: "https://www.youtube.com/watch?v=csRK636TALQ",
        content: "**Files for this lesson:** [connectwave.db](/course-files/data-analytics/connectwave.db). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** the four capstone options, how to choose one, and how to write a project plan.\n- **Why it matters:** a capstone is the strongest evidence you can show an employer. A good plan keeps it focused and finished on time.\n- **After this lesson you can:** choose an option and write a one-page capstone plan with questions, KPIs, data, tasks and a timeline.\n- **Estimated time:** 60 minutes.\n\n## The topic in simple English\n\nBuilding a capstone is like building a house: you choose the plot, draw the plan, list the materials and set a timetable before laying a single brick. If you start without a plan, you run out of time with half a house.\n\n## Learning objectives\n\n1. Describe the four capstone options and their data.\n2. Choose an option that fits your career goal.\n3. Write three to five business questions and the KPIs that answer them.\n4. Plan the work across the week.\n5. List the required deliverables.\n\n## Main teaching content\n\n**1. The four options**\n\n| Option | Organisation | Data files | Good for careers in |\n| --- | --- | --- | --- |\n| A. Retail and business sales | Sunrise Mart (and Brightpath Services) | sunrise\\_fact\\_sales, sunrise\\_dim\\_branch, sunrise\\_dim\\_product, sunrise\\_customers, sunrise\\_sales, brightpath files | Retail, FMCG, general business |\n| B. Oil & gas and industrial operations | Delta Ridge Energy | delta\\_ridge\\_production, delta\\_ridge\\_maintenance, delta\\_ridge\\_safety | Energy, mining, manufacturing, utilities |\n| C. Banking and financial services | Harbour Bank | harbour\\_branch\\_monthly, harbour\\_txn\\_q1\\_2026, harbour\\_customers\\_clean | Banks, insurance, fintech, microfinance |\n| D. Telecommunications | Connectwave Telecom | connectwave\\_customers\\_2026, connectwave\\_network\\_daily, connectwave.db | Telecoms, customer experience, network analytics |\n\n**2. How to choose**\n\n- **Career fit:** pick the industry you want to work in.\n- **Data comfort:** if Python felt hard, choose an option you can do mostly in Excel, SQL and Power BI (all four allow this).\n- **Story:** pick the data where you can see a real decision to be made.\n\n**3. Required deliverables (every option)**\n\n1. A one-page project plan (this lesson).\n2. A data preparation stage in Excel or SQL, with a written data log.\n3. A dashboard (Power BI, or Excel with PivotCharts and slicers).\n4. A written report of two to three pages in the Module 14 format.\n5. A presentation of five to seven slides and a recording of under eight minutes.\n6. A short portfolio page describing the project.\n\n**4. The project plan**\n\nUse the analysis brief from Lesson 14.1, plus a timeline:\n\n| Day | Work |\n| --- | --- |\n| 1 | Plan and questions; agree them with your instructor |\n| 2 | Prepare the data and write the data log |\n| 3 | Analyse; answer each question with numbers |\n| 4 | Build the dashboard |\n| 5 | Write the report |\n| 6 | Build the slides; rehearse and record |\n| 7 | Check everything; publish the portfolio page; submit |\n\n**5. Scope**\n\nThree to five strong questions beat ten weak ones. Every question must lead to a decision someone could make.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Capstone | A final project that brings together everything learned | The final big project | A final exam performance | The Harbour branch review |\n| Scope | What a project will and will not cover | The edges of the job | Painting the kitchen, not the whole house | Q2 only, three branches |\n| Deliverable | A finished item handed over at the end | Something you hand in | A finished essay | The dashboard file |\n| Milestone | A checkpoint in a plan | A stop on the way | Finishing the walls before the roof | Data log done by day 2 |\n| Portfolio | A collection of work that shows your skills | A showcase | An artist's folder | A page linking your capstone |\n\n## Step-by-step demonstration: a plan for Option A\n\n1. **Option and reason:** \"Option A, Sunrise Mart, because I want to work in retail analytics.\"\n2. **Business questions:**\n   1. How did each branch perform in January–June 2026 against the same months of 2025?\n   2. Which categories and products drive growth or decline at each branch?\n   3. Why is Riverside falling, and what should the regional manager do?\n   4. What should the monthly KPI dashboard show?\n3. **KPIs:** revenue, units, average price per unit (revenue ÷ units), year-on-year growth for equal periods, branch share of revenue.\n4. **Data:** the three star-schema files (162 monthly rows, January 2025–June 2026); Brightpath finance files for an optional extension.\n5. **Tools:** SQL in DB Browser for SQLite for preparation, Power BI for the dashboard, Python optional for checks.\n6. **Timeline:** the seven-day table above.\n7. **Risks:** 2026 has only six months, so compare equal periods; no footfall data.\n\n## Practical exercise\n\n- **Task:** write your own capstone plan.\n- **Steps:** choose an option, write three to five business questions, define the KPIs with formulas, list the files and tools, fill in the timeline, and list two risks.\n- **Expected output:** one page, agreed with your instructor before you start Lesson 18.2.\n- **Submit:** your plan.\n\n## Knowledge check\n\n1. How many business questions should a capstone plan usually have?\n   - A) One\n   - B) Twenty or more\n   - C) Three to five strong questions\n   - D) None\n2. Which is the best reason to choose a capstone option?\n   - A) It fits the industry you want to work in, and you can see a real decision in the data\n   - B) It has the shortest file name\n   - C) A friend chose it\n   - D) It looks the easiest to copy\n3. Which is NOT a required capstone deliverable?\n   - A) A dashboard\n   - B) A written report\n   - C) A presentation and recording\n   - D) A printed copy of every data row\n4. What is scope?\n   - A) The colour of the dashboard\n   - B) What the project will and will not cover\n   - C) The number of slides\n   - D) The size of the data file\n5. Why agree the plan with your instructor before starting?\n   - A) To make sure the questions are clear and achievable before work begins\n   - B) Instructors like paperwork\n   - C) So the instructor can do the work\n   - D) It is not necessary\n\n## Lesson summary\n\n1. There are four options: retail, operations, banking and telecoms.\n2. Choose by career fit, data comfort and the decision in the data.\n3. Plan three to five questions with KPIs, data, tools, timeline and risks.\n4. Every option needs a plan, data log, dashboard, report, presentation and portfolio page.\n5. Agree the plan before starting.\n\n## Completion check\n\n- [ ] I chose an option and wrote why.\n- [ ] My plan has three to five questions with KPIs.\n- [ ] My plan was agreed with my instructor.",
      },
      {
        title: "Preparing and analysing the data",
        order: 2,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=W8BtakbgysQ",
        content: "**Files for this lesson:** [sunrise_dim_branch.csv](/course-files/data-analytics/sunrise_dim_branch.csv) · [sunrise_dim_product.csv](/course-files/data-analytics/sunrise_dim_product.csv) · [sunrise_fact_sales.csv](/course-files/data-analytics/sunrise_fact_sales.csv). All course files are also in one download: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).\n\n## Lesson introduction\n\n- **What you will study:** a reliable workflow for loading, checking and preparing capstone data in SQL or Excel, keeping a data log, and answering each question with evidence.\n- **Why it matters:** if the numbers are wrong, nothing else matters. Employers look for analysts who check their work.\n- **After this lesson you can:** load CSV files into SQLite, run preparation queries, reconcile totals and keep a data log.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nBefore cooking for guests, a good cook checks the ingredients: are they all there, are they fresh, is the amount right? Data preparation is the same: check the files, fix problems, make sure the totals add up, and write down what you did so someone else could repeat it.\n\n## Learning objectives\n\n1. Import CSV files into DB Browser for SQLite.\n2. Check row counts, data types and totals after import.\n3. Write SQL that joins tables and summarises equal periods.\n4. Reconcile results between two tools.\n5. Keep a data log.\n\n## Main teaching content\n\n**1. The preparation workflow**\n\n1. **Inspect:** rows, columns, types, missing values, duplicates (Modules 4 and 13).\n2. **Clean:** fix what is wrong, and log it.\n3. **Model:** join facts and dimensions (Module 10).\n4. **Reconcile:** do the totals match in two tools?\n5. **Analyse:** answer each business question with a query, table or chart.\n\n**2. Importing CSV files into SQLite**\n\nIn DB Browser for SQLite: **New Database**, then **File**, **Import**, **Table from CSV file**. Tick \"Column names in first line\". Repeat for each file. Imported columns may be stored as text; SQLite still calculates with them, but to sort or compare numbers safely use `CAST(column AS INTEGER)` or set the column types when importing.\n\n**3. The data log**\n\n| Date | File | Check or change | Result |\n| --- | --- | --- | --- |\n| Day 2 | sunrise\\_fact\\_sales | Row count after import | 162, as expected |\n| Day 2 | all three | Total revenue in SQL against Python | 20,031,300 in both |\n\n**4. Reconciliation**\n\nCalculate one or two key totals in two different ways (for example SQL and Power BI, or Excel and Python). If they differ, find out why before going further.\n\n**5. Answer every question with evidence**\n\nFor each business question, write the answer in one sentence with a number, and keep the query or table that produced it.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Import | Loading a file into a database or tool | Bringing data in | Unpacking shopping | CSV into SQLite |\n| Row count check | Confirming the number of rows loaded | Did everything arrive? | Counting parcels on delivery | 162 rows |\n| Reconciliation | Checking that totals agree across sources or tools | Do the numbers match? | Checking a receipt against your bank statement | 20,031,300 in SQL and Python |\n| Data log | A written record of checks and changes | A diary of the data work | A recipe's notes | Day 2 entries |\n| CAST | Converting a value from one type to another in SQL | Change text to number | Writing \"five\" as 5 | `CAST(quantity AS INTEGER)` |\n\n## Step-by-step demonstration: Option A data preparation in SQL\n\n1. In DB Browser for SQLite, create **capstone\\_a.db** and import sunrise\\_fact\\_sales.csv as **fact\\_sales**, sunrise\\_dim\\_branch.csv as **dim\\_branch** and sunrise\\_dim\\_product.csv as **dim\\_product**.\n2. Check the rows: `SELECT COUNT(*) AS rows_loaded FROM fact_sales;` returns **162**.\n3. Reconcile the total:\n\n```sql\nSELECT SUM(f.quantity * p.unit_price) AS total\nFROM fact_sales f\nJOIN dim_product p ON f.product_id = p.product_id;\n```\n\nResult: **20,031,300**, matching Modules 10 and 13. Log it.\n\n4. Equal-period comparison by branch:\n\n```sql\nSELECT b.branch,\n       SUM(CASE WHEN substr(f.month_start, 1, 4) = '2025'\n                 AND CAST(substr(f.month_start, 6, 2) AS INTEGER) <= 6\n                THEN f.quantity * p.unit_price ELSE 0 END) AS h1_2025,\n       SUM(CASE WHEN substr(f.month_start, 1, 4) = '2026'\n                THEN f.quantity * p.unit_price ELSE 0 END) AS h1_2026\nFROM fact_sales f\nJOIN dim_branch b ON f.branch_id = b.branch_id\nJOIN dim_product p ON f.product_id = p.product_id\nGROUP BY b.branch\nORDER BY h1_2026 DESC;\n```\n\nResult: Hilltop 2,757,700 → 3,086,650; Central 2,142,300 → 2,315,600; Riverside 1,444,600 → 1,404,000. `substr(month_start, 1, 4)` takes the year from the date text, and `CASE WHEN` adds a row's revenue only when it falls in that half-year (Module 6).\n\n5. **Answer question 1** in one sentence: \"Hilltop grew 11.9% and Central 8.1% in January–June 2026 against the same months of 2025, while Riverside fell 2.8%.\"\n6. Save each query in a text file named after the question it answers.\n\n## Practical exercise\n\n- **Task:** prepare your own capstone data.\n- **Steps:** import or open your option's files; complete the row-count, type and missing-value checks; reconcile one total in two tools; write at least five data log entries; answer your first business question with a query or table.\n- **Expected output:** a data log and one answered question with a number.\n- **Submit:** the data log and your saved queries or workbook.\n\n## Knowledge check\n\n1. What should you do straight after importing a CSV file?\n   - A) Delete the original file\n   - B) Check the row count and types against what you expected\n   - C) Start the slides\n   - D) Share the data publicly\n2. SQL and Python give different totals for the same data. What should you do?\n   - A) Use the bigger one\n   - B) Average them\n   - C) Ignore it\n   - D) Find out why before going further\n3. Why keep a data log?\n   - A) So the checks and changes are recorded and someone else could repeat the work\n   - B) To make the project longer\n   - C) Because SQL requires it\n   - D) To hide mistakes\n4. Imported columns are stored as text. What helps when sorting or comparing them as numbers?\n   - A) Deleting them\n   - B) Renaming them\n   - C) `CAST(column AS INTEGER)` or setting types on import\n   - D) Nothing; it is impossible\n5. In the equal-period query, what does the `CASE WHEN` do?\n   - A) Deletes 2025\n   - B) Adds a row's revenue only when it falls in the chosen half-year\n   - C) Sorts the branches\n   - D) Joins the tables\n\n## Lesson summary\n\n1. Inspect, clean, model, reconcile, analyse.\n2. Check row counts and types after every import.\n3. Reconcile a key total in two tools.\n4. Keep a data log of every check and change.\n5. Answer each question in one sentence with a number, and keep the evidence.\n\n## Completion check\n\n- [ ] I imported and checked my data.\n- [ ] I reconciled a total in two tools.\n- [ ] I answered my first question with evidence.",
      },
      {
        title: "Building the dashboard and report",
        order: 3,
        durationMinutes: 120,
        videoUrl: "https://www.youtube.com/watch?v=mYpOSfqgTvY",
        content: "## Lesson introduction\n\n- **What you will study:** how to turn your analysis into a dashboard and a two-to-three-page report that a manager can act on, and how to quality-check both.\n- **Why it matters:** the dashboard and report are what your audience, and future employers, will actually see.\n- **After this lesson you can:** build a capstone dashboard and report and check them against a quality checklist.\n- **Estimated time:** 120 minutes.\n\n## The topic in simple English\n\nThe dashboard is the shop window: it shows the most important things at a glance. The report is the conversation with the shop assistant: it explains what the numbers mean and what to do. Both must be accurate, clear and honest.\n\n## Learning objectives\n\n1. Plan a dashboard around your business questions.\n2. Build it with the right charts, measures and filters.\n3. Write the report in the Module 14 format.\n4. Check every number against your data log.\n5. Apply a quality checklist before submitting.\n\n## Main teaching content\n\n**1. Dashboard plan**\n\nOne page; KPI cards at the top; one chart per business question; filters for the main dimension (branch, asset, site); message titles; colour for exceptions only (Modules 8, 11, 15–17).\n\n**2. Report structure (two to three pages)**\n\n1. Message title and summary.\n2. Background and questions (short).\n3. Findings: one per question, with numbers and comparisons.\n4. Recommendations: action, owner, timescale, success measure.\n5. Method, data and limits (including that the data is fictional teaching data).\n6. Appendix: data log and key tables.\n\n**3. Quality checklist**\n\n| Check | Question |\n| --- | --- |\n| Numbers | Does every number in the report match the dashboard and the data log? |\n| Periods | Are periods equal and stated (months, quarters, half-years)? |\n| Ratios | Are ratios calculated from totals, not averaged? |\n| Labels | Does every chart have a message title, labelled axes and units? |\n| Honesty | Are limits stated, and are associations not called causes? |\n| Readability | Could a manager understand the summary in one minute? |\n| Files | Do the files open on another computer? |\n\n**4. Common mistakes**\n\nComparing a part-year with a full year; averaging percentages; truncated axes without a label; too many charts; recommendations with no owner or date; spelling mistakes in titles.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Quality assurance (QA) | Systematic checks before release | Checking before handing in | Proofreading a letter | The quality checklist |\n| Traceability | Being able to follow a number back to its source | Where did this come from? | A receipt for a purchase | Report figure to SQL query |\n| Message title | A title that states the conclusion | A headline | A newspaper headline | \"Riverside is the only branch shrinking\" |\n| Appendix | Supporting detail at the end of a report | Extra pages | Notes at the back of a book | The data log |\n| Peer review | Having someone else check your work | A second pair of eyes | A friend reading your CV | A classmate checks your dashboard |\n\n## Step-by-step demonstration: Option A dashboard and report\n\n1. **Dashboard plan:** cards for revenue, units, average price per unit and year-on-year growth (equal periods); one chart per question: branch growth (bar), category growth at Riverside (bar), monthly revenue by branch (line); a branch slicer.\n2. **Build** in Power BI using the Module 10 star schema and measures (Total Revenue, Total Units, Average Price per Unit, YoY %).\n3. **Check the cards** against the data log: total revenue 20,031,300; January–June 2026 6,806,250 against 6,344,600 (+7.3%); average price per unit 595.35.\n4. **Write the report summary:** \"Sunrise grew 7.3% in January–June 2026 on the same months of 2025, led by Hilltop (+11.9%) and Central (+8.1%). Riverside fell 2.8%, with all three categories down by similar amounts (−2.6% to −3.0%), which points to fewer shoppers or smaller baskets rather than a product problem. We recommend a four-week customer count and basket study at Riverside before any price or range changes.\"\n5. **Run the quality checklist:** every number traced to the data log; equal periods; average price from totals (595.35, not the misleading row average of 1,116.67 from Module 10); limits stated, including no footfall data.\n6. **Peer review:** swap with a classmate and check each other's work against the checklist.\n\n## Practical exercise\n\n- **Task:** build your capstone dashboard and report.\n- **Steps:** plan the dashboard; build it; write the report; complete the quality checklist; get a peer review and fix what they find.\n- **Expected output:** a one-page dashboard, a two-to-three-page report and a completed checklist.\n- **Submit:** the dashboard file and image, the report, and the checklist.\n\n## Knowledge check\n\n1. What should every number in your report match?\n   - A) Your memory\n   - B) A classmate's figures\n   - C) Round numbers\n   - D) The dashboard and the data log\n2. How many charts should a capstone dashboard have?\n   - A) As many as possible\n   - B) Exactly ten\n   - C) About one per business question, on one page\n   - D) None\n3. Which belongs in the report's method and limits section?\n   - A) That the data is fictional teaching data, plus the periods and what was not available\n   - B) The analyst's favourite colour\n   - C) A list of every row\n   - D) Nothing; limits weaken a report\n4. Which is a common capstone mistake?\n   - A) Using message titles\n   - B) Comparing a part-year with a full year\n   - C) Stating limits\n   - D) Getting a peer review\n5. What is traceability?\n   - A) Copying another learner's dashboard\n   - B) Drawing on paper\n   - C) Deleting the data log\n   - D) Being able to follow every number back to its source\n\n## Lesson summary\n\n1. Plan the dashboard around your questions: one page, cards, one chart per question.\n2. Write the report in the Module 14 format, two to three pages.\n3. Trace every number to your data log.\n4. Run the quality checklist and get a peer review.\n5. Avoid part-year comparisons, averaged ratios and owner-less recommendations.\n\n## Completion check\n\n- [ ] My dashboard answers every business question.\n- [ ] Every report figure matches my data log.\n- [ ] I completed the quality checklist and a peer review.",
      },
      {
        title: "Presenting and adding it to your portfolio",
        order: 4,
        durationMinutes: 90,
        videoUrl: "https://www.youtube.com/watch?v=j9Q84_Gn_T0",
        content: "## Lesson introduction\n\n- **What you will study:** how to present your capstone, publish it as a portfolio piece, describe it on your CV and LinkedIn, and talk about it in interviews.\n- **Why it matters:** employers hire analysts who can show finished work and explain it clearly. Your capstone is proof of what you can do.\n- **After this lesson you can:** deliver a capstone presentation, publish a portfolio page and answer common interview questions about your project.\n- **Estimated time:** 90 minutes.\n\n## The topic in simple English\n\nA capstone hidden in a folder helps nobody. Like an artist's exhibition, it should be shown: a short presentation, a page anyone can open, and a clear story you can tell in an interview in two minutes.\n\n## Learning objectives\n\n1. Deliver a five-to-seven-slide capstone presentation under eight minutes.\n2. Publish a portfolio page with the right content.\n3. Write CV bullet points about the project.\n4. Answer interview questions with the STAR method.\n5. Present fictional data honestly.\n\n## Main teaching content\n\n**1. The presentation**\n\nUse the Module 14 structure: the answer, evidence (two or three slides), recommendation, next steps and the ask, with method and limits in backup slides. Rehearse with a timer.\n\n**2. The portfolio page**\n\n| Section | Content |\n| --- | --- |\n| Title | The project's message, for example \"Why Riverside is shrinking: a retail sales analysis\" |\n| Problem | The business question, in two sentences |\n| Data and tools | Files, size, tools (SQL, Power BI, Python) |\n| Approach | Four or five bullet points |\n| Results | Two or three findings with numbers, plus the dashboard image |\n| Recommendation | What you recommended and why |\n| Links | Dashboard image or file, report PDF, notebook |\n| Note | \"Uses fictional training data from the Paleon Data Analytics course\" |\n\nFree places to publish include a GitHub repository, a shared Google Drive or OneDrive folder, a free website builder page, or a LinkedIn Featured post. Never publish real company or customer data.\n\n**3. CV bullet points**\n\nStart with an action verb, name the tools and give a result: \"Analysed 18 months of retail sales across three branches in SQL and Power BI; identified the only declining branch (−2.8%) and recommended a customer and basket study.\"\n\n**4. Interview answers: STAR**\n\n**S**ituation, **T**ask, **A**ction, **R**esult. Prepare for: \"Tell me about a data project\", \"What was the hardest part?\", \"How did you check your numbers?\", \"What would you do with more data?\".\n\n**5. Honesty**\n\nSay clearly that the data is fictional course data. Employers respect this; pretending it was real client work damages trust.\n\n## Technical terms\n\n| Term | Technical definition | Simple meaning | Everyday example | Business example |\n| --- | --- | --- | --- | --- |\n| Portfolio piece | A finished project presented to show skills | Your best work on show | A painting in an exhibition | The capstone page |\n| STAR method | A way to answer interview questions: situation, task, action, result | Tell the story in four steps | Describing how you fixed a flat tyre | Explaining the Riverside analysis |\n| Action verb | A verb that describes what you did | Doing word | \"Built\", \"led\" | \"Analysed\", \"built\", \"recommended\" |\n| Elevator pitch | A summary you can give in about 30 seconds | A very short explanation | Introducing yourself at an event | \"I analysed Sunrise's sales and found...\" |\n| Featured section | A LinkedIn profile area for showcasing work | A shop window on your profile | Photos on a noticeboard | The capstone dashboard image |\n\n## Step-by-step demonstration: presenting and publishing Option A\n\n1. **Slides:** (1) \"Riverside is the only Sunrise branch with falling sales\"; (2) branch growth bar chart; (3) \"Riverside's fall is spread across all categories\"; (4) options compared; (5) \"Decision: approve a four-week customer and basket study at Riverside\"; backup: method, data log, limits.\n2. **Record** the presentation in under eight minutes using a phone or a free video call recording; watch it back once and re-record if needed.\n3. **Portfolio page:** fill in each section of the table in D.2, add the dashboard image and the report PDF, and include the fictional-data note.\n4. **CV bullet:** use the example in D.3, adjusted to your own project.\n5. **Elevator pitch:** \"In my capstone I analysed 18 months of sales for a three-branch retailer in SQL and Power BI. Two branches grew by 8–12%, but one fell 2.8% across every category, so I recommended a customer count and basket study before any price changes.\"\n6. **STAR practice:** answer \"How did you check your numbers?\" with the reconciliation from Lesson 18.2 (20,031,300 in SQL and Python).\n\n## Practical exercise\n\n- **Task:** finish and publish your capstone.\n- **Steps:** record your presentation; publish your portfolio page; write two CV bullet points; write an elevator pitch; write STAR answers to the four interview questions in D.4.\n- **Expected output:** a recording under eight minutes, a working portfolio link, CV bullets and interview answers.\n- **Submit:** all capstone deliverables (see the capstone brief below).\n\n## Knowledge check\n\n1. What must every capstone portfolio page include about the data?\n   - A) A note that it uses fictional training data from the course\n   - B) A claim that it was real client work\n   - C) The customers' real names\n   - D) Nothing\n2. Which is a strong CV bullet point?\n   - A) \"Did some data stuff\"\n   - B) \"Analysed 18 months of retail sales in SQL and Power BI; found the only declining branch (−2.8%) and recommended a study\"\n   - C) \"Good with computers\"\n   - D) \"Attended a course\"\n3. What does STAR stand for?\n   - A) Start, Think, Answer, Repeat\n   - B) Skills, Training, Awards, References\n   - C) Situation, Task, Action, Result\n   - D) Slides, Tables, Analysis, Report\n4. Where should you never publish your capstone?\n   - A) GitHub\n   - B) LinkedIn Featured\n   - C) A shared drive folder\n   - D) Anywhere, if it contained real company or customer data\n5. How long should the capstone presentation recording be?\n   - A) Over an hour\n   - B) Exactly one minute\n   - C) Under eight minutes\n   - D) There is no recording\n\n## Lesson summary\n\n1. Present with the Module 14 structure in under eight minutes.\n2. Publish a portfolio page: problem, data and tools, approach, results, recommendation, links.\n3. Write CV bullets with action verbs, tools and results.\n4. Prepare STAR answers and a 30-second pitch.\n5. Always say the data is fictional course data.\n\n## Completion check\n\n- [ ] I recorded my presentation.\n- [ ] My portfolio page is published and the link works.\n- [ ] I wrote CV bullets, a pitch and STAR answers.\n\n## Career guide\n\nThis guide helps learners turn the course into job applications. Paleon Training does not guarantee employment; the guide is practical advice.\n\n### 1. Roles this course prepares you for\n\n| Role | What the job involves | Course modules most used |\n| --- | --- | --- |\n| Data analyst | Cleaning data, answering business questions, building reports | 2–8, 12–14 |\n| Business intelligence (BI) analyst or developer | Data models, measures and dashboards | 9–11 |\n| Reporting analyst / MIS officer | Regular management reports and KPI packs | 4, 8, 11, 14 |\n| Business analyst | Turning business needs into requirements and recommendations | 1, 14 |\n| Operations or production analyst | Plan against actual, downtime, maintenance and safety reporting | 15 |\n| Credit, risk or financial analyst (junior) | Portfolio quality, cost, profitability, transaction monitoring | 16 |\n| Customer or marketing analyst | Churn, segmentation, retention and campaign analysis | 13, 16, 17 |\n| Network performance analyst (junior) | Site performance, drops, speeds and outages | 17 |\n\nMany people start in a reporting or junior analyst role and move into BI, data science or management. The Paleon AI & Machine Learning course is a natural next step for those who want to build predictive models.\n\n### 2. Your skills map\n\nCopy this table into your notes and rate yourself from 1 (beginner) to 5 (confident). Plan to practise anything below 3.\n\n| Skill | Evidence from the course |\n| --- | --- |\n| Excel: formulas, lookups, PivotTables, charts | Module 4 assignment; capstone preparation |\n| SQL: SELECT, WHERE, GROUP BY, JOINs, CASE | Modules 5–6; capstone SQL stage |\n| Statistics: averages, spread, outliers, correlation | Module 7 |\n| Visualisation and storytelling | Module 8; every dashboard |\n| Power BI: modelling, DAX, interactive dashboards | Modules 9–11; capstone dashboard |\n| Python: Pandas cleaning, grouping, charts, EDA | Modules 12–13 |\n| Business analysis and reporting | Module 14; capstone report |\n| Industry knowledge | Modules 15–17 |\n| Presenting | Lesson 14.4; capstone presentation |\n\n### 3. Your CV\n\n- **Length:** one page, two at most.\n- **Top section:** name, town or city (no full address), phone, email and links to LinkedIn and your portfolio.\n- **Profile (three lines):** who you are, your main tools and the kind of role you want. Example: \"Graduate with practical training in Excel, SQL, Power BI and Python, and a portfolio of four industry analyses. Looking for a junior data or reporting analyst role where I can turn data into clear decisions.\"\n- **Skills:** group them: Tools (Excel, SQL, Power BI, Python with Pandas), Methods (data cleaning, KPI design, dashboarding, exploratory analysis), Industry (retail, operations, banking or telecoms).\n- **Projects:** two or three bullets per project, each with an action verb, tools and a result (Lesson 18.4).\n- **Experience and education:** include non-data jobs and show transferable skills, such as handling numbers, reporting to a manager or improving a process.\n- **Training:** \"Paleon Certificate in Data Analytics & Business Intelligence (18 weeks, 72 lessons, capstone project)\".\n- Tailor the profile and skills to each job advert: use the advert's own words where they are true for you.\n\n### 4. LinkedIn and your portfolio\n\n- Headline: \"Data Analyst | Excel · SQL · Power BI · Python\" or the role you are aiming for.\n- About section: four or five sentences on what you can do, with a link to your portfolio.\n- Featured: your capstone dashboard image and report; one or two assignment dashboards.\n- Share one short post about your capstone: the question, one chart and what you found, with the fictional-data note.\n- Keep everything you publish free of real company or customer data.\n\n### 5. A 30-day job search plan\n\n| Week | Actions |\n| --- | --- |\n| 1 | Finish the CV and LinkedIn; publish the portfolio; make a list of 30 organisations that hire analysts in your target industry |\n| 2 | Apply to 10 suitable roles with tailored CVs; send five short messages to analysts or managers asking for advice, not jobs |\n| 3 | Apply to 10 more; practise the interview questions below aloud; do one timed practice task (section 7) |\n| 4 | Follow up on applications; review which applications got replies and adjust your CV; keep learning one new skill for 30 minutes a day |\n\nAlso look for internships, graduate programmes, national service or placement roles with data tasks, volunteer analysis for community organisations, and small freelance reporting jobs. Each one adds real experience.\n\n### 6. Interview preparation\n\n**General questions:** \"Tell me about yourself\" (30-second pitch, Lesson 18.4); \"Tell me about a data project\" (STAR, using your capstone); \"How do you check your numbers?\" (reconciliation and data log); \"Tell me about a time you explained data to someone non-technical\"; \"What would you do in your first 90 days?\" (learn the business, the data and the people; deliver one quick, useful report).\n\n**Technical questions with model answers**\n\n| Question | A strong answer covers |\n| --- | --- |\n| What is the difference between WHERE and HAVING? | WHERE filters rows before grouping; HAVING filters groups after GROUP BY, for example `HAVING SUM(amount) > 1000` |\n| What is the difference between an INNER JOIN and a LEFT JOIN? | INNER keeps only matching rows; LEFT keeps every row from the left table and fills missing matches with NULL |\n| How would you find duplicate customers in SQL? | `GROUP BY customer_id HAVING COUNT(*) > 1`; then decide with the business which record to keep |\n| XLOOKUP and VLOOKUP: why prefer XLOOKUP? | It can look left, defaults to an exact match and does not break when columns are inserted |\n| What is a PivotTable for? | Summarising data by groups quickly: totals, counts and averages by category, with filters |\n| What is a star schema? | One fact table of events or amounts, linked to dimension tables that describe them; it keeps models simple and fast |\n| What is the difference between a measure and a calculated column in Power BI? | A calculated column is computed row by row and stored; a measure is calculated at query time for the current filter, as in totals and ratios |\n| Why use DIVIDE in DAX? | It handles division by zero safely, returning blank or a chosen value instead of an error |\n| Mean or median for salaries or balances? | The median, because a few very large values pull the mean up |\n| What is an outlier, and how do you find one? | A value far from the rest; for example beyond Q3 + 1.5 × IQR, or many times a customer's own median; check it before removing it |\n| Correlation versus causation? | Correlation shows two measures move together; it does not show one causes the other; other factors or chance may explain it |\n| How do you handle missing values? | Find them, understand why they are missing, then leave, fill or remove them, and record the decision |\n| How would you compare this year with last year when this year is incomplete? | Compare the same months of each year (like for like), not a part-year with a full year |\n| How do you calculate an overall rate from several groups? | From totals (total events ÷ total base), never by averaging the group rates |\n| In Pandas, how do you get revenue by branch? | `df.groupby(\"branch\")[\"revenue\"].sum().sort_values(ascending=False)` |\n\n### 7. Take-home tasks and tests\n\nMany employers send a short task: a dataset and a few questions, with a deadline. Read the questions twice; check and clean the data first and say what you found; answer exactly what was asked, with numbers; include one or two clear charts; state your assumptions and limits; finish early and check it. Never use the employer's data for anything else, and never share it.\n\n### 8. Offers and continuing to learn\n\nBefore accepting an offer, ask what the first three months will involve, who you will learn from and which tools you will use. Compare offers on learning and growth as well as pay. After the course, keep your skills fresh: one small analysis a month on a public dataset, published to your portfolio, and a new skill every quarter, such as the Paleon AI & Machine Learning course.",
      },
    ],
    assignmentTitle: "Your capstone plan",
    assignmentDescription: "Write a one-page capstone plan: your option, three to five business questions, KPIs with formulas, files and tools, a timeline and two risks.",
    fileRequired: true,
    quizQuestions: [
      {
        text: "How many business questions should a capstone plan usually have?",
        type: "multiple_choice",
        points: 1,
        explanation: "three to five strong questions",
        answers: [
          {
            text: "One",
            isCorrect: false,
          },
          {
            text: "Twenty or more",
            isCorrect: false,
          },
          {
            text: "Three to five strong questions",
            isCorrect: true,
          },
          {
            text: "None",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is the best reason to choose a capstone option?",
        type: "multiple_choice",
        points: 1,
        explanation: "career fit and a real decision",
        answers: [
          {
            text: "It fits the industry you want to work in, and you can see a real decision in the data",
            isCorrect: true,
          },
          {
            text: "It has the shortest file name",
            isCorrect: false,
          },
          {
            text: "A friend chose it",
            isCorrect: false,
          },
          {
            text: "It looks the easiest to copy",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is NOT a required capstone deliverable?",
        type: "multiple_choice",
        points: 1,
        explanation: "printing every row",
        answers: [
          {
            text: "A dashboard",
            isCorrect: false,
          },
          {
            text: "A written report",
            isCorrect: false,
          },
          {
            text: "A presentation and recording",
            isCorrect: false,
          },
          {
            text: "A printed copy of every data row",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What is scope?",
        type: "multiple_choice",
        points: 1,
        explanation: "what is and is not covered",
        answers: [
          {
            text: "The colour of the dashboard",
            isCorrect: false,
          },
          {
            text: "What the project will and will not cover",
            isCorrect: true,
          },
          {
            text: "The number of slides",
            isCorrect: false,
          },
          {
            text: "The size of the data file",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Why agree the plan with your instructor before starting?",
        type: "multiple_choice",
        points: 1,
        explanation: "questions clear before work starts",
        answers: [
          {
            text: "To make sure the questions are clear and achievable before work begins",
            isCorrect: true,
          },
          {
            text: "Instructors like paperwork",
            isCorrect: false,
          },
          {
            text: "So the instructor can do the work",
            isCorrect: false,
          },
          {
            text: "It is not necessary",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What should you do straight after importing a CSV file?",
        type: "multiple_choice",
        points: 1,
        explanation: "check row count and types",
        answers: [
          {
            text: "Delete the original file",
            isCorrect: false,
          },
          {
            text: "Check the row count and types against what you expected",
            isCorrect: true,
          },
          {
            text: "Start the slides",
            isCorrect: false,
          },
          {
            text: "Share the data publicly",
            isCorrect: false,
          },
        ],
      },
      {
        text: "SQL and Python give different totals for the same data. What should you do?",
        type: "multiple_choice",
        points: 1,
        explanation: "find out why first",
        answers: [
          {
            text: "Use the bigger one",
            isCorrect: false,
          },
          {
            text: "Average them",
            isCorrect: false,
          },
          {
            text: "Ignore it",
            isCorrect: false,
          },
          {
            text: "Find out why before going further",
            isCorrect: true,
          },
        ],
      },
      {
        text: "Why keep a data log?",
        type: "multiple_choice",
        points: 1,
        explanation: "so work can be repeated",
        answers: [
          {
            text: "So the checks and changes are recorded and someone else could repeat the work",
            isCorrect: true,
          },
          {
            text: "To make the project longer",
            isCorrect: false,
          },
          {
            text: "Because SQL requires it",
            isCorrect: false,
          },
          {
            text: "To hide mistakes",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Imported columns are stored as text. What helps when sorting or comparing them as numbers?",
        type: "multiple_choice",
        points: 1,
        explanation: "CAST or set types",
        answers: [
          {
            text: "Deleting them",
            isCorrect: false,
          },
          {
            text: "Renaming them",
            isCorrect: false,
          },
          {
            text: "CAST(column AS INTEGER) or setting types on import",
            isCorrect: true,
          },
          {
            text: "Nothing; it is impossible",
            isCorrect: false,
          },
        ],
      },
      {
        text: "In the equal-period query, what does the CASE WHEN do?",
        type: "multiple_choice",
        points: 1,
        explanation: "adds revenue only for the half-year",
        answers: [
          {
            text: "Deletes 2025",
            isCorrect: false,
          },
          {
            text: "Adds a row's revenue only when it falls in the chosen half-year",
            isCorrect: true,
          },
          {
            text: "Sorts the branches",
            isCorrect: false,
          },
          {
            text: "Joins the tables",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What should every number in your report match?",
        type: "multiple_choice",
        points: 1,
        explanation: "dashboard and data log",
        answers: [
          {
            text: "Your memory",
            isCorrect: false,
          },
          {
            text: "A classmate's figures",
            isCorrect: false,
          },
          {
            text: "Round numbers",
            isCorrect: false,
          },
          {
            text: "The dashboard and the data log",
            isCorrect: true,
          },
        ],
      },
      {
        text: "How many charts should a capstone dashboard have?",
        type: "multiple_choice",
        points: 1,
        explanation: "about one per question",
        answers: [
          {
            text: "As many as possible",
            isCorrect: false,
          },
          {
            text: "Exactly ten",
            isCorrect: false,
          },
          {
            text: "About one per business question, on one page",
            isCorrect: true,
          },
          {
            text: "None",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which belongs in the report's method and limits section?",
        type: "multiple_choice",
        points: 1,
        explanation: "fictional data, periods, gaps",
        answers: [
          {
            text: "That the data is fictional teaching data, plus the periods and what was not available",
            isCorrect: true,
          },
          {
            text: "The analyst's favourite colour",
            isCorrect: false,
          },
          {
            text: "A list of every row",
            isCorrect: false,
          },
          {
            text: "Nothing; limits weaken a report",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is a common capstone mistake?",
        type: "multiple_choice",
        points: 1,
        explanation: "part-year against full year",
        answers: [
          {
            text: "Using message titles",
            isCorrect: false,
          },
          {
            text: "Comparing a part-year with a full year",
            isCorrect: true,
          },
          {
            text: "Stating limits",
            isCorrect: false,
          },
          {
            text: "Getting a peer review",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is traceability?",
        type: "multiple_choice",
        points: 1,
        explanation: "following a number to its source",
        answers: [
          {
            text: "Copying another learner's dashboard",
            isCorrect: false,
          },
          {
            text: "Drawing on paper",
            isCorrect: false,
          },
          {
            text: "Deleting the data log",
            isCorrect: false,
          },
          {
            text: "Being able to follow every number back to its source",
            isCorrect: true,
          },
        ],
      },
      {
        text: "What must every capstone portfolio page include about the data?",
        type: "multiple_choice",
        points: 1,
        explanation: "the fictional-data note",
        answers: [
          {
            text: "A note that it uses fictional training data from the course",
            isCorrect: true,
          },
          {
            text: "A claim that it was real client work",
            isCorrect: false,
          },
          {
            text: "The customers' real names",
            isCorrect: false,
          },
          {
            text: "Nothing",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which is a strong CV bullet point?",
        type: "multiple_choice",
        points: 1,
        explanation: "the action-verb bullet with a result",
        answers: [
          {
            text: "\"Did some data stuff\"",
            isCorrect: false,
          },
          {
            text: "\"Analysed 18 months of retail sales in SQL and Power BI; found the only declining branch (−2.8%) and recommended a study\"",
            isCorrect: true,
          },
          {
            text: "\"Good with computers\"",
            isCorrect: false,
          },
          {
            text: "\"Attended a course\"",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does STAR stand for?",
        type: "multiple_choice",
        points: 1,
        explanation: "Situation, Task, Action, Result",
        answers: [
          {
            text: "Start, Think, Answer, Repeat",
            isCorrect: false,
          },
          {
            text: "Skills, Training, Awards, References",
            isCorrect: false,
          },
          {
            text: "Situation, Task, Action, Result",
            isCorrect: true,
          },
          {
            text: "Slides, Tables, Analysis, Report",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Where should you never publish your capstone?",
        type: "multiple_choice",
        points: 1,
        explanation: "anywhere, if it held real data",
        answers: [
          {
            text: "GitHub",
            isCorrect: false,
          },
          {
            text: "LinkedIn Featured",
            isCorrect: false,
          },
          {
            text: "A shared drive folder",
            isCorrect: false,
          },
          {
            text: "Anywhere, if it contained real company or customer data",
            isCorrect: true,
          },
        ],
      },
      {
        text: "How long should the capstone presentation recording be?",
        type: "multiple_choice",
        points: 1,
        explanation: "under eight minutes",
        answers: [
          {
            text: "Over an hour",
            isCorrect: false,
          },
          {
            text: "Exactly one minute",
            isCorrect: false,
          },
          {
            text: "Under eight minutes",
            isCorrect: true,
          },
          {
            text: "There is no recording",
            isCorrect: false,
          },
        ],
      },
    ],
  },
];
