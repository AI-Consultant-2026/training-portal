import { BriefSpec } from "./briefBuilder";

// Data Analytics & Business Intelligence, Days 1-18, plus the capstone. Keyed by module
// week_number. Scenarios, data and marking come from the course document; every business,
// person and dataset is fictional, and the worked examples use a different scenario from
// the task they illustrate.
export const DATA_ANALYTICS_WEEKS: Record<number, BriefSpec> = {
  1: {
    overview: "A small business owner near you, such as a pharmacy, a phone shop, a mobile money agent, a restaurant or a transport company, wants to start using data. They have asked you for a short \"data audit\" before they spend money on any system. You may use a real business you know or invent one; if it is real, do not include any customer's personal details.",
    materials: "**Tools.** A word processor (Word, Google Docs) or neat handwriting, plus Excel for the web for Task 3.",
    tasks: [
      "**Describe the business** in 3–4 sentences: what it sells, who its customers are, and roughly how many sales or customers it handles each day.",
      "**List five pieces of data** the business records or could record. For each, say where it comes from (for example a till, a notebook, an app) and one decision it could support.",
      "**Build a sample dataset** in Excel for the web: one table with at least 5 columns and 10 rows of invented records the business might keep. Use clear column headings.",
      "**Write four business questions**, one of each type: descriptive, diagnostic, predictive and prescriptive.",
      "**Plan one analysis.** Take your descriptive question and explain in one or two sentences what you would do at each of the six steps.",
      "**Reflection.** In 3–5 sentences, explain what the owner could gain from using data, and one risk to be careful about.",
    ],
    deliverables: [
      "One document of 1–2 pages (Tasks 1, 2, 4, 5 and 6) and one Excel file (Task 3).",
    ],
    criteria: [
      {
        name: "Business description",
        points: 10,
        description: "Clear, specific and realistic",
      },
      {
        name: "Five data items",
        points: 20,
        description: "Five relevant items, each with a believable source and decision",
      },
      {
        name: "Sample dataset",
        points: 20,
        description: "At least 5 columns and 10 rows, clear headings, consistent values, one fact per column",
      },
      {
        name: "Four questions",
        points: 20,
        description: "One correct example of each type, specific and answerable",
      },
      {
        name: "Six-step plan",
        points: 20,
        description: "All six steps covered, logical and tied to the question",
      },
      {
        name: "Reflection and presentation",
        points: 10,
        description: "A real benefit and a real risk, clear writing, tidy layout",
      },
    ],
    example: "*Worked example for a different business, Greenleaf Pharmacy (fictional). Do not reuse its wording.*\n\n**Description.** Greenleaf is a small pharmacy on a busy street. It sells prescription medicines, baby products and toiletries to local families and office workers, with about 120 sales a day.\n\n| Data item | Source | Decision it supports |\n|---|---|---|\n| Items sold per day | Till receipts | Which products to reorder each week |\n| Stock count | Shelf count every Friday | When to place an order before running out |\n\n**Four questions.** Descriptive: \"Which ten products sold most in March?\" Diagnostic: \"Why did baby-product sales fall in the second week of March?\" Predictive: \"How many packs of paracetamol will we sell next month?\" Prescriptive: \"Should we open one hour earlier on weekdays?\"\n\n**One step of the plan (Clean).** *Check that every receipt has a date and a product name, remove repeated receipts and make product names consistent (\"Paracetamol 500mg\" and \"paracetamol 500 mg\" become one product).*",
    tips: [
      "Questions like \"How is the business doing?\" are too vague. Name a product, a place and a period.",
      "Each data item needs a believable source: say exactly where it is recorded.",
      "Keep one fact per column in your sample dataset, and keep values consistent (one date format, one spelling).",
      "Never include real customers' names or phone numbers.",
    ],
  },
  2: {
    overview: "Connectwave Telecom (fictional) records customer complaints in a shared spreadsheet. Managers want a weekly report on complaints by region and issue type, but they do not trust the data. You have been asked to audit a sample and propose a better collection form.",
    materials: "**Data.** Copy this sample into Excel for the web. Note that one ticket appears twice.\n\n| TicketID | Date | CustomerID | Region | Issue | Channel | ResolvedHours |\n| --- | --- | --- | --- | --- | --- | --- |\n| T101 | 2026-02-01 | K1001 | North | No signal | Call | 4 |\n| T102 | 2026-02-01 | K1002 | north | Slow data | App | 12 |\n| T103 | 2026-02-02 | K1003 | South | Billing error | Call | -3 |\n| T104 | 2026-02-02 | K1004 | East |  | Email | 6 |\n| T102 | 2026-02-01 | K1002 | north | Slow data | App | 12 |\n| T106 | 03/02/2026 | K1005 | West | Dropped calls | Call | 5 |\n| T107 | 2026-02-04 | K1006 | Sooth | Billing error | Walk-in | 8 |\n| T108 | 2026-02-04 | K1007 | East | dropped calls | call | 2 |\n| T109 | 2026-02-05 |  | West | No signal | App | 3 |\n| T110 | 2026-02-05 | K1008 | North | No Signal | App | 400 |\n\n**Tools.** Excel for the web, Microsoft Forms, a word processor.",
    tasks: [
      "**Type the columns.** For each of the 7 columns, state its data type and sub-type.",
      "**Audit.** Build an issue log (Row, Column, Problem, Dimension, Suggested fix) covering every problem you find. Total your issues by dimension.",
      "**Judge the source.** In 3–4 sentences, explain whether this data is primary or secondary, internal or external, and what that means for trusting it.",
      "**Redesign the collection.** Build a Microsoft Forms complaint form that would prevent at least five of the problems you found. List each question, its type and its validation.",
      "**Privacy.** In 2–3 sentences, explain which fields you would include if you shared this data with an outside consultant, and why.",
    ],
    deliverables: [
      "One Excel file (Tasks 1–2), a form link or screenshots (Task 4), and a short document (Tasks 3 and 5).",
    ],
    criteria: [
      {
        name: "Column types",
        points: 10,
        description: "All 7 correct, with sensible sub-types",
      },
      {
        name: "Issue log",
        points: 35,
        description: "At least 10 genuine issues found, each with correct dimension and sensible fix; totals by dimension add up",
      },
      {
        name: "Source judgement",
        points: 10,
        description: "Correct classification and a sensible comment on trust",
      },
      {
        name: "Form redesign",
        points: 30,
        description: "At least five problems prevented; right question types; working validation",
      },
      {
        name: "Privacy",
        points: 10,
        description: "Correct fields kept and removed, with a reason",
      },
      {
        name: "Presentation",
        points: 5,
        description: "Clear, tidy, consistent",
      },
    ],
    example: "*Worked example on a different log, a fictional school's library loans. Do not reuse its wording.*\n\n| Row | Column | Problem | Dimension | Suggested fix |\n|---|---|---|---|---|\n| 4 | ReturnDate | Return date is before the loan date | Validity | Check against the loan record and correct it; add a rule that the return date must be on or after the loan date |\n| 7 | Class | \"jss2\" and \"JSS 2\" used for the same class | Consistency | Use a drop-down list of class names |\n| 9 | LoanID | L109 appears twice | Uniqueness | Keep one row; make LoanID a required unique field |\n\n**Form question example.** *\"Class\" becomes a drop-down choice question (required), so the same class can never be spelled two ways.*\n\n**Privacy example.** *For an outside reviewer, keep LoanID, BookID, Class and dates; remove the pupil's name, because the review is about books and dates, not individual pupils.*",
    tips: [
      "Count every problem in every row, and give each one the right quality dimension.",
      "A fix should prevent the problem next time, not only repair today's row.",
      "Your form must actually stop the problems: use choice lists, required fields and number or date rules.",
      "Share the least personal data that still answers the question.",
    ],
  },
  3: {
    overview: "Brightpath Services (fictional) is a small professional services company with three departments: Consulting, Training and IT Support. The managing director wants a simple Excel report showing revenue, costs and profit for January to April 2026, and which department needs attention.",
    materials: "**Data.** Enter this table in a new workbook called **Brightpath performance**, on a sheet called **Data**, starting in A1. Amounts are plain numbers.\n\n| Month | Department | Revenue | Cost |\n| --- | --- | --- | --- |\n| Jan | Consulting | 120000 | 78000 |\n| Jan | Training | 60000 | 42000 |\n| Jan | IT Support | 45000 | 38000 |\n| Feb | Consulting | 110000 | 75000 |\n| Feb | Training | 72000 | 45000 |\n| Feb | IT Support | 48000 | 39000 |\n| Mar | Consulting | 135000 | 82000 |\n| Mar | Training | 66000 | 44000 |\n| Mar | IT Support | 52000 | 47000 |\n| Apr | Consulting | 128000 | 80000 |\n| Apr | Training | 80000 | 50000 |\n| Apr | IT Support | 50000 | 46000 |\n\n**Tools.** Excel for the web (or the desktop app).",
    tasks: [
      "**Lay out and format** the data correctly: bold, coloured, frozen header row; numbers with thousands separators.",
      "**Add calculated columns:** Profit (Revenue − Cost) in column E and Margin (Profit ÷ Revenue) in column F, formatted as a percentage with one decimal. Use formulas copied down, not typed values.",
      "**Add a summary block** below the data, after one empty row, with: total revenue, total cost, total profit, overall margin (total profit ÷ total revenue), average revenue per row, the largest and smallest profit, and the number of rows. Use SUM, AVERAGE, MAX, MIN and COUNT.",
      "**Sort** the data by Margin, largest to smallest, and note which department and month had the lowest margin. Then sort it back to its original order.",
      "**Filter and SUBTOTAL:** using a filter and SUBTOTAL, find total revenue, cost and profit for each department.",
      "**Build a Report sheet** with: a title; a department table (Department, Revenue, Cost, Profit, Margin) with a total row that matches your summary; a column chart of profit by department with a title stating the finding; and 3–5 sentences of findings and one recommendation.",
      "**Check your work:** show at least two checks that your figures are correct (for example, departments adding up to the total).",
    ],
    deliverables: [
      "One Excel workbook with Data and Report sheets.",
    ],
    criteria: [
      {
        name: "Layout and formatting",
        points: 10,
        description: "All five layout rules followed; clear header; correct number and percentage formats",
      },
      {
        name: "Calculated columns",
        points: 15,
        description: "Correct Profit and Margin formulas copied down",
      },
      {
        name: "Summary block",
        points: 20,
        description: "All eight figures correct, using the right functions",
      },
      {
        name: "Sorting",
        points: 10,
        description: "Correct sort, lowest margin identified, original order restored",
      },
      {
        name: "Department figures",
        points: 15,
        description: "Correct filtered SUBTOTAL figures for all three departments",
      },
      {
        name: "Report and chart",
        points: 15,
        description: "Clear table with matching total, suitable chart with a finding as its title",
      },
      {
        name: "Findings and recommendation",
        points: 10,
        description: "Accurate, specific, uses numbers, sensible recommendation with a note on limits",
      },
      {
        name: "Checks",
        points: 5,
        description: "At least two clear checks shown",
      },
    ],
    example: "*Worked example on a different business, Bayside Bakery's three shops (fictional). Do not reuse its wording.*\n\n| Shop | Revenue | Cost | Profit | Margin |\n|---|---|---|---|---|\n| Market Street | 412,000 | 301,000 | 111,000 | 26.9% |\n| Station Road | 365,000 | 298,000 | 67,000 | 18.4% |\n| Harbour View | 298,000 | 205,000 | 93,000 | 31.2% |\n\n*Profit is `=B2-C2`; margin is `=D2/B2`, formatted as a percentage. The total row uses SUM, and the margin total is total profit ÷ total revenue (not the average of the three margins).*\n\n**Chart title:** *\"Station Road earns the lowest margin, 18.4%\"*.\n\n**Finding and recommendation.** *Station Road has the second-highest revenue but the lowest margin, because its costs are 82% of its revenue. Review its ingredient and staff costs for January to April before changing prices.*",
    tips: [
      "Check your totals: the department figures must add up to the company total.",
      "Use absolute references (`$`) for the total cell in share formulas, or the copied formulas break.",
      "Remember that SUM includes rows hidden by a filter; use SUBTOTAL(9, ...) for visible rows.",
      "A chart title should state the finding, not just \"Revenue\".",
    ],
  },
  4: {
    overview: "Connectwave Telecom is worried that customers are leaving (\"churning\"). The retention manager has exported 13 customer records and asks: \"Which customers are leaving, and is there a pattern?\" The export is messy.",
    materials: "**Data.** Type this into a sheet called **Raw**, exactly as shown, mistakes included. Note the spaces around \" Basic \" for K1012, and type \"22 GB\" for K1010 as text.\n\n| CustomerID | Plan | Region | TenureMonths | DataUsageGB | Complaints | Churned |\n| --- | --- | --- | --- | --- | --- | --- |\n| K1001 | Basic | North | 4 | 3.5 | 2 | Yes |\n| K1002 | standard | South | 18 | 12 | 0 | No |\n| K1003 | Premium | East | 30 | 40 | 1 | No |\n| K1004 | Basic | West | 2 | 1.2 | 3 | Y |\n| K1005 | Standard | Nrth | 9 | 15.5 | 1 | No |\n| K1006 | Premium | South | 14 | 35 | 0 | No |\n| K1007 | Basic | East | 6 | 4 | 1 | N |\n| K1008 | Standard | West | 3 | 8 | 4 | Yes |\n| K1009 | Basic | North | 24 | 2.5 | 0 | No |\n| K1009 | Basic | North | 24 | 2.5 | 0 | No |\n| K1010 | Premium | West | 5 | 22 GB | 2 | Yes |\n| K1011 | Standard | East | 12 | 10.5 | 1 | No |\n| K1012 | Basic | South | 1 | 0.8 | 2 | Yes |\n\nOn a second sheet called **Plans**, type: Basic 1,500; Standard 3,000; Premium 6,000 (columns Plan and MonthlyCharge).",
    tasks: [
      "**Clean (Lesson 4.1).** Duplicate Raw to a sheet called Clean, make it a Table named **Customers**, and keep a change log. Remove the duplicate, and fix the plan, region, churn and data-usage problems. You should find seven problems.",
      "**Functions (Lessons 4.2 and 4.3).** Add these columns:\n   - **MonthlyCharge**, using XLOOKUP from the Plans sheet.\n   - **TenureBand**: \"Under 6 months\", \"6-12 months\" or \"Over 12 months\", using nested IF.",
      "**Summary (Lesson 4.3).** With COUNTIFS, SUMIFS and AVERAGEIFS, calculate:\n   - the churn rate overall and for each plan;\n   - the average complaints, data usage and tenure for churned and not-churned customers.",
      "**PivotTables (Lesson 4.4).** Build:\n   - monthly revenue (Sum of MonthlyCharge) by Region;\n   - customers by TenureBand (Rows) and Churned (Columns), using Count of CustomerID.",
      "**Findings.** Write three to five sentences for the retention manager: what you found and one action you recommend. Keep to what the data shows.",
    ],
    deliverables: [
      "the workbook (Raw, Clean, Plans, Change log, Summary and Pivot sheets), plus your findings.",
    ],
    criteria: [
      {
        name: "Cleaning",
        points: 25,
        description: "all seven problems fixed, 12 rows remain, change log complete",
      },
      {
        name: "MonthlyCharge and TenureBand columns correct",
        points: 20,
        description: "MonthlyCharge and TenureBand columns correct",
      },
      {
        name: "Churn rates and averages correct",
        points: 20,
        description: "Churn rates and averages correct",
      },
      {
        name: "Two PivotTables correct and readable",
        points: 20,
        description: "Two PivotTables correct and readable",
      },
      {
        name: "Findings",
        points: 15,
        description: "accurate, clear, one sensible action, no claims beyond the data",
      },
    ],
    example: "*Worked example on a different export, a fictional gym's member list. Do not reuse its wording.*\n\n**Change log (two rows).**\n\n| Change | Rows affected | How |\n|---|---|---|\n| Removed exact duplicate of member G1009 | 1 | Data, Remove Duplicates on all columns |\n| \"gold \" and \"GOLD\" changed to \"Gold\" | 2 | `=PROPER(TRIM(B2))`, then Paste Values |\n\n**Banding formula.** *`=IF(D2<6,\"Under 6 months\",IF(D2<=12,\"6-12 months\",\"Over 12 months\"))`*\n\n**Summary.** *Renewal rate for Gold members: `=COUNTIFS(Plan,\"Gold\",Renewed,\"Yes\")/COUNTIFS(Plan,\"Gold\")` = 4 of 5 = 80%.*\n\n**Finding.** *Members in their first six months renewed least often (1 of 4). Call new members in their third month to check how they are getting on.*",
    tips: [
      "Keep the Raw sheet untouched and do all cleaning on a copy.",
      "Fix spelling and spacing before you summarise, or the same group is counted twice.",
      "Refresh PivotTables after changing the source data.",
      "Do not claim one thing causes another from 12 rows; say what the data shows and what to check.",
    ],
  },
  5: {
    overview: "Connectwave's data team has loaded the cleaned customer list from your Module 4 assignment into a database table called `subscribers`. The retention manager wants answers they can trust, with the query behind each one.\n\nWrite one query for each question.",
    materials: "**Set up.** In DB Browser, create a new database called **connectwave.db**, open **Execute SQL**, run this script, and click **Write Changes**.\n\n```sql\nCREATE TABLE subscribers (\n  customer_id     TEXT PRIMARY KEY,\n  plan            TEXT NOT NULL,\n  region          TEXT NOT NULL,\n  tenure_months   INTEGER,\n  data_usage_gb   REAL,\n  complaints      INTEGER,\n  churned         TEXT\n);\nINSERT INTO subscribers VALUES\n  ('K1001','Basic','North',4,3.5,2,'Yes'),\n  ('K1002','Standard','South',18,12.0,0,'No'),\n  ('K1003','Premium','East',30,40.0,1,'No'),\n  ('K1004','Basic','West',2,1.2,3,'Yes'),\n  ('K1005','Standard','North',9,15.5,1,'No'),\n  ('K1006','Premium','South',14,35.0,0,'No'),\n  ('K1007','Basic','East',6,4.0,1,'No'),\n  ('K1008','Standard','West',3,8.0,4,'Yes'),\n  ('K1009','Basic','North',24,2.5,0,'No'),\n  ('K1010','Premium','West',5,22.0,2,'Yes'),\n  ('K1011','Standard','East',12,10.5,1,'No'),\n  ('K1012','Basic','South',1,0.8,2,'Yes');\n```\n\n**Download:** [connectwave.db](/course-files/data-analytics/connectwave.db) (or every course file in one [zip](/course-files/data-analytics/data-analytics-course-files.zip)).",
    tasks: [
      "How many subscribers are in the table?",
      "List the churned subscribers with their plan and tenure, shortest tenure first.",
      "Who are the three heaviest data users?",
      "Which subscribers have 2 or more complaints but have **not** churned?",
      "Which Standard or Premium subscribers are in the West region?",
      "Which subscribers have a tenure from 6 to 12 months inclusive?",
      "Which regions does Connectwave serve? List each once, in alphabetical order.",
      "Which churned subscribers made 3 or more complaints?",
      "The manager asks for \"churned subscribers in the North or South\". Write the query twice, once without brackets and once with them, and explain which is right.",
      "**Findings.** In three to five sentences, tell the manager what tasks 2, 4 and 8 suggest. Keep to what the data shows; 12 customers is a very small sample.",
    ],
    deliverables: [
      "a single .sql or text file with all your queries (each with a `--` comment saying which task it answers), screenshots of the results, and your findings.",
    ],
    criteria: [
      {
        name: "Tasks 1–8",
        points: 56,
        description: "correct queries and results (7 points each)",
      },
      {
        name: "Task 9",
        points: 14,
        description: "both queries, correct choice and a clear explanation",
      },
      {
        name: "Readable SQL",
        points: 10,
        description: "capitals for keywords, one clause per line, comments",
      },
      {
        name: "Findings",
        points: 20,
        description: "accurate, careful about the small sample, one sensible next step",
      },
    ],
    example: "*Worked example on a different table, a fictional `bookings` table at a small hotel. Do not reuse its wording.*\n\n```sql\n-- Bookings of three nights or more, longest first\nSELECT booking_id, room_type, nights\nFROM bookings\nWHERE nights >= 3\nORDER BY nights DESC;\n-- B107 Suite 6; B103 Double 4; B110 Single 3\n```\n\n```sql\n-- Guests with no email recorded\nSELECT guest_id FROM bookings WHERE email IS NULL;\n```\n\n**Finding.** *Three bookings were for three nights or more, and all three came through the website. The manager could test a \"stay three nights\" offer on the website first.*",
    tips: [
      "Write each query in the SQL editor and paste both the query and its result.",
      "Text comparisons are case-sensitive: 'north' and 'North' are different.",
      "Use IS NULL, never = NULL.",
      "Put brackets around OR conditions when you combine them with AND.",
    ],
  },
  6: {
    overview: "Harbour Bank's operations manager wants a picture of one month of account activity: which channels are busiest, how personal and business customers differ, which accounts are inactive, and whether any transactions look unusual enough for the fraud team to check. The data is a small, fictional sample: 6 accounts and 20 transactions in March 2026.\n\nWrite one query for each task.",
    materials: "**Set up.** Create **harbour.db** in DB Browser and run this script, then click **Write Changes**.\n\n```sql\nCREATE TABLE accounts (\n  account_id       TEXT PRIMARY KEY,\n  customer_segment TEXT NOT NULL,\n  branch           TEXT NOT NULL,\n  opened_date      TEXT NOT NULL\n);\nINSERT INTO accounts VALUES\n  ('A101','Personal','Central','2023-02-14'),\n  ('A102','Personal','Eastgate','2024-06-01'),\n  ('A103','Business','Central','2022-09-20'),\n  ('A104','Business','Westfield','2025-01-10'),\n  ('A105','Personal','Westfield','2025-08-05'),\n  ('A106','Personal','Eastgate','2026-02-20');\nCREATE TABLE transactions (\n  txn_id     TEXT PRIMARY KEY,\n  account_id TEXT NOT NULL REFERENCES accounts(account_id),\n  txn_date   TEXT NOT NULL,\n  channel    TEXT NOT NULL,\n  txn_type   TEXT NOT NULL,\n  amount     INTEGER NOT NULL\n);\nINSERT INTO transactions VALUES\n  ('T001','A101','2026-03-01','Mobile','Deposit',500),\n  ('T002','A101','2026-03-03','ATM','Withdrawal',200),\n  ('T003','A101','2026-03-07','Mobile','Transfer',150),\n  ('T004','A101','2026-03-12','Online','Transfer',250),\n  ('T005','A102','2026-03-02','Mobile','Transfer',100),\n  ('T006','A102','2026-03-05','ATM','Withdrawal',120),\n  ('T007','A102','2026-03-09','Mobile','Transfer',80),\n  ('T008','A102','2026-03-14','ATM','Withdrawal',2400),\n  ('T009','A103','2026-03-01','Branch','Deposit',8000),\n  ('T010','A103','2026-03-04','Online','Transfer',3500),\n  ('T011','A103','2026-03-08','Online','Transfer',4200),\n  ('T012','A103','2026-03-15','Branch','Deposit',7500),\n  ('T013','A104','2026-03-02','Online','Transfer',1800),\n  ('T014','A104','2026-03-06','Branch','Deposit',2500),\n  ('T015','A104','2026-03-10','Online','Transfer',1500),\n  ('T016','A104','2026-03-13','Online','Transfer',2200),\n  ('T017','A105','2026-03-03','Mobile','Transfer',60),\n  ('T018','A105','2026-03-06','Mobile','Transfer',90),\n  ('T019','A105','2026-03-11','ATM','Withdrawal',100),\n  ('T020','A105','2026-03-15','Mobile','Transfer',1500);\n```\n\n**Download:** [harbour.db](/course-files/data-analytics/harbour.db) (or every course file in one [zip](/course-files/data-analytics/data-analytics-course-files.zip)).",
    tasks: [
      "How many transactions are there, and what is their total value?",
      "For each channel, show the number of transactions, total value and average value (2 decimals), largest total first.",
      "Which channels had 5 or more transactions? (HAVING)",
      "Which accounts had a total transaction value over 5,000?",
      "Join the tables: for each customer segment, show the number of transactions, total value and average value.",
      "For each branch, show the number of transactions and total value. Include every account, even those with no transactions.",
      "Which accounts had no transactions at all in March?",
      "Band each transaction with CASE: High (2,000 or more), Medium (500 to 1,999) and Low (under 500). Show the count and total value of each band.",
      "**Unusual transactions.**\n   - a) List transactions above the overall average transaction (use a subquery). Which segment do most of them belong to?\n   - b) Now compare each transaction with **its own account's** average. Run the query below, then explain in your own words what the inner query does.\n\n```sql\nSELECT t.txn_id, t.account_id, t.txn_date, t.channel, t.txn_type, t.amount\nFROM transactions AS t\nWHERE t.amount > 3 * (SELECT AVG(t2.amount)\n                      FROM transactions AS t2\n                      WHERE t2.account_id = t.account_id);\n```\n\n**Task 9c.** Which method is more useful for spotting unusual activity, and why?",
      "**Findings.** Write a short memo of five to eight sentences for the operations manager. Cover the busiest channel by count and by value, the personal and business difference, inactive accounts and the transactions you would pass to the fraud team. Say clearly that \"unusual\" does not mean \"fraudulent\"; it means \"worth a check\".",
    ],
    deliverables: [
      "a .sql or text file with all queries (with `--` comments), screenshots of the results, and your memo.",
    ],
    criteria: [
      {
        name: "Tasks 1–4",
        points: 20,
        description: "aggregates, GROUP BY and HAVING correct",
      },
      {
        name: "Tasks 5–7",
        points: 20,
        description: "joins correct, including the LEFT JOIN and inactive account",
      },
      {
        name: "Task 8",
        points: 10,
        description: "CASE bands correct",
      },
      {
        name: "Task 9",
        points: 20,
        description: "both subqueries run, clear explanation and a reasoned choice",
      },
      {
        name: "Readable SQL and checked results",
        points: 10,
        description: "Readable SQL and checked results",
      },
      {
        name: "Memo",
        points: 20,
        description: "accurate, balanced, careful wording about fraud, clear next steps",
      },
    ],
    example: "*Worked example on a different database, a fictional delivery company's `deliveries` and `drivers` tables. Do not reuse its wording.*\n\n```sql\nSELECT d.depot, COUNT(*) AS deliveries, ROUND(AVG(x.minutes), 1) AS avg_minutes\nFROM deliveries AS x\nJOIN drivers AS d ON x.driver_id = d.driver_id\nGROUP BY d.depot\nHAVING COUNT(*) >= 5\nORDER BY avg_minutes DESC;\n-- North 9 deliveries 41.3; South 7 deliveries 35.0\n```\n\n**Unusual-item rule.** *A CASE expression labels any delivery over twice the depot's average time as 'Check'. Two deliveries are flagged; both were on the same rainy day, so the note to the manager says to check the weather before blaming drivers.*",
    tips: [
      "Use WHERE to filter rows before grouping and HAVING to filter groups after.",
      "Every non-aggregated column in SELECT must be in GROUP BY.",
      "Use a LEFT JOIN when you need records with no match, such as inactive accounts.",
      "In SQLite, whole-number division drops decimals: multiply by 1.0 first.",
    ],
  },
  7: {
    overview: "Delta Ridge Energy (fictional) operates two production assets, DR-01 and DR-02. The operations manager wants a short statistical summary of the first 14 days of March: how close each asset was to plan, how steady it was, which days were unusual, and whether downtime explains lost output.",
    materials: "**Data.** Type this into a sheet called **Production** (output is in barrels per day; downtime is in hours).\n\n| Date | DR-01 planned | DR-01 actual | DR-01 downtime | DR-02 planned | DR-02 actual | DR-02 downtime |\n| --- | --- | --- | --- | --- | --- | --- |\n| 2026-03-01 | 1200 | 1190 | 0 | 800 | 805 | 0 |\n| 2026-03-02 | 1200 | 1205 | 0 | 800 | 770 | 1 |\n| 2026-03-03 | 1200 | 1100 | 2 | 800 | 790 | 0 |\n| 2026-03-04 | 1200 | 1210 | 0 | 800 | 810 | 0 |\n| 2026-03-05 | 1200 | 1150 | 1 | 800 | 800 | 0 |\n| 2026-03-06 | 1200 | 1195 | 0 | 800 | 660 | 4 |\n| 2026-03-07 | 1200 | 880 | 6 | 800 | 795 | 0 |\n| 2026-03-08 | 1200 | 1200 | 0 | 800 | 805 | 0 |\n| 2026-03-09 | 1200 | 1185 | 0 | 800 | 735 | 2 |\n| 2026-03-10 | 1200 | 1050 | 3 | 800 | 790 | 0 |\n| 2026-03-11 | 1200 | 1210 | 0 | 800 | 800 | 0 |\n| 2026-03-12 | 1200 | 1190 | 0 | 800 | 810 | 0 |\n| 2026-03-13 | 1200 | 1140 | 1 | 800 | 795 | 0 |\n| 2026-03-14 | 1200 | 1205 | 0 | 800 | 500 | 9 |",
    tasks: [
      "**Plan attainment (Lesson 7.3).** For each asset, calculate total planned output, total actual output and attainment (actual ÷ planned) as a percentage.",
      "**Averages (Lesson 7.1).** For each asset, calculate the mean and median daily output. Explain why they differ.",
      "**Spread and outliers (Lesson 7.2).** For each asset, calculate the standard deviation, Q1, Q3, IQR and the lower fence (Q1 − 1.5 × IQR). Flag the days below the lower fence.",
      "**Day-on-day change (Lesson 7.3).** Add a column of daily percentage change in actual output for DR-02 and identify the largest fall.",
      "**Correlation (Lesson 7.4).** For each asset, calculate the correlation between downtime hours and actual output. Draw one scatter plot.",
      "**Findings.** Write five to seven sentences for the operations manager: attainment, steadiness, unusual days, the downtime relationship, and one recommendation. Use careful language about cause.",
    ],
    deliverables: [
      "the workbook and your findings.",
    ],
    criteria: [
      {
        name: "Attainment correct for both assets",
        points: 15,
        description: "Attainment correct for both assets",
      },
      {
        name: "Means and medians correct, with a clear explanation",
        points: 15,
        description: "Means and medians correct, with a clear explanation",
      },
      {
        name: "Spread measures and outlier flags correct",
        points: 25,
        description: "Spread measures and outlier flags correct",
      },
      {
        name: "Day-on-day change and largest fall correct",
        points: 10,
        description: "Day-on-day change and largest fall correct",
      },
      {
        name: "Correlations and a labelled scatter plot",
        points: 15,
        description: "Correlations and a labelled scatter plot",
      },
      {
        name: "Findings",
        points: 20,
        description: "accurate, careful about cause, one practical recommendation",
      },
    ],
    example: "*Worked example on a different site, a fictional water plant's daily output. Do not reuse its wording.*\n\n| Measure | Plant A | Plant B |\n|---|---|---|\n| Mean output (m³) | 4,812 | 3,150 |\n| Median output | 4,900 | 3,180 |\n| Standard deviation | 210 | 395 |\n| Coefficient of variation | 4.4% | 12.5% |\n\n*Plant B is the less steady plant: its output varies about three times as much relative to its average. One Plant B day (2,050) is below Q1 − 1.5 × IQR, so it is flagged for checking. The correlation between downtime hours and output is −0.86: days with more downtime had lower output. That is a strong relationship, but only 14 days, so we say \"is linked to\", not \"causes\".*",
    tips: [
      "Report the median as well as the mean when a few values are extreme.",
      "Use the coefficient of variation to compare spread between groups of different sizes.",
      "Percentage points and percentages are different: say which you mean.",
      "A correlation does not prove cause, especially from a small number of days.",
    ],
  },
  8: {
    overview: "Connectwave Telecom's customer director wants one page that shows how the customer base changed from January to June 2026 and where network problems are worst. Connectwave started January with 10,000 active customers.",
    materials: "**Data: monthly customers**\n\n| Month | New customers | Customers lost (churned) | Complaints |\n| --- | --- | --- | --- |\n| Jan | 620 | 410 | 310 |\n| Feb | 580 | 430 | 325 |\n| Mar | 640 | 520 | 390 |\n| Apr | 600 | 610 | 470 |\n| May | 560 | 650 | 520 |\n| Jun | 590 | 700 | 560 |\n\n**Data: dropped calls by site, June**\n\n| Site | Calls attempted | Calls dropped |\n| --- | --- | --- |\n| S01 | 12000 | 96 |\n| S02 | 9500 | 190 |\n| S03 | 15000 | 105 |\n| S04 | 8000 | 240 |\n| S05 | 11000 | 88 |\n| S06 | 10500 | 147 |",
    tasks: [
      "**Prepare (20 marks).** Enter both tables in a workbook. Add columns for active customers at the start and end of each month (end = start + new − churned) and churn rate (churned ÷ active at the start of the month). Add a drop rate column (dropped ÷ attempted) for each site and an \"All sites\" total row.",
      "**KPI cards (20 marks).** On a **Dashboard** sheet, show four KPIs built with formulas: active customers at the end of June; net change in customers since January; June churn rate; and the overall drop rate.",
      "**Charts (30 marks).** Add three charts: churn rate by month (line); new and churned customers by month (clustered column); drop rate by site (bar, sorted, the worst site highlighted). Every chart needs a title that states the finding, no clutter, and an honest axis.",
      "**Message (20 marks).** Under the charts, write 100–150 words for the director using What? So what? Now what?, with at least one caveat.",
      "**Layout (10 marks).** The dashboard fits on one landscape page, with KPIs along the top and consistent formatting.",
    ],
    deliverables: [
      "the workbook and a PDF or screenshot of the dashboard page.",
    ],
    criteria: [
      {
        name: "Prepare",
        points: 20,
        description: "Enter both tables in a workbook.",
      },
      {
        name: "KPI cards",
        points: 20,
        description: "On a Dashboard sheet, show four KPIs built with formulas:",
      },
      {
        name: "Charts",
        points: 30,
        description: "Add three charts:",
      },
      {
        name: "Message",
        points: 20,
        description: "Under the charts, write 100–150 words for the director using What? So what? Now what?, with at least one caveat.",
      },
      {
        name: "Layout",
        points: 10,
        description: "The dashboard fits on one landscape page, with KPIs along the top and consistent formatting.",
      },
    ],
    example: "*Worked example on a different organisation, a fictional city bus service. Do not reuse its wording.*\n\n**KPI cards.** Passengers (June) 412,300 · On-time rate 87.4% · Complaints per 10,000 passengers 3.1.\n\n**Charts.** A line chart of monthly passengers (title: *\"Passengers grew every month from January to June\"*), and a sorted bar chart of on-time rate by route (title: *\"Route 7 is the least punctual, at 71%\"*). The bar axis starts at zero; Route 7 is the only bar in a strong colour.\n\n**Message.** *What: Route 7 ran on time only 71% of the time in June. So what: it carries 18% of passengers, so delays affect many people. Now what: review Route 7's timetable and road works before July.*",
    tips: [
      "Show three to five KPIs, with the most important at the top left.",
      "Use formulas for KPI cards so they update when the data changes.",
      "Start bar and column axes at zero, and use one strong colour for the point you are making.",
      "Every chart needs a title that states the finding.",
    ],
  },
  9: {
    overview: "Harbour Bank's operations manager wants a one-page interactive report on March 2026 transactions, to see where the money moves and which transactions need a check.",
    materials: "**Data:** harbour\\_accounts.csv (6 accounts) and harbour\\_transactions.csv (20 transactions), the same Harbour Bank data you queried in Modules 5 and 6 and described in Module 7.\n\n**Mac route:** do the same in Excel with Power Query, PivotTables, PivotCharts and a slicer; use PivotTable values (Sum, Count, Average) in place of the measures and count active accounts with a formula.\n\n**Download:** [harbour_accounts.csv](/course-files/data-analytics/harbour_accounts.csv) · [harbour_transactions.csv](/course-files/data-analytics/harbour_transactions.csv) (or every course file in one [zip](/course-files/data-analytics/data-analytics-course-files.zip)).",
    tasks: [
      "**Get and clean (20 marks).** Load both files and rename the tables accounts and transactions. In Power Query, check the data types, rename columns to clear names, and add an is\\_large column (amount of 1,000 or more). List your applied steps.",
      "**Model and measures (20 marks).** Create and check the accounts-to-transactions relationship. Write four measures: Total Amount, Transactions, Average Amount and Active Accounts (accounts with at least one transaction).",
      "**Report (40 marks).** Build one page with: four KPI cards; total amount by segment; total amount by channel (sorted bar); total amount by branch; a table of Personal transactions of 1,000 or more; and a slicer for segment. Titles must state findings; follow Module 8's design rules.",
      "**Findings (20 marks).** In 80–120 words, give the manager the main findings (What? So what? Now what?), including which transactions need a check and why, and one caveat.",
    ],
    deliverables: [
      "the .pbix file (or the Excel workbook) and a screenshot of the report page.",
    ],
    criteria: [
      {
        name: "Get and clean",
        points: 20,
        description: "Load both files and rename the tables accounts and transactions.",
      },
      {
        name: "Model and measures",
        points: 20,
        description: "Create and check the accounts-to-transactions relationship.",
      },
      {
        name: "Report",
        points: 40,
        description: "Build one page with:",
      },
      {
        name: "Findings",
        points: 20,
        description: "In 80–120 words, give the manager the main findings (What? So what? Now what?), including which transactions need a check and why, and one caveat.",
      },
    ],
    example: "*Worked example on a different file, a fictional college's fee payments. Do not reuse its wording.*\n\n**Applied steps.** Promoted headers → Changed type (amount to Whole Number, paid_date to Date) → Trimmed and capitalised `method` → Removed one duplicate payment → Added `month` from paid_date.\n\n**Measures.**\n\n- `Total Paid = SUM(payments[amount])`\n- `Payments = COUNTROWS(payments)`\n- `Average Payment = DIVIDE([Total Paid], [Payments])`\n\n**Report.** Cards for the three measures, a bar chart of Total Paid by method, a table of the five largest payments and a method slicer.\n\n**Finding.** *Mobile transfers were 61% of payments by count but 38% by value: students pay small amounts often. The two largest payments (both bank transfers) should be matched to their invoices.*",
    tips: [
      "Clean in Power Query, not in the source file, so the steps repeat on refresh.",
      "Check every column's data type before building visuals.",
      "Use measures for totals and averages rather than dragging columns and hoping the default is right.",
      "Check your report totals against the CSV before you write findings.",
    ],
  },
  10: {
    overview: "Brightpath Services' finance director wants a reliable Power BI model of revenue and cost by department, January 2025 to April 2026, and an honest comparison of January–April 2026 with the same months of 2025.",
    materials: "**Data:** brightpath\\_fact\\_finance.csv (48 rows: entry\\_id, month\\_start, dept\\_id, revenue, cost) and brightpath\\_dim\\_department.csv (3 rows: dept\\_id, department, head\\_count). The January–April 2026 figures are the same Brightpath figures used in Modules 3, 7 and 8.\n\n**Mac or no Power BI:** build the same analysis in Excel: add the department name with XLOOKUP, add Year and Month columns, and use a PivotTable with revenue and cost summed by department and year (months 1–4 filtered). Calculate Margin % and YoY % in cells next to the PivotTable. Explain in one sentence how this differs from a measure.\n\n**Download:** [brightpath_dim_department.csv](/course-files/data-analytics/brightpath_dim_department.csv) · [brightpath_fact_finance.csv](/course-files/data-analytics/brightpath_fact_finance.csv) (or every course file in one [zip](/course-files/data-analytics/data-analytics-course-files.zip)).",
    tasks: [
      "**Model (25 marks).** Build a star schema: fact\\_finance, dim\\_department and a marked Calendar table (2025–2026) with Year, Month and Month Number columns, Month sorted by Month Number. Write the grain of fact\\_finance. Screenshot Model view.",
      "**Measures (35 marks).** Create Total Revenue, Total Cost, Margin, Margin %, Revenue YTD, Revenue LY, Revenue YoY %, and IT Support Margin % (using CALCULATE). Use DIVIDE for every ratio.",
      "**Analysis (25 marks).** Build a matrix of department by year with Total Revenue, Margin % and Revenue YoY %, filtered to months 1–4. Also build a monthly matrix of IT Support Margin % for 2025 and 2026.",
      "**Findings (15 marks).** In 80–120 words: how January–April 2026 compares with 2025, which department grew fastest, and what has happened to IT Support's margin. Include one caveat.",
    ],
    deliverables: [
      "the .pbix file (or the Excel workbook), screenshots and your findings.",
    ],
    criteria: [
      {
        name: "Model",
        points: 25,
        description: "Build a star schema:",
      },
      {
        name: "Measures",
        points: 35,
        description: "Create Total Revenue, Total Cost, Margin, Margin %, Revenue YTD, Revenue LY, Revenue YoY %, and IT Support Margin % (using CALCULATE).",
      },
      {
        name: "Analysis",
        points: 25,
        description: "Build a matrix of department by year with Total Revenue, Margin % and Revenue YoY %, filtered to months 1–4.",
      },
      {
        name: "Findings",
        points: 15,
        description: "In 80–120 words:",
      },
    ],
    example: "*Worked example on a different model, a fictional chain of three clinics. Do not reuse its wording.*\n\n**Model.** `fact_visits` (one clinic, one service, one month) related one-to-many to `dim_clinic`, `dim_service` and a marked `Calendar` table, single direction.\n\n**Measures.**\n\n- `Revenue = SUM(fact_visits[revenue])`\n- `Revenue LY = CALCULATE([Revenue], SAMEPERIODLASTYEAR('Calendar'[Date]))`\n- `Growth % = DIVIDE([Revenue] - [Revenue LY], [Revenue LY])`\n\n**Honest comparison.** *2026 data stops in April, so the Month Number filter is set to 1–4 for both years. January–April revenue rose 6.2%; the full-year comparison would have wrongly shown a fall of 64%.*",
    tips: [
      "Name the grain of the fact table before you build anything.",
      "Relationships go from dimensions to the fact table, one-to-many, single direction.",
      "Mark the Calendar table as a date table, or time intelligence will not work.",
      "Compare equal periods when one year is incomplete.",
    ],
  },
  11: {
    overview: "Brightpath's finance director has seen your Module 10 model and wants a dashboard to use in monthly reviews: an overview of revenue and margin against last year, and a way to look into any department.",
    materials: "**Data:** your **Brightpath model.pbix** from Module 10 (or rebuild it from brightpath\\_fact\\_finance.csv and brightpath\\_dim\\_department.csv).\n\n**Mac or no Power BI:** build an Excel dashboard on one sheet: a PivotTable and PivotCharts by department and month, slicers for department and year, a timeline or month filter, KPI cells with formulas comparing 2026 and 2025 for months 1–4, conditional formatting (Margin % below 15%) with icon sets, and a second sheet for IT Support detail. Reconcile totals and save as PDF.\n\n**Download:** [brightpath_dim_department.csv](/course-files/data-analytics/brightpath_dim_department.csv) · [brightpath_fact_finance.csv](/course-files/data-analytics/brightpath_fact_finance.csv) (or every course file in one [zip](/course-files/data-analytics/data-analytics-course-files.zip)).",
    tasks: [
      "**Plan (15 marks).** One page: audience, three user stories, four questions with a KPI each, and a wireframe.",
      "**Overview page (30 marks).** Year (tile), Month Number (between) and Department (dropdown) slicers; a KPI visual of revenue against last year; cards for Revenue YoY %, Margin and Margin %; a department table with conditional formatting (Margin % below 15% flagged by colour and icon) and data bars; a monthly revenue chart with drill-down from year to month; a dynamic title.",
      "**Department detail page (20 marks).** A drill-through page by department with monthly Margin % and revenue against last year, plus a report-page tooltip used on the overview.",
      "**Review (20 marks).** Reconcile two totals with the CSV files, add alt text to every visual, run Performance analyzer, and export the dashboard to PDF.",
      "**Message (15 marks).** In 80–120 words, what the director should take from the dashboard for January–April 2026, with one caveat.",
    ],
    deliverables: [
      "the .pbix file (or the workbook), the PDF, the plan and your message.",
    ],
    criteria: [
      {
        name: "Plan",
        points: 15,
        description: "One page:",
      },
      {
        name: "Overview page",
        points: 30,
        description: "Year (tile), Month Number (between) and Department (dropdown) slicers; a KPI visual of revenue against last year; cards for Revenue YoY %, Margin and Margin %; a department table with conditional formatting (Margin % below 15% flagged by colour and icon) and data bars; a monthly revenue chart with drill-down from year to month; a dynamic title.",
      },
      {
        name: "Department detail page",
        points: 20,
        description: "A drill-through page by department with monthly Margin % and revenue against last year, plus a report-page tooltip used on the overview.",
      },
      {
        name: "Review",
        points: 20,
        description: "Reconcile two totals with the CSV files, add alt text to every visual, run Performance analyzer, and export the dashboard to PDF.",
      },
      {
        name: "Message",
        points: 15,
        description: "In 80–120 words, what the director should take from the dashboard for January–April 2026, with one caveat.",
      },
    ],
    example: "*Worked example on a different dashboard, a fictional hotel group's monthly review. Do not reuse its wording.*\n\n**Plan.** Audience: the operations director. Questions: (1) Is occupancy above last year? (2) Which hotel is falling behind? (3) Which room types drive revenue?\n\n**Overview page.** KPI visual for occupancy against target with a trend; cards for revenue and YoY %; a bar chart of revenue by hotel with a drill-through to a hotel detail page; Year and Month Number slicers synced across both pages.\n\n**Conditional formatting.** YoY % shows a red down-arrow below 0 and a green up-arrow above 0, so colour is never the only signal.\n\n**Review.** *The overview total (8,214,500) matches the source file; every visual loads in under 1 second in Performance analyzer; alt text is written for each chart.*",
    tips: [
      "Start from the audience and their questions, not from the visuals available.",
      "Sync slicers when one choice should apply on several pages.",
      "Use Edit interactions so a click filters only what it should.",
      "Never use Publish to web for business data.",
    ],
  },
  12: {
    overview: "Harbour Bank's operations manager wants to know whether the analytics team can check March transactions with Python, so the checks can be re-run every month.",
    materials: "**Data:** harbour\\_transactions.csv (20 transactions: txn\\_id, account\\_id, txn\\_date, channel, txn\\_type, amount).\n\n**Hint for amount\\_band:** `t[\"amount_band\"] = [\"Large\" if a >= 1000 else \"Small\" for a in t[\"amount\"]]` builds the column by looping over the amounts.\n\n**Download:** [harbour_transactions.csv](/course-files/data-analytics/harbour_transactions.csv) (or every course file in one [zip](/course-files/data-analytics/data-analytics-course-files.zip)).",
    tasks: [
      "**Lists and loops (30 marks).** In a code cell, create a list of the 12 personal-account amounts in order: `[500, 200, 150, 250, 100, 120, 80, 2400, 60, 90, 100, 1500]` (accounts A101, A102 and A105). Print the count, total, mean, highest and lowest with f-strings. Loop through the list and label each amount \"Check\" if it is above the personal upper fence of 635 (Module 7), otherwise \"Normal\". Count the amounts of 1,000 or more.",
      "**Load and inspect (25 marks).** Upload the file, load it with Pandas, and show head(), shape and info(). In a text cell, describe the table in two sentences.",
      "**Answer questions (30 marks).** With Pandas, find: the total and mean amount; the largest transaction and its txn\\_id; the number of transactions of 1,000 or more; the number of transactions by channel; the total of withdrawals. Add a column **amount\\_band** (\"Large\" for 1,000 or more, otherwise \"Small\") and count each band.",
      "**Notes (15 marks).** Add text cells throughout explaining each step in plain English, and finish with three findings for the manager.",
    ],
    deliverables: [
      "a share link to the notebook (Viewer access) or the .ipynb file.",
    ],
    criteria: [
      {
        name: "Lists and loops",
        points: 30,
        description: "In a code cell, create a list of the 12 personal-account amounts in order:",
      },
      {
        name: "Load and inspect",
        points: 25,
        description: "Upload the file, load it with Pandas, and show head(), shape and info().",
      },
      {
        name: "Answer questions",
        points: 30,
        description: "With Pandas, find:",
      },
      {
        name: "Notes",
        points: 15,
        description: "Add text cells throughout explaining each step in plain English, and finish with three findings for the manager.",
      },
    ],
    example: "*Worked example on a different list, a fictional shop's daily takings for one week. Do not reuse its wording.*\n\n```python\ntakings = [4200, 3900, 5100, 2800, 6100, 7300, 3500]\nbig_days = 0\nfor amount in takings:\n    if amount >= 5000:\n        big_days = big_days + 1\nprint(\"Days of 5,000 or more:\", big_days)   # 3\nprint(f\"Average: {sum(takings) / len(takings):,.2f}\")   # 4,700.00\n```\n\n```python\nimport pandas as pd\nweek = pd.read_csv(\"shop_week.csv\")\nprint(week.shape)          # (7, 3)\nweek.info()                # no missing values; amount is int64\n```\n\n**Note (text cell).** *Saturday's 7,300 is the highest day; it was a public holiday, so it should not be used as a normal target.*",
    tips: [
      "Run cells in order from the top; a NameError usually means an earlier cell was not run.",
      "Indent the lines inside if and for blocks by four spaces.",
      "Check shape and info() before answering any question.",
      "Write your notes in text cells, in your own words.",
    ],
  },
  13: {
    overview: "Harbour Bank's customer manager says: \"Too many customers closed their accounts this year. Before we spend money on a retention campaign, tell me who is leaving and what they have in common.\"",
    materials: "**Data:** harbour\\_customers.csv. It should hold 60 customers, but it has 61 rows and some problems. Columns: customer\\_id, segment (Personal or Business), branch, age, tenure\\_years, products\\_held, avg\\_balance, digital\\_user (uses the app or online banking: Yes/No), complaints\\_12m (complaints in the last 12 months), closed\\_2026 (Yes/No).\n\n**Hint:** `df[\"closed\"] = (df[\"closed_2026\"] == \"Yes\").astype(int)` makes a flag whose mean, by group, is the closure rate.\n\n**Download:** [harbour_customers.csv](/course-files/data-analytics/harbour_customers.csv) · [harbour_customers_clean.csv](/course-files/data-analytics/harbour_customers_clean.csv) (or every course file in one [zip](/course-files/data-analytics/data-analytics-course-files.zip)).",
    tasks: [
      "**Inspect and clean (30 marks).** Find and fix every problem: duplicates, inconsistent text, numbers stored as text and missing values. Write a cleaning log: one text cell per fix saying what was wrong and how many values changed. Save **harbour\\_customers\\_clean.csv**.",
      "**Describe (15 marks).** Use describe() and value\\_counts() to describe the customers: segments, branches, age, tenure, balances, and the overall closure rate.",
      "**Compare (30 marks).** Calculate the closure rate, with counts, by complaints, products held, digital use, segment, branch and tenure band (0–1, 2–3, 4–6 and 7+ years; `pd.cut` with `bins=[0, 1, 3, 6, 50]`, `include_lowest=True`). Draw at least three clear charts.",
      "**Findings (25 marks).** Write five findings for the manager, each with numbers, its limits and a next step, and one recommendation for where the retention campaign should start.",
    ],
    deliverables: [
      "a share link to the notebook (Viewer access) or the .ipynb file, plus the clean CSV.",
    ],
    criteria: [
      {
        name: "Inspect and clean",
        points: 30,
        description: "Find and fix every problem:",
      },
      {
        name: "Describe",
        points: 15,
        description: "Use describe() and value_counts() to describe the customers:",
      },
      {
        name: "Compare",
        points: 30,
        description: "Calculate the closure rate, with counts, by complaints, products held, digital use, segment, branch and tenure band (0–1, 2–3, 4–6 and 7+ years; pd.cut with bins=[0, 1, 3, 6, 50], include_lowest=True).",
      },
      {
        name: "Findings",
        points: 25,
        description: "Write five findings for the manager, each with numbers, its limits and a next step, and one recommendation for where the retention campaign should start.",
      },
    ],
    example: "*Worked example on a different file, a fictional gym's member list. Do not reuse its wording.*\n\n**Cleaning log.** *Removed 2 exact duplicate rows (62 to 60). Standardised `plan` with `.str.strip().str.title()` (5 values changed). Converted `visits` from text to numbers after removing \" visits\" (3 values). Left 1 missing age blank and noted it.*\n\n```python\nmembers[\"left\"] = (members[\"renewed\"] == \"No\").astype(int)\nmembers.groupby(\"plan\")[\"left\"].agg([\"mean\", \"count\"]).round(2)\n# Basic 0.42 (24), Standard 0.25 (20), Premium 0.13 (16)\n```\n\n**Finding.** *Basic members left most often (42% of 24). Premium members left least (13% of 16). With these small groups the gap could change with more data; next, check whether Basic members also visit less often.*",
    tips: [
      "Keep the raw file unchanged and save the clean data under a new name.",
      "Show the count next to every rate.",
      "Start every chart's value axis at zero and give it a message title.",
      "Say \"is linked to\" rather than \"causes\" unless you have tested a cause.",
    ],
  },
  14: {
    overview: "Harbour Bank's customer manager has your Module 13 analysis of account closures. They now ask: \"Write it up so the executive team can decide where to spend the retention budget, and present it at Thursday's meeting.\"",
    materials: "**Data:** your cleaned **harbour\\_customers\\_clean.csv** and your Module 13 results (if you did not complete Module 13, use the figures in the model answer your instructor provides).\n\n**Download:** [harbour_customers_clean.csv](/course-files/data-analytics/harbour_customers_clean.csv) (or every course file in one [zip](/course-files/data-analytics/data-analytics-course-files.zip)).",
    tasks: [
      "**Analysis brief (15 marks).** One page: the business question, the decision, stakeholders, two KPIs with full definitions (one leading, one lagging), data, scope and limits.",
      "**One-page report (35 marks).** Message title, summary, three to five findings (claim, number, comparison), recommendation (action, owner, timescale, success measure) and method and limits.",
      "**Options and impact (20 marks).** Compare at least three options, including doing nothing, against four criteria. Estimate how many closures might have been avoided if your target group had closed at the rate of the other customers, stating your assumption.",
      "**Presentation (30 marks).** Five slides with message titles plus at least one backup slide, and a recording of you presenting in under six minutes (or a written script if you cannot record).",
    ],
    deliverables: [
      "the brief and report (PDF or document link), the slides (PDF) and the recording link.",
    ],
    criteria: [
      {
        name: "Analysis brief",
        points: 15,
        description: "One page:",
      },
      {
        name: "One-page report",
        points: 35,
        description: "Message title, summary, three to five findings (claim, number, comparison), recommendation (action, owner, timescale, success measure) and method and limits.",
      },
      {
        name: "Options and impact",
        points: 20,
        description: "Compare at least three options, including doing nothing, against four criteria.",
      },
      {
        name: "Presentation",
        points: 30,
        description: "Five slides with message titles plus at least one backup slide, and a recording of you presenting in under six minutes (or a written script if you cannot record).",
      },
    ],
    example: "*Worked example on a different brief, a fictional college deciding where to spend a student-support budget. Do not reuse its wording.*\n\n**Report title.** *\"First-year evening students are three times as likely to drop out\"*\n\n**Summary.** *22% of first-year evening students left before the end of the year, against 7% of day students (148 and 612 students). We recommend a mentoring scheme for evening students starting in September, owned by the Head of Student Services, with success defined as evening drop-out below 12% by next June.*\n\n**Options.** | Option | Impact | Cost | Speed | Risk | — mentoring scheme (high, medium, fast, low) is compared with do nothing and with a fee discount.\n\n**First slide.** *The answer and its key number; method and data checks go in backup slides.*",
    tips: [
      "Put the answer and the recommendation first.",
      "Every finding needs a number and a comparison.",
      "A complete recommendation says who does what, by when, and how success is measured.",
      "State your assumptions and limits plainly.",
    ],
  },
  15: {
    overview: "Delta Ridge's operations manager says: \"April to June looked worse than January to March. Before the quarterly review, tell me what changed, where, and why, and what we should do first. Safety first, please.\"",
    materials: "**Data:** delta\\_ridge\\_production.csv, delta\\_ridge\\_maintenance.csv and delta\\_ridge\\_safety.csv. Quarter 1 (Q1) is January–March 2026 and quarter 2 (Q2) is April–June 2026.\n\n**Hint:** `prod[\"quarter\"] = \"Q\" + prod[\"date\"].dt.quarter.astype(str)` adds a quarter column. For the monthly safety file, `int(month[-2:]) <= 3` identifies Q1.\n\n**Download:** [delta_ridge_maintenance.csv](/course-files/data-analytics/delta_ridge_maintenance.csv) · [delta_ridge_production.csv](/course-files/data-analytics/delta_ridge_production.csv) · [delta_ridge_safety.csv](/course-files/data-analytics/delta_ridge_safety.csv) (or every course file in one [zip](/course-files/data-analytics/data-analytics-course-files.zip)).",
    tasks: [
      "**Safety (20 marks).** By asset and quarter: hours worked, near misses, recordable injuries, lost time injuries and TRIR. Comment on any trend in near misses, with counts.",
      "**Production and downtime (30 marks).** By asset and quarter: attainment %, availability %, lost barrels and downtime hours by cause. Separate planned from unplanned downtime.",
      "**Maintenance (20 marks).** By asset and quarter: corrective and preventive work orders, repair hours and cost. Identify the equipment behind any rise in failures.",
      "**Dashboard and briefing (30 marks).** A one-page dashboard (Power BI, Excel or a Python figure) comparing Q1 and Q2, and a one-page briefing for the manager in the Module 14 format: message title, summary, findings with numbers, recommendation (action, owner, timescale, success measure) and limits.",
    ],
    deliverables: [
      "the notebook or .pbix file, the dashboard image and the briefing.",
    ],
    criteria: [
      {
        name: "Safety",
        points: 20,
        description: "By asset and quarter:",
      },
      {
        name: "Production and downtime",
        points: 30,
        description: "By asset and quarter:",
      },
      {
        name: "Maintenance",
        points: 20,
        description: "By asset and quarter:",
      },
      {
        name: "Dashboard and briefing",
        points: 30,
        description: "A one-page dashboard (Power BI, Excel or a Python figure) comparing Q1 and Q2, and a one-page briefing for the manager in the Module 14 format:",
      },
    ],
    example: "*Worked example on a different operation, a fictional bottling plant with two filling lines. Do not reuse its wording.*\n\n**Safety first.** *0 recordable injuries and 14 near misses in the quarter (9 the quarter before). Near-miss reporting is up, which is a good sign of reporting culture; the most common type was wet floors near Line 2.*\n\n**Production.** *Line 1 attainment 98.1%, availability 99.0%. Line 2 attainment 91.4%, availability 93.5%.* A downtime Pareto by hours shows conveyor jams (46%) and changeovers (31%) make up 77% of lost time.\n\n**Maintenance.** *Line 2 MTBF fell from 410 to 236 hours; corrective orders rose from 8 to 15.*\n\n**Priority.** *Fix the Line 2 conveyor guide (the cause of most jams) before the next quarter, and track jams per week as the leading indicator.*",
    tips: [
      "Always report safety first, with counts beside every rate.",
      "Separate downtime losses from slow running.",
      "Rank causes by both hours and barrels; they can tell different stories.",
      "Compare like with like: quarter against quarter, asset against asset.",
    ],
  },
  16: {
    overview: "Harbour Bank's chief operating officer says: \"The bank's NPL ratio has risen every month and costs jumped in March. Tell me which branches are responsible, what else is changing, and what we should do. I also want a list of customers to contact this month.\"",
    materials: "**Data:** harbour\\_branch\\_monthly.csv (July 2025–June 2026), harbour\\_txn\\_q1\\_2026.csv and harbour\\_customers\\_clean.csv. Money figures are in thousands.\n\n**Download:** [harbour_branch_monthly.csv](/course-files/data-analytics/harbour_branch_monthly.csv) · [harbour_customers_clean.csv](/course-files/data-analytics/harbour_customers_clean.csv) · [harbour_txn_q1_2026.csv](/course-files/data-analytics/harbour_txn_q1_2026.csv) (or every course file in one [zip](/course-files/data-analytics/data-analytics-course-files.zip)).",
    tasks: [
      "**Branch KPIs (30 marks).** For each branch and month, calculate NPL ratio, cost-to-income, loan-to-deposit and profit. Compare July 2025 with June 2026, and July–December 2025 (H2 2025) with January–June 2026 (H1 2026) for income, cost, profit and cost-to-income.",
      "**Find the drivers (25 marks).** Identify which branch drives the rise in the bank's NPL ratio and which drives the March cost step. Identify the branch growing deposits fastest.",
      "**Dashboard (20 marks).** A one-page dashboard (Power BI, Excel or Python) with KPI cards, trends and a branch comparison.",
      "**Briefing and contact list (25 marks).** A one-page briefing in the Module 14 format, plus a customer contact list: the alerts from Lesson 16.2 (for the fraud and compliance teams) and the early-warning customers from Lesson 16.3 who have not yet closed (for retention calls), each with the reason.",
    ],
    deliverables: [
      "notebook or .pbix, dashboard image and the briefing.",
    ],
    criteria: [
      {
        name: "Branch KPIs",
        points: 30,
        description: "For each branch and month, calculate NPL ratio, cost-to-income, loan-to-deposit and profit.",
      },
      {
        name: "Find the drivers",
        points: 25,
        description: "Identify which branch drives the rise in the bank's NPL ratio and which drives the March cost step.",
      },
      {
        name: "Dashboard",
        points: 20,
        description: "A one-page dashboard (Power BI, Excel or Python) with KPI cards, trends and a branch comparison.",
      },
      {
        name: "Briefing and contact list",
        points: 25,
        description: "A one-page briefing in the Module 14 format, plus a customer contact list:",
      },
    ],
    example: "*Worked example on a different lender, a fictional savings and loans cooperative with two branches. Do not reuse its wording.*\n\n```python\nbranch = fin.groupby(\"branch\")[[\"loans\", \"npl\", \"cost\", \"income\"]].sum()\nbranch[\"npl_%\"] = (branch[\"npl\"] / branch[\"loans\"] * 100).round(2)\nbranch[\"cti_%\"] = (branch[\"cost\"] / branch[\"income\"] * 100).round(1)\n# Hillside npl 5.10%, cti 81.2%; Riverbank npl 2.40%, cti 66.0%\n```\n\n**Driver.** *Hillside holds 41% of loans but 64% of non-performing loans. Most of the rise came from loans issued in the last six months.*\n\n**Contact list.** *Customers whose activity in the last two months fell by more than half, with no complaint resolved: 9 customers, listed by ID only, marked \"for the relationship team to call\".*",
    tips: [
      "Calculate ratios from totals, not by averaging branch ratios.",
      "Never add balances across months; add only flows such as income and cost.",
      "Build warnings only from data available before the outcome (no leakage).",
      "Use customer IDs, not names, in anything you share.",
    ],
  },
  17: {
    overview: "Connectwave's commercial director and network director want a joint plan: \"Churn in the West region is higher than elsewhere. Is it the network, the customers, or both? Who should we contact first, and what should the network team fix?\"",
    materials: "**Data:** connectwave\\_customers\\_2026.csv and connectwave\\_network\\_daily.csv (Q2 2026).\n\n**Download:** [connectwave_customers_2026.csv](/course-files/data-analytics/connectwave_customers_2026.csv) · [connectwave_network_daily.csv](/course-files/data-analytics/connectwave_network_daily.csv) (or every course file in one [zip](/course-files/data-analytics/data-analytics-course-files.zip)).",
    tasks: [
      "**Customers (25 marks).** Churn rate, with counts, by region and by home site. Compare West with the other regions, and S06 with S07 within West.",
      "**Network (25 marks).** Drop rate by site and month, speeds and outages, and the relationship between dropped calls in the last 30 days (`dropped_calls_30d`) and churn.",
      "**Improved risk score (25 marks).** Add a fourth warning sign for network experience (for example, 6 or more dropped calls in 30 days = 2 points) to the Lesson 17.2 score. Test the new score for separation and capture against the old one. Produce a contact list of active (not churned) customers in the High band, ordered by score, with their monthly revenue.",
      "**Joint plan (25 marks).** A dashboard and a one-page briefing for both directors in the Module 14 format: findings, a network action, a retention action, owners, timescales, success measures and limits.",
    ],
    deliverables: [
      "notebook or .pbix, dashboard image and the briefing.",
    ],
    criteria: [
      {
        name: "Customers",
        points: 25,
        description: "Churn rate, with counts, by region and by home site.",
      },
      {
        name: "Network",
        points: 25,
        description: "Drop rate by site and month, speeds and outages, and the relationship between dropped calls in the last 30 days (dropped_calls_30d) and churn.",
      },
      {
        name: "Improved risk score",
        points: 25,
        description: "Add a fourth warning sign for network experience (for example, 6 or more dropped calls in 30 days = 2 points) to the Lesson 17.2 score.",
      },
      {
        name: "Joint plan",
        points: 25,
        description: "A dashboard and a one-page briefing for both directors in the Module 14 format:",
      },
    ],
    example: "*Worked example on a different provider, a fictional internet company's East region. Do not reuse its wording.*\n\n**Customers.** *East churn was 24.6% (61 of 248), against 17.1% elsewhere. Monthly contract customers churned at 31%.*\n\n**Network.** *Site E03's drop rate rose from 1.1% in April to 2.6% in June, from totals of attempts and drops; speed fell from 21 to 14 Mbps.*\n\n**Improved score.** *Adding 2 points for customers whose home site is E03 raised the High group's capture from 52% to 63% of churners, while the High group stayed at 34% of customers.*\n\n**Joint plan.** *Network team: repair E03's backhaul link by mid-July. Retention team: call the 38 High-risk E03 customers first. Success: E03 drop rate under 1.3% and monthly churn under 6% by September.*",
    tips: [
      "Calculate monthly drop rates from total drops and total attempts.",
      "Test a risk score on both separation and capture.",
      "Join customer and network data by home site before drawing conclusions.",
      "Give each team a clear action, an owner and a measure of success.",
    ],
  },
  18: {
    overview: "Before you start the analysis, write a one-page plan for your capstone and agree it with your instructor. A clear plan keeps the project focused on questions that lead to a decision, and stops you running out of time at the end.",
    materials: "Read the four capstone options in Lesson 18.1 and the capstone brief. Each option uses the course data files: [data-analytics-course-files.zip](/course-files/data-analytics/data-analytics-course-files.zip).",
    tasks: [
      "**Choose an option** (A, B, C or D) and explain in two or three sentences why it fits the industry you want to work in.",
      "**Write three to five business questions** that lead to a decision. Each must name what, where and when.",
      "**Define the KPIs** you will use, each with its formula, for example *growth % = (this period − same period last year) ÷ same period last year*.",
      "**List the files and tools** you will use at each stage: SQL or Excel, Python, Power BI, the report and the presentation.",
      "**Fill in a timeline** for the four capstone lessons, with dates.",
      "**List two risks** to finishing well, and how you will avoid each one.",
    ],
    deliverables: [
      "A one-page plan (.docx or .pdf) with the six parts above, agreed with your instructor before you start Lesson 18.2.",
    ],
    criteria: [
      {
        name: "Option and reason",
        points: 10,
        description: "A clear choice with a reason linked to the learner's career goal.",
      },
      {
        name: "Business questions",
        points: 30,
        description: "Three to five specific, decision-focused questions that the data can answer.",
      },
      {
        name: "KPI definitions",
        points: 25,
        description: "Every KPI has a correct formula and, where relevant, an equal-period comparison.",
      },
      {
        name: "Files and tools",
        points: 10,
        description: "The right files and a sensible tool for each stage.",
      },
      {
        name: "Timeline",
        points: 15,
        description: "A realistic, dated plan that leaves time for checking, the report and the presentation.",
      },
      {
        name: "Risks",
        points: 10,
        description: "Two real risks, each with a practical way to avoid it.",
      },
    ],
    example: "*Worked example of a plan for a different project, a fictional chain of pharmacies. Do not reuse its wording.*\n\n**Option and reason.** *Retail sales, because I want to work in retail analytics and the data shows a clear decision: which shop needs support.*\n\n**Questions.** (1) Which shop's January–June sales grew slowest compared with last year? (2) Is the gap in volume or price? (3) Which product groups drive it?\n\n**KPI.** *Growth % = (Jan–Jun this year − Jan–Jun last year) ÷ Jan–Jun last year.*\n\n**Files and tools.** *Three star-schema CSV files; SQL for the equal-period totals, Python for checks, Power BI for the dashboard.*\n\n**Risks.** *Comparing a part-year with a full year (fix: equal months only); running out of time on the dashboard (fix: wireframe first).*",
    tips: [
      "Choose three to five questions that lead to a decision.",
      "Write every KPI as a formula.",
      "Plan time for checking and the report, not only the analysis.",
      "Get the plan agreed with your instructor before you start.",
    ],
  },
};

export const DATA_ANALYTICS_CAPSTONE: BriefSpec = {
  overview: "Your capstone brings the whole course together. **Choose one of the four options** below and complete a full analysis: a plan, a data log, an SQL or Excel stage, a Python check, a Power BI dashboard, a written report, a presentation of under eight minutes and a portfolio page. Every option uses the course data files. All work must be your own; AI tools may be used to check spelling or explain an error, not to write your analysis, report or slides.",
  materials: "**Option A: Retail and business sales (Sunrise Mart).** The regional manager wants to know how each branch is performing, why Riverside is falling and what the monthly dashboard should show. Data: sunrise\\_fact\\_sales, sunrise\\_dim\\_branch, sunrise\\_dim\\_product (January 2025–June 2026). The small sunrise\\_sales and sunrise\\_customers files (10 orders) may be used only to illustrate a customer view. Required: equal-period branch and category growth; average price per unit from totals; a Riverside deep-dive; a recommendation for Riverside and a KPI dashboard design. Optional extension: Brightpath department margins.\n\n**Option B: Oil & gas and industrial operations (Delta Ridge Energy).** The operations director wants a half-year operations review (January–June 2026) covering safety, production, downtime, maintenance and cost, with priorities for the second half. Data: delta\\_ridge\\_production, delta\\_ridge\\_maintenance, delta\\_ridge\\_safety. Required: safety first (TRIR, LTIF, near misses with counts); attainment and availability by asset and month; a downtime Pareto by hours and by barrels; MTBF, MTTR and cost per barrel by asset; three prioritised actions.\n\n**Option C: Banking and financial services (Harbour Bank).** The executive team wants a combined view of branch performance, unusual transactions and customer retention. Data: harbour\\_branch\\_monthly (July 2025–June 2026), harbour\\_txn\\_q1\\_2026, harbour\\_customers\\_clean. Required: NPL ratio, cost-to-income, loan-to-deposit and profit by branch (ratios from totals); at least three transaction rules with an alert log marked \"for review\"; a customer segmentation and a tested early warning; recommendations for credit, cost and retention.\n\n**Option D: Telecommunications (Connectwave Telecom).** The commercial and network directors want a joint plan to reduce churn. Data: connectwave\\_customers\\_2026 and connectwave\\_network\\_daily (Q2 2026); connectwave.db may be used for the SQL stage. Required: churn and ARPU by plan, contract, tenure and site; network drop rate and speed by site and month (rates from totals); a tested risk score with separation and capture; revenue at risk; a joint network and retention plan.\n\nEvery pack has the same six stages and deliverables (Lesson 18.1). Learners choose one option. The overall rubric (100 marks) is in the Module 18 capstone brief; each pack adds what a full-mark answer must include for that option.\n\n### Capstone A: Retail and business sales analytics (Sunrise Mart)\n\n**Scenario.** Memo from Sunrise Mart's regional manager:\n\n> \"We have three branches: Central (town centre, opened 2018), Hilltop (suburb, 2020) and Riverside (suburb, 2022). Head office says sales are growing, but Riverside's manager says business feels slower. I need to know how each branch is really doing this year compared with last year, what is behind any fall, and what the monthly management dashboard should show. Please give me a short report and present it at the next branch managers' meeting.\"\n\n**Data.** sunrise_fact_sales.csv (162 rows: month_start, branch_id, product_id, quantity), sunrise_dim_branch.csv (branch, area, opened_year) and sunrise_dim_product.csv (product, category, unit_price). Three products: Bottled water (Drinks), Crisps (Snacks) and Rice 5kg (Groceries). Optional extension: brightpath_fact_finance.csv and brightpath_dim_department.csv.\n\n**Step-by-step instructions**\n\n1. **Plan (day 1).** Write three to five business questions, for example: How did each branch perform in January–June 2026 against the same months of 2025? Is any fall driven by price, volume or product mix? What share of revenue does each branch provide, and is it changing? What should the monthly dashboard show?\n2. **Prepare (day 2).** Import the three files into DB Browser for SQLite (Lesson 18.2) or load them into Excel with XLOOKUP to bring in branch names and prices (Module 4). Check the row count (162), that every branch_id and product_id matches a dimension row, and reconcile total revenue (quantity × unit_price) in two tools. Write the data log.\n3. **Analyse (day 3).** In SQL or Excel: revenue and units by branch for January–June of each year; growth by branch and by category within each branch; branch share of revenue in each period; average price per unit from totals; monthly revenue by branch. Answer each question in one sentence with a number.\n4. **Dashboard (day 4).** Power BI (or Excel): a star schema with relationships; measures Total Revenue, Total Units, Average Price per Unit, Revenue LY and YoY % (Module 10); cards; a branch growth bar chart; a category-by-branch matrix; a monthly line by branch; a branch slicer.\n5. **Report (day 5).** Two to three pages in the Module 14 format, with recommendations for the Riverside manager and the regional manager.\n6. **Present and publish (days 6–7).** Five to seven slides, a recording under eight minutes and a portfolio page with the fictional-data note.\n\n**What full marks require for Option A:** equal-period comparisons only (never 2026's six months against 2025's twelve); revenue split into price and volume effects (unit prices did not change, so any change is volume or mix); average price per unit from totals; growth for every branch and category combination; a recommendation that names an owner, timescale and success measure.\n\n### Capstone B: Oil & gas and industrial operations analytics (Delta Ridge Energy)\n\n**Scenario.** Memo from Delta Ridge Energy's operations director:\n\n> \"I need a half-year operations review for January to June 2026 for the leadership team. Start with safety. Then tell me how close each asset came to plan, what caused our lost production, how reliable our equipment is and what maintenance is costing us. Finish with no more than three priorities for the second half of the year.\"\n\n**Data.** delta_ridge_production.csv (543 rows: date, asset, planned_bbl, actual_bbl, downtime_hours, downtime_cause), delta_ridge_maintenance.csv (80 work orders: asset, equipment, wo_type, raised, repair_hours, cost) and delta_ridge_safety.csv (18 rows: month, asset, hours_worked, near_misses, recordable_injuries, lost_time_injuries).\n\n**Step-by-step instructions**\n\n1. **Plan (day 1).** Questions on safety, production against plan, causes of lost production, reliability and cost, and priorities. Define every KPI with its formula (Lesson 15.1).\n2. **Prepare (day 2).** Import the files into SQLite or Excel. Check the row counts (543, 80 and 18), that each asset has 181 days, that downtime_cause is \"No downtime\" exactly when downtime_hours is 0, and reconcile total actual output (616,585 barrels) in two tools.\n3. **Analyse (day 3).** Safety: TRIR and LTIF overall and by asset, near misses by month. Production: attainment and availability by asset, by month and by quarter. Downtime: a Pareto by hours and by barrels, planned against unplanned, and lost production split into downtime and slow running. Maintenance: work orders by type, MTBF and MTTR by asset, cost per barrel, corrective orders by equipment and quarter.\n4. **Dashboard (day 4).** The Lesson 15.4 layout: safety cards first; attainment trend; downtime Pareto; asset table; near misses by month; an asset slicer through an Assets table.\n5. **Report (day 5).** Safety first; findings with counts; three prioritised actions with owners and success measures.\n6. **Present and publish (days 6–7).**\n\n**What full marks require for Option B:** safety before production in every deliverable; rates from totals; injury counts beside rates; planned downtime separated from unplanned; the quarter-on-quarter change found and explained; priorities ranked by impact and risk.\n\n### Capstone C: Banking and financial services analytics (Harbour Bank)\n\n**Scenario.** Memo from Harbour Bank's chief executive:\n\n> \"The executive team meets next month. I want one review covering three things: how each branch is performing on growth, profit, cost and credit quality; whether our transaction monitoring rules are finding the right things; and which customers we are at risk of losing. Keep it short, and tell us what to do.\"\n\n**Data.** harbour_branch_monthly.csv (36 rows, July 2025–June 2026, money in thousands), harbour_txn_q1_2026.csv (1,601 transactions, January–March 2026) and harbour_customers_clean.csv (60 customers, with closures in 2026).\n\n**Step-by-step instructions**\n\n1. **Plan (day 1).** Questions on branch performance, transaction monitoring and retention. Define NPL ratio, cost-to-income, loan-to-deposit, profit and closure rate with formulas.\n2. **Prepare (day 2).** Import the files. Check the row counts (36, 1,601 and 60), that every transaction's customer_id is in the customer file, and that balances are not added across months. Reconcile the June 2026 bank NPL ratio (3.91%) in two tools.\n3. **Analyse (day 3).** Branch KPIs by month and by half-year; the drivers of change. At least three transaction rules (Lesson 16.2) with an alert log marked \"for review\" and a note on false positives. Customer value segments and an early warning tested on data from before the outcome (Lesson 16.3).\n4. **Dashboard (day 4).** The Lesson 16.4 layout, plus a page or panel for alerts and retention.\n5. **Report (day 5).** Credit, cost and retention recommendations, each with an owner.\n6. **Present and publish (days 6–7).**\n\n**What full marks require for Option C:** ratios from totals, not averaged; balances never added across months; alerts described as \"for review\" and never as wrongdoing; no customer data beyond IDs in the slides or portfolio; an early warning tested without data leakage.\n\n### Capstone D: Telecommunications analytics (Connectwave Telecom)\n\n**Scenario.** Memo from Connectwave's chief executive:\n\n> \"We lost too many subscribers last quarter. The commercial team blames prices; the network team says the network is fine. I want the facts: who is leaving, whether the network is part of the reason, how much revenue is at risk, and a joint plan both teams can agree to.\"\n\n**Data.** connectwave_customers_2026.csv (400 subscribers: region, home_site, plan, contract, tenure_months, data_usage_gb, monthly_bill, complaints_6m, dropped_calls_30d, churned_q2) and connectwave_network_daily.csv (728 rows: date, site_id, region, calls_attempted, calls_dropped, avg_speed_mbps, outage_minutes). connectwave.db may be used for extra SQL practice.\n\n**Step-by-step instructions**\n\n1. **Plan (day 1).** Questions on who churns, the network's role, revenue at risk and actions. Define churn rate (stating the period), ARPU, drop rate and revenue at risk.\n2. **Prepare (day 2).** Import the files. Check the row counts (400 and 728), that every home_site appears in the network file, and reconcile churn (81 of 400) and the network drop rate (1.20%) in two tools.\n3. **Analyse (day 3).** Churn and ARPU by plan, contract, tenure band, complaints, region and site, with counts. Drop rate by site and month from totals; speeds; outages. A points-based risk score tested for separation and capture (Lesson 17.2), including a network warning sign. Revenue at risk from active high-risk customers.\n4. **Dashboard (day 4).** The Lesson 17.4 layout with a shared Sites table.\n5. **Report (day 5).** A joint network and retention plan.\n6. **Present and publish (days 6–7).**\n\n**What full marks require for Option D:** churn period stated; drop rates from totals; churn compared between sites in the same region; the risk score tested on both separation and capture; revenue at risk counted only for customers who have not yet churned.\n\n**Download:** [brightpath_dim_department.csv](/course-files/data-analytics/brightpath_dim_department.csv) · [brightpath_fact_finance.csv](/course-files/data-analytics/brightpath_fact_finance.csv) · [connectwave.db](/course-files/data-analytics/connectwave.db) · [connectwave_customers_2026.csv](/course-files/data-analytics/connectwave_customers_2026.csv) · [connectwave_network_daily.csv](/course-files/data-analytics/connectwave_network_daily.csv) · [delta_ridge_maintenance.csv](/course-files/data-analytics/delta_ridge_maintenance.csv) · [delta_ridge_production.csv](/course-files/data-analytics/delta_ridge_production.csv) · [delta_ridge_safety.csv](/course-files/data-analytics/delta_ridge_safety.csv) · [harbour_branch_monthly.csv](/course-files/data-analytics/harbour_branch_monthly.csv) · [harbour_customers_clean.csv](/course-files/data-analytics/harbour_customers_clean.csv) · [harbour_txn_q1_2026.csv](/course-files/data-analytics/harbour_txn_q1_2026.csv) · [sunrise_dim_branch.csv](/course-files/data-analytics/sunrise_dim_branch.csv) · [sunrise_dim_product.csv](/course-files/data-analytics/sunrise_dim_product.csv) · [sunrise_fact_sales.csv](/course-files/data-analytics/sunrise_fact_sales.csv) (or every course file in one [zip](/course-files/data-analytics/data-analytics-course-files.zip)).",
  tasks: [
    "**Plan.** Start from your Day 18 plan: three to five decision-focused business questions with fully defined KPIs.",
    "**Prepare the data.** Import the files, check row counts and types, clean what needs cleaning and keep a data log. Reconcile one key total in two tools (for example SQL and Python).",
    "**Analyse.** Answer every question with correct numbers: compare equal periods, calculate ratios from totals and show counts beside rates.",
    "**Build the dashboard.** One clear Power BI page with KPI cards, one chart per question, message titles and working filters.",
    "**Write the report.** A message title and summary, findings with numbers and comparisons, complete recommendations (who, what, by when, success measure) and honest limits, including that the data is fictional teaching data.",
    "**Present and publish.** Record a presentation of under eight minutes, answer first, and publish a portfolio page with the note that the project uses fictional training data from this course.",
  ],
  deliverables: [
    "the plan, data log and queries or workbook, dashboard file and image, report (PDF), slides (PDF), recording link and portfolio link.",
  ],
  criteria: [
    {
      name: "Plan and business questions",
      points: 10,
      description: "Three to five decision-focused questions with fully defined KPIs",
    },
    {
      name: "Data preparation and data log",
      points: 15,
      description: "Correct imports and cleaning, checks recorded, a key total reconciled in two tools",
    },
    {
      name: "Analysis",
      points: 25,
      description: "Every question answered with correct numbers, equal periods, ratios from totals, counts beside rates",
    },
    {
      name: "Dashboard",
      points: 15,
      description: "One clear page, KPI cards, one chart per question, message titles, working filters, numbers match the report",
    },
    {
      name: "Written report",
      points: 20,
      description: "Message title and summary, findings with numbers and comparisons, complete recommendations, honest limits",
    },
    {
      name: "Presentation and portfolio",
      points: 15,
      description: "Under eight minutes, answer first, clear slides; working portfolio page with the fictional-data note",
    },
  ],
  example: "*Worked example for a different scenario, a fictional chain of three cinemas (not one of the four options). Do not reuse its wording.*\n\n**Report title.** *\"Lakeside's ticket sales fell 6.4% while the other two cinemas grew\"*\n\n**Summary.** *January–June ticket sales grew 4.1% overall but fell 6.4% at Lakeside (51,200 to 47,900 tickets). Prices did not change, so the fall is in visits. We recommend a two-month weekday-evening offer at Lakeside, owned by the Lakeside manager, with success defined as weekday visits back to last year's level by September.*\n\n**Data log entry.** *Imported cinema_sales.csv: 216 rows, as expected (3 cinemas × 4 screens × 18 months). Total tickets 498,600 in SQL and in Python: they match.*\n\n**Dashboard.** One page: three KPI cards, one chart per business question, a cinema slicer, message titles.\n\n**Portfolio note.** *\"This project uses fictional training data from the Paleon Training Data Analytics course.\"*",
  tips: [
    "Compare equal periods, and calculate ratios from totals.",
    "Reconcile one key total in two tools and record it in the data log.",
    "Every number in the report must match the dashboard and the data log.",
    "Keep the recording under eight minutes, with the answer first.",
    "Mark the work as fictional training data on every portfolio page.",
  ],
};
