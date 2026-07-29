---
course: GIS and Drone Mapping
module: "Module 1: GIS Fundamentals & Spatial Concepts"
week: 2
topics:
  - Coordinate systems and projections
  - Map fundamentals (scale, legend, orientation)
  - GIS software overview (QGIS, ArcGIS)
ties_to:
  assignment: "Complete QGIS tutorial on basic mapping"
  practical: "Perform spatial queries and analysis on sample data"
target_length_minutes: 13
---

# Week 2 Lecture Script: Putting a Round Earth on a Flat Screen

[Open direct to camera]

Last week we covered what GIS is and the fundamental distinction between raster and vector data. This week, we tackle a genuinely fascinating problem that every mapmaker has faced for centuries: the earth is round, but every map you've ever looked at is flat. Understanding how we solve that problem is essential before we can do any serious analytical work.

## Coordinate Systems

To locate anything precisely on earth, we need a coordinate system — a standardized method for assigning a unique location to every single point on the planet's surface.

The most familiar is the **geographic coordinate system**, using latitude and longitude, measured in degrees. Latitude measures position north or south of the equator; longitude measures position east or west of the Prime Meridian, which passes through Greenwich, England. Together, a latitude and longitude pair uniquely identifies any location on earth — for example, Asaba sits at approximately 6.2 degrees north latitude and 6.7 degrees east longitude.

Here's the genuinely tricky part: because the earth is a sphere, or more precisely a slightly flattened spheroid, measuring degrees of latitude and longitude doesn't correspond to a consistent, uniform physical distance everywhere. A degree of longitude represents a much shorter actual physical distance near the poles than it does at the equator. This creates real, practical problems for accurate distance and area measurement, which brings us directly to projections.

## Map Projections

A **map projection** is a mathematical method for representing the curved surface of the earth on a flat plane — your screen or a printed paper map. Every single projection necessarily introduces some form of distortion, because it is mathematically impossible to flatten a sphere without distorting something in the process — you can preserve accurate area, accurate shape, accurate distance, or accurate direction, but never genuinely all four simultaneously in the same single projection.

Different projections make different practical trade-offs. The Mercator projection, which many of you have seen used for world maps, preserves angles and shape well, which is why it was historically valuable for sea navigation, but it dramatically distorts the true relative size of land areas, particularly near the poles — this is exactly why Greenland appears roughly the same size as Africa on a standard Mercator map, when in genuine physical reality Africa is approximately fourteen times larger.

For working specifically within Nigeria, you'll commonly use the **Universal Transverse Mercator, UTM**, system, which divides the entire earth into narrow zones and provides highly accurate distance and area measurements within each specific zone — genuinely important for practical work like calculating field area or precise infrastructure distances.

The critical practical lesson here: always know which coordinate system and projection your data is actually using, and ensure all layers within a single project are properly aligned to match. Mismatched projections are one of the most common — and most confusing — beginner mistakes in all of GIS work, and they can silently produce visibly wrong results, sometimes without any obvious error message at all.

## Map Fundamentals: Scale, Legend, and Orientation

Beyond the underlying coordinate mathematics, every genuinely professional map needs a few essential communication elements.

**Scale** indicates the precise relationship between distance on the map and actual real-world distance — for example, a scale of 1 to 50,000 means one unit measured on the map represents 50,000 of those same units in true physical reality. Scale directly determines how much genuine detail a map can meaningfully show — a map covering the entire country necessarily shows far less local detail than a map covering just a single village.

The **legend** explains precisely what every symbol, color, and line style used on the map actually represents. A genuinely well-designed map is completely unambiguous to any reader precisely because the legend clearly explains every single visual element used.

**Orientation** simply indicates which direction is north, typically shown through a small compass rose or arrow symbol. While north is conventionally placed at the top of most maps, this is a longstanding convention, not a strict, mandatory rule, and you should always verify orientation explicitly on any unfamiliar map rather than simply assuming it.

Together, scale, legend, and orientation are what make a map genuinely readable and trustworthy to someone other than the specific person who originally created it — which becomes essential the moment you're producing maps for actual stakeholders and clients later in this course.

## GIS Software Overview

Let's briefly compare the two major software options you're likely to encounter professionally.

**QGIS**, which you're already using, is free, open-source, and genuinely powerful — actively developed by a large, global community of contributors, with an enormous ecosystem of available plugins that extend its core functionality significantly. For most of this course, and for a great many real-world professional projects, QGIS is entirely sufficient.

**ArcGIS**, produced commercially by a company called Esri, is the dominant proprietary alternative, widely used particularly within larger organizations and government agencies. It offers some genuinely advanced, specialized analytical tools and typically more polished, integrated technical support, but it requires a paid license, which can be a significant, real barrier, especially for individuals and smaller organizations just starting out.

My honest, practical recommendation: build your genuine skills in QGIS throughout this course. The fundamental underlying GIS concepts — coordinate systems, spatial analysis, data models — transfer directly between both platforms. If a future employer specifically requires ArcGIS, the interface itself is learnable quickly once you already have genuinely solid underlying GIS fundamentals in place.

## Bringing It Together

Today we covered how a genuinely round earth gets mathematically represented on a flat map, the essential communication elements every professional map needs, and how the two major GIS software platforms compare. Combined with last week's foundation, you now have the core conceptual toolkit needed to start doing real, hands-on analytical work.

For your assignment, complete the QGIS tutorial on basic mapping, paying close attention to how coordinate systems are handled within the actual software interface. For your practical exercise, perform spatial queries and analysis on sample data, applying everything we've covered across these first two weeks.

Next week, we move into Module 2: Data Collection and Processing — where good GIS data actually comes from, and how it gets properly prepared for genuine, reliable analysis. See you then.
