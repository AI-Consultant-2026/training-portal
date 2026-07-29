---
course: GIS and Drone Mapping
module: "Module 3: Remote Sensing & Satellite Imagery"
week: 4
topics:
  - Remote sensing concepts and physics
  - Satellite systems and imagery sources (Landsat, Sentinel, MODIS)
  - Spectral indices (NDVI, NDBI)
  - Image classification techniques
  - Change detection analysis
ties_to:
  assignment: "Perform change detection analysis; document environmental changes in Delta State"
  practical: "Analyze satellite imagery using QGIS; classify land use"
target_length_minutes: 14
---

# Week 4 Lecture Script: Reading the Earth From Space

[Open direct to camera]

Welcome to Module 3. This week, we cover one of the most powerful tools available in modern GIS work: remote sensing, using satellite imagery to observe and analyze the earth's surface from orbit, without ever needing to physically visit a site at all.

## Remote Sensing Concepts and Physics

**Remote sensing** means gathering information about an object or area without any direct physical contact — in our context, using sensors mounted on satellites, and later in this course, drones, to observe the earth's surface from a genuine distance.

The core underlying physics is refreshingly straightforward at a conceptual level: every surface on earth reflects and emits electromagnetic radiation in genuinely distinct, characteristic patterns. Healthy, dense vegetation reflects light very differently than bare soil, and bare soil reflects light very differently than open, standing water. Satellite sensors measure these reflectance patterns across different specific wavelengths, or bands, of the electromagnetic spectrum, and analysts like you can then use those detailed patterns to identify precisely what's actually present on the ground below.

The **visible spectrum** — the same red, green, and blue light genuinely visible to the human eye — is one part of this picture. But remote sensing sensors typically also capture data well beyond visible light entirely, notably in the **near-infrared** range, which turns out to be genuinely crucial for accurately identifying vegetation, since healthy plant material strongly reflects near-infrared light in a very distinctive, characteristic way that bare soil and most other surfaces simply do not replicate.

## Satellite Systems and Imagery Sources

Several major satellite programs provide freely available imagery, which is a genuinely enormous, valuable resource for a field like this.

**Landsat**, operated jointly by NASA and the United States Geological Survey, has continuously provided earth imagery since 1972, making it the longest-running, most valuable continuous satellite record available for reliably tracking long-term environmental change over many decades.

**Sentinel**, operated by the European Space Agency as part of the Copernicus program, provides more frequent revisit times than Landsat and higher spatial resolution for many practical applications, making it especially valuable for more time-sensitive, current monitoring work.

**MODIS**, another NASA program, provides considerably lower spatial resolution than either Landsat or Sentinel, but captures imagery of virtually the entire earth on a genuinely daily basis, making it especially well suited to tracking rapidly changing phenomena, like active wildfires or fast-moving storm systems.

The genuinely encouraging news for you: all three of these programs make their imagery completely freely available to the public. This means you can access globally consistent, scientifically rigorous satellite data covering Delta State and the entire surrounding region without any licensing cost whatsoever — a real, significant advantage for the practical work you'll do throughout the remainder of this course.

## Spectral Indices: NDVI and NDBI

Raw satellite imagery becomes considerably more analytically useful when combined into **spectral indices** — mathematical formulas that combine values from different specific bands to highlight a particular feature of genuine interest.

The **Normalized Difference Vegetation Index, NDVI**, is genuinely the most widely used spectral index in all of remote sensing. It combines the near-infrared and red bands we discussed a moment ago into a single formula that produces a value indicating vegetation health and density — higher NDVI values indicate genuinely dense, healthy vegetation, while lower values indicate bare soil, water, or clearly stressed, unhealthy vegetation. NDVI is exactly the tool you'd reasonably use to monitor crop health across a farming region, or to reliably track deforestation over time.

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

Today we covered how remote sensing actually works at a fundamental physical level, the major satellite programs providing freely available imagery, how spectral indices like NDVI extract meaningful, specific information from raw imagery, how image classification assigns clear meaning to individual pixels, and how change detection reveals genuine change over time. This gives you an entirely new, powerful data source well beyond the field-collected data we covered last week.

For your assignment, perform a genuine change detection analysis and document real environmental changes here in Delta State — deforestation, urban expansion, or agricultural change are all excellent, genuinely relevant starting points. For your practical exercise, analyze real satellite imagery using QGIS and classify land use, applying the techniques covered today.

Next week, we move into Module 4: Drone Operations and Survey Mapping — bringing this same remote sensing thinking down to a much closer, considerably more detailed scale. See you then.
