---
course: Cyber Security Fundamentals
module: "Module 4: Risk Assessment & Compliance"
week: 8
topics:
  - Compliance frameworks (GDPR, HIPAA, PCI-DSS)
  - Security auditing standards
  - Business continuity and disaster recovery planning
ties_to:
  assignment: "Develop a business continuity plan outline"
  practical: "Create a risk register and mitigation plan"
target_length_minutes: 13
---

# Week 8 Lecture Script: Compliance, Auditing, and Planning for the Worst

[Open direct to camera]

Last week we built the vocabulary and tools of risk management. This week, we look at what happens when risk management stops being optional and becomes a legal requirement — and we finish the module by talking about something every organization needs but few enjoy thinking about: planning for disaster.

## Compliance Frameworks

Compliance means meeting a set of externally defined requirements — usually legal, sometimes industry-imposed — around how an organization handles data and security. Let's cover the three you're most likely to encounter.

**GDPR, the General Data Protection Regulation**, is a European Union law, but its reach extends far beyond Europe: any organization anywhere in the world that handles personal data belonging to EU citizens must comply with it. GDPR gives individuals significant rights over their own data — the right to know what's collected, the right to have it deleted, the right to be notified promptly if a breach occurs. Penalties for serious violations can reach into the tens of millions of euros, or a percentage of a company's global revenue, whichever is higher. Even if you're working primarily with Nigerian or West African businesses, if any of their customers are in the EU, GDPR is relevant — and it's worth knowing that Nigeria has its own similar law, the Nigeria Data Protection Act, which draws heavily on GDPR's principles.

**HIPAA, the Health Insurance Portability and Accountability Act**, is a United States law governing the protection of health information specifically. It matters for this course less because you'll necessarily work under U.S. jurisdiction, and more because it's a well-established model for healthcare data protection worldwide — the specific safeguards it requires, like strict access controls and detailed audit logging of who accessed patient records and when, are good practice for any healthcare-adjacent system, anywhere.

**PCI-DSS, the Payment Card Industry Data Security Standard**, isn't a government law at all — it's a set of requirements created by the major credit card companies, and it applies to any organization anywhere in the world that processes, stores, or transmits credit card information. If a business accepts card payments, PCI-DSS almost certainly applies to them, which makes it one of the most universally relevant compliance frameworks for the kind of small and mid-sized businesses you're most likely to work with early in your career.

Here's the connecting thread across all three: compliance frameworks essentially formalize good security practice into a legal or contractual obligation. Encryption, access control, monitoring, incident response — everything we've discussed throughout this course — reappears here, just now with legal consequences attached for failing to implement it.

## Security Auditing Standards

How does an organization actually prove it's compliant? Through auditing — a formal, often independent, examination of whether stated security controls are actually in place and working as intended.

**Internal audits** are conducted by an organization's own staff, useful for ongoing, frequent self-assessment. **External audits** are conducted by an independent third party, and are often specifically required by regulations or by business partners who want assurance before trusting an organization with sensitive data.

One standard you'll encounter frequently, especially if you ever work with cloud service providers, is **SOC 2**, a framework specifically for evaluating how service organizations manage data based on five criteria: security, availability, processing integrity, confidentiality, and privacy. A SOC 2 report is often what one business shows another as proof that their systems and processes meet an acceptable security bar — very relevant if you ever advise a business on choosing a cloud vendor, which connects directly to what we'll cover in Module 6.

The auditing process itself typically follows a rhythm: defining scope and criteria upfront, gathering evidence — reviewing configurations, interviewing staff, testing controls directly — and producing a report that identifies both what's working and specific gaps that need remediation, in a format very similar to the vulnerability reporting we discussed back in Module 3.

## Business Continuity and Disaster Recovery Planning

Let's close this module with a topic that connects risk management directly to organizational survival: what happens when something does go wrong, whether that's a cyberattack, a fire, flooding, or simple equipment failure.

**Business Continuity Planning, BCP**, is the broader discipline of ensuring an organization can continue operating — perhaps in a reduced or modified way — during and immediately after a disruptive event. **Disaster Recovery, DR**, is more narrowly focused on restoring IT systems and data specifically after a disaster.

A solid business continuity plan generally includes: a **Business Impact Analysis**, identifying which business functions are most critical and how quickly they need to be restored if disrupted; a **Recovery Time Objective, or RTO**, the maximum acceptable time a system or function can be down before serious business harm occurs; a **Recovery Point Objective, or RPO**, the maximum acceptable amount of data loss, typically measured in time — for example, "we can afford to lose at most one hour of transaction data" — which directly drives how frequently backups need to be taken; and clear, specific, actionable recovery procedures, not vague intentions.

I want to emphasize something that trips up a lot of organizations, not just students: a plan that has never been tested is not a reliable plan. Many businesses discover, in the middle of an actual crisis, that their backups were incomplete, or that key staff didn't actually know their role in the recovery process. Regular testing — even simple tabletop exercises where staff walk through a hypothetical scenario together — is what separates a plan that works from a plan that only looks good on paper.

## Bringing It Together

This module has covered how organizations formalize risk management into structured frameworks, how compliance turns security into a legal and contractual obligation, how auditing verifies that controls actually work, and how business continuity planning ensures survival when prevention inevitably fails, because it always eventually does, for every organization, somewhere along the way.

For your assignment, develop a business continuity plan outline, thinking carefully through RTO and RPO for the critical functions you identify. For your practical exercise, create a risk register — a structured, prioritized list of identified risks — along with a mitigation plan for the highest-priority items, directly applying everything from this and last week's lecture.

Next week, we move into Module 5: Incident Response and Management — what to actually do, step by step, the moment a security incident is detected. See you there.
