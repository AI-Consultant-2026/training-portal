import { BriefSpec } from "./briefBuilder";

// GIS and Drone Mapping, Days 1-8. Keyed by module week_number.
export const GIS_WEEKS: Record<number, BriefSpec> = {
  1: {
    overview:
      "GIS is only valuable when it answers a real question for real people. In this assignment you act as a consultant researching where GIS is **already used, or clearly needed,** in a Nigerian State, and writing up what you find so that a decision-maker could see the opportunity.",
    tasks: [
      "Choose **one Nigerian State** and name it. Describe it in 2-3 sentences (main economy, geography and challenges) using reliable sources.",
      "Identify **at least four GIS applications**, either already in use or clearly needed, in sectors such as agriculture, water, health, transport, land administration, environment or oil and gas. Use real evidence: government pages, news reports, NGO reports, or official statistics.",
      "For **each application**, complete these fields: **the decision or problem it supports**, **who would use it**, **the data layers needed** (name at least three), whether each layer is **vector or raster** and why, and the **practical benefit** if it were done well.",
      "For **at least one application**, state what data would be hardest to obtain in your State and how you might get it.",
      "Finish with a **short recommendation (100-150 words)**: which single application should the State prioritise first, and why?",
    ],
    deliverables: [
      "A written report of **700-1,000 words** (.docx, .pdf or .txt).",
      "A summary table with columns *Application | Decision supported | Users | Data layers (vector or raster) | Benefit*.",
      "A **sources list** (title, organisation, date and web address) for every source used.",
    ],
    criteria: [
      { name: "Research quality and evidence", points: 30, description: "Applications are genuine, specific to the State and supported by credible, cited sources." },
      { name: "Data layers and vector/raster reasoning", points: 25, description: "Layers are appropriate for each application and correctly classified as vector or raster with reasons." },
      { name: "Benefit and users", points: 20, description: "Clearly says who decides what, and what improves as a result." },
      { name: "Recommendation", points: 15, description: "A reasoned priority that follows from the evidence." },
      { name: "Clarity", points: 10, description: "Organised, table complete and sources listed." },
    ],
    example:
      "*Worked example (one row) for an invented scenario. Do not reuse its wording. Your row must be based on real evidence for your State.*\n\n| Application | Decision supported | Users | Data layers | Benefit |\n|---|---|---|---|---|\n| Locating new boreholes | Where to drill so that villages are within 1 km of safe water | State water agency, NGOs | (1) Existing water points (**vector points**: location is a discrete feature); (2) Settlements (**vector points or polygons**); (3) Rainfall or groundwater potential (**raster**: values vary continuously across space) | Fewer dry boreholes and villages served faster |\n\n**Hardest data.** Up-to-date water-point condition (working or broken). It changes often, so it would need a regular mobile survey by local volunteers.\n\n**Recommendation (extract).** *\"Prioritise borehole planning: it reuses data the agency already holds, and the benefit reaches people directly within one dry season.\"*",
    tips: [
      "Vector = discrete things (points, lines, polygons). Raster = continuous surfaces made of cells. Explain *why* for each layer.",
      "Generic claims such as \"GIS improves planning\" earn no marks. Name the decision and the data.",
      "Cite your sources. Unsupported claims about a State will lose marks.",
    ],
  },

  2: {
    overview:
      "A map that uses the wrong coordinate system can put a road in the wrong place, or make one region look far bigger than it is. You will complete a guided basic-mapping exercise in QGIS with close attention to **coordinate reference systems (CRS)** and **projections**, then explain what you observed.",
    materials:
      "**You will need:** QGIS (free), and a free administrative-boundary dataset for the country (for example from GADM, Natural Earth or GRID3). Keep a note of where you downloaded it.",
    tasks: [
      "Install QGIS, create a new project and **add the country boundary layer**. Open the layer properties and **record the layer's CRS** (name and EPSG code).",
      "Set the **project CRS to WGS 84 (EPSG:4326)** and note what the map looks like. Then change the project CRS to **WGS 84 / UTM zone 32N (EPSG:32632)**. Take a screenshot of each version.",
      "**Measure the distance** between two cities (for example Lagos and Abuja) in each project CRS using the measure tool, first with the **Cartesian (planar)** setting and then with the **ellipsoidal** setting, and record all four results. Explain any differences between them.",
      "**Create a point layer** of **at least five places** by entering their coordinates (decimal degrees) and give each a label. Confirm that the points land where you expect. Deliberately enter one point with **latitude and longitude swapped** and explain what happens.",
      "Style the layers and add the standard **map elements**: a title, legend, scale bar, north arrow and data source. Export the finished map as a PNG or PDF.",
      "Write a **short explanation (250-400 words)** covering: what a CRS is, the difference between a **geographic** and a **projected** CRS, what you noticed, and one situation where choosing the wrong CRS would cause a real problem.",
    ],
    deliverables: [
      "The **exported map** (PNG or PDF), the two CRS **screenshots** and your **write-up**, combined in one document (.docx or .pdf preferred).",
      "State the **source** of every dataset you used.",
    ],
    criteria: [
      { name: "Completed mapping tasks", points: 30, description: "Layers added, CRS set as instructed, points created and correctly placed, evidence shown by screenshots." },
      { name: "CRS observations", points: 30, description: "Records the correct CRS values, compares distances and explains the differences accurately." },
      { name: "Map design", points: 15, description: "Clear, uncluttered map with title, legend, scale bar, north arrow and source." },
      { name: "Written explanation", points: 15, description: "Correct in your own words, including geographic vs projected and a real-world consequence." },
      { name: "Clarity", points: 10, description: "Well organised, with evidence in the right places." },
    ],
    example:
      "*Worked example (extract) for a different task. Do not reuse its wording.*\n\n**Observation.** I loaded a layer of district boundaries for an invented country in EPSG:4326 (a geographic CRS in degrees). When I measured the distance between two towns with the straight-line tool and the ellipsoidal option turned off, QGIS reported *0.84* (degrees), which is meaningless as a distance. After reprojecting the project to a projected CRS in metres suited to that area (the matching UTM zone), the same measurement showed *94.2 km*.\n\n**Explanation (extract).** A geographic CRS describes locations on the curved Earth using angles (latitude and longitude). A projected CRS flattens part of the Earth onto a plane, measured in metres, and always distorts something (area, distance or shape). That is why I choose a projected CRS suited to the area when I need to measure distances or areas.\n\n**Real-world problem.** Calculating a farm's area in a degree-based CRS would give a wrong figure, and a wrong fertiliser order.",
    tips: [
      "Do not skip the swapped-coordinates test. Latitude and longitude mixed up is one of the most common real-world data errors.",
      "Record the *exact* CRS name and EPSG code, not just \"WGS 84\".",
      "Explain *in your own words*. Pasting the definitions from a website will lose marks.",
    ],
  },

  3: {
    overview:
      "Most GIS projects fail because of bad or poorly documented data, not bad software. A **data collection protocol** is the written plan that says what data you need, where it will come from, how accurate it must be and how you will check it. You will write one for a mapping project of your choosing.",
    tasks: [
      "Choose a **realistic mapping project** in the country (for example mapping public water points in a local government area, health clinics, informal market locations, or farm plots) and state its **purpose and the decision it supports** in 2-3 sentences.",
      "List the **data layers you need** and, for each, whether it is a point, line, polygon or raster.",
      "For **each layer, choose a source**: an authoritative or open dataset, a satellite image, a field survey or crowdsourced data. Justify each choice and note the **licence or permission** needed.",
      "State the **accuracy requirements** for the project (for example horizontal accuracy in metres, how recent the data must be) and **explain why** they are appropriate for the purpose, not just the highest possible.",
      "Design the **attribute table** for one layer: a table of at least six fields with *Field name | Type | Allowed values or format | Example*.",
      "Describe the **collection method and tools** (for example phone GPS, handheld GPS, drone) and how you will train and supervise collectors.",
      "List **at least five validation steps** (for example checking duplicates, checking coordinates fall inside the study area, a second-person spot-check of 10% of records) and say how you will **store, back up and name** the files.",
    ],
    deliverables: [
      "A protocol document of **800-1,200 words** (.docx or .pdf preferred).",
      "It must include a *layers and sources* table and the attribute table.",
    ],
    criteria: [
      { name: "Purpose and data needs", points: 15, description: "A clear decision to support and a logical set of layers." },
      { name: "Sources and permissions", points: 20, description: "Sensible source for each layer with justification and licensing or permission noted." },
      { name: "Accuracy requirements", points: 20, description: "Requirements are numeric, justified and suited to the purpose." },
      { name: "Attribute design", points: 15, description: "A usable schema with types, formats and examples." },
      { name: "Validation and storage", points: 20, description: "At least five practical validation steps and a clear storage and backup plan." },
      { name: "Clarity", points: 10, description: "Structured so another person could follow the protocol." },
    ],
    example:
      "*Worked example (extract) for a different project: mapping market stalls in one town. Do not reuse its wording.*\n\n**Purpose.** Help the local council plan fairer stall fees.\n\n**Accuracy requirement.** Positions accurate to about 5 m are enough, because stalls are only needed to identify which block they sit in, and phone GPS usually meets this. Surveyor-grade accuracy would cost far more and add nothing for this decision.\n\n| Field name | Type | Allowed values | Example |\n|---|---|---|---|\n| stall_id | Text | Unique code S-0001 to S-9999 | S-0142 |\n| trade_type | Text | Choose from a fixed list (food, cloth, hardware, other) | food |\n| size_m2 | Number | Between 1 and 40 | 6 |\n| surveyed_on | Date | YYYY-MM-DD | 2026-03-14 |\n\n**Validation.** (1) Reject duplicate stall_ids; (2) all points must fall inside the market boundary polygon; (3) a supervisor re-visits 10% of stalls to confirm details.",
    tips: [
      "The best accuracy is the one *the decision needs*, not the most precise one you can imagine. Justify it.",
      "Use controlled lists (allowed values) in the attribute table. Free text causes messy data.",
      "Do not forget licences and permission. Using data without permission is a real project risk.",
    ],
  },

  4: {
    overview:
      "Satellites let you see how a landscape changes over time: forest lost, farmland converted, a town spreading. In this assignment you carry out a **change detection analysis** using satellite images from two dates, and document what changed and how confident you are.",
    materials:
      "**Free imagery sources:** Copernicus (Sentinel-2) via the Copernicus browser or EO Browser, or Landsat via USGS EarthExplorer. **Free software:** QGIS. Choose a **small area of a Nigerian State** (roughly 5-20 km across) and two dates **at least three years apart**, in the **same season** and with **little cloud cover**.",
    tasks: [
      "State your **study area** and **why it is interesting** (for example a town at the edge of a forest, or farmland near a growing city). Record the **two image dates** and the satellite used.",
      "Create a **true-colour or false-colour composite** for each date and export both as maps with the same extent.",
      "Calculate a **spectral index** for each date, such as **NDVI** for vegetation. State the formula, and show a screenshot of each result.",
      "Produce a **change map** (for example subtract one index from the other, or classify pixels into *decreased, no change and increased*) and state the **thresholds** you used and why.",
      "Calculate the **area of change** in hectares for each category and present it in a table.",
      "Write an **interpretation (300-450 words)** describing what changed and what it probably means on the ground, and **at least three limitations** (for example clouds, seasonal differences, resolution, classification error). If possible, **check your result against a high-resolution image** or another source and report what you found.",
    ],
    deliverables: [
      "A single report (.docx or .pdf preferred) of **700-1,000 words** with the two composites, the two index maps, the change map, the area table and your interpretation.",
      "State the image IDs or dates and the data source.",
    ],
    criteria: [
      { name: "Data choice and preparation", points: 15, description: "Suitable dates and area; same-season, low-cloud imagery; sources stated." },
      { name: "Index calculation", points: 20, description: "The correct index and formula applied to both dates, with clear outputs." },
      { name: "Change map and area", points: 25, description: "A sound change method with justified thresholds and correct area figures." },
      { name: "Interpretation", points: 25, description: "What changed and why it matters, grounded in the evidence you produced." },
      { name: "Limitations and validation", points: 15, description: "At least three genuine limitations and an attempt to verify the result." },
    ],
    example:
      "*Worked example (extract) for a different area, an invented wetland edge. Do not reuse its wording.*\n\n**Index.** NDVI = (NIR - Red) / (NIR + Red). Values near 1 show dense healthy vegetation; near 0 show bare ground; negative values usually show water.\n\n**Change method.** I subtracted NDVI (2019) from NDVI (2024). Cells that dropped by more than 0.2 were labelled *decreased*, those that rose by more than 0.2 *increased*, and the rest *no change*. I chose 0.2 because small differences of 0.05-0.1 can be caused by different moisture or sun angle, not by real change.\n\n| Category | Area (ha) |\n|---|---|\n| Decreased | 312 |\n| No change | 4,890 |\n| Increased | 145 |\n\n**Limitation.** Both images were taken in the dry season to reduce the effect of crop growth, but the 2024 image was two weeks later, so some of the increase may be new leaf growth rather than real land-cover change.",
    tips: [
      "Comparing images from different seasons is the most common mistake. Explain how you avoided it.",
      "Say *why* you chose your thresholds. \"I picked 0.2\" is not enough.",
      "Report your area in hectares from the actual pixel count, not an estimate by eye.",
    ],
  },

  5: {
    overview:
      "Flying a drone for professional mapping in the country is regulated. A mapping company that ignores the rules risks fines, seized equipment and worse. You will research the regulations of the **Civil Aviation Authority (NCAA)** and any related approvals, and turn them into a compliance guide for a professional mapping operation.",
    tasks: [
      "Find the **official NCAA sources** on unmanned aircraft (drone) operations, such as its regulations and any published guidance or forms. List each source with its title and date.",
      "Build a **compliance table** with columns *Requirement | Source (document, section and date) | What it means in practice for a mapping operation | Evidence you must keep | Who is responsible*. Cover at least **eight** requirements, for example aircraft registration or approval, pilot qualification, operator permission, restricted or no-fly areas, flight limits (height, line of sight), insurance, privacy or consent and incident reporting. Include **any other approvals** you find in official sources.",
      "Write a **pre-flight compliance checklist** of at least ten items that a pilot must confirm before every mapping flight.",
      "Write a section titled **\"What I could not confirm\"** listing any requirement you could not verify from an official source, and how you would confirm it (for example contacting the regulator).",
      "Explain in 100-150 words **one real consequence** of non-compliance for a mapping business.",
    ],
    deliverables: [
      "A compliance guide of **800-1,200 words** (.docx, .pdf or .txt) with the table, the checklist, the \"could not confirm\" section and a sources list.",
      "State the **date you checked** the regulations, since rules change.",
    ],
    criteria: [
      { name: "Use of official sources", points: 25, description: "Requirements come from official NCAA (or other official) documents and are cited precisely." },
      { name: "Compliance table", points: 30, description: "At least eight accurate requirements, each explained in practical terms with evidence and responsibility." },
      { name: "Checklist", points: 20, description: "A practical, ordered pre-flight checklist that reflects the table." },
      { name: "Honesty about gaps", points: 15, description: "Clearly identifies what could not be confirmed instead of guessing." },
      { name: "Clarity", points: 10, description: "Well organised and usable by a pilot." },
    ],
    example:
      "*Format example only, using an INVENTED regulator and INVENTED rule numbers. It shows how to write an entry; it is not real regulation. Your entries must come from real official documents.*\n\n| Requirement | Source | What it means in practice | Evidence to keep | Responsible |\n|---|---|---|---|---|\n| Register each aircraft before use | *Example Aviation Authority, Drone Rules, Rule EX-12 (2024)* (invented) | Every drone in the company fleet must carry a registration number before it flies on a job | Registration certificate for each drone, in the flight kit | Operations manager |\n| Stay out of restricted zones | *Example Aviation Authority, Rule EX-19* (invented) | Check the map for airports and secure sites before planning any flight line | Screenshot of the checked map, saved with the job file | Remote pilot |\n\n**What I could not confirm (extract).** *\"I found no official statement of the maximum flight altitude. I would confirm this by emailing the regulator and would not plan any flight above 120 m until I have it in writing.\"*",
    tips: [
      "Do not rely on blogs or forums as your only source. Quote and cite the official document.",
      "If you cannot verify something, say so. Guessing a regulation is worse than admitting a gap.",
      "Regulations change. State the date you checked.",
    ],
  },

  6: {
    overview:
      "A drone survey specification is the document a client and a pilot both sign up to. It states exactly what will be captured, how accurately and in what form the results will be delivered. You will write a full specification for a mapping project of your choosing.",
    materials:
      "**Useful formula: Ground Sample Distance (GSD)**, the size of one pixel on the ground.\n\n`GSD (m) = (sensor width (mm) x flight height (m)) / (focal length (mm) x image width (pixels))`\n\n*Illustration only:* a camera with a 13.2 mm sensor width, 8.8 mm focal length and 5,472 pixels across, flown at 100 m, gives (13.2 x 100) / (8.8 x 5,472) = about 0.027 m, i.e. **2.7 cm per pixel**. Use the specifications of the camera you choose.",
    tasks: [
      "Choose a **realistic project** (for example a 40-hectare estate topographic survey, a farm plot map, or a road corridor) and describe **purpose, location, area in hectares and the client's need**.",
      "State the **deliverables** (for example orthomosaic, digital surface model, contour map, point cloud) with file formats and the **coordinate reference system**.",
      "Set the **accuracy requirement** (target GSD and expected horizontal and vertical accuracy) and **explain why** that is appropriate for the purpose.",
      "Choose the **equipment** (drone type, camera, and positioning method such as **ground control points (GCPs)** or RTK/PPK) and justify it.",
      "Calculate the **flight height** needed for your target GSD using the formula, showing your working. State **front and side overlap**, flight speed, and estimate the **number of flights** needed.",
      "Plan your **ground control points**: how many, where they are placed and how they are surveyed.",
      "Describe **weather and time conditions**, **safety and regulatory compliance** (linking to Day 5) and the **processing workflow** (software, quality checks, final checks before delivery).",
    ],
    deliverables: [
      "A specification document of **800-1,200 words** (.docx or .pdf preferred).",
      "It must include the GSD and flight-height calculation, a *deliverables table* and a *flight parameters table*.",
    ],
    criteria: [
      { name: "Scope and deliverables", points: 20, description: "Clear purpose, area and complete deliverables with formats and CRS." },
      { name: "Accuracy and calculation", points: 25, description: "A justified accuracy target and a correct GSD/flight-height calculation with working shown." },
      { name: "Equipment and GCPs", points: 20, description: "Justified equipment and a sensible ground control plan." },
      { name: "Flight parameters", points: 15, description: "Realistic overlap, speed and number of flights." },
      { name: "Compliance, conditions and QA", points: 10, description: "Covers safety, weather, regulations and quality checks." },
      { name: "Clarity", points: 10, description: "Professional and unambiguous enough for a client to sign." },
    ],
    example:
      "*Worked example (extract) for a different project: a 12-hectare school compound map. Do not reuse its wording.*\n\n**Target.** 3 cm/pixel, enough to trace building edges and paths to about 10 cm accuracy.\n\n**Calculation.** Camera: 13.2 mm sensor width, 8.8 mm focal length, 5,472 px wide. To get 3 cm (0.03 m) per pixel: flight height = (GSD x focal length x image width) / sensor width = (0.03 x 8.8 x 5,472) / 13.2 = **109 m**.\n\n| Parameter | Value |\n|---|---|\n| Front / side overlap | 75% / 65% |\n| Flight speed | 6 m/s |\n| Estimated flights | 2 (about 18 minutes each) |\n| GCPs | 5 (four corners and one central), surveyed with a handheld GNSS receiver, photographed and recorded |",
    tips: [
      "Show your working for the flight-height calculation. An answer with no working earns little.",
      "Higher accuracy costs more time and money. Match the accuracy to what the client actually needs.",
      "Do not forget compliance. A specification that ignores regulations is not professional.",
    ],
  },

  7: {
    overview:
      "A thematic map is a story about one topic on a map. Done well, it makes a decision-maker say *\"I see the problem.\"* Done badly, it confuses. You will create a **series of thematic maps** for a real Nigerian State resource and apply the spatial analysis and design techniques from this day.",
    tasks: [
      "Choose **one theme** for one State: **water**, **agriculture** or **infrastructure**. State the **question** your map series answers (for example *\"Which villages are more than 2 km from a health centre?\"*).",
      "Gather **open data** (for example from GRID3, OpenStreetMap, DIVA-GIS, WorldPop or satellite data) and list every source.",
      "Produce **at least three maps** in QGIS, each showing a **different analysis**. Use **at least two** techniques from: **buffering**, **overlay**, **surface analysis** and **network analysis**.",
      "For each map give: **title**, **purpose**, **data used**, **method used** (with any settings such as buffer distance) and a **one-paragraph interpretation** of what it shows.",
      "Apply **good cartographic design** to each map: a suitable **classification method** and colour scheme (with a reason), a legend, scale bar, north arrow and data source.",
      "Write a **closing summary (100-150 words)** answering your question and stating one limitation.",
    ],
    deliverables: [
      "A document (.docx or .pdf) with the **three map images** (or more) and the accompanying method and interpretation, about **700-1,000 words** in total.",
      "A **sources list** for all data.",
    ],
    criteria: [
      { name: "Question and data", points: 15, description: "A clear question and appropriate, properly cited data." },
      { name: "Spatial analysis", points: 30, description: "Techniques are correct, well chosen for the question and documented with settings." },
      { name: "Cartographic design", points: 25, description: "Classification, colours and map elements are appropriate and readable." },
      { name: "Interpretation", points: 20, description: "Conclusions follow from the maps and answer the question." },
      { name: "Clarity", points: 10, description: "Well organised, with the maps clearly labelled." },
    ],
    example:
      "*Worked example (extract) for a different theme and area. Do not reuse its wording.*\n\n**Question.** *Which farming villages around an invented lake are within reach of a paved road?*\n\n| Map | Technique | Settings | What it shows |\n|---|---|---|---|\n| 1. Villages near the road | Buffer | 2 km buffer around paved roads | 60% of villages lie inside the buffer |\n| 2. Farmland in the buffer | Overlay (clip) | Farmland polygons clipped by the buffer | 3,400 ha of farmland have easy road access |\n\n**Design choice.** For a map of *rates* I used a sequential colour scheme (light to dark) with five classes chosen by *natural breaks*, so clusters of similar values are grouped together. I avoided red-green combinations that some readers cannot tell apart.",
    tips: [
      "Every map needs one clear message. If you cannot state it in a sentence, redesign it.",
      "State your settings (for example the buffer distance) and why. A buffer without a distance is meaningless.",
      "Check your colours for readability, including for people with colour-blindness.",
    ],
  },

  8: {
    overview:
      "A brilliant analysis that runs out of time and money is a failure. Planning the work honestly is a professional skill. You will produce a **project timeline and resource plan** for your capstone project, estimating time, people, equipment and cost.",
    tasks: [
      "Summarise your **capstone project** in 3-4 sentences: the area, the question it answers, the deliverables and the audience.",
      "Break the project into **at least ten tasks** grouped in phases (for example planning, data collection, drone survey, processing, analysis, mapping, reporting, stakeholder presentation). For each task, give the **duration**, **who does it** and any **dependency** (what must be done first).",
      "Present the schedule as a **timeline table or Gantt-style chart** across the weeks available.",
      "Estimate **personnel time** by role in days, a list of **equipment and software** (say which are free and which must be bought or rented) and other costs such as **data, transport, permits and insurance**.",
      "Give a **budget in naira** with clearly stated assumptions (for example day rate, distance, unit prices) and include a **contingency** of 10-20% with a reason.",
      "List **three risks** to the schedule or budget (for example bad weather delaying flights, or a permit delay) with how you would respond to each.",
    ],
    deliverables: [
      "A plan of **600-900 words** (.docx or .pdf preferred) including the task table, timeline, budget table with assumptions, and risk list.",
    ],
    criteria: [
      { name: "Task breakdown and dependencies", points: 25, description: "At least ten realistic tasks with durations, owners and logical dependencies." },
      { name: "Timeline", points: 20, description: "A clear schedule that fits the time available and respects dependencies." },
      { name: "Resource and budget estimate", points: 30, description: "Complete, realistic figures with assumptions stated and a justified contingency." },
      { name: "Risks", points: 15, description: "Three realistic risks with practical responses." },
      { name: "Clarity", points: 10, description: "Neat, consistent and understandable to a client or supervisor." },
    ],
    example:
      "*Worked example (extract) for a different project: an eight-week land-use map for a small town. Do not reuse its wording.*\n\n| # | Task | Duration | Owner | Depends on |\n|---|---|---|---|---|\n| 1 | Agree scope with client | 3 days | Project lead | None |\n| 2 | Obtain permits and plan flights | 5 days | Pilot | 1 |\n| 3 | Drone flights and GCP survey | 3 days | Pilot, field assistant | 2 |\n| 4 | Process imagery | 4 days | Analyst | 3 |\n\n**Budget (extract, assumptions stated).**\n\n| Item | Assumption | Cost (NGN) |\n|---|---|---|\n| Pilot | 8 days x 40,000 | 320,000 |\n| Transport | 3 trips x 25,000 | 75,000 |\n| Software | QGIS and open-source tools | 0 |\n| Contingency | 15% of the total | 60,000 |\n\n**Risk.** Rain delays the flights. *Response:* build two spare days into the schedule and set a weather cut-off rule.",
    tips: [
      "State your assumptions. A budget total with no assumptions cannot be checked.",
      "Check dependencies. You cannot process images before you have flown.",
      "Do not forget contingency and permits. They are the usual causes of overrun.",
    ],
  },
};
