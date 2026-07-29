---
course: Renewable Energy Digital Systems
module: "Module 2: Solar Energy System Design"
week: 3
topics:
  - Component sizing (panels, inverters, charge controllers, wiring)
  - Load calculation and consumption analysis
  - System design software (PVsyst, HOMER)
  - Electrical design and safety
  - Cost estimation and ROI calculation
ties_to:
  assignment: "Create detailed system design document with Bill of Materials (BOM)"
  practical: "Design a complete solar system for a residential or commercial customer"
target_length_minutes: 14
---

# Week 3 Lecture Script: Designing a Complete, Real System

[Open direct to camera]

Last week we covered solar resource assessment and the three fundamental system architectures. This week, we bring everything together into a genuinely complete system design — sizing every major component correctly, and understanding the software and safety practices that turn a design from a rough concept into something genuinely ready for real, actual installation.

## Load Calculation and Consumption Analysis

Every proper solar system design genuinely starts not with the panels themselves, but with a careful, thorough understanding of exactly how much energy the customer actually needs. This is **load calculation**.

The process involves listing every single electrical device the system needs to power, along with each device's power consumption, in watts, and how many hours per day it's typically actually used. Multiplying these together for each device, then summing across every device, gives total daily energy consumption, typically expressed in kilowatt-hours.

I want to emphasize something genuinely important here: accurate load calculation is the single most common point of failure in real, amateur solar system design. Underestimating actual real consumption produces a system that simply cannot reliably meet the customer's genuine needs; significantly overestimating it produces an unnecessarily and needlessly expensive system. Take real, genuine time here, and where realistically possible, use actual measured consumption data rather than relying purely on rough estimates or guesswork.

## Component Sizing

With total load requirements now understood, we can properly size each major system component.

**Panel sizing** determines total required panel capacity, generally calculated by dividing total daily energy need by the peak sun hours we discussed last week, then applying a reasonable safety margin to properly account for real-world losses and unavoidable variation in daily sunlight.

**Inverter sizing**: since panels and batteries produce direct current, or DC, while most household and business appliances require alternating current, or AC, an **inverter** converts between the two. Inverters must be sized to reliably handle the system's genuine maximum expected power demand, generally with an appropriate additional safety margin included to handle brief power surges when larger appliances, like a refrigerator compressor or water pump, first switch on.

**Charge controller sizing**: in systems that include battery storage, a **charge controller** regulates the flow of electricity from the panels into the batteries, both protecting the batteries from being damaged through overcharging and optimizing the actual charging process for genuinely better long-term battery life and health. Charge controllers must be properly sized to handle the maximum current the connected panel array can realistically produce.

**Wiring**: appropriate wire sizing, or gauge, must be carefully selected based on the specific current it will carry and the physical distance it needs to span. Undersized wiring creates genuine safety hazards through overheating, and it can also meaningfully reduce overall system efficiency through unnecessary resistive power loss along the way.

## System Design Software

Professional solar designers commonly rely on specialized software to properly perform these calculations reliably and accurately, going well beyond simple manual estimation alone.

**PVsyst** is widely used specifically for detailed solar system simulation, allowing designers to model real, specific system configurations against actual historical local climate data and get genuinely reliable, detailed performance predictions before any real, physical installation work ever begins.

**HOMER** specializes specifically in optimizing hybrid systems — those combining solar with other generation sources, or, importantly for this region, with existing diesel generator backup, which is a genuinely common and realistic setup in many parts of Nigeria. HOMER can help identify the most cost-effective overall combination of components for a given, specific set of real requirements.

Learning to work confidently with tools like these is genuinely valuable, but I want to reinforce something important: understanding the fundamental underlying calculations we just covered is what allows you to properly sanity-check whatever output any software actually produces, rather than blindly trusting a tool's results without any real, meaningful understanding of what's actually happening underneath.

## Electrical Design and Safety

Solar installations involve genuinely real electrical hazards, and proper safety design is absolutely non-negotiable, not merely an optional nice-to-have consideration.

Key safety considerations include proper grounding to protect against dangerous electrical faults, appropriately rated circuit breakers and fuses to reliably protect against overcurrent conditions, and correct, careful component placement to reasonably minimize fire risk and to ensure genuinely safe, practical ongoing access for future maintenance work. Any real, professional system design should also comply with relevant, applicable local electrical codes and standards, precisely the kind of formal compliance requirement we'll return to in Module 6 when we cover installation planning in real, dedicated depth.

## Cost Estimation and ROI Calculation

Finally, every real system design needs an honest, complete cost estimate and a clear calculation of expected return on investment.

**Cost estimation** should include every major component — panels, inverter, charge controller, batteries if genuinely included, wiring, mounting hardware — along with realistic installation labor costs and appropriate ongoing maintenance costs.

**Return on investment, ROI**, compares this total system cost against the resulting savings on electricity costs over the system's realistic operational lifetime, or against the meaningful value of genuinely improved reliability in areas with poor, inconsistent centralized grid access. A simple, useful **payback period** calculation — total system cost divided by realistic estimated annual savings — gives customers a genuinely clear, easily understood sense of exactly how long a system will practically take to fully pay for itself.

This week's assignment asks you to produce a complete system design document including a full **Bill of Materials, or BOM** — an itemized list of every single component required, along with quantities and cost, exactly the kind of genuinely professional deliverable real solar installation businesses produce for every actual customer.

## Bringing It Together

Today we brought together load calculation, component sizing, professional design software, essential safety principles, and honest cost analysis into one genuinely complete, real system design process. This represents the technical core of solar system design work, and it directly connects to everything from resource assessment last week through to the installation planning we'll cover later in Module 6.

For your assignment, create a complete system design document with a full bill of materials for a specific customer scenario. For your practical exercise, design a genuinely complete solar system for either a residential or commercial customer, applying every technique covered across these past two weeks.

Next week, we move into Module 3: Battery Storage and Energy Management, covering battery technology and smart energy management in real, dedicated depth. See you then.
