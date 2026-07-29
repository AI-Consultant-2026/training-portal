---
course: Cyber Security Fundamentals
module: "Module 2: Network Security"
week: 4
topics:
  - Firewall technologies and rules
  - Intrusion Detection Systems (IDS) and Intrusion Prevention Systems (IPS)
  - VPN technologies and implementation
  - Network monitoring tools
ties_to:
  assignment: "Create a firewall rule documentation for a sample network"
  practical: "Analyze network traffic using Wireshark; identify suspicious patterns"
target_length_minutes: 14
---

# Week 4 Lecture Script: Firewalls, IDS/IPS, VPNs, and Watching the Network

[Open direct to camera]

Last week we covered how networks are structured — the OSI model, TCP/IP, and segmentation. This week, we take that foundation and start building the actual defenses that sit on top of it. By the end of today, you'll understand the four tools that form the backbone of almost every organization's network security: firewalls, intrusion detection and prevention systems, VPNs, and network monitoring.

## Firewalls

A firewall is, at its core, a checkpoint. It sits between two networks — often between your internal network and the wider internet — and decides, based on a set of rules, what traffic is allowed to pass and what gets blocked.

The simplest kind of firewall is a **packet-filtering firewall**, which makes decisions based on information in each packet: the source IP address, the destination IP address, and the port number. Think of ports as specific doors on a building — port 80 and 443 are the standard doors for regular web traffic, port 22 is the door for secure remote administration, and so on. A basic rule might say: "allow traffic to port 443, block everything else from the outside." That single rule already dramatically reduces what an attacker can reach.

More advanced firewalls are called **stateful firewalls**. Rather than looking at each packet in isolation, they track the state of an entire conversation. If your computer initiates a connection to a website, a stateful firewall remembers that conversation and allows the website's response back through — but it won't allow an unsolicited connection to just show up out of nowhere claiming to be part of an existing conversation.

The most modern category is the **next-generation firewall**, which goes even further, inspecting the actual content of traffic, not just its headers, and often integrating with the intrusion detection systems we're about to discuss.

When you write firewall rules — which is exactly what you'll be documenting in this week's assignment — the golden principle is: **default deny**. Start by blocking everything, and only open the specific, minimum set of doors actually needed for the business to function. This is the opposite of how a lot of poorly secured networks are configured, where everything is open by default and rules only get added reactively, after something goes wrong.

## Intrusion Detection and Prevention Systems

A firewall is like a locked door with a very specific set of rules about who's allowed through. But what happens once someone's already inside, or if they find a clever way past the door? That's where IDS and IPS come in.

An **Intrusion Detection System, or IDS**, monitors network traffic and looks for patterns that suggest malicious activity — a flood of connection attempts that looks like someone scanning for open ports, traffic that matches the known signature of a specific piece of malware, or unusual behavior that deviates from a normal baseline. Critically, an IDS is passive: it detects and alerts, but it doesn't block anything itself. It's the smoke detector, not the fire suppression system.

An **Intrusion Prevention System, or IPS**, does everything an IDS does, but takes it a step further: when it detects something malicious, it can actively block that traffic in real time. This is more powerful, but it also carries more risk — a poorly tuned IPS can accidentally block legitimate traffic, which is why many organizations run new detection rules in "monitor only" mode first, before switching them to active blocking.

There are two main detection approaches worth knowing. **Signature-based detection** compares traffic against a database of known attack patterns — extremely reliable for known threats, but blind to brand-new attacks it hasn't seen before. **Anomaly-based detection** builds a baseline of what "normal" looks like for a specific network, then flags anything that deviates significantly from that baseline. This can catch novel attacks, but it also tends to generate more false alarms, since plenty of unusual-but-harmless activity can look suspicious to an anomaly detector.

## VPN Technologies

A Virtual Private Network, or VPN, creates an encrypted tunnel between two points over an otherwise untrusted network, like the public internet. Think of it as a private, sealed pipe running through open, public territory — anyone who intercepts the traffic passing through that pipe sees only encrypted gibberish, not the actual data.

VPNs serve two major purposes in a business context. The first is **remote access**: allowing an employee working from home, or from a different city, to securely connect to internal company resources as if they were physically in the office. The second is **site-to-site connectivity**: securely linking two separate office locations, or connecting an office network to cloud infrastructure, over the public internet.

The two protocols you'll encounter most often are **IPsec**, which operates at the network layer and is common in site-to-site VPNs, and **SSL/TLS VPNs**, which are often easier to deploy for remote user access since they can work through a standard web browser.

One important, practical point: a VPN protects data in transit between two points, but it does nothing to protect the security of either endpoint itself. If an employee's laptop is already infected with malware, connecting through a VPN just gives that malware an encrypted tunnel straight into the internal network. This is exactly why we keep returning to the idea of defense in depth — no single control, including a VPN, is ever sufficient on its own.

## Network Monitoring Tools

Finally, let's talk about actually watching what's happening on a network in real time, which brings us directly to this week's practical exercise.

**Wireshark** is the tool you'll be using this week, and it's one of the most important tools you will ever learn in this entire field. It's a packet analyzer — it captures every single packet moving across a network interface and lets you inspect it in detail: source and destination, protocol, and the actual content, if it isn't encrypted.

When you open Wireshark for your practical exercise this week, you're going to see an overwhelming amount of data at first. Don't panic — this is completely normal. The skill you're building isn't memorizing every possible packet type; it's learning to filter effectively and recognize what "normal" traffic looks like, so that suspicious patterns start to visually jump out at you. Things like an unusual number of connection attempts to a single port, traffic to an unfamiliar external IP address, or unencrypted traffic carrying data that really should be encrypted, like a password sent in plain text.

This is the exact skill set that security operations analysts use every single day, and it directly complements the IDS and IPS systems we discussed earlier — those systems automate detection at scale, but a skilled analyst using a tool like Wireshark can investigate specific incidents in far greater depth.

## Bringing It Together

You've now covered the four pillars of network defense: firewalls to control what's allowed through, IDS and IPS to detect and respond to malicious activity, VPNs to protect data as it travels between locations, and monitoring tools like Wireshark to give you visibility into what's actually happening. Every organization, no matter how small, benefits from thinking through all four of these layers.

For this week's assignment, document a set of firewall rules for a sample network, applying that default-deny principle we discussed. For your practical exercise, spend real time in Wireshark — capture some of your own everyday traffic and practice identifying what's normal before trying to spot what isn't.

Next week, we shift gears completely and step into the mindset of an attacker. We're moving into Module 3: Ethical Hacking and Penetration Testing. See you there.
