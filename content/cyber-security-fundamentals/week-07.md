---
course: Cyber Security Fundamentals
module: "Module 4: Risk Assessment & Compliance"
week: 7
topics:
  - Risk management frameworks (NIST, ISO 27001)
  - Risk identification and analysis
  - Qualitative vs. Quantitative risk assessment
ties_to:
  assignment: "Research compliance requirements for a specific industry"
  practical: "Conduct a risk assessment for a provided scenario"
target_length_minutes: 13
---

# Week 7 Lecture Script: Thinking in Terms of Risk

[Open direct to camera]

Welcome to Module 4. So far, this course has focused on threats and technical defenses — what can go wrong, and the tools we use to prevent or detect it. This week, we shift into a different, equally important discipline: risk management. This is the work of systematically deciding where to focus your limited time, budget, and attention, because — and I want to be completely honest with you about this — no organization, no matter how large its budget, can defend against every conceivable threat perfectly. Risk management is how professionals make smart, defensible decisions about where security effort actually goes.

## Why Risk Management Matters

Here's a question I want you to sit with: should a small business spend more money defending against a sophisticated nation-state attacker, or against an employee accidentally emailing a spreadsheet to the wrong person? For almost every small business, the honest answer is the second one — not because nation-state attacks aren't serious, but because they're far less likely to actually target a small business, and the accidental data leak is both more probable and, often, easier and cheaper to prevent.

That's risk management in a single example: it's not about eliminating all possible risk, which is impossible. It's about identifying, measuring, and prioritizing risks so that your defensive effort matches the actual threat landscape your organization faces.

## Risk Management Frameworks

Just like penetration testing has established frameworks, so does risk management, and two stand out as industry standards.

The **NIST Risk Management Framework**, from the same institute we mentioned in Module 3, provides a structured, government-grade approach built around continuous steps: categorizing systems based on the potential impact if they were compromised, selecting appropriate security controls, implementing those controls, assessing whether they're working, authorizing the system for operation based on acceptable residual risk, and continuously monitoring afterward. It's thorough, and often used by government contractors and large enterprises, particularly in the United States.

**ISO 27001** is an international standard for an Information Security Management System, or ISMS — essentially, a complete, certifiable system for managing information security within an organization. Unlike NIST's framework, ISO 27001 is something organizations can be formally, independently audited and certified against, which makes it valuable for demonstrating security maturity to customers and partners, especially in international business relationships. It's built around a continuous improvement cycle: plan, do, check, act — meaning organizations don't just implement controls once, they continuously reassess and improve them.

You don't need to memorize every clause of either framework right now. What matters is understanding that both exist to bring structure and repeatability to a process that would otherwise be inconsistent and subjective from one organization, or even one employee, to the next.

## Risk Identification and Analysis

Every risk management process starts with identifying what could actually go wrong, which requires understanding a few key terms precisely.

A **threat** is any potential danger — a hacker, a natural disaster, even simple human error. A **vulnerability** is a weakness that a threat could exploit — recall from Module 1 and Module 3 that this might be an unpatched server or an untrained employee. **Risk** itself is what happens when you combine a threat with a vulnerability, factoring in both the likelihood of it occurring and the impact if it does. This is often expressed, informally, as: risk equals likelihood multiplied by impact.

This is a genuinely useful mental formula to carry with you. A vulnerability with very high potential impact, but extremely low likelihood of ever being exploited, might represent a smaller overall risk than a vulnerability with only moderate impact but very high likelihood. Risk assessment is the discipline of reasoning through both factors together, rather than fixating on impact alone, which is a common mistake beginners make.

The identification process typically involves cataloging assets — what does the organization actually have that's worth protecting: data, systems, physical equipment, reputation; identifying threats relevant to each asset; and identifying vulnerabilities that could allow those threats to succeed.

## Qualitative vs. Quantitative Risk Assessment

Once risks are identified, they need to be measured and compared, and there are two broad approaches to doing this.

**Qualitative risk assessment** uses descriptive categories rather than precise numbers — rating likelihood and impact as low, medium, or high, often visualized on a simple risk matrix. This approach is faster, requires less specialized data, and is often more accessible to non-technical stakeholders who need to understand and act on the results. Its weakness is that it can feel subjective — one person's "medium" might be another person's "high."

**Quantitative risk assessment** attempts to assign actual numerical values — often financial ones. A common formula here involves calculating the Annualized Loss Expectancy: essentially, how much financial damage would a specific risk cause if it occurred, multiplied by how many times per year it's realistically expected to occur. This produces a concrete dollar figure that can be directly compared against the cost of implementing a specific security control, allowing for genuinely data-driven decisions about where security spending delivers the most value. The tradeoff is that quantitative assessment requires significantly more data, and often more time and expertise, to do accurately — and inaccurate numbers can create false confidence that's arguably worse than an honest qualitative estimate.

In practice, most organizations use a blend: qualitative assessment for a broad, fast initial pass across many risks, followed by quantitative analysis for the specific, high-priority risks that justify the additional time investment.

## Bringing It Together

Risk management is, at its heart, a communication tool as much as an analytical one. Its real purpose is helping technical security findings translate into business decisions that leadership can understand and act on — connecting directly back to the reporting skills we discussed last week. A well-done risk assessment doesn't just say "this is risky." It says "this is risky, here's how risky compared to our other priorities, and here's what it would cost to reduce that risk," giving decision-makers exactly what they need to allocate resources wisely.

For this week's assignment, research the compliance requirements for a specific industry of your choosing — healthcare, finance, retail — and notice how those requirements are themselves a form of externally-imposed risk management, which leads directly into next week's lecture. For your practical exercise, conduct a full risk assessment for a provided scenario, practicing both the qualitative and quantitative approaches we discussed today.

Next week, we'll look at the compliance frameworks — GDPR, HIPAA, and PCI-DSS — that turn risk management from a best practice into a legal requirement for many organizations, along with business continuity and disaster recovery planning. See you then.
