import { BriefSpec } from "./briefBuilder";

// HSE Fundamentals (Oil & Gas), Days 1-8. Keyed by module week_number. All facilities,
// companies and people in scenarios are fictional.
export const HSE_WEEKS: Record<number, BriefSpec> = {
  1: {
    overview:
      "New starters on an oil and gas site are often surprised by how many organisations have a say in how they work. You are writing a short **HSE landscape brief** for a new colleague: what HSE means on a Nigerian oil and gas operation, who regulates it and how that regulation affects everyday decisions.",
    tasks: [
      "In your own words, explain **what HSE means** (health, safety and environment) and why it is treated as a core business function in oil and gas, not an optional extra. Give **one example each** for health, safety and environment.",
      "Name **at least three of the regulatory bodies** covered this day (NUPRC, NMDPRA, NESREA, NOSDRA). For each, state what it oversees, and **which side of the wellhead** it primarily covers (or that it applies across both).",
      "Choose **one regulator** and describe **one real way its oversight would change a day-to-day decision on a production site**. Be concrete: say who makes the decision, what they must check, and what would happen if they ignored the rule.",
      "Write a **short closing paragraph (80-120 words)** explaining why a site worker who knows *which* regulator to expect matters for safety, not just paperwork.",
    ],
    deliverables: [
      "A brief of **2-3 pages (about 700-1,000 words)** (.docx, .pdf or .txt).",
      "Include a small table: *Regulator | What it oversees | Upstream, midstream/downstream or both*.",
    ],
    criteria: [
      { name: "Explanation of HSE", points: 20, description: "Clear, accurate definition in the candidate's own words with three concrete examples." },
      { name: "Regulators and their scope", points: 30, description: "At least three regulators correctly described, with the right side of the wellhead." },
      { name: "Practical effect of oversight", points: 30, description: "A specific, realistic decision affected by a regulator, with who decides and what happens if ignored." },
      { name: "Closing paragraph", points: 10, description: "Explains the safety value of knowing the regulatory landscape." },
      { name: "Clarity", points: 10, description: "Readable brief with a complete table." },
    ],
    example:
      "*Worked example (extract) using an invented regulator so it shows the format only. Do not reuse its wording. Your answer must use the real regulators from this day.*\n\n| Regulator | What it oversees | Side |\n|---|---|---|\n| Example Marine Authority (invented) | Ship-to-shore transfer of fuel at jetties | Downstream |\n\n**How oversight changes a decision.** *Before a tanker discharges at a jetty, the terminal supervisor must confirm that the transfer plan and equipment checks have been approved under the Authority's rules. If the supervisor skips the check to save time, the terminal can lose its licence for the jetty, and a hose failure would have no approved emergency plan. So the supervisor holds the transfer until the paperwork and equipment inspection are complete.*",
    tips: [
      "Do not just list the regulators' names. Explain what each one *does* and where it stops.",
      "\"They make sure everything is safe\" is too vague. Name the specific activity or decision affected.",
      "Write in your own words. Copying the lesson text word for word will lose marks.",
    ],
  },

  2: {
    overview:
      "Every safe job starts with the question *\"What could go wrong, and how bad could it be?\"* A **Hazard Identification and Risk Assessment (HIRA)** answers it in a structured way. You will carry out a HIRA for a realistic oil and gas work scenario.",
    materials:
      "**Simple risk matrix to use.** Score each hazard on **likelihood (1-5)** and **severity (1-5)**, then multiply.\n\n| Score | Risk level | Action |\n|---|---|---|\n| 1-4 | Low | Manage by routine procedures |\n| 5-9 | Medium | Add controls; supervisor awareness |\n| 10-16 | High | Do not start until controls are in place |\n| 20-25 | Extreme | Do not do the work; redesign |",
    tasks: [
      "Choose **one realistic oil and gas work scenario** (for example a pipeline maintenance task, a rig floor operation, or tank cleaning). Describe it in 3-4 sentences: the task, the location, who is involved and the conditions.",
      "Identify **at least four hazards** that fall across **at least three different hazard categories** from this day's lesson. Include **at least one occupational health hazard** (for example noise, heat stress, chemical exposure or manual handling).",
      "For each hazard, **score likelihood and severity**, calculate the **risk level** using the matrix, and note **who could be harmed and how**.",
      "For each hazard, propose **one control measure** and state **which level of the hierarchy of controls** it belongs to (elimination, substitution, engineering controls, administrative controls or PPE).",
      "Re-score each hazard **after the control** to show the **residual risk**. Explain briefly any hazard that remains High.",
    ],
    deliverables: [
      "A HIRA document of **500-800 words** (.docx or .pdf preferred) built around a table with columns *Hazard | Category | Who is harmed | Likelihood | Severity | Risk | Control | Hierarchy level | Residual risk*.",
    ],
    criteria: [
      { name: "Scenario and hazard identification", points: 25, description: "A realistic scenario; at least four distinct hazards across three categories including an occupational health hazard." },
      { name: "Risk scoring", points: 25, description: "Scores are reasoned and correctly calculated using the matrix." },
      { name: "Controls and hierarchy", points: 30, description: "Each control is specific, correctly placed in the hierarchy, and stronger controls are preferred over PPE alone." },
      { name: "Residual risk", points: 10, description: "Correctly re-scored with sensible reasoning." },
      { name: "Clarity", points: 10, description: "Neat, complete table." },
    ],
    example:
      "*Worked example (two rows) for a different scenario: refuelling a generator at a remote site. Do not reuse its wording.*\n\n| Hazard | Category | Who is harmed | L | S | Risk | Control | Hierarchy | Residual |\n|---|---|---|---|---|---|---|---|---|\n| Fuel vapour ignition during refuelling | Physical (fire) | Operator, nearby staff | 3 | 5 | 15 High | Stop generator and let it cool before refuelling; no ignition sources within 10 m | Administrative | 1 x 5 = 5 Medium |\n| Skin contact with diesel | Chemical / occupational health | Operator | 4 | 2 | 8 Medium | Use a closed pump nozzle and drip tray; wear nitrile gloves | Engineering, then PPE | 1 x 2 = 2 Low |\n\n**Note.** The strongest control is engineering (closed nozzle), not just gloves, because PPE is the last line of defence.",
    tips: [
      "Do not choose four hazards from the same category. The task asks for at least three categories.",
      "PPE on its own is the weakest control. Try to include something higher in the hierarchy.",
      "Score honestly. If every hazard is Low, your assessment is not credible.",
    ],
  },

  3: {
    overview:
      "Knowing *who regulates what* is a core HSE skill. Contractors and operators who report to the wrong authority, or overlook a standard, put themselves at legal risk. You will produce a one-page comparison of the four main bodies and a short explanation of how international management standards relate to Nigerian regulation.",
    tasks: [
      "Produce a **one-page summary table** comparing **NUPRC, NMDPRA, NESREA and NOSDRA**. Columns: *Body | Full name | Main role | Sector or side of the wellhead | Example of when an operator deals with it*.",
      "Make clear in your table **which side of the wellhead** NUPRC and NMDPRA each cover.",
      "Write a paragraph of **200-300 words** explaining how **ISO 45001** (occupational health and safety management) and **ISO 14001** (environmental management) certification **relate to** Nigerian regulatory compliance for an oil and gas operator. Address this question: *does an ISO certificate mean an operator is legally compliant?* Explain your answer.",
      "Add **two practical examples** of situations where an operator would have to work with more than one regulator at the same time.",
    ],
    deliverables: [
      "A document of **one page for the table plus 300-450 words** of writing (.docx, .pdf or .txt).",
    ],
    criteria: [
      { name: "Accuracy of the table", points: 35, description: "All four bodies correctly described with the correct side of the wellhead for NUPRC and NMDPRA." },
      { name: "ISO and regulation explanation", points: 35, description: "Correctly explains that ISO certification is voluntary and complements, but does not replace, legal compliance; supported with reasoning." },
      { name: "Examples of multiple regulators", points: 15, description: "Two realistic scenarios involving more than one body." },
      { name: "Clarity", points: 15, description: "Concise, well laid out and in the candidate's own words." },
    ],
    example:
      "*Worked example (extract) using two invented bodies to show the format only. Do not reuse its wording.*\n\n| Body | Main role | Sector | Example |\n|---|---|---|---|\n| Example Fisheries Board (invented) | Licenses commercial fishing and protects fish stocks | Marine | A terminal that discharges water near a fishing area must report to it |\n| Example Labour Office (invented) | Enforces workplace safety in factories | Workplace | Investigates a serious injury at a plant |\n\n**Paragraph (extract).** *\"A management standard such as ISO 9001 shows that a company follows a documented, audited system. It is voluntary and is issued by an independent certifier, whereas a regulator's rule is a legal duty. A company could hold an ISO certificate and still be breaking a law, for instance by missing a reporting deadline. So the certificate supports compliance by building good habits, but does not prove it.\"*",
    tips: [
      "ISO standards are voluntary management systems, not laws. Make sure you explain that difference.",
      "Make sure the table is accurate on jurisdiction. This is the point most often confused.",
      "Give practical examples, not definitions.",
    ],
  },

  4: {
    overview:
      "Many serious accidents in oil and gas happen during **contractor hot work** near flammable material. The controls you will describe here (PPE, a valid permit with the right checks, and a clear toolbox talk) are what stand between a routine repair and a fire.",
    materials:
      "**Scenario (fictional).** A three-person contractor crew from *Bright Weld Services* has been hired to weld a repair to a steel support bracket on a pipe rack. The work is at *Ndoni Terminal*, about **20 m from a bunded diesel storage tank** and near a drainage channel. It is a hot, dry afternoon with light wind. Another crew is scheduled to wash down the tank area at the same time. The contractor's supervisor says the job will take two hours and wants to start immediately.",
    tasks: [
      "**Specify the PPE** the crew needs for this job. For **each item**, justify it against a **specific hazard** (for example flame-resistant coveralls against sparks and heat, a welding helmet against arc radiation and flying particles).",
      "Outline the **key checks a valid hot work permit should require** before the work starts. Include **gas testing** (what is tested, when, and how often), removal or protection of flammable material, fire watch and firefighting equipment, isolation of nearby sources, and **contractor checks** (induction, competence and supervision).",
      "Explain how you would manage the **SIMOPS (simultaneous operations)** risk from the wash-down crew working nearby.",
      "Write a **toolbox talk** of roughly **200-300 words**, in the words you would actually say to the crew. Cover the task, the key hazards, the controls, emergency actions, and the **Stop Work Authority**.",
    ],
    deliverables: [
      "A document (.docx, .pdf or .txt) of **700-1,000 words**.",
      "Use a *PPE table* (*Item | Hazard it protects against*), a numbered *permit checks* list and the *toolbox talk* under its own heading.",
    ],
    criteria: [
      { name: "PPE selection and justification", points: 20, description: "Complete, appropriate items each linked to a specific hazard in this scenario." },
      { name: "Hot work permit checks", points: 30, description: "Thorough checks including gas testing, flammable material control, fire watch, and contractor competence." },
      { name: "SIMOPS management", points: 15, description: "Correctly identifies the conflict with the wash-down crew and proposes clear coordination or sequencing." },
      { name: "Toolbox talk", points: 25, description: "Realistic spoken style; covers task, hazards, controls, emergency actions and stop work authority within the time-scale." },
      { name: "Clarity", points: 10, description: "Well organised and practical." },
    ],
    example:
      "*Worked example (extract) for a different job: cutting a corroded pipe support near a fuel pump. Do not reuse its wording.*\n\n| PPE item | Hazard it protects against |\n|---|---|\n| Flame-resistant coveralls | Sparks and molten metal igniting normal clothing |\n| Safety boots with steel toe caps | Falling tools and hot metal on the ground |\n\n**Permit checks (extract).** 1. Gas test at the work point and around the fuel pump *before* starting and again after any break, recorded on the permit. 2. Cover drains within 15 m with fire blankets so sparks cannot ignite vapour. 3. A fire watch with a suitable extinguisher stays for 30 minutes after work finishes.\n\n**Toolbox talk (opening).** *\"Morning, everyone. Today we are cutting a support next to the fuel pump. The big danger is sparks meeting fuel vapour. So we have gas tested it, covered the drains, and Ade will be on fire watch. If anything smells like fuel, or the wind changes, stop, put down your tools and tell me. Anybody can call a stop, no questions asked.\"*",
    tips: [
      "\"Wear full PPE\" is not an answer. Name each item and say which hazard it addresses.",
      "The toolbox talk should sound like a person talking to a crew, not a report.",
      "Do not forget the second crew. Simultaneous operations near hot work is a real cause of accidents.",
    ],
  },

  5: {
    overview:
      "When an emergency happens, the plan is worth nothing unless people already know what to do. You will draft an **emergency response summary** for a facility and a **journey management plan** for a road trip between two sites, because road travel is one of the most common causes of serious injury in oil and gas.",
    tasks: [
      "Choose a **facility type** (for example a flow station or a drilling rig) and name it and its location (fictional).",
      "Write a **one-page emergency response summary** with **at least two credible scenarios** (for example a fire at the storage area and a gas release) and, for each, the **first three actions**, who does them and how the alarm is raised.",
      "Define the **key roles** (for example incident commander, first-aid lead, muster point coordinator) and describe how you will **account for every person at the muster point**, including contractors and visitors, and what happens if someone is missing.",
      "Write a **half-page journey management plan** for a **realistic road trip between two site locations**. Cover **route and timing** (including avoiding night travel where sensible), **vehicle pre-trip checks**, **driver fitness and fatigue limits**, **check-in procedure** and what happens if a check-in is missed.",
    ],
    deliverables: [
      "A document of **one page for the emergency response and half a page for journey management** (about 600-900 words) (.docx, .pdf or .txt).",
      "Include a *scenario table* (*Scenario | First actions | Who | Alarm method*).",
    ],
    criteria: [
      { name: "Emergency scenarios", points: 30, description: "Two credible scenarios with clear first actions, owners and alarm method." },
      { name: "Roles and personnel accounting", points: 25, description: "Clear roles and a workable method to account for everyone, including contractors and visitors." },
      { name: "Journey management plan", points: 30, description: "Realistic route, vehicle checks, driver fitness rules and a check-in procedure with a missed-check-in response." },
      { name: "Clarity", points: 15, description: "Concise, practical and usable in an emergency." },
    ],
    example:
      "*Worked example (extract) for a different scenario: a tank farm. Do not reuse its wording.*\n\n| Scenario | First actions | Who | Alarm |\n|---|---|---|---|\n| Fuel leak at the loading bay | 1. Stop the pump (emergency stop). 2. Sound the alarm and clear the bay. 3. Call the fire team | Loading operator, then control room | Siren plus radio channel 1 |\n\n**Personnel accounting.** Everyone signs in on a board at the gate, including visitors. At the muster point, the coordinator calls names from the *live sign-in list*. Anyone unaccounted for is reported to the incident commander immediately, who decides whether the fire team can search.\n\n**Journey plan (extract).** Trip: 2 pm departure, arrive before 5:30 pm, before dark. Driver has had at least 7 hours of sleep and has not driven more than 8 hours that day. Driver calls the control room at departure, at the halfway point and on arrival. *If a call is missed by 15 minutes, the control room phones the driver, and after 30 minutes the trip is treated as an emergency.*",
    tips: [
      "Do not forget **visitors and contractors** in your muster count. They are the ones most often missed.",
      "Journey plans need a *missed check-in* action. Without it, check-ins mean nothing.",
      "Keep actions short and in order. In an emergency, nobody reads paragraphs.",
    ],
  },

  6: {
    overview:
      "Investigating an incident is not about blaming someone. It is about finding the *real* reason it happened so it does not happen again. You will classify an incident, apply the **5 Whys** technique to find a plausible root cause, and propose a corrective action that fixes the cause, not just the symptom.",
    materials:
      "**Incident (fictional).** During a routine planned maintenance job at a pump station, a fitter (Emeka) was replacing a worn guard on a **standby pump**. While his right hand was inside the guard, another operator, who was starting up the pump for a quick test on the next shift's instructions, switched it on. Emeka's hand was caught briefly. He was treated at the site clinic with **four stitches** and returned to light duties the **next day**. No one was aware that Emeka was working on the pump. The pump's isolation point had **no lock or tag**, and the job card listed the task as \"quick guard change, no isolation needed\".",
    tasks: [
      "**Classify the incident** using this day's classification scheme (near miss, first-aid case, medical treatment case, lost-time injury and so on). Justify your choice using the facts, and say **who should be notified**, internally and (if relevant) externally.",
      "Apply the **5 Whys** technique. Write the chain: *Why did the injury happen? ... because ... Why? ...* Continue until you reach a cause you can fix, usually five levels. Make sure each answer is supported by a fact from the scenario or is clearly marked as an assumption.",
      "State the **root cause** in one sentence, and explain why it is a root cause and not just the immediate cause.",
      "Propose **one corrective action** that addresses the root cause specifically. Explain why it would work, who owns it and when it should be done.",
      "Name **one weaker action** (for example \"remind staff to be careful\") that some organisations wrongly rely on, and explain why it is weak.",
    ],
    deliverables: [
      "A written report of **450-700 words** (.docx, .pdf or .txt).",
      "Include the 5 Whys as a numbered chain and a short *Corrective action* table (*Action | Owner | Due date | Why it works*).",
    ],
    criteria: [
      { name: "Classification", points: 20, description: "Correct category with justification and correct notifications." },
      { name: "5 Whys chain", points: 35, description: "A logical chain from injury to a fixable cause, based on the facts." },
      { name: "Root cause", points: 15, description: "A clear, system-level root cause distinct from the immediate cause." },
      { name: "Corrective action", points: 20, description: "Specific action that targets the root cause, with an owner and date, and a reasoned comparison with a weaker action." },
      { name: "Clarity", points: 10, description: "Structured and fair, without blaming individuals." },
    ],
    example:
      "*Worked example (extract) for a different incident: a slip on an oily step. Do not reuse its wording.*\n\n1. **Why did the worker fall?** Because the step was covered in oil.\n2. **Why was there oil on the step?** Because a small leak from a nearby pump dripped onto it.\n3. **Why was the leak not fixed?** Because it was reported verbally but never logged as a work order.\n4. **Why was it not logged?** Because the shift handover had no step for open defects.\n5. **Why did the handover not include defects?** Because the handover form was never updated after the plant changed.\n\n**Root cause.** The handover procedure had no route for recording defects, so known problems were forgotten. *This is a system cause, not the worker's carelessness.*\n\n**Corrective action.** Add an \"open defects\" section to the handover form, reviewed by the supervisor each shift. *Why stronger than \"tell workers to watch their step\":* it removes the reason the leak stayed unfixed.",
    tips: [
      "Do not stop at \"the operator made a mistake\". Ask why the system allowed the mistake.",
      "Mark assumptions clearly. Do not invent facts the scenario does not give.",
      "\"Retrain staff\" or \"remind them\" is usually a weak corrective action on its own.",
    ],
  },

  7: {
    overview:
      "The first hour of a spill response decides whether it stays a manageable incident or becomes an environmental disaster, especially near waterways. You will draft a **spill response protocol** for a small pipeline leak near a creek, following the **7-step framework** taught this day.",
    materials:
      "**Scenario (fictional).** A patrol operator at *Ogboinbiri Delta Pipeline* discovers oil seeping from a small pipeline joint about **60 m from a creek** used by a nearby fishing community. He estimates the leak at **a few barrels per hour**. It is 06:30 on a calm morning. The nearest response equipment store is **30 minutes away by road**. The site supervisor is at the base, 45 minutes away.",
    tasks: [
      "Write the protocol as a **table with the seven steps** from this day's framework: **detect and confirm, notify, assess, contain, recover, clean up, document**.",
      "For **each step**, state **what is done**, **who is responsible** (by role), **what resources or equipment are needed** and a **target time** (for example within 15 minutes).",
      "In the **notify** step, list **who is told** (internal and external, including the regulator responsible for oil spills and, where relevant, the affected community) and in what order.",
      "In the **contain** and **recover** steps, explain how you would protect the creek and what equipment you would use (for example booms, absorbents, pumps and storage), and how the waste is handled.",
      "Add a **short paragraph (100-150 words)** explaining why speed matters and how the presence of the creek changes your priorities compared with a remote dry site.",
    ],
    deliverables: [
      "A protocol document of **600-900 words** (.docx, .pdf or .txt).",
      "Use the table *Step | Actions | Responsible role | Resources | Target time* and end with the short paragraph.",
    ],
    criteria: [
      { name: "Seven steps in order", points: 25, description: "All seven steps present in the correct order, each with specific actions." },
      { name: "Roles, resources and timing", points: 30, description: "Named roles, appropriate equipment and realistic target times for each step." },
      { name: "Notification", points: 15, description: "Correct people and order, including the oil spill regulator and the affected community." },
      { name: "Containment and recovery", points: 15, description: "Sensible protection of the waterway and correct waste handling." },
      { name: "Reasoning and clarity", points: 15, description: "Explains why the creek raises the priority; clear and usable." },
    ],
    example:
      "*Worked example (two rows) for a different scenario: a truck tank leak near a drain. Do not reuse its wording.*\n\n| Step | Actions | Responsible | Resources | Target time |\n|---|---|---|---|---|\n| 1. Detect and confirm | Driver confirms fuel is leaking, stops the engine, keeps people away and away from ignition sources | Driver | Phone, torch | Immediately |\n| 2. Notify | Driver calls the dispatcher, who alerts the site emergency lead and informs the regulator | Driver, dispatcher | Emergency contact list | Within 10 minutes |\n\n**Why speed matters (extract).** *\"A leak beside a drain can reach a watercourse within minutes. Blocking the drain cover with an absorbent mat first, before cleaning up the road, protects the water and prevents a bigger problem.\"*",
    tips: [
      "Each step needs a **role**, not just \"the team\". Say who does it.",
      "Do not skip **document**. Regulatory reporting and learning depend on it.",
      "Think about the *creek*. Containing the spill before it reaches the water is the top priority.",
    ],
  },

  8: {
    overview:
      "An audit checklist turns good intentions into evidence. It lets an auditor walk a site, check the same things every time, and point to facts rather than opinions. You will design a **one-page internal audit checklist** for a small oil and gas facility, drawing on this whole course.",
    tasks: [
      "Choose a **small oil and gas facility type** (for example a flow station, a small products depot or a wellhead site) and describe it in one or two sentences.",
      "Design a checklist covering **at least five distinct areas** from across the course, for example: **PPE compliance**, **permit-to-work and contractor competence records**, **emergency equipment and journey management readiness**, **incident reporting**, and **environmental controls**.",
      "For **each area**, write **at least four specific check items**. Each item must say **what the auditor looks at** and **the type of evidence** (an observation on site, a record to inspect, or a person to ask), for example *\"Inspect the last three hot work permits for a gas test reading recorded before start\"*.",
      "Provide a **rating system** (for example *Compliant, Partly compliant, Non-compliant, Not applicable*) and a simple rule for **what happens to a Non-compliant finding** (who is told, and a time limit for a fix).",
      "State a **sampling approach** (for example \"inspect at least five records or three workers per area\") and explain briefly why sampling is needed.",
    ],
    deliverables: [
      "A checklist of **about one page, plus a short notes section** (about 500-800 words) in a table format (.docx or .pdf preferred).",
      "Table columns: *Area | Check item | What to look at | Evidence type | Rating*.",
    ],
    criteria: [
      { name: "Coverage across the course", points: 25, description: "At least five distinct areas that cover different parts of the course, appropriate to the facility." },
      { name: "Specific check items", points: 30, description: "At least four checkable items per area, each naming what to inspect and the evidence type." },
      { name: "Rating and follow-up", points: 20, description: "A clear rating scale and a sensible rule for non-compliance, with an owner and time limit." },
      { name: "Sampling approach", points: 10, description: "Realistic sample sizes and a reason." },
      { name: "Usability", points: 15, description: "Compact, clear and usable on a real audit walk-round." },
    ],
    example:
      "*Worked example (one area) for a different site: a small filling station. Do not reuse its wording.*\n\n| Area | Check item | What to look at | Evidence | Rating |\n|---|---|---|---|---|\n| Fire and emergency equipment | Extinguishers are in date and accessible | Inspect the tag and pressure gauge on each extinguisher; check nothing blocks access | Observation | C / P / N / NA |\n| Fire and emergency equipment | Staff know how to respond to a fire | Ask two attendants what they would do first if a pump caught fire | Interview | C / P / N / NA |\n| Fire and emergency equipment | Fire drill records | Inspect the log for a drill in the last six months and the follow-up actions | Record | C / P / N / NA |\n\n**Follow-up rule.** *Any Non-compliant item is reported to the station manager the same day, with a fix date no later than 14 days (sooner for anything involving fire).*",
    tips: [
      "Every check item needs an *evidence type*. \"Check PPE\" is not specific enough.",
      "Use verbs an auditor can act on: inspect, observe, ask, count.",
      "Do not make it a wall of text. A good checklist is short enough to carry on a clipboard.",
    ],
  },
};
