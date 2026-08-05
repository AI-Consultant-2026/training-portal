---
course: Cyber Security Fundamentals
module: "Module 4: Risk Assessment and Compliance"
week: 8
lesson: 2
lesson_title: "Business Continuity and Disaster Recovery"
db_lesson_content: "How Business Impact Analysis, RTO, and RPO help an organization keep operating through, and recover from, a disruptive event."
target_length_minutes: 8
---

# Lesson 2: Business Continuity and Disaster Recovery

Last lesson covered what organizations are legally required to do. This lesson covers something just as important, but far more practical: what actually happens on the day something goes wrong — a fire, a flood, a ransomware attack, a data center outage — and how an organization keeps functioning through it.

## Business Continuity vs. Disaster Recovery

These two terms are closely related and often used together, but they describe different scopes.

**Business Continuity Planning (BCP)** is the broad discipline of ensuring an organization can continue operating, perhaps in a reduced or modified way, during and after a disruptive event — everything from where staff work if a building is unusable, to how customers get served if the usual systems are down.

**Disaster Recovery (DR)** is narrower, focused specifically on restoring IT systems and data after a disaster. DR is essentially the technical subset of the broader BCP effort — the part concerned with getting servers, applications, and data back online.

## Business Impact Analysis

Before any recovery plan can be built, an organization needs to know what it's actually protecting, and in what order. That's the job of a **Business Impact Analysis (BIA)**: it identifies which business functions are most critical, and how quickly each one needs to be restored if it goes down. Payroll processing and the company's internal wiki are not equally urgent, and a BIA is what makes that priority explicit instead of assumed.

## RTO and RPO

Two numbers come out of a BIA that drive nearly every practical decision afterward.

**Recovery Time Objective (RTO)** is the maximum acceptable time a system or function can be down before serious business harm occurs. If an e-commerce checkout system has an RTO of two hours, the recovery plan has to be able to restore it within that window, full stop.

**Recovery Point Objective (RPO)** is the maximum acceptable amount of data loss, typically measured in time — "we can afford to lose at most 15 minutes of data." RPO directly drives how frequently backups need to be taken. An RPO of 15 minutes requires backups (or continuous replication) far more frequent than an RPO of 24 hours.

Together, RTO and RPO turn a vague goal like "recover quickly" into two concrete numbers that engineering teams can actually design a system around.

## A Plan Is Only as Good as Its Last Test

A beautifully written business continuity plan that has never been tested is not a reliable plan — it's a guess. What separates a plan that actually works from one that only looks good on paper is regular testing, commonly through **tabletop exercises**: structured walkthroughs where a team talks through a simulated disaster step by step, out loud, before a real one ever happens. These exercises reliably surface gaps — a backup that was never actually verified, a contact list with outdated phone numbers, a step nobody remembers being assigned to — while there's still time to fix them calmly, instead of during an actual crisis.

## What's Next

This week's assignment asks you to build a business continuity plan outline of your own, complete with a Business Impact Analysis and clearly defined RTO and RPO values — the same building blocks covered here. Next week moves from planning for disruption to responding to it directly, with the incident response lifecycle: the structured process organizations follow the moment they realize something has actually gone wrong.
