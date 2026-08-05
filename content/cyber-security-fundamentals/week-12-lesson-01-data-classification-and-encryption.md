---
course: Cyber Security Fundamentals
module: "Module 6: Cloud & Data Security"
week: 12
lesson: 1
lesson_title: "Data Classification and Encryption"
db_lesson_content: "How tiered data classification determines the right level of protection, and the difference between encryption at rest and in transit."
target_length_minutes: 8
---

# Lesson 1: Data Classification and Encryption

Module 6 opened by asking who's responsible for securing what once part of your infrastructure lives in someone else's data center. This lesson asks a related but different question: whatever the infrastructure, how do you decide how much protection a given piece of data actually deserves — and how do you deliver that protection technically once you've decided?

## Why Classify Data First

Before you can protect data appropriately, you need to know what kind of data you actually have and how sensitive it is. That's the purpose of **data classification**: sorting data into tiers so the level of protection applied actually matches the harm that would result if it were exposed.

Most organizations use a tiered scheme along these lines. **Public** data can be freely shared with no harm if exposed — marketing materials, a published press release. **Internal** data is meant only for employees but isn't especially damaging if it leaked — an internal meeting schedule, a team roster. **Confidential** data could cause real harm to the business or individuals if exposed — salary information, unreleased business strategy. And **restricted**, or highly confidential, data could cause severe harm — customer payment details, health records, trade secrets — exactly the kind of data covered by the GDPR, HIPAA, and PCI-DSS frameworks from Module 4.

Classification matters because it directly determines how much protection is appropriate for each category. Encrypting every piece of public marketing material with the same rigor as customer payment data would waste resources and add unnecessary friction for no benefit; under-protecting restricted data creates genuine legal and financial risk. Classification is what lets an organization apply the right amount of protection to the right data, instead of the same blanket protection everywhere or inadequate protection where it matters most.

## Encryption at Rest

Once data is classified, **encryption** is one of the primary tools used to protect it. Encryption converts readable data into an unreadable form, reversible only with the correct decryption key, and it's applied in two distinct contexts.

**Encryption at rest** protects data while it's stored — on a hard drive, in a database, in cloud storage. If an attacker steals a physical hard drive or gains unauthorized access to a storage system, properly encrypted data at rest remains unreadable without the decryption key, even with the raw files sitting in the attacker's hands.

## Encryption in Transit

**Encryption in transit** protects data while it's moving between systems — the HTTPS from Module 2 that encrypts traffic between a browser and a website, or the VPN technologies that same week, encrypting entire network connections between locations.

A genuinely secure system needs both. Data beautifully encrypted at rest but transmitted in plain text is still highly vulnerable to interception — exactly the kind of scenario Wireshark, also from Module 2, could reveal in an instant. And data encrypted in transit but stored in plain text is vulnerable the moment an attacker reaches the underlying storage. Neither one substitutes for the other; a real data protection strategy applies both together.

## Key Management

One more practical concept worth knowing: **key management**. Encryption is only as strong as the protection around its decryption keys. If keys are stored carelessly — alongside the encrypted data itself, or hardcoded directly into application source code — the encryption provides a false sense of security rather than real protection. Cloud providers typically offer dedicated key management services specifically to help avoid this common, serious mistake.

## Bringing It Together

Classification and encryption work as a pair, not as separate exercises. Classification tells you how much protection a piece of data deserves; encryption — applied correctly at rest, in transit, and with carefully managed keys — is how you actually deliver that protection. Get the classification wrong and you'll either waste effort protecting what doesn't need it or leave what matters most exposed. Get the encryption wrong and even correctly classified data stays vulnerable anyway.

Next lesson turns to what happens when protection fails anyway: legal breach notification requirements, and how to scope your capstone project — the piece of work that ties this entire course together.
