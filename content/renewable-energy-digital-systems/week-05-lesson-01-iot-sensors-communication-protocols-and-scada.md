---
course: Renewable Energy Digital Systems
module: "Module 4: Digital Monitoring & Control Systems"
week: 5
lesson: 1
lesson_title: "IoT Sensors, Communication Protocols, and SCADA"
db_lesson_content: "How IoT sensors collect system data, the tradeoffs between WiFi, cellular, and LoRaWAN connectivity, and how SCADA systems add remote monitoring and control."
target_length_minutes: 8
---

# Lesson 1: IoT Sensors, Communication Protocols, and SCADA

Welcome to Module 4, and to the part of this course that genuinely justifies the "digital systems" in our title. We've now covered how to design and properly size both the generation and storage sides of a complete solar installation. This week, we cover how modern digital technology lets you see, in real time, exactly how that system is genuinely performing, and lets you catch problems before they ever become serious.

## Monitoring Systems and Data Collection

A solar monitoring system collects real-time data about system performance: how much energy panels are actually generating, current battery state of charge, actual power consumption, and the overall operational health of every major component we covered back in Module 2.

This data serves several genuinely important purposes: verifying the system is performing at, or reasonably close to, its properly designed capacity; identifying developing problems early, before they escalate into significant, costly failures; and providing genuinely concrete evidence of system value, directly supporting the ROI calculations we discussed back in week three.

## IoT Sensors and Communication Protocols

Modern monitoring relies heavily on **Internet of Things, IoT**, sensors — small, genuinely inexpensive devices that measure specific parameters, like voltage, current, or temperature, and transmit that measured data to a central monitoring system for collection and analysis.

These sensors communicate using various protocols, each suited to genuinely different practical needs. **WiFi** offers high bandwidth but requires reasonably reliable local internet infrastructure to actually function. **Cellular connectivity** works well for genuinely remote installations lacking any local WiFi access, though it does require an ongoing cellular data plan. **LoRaWAN**, a specialized low-power, long-range protocol, is particularly well suited to remote monitoring applications requiring only small amounts of data transmitted relatively infrequently, while offering genuinely excellent battery life for the sensors themselves.

Choosing the right communication protocol depends heavily on a specific installation's location and existing available infrastructure — a genuinely important, practical consideration for installations in more rural parts of the State, where reliable internet access itself cannot always be safely assumed or taken for granted.

## SCADA Systems for Energy Management

**Supervisory Control and Data Acquisition, SCADA**, systems represent a more sophisticated, comprehensive form of monitoring and control, historically used extensively in industrial settings and increasingly applied directly to larger renewable energy installations.

A SCADA system doesn't just passively collect data — it also enables genuine remote control, allowing operators to actively adjust system settings or respond to changing conditions without needing to be physically present on-site. For larger commercial or microgrid installations, referring back to the microgrid concepts from last week, SCADA-level monitoring and control becomes increasingly valuable and, at real scale, often genuinely necessary.

## Bringing It Together

This lesson covered how solar monitoring systems collect data in the first place: IoT sensors measuring key parameters, the communication protocols that get that data where it needs to go, and SCADA systems that add genuine remote control on top of passive data collection.

Next lesson turns to what happens with that data once it's collected: real-time performance monitoring, historical data logging, smart alerting, and the dashboards that make it all genuinely usable.
