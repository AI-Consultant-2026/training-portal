---
course: Cyber Security Fundamentals
module: "Module 5: Incident Response and Recovery"
week: 9
lesson: 1
lesson_title: "The Six Phases of Incident Response"
db_lesson_content: "Preparation, detection, containment, eradication, recovery, and post-incident review as the structured lifecycle for handling a security incident."
target_length_minutes: 8
---

# Lesson 1: The Six Phases of Incident Response

The last module covered planning for disruption before it happens. This module covers what happens the moment it actually does: an alert fires, a system behaves strangely, someone reports something suspicious, and now there's an active security incident to handle. Organizations that respond well aren't improvising — they're following a structured lifecycle with six phases.

## 1. Preparation

Preparation happens long before any incident, and it's what makes everything after it possible. It includes a documented incident response plan that spells out who does what, a trained team who already knows their role instead of learning it during a crisis, the right tools and access already provisioned, reliable backups, and network segmentation that limits how far an attacker can move once they're in. Skipping preparation doesn't make an incident less likely — it just guarantees the response will be slower and more chaotic when one happens.

## 2. Detection

Detection is recognizing that an incident is actually happening — through an alert, an anomaly, a report from an employee, or a monitoring system flagging unusual behavior. The mechanics of detection, including the tools organizations rely on, are covered in depth next lesson. For now, the key point is simple: an incident that isn't detected can't be responded to at all, no matter how good the other five phases are.

## 3. Containment

Once an incident is confirmed, the immediate priority is containment — not necessarily fixing the underlying problem yet, just stopping it from getting worse. Containment is typically split into two types: **short-term containment**, fast, often improvised actions like isolating an infected machine from the network right now, and **long-term containment**, more deliberate steps like applying temporary patches or rerouting traffic while a full fix is prepared. This is exactly where **network segmentation**, covered back in Module 2, pays for itself — a well-segmented network makes containment dramatically easier, because an attacker or piece of malware confined to one segment simply can't reach everything else.

## 4. Eradication

Eradication means removing the root cause entirely — deleting the malware, closing the vulnerability that allowed access in the first place, disabling a compromised account. Containment stops the bleeding; eradication is what actually treats the wound. Skipping straight to recovery without proper eradication is how organizations get reinfected within days.

## 5. Recovery

Recovery is restoring affected systems to normal operation — carefully and gradually, with close monitoring, not by simply flipping everything back on at once. Systems are typically brought back in stages, watched closely for any sign that the problem wasn't fully eradicated, before the organization considers the incident truly resolved.

## 6. Post-Incident Review

The final phase, often called the "lessons learned" phase, is also the one organizations most often skip under time pressure — understandably, since by this point everyone just wants to move on. That's a mistake. This is where a team documents what happened, what worked, what didn't, and what changes would prevent a repeat, turning a costly incident into something that at least makes the organization measurably better prepared for the next one.

## What's Next

This week's assignment asks you to build an incident response playbook for a malware infection, walking through concrete actions for each of these six phases. Next lesson goes deeper on detection specifically: the monitoring and alerting systems that make phase two actually work, and how organizations classify and prioritize incidents once they're found.
