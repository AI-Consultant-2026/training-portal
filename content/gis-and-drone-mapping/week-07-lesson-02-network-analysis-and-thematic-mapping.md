---
course: GIS and Drone Mapping
module: "Module 5: GIS Analysis & Mapping Applications"
week: 7
lesson: 2
lesson_title: "Network Analysis and Thematic Mapping"
db_lesson_content: "Analyzing connected systems like roads and pipes, and communicating results through choropleth, graduated symbol, and heat maps."
target_length_minutes: 8
---

# Lesson 2: Network Analysis and Thematic Mapping

Last lesson covered buffering, overlay, proximity analysis, and interpolation. Now let's turn to connected systems, and how to communicate all of this analysis clearly.

## Network Analysis

**Network analysis** works specifically with genuinely connected, linear systems — road networks, water pipe systems, electrical grids. It answers questions like: what is the fastest available route between two specific points, which specific areas fall within a defined travel time of a hospital, or where exactly would a break in this particular water pipe network leave certain communities without any service at all.

This directly builds on the vector data concepts we introduced back in week one — roads and pipes are naturally represented as connected line features, and network analysis tools use that underlying connectivity to answer genuinely practical, real-world routing and accessibility questions.

## Thematic Mapping Techniques

Now that we can perform this kind of genuine analysis, we need to communicate the results clearly and effectively — exactly the purpose of **thematic mapping**, creating maps specifically designed to clearly show a particular theme or pattern, rather than simply displaying every available piece of raw data indiscriminately.

**Choropleth maps** use color shading across defined areas, like local government areas, to represent a data value — population density or literacy rate are both common, effective examples. **Graduated symbol maps** use symbols of varying size to represent varying data values at specific points — a larger circle at a location with meaningfully higher measured rainfall, for instance. **Heat maps** show the intensity of a phenomenon continuously across an entire area, often effectively used for visualizing something like disease incidence or measured flood risk.

Effective thematic mapping requires real, deliberate design discipline: choosing color schemes that are both intuitive and genuinely accessible, including to viewers with color vision deficiencies, selecting sensible, clearly interpretable data classification breaks, and always including that clear legend we discussed back in week two, so that any reader can correctly and confidently interpret exactly what they're looking at.

## Infrastructure and Environmental Monitoring Mapping

Let's bring all of this together with two genuinely practical, common applications you'll very likely encounter in real professional work.

**Infrastructure mapping** combines network analysis with overlay techniques to plan and manage roads, utilities, and public buildings — identifying underserved areas genuinely needing new infrastructure investment, or planning efficient, sensible maintenance routes across an existing large infrastructure network.

**Environmental monitoring mapping** combines the remote sensing and change detection techniques we covered back in Module 3 with the spatial analysis techniques from today, tracking things like deforestation rates, flood risk zones, or water quality patterns over time — directly supporting the kind of disaster risk assessment mapping this week's assignment specifically asks you to demonstrate.

## Bringing It Together

Today we covered the core spatial analysis toolkit that transforms carefully collected data into genuinely meaningful, actionable answers: buffering and overlay for relationship-based questions, interpolation and surface analysis for working confidently with continuous data, network analysis for connected systems, and thematic mapping for communicating your results clearly and effectively to others. This is genuinely the analytical heart of professional GIS work, and it draws directly on absolutely everything we've built together across the previous six weeks.

For your assignment, create a full series of thematic maps for a specific State resource of your choosing — water, agriculture, or infrastructure are all excellent, genuinely relevant starting points. For your practical exercise, perform real spatial analysis for a resource management problem, applying the specific techniques covered today.

Next week, in our final lecture, we cover project planning and preparation for your capstone project, where all of this genuinely comes together into one complete, comprehensive analysis.
