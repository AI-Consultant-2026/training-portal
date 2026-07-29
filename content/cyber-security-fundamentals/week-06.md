---
course: Cyber Security Fundamentals
module: "Module 3: Ethical Hacking & Penetration Testing"
week: 6
topics:
  - Vulnerability assessment methodology
  - Common hacking tools (Nmap, Metasploit, Burp Suite - ethical use)
  - Reporting vulnerabilities responsibly
ties_to:
  assignment: "Write a sample penetration test report template"
  practical: "Conduct a vulnerability assessment using Nessus/OpenVAS"
target_length_minutes: 14
---

# Week 6 Lecture Script: Tools, Vulnerability Assessment, and Responsible Reporting

[Open direct to camera]

Last week we covered the mindset and legal foundation of ethical hacking, along with the professional frameworks that structure a penetration test. This week, we get hands-on: the actual tools that ethical hackers use every day, and — just as importantly — what to do with what you find.

## Vulnerability Assessment Methodology

Before we touch specific tools, let's be precise about what a vulnerability assessment actually is, because it's often confused with a full penetration test, and the difference matters.

A **vulnerability assessment** identifies, categorizes, and prioritizes weaknesses in a system — but it typically stops there. It tells you "this system has a vulnerability that could allow unauthorized access," without necessarily proving it by actually exploiting that vulnerability.

A **penetration test** goes further, actively attempting to exploit identified vulnerabilities to demonstrate real-world impact — showing not just that a door might be unlocked, but that someone can actually walk through it and reach something valuable.

Both are useful, and they're often used together. Many organizations run frequent, lighter-weight vulnerability assessments — sometimes monthly or even continuously — and reserve full penetration tests for less frequent, deeper engagements, often required annually for compliance reasons, which we'll cover in Module 4.

A typical vulnerability assessment methodology follows a few consistent steps: first, asset discovery, identifying exactly what systems exist on a network; second, vulnerability scanning, comparing those systems against known vulnerability databases; third, analysis and prioritization, since not every vulnerability carries equal risk — an unpatched flaw on an isolated test server matters far less than the same flaw on a system holding customer payment data; and finally, remediation guidance, providing clear, actionable steps for fixing what was found.

This is exactly the work you'll be doing in this week's practical exercise, using either Nessus or OpenVAS, two of the most widely used vulnerability scanning platforms in the industry, both of which offer free versions well suited to learning.

## Common Tools

Let's walk through three tools that come up constantly in this field. I want to emphasize again: every one of these tools is completely legal and, frankly, essential for defenders too — network administrators use these same tools to check their own systems. The tool itself is neutral; authorization is what determines whether its use is ethical.

**Nmap**, short for Network Mapper, is the tool you'll use for the scanning work we discussed last week. It can discover what devices exist on a network, what ports are open on each device, and often what specific software and version is running behind each open port. A simple Nmap scan might reveal that a server has port 22 open, running an outdated version of SSH with a known, documented vulnerability — immediately giving both an attacker and a defender a clear next step.

**Metasploit** is a penetration testing framework — a large, organized collection of known exploits, paired with tools to deliver and execute them against a target. Where Nmap tells you a vulnerability might exist, Metasploit is often used to actually demonstrate that it can be exploited, which is the difference between a vulnerability assessment and a full penetration test that we just discussed. Metasploit is powerful, and precisely because it's powerful, using it outside of an authorized engagement is a serious criminal offense.

**Burp Suite** is specialized for testing web applications specifically. It works as an intercepting proxy, sitting between your browser and the web application you're testing, letting you see and even modify the actual requests being sent — extremely useful for finding issues like broken authentication or the kind of vulnerabilities described in the OWASP Top 10 we discussed back in week two.

I want to be honest with you about something: watching a tutorial on these tools and actually becoming skilled with them are very different things. These tools reward patient, repeated practice in safe, legal environments — exactly like the sandbox you'll be using throughout this course. Don't be discouraged if your first attempts feel clumsy. Every experienced penetration tester started exactly where you are right now.

## Reporting Vulnerabilities Responsibly

Now for the part of this job that new students often underestimate, but that experienced professionals will tell you is just as important as the technical skill: reporting.

Finding a vulnerability is only half the job. If you can't communicate what you found, how severe it is, and how to fix it, in a way that both technical and non-technical stakeholders can act on, the vulnerability might as well not have been found at all.

A professional vulnerability report typically includes: a clear, non-technical executive summary for leadership, who need to understand business risk and impact without necessarily understanding technical jargon; a detailed technical description of each finding, including exactly how it was discovered and, ideally, the specific steps needed to reproduce it; a **severity rating** — often using a standard called CVSS, the Common Vulnerability Scoring System, which gives vulnerabilities a numerical score based on factors like how easily they can be exploited and how much damage they could cause; and finally, specific, actionable remediation guidance — not just "fix this," but concrete steps: "update this software to version X," or "disable this specific feature."

There's also an important concept called **responsible disclosure**. If you discover a vulnerability outside of a formal, authorized engagement — say, you accidentally notice something concerning on a website you use personally — responsible disclosure means privately reporting it to the organization first, giving them reasonable time to fix it, before ever discussing it publicly. Many organizations run formal "bug bounty" programs specifically to encourage and reward this kind of responsible reporting.

This week's assignment asks you to write a sample penetration test report template, and I want you to take it seriously — this is a genuinely practical, career-relevant deliverable. A well-organized report template is something you'll refine and reuse throughout your entire career.

## Bringing It Together

We've now completed the full arc of ethical hacking: understanding what makes hacking ethical rather than criminal, following structured professional frameworks, gathering reconnaissance, using tools to identify and assess vulnerabilities, and — critically — communicating findings responsibly and effectively. This module represents the "offense" side of security, but notice how much of it actually serves defense: every finding you responsibly report makes an organization measurably safer.

For your practical exercise, work through a full vulnerability assessment using Nessus or OpenVAS within your sandbox environment, and practice prioritizing what you find, not just listing it.

Next week, we shift focus again, into Module 4: Risk Assessment and Compliance — the frameworks and processes organizations use to systematically manage security risk, and the regulatory requirements, like GDPR and PCI-DSS, that often make security a legal obligation, not just a best practice. See you there.
