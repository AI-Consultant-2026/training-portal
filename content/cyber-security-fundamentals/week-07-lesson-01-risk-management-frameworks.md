---
course: Cyber Security Fundamentals
module: "Module 4: Risk Assessment and Compliance"
week: 7
lesson: 1
lesson_title: "Risk Management Frameworks"
db_lesson_content: "Why organizations can't defend against every threat, and how the NIST Risk Management Framework and ISO 27001 bring structure to prioritizing risk."
target_length_minutes: 8
---

# Lesson 1: Risk Management Frameworks

Every lesson so far has focused on offense and defense in the moment: what a threat looks like, how to find a vulnerability, how to secure a network. This week shifts up a level, into the discipline that decides where all of that effort actually gets pointed: risk management.

## No Organization Can Defend Against Everything

It would be convenient if security just meant "defend against every possible threat." In practice, no organization — not even the best-funded ones — has unlimited time, budget, or attention. Every dollar spent hardening one system is a dollar not spent somewhere else, and every hour an analyst spends on one control is an hour not spent monitoring another. Risk management exists to make that tradeoff deliberately instead of by accident.

Consider a small business deciding where to focus. A sophisticated nation-state attacker targeting their systems is a genuinely frightening scenario — but for most small businesses, it's also extremely unlikely. An employee accidentally emailing a spreadsheet full of customer data to the wrong recipient is far more probable, and usually far cheaper to prevent, through simple controls like email warnings and access restrictions. A mature security program doesn't ignore the rare, severe threat, but it doesn't let it crowd out the mundane, likely one either.

## The NIST Risk Management Framework

The **NIST Risk Management Framework (RMF)**, developed by the U.S. National Institute of Standards and Technology, is one of the most widely referenced structures for making this kind of prioritization systematic, especially across government and its contractors.

It works as a sequence of steps. It begins with **categorizing** systems, based on the potential impact if their confidentiality, integrity, or availability were compromised — a customer payment database gets categorized very differently than an internal lunch-menu wiki. From there, the framework moves through **selecting** appropriate security controls for that impact level, **implementing** them, **assessing** whether they actually work as intended, formally **authorizing** the system to operate, and then **monitoring** it continuously — because risk isn't a one-time judgment made at launch and forgotten.

## ISO 27001

**ISO 27001** is an international standard for building an **Information Security Management System (ISMS)** — essentially, a structured, organization-wide system for managing information security risk, not just a checklist of technical controls.

The key difference from the NIST RMF is certification. Organizations can be formally, independently audited against ISO 27001 and awarded certification — a credential that's often demanded by enterprise customers and partners before they'll trust an organization with their data.

ISO 27001 is built around a continuous improvement cycle: **Plan**, **Do**, **Check**, **Act**. An organization plans its security controls based on identified risks, does — implements them, checks whether they're working through audits and reviews, and acts on what it learns to improve the system, before the cycle repeats. Security, in this model, is never "finished."

## Two Frameworks, One Goal

NIST RMF and ISO 27001 differ in origin and structure, but they share the same underlying goal: replacing gut-feeling security decisions with a repeatable, defensible process for deciding where risk actually deserves attention.

## What's Next

Understanding that risk needs to be prioritized is only the first half. Next lesson gets specific: how to actually identify and measure risk, including the qualitative and quantitative methods organizations use to decide just how much any given risk is worth worrying about.
