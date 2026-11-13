// The corporate sector pages (2026-11-13, owner's conversion review point 12): one page per
// sector at /corporate-training/sectors/<slug>, for all four countries (the visitor's country
// sets prices and the data protection law). Rendered by views/corporateSectors.ts. No imports,
// so the shared header and footer can link here without a cycle. Examples are general and
// illustrative: no statistics, no named organisations, no claims about specific regulations
// beyond each country's data protection law (corporateLocal.ts DATA_PROTECTION_LAW).

export const SECTORS_PATH = "/corporate-training/sectors";

export type SectorProgramme = "cybersecure" | "ai-workflow" | "accelerator";

export interface Sector {
  slug: string;
  name: string;
  /** One line for the hub's sector cards. */
  card: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  /** Who in this sector the training is for. */
  teams: string[];
  /** Realistic cyber threats for this sector, as scenario cards. */
  threats: { h: string; p: string }[];
  /** Where AI saves time in this sector, safely. */
  aiUses: { h: string; p: string }[];
  /** Outcomes the sector cares about, in its own words. */
  outcomes: string[];
  /** Which programme fits which group, and why. */
  fit: { programme: SectorProgramme; why: string }[];
  faq: { q: string; a: string }[];
}

export const SECTORS: Sector[] = [
  {
    slug: "banking-financial-services",
    name: "Banking & financial services",
    card: "Payment fraud, account takeover and customer-data protection for banks, fintechs, microfinance and insurers, plus safe AI for operations and compliance teams.",
    title: "Cybersecurity & AI Training for Banks and Financial Services | Paleon Training",
    description:
      "Cybersecurity awareness and AI training for banks, fintechs, microfinance banks and insurers in Nigeria, South Africa, Kenya and Ghana. Self-paced or in-house.",
    h1: "Cybersecurity and AI training for banks and financial services",
    lead: "Fraudsters target the people who move money and handle customer data. We train branch, operations, contact-centre and head-office staff to stop fraud at the first step, and help your teams use AI without putting customer information at risk.",
    teams: [
      "Branch and customer-service staff",
      "Payments, treasury and operations teams",
      "Contact-centre agents",
      "Compliance, risk and internal audit",
      "IT, security and digital teams",
    ],
    threats: [
      {
        h: "A changed-bank-details email",
        p: "A supplier's \"new account details\" arrive by email just before a large payment. Staff learn to stop, call back on a known number and report.",
      },
      {
        h: "A caller posing as a customer",
        p: "A confident caller has enough personal details to pass basic checks and asks for a SIM change or a password reset. Agents learn the warning signs and when to escalate.",
      },
      {
        h: "An urgent request from \"the MD\"",
        p: "A WhatsApp message or a cloned voice note asks for a confidential transfer today. Staff learn why urgency plus secrecy means verify first.",
      },
      {
        h: "Customer data in the wrong place",
        p: "A spreadsheet of account holders is pasted into a public AI tool to \"tidy it up\". Teams learn what must never leave approved systems.",
      },
    ],
    aiUses: [
      { h: "Faster first drafts", p: "Credit memos, customer letters, board-paper summaries and procedure updates, always checked by a person." },
      { h: "Policy and regulation summaries", p: "Plain-language summaries of long internal policies and circulars for front-line staff, verified against the source." },
      { h: "Complaint handling", p: "Categorising and drafting responses to complaints with personal data removed and a human approving every reply." },
    ],
    outcomes: [
      "Fewer successful payment-fraud and impersonation attempts",
      "Faster reporting of suspicious calls, emails and transactions",
      "Training records for audit, risk committees and data-protection obligations",
      "Safe, approved AI use in operations and compliance",
    ],
    fit: [
      { programme: "cybersecure", why: "Every employee, from branches to head office: fraud, impersonation and data protection." },
      { programme: "ai-workflow", why: "Operations, compliance and customer teams who want to save time with AI safely." },
      { programme: "accelerator", why: "IT, security, risk and audit professionals who will govern AI and lead the response to AI-enabled fraud." },
    ],
    faq: [
      {
        q: "Can the training use examples from banking?",
        a: "Yes. Scenarios, exercises and the workplace project are adapted to banking and financial services: payments, customer verification, contact centres, branches and compliance.",
      },
      {
        q: "Can we train branch staff in several cities?",
        a: "Yes. Training is online and in-house: branch and head-office staff all study self-paced in a private space for your bank only, at times that suit them. There are no live or facilitator-led sessions.",
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    card: "Protecting patient records and keeping services running for hospitals, clinics, pharmacies, labs and health insurers, with safe AI for admin work.",
    title: "Cybersecurity & AI Training for Healthcare Organisations | Paleon Training",
    description:
      "Cybersecurity awareness and safe AI training for hospitals, clinics, pharmacies, laboratories and health insurers in Nigeria, South Africa, Kenya and Ghana.",
    h1: "Cybersecurity and AI training for healthcare organisations",
    lead: "Patient records are some of the most sensitive data there is, and an attack that locks your systems can stop services. We train clinical and administrative staff to protect patient information and to recognise the messages that start most incidents, and help admin teams use AI safely.",
    teams: [
      "Doctors, nurses and allied health staff",
      "Reception, records and billing teams",
      "Pharmacy and laboratory staff",
      "Managers and administrators",
      "IT and digital health teams",
    ],
    threats: [
      {
        h: "A fake invoice from a supplier",
        p: "An email that looks like it comes from a regular medical supplier asks for payment to a new account. Finance and procurement staff learn to verify before paying.",
      },
      {
        h: "A link that locks your systems",
        p: "A \"shared document\" link leads to malware that encrypts files. Staff learn to spot the signs and report at once, so IT can contain it.",
      },
      {
        h: "A caller asking about a patient",
        p: "Someone claiming to be a relative or another clinic asks for test results by phone. Staff learn how to confirm identity before sharing anything.",
      },
      {
        h: "Patient notes in a public AI tool",
        p: "A clinician pastes notes into a public AI tool to write a referral letter. Teams learn which tools are approved and how to remove identifying details.",
      },
    ],
    aiUses: [
      { h: "Admin and letters", p: "Drafting appointment letters, referral templates and patient information leaflets for clinical review." },
      { h: "Rotas and reports", p: "Summarising operational reports, audit findings and meeting notes for managers." },
      { h: "Policies and SOPs", p: "Turning long procedures into short checklists for staff, checked by the policy owner." },
    ],
    outcomes: [
      "Patient information handled and shared safely",
      "Faster reporting of suspicious emails, calls and system problems",
      "Training records for inspections, audits and data-protection obligations",
      "Admin time saved with AI, without patient data leaving approved systems",
    ],
    fit: [
      { programme: "cybersecure", why: "Every member of staff who handles patient information or uses a computer or phone at work." },
      { programme: "ai-workflow", why: "Administrators and managers who want to save time on letters, reports and procedures." },
      { programme: "accelerator", why: "IT and digital health professionals who will assess AI tools and protect clinical systems." },
    ],
    faq: [
      {
        q: "Is this clinical training?",
        a: "No. It is cybersecurity awareness and safe AI use for healthcare workplaces. It does not teach clinical practice, and AI is never used to make clinical decisions in our exercises.",
      },
      {
        q: "Our staff work shifts. How do they fit it in?",
        a: "Self-paced online learning lets staff study between shifts, with 12 months' access, in a private space for your organisation only. Nothing has to be scheduled around rotas.",
      },
    ],
  },
  {
    slug: "public-sector",
    name: "Public sector",
    card: "Protecting citizen data and public funds for ministries, agencies, local government and state-owned enterprises, with safe AI for drafting and records.",
    title: "Cybersecurity & AI Training for Government and the Public Sector | Paleon Training",
    description:
      "Cybersecurity awareness and safe AI training for ministries, agencies, local government and state-owned enterprises in Nigeria, South Africa, Kenya and Ghana.",
    h1: "Cybersecurity and AI training for government and the public sector",
    lead: "Public bodies hold citizens' personal data and manage public money, and attackers know it. We train officers at every grade to recognise impersonation, fake payment requests and data leaks, and help teams use AI for drafting and research within clear rules.",
    teams: [
      "Officers in ministries, departments and agencies",
      "Finance, procurement and payroll units",
      "Records, registry and front-desk staff",
      "Senior officials and their offices",
      "ICT and digital services teams",
    ],
    threats: [
      {
        h: "A message from a \"senior official\"",
        p: "A message using a senior official's name and photo asks an officer to approve a payment or share a document quickly. Staff learn to verify through a known channel.",
      },
      {
        h: "A fake contractor invoice",
        p: "A contractor's invoice arrives with new bank details during a busy procurement cycle. Finance officers learn the checks that stop the payment.",
      },
      {
        h: "Citizen records sent to the wrong person",
        p: "A list of applicants is emailed to an external address by mistake. Staff learn safe sharing, access control and what to do after a mistake.",
      },
      {
        h: "Official documents in a public AI tool",
        p: "A draft policy marked confidential is pasted into a public AI tool. Teams learn which information may be used with which tools.",
      },
    ],
    aiUses: [
      { h: "Drafting and summarising", p: "First drafts of memos, briefs, speeches and minutes, reviewed and approved by the responsible officer." },
      { h: "Research and consultation responses", p: "Summarising reports and grouping consultation feedback, with the source checked for every point." },
      { h: "Citizen communication", p: "Plain-language versions of notices and guidance, reviewed before publication." },
    ],
    outcomes: [
      "Fewer successful impersonation and payment-fraud attempts",
      "Citizen data handled in line with your data protection obligations",
      "Evidence of staff training for audits and oversight bodies",
      "Faster drafting with AI inside clear, approved rules",
    ],
    fit: [
      { programme: "cybersecure", why: "Every officer, from front desk to senior management: impersonation, fraud and data protection." },
      { programme: "ai-workflow", why: "Policy, communications and administrative teams who want to draft and research faster with AI." },
      { programme: "accelerator", why: "ICT, audit and digital services professionals who will set the rules for AI and protect public systems." },
    ],
    faq: [
      {
        q: "Can you invoice a government body?",
        a: "Yes. Choose \"Send us an invoice instead\" when you buy online, or request a proposal and we will issue a quotation and invoice for your procurement process.",
      },
      {
        q: "Can the training cover our own AI and records rules?",
        a: "Yes. For in-house rollouts we adapt the exercises to your organisation's existing policies on records, information handling and approved tools.",
      },
    ],
  },
  {
    slug: "oil-and-gas",
    name: "Oil & gas and energy",
    card: "Contractor fraud, remote-site risks and protecting operational data for operators, service companies and energy firms, with safe AI for reports and HSE paperwork.",
    title: "Cybersecurity & AI Training for Oil & Gas and Energy Companies | Paleon Training",
    description:
      "Cybersecurity awareness and safe AI training for oil and gas operators, oilfield service companies and energy firms in Nigeria, South Africa, Kenya and Ghana.",
    h1: "Cybersecurity and AI training for oil & gas and energy companies",
    lead: "Large contracts, many suppliers and staff spread across offices, yards and remote sites make energy companies a target for fraud and data theft. We train office and field staff to recognise the threats, and help teams use AI for reports and paperwork without exposing operational data.",
    teams: [
      "Procurement, contracts and finance teams",
      "Field, site and rotation-based staff",
      "HSE, operations and maintenance teams",
      "Engineers and project managers",
      "IT and operational technology (OT) staff",
    ],
    threats: [
      {
        h: "A contractor's \"new bank account\"",
        p: "A long-standing service contractor asks for the next invoice to be paid into a new account. Contracts and finance staff learn the call-back check that stops it.",
      },
      {
        h: "A USB stick left on site",
        p: "A USB drive turns up in a site office or control room. Field staff learn why it must go to IT unopened.",
      },
      {
        h: "Site photos on social media",
        p: "Photos of a facility, badge or screen are posted online. Staff learn what attackers can learn from them.",
      },
      {
        h: "Operational data in a public AI tool",
        p: "A production report with well or asset data is pasted into a public AI tool to summarise it. Teams learn what stays in approved systems.",
      },
    ],
    aiUses: [
      { h: "Daily and weekly reports", p: "First drafts of production, maintenance and project reports from structured notes, checked by the engineer responsible." },
      { h: "HSE paperwork", p: "Turning incident notes into a clear first draft and summarising toolbox talks, reviewed by the HSE lead." },
      { h: "Procedures and tenders", p: "Summarising long procedures and tender documents, with every requirement checked against the original." },
    ],
    outcomes: [
      "Fewer successful contractor-payment and impersonation frauds",
      "Field and office staff who report suspicious activity quickly",
      "Training records for audits, partners and data-protection obligations",
      "Time saved on reports and HSE paperwork, with data kept in approved tools",
    ],
    fit: [
      { programme: "cybersecure", why: "Every employee and site worker: fraud, devices, site security and data protection." },
      { programme: "ai-workflow", why: "Engineering, HSE, operations and commercial teams who want to save time on reports and documents." },
      { programme: "accelerator", why: "IT, OT, security and risk professionals who will lead secure AI adoption across the business." },
    ],
    faq: [
      {
        q: "Can staff on rotation take part?",
        a: "Yes. Self-paced online learning works around rotations, with 12 months' access, so crews can study offshore or when they are back. Nothing has to be scheduled around crew changes.",
      },
      {
        q: "Does this cover operational technology (OT) security?",
        a: "CyberSecure Workforce covers the awareness every employee needs, including devices and site security. Deeper technical OT security is beyond these programmes; the Accelerator covers AI and cyber risk for IT and security professionals.",
      },
    ],
  },
];
