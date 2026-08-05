---
course: Cyber Security Fundamentals
module: "Module 6: Cloud Security"
week: 11
lesson: 1
lesson_title: "IaaS, PaaS, and SaaS"
db_lesson_content: "The three major cloud service models and how much security responsibility shifts to the customer in each."
target_length_minutes: 7
---

# Lesson 1: IaaS, PaaS, and SaaS

Every module so far has assumed infrastructure an organization directly controls: its own servers, its own network, its own physical building. This module drops that assumption. Most organizations today run at least part of their operations on someone else's infrastructure — the cloud — and that changes exactly who is responsible for securing what.

## Infrastructure as a Service (IaaS)

**IaaS** provides the most basic building blocks: virtual servers, storage, and networking. Amazon EC2 and Azure Virtual Machines are the textbook examples. The provider handles the physical data center, the hardware, and the virtualization layer underneath — but everything above that is the customer's job: the operating system, patching it, the runtime environment, and every piece of software running on it. IaaS gives an organization maximum flexibility, paired with maximum responsibility.

## Platform as a Service (PaaS)

**PaaS** moves the line further up the stack. The provider now handles patching the operating system, managing the runtime environment, and automatically scaling infrastructure as demand changes — work that, in an IaaS model, would fall entirely on the customer. The customer's job shrinks down to what actually matters to them: writing and managing their application code and its data. PaaS trades some of that IaaS flexibility for meaningfully less operational and security overhead.

## Software as a Service (SaaS)

**SaaS** goes furthest: a complete, ready-to-use application, with almost nothing left for the customer to manage on the technical side. Google Workspace, Microsoft 365, and Salesforce are the classic examples. The provider manages essentially everything underneath the application. The customer's main security responsibility narrows down to properly configuring the application's security settings and managing who has access to it — which sounds simple, but is exactly where a great many real-world breaches actually happen.

## The Line Keeps Moving

Across all three models, the same underlying question applies: where does the provider's responsibility end and the customer's begin? IaaS draws that line low, near the physical hardware. SaaS draws it high, near the login screen. PaaS sits in between. None of the three eliminates the customer's responsibility entirely — it only changes its shape and its size.

## What's Next

Understanding these three models is the foundation. Next lesson goes deeper into the shared responsibility model itself — precisely how that dividing line gets drawn, why so many real cloud security incidents trace back to the customer's side of it rather than the provider's, and the tools that help customers actually meet their side of the bargain.
