export const CAPSTONE = {
  title: "Sector Cybersecurity Risk Assessment & Incident Response Capstone",
  description: `Choose ONE of the three sector options below and act as an entry-level cybersecurity analyst engaged to produce a foundational risk assessment and incident-response plan for a fictional Nigerian organisation. Every option draws on the same core skills this course built in Days 1-12 -- threat/vulnerability/risk thinking, authentication, phishing resistance, malware/ransomware response, network security, access control, incident response, and data protection -- applied to the specific systems, threats, and regulatory environment of one sector. This capstone is educational and strictly defensive: do not include, and you will not be asked to produce, any instructions that could be used to actually attack a real system. All organisations, incidents, and scenarios below are fictional.

## Option A -- Oil & Gas: Meridian Delta Energy

**Scenario.** Meridian Delta Energy is a fictional mid-sized Nigerian upstream and midstream operator running a flow station, a gathering pipeline network, and a small tank farm. Its control room uses a SCADA system to monitor pressure and flow across the facility; several maintenance contractors have remote VPN access to that system for scheduled diagnostics. The IT team recently connected the SCADA historian (a data-logging server) to the corporate network so engineers can view production data from their office laptops -- a convenience nobody formally risk-assessed.

**Tasks.**
1. Identify at least six distinct hazards/threats across both IT and OT systems (include at least one specific to the SCADA/OT environment, one specific to contractor remote access, and one specific to the new IT/OT network connection).
2. Score each on a simple likelihood x impact risk matrix, and propose one control per risk drawn from the hierarchy of controls covered in this course.
3. Write a short (200-300 word) ransomware scenario affecting Meridian Delta's IT network, and outline your prevention, detection, response, and recovery plan -- specifically addressing whether and how you would isolate OT systems from a compromised IT network.
4. Outline a basic incident-response plan (using the six-phase lifecycle from Day 9) tailored to this facility, including who gets notified and in what order.
5. Note one relevant international framework (IEC 62443 or NIST CSF) and explain in 2-3 sentences why it's relevant here, without treating it as Nigerian law.

**Required submission:** a single written report (1,500-2,500 words) covering all five tasks, organised under clear headings, plus a simple risk-matrix table.

## Option B -- Banking & Financial Services: NovaTrust Bank

**Scenario.** NovaTrust Bank is a fictional Nigerian retail bank with a growing mobile banking app. Customer support recently noticed a spike in complaints about unauthorised transfers -- in each case, the customer reports receiving a call from someone claiming to be "NovaTrust Fraud Prevention" shortly before the transfer occurred. Separately, the bank's payment-processing team wants to launch a new instant-transfer feature within two months and has asked for a quick security opinion.

**Tasks.**
1. Diagnose the account-takeover pattern described above: identify the likely attack chain (what information or access the attacker needed, and how they probably obtained it), referencing this course's Day 2 (Authentication) and Day 5 (Social Engineering) content specifically.
2. Recommend at least four concrete controls to reduce this specific fraud pattern, explicitly including MFA and one customer-education measure.
3. Produce a short risk assessment (asset/threat/vulnerability/impact) for the new instant-transfer feature, identifying at least four risks and a control for each.
4. Reference the CBN's current risk-based cybersecurity framework for banks and explain, in 2-3 sentences, why an entry-level analyst would need to be aware of it even without owning compliance directly.
5. Write a one-paragraph incident-response summary for how NovaTrust should handle a confirmed case of this fraud pattern once reported by a customer.

**Required submission:** a single written report (1,500-2,500 words) covering all five tasks, organised under clear headings, plus a simple risk table for task 3.

## Option C -- Telecommunications: Umbra Mobile

**Scenario.** Umbra Mobile is a fictional Nigerian mobile network operator. Its customer-care team has been targeted by a wave of calls from people claiming to be network engineers requesting "verification" of customer SIM details over the phone -- a pattern consistent with attempted SIM-related fraud. Separately, Umbra's network operations team is planning early 5G rollout in a major city and has asked security to flag anything they should plan for now rather than later.

**Tasks.**
1. Design an internal control (a procedure, not a technology purchase) that would make Umbra's customer-care staff significantly harder to social-engineer in the scenario above, referencing least privilege and identity verification from this course's core modules.
2. Explain, in your own words, how the country's NIN-SIM linkage policy and a tool like the NCC's TIRMS portal reduce (but do not eliminate) SIM-related fraud risk -- and identify one risk that remains even with both in place.
3. Identify at least four security considerations Umbra's security team should flag for the 5G rollout (drawing on this course's 5G Security Fundamentals lesson), and explain why each matters at a beginner-appropriate level of detail.
4. Write a short (200-300 word) DDoS scenario affecting Umbra's customer-facing systems and outline your detection and mitigation response, without providing any attack-execution detail.
5. Outline a basic incident-response plan for a confirmed customer-data exposure at Umbra, referencing the NDPC's role and Umbra's own notification obligations.

**Required submission:** a single written report (1,500-2,500 words) covering all five tasks, organised under clear headings.

## Assessment Criteria (all three options, 100 points total)

- **Risk identification and thinking (25 points):** hazards/threats/risks identified are specific to the scenario, not generic, and show genuine understanding of likelihood vs. impact.
- **Application of core fundamentals (25 points):** the submission visibly draws on specific concepts from Days 1-12 (authentication, phishing, malware, network security, access control, incident response, data protection) rather than treating the sector pathway as disconnected from the core.
- **Sector awareness (20 points):** the submission demonstrates understanding of what makes this sector's cybersecurity genuinely different (OT/SCADA for Oil & Gas, payment/fraud dynamics for Banking, network availability/SIM identity for Telecom), not just relabeled generic advice.
- **Response and recovery thinking (15 points):** incident-response and recovery recommendations are concrete, ordered, and realistic for an entry-level analyst to propose.
- **Communication (15 points):** the report is clearly organised, uses headings, explains technical terms on first use, and could be understood by a non-technical manager.

## Expected Competencies

A learner who completes this capstone successfully will have demonstrated: hazard/threat/vulnerability identification and risk scoring; application of authentication, phishing-resistance, and malware/ransomware defence principles to a real-world-shaped scenario; incident-response planning using a structured lifecycle; sector-aware judgement about what's genuinely different in Oil & Gas, Banking, or Telecommunications cybersecurity; and the ability to communicate a cybersecurity risk clearly to a non-technical stakeholder -- the same skill set this course connects to entry-level roles like Cybersecurity Analyst (Entry Level), SOC Analyst (Junior), Information Security Assistant, Risk & Compliance Assistant, and OT Cybersecurity Trainee.`,
};
