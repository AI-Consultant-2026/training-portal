import { BriefSpec } from "./briefBuilder";

// Cyber Security Fundamentals, Weeks 13-18 (Oil & Gas, Banking, Telecommunications
// pathways). Keyed by module week_number. All organisations are fictional.
export const CYBER_WEEKS_13_TO_18: Record<number, BriefSpec> = {
  13: {
    overview:
      "In an office, the worst outcome of a cyber attack is usually lost or stolen data. On an oil and gas facility, a compromised control system can cause a fire, a spill or an injury. That is why **operational technology (OT)** is secured differently from ordinary IT. You will map the systems of a fictional facility and show that you understand what is different about protecting them.",
    tasks: [
      "Choose **one fictional Nigerian oil and gas facility** (for example an onshore flow station, an offshore platform, a gas processing plant or a products terminal) and describe it in 2-3 sentences.",
      "List its **IT systems** (for example email, finance, HR and staff laptops) and its **OT systems** (for example SCADA, programmable logic controllers (PLCs), pressure and flow sensors, safety shutdown systems) in **two separate lists**, with one line saying what each does.",
      "Identify **at least three risks specific to the OT environment** (not generic IT risks). For each, name the threat, the weakness, and what the *physical or operational* consequence could be.",
      "For **at least one** of those risks, explain **in your own words** why the usual priority order for **Confidentiality, Integrity and Availability** changes in OT, as this week's first lesson described, and why *safety* sits above all three.",
      "Draw or describe a **simple map** showing where the IT network ends and the OT network begins, and mark **one point where they connect** (for example a data historian) and how that connection should be controlled.",
    ],
    deliverables: [
      "A document (.docx or .pdf preferred, .txt also accepted) of **600-900 words**.",
      "Include a two-column system table (IT and OT) and a risk table with columns *Risk | Weakness | Physical or operational consequence | Control*.",
      "Include the simple IT/OT map (a labelled diagram or clear text diagram).",
    ],
    criteria: [
      { name: "IT and OT separation", points: 20, description: "Systems are correctly assigned to IT or OT, with correct one-line purposes." },
      { name: "OT-specific risks", points: 30, description: "At least three risks that genuinely belong to OT, with realistic physical consequences." },
      { name: "CIA priority reasoning", points: 25, description: "Clear, accurate explanation in the candidate's own words of why availability and safety come first in OT." },
      { name: "IT/OT connection and map", points: 15, description: "Shows a realistic connection point and how it is controlled." },
      { name: "Clarity", points: 10, description: "Tables and map are easy to follow." },
    ],
    example:
      "*Worked example (partial) for a different kind of site, a fictional water treatment plant. Do not reuse its wording.*\n\n**Lagoon Water Works.** IT: billing system, staff email, customer call centre. OT: PLCs that dose chlorine, pumps and valves, pressure sensors, and the SCADA screen in the control room.\n\n| Risk | Weakness | Operational consequence | Control |\n|---|---|---|---|\n| Unauthorised change to chlorine dosing set-point | Engineering laptop plugged into the OT network with no antivirus | Unsafe drinking water reaching customers | Only approved, scanned laptops allowed; changes require a second person to confirm |\n| Old PLC with no password | Vendor default settings never changed | Anyone on the network could stop the pumps | Segment the PLC network; set strong credentials; monitor for changes |\n\n**Why CIA changes.** In the billing system, keeping customer data *confidential* comes first. In the treatment plant, *availability* and *integrity* of the control system come first: if the pumps stop or a dose is changed, people are harmed, so safety outranks everything else. A patch that reboots a PLC in the middle of treatment is a bigger risk than the vulnerability it fixes.",
    tips: [
      "Do not describe risks like \"phishing emails\". They exist in OT organisations too, but this task asks for risks **specific to OT**.",
      "Always finish a risk with its *physical* consequence: fire, spill, shutdown, injury.",
      "Explain the CIA shift in your own words. Copying the lesson wording will not earn the marks.",
    ],
  },

  14: {
    overview:
      "When ransomware hits a facility where IT and OT are connected, the hardest decisions are about what to shut down and when it is safe to turn things back on. You will write a short incident response outline for a converged IT/OT facility, in the role of the entry-level analyst supporting the incident lead.",
    materials:
      "**Scenario (fictional facility: Meridian Delta Energy flow station).** At 02:10 the night IT officer sees that the corporate file server and several engineer laptops display ransom notes. The **data historian** (which records production data and is connected to both the corporate and control networks) has stopped responding. Control-room screens still show live pressure and flow readings. Log records show that a **maintenance contractor's remote-access account** logged in at 01:40 from an unusual location. Night operators are on site. The incident lead is at home.\n\nYou may use this scenario or choose a similar fictional facility of your own.",
    tasks: [
      "List the **immediate containment steps** in order for the first hour, saying who does each one. Include your decision on **whether and how to isolate OT from the compromised IT network**, and *why*.",
      "Say **who must be notified internally, in what order, and why** (for example incident lead, operations manager, HSE, executive management, legal).",
      "List **what must be verified before any OT system is reconnected** to the network, and who signs it off.",
      "Recommend **one specific segmentation or access-control improvement** that would reduce the chance of a repeat incident (for example a controlled gateway between IT and OT, or restricting and monitoring contractor access) and explain what it prevents.",
      "State one thing you would deliberately **not** do in the first hour, and why.",
    ],
    deliverables: [
      "A written outline of **500-800 words** (typed answer, .docx, .pdf or .txt).",
      "Use numbered lists for the steps and a small table for the notification order (*Order | Who | Why*).",
    ],
    criteria: [
      { name: "Containment steps", points: 30, description: "Ordered, realistic actions with owners, including a reasoned IT/OT isolation decision that puts safe operation first." },
      { name: "Notification order", points: 20, description: "Correct, logical order with a reason for each person." },
      { name: "Verification before reconnection", points: 25, description: "A sensible checklist and a named sign-off, showing understanding that OT must not be reconnected casually." },
      { name: "Improvement recommendation", points: 15, description: "Specific, realistic and clearly linked to the cause of this incident." },
      { name: "Clarity", points: 10, description: "Concise and usable under pressure." },
    ],
    example:
      "*Worked example (extract) for a different scenario: malware on the engineering workstation at a products terminal. Do not reuse its wording.*\n\n**Containment (first hour).**\n\n1. The night shift supervisor is told and confirms that the terminal is running safely on its own controls. *(Safety first: confirm operations are stable before touching the network.)*\n2. The IT officer disconnects the engineering workstation from the network. It is *not* powered off, to preserve evidence.\n3. The IT officer closes the single gateway between the IT and OT networks. The OT network keeps running locally, because its safety systems do not depend on the corporate network.\n\n**Verification before reconnecting OT (extract).** The engineering workstation is rebuilt from a known-good image and scanned. The controller programs are compared with a trusted backup to confirm nothing was changed. The operations manager signs off before the gateway is reopened.\n\n**What I would not do.** Restart the controllers to \"clear\" the problem. That could trip the process or wipe evidence.",
    tips: [
      "Do not automatically say \"shut everything down\". In OT, an unplanned shutdown can itself be dangerous. Explain your reasoning about safe operation.",
      "\"Reconnect when the IT team says so\" is not enough. OT reconnection needs operations sign-off.",
      "Contractors' remote access is a common entry point. Say what you would do about it.",
    ],
  },

  15: {
    overview:
      "Account takeover fraud follows a pattern: the attacker gets the customer's credentials, gets past the second factor, then moves the money quickly. As a junior analyst at a fictional bank, **NovaTrust Bank**, you have been asked to write up a fraud case by working out *which stage happened first*, what evidence proves it and how it could have been prevented.",
    materials:
      "**Customer report.** A NovaTrust customer says ₦450,000 left their account overnight to a person they do not know, shortly after they tapped a link in an SMS that appeared to come from the bank.\n\n**Timeline from the bank's records (all times that night).**\n\n| Time | Event |\n|---|---|\n| 22:41 | SMS with a link delivered to the customer's phone (sender name looks like the bank's) |\n| 22:44 | Customer opens the link and enters their username and password on a page that looks like the bank's |\n| 22:46 | Successful login to the mobile app from a **new device** and an unfamiliar location |\n| 22:47 | Password reset requested; one-time passcode (OTP) sent to the customer's phone |\n| 22:49 | Customer receives a call from \"NovaTrust security\" asking them to read out the code (the customer complies) |\n| 22:50 | A **new beneficiary** is added to the account |\n| 22:52 | Transfer of ₦450,000 to that new beneficiary |\n| 22:55 | The receiving account withdraws the money at several ATMs |",
    tasks: [
      "Identify **which stage of the account-takeover pattern occurred first** and explain how you can tell from the timeline.",
      "Write, in order, the **stages of the attack** from the timeline in your own words (for example credential capture, access, defeating the second factor, setting up the recipient, moving the money).",
      "List **the evidence you would ask the fraud team to check** (at least four items, for example the SMS delivery records, login device and location history, OTP delivery and usage records, the age and history of the receiving account) and say what each would prove.",
      "Recommend **two specific controls**: one **customer-facing** and one **bank-side**, that could have prevented or caught this earlier, and explain how each would have interrupted a specific stage.",
    ],
    deliverables: [
      "An incident report of **300-500 words** (typed answer, .docx, .pdf or .txt).",
      "Use these headings: *Summary*, *Attack stages*, *Evidence requested*, *Recommended controls*.",
    ],
    criteria: [
      { name: "First stage and attack chain", points: 30, description: "Correctly identifies credential capture as the first stage and orders the remaining stages accurately." },
      { name: "Evidence requested", points: 25, description: "At least four relevant items, each with what it would prove." },
      { name: "Controls", points: 30, description: "One customer-facing and one bank-side control, each tied to a specific stage it would break." },
      { name: "Clarity", points: 15, description: "Concise, structured under the four headings and suitable for a fraud manager to read." },
    ],
    example:
      "*Worked example (extract) for a different case: a customer's SIM was swapped and their account drained. Do not reuse its wording.*\n\n**Summary.** A customer lost mobile signal at 14:05, and at 14:30 ₦300,000 was transferred out of their account.\n\n**Attack stages.** (1) The attacker gathered the customer's personal details. (2) They persuaded a network agent to issue a new SIM. (3) They used the new SIM to receive the bank's OTP codes and log in. (4) They moved the money.\n\n**Evidence requested.**\n\n- The SIM-swap request record and the agent's ID checks, to show how the swap was authorised.\n- Bank login history for the device and location used, to show the login did not come from the customer's usual device.\n- OTP delivery logs, to show the codes went to the new SIM.\n\n**Controls.** *Customer-facing:* an alert to the customer's email whenever a SIM swap is detected. *Bank-side:* a cooling-off period that blocks large transfers for a set time after a SIM swap.",
    tips: [
      "Use the timestamps. Marks are lost for a chain of events that does not match the timeline.",
      "The first stage is not the transfer. Work back to the moment the attacker obtained information.",
      "Controls must be specific and tied to a stage, not \"more customer awareness\" on its own.",
    ],
  },

  16: {
    overview:
      "Convenience and security often pull in opposite directions. A bank wants support staff to solve customer problems faster, but a dashboard that shows *everything* about a customer is also a very attractive target. You will assess the risks and explain the most serious one to a non-technical manager.",
    materials:
      "**Scenario.** A fictional Nigerian digital bank, *Halcyon Digital Bank*, is building a customer support dashboard. It lets any support agent search for a customer and see their **full transaction history, phone number, address, BVN-linked details and account balance** on one screen. The head of customer service wants it launched in three weeks to reduce complaint times.",
    tasks: [
      "Identify **at least four distinct risks** the dashboard creates. Draw on earlier weeks: access control, data protection, insider risk, social engineering and monitoring.",
      "For **each risk**, propose **one specific control** (for example role-based access so agents only see what they need, masking of sensitive fields, logging and review of every lookup, or approval for high-risk views).",
      "Present the risks and controls in a table: *Risk | Why it matters | Control*.",
      "Choose the **single most serious risk** and write a short paragraph of **100-150 words** explaining it to a **non-technical bank manager** who is eager to launch quickly. Explain the danger in plain language and propose a way to launch safely rather than just saying \"no\".",
    ],
    deliverables: [
      "A document (.docx, .pdf or .txt) of **450-700 words** including the risk table and the manager paragraph.",
      "Label the manager paragraph clearly so it can be assessed separately.",
    ],
    criteria: [
      { name: "Risk identification", points: 30, description: "At least four distinct, realistic risks, not four wordings of the same one." },
      { name: "Controls", points: 30, description: "Each control is specific, workable and clearly addresses its risk." },
      { name: "Use of course concepts", points: 15, description: "Draws on access control, data protection, insider risk and social engineering." },
      { name: "Manager paragraph", points: 15, description: "Plain language, honest about the danger, and offers a practical way to proceed." },
      { name: "Clarity", points: 10, description: "Well organised and concise." },
    ],
    example:
      "*Worked example for a different feature: a loan-officer app that shows customers' credit histories. Do not reuse its wording.*\n\n| Risk | Why it matters | Control |\n|---|---|---|\n| Any loan officer can view any customer's credit history | Curious or bribed staff could leak the data of a celebrity, a rival or an ex-partner | Officers see only customers assigned to them; every view is logged and reviewed weekly |\n| Credit reports can be exported | A single export could leak thousands of records | Disable bulk export; require manager approval for any download |\n\n**Manager paragraph (extract).** *\"The app is useful, but as designed every officer can open every customer's file. If one officer sells or leaks even a handful of records, we may have to report a breach to the regulator and customers will lose trust. I recommend we launch on time with two simple limits: officers only see their own customers, and every lookup is recorded. That adds two days of work, not two months.\"*",
    tips: [
      "Do not list four versions of \"hackers might steal data\". Think about insiders, mistakes, over-broad access and monitoring.",
      "In the manager paragraph, avoid jargon such as \"RBAC\". Say what it means in plain language.",
      "A good answer does not just say \"do not launch\". It shows how to launch more safely.",
    ],
  },

  17: {
    overview:
      "A telecom network is critical national infrastructure: millions of people depend on it for calls, banking and emergency services, and it holds sensitive data about all of them. You will map the main security risks of a fictional operator and propose controls for each.",
    tasks: [
      "Describe a **fictional Nigerian telecom operator** in 2-3 sentences. Do **not** use the name of any real operator or describe any real incident.",
      "Identify **at least five distinct security risks** that together span **at least two** of these areas: **core network access**, **SIM and identity fraud**, **customer data** and **physical fibre infrastructure**.",
      "For **each** risk, explain the threat, what could go wrong for customers or the operator, and propose **one specific control or safeguard**.",
      "For **at least one control**, explain how **least-privilege access control** (from earlier in the course) applies to it.",
      "Rank your risks from highest to lowest priority and justify the top one in 2-3 sentences.",
    ],
    deliverables: [
      "A document (.docx, .pdf or .txt) of **500-800 words**.",
      "Include a table *Area | Risk | What could go wrong | Control*.",
    ],
    criteria: [
      { name: "Risk coverage", points: 25, description: "At least five distinct risks across at least two of the four areas, all specific to telecom." },
      { name: "Controls", points: 30, description: "Each control is specific, realistic and matched to its risk." },
      { name: "Least privilege application", points: 15, description: "Correctly applies least-privilege thinking to at least one control." },
      { name: "Prioritisation", points: 15, description: "Sensible ranking with a reasoned top risk." },
      { name: "Clarity and fictional discipline", points: 15, description: "Well organised; no real operators or real incidents named." },
    ],
    example:
      "*Worked example (two rows) for a fictional operator, Harmattan Telecom. Do not reuse its wording.*\n\n| Area | Risk | What could go wrong | Control |\n|---|---|---|---|\n| Core network access | An engineer's admin account is shared by a whole shift | Nobody can be held accountable, and one leaked password exposes the core | Individual named accounts with MFA; admin rights granted only for the task and time needed (least privilege) |\n| Physical infrastructure | Cabinets at street-side fibre nodes are secured by a single padlock | Vandalism or deliberate cuts can cut service to a whole district | Tamper alarms on cabinets, CCTV at high-value nodes, and route diversity so one cut does not isolate an area |\n\n**Top risk.** The shared admin account, because it sits in the core network, which affects every customer, and it is cheap and fast to fix.",
    tips: [
      "Keep to **at least two areas** as the task asks. Five variants of one risk will not score well.",
      "Do not name a real telecom company or refer to a real breach. Use fictional details only.",
      "\"Better security\" is not a control. Name the exact safeguard.",
    ],
  },

  18: {
    overview:
      "Telecom incidents move fast and affect many people at once, and some must be reported to regulators within strict times. You will pick one of three incident scenarios and write an incident response outline as an analyst at a fictional operator, **Umbra Mobile**. Use fictional details only: do not name or imply any real Nigerian operator.",
    materials:
      "**Choose ONE of these three scenarios.**\n\n**Scenario 1: DDoS traffic spike.** At 19:20 Umbra Mobile's customer app and website slow to a crawl. Monitoring shows traffic to the login servers is 40 times normal from thousands of different addresses. Customers cannot top up or check balances.\n\n**Scenario 2: Subscriber billing data exposure.** A security researcher emails Umbra to say a **billing database backup file** containing names, phone numbers and monthly spend for about 60,000 subscribers is downloadable from a public web address. The file was uploaded by mistake during a migration.\n\n**Scenario 3: Insider unauthorised configuration change.** At 03:30 a network engineer's account changes the routing settings on a regional switch, redirecting a large share of voice traffic and causing call failures across two states. The engineer says he did not make the change. His account was used from a home connection.",
    tasks: [
      "State **which scenario you chose** and what you think is happening in one or two sentences.",
      "Describe **detection**: what evidence or alerts tell the team this is real, and how it is confirmed.",
      "List **containment steps in order**, stating who does each one.",
      "Say **who must be notified and within what timeframe**. Refer to the **CRF-NCS reporting requirement** where relevant to your scenario. If personal data is involved, include the **72-hour** notification duty to the data protection regulator. Also say who tells customers, if anyone.",
      "Recommend **one preventive control** that would reduce the chance of the same incident recurring, and explain how.",
    ],
    deliverables: [
      "An incident response outline of **500-800 words** (typed answer, .docx, .pdf or .txt).",
      "Use headings *Detection*, *Containment*, *Notification and timing*, *Prevention*.",
    ],
    criteria: [
      { name: "Detection and understanding", points: 20, description: "Correctly interprets the scenario and explains how it would be confirmed." },
      { name: "Containment", points: 30, description: "Ordered, specific actions with owners that fit the chosen scenario." },
      { name: "Notification and timeframes", points: 25, description: "Right recipients and time limits, including the regulator and customers where relevant." },
      { name: "Prevention", points: 15, description: "A specific control that would genuinely reduce recurrence." },
      { name: "Clarity", points: 10, description: "Structured under the headings and realistic for an analyst to propose." },
    ],
    example:
      "*Worked example (extract) for a different scenario: a surge of SIM-swap fraud at Umbra Mobile. Do not reuse its wording.*\n\n**Detection.** The fraud team notices that SIM-swap requests have tripled in two hours, many from the same three retail agents. Customer-care confirms several customers report sudden loss of signal.\n\n**Containment.**\n\n1. The fraud lead suspends SIM-swap processing for the three agents (owner: fraud lead).\n2. Any swap in the last 24 hours is flagged for a call-back check to the customer's other contact number (owner: customer-care manager).\n3. Banks that use Umbra numbers for OTPs are alerted so they can block large transfers on affected numbers (owner: partner-liaison manager).\n\n**Notification.** The regulator is informed within the timeframe required by the applicable reporting framework; if any customer personal data was exposed, the data protection regulator is told within 72 hours of becoming aware.\n\n**Prevention.** Require a second approver for any SIM swap, and a 24-hour cooling-off period before large mobile-money transfers can follow a swap.",
    tips: [
      "Pick **one** scenario and apply it in depth. Do not mix all three.",
      "Reporting is part of the response, not an afterthought. Show who is told, when, and by whom.",
      "Never name or imply a real operator or a real breach. All details must be fictional.",
      "Prevention must address the *cause*, not just the symptom you saw.",
    ],
  },
};
