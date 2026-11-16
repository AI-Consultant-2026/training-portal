import { CsfAssessmentChanges } from "./curriculumCyberSecurityAssessment";

type Edit = { from: string; to: string };

// AI & Machine Learning Fundamentals, owner's changes of 2026-11-16 (applied by migration
// 20261116110000-ai-ml-assessment-changes): the capstone, all 18 day assignments and all 18 Day
// Quizzes are removed. Every lesson gets a practical exercise and an eight-question knowledge check
// (five multiple choice and one true or false, mostly from the old Day Quiz bank, plus two scenario
// questions); lessons 1.2, 10.2 and 18.2 get a learner reflection; a 30-question final assessment
// (also from the old bank, none repeated in the knowledge checks) and a course feedback questionnaire
// close the course. Sentences, titles and the course description that named the capstone are
// re-worded. Keys are "<day>.<lesson order>".
export const AI_ML_ASSESSMENT_CHANGES: Omit<CsfAssessmentChanges, "module18Description"> & {
  lessonTitleEdits: Record<string, Edit>;
  module18: { title: Edit };
  courseDescription: Edit;
} = {
  "knowledgeChecks": {
    "1.1": [
      "**Practical exercise**",
      "List five things you used today, such as a phone keyboard, a map app, a music app, an email inbox or a banking app. For each one, write whether it uses AI and what it learned from. Then name one thing AI does well and one thing it does badly in your list.",
      "**Knowledge check 1.1**",
      "**1.** Which statement best describes artificial intelligence?",
      "- A. Any computer program that runs quickly\n- B. Computer systems that do tasks that normally need human intelligence, often by learning from examples\n- C. A robot that looks like a person\n- D. Software that never makes mistakes",
      "<details><summary>Show answer</summary>\n\n**B.** AI covers tasks such as recognising speech, spotting patterns and making predictions, usually learned from data.\n\n</details>",
      "**2.** A phone keyboard that suggests your next word is an example of AI because:",
      "- A. It follows one fixed rule for every sentence\n- B. It is connected to the internet\n- C. It learned patterns from many examples of how people type\n- D. It uses a touchscreen",
      "<details><summary>Show answer</summary>\n\n**C.** Nobody wrote a rule for every sentence; the keyboard learned from examples.\n\n</details>",
      "**3.** All AI systems in use today are best described as:",
      "- A. General AI, able to do any thinking task a person can\n- B. Conscious machines\n- C. Rule-based expert systems only\n- D. Narrow AI, good at one kind of task",
      "<details><summary>Show answer</summary>\n\n**D.** Narrow AI, good at one kind of task.\n\n</details>",
      "**4.** Which of these is something AI generally does well?",
      "- A. Spotting unusual patterns among millions of transactions\n- B. Taking moral responsibility for a decision\n- C. Guaranteeing that every answer is correct\n- D. Knowing facts that were never in its data",
      "<details><summary>Show answer</summary>\n\n**A.** Spotting unusual patterns among millions of transactions.\n\n</details>",
      "**5.** What usually happens when an AI system is trained on biased or messy data?",
      "- A. It automatically fixes the data\n- B. Its results are also likely to be biased or unreliable\n- C. It refuses to work\n- D. It becomes more accurate",
      "<details><summary>Show answer</summary>\n\n**B.** Its results are also likely to be biased or unreliable.\n\n</details>",
      "**6.** True or false: General AI (AGI) that can do any thinking task a human can is already widely used in business today.",
      "<details><summary>Show answer</summary>\n\n**False.** General AI is a research goal. Every AI system in use today is narrow.\n\n</details>",
      "**7.** A shop owner says: \"Our new till adds up prices, so it uses AI.\" What is the best reply?",
      "- A. Yes, anything a computer does is AI\n- B. Yes, because it is fast\n- C. Adding prices follows fixed rules, so it isn't AI; AI learns patterns from examples\n- D. No, because AI only exists in robots",
      "<details><summary>Show answer</summary>\n\n**C.** AI is about learning from data to do tasks that normally need human intelligence.\n\n</details>",
      "**8.** A manager wants an AI tool to make final hiring decisions with no human review, because \"computers are neutral\". What is the main concern?",
      "- A. AI is too slow for hiring\n- B. AI cannot read CVs at all\n- C. There is no concern; AI is always fair\n- D. AI can repeat bias in its training data and can be confidently wrong, so a person must stay accountable",
      "<details><summary>Show answer</summary>\n\n**D.** AI reflects its data, and people remain responsible for decisions that affect others.\n\n</details>"
    ],
    "1.2": [
      "**Practical exercise**",
      "Pick three everyday tasks, such as calculating tax on a payslip, recognising a friend's face in photos and sorting spam. For each, decide whether fixed rules or machine learning is the better tool, and write one sentence explaining why.",
      "**Knowledge check 1.2**",
      "**1.** What were the \"AI winters\"?",
      "- A. Periods when progress slowed and funding for AI research dried up\n- B. Times when computers stopped working in cold weather\n- C. The years when generative AI was invented\n- D. Competitions between chess computers",
      "<details><summary>Show answer</summary>\n\n**A.** Periods when progress slowed and funding for AI research dried up.\n\n</details>",
      "**2.** Which three things together made machine learning practical in the 2010s?",
      "- A. Faster typing, bigger screens and cheaper phones\n- B. Cheap computing power, huge amounts of digital data and better learning methods\n- C. New laws, new languages and new currencies\n- D. Rule-based systems, expert systems and AI winters",
      "<details><summary>Show answer</summary>\n\n**B.** Cheap computing power, huge amounts of digital data and better learning methods.\n\n</details>",
      "**3.** How does a machine-learning spam filter learn to recognise spam?",
      "- A. By reading one rule written by a programmer\n- B. By asking each sender if their email is spam\n- C. By studying many example emails already marked as spam or not spam\n- D. By deleting every email with a link",
      "<details><summary>Show answer</summary>\n\n**C.** By studying many example emails already marked as spam or not spam.\n\n</details>",
      "**4.** When spammers change their wording, what is the usual fix for a machine-learning spam filter?",
      "- A. Buy a new computer\n- B. Delete the model forever\n- C. Ask users to stop reading email\n- D. Retrain the model on fresh examples",
      "<details><summary>Show answer</summary>\n\n**D.** Retrain the model on fresh examples.\n\n</details>",
      "**5.** Which task is better suited to fixed rules than to machine learning?",
      "- A. Calculating tax on a payslip exactly as the law requires\n- B. Recognising faces in thousands of lighting conditions\n- C. Detecting unusual card payments\n- D. Recommending videos a viewer might like",
      "<details><summary>Show answer</summary>\n\n**A.** Payroll must follow the law exactly every time, so written rules are the right tool.\n\n</details>",
      "**6.** True or false: Mistakes made by AI software are often less predictable than bugs in traditional software, and are frequently caused by poor data.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** A bank must calculate interest exactly as the contract states. Should it use machine learning or fixed rules?",
      "- A. Machine learning, because it is newer\n- B. Fixed rules, because the result must follow the contract exactly every time\n- C. Machine learning, because it learns from mistakes\n- D. Neither; it must be done by hand",
      "<details><summary>Show answer</summary>\n\n**B.** When the right answer is set by clear rules, traditional software is the better tool.\n\n</details>",
      "**8.** An email filter that worked well last year now lets many new spam emails through. What is the most likely fix?",
      "- A. Delete the filter permanently\n- B. Add more storage to the email server\n- C. Retrain the model on fresh examples of the new spam\n- D. Ask users to stop opening email",
      "<details><summary>Show answer</summary>\n\n**C.** Machine-learning systems learn from examples, so they need new examples when patterns change.\n\n</details>",
      "**Learner reflection 1 of 3**",
      "> Think about your current job, studies or the job you want. Where could AI save you time or help you decide better, and where would you not trust it? Give one example of each.",
      "Write your answer in your notes. There is no right or wrong answer, and it isn't marked."
    ],
    "2.1": [
      "**Practical exercise**",
      "Choose something you could teach a computer to recognise, such as ripe fruit or a spam message. Write down three features you would use, the label, and how many examples you would keep aside for testing.",
      "**Knowledge check 2.1**",
      "**1.** Teaching a child to recognise a mango by showing many labelled pictures is an analogy for:",
      "- A. Writing hand-made rules\n- B. Storing data in a spreadsheet\n- C. Connecting to the internet\n- D. Machine learning from examples",
      "<details><summary>Show answer</summary>\n\n**D.** Machine learning from examples.\n\n</details>",
      "**2.** Which statement about AI and machine learning is correct?",
      "- A. All machine learning is AI, but not all AI is machine learning\n- B. All AI is machine learning\n- C. Machine learning and AI are unrelated\n- D. Machine learning is older than AI",
      "<details><summary>Show answer</summary>\n\n**A.** All machine learning is AI, but not all AI is machine learning.\n\n</details>",
      "**3.** In the same loan table, what is the \"label\"?",
      "- A. The name of the spreadsheet\n- B. The answer we want to predict, such as whether the loan was repaid\n- C. Any column containing numbers\n- D. The person who typed the data",
      "<details><summary>Show answer</summary>\n\n**B.** The answer we want to predict, such as whether the loan was repaid.\n\n</details>",
      "**4.** What is \"training data\"?",
      "- A. Data used only after the model is finished\n- B. Instructions written by a programmer\n- C. The examples a model learns from\n- D. A list of computer parts",
      "<details><summary>Show answer</summary>\n\n**C.** The examples a model learns from.\n\n</details>",
      "**5.** What is a prediction in machine learning?",
      "- A. A guess made by a programmer\n- B. The first row of the training data\n- C. A rule written by hand\n- D. The model's answer for a new example it has not seen",
      "<details><summary>Show answer</summary>\n\n**D.** The model's answer for a new example it has not seen.\n\n</details>",
      "**6.** True or false: Training is the process of a computer studying examples to build a model.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** You want a model to predict whether a mango is ripe from its colour, softness and smell. In this example, what is the label?",
      "- A. Whether the mango is ripe\n- B. The colour\n- C. The softness\n- D. The smell",
      "<details><summary>Show answer</summary>\n\n**A.** Features are the inputs; the label is the answer the model learns to predict.\n\n</details>",
      "**8.** A model scores 99% on the examples it was trained on but performs badly on new mangoes. What went wrong?",
      "- A. It had too few colours to choose from\n- B. It was only tested on data it had already seen, instead of examples kept aside for testing\n- C. The model was too slow\n- D. Nothing; 99% means it is ready",
      "<details><summary>Show answer</summary>\n\n**B.** Fair testing uses examples the model has never seen, like a new exam paper.\n\n</details>"
    ],
    "2.2": [
      "**Practical exercise**",
      "Write one example of your own for each type of learning (supervised, unsupervised and reinforcement), drawn from work, school or daily life. For each, say what the model learns from.",
      "**Knowledge check 2.2**",
      "**1.** A robot learning to walk by trying movements and being rewarded for not falling is an example of:",
      "- A. Supervised learning\n- B. Unsupervised learning\n- C. Reinforcement learning\n- D. Data cleaning",
      "<details><summary>Show answer</summary>\n\n**C.** Reinforcement learning.\n\n</details>",
      "**2.** Predicting the price of a used car from its age and mileage, using past sales with known prices, is:",
      "- A. Unsupervised learning\n- B. Reinforcement learning\n- C. Not machine learning\n- D. Supervised learning",
      "<details><summary>Show answer</summary>\n\n**D.** Supervised learning.\n\n</details>",
      "**3.** Which analogy best fits reinforcement learning?",
      "- A. Training a dog with treats for good behaviour\n- B. A teacher marking homework\n- C. Sorting buttons into piles\n- D. Copying answers from a book",
      "<details><summary>Show answer</summary>\n\n**A.** Training a dog with treats for good behaviour.\n\n</details>",
      "**4.** Which type of machine learning is most common in everyday business applications?",
      "- A. Reinforcement learning\n- B. Supervised learning\n- C. None of them\n- D. Only rule-based systems",
      "<details><summary>Show answer</summary>\n\n**B.** Supervised learning.\n\n</details>",
      "**5.** Flagging unusual sensor readings that do not fit any normal pattern is usually done with:",
      "- A. Reinforcement learning\n- B. A spreadsheet SUM formula\n- C. Unsupervised anomaly detection\n- D. Manual rules only",
      "<details><summary>Show answer</summary>\n\n**C.** Unsupervised anomaly detection.\n\n</details>",
      "**6.** True or false: In unsupervised learning, the computer is given the correct answer for every example.",
      "<details><summary>Show answer</summary>\n\n**False.** Unsupervised learning works without labels; it discovers groups or oddities.\n\n</details>",
      "**7.** A streaming service wants to group viewers by similar viewing habits, but has no labels for the groups. Which type of learning fits?",
      "- A. Supervised learning\n- B. Reinforcement learning\n- C. No learning is needed\n- D. Unsupervised learning",
      "<details><summary>Show answer</summary>\n\n**D.** Finding groups without labels is the classic unsupervised task.\n\n</details>",
      "**8.** A warehouse robot gets a reward each time it picks an item correctly and improves by trial and error. Which type of learning is this?",
      "- A. Reinforcement learning\n- B. Supervised learning\n- C. Unsupervised learning\n- D. Rule-based software",
      "<details><summary>Show answer</summary>\n\n**A.** Learning from rewards and penalties through trial and error is reinforcement learning.\n\n</details>"
    ],
    "3.1": [
      "**Practical exercise**",
      "Open any spreadsheet or a free public dataset. Name three columns, say whether each is numerical, categorical, text or date data, and say whether the dataset as a whole is structured or unstructured.",
      "**Knowledge check 3.1**",
      "**1.** What does \"rubbish in, rubbish out\" mean in machine learning?",
      "- A. Old computers must be thrown away\n- B. Poor-quality data produces poor-quality results, however clever the model\n- C. Models delete bad data automatically\n- D. Only large datasets are useful",
      "<details><summary>Show answer</summary>\n\n**B.** Poor-quality data produces poor-quality results, however clever the model.\n\n</details>",
      "**2.** Which of these is an example of unstructured data?",
      "- A. A spreadsheet of monthly sales figures\n- B. A table of bank transactions\n- C. A folder of customer complaint emails\n- D. A list of product prices in columns",
      "<details><summary>Show answer</summary>\n\n**C.** A folder of customer complaint emails.\n\n</details>",
      "**3.** In a dataset, what does one row usually represent?",
      "- A. One type of information about every example\n- B. The file name\n- C. The total of a column\n- D. One example or record, such as one customer",
      "<details><summary>Show answer</summary>\n\n**D.** One example or record, such as one customer.\n\n</details>",
      "**4.** In a dataset, what does one column usually represent?",
      "- A. One kind of information about every example, such as age\n- B. One customer\n- C. One file\n- D. One computer",
      "<details><summary>Show answer</summary>\n\n**A.** One kind of information about every example, such as age.\n\n</details>",
      "**5.** What is a CSV file?",
      "- A. A type of image file\n- B. A simple text file where commas separate the columns\n- C. A video format\n- D. A programming language",
      "<details><summary>Show answer</summary>\n\n**B.** A simple text file where commas separate the columns.\n\n</details>",
      "**6.** True or false: A CSV file stores a table as plain text, with values separated by commas.",
      "<details><summary>Show answer</summary>\n\n**True.** CSV stands for comma-separated values and opens in spreadsheets and pandas.\n\n</details>",
      "**7.** A company has customer reviews written as free text and a table of order amounts. How would you describe the two?",
      "- A. Both are structured\n- B. Both are unstructured\n- C. The reviews are unstructured data; the order table is structured data\n- D. The reviews are structured; the table is unstructured",
      "<details><summary>Show answer</summary>\n\n**C.** Structured data fits neatly into rows and columns; free text does not.\n\n</details>",
      "**8.** You receive a dataset where each row is one customer and each column is something about them. What is each column usually called?",
      "- A. A label in every case\n- B. A record\n- C. A file format\n- D. A feature (also called a variable or field)",
      "<details><summary>Show answer</summary>\n\n**D.** Rows are records or examples; columns are features or variables.\n\n</details>"
    ],
    "3.2": [
      "**Practical exercise**",
      "Take a small spreadsheet of about 20 rows (make one up if needed). Add two duplicates, one missing value and one impossible value, then swap with a friend or wait a day and find and fix them. Write down each fix you made and why.",
      "**Knowledge check 3.2**",
      "**1.** What is a sensible first step when you find blank values in an important column?",
      "- A. Decide whether to fill them sensibly or remove the rows, and record what you did\n- B. Ignore them and train the model\n- C. Delete the whole dataset\n- D. Fill them with random numbers",
      "<details><summary>Show answer</summary>\n\n**A.** Decide whether to fill them sensibly or remove the rows, and record what you did.\n\n</details>",
      "**2.** What is data bias?",
      "- A. When a dataset has too many columns\n- B. When the data does not fairly represent the people or situations the AI will be used on\n- C. When data is stored as a CSV\n- D. When a computer runs slowly",
      "<details><summary>Show answer</summary>\n\n**B.** When the data does not fairly represent the people or situations the AI will be used on.\n\n</details>",
      "**3.** A loan model trained only on big-city customers may be unfair to rural applicants. This is an example of:",
      "- A. Duplicate data\n- B. A file-format problem\n- C. Data bias\n- D. Reinforcement learning",
      "<details><summary>Show answer</summary>\n\n**C.** Data bias.\n\n</details>",
      "**4.** Which of these is personal information?",
      "- A. The average price of bread\n- B. The number of rainy days last year\n- C. A list of product categories\n- D. A customer's phone number",
      "<details><summary>Show answer</summary>\n\n**D.** A customer's phone number.\n\n</details>",
      "**5.** What does \"data minimisation\" mean?",
      "- A. Collecting and using only the personal data you actually need\n- B. Making a dataset as small as possible by deleting rows at random\n- C. Compressing files\n- D. Removing all numbers from data",
      "<details><summary>Show answer</summary>\n\n**A.** Collecting and using only the personal data you actually need.\n\n</details>",
      "**6.** True or false: Outliers should always be deleted automatically.",
      "<details><summary>Show answer</summary>\n\n**False.** Some outliers are genuine and important, such as fraud or a very large customer. Investigate first.\n\n</details>",
      "**7.** A survey dataset has one customer listed with an age of 250. What should you do first?",
      "- A. Keep it, because data is always right\n- B. Investigate it as a likely error, and correct or remove it with a note of what you did\n- C. Delete the whole dataset\n- D. Change every age to the average",
      "<details><summary>Show answer</summary>\n\n**B.** Outliers need thought: some are errors, some are real and important.\n\n</details>",
      "**8.** A loan model was trained mostly on data from one city's applicants and now rejects applicants from other areas more often. What is this an example of?",
      "- A. Data privacy\n- B. A file format problem\n- C. Data bias, because the training data did not represent everyone the model is used for\n- D. Overfitting to the test set",
      "<details><summary>Show answer</summary>\n\n**C.** Unrepresentative data leads to unfair results for the groups it under-represents.\n\n</details>"
    ],
    "4.1": [
      "**Practical exercise**",
      "In a free Google Colab notebook, create variables for your name, age and three favourite foods in a list. Print a sentence that uses all of them, then fix any error message you get.",
      "**Knowledge check 4.1**",
      "**1.** Why is Python so widely used for AI and data work?",
      "- A. It is the only language computers understand\n- B. It only works on expensive computers\n- C. It cannot be used for anything else\n- D. It is free, readable and has many ready-made AI and data libraries",
      "<details><summary>Show answer</summary>\n\n**D.** It is free, readable and has many ready-made AI and data libraries.\n\n</details>",
      "**2.** What is Google Colab?",
      "- A. A free online notebook where you can write and run Python code\n- B. A paid spreadsheet program\n- C. A type of database\n- D. A social media app",
      "<details><summary>Show answer</summary>\n\n**A.** A free online notebook where you can write and run Python code.\n\n</details>",
      "**3.** What does print(\"Hello\") do?",
      "- A. Sends Hello to a printer\n- B. Shows the text Hello on screen\n- C. Saves Hello in a file\n- D. Deletes the word Hello",
      "<details><summary>Show answer</summary>\n\n**B.** Shows the text Hello on screen.\n\n</details>",
      "**4.** What is a variable?",
      "- A. A type of error\n- B. A chart\n- C. A labelled box that stores a value so it can be used later\n- D. A function that prints text",
      "<details><summary>Show answer</summary>\n\n**C.** A labelled box that stores a value so it can be used later.\n\n</details>",
      "**5.** What type of value is 12.5 in Python?",
      "- A. A string\n- B. A boolean\n- C. A list\n- D. A float (decimal number)",
      "<details><summary>Show answer</summary>\n\n**D.** A float (decimal number)\n\n</details>",
      "**6.** True or false: In Python, anything after a # on a line is a comment that Python ignores.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** You type `print(\"Total: \" + 5)` and get an error. What is the problem?",
      "- A. You can't join text and a number directly; convert the number with str(5) first\n- B. print can only show numbers\n- C. Python can't do sums\n- D. The quotes should be removed",
      "<details><summary>Show answer</summary>\n\n**A.** Text and numbers are different types, so convert before joining.\n\n</details>",
      "**8.** You store three prices with `prices = [200, 450, 300]`. What does `sum(prices) / len(prices)` give you?",
      "- A. The highest price\n- B. The average price, about 316.7\n- C. The number of prices\n- D. An error, because lists can't be added",
      "<details><summary>Show answer</summary>\n\n**B.** sum adds the values and len counts them, so dividing gives the mean.\n\n</details>"
    ],
    "4.2": [
      "**Practical exercise**",
      "In Colab, write a function that takes a price and returns the price after a 10% discount. Use a loop to apply it to a list of five prices and print only the prices that are still over 1,000.",
      "**Knowledge check 4.2**",
      "**1.** In an if statement, why must the lines underneath be indented?",
      "- A. It makes the code run faster\n- B. It is only for decoration\n- C. Indentation tells Python which lines belong to the if\n- D. Python ignores indented lines",
      "<details><summary>Show answer</summary>\n\n**C.** Indentation tells Python which lines belong to the if.\n\n</details>",
      "**2.** What does a for loop do?",
      "- A. Stops the program\n- B. Imports a library\n- C. Creates a chart\n- D. Repeats an action for every item in a list",
      "<details><summary>Show answer</summary>\n\n**D.** Repeats an action for every item in a list.\n\n</details>",
      "**3.** What keyword is used to create your own function in Python?",
      "- A. def\n- B. func\n- C. make\n- D. function",
      "<details><summary>Show answer</summary>\n\n**A.** def.\n\n</details>",
      "**4.** Inside a function, what does return do?",
      "- A. Restarts the computer\n- B. Sends the function's answer back to where it was called\n- C. Prints an error\n- D. Deletes the function",
      "<details><summary>Show answer</summary>\n\n**B.** Sends the function's answer back to where it was called.\n\n</details>",
      "**5.** What is a Python library such as pandas?",
      "- A. A building where Python books are kept\n- B. A list of variables\n- C. A ready-made collection of code you can import and use\n- D. A type of error message",
      "<details><summary>Show answer</summary>\n\n**C.** A ready-made collection of code you can import and use.\n\n</details>",
      "**6.** True or false: Seeing an error message means you should give up, because good programmers never get errors.",
      "<details><summary>Show answer</summary>\n\n**False.** Every programmer sees errors daily. Read the last line, fix the problem and run again.\n\n</details>",
      "**7.** You need to label each sale as \"big\" if it is over 1,000 and \"small\" otherwise, for every sale in a list. What do you need?",
      "- A. Only a variable\n- B. Only a print statement\n- C. A new library for every sale\n- D. A loop over the list with an if/else condition inside",
      "<details><summary>Show answer</summary>\n\n**D.** Loops repeat work; conditions make the decision for each item.\n\n</details>",
      "**8.** You keep writing the same five lines to calculate a discount in different places. What is the better approach?",
      "- A. Write a function once and call it wherever you need it\n- B. Copy the lines more carefully\n- C. Put the lines in a comment\n- D. Use a longer variable name",
      "<details><summary>Show answer</summary>\n\n**A.** Functions are reusable recipes that reduce repetition and mistakes.\n\n</details>"
    ],
    "5.1": [
      "**Practical exercise**",
      "Load a sample sales CSV into pandas. Filter the rows for one product, sort them by date, and group the full table by region to find total sales per region. Write one sentence on what you found.",
      "**Knowledge check 5.1**",
      "**1.** What is the best way to start a data analysis?",
      "- A. By drawing as many charts as possible\n- B. With a clear question you want the data to answer\n- C. By deleting outliers\n- D. By building a model straight away",
      "<details><summary>Show answer</summary>\n\n**B.** With a clear question you want the data to answer.\n\n</details>",
      "**2.** What does df[\"revenue\"] = df[\"units\"] * df[\"price\"] do?",
      "- A. Deletes the units column\n- B. Sorts the table by price\n- C. Creates a new revenue column calculated for every row\n- D. Prints the first five rows",
      "<details><summary>Show answer</summary>\n\n**C.** Creates a new revenue column calculated for every row.\n\n</details>",
      "**3.** What does df[df[\"region\"] == \"North\"] return?",
      "- A. Only the region column\n- B. The number of rows in North\n- C. All rows except North\n- D. Only the rows where region is North",
      "<details><summary>Show answer</summary>\n\n**D.** Only the rows where region is North.\n\n</details>",
      "**4.** In pandas, which symbol combines two filter conditions with \"and\"?",
      "- A. &\n- B. +\n- C. and&and\n- D. #",
      "<details><summary>Show answer</summary>\n\n**A.** &.\n\n</details>",
      "**5.** What does df.sort_values(\"revenue\", ascending=False) do?",
      "- A. Sorts from lowest to highest revenue\n- B. Sorts the rows from highest to lowest revenue\n- C. Removes the revenue column\n- D. Groups rows by revenue",
      "<details><summary>Show answer</summary>\n\n**B.** Sorts the rows from highest to lowest revenue.\n\n</details>",
      "**6.** True or false: Cleaning steps written in code can be repeated instantly on next month's data.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** You want total sales for each region from a sales table in pandas. Which operation fits best?",
      "- A. Sort by date only\n- B. Delete the region column\n- C. Group by region and sum the sales column\n- D. Print the first five rows",
      "<details><summary>Show answer</summary>\n\n**C.** Grouping is the most useful tool for summarising by category.\n\n</details>",
      "**8.** A column of delivery dates has some empty values. Before calculating averages, what should you do?",
      "- A. Ignore them; pandas will guess\n- B. Delete the whole column\n- C. Replace them all with today's date\n- D. Check how many are missing and decide deliberately whether to fill, drop or keep them",
      "<details><summary>Show answer</summary>\n\n**D.** Missing values need a deliberate decision, not a blind default.\n\n</details>"
    ],
    "5.2": [
      "**Practical exercise**",
      "Using the same dataset, calculate the mean and median of the sales column and explain any difference. Then draw one bar chart of sales by region with a clear title and labelled axes.",
      "**Knowledge check 5.2**",
      "**1.** What is the median?",
      "- A. The middle value when the data is sorted\n- B. The most common value\n- C. The total divided by the count\n- D. The largest minus the smallest",
      "<details><summary>Show answer</summary>\n\n**A.** The middle value when the data is sorted.\n\n</details>",
      "**2.** When data contains extreme outliers, such as one very high income, which usually describes the typical case better?",
      "- A. The mean\n- B. The median\n- C. The maximum\n- D. The range",
      "<details><summary>Show answer</summary>\n\n**B.** The median.\n\n</details>",
      "**3.** What does standard deviation measure?",
      "- A. The average value\n- B. The most common value\n- C. How spread out the values are\n- D. The number of rows",
      "<details><summary>Show answer</summary>\n\n**C.** How spread out the values are.\n\n</details>",
      "**4.** Ice-cream sales and sunburn cases rise together. What does this show?",
      "- A. Ice cream causes sunburn\n- B. Sunburn causes people to buy ice cream\n- C. The data must be wrong\n- D. Correlation, but not necessarily causation, because hot weather drives both",
      "<details><summary>Show answer</summary>\n\n**D.** Correlation, but not necessarily causation, because hot weather drives both.\n\n</details>",
      "**5.** Which chart is best for showing how revenue changed month by month?",
      "- A. A line chart\n- B. A pie chart\n- C. A histogram\n- D. A scatter plot",
      "<details><summary>Show answer</summary>\n\n**A.** A line chart.\n\n</details>",
      "**6.** True or false: A correlation of +1 proves that one thing causes the other.",
      "<details><summary>Show answer</summary>\n\n**False.** The statement is false.\n\n</details>",
      "**7.** Most staff earn a similar salary, but the managing director earns 50 times more. Which average best describes a typical salary?",
      "- A. The mean\n- B. The median\n- C. The maximum\n- D. The range",
      "<details><summary>Show answer</summary>\n\n**B.** The median is not pulled up by a few extreme values.\n\n</details>",
      "**8.** Ice-cream sales and sunburn cases rise together. A colleague says ice cream causes sunburn. What is the best response?",
      "- A. Agree, because the numbers move together\n- B. Stop selling ice cream\n- C. Correlation is not causation; hot sunny weather likely drives both\n- D. The data must be wrong",
      "<details><summary>Show answer</summary>\n\n**C.** A third factor can make two things move together without one causing the other.\n\n</details>"
    ],
    "6.1": [
      "**Practical exercise**",
      "Write down three business questions: two that need regression and one that needs classification. For each, say which algorithm from the cheat sheet you would try first.",
      "**Knowledge check 6.1**",
      "**1.** Predicting the sale price of a house is an example of:",
      "- A. Classification, because the answer is a category\n- B. Unsupervised learning\n- C. Reinforcement learning\n- D. Regression, because the answer is a number",
      "<details><summary>Show answer</summary>\n\n**D.** Regression, because the answer is a number.\n\n</details>",
      "**2.** Predicting whether an email is spam or not spam is an example of:",
      "- A. Classification\n- B. Regression\n- C. Clustering\n- D. Data cleaning",
      "<details><summary>Show answer</summary>\n\n**A.** Classification.\n\n</details>",
      "**3.** What does linear regression do?",
      "- A. Groups customers without labels\n- B. Finds the straight line that best fits the data to predict a number\n- C. Asks a flowchart of yes or no questions\n- D. Lets many trees vote",
      "<details><summary>Show answer</summary>\n\n**B.** Finds the straight line that best fits the data to predict a number.\n\n</details>",
      "**4.** Despite its name, logistic regression is mainly used for:",
      "- A. Predicting exact numbers such as prices\n- B. Drawing charts\n- C. Classification, producing a probability between 0 and 1\n- D. Cleaning data",
      "<details><summary>Show answer</summary>\n\n**C.** Classification, producing a probability between 0 and 1.\n\n</details>",
      "**5.** A decision tree is most like:",
      "- A. A straight line through dots\n- B. A list of random numbers\n- C. A spreadsheet total\n- D. A flowchart of yes or no questions",
      "<details><summary>Show answer</summary>\n\n**D.** A flowchart of yes or no questions.\n\n</details>",
      "**6.** True or false: Categories such as region usually need converting to numbers, for example with one-hot encoding, before training a model.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** A shop wants to predict next month's sales in money. Is this a regression or a classification problem?",
      "- A. Regression, because the answer is a number\n- B. Classification, because it uses sales data\n- C. Clustering, because there are many months\n- D. Neither",
      "<details><summary>Show answer</summary>\n\n**A.** Regression predicts numbers; classification predicts categories.\n\n</details>",
      "**8.** A clinic wants a model whose decisions doctors can easily follow step by step. Which model is easiest to explain?",
      "- A. A random forest of 500 trees\n- B. A decision tree\n- C. A deep neural network\n- D. Any model; they are all equally clear",
      "<details><summary>Show answer</summary>\n\n**B.** A single decision tree reads like a flowchart of questions.\n\n</details>"
    ],
    "6.2": [
      "**Practical exercise**",
      "Follow the lesson's steps in Colab on a small sample dataset: split into training and test sets, train a decision tree, and compare its test accuracy with a simple baseline. Note which features mattered most.",
      "**Knowledge check 6.2**",
      "**1.** Why do we split data into training and test sets?",
      "- A. To make the dataset larger\n- B. Because scikit-learn cannot read whole files\n- C. To check the model on examples it did not see during training\n- D. To remove outliers",
      "<details><summary>Show answer</summary>\n\n**C.** To check the model on examples it did not see during training.\n\n</details>",
      "**2.** What does test_size=0.2 mean in train_test_split?",
      "- A. The model trains for 0.2 seconds\n- B. Only 0.2 rows are used\n- C. 20 trees are built\n- D. 20% of the rows are kept aside for testing",
      "<details><summary>Show answer</summary>\n\n**D.** 20% of the rows are kept aside for testing.\n\n</details>",
      "**3.** What does model.predict_proba() return?",
      "- A. The probability of each class for each example\n- B. The accuracy score\n- C. The list of features\n- D. The training data",
      "<details><summary>Show answer</summary>\n\n**A.** The probability of each class for each example.\n\n</details>",
      "**4.** If 80% of visitors never buy, why is an 80% accurate model not impressive?",
      "- A. 80% is always a perfect score\n- B. A model that always predicts \"no purchase\" would also be 80% accurate\n- C. Accuracy cannot be measured\n- D. The test set is too large",
      "<details><summary>Show answer</summary>\n\n**B.** A model that always predicts \"no purchase\" would also be 80% accurate.\n\n</details>",
      "**5.** What does random_state=42 achieve?",
      "- A. Uses 42 features\n- B. Sets the accuracy to 42%\n- C. Makes the random split the same every run so results can be repeated\n- D. Trains for 42 minutes",
      "<details><summary>Show answer</summary>\n\n**C.** Makes the random split the same every run so results can be repeated.\n\n</details>",
      "**6.** True or false: A prediction from a machine-learning model should be treated as a certain fact.",
      "<details><summary>Show answer</summary>\n\n**False.** The statement is false.\n\n</details>",
      "**7.** Your purchase model is 90% accurate, but 90% of customers in the data never buy. What should you compare it with?",
      "- A. Nothing; 90% is excellent\n- B. The training-set accuracy\n- C. A model with fewer features\n- D. A simple baseline, such as always predicting \"won't buy\", which would also score 90%",
      "<details><summary>Show answer</summary>\n\n**D.** A model is only useful if it beats a simple baseline.\n\n</details>",
      "**8.** You train a model and measure it on the same data you trained it on. Why is this a problem?",
      "- A. It shows how well the model memorised, not how well it predicts new customers\n- B. Training data is always too small\n- C. scikit-learn doesn't allow it\n- D. It makes the model train slower",
      "<details><summary>Show answer</summary>\n\n**A.** Always split into training and test sets and judge on the test set.\n\n</details>"
    ],
    "7.1": [
      "**Practical exercise**",
      "In Colab, scale two numerical columns from a customer dataset, run K-means for 2 to 8 clusters and draw an elbow chart. Choose a number of clusters and describe each group in one plain sentence.",
      "**Knowledge check 7.1**",
      "**1.** What does clustering do?",
      "- A. Predicts a number from labelled examples\n- B. Groups similar examples together without using labels\n- C. Learns from rewards and penalties\n- D. Deletes duplicate rows",
      "<details><summary>Show answer</summary>\n\n**B.** Groups similar examples together without using labels.\n\n</details>",
      "**2.** Clustering is a type of:",
      "- A. Supervised learning\n- B. Reinforcement learning\n- C. Unsupervised learning\n- D. Rule-based programming",
      "<details><summary>Show answer</summary>\n\n**C.** Unsupervised learning.\n\n</details>",
      "**3.** In K-means, what is a centroid?",
      "- A. A missing value\n- B. The label column\n- C. An outlier\n- D. The centre point of a cluster",
      "<details><summary>Show answer</summary>\n\n**D.** The centre point of a cluster.\n\n</details>",
      "**4.** What happens in each round of K-means?",
      "- A. Examples are assigned to the nearest centroid, then each centroid moves to the middle of its group\n- B. The data is sorted alphabetically\n- C. One example is deleted\n- D. A new feature is created",
      "<details><summary>Show answer</summary>\n\n**A.** Examples are assigned to the nearest centroid, then each centroid moves to the middle of its group.\n\n</details>",
      "**5.** Why should features be scaled before running K-means?",
      "- A. To make the file smaller\n- B. So features with large numbers do not dominate the distance calculation\n- C. Because K-means only reads text\n- D. To add labels",
      "<details><summary>Show answer</summary>\n\n**B.** So features with large numbers do not dominate the distance calculation.\n\n</details>",
      "**6.** True or false: Cluster numbers such as 0, 1 and 2 have no meaning until a person interprets them.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** You cluster customers by age (20–70) and yearly spend (0–5,000,000). The groups depend almost only on spend. Why?",
      "- A. K-means ignores age\n- B. There were too few customers\n- C. The features weren't scaled, so spend's much larger numbers dominate the distance\n- D. Spend is always more important",
      "<details><summary>Show answer</summary>\n\n**C.** Scale features so each one contributes fairly to distance.\n\n</details>",
      "**8.** Your elbow chart flattens sharply after 4 clusters. What is a sensible choice?",
      "- A. Always use 10 clusters\n- B. Use as many clusters as customers\n- C. Use 1 cluster\n- D. Start with 4 clusters, then check that the groups make business sense",
      "<details><summary>Show answer</summary>\n\n**D.** The elbow suggests where extra clusters stop adding much.\n\n</details>"
    ],
    "7.2": [
      "**Practical exercise**",
      "Calculate recency, frequency and monetary value for 10 imaginary customers in a spreadsheet. Sort them into three segments and write one specific marketing action for each segment.",
      "**Knowledge check 7.2**",
      "**1.** What is an anomaly?",
      "- A. An example that does not fit the normal pattern\n- B. The most common value\n- C. A cluster centroid\n- D. A type of chart",
      "<details><summary>Show answer</summary>\n\n**A.** An example that does not fit the normal pattern.\n\n</details>",
      "**2.** A card normally used for small local purchases suddenly makes a large overseas payment at 3 a.m. This is an example of:",
      "- A. Normal behaviour\n- B. An anomaly worth reviewing for possible fraud\n- C. Customer segmentation\n- D. Linear regression",
      "<details><summary>Show answer</summary>\n\n**B.** An anomaly worth reviewing for possible fraud.\n\n</details>",
      "**3.** In scikit-learn's IsolationForest, what does a prediction of -1 mean?",
      "- A. The example is normal\n- B. The model failed\n- C. The example is flagged as an anomaly\n- D. The value is missing",
      "<details><summary>Show answer</summary>\n\n**C.** The example is flagged as an anomaly.\n\n</details>",
      "**4.** What does contamination=0.01 tell an isolation forest?",
      "- A. To delete 1% of the data\n- B. To train for 0.01 seconds\n- C. To use 1% of the features\n- D. To expect about 1% of the data to be anomalies",
      "<details><summary>Show answer</summary>\n\n**D.** To expect about 1% of the data to be anomalies.\n\n</details>",
      "**5.** Which is a limitation of K-means?",
      "- A. You must choose the number of clusters yourself\n- B. It needs labelled data\n- C. It cannot be used on numbers\n- D. It always finds exactly two groups",
      "<details><summary>Show answer</summary>\n\n**A.** You must choose the number of clusters yourself.\n\n</details>",
      "**6.** True or false: When a system flags an anomaly, it has proven that fraud took place.",
      "<details><summary>Show answer</summary>\n\n**False.** An anomaly tells people where to look; a human reviewer decides what it means.\n\n</details>",
      "**7.** An RFM analysis finds a segment that bought often and spent a lot, but not for six months. What action fits best?",
      "- A. Ignore them; they have left\n- B. A win-back campaign aimed at those valuable but lapsing customers\n- C. Send them the same email as new customers\n- D. Delete their records",
      "<details><summary>Show answer</summary>\n\n**B.** Segments are only useful when they lead to a specific action.\n\n</details>",
      "**8.** An anomaly model flags a card payment as unusual. What should happen next?",
      "- A. Block the customer permanently\n- B. Ignore all flags\n- C. Treat it as a question to check, not proof of fraud\n- D. Delete the transaction",
      "<details><summary>Show answer</summary>\n\n**C.** An anomaly is a reason to look closer, not a verdict.\n\n</details>"
    ],
    "8.1": [
      "**Practical exercise**",
      "For a model that screens 100 patients, make up numbers for a confusion matrix (true positives, false positives, false negatives, true negatives). Calculate accuracy, precision and recall, and say which matters most here and why.",
      "**Knowledge check 8.1**",
      "**1.** What does a confusion matrix show?",
      "- A. The colour scheme of a chart\n- B. How long the model took to train\n- C. The list of features used\n- D. Counts of each kind of right and wrong prediction",
      "<details><summary>Show answer</summary>\n\n**D.** Counts of each kind of right and wrong prediction.\n\n</details>",
      "**2.** A model says a transaction is fraud, but it was a genuine purchase. This is a:",
      "- A. False positive\n- B. True positive\n- C. False negative\n- D. True negative",
      "<details><summary>Show answer</summary>\n\n**A.** False positive.\n\n</details>",
      "**3.** What does precision measure?",
      "- A. Of all real positives, how many the model caught\n- B. When the model predicts positive, how often it is right\n- C. The total number of predictions\n- D. How fast the model runs",
      "<details><summary>Show answer</summary>\n\n**B.** When the model predicts positive, how often it is right.\n\n</details>",
      "**4.** What does recall measure?",
      "- A. When the model predicts positive, how often it is right\n- B. The number of features\n- C. Of all the real positive cases, how many the model caught\n- D. The average prediction",
      "<details><summary>Show answer</summary>\n\n**C.** Of all the real positive cases, how many the model caught.\n\n</details>",
      "**5.** With 40 true positives and 10 false negatives, what is recall?",
      "- A. 40%\n- B. 50%\n- C. 10%\n- D. 80%",
      "<details><summary>Show answer</summary>\n\n**D.** 80%.\n\n</details>",
      "**6.** True or false: A model with 95% accuracy is always useful, whatever the data.",
      "<details><summary>Show answer</summary>\n\n**False.** If 95% of cases are one class, always guessing that class also scores 95%. Check precision, recall and a baseline.\n\n</details>",
      "**7.** A disease-screening model must miss as few sick patients as possible. Which measure matters most?",
      "- A. Recall\n- B. Precision\n- C. Accuracy only\n- D. Training speed",
      "<details><summary>Show answer</summary>\n\n**A.** Recall measures how many of the real positive cases the model catches.\n\n</details>",
      "**8.** A spam filter keeps sending important client emails to spam. Which measure needs improving?",
      "- A. Recall\n- B. Precision, because too many emails flagged as spam are not spam\n- C. Dataset size only\n- D. None; this is expected",
      "<details><summary>Show answer</summary>\n\n**B.** Precision is about how many of the flagged items really are positive.\n\n</details>"
    ],
    "8.2": [
      "**Practical exercise**",
      "Look back at the model from Day 6. Compare its training and test scores, then run 5-fold cross-validation. Write down whether it looks overfitted, underfitted or about right.",
      "**Knowledge check 8.2**",
      "**1.** A model scores 99% on training data and 71% on test data. This most likely shows:",
      "- A. Underfitting\n- B. A perfect model\n- C. Overfitting\n- D. Data cleaning",
      "<details><summary>Show answer</summary>\n\n**C.** Overfitting.\n\n</details>",
      "**2.** Which is a common fix for an overfitted decision tree?",
      "- A. Make the tree much deeper\n- B. Delete the test set\n- C. Use fewer training examples\n- D. Limit the tree depth or use a random forest",
      "<details><summary>Show answer</summary>\n\n**D.** Limit the tree depth or use a random forest.\n\n</details>",
      "**3.** What does 5-fold cross-validation do?",
      "- A. Trains and tests the model five times, each time testing on a different fifth of the data\n- B. Trains the model on only 5 rows\n- C. Creates 5 clusters\n- D. Runs the model 5 times on the same test set",
      "<details><summary>Show answer</summary>\n\n**A.** Trains and tests the model five times, each time testing on a different fifth of the data.\n\n</details>",
      "**4.** Using a column that is only filled in after a loan defaults to predict defaults is an example of:",
      "- A. Underfitting\n- B. Data leakage\n- C. Clustering\n- D. Scaling",
      "<details><summary>Show answer</summary>\n\n**B.** Data leakage.\n\n</details>",
      "**5.** What is model drift?",
      "- A. A model moving to a new computer\n- B. A chart that slopes downward\n- C. A model gradually losing accuracy because the real world has changed\n- D. The training process speeding up",
      "<details><summary>Show answer</summary>\n\n**C.** A model gradually losing accuracy because the real world has changed.\n\n</details>",
      "**6.** True or false: Choosing between higher precision and higher recall is ultimately a business decision about the cost of each mistake.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** A model scores 99% on training data and 62% on test data. What is most likely happening?",
      "- A. Underfitting\n- B. Perfect performance\n- C. The test data is broken\n- D. Overfitting: it memorised the training data instead of learning general patterns",
      "<details><summary>Show answer</summary>\n\n**D.** A large gap between training and test results is the classic sign of overfitting.\n\n</details>",
      "**8.** A model was accurate at launch but gets worse each month as customer behaviour changes. What should the team do?",
      "- A. Monitor performance and retrain the model on recent data\n- B. Nothing; models never change\n- C. Delete the model\n- D. Test it on the old data again",
      "<details><summary>Show answer</summary>\n\n**A.** Models drift as the world changes, so they need monitoring and retraining.\n\n</details>"
    ],
    "9.1": [
      "**Practical exercise**",
      "Ask an AI assistant such as ChatGPT, Claude or Gemini the same factual question three times in new chats. Compare the answers, then check one key fact against a reliable source and note whether it was right.",
      "**Knowledge check 9.1**",
      "**1.** What is the main difference between predictive AI and generative AI?",
      "- A. Generative AI is always more accurate\n- B. Predictive AI produces predictions such as categories or numbers; generative AI creates new content\n- C. Predictive AI only works on images\n- D. There is no difference",
      "<details><summary>Show answer</summary>\n\n**B.** Predictive AI produces predictions such as categories or numbers; generative AI creates new content.\n\n</details>",
      "**2.** What does a large language model learn to do during pre-training?",
      "- A. Search the internet in real time\n- B. Store every website word for word\n- C. Predict the next piece of text across huge amounts of writing\n- D. Understand the world through personal experience",
      "<details><summary>Show answer</summary>\n\n**C.** Predict the next piece of text across huge amounts of writing.\n\n</details>",
      "**3.** What is a model's context window?",
      "- A. The screen size of the chat app\n- B. The time limit for a conversation\n- C. The number of users at once\n- D. The maximum amount of text (in tokens) it can consider at once",
      "<details><summary>Show answer</summary>\n\n**D.** The maximum amount of text (in tokens) it can consider at once.\n\n</details>",
      "**4.** Roughly how many English words are in 100 tokens?",
      "- A. About 75\n- B. About 10\n- C. Exactly 100\n- D. About 1,000",
      "<details><summary>Show answer</summary>\n\n**A.** About 75.\n\n</details>",
      "**5.** What does human feedback add when training an AI assistant?",
      "- A. It gives the model a physical body\n- B. It teaches the model to prefer helpful, honest and harmless answers\n- C. It removes the need for any data\n- D. It connects the model to the internet",
      "<details><summary>Show answer</summary>\n\n**B.** It teaches the model to prefer helpful, honest and harmless answers.\n\n</details>",
      "**6.** True or false: Generative AI predicts text that sounds right, which is not always text that is right.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** A marketing team asks ChatGPT for statistics for a report, and the figures look convincing. What should they do?",
      "- A. Use them; they sound right\n- B. Ask the AI if it is sure and accept the answer\n- C. Check each figure against a reliable source before using it\n- D. Round the numbers and publish",
      "<details><summary>Show answer</summary>\n\n**C.** Generative AI predicts text that sounds right, which is not always right.\n\n</details>",
      "**8.** You paste a very long contract into an AI assistant and it seems to ignore the first pages. What is a likely reason?",
      "- A. The AI cannot read contracts\n- B. The contract was in the wrong font\n- C. AI only reads the first word\n- D. The text went beyond the model's context window",
      "<details><summary>Show answer</summary>\n\n**D.** A model can only consider a limited number of tokens at once.\n\n</details>"
    ],
    "9.2": [
      "**Practical exercise**",
      "Write down one task where a basic AI assistant is enough, one where RAG over your own documents would be better, and one where an agent would need human approval before acting.",
      "**Knowledge check 9.2**",
      "**1.** Retrieval-augmented generation (RAG) is most like:",
      "- A. An open-book exam where the answer is based on looked-up pages\n- B. A closed-book exam from memory only\n- C. A random guess\n- D. Rewriting the model from scratch",
      "<details><summary>Show answer</summary>\n\n**A.** An open-book exam where the answer is based on looked-up pages.\n\n</details>",
      "**2.** In RAG, what happens before the LLM writes its answer?",
      "- A. The model is completely retrained\n- B. The most relevant chunks of your documents are retrieved and added to the prompt\n- C. All documents are deleted\n- D. The user's question is translated into an image",
      "<details><summary>Show answer</summary>\n\n**B.** The most relevant chunks of your documents are retrieved and added to the prompt.\n\n</details>",
      "**3.** What makes an AI agent different from a basic chat assistant?",
      "- A. It cannot write text\n- B. It never makes mistakes\n- C. It can use tools and take actions to reach a goal\n- D. It works without a computer",
      "<details><summary>Show answer</summary>\n\n**C.** It can use tools and take actions to reach a goal.\n\n</details>",
      "**4.** Why should important actions by an AI agent require human approval?",
      "- A. Agents are not allowed to use tools\n- B. Humans type faster than agents\n- C. Approval makes the agent smarter\n- D. A mistake could be a wrong email sent or a record changed, not just a wrong sentence",
      "<details><summary>Show answer</summary>\n\n**D.** A mistake could be a wrong email sent or a record changed, not just a wrong sentence.\n\n</details>",
      "**5.** What is a knowledge cut-off?",
      "- A. The point after which the model has no training information about events\n- B. The maximum file size it can read\n- C. The point where it stops answering\n- D. A limit on the number of users",
      "<details><summary>Show answer</summary>\n\n**A.** The point after which the model has no training information about events.\n\n</details>",
      "**6.** True or false: RAG completely removes the possibility of hallucinations.",
      "<details><summary>Show answer</summary>\n\n**False.** The statement is false.\n\n</details>",
      "**7.** A company wants its assistant to answer staff questions using its own HR policies. Which approach fits best?",
      "- A. Hope the model already knows the policies\n- B. Retrieval-augmented generation (RAG) over the approved policy documents\n- C. Train a new model from scratch\n- D. Turn off the assistant",
      "<details><summary>Show answer</summary>\n\n**B.** RAG looks up relevant passages first, then answers from them.\n\n</details>",
      "**8.** An AI agent can send emails and update customer records. What safeguard matters most?",
      "- A. Giving it access to every system\n- B. Letting it act faster\n- C. Human approval before important actions such as sending or changing records\n- D. Removing all logs",
      "<details><summary>Show answer</summary>\n\n**C.** Agent mistakes become real actions, so keep a human in the loop.\n\n</details>"
    ],
    "10.1": [
      "**Practical exercise**",
      "Take a vague prompt such as \"write a post about our shop\". Rewrite it using all six parts of a good prompt, try both versions in an AI assistant and compare the results.",
      "**Knowledge check 10.1**",
      "**1.** What is a prompt?",
      "- A. A type of computer virus\n- B. A chart in a report\n- C. The training data of a model\n- D. The instruction you give a generative AI tool",
      "<details><summary>Show answer</summary>\n\n**D.** The instruction you give a generative AI tool.\n\n</details>",
      "**2.** Why does context improve AI answers?",
      "- A. The AI knows nothing about your situation unless you tell it\n- B. Context makes the AI run faster\n- C. AI tools refuse to answer without context\n- D. Context reduces the price of the tool",
      "<details><summary>Show answer</summary>\n\n**A.** The AI knows nothing about your situation unless you tell it.\n\n</details>",
      "**3.** In a prompt, \"Under 120 words, three short paragraphs\" is an example of which part?",
      "- A. Role\n- B. Format\n- C. Tone\n- D. Context",
      "<details><summary>Show answer</summary>\n\n**B.** Format.\n\n</details>",
      "**4.** \"You are an experienced customer-service manager\" is which part of a prompt?",
      "- A. Format\n- B. Constraint\n- C. Role\n- D. Material",
      "<details><summary>Show answer</summary>\n\n**C.** Role.\n\n</details>",
      "**5.** \"Do not promise a refund\" is an example of a:",
      "- A. Role\n- B. Format\n- C. Tone\n- D. Constraint",
      "<details><summary>Show answer</summary>\n\n**D.** Constraint.\n\n</details>",
      "**6.** True or false: Asking follow-up questions such as \"make it shorter and more formal\" is a normal way to improve an AI answer.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** You ask an AI tool to \"write something about our product\" and get a vague result. What will improve it most?",
      "- A. Add the role, task, context, audience, format and tone you want\n- B. Ask the same question again\n- C. Use shorter words\n- D. Type in capital letters",
      "<details><summary>Show answer</summary>\n\n**A.** Clear, complete prompts get far more reliable results.\n\n</details>",
      "**8.** The AI's first draft of a customer letter is close, but too formal. What is the best next step?",
      "- A. Start a completely new chat\n- B. Keep the conversation going: ask it to make the tone warmer and simpler\n- C. Give up on AI for letters\n- D. Accept it as it is",
      "<details><summary>Show answer</summary>\n\n**B.** Treat prompting as a conversation and iterate.\n\n</details>"
    ],
    "10.2": [
      "**Practical exercise**",
      "Write a few-shot prompt that sorts customer messages into three categories, with two examples for each. Test it on ten new messages, including two tricky ones, and score how many it got right.",
      "**Knowledge check 10.2**",
      "**1.** What is prompt chaining?",
      "- A. Linking several AI tools with a cable\n- B. Sending the same prompt to many people\n- C. Breaking a big job into a sequence of smaller prompts\n- D. Writing a prompt in capital letters",
      "<details><summary>Show answer</summary>\n\n**C.** Breaking a big job into a sequence of smaller prompts.\n\n</details>",
      "**2.** When testing a prompt that a team will reuse, what should you do?",
      "- A. Try it once and share it\n- B. Make it as long as possible\n- C. Only test it on easy inputs\n- D. Run it on a set of realistic and tricky inputs and score each output",
      "<details><summary>Show answer</summary>\n\n**D.** Run it on a set of realistic and tricky inputs and score each output.\n\n</details>",
      "**3.** What is the best use of AI in research?",
      "- A. Starting and summarising research, then verifying important facts in original sources\n- B. Using it as the only source for statistics\n- C. Copying its text into reports as your own research\n- D. Trusting that all information is current",
      "<details><summary>Show answer</summary>\n\n**A.** Starting and summarising research, then verifying important facts in original sources.\n\n</details>",
      "**4.** Which source is most reliable for an important statistic?",
      "- A. An AI chat answer with no source\n- B. An official statistics office or the original published report\n- C. A random social media post\n- D. A screenshot with no date",
      "<details><summary>Show answer</summary>\n\n**B.** An official statistics office or the original published report.\n\n</details>",
      "**5.** Before pasting a customer complaint into an AI tool, what should you do?",
      "- A. Add the customer's phone number for context\n- B. Paste the customer's full account history\n- C. Remove personal details and check the tool is approved by your organisation\n- D. Nothing; anything can be pasted",
      "<details><summary>Show answer</summary>\n\n**C.** Remove personal details and check the tool is approved by your organisation.\n\n</details>",
      "**6.** True or false: References listed by an AI tool can always be trusted to exist.",
      "<details><summary>Show answer</summary>\n\n**False.** The statement is false.\n\n</details>",
      "**7.** You want the AI to classify enquiries into your own five categories consistently. What should you add to the prompt?",
      "- A. Nothing; it will guess correctly\n- B. A request to be creative\n- C. A longer greeting\n- D. A few labelled examples of enquiries and their categories (few-shot prompting)",
      "<details><summary>Show answer</summary>\n\n**D.** Examples show the model exactly the pattern you want.\n\n</details>",
      "**8.** A prompt works well on the three examples you tried. Before using it daily at work, what should you do?",
      "- A. Test it on a wider set of realistic and tricky inputs, and score the results\n- B. Use it straight away\n- C. Share it publicly\n- D. Make it longer",
      "<details><summary>Show answer</summary>\n\n**A.** Professional prompt testing covers tricky and out-of-scope cases too.\n\n</details>",
      "**Learner reflection 2 of 3**",
      "> Which task in your work or studies could you do better with a well-written prompt? Write the first version of that prompt, then note one thing you would always check in the AI's answer.",
      "Write your answer in your notes. There is no right or wrong answer, and it isn't marked."
    ],
    "11.1": [
      "**Practical exercise**",
      "List three repetitive tasks you or a business you know does every week. For each, write the trigger, the actions and whether it is a good first automation candidate.",
      "**Knowledge check 11.1**",
      "**1.** In an automation, what is a trigger?",
      "- A. The final result of the workflow\n- B. The event that starts the workflow, such as a new form submission\n- C. A type of error\n- D. The person who checks the output",
      "<details><summary>Show answer</summary>\n\n**B.** The event that starts the workflow, such as a new form submission.\n\n</details>",
      "**2.** \"Add a row to a spreadsheet\" in a workflow is an example of:",
      "- A. A trigger\n- B. An API key\n- C. An action\n- D. A prompt",
      "<details><summary>Show answer</summary>\n\n**C.** An action.\n\n</details>",
      "**3.** What can an AI step add to a plain automation?",
      "- A. Faster internet\n- B. A bigger spreadsheet\n- C. Automatic payment of invoices\n- D. The ability to read, classify, extract, summarise or draft",
      "<details><summary>Show answer</summary>\n\n**D.** The ability to read, classify, extract, summarise or draft.\n\n</details>",
      "**4.** What is an API?",
      "- A. The way one piece of software talks to another\n- B. A type of spreadsheet formula\n- C. A brand of computer\n- D. A chart",
      "<details><summary>Show answer</summary>\n\n**A.** The way one piece of software talks to another.\n\n</details>",
      "**5.** The restaurant waiter analogy describes:",
      "- A. A database\n- B. An API carrying requests and responses between software\n- C. A neural network\n- D. A spam filter",
      "<details><summary>Show answer</summary>\n\n**B.** An API carrying requests and responses between software.\n\n</details>",
      "**6.** True or false: No-code tools let people build automations without writing programming code.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** Which task is the best first automation candidate?",
      "- A. Approving large money transfers automatically\n- B. Making legal decisions\n- C. Logging each new website form entry into a spreadsheet\n- D. Deciding staff dismissals",
      "<details><summary>Show answer</summary>\n\n**C.** Start with frequent, simple, low-risk tasks.\n\n</details>",
      "**8.** In \"when a new email arrives, save its attachment to a folder\", what is the trigger?",
      "- A. Saving the attachment\n- B. The folder\n- C. The email's subject line\n- D. A new email arriving",
      "<details><summary>Show answer</summary>\n\n**D.** The trigger is the event that starts the automation; the actions follow.\n\n</details>"
    ],
    "11.2": [
      "**Practical exercise**",
      "Sketch the customer-enquiry workflow from the lesson for a business you know: the trigger, the AI steps, the point where a person reviews, and how you would measure success. A simple diagram on paper is enough.",
      "**Knowledge check 11.2**",
      "**1.** Why ask an AI extraction step to return JSON?",
      "- A. JSON is structured, so the automation tool can split it into separate fields\n- B. JSON is a nicer font\n- C. JSON makes the AI more creative\n- D. JSON hides personal data",
      "<details><summary>Show answer</summary>\n\n**A.** JSON is structured, so the automation tool can split it into separate fields.\n\n</details>",
      "**2.** What does \"human in the loop\" mean?",
      "- A. A person types every step manually\n- B. A person reviews or approves the AI's work at key points before it affects people\n- C. The AI controls the human\n- D. Nobody checks the output",
      "<details><summary>Show answer</summary>\n\n**B.** A person reviews or approves the AI's work at key points before it affects people.\n\n</details>",
      "**3.** The aeroplane autopilot analogy illustrates:",
      "- A. A model that never needs supervision\n- B. Data cleaning\n- C. AI handling routine work while a person watches and takes over when needed\n- D. Clustering",
      "<details><summary>Show answer</summary>\n\n**C.** AI handling routine work while a person watches and takes over when needed.\n\n</details>",
      "**4.** When should a human definitely stay in the loop?",
      "- A. When sorting internal test data only\n- B. Never, AI is always right\n- C. Only on weekends\n- D. When outputs go to customers or involve money, health, jobs or personal data",
      "<details><summary>Show answer</summary>\n\n**D.** When outputs go to customers or involve money, health, jobs or personal data.\n\n</details>",
      "**5.** What is a fallback category used for?",
      "- A. Catching anything the AI cannot classify so a human can check it\n- B. Deleting difficult messages\n- C. Sending all messages to the manager\n- D. Making the AI faster",
      "<details><summary>Show answer</summary>\n\n**A.** Catching anything the AI cannot classify so a human can check it.\n\n</details>",
      "**6.** True or false: If an automation step fails, it is fine for the enquiry to be silently dropped.",
      "<details><summary>Show answer</summary>\n\n**False.** The statement is false.\n\n</details>",
      "**7.** Your enquiry workflow uses AI to draft replies. The AI isn't sure which category a message belongs to. What should happen?",
      "- A. Send the draft reply anyway\n- B. Send it to a person to review, rather than guessing\n- C. Delete the message\n- D. Reply with an error code",
      "<details><summary>Show answer</summary>\n\n**B.** A human in the loop handles uncertain or high-risk cases.\n\n</details>",
      "**8.** A workflow sends customer enquiries to an AI tool. What must you check about data protection?",
      "- A. Nothing; automation is always private\n- B. That the emails are short\n- C. That the tool is approved and only the data it needs is sent\n- D. That the AI replies in capitals",
      "<details><summary>Show answer</summary>\n\n**C.** Send the minimum personal data, and only to approved tools.\n\n</details>"
    ],
    "12.1": [
      "**Practical exercise**",
      "Draw one artificial neuron for a simple decision, such as whether to carry an umbrella. Give it three inputs with weights, add them up and decide the output. Then change one weight and see how the decision changes.",
      "**Knowledge check 12.1**",
      "**1.** What does an artificial neuron do with its inputs?",
      "- A. Stores them in a spreadsheet\n- B. Deletes the smallest one\n- C. Prints them on screen\n- D. Multiplies each by a weight, adds them up with a bias and passes the total through an activation function",
      "<details><summary>Show answer</summary>\n\n**D.** Multiplies each by a weight, adds them up with a bias and passes the total through an activation function.\n\n</details>",
      "**2.** In a neural network, what is a weight?",
      "- A. A number representing how important an input is\n- B. How heavy the computer is\n- C. The size of the dataset\n- D. The number of layers",
      "<details><summary>Show answer</summary>\n\n**A.** A number representing how important an input is.\n\n</details>",
      "**3.** What does the output layer of a neural network produce?",
      "- A. The raw input data\n- B. The final answer, such as the probability of each class\n- C. The training data\n- D. A list of weights only",
      "<details><summary>Show answer</summary>\n\n**B.** The final answer, such as the probability of each class.\n\n</details>",
      "**4.** In an image network, what do early layers usually detect?",
      "- A. Whole objects such as cars\n- B. The file name\n- C. Simple features such as edges and lines\n- D. The image's caption",
      "<details><summary>Show answer</summary>\n\n**C.** Simple features such as edges and lines.\n\n</details>",
      "**5.** What is the \"loss\" in training a neural network?",
      "- A. Data that was lost during training\n- B. The cost of the computer\n- C. The number of layers removed\n- D. A measure of how wrong the network's guess was",
      "<details><summary>Show answer</summary>\n\n**D.** A measure of how wrong the network's guess was.\n\n</details>",
      "**6.** True or false: An epoch is one full pass through the training data.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** A network makes a wrong prediction during training. What happens next?",
      "- A. Its weights are adjusted to reduce the error (backpropagation and gradient descent)\n- B. It deletes the example\n- C. It stops training\n- D. It adds a new user",
      "<details><summary>Show answer</summary>\n\n**A.** Training repeatedly nudges the weights to make the error smaller.\n\n</details>",
      "**8.** You have a small table of 500 customer records with 8 columns. Which is usually the better first choice?",
      "- A. A very deep neural network\n- B. A classic machine-learning model such as a random forest\n- C. A large image model\n- D. No model at all",
      "<details><summary>Show answer</summary>\n\n**B.** Deep learning shines with huge amounts of raw data like images and audio.\n\n</details>"
    ],
    "12.2": [
      "**Practical exercise**",
      "In Teachable Machine, train an image model with two or three classes, such as cups and pens, using your webcam. Test it on new examples, including difficult angles, and write down where it fails.",
      "**Knowledge check 12.2**",
      "**1.** For a spreadsheet of customer data, which is often as good as deep learning and easier to explain?",
      "- A. A very deep CNN\n- B. A diffusion model\n- C. A random forest\n- D. Speech recognition",
      "<details><summary>Show answer</summary>\n\n**C.** A random forest.\n\n</details>",
      "**2.** Which type of neural network is especially good at images?",
      "- A. Linear regression\n- B. K-means\n- C. Isolation forest\n- D. Convolutional neural network (CNN)",
      "<details><summary>Show answer</summary>\n\n**D.** Convolutional neural network (CNN)\n\n</details>",
      "**3.** A person who speaks Spanish learning Italian faster is an analogy for:",
      "- A. Transfer learning\n- B. Overfitting\n- C. Data leakage\n- D. Clustering",
      "<details><summary>Show answer</summary>\n\n**A.** Transfer learning.\n\n</details>",
      "**4.** What is a main benefit of transfer learning?",
      "- A. It needs no data at all\n- B. Much less data and computing time are needed\n- C. It always gives 100% accuracy\n- D. It removes all bias",
      "<details><summary>Show answer</summary>\n\n**B.** Much less data and computing time are needed.\n\n</details>",
      "**5.** What is Hugging Face?",
      "- A. A social media app for selfies\n- B. A type of neural network layer\n- C. A platform offering many free pre-trained models, datasets and demos\n- D. A spreadsheet program",
      "<details><summary>Show answer</summary>\n\n**C.** A platform offering many free pre-trained models, datasets and demos.\n\n</details>",
      "**6.** True or false: Deep learning models are always easy to explain.",
      "<details><summary>Show answer</summary>\n\n**False.** Deep networks are often called black boxes because their decisions are hard to explain.\n\n</details>",
      "**7.** A farmer wants to classify photos of healthy and diseased leaves but has only 200 photos. What is the best approach?",
      "- A. Train a huge network from zero\n- B. Give up; 200 photos is useless\n- C. Use a spreadsheet formula\n- D. Transfer learning: start from a pre-trained image model and fine-tune it",
      "<details><summary>Show answer</summary>\n\n**D.** Pre-trained models already know general features, so less data is needed.\n\n</details>",
      "**8.** You want to try deep learning on images without writing any code. Which tool fits?",
      "- A. Teachable Machine\n- B. A calculator\n- C. A word processor\n- D. An email client",
      "<details><summary>Show answer</summary>\n\n**A.** Teachable Machine lets you train simple image models in the browser.\n\n</details>"
    ],
    "13.1": [
      "**Practical exercise**",
      "Take three short customer reviews. Tokenise them by hand, clean them (lower case, punctuation removed), and count the five most common words. Note one way this simple count could mislead you.",
      "**Knowledge check 13.1**",
      "**1.** What is natural language processing (NLP)?",
      "- A. A programming language for robots\n- B. The part of AI that works with human language\n- C. A way of compressing images\n- D. A type of spreadsheet",
      "<details><summary>Show answer</summary>\n\n**B.** The part of AI that works with human language.\n\n</details>",
      "**2.** Why is language hard for computers?",
      "- A. Computers cannot store letters\n- B. Language has no patterns\n- C. Words can be ambiguous and meaning depends on context, slang and tone\n- D. Only numbers can be typed on a keyboard",
      "<details><summary>Show answer</summary>\n\n**C.** Words can be ambiguous and meaning depends on context, slang and tone.\n\n</details>",
      "**3.** What are stop words?",
      "- A. Words that end a sentence\n- B. Swear words\n- C. Words that stop the program\n- D. Very common words such as \"the\" and \"is\" that are often removed",
      "<details><summary>Show answer</summary>\n\n**D.** Very common words such as \"the\" and \"is\" that are often removed.\n\n</details>",
      "**4.** Why can removing the word \"not\" be a problem?",
      "- A. It can reverse the meaning, such as turning \"not good\" into \"good\"\n- B. It makes the text too short\n- C. \"Not\" is a programming command\n- D. It causes a spelling error",
      "<details><summary>Show answer</summary>\n\n**A.** It can reverse the meaning, such as turning \"not good\" into \"good\".\n\n</details>",
      "**5.** What does stemming or lemmatisation do?",
      "- A. Translates words\n- B. Reduces words like \"delivered\" and \"deliveries\" to a common root\n- C. Adds new words\n- D. Counts sentences",
      "<details><summary>Show answer</summary>\n\n**B.** Reduces words like \"delivered\" and \"deliveries\" to a common root.\n\n</details>",
      "**6.** True or false: Embeddings can help a system recognise that \"my order did not arrive\" and \"the parcel never came\" mean nearly the same thing.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** Before counting words in customer reviews, you change all text to lower case and remove punctuation. What is this step called?",
      "- A. Tokenisation only\n- B. Clustering\n- C. Text cleaning\n- D. Data poisoning",
      "<details><summary>Show answer</summary>\n\n**C.** Cleaning makes \"Great!\" and \"great\" count as the same word.\n\n</details>",
      "**8.** A search tool should treat \"cheap\" and \"affordable\" as similar. Which technique helps?",
      "- A. Bag of words\n- B. Sorting alphabetically\n- C. Removing all adjectives\n- D. Embeddings, which represent meaning as numbers",
      "<details><summary>Show answer</summary>\n\n**D.** Embeddings place words with similar meanings close together.\n\n</details>"
    ],
    "13.2": [
      "**Practical exercise**",
      "Collect ten short reviews (real or made up). Label each one positive, negative or neutral yourself, then ask an AI assistant to label them and compare. Note where you disagree and why.",
      "**Knowledge check 13.2**",
      "**1.** Which review is hardest for a sentiment model?",
      "- A. \"Great, another late delivery.\"\n- B. \"The staff were friendly and helpful.\"\n- C. \"My order was damaged and I am very disappointed.\"\n- D. \"Excellent service.\"",
      "<details><summary>Show answer</summary>\n\n**A.** Sarcasm uses positive words to express a negative feeling.\n\n</details>",
      "**2.** What does named entity recognition (NER) find?",
      "- A. The emotional tone of text\n- B. Important items such as people, organisations, places, dates and amounts\n- C. The number of paragraphs\n- D. Grammar mistakes",
      "<details><summary>Show answer</summary>\n\n**B.** Important items such as people, organisations, places, dates and amounts.\n\n</details>",
      "**3.** Which type of chatbot uses fixed buttons and keywords?",
      "- A. LLM-based chatbot\n- B. Deep learning chatbot\n- C. Rule-based (menu) chatbot\n- D. Reinforcement chatbot",
      "<details><summary>Show answer</summary>\n\n**C.** Rule-based (menu) chatbot.\n\n</details>",
      "**4.** Why should an LLM customer-service chatbot use RAG on approved documents?",
      "- A. To make it type faster\n- B. To remove the need for any rules\n- C. To collect passwords\n- D. So it answers from real policy instead of inventing information",
      "<details><summary>Show answer</summary>\n\n**D.** So it answers from real policy instead of inventing information.\n\n</details>",
      "**5.** When should a chatbot hand over to a human?",
      "- A. When the user is upset, the question is out of scope or the bot is unsure\n- B. Never\n- C. Only after one hour\n- D. Whenever the user says hello",
      "<details><summary>Show answer</summary>\n\n**A.** When the user is upset, the question is out of scope or the bot is unsure.\n\n</details>",
      "**6.** True or false: A good chatbot should hide the fact that it is automated.",
      "<details><summary>Show answer</summary>\n\n**False.** The statement is false.\n\n</details>",
      "**7.** A company receives thousands of reviews a week and wants to spot a sudden rise in complaints. Which technique fits?",
      "- A. Object detection\n- B. Sentiment analysis, tracked over time\n- C. OCR\n- D. Linear regression on prices",
      "<details><summary>Show answer</summary>\n\n**B.** Sentiment analysis labels text as positive, negative or neutral at scale.\n\n</details>",
      "**8.** A customer-service chatbot gets a question it cannot answer from its approved information. What should it do?",
      "- A. Make up a confident answer\n- B. End the chat without a word\n- C. Say it can't help with that and hand over to a person\n- D. Repeat the last answer",
      "<details><summary>Show answer</summary>\n\n**C.** Good chatbots know their limits and offer a human hand-over.\n\n</details>"
    ],
    "14.1": [
      "**Practical exercise**",
      "Find three everyday uses of computer vision around you, such as phone face unlock or photo search. For each, say whether it uses classification, object detection, segmentation or facial recognition.",
      "**Knowledge check 14.1**",
      "**1.** To a computer, what is a digital photo?",
      "- A. A paragraph of text\n- B. A sound file\n- C. A single number\n- D. A grid of pixels stored as numbers",
      "<details><summary>Show answer</summary>\n\n**D.** A grid of pixels stored as numbers.\n\n</details>",
      "**2.** In a colour image, each pixel is usually stored as:",
      "- A. Three numbers for red, green and blue\n- B. One letter\n- C. A word describing its colour\n- D. A date",
      "<details><summary>Show answer</summary>\n\n**A.** Three numbers for red, green and blue.\n\n</details>",
      "**3.** What does image classification do?",
      "- A. Draws boxes around every object\n- B. Gives one label (or probabilities) for the whole image\n- C. Outlines every pixel of each object\n- D. Follows objects through a video",
      "<details><summary>Show answer</summary>\n\n**B.** Gives one label (or probabilities) for the whole image.\n\n</details>",
      "**4.** What does object detection add compared with classification?",
      "- A. It translates the image into text\n- B. It deletes the background\n- C. It finds several objects and draws a labelled box around each one\n- D. It only works on black-and-white images",
      "<details><summary>Show answer</summary>\n\n**C.** It finds several objects and draws a labelled box around each one.\n\n</details>",
      "**5.** Which task labels every pixel, such as outlining the exact flooded area of a field?",
      "- A. Classification\n- B. Tracking\n- C. OCR\n- D. Segmentation",
      "<details><summary>Show answer</summary>\n\n**D.** Segmentation.\n\n</details>",
      "**6.** True or false: Facial recognition should be treated as high-risk because of privacy, accuracy and misuse concerns.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** A shop wants to count how many people are in each aisle from camera images. Which vision task fits?",
      "- A. Object detection\n- B. Image classification of the whole image\n- C. OCR\n- D. Sentiment analysis",
      "<details><summary>Show answer</summary>\n\n**A.** Object detection finds and locates each object in an image.\n\n</details>",
      "**8.** A vision model trained on daytime photos performs badly at night. What is the most likely cause?",
      "- A. Cameras don't work at night\n- B. The training images didn't include night-time conditions\n- C. The model is too accurate\n- D. Night images are always unreadable",
      "<details><summary>Show answer</summary>\n\n**B.** Vision models struggle with conditions they weren't trained on.\n\n</details>"
    ],
    "14.2": [
      "**Practical exercise**",
      "Photograph a printed receipt or document and run it through a free OCR tool, such as the one built into your phone. Check the extracted text against the original and list any errors.",
      "**Knowledge check 14.2**",
      "**1.** What is Tesseract?",
      "- A. A paid chatbot\n- B. A type of neural network layer\n- C. A free, open-source OCR engine\n- D. A camera brand",
      "<details><summary>Show answer</summary>\n\n**C.** A free, open-source OCR engine.\n\n</details>",
      "**2.** Intelligent document processing combines OCR with what to extract key fields?",
      "- A. Reinforcement learning\n- B. K-means clustering\n- C. Linear regression only\n- D. Natural language processing",
      "<details><summary>Show answer</summary>\n\n**D.** Natural language processing.\n\n</details>",
      "**3.** Why should intelligent document processing validate extracted totals?",
      "- A. To catch reading errors, such as a total that does not match the line items\n- B. To make documents longer\n- C. Because OCR cannot read numbers at all\n- D. To change the supplier's prices",
      "<details><summary>Show answer</summary>\n\n**A.** To catch reading errors, such as a total that does not match the line items.\n\n</details>",
      "**4.** In a safety system checking whether workers wear helmets, which measure matters most?",
      "- A. Precision only\n- B. Recall, so as few unsafe workers as possible are missed\n- C. The colour of the boxes\n- D. Training speed",
      "<details><summary>Show answer</summary>\n\n**B.** Recall, so as few unsafe workers as possible are missed.\n\n</details>",
      "**5.** Drone images used to spot crop disease or water stress are an example of vision in:",
      "- A. Banking\n- B. Legal services\n- C. Agriculture\n- D. Music",
      "<details><summary>Show answer</summary>\n\n**C.** Agriculture.\n\n</details>",
      "**6.** True or false: Low-confidence amounts read by OCR should be accepted automatically without any review.",
      "<details><summary>Show answer</summary>\n\n**False.** The statement is false.\n\n</details>",
      "**7.** An accounts team types data from hundreds of supplier invoices by hand. Which AI solution fits best?",
      "- A. Facial recognition\n- B. A chatbot\n- C. K-means clustering\n- D. Intelligent document processing: OCR plus extraction of key fields, with checks",
      "<details><summary>Show answer</summary>\n\n**D.** OCR reads the text; document processing extracts and checks the fields.\n\n</details>",
      "**8.** A company plans cameras that recognise staff faces at the entrance. What must it consider first?",
      "- A. Privacy, consent and the law, and whether a less intrusive option would work\n- B. Only the camera price\n- C. Nothing; faces are public\n- D. Only the screen size",
      "<details><summary>Show answer</summary>\n\n**A.** Facial data is sensitive personal data and needs strong justification.\n\n</details>"
    ],
    "15.1": [
      "**Practical exercise**",
      "Choose mining, energy or agriculture. Name one problem AI could help with, the data it would need and one practical challenge to rolling it out.",
      "**Knowledge check 15.1**",
      "**1.** Why is AI especially valuable in mining, energy and agriculture?",
      "- A. They never use data\n- B. They have expensive equipment, safety risks and large amounts of sensor or satellite data\n- C. They have no safety risks\n- D. They only use paper records",
      "<details><summary>Show answer</summary>\n\n**B.** They have expensive equipment, safety risks and large amounts of sensor or satellite data.\n\n</details>",
      "**2.** What is predictive maintenance?",
      "- A. Repairing machines only after they break\n- B. Buying new equipment every year\n- C. Using sensor data to predict equipment failures so repairs happen before breakdowns\n- D. Cleaning machines daily",
      "<details><summary>Show answer</summary>\n\n**C.** Using sensor data to predict equipment failures so repairs happen before breakdowns.\n\n</details>",
      "**3.** Which AI technique is used to spot missing helmets on a mine site?",
      "- A. Linear regression on sales data\n- B. Sentiment analysis\n- C. Prompt chaining\n- D. Computer vision",
      "<details><summary>Show answer</summary>\n\n**D.** Computer vision.\n\n</details>",
      "**4.** Predicting how much electricity a city will need each hour is an example of:",
      "- A. Regression-based demand forecasting\n- B. Clustering\n- C. OCR\n- D. Named entity recognition",
      "<details><summary>Show answer</summary>\n\n**A.** Regression-based demand forecasting.\n\n</details>",
      "**5.** Detecting meters whose usage patterns suggest tampering uses:",
      "- A. Text summarisation\n- B. Anomaly detection\n- C. Image segmentation of faces\n- D. Few-shot prompting",
      "<details><summary>Show answer</summary>\n\n**B.** Anomaly detection.\n\n</details>",
      "**6.** True or false: In most industrial AI systems, a person still makes the final decision based on the model's output.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** A mine wants to reduce unexpected breakdowns of its trucks. Which AI use fits best?",
      "- A. A marketing chatbot\n- B. Image generation\n- C. Predictive maintenance using equipment sensor data\n- D. Sentiment analysis of emails",
      "<details><summary>Show answer</summary>\n\n**C.** Sensor patterns can warn of failures before they happen.\n\n</details>",
      "**8.** A farm AI project works well in trials but fails across the region. What practical challenge is most likely?",
      "- A. AI cannot be used in farming\n- B. The model was too cheap\n- C. Farmers don't need data\n- D. Limited connectivity, data and local conditions that differ from the trial",
      "<details><summary>Show answer</summary>\n\n**D.** Real-world rollout depends on data, connectivity and local fit.\n\n</details>"
    ],
    "15.2": [
      "**Practical exercise**",
      "Pick one AI idea for an organisation you know and apply the lesson's five questions to it. Write a short verdict: pursue, test first, or drop.",
      "**Knowledge check 15.2**",
      "**1.** \"Customers who bought this also bought\" is an example of:",
      "- A. A recommendation system\n- B. OCR\n- C. Predictive maintenance\n- D. Facial recognition",
      "<details><summary>Show answer</summary>\n\n**A.** A recommendation system.\n\n</details>",
      "**2.** Route optimisation in logistics mainly helps to:",
      "- A. Translate documents\n- B. Save fuel and time on deliveries\n- C. Detect faces\n- D. Write marketing emails",
      "<details><summary>Show answer</summary>\n\n**B.** Save fuel and time on deliveries.\n\n</details>",
      "**3.** Why must public-sector AI be especially transparent and accountable?",
      "- A. Governments have no data\n- B. Public services never use AI\n- C. Citizens often have no alternative provider and decisions can affect their rights\n- D. It makes systems faster",
      "<details><summary>Show answer</summary>\n\n**C.** Citizens often have no alternative provider and decisions can affect their rights.\n\n</details>",
      "**4.** Which question checks whether an AI idea is practical to build?",
      "- A. What colour should the logo be?\n- B. How many slides will the presentation have?\n- C. Which font should the report use?\n- D. Is there enough relevant, legal and reasonably clean data?",
      "<details><summary>Show answer</summary>\n\n**D.** Is there enough relevant, legal and reasonably clean data?\n\n</details>",
      "**5.** Why ask \"What happens when it is wrong?\" before starting an AI project?",
      "- A. To make sure mistakes can be noticed and fixed, and high-stakes decisions are reviewed\n- B. Because AI is never wrong\n- C. To make the project longer\n- D. To avoid collecting data",
      "<details><summary>Show answer</summary>\n\n**A.** To make sure mistakes can be noticed and fixed, and high-stakes decisions are reviewed.\n\n</details>",
      "**6.** True or false: Every business problem should be solved with AI.",
      "<details><summary>Show answer</summary>\n\n**False.** The statement is false.\n\n</details>",
      "**7.** A colleague proposes \"using AI\" but can't say what decision it would improve. What is the right first question?",
      "- A. Which AI brand is most popular?\n- B. What specific problem or decision would this improve, and how would we measure it?\n- C. How fast can we buy it?\n- D. Can we skip testing?",
      "<details><summary>Show answer</summary>\n\n**B.** A good AI idea starts with a clear problem and a measurable benefit.\n\n</details>",
      "**8.** A hospital uses AI to flag scans for review. Who should make the final diagnosis?",
      "- A. The AI on its own\n- B. The IT department\n- C. A qualified doctor, using the AI as support\n- D. The patient",
      "<details><summary>Show answer</summary>\n\n**C.** In high-stakes uses, AI supports professionals rather than replacing their judgement.\n\n</details>"
    ],
    "16.1": [
      "**Practical exercise**",
      "Choose an AI system that makes decisions about people, such as loan approval or CV screening. Write one risk and one safeguard for each principle: fairness, privacy, transparency, accountability and safety.",
      "**Knowledge check 16.1**",
      "**1.** What does responsible AI mean?",
      "- A. Using AI only on weekends\n- B. Letting AI make all decisions alone\n- C. Using the most expensive AI tools\n- D. Designing and using AI so it is fair, safe, transparent and accountable",
      "<details><summary>Show answer</summary>\n\n**D.** Designing and using AI so it is fair, safe, transparent and accountable.\n\n</details>",
      "**2.** A hiring model trained on years of hiring mostly men favours male applicants. Where did the bias come from?",
      "- A. Historical data reflecting past unfair decisions\n- B. The colour of the website\n- C. The speed of the computer\n- D. The number of features",
      "<details><summary>Show answer</summary>\n\n**A.** Historical data reflecting past unfair decisions.\n\n</details>",
      "**3.** What is a good first step in checking a model for fairness?",
      "- A. Check its overall accuracy only\n- B. Measure its performance and outcomes separately for different groups\n- C. Ask the model if it is fair\n- D. Make the model larger",
      "<details><summary>Show answer</summary>\n\n**B.** Measure its performance and outcomes separately for different groups.\n\n</details>",
      "**4.** Which of these is especially sensitive personal data?",
      "- A. The weather forecast\n- B. A list of product prices\n- C. Health records and biometric data such as fingerprints\n- D. Public holiday dates",
      "<details><summary>Show answer</summary>\n\n**C.** Health records and biometric data such as fingerprints.\n\n</details>",
      "**5.** What does pseudonymisation mean?",
      "- A. Writing data in a secret language\n- B. Deleting all data\n- C. Sharing data publicly\n- D. Replacing names and identifiers with codes so people are not directly identified",
      "<details><summary>Show answer</summary>\n\n**D.** Replacing names and identifiers with codes so people are not directly identified.\n\n</details>",
      "**6.** True or false: Removing a \"gender\" column from the data guarantees that a model has no gender bias.",
      "<details><summary>Show answer</summary>\n\n**False.** Other features can strongly hint at gender, so bias can remain through proxies.\n\n</details>",
      "**7.** A recruitment model shortlists far fewer women than men with similar qualifications. What should the team do?",
      "- A. Stop and investigate the data and model for bias, and fix it before further use\n- B. Keep using it; the model is neutral\n- C. Hide the results\n- D. Remove the HR team",
      "<details><summary>Show answer</summary>\n\n**A.** Checking outcomes across groups is how fairness problems are found.\n\n</details>",
      "**8.** A customer asks why an AI system refused their application. What principle requires a clear answer?",
      "- A. Data minimisation\n- B. Transparency and explainability\n- C. Speed\n- D. Automation",
      "<details><summary>Show answer</summary>\n\n**B.** People affected by AI decisions deserve an understandable explanation.\n\n</details>"
    ],
    "16.2": [
      "**Practical exercise**",
      "Ask an AI assistant for three sources on a topic you know well. Check whether each source exists and says what the AI claims. Then write three rules you would put in a team's AI use policy.",
      "**Knowledge check 16.2**",
      "**1.** What is a deepfake?",
      "- A. A very detailed photo\n- B. A deep neural network\n- C. AI-generated or altered media showing someone saying or doing something they never did\n- D. A fake email address",
      "<details><summary>Show answer</summary>\n\n**C.** AI-generated or altered media showing someone saying or doing something they never did.\n\n</details>",
      "**2.** What is the most reliable way to check a suspicious video or voice message?",
      "- A. Look only for blurry edges\n- B. Trust it if the quality is high\n- C. Share it to see what others think\n- D. Verify the source and context through a trusted separate channel",
      "<details><summary>Show answer</summary>\n\n**D.** Verify the source and context through a trusted separate channel.\n\n</details>",
      "**3.** Which is a sensible copyright practice when using generative AI at work?",
      "- A. Treat output as a draft, add your own work and avoid copying named artists or brands\n- B. Ask AI to copy a competitor's logo exactly\n- C. Claim AI output is entirely your own original research\n- D. Paste copyrighted books into prompts and publish the results",
      "<details><summary>Show answer</summary>\n\n**A.** Treat output as a draft, add your own work and avoid copying named artists or brands.\n\n</details>",
      "**4.** What is AI governance?",
      "- A. A government department that builds AI\n- B. The rules, roles and processes that make sure an organisation uses AI safely and legally\n- C. A type of neural network\n- D. A list of AI companies",
      "<details><summary>Show answer</summary>\n\n**B.** The rules, roles and processes that make sure an organisation uses AI safely and legally.\n\n</details>",
      "**5.** What is an AI register?",
      "- A. A cash register that uses AI\n- B. A login page\n- C. A list of every AI system in use with its purpose, owner and risk level\n- D. A training dataset",
      "<details><summary>Show answer</summary>\n\n**C.** A list of every AI system in use with its purpose, owner and risk level.\n\n</details>",
      "**6.** True or false: Rules about copyright and AI training are still being disputed and differ between countries.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** An AI tool drafts a report that cites a court case you can't find anywhere. What should you do?",
      "- A. Include it; the AI is usually right\n- B. Change the date and include it\n- C. Cite the AI tool instead\n- D. Treat it as a likely hallucination and don't use it unless you can verify it",
      "<details><summary>Show answer</summary>\n\n**D.** Verify facts and sources; people stay responsible for what they publish.\n\n</details>",
      "**8.** Your organisation has no rules for staff using AI tools. What is the best first governance step?",
      "- A. Write a clear AI use policy covering approved tools, data and review\n- B. Ban all computers\n- C. Let everyone decide alone\n- D. Wait for a problem first",
      "<details><summary>Show answer</summary>\n\n**A.** Governance turns responsible-AI principles into everyday practice.\n\n</details>"
    ],
    "17.1": [
      "**Practical exercise**",
      "For an AI assistant that reads a company's emails, write one example of each attack from the lesson (prompt injection, data poisoning, evasion and theft) and one control that would reduce each risk.",
      "**Knowledge check 17.1**",
      "**1.** Why are AI systems a new target for attackers?",
      "- A. They have no security at all\n- B. They follow plain-language instructions, learn from data and are often connected to tools\n- C. They only run on old computers\n- D. They cannot be connected to the internet",
      "<details><summary>Show answer</summary>\n\n**B.** They follow plain-language instructions, learn from data and are often connected to tools.\n\n</details>",
      "**2.** What is prompt injection?",
      "- A. Injecting a virus into a computer with a USB stick\n- B. Typing a prompt very quickly\n- C. Hiding instructions in text an AI reads so it ignores its original rules\n- D. Adding more training data",
      "<details><summary>Show answer</summary>\n\n**C.** Hiding instructions in text an AI reads so it ignores its original rules.\n\n</details>",
      "**3.** Which is a key defence against prompt injection in AI agents?",
      "- A. Give the agent full access to every system\n- B. Store passwords in the agent's instructions\n- C. Let the agent follow any instruction it reads\n- D. Require human approval for sensitive actions and give the agent only the access it needs",
      "<details><summary>Show answer</summary>\n\n**D.** Require human approval for sensitive actions and give the agent only the access it needs.\n\n</details>",
      "**4.** What is data poisoning?",
      "- A. Deliberately adding misleading examples to training data so the model learns the wrong thing\n- B. Deleting a dataset\n- C. Storing data in an unsafe file format\n- D. Spilling coffee on a laptop",
      "<details><summary>Show answer</summary>\n\n**A.** Deliberately adding misleading examples to training data so the model learns the wrong thing.\n\n</details>",
      "**5.** Small stickers on a road sign that make a vision model misread it are an example of:",
      "- A. Data minimisation\n- B. An evasion (adversarial) attack\n- C. Customer segmentation\n- D. Prompt chaining",
      "<details><summary>Show answer</summary>\n\n**B.** An evasion (adversarial) attack.\n\n</details>",
      "**6.** True or false: Treating all outside content as data rather than instructions helps protect AI systems from prompt injection.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** A web page contains hidden text telling an AI assistant to email the user's files to a stranger. What attack is this?",
      "- A. Data poisoning\n- B. Model theft\n- C. Prompt injection\n- D. A software update",
      "<details><summary>Show answer</summary>\n\n**C.** Prompt injection hides instructions in content the AI reads.\n\n</details>",
      "**8.** Someone secretly adds mislabelled examples to the data a model learns from. What is this called?",
      "- A. Prompt injection\n- B. Cross-validation\n- C. Tokenisation\n- D. Data poisoning",
      "<details><summary>Show answer</summary>\n\n**D.** Poisoned training data corrupts what the model learns.\n\n</details>"
    ],
    "17.2": [
      "**Practical exercise**",
      "Write a short checklist your team could follow when they get an urgent request for money or data by email, phone or video call. Include at least one way to verify the request through a separate channel.",
      "**Knowledge check 17.2**",
      "**1.** A caller sounding exactly like your manager urgently asks you to transfer money. What should you do?",
      "- A. Hang up and verify by calling back on a number you already know, and follow payment procedures\n- B. Transfer the money immediately because you recognise the voice\n- C. Ask the caller for their number and call that\n- D. Send half the money as a test",
      "<details><summary>Show answer</summary>\n\n**A.** Hang up and verify by calling back on a number you already know, and follow payment procedures.\n\n</details>",
      "**2.** How much recorded speech can AI need to clone a voice?",
      "- A. At least 100 hours\n- B. As little as a few seconds\n- C. A full written biography\n- D. It is impossible to clone voices",
      "<details><summary>Show answer</summary>\n\n**B.** As little as a few seconds.\n\n</details>",
      "**3.** Which is an example of AI helping cyber defenders?",
      "- A. Writing phishing emails\n- B. Cloning voices\n- C. Anomaly detection spotting unusual logins and data downloads\n- D. Poisoning training data",
      "<details><summary>Show answer</summary>\n\n**C.** Anomaly detection spotting unusual logins and data downloads.\n\n</details>",
      "**4.** Which practice is safest when using AI tools at work?",
      "- A. Paste source code and customer lists into any free tool\n- B. Share one account with the whole team\n- C. Turn off multi-factor authentication\n- D. Use approved tools and never paste passwords, client data or confidential documents",
      "<details><summary>Show answer</summary>\n\n**D.** Use approved tools and never paste passwords, client data or confidential documents.\n\n</details>",
      "**5.** Why be careful with AI browser extensions?",
      "- A. They may be able to read everything on your screen\n- B. They always slow the internet down\n- C. They delete your files automatically\n- D. They are illegal everywhere",
      "<details><summary>Show answer</summary>\n\n**A.** They may be able to read everything on your screen.\n\n</details>",
      "**6.** True or false: A genuine organisation will often ask you to share your one-time security code by email.",
      "<details><summary>Show answer</summary>\n\n**False.** The statement is false.\n\n</details>",
      "**7.** The finance team gets a video call from what looks and sounds like the CEO, urgently asking for a payment. What should they do?",
      "- A. Pay quickly, because it is the CEO\n- B. Verify through a separate, known channel and follow the payment procedure\n- C. Reply on the same call to confirm\n- D. Ignore the procedure this once",
      "<details><summary>Show answer</summary>\n\n**B.** Deepfakes make voices and faces unreliable proof; verify behaviour and process.\n\n</details>",
      "**8.** You want to use an AI tool to summarise a confidential client contract. What should you check first?",
      "- A. That the summary will be short\n- B. That the tool is free\n- C. That the tool is approved by your organisation for confidential data\n- D. Nothing; summaries are harmless",
      "<details><summary>Show answer</summary>\n\n**C.** Keep sensitive data out of tools that are not approved for it.\n\n</details>"
    ],
    "18.1": [
      "**Practical exercise**",
      "Choose one of the eight project options. Write a one-paragraph problem statement, two measurable success criteria, the data you would use and the approach and tools from the course that fit.",
      "**Knowledge check 18.1**",
      "**1.** Why is a project of your own valuable for your career?",
      "- A. It replaces the need for a CV\n- B. Employers only care about quiz scores\n- C. It is only for decoration\n- D. It is proof that you can take a real problem from idea to working solution",
      "<details><summary>Show answer</summary>\n\n**D.** It is proof that you can take a real problem from idea to working solution.\n\n</details>",
      "**2.** How many project options does the course suggest?",
      "- A. Eight\n- B. Two\n- C. Twenty\n- D. One",
      "<details><summary>Show answer</summary>\n\n**A.** Eight.\n\n</details>",
      "**3.** Which is the best problem statement?",
      "- A. I want to use a random forest\n- B. Online shops lose customers without warning; this project will predict who may stop buying so the shop can send an offer first\n- C. AI is interesting\n- D. This project is about data",
      "<details><summary>Show answer</summary>\n\n**B.** Online shops lose customers without warning; this project will predict who may stop buying so the shop can send an offer first.\n\n</details>",
      "**4.** A good problem statement names:",
      "- A. Only the name of the algorithm\n- B. The number of slides in the presentation\n- C. Who has the problem, what it is and what decision the AI will support\n- D. The colour scheme of the report",
      "<details><summary>Show answer</summary>\n\n**C.** Who has the problem, what it is and what decision the AI will support.\n\n</details>",
      "**5.** Which is a measurable success criterion?",
      "- A. Make a good model\n- B. Use lots of data\n- C. Impress the assessor\n- D. Identify at least 70% of customers who stop buying, with precision of at least 0.50",
      "<details><summary>Show answer</summary>\n\n**D.** Identify at least 70% of customers who stop buying, with precision of at least 0.50.\n\n</details>",
      "**6.** True or false: Synthetic data can be used for a project if it is realistic and clearly labelled as synthetic.",
      "<details><summary>Show answer</summary>\n\n**True.** The statement is true.\n\n</details>",
      "**7.** A learner's project idea is \"use AI to improve business\". What should they do first?",
      "- A. Write a specific problem statement: who has the problem, what it is and what decision it would support\n- B. Pick the most advanced model\n- C. Start coding straight away\n- D. Make the idea even broader",
      "<details><summary>Show answer</summary>\n\n**A.** A clear problem statement keeps the project focused and testable.\n\n</details>",
      "**8.** You plan to predict which customers will stop buying, but have no real data you are allowed to use. What is a sensible option?",
      "- A. Copy a company's customer data without permission\n- B. Use a suitable public dataset or realistic synthetic data, clearly labelled as such\n- C. Skip the data step\n- D. Invent results",
      "<details><summary>Show answer</summary>\n\n**B.** Use permitted data, and be open about where it came from.\n\n</details>"
    ],
    "18.2": [
      "**Practical exercise**",
      "Using the project you planned in the last lesson, draft the outline of a 10-slide presentation and list two limitations or risks you would report honestly.",
      "**Knowledge check 18.2**",
      "**1.** When evaluating a model in your project, which results should you report?",
      "- A. Training-set results only\n- B. Only your best single prediction\n- C. Test-set results compared with a simple baseline\n- D. No results, just the code",
      "<details><summary>Show answer</summary>\n\n**C.** Test-set results compared with a simple baseline.\n\n</details>",
      "**2.** How should you treat failures found during testing?",
      "- A. Hide them from the report\n- B. Delete the data that caused them\n- C. Change the success measures afterwards\n- D. Report them honestly as valuable findings",
      "<details><summary>Show answer</summary>\n\n**D.** Report them honestly as valuable findings.\n\n</details>",
      "**3.** What should the first slide of your presentation contain?",
      "- A. The title, your name and a one-line summary\n- B. Your full code\n- C. Every chart you made\n- D. Only the references",
      "<details><summary>Show answer</summary>\n\n**A.** The title, your name and a one-line summary.\n\n</details>",
      "**4.** What is the best way to open a project presentation?",
      "- A. Start by naming the algorithm\n- B. Start with the problem, not the technology\n- C. Start with the references\n- D. Start with an apology",
      "<details><summary>Show answer</summary>\n\n**B.** Start with the problem, not the technology.\n\n</details>",
      "**5.** Which piece of evidence strengthens a project report?",
      "- A. A list of AI company names\n- B. A copy of the course outline\n- C. A link to your Colab notebook or screenshots of your working solution\n- D. An empty slide",
      "<details><summary>Show answer</summary>\n\n**C.** A link to your Colab notebook or screenshots of your working solution.\n\n</details>",
      "**6.** True or false: A project report does not need to discuss ethics or limitations if the model is accurate.",
      "<details><summary>Show answer</summary>\n\n**False.** The statement is false.\n\n</details>",
      "**7.** Your model scores well, but it performs worse for older customers. How should you report this?",
      "- A. Leave it out so the results look better\n- B. Delete older customers from the data\n- C. Only report the training score\n- D. Report it honestly as a limitation and explain what you would do about it",
      "<details><summary>Show answer</summary>\n\n**D.** Honest limitations build trust and are a valuable finding.\n\n</details>",
      "**8.** You are presenting your AI project to business managers. How should you open?",
      "- A. With the problem and who has it, not the technology\n- B. With the algorithm's name\n- C. With your code\n- D. With a list of every library used",
      "<details><summary>Show answer</summary>\n\n**A.** Non-technical audiences care first about the problem and the value.\n\n</details>",
      "**Learner reflection 3 of 3**",
      "> Which AI skill from this course do you most want to keep building, such as Python, prompting, automation or responsible AI, and what is one project you could start in the next month to practise it?",
      "Write your answer in your notes. There is no right or wrong answer, and it isn't marked."
    ]
  },
  "closing": [
    "## Final assessment",
    "This course ends with a final assessment.",
    "- 30 multiple-choice questions covering the whole course.\n- Pass mark: 24 out of 30 (80%).\n- Time limit: 45 minutes. Question order is shuffled.\n- After you submit, you can see the correct answers with explanations.",
    "| Topic | Questions |\n| --- | --- |\n| Introduction to AI | 2 |\n| Understanding machine learning | 2 |\n| Understanding data | 2 |\n| Python basics for AI | 1 |\n| Data analysis and visualisation | 1 |\n| Supervised learning | 2 |\n| Unsupervised learning | 2 |\n| Model evaluation | 2 |\n| Generative AI | 2 |\n| Prompt engineering | 2 |\n| AI automation | 1 |\n| Deep learning | 2 |\n| Natural language processing | 2 |\n| Computer vision | 1 |\n| AI across industries | 1 |\n| AI ethics and responsible AI | 2 |\n| AI and cyber security | 2 |\n| Planning and presenting an AI project | 1 |\n| **Total** | **30** |",
    "Open **Final Assessment** from this day's quizzes when you are ready.",
    "## Course feedback questionnaire",
    "When you finish this lesson, the course shows as completed on your dashboard. Select **Share feedback** on the course card to answer five short questions:",
    "1. Overall, how would you rate this course?\n2. How relevant was the course to the job or career you want?\n3. How confident do you now feel about using AI and machine learning tools in your work?\n4. How easy was the course to follow?\n5. What was most useful, and what one thing should we improve?",
    "It takes about two minutes. Your answers help us improve the course."
  ],
  "textEdits": {
    "1.1": [
      {
        "from": "By Day 18 you will have built and presented a real AI project of your own.",
        "to": "By Day 18 you will know how to plan, build and present a real AI project of your own."
      }
    ],
    "17.2": [
      {
        "from": "Tomorrow you bring everything together in your capstone project.",
        "to": "Tomorrow you learn how to bring everything together in an AI project of your own."
      }
    ],
    "18.1": [
      {
        "from": "Now you will bring it all together in a **capstone project**: a complete AI project that you plan, build, evaluate and present.",
        "to": "Today you will learn how to bring it all together in **your own AI project**: one that you plan, build, evaluate and present."
      },
      {
        "from": "## Why the Capstone Matters",
        "to": "## Why Your Own Project Matters"
      },
      {
        "from": "Your capstone becomes your strongest portfolio piece:",
        "to": "A project of your own becomes your strongest portfolio piece:"
      },
      {
        "from": "so it impresses assessors and employers.",
        "to": "so it impresses employers."
      }
    ],
    "18.2": [
      {
        "from": "## Turning Your Capstone Into a Career Asset",
        "to": "## Turning Your Project Into a Career Asset"
      },
      {
        "from": "## Assessment Criteria",
        "to": "## Checking Your Own Project"
      },
      {
        "from": "Your capstone is marked out of 100 using six criteria: problem definition and objective (15), data understanding and preparation (15), technical implementation (25), evaluation and results (15), ethics, risks and limitations (15), and documentation and presentation (15). The full rubric is in the capstone brief.",
        "to": "Before you share your project, score it out of 100 using six criteria: problem definition and objective (15), data understanding and preparation (15), technical implementation (25), evaluation and results (15), ethics, risks and limitations (15), and documentation and presentation (15)."
      },
      {
        "from": "Your capstone is the proof of everything you have learned.",
        "to": "A project like this is the proof of everything you have learned, and the final assessment below checks the ideas behind it."
      }
    ]
  },
  "lessonTitleEdits": {
    "18.1": {
      "from": "Planning Your Capstone: Problem, Data and Approach",
      "to": "Planning an AI Project: Problem, Data and Approach"
    }
  },
  "module18": {
    "title": {
      "from": "Capstone Project",
      "to": "Planning and Presenting an AI Project"
    }
  },
  "courseDescription": {
    "from": "finishing with a capstone project you build and present yourself.",
    "to": "finishing with how to plan and present an AI project of your own, and a 30-question final assessment."
  },
  "finalAssessment": [
    {
      "text": "Why is a basic calculator NOT considered AI?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "It only follows fixed instructions and never learns from examples",
          "isCorrect": true
        },
        {
          "text": "It is too small",
          "isCorrect": false
        },
        {
          "text": "It cannot do multiplication",
          "isCorrect": false
        },
        {
          "text": "It does not use electricity",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "How does traditional software usually decide what to do?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "It learns patterns from examples",
          "isCorrect": false
        },
        {
          "text": "It guesses randomly",
          "isCorrect": false
        },
        {
          "text": "It asks the user every time",
          "isCorrect": false
        },
        {
          "text": "It follows rules that a programmer wrote",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "In a table of past loan applications, what is a \"feature\"?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "The computer that stores the table",
          "isCorrect": false
        },
        {
          "text": "A new applicant who is not in the table",
          "isCorrect": false
        },
        {
          "text": "A clue used for prediction, such as income or age, usually a column",
          "isCorrect": true
        },
        {
          "text": "The final answer, such as whether the loan was repaid",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which analogy best fits unsupervised learning?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "Reading a recipe",
          "isCorrect": false
        },
        {
          "text": "Sorting a box of mixed buttons into piles that look alike",
          "isCorrect": true
        },
        {
          "text": "A teacher marking homework",
          "isCorrect": false
        },
        {
          "text": "Training a dog with treats",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which of these is structured data?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "A table of transactions with columns for date, amount and account",
          "isCorrect": true
        },
        {
          "text": "A set of voice recordings",
          "isCorrect": false
        },
        {
          "text": "A collection of photos",
          "isCorrect": false
        },
        {
          "text": "Hours of security camera video",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Why should you keep a record of every change you make while cleaning data?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "To make the file larger",
          "isCorrect": false
        },
        {
          "text": "Because spreadsheets require it",
          "isCorrect": false
        },
        {
          "text": "To hide mistakes",
          "isCorrect": false
        },
        {
          "text": "So others can trust, check and repeat your work",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "Given daily_sales = [120, 95, 140], what is daily_sales[0]?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Python counts from zero, so [0] is the first item.",
      "answers": [
        {
          "text": "140",
          "isCorrect": false
        },
        {
          "text": "0",
          "isCorrect": false
        },
        {
          "text": "120",
          "isCorrect": true
        },
        {
          "text": "95",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which pandas method calculates totals per category, such as revenue per region?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "read_csv",
          "isCorrect": false
        },
        {
          "text": "groupby",
          "isCorrect": true
        },
        {
          "text": "head",
          "isCorrect": false
        },
        {
          "text": "print",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Predicting which of five product types appears in a photo is:",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "Multi-class classification",
          "isCorrect": true
        },
        {
          "text": "Binary classification",
          "isCorrect": false
        },
        {
          "text": "Linear regression",
          "isCorrect": false
        },
        {
          "text": "Not machine learning",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What does model.fit(X_train, y_train) do?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "Tests the model",
          "isCorrect": false
        },
        {
          "text": "Deletes the training data",
          "isCorrect": false
        },
        {
          "text": "Draws a chart",
          "isCorrect": false
        },
        {
          "text": "Trains the model on the training data",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "In K-means, what does K stand for?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "The accuracy of the model",
          "isCorrect": false
        },
        {
          "text": "The number of features",
          "isCorrect": false
        },
        {
          "text": "The number of clusters you want",
          "isCorrect": true
        },
        {
          "text": "The number of rows in the data",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Why is an isolation forest good at finding anomalies?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "It deletes outliers automatically",
          "isCorrect": false
        },
        {
          "text": "Unusual points can be separated from the rest in very few random splits",
          "isCorrect": true
        },
        {
          "text": "It only looks at one column",
          "isCorrect": false
        },
        {
          "text": "It needs every example to be labelled as fraud",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "A model says a patient is healthy, but they are actually sick. This is a:",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "False negative",
          "isCorrect": true
        },
        {
          "text": "False positive",
          "isCorrect": false
        },
        {
          "text": "True positive",
          "isCorrect": false
        },
        {
          "text": "True negative",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "A model scores poorly on both training and test data. This most likely shows:",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "Overfitting",
          "isCorrect": false
        },
        {
          "text": "Data leakage",
          "isCorrect": false
        },
        {
          "text": "A perfect model",
          "isCorrect": false
        },
        {
          "text": "Underfitting",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is a token?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "A type of image",
          "isCorrect": false
        },
        {
          "text": "A coin used to pay for AI",
          "isCorrect": false
        },
        {
          "text": "A chunk of text, such as a short word or part of a word, that an LLM reads",
          "isCorrect": true
        },
        {
          "text": "A password for an AI tool",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What are embeddings used for in RAG systems?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "Counting words",
          "isCorrect": false
        },
        {
          "text": "Representing the meaning of text as numbers so similar meanings can be found",
          "isCorrect": true
        },
        {
          "text": "Making text bold",
          "isCorrect": false
        },
        {
          "text": "Encrypting passwords",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which is the strongest prompt?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "Write a 150-word friendly email to existing customers announcing our new delivery service, ending with a link to book",
          "isCorrect": true
        },
        {
          "text": "Write an email",
          "isCorrect": false
        },
        {
          "text": "Email about delivery",
          "isCorrect": false
        },
        {
          "text": "Make something for customers",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "When improving a prompt, why change one thing at a time?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "Because AI tools only accept one change",
          "isCorrect": false
        },
        {
          "text": "To save electricity",
          "isCorrect": false
        },
        {
          "text": "It makes the prompt shorter",
          "isCorrect": false
        },
        {
          "text": "So you know which change improved or worsened the results",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "Which of these is a no-code automation tool?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "pandas",
          "isCorrect": false
        },
        {
          "text": "Matplotlib",
          "isCorrect": false
        },
        {
          "text": "Zapier",
          "isCorrect": true
        },
        {
          "text": "Python",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What makes a neural network \"deep\"?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "It only works on images",
          "isCorrect": false
        },
        {
          "text": "It has many hidden layers",
          "isCorrect": true
        },
        {
          "text": "It is stored underground",
          "isCorrect": false
        },
        {
          "text": "It uses a lot of electricity",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is transfer learning?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "Fine-tuning a model already trained on a large dataset for your own smaller task",
          "isCorrect": true
        },
        {
          "text": "Moving a model to a new computer",
          "isCorrect": false
        },
        {
          "text": "Translating data between languages",
          "isCorrect": false
        },
        {
          "text": "Copying another student's homework",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is tokenisation?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "Encrypting text",
          "isCorrect": false
        },
        {
          "text": "Translating text",
          "isCorrect": false
        },
        {
          "text": "Printing text",
          "isCorrect": false
        },
        {
          "text": "Splitting text into smaller units such as words",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is zero-shot classification?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "Training a model on zero rows",
          "isCorrect": false
        },
        {
          "text": "Deleting all categories",
          "isCorrect": false
        },
        {
          "text": "Classifying text into given category names with no extra training",
          "isCorrect": true
        },
        {
          "text": "Classifying text with zero accuracy",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "YOLO is a well-known family of models for:",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "Clustering customers",
          "isCorrect": false
        },
        {
          "text": "Fast object detection, including on live video",
          "isCorrect": true
        },
        {
          "text": "Spreadsheet analysis",
          "isCorrect": false
        },
        {
          "text": "Speech recognition",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "A farmer photographs a leaf and receives a likely diagnosis. Which technique is this?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "Computer vision (image classification)",
          "isCorrect": true
        },
        {
          "text": "Speech recognition",
          "isCorrect": false
        },
        {
          "text": "Linear regression",
          "isCorrect": false
        },
        {
          "text": "Clustering",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is proxy bias?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "Bias caused by using a proxy server",
          "isCorrect": false
        },
        {
          "text": "Bias that only affects computers",
          "isCorrect": false
        },
        {
          "text": "A model that is too simple",
          "isCorrect": false
        },
        {
          "text": "When a feature such as postcode acts as a stand-in for a protected characteristic",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "Which is a good control against hallucinations in published content?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "Ask the AI if it is sure",
          "isCorrect": false
        },
        {
          "text": "Remove all sources",
          "isCorrect": false
        },
        {
          "text": "Verify facts in original sources and keep a human responsible",
          "isCorrect": true
        },
        {
          "text": "Publish AI output without reading it",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "An AI assistant summarising an email finds hidden text telling it to forward the user's emails elsewhere. This is:",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "A hallucination",
          "isCorrect": false
        },
        {
          "text": "Indirect prompt injection",
          "isCorrect": true
        },
        {
          "text": "Data poisoning",
          "isCorrect": false
        },
        {
          "text": "Model theft",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Why is two-person approval for payments a good defence against deepfake fraud?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "A single tricked person cannot complete a fraudulent payment alone",
          "isCorrect": true
        },
        {
          "text": "It makes payments faster",
          "isCorrect": false
        },
        {
          "text": "Deepfakes cannot fool two people at once",
          "isCorrect": false
        },
        {
          "text": "It removes the need for passwords",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which is a suitable source of free public datasets?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "",
      "answers": [
        {
          "text": "A friend's private bank statements without permission",
          "isCorrect": false
        },
        {
          "text": "Customer data copied from a former employer",
          "isCorrect": false
        },
        {
          "text": "Random numbers with no explanation",
          "isCorrect": false
        },
        {
          "text": "Kaggle or the UCI Machine Learning Repository",
          "isCorrect": true
        }
      ]
    }
  ]
};
