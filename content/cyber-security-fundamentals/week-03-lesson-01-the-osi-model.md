---
course: Cyber Security Fundamentals
module: "Module 2: How Networks Work"
week: 3
lesson: 1
lesson_title: "The OSI Model"
db_lesson_content: "The seven layers of network communication, from physical cabling up through the application layer."
target_length_minutes: 8
---

# Lesson 1: The OSI Model

Welcome to Module 2. Over the past two weeks we built a mental framework for thinking about threats and security goals. Now it's time to get technical. You cannot defend a network you don't understand, so before we touch a single firewall, we need to talk about how data actually moves from one computer to another.

Fair warning: today involves an abstract model that can feel dry at first. Stick with it — it becomes concrete fast once we start configuring real tools.

## Seven Layers, One Model

The **OSI Model** — Open Systems Interconnection Model — is a conceptual framework that breaks network communication into seven distinct layers. It was developed in the late 1970s to help different manufacturers' equipment work together, and even though the technology has changed enormously since then, it's still the standard way security professionals talk about networking.

Data actually travels bottom-up — starting at Layer 1 and working up to Layer 7 — so that's the order worth learning it in.

- **Layer 1, Physical** — the actual hardware: cables, radio signals, the raw electrical or optical bits.
- **Layer 2, Data Link** — how devices on the same local network talk to each other, using a MAC address. This is where switches operate.
- **Layer 3, Network** — where IP addresses live and routing happens: figuring out the path data takes across networks. This is where routers operate.
- **Layer 4, Transport** — manages breaking data into pieces and reassembling it reliably. This is where TCP and UDP live.
- **Layers 5–7, Session, Presentation, Application** — higher-level concerns: keeping a conversation going, formatting and encrypting data, and finally the actual applications you use, like your browser or email client.

## Why the Layer You're On Actually Matters

Different attacks and different defenses operate at different layers, and knowing which one you're dealing with tells you which tools are even relevant. A firewall filtering traffic by IP address and port is working with Layer 3 and Layer 4 information. An attack like ARP spoofing operates down at Layer 2, below where most of that firewall logic even looks. Neither tool is "better" — they're built for different layers, and a strong network defense uses controls at multiple layers at once, not just one.

## Keep This Model in Your Back Pocket

You don't need to have all seven layers memorized cold by the end of this lesson. What you do need is the shape of it: lower layers are closer to raw hardware and physical transmission, higher layers are closer to the applications people actually use, and security tools and attacks cluster at specific layers rather than applying everywhere equally. We'll come back to this model constantly for the rest of the course — next lesson, we go one level deeper into the protocols that actually run on top of it: TCP/IP and network segmentation.
