---
course: Cyber Security Fundamentals
module: "Module 5: Incident Response & Management"
week: 10
topics:
  - Digital forensics basics
  - Evidence preservation and chain of custody
  - Post-incident review and lessons learned
ties_to:
  assignment: "Write an incident report based on a scenario"
  practical: "Conduct basic digital forensics on a sample image file"
target_length_minutes: 12
---

# Week 10 Lecture Script: Investigating What Happened

[Open direct to camera]

Last week we covered the full incident response lifecycle. This week, we go deeper into two specific pieces of that lifecycle: the investigative discipline of digital forensics, and the post-incident review process that turns a difficult experience into lasting organizational improvement.

## Digital Forensics Basics

Digital forensics is the practice of collecting, preserving, and analyzing digital evidence in a way that reconstructs exactly what happened — and, crucially, in a way that could hold up to serious scrutiny, whether that's an internal review, a regulatory investigation, or a criminal court case.

That last point is what makes forensics different from ordinary incident response troubleshooting. When you're just trying to fix a problem quickly, you might restart a server, delete a suspicious file, or overwrite a log to free up space. In forensics, every one of those actions can destroy critical evidence permanently. This is why, during a serious incident, forensic considerations often need to take priority over the urge to simply "clean up and move on" — at least until evidence has been properly preserved.

A core forensic principle is working from a **copy, never the original**. Investigators create an exact, bit-for-bit copy of a hard drive or system — called a forensic image — and conduct all analysis on that copy, ensuring the original evidence remains completely untouched and unaltered, preserved exactly as it was found.

Common forensic techniques include examining file system metadata — when was a file created, modified, or accessed, which can reveal an attacker's timeline of activity; recovering deleted files, since deletion often just removes a file's reference in the file system without actually erasing the underlying data immediately; and analyzing system memory, which can reveal running processes, active network connections, and other volatile information that disappears the moment a system is powered off. This is exactly the kind of hands-on work you'll practice in this week's exercise, examining a sample forensic image file.

## Evidence Preservation and Chain of Custody

Closely tied to forensics is a concept called **chain of custody** — a documented, unbroken record of exactly who has handled a piece of evidence, when, and what they did with it, from the moment it was collected until it's no longer needed.

Why does this matter so much? Imagine an organization discovers evidence that clearly points to an employee committing fraud, but that evidence was handled loosely — passed around informally, copied onto random personal devices, without any documented record. If that case ever reaches a legal proceeding, opposing counsel can argue the evidence was tampered with or is simply unreliable, potentially undermining an otherwise solid case entirely.

Proper chain of custody documentation records: exactly what was collected and from where, exactly when it was collected and by whom, everyone who has had access to that evidence since, and the specific purpose of any handling — for example, "accessed to create a forensic image" or "accessed to verify hash value integrity." Speaking of hash values: forensic evidence is typically verified using cryptographic hashing — a mathematical fingerprint of the data — taken at the moment of collection and rechecked at every subsequent stage. If the hash ever changes, that's immediate, undeniable proof the evidence has been altered somehow, whether accidentally or deliberately.

I recognize this can feel like unnecessary bureaucracy if you've never seen it matter in practice. But I want you to internalize this principle now, early in your career: meticulous documentation is not separate from good security work — it genuinely is good security work. The technical skill of finding what happened is only half the value; being able to prove it happened, rigorously and defensibly, is the other half.

## Post-Incident Review and Lessons Learned

Let's return to the final phase of the incident response lifecycle we introduced last week: post-incident review, sometimes called a post-mortem.

A good post-incident review is conducted soon after an incident is fully resolved, while details are still fresh, but with enough distance that the team isn't still in active crisis mode. It should honestly and directly address: a clear, factual timeline of exactly what happened, from initial compromise through detection, containment, and recovery; what worked well during the response, worth explicitly acknowledging and preserving; what didn't work well, or took longer than it should have; and specific, concrete action items — not vague intentions like "improve monitoring," but precise commitments like "deploy additional log monitoring on the payment processing subnet by the end of next month."

I want to emphasize something important about the culture surrounding this process: an effective post-incident review is genuinely blameless. The goal is identifying and fixing systemic weaknesses, not finding an individual to blame. Organizations that punish employees for reporting or being involved in incidents create a powerful, damaging incentive to hide problems rather than surface them quickly — which makes future incidents both more likely and more severe, since small problems get hidden rather than fixed early. Some of the most mature, effective security cultures I've seen actively celebrate the reporting of near-misses and honest mistakes, precisely because that openness is what allows genuine, continuous improvement.

## Bringing It Together

Digital forensics and rigorous evidence handling ensure that what happened during an incident can be reliably reconstructed and, if necessary, defended under serious legal or regulatory scrutiny. Post-incident review ensures that every difficult incident becomes a source of genuine organizational learning, rather than simply being forgotten the moment normal operations resume. Together, these close out the full incident response lifecycle we began exploring last week.

For your assignment, write a complete incident report based on a provided scenario, applying the structure and honest, blameless tone we discussed today. For your practical exercise, work through basic digital forensics on a sample image file, practicing the careful, methodical approach this discipline demands.

Next week, we move into our final module: Cloud and Data Security, where we'll also begin preparing for your capstone project. See you there.
