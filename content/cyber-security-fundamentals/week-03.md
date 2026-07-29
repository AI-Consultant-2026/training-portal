---
course: Cyber Security Fundamentals
module: "Module 2: Network Security"
week: 3
topics:
  - OSI Model review
  - TCP/IP protocol suite
  - Network segmentation
ties_to:
  assignment: "Design a network architecture for a small business with security controls"
  practical: "Configure basic firewall rules using simulation tools (GNS3/Cisco Packet Tracer)"
target_length_minutes: 13
---

# Week 3 Lecture Script: How Networks Actually Work

[Open direct to camera]

Welcome to Module 2. Over the past two weeks we've built a mental framework for thinking about threats and security goals. Now it's time to get technical. You cannot defend a network you don't understand, so before we touch a single firewall, we need to talk about how data actually moves from one computer to another.

I want to be upfront: today's lecture involves some abstract models that might feel dry at first. Stick with me — everything here becomes concrete very quickly once we start configuring real tools next week.

## The OSI Model

The OSI Model — Open Systems Interconnection Model — is a conceptual framework that breaks down how network communication happens into seven distinct layers. It was developed in the late 1970s to help different manufacturers' equipment work together, and even though the technology has changed enormously since then, the model is still the standard way security professionals talk about networking.

Let's go through the seven layers from the bottom up, because that's the order data actually travels when it's being sent.

**Layer 1, the Physical layer**, is the actual hardware — cables, radio signals, the electrical or optical signals moving data as raw bits, ones and zeros.

**Layer 2, the Data Link layer**, handles how devices on the same local network talk to each other, using something called a MAC address — a unique hardware identifier for every network device. This is where switches operate.

**Layer 3, the Network layer**, is where IP addresses live, and it's responsible for routing — figuring out the path data should take to get from one network to another, potentially across the entire internet. This is where routers operate.

**Layer 4, the Transport layer**, manages how data is broken into pieces and reassembled reliably. This is where you'll encounter TCP and UDP, which we'll discuss in a moment.

**Layers 5 through 7 — Session, Presentation, and Application** — handle higher-level concerns: maintaining a conversation between two systems, formatting and encrypting data, and finally, the actual applications you interact with, like your web browser or email client.

Why does this matter for security? Because different attacks and different defenses operate at different layers. A firewall might filter traffic based on Layer 3 and 4 information — IP addresses and ports. An attack like ARP spoofing operates at Layer 2. Understanding which layer you're dealing with helps you understand which tools and defenses are relevant.

## The TCP/IP Protocol Suite

In practice, the internet doesn't run on the full seven-layer OSI model — it runs on something called TCP/IP, a simpler four-layer model that maps roughly onto the OSI layers we just discussed. TCP/IP is named after its two most important protocols.

**IP, the Internet Protocol**, is responsible for addressing and routing — giving every device a unique address, an IP address, and figuring out how to get data from one address to another across potentially thousands of intermediate networks.

**TCP, Transmission Control Protocol**, sits on top of IP and provides reliability. When you load a webpage, TCP makes sure every piece of that webpage arrives, arrives in the correct order, and gets resent if it's lost along the way. This reliability comes through something called the "three-way handshake" — a brief negotiation between two computers before real data starts flowing, which you'll hear referenced constantly when we talk about network monitoring and attacks like SYN flooding.

There's also **UDP, User Datagram Protocol**, which sacrifices that reliability for speed — used for things like video calls and online gaming, where a slightly dropped packet is better than the awkward delay of resending it.

On top of TCP and UDP sit the protocols you actually interact with every day: HTTP and HTTPS for web browsing, DNS for translating domain names like "google.com" into IP addresses, and SMTP for email. Every one of these protocols was designed for functionality first, and security was often added on later — which is exactly why so many well-known vulnerabilities exist in how these protocols are commonly implemented.

## Network Segmentation

Now let's talk about one of the single most effective — and most underused — network security practices: segmentation.

Network segmentation means dividing a network into smaller, isolated sections rather than having every device sit on one flat, open network. Imagine a small business where the guest WiFi, the employee workstations, and the servers holding customer payment data are all on the exact same network. If an attacker compromises a guest's laptop through the WiFi, they now have a direct path to the payment servers. That's a design failure, not just a technical one.

With proper segmentation, that same business would put guest WiFi on its own isolated network with no path to internal systems, employee workstations on a separate segment, and sensitive servers on a tightly restricted segment that only specific, authenticated systems can reach. Even if an attacker compromises one segment, segmentation contains the damage — it doesn't automatically expose everything else.

This concept connects directly back to something we discussed in week one, though I didn't name it at the time: this is the beginning of "defense in depth" — the idea that you never rely on a single security control. You layer multiple, independent defenses, so that a single point of failure doesn't lead to total compromise. Segmentation is one of the cheapest, most effective layers you can add, and it's something we'll see again and again throughout this course, particularly when we cover cloud security in Module 6.

## Bringing It Together

Here's why this all matters practically. This week's assignment asks you to design a network architecture for a small business, including security controls — and now you have the vocabulary to do it properly. You should be thinking about where segmentation makes sense, which devices need to talk to which other devices, and where you'd place controls to enforce those boundaries.

Your practical exercise this week has you configuring basic firewall rules using a simulation tool — either GNS3 or Cisco Packet Tracer, both of which are free and let you build and test network topologies without any real hardware. Don't worry if this feels unfamiliar — the goal this week is just to get comfortable navigating the simulation environment and creating your first, simple set of rules. We'll go much deeper into firewalls specifically next week.

One honest note: this is one of the more technically dense lectures in the whole course, especially if networking is completely new to you. If some of these terms didn't fully click, that's completely normal — rewatch the sections on TCP/IP and segmentation, and don't move forward until they feel solid, because everything in the rest of this module builds directly on top of what we covered today.

Next week, we go deeper: firewall technologies and rules, intrusion detection and prevention systems, VPNs, and network monitoring tools. See you then.
