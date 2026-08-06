---
course: GIS and Drone Mapping
module: "Module 2: Data Collection & Processing"
week: 3
lesson: 2
lesson_title: "Data Quality, Cleaning, and Storage"
db_lesson_content: "Validating collected data, preprocessing and cleaning common errors, and storing growing datasets in geospatial databases like PostGIS."
target_length_minutes: 8
---

# Lesson 2: Data Quality, Cleaning, and Storage

Last lesson covered the major sources of spatial data and the distinction between accuracy and precision. This lesson turns to what happens after collection: validating that data is genuinely trustworthy, cleaning it up, and storing it reliably as a project grows.

## Data Quality Assurance and Validation

Before any collected data gets used in real, serious analysis, it needs proper **quality assurance** — systematically checking that it's complete, accurate, and genuinely fit for its intended purpose.

Practical validation techniques include comparing newly collected data against a known, independently verified reference source, checking carefully for logical, internal consistency — for example, confirming that a road segment's recorded start and end points actually connect properly to the adjacent, neighboring road segments, and reviewing attribute data for obviously missing or clearly implausible values, such as a recorded rainfall measurement that's physically impossible for the actual specific climate and season involved.

This isn't merely a bureaucratic formality. Analysis built directly on top of flawed underlying data will confidently produce flawed, misleading conclusions — and unlike a visibly broken map that's obviously wrong, subtly incorrect data often looks completely legitimate and trustworthy on the surface, right up until it drives someone toward a genuinely poor real-world decision.

## Data Preprocessing and Cleaning

Raw collected data is very rarely immediately ready for direct analysis. **Preprocessing** covers the necessary steps taken to properly prepare data: correcting known georeferencing errors, converting between different, mismatched coordinate systems — connecting directly back to what we covered in week two — and standardizing attribute naming and formatting conventions so that similar datasets, potentially collected by different individuals or teams, can actually be properly combined and compared later on.

**Data cleaning** specifically addresses errors and inconsistencies: duplicate records that were accidentally collected more than once, missing values that genuinely need to be either filled in through legitimate means or clearly, honestly flagged, and obvious, clear outliers that likely indicate a collection error rather than a genuine, real anomaly worth investigating further.

I want to be honest with you: this kind of preprocessing and cleaning work isn't the most exciting part of GIS, but it's often the single most time-consuming part of any genuinely real project, and skipping or rushing it is a common, serious mistake that undermines otherwise genuinely good analytical work later on.

## Geospatial Databases

Once data is properly collected and cleaned, it needs somewhere reliable to actually live, especially as the volume of data grows across an ongoing project.

**PostGIS** extends PostgreSQL, a widely used, robust open-source database system, adding genuine, native support for spatial data types and spatial queries. This allows genuinely large volumes of spatial data to be stored efficiently and queried with real speed and reliability, well beyond what a simple collection of individual files can practically support at any real scale.

**Geodatabases**, Esri's proprietary format used specifically with ArcGIS, serve a broadly similar purpose within that particular commercial software ecosystem.

For smaller projects, simple file-based formats are often genuinely sufficient. But as a project genuinely grows — more data, more users needing simultaneous access, more frequent updates — a proper geospatial database becomes increasingly essential for reliability and stability.

## Bringing It Together

Today we covered how to properly assess and validate data accuracy, the essential preprocessing work required before real analysis, and how larger datasets get properly, reliably stored. Combined with last lesson's data sources and collection methods, good data is genuinely the foundation everything else in this field depends on entirely — no amount of downstream analytical sophistication can meaningfully fix data that was flawed from the very start.

For your assignment, create a full data collection protocol for a mapping project, addressing source selection, accuracy requirements, and validation steps. For your practical exercise, collect real field data using mobile GPS, then import and properly validate it within QGIS.

Next week, we cover remote sensing and satellite imagery in real depth — a major, genuinely important data source we've only briefly touched on so far.
