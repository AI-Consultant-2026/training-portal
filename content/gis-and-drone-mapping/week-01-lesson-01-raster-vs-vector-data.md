---
course: GIS and Drone Mapping
module: "Module 1: GIS Fundamentals & Spatial Concepts"
week: 1
lesson: 1
lesson_title: "Raster vs. Vector Data"
db_lesson_content: "Understanding the two core spatial data models used in GIS."
target_length_minutes: 8
---

# Lesson 1: Raster vs. Vector Data

Welcome to GIS and Drone Mapping. Over the next eight weeks, this course teaches you how to work with geographic information systems and drone technology to solve genuinely real problems — agriculture planning, water resource management, infrastructure development, right here in the State and beyond.

I want to start by addressing something honestly: this course involves genuinely technical software and some math-adjacent concepts, like coordinate systems, which we'll get to next week. If you've never done anything like this before, that's completely fine. Everyone in this field started as a beginner. What matters is that you take the fundamentals seriously in these first two weeks, because everything else in this course builds directly on top of them.

## What Is GIS?

A Geographic Information System, or GIS, is a system designed to capture, store, analyze, and display data that has a location component — anything you can point to on a map. That might sound abstract, so let's make it concrete: a GIS can show you exactly which farms in a region flood most frequently, which neighborhoods have the least access to clean water, or the fastest emergency vehicle route between a hospital and any given address.

The power of GIS comes from combining location with additional information, called **attribute data**. A simple map showing farm boundaries is useful. A GIS showing those same farm boundaries, combined with soil quality, water access, and crop yield history, becomes a genuinely powerful decision-making tool.

A GIS is generally made up of several core components: the actual **spatial data** itself, representing real-world locations and features; **software**, like QGIS, which we'll start using hands-on later this week; **hardware**, including the computers running the software and, later in this course, the GPS devices and drones used to collect new data; and, just as important as any of the technical pieces, the **people** — skilled analysts who know how to ask the right questions and correctly interpret what the data actually shows.

## Raster vs. Vector Data Models

Every single piece of spatial data in a GIS is represented using one of two fundamental data models, and understanding the difference between them is absolutely essential — genuinely one of the most important concepts in this entire course.

**Vector data** represents features using precise points, lines, and polygons, defined by exact geographic coordinates. A specific well location is a point. A road is a line. A farm boundary or a local government area is a polygon. Vector data is ideal for representing discrete, well-defined features with clear, precise boundaries, and it stays crisp and precise no matter how far you zoom in.

**Raster data**, by contrast, represents information as a grid of cells, or pixels, each holding a specific value — similar in structure to a digital photograph. Satellite imagery, elevation data, and rainfall measurements are all typically represented as raster data. Raster is ideal for representing continuous phenomena that don't have neat, sharp boundaries — temperature, elevation, or vegetation health all gradually change across a landscape rather than switching abruptly from one exact value to another at a hard boundary line.

A practical, memorable way to think about the difference: if you can clearly answer "where exactly does this specific feature start and end," it should almost certainly be vector data. If the answer is genuinely "it varies gradually and continuously across the entire area," it should almost certainly be raster data. You'll be working directly with both formats throughout this course.

## Bringing It Together

This lesson covered what GIS fundamentally is, and the crucial distinction between raster and vector data models — a distinction that underlies essentially every dataset you'll work with for the rest of this course.

Next lesson turns to real-world GIS applications right here in the State, and gives you your first hands-on experience with QGIS.
