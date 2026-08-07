---
course: GIS and Drone Mapping
module: "Module 3: Remote Sensing & Satellite Imagery"
week: 4
lesson: 2
lesson_title: "Spectral Indices, Classification, and Change Detection"
db_lesson_content: "Using NDVI and NDBI to extract meaning from imagery, classifying land cover, and detecting change over time."
target_length_minutes: 8
---

# Lesson 2: Spectral Indices, Classification, and Change Detection

Last lesson covered how remote sensing works and where to get freely available satellite imagery. Now let's turn that raw imagery into genuinely useful information.

## Spectral Indices: NDVI and NDBI

Raw satellite imagery becomes considerably more analytically useful when combined into **spectral indices** — mathematical formulas that combine values from different specific bands to highlight a particular feature of genuine interest.

The **Normalized Difference Vegetation Index, NDVI**, is genuinely the most widely used spectral index in all of remote sensing. It combines the near-infrared and red bands we discussed last lesson into a single formula that produces a value indicating vegetation health and density — higher NDVI values indicate genuinely dense, healthy vegetation, while lower values indicate bare soil, water, or clearly stressed, unhealthy vegetation. NDVI is exactly the tool you'd reasonably use to monitor crop health across a farming region, or to reliably track deforestation over time.

The **Normalized Difference Built-up Index, NDBI**, follows broadly similar underlying mathematical principles, but is specifically designed to highlight built-up, urban areas rather than vegetation — genuinely useful for tracking urban growth and expansion over time, directly relevant to the urban planning applications we discussed all the way back in week one.

## Image Classification Techniques

**Image classification** is the process of assigning every individual pixel in a satellite image to a specific, meaningful category — water, forest, urban area, bare soil, cropland.

**Supervised classification** involves the analyst providing genuine training examples — specifically identifying representative pixels that clearly belong to each category — and the software then uses those provided examples to classify every remaining pixel in the full image based on how closely each one's spectral pattern matches those training examples.

**Unsupervised classification** instead lets the software automatically group pixels with statistically similar spectral patterns together, without any prior human-provided examples, and the analyst then interprets what each resulting group most likely represents after that automatic classification is complete.

Both approaches have genuine, real value. Supervised classification tends to be more accurate when good, representative training data is genuinely available, while unsupervised classification can meaningfully help reveal patterns you might not have specifically thought to look for in advance.

## Change Detection Analysis

Finally, let's cover the technique directly connecting to your assignment this week: **change detection**, comparing imagery of the exact same area captured at two or more genuinely different points in time to identify precisely what has meaningfully changed.

This might mean comparing NDVI values across two different years to identify deforestation, comparing NDBI values to track urban expansion, or comparing land classification results to identify agricultural land being converted to residential or other uses. Change detection is exactly what makes long-running programs like Landsat so genuinely valuable — decades of consistent, comparable imagery allow for real long-term environmental change analysis that simply wouldn't otherwise be possible.

## Bringing It Together

Today we covered how spectral indices like NDVI and NDBI extract meaningful, specific information from raw imagery, how image classification assigns clear meaning to individual pixels, and how change detection reveals genuine change over time. This gives you an entirely new, powerful data source well beyond the field-collected data we covered in Module 2.

For your assignment, perform a genuine change detection analysis and document real environmental changes here in the State — deforestation, urban expansion, or agricultural change are all excellent, genuinely relevant starting points. For your practical exercise, analyze real satellite imagery using QGIS and classify land use, applying the techniques covered this week.

Next week, we move into Module 4: Drone Operations and Survey Mapping — bringing this same remote sensing thinking down to a much closer, considerably more detailed scale.
