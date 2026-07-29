---
course: GIS and Drone Mapping
module: "Module 4: Drone Operations & Survey Mapping"
week: 6
topics:
  - Drone image processing workflows
  - Photogrammetry basics
  - Orthomosaic generation
  - 3D point cloud creation and visualization
  - LiDAR basics
ties_to:
  assignment: "Create a drone survey specifications document for a project"
  practical: "Process drone imagery; create orthomosaic and 3D model (simulation software)"
target_length_minutes: 13
---

# Week 6 Lecture Script: From Hundreds of Photos to One Finished Map

[Open direct to camera]

Last week we covered how to plan and safely execute a drone mapping flight. This week, we cover what happens next: turning potentially hundreds, or even thousands, of individual overlapping photos into a single, finished, genuinely usable mapping product.

## Drone Image Processing Workflows

A typical drone mapping project produces a genuinely large number of individual, overlapping photographs — the overlap we discussed last week is precisely what makes the next processing step possible at all. The overall processing workflow generally follows a consistent sequence: importing all captured images along with their embedded GPS location data, aligning those images by identifying matching features that clearly appear across multiple overlapping photos, incorporating the ground control points from last week's lecture to properly refine overall positional accuracy, and finally generating the actual finished output products, which we're about to cover in detail.

This entire workflow relies heavily on specialized photogrammetry software — options range from open-source tools all the way up to commercial platforms like Pix4D or DroneDeploy. The underlying core concepts remain genuinely consistent across virtually all of these tools, which is exactly why we focus in this course primarily on understanding those transferable principles rather than memorizing any single specific software interface.

## Photogrammetry Basics

**Photogrammetry** is the genuinely foundational science underlying all of this: extracting reliable, accurate measurements and three-dimensional structure from two-dimensional photographs.

The core underlying principle is called **stereophotogrammetry**: when the same real-world object or location is captured from two or more sufficiently different camera angles or positions, software can mathematically calculate its true three-dimensional position and structure, in a manner genuinely similar to how human binocular vision, using two eyes set slightly apart, perceives depth and distance in the physical world.

This is precisely why the image overlap we discussed last week matters so critically. Each specific point on the ground genuinely needs to appear in multiple photographs, captured from slightly different drone positions, for the software to accurately triangulate its true three-dimensional position. Insufficient overlap between images produces gaps or genuine errors in the final processed output.

The software's alignment process specifically identifies distinctive, recognizable features — a fence corner, a distinctive rock, a building edge — appearing consistently across multiple overlapping photographs, then uses the drone's own known flight path and positional data to calculate precisely where each individual photo was actually taken from, and consequently, the true three-dimensional position of everything genuinely visible within it.

## Orthomosaic Generation

The most common and widely used finished output from a drone mapping project is an **orthomosaic** — a single, large, seamless image created by properly stitching together all of the individual overlapping photographs, while simultaneously correcting for both camera lens distortion and terrain-related displacement.

This last correction is genuinely important and often not fully appreciated by beginners: a simple photo taken from directly above still isn't perfectly geometrically accurate, because taller features, like buildings or trees, appear to lean or shift somewhat in a raw, unprocessed photo, purely due to the specific camera angle relative to their true height. An orthomosaic corrects for this specific effect, producing an image with consistent, reliable scale throughout — meaning accurate distance and area measurements can genuinely be taken directly from it, exactly the same way you would measure accurately from a properly prepared traditional map.

Orthomosaics are exactly what you'll typically import directly into QGIS for further genuine analysis — measuring precise field areas, digitizing new infrastructure features, or combining directly with the satellite-derived data we covered back in Module 3, for direct, meaningful comparison at a much finer level of local detail.

## 3D Point Cloud Creation and Visualization

Beyond a flat, two-dimensional orthomosaic, photogrammetry processing can also generate a **3D point cloud** — a genuinely large collection of individual points in three-dimensional space, each representing a specific real-world location along with its measured elevation.

Point clouds are especially valuable for applications genuinely requiring elevation information: calculating precise stockpile volumes at a mining or construction site, generating an accurate digital elevation model for reliable flood risk modeling, connecting directly back to the water resource applications we discussed back in week one, or creating a genuinely detailed 3D visualization of a construction site's real, current progress compared against the original design plans.

Point cloud data can be further processed into a proper 3D mesh, effectively creating a complete digital twin of the actual physical site — a photorealistic three-dimensional model that stakeholders can genuinely explore and examine from any viewing angle, without ever needing to physically visit the actual site in person.

## LiDAR Basics

While photogrammetry derives structure indirectly from photographs, **LiDAR**, which stands for Light Detection and Ranging, takes a fundamentally different technical approach: it works by actively emitting rapid laser pulses and precisely measuring exactly how long each pulse takes to reflect back, directly calculating true distance from that measured time.

LiDAR offers one genuinely significant practical advantage over standard photogrammetry: its laser pulses can partially penetrate through vegetation canopy gaps, allowing it to capture accurate ground elevation data even in genuinely forested or heavily vegetated areas, where photogrammetry alone would only ever capture the visible top surface of the vegetation canopy itself, never the true ground beneath it. This makes LiDAR especially valuable for forestry applications and detailed flood modeling in areas with meaningful vegetation cover.

The clear tradeoff is cost: LiDAR sensors remain considerably more expensive than standard drone cameras, which is precisely why standard photogrammetry remains the more common, accessible choice for many genuinely practical projects, with LiDAR reserved specifically for applications where its unique capabilities are genuinely, specifically needed.

## Bringing It Together

Today we covered the complete processing pipeline from raw, individual drone photographs through to finished, genuinely usable mapping products: orthomosaics for accurate, detailed 2D analysis, and 3D point clouds and models for applications genuinely requiring elevation and volumetric information. Combined with everything from last week, you now have a complete, working picture of the full drone mapping workflow, from initial planning all the way through to a finished, genuinely usable deliverable.

For your assignment, create a full drone survey specifications document for a project of your choosing. For your practical exercise, process real drone imagery using simulation software and produce both a finished orthomosaic and a 3D model.

Next week, we move into Module 5: GIS Analysis and Mapping Applications, where we apply real, formal spatial analysis techniques to the rich data we've now learned to collect from multiple different sources. See you then.
