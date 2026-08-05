---
course: Cyber Security Fundamentals
module: "Module 5: Incident Response and Recovery"
week: 9
lesson: 2
lesson_title: "Monitoring, Alerting, and Prioritization"
db_lesson_content: "How SIEM systems and careful alert tuning support detection, and how incidents are classified and prioritized by severity."
target_length_minutes: 7
---

# Lesson 2: Monitoring, Alerting, and Prioritization

Last lesson walked through all six phases of incident response, but glossed over the mechanics of phase two: detection. This lesson goes deeper on how organizations actually notice something is wrong, and what happens the moment they do — because the faster detection happens, the smaller the eventual damage tends to be.

## SIEM Systems

A **SIEM** (Security Information and Event Management) system is the tool most organizations rely on for detection at scale. It collects and correlates log data across an entire environment — servers, firewalls, applications, endpoints — and looks for patterns that indicate something is actually happening, rather than relying on a human to notice one suspicious line buried in thousands of routine ones. A login from an unfamiliar country followed minutes later by a large data download might mean nothing in isolation, but correlated together by a SIEM, it becomes a flagged event worth investigating.

## The Alert Tuning Problem

Building a SIEM is only half the job. The harder half is tuning it well, and that means balancing two failure modes against each other. Too few alerts, and real incidents slip through undetected. Too many alerts, and analysts drown in noise until they can't tell a genuine threat from routine background activity.

This second failure has a name: **alert fatigue** — becoming desensitized to a constant stream of notifications, to the point that a genuinely critical alert gets lost among a sea of false positives. Alert fatigue isn't a hypothetical risk; it's one of the most common reasons real breaches go unnoticed for weeks, buried under alerts nobody had the attention left to properly review. A well-tuned alerting system deliberately balances catching too little against generating too much.

## Classifying Incidents

Once something is detected and confirmed, it needs to be classified. Incident classification typically considers the **type** of incident — a malware infection, unauthorized access, a data breach, a denial of service attack — because different types call for genuinely different response playbooks.

## Prioritizing Incidents

Classification answers "what kind of incident is this." Prioritization answers "how urgently does it need attention right now," and it's driven primarily by severity: how many systems or users are affected, and whether sensitive data or business-critical operations are involved. A phishing email caught by a spam filter and a ransomware outbreak spreading across production servers are both "incidents," but they do not deserve the same fire drill.

Many organizations formalize this with a tiered system — commonly **critical, high, medium, low** — so that the moment an incident is classified, its priority tier tells the team exactly how fast to respond and who needs to be pulled in, instead of leaving that judgment call to whoever happens to be on duty that day.

## Bringing Module 5 Together

Detection, classification, and prioritization are what make the six-phase lifecycle from last lesson actually executable under real time pressure — they're what turn "something is wrong" into "here is exactly what's wrong, how bad it is, and who needs to act right now." This week's assignment, building an incident response playbook for a malware infection, is your chance to put the entire module together: preparation through post-incident review, informed by exactly this kind of detection and prioritization thinking.

Next week moves one step further, into digital forensics — what happens after containment, when an organization needs to understand precisely what an attacker did, and prove it.
