---
course: Cyber Security Fundamentals
module: "Module 5: Incident Response & Management"
week: 9
topics:
  - Incident response lifecycle (Preparation, Detection, Containment, Eradication, Recovery, Post-incident)
  - Security monitoring and alert systems
  - Incident classification and prioritization
ties_to:
  assignment: "Create an incident response playbook for malware infection"
  practical: "Respond to a simulated security incident; document actions"
target_length_minutes: 13
---

# Week 9 Lecture Script: When the Alarm Goes Off

[Open direct to camera]

Welcome to Module 5. Everything we've covered so far in this course — threats, network defenses, ethical hacking, risk management, compliance — exists to reduce the likelihood and impact of a security incident. But here's a truth every experienced security professional accepts: eventually, despite good defenses, something will get through. This module is about what happens next, and how a well-prepared organization responds calmly and effectively, rather than in chaos.

## The Incident Response Lifecycle

Incident response follows a well-established lifecycle with six distinct phases. I want to walk through each one, because this structure is genuinely one of the most practically useful things you'll learn in this entire course.

**Preparation** happens before any incident occurs, and honestly, it's the phase that determines whether everything after it goes smoothly or badly. This includes having a documented incident response plan, a trained team with clearly assigned roles, the right tools and access already in place, and — critically — the kind of backups and network segmentation we discussed back in Module 2, so that recovery is actually possible when the time comes.

**Detection** is the moment an incident is first identified — through the monitoring tools and alert systems we'll discuss shortly, through an employee reporting something suspicious, or sometimes, uncomfortably, through an external party like a customer or even a journalist informing the organization that something is wrong. The faster detection happens, the smaller the eventual damage tends to be, which is exactly why investment in monitoring pays for itself.

**Containment** is the immediate priority once an incident is confirmed: stopping it from spreading further or causing additional damage, without necessarily fixing the underlying problem yet. This often means isolating affected systems from the network — recall the segmentation we discussed in Module 2, which makes containment dramatically easier when it's already in place. Containment is typically split into short-term containment, immediate and sometimes temporary measures, and long-term containment, more durable fixes while full eradication is prepared.

**Eradication** is the phase where the actual root cause is removed — deleting malware, closing the vulnerability that allowed initial access, removing any backdoors an attacker may have installed to maintain access. This step requires real discipline: rushing past eradication to get systems back online quickly can mean an attacker still has a foothold, and the entire incident recurs shortly afterward.

**Recovery** is restoring affected systems to normal operation, carefully and often gradually, with close monitoring to confirm the threat is genuinely gone and hasn't simply gone quiet. This connects directly to the Recovery Time Objectives and Recovery Point Objectives we discussed last week in business continuity planning.

**Post-incident activity**, sometimes called the "lessons learned" phase, is the step organizations most often skip under time pressure, and it's a genuine mistake to skip it. This involves a thorough review: what happened, how was it detected, what worked well, what didn't, and what changes — to technology, process, or training — should be made to prevent a similar incident in the future. We'll dig much deeper into this specific phase next week.

## Security Monitoring and Alert Systems

None of this incident response lifecycle matters if an organization never detects that something is happening in the first place. This is where security monitoring and alerting come in, building directly on the IDS and IPS concepts we covered in Module 2.

A **Security Information and Event Management system, or SIEM**, is the central nervous system of most organizations' monitoring capability. It collects log data from across the entire environment — firewalls, servers, applications, endpoint devices — and correlates it, looking for patterns that might indicate an incident, often across data sources that would look unremarkable in isolation but become clearly suspicious once combined.

A well-tuned alerting system tries to strike a careful balance. Too few alerts, and real incidents go unnoticed. Too many, and security teams experience something called **alert fatigue** — becoming desensitized to constant notifications, to the point where a genuinely critical alert gets lost in the noise, buried among dozens of false positives. Tuning detection rules to minimize false positives while still reliably catching real threats is a continuous, ongoing effort, never a one-time setup task.

## Incident Classification and Prioritization

Not every security incident deserves the same urgency or the same response. Just as we discussed with risk assessment back in Module 4, incidents need to be classified and prioritized so that limited response resources go where they matter most.

Classification typically considers the type of incident — malware infection, unauthorized access, data breach, denial of service — because different types call for different specific response procedures. Prioritization then considers severity: how many systems or users are affected, whether sensitive data is involved, and whether business-critical operations are disrupted. Many organizations use a simple tiered system — critical, high, medium, low — with clearly defined response time expectations attached to each tier, so that a critical incident affecting customer payment data gets an immediate, all-hands response, while a low-severity incident, like a single employee's device showing signs of low-risk adware, can be handled through normal, non-urgent channels.

## Bringing It Together

The incident response lifecycle — preparation, detection, containment, eradication, recovery, and post-incident review — gives you a reliable structure to follow even in a genuinely stressful, high-pressure situation, which is exactly when structure matters most. Combined with effective monitoring and sensible prioritization, this transforms incident response from panicked improvisation into a professional, repeatable process.

For your assignment, create an incident response playbook specifically for a malware infection scenario, walking through each of the six lifecycle phases with concrete, specific actions. For your practical exercise, you'll respond to a simulated security incident and document your actions as you go — practice narrating your reasoning as you work through it, because clear documentation during a real incident is exactly as important as the technical response itself.

Next week, we go deeper into two specific phases we touched on today: digital forensics, and the post-incident review process that turns a single bad day into genuine organizational learning. See you there.
