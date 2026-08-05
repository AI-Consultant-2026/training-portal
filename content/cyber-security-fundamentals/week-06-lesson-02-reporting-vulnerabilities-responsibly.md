---
course: Cyber Security Fundamentals
module: "Module 3: Pentest Tools & Reporting"
week: 6
lesson: 2
lesson_title: "Reporting Vulnerabilities Responsibly"
db_lesson_content: "What belongs in a professional vulnerability report, and the principle of responsible disclosure."
target_length_minutes: 7
---

# Lesson 2: Reporting Vulnerabilities Responsibly

Now for the part of this job new students often underestimate, but experienced professionals will tell you is just as important as the technical skill: reporting.

Finding a vulnerability is only half the job. If you can't communicate what you found, how severe it is, and how to fix it — in a way both technical and non-technical stakeholders can act on — the vulnerability might as well not have been found at all.

## What a Professional Vulnerability Report Includes

A professional report typically includes four things. A clear, non-technical **executive summary** for leadership, who need to understand business risk and impact without necessarily understanding technical jargon. A detailed **technical description** of each finding, including exactly how it was discovered and, ideally, the specific steps needed to reproduce it. A **severity rating** — often using CVSS, the Common Vulnerability Scoring System, which gives vulnerabilities a numerical score based on factors like how easily they can be exploited and how much damage they could cause. And finally, specific, actionable **remediation guidance** — not just "fix this," but concrete steps: "update this software to version X," or "disable this specific feature."

## Responsible Disclosure

There's an important concept worth knowing beyond formal engagements: **responsible disclosure**. If you discover a vulnerability outside a formal, authorized engagement — say, you accidentally notice something concerning on a website you use personally — responsible disclosure means privately reporting it to the organization first, giving them reasonable time to fix it, before ever discussing it publicly.

Many organizations run formal **bug bounty programs** specifically to encourage and reward this kind of responsible reporting — a structured, sanctioned way to disclose what you find and often get paid for it, instead of the vulnerability sitting undiscovered or, worse, ending up in the wrong hands.

This week's assignment asks you to write a sample penetration test report template, and it's worth taking seriously — this is a genuinely practical, career-relevant deliverable. A well-organized report template is something you'll refine and reuse throughout your entire career.

## Bringing Module 3 Together

You've now completed the full arc of ethical hacking: understanding what makes hacking ethical rather than criminal, following structured professional frameworks, gathering reconnaissance, using tools to identify and assess vulnerabilities, and — critically — communicating findings responsibly and effectively. This module represents the "offense" side of security, but notice how much of it actually serves defense: every finding you responsibly report makes an organization measurably safer.

Next week, we shift focus again, into Module 4: Risk Assessment and Compliance — the frameworks organizations use to systematically manage security risk, and regulatory requirements like GDPR and PCI-DSS, that often make security a legal obligation, not just a best practice.
