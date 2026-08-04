---
course: Cyber Security Fundamentals
module: "Module 2: How Networks Work"
week: 3
lesson: 2
lesson_title: "TCP/IP and Network Segmentation"
db_lesson_content: "The TCP/IP protocol suite and how dividing a network into isolated segments contains the damage of a breach."
target_length_minutes: 8
---

# Lesson 2: TCP/IP and Network Segmentation

The OSI Model you just learned is a conceptual map. In practice, the internet doesn't run on the full seven-layer version — it runs on something simpler called **TCP/IP**, a four-layer suite named after its two most important protocols. Then we'll turn to one of the single most effective, most underused network security practices there is: segmentation.

## The TCP/IP Protocol Suite

**IP, the Internet Protocol**, handles addressing and routing — giving every device a unique address and figuring out how to move data from one address to another, potentially across thousands of intermediate networks.

**TCP, Transmission Control Protocol**, sits on top of IP and provides reliability. When you load a webpage, TCP makes sure every piece of it arrives, arrives in order, and gets resent if it's lost. That reliability comes from the **three-way handshake** — a brief back-and-forth negotiation between two computers before real data starts flowing. You'll hear this referenced constantly when we get to network monitoring and attacks like SYN flooding.

There's also **UDP, User Datagram Protocol**, which sacrifices that reliability for speed. It's what powers video calls and online gaming, where a dropped packet is far less disruptive than the delay of resending it.

On top of TCP and UDP sit the protocols you actually interact with every day — HTTP and HTTPS for browsing, DNS for translating domain names into IP addresses, SMTP for email. Every one of these was designed for functionality first; security was usually bolted on later. That single fact explains a surprising number of well-known vulnerabilities in how these protocols get implemented.

## Network Segmentation

Now the practice: **network segmentation** means dividing a network into smaller, isolated sections instead of putting every device on one flat, open network.

Picture a small business where the guest Wi-Fi, employee workstations, and the servers holding customer payment data all sit on the exact same network. If an attacker compromises a guest's laptop through that Wi-Fi, they now have a direct path to the payment servers. That's not a technical failure — it's a design failure.

With proper segmentation, that same business puts guest Wi-Fi on its own isolated network with no path inward, employee workstations on a separate segment, and payment servers on a tightly restricted segment only specific, authenticated systems can reach. Compromise one segment, and the damage stays contained — it doesn't automatically expose everything else.

This connects directly back to something from Week 1, though it wasn't named at the time: **defense in depth** — never relying on a single security control, layering multiple independent defenses so one point of failure doesn't mean total compromise. Segmentation is one of the cheapest, most effective layers you can add, and you'll see it again when this course reaches cloud security.

## This Week's Work

Your assignment is to design a network architecture for a small business, including real security controls — and now you have the vocabulary to do it properly: where segmentation makes sense, which devices need to talk to which others, and where to place the boundaries that enforce it. Your practical exercise has you configuring basic firewall rules in a simulation tool. Don't worry about getting it perfect — the goal this week is just getting comfortable navigating the environment and writing your first simple rule set. We'll go much deeper into firewalls specifically next week.
