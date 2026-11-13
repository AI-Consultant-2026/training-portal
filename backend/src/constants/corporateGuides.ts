// Corporate guides (2026-11-09): a content cluster for employers searching for AI and
// cybersecurity training for their workforce in Nigeria, South Africa, Kenya and Ghana.
// Hub at /corporate-guides, one page per guide at /corporate-guides/<slug>, rendered by
// views/corporateGuides.ts. Country guides name one country's law, levy or market; the rest
// are general. Keep claims about the law general and point readers to the regulator: these
// pages are guidance, not legal advice. Never promise accreditation, levy approval or a
// reimbursement that Paleon Training cannot give.

import { CountryCode } from "./countries";

export type GuideCategory = "data-protection" | "awareness" | "funding" | "threats" | "ai" | "sector" | "buyer";
export type ProgrammeKey = "cybersecure-workforce" | "ai-workflow" | "ai-cyber-accelerator";

export const GUIDE_CATEGORIES: { key: GuideCategory; name: string; intro: string }[] = [
  { key: "data-protection", name: "Data protection training by country", intro: "What each country's data protection law expects of employers, and how to train the staff who handle personal data." },
  { key: "awareness", name: "Cybersecurity awareness training by country", intro: "What employers in each market are up against, and what good staff training looks like there." },
  { key: "funding", name: "Paying for staff training: levies and reimbursement", intro: "How the training levies in Nigeria, South Africa and Kenya work, and what they can and cannot cover." },
  { key: "threats", name: "The threats your staff face", intro: "The people-focused attacks behind most losses, and the habits that stop them." },
  { key: "ai", name: "AI training for your workforce", intro: "Helping employees and managers use AI tools productively and safely." },
  { key: "sector", name: "Training by sector", intro: "AI and cybersecurity priorities for banks, energy, telecoms, NGOs and government." },
  { key: "buyer", name: "Choosing a training provider", intro: "Questions to ask before you buy corporate training." },
];

export interface GuideFaq {
  q: string;
  a: string;
}

export interface Guide {
  slug: string;
  country: CountryCode | null;
  category: GuideCategory;
  /** The <title>, about 60 characters. */
  title: string;
  h1: string;
  /** Meta description, about 150 characters. */
  description: string;
  /** The hero paragraph. */
  lead: string;
  /** Paragraphs; a paragraph starting "- " is a list, one item per line. */
  sections: { h: string; body: string[] }[];
  faqs: GuideFaq[];
  programmes: ProgrammeKey[];
  related: string[];
}

const NOT_ACCREDITED =
  "Paleon Training issues its own certificate of completion. Our programmes are not accredited qualifications and do not carry credits on any national qualifications framework.";

export const GUIDES: Guide[] = [
  // ---------------------------------------------------------------- data protection
  {
    slug: "popia-training-for-staff-south-africa",
    country: "ZA",
    category: "data-protection",
    title: "POPIA Training for Staff: A Guide for South African Employers",
    h1: "POPIA training for staff: what South African employers need to know",
    description:
      "What POPIA expects of employers, why staff awareness training matters to the Information Officer, and what effective POPIA training for employees covers.",
    lead: "The Protection of Personal Information Act (POPIA) makes every organisation that handles personal information responsible for keeping it secure. Most breaches start with a person, so training your staff is one of the most practical ways to meet that duty.",
    sections: [
      {
        h: "What POPIA asks of employers",
        body: [
          "POPIA (Act 4 of 2013) has applied in full since 1 July 2021, after a one-year grace period. It sets eight conditions for lawful processing of personal information: accountability, processing limitation, purpose specification, further processing limitation, information quality, openness, security safeguards and data subject participation.",
          "The security safeguards condition requires a responsible party to secure the integrity and confidentiality of personal information through appropriate, reasonable technical and organisational measures. If personal information is accessed or acquired by an unauthorised person, the organisation must notify the Information Regulator and, in most cases, the people affected, as soon as reasonably possible.",
        ],
      },
      {
        h: "Why staff training is part of compliance",
        body: [
          "Technical controls cannot stop an employee from emailing a spreadsheet to the wrong person, approving a fake payment or handing a password to a convincing caller. Organisational measures, including clear rules and trained people, are the other half of the security safeguards condition.",
          "The regulations under POPIA also list duties for the Information Officer, who by default is the head of the organisation. They include developing a compliance framework and making sure internal awareness sessions are conducted on the Act. Regular, recorded staff training is how most organisations show that duty is being met.",
        ],
      },
      {
        h: "What effective POPIA training for employees covers",
        body: [
          "- What counts as personal information and special personal information, with examples from your own business\n- The eight conditions in plain language, and what they mean for everyday tasks\n- Safe handling: sharing, storing, printing, retention and disposal\n- Recognising phishing, impersonation and payment fraud, the most common routes to a breach\n- What to do, and who to tell, when something goes wrong\n- Using AI tools without putting personal information into them",
        ],
      },
      {
        h: "Who needs it, and how often",
        body: [
          "Everyone who handles personal information needs the basics, which in most organisations is nearly everyone. HR, finance, sales, customer service and IT teams need more depth because they handle the most sensitive records. Senior managers need enough to make decisions and to own the risk.",
          "Annual refresher training is a sensible minimum, with shorter updates when procedures change or after an incident. Keep attendance records: they are your evidence if the Information Regulator ever asks what you did to protect personal information.",
        ],
      },
      {
        h: "The cost of getting it wrong",
        body: [
          "POPIA allows administrative fines of up to R10 million and, for the most serious offences, imprisonment. Beyond the penalties, a breach brings investigation costs, disruption and damage to customer trust that usually cost far more than prevention.",
        ],
      },
    ],
    faqs: [
      { q: "Is POPIA training mandatory?", a: "POPIA does not prescribe a specific course, but it requires reasonable organisational measures to protect personal information, and the Information Officer's duties include ensuring awareness sessions are conducted. In practice, documented staff training is expected." },
      { q: "Who is the Information Officer?", a: "By default it is the head of the organisation, such as the CEO or managing director. The duties can be delegated to deputy information officers, but accountability remains with the organisation." },
      { q: "Can POPIA training be delivered online?", a: "Yes. Paleon Training's training is online, per learner or in a private company portal: staff in different offices study the same self-paced course for your organisation, at times that suit them." },
      { q: "Is this guide legal advice?", a: "No. It is general guidance, not legal advice. For your organisation's specific obligations, take advice from a qualified adviser or see the Information Regulator's guidance." },
    ],
    programmes: ["cybersecure-workforce", "ai-workflow"],
    related: ["cybersecurity-awareness-training-south-africa", "skills-development-levy-training-south-africa", "phishing-awareness-training-for-employees"],
  },
  {
    slug: "kenya-data-protection-act-staff-training",
    country: "KE",
    category: "data-protection",
    title: "Kenya Data Protection Act: Staff Training Guide for Employers",
    h1: "Kenya's Data Protection Act, 2019: a staff training guide for employers",
    description:
      "What Kenya's Data Protection Act 2019 expects of employers, the 72-hour breach rule, ODPC penalties, and what data protection training for staff should cover.",
    lead: "Kenya's Data Protection Act, 2019 holds every data controller and data processor responsible for protecting personal data. The Office of the Data Protection Commissioner (ODPC) enforces it, and has already issued penalty notices against organisations.",
    sections: [
      {
        h: "What the Act asks of employers",
        body: [
          "The Act sets out principles for processing personal data lawfully, fairly and transparently, for specified purposes, and keeping it secure. Organisations must build data protection into their systems and processes by design and by default, and many data controllers and processors must register with the ODPC.",
          "When a breach creates a real risk of harm, the data controller must notify the Data Commissioner within 72 hours of becoming aware of it, and tell the people affected as soon as practicable. That timescale is only achievable if staff recognise a breach and report it straight away.",
        ],
      },
      {
        h: "Penalties and enforcement",
        body: [
          "The Data Commissioner can issue administrative fines of up to KES 5 million or 1 per cent of the previous year's annual turnover, whichever is lower, and compensation can be ordered for people harmed. The ODPC has issued penalty notices in sectors including digital lending, education and hospitality, so enforcement is real.",
        ],
      },
      {
        h: "Why staff training matters",
        body: [
          "Many data protection failures are everyday mistakes: personal data sent to the wrong recipient, customer lists shared on personal WhatsApp groups, documents left on shared drives, or a login handed to a fraudster. Training is how you turn your policies into habits.",
          "It also gives you evidence. If the ODPC investigates, records of who was trained, when and on what show the organisational measures you had in place.",
        ],
      },
      {
        h: "What the training should cover",
        body: [
          "- The data protection principles in plain language, with examples from your sector\n- Lawful bases, consent and the rights of data subjects, including access and erasure requests\n- Handling, sharing and retaining personal data safely, including on mobile phones and messaging apps\n- Spotting phishing, SIM-swap and impersonation scams that lead to breaches\n- How to report a suspected breach internally, fast enough to meet the 72-hour rule\n- Rules for using AI tools without exposing personal data",
        ],
      },
      {
        h: "Related law",
        body: [
          "The Computer Misuse and Cybercrimes Act, 2018 criminalises unauthorised access, cyber fraud and related offences, and sector regulators such as the Central Bank of Kenya set their own cybersecurity expectations. Your training should reflect the rules that apply to your sector.",
        ],
      },
    ],
    faqs: [
      { q: "Does the Data Protection Act require staff training?", a: "The Act requires appropriate technical and organisational measures to protect personal data and data protection by design. Staff training is one of the main organisational measures, and records of it help show compliance." },
      { q: "How fast must a breach be reported in Kenya?", a: "Where there is a real risk of harm, the Data Commissioner must be notified within 72 hours of the data controller becoming aware of the breach." },
      { q: "Can you train teams across Nairobi, Mombasa and Kisumu together?", a: "Yes. Training is online, per learner or in a private company portal, so teams in different locations take the same self-paced course for your organisation." },
      { q: "Is this guide legal advice?", a: "No. It is general guidance, not legal advice. See the Office of the Data Protection Commissioner's guidance or take legal advice on your organisation's obligations." },
    ],
    programmes: ["cybersecure-workforce", "ai-workflow"],
    related: ["cybersecurity-awareness-training-kenya", "nita-training-levy-kenya", "phishing-awareness-training-for-employees"],
  },
  {
    slug: "ndpa-data-protection-training-nigeria",
    country: "NG",
    category: "data-protection",
    title: "NDPA Training for Staff: Nigeria Data Protection Act Guide",
    h1: "Nigeria Data Protection Act (NDPA) 2023: a staff training guide for employers",
    description:
      "What the Nigeria Data Protection Act 2023 expects of employers, NDPC fines and the 72-hour breach rule, and what NDPA training for staff should cover.",
    lead: "The Nigeria Data Protection Act 2023 (NDPA) places clear duties on every organisation that processes personal data, and the Nigeria Data Protection Commission (NDPC) is actively enforcing them. Trained staff are your first line of compliance.",
    sections: [
      {
        h: "What the NDPA asks of employers",
        body: [
          "The NDPA established the Nigeria Data Protection Commission and sets principles for processing personal data: lawfully, fairly and transparently, for specified purposes, accurately, for no longer than necessary, and securely. The NDPC's General Application and Implementation Directive (GAID) 2025 explains in more detail how the Act applies in practice.",
          "Data controllers and processors must put in place appropriate technical and organisational measures to protect personal data. Where a breach is likely to put people's rights and freedoms at risk, the NDPC must be told within 72 hours, and the people affected must be told promptly where the risk is high.",
        ],
      },
      {
        h: "Data controllers of major importance",
        body: [
          "Organisations the NDPC classes as data controllers or processors of major importance must register with the Commission, appoint a data protection officer and meet additional obligations. Banks, telecoms operators, insurers, hospitals, schools and large employers are among the organisations most likely to fall into this category.",
        ],
      },
      {
        h: "Fines",
        body: [
          "For a data controller or processor of major importance, the NDPA allows a penalty of up to the higher of ₦10 million or 2 per cent of annual gross revenue in the preceding financial year. For others, it is up to the higher of ₦2 million or 2 per cent. The NDPC has already fined and investigated organisations, including large companies.",
        ],
      },
      {
        h: "What NDPA training for staff should cover",
        body: [
          "- What personal data and sensitive personal data are, with examples from your business\n- The principles of the Act and the rights of data subjects, in plain language\n- Safe handling of customer and staff records, including on WhatsApp, email and shared drives\n- Phishing, BVN and SIM-swap scams, fake payment requests and other routes to a breach\n- How to report a suspected breach fast enough to meet the 72-hour rule\n- Using AI tools without putting personal data into them",
        ],
      },
      {
        h: "Delivery, records and the ITF",
        body: [
          "Paleon Training delivers NDPA-focused cybersecurity training online, per learner or in a private company portal, across Lagos, Abuja, Port Harcourt and the rest of Nigeria. We provide attendance records, which give you evidence of the measures you took and can also support an ITF reimbursement claim.",
        ],
      },
    ],
    faqs: [
      { q: "Is staff training required under the NDPA?", a: "The NDPA requires appropriate technical and organisational measures to protect personal data. Training staff who handle personal data is one of the most important organisational measures, and the NDPC expects organisations to be able to show what they have done." },
      { q: "Does the NDPR 2019 still apply?", a: "The NDPA 2023 is now the main law. The NDPC's GAID 2025 explains how the Act applies; older instruments apply only where they are consistent with the Act. Check current NDPC guidance for your organisation." },
      { q: "Can we have our own private company portal?", a: "Yes. Your organisation gets its own private space in the Paleon portal. Staff join with one sign-up link, and your HR or L&D lead tracks progress from a manager login. It is a private company space in the Paleon portal that only your staff can join, so teams in several locations can all take part. We do not run sessions at your offices." },
      { q: "Is this guide legal advice?", a: "No. It is general guidance, not legal advice. See the NDPC's guidance or take legal advice on your organisation's obligations." },
    ],
    programmes: ["cybersecure-workforce", "ai-workflow"],
    related: ["cybersecurity-awareness-training-nigeria", "itf-reimbursement-staff-training-nigeria", "cybersecurity-training-for-banks-and-fintechs"],
  },
  {
    slug: "ghana-data-protection-cybersecurity-act-training",
    country: "GH",
    category: "data-protection",
    title: "Ghana Data Protection & Cybersecurity Act Staff Training Guide",
    h1: "Ghana's Data Protection Act and Cybersecurity Act: a staff training guide",
    description:
      "What Ghana's Data Protection Act 2012 (Act 843) and Cybersecurity Act 2020 (Act 1038) mean for employers, and what staff training on them should cover.",
    lead: "Two laws shape how organisations in Ghana protect information: the Data Protection Act, 2012 (Act 843) and the Cybersecurity Act, 2020 (Act 1038). Both depend on people doing the right thing every day.",
    sections: [
      {
        h: "The Data Protection Act, 2012 (Act 843)",
        body: [
          "Act 843 established the Data Protection Commission. Data controllers must register with the Commission and keep their registration current, process personal data according to the Act's principles, and take appropriate, reasonable technical and organisational measures to prevent loss of, damage to or unauthorised access to personal data.",
          "Where personal data is accessed or acquired by an unauthorised person, the data controller must notify the Commission and the data subject as soon as reasonably practicable.",
        ],
      },
      {
        h: "The Cybersecurity Act, 2020 (Act 1038)",
        body: [
          "Act 1038 established the Cyber Security Authority (CSA) to regulate cybersecurity in Ghana. It provides for the protection of critical information infrastructure, cybersecurity incident reporting, and the licensing and accreditation of cybersecurity service providers, establishments and professionals.",
          "Organisations in regulated sectors also follow sector rules, such as the Bank of Ghana's Cyber and Information Security Directive for financial institutions.",
        ],
      },
      {
        h: "Why both laws point to staff training",
        body: [
          "Mobile money fraud, fake payment requests, SIM-swap scams and phishing all target people. A trained employee who pauses, checks and reports is the cheapest and most effective control you have, and training records help you show the Commission and regulators the organisational measures you took.",
        ],
      },
      {
        h: "What the training should cover",
        body: [
          "- What personal data is under Act 843, and the principles for handling it\n- Registration, data subject rights and breach notification, in plain language\n- Mobile money, SIM-swap, phishing and impersonation scams common in Ghana\n- Verifying payment requests and changes to bank or wallet details\n- Reporting incidents internally, fast\n- Using AI tools without exposing personal or confidential data",
        ],
      },
      {
        h: "How Paleon Training helps",
        body: [
          "We run online cybersecurity and AI training, per learner or in a private company portal for organisations in Accra, Kumasi, Tema and across Ghana, with attendance records for your files.",
        ],
      },
    ],
    faqs: [
      { q: "Do organisations in Ghana have to register with the Data Protection Commission?", a: "Act 843 requires data controllers to register with the Data Protection Commission. Check the Commission's current guidance on registration and renewal for your organisation." },
      { q: "What does the Cyber Security Authority do?", a: "The CSA regulates cybersecurity under Act 1038, including critical information infrastructure, incident reporting and the licensing of cybersecurity service providers." },
      { q: "Can the training be delivered online for teams across Ghana?", a: "Yes. Training is online, per learner or in a private company portal, so teams in different cities take the same self-paced course for your organisation." },
      { q: "Is this guide legal advice?", a: "No. It is general guidance, not legal advice. See the Data Protection Commission's and Cyber Security Authority's guidance, or take legal advice." },
    ],
    programmes: ["cybersecure-workforce", "ai-workflow"],
    related: ["cybersecurity-awareness-training-ghana", "phishing-awareness-training-for-employees", "invoice-and-payment-fraud-prevention-training"],
  },

  // ---------------------------------------------------------------- awareness by country
  {
    slug: "cybersecurity-awareness-training-nigeria",
    country: "NG",
    category: "awareness",
    title: "Cybersecurity Awareness Training for Employees in Nigeria",
    h1: "Cybersecurity awareness training for employees in Nigeria",
    description:
      "Why Nigerian organisations train staff in cybersecurity, the scams they face, what good awareness training covers, and how to deliver it online.",
    lead: "Most cyber losses in Nigerian organisations start with a person: a convincing email, a fake bank alert, an urgent call from someone posing as the MD. Cybersecurity awareness training turns your employees from the easiest target into an early-warning system.",
    sections: [
      {
        h: "What Nigerian organisations are up against",
        body: [
          "- Business email compromise and fake supplier invoices aimed at finance teams\n- Impersonation of directors on WhatsApp, phone calls and, increasingly, AI-cloned voices\n- Phishing for internet banking, email and payroll logins\n- SIM-swap and BVN-related fraud\n- Ransomware that stops operations\n- Insider mistakes with customer data, now regulated under the NDPA 2023",
        ],
      },
      {
        h: "What good awareness training covers",
        body: [
          "Good training is practical and specific to your business. Staff should leave able to recognise the scams aimed at their role, verify payment requests by a trusted route, protect their accounts with strong passwords and multi-factor authentication, handle personal data safely, and report anything suspicious straight away without fear of blame.",
          "It should also cover safe use of AI tools, because staff are already pasting company information into public chatbots.",
        ],
      },
      {
        h: "Who should be trained",
        body: [
          "Everyone, including directors. Attackers often target senior people and their assistants because they can approve payments. Finance, HR, procurement and customer-facing teams benefit from extra role-specific sessions.",
        ],
      },
      {
        h: "Online, per learner or in a private company portal",
        body: [
          "Paleon Training delivers CyberSecure Workforce online, per learner or in a private company portal, in Lagos, Abuja, Port Harcourt, Warri and across Nigeria: staff study self-paced. The course uses scenarios from your sector and ends with practical actions for each team. There are no live, facilitator-led or hybrid sessions.",
          "We provide attendance records, which help show the organisational measures you took under the NDPA and can support an ITF reimbursement claim.",
        ],
      },
      {
        h: "Measuring whether it worked",
        body: [
          "Track a few simple measures before and after training: how many staff report suspicious messages, how quickly they report, whether payment requests are verified by call-back, and multi-factor authentication coverage. These tell the board far more than completion rates alone.",
        ],
      },
    ],
    faqs: [
      { q: "How long does cybersecurity awareness training take?", a: "It depends on your organisation's size, roles and goals. We agree the format and schedule with you during a free consultation rather than offering a fixed package." },
      { q: "Do you train at our premises in Nigeria?", a: "No. Training is online, per learner or in a private company portal: your staff study self-paced, wherever they work." },
      { q: "Can the training count towards an ITF claim?", a: "Registered employers who contribute to the ITF can use our training records and attendance evidence to support a reimbursement claim. Eligibility and the amount reimbursed are decided by the ITF." },
      { q: "Do staff receive a certificate?", a: NOT_ACCREDITED },
    ],
    programmes: ["cybersecure-workforce", "ai-cyber-accelerator"],
    related: ["ndpa-data-protection-training-nigeria", "itf-reimbursement-staff-training-nigeria", "business-email-compromise-training"],
  },
  {
    slug: "cybersecurity-awareness-training-south-africa",
    country: "ZA",
    category: "awareness",
    title: "Cybersecurity Awareness Training for Employees in South Africa",
    h1: "Cybersecurity awareness training for employees in South Africa",
    description:
      "Why South African organisations train staff in cybersecurity, the attacks they face, how training supports POPIA, and what effective awareness training covers.",
    lead: "South African organisations are regular targets for ransomware, phishing and payment fraud, and POPIA makes protecting personal information a legal duty. Training your people is one of the most effective, and affordable, defences.",
    sections: [
      {
        h: "What South African organisations are up against",
        body: [
          "- Ransomware attacks that encrypt systems and leak data\n- Business email compromise and fake changes to supplier bank details\n- Phishing for Microsoft 365, banking and payroll logins\n- SIM-swap fraud and impersonation of executives, including AI-cloned voices\n- Data breaches that must be reported to the Information Regulator under POPIA",
        ],
      },
      {
        h: "How awareness training supports POPIA",
        body: [
          "POPIA requires reasonable technical and organisational measures to protect personal information, and the Information Officer's duties include ensuring awareness sessions take place. Recorded training shows what your organisation did to meet those duties.",
        ],
      },
      {
        h: "What good awareness training covers",
        body: [
          "- Recognising phishing, smishing, vishing and impersonation\n- Verifying payment requests and bank-detail changes by call-back to a known number\n- Passwords, password managers and multi-factor authentication\n- Handling personal information under POPIA\n- Safe use of AI tools at work\n- Reporting incidents quickly, without blame",
        ],
      },
      {
        h: "Online, per learner or in a private company portal",
        body: [
          "Paleon Training delivers CyberSecure Workforce online, per learner or in a private company portal for companies in Johannesburg, Cape Town, Durban, Pretoria and across South Africa: staff study self-paced, with realistic scenarios rather than click-through slides.",
        ],
      },
      {
        h: "Skills development and B-BBEE",
        body: [
          "Training spend can be included in your Workplace Skills Plan and Annual Training Report. How a programme is recognised for SETA grants or on your B-BBEE scorecard depends on the rules that apply to it, so check with your SETA or verification agency. " + NOT_ACCREDITED,
        ],
      },
    ],
    faqs: [
      { q: "Is cybersecurity awareness training required in South Africa?", a: "POPIA requires reasonable organisational measures to protect personal information, and sector regulators set their own expectations. Staff awareness training is a widely expected part of meeting those duties." },
      { q: "Can you train staff in several provinces at once?", a: "Yes. Training is online, per learner or in a private company portal, so teams in different cities take the same self-paced course for your organisation." },
      { q: "Are your programmes SETA-accredited?", a: NOT_ACCREDITED },
      { q: "How do we start?", a: "Book a free consultation. We discuss your teams, risks and goals and propose a format that fits." },
    ],
    programmes: ["cybersecure-workforce", "ai-cyber-accelerator"],
    related: ["popia-training-for-staff-south-africa", "skills-development-levy-training-south-africa", "deepfake-and-voice-fraud-training-for-executives"],
  },
  {
    slug: "cybersecurity-awareness-training-kenya",
    country: "KE",
    category: "awareness",
    title: "Cybersecurity Awareness Training for Employees in Kenya",
    h1: "Cybersecurity awareness training for employees in Kenya",
    description:
      "Why Kenyan organisations train staff in cybersecurity, the scams they face, how training supports the Data Protection Act 2019, and what it should cover.",
    lead: "Kenya's fast-growing digital economy, from mobile money to online banking, gives criminals plenty of targets. Most attacks on organisations work by fooling an employee, which makes staff awareness training one of your strongest defences.",
    sections: [
      {
        h: "What Kenyan organisations are up against",
        body: [
          "- Phishing and fake login pages for email, banking and payroll systems\n- Fake supplier invoices and requests to change bank or M-Pesa details\n- SIM-swap fraud and impersonation of senior managers\n- Ransomware and data theft\n- Data protection breaches that must be reported to the ODPC within 72 hours where there is a real risk of harm",
        ],
      },
      {
        h: "What good awareness training covers",
        body: [
          "- Spotting phishing emails, SMS and WhatsApp scams\n- Verifying payment and account-change requests through a trusted route\n- Passwords and multi-factor authentication\n- Handling personal data under the Data Protection Act, 2019\n- Safe use of AI tools at work\n- Reporting incidents quickly",
        ],
      },
      {
        h: "Who should be trained",
        body: [
          "All staff need the essentials. Finance, HR, customer service and executive assistants face the most targeted attacks and benefit from role-specific scenarios. Directors need to understand the risks well enough to own them.",
        ],
      },
      {
        h: "Online, per learner or in a private company portal",
        body: [
          "Paleon Training delivers CyberSecure Workforce online, per learner or in a private company portal for organisations in Nairobi, Mombasa, Kisumu, Nakuru and across Kenya, with attendance records for your compliance files.",
        ],
      },
    ],
    faqs: [
      { q: "Does training help with Data Protection Act compliance?", a: "Yes. The Act requires appropriate organisational measures to protect personal data, and documented staff training is one of the clearest ways to show them." },
      { q: "Can the training be claimed from NITA?", a: "NITA reimbursement applies to approved training under its own rules. Paleon Training's programmes are not NITA-approved courses, so do not budget on a NITA claim for them. See our guide to the NITA levy for details." },
      { q: "Do staff receive a certificate?", a: NOT_ACCREDITED },
      { q: "How do we start?", a: "Book a free consultation and we will recommend a format for your teams." },
    ],
    programmes: ["cybersecure-workforce", "ai-cyber-accelerator"],
    related: ["kenya-data-protection-act-staff-training", "nita-training-levy-kenya", "phishing-awareness-training-for-employees"],
  },
  {
    slug: "cybersecurity-awareness-training-ghana",
    country: "GH",
    category: "awareness",
    title: "Cybersecurity Awareness Training for Employees in Ghana",
    h1: "Cybersecurity awareness training for employees in Ghana",
    description:
      "Why Ghanaian organisations train staff in cybersecurity, the mobile money and phishing scams they face, the laws involved, and what training should cover.",
    lead: "Mobile money fraud, phishing and fake payment requests cost Ghanaian organisations money and trust every year. Training your staff to recognise and report these attacks is one of the most practical defences you have.",
    sections: [
      {
        h: "What Ghanaian organisations are up against",
        body: [
          "- Mobile money and SIM-swap fraud\n- Phishing for email, banking and payroll logins\n- Fake supplier invoices and requests to change bank or wallet details\n- Impersonation of directors by phone, WhatsApp or AI-cloned voice\n- Data breaches under the Data Protection Act, 2012 (Act 843)",
        ],
      },
      {
        h: "The legal background",
        body: [
          "Act 843 requires reasonable technical and organisational measures to protect personal data, and the Cybersecurity Act, 2020 (Act 1038) created the Cyber Security Authority to regulate cybersecurity. Trained staff, and records of that training, are part of showing you take both seriously.",
        ],
      },
      {
        h: "What good awareness training covers",
        body: [
          "- Recognising scams by email, SMS, WhatsApp and phone\n- Verifying payment requests by call-back to a known number\n- Strong passwords and multi-factor authentication\n- Handling personal data under Act 843\n- Safe use of AI tools\n- Reporting incidents quickly, without blame",
        ],
      },
      {
        h: "Online, per learner or in a private company portal",
        body: [
          "Paleon Training delivers CyberSecure Workforce online, per learner or in a private company portal for organisations in Accra, Kumasi, Tema, Takoradi and across Ghana.",
        ],
      },
    ],
    faqs: [
      { q: "Who should attend cybersecurity awareness training?", a: "Every employee, including directors. Finance, HR and customer-facing staff benefit from extra role-specific scenarios." },
      { q: "Is the training tailored to Ghana?", a: "Yes. Scenarios reflect the scams common in Ghana, such as mobile money and SIM-swap fraud, and the duties under Act 843." },
      { q: "Do staff receive a certificate?", a: NOT_ACCREDITED },
      { q: "How do we start?", a: "Book a free consultation and we will recommend a format for your teams." },
    ],
    programmes: ["cybersecure-workforce", "ai-cyber-accelerator"],
    related: ["ghana-data-protection-cybersecurity-act-training", "invoice-and-payment-fraud-prevention-training", "phishing-awareness-training-for-employees"],
  },

  // ---------------------------------------------------------------- funding
  {
    slug: "itf-reimbursement-staff-training-nigeria",
    country: "NG",
    category: "funding",
    title: "ITF Reimbursement for Staff Training in Nigeria: A Guide",
    h1: "ITF reimbursement for staff training in Nigeria: how employers can recover training costs",
    description:
      "How the Industrial Training Fund (ITF) contribution and reimbursement work for Nigerian employers, and how to keep the training records a claim needs.",
    lead: "Many Nigerian employers already pay into the Industrial Training Fund (ITF) every year. Training your staff, and keeping the right records, can help you recover part of that contribution.",
    sections: [
      {
        h: "Who contributes to the ITF",
        body: [
          "Under the Industrial Training Fund Act, employers with five or more employees, or with fewer employees but an annual turnover of ₦50 million or more, contribute 1 per cent of their annual payroll to the Fund. Check the current rules with the ITF for your organisation.",
        ],
      },
      {
        h: "How reimbursement works",
        body: [
          "Employers who have paid their contribution and trained their staff can apply to the ITF for a reimbursement of part of it. The ITF sets the conditions, assesses the claim and decides the amount, which is widely quoted as up to 50 per cent of the contribution for compliant employers.",
          "The ITF expects evidence that training took place: what was taught, who attended and when. Plan your training year with that evidence in mind.",
        ],
      },
      {
        h: "Records to keep",
        body: [
          "- Your training plan for the year\n- Course outlines and objectives\n- Attendance registers with names, dates and hours\n- Invoices and proof of payment\n- Certificates of completion or other evidence of participation",
        ],
      },
      {
        h: "How Paleon Training helps",
        body: [
          "Paleon Training is a Nigerian company. Registered employers who contribute to the ITF can use our training records and attendance evidence to support a reimbursement claim. Eligibility and the amount reimbursed are decided by the ITF, so we cannot guarantee any claim.",
          "We deliver AI and cybersecurity training online, per learner or in a private company portal, anywhere in Nigeria.",
        ],
      },
    ],
    faqs: [
      { q: "Will the ITF reimburse your training?", a: "Registered employers who contribute to the ITF can use our training records and attendance evidence to support a claim. The ITF decides eligibility and the amount; no provider can guarantee it." },
      { q: "What evidence do you provide?", a: "Course outlines, attendance records and certificates of completion for each participant." },
      { q: "Can in-house training count?", a: "In-house and external training can both support a claim if the ITF's conditions are met. Confirm the current conditions with the ITF before you plan." },
      { q: "Is this guide official ITF guidance?", a: "No. It is a general overview, not official guidance. Check the ITF's current rules for your organisation." },
    ],
    programmes: ["cybersecure-workforce", "ai-workflow", "ai-cyber-accelerator"],
    related: ["cybersecurity-awareness-training-nigeria", "ndpa-data-protection-training-nigeria", "how-to-choose-a-corporate-cybersecurity-training-provider"],
  },
  {
    slug: "skills-development-levy-training-south-africa",
    country: "ZA",
    category: "funding",
    title: "Skills Development Levy, SETA & B-BBEE Training: A Guide",
    h1: "Skills Development Levy, SETA grants and B-BBEE: funding staff training in South Africa",
    description:
      "How South Africa's Skills Development Levy, SETA mandatory and discretionary grants and the B-BBEE skills development element relate to AI and cyber training.",
    lead: "South African employers pay a Skills Development Levy and can recover part of it through SETA grants. Training spend can also count on your B-BBEE scorecard. Here is how the system works, and what to check before you buy.",
    sections: [
      {
        h: "The Skills Development Levy",
        body: [
          "Employers whose annual payroll exceeds R500,000 pay a Skills Development Levy of 1 per cent of payroll through SARS. Most of it goes to the Sector Education and Training Authority (SETA) for your industry, and part funds the National Skills Fund.",
        ],
      },
      {
        h: "SETA mandatory and discretionary grants",
        body: [
          "Employers that submit a Workplace Skills Plan (WSP) and Annual Training Report (ATR) to their SETA on time, usually by 30 April, can receive a mandatory grant of 20 per cent of the levy they paid. Your WSP and ATR record the training you plan and the training you delivered, including short courses.",
          "Discretionary grants are separate. SETAs award them for priority programmes, often accredited or occupational ones, under their own criteria.",
        ],
      },
      {
        h: "B-BBEE skills development",
        body: [
          "Skills development spend is an element of the B-BBEE scorecard. Different categories of training are recognised under the Codes in different ways, and limits apply to some of them. Ask your verification agency how a specific programme will be recognised before you count on the points.",
        ],
      },
      {
        h: "Where Paleon Training fits",
        body: [
          NOT_ACCREDITED + " Our programmes are practical workplace training. You can include them in your WSP and ATR, and your verification agency can advise how the spend is recognised for B-BBEE.",
          "We deliver AI and cybersecurity training online, per learner or in a private company portal for organisations across South Africa.",
        ],
      },
    ],
    faqs: [
      { q: "Is your training SETA-accredited?", a: NOT_ACCREDITED },
      { q: "Can we put the training in our Workplace Skills Plan?", a: "Yes. The WSP and ATR record the training you plan and deliver, including short courses. Grant eligibility follows your SETA's rules." },
      { q: "Will the training earn B-BBEE points?", a: "It depends on how the Codes recognise the programme and on your scorecard. Your B-BBEE verification agency can confirm." },
      { q: "Is this guide official guidance?", a: "No. It is a general overview. Check with SARS, your SETA and your verification agency for your organisation." },
    ],
    programmes: ["cybersecure-workforce", "ai-workflow"],
    related: ["cybersecurity-awareness-training-south-africa", "popia-training-for-staff-south-africa", "how-to-choose-a-corporate-cybersecurity-training-provider"],
  },
  {
    slug: "nita-training-levy-kenya",
    country: "KE",
    category: "funding",
    title: "NITA Training Levy in Kenya: What Employers Should Know",
    h1: "The NITA training levy in Kenya: what employers should know before buying training",
    description:
      "How Kenya's National Industrial Training Authority (NITA) levy and reimbursement work, what qualifies, and how to plan AI and cybersecurity training budgets.",
    lead: "Kenyan employers pay a monthly industrial training levy to the National Industrial Training Authority (NITA). Some training can be reimbursed, but only under NITA's rules, so it pays to understand them before you buy.",
    sections: [
      {
        h: "The industrial training levy",
        body: [
          "Under the Industrial Training Act, employers in Kenya pay a training levy to NITA for each employee every month, widely set at KES 50 per employee. NITA uses the levy to fund and regulate industrial training.",
        ],
      },
      {
        h: "Reimbursement",
        body: [
          "Employers who are up to date with the levy can claim reimbursement for some training, within NITA's limits and conditions. Typically the training must be approved by NITA, delivered by a provider NITA recognises, and claimed with the evidence NITA asks for. Check NITA's current rules before you plan on a claim.",
        ],
      },
      {
        h: "Where Paleon Training fits",
        body: [
          "Paleon Training's programmes are not NITA-approved courses, so budget for them without a NITA reimbursement. Many organisations fund cybersecurity and AI training from their IT, risk or compliance budgets because it reduces fraud, breach and regulatory risk.",
          "We deliver AI and cybersecurity training online, per learner or in a private company portal for organisations across Kenya. " + NOT_ACCREDITED,
        ],
      },
      {
        h: "Making the case without a levy claim",
        body: [
          "- One prevented payment fraud usually costs more than a year of awareness training\n- Kenya's Data Protection Act allows fines of up to KES 5 million or 1 per cent of turnover, whichever is lower\n- AI training pays back in time saved on reports, emails and analysis\n- Training records support your compliance and insurance conversations",
        ],
      },
    ],
    faqs: [
      { q: "Can we claim your training from NITA?", a: "No. Paleon Training's programmes are not NITA-approved courses, so plan your budget without a NITA reimbursement." },
      { q: "How much is the NITA levy?", a: "It is widely set at KES 50 per employee per month. Check NITA's current rules for your organisation." },
      { q: "Do staff receive a certificate?", a: NOT_ACCREDITED },
      { q: "Is this guide official NITA guidance?", a: "No. It is a general overview. Check NITA's current rules." },
    ],
    programmes: ["cybersecure-workforce", "ai-workflow"],
    related: ["cybersecurity-awareness-training-kenya", "kenya-data-protection-act-staff-training", "how-to-choose-a-corporate-cybersecurity-training-provider"],
  },

  // ---------------------------------------------------------------- threats
  {
    slug: "business-email-compromise-training",
    country: null,
    category: "threats",
    title: "Business Email Compromise Training for Staff and Finance Teams",
    h1: "Business email compromise (BEC) training for staff and finance teams",
    description:
      "How business email compromise works, why finance and executive teams are targeted, and the training and controls that stop BEC losses in African organisations.",
    lead: "Business email compromise (BEC) is one of the costliest frauds organisations face. It needs no malware, just a convincing email and an employee who acts on it. The defence is a trained team and a simple, strict process.",
    sections: [
      {
        h: "How BEC works",
        body: [
          "The attacker either takes over a real email account, often through phishing, or creates a look-alike address. They then study how the organisation works and send a well-timed request: pay this invoice, update a supplier's bank details, send staff payroll data, or make an urgent, confidential transfer for the CEO.",
          "Because the email looks normal and often continues a real conversation, technical filters frequently miss it. The person reading it is the last control.",
        ],
      },
      {
        h: "Who is targeted",
        body: [
          "- Finance and accounts payable teams\n- Executives and their personal assistants\n- Procurement and supplier management\n- HR and payroll\n- Anyone who can change bank details in a system",
        ],
      },
      {
        h: "The controls that stop it",
        body: [
          "- Verify every bank-detail change and unusual payment by calling a known number, never one in the email\n- Require two people to approve payments above a set amount\n- Turn on multi-factor authentication for all email accounts\n- Flag external emails and look-alike domains\n- Make it safe to challenge a request that appears to come from a senior person",
        ],
      },
      {
        h: "What BEC training should include",
        body: [
          "Training should use real examples of BEC emails, walk teams through your verification rule until it is a habit, and practise saying no to pressure. Executives need to be trained too, so they support staff who challenge requests made in their name.",
        ],
      },
    ],
    faqs: [
      { q: "Is BEC only an email problem?", a: "No. The same scam now arrives by WhatsApp, SMS and phone, sometimes with an AI-cloned voice. Training should cover every channel." },
      { q: "What is the single most important control?", a: "Verifying every bank-detail change and unusual payment request by calling a known number, never one supplied in the message." },
      { q: "Do you run BEC training in our country?", a: "Yes. Paleon Training runs it in Nigeria, South Africa, Kenya and Ghana as part of CyberSecure Workforce." },
      { q: "Can finance teams get dedicated training?", a: "Yes. Finance, procurement and executive assistants can take role-specific online modules." },
    ],
    programmes: ["cybersecure-workforce"],
    related: ["invoice-and-payment-fraud-prevention-training", "deepfake-and-voice-fraud-training-for-executives", "phishing-awareness-training-for-employees"],
  },
  {
    slug: "phishing-awareness-training-for-employees",
    country: null,
    category: "threats",
    title: "Phishing Awareness Training for Employees: What Works",
    h1: "Phishing awareness training for employees: what actually works",
    description:
      "Why phishing still works, the signs staff should spot, how to build a reporting culture, and what effective phishing awareness training for employees includes.",
    lead: "Phishing is still the most common way attackers get into organisations. Effective training doesn't try to make staff paranoid. It teaches them a few reliable checks and makes reporting quick and blame-free.",
    sections: [
      {
        h: "Why phishing still works",
        body: [
          "Phishing messages exploit urgency, authority and curiosity: an overdue invoice, a message from the MD, a parcel delivery, a password expiry. AI tools now let attackers write fluent, personalised messages in any language, so spelling mistakes are no longer a reliable sign.",
        ],
      },
      {
        h: "The signs staff should check",
        body: [
          "- Unexpected requests, especially for money, logins or data\n- Pressure to act fast or keep it confidential\n- A sender address or link that does not match the organisation it claims to be\n- Attachments or links you were not expecting\n- Requests to move the conversation to WhatsApp or a personal email",
        ],
      },
      {
        h: "Building a reporting culture",
        body: [
          "The goal is not zero clicks; it is fast reporting. One early report can protect everyone else who received the same message. Make reporting a single click or message, thank people who report, and never punish someone for reporting their own mistake.",
        ],
      },
      {
        h: "What effective training includes",
        body: [
          "- Real examples from your sector and country\n- Practice spotting phishing by email, SMS, WhatsApp and phone\n- Your reporting process, rehearsed\n- Multi-factor authentication and why it matters\n- Short, regular refreshers rather than one long annual session",
        ],
      },
    ],
    faqs: [
      { q: "Should we run phishing simulations?", a: "Simulations can help measure progress, but they work best alongside good training and a positive reporting culture, not as a way to catch people out." },
      { q: "How often should staff be trained?", a: "At least once a year, with short refreshers when new scams appear or after an incident." },
      { q: "Is phishing training enough on its own?", a: "No. Pair it with multi-factor authentication, payment verification rules and a clear incident process." },
      { q: "Where do you deliver training?", a: "Nigeria, South Africa, Kenya and Ghana, online, per learner or in a private company portal: staff learn self-paced. We do not run live, facilitator-led or hybrid sessions." },
    ],
    programmes: ["cybersecure-workforce"],
    related: ["business-email-compromise-training", "cybersecurity-awareness-training-nigeria", "cybersecurity-awareness-training-south-africa"],
  },
  {
    slug: "invoice-and-payment-fraud-prevention-training",
    country: null,
    category: "threats",
    title: "Invoice & Payment Fraud Prevention Training for Finance Teams",
    h1: "Invoice and payment fraud prevention training for finance teams",
    description:
      "How fake invoices, bank-detail changes and urgent payment scams work, and the verification habits and training that protect finance teams from payment fraud.",
    lead: "A single fake invoice or changed bank account can cost more than a year's training budget. Finance teams are targeted because they can move money, so they need the sharpest habits in the organisation.",
    sections: [
      {
        h: "Common payment fraud scams",
        body: [
          "- A supplier's 'new bank details' arrive by email or letter\n- An invoice that looks genuine but pays into a criminal's account\n- An urgent, confidential transfer requested by someone posing as the CEO\n- Fake payment confirmations and bank alerts\n- Payroll diversion: an 'employee' asks HR to change their salary account",
        ],
      },
      {
        h: "The verification rule",
        body: [
          "Write down one rule and make it non-negotiable: any change to bank details, and any unusual or urgent payment, is confirmed by calling the person or supplier on a number you already hold, never one given in the request. Record who checked and when.",
        ],
      },
      {
        h: "Supporting controls",
        body: [
          "- Two-person approval above an agreed amount\n- A cooling-off period for new or changed beneficiaries\n- Multi-factor authentication on email and banking platforms\n- Regular reconciliation and supplier statement checks\n- Leadership backing for staff who delay a payment to verify it",
        ],
      },
      {
        h: "What finance team training covers",
        body: [
          "Training walks the team through real examples, rehearses the verification rule, covers the newest tricks such as AI-cloned voices of executives, and agrees what to do in the first hour after a suspected fraud, when banks can sometimes still recall funds.",
        ],
      },
    ],
    faqs: [
      { q: "What should we do if we've paid a fraudster?", a: "Call your bank immediately to request a recall, report it to the police and your regulator where required, preserve the emails and messages, and check whether accounts were compromised." },
      { q: "Is this covered in your programmes?", a: "Yes. Payment fraud is a core part of CyberSecure Workforce, with role-specific online modules for finance and procurement teams." },
      { q: "Do you train in our country?", a: "We train organisations in Nigeria, South Africa, Kenya and Ghana." },
      { q: "Can directors attend?", a: "Yes, and they should. Staff are more likely to challenge an urgent request when leaders have said they expect it." },
    ],
    programmes: ["cybersecure-workforce"],
    related: ["business-email-compromise-training", "deepfake-and-voice-fraud-training-for-executives", "cybersecurity-training-for-banks-and-fintechs"],
  },
  {
    slug: "deepfake-and-voice-fraud-training-for-executives",
    country: null,
    category: "threats",
    title: "Deepfake & AI Voice Fraud Training for Executives and Staff",
    h1: "Deepfake and AI voice fraud: training for executives and their teams",
    description:
      "How criminals use AI-cloned voices and deepfake video to impersonate executives, and the training and verification steps that protect your organisation.",
    lead: "With a few seconds of audio from a video or a voice note, criminals can clone an executive's voice. Deepfake video calls are next. The defence is not spotting the fake; it is having a verification habit that works even when the fake is perfect.",
    sections: [
      {
        h: "How the scam works",
        body: [
          "Attackers collect voice and video of senior people from interviews, social media and voice notes, then use AI tools to imitate them. A finance officer receives a call or voice note from the 'CEO' asking for an urgent transfer, or joins a video call where the 'directors' approve it.",
        ],
      },
      {
        h: "Why spotting fakes is not enough",
        body: [
          "Quality is improving quickly, and people under pressure do not analyse audio. Training should focus on process: what must always happen before money moves or data is shared, however convincing the request.",
        ],
      },
      {
        h: "Verification steps that work",
        body: [
          "- Call back on a known number before acting on any voice or video instruction to pay or share data\n- Agree a code word or question for urgent executive requests\n- Never approve payments solely on a call, voice note or video\n- Executives commit to never bypassing the process themselves\n- Report the attempt, even if no money moved",
        ],
      },
      {
        h: "Training for leaders",
        body: [
          "Executives are both the faces being cloned and the people whose behaviour sets the rules. A short leadership module covers the threat, their own public exposure, and how to back staff who refuse to act without verification.",
        ],
      },
    ],
    faqs: [
      { q: "Can staff detect AI-cloned voices?", a: "Sometimes, but not reliably. That is why verification by call-back and code words matter more than detection." },
      { q: "Is deepfake fraud happening in Africa?", a: "Impersonation of executives is already common in Nigeria, South Africa, Kenya and Ghana, and AI tools make it more convincing. Training now should assume voice and video can be faked." },
      { q: "Do you cover this in your programmes?", a: "Yes. CyberSecure Workforce covers impersonation and deepfakes, and the AI + Cybersecurity Professional Accelerator goes deeper for those leading secure AI adoption." },
      { q: "Is there training just for the leadership team?", a: "Yes. Short self-paced leadership modules, online and private to your organisation." },
    ],
    programmes: ["cybersecure-workforce", "ai-cyber-accelerator"],
    related: ["business-email-compromise-training", "invoice-and-payment-fraud-prevention-training", "generative-ai-risks-for-business"],
  },

  // ---------------------------------------------------------------- AI
  {
    slug: "chatgpt-training-for-employees",
    country: null,
    category: "ai",
    title: "ChatGPT & AI Tools Training for Employees: A Guide for Employers",
    h1: "ChatGPT and AI tools training for employees: a guide for employers",
    description:
      "Why employers train staff to use ChatGPT, Claude, Gemini and Copilot, what good AI training covers, how to keep data safe, and how to measure the benefit.",
    lead: "Your employees are already using AI tools such as ChatGPT, Claude, Gemini and Copilot, often without guidance. Training them turns scattered experiments into consistent time savings, and keeps your data out of places it should not go.",
    sections: [
      {
        h: "Why train staff rather than leave them to it",
        body: [
          "Self-taught use is uneven. A few people save hours each week while others don't start or use AI in risky ways, such as pasting customer data into a public chatbot or sending AI-written content without checking it. Structured training spreads the good habits and stops the risky ones.",
        ],
      },
      {
        h: "What good AI training covers",
        body: [
          "- What AI tools are good and bad at, including made-up answers\n- Writing clear prompts and giving the tool the right context\n- Everyday tasks: drafting, summarising, analysing data, preparing reports and presentations\n- Redesigning team workflows around AI, not just individual tasks\n- What must never go into an AI tool, and which tools are approved\n- Checking and taking responsibility for AI output",
        ],
      },
      {
        h: "Keeping data safe",
        body: [
          "Pair training with a written AI use policy that lists approved tools and the information that must never be entered: customer and staff personal data, confidential financial information, passwords and trade secrets. Data protection laws in Nigeria, South Africa, Kenya and Ghana all apply to personal data put into AI tools.",
        ],
      },
      {
        h: "Measuring the benefit",
        body: [
          "Pick a few repeated tasks per team, measure how long they take before training, and measure again a month after. Ask teams to share the prompts and workflows that worked so the gains spread.",
        ],
      },
    ],
    faqs: [
      { q: "Which AI tools do you train on?", a: "We teach skills that work across the main assistants, including ChatGPT, Claude, Gemini and Microsoft Copilot, using the tools your organisation has approved." },
      { q: "Do staff need technical skills?", a: "No. The AI Workflow Productivity programme is designed for everyday office roles." },
      { q: "Do you help with an AI policy?", a: "Yes. Our free AI use policy template is a starting point, and the training covers how to apply it." },
      { q: "Where do you deliver AI training?", a: "Nigeria, South Africa, Kenya and Ghana, online, per learner or in a private company portal: staff learn self-paced. We do not run live, facilitator-led or hybrid sessions." },
    ],
    programmes: ["ai-workflow", "ai-cyber-accelerator"],
    related: ["ai-training-for-managers", "microsoft-copilot-training-for-staff", "generative-ai-risks-for-business"],
  },
  {
    slug: "ai-training-for-managers",
    country: null,
    category: "ai",
    title: "AI Training for Managers and Leadership Teams",
    h1: "AI training for managers and leadership teams",
    description:
      "What managers and leadership teams need to know about AI: where it adds value, how to redesign workflows, managing risk, and leading staff through the change.",
    lead: "AI changes how work gets done, and managers decide whether that change happens well. Training for managers focuses less on prompts and more on choosing where AI adds value, redesigning workflows and managing the risks.",
    sections: [
      {
        h: "What managers need that staff training does not cover",
        body: [
          "- Identifying the processes where AI saves the most time or improves quality\n- Redesigning team workflows, roles and handovers around AI\n- Setting quality checks for AI-assisted work\n- Managing data protection, confidentiality and security risks\n- Measuring results and building a business case\n- Leading staff through change and addressing worries about jobs",
        ],
      },
      {
        h: "From experiments to a plan",
        body: [
          "Many organisations have scattered AI experiments and no plan. A practical approach: map a few high-volume processes, test AI on one, measure the result, set the rules, then scale what works. Managers who have done this once can repeat it across the business.",
        ],
      },
      {
        h: "Managing the risks",
        body: [
          "Managers should know which tools are approved, what data must never be entered, how AI output is checked, and who is accountable for it. A written AI use policy and staff training turn those answers into daily practice.",
        ],
      },
      {
        h: "How Paleon Training helps",
        body: [
          "The AI Workflow Productivity & Process Transformation programme helps teams and managers redesign real workflows with AI. The AI + Cybersecurity Professional Accelerator goes further for the people who will lead secure AI adoption.",
        ],
      },
    ],
    faqs: [
      { q: "Is this training for technical managers?", a: "No. It is for managers in any function: operations, finance, HR, sales and customer service." },
      { q: "Can the leadership team go first?", a: "Yes. Leaders can take a free self-paced preview before training is rolled out to staff." },
      { q: "Do you cover AI governance?", a: "Yes, at a practical level: approved tools, data rules, human review and accountability." },
      { q: "Where do you deliver?", a: "Nigeria, South Africa, Kenya and Ghana, online, per learner or in a private company portal: staff learn self-paced. We do not run live, facilitator-led or hybrid sessions." },
    ],
    programmes: ["ai-workflow", "ai-cyber-accelerator"],
    related: ["chatgpt-training-for-employees", "generative-ai-risks-for-business", "how-to-choose-a-corporate-cybersecurity-training-provider"],
  },
  {
    slug: "microsoft-copilot-training-for-staff",
    country: null,
    category: "ai",
    title: "Microsoft Copilot Training for Staff: Getting Value Safely",
    h1: "Microsoft Copilot training for staff: getting real value, safely",
    description:
      "How to get value from Microsoft Copilot across Outlook, Word, Excel, PowerPoint and Teams, the data access risks to manage, and what staff training covers.",
    lead: "Organisations that pay for Microsoft Copilot licences often find few people use them well. Training makes the difference, and it also addresses Copilot's biggest risk: it can surface any file a user has access to.",
    sections: [
      {
        h: "Where Copilot helps most",
        body: [
          "- Outlook: summarising long threads and drafting replies\n- Teams: meeting summaries, actions and catch-ups\n- Word: first drafts and rewriting for different audiences\n- Excel: analysing data and explaining formulas\n- PowerPoint: turning documents into presentations",
        ],
      },
      {
        h: "The data access risk",
        body: [
          "Copilot works with the files, emails and chats each user can already access. If permissions are too broad, such as salary spreadsheets shared with everyone, Copilot can bring that information into answers. Review sharing and permissions before a wide rollout, and train staff to report anything they should not have seen.",
        ],
      },
      {
        h: "What staff training covers",
        body: [
          "- Writing effective prompts in each application\n- Checking and editing Copilot output\n- Workflows that combine email, meetings and documents\n- What not to do: confidential data, unverified figures, sending without review\n- Your AI use policy and how to report problems",
        ],
      },
      {
        h: "How Paleon Training helps",
        body: [
          "Our AI Workflow Productivity programme teaches skills that work in Copilot and other assistants, built around your team's real tasks, with the data protection and security rules that keep it safe.",
        ],
      },
    ],
    faqs: [
      { q: "Do we need Copilot licences for the training?", a: "Not necessarily. We teach skills that apply to whichever approved AI tools your organisation uses, and focus on Copilot where you have it." },
      { q: "Is Copilot safe for confidential data?", a: "Copilot respects existing Microsoft 365 permissions, so the risk depends on how your files are shared. Review permissions and set clear rules before a wide rollout." },
      { q: "Can you train non-technical staff?", a: "Yes. The training is designed for everyday office roles." },
      { q: "Where do you deliver?", a: "Nigeria, South Africa, Kenya and Ghana, online, per learner or in a private company portal: staff learn self-paced. We do not run live, facilitator-led or hybrid sessions." },
    ],
    programmes: ["ai-workflow"],
    related: ["chatgpt-training-for-employees", "ai-training-for-managers", "generative-ai-risks-for-business"],
  },
  {
    slug: "generative-ai-risks-for-business",
    country: null,
    category: "ai",
    title: "Generative AI Risks for Business: Shadow AI, Data Leaks & Fixes",
    h1: "Generative AI risks for business: shadow AI, data leaks and how to manage them",
    description:
      "The main generative AI risks for organisations, from shadow AI and data leakage to made-up answers and AI-powered scams, and how policy and training manage them.",
    lead: "Generative AI brings real productivity gains and real risks. Most of the risks come from how people use it, which means policy and training manage them better than banning it.",
    sections: [
      {
        h: "The main risks",
        body: [
          "- Shadow AI: staff using unapproved tools with personal accounts\n- Data leakage: confidential or personal data pasted into public tools\n- Hallucinations: confident, wrong answers used without checking\n- Copyright and confidentiality issues in AI-generated content\n- AI-powered attacks: fluent phishing, cloned voices and deepfakes\n- Over-reliance: skills and judgement weakening",
        ],
      },
      {
        h: "Why banning AI rarely works",
        body: [
          "Bans push use onto personal phones and accounts, where you have no visibility or control. A better approach is to approve suitable tools, set clear rules and train people to use them well.",
        ],
      },
      {
        h: "A practical risk framework",
        body: [
          "- Approve tools and use company accounts\n- Define the information that must never be entered\n- Require human review of AI output before it is used or sent\n- Name an owner for AI use and review the policy regularly\n- Train every employee, and give managers extra guidance",
        ],
      },
      {
        h: "Data protection law applies",
        body: [
          "Personal data put into an AI tool is still covered by data protection law: the NDPA in Nigeria, POPIA in South Africa, the Data Protection Act, 2019 in Kenya and Act 843 in Ghana. This is general guidance, not legal advice.",
        ],
      },
    ],
    faqs: [
      { q: "What is shadow AI?", a: "Staff using AI tools the organisation has not approved, usually through personal accounts, which means company data may be stored and used outside your control." },
      { q: "Should we ban ChatGPT?", a: "Bans rarely work. Approving suitable tools, setting rules and training staff manages the risk while keeping the benefits." },
      { q: "Do you have a policy template?", a: "Yes, our free AI use policy template covers approved tools, prohibited data, human review and accountability." },
      { q: "Which programme covers AI risk?", a: "AI Workflow Productivity covers safe everyday use; the AI + Cybersecurity Professional Accelerator goes deeper on secure AI adoption." },
    ],
    programmes: ["ai-workflow", "ai-cyber-accelerator"],
    related: ["chatgpt-training-for-employees", "deepfake-and-voice-fraud-training-for-executives", "ai-training-for-managers"],
  },

  // ---------------------------------------------------------------- sectors
  {
    slug: "cybersecurity-training-for-banks-and-fintechs",
    country: null,
    category: "sector",
    title: "Cybersecurity & AI Training for Banks and Fintechs in Africa",
    h1: "Cybersecurity and AI training for banks, fintechs and financial services",
    description:
      "Cybersecurity and AI training priorities for banks, microfinance banks, fintechs and insurers in Nigeria, South Africa, Kenya and Ghana: fraud, regulation and data.",
    lead: "Financial services firms hold money and personal data, which makes them prime targets. Regulators expect strong controls, and fraudsters target staff and customers every day.",
    sections: [
      {
        h: "The threats financial services face",
        body: [
          "- Account takeover, SIM-swap and social engineering of customers and staff\n- Insider fraud and collusion\n- Business email compromise and fake payment instructions\n- Ransomware and attacks on third-party providers\n- Data breaches involving customer records",
        ],
      },
      {
        h: "Regulatory expectations",
        body: [
          "Central banks and financial regulators across our markets, including the Central Bank of Nigeria, the South African Reserve Bank's Prudential Authority, the Central Bank of Kenya and the Bank of Ghana, publish cybersecurity frameworks and directives. They expect governance, risk management, incident response and staff awareness. Check the framework that applies to your institution.",
        ],
      },
      {
        h: "What training should cover",
        body: [
          "- Fraud typologies relevant to your products and channels\n- Verification and escalation rules for payments and account changes\n- Protecting customer data under your country's data protection law\n- Recognising social engineering against staff and customers\n- Safe, approved use of AI in operations and customer service",
        ],
      },
      {
        h: "How Paleon Training helps",
        body: [
          "We run CyberSecure Workforce and AI Workflow Productivity for financial services teams, with scenarios built around banking and fintech operations. In all four countries training is online, per learner or in a private company portal, self-paced.",
        ],
      },
    ],
    faqs: [
      { q: "Does the training meet our regulator's requirements?", a: "Our training supports the staff awareness part of regulatory frameworks. Your risk and compliance team should map it against the specific requirements that apply to you." },
      { q: "Can you tailor scenarios to our products?", a: "Yes. We agree the scenarios with you during the consultation." },
      { q: "Can branch staff join online?", a: "Yes. All training is online and self-paced, so staff in every branch can take part at times that suit them." },
      { q: "Do you cover AI in customer service?", a: "Yes. The AI Workflow Productivity programme covers safe, approved AI use in operations and customer service." },
    ],
    programmes: ["cybersecure-workforce", "ai-workflow", "ai-cyber-accelerator"],
    related: ["invoice-and-payment-fraud-prevention-training", "business-email-compromise-training", "ndpa-data-protection-training-nigeria"],
  },
  {
    slug: "cybersecurity-ai-training-oil-and-gas",
    country: null,
    category: "sector",
    title: "Cybersecurity & AI Training for Oil and Gas Companies",
    h1: "Cybersecurity and AI training for oil and gas and energy companies",
    description:
      "Cybersecurity and AI training priorities for oil and gas, power and energy companies in Africa: operational technology risk, fraud, contractors and safe AI use.",
    lead: "Energy companies combine high-value payments, complex supply chains and operational technology that keeps plants running. Attackers know it, and people are usually the way in.",
    sections: [
      {
        h: "The risks energy companies face",
        body: [
          "- Ransomware that disrupts operations and logistics\n- Fake invoices and bank-detail changes from contractors and suppliers\n- Phishing aimed at engineers, procurement and finance\n- Weak links through contractors with remote access\n- Risks where office IT connects to operational technology (OT) at sites",
        ],
      },
      {
        h: "What staff training should cover",
        body: [
          "- Recognising phishing and impersonation, including by phone and WhatsApp\n- Payment verification for contractor and supplier invoices\n- Safe use of removable media and remote access at sites\n- Reporting incidents quickly, including at remote locations\n- Approved, safe use of AI tools for reports and analysis",
        ],
      },
      {
        h: "AI in energy operations",
        body: [
          "AI tools can speed up reporting, document review, HSE summaries and data analysis. Teams need training to use them productively and to keep confidential technical and commercial data out of public tools.",
        ],
      },
      {
        h: "How Paleon Training helps",
        body: [
          "Paleon Training is based in Warri, at the heart of Nigeria's oil and gas industry. We deliver online, per learner or in a private company portal in Nigeria, South Africa, Kenya and Ghana: staff study self-paced, from the office or the site.",
        ],
      },
    ],
    faqs: [
      { q: "Do you train staff at remote sites?", a: "Yes. Training is online and self-paced, so site staff can study whenever they have a connection." },
      { q: "Do you cover operational technology security?", a: "Our awareness training covers the behaviours that protect OT, such as removable media and remote access. Deep OT engineering security is a specialist field outside our programmes." },
      { q: "Can contractors attend?", a: "Yes. Training key contractors with your staff closes a common gap." },
      { q: "Can the training support an ITF claim in Nigeria?", a: "Registered employers who contribute to the ITF can use our training records to support a reimbursement claim. The ITF decides eligibility and the amount." },
    ],
    programmes: ["cybersecure-workforce", "ai-workflow"],
    related: ["cybersecurity-awareness-training-nigeria", "invoice-and-payment-fraud-prevention-training", "itf-reimbursement-staff-training-nigeria"],
  },
  {
    slug: "cybersecurity-training-for-telecoms",
    country: null,
    category: "sector",
    title: "Cybersecurity & AI Training for Telecoms Companies",
    h1: "Cybersecurity and AI training for telecoms and technology companies",
    description:
      "Cybersecurity and AI training priorities for telecoms operators, ISPs and tech companies in Africa: SIM-swap, insider risk, customer data and AI in operations.",
    lead: "Telecoms operators sit at the centre of digital identity and mobile money. That makes their staff, especially in retail and customer care, a target for criminals who want to take over customers' numbers and accounts.",
    sections: [
      {
        h: "The risks telecoms companies face",
        body: [
          "- SIM-swap fraud through social engineering or insider collusion\n- Large volumes of customer personal data\n- Phishing and account takeover of staff with system access\n- Third-party and dealer network risk\n- Regulatory scrutiny of data protection and customer registration",
        ],
      },
      {
        h: "What staff training should cover",
        body: [
          "- Verification rules for SIM replacement and account changes, and why they must never be bypassed\n- Recognising social engineering in retail and call centres\n- Handling customer personal data under your country's data protection law\n- Insider risk: what to do when asked to break a rule\n- Safe, approved use of AI in customer care",
        ],
      },
      {
        h: "AI in customer operations",
        body: [
          "AI can help agents summarise interactions, draft responses and find answers faster. Training ensures it is used with approved tools and without exposing customer data.",
        ],
      },
      {
        h: "How Paleon Training helps",
        body: [
          "We deliver CyberSecure Workforce and AI Workflow Productivity for telecoms and technology teams, online, per learner or in a private company portal, in Nigeria, South Africa, Kenya and Ghana.",
        ],
      },
    ],
    faqs: [
      { q: "Can you train retail and call-centre staff at scale?", a: "Yes. Training is online and self-paced, so distributed teams and shift workers can study around their shifts." },
      { q: "Do you cover SIM-swap fraud?", a: "Yes. SIM-swap and account takeover scenarios are part of the training for telecoms teams." },
      { q: "Can dealers and partners attend?", a: "Yes. Including partner staff closes a common gap." },
      { q: "Where do you deliver?", a: "Nigeria, South Africa, Kenya and Ghana, online, per learner or in a private company portal: staff learn self-paced. We do not run live, facilitator-led or hybrid sessions." },
    ],
    programmes: ["cybersecure-workforce", "ai-workflow"],
    related: ["phishing-awareness-training-for-employees", "cybersecurity-training-for-banks-and-fintechs", "generative-ai-risks-for-business"],
  },
  {
    slug: "cybersecurity-ai-training-for-ngos",
    country: null,
    category: "sector",
    title: "Cybersecurity & AI Training for NGOs and Charities in Africa",
    h1: "Cybersecurity and AI training for NGOs, charities and development organisations",
    description:
      "Cybersecurity and AI training for NGOs and charities in Nigeria, South Africa, Kenya and Ghana: donor fraud, beneficiary data, field teams and AI on a tight budget.",
    lead: "NGOs handle donor funds and sensitive beneficiary data, often with small IT teams and staff spread across field locations. That combination attracts fraudsters, and donors increasingly ask what you do about it.",
    sections: [
      {
        h: "The risks NGOs face",
        body: [
          "- Fake payment requests and changed bank details from 'partners' or 'suppliers'\n- Impersonation of country directors and donors\n- Sensitive beneficiary data, including health and protection information\n- Shared devices and personal phones in field locations\n- Donor due-diligence questions about cybersecurity and data protection",
        ],
      },
      {
        h: "What staff training should cover",
        body: [
          "- Recognising phishing and impersonation\n- Payment verification for partners, grantees and suppliers\n- Protecting beneficiary data under data protection law\n- Safe use of personal and shared devices\n- Safe use of AI tools for reports and proposals",
        ],
      },
      {
        h: "AI for small teams",
        body: [
          "AI tools can help small teams draft reports and proposals, summarise documents and analyse programme data, if staff know how to use them well and what data to keep out.",
        ],
      },
      {
        h: "How Paleon Training helps",
        body: [
          "Online, self-paced training makes it practical to train head-office and field staff on the same course. We deliver online, per learner or in a private company portal in Nigeria, South Africa, Kenya and Ghana.",
        ],
      },
    ],
    faqs: [
      { q: "Can field staff join?", a: "Yes. Training is online and self-paced, so staff in different locations can all take part." },
      { q: "Does this help with donor due diligence?", a: "Training records give you evidence of the measures you take to protect funds and data, which donors often ask about." },
      { q: "Do you cover beneficiary data protection?", a: "Yes, including the data protection law in your country." },
      { q: "Where do you deliver?", a: "Nigeria, South Africa, Kenya and Ghana, online, per learner or in a private company portal: staff learn self-paced. We do not run live, facilitator-led or hybrid sessions." },
    ],
    programmes: ["cybersecure-workforce", "ai-workflow"],
    related: ["invoice-and-payment-fraud-prevention-training", "chatgpt-training-for-employees", "phishing-awareness-training-for-employees"],
  },
  {
    slug: "cybersecurity-ai-training-for-government",
    country: null,
    category: "sector",
    title: "Cybersecurity & AI Training for Government and Public Sector",
    h1: "Cybersecurity and AI training for government and public sector organisations",
    description:
      "Cybersecurity and AI training for ministries, agencies and state-owned enterprises in Nigeria, South Africa, Kenya and Ghana: citizen data, fraud and AI use.",
    lead: "Public bodies hold citizens' personal data, manage public funds and run services people depend on. Staff awareness is central to protecting all three, and AI offers real gains in service delivery when used safely.",
    sections: [
      {
        h: "The risks public bodies face",
        body: [
          "- Phishing and impersonation of senior officials\n- Payment and procurement fraud\n- Ransomware that disrupts public services\n- Large volumes of citizen personal data\n- Uncontrolled use of public AI tools with official information",
        ],
      },
      {
        h: "What staff training should cover",
        body: [
          "- Recognising phishing and social engineering\n- Verification rules for payments and procurement\n- Protecting citizen data under national data protection law\n- Handling classified or sensitive information\n- Approved, safe use of AI tools for drafting, summarising and analysis",
        ],
      },
      {
        h: "AI in public service delivery",
        body: [
          "AI can help officials draft correspondence, summarise reports and analyse data faster. Clear rules on approved tools and what information must never be entered are essential before wider use.",
        ],
      },
      {
        h: "How Paleon Training helps",
        body: [
          "We deliver CyberSecure Workforce and AI Workflow Productivity for public sector teams, online, per learner or in a private company portal, in Nigeria, South Africa, Kenya and Ghana. We can work within your procurement process.",
        ],
      },
    ],
    faqs: [
      { q: "Can you train large numbers of civil servants?", a: "Yes. We agree a rollout plan by department and level during the consultation." },
      { q: "Do you cover AI policy for public bodies?", a: "Yes, at a practical level: approved tools, data rules, human review and accountability." },
      { q: "Can you provide attendance records?", a: "Yes, for every participant." },
      { q: "Where do you deliver?", a: "Nigeria, South Africa, Kenya and Ghana, online, per learner or in a private company portal: staff learn self-paced. We do not run live, facilitator-led or hybrid sessions." },
    ],
    programmes: ["cybersecure-workforce", "ai-workflow", "ai-cyber-accelerator"],
    related: ["generative-ai-risks-for-business", "phishing-awareness-training-for-employees", "ai-training-for-managers"],
  },

  // ---------------------------------------------------------------- buyer guide
  {
    slug: "how-to-choose-a-corporate-cybersecurity-training-provider",
    country: null,
    category: "buyer",
    title: "How to Choose a Corporate Cybersecurity & AI Training Provider",
    h1: "How to choose a corporate cybersecurity and AI training provider",
    description:
      "Twelve questions to ask before you buy cybersecurity or AI training for your staff: relevance, delivery, measurement, records, accreditation and cost.",
    lead: "Corporate training budgets are limited, and generic slide-based courses rarely change behaviour. These questions help you choose a provider whose training your staff will actually use.",
    sections: [
      {
        h: "Relevance",
        body: [
          "- Will the training use scenarios from our sector and country?\n- Does it cover our data protection law and our regulator's expectations?\n- Can it be adapted for different roles, such as finance, HR and leadership?",
        ],
      },
      {
        h: "Delivery",
        body: [
          "- Is it online, and can staff study at their own pace around their work?\n- Is it private to our organisation, so only our staff join?\n- Can managers see who has started, progressed and completed?",
        ],
      },
      {
        h: "Results and evidence",
        body: [
          "- How will we measure whether behaviour changed?\n- What attendance records and evidence will we receive?\n- What follow-up or refresher support is available?",
        ],
      },
      {
        h: "Accreditation and funding",
        body: [
          "- Is the certificate an accredited qualification, or a certificate of completion? Both have a place; know which you are buying.\n- Does it qualify for any levy reimbursement, such as the ITF in Nigeria, SETA grants in South Africa or NITA in Kenya? Ask for the specific basis.\n- Is pricing clear for our number of staff?",
        ],
      },
      {
        h: "How Paleon Training answers these",
        body: [
          "Our programmes are online, per learner or in a private company portal, as self-paced courses built around scenarios from your sector, in Nigeria, South Africa, Kenya and Ghana. They are not live, facilitator-led or hybrid. We provide completion and attendance records. " + NOT_ACCREDITED + " Prices per learner are published; organisation-wide rollouts are priced by proposal.",
        ],
      },
    ],
    faqs: [
      { q: "What makes online training effective?", a: "Realistic scenarios from your own sector, short practical modules, knowledge checks and a final assessment help change behaviour. Managers should also be able to see progress, so nobody is left out." },
      { q: "Should we start with a pilot?", a: "A pilot with one team is a sensible way to test fit before a wider rollout." },
      { q: "Where can we start?", a: "Take our free AI & Cyber Readiness Check to see your priority gaps, then book a consultation." },
      { q: "Which countries do you cover?", a: "Nigeria, South Africa, Kenya and Ghana." },
    ],
    programmes: ["cybersecure-workforce", "ai-workflow", "ai-cyber-accelerator"],
    related: ["phishing-awareness-training-for-employees", "chatgpt-training-for-employees", "ai-training-for-managers"],
  },
];

export const GUIDE_BY_SLUG: Record<string, Guide> = Object.fromEntries(GUIDES.map((g) => [g.slug, g]));
