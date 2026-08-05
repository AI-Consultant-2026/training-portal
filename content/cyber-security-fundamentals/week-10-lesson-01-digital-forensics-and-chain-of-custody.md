---
course: Cyber Security Fundamentals
module: "Module 5: Incident Response and Recovery"
week: 10
lesson: 1
lesson_title: "Digital Forensics and Chain of Custody"
db_lesson_content: "How investigators preserve and analyze digital evidence on forensic copies, and why documented chain of custody keeps that evidence defensible."
target_length_minutes: 8
---

# Lesson 1: Digital Forensics and Chain of Custody

The last module covered responding to an incident and recovering from it. This module covers what comes after: understanding, in precise and defensible detail, exactly what an attacker did. That's the job of digital forensics.

## What Digital Forensics Actually Is

**Digital forensics** is the practice of collecting, preserving, and analyzing digital evidence to reconstruct exactly what happened, in a way that's defensible — meaning it could hold up to scrutiny from a court, a regulator, or a skeptical executive, not just a technical peer. That defensibility requirement changes everything about how the work is done, compared to an ordinary technical investigation.

## Never Touch the Original

The single most important principle in digital forensics is this: investigators never analyze the original evidence directly. Instead, they work from a **forensic image** — an exact, bit-for-bit copy of a hard drive or system. Every analysis step happens on the copy, while the original is preserved untouched. This matters because analysis itself can alter data, and if the original evidence changes after collection, its value in any later proceeding collapses.

## What Forensic Analysis Can Reveal

A forensic image holds far more information than most people expect. Examining file system **metadata** — timestamps recording when files were created, modified, or accessed — can reconstruct an attacker's timeline of activity in surprising detail. Deleted files can frequently be recovered too, because deletion usually just removes a file's reference in the file system without immediately erasing the underlying data; the data often just sits there until something else overwrites it. And if a system's memory was captured before it was powered off, analyzing it can reveal running processes and active network connections — live details that vanish completely the moment a machine shuts down, making memory capture a genuinely time-sensitive part of the response.

## Chain of Custody

None of this matters if nobody can prove the evidence is trustworthy. **Chain of custody** is a documented, unbroken record of exactly who has handled a piece of evidence, when, and what they did with it — from the moment it was collected all the way through analysis and any eventual proceeding. A gap in that record is a gap an opposing party can use to argue the evidence isn't reliable, regardless of how solid the actual analysis was.

**Cryptographic hashing** is the technical backbone of chain of custody. At the moment evidence is collected, investigators generate a hash — a mathematical fingerprint of the data. That same hash is rechecked later, and if it matches, the evidence is provably unchanged. If it doesn't match, the evidence has been altered somehow, accidentally or deliberately, and everyone downstream knows immediately rather than trusting an untested copy.

## Why This Discipline Matters Beyond the Obvious

It's tempting to think of forensics and chain of custody as red tape that only matters if a case goes to court. In practice, this level of rigor is simply what good security work looks like — the same careful documentation that makes evidence defensible also makes an organization's own understanding of an incident more accurate and more trustworthy internally.

## What's Next

This week's assignment asks you to write a complete incident report based on a scenario, with a clear factual timeline and a professional tone — exactly the discipline this lesson describes. Next lesson turns to the human side of wrapping up an incident: how to run a post-incident review that actually makes an organization better, instead of just assigning blame.
