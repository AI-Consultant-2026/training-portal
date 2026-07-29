---
course: Cyber Security Fundamentals
module: "Module 6: Cloud & Data Security"
week: 11
topics:
  - Cloud service models (SaaS, PaaS, IaaS) and security
  - Cloud provider shared responsibility model
  - Cloud security tools and monitoring
ties_to:
  assignment: "Compare security features across cloud providers"
  practical: "Configure security in a cloud environment (AWS/Azure free tier)"
target_length_minutes: 13
---

# Week 11 Lecture Script: Security Doesn't Stop in the Cloud

[Open direct to camera]

Welcome to our final module. Over the past ten weeks, we've mostly discussed security in terms of systems an organization owns and controls directly — their own servers, their own network. But increasingly, and especially for the small and mid-sized businesses many of you will work with, critical systems and data live in the cloud, run on infrastructure owned by companies like Amazon, Microsoft, or Google. This week, we look at what changes, and what doesn't, when security moves to the cloud.

## Cloud Service Models

Cloud computing isn't one single thing — it comes in several distinct models, and understanding which one you're dealing with directly determines who is responsible for what security controls.

**Infrastructure as a Service, IaaS**, provides the most basic building blocks: virtual servers, storage, and networking, with the customer responsible for essentially everything above that — the operating system, all software, all configuration, all data. Amazon EC2 and Azure Virtual Machines are classic examples. Think of it as renting an empty apartment: you get walls, plumbing, and electricity, but everything inside is entirely up to you.

**Platform as a Service, PaaS**, provides a managed environment for running applications without needing to manage the underlying servers or operating system directly — the provider handles patching the OS, managing the runtime environment, and scaling infrastructure automatically. The customer focuses purely on their application code and data. This is like renting a furnished apartment with maintenance included — you don't fix the plumbing yourself, but you're still responsible for keeping your own belongings secure.

**Software as a Service, SaaS**, provides a complete, ready-to-use application — think Google Workspace, Microsoft 365, or Salesforce. The provider manages essentially everything: infrastructure, platform, and the application itself. The customer's responsibility narrows down mainly to properly configuring the application's security settings and managing who has access to their account.

## The Shared Responsibility Model

This brings us directly to one of the most important, and most commonly misunderstood, concepts in cloud security: the **shared responsibility model**.

Every major cloud provider is explicit about this: security is a shared responsibility between the provider and the customer, and exactly where that dividing line falls shifts depending on which service model — IaaS, PaaS, or SaaS — you're using. Broadly speaking, cloud providers are responsible for security **of** the cloud — the physical data centers, the underlying hardware, the core network infrastructure, and in higher-level services, the operating system and platform itself. Customers remain responsible for security **in** the cloud — how they configure their services, how they manage access and identity, and critically, their own data.

I want to be very direct about why this matters so much, practically: an enormous number of real-world cloud security incidents are not failures of the cloud provider's infrastructure at all. They're failures of customer configuration — a storage bucket left publicly accessible when it should have been private, overly permissive access controls, or weak identity management. The cloud provider's infrastructure can be extraordinarily secure, and an organization can still suffer a serious breach purely through their own misconfiguration.

This connects directly back to something we discussed all the way back in Module 1: attackers don't need to break sophisticated encryption if a simpler mistake — like a misconfigured setting — leaves the door open instead. Cloud security, in large part, is about disciplined configuration management, not exotic new technical skills.

## Cloud Security Tools and Monitoring

Fortunately, major cloud providers offer substantial built-in tooling to help customers meet their side of the shared responsibility model.

**Identity and Access Management, IAM**, systems control precisely who can access what within a cloud environment, and are arguably the single most important security control in any cloud setup. The core principle here, one you should carry with you into every system you ever configure, is **least privilege**: every user and every system should have only the minimum access actually necessary to do their job — nothing more. A common, serious mistake is granting broad administrative access for convenience, "just in case it's needed later," rather than granting specific, narrow permissions as they're actually required.

Cloud providers also offer **security monitoring and logging services** — AWS CloudTrail, Azure Monitor, and similar tools — which record detailed activity across an entire cloud environment, extending the monitoring and alerting concepts we covered back in Module 5 into cloud infrastructure specifically.

Many providers additionally offer **configuration assessment tools** that continuously scan an environment for common security misconfigurations — publicly exposed storage, weak access policies, missing encryption — essentially automating the vulnerability assessment work we covered in Module 3, but specifically tailored to cloud environments.

## Bringing It Together

Cloud computing doesn't eliminate the need for security expertise — it relocates and reshapes where that expertise needs to be applied. Understanding the shared responsibility model, applying least privilege access rigorously, and using the monitoring tools cloud providers make available are the core disciplines of cloud security, and they build directly on nearly everything we've covered throughout this entire course: network segmentation principles now apply within virtual cloud networks, incident response plans need to explicitly account for cloud environments, and the compliance frameworks we discussed in Module 4 very often have specific cloud-related requirements.

For your assignment, compare the security features offered across at least two major cloud providers, paying close attention to how each one implements identity and access management. For your practical exercise, you'll configure security settings within an AWS or Azure free-tier environment, getting genuine, hands-on experience applying the shared responsibility model in practice.

Next week, in our final lecture, we cover data protection and encryption in the cloud, and we'll spend real time preparing your capstone project — your opportunity to bring everything from this entire course together into one comprehensive, practical piece of work. See you there.
