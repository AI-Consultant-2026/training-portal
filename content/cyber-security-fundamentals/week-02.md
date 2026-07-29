---
course: Cyber Security Fundamentals
module: "Module 1: Cybersecurity Foundations"
week: 2
topics:
  - The CIA Triad (Confidentiality, Integrity, Availability)
  - Common vulnerabilities (OWASP Top 10 overview)
  - Cybersecurity career paths
ties_to:
  assignment: "Create a personal cybersecurity awareness checklist"
  practical: "Document security controls in a sample IT environment"
target_length_minutes: 12
---

# Week 2 Lecture Script: The CIA Triad, the OWASP Top 10, and Where You Fit

[Open direct to camera]

Welcome back. Last week we talked about the different shapes cyberattacks take — malware, ransomware, phishing, and social engineering. This week, we're going to zoom out and talk about the philosophy that underpins everything a security professional does. Once you understand this one framework, you'll find it much easier to reason about any security problem you come across, even ones we haven't covered yet.

## The CIA Triad

CIA here has nothing to do with intelligence agencies — it stands for Confidentiality, Integrity, and Availability. This is the single most important model in all of cybersecurity, so I want you to really sit with each piece.

**Confidentiality** means making sure information is only accessible to the people who are supposed to see it. If a hospital's patient records are leaked online, that's a confidentiality failure — even if nothing was changed or deleted, the harm is that private information became visible to people who shouldn't have had access. Confidentiality is protected through things like access controls, encryption, and strong authentication — all topics we'll dig into deeply as the course progresses.

**Integrity** means making sure information is accurate and hasn't been tampered with, whether by an attacker or by an honest mistake. Imagine an attacker doesn't steal any money from a bank, but instead quietly changes account balances in the database. Nothing was "stolen" in the traditional sense, but the data can no longer be trusted — and that's often worse. Integrity is protected through things like checksums, digital signatures, and version control.

**Availability** means making sure systems and data are accessible when they're needed by the people who legitimately need them. This is exactly what ransomware attacks and something called a Denial-of-Service attack target — not stealing data, but making it unavailable. A hospital that can't access patient records during an emergency because of a ransomware attack is experiencing a catastrophic availability failure, even though the data technically still exists, locked away.

Here's the important part: these three goals are often in tension with each other. If you lock information down so tightly that only one person can access it, you've maximized confidentiality but potentially wrecked availability for everyone else who legitimately needs it. Good security isn't about maximizing any one of these — it's about finding the right balance for the specific organization and the specific data you're protecting. Every decision you'll make throughout the rest of this course, from firewall rules to incident response plans, is really a decision about how to balance these three goals.

## The OWASP Top 10

Now let's talk about a resource you'll hear referenced constantly, not just in this course but throughout your entire career: the OWASP Top 10.

OWASP stands for the Open Web Application Security Project — a nonprofit that has spent over two decades studying real-world security incidents and publishing free, practical guidance. Their most famous publication is the OWASP Top 10, a regularly updated list of the ten most critical security risks facing web applications.

I'm not going to walk through all ten in detail today — some of them, like injection attacks and broken access control, we'll cover in depth when we get to ethical hacking in Module 3. But I want you to understand the purpose of a list like this: it exists because the same handful of mistakes get made, over and over, by different organizations, in different countries, in different industries. If you learn to recognize these common patterns now, you will spend the rest of your career spotting them everywhere — because they really are everywhere.

A few examples worth knowing right now: broken access control, where a system fails to properly check whether a user is allowed to do something before letting them do it; security misconfiguration, where a system is left with default passwords, unnecessary features enabled, or overly permissive settings; and vulnerable and outdated components, where an organization is running old software with known, publicly documented flaws that nobody has bothered to patch.

Notice something? None of these require an attacker to be a genius. Most successful attacks exploit basic oversights, not brilliant hacking. That should be reassuring — it means that disciplined, careful defenders can prevent the overwhelming majority of attacks just by doing the fundamentals well.

## Cybersecurity Career Paths

I want to close this week by talking about where this can take you, because I think it's easy to feel overwhelmed this early in the course without a clear picture of the destination.

Cybersecurity isn't one job — it's an entire industry with many different paths, and they don't all require the same skills or personality type.

If you enjoy building and configuring things, you might be drawn to **security engineering** — designing and implementing the actual defenses: firewalls, encryption systems, secure network architecture.

If you're naturally curious and enjoy a bit of a puzzle-solving challenge, **penetration testing** — which we'll cover in Module 3 — might appeal to you. This is the job of legally, ethically breaking into systems to find weaknesses before criminals do.

If you're detail-oriented and calm under pressure, **incident response** and **digital forensics** — covered in Module 5 — could be a great fit. This is the work of investigating what happened after a breach and helping an organization recover.

If you enjoy policy, documentation, and working with people across an organization, **governance, risk, and compliance** — what we call GRC, covered in Module 4 — is a growing and well-paying field that doesn't require deep technical hacking skills at all.

And if you enjoy analyzing large amounts of data and spotting patterns, **security operations** — monitoring systems for signs of an ongoing attack — is a strong path as well.

The point I want you to take away is this: there is no single "correct" way to be good at cybersecurity. As you go through the rest of this course, pay attention to which topics genuinely excite you. That's useful information about where you might want to specialize.

## This Week's Work

For your assignment, you're going to create a personal cybersecurity awareness checklist — practical things anyone can do to protect themselves: strong, unique passwords, multi-factor authentication, being skeptical of unexpected messages, keeping software updated. Write it as if you were teaching a family member who has never thought about this before. That skill — translating technical knowledge into plain language — is one of the most valuable and most underrated skills in this entire industry.

For your practical exercise, you'll be documenting the security controls present in a sample IT environment, using the CIA Triad as your lens: which controls protect confidentiality, which protect integrity, and which protect availability?

Next week, we move into Module 2 and start getting technical with network security — the OSI Model, TCP/IP, and the beginning of hands-on work with firewalls. I'll see you there.
