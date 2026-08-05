---
course: Cyber Security Fundamentals
module: "Module 4: Risk Assessment and Compliance"
week: 8
lesson: 1
lesson_title: "Compliance Frameworks and Auditing"
db_lesson_content: "GDPR, HIPAA, and PCI-DSS compliance requirements, and how internal, external, and SOC 2 audits verify that controls are working."
target_length_minutes: 8
---

# Lesson 1: Compliance Frameworks and Auditing

The last two lessons covered risk management as a choice — deciding, deliberately, where limited time and budget get spent. Compliance is different. Compliance is what a regulator, an industry body, or a business partner requires, whether or not it happens to match an organization's own risk priorities. This week is about the frameworks that turn security from a recommendation into an obligation.

## GDPR

The **General Data Protection Regulation (GDPR)** is a European Union law governing how personal data is collected, stored, and used. Its reach surprises a lot of people: GDPR applies to any organization anywhere in the world that handles personal data belonging to EU citizens, not just companies headquartered in Europe. A company based in Lagos or Austin selling to European customers is just as bound by it as one based in Berlin.

GDPR's influence has spread well beyond the EU itself. Nigeria's own data protection law, the **Nigeria Data Protection Regulation (NDPR)**, draws heavily on GDPR's principles — consent, data minimization, the right to know what's collected about you — and it's far from alone; dozens of countries have modeled newer privacy laws on the same template.

## HIPAA

The **Health Insurance Portability and Accountability Act (HIPAA)** governs the protection of health information in the United States. If an organization handles patient records, medical histories, or health insurance data, HIPAA dictates strict rules for how that information must be secured, who can access it, and what happens if it's exposed.

## PCI-DSS

The **Payment Card Industry Data Security Standard (PCI-DSS)** protects payment card data, and it's structurally different from the other two: it isn't a government law at all. It's an industry standard created and enforced by the major credit card companies themselves. It applies to any organization that processes, stores, or transmits credit card information — a giant retailer and a small online shop selling handmade goods are held to the same core requirements.

## How Compliance Gets Verified: Audits

Having a policy that says "we follow GDPR" means nothing without a way to verify it's actually true. That's what audits are for.

An **internal audit** is conducted by an organization's own staff, checking their own controls against a standard — useful for catching problems early, but inherently less independent. An **external audit** is conducted by an independent third party with no stake in the outcome, which is why external audit results carry far more weight with regulators, customers, and partners.

**SOC 2** is a particularly common form of external audit for technology companies. It evaluates how a service organization manages data across five criteria: security, availability, processing integrity, confidentiality, and privacy. A completed SOC 2 report is frequently shown by one business to another as proof — evidence that can be handed to a prospective customer's security team instead of just a promise.

## What's Next

Compliance answers "what are we legally required to do." Next lesson turns to a related but distinct question: when something disruptive actually happens — a disaster, an outage, an attack — how does an organization keep operating, and how does it recover?
