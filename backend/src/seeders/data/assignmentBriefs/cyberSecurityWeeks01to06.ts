import { BriefSpec } from "./briefBuilder";

// Cyber Security Fundamentals, Weeks 1-6. Keyed by module week_number.
export const CYBER_WEEKS_1_TO_6: Record<number, BriefSpec> = {
  1: {
    overview:
      "Every serious breach starts with a way in. In this assignment you act as a junior analyst writing a short briefing for a manager who asks: *\"How do these attacks actually happen, and who is behind them?\"* You will research three real, publicly reported data breaches and break each one down using the vocabulary from this week's lessons: **attack vector**, **vulnerability** and **threat actor**.",
    tasks: [
      "Choose **three** real data breaches from any sector or country. Use reputable sources (news outlets, official regulator statements, the company's own incident notice, or a well-known security research write-up). Choose three *different* kinds of incident if you can, for example one involving stolen credentials, one involving unpatched software, and one involving a third party.",
      "For each breach, write 3-4 sentences describing **what happened**: who was affected, roughly what was taken, and when it became public.",
      "For each breach, name the **attack vector** (the route the attacker used to get in, for example a phishing email, a stolen password, an exposed remote-access service, or a compromised supplier).",
      "For each breach, name the **vulnerability** that made that route work (the weakness, for example an unpatched server, no multi-factor authentication, or flat internal network with no segmentation) and explain in one or two sentences *why* it mattered.",
      "For each breach, decide which **type of threat actor** was most likely responsible (for example organised criminal group, hacktivist, insider, or state-linked group) and give the evidence for your choice. If the source does not say, explain what you infer and why.",
      "For each breach, name **one control** that would most likely have stopped or limited it, and say which lesson idea it comes from.",
      "Finish with a comparison paragraph of 100-150 words: what do your three breaches have in common, and what is the single most valuable lesson for an organisation like a Nigerian bank, telecom operator or oil and gas company?",
    ],
    deliverables: [
      "One written report of **900-1,300 words** as a .docx, .pdf or .txt file.",
      "Use a heading for each breach and a small summary table at the top with four columns: *Breach | Attack vector | Vulnerability | Threat actor*.",
      "A short **sources** list at the end (publication or organisation, title, date, and web address for every source you used).",
    ],
    criteria: [
      { name: "Research accuracy", points: 25, description: "Three genuine, correctly described breaches with credible, listed sources; no invented details." },
      { name: "Attack vector and vulnerability", points: 30, description: "Each vector and vulnerability is correctly identified and clearly separated (the route vs the weakness that made it work)." },
      { name: "Threat actor reasoning", points: 15, description: "Actor type is justified with evidence from the sources, or the uncertainty is honestly explained." },
      { name: "Controls and lessons learned", points: 20, description: "Controls are specific, realistic and linked to course ideas; the comparison paragraph draws a genuine, useful conclusion." },
      { name: "Clarity and presentation", points: 10, description: "Clear headings, summary table, plain language, and a complete sources list." },
    ],
    example:
      "*This is one breach written up at the standard expected. Do not use this breach in your own answer.*\n\n**Breach: Target (United States retailer), 2013.**\n\n**What happened.** Attackers stole payment card data for roughly 40 million customers by installing malicious software on Target's point-of-sale (checkout) systems during the busy holiday period. It became public in December 2013 after security journalists and the retailer confirmed it.\n\n**Attack vector.** The attackers first stole network login credentials belonging to one of Target's suppliers, a heating and air-conditioning contractor, and used them to enter Target's network.\n\n**Vulnerability.** Two weaknesses combined. A third-party account had far more network reach than a heating contractor needed, and Target's internal network did not separate supplier access from the payment systems, so the attackers could move from one to the other. This is a failure of *segmentation* and *least privilege*.\n\n**Threat actor.** Most likely a financially motivated criminal group. The evidence is the target (payment cards, which can be sold), the timing (peak shopping season), and the fact that no political message or data leak accompanied the attack.\n\n**Control.** Strict network segmentation, so a supplier account could only ever reach the one system it needed (Week 3), plus least-privilege access and monitoring of third-party accounts (Week 8).\n\n| Breach | Attack vector | Vulnerability | Threat actor |\n|---|---|---|---|\n| Target, 2013 | Stolen supplier credentials | Excess supplier access; no segmentation | Organised criminal group |",
    tips: [
      "Do not confuse the *attack vector* (how they got in) with the *vulnerability* (why it worked). Write them as two separate points.",
      "Do not just copy a news headline. The marks are for your explanation in your own words.",
      "Avoid vague controls like \"better security\". Name the specific control, for example \"multi-factor authentication on the remote-access portal\".",
      "If a source does not say who did it, say so and give your reasoned guess. Never present a guess as fact.",
    ],
  },

  2: {
    overview:
      "Most account takeovers begin with a weak or stolen password. You have been asked to write a short authentication-hardening recommendation for a fictional Nigerian organisation. Your reader is its IT manager, who needs clear, practical decisions, not a lecture.",
    tasks: [
      "Choose a fictional Nigerian organisation from **banking, telecom or oil and gas** and describe it in 2-3 sentences (what it does, roughly how many staff, and which staff handle the most sensitive systems).",
      "Write a **password policy** of 5-7 concrete rules (for example minimum length, whether you allow long passphrases, blocking known-breached passwords, lockout after repeated failures, and whether you force regular changes). For every rule, add one sentence explaining *why*.",
      "Write a **multi-factor authentication (MFA) rollout plan**: which accounts get MFA first and why, which MFA methods you would allow (authenticator app, hardware key, SMS code) and which you would prefer, and how staff will recover access if they lose their device.",
      "Recommend **one identity-verification control specific to your sector** (for example a call-back procedure before changing a customer's account details, a waiting period plus in-person check before a SIM swap, or badge plus PIN for the control room). Explain what attack it stops.",
      "Explain in 3-4 sentences how your recommendations reduce the risk of **credential theft and account takeover**, using ideas from this week's lessons.",
    ],
    deliverables: [
      "A written recommendation of **500-800 words** (typed answer or a .docx, .pdf or .txt file).",
      "Present the password policy and MFA plan as short tables or bullet lists so the IT manager can act on them.",
    ],
    criteria: [
      { name: "Password policy quality", points: 25, description: "Rules are specific, modern and each one is justified (not just \"use strong passwords\")." },
      { name: "MFA rollout plan", points: 30, description: "Prioritises the highest-risk accounts, compares methods sensibly, and includes a realistic recovery process." },
      { name: "Sector-specific control", points: 20, description: "A concrete control that fits the sector and clearly names the attack it prevents." },
      { name: "Risk reasoning", points: 15, description: "Explains how the controls together reduce credential theft, referring to course ideas." },
      { name: "Clarity and practicality", points: 10, description: "Written so a non-specialist manager could follow and implement it." },
    ],
    example:
      "*Worked example for a different organisation. Do not reuse its wording.*\n\n**Organisation.** Kudirat Freight Logistics, a fictional Lagos haulage company with 90 staff. Dispatchers and the finance team handle route payments and client data.\n\n**Password rule with reasoning.** *\"Minimum 14 characters, passphrases encouraged.\"* Length beats complexity: a long phrase like \"three green buses leave lagos at dawn\" is harder to guess than \"P@ssw0rd1!\" but easier for staff to remember, so they are less likely to reuse or write it down.\n\n**MFA rollout (extract).**\n\n| Phase | Accounts | Method | Reason |\n|---|---|---|---|\n| 1 (week 1-2) | Finance, IT admins, company email | Authenticator app | These accounts can move money or change everything |\n| 2 (week 3-6) | Dispatch and HR systems | Authenticator app | Hold client and staff personal data |\n| 3 | Everyone else | App, SMS as last resort | Widest reach, lowest risk |\n\nRecovery: a lost phone is reported to the IT desk, who verify identity by calling the staff member's manager on a known number before issuing a one-time recovery code.\n\n**Sector control.** Before any change to a supplier's bank details, finance must phone the supplier on the number already on file. This stops payment-diversion fraud where an attacker emails new account numbers.",
    tips: [
      "Do not simply list rules. Every rule needs a one-sentence reason, that is where most of the marks are.",
      "Be realistic. A plan to \"enable MFA for everyone tomorrow\" ignores staff without smartphones and lost-device recovery.",
      "SMS codes are better than nothing but can be intercepted or SIM-swapped. If you allow them, say why and when.",
    ],
  },

  3: {
    overview:
      "Good network design assumes that one device will eventually be compromised, and makes sure that does not mean *everything* is compromised. Your task is to design a segmented network for a small Nigerian organisation and explain how the design contains an attack.",
    tasks: [
      "Choose a fictional small organisation from **banking, telecom or oil and gas** (for example a microfinance bank branch, a small ISP point of presence, or a small flow-station office) and list **at least 10** devices or systems it runs (for example staff laptops, a customer database server, CCTV, guest WiFi, a payment terminal, an engineering workstation).",
      "Group those devices into **at least four network zones** (for example corporate staff, servers and sensitive data, guest/visitor WiFi, and a management or operational zone). Explain in one sentence why each zone exists.",
      "Draw a **network diagram** showing the zones, the firewall or router between them, and the internet connection. A hand-drawn photo, a screenshot from a free tool, or a clear text diagram are all acceptable.",
      "Build a **traffic rules table** with at least eight rows: *From zone | To zone | Allowed or blocked | Reason*. Guest WiFi must be blocked from sensitive systems.",
      "Write a short paragraph (100-150 words) tracing what happens if a **visitor's infected phone** joins the guest WiFi: what can it reach, and what stops it?",
      "Name **one weakness that remains** in your design and how you would reduce it.",
    ],
    deliverables: [
      "A single document (.docx or .pdf preferred) of **600-900 words** containing the device list, zone descriptions, the diagram, the traffic rules table and your two short paragraphs.",
      "The diagram must be inside the document, with every zone labelled.",
    ],
    criteria: [
      { name: "Zones and device grouping", points: 20, description: "Devices sit in sensible zones, each with a clear purpose." },
      { name: "Diagram", points: 20, description: "Clear, correctly labelled, and consistent with the rules table." },
      { name: "Traffic rules", points: 25, description: "Rules follow least privilege, guest access is isolated, and every rule has a reason." },
      { name: "Attack containment reasoning", points: 25, description: "Correctly traces how segmentation stops an infected guest device and names a genuine remaining weakness." },
      { name: "Clarity", points: 10, description: "Organised, labelled, and understandable to a non-specialist." },
    ],
    example:
      "*Worked example for a different organisation. Do not reuse its wording.*\n\n**Organisation.** Adaeze Medical Centre, a fictional private clinic with reception, doctors, a lab and patient-records server.\n\n**Zones.** Reception (front-desk PCs), Clinical (doctors' laptops and the records server), Lab devices (analysers that cannot be patched often), Guest WiFi (patients and visitors).\n\n**Diagram (text form).**\n\n```\nInternet --- Firewall ---+--- Guest WiFi\n                         +--- Reception\n                         +--- Clinical + Records server\n                         +--- Lab devices\n```\n\n**Traffic rules (extract).**\n\n| From | To | Allowed? | Reason |\n|---|---|---|---|\n| Guest WiFi | Any internal zone | Blocked | Visitors' devices are untrusted |\n| Guest WiFi | Internet | Allowed | Visitors only need internet |\n| Reception | Records server | Allowed, one application port only | Staff must open patient files, nothing else |\n| Lab devices | Internet | Blocked | Old devices cannot be patched, so keep them off the internet |\n\n**Containment paragraph.** A patient's infected phone joins guest WiFi. It can reach the internet but every route to Reception, Clinical and Lab is blocked at the firewall, so the malware has nowhere to spread. The remaining weakness is the firewall itself: if its admin password is weak, an attacker could change the rules, so I would add MFA and restrict who can log in to it.",
    tips: [
      "A diagram with no labels, or a rules table that contradicts the diagram, will lose marks. Check they match.",
      "Do not put everything in one big \"internal\" zone. That is exactly the flat network this week warned against.",
      "Every rule needs a reason. \"Blocked\" on its own is not an explanation.",
    ],
  },

  4: {
    overview:
      "Firewalls work on one idea: **deny everything, then allow only what is needed**. You are the new network analyst for a small company. Your manager has handed you a network layout and asked you to write its firewall rules and a secure-access procedure for an outside contractor.",
    materials:
      "**Network layout (fictional company: Eko Bay Trading).**\n\n| Zone | Address range | Contains |\n|---|---|---|\n| Staff LAN | 10.10.10.0/24 | 40 staff laptops and printers |\n| Servers | 10.10.20.0/24 | Web server 10.10.20.10, database 10.10.20.20, file server 10.10.20.30 |\n| Guest WiFi | 10.10.30.0/24 | Visitors' phones and laptops |\n| Internet | Any external address | The public internet |\n\n**Business needs.** Staff need web browsing and email. The public must reach the website (web server only, ports 80 and 443). The web server needs to talk to the database on port 5432. Staff need the file server. Guests need internet only. A contractor, *Ade of Bright Systems*, must maintain the database server once a month for two hours.",
    tasks: [
      "Write **at least 10 firewall rules** in a table: *Rule number | Source | Destination | Port and protocol | Action (allow or deny) | Reason*. Put rules in a sensible order, more specific rules first.",
      "Make the **last rule a default deny** for everything not explicitly allowed, and explain in one sentence why the order matters.",
      "Explicitly **block guest WiFi from all internal zones** and block direct internet access to the database server.",
      "Write a **secure remote-access procedure** for the contractor covering: how he is authenticated (including MFA), how the connection is encrypted (for example a VPN), exactly what he can reach and for how long, how his activity is logged, and how his access is switched off after the job.",
      "Explain in 3-4 sentences how a **monitoring or alerting** measure would help you notice if the contractor's account were misused.",
    ],
    deliverables: [
      "A document (.docx, .pdf or .txt) of **600-900 words** with the rules table, the default-deny explanation, and the contractor access procedure.",
      "State clearly in the document which rule blocks guests and which rule protects the database.",
    ],
    criteria: [
      { name: "Rule set correctness", points: 30, description: "Rules match the business needs, use correct sources, destinations and ports, and nothing is allowed that is not needed." },
      { name: "Default deny and ordering", points: 15, description: "Ends with default deny, is ordered sensibly, and explains why order matters." },
      { name: "Contractor access procedure", points: 30, description: "Covers authentication with MFA, encryption, limited scope, time limit, logging and offboarding." },
      { name: "Monitoring reasoning", points: 15, description: "Describes a realistic detection measure and what misuse it would reveal." },
      { name: "Clarity", points: 10, description: "Tables are readable and every rule has a reason." },
    ],
    example:
      "*Worked example for a different network. Do not reuse its wording.*\n\n**Small clinic network:** Reception 192.168.1.0/24, Records server 192.168.2.10 (port 8443), Guest 192.168.3.0/24.\n\n| # | Source | Destination | Port/Protocol | Action | Reason |\n|---|---|---|---|---|---|\n| 1 | Guest 192.168.3.0/24 | 192.168.1.0/24, 192.168.2.0/24 | Any | Deny | Visitors must never reach internal systems |\n| 2 | Reception 192.168.1.0/24 | 192.168.2.10 | TCP 8443 | Allow | Staff open patient records, nothing else |\n| 3 | Reception, Guest | Internet | TCP 80, 443 | Allow | Web browsing |\n| 4 | Internet | 192.168.2.10 | Any | Deny | The records server is never exposed to the internet |\n| 5 | Any | Any | Any | **Deny** | Default deny: anything not listed above is blocked |\n\n**Contractor procedure (extract).** The contractor logs in through the company VPN using his own named account plus an authenticator-app code. His account can reach only 192.168.2.10 on the maintenance port, only between 09:00 and 11:00 on the agreed day. All commands are logged. The account is disabled the same day the work is signed off.",
    tips: [
      "Order matters: a broad \"allow all\" placed above a specific deny will override it. Put specific denies first and the default deny last.",
      "Give the contractor a *named* account, not a shared one, so activity can be traced to a person.",
      "\"Allow the contractor full access to the network\" is the classic mistake. Restrict him to the one server he needs.",
    ],
  },

  5: {
    overview:
      "Phishing works because it looks normal. Attackers do not need to hack anything if they can get an employee to act on a convincing message. In this assignment you are a security analyst at a fictional Nigerian energy company, **Meridian Delta Energy**. Employees have forwarded three messages to the security desk: one email, one SMS and one phone call. For **each message** you must decide whether it is legitimate or a phishing attempt, prove your decision with specific evidence from the message, and write the verification step the employee should have taken *before acting*.\n\nAll organisations, numbers and people below are fictional.",
    materials:
      "### What to look for (your checklist)\n\nExamine every message against these warning signs. Not every phishing message shows all of them, and a *legitimate* message can look urgent or unexpected too, so weigh the evidence together.\n\n- **Sender details:** Does the address, domain, phone number or SMS sender name genuinely belong to the organisation? Look for look-alike domains (for example an extra word or a swapped letter), a personal email service used for an official request, or a display name that hides the real address.\n- **Links and attachments:** Where does a link really go (the real address, not the text shown)? Is it a shortened link? Is an unexpected attachment being pushed?\n- **Requests for sensitive information:** Passwords, one-time passcodes (OTPs), card PINs, BVN or account numbers. Real organisations do not ask for these by message or unexpected call.\n- **Urgency and threats:** Deadlines, \"your account will be blocked\", fear of losing money or a job.\n- **Impersonation and authority:** Pretending to be a boss, the IT desk, a bank or a regulator to make you obey without thinking.\n- **Tone, formatting and process:** Generic greetings (\"Dear customer\"), odd wording, or a request that skips the normal process (for example paying a new bank account by email).\n- **Fit with normal process:** Would this organisation normally contact you this way, about this, at this time?\n\n### Message A: Email\n\n> **From:** IT Service Desk <servicedesk@meridiandelta-support.com>\n> **To:** All Staff\n> **Date:** Friday, 16:42\n> **Subject:** URGENT: Your mailbox will be deactivated today\n>\n> Dear Employee,\n>\n> Our system has detected that your mailbox storage is 98% full. To avoid deactivation of your account by 18:00 today, you must verify your login immediately at the link below.\n>\n> **Verify mailbox now:** http://meridiandelta-mail-verify.com/login\n>\n> You will be asked to enter your email password and staff ID to confirm your identity. Failure to act will lead to loss of all emails.\n>\n> Thank you,\n> IT Support Team\n\n*Background:* Meridian Delta's real email addresses all end in @meridiandelta.com.ng.\n\n### Message B: SMS\n\n> **Sender ID:** NovaTrust\n> NovaTrust: Debit alert. NGN 18,500.00 debited from acct ending 4471 on 14-Sep at 13:06 for POS purchase at KAFTAN MART, LAGOS. Avail bal: NGN 92,310.55. If you did not authorise this, call NovaTrust on 0700 000 0000 (number on the back of your card) or use the NovaTrust app. Never share your PIN or OTP.\n\n*Background:* This employee banks with the fictional NovaTrust Bank. The message arrived in the same SMS thread as the employee's earlier genuine NovaTrust alerts, and the employee did make a purchase at that shop at that time.\n\n### Message C: Phone call transcript\n\n> **Caller (male voice, calm, professional):** Good afternoon, Mr Okafor. This is Emeka from the NovaTrust Bank fraud prevention desk. We have blocked a suspicious ₦450,000 transfer from your account and I need to verify you so we can reverse it.\n> **Employee:** Oh, okay. What do you need?\n> **Caller:** For your safety, please confirm your full name, date of birth and the last four digits of your card. Good. I have now sent a six-digit code to your phone. Please read it to me so I can cancel the transfer before it goes through. We only have a few minutes.\n> **Employee:** I have not received it yet.\n> **Caller:** It will arrive shortly. Please stay on the line and do not hang up, otherwise the transfer will go through and the money will be lost. Read it out as soon as you see it, sir.\n\n*Background:* The call came from a mobile number the employee did not recognise. The employee had not seen any transfer alert.",
    tasks: [
      "For **each of the three messages**, state your **verdict**: *Phishing* or *Legitimate*.",
      "For each message, list the **specific tells** that led to your verdict. Quote the exact words, address or detail from the message, and name the type of warning sign it is (for example *look-alike domain*, *urgency*, *request for OTP*). Aim for **at least three tells** for each message you judge to be phishing. For a message you judge legitimate, list the **features that make it trustworthy** and explain why it does not trip the warning signs.",
      "For each message, write the **verification step** the employee should have taken *before acting*. Be specific: which independent channel, which number or website, and who to contact. Do not use contact details from the message itself. Even for a message you judge legitimate, say how the employee could confirm it independently.",
      "For each message, say in one or two sentences what the **likely consequence** would have been if the employee had acted without verifying.",
      "Write a **short reflection (80-120 words)**: which of the three was hardest to judge and why, and what one habit would protect an employee against all three?",
    ],
    deliverables: [
      "A written analysis of **600-900 words** as a typed answer or a .docx, .pdf or .txt file.",
      "Use this table for each message: *Message | Verdict | Tells (with quotes) | Verification step | Consequence if acted on*, followed by your short reflection.",
    ],
    criteria: [
      { name: "Correct verdicts", points: 20, description: "All three messages are classified correctly and consistently with your evidence." },
      { name: "Quality of tells", points: 30, description: "Specific quoted evidence for each verdict, correctly named as warning-sign types (sender, links, sensitive-information requests, urgency, impersonation). Legitimate features are explained, not just assumed." },
      { name: "Verification steps", points: 25, description: "Each step names an independent channel and does not rely on contact details supplied in the message. Steps are realistic for an employee." },
      { name: "Consequence and reflection", points: 15, description: "Realistic consequences and a thoughtful reflection that draws on the lesson on pressure points (urgency, authority, fear, trust)." },
      { name: "Clarity", points: 10, description: "Organised, uses the table, and could be understood by a non-technical manager." },
    ],
    example:
      "*Worked example using a different message set. Do not reuse its wording. Notice how each tell is quoted, named, and paired with a specific verification step.*\n\n**Message: Email**\n\n> From: \"Mrs Bello, Finance Director\" <ebello.finance@gmail.com>\n> Subject: Confidential, urgent payment\n> Please process a payment of NGN 2,800,000 to our new supplier before close of business. I am in a meeting and cannot take calls. Account: 0123456789. Do not discuss with anyone.\n\n| Field | Analysis |\n|---|---|\n| **Verdict** | Phishing (a Business Email Compromise attempt) |\n| **Tells** | (1) *Unusual sender details:* a senior director using a free Gmail address instead of the company domain. (2) *Impersonation and authority:* it borrows the Finance Director's name to pressure a junior staff member. (3) *Urgency:* \"before close of business\". (4) *Process bypass:* a large payment to a new account requested by email, with \"I cannot take calls\" and \"do not discuss with anyone\" designed to stop verification. |\n| **Verification step** | Do not reply to the email. Phone Mrs Bello on her number from the internal staff directory, or walk to her office, and confirm the request. Follow the company rule that any new payee must be approved by two people before payment. |\n| **Consequence if acted on** | A large payment to a fraudster's account that is very hard to recover, and the employee blamed for not following the payment process. |\n\n**Reflection (extract).** The email was hard to dismiss because it used a real name and a believable request. The habit that protects against this kind of message is simple: verify any unusual request through a separate channel you already trust, however senior the sender seems.",
    tips: [
      "Do not judge on \"it looks suspicious\". Quote the evidence: the exact address, the exact wording, and name what type of warning sign it is.",
      "One message may be genuine. Marking everything as phishing is as wrong as trusting everything. Explain *why* a genuine message is trustworthy.",
      "Your verification step must not use anything the message gave you (its link, its phone number, or \"reply to this email\"). Use a number or website you already have from a trusted source.",
      "Remember what makes phishing work: urgency, authority, fear and trust in familiar branding. Link your reflection to those pressure points.",
    ],
  },

  6: {
    overview:
      "When ransomware strikes, the first hour decides how bad the damage is. You are writing a short response plan for a fictional organisation so that its team knows exactly what to do. This assignment is strictly defensive: you will describe how to **prevent, detect, contain and recover**. You must never describe how to create, deploy or configure ransomware.",
    tasks: [
      "Choose **one sector** (banking, telecom or oil and gas) and describe a fictional organisation in it in 3-4 sentences, naming its **three most critical systems** (for example core banking, billing, or production monitoring).",
      "List **at least four prevention controls already in place** (for example offline backups, patching, MFA, email filtering, endpoint protection, network segmentation) and explain in a line each how it reduces the chance or impact of ransomware.",
      "Describe **at least three detection signals** the team would watch for (for example many files suddenly renamed, endpoint alerts, users reporting a ransom note, unusual overnight network activity) and who monitors each.",
      "Write a **containment checklist for the first hour**: numbered, concrete actions in order (for example isolate affected machines from the network, disable compromised accounts, protect backups from the infection, notify the incident lead).",
      "Explain your **recovery approach**: how you decide what to restore first, how you confirm backups are clean, and how you verify systems are safe before reconnecting them.",
      "State the organisation's **position on paying a ransom** and who makes that decision. Justify it in 3-4 sentences.",
    ],
    deliverables: [
      "A response plan of **700-1,000 words** (.docx, .pdf or .txt).",
      "Include a **timeline table** with four rows: *0-1 hour | 1-4 hours | 4-24 hours | After 24 hours*, listing the key actions in each period.",
    ],
    criteria: [
      { name: "Prevention and detection", points: 25, description: "Realistic controls and signals that fit the chosen sector and its critical systems." },
      { name: "Containment actions", points: 25, description: "Concrete, correctly ordered first-hour actions that stop spread and protect backups." },
      { name: "Recovery approach", points: 25, description: "Priority order justified, backups verified clean, safe reconnection steps." },
      { name: "Ransom decision and roles", points: 10, description: "A clear, reasoned position with a named decision-maker." },
      { name: "Clarity and timeline", points: 15, description: "Well organised, with a complete and sensible timeline table." },
    ],
    example:
      "*Worked example for a different organisation. Do not reuse its wording.*\n\n**Organisation.** Kaduna Grain Millers, a fictional food manufacturer. Critical systems: the production-line controller, the order and invoicing system, and the payroll system.\n\n**Detection signal (extract).** The endpoint protection tool alerts when a single machine renames hundreds of files in a minute. The IT officer on shift receives the alert by SMS and must acknowledge within 10 minutes.\n\n**Containment checklist (first hour).**\n\n1. Unplug the network cable or disable WiFi on any machine showing a ransom note. Do not power it off yet, so evidence is preserved.\n2. Disable the user account that was logged in on that machine.\n3. Confirm the backup server is disconnected from the network so encrypted files cannot spread to backups.\n4. Phone the incident lead and the general manager on their known numbers.\n\n**Timeline (extract).**\n\n| Period | Key actions |\n|---|---|\n| 0-1 hour | Isolate machines, disable accounts, protect backups, alert incident lead |\n| 1-4 hours | Identify how far it spread, decide which systems to shut down, inform management and legal |\n| 4-24 hours | Begin restoring priority systems from clean backups; rebuild affected machines |\n| After 24 hours | Confirm all systems clean, reset all passwords, write the lessons-learned report |\n\n**Ransom position.** The company does not pay by default. Payment is never guaranteed to restore data, it funds further attacks, and it could carry legal risk. Only the general manager, after advice from legal counsel and the incident lead, can decide to depart from this.",
    tips: [
      "Order matters in containment. Isolating machines and protecting backups come before anything else.",
      "Do not say \"restore from backup\" without saying how you know the backup is clean and offline.",
      "Never describe how ransomware works at a technical level or how to build it. Marks are for defence only.",
      "Name real roles (incident lead, IT officer, general manager), not just \"the team\".",
    ],
  },
};
