import { CsfAssessmentChanges } from "./curriculumCyberSecurityAssessment";

// HSE Fundamentals, owner's changes of 2026-11-16 (applied by migration
// 20261116080000-hse-fundamentals-assessment-changes): a three-question knowledge check in every
// lesson (multiple choice, true or false, scenario), three learner reflections (lessons 2.2, 6.1,
// 8.2), a 30-question final assessment in place of the capstone and day assignments, and a course
// feedback questionnaire. Keys are "<day>.<lesson order>".
export const HSE_ASSESSMENT_CHANGES: Omit<CsfAssessmentChanges, "module18Description"> = {
  "knowledgeChecks": {
    "1.1": [
      "**Knowledge check 1.1**",
      "**1.** What is a near-miss?",
      "- A. An injury treated with first aid\n- B. An unplanned event where no one was hurt and nothing was damaged, but harm could have happened\n- C. A hazard that has already caused harm\n- D. A safety inspection that found nothing",
      "<details><summary>Show answer</summary>\n\n**B.** A near-miss is free information about how the next real incident could happen.\n\n</details>",
      "**2.** True or false: a hazard only counts as a hazard once it has hurt someone.",
      "<details><summary>Show answer</summary>\n\n**False.** A hazard is anything with the potential to cause harm, whether or not it has caused harm yet.\n\n</details>",
      "**3.** On a flow station, a worker trips over a hose left across a walkway but catches the handrail and isn't hurt. What should happen?",
      "- A. Report it as a near-miss so the cause can be fixed before someone is injured\n- B. Nothing, because no one was hurt\n- C. Tell the worker to look where they walk\n- D. Report it only if it happens again",
      "<details><summary>Show answer</summary>\n\n**A.** Treating near-misses as seriously as incidents is the habit this course builds.\n\n</details>"
    ],
    "1.2": [
      "**Knowledge check 1.2**",
      "**1.** Which regulator oversees HSE at a refinery or fuel storage terminal?",
      "- A. NMDPRA\n- B. NUPRC\n- C. NESREA\n- D. NOSDRA",
      "<details><summary>Show answer</summary>\n\n**A.** Rule of thumb: producing from the ground is NUPRC; moving, processing or storing afterwards is NMDPRA.\n\n</details>",
      "**2.** True or false: NESREA is the environmental regulator for oil and gas operators.",
      "<details><summary>Show answer</summary>\n\n**False.** NESREA's founding Act excludes the oil and gas sector. That role sits with NUPRC, NMDPRA, the Federal Ministry of Environment and NOSDRA.\n\n</details>",
      "**3.** A pipeline leak in the Niger Delta reaches a creek used for fishing. Why is this treated as seriously as a safety incident?",
      "- A. Because the oil is lost and costs money\n- B. Because the regulator always fines the operator\n- C. It directly harms the livelihoods of communities who depend on the land and water\n- D. It isn't; environmental issues are lower priority",
      "<details><summary>Show answer</summary>\n\n**C.** In the Delta, environmental harm quickly becomes economic and livelihood harm for real people.\n\n</details>"
    ],
    "2.1": [
      "**Knowledge check 2.1**",
      "**1.** Why is H2S so dangerous?",
      "- A. It is only dangerous when it catches fire\n- B. It always smells strongly, so it is easy to avoid\n- C. It only affects people with asthma\n- D. At high concentrations it can kill within minutes and you can no longer smell it",
      "<details><summary>Show answer</summary>\n\n**D.** Smell, the sense you'd rely on, fails at the most dangerous concentrations.\n\n</details>",
      "**2.** True or false: noise from compressors can cause permanent hearing damage before it ever feels dangerous.",
      "<details><summary>Show answer</summary>\n\n**True.** That's why noise exposure must be measured and controlled, not judged by ear.\n\n</details>",
      "**3.** During a hot afternoon, a worker in flame-resistant coveralls doing heavy lifting becomes dizzy and confused. What hazard is most likely involved?",
      "- A. A process safety hazard\n- B. Heat stress, an occupational health hazard that needs controls such as rest, shade and water\n- C. An ergonomic hazard only\n- D. Nothing; they're just having a rough day",
      "<details><summary>Show answer</summary>\n\n**B.** Heat stress is common, preventable and easy to dismiss. Treat it as a hazard needing a control.\n\n</details>"
    ],
    "2.2": [
      "**Knowledge check 2.2**",
      "**1.** In the hierarchy of controls, where does PPE sit?",
      "- A. Last: it catches whatever risk the other controls leave\n- B. First: it is always the best control\n- C. In the middle, after administrative controls\n- D. Above engineering controls",
      "<details><summary>Show answer</summary>\n\n**A.** Elimination, substitution, engineering and administrative controls come before PPE.\n\n</details>",
      "**2.** True or false: Stop Work Authority belongs only to supervisors.",
      "<details><summary>Show answer</summary>\n\n**False.** Every worker has the right, and the obligation, to stop work that looks unsafe, without asking permission first.\n\n</details>",
      "**3.** A crew must clean a tank with a strong solvent. A safer, less toxic cleaning product would work just as well. Which control is this?",
      "- A. PPE\n- B. Administrative control\n- C. Substitution: replacing the hazard with something less hazardous\n- D. Elimination",
      "<details><summary>Show answer</summary>\n\n**C.** Substitution sits near the top of the hierarchy, above engineering controls and PPE.\n\n</details>",
      "**Learner reflection 1 of 3**",
      "> Think of a task you do often, at work, at home or on the road. What is the main hazard, where would it sit on a risk matrix, and which control from the hierarchy would reduce the risk most?",
      "Write your answer in your notes. There is no right or wrong answer, and it isn't marked."
    ],
    "3.1": [
      "**Knowledge check 3.1**",
      "**1.** What is a safety case?",
      "- A. A box of emergency equipment\n- B. A court case after an accident\n- C. A one-time form filed at start-up\n- D. A living document showing that major hazards are identified, assessed and controlled",
      "<details><summary>Show answer</summary>\n\n**D.** NUPRC requires it for upstream facilities, and it must be kept up to date as operations change.\n\n</details>",
      "**2.** True or false: the Petroleum Industry Act made environmental and host community obligations part of how operators are licensed to work.",
      "<details><summary>Show answer</summary>\n\n**True.** They are part of the licence to operate, not optional add-ons.\n\n</details>",
      "**3.** You start work at a gas processing plant. Which regulator's requirements should you check first?",
      "- A. NMDPRA, because gas processing is midstream\n- B. NUPRC, because all oil and gas is upstream\n- C. NESREA, because it covers the environment\n- D. None; regulators don't affect site staff",
      "<details><summary>Show answer</summary>\n\n**A.** Identify which regulator has jurisdiction, because that shapes which requirements apply to you.\n\n</details>"
    ],
    "3.2": [
      "**Knowledge check 3.2**",
      "**1.** What is ISO 45001?",
      "- A. The standard for environmental management\n- B. The international standard for occupational health and safety management systems\n- C. A Nigerian petroleum law\n- D. A fire safety code",
      "<details><summary>Show answer</summary>\n\n**B.** It replaced OHSAS 18001 and uses the Plan-Do-Check-Act cycle.\n\n</details>",
      "**2.** True or false: ILO conventions are standards that an individual facility gets certified against.",
      "<details><summary>Show answer</summary>\n\n**False.** ILO conventions work at the level of national policy; facilities are certified against standards such as ISO 45001.\n\n</details>",
      "**3.** A contractor wants to bid for work with a major international oil company that requires certified safety management. What would help most?",
      "- A. Buying more PPE\n- B. Having a larger workforce\n- C. Being certified against ISO 45001\n- D. Lowering its prices",
      "<details><summary>Show answer</summary>\n\n**C.** For many major operators, ISO 45001 certification is a prerequisite for contract work.\n\n</details>"
    ],
    "4.1": [
      "**Knowledge check 4.1**",
      "**1.** What is the main limit of PPE?",
      "- A. It is too expensive\n- B. It only works indoors\n- C. It replaces all other controls\n- D. It reduces harm if something happens, but doesn't make the event less likely",
      "<details><summary>Show answer</summary>\n\n**D.** PPE was never meant to substitute for controls higher in the hierarchy.\n\n</details>",
      "**2.** True or false: a respirator can fail to protect a worker with a beard because it doesn't seal against the face.",
      "<details><summary>Show answer</summary>\n\n**True.** PPE that doesn't fit gives a false sense of protection.\n\n</details>",
      "**3.** Before climbing, a worker notices the stitching on their harness is worn. A replacement hasn't arrived yet. What should they do?",
      "- A. Remove the harness from service and not climb until a sound one is available\n- B. Use it carefully this once\n- C. Tape over the worn stitching\n- D. Ask a colleague to hold the line instead",
      "<details><summary>Show answer</summary>\n\n**A.** Damaged PPE is removed from service, not kept in use because a replacement is late.\n\n</details>"
    ],
    "4.2": [
      "**Knowledge check 4.2**",
      "**1.** What is the purpose of Lock-Out, Tag-Out (LOTO)?",
      "- A. To record who is on site\n- B. To keep equipment physically locked in a safe, de-energised state while work is done\n- C. To lock the site gate at night\n- D. To tag damaged PPE",
      "<details><summary>Show answer</summary>\n\n**B.** The tag shows who applied the lock and why, so no one re-energises the equipment.\n\n</details>",
      "**2.** True or false: gas testing for a hot work permit only needs to be done once, before the work starts.",
      "<details><summary>Show answer</summary>\n\n**False.** It is done before work starts and often at intervals during the work.\n\n</details>",
      "**3.** A welding job is planned near a crew cleaning a storage tank. Why does this need extra coordination?",
      "- A. Welding never needs a permit\n- B. Tank cleaning is always safe\n- C. Simultaneous operations: a control that is fine for one job can fail when the other is nearby\n- D. Two crews can't work on the same day",
      "<details><summary>Show answer</summary>\n\n**C.** SIMOPS need coordination beyond a single-activity permit.\n\n</details>"
    ],
    "5.1": [
      "**Knowledge check 5.1**",
      "**1.** What has historically been the biggest cause of fatalities in oil and gas operations worldwide?",
      "- A. Driving-related incidents\n- B. Fires\n- C. Falls from height\n- D. Confined spaces",
      "<details><summary>Show answer</summary>\n\n**A.** That's why serious operators manage journeys as carefully as site work.\n\n</details>",
      "**2.** True or false: an emergency plan that has never been practised is close to worthless.",
      "<details><summary>Show answer</summary>\n\n**True.** Drills reveal gaps that look fine on paper but fail in practice.\n\n</details>",
      "**3.** During an evacuation, the muster count shows one worker missing. Why is accurate sign-in and sign-out so important here?",
      "- A. It helps payroll\n- B. It isn't important during an emergency\n- C. It tells the media what happened\n- D. It shows quickly whether someone is still in danger, so rescue can start without delay",
      "<details><summary>Show answer</summary>\n\n**D.** Fast, accurate personnel accounting often decides whether a rescue starts immediately.\n\n</details>"
    ],
    "5.2": [
      "**Knowledge check 5.2**",
      "**1.** Which fire class covers flammable liquids such as hydrocarbons?",
      "- A. Class A\n- B. Class B\n- C. Class C\n- D. Electrical",
      "<details><summary>Show answer</summary>\n\n**B.** Class A is ordinary combustibles; Class C is flammable gases.\n\n</details>",
      "**2.** True or false: water is a safe way to put out an electrical or hydrocarbon fire.",
      "<details><summary>Show answer</summary>\n\n**False.** Water on these fires is actively dangerous. Use the right extinguisher for the fire class.\n\n</details>",
      "**3.** A small fire starts near a fuel line on site. You have not been trained to use an extinguisher. What should you do first?",
      "- A. Raise the alarm and evacuate\n- B. Fight the fire with the nearest extinguisher\n- C. Finish your task and then report it\n- D. Pour water on it",
      "<details><summary>Show answer</summary>\n\n**A.** Most workers on oil and gas sites are expected to raise the alarm and evacuate, given how fast hydrocarbon fires escalate.\n\n</details>"
    ],
    "6.1": [
      "**Knowledge check 6.1**",
      "**1.** What makes a lost-time injury different from a first-aid case?",
      "- A. It happened off site\n- B. No one was hurt\n- C. The injured person can't return to work for a period\n- D. It was treated on site with a plaster",
      "<details><summary>Show answer</summary>\n\n**C.** Classification decides how urgently the investigation happens and who is notified.\n\n</details>",
      "**2.** True or false: under-reporting near-misses is dangerous because the organisation loses information that could prevent the next serious incident.",
      "<details><summary>Show answer</summary>\n\n**True.** An organisation that can't see its near-misses is flying blind.\n\n</details>",
      "**3.** A new worker nearly drops a heavy tool from height but says nothing because they fear being blamed. What would help most?",
      "- A. Disciplining anyone involved in a near-miss\n- B. A blame-free reporting culture where honest reports are thanked and acted on\n- C. Banning tools at height\n- D. Reporting only injuries",
      "<details><summary>Show answer</summary>\n\n**B.** How reports are received, not just written policy, decides whether people report.\n\n</details>",
      "**Learner reflection 2 of 3**",
      "> Think of a time you, or someone you know, had a near-miss. Was it reported? What would make you confident to report one on site, and what might stop you?",
      "Write your answer in your notes. There is no right or wrong answer, and it isn't marked."
    ],
    "6.2": [
      "**Knowledge check 6.2**",
      "**1.** What is a root cause?",
      "- A. The underlying condition that allowed the incident and would keep causing similar ones\n- B. The first thing that went wrong\n- C. The name of the person responsible\n- D. The cost of the damage",
      "<details><summary>Show answer</summary>\n\n**A.** Fixing only the immediate cause leaves the real problem in place.\n\n</details>",
      "**2.** True or false: \"remind the worker to be more careful\" is usually an effective corrective action.",
      "<details><summary>Show answer</summary>\n\n**False.** It doesn't touch whatever let the unsafe condition exist, so the incident tends to recur.\n\n</details>",
      "**3.** A worker was burned by a hot pipe. The 5 Whys show insulation was removed for a repair and never put back because nothing tracks temporary removals. What corrective action fits best?",
      "- A. Tell the worker to wear thicker gloves\n- B. Put up a warning sign and close the case\n- C. Discipline the maintenance crew\n- D. Add tracking of temporary removals to the maintenance system, with an owner and a deadline",
      "<details><summary>Show answer</summary>\n\n**D.** Effective actions target the root cause, have an owner and deadline, and are checked as done.\n\n</details>"
    ],
    "7.1": [
      "**Knowledge check 7.1**",
      "**1.** What is an Environmental Impact Assessment (EIA)?",
      "- A. A report written after a spill\n- B. A tax on pollution\n- C. A study predicting a project's environmental and social effects before it goes ahead\n- D. A daily site inspection",
      "<details><summary>Show answer</summary>\n\n**C.** EIAs identify ways to reduce effects and usually involve host communities.\n\n</details>",
      "**2.** True or false: in environmental management, prevention is usually cheaper and more effective than clean-up afterwards.",
      "<details><summary>Show answer</summary>\n\n**True.** A pipeline that never leaks beats the best spill response.\n\n</details>",
      "**3.** An operator can either burn off associated gas or capture it for use. Why is capture usually the better choice?",
      "- A. Flaring is always illegal\n- B. It reduces air pollution and stops a valuable resource being wasted\n- C. Capturing gas needs no equipment\n- D. Flaring makes the gas more valuable",
      "<details><summary>Show answer</summary>\n\n**B.** There's an environmental and an economic case for capturing gas rather than flaring it.\n\n</details>"
    ],
    "7.2": [
      "**Knowledge check 7.2**",
      "**1.** What comes immediately after \"detect and confirm\" in the oil spill response steps?",
      "- A. Notify the right internal and external parties, including NOSDRA\n- B. Clean up\n- C. Document\n- D. Recover",
      "<details><summary>Show answer</summary>\n\n**A.** The steps are detect and confirm, notify, assess, contain, recover, clean up and document.\n\n</details>",
      "**2.** True or false: the cheapest disposal route is acceptable for hazardous waste if it saves money.",
      "<details><summary>Show answer</summary>\n\n**False.** Waste must go through licensed, properly permitted routes, whatever the cost.\n\n</details>",
      "**3.** A spill occurs at a facility, but the spill kit is found to be half empty and the booms are missing. What does this show?",
      "- A. Spill kits aren't really necessary\n- B. The spill was too small to matter\n- C. Only the regulator needs spill equipment\n- D. Spill equipment must be checked and restocked regularly, before it is needed",
      "<details><summary>Show answer</summary>\n\n**D.** Readiness, not improvisation, decides how well the response works.\n\n</details>"
    ],
    "8.1": [
      "**Knowledge check 8.1**",
      "**1.** What is safety culture?",
      "- A. The safety policy manual\n- B. The shared attitudes and behaviours that decide how people act on safety, especially when no one is watching\n- C. The number of safety posters on site\n- D. The HSE department's job title",
      "<details><summary>Show answer</summary>\n\n**B.** Culture is what people actually do under pressure, not what the manual says.\n\n</details>",
      "**2.** True or false: a site with every procedure and permit correctly documented can still have a weak safety culture.",
      "<details><summary>Show answer</summary>\n\n**True.** If people feel pushed to cut corners, documents alone don't make work safe.\n\n</details>",
      "**3.** A site manager sees a junior worker stop a job over a safety concern, and the job falls behind schedule. What response builds the strongest culture?",
      "- A. Tell the worker to raise concerns only after the shift\n- B. Restart the job to make up time\n- C. Thank the worker publicly and deal with the concern before work restarts\n- D. Ask a more senior worker to decide instead",
      "<details><summary>Show answer</summary>\n\n**C.** Leadership actions teach the workforce what really matters.\n\n</details>"
    ],
    "8.2": [
      "**Knowledge check 8.2**",
      "**1.** What is the main difference between an inspection and an audit?",
      "- A. An inspection checks a specific area against a checklist; an audit reviews the whole management system\n- B. They are the same thing\n- C. Audits are always done by regulators\n- D. Inspections only happen once a year",
      "<details><summary>Show answer</summary>\n\n**A.** Inspections catch immediate gaps; audits catch systemic ones.\n\n</details>",
      "**2.** True or false: internal audits are most useful when done by people independent of the area being audited.",
      "<details><summary>Show answer</summary>\n\n**True.** Independence makes the self-check honest.\n\n</details>",
      "**3.** An external audit finds several problems the site's own team had no idea about. What does this mainly suggest?",
      "- A. The external auditor made mistakes\n- B. Nothing; surprises are normal\n- C. The site should stop external audits\n- D. The site's internal audit and reporting culture has weaknesses",
      "<details><summary>Show answer</summary>\n\n**D.** On a well-run site, audit findings are rarely a surprise.\n\n</details>",
      "**Learner reflection 3 of 3**",
      "> Which entry-level HSE role from this lesson interests you most, and why? Name two skills from this course you would talk about in an interview, and one thing you will do this month to move towards that role.",
      "Write your answer in your notes. There is no right or wrong answer, and it isn't marked."
    ]
  },
  "closing": [
    "## Final assessment",
    "This course ends with a final assessment.",
    "- 30 multiple-choice questions covering the whole course.\n- Pass mark: 24 out of 30 (80%).\n- Time limit: 45 minutes. Question order is shuffled.\n- After you submit, you can see the correct answers with explanations.",
    "| Topic | Questions |\n| --- | --- |\n| HSE fundamentals | 3 |\n| Hazards and risk assessment | 5 |\n| HSE law, regulators and standards | 4 |\n| PPE, permits and safe work | 4 |\n| Emergency preparedness, fire and journey safety | 4 |\n| Incident reporting and investigation | 4 |\n| Environmental management and spill response | 3 |\n| Safety culture and auditing | 3 |\n| **Total** | **30** |",
    "Open **Final Assessment** from this day's quizzes when you are ready.",
    "## Course feedback questionnaire",
    "When you finish this lesson, the course shows as completed on your dashboard. Select **Share feedback** on the course card to answer five short questions:",
    "1. Overall, how would you rate this course?\n2. How relevant was the course to the job or career you want?\n3. How confident do you now feel about spotting hazards and working safely on site?\n4. How easy was the course to follow?\n5. What was most useful, and what one thing should we improve?",
    "It takes about two minutes. Your answers help us improve the course."
  ],
  "textEdits": {
    "8.2": [
      {
        "from": "Your capstone project is where you'll now bring every day of this course together into one connected piece of work.",
        "to": "Your final assessment, below, brings every day of this course together."
      }
    ]
  },
  "finalAssessment": [
    {
      "text": "Which of the following best defines a 'hazard'?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "A hazard doesn't need to have hurt anyone yet to be real.",
      "answers": [
        {
          "text": "Anything with the potential to cause harm",
          "isCorrect": true
        },
        {
          "text": "An event that has already caused an injury",
          "isCorrect": false
        },
        {
          "text": "A piece of safety equipment",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "A 'near-miss' is best described as:",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "A near-miss is free information about how the next incident could happen.",
      "answers": [
        {
          "text": "A minor injury that required first aid only",
          "isCorrect": false
        },
        {
          "text": "An incident report that was filed late",
          "isCorrect": false
        },
        {
          "text": "An unplanned event where no injury or damage occurred, but the conditions for one were present",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "A gas leak on an oil and gas site is best understood as:",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "One event can harm people's safety, their health and the environment at the same time.",
      "answers": [
        {
          "text": "An issue only relevant to the maintenance department",
          "isCorrect": false
        },
        {
          "text": "Simultaneously a safety, health, and environmental hazard",
          "isCorrect": true
        },
        {
          "text": "Purely a safety issue, unrelated to health or environment",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which hazard category covers hazards tied to loss of containment of hazardous materials, such as pipe or valve failures?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Loss of containment is what turns routine operations into fires, explosions and toxic releases.",
      "answers": [
        {
          "text": "Process safety hazards",
          "isCorrect": true
        },
        {
          "text": "Occupational health hazards",
          "isCorrect": false
        },
        {
          "text": "Physical hazards",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Why is H2S (hydrogen sulfide) considered especially dangerous?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Smell, the sense you'd rely on, fails at the most dangerous concentrations.",
      "answers": [
        {
          "text": "It is only dangerous when mixed with water",
          "isCorrect": false
        },
        {
          "text": "It has no health effects below fatal concentrations",
          "isCorrect": false
        },
        {
          "text": "At the most dangerous concentrations, it can no longer be detected by smell",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "A risk matrix typically plots which two factors against each other?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Where a hazard lands decides how urgently it is controlled.",
      "answers": [
        {
          "text": "Location and department",
          "isCorrect": false
        },
        {
          "text": "Likelihood and severity",
          "isCorrect": true
        },
        {
          "text": "Cost and duration",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "In the hierarchy of controls, which is considered the MOST effective control measure?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Removing the hazard entirely beats every other control.",
      "answers": [
        {
          "text": "Elimination",
          "isCorrect": true
        },
        {
          "text": "PPE",
          "isCorrect": false
        },
        {
          "text": "Administrative controls",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is 'Stop Work Authority'?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Every worker can stop unsafe work without asking permission first.",
      "answers": [
        {
          "text": "A permit that only supervisors are allowed to issue",
          "isCorrect": false
        },
        {
          "text": "A disciplinary process for workers who miss a shift",
          "isCorrect": false
        },
        {
          "text": "Every worker's right and obligation to immediately halt a task that looks genuinely unsafe, without needing permission first",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is a 'safety case', as required by NUPRC for upstream oil and gas facilities?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "The safety case is a living document, kept up to date as operations change.",
      "answers": [
        {
          "text": "A one-time filing that never needs updating",
          "isCorrect": false
        },
        {
          "text": "A structured document demonstrating that major hazards have been identified, risks assessed, and controls are in place",
          "isCorrect": true
        },
        {
          "text": "A physical case used to store PPE on site",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which body oversees HSE compliance and safety case requirements for upstream exploration, drilling, and production facilities in the country?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "NUPRC regulates exploration, drilling and production.",
      "answers": [
        {
          "text": "NUPRC",
          "isCorrect": true
        },
        {
          "text": "NMDPRA",
          "isCorrect": false
        },
        {
          "text": "NCDMB",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which regulator oversees HSE and technical compliance for a Nigerian refinery, gas processing plant, or LNG facility?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "NMDPRA covers facilities from the wellhead onward: pipelines, refineries, gas plants, LNG and storage.",
      "answers": [
        {
          "text": "NUPRC",
          "isCorrect": false
        },
        {
          "text": "NOSDRA",
          "isCorrect": false
        },
        {
          "text": "NMDPRA",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is ISO 14001 the international standard for?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "ISO 14001 is ISO 45001's environmental counterpart.",
      "answers": [
        {
          "text": "Quality management systems only",
          "isCorrect": false
        },
        {
          "text": "Environmental management systems",
          "isCorrect": true
        },
        {
          "text": "Occupational health and safety management systems",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Where does PPE sit in the hierarchy of controls?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "PPE catches whatever risk remains after the more effective controls.",
      "answers": [
        {
          "text": "The last line of defense",
          "isCorrect": true
        },
        {
          "text": "The first and most effective control",
          "isCorrect": false
        },
        {
          "text": "It is not part of the hierarchy of controls",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is the purpose of gas testing before a hot work or confined space permit is issued?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Oxygen, flammable gas and toxic gas must be within safe limits before work starts.",
      "answers": [
        {
          "text": "To measure how loud the work area is",
          "isCorrect": false
        },
        {
          "text": "To calculate how long the permit should remain valid, regardless of atmospheric conditions",
          "isCorrect": false
        },
        {
          "text": "To confirm that oxygen, flammable gas, and toxic gas levels in the work area are within safe limits before work starts",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What does SIMOPS refer to?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Activities that are safe alone can interact dangerously when done together.",
      "answers": [
        {
          "text": "A single worker performing multiple unrelated tasks in sequence",
          "isCorrect": false
        },
        {
          "text": "Simultaneous Operations -- two or more potentially conflicting activities happening in the same area at the same time",
          "isCorrect": true
        },
        {
          "text": "A type of confined space entry permit only",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What does LOTO stand for?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Equipment is locked in a safe state and tagged to show who locked it and why.",
      "answers": [
        {
          "text": "Lock-Out, Tag-Out",
          "isCorrect": true
        },
        {
          "text": "List of Test Outcomes",
          "isCorrect": false
        },
        {
          "text": "Level of Task Oversight",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is the primary purpose of regular emergency drills?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Drills show whether the plan works in practice, before a real emergency does.",
      "answers": [
        {
          "text": "To fulfill a purely administrative requirement with no practical value",
          "isCorrect": false
        },
        {
          "text": "To replace the need for a written emergency response plan",
          "isCorrect": false
        },
        {
          "text": "To test whether the emergency plan actually works in practice and surface gaps before a real emergency does",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What has historically been the single largest cause of fatalities in oil and gas company operations worldwide?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "That's why journey management is treated as seriously as site safety.",
      "answers": [
        {
          "text": "Falls from height",
          "isCorrect": false
        },
        {
          "text": "Driving-related incidents",
          "isCorrect": true
        },
        {
          "text": "Confined space incidents",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What three elements make up the 'fire triangle'?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Remove any one of fuel, oxygen or heat and the fire can't continue.",
      "answers": [
        {
          "text": "Fuel, oxygen, and heat (ignition source)",
          "isCorrect": true
        },
        {
          "text": "Smoke, water, and pressure",
          "isCorrect": false
        },
        {
          "text": "Gas, electricity, and friction",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which fire class covers flammable liquids, including hydrocarbons?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Class B covers flammable liquids such as hydrocarbons.",
      "answers": [
        {
          "text": "Class A",
          "isCorrect": false
        },
        {
          "text": "Class C",
          "isCorrect": false
        },
        {
          "text": "Class B",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What distinguishes a 'lost-time injury' from a 'first-aid case'?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Lost time means the injured person can't return to work for a period.",
      "answers": [
        {
          "text": "There is no meaningful distinction between the two categories",
          "isCorrect": false
        },
        {
          "text": "A lost-time injury results in the injured person being unable to return to work for a period",
          "isCorrect": true
        },
        {
          "text": "A first-aid case is always more severe than a lost-time injury",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is a 'root cause', as distinct from an 'immediate cause'?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Fixing the root cause stops similar incidents recurring.",
      "answers": [
        {
          "text": "The deeper, underlying condition that allowed the immediate cause to happen and would keep producing similar incidents if unaddressed",
          "isCorrect": true
        },
        {
          "text": "The very first person to witness the incident",
          "isCorrect": false
        },
        {
          "text": "The exact time the incident occurred",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is the '5 Whys' technique?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Each answer leads to the next 'why' until a systemic cause appears.",
      "answers": [
        {
          "text": "A checklist of five mandatory PPE items",
          "isCorrect": false
        },
        {
          "text": "A five-stage permit approval process",
          "isCorrect": false
        },
        {
          "text": "Repeatedly asking 'why did that happen?' to move from a surface event to a systemic root cause",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What should an effective corrective action target?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Actions aimed only at the symptom let the incident happen again.",
      "answers": [
        {
          "text": "The cheapest possible fix regardless of effectiveness",
          "isCorrect": false
        },
        {
          "text": "The identified root cause, not just the immediate symptom",
          "isCorrect": true
        },
        {
          "text": "Only the individual worker directly involved in the incident",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is an Environmental Impact Assessment (EIA)?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "An EIA predicts effects before a project goes ahead and identifies ways to reduce them.",
      "answers": [
        {
          "text": "A formal study predicting the likely environmental and social effects of a proposed project before it proceeds",
          "isCorrect": true
        },
        {
          "text": "A report filed only after an environmental incident has already occurred",
          "isCorrect": false
        },
        {
          "text": "A voluntary document with no legal standing in the country",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is the correct order of the waste management hierarchy described in this day's lesson?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Reduce first, then reuse or recycle, and only then treat and dispose.",
      "answers": [
        {
          "text": "Dispose first, then consider reduction afterward",
          "isCorrect": false
        },
        {
          "text": "There is no preferred order; all options are equivalent",
          "isCorrect": false
        },
        {
          "text": "Reduce, reuse/recycle, then treat and dispose",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is the purpose of 'containing' a spill in the response framework?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Booms and barriers stop the spill spreading further.",
      "answers": [
        {
          "text": "To notify regulators of the incident",
          "isCorrect": false
        },
        {
          "text": "To prevent further spread of the spilled material using booms or barriers",
          "isCorrect": true
        },
        {
          "text": "To permanently seal the source of the leak",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Why can a site have every procedure correctly documented and still have a weak safety culture?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Culture is what people do under real pressure, not what the manual says.",
      "answers": [
        {
          "text": "If workers feel pressured to cut corners, or raising concerns is treated as troublemaking, culture is what people actually do under pressure, not what the manual says",
          "isCorrect": true
        },
        {
          "text": "Documentation automatically guarantees a strong culture regardless of behavior",
          "isCorrect": false
        },
        {
          "text": "Culture has no relationship to documented procedures at all",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What distinguishes a 'proactive' safety culture from a 'reactive' one?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Proactive cultures look for weak signals before they become incidents.",
      "answers": [
        {
          "text": "A proactive culture only responds after a fatality occurs",
          "isCorrect": false
        },
        {
          "text": "There is no meaningful difference between the two",
          "isCorrect": false
        },
        {
          "text": "A proactive culture actively seeks out and addresses weak signals like near-misses before they escalate, rather than only responding after an incident",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is the main difference between an inspection and an audit?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Inspections catch immediate gaps; audits catch systemic ones.",
      "answers": [
        {
          "text": "Audits are always less formal than inspections",
          "isCorrect": false
        },
        {
          "text": "An inspection is a routine check against a checklist; an audit is a broader, structured review of the overall management system",
          "isCorrect": true
        },
        {
          "text": "They are identical terms with no practical distinction",
          "isCorrect": false
        }
      ]
    }
  ]
};
