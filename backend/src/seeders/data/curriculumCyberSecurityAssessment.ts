// Cyber Security Fundamentals, owner's changes of 2026-11-16 (applied by migration
// 20261116060000-cyber-security-fundamentals-assessment-changes): a three-question knowledge
// check in every lesson (multiple choice, true or false, scenario), three learner reflections
// (lessons 2.2, 9.2, 18.2), a 30-question final assessment in place of the capstone and day
// assignments, and a course feedback questionnaire. Keys are "<day>.<lesson order>".
export interface CsfAssessmentChanges {
  knowledgeChecks: Record<string, string[]>;
  closing: string[];
  textEdits: Record<string, { from: string; to: string }[]>;
  module18Description: { from: string; to: string };
  finalAssessment: {
    text: string;
    type: "multiple_choice";
    points: number;
    explanation: string;
    answers: { text: string; isCorrect: boolean }[];
  }[];
}

export const CSF_ASSESSMENT_CHANGES: CsfAssessmentChanges = {
  "knowledgeChecks": {
    "1.1": [
      "**Knowledge check 1.1**",
      "**1.** What is a vulnerability?",
      "- A. Any person or group that might attack you\n- B. A specific weakness a threat could exploit, such as an unpatched server or a weak password\n- C. The money an organisation loses after an attack\n- D. A tool that detects attacks",
      "<details><summary>Show answer</summary>\n\n**B.** A threat is the danger; a vulnerability is the weakness it could use.\n\n</details>",
      "**2.** True or false: insider threats are often hard to defend against because insiders already have legitimate access.",
      "<details><summary>Show answer</summary>\n\n**True.** Insiders don't need to break in, so controls built to stop outsiders often don't stop them.\n\n</details>",
      "**3.** A small school says, \"We're too small for criminals to bother with us.\" Its staff reuse passwords and nobody updates the computers. What is the most accurate response?",
      "- A. Attackers often target small organisations because basic weaknesses like these are easy to exploit\n- B. They're right: attackers only target large companies\n- C. They only need antivirus software\n- D. Risk only exists if they have been attacked before",
      "<details><summary>Show answer</summary>\n\n**A.** Most attacks exploit basic oversights, wherever they are. Size is no protection.\n\n</details>"
    ],
    "1.2": [
      "**Knowledge check 1.2**",
      "**1.** What is the first step in vulnerability management?",
      "- A. Remediation: fixing every weakness at once\n- B. Buying a scanning tool\n- C. Discovery: knowing which systems, devices and software actually exist\n- D. Reporting to the board",
      "<details><summary>Show answer</summary>\n\n**C.** You can't protect what you don't know you have.\n\n</details>",
      "**2.** True or false: vulnerability management done once, when a system is launched, is enough to keep it secure.",
      "<details><summary>Show answer</summary>\n\n**False.** New vulnerabilities are found constantly. It is an ongoing cycle, not a one-time snapshot.\n\n</details>",
      "**3.** A scan finds the same flaw on an isolated test laptop and on the server that holds customer payment data. There is time to fix only one today. What should the team do?",
      "- A. Fix the test laptop first, because it is quicker\n- B. Fix neither until both can be done together\n- C. Toss a coin, because the flaw is the same\n- D. Fix the payment-data server first, because the impact there would be far higher",
      "<details><summary>Show answer</summary>\n\n**D.** Prioritisation weighs likelihood and impact. The same flaw on a critical system is a bigger risk.\n\n</details>"
    ],
    "2.1": [
      "**Knowledge check 2.1**",
      "**1.** What is credential stuffing?",
      "- A. Guessing every possible combination of characters\n- B. Trying username and password pairs leaked from one breach on other, unrelated services\n- C. Hiding malware inside a login page\n- D. Stealing a laptop to get its passwords",
      "<details><summary>Show answer</summary>\n\n**B.** It works because so many people reuse passwords.\n\n</details>",
      "**2.** True or false: a long, unusual passphrase can be stronger than a short password full of symbols.",
      "<details><summary>Show answer</summary>\n\n**True.** Length matters more than complexity for resisting brute-force attacks.\n\n</details>",
      "**3.** Tunde uses the same password for his email, his bank and a shopping site. The shopping site is breached. What is the main risk?",
      "- A. Criminals try the leaked password on his email and bank accounts and get in\n- B. Only the shopping site account is at risk\n- C. His computer will catch a virus\n- D. Nothing, if the password was long",
      "<details><summary>Show answer</summary>\n\n**A.** Password reuse turns one breach into many. A unique password for every account defeats credential stuffing.\n\n</details>"
    ],
    "2.2": [
      "**Knowledge check 2.2**",
      "**1.** What question does authorisation answer?",
      "- A. Are you who you say you are?\n- B. Has your password been leaked?\n- C. Now that we know who you are, what are you allowed to do?\n- D. Which device are you using?",
      "<details><summary>Show answer</summary>\n\n**C.** Authentication proves identity; authorisation decides what that identity can do.\n\n</details>",
      "**2.** True or false: a password and a security question are two different MFA factors.",
      "<details><summary>Show answer</summary>\n\n**False.** Both are something you know. MFA needs factors from different categories: know, have or are.\n\n</details>",
      "**3.** An attacker has stolen Amina's work password through a phishing page, but her account uses MFA with an app on her phone. What is most likely to happen?",
      "- A. The attacker logs in, because the password is correct\n- B. Her phone is automatically infected\n- C. The MFA app gives the attacker a code\n- D. The attacker can't log in without the code from her phone, so the attack is stopped",
      "<details><summary>Show answer</summary>\n\n**D.** A stolen password alone isn't enough when a second, independent factor is needed. She should still change her password.\n\n</details>",
      "**Learner reflection 1 of 3**",
      "> Think about your own accounts: email, banking, social media and work. Which of them reuse a password, and which have MFA switched on? Choose the two most important accounts and decide what you will change this week.",
      "Write your answer in your notes. There is no right or wrong answer, and it isn't marked."
    ],
    "3.1": [
      "**Knowledge check 3.1**",
      "**1.** At which OSI layer do routers work, using IP addresses?",
      "- A. Layer 3, Network\n- B. Layer 1, Physical\n- C. Layer 2, Data Link\n- D. Layer 7, Application",
      "<details><summary>Show answer</summary>\n\n**A.** Layer 3 is where IP addressing and routing happen.\n\n</details>",
      "**2.** True or false: different attacks and defences operate at different layers of the OSI model.",
      "<details><summary>Show answer</summary>\n\n**True.** For example, ARP spoofing works at Layer 2, below where an IP-and-port firewall rule looks.\n\n</details>",
      "**3.** A firewall filters traffic by IP address and port, but an attacker on the local network uses ARP spoofing. Why might the firewall not stop it?",
      "- A. Firewalls only work at night\n- B. ARP spoofing only affects Wi-Fi\n- C. ARP spoofing works at Layer 2, below the Layer 3 and 4 information the firewall checks\n- D. The firewall needs a longer password",
      "<details><summary>Show answer</summary>\n\n**C.** Knowing the layer tells you which controls are relevant, and why defences are needed at several layers.\n\n</details>"
    ],
    "3.2": [
      "**Knowledge check 3.2**",
      "**1.** What is network segmentation?",
      "- A. Connecting every device to one open network\n- B. Dividing a network into smaller, isolated sections\n- C. Encrypting every email\n- D. Using two internet providers",
      "<details><summary>Show answer</summary>\n\n**B.** Segmentation contains damage: a compromise in one section can't easily reach the others.\n\n</details>",
      "**2.** True or false: UDP is used for video calls because it gives up some reliability in exchange for speed.",
      "<details><summary>Show answer</summary>\n\n**True.** A dropped packet matters less in a call than the delay of resending it.\n\n</details>",
      "**3.** At a bank branch, guest Wi-Fi, staff computers and the customer-data servers are all on one flat network. A guest's phone is infected. What is the risk?",
      "- A. The infected device may have a direct path to the customer-data servers\n- B. None, because guests can't see the servers\n- C. Only the guest's phone is affected\n- D. The Wi-Fi will switch off automatically",
      "<details><summary>Show answer</summary>\n\n**A.** A flat network is a design failure. Segmentation would keep guest Wi-Fi isolated.\n\n</details>"
    ],
    "4.1": [
      "**Knowledge check 4.1**",
      "**1.** What is the difference between an IDS and an IPS?",
      "- A. An IDS blocks traffic; an IPS only records it\n- B. They are two names for the same tool\n- C. An IDS is for email; an IPS is for websites\n- D. An IDS detects and alerts; an IPS also blocks malicious traffic in real time",
      "<details><summary>Show answer</summary>\n\n**D.** The IDS is the smoke detector; the IPS is the sprinkler.\n\n</details>",
      "**2.** True or false: a DDoS attack usually aims to steal data.",
      "<details><summary>Show answer</summary>\n\n**False.** DDoS targets availability: it floods a service so real users can't get through.\n\n</details>",
      "**3.** A new firewall is being set up for a small office. Which rule approach is best?",
      "- A. Allow everything, then block attacks as they appear\n- B. Block everything by default, then allow only the specific traffic the business needs\n- C. Allow all traffic during working hours\n- D. Copy the rules from a home router",
      "<details><summary>Show answer</summary>\n\n**B.** Default deny keeps the number of open doors as small as possible.\n\n</details>"
    ],
    "4.2": [
      "**Knowledge check 4.2**",
      "**1.** What does a VPN protect?",
      "- A. The laptop at each end of the connection\n- B. Every file stored on a server\n- C. Data travelling between two points, inside an encrypted tunnel\n- D. The user's password from being guessed",
      "<details><summary>Show answer</summary>\n\n**C.** A VPN protects data in transit, not the devices at either end.\n\n</details>",
      "**2.** True or false: connecting an infected laptop to the office network through a VPN keeps the network safe.",
      "<details><summary>Show answer</summary>\n\n**False.** The VPN simply gives the malware an encrypted tunnel into the internal network.\n\n</details>",
      "**3.** While reviewing traffic in Wireshark, an analyst sees repeated connection attempts from one internal computer to an unfamiliar external address. What does this show?",
      "- A. Knowing what normal traffic looks like makes unusual patterns stand out for investigation\n- B. Wireshark has a fault\n- C. The traffic must be safe because it is internal\n- D. The computer needs a faster connection",
      "<details><summary>Show answer</summary>\n\n**A.** The skill is recognising normal so that suspicious patterns jump out.\n\n</details>"
    ],
    "5.1": [
      "**Knowledge check 5.1**",
      "**1.** What makes spear phishing different from ordinary phishing?",
      "- A. It is sent to thousands of people at once\n- B. It only uses text messages\n- C. It always contains a virus\n- D. It targets a specific person or organisation, using real, researched details",
      "<details><summary>Show answer</summary>\n\n**D.** Real names, roles and projects make spear phishing far more convincing.\n\n</details>",
      "**2.** True or false: Business Email Compromise usually needs advanced malware to work.",
      "<details><summary>Show answer</summary>\n\n**False.** BEC needs only a convincing message and someone under pressure who doesn't double-check.\n\n</details>",
      "**3.** Kemi in finance gets an email that appears to come from the managing director: \"Pay this supplier today. I'm in meetings, so don't call me.\" What should she do?",
      "- A. Pay it, because the director is senior\n- B. Verify the request through a separate, known channel, such as calling the director on a number she already has\n- C. Reply to the email to confirm\n- D. Forward it to the supplier to ask",
      "<details><summary>Show answer</summary>\n\n**B.** Urgency, authority and a request to skip checks are classic BEC signs. Always verify through another channel.\n\n</details>"
    ],
    "5.2": [
      "**Knowledge check 5.2**",
      "**1.** What is vishing?",
      "- A. Phishing over text message\n- B. A fake website that steals passwords\n- C. Phishing over a phone call\n- D. Malware hidden in a video",
      "<details><summary>Show answer</summary>\n\n**C.** Vishing callers often know real details about you, which makes them sound genuine.\n\n</details>",
      "**2.** True or false: a real bank will never ask you to read out a one-time passcode over the phone.",
      "<details><summary>Show answer</summary>\n\n**True.** Anyone asking for your one-time code is trying to get into your account.\n\n</details>",
      "**3.** An employee clicked a link in a fake delivery text, then realised it was a scam. She is embarrassed. What should happen next?",
      "- A. She reports it straight away, and the organisation thanks her and checks for wider compromise\n- B. She says nothing, to avoid getting into trouble\n- C. She deletes the text and hopes for the best\n- D. She is disciplined, so others are more careful",
      "<details><summary>Show answer</summary>\n\n**A.** A blame-free reporting culture is what makes people report quickly, while there's still time to act.\n\n</details>"
    ],
    "6.1": [
      "**Knowledge check 6.1**",
      "**1.** What makes a worm different from a virus?",
      "- A. A worm only affects phones\n- B. A worm spreads across a network by itself, without anyone running a file\n- C. A worm needs someone to open an attachment\n- D. A worm is always harmless",
      "<details><summary>Show answer</summary>\n\n**B.** A virus needs human action to spread; a worm doesn't.\n\n</details>",
      "**2.** True or false: endpoint detection and response (EDR) tools can catch brand-new malware by watching what it does, not only by matching known signatures.",
      "<details><summary>Show answer</summary>\n\n**True.** Behaviour-based detection spots new malware that has no signature yet.\n\n</details>",
      "**3.** Chidi finds an unlabelled USB drive in the office car park and wants to plug it in to find its owner. What is the best advice?",
      "- A. Plug it into a colleague's computer instead\n- B. Plug it in, but only open documents\n- C. Plug it in at home rather than at work\n- D. Don't plug it in; hand it to IT or security",
      "<details><summary>Show answer</summary>\n\n**D.** Infected removable media is a common way to deliver malware, because curiosity is human.\n\n</details>"
    ],
    "6.2": [
      "**Knowledge check 6.2**",
      "**1.** What is double extortion?",
      "- A. The attacker steals a copy of the data before encrypting it, then threatens to publish it\n- B. The attacker asks for two payments in a row\n- C. Two different groups attack at the same time\n- D. The ransom doubles every day",
      "<details><summary>Show answer</summary>\n\n**A.** Even with good backups, an organisation can face a damaging leak.\n\n</details>",
      "**2.** True or false: backups stored on the same connected network as everything else can be encrypted by ransomware too.",
      "<details><summary>Show answer</summary>\n\n**True.** Recovery depends on backups that are isolated or offline, and tested.\n\n</details>",
      "**3.** A company's file servers are encrypted by ransomware. It has recent, tested, offline backups. What is the best first response?",
      "- A. Pay the ransom straight away to save time\n- B. Restore the backups immediately onto the infected servers\n- C. Contain the attack, remove its cause, then restore from the clean backups\n- D. Switch everything back on and see what happens",
      "<details><summary>Show answer</summary>\n\n**C.** Contain and eradicate first, or the restored systems may be reinfected.\n\n</details>"
    ],
    "7.1": [
      "**Knowledge check 7.1**",
      "**1.** What is the first step in identifying risk?",
      "- A. Buying cyber insurance\n- B. Choosing which risks to accept\n- C. Running a phishing test\n- D. Cataloguing assets: listing everything worth protecting",
      "<details><summary>Show answer</summary>\n\n**D.** You can't assess risk to something you haven't acknowledged exists.\n\n</details>",
      "**2.** True or false: buying cyber insurance is an example of transferring a risk.",
      "<details><summary>Show answer</summary>\n\n**True.** Insurance shifts some of the financial impact to someone else.\n\n</details>",
      "**3.** A risk assessment shows that a rarely used old system is very likely to be attacked and the business no longer needs it. Which treatment fits best?",
      "- A. Avoid the risk by retiring the system\n- B. Accept the risk and do nothing\n- C. Transfer the risk to the IT team\n- D. Wait until it is attacked",
      "<details><summary>Show answer</summary>\n\n**A.** When the activity isn't needed, stopping it removes the risk entirely.\n\n</details>"
    ],
    "7.2": [
      "**Knowledge check 7.2**",
      "**1.** What is a risk register?",
      "- A. A one-time report written at launch\n- B. A living record of each risk, its likelihood and impact, controls, owner and status\n- C. A list of staff passwords\n- D. A government licence",
      "<details><summary>Show answer</summary>\n\n**B.** It must be reviewed and updated, or it soon describes history rather than reality.\n\n</details>",
      "**2.** True or false: PCI-DSS is a government law.",
      "<details><summary>Show answer</summary>\n\n**False.** It is an industry standard set by the major card companies for anyone handling card data.\n\n</details>",
      "**3.** A bank's own security is strong, but a fintech partner with weak security has a live connection into its systems. What kind of risk is this?",
      "- A. No risk, because the bank's own security is strong\n- B. Physical security risk\n- C. Third-party risk, which needs vetting, limited access and regular review\n- D. Insider risk only",
      "<details><summary>Show answer</summary>\n\n**C.** A partner's weak security can become your way in.\n\n</details>"
    ],
    "8.1": [
      "**Knowledge check 8.1**",
      "**1.** What does least privilege mean?",
      "- A. Each user and system has only the minimum access needed for the job\n- B. Everyone gets full access in case they need it\n- C. Only managers can use computers\n- D. Passwords are changed every day",
      "<details><summary>Show answer</summary>\n\n**A.** Broad access turns one compromised account into a master key.\n\n</details>",
      "**2.** True or false: just-in-time access gives elevated permissions only for the time a task needs, then removes them.",
      "<details><summary>Show answer</summary>\n\n**True.** It stops privileged access sitting active as a standing target.\n\n</details>",
      "**3.** A user access review finds that an analyst who moved from Finance to Marketing a year ago can still approve payments. What should happen?",
      "- A. Leave it in case Finance needs help\n- B. Give the same access to the whole Marketing team\n- C. Wait until the analyst leaves\n- D. Remove the old Finance access, because it no longer matches the job",
      "<details><summary>Show answer</summary>\n\n**D.** Access tends to pile up. Reviews catch it before it becomes a vulnerability.\n\n</details>"
    ],
    "8.2": [
      "**Knowledge check 8.2**",
      "**1.** Which stage of joiner, mover and leaver is most often handled badly?",
      "- A. Joiners: people getting access too slowly\n- B. Leavers: accounts not disabled promptly when someone departs\n- C. Movers: people changing desks\n- D. None: all three are usually handled well",
      "<details><summary>Show answer</summary>\n\n**B.** A former employee's active account is a common source of real incidents.\n\n</details>",
      "**2.** True or false: contractor access should be time-limited to match the length of the contract.",
      "<details><summary>Show answer</summary>\n\n**True.** And revoked automatically when the engagement ends, rather than relying on someone remembering.\n\n</details>",
      "**3.** A maintenance contractor's project at a gas plant ended three months ago, but their remote login still works. What is the right action?",
      "- A. Leave it in case they are needed again\n- B. Change their password and leave the account\n- C. Revoke the access now and review how contractor access is ended in future\n- D. Ask the contractor to stop using it",
      "<details><summary>Show answer</summary>\n\n**C.** Access should end when the engagement ends; a forgotten account is an open door.\n\n</details>"
    ],
    "9.1": [
      "**Knowledge check 9.1**",
      "**1.** What is the first phase of incident response?",
      "- A. Preparation\n- B. Detection\n- C. Containment\n- D. Recovery",
      "<details><summary>Show answer</summary>\n\n**A.** Plans, trained people, tools and backups make every later phase faster.\n\n</details>",
      "**2.** True or false: eradication means removing the root cause of the incident, such as the malware or the compromised account.",
      "<details><summary>Show answer</summary>\n\n**True.** Containment stops the spread; eradication removes the cause.\n\n</details>",
      "**3.** A laptop in the finance team is found to be infected and is trying to reach other computers. What is the immediate priority?",
      "- A. Find out who sent the malware\n- B. Restore the laptop from backup straight away\n- C. Write the post-incident report\n- D. Contain it, for example by disconnecting the laptop from the network",
      "<details><summary>Show answer</summary>\n\n**D.** Stop it getting worse first, then remove the cause and recover.\n\n</details>"
    ],
    "9.2": [
      "**Knowledge check 9.2**",
      "**1.** What does a SIEM do?",
      "- A. Blocks all phishing emails\n- B. Collects and correlates logs from across an organisation to spot signs of an incident\n- C. Encrypts the company's data\n- D. Backs up servers every night",
      "<details><summary>Show answer</summary>\n\n**B.** Correlation turns scattered events into one alert worth investigating.\n\n</details>",
      "**2.** True or false: alert fatigue happens when analysts receive so many alerts that real threats get missed.",
      "<details><summary>Show answer</summary>\n\n**True.** That's why tuning alerts is as important as collecting them.\n\n</details>",
      "**3.** A SIEM flags a login from an unusual country, followed minutes later by a large download of customer files. How should it be prioritised?",
      "- A. As high or critical, because sensitive data may be leaving the organisation\n- B. As low, because logins happen every day\n- C. Ignore it until it happens again\n- D. As medium, because no one has complained",
      "<details><summary>Show answer</summary>\n\n**A.** Priority depends on severity: how much is affected and whether sensitive data is involved.\n\n</details>",
      "**Learner reflection 2 of 3**",
      "> Imagine you notice something suspicious at work tomorrow, such as an odd email you clicked or a login alert you don't recognise. Who exactly would you report it to, and how? What might make you hesitate, and how would you overcome that?",
      "Write your answer in your notes. There is no right or wrong answer, and it isn't marked."
    ],
    "10.1": [
      "**Knowledge check 10.1**",
      "**1.** What is cyber hygiene?",
      "- A. A cleaning schedule for computers\n- B. A tool used only by the security team\n- C. The everyday security habits of every person with access\n- D. A type of antivirus",
      "<details><summary>Show answer</summary>\n\n**C.** Small daily habits applied by everyone are one of the strongest defences.\n\n</details>",
      "**2.** True or false: sharing your password with a trusted colleague is safe if they promise not to misuse it.",
      "<details><summary>Show answer</summary>\n\n**False.** Shared passwords make it impossible to know who did what on an account.\n\n</details>",
      "**3.** An email shows the display name of your IT department, asks you to \"log in urgently\", and its link points to an unfamiliar address. What should you do?",
      "- A. Click quickly before the deadline\n- B. Don't click; check the real sender, and report it or verify through a known channel\n- C. Reply asking whether it's real\n- D. Forward it to colleagues to check",
      "<details><summary>Show answer</summary>\n\n**B.** Check the sender and link, and treat urgency as a reason to slow down.\n\n</details>"
    ],
    "10.2": [
      "**Knowledge check 10.2**",
      "**1.** What is tailgating?",
      "- A. Sending phishing emails from a car\n- B. Watching someone type a password\n- C. Sending too many alerts\n- D. Following an authorised person through a secure door without badging in",
      "<details><summary>Show answer</summary>\n\n**D.** It bypasses even excellent digital access controls physically.\n\n</details>",
      "**2.** True or false: you should report something suspicious only once you're certain it is an attack.",
      "<details><summary>Show answer</summary>\n\n**False.** Report straight away. Early, uncertain reports give the security team a chance to act.\n\n</details>",
      "**3.** Working in a busy café, Ifeoma needs to step away from her laptop for two minutes. What should she do?",
      "- A. Lock the screen, or take the laptop with her\n- B. Leave it open, because it's only two minutes\n- C. Ask a stranger to watch it\n- D. Turn the brightness down",
      "<details><summary>Show answer</summary>\n\n**A.** An unlocked laptop in a public place is an easy, non-technical gap.\n\n</details>"
    ],
    "11.1": [
      "**Knowledge check 11.1**",
      "**1.** In which cloud model does the customer patch the operating system?",
      "- A. IaaS\n- B. SaaS\n- C. PaaS\n- D. None of them",
      "<details><summary>Show answer</summary>\n\n**A.** IaaS gives the most flexibility and the most responsibility.\n\n</details>",
      "**2.** True or false: moving to SaaS removes all of the customer's security responsibility.",
      "<details><summary>Show answer</summary>\n\n**False.** The customer still configures the application's security settings and manages who has access.\n\n</details>",
      "**3.** A company uses a SaaS customer-management tool. Who is responsible for removing access for staff who leave?",
      "- A. The SaaS provider\n- B. Nobody, because SaaS manages itself\n- C. The company itself, as part of managing who has access\n- D. The staff member who left",
      "<details><summary>Show answer</summary>\n\n**C.** In SaaS, access and configuration stay with the customer.\n\n</details>"
    ],
    "11.2": [
      "**Knowledge check 11.2**",
      "**1.** Under the shared responsibility model, what is the customer responsible for?",
      "- A. Security of the cloud: the provider's data centres\n- B. Security in the cloud: their own configuration, access and data\n- C. The provider's hardware\n- D. Nothing; the provider handles everything",
      "<details><summary>Show answer</summary>\n\n**B.** The provider secures the cloud itself; the customer secures what they put in it.\n\n</details>",
      "**2.** True or false: many cloud security incidents are caused by customer misconfiguration rather than failures in the provider's infrastructure.",
      "<details><summary>Show answer</summary>\n\n**True.** A storage bucket left public is the classic example.\n\n</details>",
      "**3.** A configuration scan finds a storage bucket of customer records that anyone on the internet can read. What should happen first?",
      "- A. Report the provider for a security flaw\n- B. Wait for the next scheduled review\n- C. Delete the scanning tool's alert\n- D. Make the bucket private straight away, then check whether anyone accessed it",
      "<details><summary>Show answer</summary>\n\n**D.** Close the exposure first, then investigate. It may be a reportable breach.\n\n</details>"
    ],
    "12.1": [
      "**Knowledge check 12.1**",
      "**1.** What is the purpose of data classification?",
      "- A. To delete old data\n- B. To make files smaller\n- C. To match the level of protection to how much harm exposure would cause\n- D. To decide who gets paid",
      "<details><summary>Show answer</summary>\n\n**C.** It stops you over-protecting public data or under-protecting restricted data.\n\n</details>",
      "**2.** True or false: data encrypted at rest is safe even if it is sent across the network in plain text.",
      "<details><summary>Show answer</summary>\n\n**False.** A secure system needs encryption both at rest and in transit.\n\n</details>",
      "**3.** A database of customer payment details is encrypted, but the decryption key is stored in the same folder as the database. What is the problem?",
      "- A. Anyone who reaches the database can also get the key, so the encryption gives little protection\n- B. There is no problem; the data is encrypted\n- C. The database will run slowly\n- D. The key should be emailed to staff instead",
      "<details><summary>Show answer</summary>\n\n**A.** Keys must be stored and managed separately from the data they protect.\n\n</details>"
    ],
    "12.2": [
      "**Knowledge check 12.2**",
      "**1.** Under GDPR, within what time does a qualifying breach generally have to be reported to the regulator?",
      "- A. 7 days\n- B. 72 hours from becoming aware of it\n- C. 30 days\n- D. Only if customers complain",
      "<details><summary>Show answer</summary>\n\n**B.** The clock starts when the breach is discovered.\n\n</details>",
      "**2.** True or false: an incident response plan should set out breach notification steps before any incident happens.",
      "<details><summary>Show answer</summary>\n\n**True.** Working out who to notify, and by when, during an incident wastes the time the deadline allows.\n\n</details>",
      "**3.** A company discovers that subscriber records were accessed without authorisation. Its incident plan says nothing about notification. What is the biggest risk?",
      "- A. None, because notification is optional\n- B. The records will delete themselves\n- C. The breach becomes less serious over time\n- D. Missing the legal notification deadline while it works out who must be told",
      "<details><summary>Show answer</summary>\n\n**D.** Notification duties apply whether or not the organisation is ready for them.\n\n</details>"
    ],
    "13.1": [
      "**Knowledge check 13.1**",
      "**1.** What does operational technology (OT) control?",
      "- A. Email and websites\n- B. Payroll and HR records\n- C. Physical processes, such as valves, pumps and sensors\n- D. Customer phone calls",
      "<details><summary>Show answer</summary>\n\n**C.** IT manages information; OT controls physical equipment.\n\n</details>",
      "**2.** True or false: in OT, availability and safety usually come before confidentiality.",
      "<details><summary>Show answer</summary>\n\n**True.** A control system that stops or misbehaves can cause shutdowns or safety incidents.\n\n</details>",
      "**3.** An oil company connects its plant's control network to the office IT network so head office can see live production data. What new risk does this create?",
      "- A. A threat on the IT side, such as malware from a phishing email, may now reach the control systems\n- B. None, because control systems can't be hacked\n- C. The data will be less accurate\n- D. The plant will need fewer staff",
      "<details><summary>Show answer</summary>\n\n**A.** IT/OT convergence brings efficiency but opens a route that air-gapped networks didn't have.\n\n</details>"
    ],
    "13.2": [
      "**Knowledge check 13.2**",
      "**1.** What does a PLC do?",
      "- A. Shows live readings to the operator\n- B. Directly runs one physical step of a process, such as opening a valve at a set pressure\n- C. Stores company emails\n- D. Connects the plant to the internet",
      "<details><summary>Show answer</summary>\n\n**B.** If SCADA is the supervisor, the PLC is the pair of hands.\n\n</details>",
      "**2.** True or false: industrial protocols such as Modbus and DNP3 were designed for closed, trusted environments.",
      "<details><summary>Show answer</summary>\n\n**True.** They weren't built with internet-connected networks in mind, which is part of why OT security is a specialty.\n\n</details>",
      "**3.** An operator watches pipeline pressure across hundreds of kilometres from one control room and can open or close valves remotely. Which system is this?",
      "- A. A firewall\n- B. A SIEM\n- C. SCADA (Supervisory Control and Data Acquisition)\n- D. A VPN",
      "<details><summary>Show answer</summary>\n\n**C.** SCADA lets operators monitor and control physical processes remotely.\n\n</details>"
    ],
    "14.1": [
      "**Knowledge check 14.1**",
      "**1.** Which practice makes remote access to OT systems safer?",
      "- A. One shared login for all engineers\n- B. Leaving the connection open all the time\n- C. Using the same password as the office network\n- D. Time-limited sessions with MFA, logged activity and no shared accounts",
      "<details><summary>Show answer</summary>\n\n**D.** Every remote connection is a door into OT; control who uses it and when.\n\n</details>",
      "**2.** True or false: a vendor's own security practices effectively become part of the facility's attack surface when the vendor has access.",
      "<details><summary>Show answer</summary>\n\n**True.** That's why contractor and third-party risk is so common in real OT incidents.\n\n</details>",
      "**3.** An equipment vendor asks for permanent, always-on remote access to a plant's control system \"to save time\". What is the best response?",
      "- A. Agree, because the vendor is trusted\n- B. Grant access only for each specific task, with MFA, logging and an end time\n- C. Share an engineer's login with the vendor\n- D. Refuse all vendor support forever",
      "<details><summary>Show answer</summary>\n\n**B.** Least privilege and time limits apply to contractors as much as to staff.\n\n</details>"
    ],
    "14.2": [
      "**Knowledge check 14.2**",
      "**1.** What is the single most effective OT-specific control against an IT-side attack?",
      "- A. Network segmentation between the IT and OT networks\n- B. A longer password policy\n- C. More email filters\n- D. Faster internet",
      "<details><summary>Show answer</summary>\n\n**A.** Segmentation stops a compromise on one side from reaching the other.\n\n</details>",
      "**2.** True or false: an IT-side ransomware attack can force a plant to shut down production even if the malware never reaches the control systems.",
      "<details><summary>Show answer</summary>\n\n**True.** If nobody can confirm the malware hasn't spread, a precautionary shutdown may be the only safe choice.\n\n</details>",
      "**3.** After ransomware on a gas plant's office network, the team has clean, verified backups. What must happen before reconnecting to the OT network?",
      "- A. Reconnect everything at once to restart production quickly\n- B. Pay the ransom to be safe\n- C. Restore from the clean backups and confirm the threat is gone, while manual fallback procedures keep critical safety functions running\n- D. Skip checks, because the control systems weren't infected",
      "<details><summary>Show answer</summary>\n\n**C.** Recover carefully and keep safety-critical functions running on fallback procedures.\n\n</details>"
    ],
    "15.1": [
      "**Knowledge check 15.1**",
      "**1.** Which form of MFA is weakest against SIM-related attacks?",
      "- A. App-based codes\n- B. A hardware security key\n- C. A fingerprint on the device\n- D. One-time passcodes sent by SMS",
      "<details><summary>Show answer</summary>\n\n**D.** If an attacker controls your phone number, they may receive your SMS codes.\n\n</details>",
      "**2.** True or false: a banking app downloaded from outside the official app store may be a fake designed to steal credentials.",
      "<details><summary>Show answer</summary>\n\n**True.** Look-alike apps are a common way banking malware spreads.\n\n</details>",
      "**3.** A customer's login details are stolen by a fake banking website. The attacker then calls the bank's support line pretending to be the customer to reset the account. What does this show?",
      "- A. Account takeover often combines credential theft with social engineering of the bank's own staff\n- B. The bank's servers were hacked directly\n- C. Only the customer is to blame\n- D. Fake websites can't steal passwords",
      "<details><summary>Show answer</summary>\n\n**A.** Account takeover is a chain: stolen credentials, weak MFA, then manipulated account recovery.\n\n</details>"
    ],
    "15.2": [
      "**Knowledge check 15.2**",
      "**1.** Why does a payment need its own verification even inside an open banking session?",
      "- A. Payments are always fraudulent\n- B. A session being open doesn't mean every transaction in it should be trusted\n- C. It makes the app faster\n- D. The law bans open sessions",
      "<details><summary>Show answer</summary>\n\n**B.** Larger or unusual transfers deserve stronger checks.\n\n</details>",
      "**2.** True or false: a transfer that looks unusual is always fraud.",
      "<details><summary>Show answer</summary>\n\n**False.** Risk-based monitoring weighs several signals together before allowing, checking or blocking a payment.\n\n</details>",
      "**3.** A customer's password is reset, and minutes later a large transfer goes to a new recipient from a location the customer has never used. What should the bank's monitoring do?",
      "- A. Allow it, because the password was correct\n- B. Ignore it until the customer complains\n- C. Flag or block the transfer for extra verification, because several warning signs line up\n- D. Close the customer's account permanently",
      "<details><summary>Show answer</summary>\n\n**C.** When several risk signals line up, the transaction needs extra checks.\n\n</details>"
    ],
    "16.1": [
      "**Knowledge check 16.1**",
      "**1.** Why do privileged staff accounts at a bank carry extra risk?",
      "- A. One compromised privileged account could affect thousands of customer accounts\n- B. They are used less often\n- C. They don't need passwords\n- D. They belong to junior staff",
      "<details><summary>Show answer</summary>\n\n**A.** That's why they get stronger authentication, closer monitoring and regular reviews.\n\n</details>",
      "**2.** True or false: most fraud cases that aren't pure insider theft start with a cybersecurity failure.",
      "<details><summary>Show answer</summary>\n\n**True.** A phishing email, a guessed password or a manipulated support call usually comes first.\n\n</details>",
      "**3.** A fraudster moved money out of a customer's account after phishing their login details and passing a weak account-recovery check. Which control failures should the review look at first?",
      "- A. The colour of the banking app\n- B. The bank's marketing emails\n- C. The speed of the bank's website\n- D. Authentication and account-recovery checks, because the fraud depended on them failing",
      "<details><summary>Show answer</summary>\n\n**D.** Ask which security control had to fail for the fraud to happen.\n\n</details>"
    ],
    "16.2": [
      "**Knowledge check 16.2**",
      "**1.** Which protection helps answer \"who viewed this customer record?\"",
      "- A. Encrypting the record\n- B. A longer password\n- C. Logging every access to sensitive records\n- D. A faster database",
      "<details><summary>Show answer</summary>\n\n**C.** Logs give an answer when questions arise later.\n\n</details>",
      "**2.** True or false: a genuine IT department may ask a staff member to read out a one-time code sent to their own phone.",
      "<details><summary>Show answer</summary>\n\n**False.** Legitimate IT staff don't need your one-time codes. Anyone asking is likely an attacker.\n\n</details>",
      "**3.** Adaeze gets a polite, urgent call from \"IT\" asking her to read out the code just sent to her phone. What should she do?",
      "- A. Read out the code, because the caller sounds genuine\n- B. Hang up and call IT back on a known, verified internal number\n- C. Ask the caller to email the request\n- D. Give half the code to test them",
      "<details><summary>Show answer</summary>\n\n**B.** Verify through a channel you choose, not one the caller started.\n\n</details>"
    ],
    "17.1": [
      "**Knowledge check 17.1**",
      "**1.** What does a mobile network's core network do?",
      "- A. Authenticates SIMs, routes calls and data, and handles billing\n- B. Only provides the physical cell towers\n- C. Makes phones' screens work\n- D. Sends marketing messages",
      "<details><summary>Show answer</summary>\n\n**A.** Most of the security work happens in and around the core network.\n\n</details>",
      "**2.** True or false: keeping a telecom network available and correctly configured is a security job, not just an engineering one.",
      "<details><summary>Show answer</summary>\n\n**True.** Availability is one of the three goals security protects.\n\n</details>",
      "**3.** A network engineer only needs to monitor network performance but has been given rights to reconfigure how the whole network routes traffic. What is the issue?",
      "- A. None, because engineers are trusted\n- B. The engineer will work more slowly\n- C. Monitoring needs even more access\n- D. It breaks least privilege: one compromised account could reconfigure the network",
      "<details><summary>Show answer</summary>\n\n**D.** Access to network management systems should match the job, nothing more.\n\n</details>"
    ],
    "17.2": [
      "**Knowledge check 17.2**",
      "**1.** Why is SIM-related fraud dangerous?",
      "- A. It makes phones run out of battery\n- B. Control of a phone number can unlock accounts that rely on SMS codes and account recovery\n- C. It only affects phone bills\n- D. It deletes a person's contacts",
      "<details><summary>Show answer</summary>\n\n**B.** In a mobile-first economy, a phone number is often an identity token.\n\n</details>",
      "**2.** True or false: damage to fibre cables can be a cybersecurity issue as well as a physical one.",
      "<details><summary>Show answer</summary>\n\n**True.** Physical infrastructure is part of keeping services available.\n\n</details>",
      "**3.** A customer suddenly loses mobile signal, then gets an email saying their bank password was changed. What is the most likely explanation?",
      "- A. Someone may have taken control of their phone number to intercept codes; they should contact their operator and bank at once\n- B. A normal network fault, with nothing to do\n- C. Their phone needs updating\n- D. The bank is testing its systems",
      "<details><summary>Show answer</summary>\n\n**A.** Losing signal unexpectedly, followed by account changes, is a warning sign of SIM-related fraud.\n\n</details>"
    ],
    "18.1": [
      "**Knowledge check 18.1**",
      "**1.** Why are telecom operators attractive DDoS targets?",
      "- A. They have no firewalls\n- B. They store no customer data\n- C. Their services are always on and public, and many other services depend on them\n- D. Their staff work only at night",
      "<details><summary>Show answer</summary>\n\n**C.** A DDoS on a telecom operator cascades to everyone who relies on its network.\n\n</details>",
      "**2.** True or false: privileged access to core network systems should be held to a higher standard than everyday office system access.",
      "<details><summary>Show answer</summary>\n\n**True.** One privileged account can affect millions of subscribers.\n\n</details>",
      "**3.** A telecom employee with access to subscriber records starts looking up the details of celebrities they don't serve. What should controls do?",
      "- A. Nothing, because the employee is authorised\n- B. Detect it through access logging and monitoring, and limit access to what the role needs\n- C. Give the employee more access\n- D. Delete the celebrities' records",
      "<details><summary>Show answer</summary>\n\n**B.** Insider risk is managed by least privilege and monitoring who accesses what.\n\n</details>"
    ],
    "18.2": [
      "**Knowledge check 18.2**",
      "**1.** What is network slicing in 5G?",
      "- A. Cutting fibre cables into sections\n- B. Splitting a SIM card in two\n- C. Turning off part of a network at night\n- D. Running several logically separate virtual networks over the same physical infrastructure",
      "<details><summary>Show answer</summary>\n\n**D.** Slicing adds flexibility, but more software means more that can be misconfigured.\n\n</details>",
      "**2.** True or false: 5G's shift to more software and more connected devices generally means a larger attack surface.",
      "<details><summary>Show answer</summary>\n\n**True.** Even when each piece is well designed, more interconnection means more to protect.\n\n</details>",
      "**3.** Automated monitoring at a mobile operator detects a sudden, sustained traffic flood that is degrading service for thousands of subscribers. What comes next in the incident response lifecycle?",
      "- A. Post-incident review\n- B. Buying new cell towers\n- C. Containment, for example filtering the malicious traffic and working with upstream providers\n- D. Waiting for subscribers to complain",
      "<details><summary>Show answer</summary>\n\n**C.** Detection leads to containment: stop the impact, then eradicate, recover and review.\n\n</details>",
      "**Learner reflection 3 of 3**",
      "> Looking back over the course, which sector (oil and gas, banking or telecommunications) interests you most, and why? Which two skills from this course would you most want to show an employer, and how could you start building evidence of them?",
      "Write your answer in your notes. There is no right or wrong answer, and it isn't marked."
    ]
  },
  "closing": [
    "## Final assessment",
    "This course ends with a final assessment.",
    "- 30 multiple-choice questions covering the whole course.\n- Pass mark: 24 out of 30 (80%).\n- Time limit: 45 minutes. Question order is shuffled.\n- After you submit, you can see the correct answers with explanations.",
    "| Topic | Questions |\n| --- | --- |\n| Cybersecurity fundamentals | 3 |\n| Phishing and social engineering | 5 |\n| Passwords and authentication | 3 |\n| Data protection and confidentiality | 4 |\n| Device, network and remote working security | 4 |\n| Malware and ransomware | 4 |\n| Cloud security, access control and risk management | 3 |\n| Incident identification and reporting | 4 |\n| **Total** | **30** |",
    "Open **Final Assessment** from this day's quizzes when you are ready.",
    "## Course feedback questionnaire",
    "When you finish this lesson, the course shows as completed on your dashboard. Select **Share feedback** on the course card to answer five short questions:",
    "1. Overall, how would you rate this course?\n2. How relevant was the course to the job or career you want?\n3. How confident do you now feel about spotting and reporting a cyber threat?\n4. How easy was the course to follow?\n5. What was most useful, and what one thing should we improve?",
    "It takes about two minutes. Your answers help us improve the course."
  ],
  "textEdits": {
    "1.2": [
      {
        "from": "This day's assignment asks you to research three real-world data breaches and identify which attack vectors made them possible -- exactly the pattern-recognition skill this day has been building.",
        "to": "The knowledge check above lets you test the pattern-recognition skill this day has been building."
      }
    ],
    "9.2": [
      {
        "from": "This day's assignment asks you to build an incident response playbook for a malware infection, applying the full six-phase lifecycle.",
        "to": "The reflection above asks you to apply that lifecycle to your own workplace."
      }
    ],
    "16.2": [
      {
        "from": "the Telecommunications pathway and your capstone project are what's ahead.",
        "to": "the Telecommunications pathway and your final assessment are what's ahead."
      }
    ],
    "17.2": [
      {
        "from": "before you move into your capstone project.",
        "to": "before you take your final assessment."
      }
    ],
    "18.1": [
      {
        "from": "before your capstone project.",
        "to": "before your final assessment."
      }
    ],
    "18.2": [
      {
        "from": "Your capstone project is where you'll now choose one of Oil & Gas, Banking, or Telecommunications and bring everything you've learned -- core fundamentals and sector-specific application together -- into one connected piece of work.",
        "to": "Your final assessment, below, tests everything you've learned -- core fundamentals and sector-specific application together."
      }
    ]
  },
  "module18Description": {
    "from": "close out this course before the capstone.",
    "to": "close out this course before the final assessment."
  },
  "finalAssessment": [
    {
      "text": "What is a 'threat' in cybersecurity?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "A threat is the danger; a vulnerability is the weakness it could exploit.",
      "answers": [
        {
          "text": "Any potential danger, such as a criminal group or human error",
          "isCorrect": true
        },
        {
          "text": "A weakness that could be exploited",
          "isCorrect": false
        },
        {
          "text": "A dollar figure representing annual loss",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is a 'vulnerability'?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Unpatched software and weak passwords are typical vulnerabilities.",
      "answers": [
        {
          "text": "Any potential danger facing an organisation",
          "isCorrect": false
        },
        {
          "text": "A type of authorised penetration test",
          "isCorrect": false
        },
        {
          "text": "A specific weakness a threat could exploit",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is an organisation's 'attack surface'?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "The bigger and less tracked the attack surface, the harder it is to defend.",
      "answers": [
        {
          "text": "The total number of employees at a company",
          "isCorrect": false
        },
        {
          "text": "Every possible point where an unauthorised person could try to get in or extract data",
          "isCorrect": true
        },
        {
          "text": "Only the organisation's public website",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What distinguishes spear phishing from generic phishing?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Real, researched details make spear phishing far more convincing.",
      "answers": [
        {
          "text": "It targets a specific individual or organisation using real, researched details",
          "isCorrect": true
        },
        {
          "text": "It is sent exclusively over SMS, never email",
          "isCorrect": false
        },
        {
          "text": "It never impersonates a trusted source",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is Business Email Compromise (BEC)?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "BEC relies on impersonation and urgency, not malware.",
      "answers": [
        {
          "text": "A malware infection that only affects corporate email servers",
          "isCorrect": false
        },
        {
          "text": "A type of firewall rule violation",
          "isCorrect": false
        },
        {
          "text": "Impersonating or compromising a real executive's/vendor's email to instruct an urgent, fraudulent payment or payment change",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is smishing?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Smishing is phishing by text message.",
      "answers": [
        {
          "text": "A technical attack against SIM cards",
          "isCorrect": false
        },
        {
          "text": "Phishing delivered over SMS text message",
          "isCorrect": true
        },
        {
          "text": "Phishing delivered exclusively through social media direct messages",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which verification habit would defeat most Business Email Compromise attempts?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Verify through a separate channel you already trust, never the one in the message.",
      "answers": [
        {
          "text": "Calling the requester back on a separate, known number before acting on an unusual request",
          "isCorrect": true
        },
        {
          "text": "Replying directly to the suspicious email to ask if it's legitimate",
          "isCorrect": false
        },
        {
          "text": "Forwarding the email to a colleague for a second opinion only",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is 'social engineering', as a broader category than phishing?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Phishing is one form of social engineering; impersonation and pretexting are others.",
      "answers": [
        {
          "text": "A method of physically bypassing a firewall's hardware",
          "isCorrect": false
        },
        {
          "text": "A formal engineering discipline for building secure software",
          "isCorrect": false
        },
        {
          "text": "Manipulating people into breaking normal security procedures or revealing confidential information",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is credential stuffing?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Credential stuffing works because so many people reuse passwords.",
      "answers": [
        {
          "text": "Physically stealing a device to read stored passwords",
          "isCorrect": false
        },
        {
          "text": "Taking username/password pairs leaked from one breach and trying them against other, unrelated services",
          "isCorrect": true
        },
        {
          "text": "Trying every word in a dictionary against a single account",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What question does authentication answer?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Authentication proves identity; authorisation decides what that identity can do.",
      "answers": [
        {
          "text": "Are you who you say you are?",
          "isCorrect": true
        },
        {
          "text": "What are you allowed to do?",
          "isCorrect": false
        },
        {
          "text": "How long has this account existed?",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Why does MFA close most account-compromise attacks even after a password is stolen?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "A stolen password alone isn't enough when a second, independent factor is needed.",
      "answers": [
        {
          "text": "MFA automatically changes the stolen password",
          "isCorrect": false
        },
        {
          "text": "MFA prevents any password from ever being phished in the first place",
          "isCorrect": false
        },
        {
          "text": "The attacker still lacks the second factor, like the victim's phone or fingerprint",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is the purpose of data classification?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Classification matches protection to the harm exposure would cause.",
      "answers": [
        {
          "text": "To calculate Annualised Loss Expectancy",
          "isCorrect": false
        },
        {
          "text": "To determine the appropriate level of protection for each type of data",
          "isCorrect": true
        },
        {
          "text": "To decide which employees are allowed to work remotely",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What does encryption at rest protect?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Encryption at rest keeps stored data unreadable without the key.",
      "answers": [
        {
          "text": "Data while it's stored, such as on a hard drive or in a database",
          "isCorrect": true
        },
        {
          "text": "Data while it's moving between two systems over a network",
          "isCorrect": false
        },
        {
          "text": "Only data sent over HTTPS",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What does encryption in transit protect?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Encryption in transit protects data as it moves, for example over HTTPS or a VPN.",
      "answers": [
        {
          "text": "Data only while it sits unused on a hard drive",
          "isCorrect": false
        },
        {
          "text": "Only data stored in cloud databases",
          "isCorrect": false
        },
        {
          "text": "Data while it's moving between systems, such as over HTTPS or a VPN",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "Within what time window does GDPR generally require breach notification to a regulator?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "GDPR generally requires notification within 72 hours of becoming aware of a qualifying breach.",
      "answers": [
        {
          "text": "One year",
          "isCorrect": false
        },
        {
          "text": "Seventy-two hours",
          "isCorrect": true
        },
        {
          "text": "Thirty days",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is network segmentation?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Segmentation contains damage: a compromise in one section can't easily reach the others.",
      "answers": [
        {
          "text": "Dividing a network into smaller, isolated sections rather than one flat, open network",
          "isCorrect": true
        },
        {
          "text": "Encrypting all traffic between two routers",
          "isCorrect": false
        },
        {
          "text": "Assigning a MAC address to every device",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What does a VPN NOT protect?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "A VPN protects data in transit, not the devices at either end.",
      "answers": [
        {
          "text": "Data while it travels between two points",
          "isCorrect": false
        },
        {
          "text": "Traffic sent over the public internet",
          "isCorrect": false
        },
        {
          "text": "The security of either endpoint itself",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "Why do unknown USB drives remain an effective way to deliver malware?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Attackers rely on ordinary curiosity. Hand unknown drives to IT.",
      "answers": [
        {
          "text": "They are immune to all forms of detection",
          "isCorrect": false
        },
        {
          "text": "Curiosity about an unlabelled drive is a very ordinary, human reaction that attackers rely on",
          "isCorrect": true
        },
        {
          "text": "USB drives cannot be scanned by any endpoint protection software",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Why is public or shared Wi-Fi considered less trustworthy than a controlled office network?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Public Wi-Fi is less controlled, which is why VPNs and secure remote access matter.",
      "answers": [
        {
          "text": "It's inherently less controlled, which is why secure remote access practices like VPNs matter for daily habits too",
          "isCorrect": true
        },
        {
          "text": "Public Wi-Fi is always technically slower than office networks",
          "isCorrect": false
        },
        {
          "text": "It has no meaningful security difference from an office network",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What distinguishes a worm from a virus?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "A worm spreads by itself; a virus needs a file to be shared or run.",
      "answers": [
        {
          "text": "A worm requires a human to click a file, while a virus spreads automatically",
          "isCorrect": false
        },
        {
          "text": "There is no meaningful difference between the two",
          "isCorrect": false
        },
        {
          "text": "A worm spreads on its own across a network without needing human action; a virus needs a file to be shared or run",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is a trojan?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "A trojan relies on the victim trusting what looks like ordinary software.",
      "answers": [
        {
          "text": "A tool used exclusively for authorised penetration testing",
          "isCorrect": false
        },
        {
          "text": "Malware disguised as legitimate, useful software",
          "isCorrect": true
        },
        {
          "text": "Malware that spreads automatically without any disguise",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is 'double extortion' in modern ransomware attacks?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Even with good backups, the organisation faces a threatened data leak.",
      "answers": [
        {
          "text": "Stealing a copy of data before encrypting it, then threatening to publish it if the ransom isn't paid",
          "isCorrect": true
        },
        {
          "text": "Demanding payment twice from the same victim on two separate occasions",
          "isCorrect": false
        },
        {
          "text": "Encrypting a victim's backups only, leaving original files untouched",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Why are backups stored on the same connected network as everything else considered risky against ransomware?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Backups must be isolated or offline, and tested, to survive ransomware.",
      "answers": [
        {
          "text": "Connected backups are always slower to restore than offline ones",
          "isCorrect": false
        },
        {
          "text": "They have no relevant risk at all compared to offline backups",
          "isCorrect": false
        },
        {
          "text": "They can be targeted and destroyed by the ransomware alongside the original data",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "In the shared responsibility model, what is the customer generally responsible for?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "The provider secures the cloud itself; the customer secures what they put in it.",
      "answers": [
        {
          "text": "Maintaining the core network infrastructure",
          "isCorrect": false
        },
        {
          "text": "Security 'in' the cloud, such as configuration, access management, and data",
          "isCorrect": true
        },
        {
          "text": "The physical security of the provider's data centres",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is the principle of least privilege?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Least privilege limits how far one compromised account can reach.",
      "answers": [
        {
          "text": "Every user and system should have only the minimum access actually necessary to do their job",
          "isCorrect": true
        },
        {
          "text": "Every user should be granted full administrative access by default",
          "isCorrect": false
        },
        {
          "text": "Only the most senior employee should have any system access",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What are the four general risk treatment options?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Accept, avoid, mitigate or transfer, chosen by weighing cost against risk.",
      "answers": [
        {
          "text": "Deny, delay, defer, and ignore",
          "isCorrect": false
        },
        {
          "text": "Report, escalate, litigate, and publish",
          "isCorrect": false
        },
        {
          "text": "Accept, avoid, mitigate, and transfer",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is the first phase of the incident response lifecycle?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Preparation makes every later phase faster and calmer.",
      "answers": [
        {
          "text": "Containment",
          "isCorrect": false
        },
        {
          "text": "Preparation",
          "isCorrect": true
        },
        {
          "text": "Detection",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is the immediate priority once an incident is confirmed, before the root cause is necessarily fixed?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Contain first to stop it getting worse, then eradicate the cause.",
      "answers": [
        {
          "text": "Containment",
          "isCorrect": true
        },
        {
          "text": "Eradication",
          "isCorrect": false
        },
        {
          "text": "Post-incident review",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is 'alert fatigue'?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Too many low-value alerts hide the real ones; alerts need tuning.",
      "answers": [
        {
          "text": "A hardware failure affecting a SIEM's servers",
          "isCorrect": false
        },
        {
          "text": "A type of malware that disables alerting systems",
          "isCorrect": false
        },
        {
          "text": "Becoming desensitised to a constant stream of alerts, to the point a genuinely critical one gets lost among false positives",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is the single most valuable security habit a non-specialist employee can build?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Fast, honest reporting gives the security team a chance to act before damage spreads.",
      "answers": [
        {
          "text": "Disabling multi-factor authentication for convenience",
          "isCorrect": false
        },
        {
          "text": "Reporting anything suspicious immediately, without waiting to be certain first",
          "isCorrect": true
        },
        {
          "text": "Memorising the entire incident response lifecycle",
          "isCorrect": false
        }
      ]
    }
  ]
};
