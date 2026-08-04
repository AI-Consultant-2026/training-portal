---
course: Cyber Security Fundamentals
module: "Module 1: Cybersecurity Foundations"
week: 1
lesson: 2
lesson_title: "The CIA Triad"
db_lesson_content: "Confidentiality, Integrity, and Availability as the foundation of security."
target_length_minutes: 6
---

# Lesson 2: The CIA Triad

Last lesson was about *where* cybersecurity came from. This lesson is about *how* security professionals actually think — the mental model behind almost every decision you'll see in this course, from a firewall rule to an incident response plan.

That model is called the **CIA Triad**, and once you have it, you'll start noticing it everywhere.

## What Is the CIA Triad?

The CIA Triad names the three goals every security control is trying to protect:

- **Confidentiality** — only the right people can see the information.
- **Integrity** — the information is accurate and hasn't been tampered with.
- **Availability** — the information is there when legitimate users need it.

Every attack you'll study in this course, and every defense you'll learn to build, is ultimately protecting — or breaking — one of these three things. When you're not sure why a security measure exists, ask "which side of the triad is this protecting?" It almost always has an answer.

## Confidentiality: Only the Right People

Confidentiality means information stays visible only to the people who are supposed to see it. A hospital's patient records are a textbook case: if those records are leaked online, nothing about the data itself changes — no file is altered, no system goes down — but confidentiality has still been seriously violated, because people who shouldn't have access now do.

Passwords, encryption, and access controls all exist primarily to protect confidentiality.

## Integrity: Accurate and Untampered

Integrity means the information is correct, and hasn't been secretly changed by someone who shouldn't be changing it. Imagine an attacker who doesn't steal a single naira, but quietly edits account balances in a bank's database. No money visibly "disappears" the way it would in a robbery — but the numbers can no longer be trusted, which for a financial system is just as dangerous as theft.

Checksums, digital signatures, and audit logs all exist primarily to protect integrity.

## Availability: There When You Need It

Availability means legitimate users can actually get to the information or system when they need it. This is exactly what ransomware and denial-of-service attacks target: a ransomware attack doesn't necessarily read or alter your files, it just locks you out of them. A denial-of-service attack doesn't steal anything either — it simply floods a system until real users can't get through.

Backups, redundancy, and capacity planning all exist primarily to protect availability.

## Why All Three Have to Be Balanced

Here's the part beginners often miss: you can't maximize all three at once. Lock information down so tightly that almost nobody can access it, and you've protected confidentiality at the direct expense of availability. Every real security decision is a balance between the three, not a pursuit of any single one in isolation. Part of thinking like a security professional is being able to say, clearly, which side of that balance a given decision is trading against.

## Before You Watch the Video

Keep those three words in your head as you watch: **Confidentiality, Integrity, Availability**. The short video below walks through each one with its own example, and the questions along the way will check that the distinction between them has actually landed — not just the definitions, but which one applies to a given scenario. That's the skill this lesson is really building.
