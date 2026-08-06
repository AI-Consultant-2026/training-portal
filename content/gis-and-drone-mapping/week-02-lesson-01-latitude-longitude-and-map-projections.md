---
course: GIS and Drone Mapping
module: "Module 1: GIS Fundamentals & Spatial Concepts"
week: 2
lesson: 1
lesson_title: "Latitude, Longitude, and Map Projections"
db_lesson_content: "How coordinate systems locate points on Earth, and why every flat map projection — including UTM, used across Nigeria — involves some tradeoff in accuracy."
target_length_minutes: 8
---

# Lesson 1: Latitude, Longitude, and Map Projections

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

## Bringing It Together

This lesson covered how coordinate systems precisely locate anything on earth, and how map projections mathematically translate that curved surface onto a flat plane — always at the cost of some form of distortion. Getting this right, and knowing which system your own data actually uses, is essential before any serious analytical work.

Next lesson turns to the essential communication elements every professional map needs — scale, legend, orientation — and a practical comparison of the two major GIS software platforms.
