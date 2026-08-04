---
course: Cyber Security Fundamentals
module: "Module 2: Firewalls, IDS/IPS & VPNs"
week: 4
lesson: 2
lesson_title: "VPNs and Network Monitoring"
db_lesson_content: "How VPNs encrypt traffic between locations, and how Wireshark gives visibility into real network traffic."
target_length_minutes: 8
---

# Lesson 2: VPNs and Network Monitoring

You now have the front line — firewalls, IDS, IPS. This lesson adds the last two pillars of network defense: VPNs, which protect data as it travels, and monitoring tools, which let you actually see what's happening on a live network.

## VPNs: The Encrypted Tunnel

A **Virtual Private Network (VPN)** creates an encrypted tunnel between two points over an otherwise untrusted network, like the public internet. Picture a private, sealed pipe running through open, public territory — anyone who intercepts traffic passing through it sees only encrypted gibberish, not the actual data.

VPNs serve two purposes in a business context. **Remote access** lets an employee working from home, or a different city, securely reach internal company resources as if they were physically in the office. **Site-to-site connectivity** securely links two separate office locations, or an office network to cloud infrastructure, over the public internet.

Two protocols show up constantly: **IPsec** operates at the network layer and is common for site-to-site connections. **SSL/TLS VPNs** are often easier to deploy for remote user access, since they can work through a standard web browser.

One important, practical limit: a VPN protects data *in transit* between two points — it does nothing to protect the security of either endpoint itself. If an employee's laptop is already infected with malware, connecting through a VPN just gives that malware an encrypted tunnel straight into the internal network. This is exactly why we keep coming back to defense in depth — no single control, including a VPN, is ever sufficient on its own.

## Network Monitoring: Watching What's Actually Happening

Finally, let's talk about watching a network in real time — which is exactly what this week's practical exercise has you doing.

**Wireshark** is the tool for it, and it's one of the most important tools you'll learn in this entire field. It's a packet analyzer: it captures every packet moving across a network interface and lets you inspect it in detail — source, destination, protocol, and the actual content, if it isn't encrypted.

The first time you open Wireshark, you'll see an overwhelming amount of data. That's completely normal. The skill being built isn't memorizing every possible packet type — it's learning to filter effectively and recognize what "normal" traffic looks like, so that suspicious patterns start to visually jump out at you: an unusual number of connection attempts to a single port, traffic to an unfamiliar external IP, unencrypted traffic carrying data that really should be encrypted, like a password sent in plain text.

This is exactly what security operations analysts do every day, and it directly complements IDS and IPS: those systems automate detection at scale, but a skilled analyst using a tool like Wireshark can investigate a specific incident in far greater depth than any automated system alone.

## Bringing Module 2 Together

You've now covered all four pillars of network defense: firewalls to control what's allowed through, IDS and IPS to detect and respond to malicious activity, VPNs to protect data as it travels, and monitoring tools like Wireshark to give you visibility into what's actually happening. Every organization, no matter how small, benefits from thinking through all four.

For your practical exercise, spend real time in Wireshark — capture some of your own everyday traffic and practice recognizing what's normal before trying to spot what isn't. Next week we shift gears completely: Module 3 steps into the mindset of an attacker, starting ethical hacking and penetration testing.
