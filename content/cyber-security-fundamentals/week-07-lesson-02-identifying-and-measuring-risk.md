---
course: Cyber Security Fundamentals
module: "Module 4: Risk Assessment and Compliance"
week: 7
lesson: 2
lesson_title: "Identifying and Measuring Risk"
db_lesson_content: "The threat, vulnerability, and risk formula, and the difference between qualitative and quantitative risk assessment."
target_length_minutes: 8
---

# Lesson 2: Identifying and Measuring Risk

Last lesson introduced the frameworks organizations use to structure risk management. This lesson gets practical: how risk actually gets identified in the first place, and the two very different ways organizations measure just how much any given risk is worth worrying about.

## Threat, Vulnerability, and Risk

These three words get used interchangeably in casual conversation, but in risk management they mean distinct things, and the distinction matters.

A **threat** is any potential danger — a hacker, a natural disaster, a disgruntled employee, or even simple human error. A **vulnerability** is a specific weakness that a threat could exploit — an unpatched server, an unlocked door, an employee who hasn't been trained to spot phishing emails. Neither one alone is dangerous. A threat with no vulnerability to exploit is harmless, and a vulnerability no threat will ever encounter is low priority.

**Risk** is what emerges when a threat meets a vulnerability, and it's informally expressed as a simple formula: **risk equals likelihood multiplied by impact**. How probable is it that this threat exploits this vulnerability, and how bad would it actually be if it did? A threat with very high potential impact but extremely low likelihood — a meteor strike on the data center — might represent a smaller overall risk than a threat with only moderate impact but very high likelihood, like routine phishing attempts that happen every single week.

## Identifying Risk

The risk identification process starts before any threat or vulnerability is even discussed: with **cataloging assets** — systematically listing out everything an organization actually has that's worth protecting, from servers and databases to intellectual property and customer trust. You can't meaningfully assess risk to something you haven't acknowledged exists. Only once assets are cataloged does it make sense to work through which threats and vulnerabilities apply to each one.

## Qualitative vs. Quantitative Risk Assessment

Once risks are identified, they need to be measured, and organizations generally lean on one of two approaches, or some blend of both.

**Qualitative risk assessment** uses descriptive categories — typically low, medium, and high — rather than precise numbers. It's faster, requires less specialized data, and is generally more accessible to non-technical stakeholders, who can grasp "this is a high risk" far more readily than a dense statistical model. Its downside is that it can feel subjective, since one person's "medium" might be another's "high."

**Quantitative risk assessment** goes further, assigning numerical, often financial, values to risk. A common tool here is **Annualized Loss Expectancy (ALE)**, which estimates the expected financial damage from a given risk per year, based on how much a single incident would cost and how often it's expected to happen. Quantitative assessment can be powerful — it turns "this is risky" into "this is projected to cost us $40,000 a year" — but it requires significantly more data, time, and expertise to do well, and inaccurate inputs can create false confidence in a number that only looks precise.

In practice, most organizations don't pick strictly one or the other. They blend the two: qualitative categories for a fast first pass across many risks, and quantitative analysis reserved for the handful of risks significant enough to justify the deeper effort.

## Bringing Module 4 Together

You now have the two halves of risk management: the frameworks — NIST RMF and ISO 27001 — that structure the overall process, and the practical mechanics of identifying assets, mapping threats and vulnerabilities to them, and measuring what's found either qualitatively or quantitatively. This week's assignment asks you to research the compliance requirements facing a specific industry, which is exactly where risk management meets the real world: many of the controls organizations implement aren't purely a choice, they're a legal obligation.

Next week continues that thread directly, into compliance frameworks and business continuity — what happens when regulation, rather than pure risk calculation, decides what an organization has to do.
