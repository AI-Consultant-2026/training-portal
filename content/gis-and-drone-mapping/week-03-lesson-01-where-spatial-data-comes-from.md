---
course: GIS and Drone Mapping
module: "Module 2: Data Collection & Processing"
week: 3
lesson: 1
lesson_title: "Where Spatial Data Comes From"
db_lesson_content: "Government databases, satellite imagery, field surveys, drone data, and crowdsourced sources, and how to choose among them for a given project."
target_length_minutes: 8
---

# Lesson 1: Where Spatial Data Comes From

Welcome to Module 2. In our first two weeks, we worked mostly with data that was already provided and prepared for you. This week, we address a genuinely fundamental question: where does spatial data actually come from, and how do you make sure it's reliable enough to trust before you build any real analysis on top of it?

## Data Sources

Spatial data comes from a genuinely wide range of sources, each with its own real strengths and limitations.

**Government databases** — national mapping agencies, land registries, census bureaus — often provide authoritative, well-documented data, though it can sometimes be outdated or, especially in some regions, difficult to actually access in a timely way.

**Satellite imagery**, which we'll cover in real depth next week, provides consistent, wide-area coverage and enables regular monitoring of environmental change over time.

**Field surveys** involve directly, physically collecting data on location — precisely what you'll practice hands-on in this lesson's exercise — offering high accuracy for the exact specific area actually surveyed, but requiring genuinely significant time and effort to cover any larger area at scale.

**Drone-collected data**, which we'll dive into deeply starting in Module 4, offers a genuinely valuable middle ground: considerably more detailed and higher resolution than satellite imagery, while covering meaningfully more ground area than a purely manual field survey could reasonably achieve.

**Crowdsourced data**, such as OpenStreetMap, relies on distributed, often volunteer, contributors continuously adding and updating map data. This can produce impressively detailed, frequently updated coverage, particularly in populated areas, though data quality and genuine completeness can vary considerably depending on how much active local contributor participation actually exists in any given specific area.

Choosing the right combination of sources for any real project depends heavily on the required accuracy, the necessary timeliness, and the practical budget realistically available — precisely the kind of decision you'll need to make and clearly justify in this week's assignment.

## Data Collection Methods and Accuracy

When you collect data directly yourself, as in this lesson's practical exercise, understanding accuracy is essential. **GPS accuracy** varies meaningfully by device and prevailing conditions — a standard consumer smartphone GPS typically achieves accuracy within somewhere around three to five meters under genuinely good conditions, while specialized professional survey-grade GPS equipment can achieve sub-centimeter accuracy, though naturally at very considerably higher cost.

Accuracy can also be meaningfully degraded by dense tree canopy, tall surrounding buildings, or challenging atmospheric conditions — all factors genuinely worth considering carefully when planning any field data collection effort, and something you should note explicitly in your own collection protocol this week.

It's important to distinguish clearly between **accuracy**, how genuinely close a measurement is to the true real-world value, and **precision**, how consistent repeated measurements are with each other. A GPS device can be highly precise, consistently reporting nearly the exact same reading, while still being fundamentally inaccurate if that consistent reading is nonetheless meaningfully off from the actual true location.

## Bringing It Together

This lesson covered the major sources of spatial data and how to choose among them, and the genuinely important distinction between accuracy and precision when collecting data yourself.

Next lesson turns to what happens after collection: validating that data is genuinely trustworthy, preprocessing and cleaning it, and storing it reliably as a project grows.
