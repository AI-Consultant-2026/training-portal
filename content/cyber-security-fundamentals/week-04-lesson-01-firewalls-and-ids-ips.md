---
course: Cyber Security Fundamentals
module: "Module 2: Firewalls, IDS/IPS & VPNs"
week: 4
lesson: 1
lesson_title: "Firewalls and IDS/IPS"
db_lesson_content: "Packet-filtering, stateful, and next-generation firewalls, plus how intrusion detection and prevention systems respond to malicious traffic."
target_length_minutes: 8
---

# Lesson 1: Firewalls and IDS/IPS

Last week you learned how networks are structured — the OSI model, TCP/IP, segmentation. This week, we start building the actual defenses on top of that structure. By the end of this lesson, you'll know the two tools that sit at the front line of almost every organization's network security.

## Firewalls: The Checkpoint

A firewall is, at its core, a checkpoint. It sits between two networks — often between your internal network and the wider internet — and decides, based on a set of rules, what traffic is allowed through and what gets blocked.

The simplest kind is a **packet-filtering firewall**, which decides using just three things: source IP, destination IP, and port number. Think of ports as specific doors on a building — 80 and 443 are the standard doors for web traffic, 22 is the door for secure remote administration. A rule as simple as "allow port 443, block everything else from outside" already dramatically shrinks what an attacker can reach.

**Stateful firewalls** go further. Instead of judging each packet in isolation, they track the state of an entire conversation. If your computer starts a connection to a website, a stateful firewall remembers that exchange and lets the reply back through — but it won't let an unsolicited connection walk in claiming to belong to a conversation that never happened.

**Next-generation firewalls** go further still, inspecting the actual content of traffic rather than just its headers, often integrated directly with the intrusion detection systems we're about to cover.

Whichever type you're configuring, the golden principle stays the same: **default deny**. Start by blocking everything, and open only the specific, minimum set of doors the business actually needs. That's the opposite of how a lot of poorly secured networks end up configured — wide open by default, with rules bolted on reactively after something already went wrong.

## IDS and IPS: Detecting vs. Blocking

A firewall is a locked door with a specific list of who's allowed through. But what happens once someone's already inside, or finds a clever way past the door? That's where IDS and IPS come in.

An **Intrusion Detection System (IDS)** monitors traffic for patterns that suggest malicious activity — a flood of connection attempts that looks like port scanning, traffic matching a known malware signature, behavior that deviates from a normal baseline. Critically, an IDS is passive: it detects and alerts, but doesn't block anything itself. It's the smoke detector, not the sprinkler system.

An **Intrusion Prevention System (IPS)** does everything an IDS does, then goes one step further: when it detects something malicious, it can actively block that traffic in real time. That's more powerful, but riskier — a poorly tuned IPS can accidentally block legitimate traffic, which is why many organizations run new detection rules in "monitor only" mode first, before ever switching them to active blocking.

Two detection approaches show up constantly: **signature-based detection** compares traffic against a database of known attack patterns — extremely reliable against known threats, blind to brand-new ones it hasn't seen before. **Anomaly-based detection** builds a baseline of what "normal" looks like on a given network, then flags meaningful deviations from it — able to catch novel attacks, at the cost of more false alarms, since plenty of unusual-but-harmless activity can look suspicious to it too.

## What's Next

You now have the front line: firewalls controlling what's allowed in, IDS and IPS watching and responding to what gets through anyway. Next lesson adds the other two pillars of network defense — VPNs, and the monitoring tools that let you actually watch what's happening on a live network.
