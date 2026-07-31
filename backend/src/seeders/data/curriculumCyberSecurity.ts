import { WeekSeed } from "./curriculumTypes";

export const WEEKS: WeekSeed[] = [
  {
    weekNumber: 2,
    moduleTitle: "The CIA Triad & OWASP Top 10",
    moduleDescription: "The CIA Triad, the OWASP Top 10, and cybersecurity career paths.",
    lessons: [
      {
        title: "The CIA Triad",
        content: "Confidentiality, integrity, and availability as the three goals every security decision balances.",
        order: 1,
        durationMinutes: 25,
      },
      {
        title: "OWASP Top 10 and Career Paths",
        content: "An overview of common OWASP Top 10 vulnerabilities and the range of career paths available in cybersecurity.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Personal Cybersecurity Awareness Checklist",
    assignmentDescription:
      "Create a personal cybersecurity awareness checklist covering practical habits like strong unique passwords, multi-factor authentication, and skepticism of unexpected messages, written in plain language for someone with no security background.",
    fileRequired: false,
    quizQuestions: [
      { text: "What does CIA stand for in the CIA Triad?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Confidentiality, Integrity, Availability", isCorrect: true },
        { text: "Cybersecurity, Intelligence, Access", isCorrect: false },
        { text: "Control, Identity, Auditing", isCorrect: false },
      ]},
      { text: "Which CIA Triad component is violated when hospital patient records are leaked online without any data being altered?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Confidentiality", isCorrect: true },
        { text: "Integrity", isCorrect: false },
        { text: "Availability", isCorrect: false },
      ]},
      { text: "An attacker who doesn't steal money but secretly changes account balances in a database is primarily violating which principle?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Integrity", isCorrect: true },
        { text: "Confidentiality", isCorrect: false },
        { text: "Availability", isCorrect: false },
      ]},
      { text: "Which CIA Triad component do ransomware attacks and Denial-of-Service attacks primarily target?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Availability", isCorrect: true },
        { text: "Confidentiality", isCorrect: false },
        { text: "Integrity", isCorrect: false },
      ]},
      { text: "According to the lecture, what happens if information is locked down so tightly that only one person can access it?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Confidentiality is maximized but availability for legitimate users may be harmed", isCorrect: true },
        { text: "All three CIA goals improve equally", isCorrect: false },
        { text: "Integrity automatically increases as a side effect", isCorrect: false },
      ]},
      { text: "What does OWASP stand for?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Open Web Application Security Project", isCorrect: true },
        { text: "Organized Web Attack Security Panel", isCorrect: false },
        { text: "Official Web Application Standards Program", isCorrect: false },
      ]},
      { text: "What is OWASP's most famous publication, referenced throughout this course?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The OWASP Top 10", isCorrect: true },
        { text: "The OWASP Annual Threat Report", isCorrect: false },
        { text: "The OWASP Firewall Handbook", isCorrect: false },
      ]},
      { text: "What is \"broken access control,\" as described in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A system failing to properly check whether a user is allowed to do something before letting them do it", isCorrect: true },
        { text: "A firewall blocking all outbound traffic by default", isCorrect: false },
        { text: "An encryption algorithm with a known mathematical flaw", isCorrect: false },
      ]},
      { text: "What is \"security misconfiguration,\" as described in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A system left with default passwords, unnecessary features enabled, or overly permissive settings", isCorrect: true },
        { text: "A system that has been patched too frequently", isCorrect: false },
        { text: "A network segmented into too many isolated zones", isCorrect: false },
      ]},
      { text: "According to the lecture, what is true about most successful attacks?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "They exploit basic oversights, not brilliant hacking", isCorrect: true },
        { text: "They require a genius-level understanding of cryptography", isCorrect: false },
        { text: "They only target huge multinational companies", isCorrect: false },
      ]},
      { text: "Which career path involves designing and implementing defenses like firewalls, encryption systems, and secure network architecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Security engineering", isCorrect: true },
        { text: "Governance, risk, and compliance", isCorrect: false },
        { text: "Digital forensics", isCorrect: false },
      ]},
      { text: "Which career path is described as legally and ethically breaking into systems to find weaknesses before criminals do?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Penetration testing", isCorrect: true },
        { text: "Security operations", isCorrect: false },
        { text: "Incident response", isCorrect: false },
      ]},
      { text: "Which career path focuses on policy, documentation, and working across an organization, without requiring deep technical hacking skills?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Governance, risk, and compliance (GRC)", isCorrect: true },
        { text: "Penetration testing", isCorrect: false },
        { text: "Security engineering", isCorrect: false },
      ]},
      { text: "Which career path is described as investigating what happened after a breach and helping an organization recover?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Incident response and digital forensics", isCorrect: true },
        { text: "Security engineering", isCorrect: false },
        { text: "Penetration testing", isCorrect: false },
      ]},
      { text: "The \"CIA\" in the CIA Triad refers to a government intelligence agency.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Confidentiality, integrity, and availability can sometimes be in tension with each other.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "The OWASP Top 10 exists because the same handful of mistakes get made repeatedly across different organizations and industries.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Security operations, as a career path, involves monitoring systems for signs of an ongoing attack.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In one or two sentences, explain why the CIA Triad's three goals can be in tension with each other.", type: "short_answer", points: 1, explanation: "Maximizing one goal, like locking data down for confidentiality, can reduce another, like availability for legitimate users; good security means balancing all three rather than maximizing any single one.", answers: [] },
      { text: "In one or two sentences, explain what 'vulnerable and outdated components' means as an OWASP Top 10 risk category.", type: "short_answer", points: 1, explanation: "It refers to an organization running old software with known, publicly documented security flaws that haven't been patched, leaving an easy opening for attackers.", answers: [] },
    ],
  },
  {
    weekNumber: 3,
    moduleTitle: "How Networks Work",
    moduleDescription: "The OSI Model, the TCP/IP protocol suite, and network segmentation.",
    lessons: [
      {
        title: "The OSI Model",
        content: "The seven layers of network communication, from physical cabling up through the application layer.",
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "TCP/IP and Network Segmentation",
        content: "The TCP/IP protocol suite and how dividing a network into isolated segments contains the damage of a breach.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Small Business Network Architecture Design",
    assignmentDescription:
      "Design a network architecture for a small business, applying segmentation and other security controls to keep sensitive systems isolated from lower-trust devices like guest WiFi.",
    fileRequired: true,
    quizQuestions: [
      { text: "What does OSI stand for?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Open Systems Interconnection", isCorrect: true },
        { text: "Organized Systems Integration", isCorrect: false },
        { text: "Operational Security Infrastructure", isCorrect: false },
      ]},
      { text: "How many layers does the OSI Model have?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Seven", isCorrect: true },
        { text: "Four", isCorrect: false },
        { text: "Five", isCorrect: false },
      ]},
      { text: "Which OSI layer consists of the actual hardware, transmitting raw bits as electrical, optical, or radio signals?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Physical layer (Layer 1)", isCorrect: true },
        { text: "Data Link layer (Layer 2)", isCorrect: false },
        { text: "Network layer (Layer 3)", isCorrect: false },
      ]},
      { text: "Which OSI layer uses MAC addresses and is where switches operate?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Data Link layer (Layer 2)", isCorrect: true },
        { text: "Physical layer (Layer 1)", isCorrect: false },
        { text: "Transport layer (Layer 4)", isCorrect: false },
      ]},
      { text: "Which OSI layer is responsible for IP addressing and routing, and is where routers operate?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Network layer (Layer 3)", isCorrect: true },
        { text: "Data Link layer (Layer 2)", isCorrect: false },
        { text: "Session layer (Layer 5)", isCorrect: false },
      ]},
      { text: "Which OSI layer manages breaking data into pieces and reassembling it reliably, and includes TCP and UDP?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Transport layer (Layer 4)", isCorrect: true },
        { text: "Network layer (Layer 3)", isCorrect: false },
        { text: "Application layer (Layer 7)", isCorrect: false },
      ]},
      { text: "Which attack, mentioned in the lecture, operates at Layer 2 of the OSI Model?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "ARP spoofing", isCorrect: true },
        { text: "SYN flooding", isCorrect: false },
        { text: "SQL injection", isCorrect: false },
      ]},
      { text: "What is the primary role of IP, the Internet Protocol?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Addressing devices and routing data between networks", isCorrect: true },
        { text: "Encrypting data before it is transmitted", isCorrect: false },
        { text: "Formatting web pages for display in a browser", isCorrect: false },
      ]},
      { text: "What does TCP provide that UDP does not?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Reliability, ensuring data arrives in order and is resent if lost", isCorrect: true },
        { text: "Lower latency for video calls and gaming", isCorrect: false },
        { text: "Physical layer signal transmission", isCorrect: false },
      ]},
      { text: "What mechanism does TCP use to negotiate a connection before real data starts flowing?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The three-way handshake", isCorrect: true },
        { text: "The default-deny rule", isCorrect: false },
        { text: "The OSI negotiation layer", isCorrect: false },
      ]},
      { text: "Why is UDP used for things like video calls and online gaming, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It sacrifices reliability for speed, avoiding the delay of resending dropped packets", isCorrect: true },
        { text: "It automatically encrypts all traffic", isCorrect: false },
        { text: "It only works on segmented networks", isCorrect: false },
      ]},
      { text: "What is network segmentation?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Dividing a network into smaller, isolated sections rather than one flat, open network", isCorrect: true },
        { text: "Encrypting all traffic between two routers", isCorrect: false },
        { text: "Assigning a MAC address to every device on a network", isCorrect: false },
      ]},
      { text: "In the small business example, what risk exists if guest WiFi, employee workstations, and payment servers are all on one flat network?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A compromised guest device could have a direct path to the payment servers", isCorrect: true },
        { text: "The network would run noticeably faster", isCorrect: false },
        { text: "TCP would stop working correctly", isCorrect: false },
      ]},
      { text: "What broader security concept, introduced in Week 1 without being named, does network segmentation exemplify?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Defense in depth", isCorrect: true },
        { text: "The three-way handshake", isCorrect: false },
        { text: "Responsible disclosure", isCorrect: false },
      ]},
      { text: "The OSI Model was developed to help different manufacturers' equipment work together.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "A firewall making decisions based on IP addresses and port numbers is operating using Layer 3 and Layer 4 information.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "TCP/IP is a more complex model with more layers than the full OSI Model.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "With proper network segmentation, compromising one segment automatically exposes every other segment on the network.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "In one or two sentences, explain what network segmentation is and why it improves security.", type: "short_answer", points: 1, explanation: "Network segmentation divides a network into smaller isolated sections so that if an attacker compromises one segment, the damage is contained rather than spreading to the entire network.", answers: [] },
      { text: "In one or two sentences, explain the difference between how TCP and UDP handle data delivery.", type: "short_answer", points: 1, explanation: "TCP guarantees reliable, ordered delivery by resending lost data via a handshake-based connection, while UDP sends data without that reliability in exchange for greater speed.", answers: [] },
    ],
  },
  {
    weekNumber: 4,
    moduleTitle: "Firewalls, IDS/IPS & VPNs",
    moduleDescription: "Firewalls, IDS/IPS, VPNs, and network monitoring with Wireshark.",
    lessons: [
      {
        title: "Firewalls and IDS/IPS",
        content: "Packet-filtering, stateful, and next-generation firewalls, plus how intrusion detection and prevention systems respond to malicious traffic.",
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "VPNs and Network Monitoring",
        content: "How VPNs encrypt traffic between locations, and how Wireshark gives visibility into real network traffic.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Firewall Rule Documentation",
    assignmentDescription:
      "Document a set of firewall rules for a sample network, applying the default-deny principle to specify exactly which traffic is permitted and why.",
    fileRequired: true,
    quizQuestions: [
      { text: "What is a firewall, fundamentally, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A checkpoint between two networks that decides what traffic is allowed to pass", isCorrect: true },
        { text: "A tool that only encrypts outbound email traffic", isCorrect: false },
        { text: "A database of known attack signatures", isCorrect: false },
      ]},
      { text: "What information does a basic packet-filtering firewall use to make its decisions?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Source IP, destination IP, and port number", isCorrect: true },
        { text: "The full content and context of every conversation", isCorrect: false },
        { text: "MAC addresses only", isCorrect: false },
      ]},
      { text: "What is the \"golden principle\" for writing firewall rules, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Default deny: block everything except the minimum needed", isCorrect: true },
        { text: "Default allow: open everything and restrict only after an incident", isCorrect: false },
        { text: "Alternate allow and deny rules evenly", isCorrect: false },
      ]},
      { text: "What distinguishes a stateful firewall from a basic packet-filtering firewall?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It tracks the state of an entire conversation rather than looking at each packet in isolation", isCorrect: true },
        { text: "It only operates at the physical layer", isCorrect: false },
        { text: "It cannot block any traffic automatically", isCorrect: false },
      ]},
      { text: "What does a next-generation firewall add beyond a stateful firewall?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Inspection of the actual content of traffic, often integrated with IDS", isCorrect: true },
        { text: "The ability to route traffic between continents faster", isCorrect: false },
        { text: "Removal of the need for any firewall rules", isCorrect: false },
      ]},
      { text: "What is the key difference between an IDS and an IPS?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "An IPS can actively block malicious traffic in real time, while an IDS only detects and alerts", isCorrect: true },
        { text: "An IDS actively blocks traffic while an IPS only alerts", isCorrect: false },
        { text: "They are two names for exactly the same technology", isCorrect: false },
      ]},
      { text: "Which detection approach compares traffic against a database of known attack patterns?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Signature-based detection", isCorrect: true },
        { text: "Anomaly-based detection", isCorrect: false },
        { text: "Default-deny detection", isCorrect: false },
      ]},
      { text: "Which detection approach builds a baseline of \"normal\" traffic and flags significant deviations from it?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Anomaly-based detection", isCorrect: true },
        { text: "Signature-based detection", isCorrect: false },
        { text: "Packet-filtering detection", isCorrect: false },
      ]},
      { text: "What is a noted downside of anomaly-based detection, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It tends to generate more false alarms", isCorrect: true },
        { text: "It cannot detect any attacks at all", isCorrect: false },
        { text: "It only works on encrypted traffic", isCorrect: false },
      ]},
      { text: "What does a VPN create between two points over an untrusted network?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "An encrypted tunnel", isCorrect: true },
        { text: "A new physical network segment", isCorrect: false },
        { text: "A signature database", isCorrect: false },
      ]},
      { text: "Which VPN protocol operates at the network layer and is commonly used for site-to-site connections?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "IPsec", isCorrect: true },
        { text: "SSL/TLS", isCorrect: false },
        { text: "ARP", isCorrect: false },
      ]},
      { text: "According to the lecture, what does a VPN NOT protect?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The security of either endpoint itself", isCorrect: true },
        { text: "Data while it travels between two points", isCorrect: false },
        { text: "Traffic sent over the public internet", isCorrect: false },
      ]},
      { text: "What kind of tool is Wireshark?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A packet analyzer that captures and inspects network traffic", isCorrect: true },
        { text: "A next-generation firewall", isCorrect: false },
        { text: "A VPN client", isCorrect: false },
      ]},
      { text: "According to the lecture, what is the real skill being built when learning to use Wireshark?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Filtering effectively and recognizing what normal traffic looks like", isCorrect: true },
        { text: "Memorizing every possible packet type", isCorrect: false },
        { text: "Writing firewall rules directly inside the tool", isCorrect: false },
      ]},
      { text: "On a firewall, port 443 is the standard port for regular secure web traffic.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "An IDS can actively block traffic in real time once it detects something malicious.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "A poorly tuned IPS can accidentally block legitimate traffic.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "SSL/TLS VPNs are often easier to deploy for remote user access since they can work through a standard web browser.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In one or two sentences, explain the difference between an IDS and an IPS.", type: "short_answer", points: 1, explanation: "An IDS passively monitors traffic and alerts on suspicious activity without blocking it, while an IPS actively blocks malicious traffic in real time once detected.", answers: [] },
      { text: "In one or two sentences, explain why a VPN alone isn't sufficient security if an employee's laptop is already infected with malware.", type: "short_answer", points: 1, explanation: "A VPN only encrypts data in transit between two points; it does not protect the endpoint itself, so an infected laptop's malware simply gets an encrypted tunnel straight into the internal network.", answers: [] },
    ],
  },
  {
    weekNumber: 5,
    moduleTitle: "Ethical Hacking Foundations",
    moduleDescription: "Ethical hacking mindset, penetration testing frameworks, and reconnaissance techniques.",
    lessons: [
      {
        title: "Hacker vs. Ethical Hacker",
        content: "The legal and ethical distinctions between black hat, white hat, and grey hat hacking, and why authorization is everything.",
        order: 1,
        durationMinutes: 25,
      },
      {
        title: "Pentest Frameworks and Reconnaissance",
        content: "The NIST, OWASP, and PTES penetration testing frameworks, and the difference between passive and active reconnaissance.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Penetration Testing Framework Comparison",
    assignmentDescription:
      "Research and compare the NIST, OWASP, and PTES penetration testing frameworks, and explain when an organization might prefer one over another.",
    fileRequired: false,
    quizQuestions: [
      { text: "What is the one factor that determines whether hacking is legal and ethical versus malicious, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Authorization", isCorrect: true },
        { text: "The specific tool used", isCorrect: false },
        { text: "The hacker's level of technical skill", isCorrect: false },
      ]},
      { text: "What is a \"black hat\" hacker?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Someone who breaks into systems without authorization for personal gain or malicious intent", isCorrect: true },
        { text: "Someone who tests systems only with explicit written authorization", isCorrect: false },
        { text: "A penetration tester employed by a security firm", isCorrect: false },
      ]},
      { text: "What is a \"white hat\" hacker also known as?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "An ethical hacker or penetration tester", isCorrect: true },
        { text: "A grey hat", isCorrect: false },
        { text: "A script kiddie", isCorrect: false },
      ]},
      { text: "What characterizes a \"grey hat\" hacker?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Testing systems without authorization, but without malicious intent", isCorrect: true },
        { text: "Testing systems only under a signed contract", isCorrect: false },
        { text: "Never interacting with any live system", isCorrect: false },
      ]},
      { text: "According to the lecture, is grey hat activity legal?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "No, it's still illegal in most jurisdictions regardless of intent", isCorrect: true },
        { text: "Yes, as long as a vulnerability is reported afterward", isCorrect: false },
        { text: "Yes, it is treated identically to white hat activity", isCorrect: false },
      ]},
      { text: "How many phases does the NIST penetration testing framework break testing into?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Four", isCorrect: true },
        { text: "Seven", isCorrect: false },
        { text: "Ten", isCorrect: false },
      ]},
      { text: "Which NIST phase involves actually attempting to exploit identified weaknesses?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Attack", isCorrect: true },
        { text: "Planning", isCorrect: false },
        { text: "Reporting", isCorrect: false },
      ]},
      { text: "What is the OWASP Testing Guide specifically focused on?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Testing web applications", isCorrect: true },
        { text: "Testing physical building security", isCorrect: false },
        { text: "Testing employee phishing awareness only", isCorrect: false },
      ]},
      { text: "How many phases does PTES, the Penetration Testing Execution Standard, define?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Seven", isCorrect: true },
        { text: "Four", isCorrect: false },
        { text: "Three", isCorrect: false },
      ]},
      { text: "Which PTES phase comes immediately before exploitation?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Vulnerability analysis", isCorrect: true },
        { text: "Post-exploitation", isCorrect: false },
        { text: "Reporting", isCorrect: false },
      ]},
      { text: "What is passive reconnaissance?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Gathering information without directly interacting with the target system", isCorrect: true },
        { text: "Sending traffic directly to the target to see what responds", isCorrect: false },
        { text: "Exploiting a vulnerability to gain access", isCorrect: false },
      ]},
      { text: "What is active reconnaissance?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Direct interaction with the target, such as sending network traffic to see what responds", isCorrect: true },
        { text: "Reading a company's public job postings for clues about their technology", isCorrect: false },
        { text: "Reviewing publicly available social media posts", isCorrect: false },
      ]},
      { text: "Why is active reconnaissance riskier than passive reconnaissance, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It's detectable and could trigger a real incident response if not properly authorized and communicated", isCorrect: true },
        { text: "It always damages the target's hardware", isCorrect: false },
        { text: "It is illegal even with full authorization", isCorrect: false },
      ]},
      { text: "What does vulnerability scanning do, beyond simple port scanning?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Checks discovered services against databases of known weaknesses", isCorrect: true },
        { text: "Automatically exploits every open port it finds", isCorrect: false },
        { text: "Writes the final penetration test report", isCorrect: false },
      ]},
      { text: "A \"hacker,\" in the original sense described in the lecture, is a neutral term describing someone with deep technical curiosity.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In this course, students are trained to operate exclusively as white hats, always with explicit authorization.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "According to the lecture, all three penetration testing frameworks discussed put little structure around scoping and reporting, focusing mainly on exploitation.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Passive reconnaissance is essentially invisible to the target because it never directly interacts with target systems.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In one or two sentences, explain why authorization is described as the entire foundation of ethical hacking.", type: "short_answer", points: 1, explanation: "Authorization is what legally and ethically separates a white hat penetration tester from a criminal black hat hacker, even when they use identical technical techniques.", answers: [] },
      { text: "In one or two sentences, explain the difference between passive and active reconnaissance.", type: "short_answer", points: 1, explanation: "Passive reconnaissance gathers information without touching the target system at all, while active reconnaissance directly interacts with the target, which is more revealing but also detectable.", answers: [] },
    ],
  },
  {
    weekNumber: 6,
    moduleTitle: "Pentest Tools & Reporting",
    moduleDescription: "Vulnerability assessment, common pentest tools, and responsible vulnerability reporting.",
    lessons: [
      {
        title: "Vulnerability Assessment and Tools",
        content: "The difference between a vulnerability assessment and a full penetration test, and how Nmap, Metasploit, and Burp Suite are used ethically.",
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "Reporting Vulnerabilities Responsibly",
        content: "What belongs in a professional vulnerability report, and the principle of responsible disclosure.",
        order: 2,
        durationMinutes: 25,
      },
    ],
    assignmentTitle: "Penetration Test Report Template",
    assignmentDescription:
      "Write a sample penetration test report template, including an executive summary, detailed technical findings, CVSS-based severity ratings, and specific remediation guidance.",
    fileRequired: true,
    quizQuestions: [
      { text: "What is the key difference between a vulnerability assessment and a penetration test?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A penetration test actively exploits vulnerabilities to demonstrate real impact, while a vulnerability assessment typically identifies and prioritizes without exploiting", isCorrect: true },
        { text: "A vulnerability assessment always takes longer than a full penetration test", isCorrect: false },
        { text: "They are two names for the exact same process", isCorrect: false },
      ]},
      { text: "What is the first step in a typical vulnerability assessment methodology, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Asset discovery", isCorrect: true },
        { text: "Exploitation", isCorrect: false },
        { text: "Remediation guidance", isCorrect: false },
      ]},
      { text: "Which tool is described as the \"Network Mapper,\" used to discover devices, open ports, and running services?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Nmap", isCorrect: true },
        { text: "Metasploit", isCorrect: false },
        { text: "Burp Suite", isCorrect: false },
      ]},
      { text: "Which tool is a large, organized collection of known exploits used to demonstrate that a vulnerability can actually be exploited?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Metasploit", isCorrect: true },
        { text: "Nmap", isCorrect: false },
        { text: "Nessus", isCorrect: false },
      ]},
      { text: "Which tool works as an intercepting proxy between a browser and the web application being tested?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Burp Suite", isCorrect: true },
        { text: "Metasploit", isCorrect: false },
        { text: "OpenVAS", isCorrect: false },
      ]},
      { text: "What determines whether using tools like Nmap, Metasploit, or Burp Suite is ethical, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Authorization, not the tool itself", isCorrect: true },
        { text: "Whether the tool is free or paid", isCorrect: false },
        { text: "The country the tool was developed in", isCorrect: false },
      ]},
      { text: "What does CVSS stand for?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Common Vulnerability Scoring System", isCorrect: true },
        { text: "Central Vulnerability Security Standard", isCorrect: false },
        { text: "Certified Vulnerability Severity Scale", isCorrect: false },
      ]},
      { text: "What is an \"executive summary\" in a vulnerability report meant to communicate?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Business risk and impact in non-technical language for leadership", isCorrect: true },
        { text: "The exact exploit code used during testing", isCorrect: false },
        { text: "A list of every packet captured during the test", isCorrect: false },
      ]},
      { text: "What is \"responsible disclosure\"?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Privately reporting a vulnerability to the organization first and giving them time to fix it before discussing it publicly", isCorrect: true },
        { text: "Publishing every vulnerability found immediately on social media", isCorrect: false },
        { text: "Reporting a vulnerability only to a competitor of the affected organization", isCorrect: false },
      ]},
      { text: "What do many organizations run to formally encourage and reward responsible vulnerability reporting?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Bug bounty programs", isCorrect: true },
        { text: "Mandatory disclosure lotteries", isCorrect: false },
        { text: "Public vulnerability auctions", isCorrect: false },
      ]},
      { text: "Which tools does this week's practical exercise use to conduct a vulnerability assessment?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Nessus or OpenVAS", isCorrect: true },
        { text: "Metasploit or Wireshark", isCorrect: false },
        { text: "GNS3 or Cisco Packet Tracer", isCorrect: false },
      ]},
      { text: "According to the lecture, how do lighter-weight vulnerability assessments compare to full penetration tests in frequency?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Vulnerability assessments are often run more frequently, while full pentests are reserved for less frequent, deeper engagements", isCorrect: true },
        { text: "They are always run at the exact same frequency", isCorrect: false },
        { text: "Full penetration tests are always run more frequently", isCorrect: false },
      ]},
      { text: "Besides severity rating and technical description, what else should a professional vulnerability report include?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Specific, actionable remediation guidance", isCorrect: true },
        { text: "The personal contact details of the tester's other clients", isCorrect: false },
        { text: "A copy of the organization's entire source code", isCorrect: false },
      ]},
      { text: "What is the third step in the vulnerability assessment methodology described, after asset discovery and vulnerability scanning?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Analysis and prioritization", isCorrect: true },
        { text: "Exploitation", isCorrect: false },
        { text: "Chain of custody documentation", isCorrect: false },
      ]},
      { text: "Nmap, Metasploit, and Burp Suite are inherently illegal tools that only criminals use.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "A vulnerability assessment and a penetration test are always exactly the same thing with no meaningful difference.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Finding a vulnerability is only half the job; being able to clearly communicate what was found is just as important.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Using Metasploit outside of an authorized engagement is a serious criminal offense.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In one or two sentences, explain the difference between Nmap and Metasploit as used in ethical hacking.", type: "short_answer", points: 1, explanation: "Nmap discovers devices, open ports, and running services to reveal that a vulnerability might exist, while Metasploit is used to actually attempt exploiting that vulnerability to demonstrate real-world impact.", answers: [] },
      { text: "In one or two sentences, explain what responsible disclosure means.", type: "short_answer", points: 1, explanation: "Responsible disclosure means privately reporting a discovered vulnerability to the affected organization and giving them reasonable time to fix it before ever discussing it publicly.", answers: [] },
    ],
  },
  {
    weekNumber: 7,
    moduleTitle: "Risk Management Fundamentals",
    moduleDescription: "Risk management frameworks, risk identification, and qualitative vs. quantitative risk assessment.",
    lessons: [
      {
        title: "Risk Management Frameworks",
        content: "Why organizations can't defend against every threat, and how the NIST Risk Management Framework and ISO 27001 bring structure to prioritizing risk.",
        order: 1,
        durationMinutes: 25,
      },
      {
        title: "Identifying and Measuring Risk",
        content: "The threat, vulnerability, and risk formula, and the difference between qualitative and quantitative risk assessment.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Industry Compliance Research",
    assignmentDescription:
      "Research the compliance requirements facing a specific industry of your choosing, such as healthcare, finance, or retail, and document your findings.",
    fileRequired: false,
    quizQuestions: [
      { text: "According to the lecture, why can't organizations defend against every conceivable threat perfectly?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "They have limited time, budget, and attention, so risk management is needed to prioritize effort", isCorrect: true },
        { text: "Regulations forbid organizations from defending against more than one threat at a time", isCorrect: false },
        { text: "Only nation-states are capable of complete defense", isCorrect: false },
      ]},
      { text: "In the small business example, which risk is described as more probable and often easier and cheaper to prevent?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "An employee accidentally emailing a spreadsheet to the wrong person", isCorrect: true },
        { text: "A sophisticated nation-state attacker", isCorrect: false },
        { text: "A zero-day exploit against a custom application", isCorrect: false },
      ]},
      { text: "What does the first step of the NIST Risk Management Framework involve?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Categorizing systems based on the potential impact if they were compromised", isCorrect: true },
        { text: "Immediately authorizing every system for operation", isCorrect: false },
        { text: "Publishing a public bug bounty program", isCorrect: false },
      ]},
      { text: "What is ISO 27001?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "An international standard for an Information Security Management System (ISMS)", isCorrect: true },
        { text: "A U.S. government-only penetration testing framework", isCorrect: false },
        { text: "A vulnerability scanning tool", isCorrect: false },
      ]},
      { text: "What makes ISO 27001 different from the NIST Risk Management Framework, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Organizations can be formally, independently audited and certified against it", isCorrect: true },
        { text: "It has no connection to information security at all", isCorrect: false },
        { text: "It applies only to penetration testing engagements", isCorrect: false },
      ]},
      { text: "What four-step continuous improvement cycle is ISO 27001 built around?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Plan, do, check, act", isCorrect: true },
        { text: "Detect, contain, eradicate, recover", isCorrect: false },
        { text: "Scan, exploit, report, close", isCorrect: false },
      ]},
      { text: "How is a \"threat\" defined in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Any potential danger, such as a hacker, natural disaster, or human error", isCorrect: true },
        { text: "A weakness that could be exploited", isCorrect: false },
        { text: "A dollar figure representing annual financial loss", isCorrect: false },
      ]},
      { text: "How is a \"vulnerability\" defined in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A weakness that a threat could exploit", isCorrect: true },
        { text: "Any potential danger facing an organization", isCorrect: false },
        { text: "A formally certified audit standard", isCorrect: false },
      ]},
      { text: "How is \"risk\" informally expressed as a formula in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Risk equals likelihood multiplied by impact", isCorrect: true },
        { text: "Risk equals threats divided by vulnerabilities", isCorrect: false },
        { text: "Risk equals impact minus likelihood", isCorrect: false },
      ]},
      { text: "What is the first step in the risk identification process described in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Cataloging assets worth protecting", isCorrect: true },
        { text: "Calculating Annualized Loss Expectancy", isCorrect: false },
        { text: "Certifying against ISO 27001", isCorrect: false },
      ]},
      { text: "What characterizes qualitative risk assessment?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Using descriptive categories like low, medium, and high rather than precise numbers", isCorrect: true },
        { text: "Assigning exact financial values to every risk", isCorrect: false },
        { text: "Requiring significantly more data than any other approach", isCorrect: false },
      ]},
      { text: "What characterizes quantitative risk assessment?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Assigning numerical, often financial, values to risk", isCorrect: true },
        { text: "Relying purely on subjective labels like low, medium, and high", isCorrect: false },
        { text: "Skipping likelihood entirely and focusing only on impact", isCorrect: false },
      ]},
      { text: "What does Annualized Loss Expectancy help calculate?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The expected financial damage from a risk per year, based on impact and frequency", isCorrect: true },
        { text: "The exact number of employees affected by a data breach", isCorrect: false },
        { text: "The total number of vulnerabilities found during a scan", isCorrect: false },
      ]},
      { text: "What is a noted weakness of quantitative risk assessment, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It requires significantly more data, time, and expertise, and inaccurate numbers can create false confidence", isCorrect: true },
        { text: "It cannot be used by any organization outside the United States", isCorrect: false },
        { text: "It is always less accurate than qualitative assessment", isCorrect: false },
      ]},
      { text: "A vulnerability with very high potential impact but extremely low likelihood might represent a smaller overall risk than a vulnerability with only moderate impact but very high likelihood.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Qualitative risk assessment is generally faster and more accessible to non-technical stakeholders than quantitative assessment.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Most organizations use only one approach, either purely qualitative or purely quantitative, and never blend the two.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "The NIST Risk Management Framework includes a continuous monitoring step rather than being a one-time process.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In one or two sentences, explain the difference between a threat and a vulnerability, as defined in the lecture.", type: "short_answer", points: 1, explanation: "A threat is any potential danger, like a hacker or human error, while a vulnerability is a specific weakness that a threat could exploit; risk arises when a threat meets a vulnerability.", answers: [] },
      { text: "In one or two sentences, explain the tradeoff between qualitative and quantitative risk assessment.", type: "short_answer", points: 1, explanation: "Qualitative assessment is faster and more accessible using descriptive categories but can feel subjective, while quantitative assessment produces precise financial figures but requires much more data, time, and expertise to do accurately.", answers: [] },
    ],
  },
  {
    weekNumber: 8,
    moduleTitle: "Compliance & Business Continuity",
    moduleDescription: "Compliance frameworks, security auditing, and business continuity and disaster recovery planning.",
    lessons: [
      {
        title: "Compliance Frameworks and Auditing",
        content: "GDPR, HIPAA, and PCI-DSS compliance requirements, and how internal, external, and SOC 2 audits verify that controls are working.",
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "Business Continuity and Disaster Recovery",
        content: "How Business Impact Analysis, RTO, and RPO help an organization keep operating through, and recover from, a disruptive event.",
        order: 2,
        durationMinutes: 25,
      },
    ],
    assignmentTitle: "Business Continuity Plan Outline",
    assignmentDescription:
      "Develop a business continuity plan outline for an organization, including a Business Impact Analysis and clearly defined Recovery Time and Recovery Point Objectives.",
    fileRequired: true,
    quizQuestions: [
      { text: "What does GDPR stand for?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "General Data Protection Regulation", isCorrect: true },
        { text: "Global Digital Privacy Rules", isCorrect: false },
        { text: "Government Data Processing Requirement", isCorrect: false },
      ]},
      { text: "Who must comply with GDPR, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Any organization anywhere that handles personal data belonging to EU citizens", isCorrect: true },
        { text: "Only organizations physically headquartered in the European Union", isCorrect: false },
        { text: "Only government agencies", isCorrect: false },
      ]},
      { text: "What does HIPAA govern?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Protection of health information in the United States", isCorrect: true },
        { text: "Protection of credit card data worldwide", isCorrect: false },
        { text: "Protection of European citizens' personal data", isCorrect: false },
      ]},
      { text: "What is distinctive about PCI-DSS compared to GDPR and HIPAA, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It's not a government law; it's created by the major credit card companies", isCorrect: true },
        { text: "It only applies to hospitals", isCorrect: false },
        { text: "It has no relevance to small or mid-sized businesses", isCorrect: false },
      ]},
      { text: "Who does PCI-DSS apply to?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Any organization that processes, stores, or transmits credit card information", isCorrect: true },
        { text: "Only banks that issue credit cards", isCorrect: false },
        { text: "Only organizations based in the United States", isCorrect: false },
      ]},
      { text: "What is the difference between an internal audit and an external audit?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Internal audits are conducted by an organization's own staff; external audits are conducted by an independent third party", isCorrect: true },
        { text: "Internal audits are always more thorough than external audits", isCorrect: false },
        { text: "External audits are conducted only by government regulators", isCorrect: false },
      ]},
      { text: "What is SOC 2 used to evaluate, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "How service organizations manage data based on security, availability, processing integrity, confidentiality, and privacy", isCorrect: true },
        { text: "Only the physical security of a data center's building", isCorrect: false },
        { text: "Whether an organization has passed a penetration test", isCorrect: false },
      ]},
      { text: "What is Business Continuity Planning (BCP)?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Ensuring an organization can continue operating, perhaps in a reduced way, during and after a disruptive event", isCorrect: true },
        { text: "A plan focused exclusively on restoring IT servers after a disaster", isCorrect: false },
        { text: "A legal requirement that only applies to hospitals", isCorrect: false },
      ]},
      { text: "What is Disaster Recovery (DR) more narrowly focused on, compared to BCP?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Restoring IT systems and data specifically after a disaster", isCorrect: true },
        { text: "Training staff on compliance regulations", isCorrect: false },
        { text: "Negotiating with regulators after a breach", isCorrect: false },
      ]},
      { text: "What does a Business Impact Analysis identify?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Which business functions are most critical and how quickly they need to be restored", isCorrect: true },
        { text: "The exact financial penalty for a GDPR violation", isCorrect: false },
        { text: "Which employees are responsible for a security incident", isCorrect: false },
      ]},
      { text: "What does Recovery Time Objective (RTO) measure?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The maximum acceptable time a system or function can be down before serious business harm occurs", isCorrect: true },
        { text: "The maximum acceptable amount of data loss", isCorrect: false },
        { text: "The total cost of a disaster recovery plan", isCorrect: false },
      ]},
      { text: "What does Recovery Point Objective (RPO) measure?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The maximum acceptable amount of data loss, typically measured in time", isCorrect: true },
        { text: "The maximum acceptable downtime before business harm occurs", isCorrect: false },
        { text: "The number of external audits required per year", isCorrect: false },
      ]},
      { text: "What does RPO directly drive decisions about, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "How frequently backups need to be taken", isCorrect: true },
        { text: "How many employees need security clearance", isCorrect: false },
        { text: "Which compliance framework applies to an organization", isCorrect: false },
      ]},
      { text: "According to the lecture, what separates a plan that works from a plan that only looks good on paper?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Regular testing, such as tabletop exercises", isCorrect: true },
        { text: "Having the longest possible document", isCorrect: false },
        { text: "Never updating the plan once it's written", isCorrect: false },
      ]},
      { text: "Nigeria has its own data protection law that draws heavily on GDPR's principles.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "PCI-DSS is a government-imposed legal requirement rather than an industry-created standard.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "A business continuity plan that has never been tested can still be considered a fully reliable plan.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "SOC 2 reports are often shown by one business to another as proof that their systems and processes meet an acceptable security bar.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In one or two sentences, explain the difference between Recovery Time Objective (RTO) and Recovery Point Objective (RPO).", type: "short_answer", points: 1, explanation: "RTO is the maximum acceptable time a system can be down before serious harm occurs, while RPO is the maximum acceptable amount of data loss, measured in time, which drives how often backups are taken.", answers: [] },
      { text: "In one or two sentences, explain why a business continuity plan that has never been tested is risky.", type: "short_answer", points: 1, explanation: "Untested plans often turn out to have gaps, like incomplete backups or staff who don't know their role, that only surface during an actual crisis when it's too late to fix them calmly.", answers: [] },
    ],
  },
  {
    weekNumber: 9,
    moduleTitle: "The Incident Response Lifecycle",
    moduleDescription: "The incident response lifecycle, security monitoring, and incident classification.",
    lessons: [
      {
        title: "The Six Phases of Incident Response",
        content: "Preparation, detection, containment, eradication, recovery, and post-incident review as the structured lifecycle for handling a security incident.",
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "Monitoring, Alerting, and Prioritization",
        content: "How SIEM systems and careful alert tuning support detection, and how incidents are classified and prioritized by severity.",
        order: 2,
        durationMinutes: 25,
      },
    ],
    assignmentTitle: "Incident Response Playbook: Malware Infection",
    assignmentDescription:
      "Create an incident response playbook for a malware infection scenario, walking through concrete, specific actions for each of the six incident response lifecycle phases.",
    fileRequired: true,
    quizQuestions: [
      { text: "How many phases does the incident response lifecycle have, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Six", isCorrect: true },
        { text: "Four", isCorrect: false },
        { text: "Eight", isCorrect: false },
      ]},
      { text: "What is the first phase of the incident response lifecycle?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Preparation", isCorrect: true },
        { text: "Detection", isCorrect: false },
        { text: "Containment", isCorrect: false },
      ]},
      { text: "What does the Preparation phase include?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A documented incident response plan, a trained team, the right tools and access, backups, and segmentation", isCorrect: true },
        { text: "Only purchasing cyber insurance", isCorrect: false },
        { text: "Writing the post-incident report", isCorrect: false },
      ]},
      { text: "What is the immediate priority once an incident is confirmed, before the underlying problem is necessarily fixed?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Containment", isCorrect: true },
        { text: "Eradication", isCorrect: false },
        { text: "Post-incident review", isCorrect: false },
      ]},
      { text: "What happens during the Eradication phase?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Removing the root cause, such as deleting malware and closing the vulnerability that allowed access", isCorrect: true },
        { text: "Restoring systems to normal operation", isCorrect: false },
        { text: "Documenting who handled the evidence", isCorrect: false },
      ]},
      { text: "What does the Recovery phase involve?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Restoring affected systems to normal operation carefully and gradually, with close monitoring", isCorrect: true },
        { text: "Immediately shutting down the entire network permanently", isCorrect: false },
        { text: "Notifying regulators within 72 hours", isCorrect: false },
      ]},
      { text: "What is the \"lessons learned\" phase, and why is it significant according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It's the post-incident activity phase, and the one organizations most often skip under time pressure", isCorrect: true },
        { text: "It's the first phase, and organizations always skip preparation", isCorrect: false },
        { text: "It's a phase that occurs only during containment", isCorrect: false },
      ]},
      { text: "What is a SIEM system used for?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Collecting and correlating log data across an environment to detect patterns indicating an incident", isCorrect: true },
        { text: "Encrypting files during the eradication phase", isCorrect: false },
        { text: "Writing firewall rules automatically", isCorrect: false },
      ]},
      { text: "What is \"alert fatigue\"?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Becoming desensitized to constant notifications so that a critical alert gets lost among false positives", isCorrect: true },
        { text: "A system that generates too few alerts to be useful", isCorrect: false },
        { text: "A type of malware that disables alerting systems", isCorrect: false },
      ]},
      { text: "What does incident classification typically consider, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The type of incident, such as malware infection, unauthorized access, data breach, or denial of service", isCorrect: true },
        { text: "Only the physical location of the affected office", isCorrect: false },
        { text: "The specific software license used by the organization", isCorrect: false },
      ]},
      { text: "What does incident prioritization consider, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Severity, including how many systems or users are affected and whether sensitive data or business-critical operations are involved", isCorrect: true },
        { text: "Only the day of the week the incident occurred", isCorrect: false },
        { text: "How the attacker was dressed in security camera footage", isCorrect: false },
      ]},
      { text: "What tiered system do many organizations use to prioritize incidents?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Critical, high, medium, low", isCorrect: true },
        { text: "Red, yellow, green only", isCorrect: false },
        { text: "Public, internal, confidential, restricted", isCorrect: false },
      ]},
      { text: "Containment is typically split into which two types, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Short-term and long-term containment", isCorrect: true },
        { text: "Internal and external containment", isCorrect: false },
        { text: "Qualitative and quantitative containment", isCorrect: false },
      ]},
      { text: "What earlier course concept makes containment \"dramatically easier,\" according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Network segmentation", isCorrect: true },
        { text: "Quantitative risk assessment", isCorrect: false },
        { text: "The OWASP Top 10", isCorrect: false },
      ]},
      { text: "The faster detection of an incident happens, the smaller the eventual damage tends to be.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Rushing past the eradication phase to bring systems back online quickly carries no real risk.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "A well-tuned alerting system tries to balance too few alerts against too many alerts.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "All security incidents deserve exactly the same level of urgency and response, regardless of severity.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "In one or two sentences, explain the difference between the containment and eradication phases of incident response.", type: "short_answer", points: 1, explanation: "Containment focuses on immediately stopping an incident from spreading further without necessarily fixing the underlying cause, while eradication actually removes the root cause, such as deleting malware or closing the exploited vulnerability.", answers: [] },
      { text: "In one or two sentences, explain what alert fatigue is and why it's dangerous.", type: "short_answer", points: 1, explanation: "Alert fatigue happens when security teams are desensitized by too many notifications, causing a genuinely critical alert to get buried and missed among the noise of false positives.", answers: [] },
    ],
  },
  {
    weekNumber: 10,
    moduleTitle: "Digital Forensics & Post-Incident Review",
    moduleDescription: "Digital forensics, chain of custody, and post-incident review.",
    lessons: [
      {
        title: "Digital Forensics and Chain of Custody",
        content: "How investigators preserve and analyze digital evidence on forensic copies, and why documented chain of custody keeps that evidence defensible.",
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "Conducting a Post-Incident Review",
        content: "How a blameless post-incident review turns a difficult incident into concrete, actionable organizational learning.",
        order: 2,
        durationMinutes: 20,
      },
    ],
    assignmentTitle: "Incident Report Writing",
    assignmentDescription:
      "Write a complete incident report based on a provided scenario, applying a clear factual timeline and a professional, blameless tone.",
    fileRequired: true,
    quizQuestions: [
      { text: "What is digital forensics defined as in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Collecting, preserving, and analyzing digital evidence to reconstruct exactly what happened in a defensible way", isCorrect: true },
        { text: "Writing firewall rules to block a known attacker's IP address", isCorrect: false },
        { text: "Scanning a network for open ports", isCorrect: false },
      ]},
      { text: "What core forensic principle involves never analyzing the original evidence directly?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Working from a forensic image or copy, never the original", isCorrect: true },
        { text: "Deleting the original as soon as possible", isCorrect: false },
        { text: "Sharing the original evidence with as many people as possible", isCorrect: false },
      ]},
      { text: "What is a \"forensic image\"?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "An exact, bit-for-bit copy of a hard drive or system", isCorrect: true },
        { text: "A photograph taken of the crime scene", isCorrect: false },
        { text: "A summary report written for executives", isCorrect: false },
      ]},
      { text: "What can examining file system metadata reveal, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "An attacker's timeline of activity, such as when files were created, modified, or accessed", isCorrect: true },
        { text: "The exact physical location of the attacker", isCorrect: false },
        { text: "The organization's annual compliance budget", isCorrect: false },
      ]},
      { text: "Why can deleted files often still be recovered, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Deletion often just removes a file's reference in the file system without immediately erasing the underlying data", isCorrect: true },
        { text: "Deleted files are automatically backed up to the cloud", isCorrect: false },
        { text: "Deletion always fails on modern hard drives", isCorrect: false },
      ]},
      { text: "What can analyzing system memory reveal that disappears once a system is powered off?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Running processes and active network connections", isCorrect: true },
        { text: "Historical firewall rule changes", isCorrect: false },
        { text: "The organization's compliance certification status", isCorrect: false },
      ]},
      { text: "What is \"chain of custody\"?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A documented, unbroken record of exactly who has handled a piece of evidence, when, and what they did with it", isCorrect: true },
        { text: "A list of every employee at an organization", isCorrect: false },
        { text: "A technical diagram of a network's segmentation", isCorrect: false },
      ]},
      { text: "What is cryptographic hashing used for in forensics?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Verifying evidence integrity by creating a mathematical fingerprint of the data at collection and rechecking it later", isCorrect: true },
        { text: "Encrypting the report before it's sent to leadership", isCorrect: false },
        { text: "Blocking unauthorized network traffic", isCorrect: false },
      ]},
      { text: "What does it mean if a forensic evidence hash value changes between checks?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The evidence has been altered somehow, accidentally or deliberately", isCorrect: true },
        { text: "The evidence is now more reliable than before", isCorrect: false },
        { text: "Nothing meaningful; hash values change randomly over time", isCorrect: false },
      ]},
      { text: "When should a post-incident review ideally be conducted, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Soon after an incident is fully resolved, while details are fresh but the team isn't still in crisis mode", isCorrect: true },
        { text: "Immediately during active containment, before the incident is resolved", isCorrect: false },
        { text: "Only once a year, regardless of when incidents occurred", isCorrect: false },
      ]},
      { text: "What should a good post-incident review include, besides a factual timeline?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "What worked well, what didn't, and specific concrete action items", isCorrect: true },
        { text: "A list of employees to formally discipline", isCorrect: false },
        { text: "Only the total financial cost of the incident", isCorrect: false },
      ]},
      { text: "What tone does the lecture say an effective post-incident review should have?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Blameless", isCorrect: true },
        { text: "Adversarial", isCorrect: false },
        { text: "Anonymous and unrecorded", isCorrect: false },
      ]},
      { text: "What does punishing employees for reporting or being involved in incidents tend to create, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "An incentive to hide problems rather than surface them quickly", isCorrect: true },
        { text: "A stronger, more transparent security culture", isCorrect: false },
        { text: "Faster detection of future incidents", isCorrect: false },
      ]},
      { text: "What does the lecture say meticulous documentation is, in relation to good security work?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It genuinely is good security work, not separate from it", isCorrect: true },
        { text: "An optional formality that rarely matters in practice", isCorrect: false },
        { text: "Only relevant for compliance auditors, not security teams", isCorrect: false },
      ]},
      { text: "In forensics, all analysis should be conducted directly on the original evidence to save time.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Chain of custody documentation records everyone who has had access to evidence since it was collected.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "A blameless post-incident review focuses on finding a specific individual to blame for the incident.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Post-incident action items should be specific and concrete rather than vague intentions.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In one or two sentences, explain why forensic investigators always work from a copy of evidence rather than the original.", type: "short_answer", points: 1, explanation: "Working on the original risks accidentally altering or destroying critical evidence, so investigators create a bit-for-bit forensic image and perform all analysis on that copy, preserving the original untouched.", answers: [] },
      { text: "In one or two sentences, explain why a blameless post-incident review culture matters.", type: "short_answer", points: 1, explanation: "A blameless culture encourages employees to honestly report incidents and mistakes early, while a culture that punishes people for involvement in incidents incentivizes hiding problems, making future incidents more likely and severe.", answers: [] },
    ],
  },
  {
    weekNumber: 11,
    moduleTitle: "Cloud Service Models & Shared Responsibility",
    moduleDescription: "Cloud service models and the shared responsibility model for cloud security.",
    lessons: [
      {
        title: "IaaS, PaaS, and SaaS",
        content: "The three major cloud service models and how much security responsibility shifts to the customer in each.",
        order: 1,
        durationMinutes: 25,
      },
      {
        title: "The Shared Responsibility Model",
        content: "How security responsibility divides between cloud provider and customer, and the IAM, monitoring, and configuration tools that help customers meet their side.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Cloud Provider Security Comparison",
    assignmentDescription:
      "Compare the security features offered by at least two major cloud providers, paying close attention to how each implements identity and access management.",
    fileRequired: false,
    quizQuestions: [
      { text: "What does IaaS provide, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Virtual servers, storage, and networking, with the customer responsible for everything above that", isCorrect: true },
        { text: "A complete, ready-to-use application with almost nothing for the customer to manage", isCorrect: false },
        { text: "Only physical data center security", isCorrect: false },
      ]},
      { text: "Which examples does the lecture give of IaaS?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Amazon EC2 and Azure Virtual Machines", isCorrect: true },
        { text: "Google Workspace and Microsoft 365", isCorrect: false },
        { text: "Nessus and OpenVAS", isCorrect: false },
      ]},
      { text: "What does PaaS handle for the customer that IaaS does not?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Patching the OS, managing the runtime environment, and scaling infrastructure automatically", isCorrect: true },
        { text: "Writing the customer's application code for them", isCorrect: false },
        { text: "Managing the customer's employee passwords", isCorrect: false },
      ]},
      { text: "What is the customer's main security responsibility in a SaaS model?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Properly configuring the application's security settings and managing who has access", isCorrect: true },
        { text: "Patching the underlying operating system", isCorrect: false },
        { text: "Maintaining the physical servers", isCorrect: false },
      ]},
      { text: "Which examples does the lecture give of SaaS?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Google Workspace, Microsoft 365, or Salesforce", isCorrect: true },
        { text: "Amazon EC2 and Azure Virtual Machines", isCorrect: false },
        { text: "Nmap and Metasploit", isCorrect: false },
      ]},
      { text: "In the shared responsibility model, what is the cloud provider generally responsible for?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Security \"of\" the cloud, such as physical data centers and underlying hardware", isCorrect: true },
        { text: "All customer data stored in every application", isCorrect: false },
        { text: "Every access control decision the customer makes", isCorrect: false },
      ]},
      { text: "In the shared responsibility model, what is the customer generally responsible for?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Security \"in\" the cloud, such as configuration, access management, and data", isCorrect: true },
        { text: "The physical security of the provider's data centers", isCorrect: false },
        { text: "Maintaining the core network infrastructure", isCorrect: false },
      ]},
      { text: "According to the lecture, what are many real-world cloud security incidents actually caused by?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Customer misconfiguration, not provider infrastructure failures", isCorrect: true },
        { text: "Physical break-ins at cloud data centers", isCorrect: false },
        { text: "Provider-side hardware failures exclusively", isCorrect: false },
      ]},
      { text: "What is a commonly cited example of a customer misconfiguration causing a breach, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A storage bucket left publicly accessible when it should have been private", isCorrect: true },
        { text: "A cloud provider losing a customer's physical hard drive", isCorrect: false },
        { text: "A power outage at a data center", isCorrect: false },
      ]},
      { text: "What does IAM stand for?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Identity and Access Management", isCorrect: true },
        { text: "Internal Audit Management", isCorrect: false },
        { text: "Incident Alert Monitoring", isCorrect: false },
      ]},
      { text: "What is the \"least privilege\" principle?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Every user and system should have only the minimum access actually necessary to do their job", isCorrect: true },
        { text: "Every user should be granted full administrative access by default", isCorrect: false },
        { text: "Only the CEO should have any access to cloud systems", isCorrect: false },
      ]},
      { text: "What does the lecture describe as a common, serious mistake related to access management?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Granting broad administrative access for convenience, \"just in case it's needed later\"", isCorrect: true },
        { text: "Granting only the narrow, specific permissions a role actually requires", isCorrect: false },
        { text: "Reviewing access permissions too frequently", isCorrect: false },
      ]},
      { text: "What do tools like AWS CloudTrail and Azure Monitor provide?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Security monitoring and logging services recording activity across the cloud environment", isCorrect: true },
        { text: "Automatic encryption key generation only", isCorrect: false },
        { text: "Physical access control to data centers", isCorrect: false },
      ]},
      { text: "What do cloud configuration assessment tools continuously scan for, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Common security misconfigurations, like publicly exposed storage or missing encryption", isCorrect: true },
        { text: "The physical temperature of data center servers", isCorrect: false },
        { text: "Employee productivity metrics", isCorrect: false },
      ]},
      { text: "In the IaaS model, the customer is responsible for managing the operating system and all software running on the virtual server.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Exactly where the shared responsibility dividing line falls is identical across IaaS, PaaS, and SaaS.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "A cloud provider's infrastructure can be extraordinarily secure while an organization still suffers a serious breach due to its own misconfiguration.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "The least privilege principle recommends granting broad administrative access by default in case it's needed later.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "In one or two sentences, explain the shared responsibility model in cloud security.", type: "short_answer", points: 1, explanation: "The shared responsibility model splits security duties so the cloud provider secures the underlying infrastructure ('of' the cloud) while the customer is responsible for their own configuration, access management, and data ('in' the cloud).", answers: [] },
      { text: "In one or two sentences, explain the principle of least privilege.", type: "short_answer", points: 1, explanation: "Least privilege means every user and system should be granted only the minimum access necessary to perform its job, rather than broad access granted for convenience.", answers: [] },
    ],
  },
  {
    weekNumber: 12,
    moduleTitle: "Data Protection & Capstone Planning",
    moduleDescription: "Data classification, encryption, breach notification, and capstone project planning.",
    lessons: [
      {
        title: "Data Classification and Encryption",
        content: "How tiered data classification determines the right level of protection, and the difference between encryption at rest and in transit.",
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "Breach Notification and Capstone Planning",
        content: "Legal breach notification requirements, and how to scope and connect the capstone security consulting project across the whole course.",
        order: 2,
        durationMinutes: 25,
      },
    ],
    assignmentTitle: "Capstone Project Proposal",
    assignmentDescription:
      "Submit a capstone project proposal scoping a realistic security audit, remediation roadmap, and incident response plan for a mid-sized manufacturing company, for instructor review and approval before full work begins.",
    fileRequired: true,
    quizQuestions: [
      { text: "What is the purpose of data classification, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "To determine the appropriate level of protection for each type of data", isCorrect: true },
        { text: "To decide which employees are allowed to work remotely", isCorrect: false },
        { text: "To calculate Annualized Loss Expectancy", isCorrect: false },
      ]},
      { text: "Which classification tier includes data like marketing materials that can be freely shared with no harm if exposed?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Public", isCorrect: true },
        { text: "Restricted", isCorrect: false },
        { text: "Confidential", isCorrect: false },
      ]},
      { text: "Which classification tier includes data like customer payment details or health records?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Restricted, or highly confidential", isCorrect: true },
        { text: "Public", isCorrect: false },
        { text: "Internal", isCorrect: false },
      ]},
      { text: "What does encryption at rest protect?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Data while it's stored, such as on a hard drive or in a database", isCorrect: true },
        { text: "Data while it's moving between two systems over a network", isCorrect: false },
        { text: "Only data sent over HTTPS", isCorrect: false },
      ]},
      { text: "What does encryption in transit protect?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Data while it's moving between systems, such as over HTTPS or a VPN", isCorrect: true },
        { text: "Data only while it sits unused on a hard drive", isCorrect: false },
        { text: "Only data stored in cloud databases", isCorrect: false },
      ]},
      { text: "According to the lecture, what happens if data is encrypted at rest but transmitted in plain text?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It's still highly vulnerable to interception while traveling over the network", isCorrect: true },
        { text: "It becomes completely secure regardless of how it's transmitted", isCorrect: false },
        { text: "It automatically fails GDPR compliance in every case", isCorrect: false },
      ]},
      { text: "What is \"key management\" in the context of encryption?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Protecting the decryption keys that encryption depends on", isCorrect: true },
        { text: "Choosing which employees get a physical office key", isCorrect: false },
        { text: "Deciding which data classification tier applies to a file", isCorrect: false },
      ]},
      { text: "What does the lecture describe as a common, serious key management mistake?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Storing keys alongside the encrypted data or hardcoding them into application source code", isCorrect: true },
        { text: "Using a dedicated cloud key management service", isCorrect: false },
        { text: "Rotating encryption keys on a regular schedule", isCorrect: false },
      ]},
      { text: "What do most modern data protection regulations, including GDPR, require after a qualifying breach?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Notification to affected individuals and often regulators within a defined time window", isCorrect: true },
        { text: "Immediate termination of the IT department", isCorrect: false },
        { text: "A public apology published within one year", isCorrect: false },
      ]},
      { text: "Within what time window does GDPR generally require breach notification to a regulator?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Seventy-two hours", isCorrect: true },
        { text: "Thirty days", isCorrect: false },
        { text: "One year", isCorrect: false },
      ]},
      { text: "Who does the capstone project ask students to act as?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A security consultant for a mid-sized manufacturing company in Delta State", isCorrect: true },
        { text: "A government regulator auditing a hospital", isCorrect: false },
        { text: "A cloud provider's customer support representative", isCorrect: false },
      ]},
      { text: "What deliverables does the capstone project require, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A security audit report, remediation roadmap, incident response plan, and final presentation", isCorrect: true },
        { text: "Only a single multiple-choice exam", isCorrect: false },
        { text: "A working antivirus software product", isCorrect: false },
      ]},
      { text: "What does this week's assignment require students to do before beginning serious capstone work?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Submit and get their project proposal approved", isCorrect: true },
        { text: "Complete an unrelated vulnerability scan", isCorrect: false },
        { text: "Pass a certification exam", isCorrect: false },
      ]},
      { text: "How does the lecture advise students to treat the capstone project's connection to the past eleven weeks?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "As one connected story rather than twelve separate, disconnected topics", isCorrect: true },
        { text: "As twelve entirely unrelated mini-projects", isCorrect: false },
        { text: "As relevant only to Module 6, ignoring earlier modules", isCorrect: false },
      ]},
      { text: "Encrypting every piece of public marketing material with the same rigor as customer payment data is an efficient use of resources.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "A genuinely secure system needs both encryption at rest and encryption in transit.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Storing decryption keys alongside the encrypted data they protect is a recommended best practice.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "GDPR's 72-hour notification requirement is measured from when the organization becomes aware of a qualifying breach.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In one or two sentences, explain the difference between encryption at rest and encryption in transit.", type: "short_answer", points: 1, explanation: "Encryption at rest protects data while it's stored, like on a hard drive or in a database, while encryption in transit protects data while it's moving between systems, like over HTTPS or a VPN.", answers: [] },
      { text: "In one or two sentences, explain why the capstone project should be treated as one connected story rather than twelve separate topics.", type: "short_answer", points: 1, explanation: "Because each module's work feeds the next — audit findings drive the remediation roadmap, risk assessment justifies prioritization, and the incident response plan builds on the lifecycle from Module 5 — treating them as connected produces a coherent, realistic consulting deliverable rather than disjointed pieces.", answers: [] },
    ],
  },
];
