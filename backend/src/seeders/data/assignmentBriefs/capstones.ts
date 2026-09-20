import { BriefSpec } from "./briefBuilder";

// Capstone briefs for the four live courses, keyed by course slug. Each capstone is one
// connected project, so every brief spells out the structure, deliverables, assessment
// criteria and a worked example of the standard expected.
export const CAPSTONE_SPECS: Record<string, BriefSpec> = {
  "cyber-security-fundamentals": {
    overview:
      "Choose **ONE** of the three sector options below and act as an entry-level cybersecurity analyst engaged to produce a **foundational risk assessment and incident-response plan** for a fictional Nigerian organisation. Every option draws on the same core skills this course built in Weeks 1-12 (threat, vulnerability and risk thinking; authentication; phishing resistance; malware and ransomware response; network security; access control; incident response; and data protection), applied to the systems, threats and regulatory environment of one sector.\n\nThis capstone is **educational and strictly defensive**. Do not include, and you will not be asked to produce, any instructions that could be used to attack a real system. All organisations, incidents and scenarios below are fictional.",
    materials:
      "### Option A: Oil & Gas (Meridian Delta Energy)\n\n**Scenario.** Meridian Delta Energy is a fictional mid-sized Nigerian upstream and midstream operator running a flow station, a gathering pipeline network and a small tank farm. Its control room uses a **SCADA** system to monitor pressure and flow; several maintenance contractors have remote VPN access to it for scheduled diagnostics. The IT team recently connected the SCADA **historian** (a data-logging server) to the corporate network so engineers can view production data from their office laptops, a convenience nobody formally risk-assessed.\n\n**Option A tasks.**\n\n1. Identify at least **six distinct hazards or threats** across IT and OT systems (including at least one specific to SCADA/OT, one specific to contractor remote access and one specific to the new IT/OT connection).\n2. Score each on a **likelihood x impact** matrix and propose one control per risk from the hierarchy of controls.\n3. Write a **200-300 word ransomware scenario** affecting Meridian Delta's IT network and outline prevention, detection, response and recovery, specifically addressing whether and how you would **isolate OT** from a compromised IT network.\n4. Outline a basic **incident-response plan** using the six-phase lifecycle from Week 9, tailored to the facility, including who is notified and in what order.\n5. Note **one relevant international framework** (IEC 62443 or NIST CSF) and explain in 2-3 sentences why it is relevant, without treating it as Nigerian law.\n\n### Option B: Banking & Financial Services (NovaTrust Bank)\n\n**Scenario.** NovaTrust Bank is a fictional Nigerian retail bank with a growing mobile banking app. Customer support recently noticed a spike in complaints about **unauthorised transfers**: in each case the customer reports a call from someone claiming to be \"NovaTrust Fraud Prevention\" shortly before the transfer. Separately, the payment team wants to launch a new **instant-transfer feature** within two months and has asked for a quick security opinion.\n\n**Option B tasks.**\n\n1. Diagnose the **account-takeover pattern**: the likely attack chain, what information or access the attacker needed and how they probably obtained it, referencing Week 2 (Authentication) and Week 5 (Social Engineering).\n2. Recommend at least **four controls** to reduce this fraud pattern, explicitly including MFA and one customer-education measure.\n3. Produce a short **risk assessment** (asset, threat, vulnerability, impact) for the instant-transfer feature, with at least four risks and a control for each.\n4. Reference the **CBN's current risk-based cybersecurity framework** for banks and explain in 2-3 sentences why an entry-level analyst should be aware of it.\n5. Write a one-paragraph **incident-response summary** for handling a confirmed case of this fraud once reported.\n\n### Option C: Telecommunications (Umbra Mobile)\n\n**Scenario.** Umbra Mobile is a fictional Nigerian mobile network operator. Its customer-care team has been targeted by calls from people claiming to be network engineers asking to \"verify\" customer SIM details, a pattern consistent with **attempted SIM-related fraud**. Separately, network operations plan an early **5G rollout** in a major city and want security to flag anything to plan for now.\n\n**Option C tasks.**\n\n1. Design an **internal control** (a procedure, not a technology purchase) that would make customer-care staff much harder to social-engineer, referencing least privilege and identity verification.\n2. Explain how Nigeria's **NIN-SIM linkage** policy and a tool like the NCC's **TIRMS** portal reduce (but do not eliminate) SIM-related fraud, and identify one risk that remains.\n3. Identify at least **four security considerations for the 5G rollout** (from the 5G Security Fundamentals lesson), explaining why each matters at a beginner-appropriate level.\n4. Write a **200-300 word DDoS scenario** affecting customer-facing systems and outline detection and mitigation, without attack-execution detail.\n5. Outline a basic **incident-response plan** for a confirmed customer-data exposure, referencing the **NDPC's role** and Umbra's own notification obligations.",
    tasks: [
      "Choose **one option** (A, B or C) and state clearly at the top which one you chose.",
      "Complete **all five tasks** for your option, using the headings *Task 1* to *Task 5*, so a marker can find each one.",
      "Draw on **specific concepts from Weeks 1-12** and name the concept when you use it (for example \"least privilege\" or \"the containment phase\"). Do not treat the sector pathway as separate from the core.",
      "Include at least **one table**: a risk matrix or risk table as required by your option.",
      "Finish with a **half-page summary for a non-technical manager**: the three most important risks and the three most important actions, in plain language.",
    ],
    deliverables: [
      "A single written report of **1,500-2,500 words** (.docx or .pdf preferred, .txt also accepted), organised under clear headings.",
      "The risk matrix or risk table required by your option.",
      "A one-page manager summary at the end.",
    ],
    criteria: [
      { name: "Risk identification and thinking", points: 25, description: "Hazards, threats and risks are specific to the scenario, not generic, and show real understanding of likelihood versus impact." },
      { name: "Application of core fundamentals", points: 25, description: "Visibly draws on specific Weeks 1-12 concepts (authentication, phishing, malware, network security, access control, incident response, data protection)." },
      { name: "Sector awareness", points: 20, description: "Shows what makes this sector's cybersecurity genuinely different (OT and SCADA for Oil & Gas, payments and fraud for Banking, network availability and SIM identity for Telecom)." },
      { name: "Response and recovery thinking", points: 15, description: "Incident-response and recovery recommendations are concrete, ordered and realistic for an entry-level analyst." },
      { name: "Communication", points: 15, description: "Clearly organised with headings, explains technical terms on first use, and could be understood by a non-technical manager." },
    ],
    example:
      "*Worked example for a **different organisation** (a fictional university, not one of the three sectors). Note the structure, the level of detail and the way core concepts are named. Do not reuse its wording.*\n\n**Chosen scenario.** *Baobab University* (fictional) has 12,000 students. An attacker phished a lecturer's password, logged in to the student records portal, and altered exam grades for a small group of students.\n\n**Task 1 (extract): risk table.**\n\n| Risk | Threat | Vulnerability | L | I | Score | Control |\n|---|---|---|---|---|---|---|\n| Grade tampering | Phished staff credentials | Records portal has password only, no MFA | 4 | 5 | 20 | MFA on all staff accounts (Week 2); alerts on bulk grade changes |\n| Ransomware on the registry file server | Malware via email attachment | Backups on the same network as the server | 3 | 5 | 15 | Offline backups tested quarterly (Week 6) |\n\n**Task 4 (extract): incident-response outline, six phases (Week 9).** *Detection:* the records team notices grade changes with no matching lecturer request. *Containment:* disable the lecturer's account and lock grade editing. *Eradication:* remove any rules or access the attacker created. *Recovery:* restore grades from backup and verify with lecturers. *Lessons learned:* add MFA and grade-change approvals.\n\n**Manager summary (extract).** *\"The biggest risk is that one stolen password could change any student's grades. The three most important actions: turn on MFA for all staff, require a second approver for grade changes, and keep tested backups off the main network.\"*",
    tips: [
      "Choose the option you can reason about best. You do not need to be an expert in the sector, but you must apply the course ideas to *its* systems.",
      "Generic advice (\"use strong passwords\") earns few marks. Tie each recommendation to a specific risk in the scenario.",
      "Explain the 'why' behind every control. A list of controls without reasoning does not show understanding.",
      "Never describe how to actually carry out an attack. This capstone is defensive only.",
      "Leave time for the manager summary. It shows you can communicate risk clearly, a key entry-level skill.",
    ],
  },

  "digital-marketing": {
    overview:
      "This capstone brings the whole course together. You will build a **complete, integrated digital marketing strategy** for one business. \"Integrated\" is the key word: treat it as **one connected story**, not a set of separate assignments. Your buyer personas and channel strategy should justify your channel choices; your SEO and content work should build the awareness that email and paid advertising then convert; and your analytics plan should honestly measure whether the whole strategy is working.\n\nA focused strategy across **three or four well-chosen channels**, planned thoroughly, will show far stronger understanding than a thin attempt to cover every channel.",
    tasks: [
      "**Executive summary (about 150 words).** The business, the goal, and the strategy in a nutshell.",
      "**Situation and audience.** Describe the business, then present **at least two buyer personas** and a short **competitive review** (from Week 2).",
      "**Goals and KPIs.** State one main **SMART goal** and the **KPI** for each channel, taken from your Week 8 scope.",
      "**Integrated channel strategy.** Choose **three or four channels**, explain their **role in the funnel**, how they **feed each other** (for example SEO content builds the email list, email and retargeting convert it) and why other channels are excluded.",
      "**SEO and content plan.** A short keyword list with intent, the on-page changes for one key page, and a **four-week content calendar**.",
      "**Email plan.** An outline of an automated **welcome or nurture sequence** (at least four emails with timing, goals and CTAs) and the **full text of one email**.",
      "**Paid advertising plan.** Campaign type, ad group or audience structure, budget split, and **sample ad copy** (within character limits).",
      "**Analytics and measurement.** The tracking set-up, the **dashboard layout** (leading with your SMART goal), your **attribution approach** and the reporting rhythm. State what result would make you **change the plan**.",
      "**Budget, timeline and risks.** A budget table with assumptions, a phased timeline and three risks with responses.",
    ],
    deliverables: [
      "A strategy report of **2,000-3,000 words** (.docx or .pdf preferred).",
      "Appendices: the four-week content calendar, the full text of one email, sample ad copy, and a dashboard mock-up image.",
      "A **channel integration diagram or table** showing how channels support each other.",
    ],
    criteria: [
      { name: "Strategy, goal and audience", points: 20, description: "A SMART goal, well-developed personas and a competitor review that clearly drive the strategy." },
      { name: "Integration: one connected story", points: 20, description: "Channels visibly feed each other; every choice traces back to the personas and the funnel." },
      { name: "Quality of channel plans", points: 25, description: "Realistic, specific SEO, content, email and paid plans with correct detail (keywords, sequence, ad structure and copy limits)." },
      { name: "Measurement", points: 15, description: "A clear tracking and dashboard plan tied to the goal, with a stated trigger for changing the plan." },
      { name: "Budget, timeline and risks", points: 10, description: "Consistent figures with stated assumptions, a realistic schedule and honest risks." },
      { name: "Communication", points: 10, description: "Professional, well organised and understandable by a business owner." },
    ],
    example:
      "*Worked example (extract) for an invented business, \"Kaduna Fresh Farms\", selling vegetable boxes. Do not reuse its wording.*\n\n**SMART goal.** *Reach 300 weekly box subscribers in Kaduna within 16 weeks on a ₦600,000 budget.*\n\n**The connected story (extract).** *\"Local search and Instagram bring in busy parents who ask, 'Is it really fresh?'. Each blog post and reel ends with a free 'weekly meal-plan' sign-up. That builds our email list (owned, cheap to reach). The welcome series then answers the freshness objection with farm photos and a first-box discount. Paid search runs only on high-intent phrases such as 'vegetable delivery Kaduna' and retargets people who visited the pricing page but did not subscribe. Analytics tracks subscriptions from each source so budget moves toward whichever channel delivers subscribers most cheaply.\"*\n\n| Channel | Role | Feeds | Budget % |\n|---|---|---|---|\n| SEO and Google Business profile | Awareness | Email list | 20% |\n| Instagram | Consideration | Email list, paid retargeting | 20% |\n| Email | Conversion and retention | Subscriptions, referrals | 20% |\n| Google Search ads | Conversion | Subscriptions | 40% |\n\n**Plan-changing trigger.** *If the cost per subscriber from paid search exceeds ₦2,500 for two consecutive weeks, shift a quarter of its budget to email referral offers.*",
    tips: [
      "Do not write nine separate mini-reports. Show how each part supports the next.",
      "Everything must trace back to your personas and your goal. If it does not, remove it.",
      "Use real numbers and state assumptions. A budget with no working cannot be checked.",
      "Keep to three or four channels. Depth beats breadth.",
    ],
  },

  "gis-and-drone-mapping": {
    overview:
      "This capstone brings the course together in **one connected project**: supporting **sustainable agriculture zone planning** in a Nigerian State. Your data collection choices should directly support your remote sensing and drone analysis, which feeds your spatial analysis, all clearly communicated through thematic mapping and a stakeholder-focused report.\n\nScope it realistically. A focused, well-executed analysis of **one specific area or resource constraint** (for example water access or soil suitability) will serve you and any real stakeholder far better than a thin attempt to cover everything.",
    tasks: [
      "**Define the project.** Choose one **study area** (about 5-30 km across) in a Nigerian State and one **planning question** (for example *\"Which zones are best suited to expanding cassava farming with the water and road access available?\"*). Name the **stakeholders** (for example a State ministry of agriculture, cooperative or NGO).",
      "**Data collection plan.** Use your Week 3 approach: layers needed, sources, accuracy needs, licences and validation steps.",
      "**Remote sensing analysis.** Use satellite imagery to calculate at least one **spectral index** (for example NDVI) and, if useful, a **change detection** between two dates (Week 4). State limitations.",
      "**Drone survey component.** Either **(a)** plan and fly a small survey yourself, following the regulations in Week 5, or **(b)** if you cannot fly, use **open drone imagery** (for example from OpenAerialMap) for your area, *or* write a **complete drone survey specification** (Week 6) for the field you would survey. Say clearly which you did. Include the GSD and flight-height calculation.",
      "**Spatial analysis.** Carry out a **suitability or constraint analysis** using at least **three layers** (for example slope, soil, rainfall, distance to water and distance to roads) and at least two techniques (for example buffering, overlay, reclassification and weighted overlay). Document the settings and your reasoning for any weights.",
      "**Thematic maps.** Produce **at least five well-designed maps** (Week 7) that build the story from inputs to final suitability zones.",
      "**Recommendations and stakeholder report.** Write clear, practical **recommendations** for the stakeholders, with limitations and next steps.",
      "**Project plan.** Include the timeline and resource plan (Week 8) for carrying out the recommended follow-up work.",
    ],
    deliverables: [
      "A report of **2,500-3,500 words** (.docx or .pdf preferred) that follows the eight parts above.",
      "The **five or more maps** as images inside the report, with the source of every dataset.",
      "A short **appendix** with your calculations (GSD and flight height, area figures) and any key settings.",
    ],
    criteria: [
      { name: "Project definition and data plan", points: 15, description: "A focused question, real stakeholders and a sound data collection plan." },
      { name: "Remote sensing and drone work", points: 25, description: "Correct index or change analysis, a completed drone component or a complete specification with correct calculations, and honest limitations." },
      { name: "Spatial analysis", points: 25, description: "Appropriate layers and techniques, documented settings and justified weights leading to a sensible result." },
      { name: "Thematic mapping", points: 15, description: "At least five clear maps that follow good design and tell a connected story." },
      { name: "Recommendations and communication", points: 15, description: "Practical, evidence-based recommendations in stakeholder-friendly language." },
      { name: "Project plan", points: 5, description: "A realistic timeline and resource estimate." },
    ],
    example:
      "*Worked example (extract) for a different project: flood-risk zones around a small town. Do not reuse its wording.*\n\n**Question.** *Which neighbourhoods of an invented town, Riverside, should the local council prioritise for drainage upgrades?*\n\n**Suitability method (extract).** Layers: elevation (low ground floods first), distance to the river, land cover (built-up areas hold more people) and known flood points. Each was **reclassified to a 1-5 score**, then combined with weights I chose and explained: elevation 40%, distance to river 30%, land cover 20%, flood points 10%. *Reason for weights:* the council's own records show most past floods came from low ground next to the river.\n\n**Map series (extract).** Map 1: elevation. Map 2: distance-to-river buffer. Map 3: land cover. Map 4: combined risk score. Map 5: top-five priority neighbourhoods with population.\n\n**Recommendation (extract).** *\"Upgrade drainage first in neighbourhoods A and C, where the risk score is highest and about 6,000 people live. This is based on two dates of imagery and a coarse elevation model, so before spending, the council should confirm with a ground survey.\"*",
    tips: [
      "Do not try to cover every resource in the State. Pick one question and answer it well.",
      "Weights need reasons. \"I gave slope 30%\" with no explanation is a guess.",
      "Say honestly what you did for the drone component. Do not claim a flight you did not fly.",
      "Write your recommendations for a stakeholder who is not a GIS specialist.",
    ],
  },

  "hse-fundamentals": {
    overview:
      "Act as the **HSE lead** for a chosen Nigerian oil and gas facility and produce a **complete HSE management plan**. Choose one facility: a **flow station**, a **drilling rig**, a **pipeline right-of-way segment**, or a **midstream/downstream facility** such as a products terminal or gas plant. State up front **which regulator has primary oversight** of your facility (NUPRC for upstream, NMDPRA for midstream and downstream, as Week 3 covers) and let that shape your plan.\n\nTreat this as **one connected story, not five separate assignments**: your risk assessment should directly justify which activities need permits and which emergency scenarios you plan for, and your environmental plan should reflect the specific hazards your own risk assessment identified. A focused, well-reasoned plan for **one** facility will demonstrate far more than a thin attempt to cover every possible scenario.",
    tasks: [
      "**Facility and regulator.** Describe the facility (fictional), its location, the number of workers and contractors, and the regulator with primary oversight, with a sentence on why.",
      "**Hazard identification and risk assessment.** At least **six distinct hazards** across at least **three hazard categories** from Week 2, including at least **one occupational health hazard** and, if the facility involves any road transport, **at least one transport-related hazard**. Score them, apply the hierarchy of controls and show residual risk.",
      "**Permit-to-work framework.** For the facility's **highest-risk activities**, name **which permit types apply** (for example hot work, confined space entry, work at height) and the **contractor-specific checks** you would require before issuing them: induction, competence and supervision. Link each permit to a hazard in your risk assessment.",
      "**Emergency response plan.** At least **two credible scenarios** taken from your risk assessment, with roles, alarm method and **personnel accounting**. If relevant to your facility, include **journey management** considerations.",
      "**Incident classification and reporting.** The classification scheme, who is notified **internally** and **which regulator** is notified for a serious event, and timing.",
      "**Environmental protection and spill response.** A plan appropriate to the facility's location using the **7-step framework** from Week 7, reflecting the specific hazards you identified.",
      "**Audit and review.** A short section on how you would audit the plan (linking to your Week 8 checklist) and keep it up to date.",
    ],
    deliverables: [
      "A management plan of **2,500-3,500 words** (.docx or .pdf preferred), with a heading for each of the seven parts.",
      "A **risk assessment table**, a **permit types table**, and a **spill response table**.",
      "A one-page **summary** showing how the parts connect (for example which hazard drives which permit and which emergency scenario).",
    ],
    criteria: [
      { name: "Facility, regulator and hazard assessment", points: 25, description: "Correct regulator and at least six distinct hazards across three categories, well scored with the hierarchy of controls." },
      { name: "Permit-to-work framework", points: 15, description: "Correct permit types tied to hazards, with specific contractor checks." },
      { name: "Emergency response and journey management", points: 20, description: "Credible scenarios from the risk assessment, clear roles and a workable personnel-accounting method." },
      { name: "Incident classification and reporting", points: 10, description: "A correct scheme with the right internal and regulator notifications." },
      { name: "Environmental and spill response", points: 15, description: "A complete seven-step response suited to the location and the hazards identified." },
      { name: "Integration and communication", points: 15, description: "The parts clearly support each other; the plan is well organised and professional." },
    ],
    example:
      "*Worked example (extract) for a **different facility**: a fictional aviation fuel depot at an airport. Do not reuse its wording.*\n\n**Regulator.** Downstream storage of aviation fuel falls under the midstream/downstream regulator (NMDPRA), so the plan follows its licensing and reporting requirements. The environmental regulator is also relevant for spills.\n\n**Connected story (extract).** *\"Risk assessment identified fuel vapour ignition during tanker unloading as the highest risk (score 15). That is why unloading requires a hot work-style permit check for ignition sources, why the first emergency scenario is a fire at the unloading bay, and why the spill plan places absorbent booms next to the drain that leads to the airport channel.\"*\n\n| Hazard | Category | Score | Permit needed | Emergency scenario | Spill plan link |\n|---|---|---|---|---|---|\n| Fuel vapour ignition at unloading | Physical (fire) | 15 High | Unloading permit; hot work permit for any welding | Fire at unloading bay | Drain protection at the bay |\n| Driver fatigue on delivery trips | Transport | 12 High | Journey management plan | Vehicle collision with a fuel truck | Tanker spill on the access road |",
    tips: [
      "Do not write five unrelated sections. Show, in words and in the summary page, which hazard leads to which permit and which emergency scenario.",
      "State the regulator first. It shapes everything that follows.",
      "Contractors are involved in many serious incidents. Make sure your permit and induction rules cover them.",
      "One well-reasoned facility beats a shallow attempt to cover everything.",
    ],
  },
};
