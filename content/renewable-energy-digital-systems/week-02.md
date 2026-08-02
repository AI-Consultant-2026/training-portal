---
course: Renewable Energy Digital Systems
module: "Module 2: Solar Energy System Design"
week: 2
topics:
  - Solar PV fundamentals and efficiency
  - System types (grid-tied, off-grid, hybrid)
  - Solar resource assessment and irradiance data
ties_to:
  assignment: "Calculate solar potential for 3 different locations in the State"
  practical: "Assess solar resource availability for a State location"
target_length_minutes: 12
---

# Week 2 Lecture Script: How Much Sun Do You Actually Have to Work With?

[Open direct to camera]

Welcome to Module 2. Last week we built the foundational vocabulary of energy and surveyed the renewable landscape. This week, we begin the real, practical work of solar system design, starting with a genuinely essential question: how much usable sunlight does a specific location actually receive, and what type of system architecture makes the most practical sense for it?

## Solar PV Fundamentals and Efficiency, Revisited

Recall from last week that PV cells convert sunlight into electricity, with efficiency indicating what percentage of that available solar energy actually becomes genuinely usable electrical power. It's worth understanding what actually affects real-world efficiency in practice, beyond a panel's simple rated specification.

**Temperature** genuinely matters more than most beginners expect: PV panels actually lose some efficiency as they get hotter, meaning a panel's rated performance, typically measured under standardized, cooler laboratory conditions, may differ meaningfully from its actual real-world output on a genuinely hot afternoon here in the State. **Shading** significantly affects performance, since even a comparatively small amount of shade falling across just part of a panel can disproportionately reduce that panel's total output, sometimes far more than the shaded area's simple physical proportion would suggest. **Dust and dirt accumulation** gradually reduces performance over time, which is exactly why regular, routine panel cleaning is a genuinely real, ongoing maintenance consideration in dusty environments, not merely a cosmetic concern.

**Panel angle and orientation** also matter considerably: panels perform best when positioned to directly face the sun as closely as possible throughout the day, which is why proper installation angle, ideally matched reasonably closely to a location's specific latitude, genuinely affects total overall system output.

## System Types: Grid-Tied, Off-Grid, and Hybrid

Before designing any specific system, you need to determine which of three fundamental architectures actually fits a particular customer's real, specific situation.

A **grid-tied system** connects directly to the existing centralized electrical grid, feeding excess generated solar power back into that grid when production exceeds current demand, and drawing supplemental power from the grid when solar production alone is genuinely insufficient. This is generally the least expensive system type, since it doesn't require battery storage at all, but it offers no backup power whatsoever during a grid outage — an important, genuinely serious limitation in regions with unreliable centralized grid access.

An **off-grid system** operates entirely independently, with absolutely no connection to the centralized grid at all, relying entirely on solar generation combined with battery storage to reliably meet all of a location's energy needs continuously. This requires meaningfully larger, more carefully sized battery capacity and generally costs considerably more upfront, but it provides genuine energy independence — an especially valuable, practical characteristic in areas without reliable centralized grid access at all.

A **hybrid system** combines both approaches: connected to the centralized grid, but also including battery storage specifically for backup power during outages, or to intelligently reduce peak-time reliance on grid electricity. This offers a genuinely practical, well-balanced middle ground, and for many Nigerian customers dealing with a partially reliable, sometimes inconsistent grid, hybrid systems often represent the most genuinely sensible, practical choice available.

Choosing correctly between these three architectures depends on customer priorities around cost, the reliability of local grid access, and how much genuine energy independence a customer specifically values — precisely the kind of assessment you'll need to make thoughtfully for this week's practical exercise.

## Solar Resource Assessment and Irradiance Data

Before sizing any actual system, you need reliable data on precisely how much solar energy a specific location genuinely receives. This is measured through **solar irradiance** — the power of solar radiation received per unit of surface area, typically expressed in watts per square meter.

For practical system design purposes, we more commonly use **peak sun hours** — a genuinely useful simplification representing the equivalent number of hours per day at a standardized, ideal irradiance level that would deliver the exact same total daily energy as the real, actual variable irradiance pattern throughout that day. A location with an average of five peak sun hours per day receives the equivalent of five hours at that ideal standard intensity, even though real, actual sunlight naturally varies continuously throughout the day, from a low sunrise angle, through peak midday intensity, back down through sunset.

For the State, average peak sun hours generally fall somewhere in a range that supports genuinely viable solar system design, though real, meaningful seasonal variation exists between wetter and drier periods, and this seasonal variation is precisely why real, genuine historical climate data matters so much for accurate system design, rather than relying on any single average annual figure alone.

Reliable sources for this specific data include NASA's POWER database, which provides freely available solar irradiance data for locations essentially anywhere in the world, and various tools provided directly by system design software, including PVsyst and HOMER, which we'll cover next week.

The practical calculation you'll be doing for both this week's assignment and practical exercise follows a straightforward core formula: estimated daily energy output equals total panel capacity, in kilowatts, multiplied by peak sun hours for that specific location, multiplied by an overall system efficiency factor that reasonably accounts for real-world losses like the ones we discussed earlier — temperature effects, dust accumulation, and general wiring and equipment losses throughout the system.

## Bringing It Together

Today we covered the practical factors genuinely affecting real-world solar efficiency, the three fundamental system architectures and when each one genuinely makes sense, and how to properly assess a location's actual solar resource using peak sun hour data. This is the essential foundation for actually sizing a complete, working system, which we'll cover directly next week.

For your assignment, calculate genuine solar potential for three different locations across the State, using real climate data. For your practical exercise, assess solar resource availability in real, specific detail for one particular State location.

Next week, we cover component sizing, load calculation, and the professional design software used to bring a complete solar system design together. See you then.
