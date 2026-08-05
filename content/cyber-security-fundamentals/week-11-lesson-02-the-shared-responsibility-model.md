---
course: Cyber Security Fundamentals
module: "Module 6: Cloud Security"
week: 11
lesson: 2
lesson_title: "The Shared Responsibility Model"
db_lesson_content: "How security responsibility divides between cloud provider and customer, and the IAM, monitoring, and configuration tools that help customers meet their side."
target_length_minutes: 8
---

# Lesson 2: The Shared Responsibility Model

Last lesson introduced IaaS, PaaS, and SaaS, and how much responsibility shifts to the customer in each. This lesson names that dividing line directly: the **shared responsibility model**, and — more importantly — why the customer's side of it is where most real cloud security incidents actually happen.

## Security "Of" the Cloud vs. Security "In" the Cloud

The shared responsibility model is usually summarized as a simple split. The cloud provider is responsible for security **of** the cloud — the physical data centers, the underlying hardware, the infrastructure everything else runs on. The customer is responsible for security **in** the cloud — their own configuration, their access management, and their data.

That split sounds tidy, but it hides an uncomfortable fact: according to real-world incident data, a great many cloud security incidents are actually caused by customer misconfiguration, not provider infrastructure failures. The most commonly cited example is a storage bucket left publicly accessible when it should have been private — not a flaw in the provider's platform, but a setting the customer got wrong. The provider's infrastructure can be extraordinarily secure while an organization still suffers a serious breach entirely due to its own mistake.

## Identity and Access Management (IAM)

The most important tool customers have for meeting their side of the bargain is **IAM — Identity and Access Management**: the systems and policies that control who can access what within a cloud environment.

IAM is built around the **principle of least privilege**: every user and system should have only the minimum access actually necessary to do their job, nothing more. A common, serious mistake is doing the opposite — granting broad administrative access for convenience, "just in case it's needed later." That convenience quietly turns one compromised account into a master key for the entire environment, instead of a narrow, contained problem.

## Monitoring and Configuration Tools

Getting configuration and access right once isn't enough — environments change constantly, so customers also need visibility into what's actually happening and what might have drifted.

Tools like **AWS CloudTrail** and **Azure Monitor** provide security monitoring and logging, recording activity across a cloud environment so unusual behavior can actually be detected and investigated after the fact. Separately, **cloud configuration assessment tools** continuously scan for common misconfigurations — publicly exposed storage, missing encryption, overly permissive access — catching exactly the kind of mistake that causes so many real-world incidents, ideally before an attacker finds it first.

## The Line Doesn't Move by Itself

It's worth restating clearly: nowhere does the shared responsibility model erase the customer's job. Even in the most locked-down SaaS product, someone still has to configure it correctly and manage who has access. The tools in this lesson — IAM, monitoring, and configuration assessment — exist because that job doesn't happen automatically; it has to be actively maintained.

## Bringing Module 6 Together

Across these two lessons, cloud security comes down to understanding exactly where the dividing line sits for whatever service model you're using, and then actually doing the work on your side of it — least-privilege access, careful configuration, and ongoing monitoring. This week's assignment asks you to compare the security features of at least two major cloud providers, with particular attention to how each handles identity and access management — the single control that matters most for staying on the right side of that line.

Next week closes out the course with data protection and capstone planning: classification, encryption, breach notification, and pulling everything from this entire course together into one final project.
