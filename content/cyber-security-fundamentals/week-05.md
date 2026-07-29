---
course: Cyber Security Fundamentals
module: "Module 3: Ethical Hacking & Penetration Testing"
week: 5
topics:
  - Hacker vs. Ethical Hacker distinctions
  - Penetration testing frameworks (NIST, OWASP)
  - Reconnaissance and scanning
ties_to:
  assignment: "Research and compare 3 penetration testing frameworks"
  practical: "Perform reconnaissance on a target system (sandbox environment)"
target_length_minutes: 13
---

# Week 5 Lecture Script: Thinking Like an Attacker, Legally

[Open direct to camera]

Welcome to Module 3. This is the module a lot of people get most excited about when they start a cybersecurity course — ethical hacking, penetration testing, the "offensive" side of security. I want to start today with something important, though, before we get to any techniques: the word "ethical" in "ethical hacking" is not decoration. It's the entire foundation of everything we're about to learn.

## Hacker vs. Ethical Hacker

Let's clear up some language first, because these terms get used loosely and inaccurately all the time, including in movies and news headlines.

A **hacker**, in the original sense of the word, is simply someone with deep technical curiosity about how systems work, often by taking them apart or finding unexpected ways to use them. That's a neutral, even admirable trait on its own.

What actually determines whether hacking is legal or illegal, ethical or malicious, comes down to exactly one thing: **authorization**. Did the person doing the hacking have explicit, documented permission from the owner of the system to test it?

You'll often hear people use color-coded labels. A **black hat hacker** breaks into systems without authorization, for personal gain, malicious intent, or sometimes just because they can. This is criminal activity in essentially every country, including Nigeria under the Cybercrimes Act. A **white hat hacker** — also called an ethical hacker or penetration tester — does the exact same technical work, using many of the same tools and techniques, but always with explicit, written authorization from the system owner, and always with the goal of reporting what they find so it can be fixed. A **grey hat hacker** sits in an uncomfortable middle ground — testing systems without authorization, but without malicious intent, often reporting vulnerabilities afterward. I want to be very clear with you: grey hat activity is still illegal in most jurisdictions, no matter how good the intentions were. In this course, and in your career, you will operate exclusively as a white hat, with authorization, every single time.

This isn't just a legal technicality — it's the entire reason this profession is trusted and valued. Organizations pay ethical hackers specifically because they can rely on a clear scope, a signed agreement, and professional, responsible handling of anything discovered. Everything we do from here forward assumes that authorization exists. In your practical exercise this week, you'll be working entirely within a sandbox environment set up specifically for this course — never on a real system without written permission.

## Penetration Testing Frameworks

Penetration testing isn't just "randomly trying to break in and see what happens." Professional penetration testers follow structured methodologies, which is exactly what this week's assignment asks you to research and compare.

The **NIST framework**, from the U.S. National Institute of Standards and Technology, breaks penetration testing into four phases: planning, where scope and rules of engagement are agreed with the client; discovery, which combines information gathering and scanning; attack, where testers actually attempt to exploit identified weaknesses; and reporting, where findings are documented and communicated back to the organization.

The **OWASP Testing Guide**, from the same organization behind the OWASP Top 10 we discussed in week two, provides an extremely detailed methodology specifically for testing web applications, covering things like authentication testing, session management testing, and input validation testing in granular, practical detail.

There's also the **Penetration Testing Execution Standard, PTES**, which is popular in the industry for defining seven phases: pre-engagement interactions, intelligence gathering, threat modeling, vulnerability analysis, exploitation, post-exploitation, and reporting.

Notice a pattern across all of these frameworks? They all put significant structure around the beginning — defining scope and gathering information — and the end — documenting and reporting. The "exciting" part, actually breaking in, is genuinely just one phase among several, and often not even the most time-consuming one. Real professional penetration testing is disciplined, methodical work, not the fast-paced hacking scenes you see in films.

## Reconnaissance and Scanning

Let's talk about the first real technical phase: reconnaissance, often just called "recon." This is the process of gathering information about a target before attempting anything active.

**Passive reconnaissance** gathers information without directly interacting with the target system at all — searching public records, reading a company's own website and job postings for clues about their technology stack, checking social media for employees who might mention internal systems, or using search engines with advanced queries to find exposed documents or misconfigured servers. Because passive recon never touches the target directly, it's essentially invisible to that target.

**Active reconnaissance** involves direct interaction with the target — for example, sending network traffic to see what responds. This is more revealing, but also detectable, which is exactly why authorization and clear scope matter so much: an organization's security team needs to know a test is happening, or your reconnaissance activity might trigger a real incident response.

Once reconnaissance identifies systems and services worth investigating, **scanning** begins — actively probing those systems to discover more detail. Port scanning identifies which network ports are open and what services are running behind them. Vulnerability scanning goes further, checking those services against databases of known weaknesses. We'll get hands-on with the specific tools for this, including Nmap, next week — this week's practical exercise focuses purely on the reconnaissance phase, gathering information within your sandbox environment before any active scanning begins.

## Bringing It Together

I want to leave you with a mindset, not just a set of facts. Ethical hacking is fundamentally about empathy for the defender — you are trying to find weaknesses before a real attacker does, so that they can be fixed. Every technique you learn in this module exists to make organizations safer, not to prove how clever you are. Keep that framing in mind, and it will guide you well through every technical detail we cover from here forward.

For your assignment, research and compare those three frameworks — NIST, OWASP, and PTES — and think about when an organization might prefer one over another. For your practical exercise, practice reconnaissance within the provided sandbox, focusing on information gathering rather than active exploitation.

Next week, we go hands-on with actual tools — Nmap, Metasploit, and Burp Suite — and talk about how to responsibly report what you find. See you then.
