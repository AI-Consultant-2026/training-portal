---
course: Cyber Security Fundamentals
module: "Module 1: The CIA Triad & OWASP Top 10"
week: 2
lesson: 1
lesson_title: "The CIA Triad"
db_lesson_content: "Confidentiality, integrity, and availability as the three goals every security decision balances."
target_length_minutes: 6
---

# Lesson 1: The CIA Triad, Revisited

Welcome back to the CIA Triad — yes, again. Last week you met **Confidentiality**, **Integrity**, and **Availability** for the first time. This week isn't about relearning the definitions. It's about the harder skill: recognizing which one is actually in play in a given situation, and understanding why the three of them are usually pulling *against* each other, not working together for free.

## A Quick Refresher, Not a Restart

Confidentiality: only the right people see it. Integrity: the information hasn't been tampered with. Availability: it's there when legitimate users need it. If those three already feel familiar, good — that's the point. Everything below builds on them; nothing repeats them from scratch.

## The Real Skill: Spotting the Tension

Here's what most beginners get wrong: they think good security means maximizing all three at once. It doesn't, and it can't. The three goals actively compete with each other, and every real security decision is really a decision about which one wins in a given moment.

Take encryption. Encrypting a hospital's database protects confidentiality beautifully — nobody without the key can read it. But now imagine that key is lost, or the decryption process is too slow during an emergency. You've just weakened availability in the name of protecting confidentiality. Neither choice is "wrong." It's a trade-off, and the right answer depends entirely on context — an emergency room needs different defaults than a bank vault.

## Applying This as a Decision Lens

From here on, whenever you look at any security control — a password policy, a backup schedule, a firewall rule — ask two questions: **which of the three goals is this control mainly protecting?** And **what is it costing on the other two?** That single habit is closer to what a working security professional actually does all day than any list of tools or acronyms.

## Why This Matters for What's Coming

Every module ahead of you — network security, ethical hacking, incident response, cloud security — is really just this same balancing act, applied to a different layer of the system. You now have the lens. The rest of the course is practice using it.

## This Week's Practical

For this week's practical exercise, you'll document the security controls present in a sample IT environment, and for each one, name which side of the CIA Triad it's mainly protecting — and what it costs elsewhere. That's the exact skill this lesson just walked you through.
