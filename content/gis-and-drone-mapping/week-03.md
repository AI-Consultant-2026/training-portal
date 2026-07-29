---
course: GIS and Drone Mapping
module: "Module 2: Data Collection & Processing"
week: 3
topics:
  - Data sources (government databases, satellites, surveys, drones, crowdsourcing)
  - Data collection methods and accuracy
  - Data quality assurance and validation
  - Data preprocessing and cleaning
  - Geospatial databases (PostGIS, Geodatabases)
ties_to:
  assignment: "Create a data collection protocol for a mapping project"
  practical: "Collect field data using mobile GPS; import and validate in QGIS"
target_length_minutes: 13
---

# Week 3 Lecture Script: Where Good Data Actually Comes From

[Open direct to camera]

Welcome to Module 2. In our first two weeks, we worked mostly with data that was already provided and prepared for you. This week, we address a genuinely fundamental question: where does spatial data actually come from, and how do you make sure it's reliable enough to trust before you build any real analysis on top of it?

## Data Sources

Spatial data comes from a genuinely wide range of sources, each with its own real strengths and limitations.

**Government databases** — national mapping agencies, land registries, census bureaus — often provide authoritative, well-documented data, though it can sometimes be outdated or, especially in some regions, difficult to actually access in a timely way.

**Satellite imagery**, which we'll cover in real depth next week, provides consistent, wide-area coverage and enables regular monitoring of environmental change over time.

**Field surveys** involve directly, physically collecting data on location — precisely what you'll practice hands-on in today's exercise — offering high accuracy for the exact specific area actually surveyed, but requiring genuinely significant time and effort to cover any larger area at scale.

**Drone-collected data**, which we'll dive into deeply starting in Module 4, offers a genuinely valuable middle ground: considerably more detailed and higher resolution than satellite imagery, while covering meaningfully more ground area than a purely manual field survey could reasonably achieve.

**Crowdsourced data**, such as OpenStreetMap, relies on distributed, often volunteer, contributors continuously adding and updating map data. This can produce impressively detailed, frequently updated coverage, particularly in populated areas, though data quality and genuine completeness can vary considerably depending on how much active local contributor participation actually exists in any given specific area.

Choosing the right combination of sources for any real project depends heavily on the required accuracy, the necessary timeliness, and the practical budget realistically available — precisely the kind of decision you'll need to make and clearly justify in this week's assignment.

## Data Collection Methods and Accuracy

When you collect data directly yourself, as in today's practical exercise, understanding accuracy is essential. **GPS accuracy** varies meaningfully by device and prevailing conditions — a standard consumer smartphone GPS typically achieves accuracy within somewhere around three to five meters under genuinely good conditions, while specialized professional survey-grade GPS equipment can achieve sub-centimeter accuracy, though naturally at very considerably higher cost.

Accuracy can also be meaningfully degraded by dense tree canopy, tall surrounding buildings, or challenging atmospheric conditions — all factors genuinely worth considering carefully when planning any field data collection effort, and something you should note explicitly in your own collection protocol this week.

It's important to distinguish clearly between **accuracy**, how genuinely close a measurement is to the true real-world value, and **precision**, how consistent repeated measurements are with each other. A GPS device can be highly precise, consistently reporting nearly the exact same reading, while still being fundamentally inaccurate if that consistent reading is nonetheless meaningfully off from the actual true location.

## Data Quality Assurance and Validation

Before any collected data gets used in real, serious analysis, it needs proper **quality assurance** — systematically checking that it's complete, accurate, and genuinely fit for its intended purpose.

Practical validation techniques include comparing newly collected data against a known, independently verified reference source, checking carefully for logical, internal consistency — for example, confirming that a road segment's recorded start and end points actually connect properly to the adjacent, neighboring road segments, and reviewing attribute data for obviously missing or clearly implausible values, such as a recorded rainfall measurement that's physically impossible for the actual specific climate and season involved.

This isn't merely a bureaucratic formality. Analysis built directly on top of flawed underlying data will confidently produce flawed, misleading conclusions — and unlike a visibly broken map that's obviously wrong, subtly incorrect data often looks completely legitimate and trustworthy on the surface, right up until it drives someone toward a genuinely poor real-world decision.

## Data Preprocessing and Cleaning

Raw collected data is very rarely immediately ready for direct analysis. **Preprocessing** covers the necessary steps taken to properly prepare data: correcting known georeferencing errors, converting between different, mismatched coordinate systems — connecting directly back to what we covered last week — and standardizing attribute naming and formatting conventions so that similar datasets, potentially collected by different individuals or teams, can actually be properly combined and compared later on.

**Data cleaning** specifically addresses errors and inconsistencies: duplicate records that were accidentally collected more than once, missing values that genuinely need to be either filled in through legitimate means or clearly, honestly flagged, and obvious, clear outliers that likely indicate a collection error rather than a genuine, real anomaly worth investigating further.

I want to be honest with you: this kind of preprocessing and cleaning work isn't the most exciting part of GIS, but it's often the single most time-consuming part of any genuinely real project, and skipping or rushing it is a common, serious mistake that undermines otherwise genuinely good analytical work later on.

## Geospatial Databases

Once data is properly collected and cleaned, it needs somewhere reliable to actually live, especially as the volume of data grows across an ongoing project.

**PostGIS** extends PostgreSQL, a widely used, robust open-source database system, adding genuine, native support for spatial data types and spatial queries. This allows genuinely large volumes of spatial data to be stored efficiently and queried with real speed and reliability, well beyond what a simple collection of individual files can practically support at any real scale.

**Geodatabases**, Esri's proprietary format used specifically with ArcGIS, serve a broadly similar purpose within that particular commercial software ecosystem.

For smaller projects, simple file-based formats are often genuinely sufficient. But as a project genuinely grows — more data, more users needing simultaneous access, more frequent updates — a proper geospatial database becomes increasingly essential for reliability and stability.

## Bringing It Together

Today we covered where spatial data genuinely comes from, how to properly assess and validate its accuracy, the essential preprocessing work required before real analysis, and how larger datasets get properly, reliably stored. Good data is genuinely the foundation everything else in this field depends on entirely — no amount of downstream analytical sophistication can meaningfully fix data that was flawed from the very start.

For your assignment, create a full data collection protocol for a mapping project, addressing source selection, accuracy requirements, and validation steps. For your practical exercise, collect real field data using mobile GPS, then import and properly validate it within QGIS.

Next week, we cover remote sensing and satellite imagery in real depth — a major, genuinely important data source we've only briefly touched on so far. See you then.
