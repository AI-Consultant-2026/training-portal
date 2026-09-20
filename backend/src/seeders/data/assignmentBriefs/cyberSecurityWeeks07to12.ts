import { BriefSpec } from "./briefBuilder";

// Cyber Security Fundamentals, Weeks 7-12. Keyed by module week_number.
export const CYBER_WEEKS_7_TO_12: Record<number, BriefSpec> = {
  7: {
    overview:
      "A risk register is the working document of every security team: a list of what the organisation owns, what could go wrong, how bad it would be and what is being done about it. You will build one for a fictional Nigerian organisation, including a risk that comes from a supplier rather than from the organisation itself.",
    tasks: [
      "Choose a fictional Nigerian organisation (any sector) and describe it in 2-3 sentences.",
      "List **at least six assets** (systems, data, people or facilities). For each, record its **type**, its **owner** (a role, not a name) and how **valuable** it is to the business (High, Medium or Low) with a one-line reason.",
      "For each asset, identify **one realistic threat and the vulnerability** that lets it happen (for example threat: ransomware; vulnerability: backups stored on the same network).",
      "Rate each risk for **likelihood (1-5)** and **impact (1-5)**, multiply them to get a **score**, and label the band (for example 1-6 Low, 7-14 Medium, 15-25 High). Show your working.",
      "Add **one control** for each risk and say who will do it and by when.",
      "Include **at least one third-party relationship** (for example a payroll provider, a cloud host or an outsourced call centre) as its own row with its own assessed risk, and say what you would ask that supplier to prove.",
      "Write a short paragraph (80-120 words) explaining **which three risks you would deal with first** and how often the register should be reviewed.",
    ],
    deliverables: [
      "A document (.docx or .pdf preferred) containing the register as a **table** with the columns: *Asset | Type | Owner | Value | Threat | Vulnerability | Likelihood | Impact | Score | Band | Control | Owner and date*.",
      "The prioritisation paragraph, of **80-120 words**, below the table.",
      "Total length about **500-800 words** plus the table.",
    ],
    criteria: [
      { name: "Assets and ownership", points: 15, description: "At least six realistic assets with owners and clear value ratings." },
      { name: "Threat and vulnerability pairing", points: 25, description: "Each threat is matched with a specific, believable vulnerability, not generic wording." },
      { name: "Scoring", points: 20, description: "Likelihood and impact are reasoned, scores are calculated correctly, and bands are applied consistently." },
      { name: "Controls and third-party risk", points: 25, description: "Controls are practical with owners and dates; the supplier risk is genuine and includes what to ask for as proof." },
      { name: "Prioritisation and clarity", points: 15, description: "Sensible top three with reasons; the table is neat and easy to read." },
    ],
    example:
      "*Worked example (three rows) for a different organisation. Do not reuse its wording.*\n\n**Organisation.** Bright Future Secondary School, a fictional private school with 600 students and an online results portal.\n\n| Asset | Owner | Value | Threat | Vulnerability | L | I | Score | Band | Control |\n|---|---|---|---|---|---|---|---|---|---|\n| Student results database | Head of Academics | High (grades decide admissions) | Unauthorised change of grades | One shared admin password known by five teachers | 4 | 5 | 20 | High | Individual accounts with MFA; change history logged (Head of IT, 30 days) |\n| Front-office PCs | Bursar | Medium | Malware from USB drives | No endpoint protection | 3 | 3 | 9 | Medium | Install endpoint protection and disable USB storage (IT officer, 14 days) |\n| **Third party:** online payment provider | Bursar | High (holds fee payments) | Provider outage or data breach | No contract clause on breach notification | 2 | 5 | 10 | Medium | Add a 72-hour breach-notification clause; ask for their security certificate |\n\n**Prioritisation (extract).** First the results database (score 20) because a wrong grade damages students directly, then the payment provider contract because it is quick to fix, then front-office PCs. The register is reviewed every term and whenever a system or supplier changes.",
    tips: [
      "Avoid generic pairs like \"hackers: weak security\". Name the exact weakness, for example \"one shared admin password\".",
      "Impact is about the business, not the technology. Ask *what would this cost the organisation?*",
      "Assign every control to a role and a date. A control with no owner is just a wish.",
      "The supplier row must describe a *supplier* risk, not an internal one with a supplier's name on it.",
    ],
  },

  8: {
    overview:
      "Most serious breaches involve people who had more access than they needed, or access that should have been removed and was not. You will write a short role-based access control (RBAC) policy and design a contractor offboarding checklist that makes sure access truly ends when an engagement ends.",
    tasks: [
      "Choose a fictional organisation (any sector) and list **at least three roles** (for example *Customer Support Agent*, *Finance Officer*, *IT Administrator*).",
      "Build a **permissions matrix**: rows are systems or data (at least four), columns are your roles, and each cell says *None*, *Read*, *Edit* or *Admin*. Apply **least privilege**: nobody should have more than they need.",
      "Write **rules for privileged (administrator) accounts**: for example separate admin accounts from everyday accounts, MFA, limited number of admins, and logging of admin actions.",
      "Describe briefly how **joiners, movers and leavers** are handled so that access changes when a person's role changes or ends.",
      "Design a **contractor offboarding checklist** with **at least eight items**. For each item state *what is done*, *who does it* and *what evidence proves it is done*. Cover accounts, remote access, devices and badges, shared passwords or keys the contractor knew, and a final check of logs.",
      "Write 3-4 sentences on **how your policy reduces insider risk**, whether the insider is malicious or simply careless.",
    ],
    deliverables: [
      "A document (.docx, .pdf or .txt) of **600-900 words**.",
      "Include the permissions matrix and the offboarding checklist as **tables**.",
    ],
    criteria: [
      { name: "Permissions matrix and least privilege", points: 30, description: "Roles and systems are realistic; permissions are the minimum needed and each role's access is justified." },
      { name: "Privileged account rules", points: 15, description: "Specific rules (separate admin accounts, MFA, logging, few admins) with reasons." },
      { name: "Offboarding checklist", points: 30, description: "At least eight concrete items with an owner and evidence; nothing important missing, such as shared credentials." },
      { name: "Joiner, mover, leaver and insider risk", points: 15, description: "A clear process and a sound explanation of insider risk." },
      { name: "Clarity", points: 10, description: "Tables are readable; language is plain enough for managers." },
    ],
    example:
      "*Worked example for a different organisation. Do not reuse its wording.*\n\n**Organisation.** Kano Community Radio (fictional), with presenters, a technical operator and a station manager.\n\n| System / data | Presenter | Technical operator | Station manager |\n|---|---|---|---|\n| Audio library | Read | Edit | Read |\n| Broadcast console | None | Admin | None |\n| Advertiser contracts | None | None | Edit |\n| Staff payroll | None | None | Read |\n\n**Why.** Presenters need to play audio but must never change the broadcast console. The manager can read payroll but cannot edit it, which separates approving pay from changing it.\n\n**Offboarding checklist (extract).**\n\n| # | Action | Owner | Evidence |\n|---|---|---|---|\n| 1 | Disable the contractor's named account on all systems | Technical operator | Screenshot of the disabled account, dated |\n| 2 | Remove VPN access | Technical operator | VPN user list without the contractor |\n| 3 | Change every shared password the contractor knew (for example the studio Wi-Fi) | Technical operator | Change log entry |\n| 4 | Collect keys, badge and any station laptop | Station manager | Signed return form |\n| 5 | Review the last 30 days of the contractor's activity logs | Technical operator | Short review note |\n| 6 | Confirm in writing to the contractor and to the manager that access has ended | Station manager | Email copy |",
    tips: [
      "\"Everyone has read access to everything\" is not least privilege. Justify each cell.",
      "The most forgotten offboarding item is **shared credentials** the contractor knew. Change them.",
      "Every checklist item needs an owner and evidence. \"IT will handle it\" is not enough.",
    ],
  },

  9: {
    overview:
      "An incident response playbook is a set of ready-made instructions so that in the middle of a crisis, people do not have to invent a plan. You will write a playbook for a **malware infection**, walking through each of the six phases of the incident response lifecycle from this week's lessons, and showing how the incident would be classified and prioritised.",
    materials:
      "**Scenario (fictional company: Lagoon Insurance Ltd).** At 08:15, a finance officer reports that her laptop is slow and shows pop-ups. The antivirus tool has raised an alert named *\"Trojan.Generic\"*. The IT help desk notices that the laptop has been sending unusual amounts of data to an unfamiliar internet address overnight. The laptop is used to access the claims payment system.",
    tasks: [
      "Write the playbook for the scenario using the **six phases** taught this week (Preparation, Detection, Containment, Eradication, Recovery and Lessons Learned). For **each phase** give **at least three concrete actions**, and say who performs each one.",
      "Create a **classification table** with four severity levels (for example *Low, Medium, High, Critical*), the criteria for each, and the response time expected. Then **classify the scenario above** and justify your choice in 2-3 sentences.",
      "State **what evidence to preserve** and why (for example the antivirus alert, timestamps and the isolated laptop), and what must *not* be done (for example wiping the laptop before investigation).",
      "Write a **communication order**: who is told first, second and third (for example incident lead, IT manager, finance director, legal), by what channel, and what each person needs to know.",
    ],
    deliverables: [
      "A playbook document of **700-1,000 words** (.docx, .pdf or .txt).",
      "Use one table for the six phases (*Phase | Actions | Owner*) and one table for classification.",
    ],
    criteria: [
      { name: "Six phases with concrete actions", points: 35, description: "All six phases appear in the right order, each with at least three specific actions and owners, not vague statements." },
      { name: "Classification and prioritisation", points: 20, description: "A sensible four-level scheme with response times; the scenario is classified correctly with reasoning." },
      { name: "Evidence handling", points: 15, description: "Knows what to preserve and what to avoid." },
      { name: "Communication plan", points: 15, description: "Correct order and appropriate detail for each recipient." },
      { name: "Clarity", points: 15, description: "Usable in a real emergency: scannable tables, plain language." },
    ],
    example:
      "*Worked example of two phases for a different scenario (a suspicious login to a staff email account). Do not reuse its wording.*\n\n| Phase | Actions | Owner |\n|---|---|---|\n| **Detection** | 1. The mail system alerts on a login from a new country. 2. The help desk checks the account's recent sign-in history. 3. The help desk confirms with the staff member by phone whether they were travelling. | IT help desk |\n| **Containment** | 1. Force sign-out of all sessions and reset the password. 2. Suspend forwarding rules in the mailbox. 3. Block the suspicious sign-in location. | IT administrator |\n\n**Classification.** *High*: a compromised mailbox can be used to send convincing phishing to colleagues and customers. Response time: containment within 1 hour.\n\n**Evidence to preserve.** The sign-in log entries and the mailbox rules. Do not delete the account, because that destroys the evidence.",
    tips: [
      "\"Contain the threat\" is not an action. Write the specific step, for example \"disconnect the laptop from the network and disable her account\".",
      "Containment is not the same as fixing. First stop the spread, then remove the cause (eradication), then restore (recovery).",
      "Do not skip Lessons Learned. It is what makes the next incident smaller.",
    ],
  },

  10: {
    overview:
      "Technology alone does not keep an organisation safe: every employee's daily habits matter. You will write a **one-page security awareness guide** for new employees of a fictional Nigerian organisation. It must be clear, friendly and practical enough that someone would actually read and use it.",
    tasks: [
      "Choose a fictional Nigerian organisation and write one sentence about what it does.",
      "Write short, practical guidance for each of these five areas: **password habits**, **device security**, **email vigilance**, **how and when to report something suspicious**, and **at least one physical security practice** (for example not holding the door open for someone without a badge, known as *tailgating*).",
      "Under each area, give **2-3 simple rules** in plain language and **one real-life example or situation** (for example \"a caller claims to be from IT and asks for your password\").",
      "Add a **\"Who to contact\"** box: which role, which channel, and what to include in a report. Make clear that reporting quickly is welcome and nobody will be blamed for a genuine mistake.",
      "End with a **five-item checklist** an employee can tick at the end of their first week.",
    ],
    deliverables: [
      "A one-page guide of **350-500 words** (.docx or .pdf preferred; a typed answer is also accepted).",
      "Use short headings, bullet points and at least one example per area.",
    ],
    criteria: [
      { name: "Coverage and accuracy", points: 30, description: "All five areas covered with correct, current advice." },
      { name: "Practical examples", points: 20, description: "Relatable situations that show *what to do* in the moment." },
      { name: "Reporting culture", points: 20, description: "Clear reporting route, encourages fast reporting, and reassures staff they will not be blamed." },
      { name: "Tone and plain language", points: 15, description: "Friendly, jargon-free and written for a new employee." },
      { name: "Layout and checklist", points: 15, description: "Fits about one page, easy to scan, ends with a useful checklist." },
    ],
    example:
      "*Worked example (one area) for a different organisation. Do not reuse its wording.*\n\n**Organisation.** Sunrise Hospital (fictional), which stores patient records.\n\n**Email vigilance**\n\n- Stop and look before you click. Check who really sent the message and where a link goes.\n- Never type your password on a page you reached from an email link.\n- If something asks you to act *urgently*, that is a reason to slow down, not speed up.\n\n*Situation:* An email that looks like it is from the Medical Director asks you to open an attached \"patient list\" today. Do not open it. Phone the Medical Director on the number in the staff directory, then forward the email to security@sunrisehospital.example.\n\n**Who to contact.** Email security@sunrisehospital.example or call extension 100. Say what you saw, when, and whether you clicked anything. *You will never be in trouble for reporting in good faith.*",
    tips: [
      "Write it *to* the employee (\"you\"), not *about* security. Avoid jargon unless you explain it.",
      "A wall of text will not be read. Use headings and bullets.",
      "Do not forget the physical area. Many people only cover passwords and email.",
    ],
  },

  11: {
    overview:
      "Moving to the cloud does not move the responsibility for security to the provider. It **shares** it, and most cloud breaches come from the customer's side of that line, usually through a misconfiguration. You will analyse a fictional organisation that uses all three cloud service models and propose controls to reduce misconfiguration risk.",
    materials:
      "**Fictional organisation: Ajala Health Tech.** It rents virtual servers (**IaaS**) to run its own patient-booking software, uses a managed application platform and database service (**PaaS**) for its mobile app, and uses an online email and document suite (**SaaS**) for staff.",
    tasks: [
      "Build a **shared responsibility table** with three columns, IaaS, PaaS and SaaS, and rows for at least five layers (for example physical data centre, network controls, operating system, application, data, and user identities and access). In each cell say whether the **provider** or **Ajala** (the customer) is responsible.",
      "Identify **at least three realistic cloud misconfiguration risks** for Ajala (for example a storage container left publicly readable, an over-permissive administrator role given to everyone, a management port open to the whole internet, no MFA on admin accounts, or an unencrypted database). For each, explain what could go wrong.",
      "Propose **at least three specific IAM or configuration controls** (for example least-privilege roles, MFA for all admin accounts, regular access reviews, encryption switched on, logging enabled). For each, say which risk it reduces.",
      "Write 3-4 sentences explaining **why \"the provider secures it\" is a dangerous assumption**, using your table as evidence.",
    ],
    deliverables: [
      "A document (.docx, .pdf or .txt) of **500-800 words**.",
      "Include the shared responsibility table and a risk-and-control table.",
    ],
    criteria: [
      { name: "Shared responsibility table", points: 30, description: "Responsibilities for each model and layer are correctly assigned." },
      { name: "Misconfiguration risks", points: 25, description: "At least three realistic risks, each with a clear consequence." },
      { name: "IAM and configuration controls", points: 25, description: "Specific, actionable controls linked to the risks they reduce." },
      { name: "Reasoning", points: 10, description: "Convincingly explains why assuming the provider handles everything is unsafe." },
      { name: "Clarity", points: 10, description: "Tables are clear and well laid out." },
    ],
    example:
      "*Worked example (one risk) for a different organisation. Do not reuse its wording.*\n\n**Organisation.** Zuma Online Store (fictional), which hosts its website on a cloud platform.\n\n| Risk | What could go wrong | Control | Risk it reduces |\n|---|---|---|---|\n| Product-image and invoice storage container set to *public* | Anyone who guesses the address can download customer invoices, exposing names and addresses | Make the container private by default; grant access only to the web application's role; add a weekly check for public containers | Data exposure |\n\n**Shared responsibility (extract).**\n\n| Layer | IaaS | PaaS | SaaS |\n|---|---|---|---|\n| Physical data centre | Provider | Provider | Provider |\n| Operating system patching | **Customer** | Provider | Provider |\n| Who can log in and what they can do | **Customer** | **Customer** | **Customer** |",
    tips: [
      "\"Identity and access\" and \"your data\" are the customer's responsibility in **every** model. Do not assign them to the provider.",
      "Controls must be specific. \"Improve security\" earns no marks; \"enable MFA on all administrator accounts\" does.",
      "Match each control to the risk it reduces, so the reader can see the link.",
    ],
  },

  12: {
    overview:
      "Not all data deserves the same protection. Classifying it lets an organisation spend effort where the harm would be greatest. When personal data is exposed, Nigerian law also sets a strict clock for telling the regulator. You will classify data for a fictional Nigerian organisation and write its breach notification plan.",
    tasks: [
      "Choose a fictional Nigerian organisation and describe it in 2-3 sentences.",
      "List **at least six types of data** it holds (for example customer contact details, staff payroll, marketing brochures, medical or financial records, passwords, internal meeting notes).",
      "Classify each into the **four-tier scheme from this week's lesson** (from *Public* to *Restricted*). For each, give a one-sentence reason based on the **harm if exposed**.",
      "For each data type, state whether it must be encrypted **at rest**, **in transit**, or **both**, with a brief reason.",
      "Write the **breach notification steps and timeline** the organisation must follow under the **Nigeria Data Protection Act (NDPA)**: what triggers notification, who must be told and by when (including the time limit for the regulator, the NDPC), what information the notice must contain, and when affected individuals must also be told.",
      "Add **three practical preparations** the organisation should make *before* a breach so it can meet the deadline.",
    ],
    deliverables: [
      "A document (.docx, .pdf or .txt) of **600-900 words**.",
      "Include a classification table with columns *Data | Tier | Reason | Encryption* and a numbered notification timeline.",
    ],
    criteria: [
      { name: "Classification", points: 30, description: "Data types are placed in sensible tiers with reasons based on harm, not guesswork." },
      { name: "Encryption decisions", points: 15, description: "Correct at rest, in transit or both, with reasons." },
      { name: "Breach notification plan", points: 30, description: "Correct trigger, recipients and time limit under the NDPA, a clear ordered process, and what the notice must contain." },
      { name: "Preparation", points: 15, description: "Realistic steps taken in advance to meet the deadline." },
      { name: "Clarity", points: 10, description: "Tables and timeline are tidy and easy to follow." },
    ],
    example:
      "*Worked example (two rows and a timeline extract) for a different organisation. Do not reuse its wording.*\n\n**Organisation.** Greenline Pharmacy Chain (fictional).\n\n| Data | Tier | Reason | Encryption |\n|---|---|---|---|\n| Customer prescriptions | Restricted | Reveals health conditions; serious harm and distress if exposed | Both at rest and in transit |\n| Opening-hours notice | Public | Already meant for the public | Not required, but use HTTPS on the website |\n\n**Notification timeline (extract).**\n\n1. **Hour 0:** the pharmacist reports lost patient records to the incident lead.\n2. **Within 24 hours:** the data protection officer assesses what data was affected and whether there is a risk to the people concerned.\n3. **Within 72 hours of becoming aware:** notify the NDPC with the nature of the breach, the categories and approximate number of people, likely consequences and the steps being taken.\n4. **Without undue delay if the risk is high:** tell affected customers clearly what happened and what to do to protect themselves.",
    tips: [
      "Classify by the **harm if exposed**, not by how *interesting* the data is.",
      "Do not just write \"72 hours\". Explain *72 hours from when*, and to *whom*.",
      "Not all breaches need the same response. Explain when individuals must also be told.",
    ],
  },
};
