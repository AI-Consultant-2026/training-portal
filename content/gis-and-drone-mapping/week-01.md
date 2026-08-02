---
course: GIS and Drone Mapping
module: "Module 1: GIS Fundamentals & Spatial Concepts"
week: 1
topics:
  - GIS definition, components, and applications
  - Raster vs. Vector data models
  - Real-world GIS use cases in the State (agriculture, water resources, urban planning)
ties_to:
  assignment: "Research GIS applications in the State; document findings"
  practical: "Create a basic map using QGIS with provided datasets"
target_length_minutes: 12
---

# Week 1 Lecture Script: Seeing the World Through Data

[Open direct to camera]

Hello, and welcome to GIS and Drone Mapping. My name is [YOUR NAME], and over the next eight weeks, I'm going to teach you how to work with geographic information systems and drone technology to solve genuinely real problems — agriculture planning, water resource management, infrastructure development, right here in the State and beyond.

I want to start by addressing something honestly: this course involves genuinely technical software and some math-adjacent concepts, like coordinate systems, which we'll get to next week. If you've never done anything like this before, that's completely fine. Everyone in this field started as a beginner. What matters is that you take the fundamentals seriously in these first two weeks, because everything else in this course builds directly on top of them.

## What Is GIS?

A Geographic Information System, or GIS, is a system designed to capture, store, analyze, and display data that has a location component — anything you can point to on a map. That might sound abstract, so let's make it concrete: a GIS can show you exactly which farms in a region flood most frequently, which neighborhoods have the least access to clean water, or the fastest emergency vehicle route between a hospital and any given address.

The power of GIS comes from combining location with additional information, called **attribute data**. A simple map showing farm boundaries is useful. A GIS showing those same farm boundaries, combined with soil quality, water access, and crop yield history, becomes a genuinely powerful decision-making tool.

A GIS is generally made up of several core components: the actual **spatial data** itself, representing real-world locations and features; **software**, like QGIS, which we'll start using hands-on today, used to view, analyze, and manipulate that data; **hardware**, including the computers running the software and, later in this course, the GPS devices and drones used to collect new data; and, just as important as any of the technical pieces, the **people** — skilled analysts who know how to ask the right questions and correctly interpret what the data actually shows.

## Raster vs. Vector Data Models

Every single piece of spatial data in a GIS is represented using one of two fundamental data models, and understanding the difference between them is absolutely essential — genuinely one of the most important concepts in this entire course.

**Vector data** represents features using precise points, lines, and polygons, defined by exact geographic coordinates. A specific well location is a point. A road is a line. A farm boundary or a local government area is a polygon. Vector data is ideal for representing discrete, well-defined features with clear, precise boundaries, and it stays crisp and precise no matter how far you zoom in.

**Raster data**, by contrast, represents information as a grid of cells, or pixels, each holding a specific value — similar in structure to a digital photograph. Satellite imagery, elevation data, and rainfall measurements are all typically represented as raster data. Raster is ideal for representing continuous phenomena that don't have neat, sharp boundaries — temperature, elevation, or vegetation health all gradually change across a landscape rather than switching abruptly from one exact value to another at a hard boundary line.

A practical, memorable way to think about the difference: if you can clearly answer "where exactly does this specific feature start and end," it should almost certainly be vector data. If the answer is genuinely "it varies gradually and continuously across the entire area," it should almost certainly be raster data. You'll be working directly with both formats throughout this course, and today's practical exercise gives you your very first hands-on experience with each.

## Real-World GIS Use Cases in the State

Let's ground all of this in genuinely local, practical context, because that's exactly where this course's real value lies.

In **agriculture**, GIS can combine soil quality data, historical rainfall patterns, and existing crop yield records to identify which specific areas are best suited for particular crops, or where irrigation infrastructure investment would deliver the greatest genuine benefit.

In **water resources**, GIS can map existing water access points, identify underserved communities most in need of new infrastructure, and model exactly how flooding is likely to spread during heavy rainy seasons — directly informing where flood defenses would be most urgently and effectively needed.

In **urban planning**, GIS supports decisions about road network design, zoning, and where new schools or clinics would most effectively serve the greatest number of underserved residents, based on real, current population distribution rather than outdated assumptions.

I want you to notice something important about every one of these examples: none of them are purely academic. They're the exact kind of real, practical work that supports genuinely better decision-making by governments, NGOs, and businesses operating right here in this region. This is precisely why this course exists.

## Getting Started with QGIS

Today's practical exercise introduces you to **QGIS**, a completely free and genuinely powerful, professional-grade GIS software package — an enormous advantage for you, since you can build real, valuable skills without needing any expensive commercial licensing. You'll be creating your very first basic map using provided datasets, getting comfortable with the core interface: loading layers, adjusting how they're symbolized and displayed, and basic navigation around the map canvas.

Don't worry at all about making it look polished or professional today. The goal for this very first exercise is simply comfort and familiarity with the interface itself — everything else builds naturally from there.

## Bringing It Together

Today we covered what GIS fundamentally is, the crucial distinction between raster and vector data models, and genuinely real, local applications that show exactly why this field matters. This foundation is what makes every single topic in the weeks ahead — coordinate systems, remote sensing, drone mapping, spatial analysis — actually make sense once we get there.

For your assignment, research specific GIS applications already in use, or clearly needed, in the State, and document your findings. For your practical exercise, get comfortable creating a basic map in QGIS using the provided datasets.

Next week, we cover coordinate systems and projections — how a genuinely round earth gets accurately represented on a flat map — along with map fundamentals and a proper overview of professional GIS software. See you then.
