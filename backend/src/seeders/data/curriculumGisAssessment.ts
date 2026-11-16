import { CsfAssessmentChanges } from "./curriculumCyberSecurityAssessment";

// GIS and Drone Mapping, owner's changes of 2026-11-16 (applied by migration
// 20261116090000-gis-assessment-changes): a three-question knowledge check in every lesson
// (multiple choice, true or false, scenario), three learner reflections (lessons 1.2, 7.2, 9.2),
// a 30-question final assessment in place of the capstone and day assignments, and a course
// feedback questionnaire. Lesson sentences and four Day 8 Quiz question stems that pointed to the
// removed assignments or capstone are re-worded. Keys are "<day>.<lesson order>".
export const GIS_ASSESSMENT_CHANGES: Omit<CsfAssessmentChanges, "module18Description"> & {
  quizQuestionEdits: { from: string; to: string }[];
} = {
  "knowledgeChecks": {
    "1.1": [
      "**Knowledge check 1.1**",
      "**1.** What is attribute data?",
      "- A. The map's title and legend\n- B. The coordinates of a feature\n- C. Information linked to a location, such as soil quality or crop yield for each farm\n- D. The software used to make the map",
      "<details><summary>Show answer</summary>\n\n**C.** Combining location with attributes is what turns a map into a decision-making tool.\n\n</details>",
      "**2.** True or false: vector data stays crisp and precise however far you zoom in.",
      "<details><summary>Show answer</summary>\n\n**True.** Vector features are defined by exact coordinates, unlike raster pixels.\n\n</details>",
      "**3.** You need to map rainfall measured continuously across a whole region. Which data model fits best?",
      "- A. Raster, a grid of cells each holding a value\n- B. Vector points only\n- C. Vector polygons only\n- D. A table with no location",
      "<details><summary>Show answer</summary>\n\n**A.** Continuous values such as rainfall, elevation and imagery are usually stored as raster.\n\n</details>"
    ],
    "1.2": [
      "**Knowledge check 1.2**",
      "**1.** Why is QGIS a good tool to learn on?",
      "- A. It is the only GIS software that exists\n- B. It is free, professional-grade software, so you can build real skills without licence costs\n- C. It needs no computer\n- D. It only works offline",
      "<details><summary>Show answer</summary>\n\n**B.** Free access means skills can be built and practised without expensive licensing.\n\n</details>",
      "**2.** True or false: your first QGIS map should already look polished and professional.",
      "<details><summary>Show answer</summary>\n\n**False.** The first goal is comfort with the interface: loading layers, styling them and navigating.\n\n</details>",
      "**3.** A state water agency wants to know which communities most need new water points. Which GIS approach helps most?",
      "- A. Print a satellite photo of the state\n- B. List the communities alphabetically\n- C. Ask each community to send a letter\n- D. Map existing water access points and identify the underserved communities furthest from them",
      "<details><summary>Show answer</summary>\n\n**D.** GIS combines locations and attributes to show where investment would help most.\n\n</details>",
      "**Learner reflection 1 of 3**",
      "> Think about your own community or area. What is one problem, such as flooding, water access or farming, that a GIS map could help someone solve? What data would you need to map it?",
      "Write your answer in your notes. There is no right or wrong answer, and it isn't marked."
    ],
    "2.1": [
      "**Knowledge check 2.1**",
      "**1.** Why does every map projection introduce some distortion?",
      "- A. It is impossible to flatten a curved surface without distorting area, shape, distance or direction\n- B. Because satellites are inaccurate\n- C. Because the software is out of date\n- D. Because maps are printed too small",
      "<details><summary>Show answer</summary>\n\n**A.** Each projection preserves some properties at the expense of others.\n\n</details>",
      "**2.** True or false: the Mercator projection shows Greenland and Africa at their true relative sizes.",
      "<details><summary>Show answer</summary>\n\n**False.** Mercator preserves shape but greatly distorts area near the poles; Africa is about 14 times larger.\n\n</details>",
      "**3.** A field boundary layer is in a geographic coordinate system and a roads layer is in UTM. The layers don't line up. What is the most likely fix?",
      "- A. Delete the roads layer\n- B. Zoom out until they look aligned\n- C. Make sure both layers use the same coordinate system before analysis\n- D. Change the map's colours",
      "<details><summary>Show answer</summary>\n\n**C.** Mismatched coordinate systems are one of the most common beginner mistakes.\n\n</details>"
    ],
    "2.2": [
      "**Knowledge check 2.2**",
      "**1.** What does a map's legend do?",
      "- A. Shows which way is north\n- B. Explains what every symbol, colour and line style means\n- C. Gives the map's scale\n- D. Lists the data sources only",
      "<details><summary>Show answer</summary>\n\n**B.** A clear legend makes a map readable to someone other than its creator.\n\n</details>",
      "**2.** True or false: north is always at the top of every map, so there is no need to check.",
      "<details><summary>Show answer</summary>\n\n**False.** North-up is a convention, not a rule. Always check the orientation.\n\n</details>",
      "**3.** A small NGO with no software budget needs GIS for a community mapping project. Which software is the most practical choice?",
      "- A. QGIS, because it is free and powerful enough for most projects\n- B. ArcGIS, because only paid software is accurate\n- C. A spreadsheet with no maps\n- D. A paper map and ruler",
      "<details><summary>Show answer</summary>\n\n**A.** Core GIS concepts transfer between platforms, and QGIS has no licence cost.\n\n</details>"
    ],
    "3.1": [
      "**Knowledge check 3.1**",
      "**1.** What is crowdsourced spatial data, such as OpenStreetMap?",
      "- A. Data collected only by government agencies\n- B. Images taken by satellites\n- C. Data bought from private companies\n- D. Map data added and updated by many, often volunteer, contributors",
      "<details><summary>Show answer</summary>\n\n**D.** Coverage can be very detailed, but quality varies with local participation.\n\n</details>",
      "**2.** True or false: accuracy means how close a measurement is to the true value, while precision means how consistent repeated measurements are.",
      "<details><summary>Show answer</summary>\n\n**True.** Measurements can be precise but still inaccurate.\n\n</details>",
      "**3.** You must map water points under dense tree canopy using a smartphone GPS. What should you expect?",
      "- A. Better accuracy than in open ground\n- B. Reduced accuracy, which you should note in your collection protocol\n- C. Sub-centimetre accuracy\n- D. No effect on accuracy",
      "<details><summary>Show answer</summary>\n\n**B.** Tree canopy, tall buildings and atmospheric conditions all degrade GPS accuracy.\n\n</details>"
    ],
    "3.2": [
      "**Knowledge check 3.2**",
      "**1.** What does data cleaning deal with?",
      "- A. Changing map colours\n- B. Deleting all old data\n- C. Duplicate records, missing values and obvious outliers\n- D. Buying new software",
      "<details><summary>Show answer</summary>\n\n**C.** Cleaning is often the most time-consuming part of a real project.\n\n</details>",
      "**2.** True or false: subtly incorrect data usually looks obviously wrong, so it is easy to spot.",
      "<details><summary>Show answer</summary>\n\n**False.** Flawed data often looks legitimate until it leads to a poor decision. That's why validation matters.\n\n</details>",
      "**3.** A rainfall dataset shows 900 mm falling in one day at a station during the dry season. What should you do?",
      "- A. Flag it as a likely error and check it before using the data\n- B. Use it, because the data came from a station\n- C. Delete the whole dataset\n- D. Double all the other values to match",
      "<details><summary>Show answer</summary>\n\n**A.** Reviewing attributes for implausible values is a basic validation step.\n\n</details>"
    ],
    "4.1": [
      "**Knowledge check 4.1**",
      "**1.** Which satellite programme provides the longest continuous record, back to 1972?",
      "- A. Landsat\n- B. Sentinel\n- C. MODIS\n- D. Google Earth",
      "<details><summary>Show answer</summary>\n\n**A.** That long record makes Landsat ideal for tracking change over decades.\n\n</details>",
      "**2.** True or false: healthy vegetation strongly reflects near-infrared light.",
      "<details><summary>Show answer</summary>\n\n**True.** That distinctive reflection is why near-infrared is crucial for mapping vegetation.\n\n</details>",
      "**3.** You need to track an active wildfire every day across a large region. Which satellite source suits this best?",
      "- A. Landsat, because it has the highest resolution\n- B. A single drone flight\n- C. MODIS, which images almost the whole earth daily at lower resolution\n- D. A paper map from last year",
      "<details><summary>Show answer</summary>\n\n**C.** MODIS trades detail for very frequent coverage, which suits fast-changing events.\n\n</details>"
    ],
    "4.2": [
      "**Knowledge check 4.2**",
      "**1.** What does a high NDVI value usually indicate?",
      "- A. Bare soil\n- B. Open water\n- C. Built-up urban areas\n- D. Dense, healthy vegetation",
      "<details><summary>Show answer</summary>\n\n**D.** Low NDVI suggests bare soil, water or stressed vegetation.\n\n</details>",
      "**2.** True or false: in unsupervised classification, the analyst provides training examples before the software runs.",
      "<details><summary>Show answer</summary>\n\n**False.** That's supervised classification. Unsupervised groups pixels automatically, and the analyst interprets the groups afterwards.\n\n</details>",
      "**3.** A planner wants to know how much a town has grown between 2015 and 2025. Which approach fits best?",
      "- A. Look at one 2025 image only\n- B. Change detection: compare NDBI from images of the same area in both years\n- C. Calculate NDVI for one day\n- D. Count the roads on an old map",
      "<details><summary>Show answer</summary>\n\n**B.** Comparing the same area at two dates shows what has changed.\n\n</details>"
    ],
    "5.1": [
      "**Knowledge check 5.1**",
      "**1.** Which body regulates drone operations in Nigerian airspace?",
      "- A. The national mapping agency\n- B. The police only\n- C. The Nigerian Civil Aviation Authority (NCAA)\n- D. The drone manufacturer",
      "<details><summary>Show answer</summary>\n\n**C.** Drones are aircraft, so aviation rules apply.\n\n</details>",
      "**2.** True or false: using a drone to map a client's farm for payment needs no permit, because it is a small drone.",
      "<details><summary>Show answer</summary>\n\n**False.** Commercial operations generally need permits, whatever the drone's size.\n\n</details>",
      "**3.** A contractor needs to map a 40 km road corridor quickly. Which drone type is usually the better fit?",
      "- A. Fixed-wing, because it covers larger areas and flies longer\n- B. Multirotor, because it hovers best\n- C. Either, because there is no difference\n- D. No drone; drones can't map roads",
      "<details><summary>Show answer</summary>\n\n**A.** Fixed-wing drones suit large areas; multirotors suit smaller, detailed sites.\n\n</details>"
    ],
    "5.2": [
      "**Knowledge check 5.2**",
      "**1.** What is a ground control point (GCP)?",
      "- A. The place the drone takes off from\n- B. A clearly visible spot on the ground with precisely known coordinates\n- C. A point where the drone's battery is changed\n- D. A no-fly zone",
      "<details><summary>Show answer</summary>\n\n**B.** GCPs correct drift in the drone's own GPS during processing.\n\n</details>",
      "**2.** True or false: flying lower gives higher-resolution images but needs more flight passes to cover the same area.",
      "<details><summary>Show answer</summary>\n\n**True.** Altitude trades detail against coverage and flight time.\n\n</details>",
      "**3.** A drone map of a land boundary looks sharp, but no GCPs were used. A legal survey depends on it. What is the risk?",
      "- A. None, because sharp images are always accurate\n- B. The map will be too dark\n- C. The file will be too large to open\n- D. The map may be shifted from its true position, so boundaries could be wrong",
      "<details><summary>Show answer</summary>\n\n**D.** A detailed map can still be significantly offset without GCPs.\n\n</details>"
    ],
    "6.1": [
      "**Knowledge check 6.1**",
      "**1.** What is an orthomosaic?",
      "- A. A single seamless, geometrically corrected image stitched from many overlapping photos\n- B. One photo taken from very high up\n- C. A 3D model of a building\n- D. A satellite image",
      "<details><summary>Show answer</summary>\n\n**A.** Orthomosaics can be measured like a map, unlike a raw photo.\n\n</details>",
      "**2.** True or false: photogrammetry works out 3D positions by seeing the same point from two or more different camera positions.",
      "<details><summary>Show answer</summary>\n\n**True.** This is stereophotogrammetry, similar to how two eyes judge depth.\n\n</details>",
      "**3.** After processing, an orthomosaic has gaps and errors in several areas. What is the most likely cause?",
      "- A. The drone flew too slowly\n- B. The legend was missing\n- C. Not enough overlap between photos during the flight\n- D. The photos were in colour",
      "<details><summary>Show answer</summary>\n\n**C.** Every ground point needs to appear in several photos to be triangulated.\n\n</details>"
    ],
    "6.2": [
      "**Knowledge check 6.2**",
      "**1.** How does LiDAR measure distance?",
      "- A. By comparing two photos\n- B. By measuring sound waves\n- C. By reading GPS signals only\n- D. By timing how long laser pulses take to bounce back",
      "<details><summary>Show answer</summary>\n\n**D.** LiDAR calculates distance directly from the return time of each pulse.\n\n</details>",
      "**2.** True or false: standard photogrammetry can map the true ground surface under dense forest canopy.",
      "<details><summary>Show answer</summary>\n\n**False.** It only sees the top of the canopy. LiDAR can partly see through gaps to the ground.\n\n</details>",
      "**3.** A quarry wants an accurate volume for a large stockpile of aggregate. Which drone product is most useful?",
      "- A. A single aerial photo\n- B. A 3D point cloud or surface model of the stockpile\n- C. A choropleth map\n- D. A list of GPS points around the edge only",
      "<details><summary>Show answer</summary>\n\n**B.** Point clouds carry elevation, which volume calculations need.\n\n</details>"
    ],
    "7.1": [
      "**Knowledge check 7.1**",
      "**1.** What does buffering create?",
      "- A. A zone at a set distance around a feature\n- B. A map legend\n- C. A satellite image\n- D. A list of roads",
      "<details><summary>Show answer</summary>\n\n**A.** For example, every farm within 5 km of a proposed canal.\n\n</details>",
      "**2.** True or false: interpolation estimates values at places that weren't measured, based on nearby measured values.",
      "<details><summary>Show answer</summary>\n\n**True.** For example, rainfall between weather stations.\n\n</details>",
      "**3.** A planner needs areas that have both good soil and enough rainfall for a crop. Which technique fits best?",
      "- A. Buffering a single road\n- B. Slope analysis only\n- C. Overlay analysis, combining the soil and rainfall layers\n- D. Network analysis",
      "<details><summary>Show answer</summary>\n\n**C.** Overlay finds where several conditions are true at once.\n\n</details>"
    ],
    "7.2": [
      "**Knowledge check 7.2**",
      "**1.** What does a choropleth map use to show values across areas such as local government areas?",
      "- A. Symbols of different sizes\n- B. Colour shading\n- C. Arrows\n- D. 3D bars only",
      "<details><summary>Show answer</summary>\n\n**B.** Graduated symbols use size; heat maps show continuous intensity.\n\n</details>",
      "**2.** True or false: a thematic map should show every available piece of raw data so nothing is left out.",
      "<details><summary>Show answer</summary>\n\n**False.** Thematic maps show one theme or pattern clearly.\n\n</details>",
      "**3.** A health officer asks which communities are more than 30 minutes' drive from the nearest clinic. Which technique fits best?",
      "- A. A straight-line buffer only\n- B. NDVI\n- C. A choropleth of rainfall\n- D. Network analysis along the road network",
      "<details><summary>Show answer</summary>\n\n**D.** Travel time follows real roads, which network analysis models.\n\n</details>",
      "**Learner reflection 2 of 3**",
      "> Pick one question about your area that spatial analysis could answer, such as which communities are furthest from a clinic. Which techniques from today would you use, and in what order?",
      "Write your answer in your notes. There is no right or wrong answer, and it isn't marked."
    ],
    "8.1": [
      "**Knowledge check 8.1**",
      "**1.** What does a well-defined project scope specify?",
      "- A. The questions to answer, the geographic area covered and the deliverables\n- B. Only the software to be used\n- C. The colour scheme\n- D. The names of all staff",
      "<details><summary>Show answer</summary>\n\n**A.** Clear scope prevents projects that are too vague or unrealistic.\n\n</details>",
      "**2.** True or false: free satellite imagery has no cost at all in a project.",
      "<details><summary>Show answer</summary>\n\n**False.** It costs no money, but processing it takes time and skill.\n\n</details>",
      "**3.** A brief says \"map the environment of the State\" with two weeks and one analyst. What should the analyst do first?",
      "- A. Start mapping everything straight away\n- B. Ask for a drone first\n- C. Narrow the scope, for example to one resource in one local government area\n- D. Skip planning to save time",
      "<details><summary>Show answer</summary>\n\n**C.** Scope must match the time and resources actually available.\n\n</details>"
    ],
    "8.2": [
      "**Knowledge check 8.2**",
      "**1.** What is project-level quality assurance?",
      "- A. Choosing nice colours\n- B. Documenting the method, checking results against independent sources and having someone else review the findings\n- C. Checking the spelling of the title\n- D. Running the analysis faster",
      "<details><summary>Show answer</summary>\n\n**B.** A fresh pair of eyes often catches errors the analyst is too close to see.\n\n</details>",
      "**2.** True or false: stakeholders should usually see the results only when the whole project is finished.",
      "<details><summary>Show answer</summary>\n\n**False.** Share preliminary findings along the way and use their feedback.\n\n</details>",
      "**3.** Your analysis for a local council is technically excellent, but the councillors are not GIS specialists. How should you present it?",
      "- A. Use clear thematic maps or an interactive web map tied to the decisions they need to make\n- B. Send the raw data files\n- C. Present every technical detail first\n- D. Use as many layers as possible on one map",
      "<details><summary>Show answer</summary>\n\n**A.** Reporting should connect results to the original question in an accessible format.\n\n</details>"
    ],
    "9.1": [
      "**Knowledge check 9.1**",
      "**1.** What should you ask first before using GIS or drones in any sector?",
      "- A. Which drone is newest?\n- B. How many maps can we make?\n- C. What is the largest area we can cover?\n- D. What decision does someone actually need to make?",
      "<details><summary>Show answer</summary>\n\n**D.** Start with the decision, then choose the techniques that answer it.\n\n</details>",
      "**2.** True or false: banks usually need to fly their own drones to choose new branch locations.",
      "<details><summary>Show answer</summary>\n\n**False.** Bank questions are mostly answered by spatial analysis of location data, not drones.\n\n</details>",
      "**3.** An oil company needs to check whether new structures are encroaching on a pipeline's right of way. Which technique applies most directly?",
      "- A. NDVI for one day\n- B. Buffering a fixed-width corridor around the pipeline and checking what falls inside\n- C. A choropleth of population\n- D. LiDAR of the whole state",
      "<details><summary>Show answer</summary>\n\n**B.** Right-of-way management applies buffering directly.\n\n</details>"
    ],
    "9.2": [
      "**Knowledge check 9.2**",
      "**1.** In mining, what is the most valuable drone application?",
      "- A. Delivering parcels\n- B. Mapping bank branches\n- C. Stockpile and volume measurement using photogrammetry\n- D. Taking staff photos",
      "<details><summary>Show answer</summary>\n\n**C.** Drone-derived surface models give faster, more accurate volumes than ground methods.\n\n</details>",
      "**2.** True or false: a remote change-detection result for a pollution incident should be checked with field validation.",
      "<details><summary>Show answer</summary>\n\n**True.** Trustworthy assessments pair remote comparison with field checks.\n\n</details>",
      "**3.** A construction firm wants to track progress on a large site each month. What approach fits best?",
      "- A. Fly the same drone survey on a fixed schedule and compare each orthomosaic with the last\n- B. Take one photo at the end of the project\n- C. Use daily MODIS imagery\n- D. Draw sketches from memory",
      "<details><summary>Show answer</summary>\n\n**A.** It is the same before-and-after logic as change detection, applied to a site.\n\n</details>",
      "**Learner reflection 3 of 3**",
      "> Which of the seven sectors interests you most, and why? Name two GIS or drone skills from this course you would most want to show an employer in that sector, and one way to practise them.",
      "Write your answer in your notes. There is no right or wrong answer, and it isn't marked."
    ]
  },
  "closing": [
    "## Final assessment",
    "This course ends with a final assessment.",
    "- 30 multiple-choice questions covering the whole course.\n- Pass mark: 24 out of 30 (80%).\n- Time limit: 45 minutes. Question order is shuffled.\n- After you submit, you can see the correct answers with explanations.",
    "| Topic | Questions |\n| --- | --- |\n| GIS fundamentals and data models | 4 |\n| Coordinate systems, projections and maps | 3 |\n| Spatial data sources and quality | 3 |\n| Remote sensing and change detection | 4 |\n| Drone regulations and flight planning | 3 |\n| Photogrammetry, 3D mapping and LiDAR | 3 |\n| Spatial analysis and thematic mapping | 4 |\n| GIS project planning and delivery | 3 |\n| Industry applications | 3 |\n| **Total** | **30** |",
    "Open **Final Assessment** from this day's quizzes when you are ready.",
    "## Course feedback questionnaire",
    "When you finish this lesson, the course shows as completed on your dashboard. Select **Share feedback** on the course card to answer five short questions:",
    "1. Overall, how would you rate this course?\n2. How relevant was the course to the job or career you want?\n3. How confident do you now feel about planning and carrying out a GIS or drone mapping task?\n4. How easy was the course to follow?\n5. What was most useful, and what one thing should we improve?",
    "It takes about two minutes. Your answers help us improve the course."
  ],
  "textEdits": {
    "1.2": [
      {
        "from": "For your assignment, research specific GIS applications already in use, or clearly needed, in the State, and document your findings. For your practical exercise, get comfortable creating a basic map in QGIS using the provided datasets.",
        "to": "For your practical exercise, get comfortable creating a basic map in QGIS using the provided datasets."
      }
    ],
    "2.2": [
      {
        "from": "For your assignment, complete the QGIS tutorial on basic mapping, paying close attention to how coordinate systems are handled within the actual software interface. For your practical exercise, perform spatial queries and analysis on sample data, applying everything we've covered across these first two days.",
        "to": "For your practical exercise, perform spatial queries and analysis on sample data, applying everything we've covered across these first two days."
      }
    ],
    "3.2": [
      {
        "from": "For your assignment, create a full data collection protocol for a mapping project, addressing source selection, accuracy requirements, and validation steps. For your practical exercise, collect real field data using mobile GPS, then import and properly validate it within QGIS.",
        "to": "For your practical exercise, collect real field data using mobile GPS, then import and properly validate it within QGIS."
      }
    ],
    "4.2": [
      {
        "from": "For your assignment, perform a genuine change detection analysis and document real environmental changes here in the State — deforestation, urban expansion, or agricultural change are all excellent, genuinely relevant starting points. For your practical exercise, analyze real satellite imagery using QGIS and classify land use, applying the techniques covered this day.",
        "to": "For your practical exercise, analyze real satellite imagery using QGIS and classify land use, applying the techniques covered this day."
      },
      {
        "from": "Finally, let's cover the technique directly connecting to your assignment this day: **change detection**",
        "to": "Finally, let's cover one of the most useful techniques in remote sensing: **change detection**"
      }
    ],
    "5.2": [
      {
        "from": "For your assignment, research the country's specific drone regulations in real detail and document the compliance requirements relevant to a professional mapping operation. For your practical exercise, plan a complete drone survey mission and document all your chosen flight parameters, applying everything covered this day.",
        "to": "For your practical exercise, plan a complete drone survey mission and document all your chosen flight parameters, applying everything covered this day."
      }
    ],
    "6.2": [
      {
        "from": "For your assignment, create a full drone survey specifications document for a project of your choosing. For your practical exercise, process real drone imagery using simulation software and produce both a finished orthomosaic and a 3D model.",
        "to": "For your practical exercise, process real drone imagery using simulation software and produce both a finished orthomosaic and a 3D model."
      }
    ],
    "7.2": [
      {
        "from": "For your assignment, create a full series of thematic maps for a specific State resource of your choosing — water, agriculture, or infrastructure are all excellent, genuinely relevant starting points. For your practical exercise, perform real spatial analysis for a resource management problem, applying the specific techniques covered today.",
        "to": "For your practical exercise, perform real spatial analysis for a resource management problem, applying the specific techniques covered today."
      },
      {
        "from": " — directly supporting the kind of disaster risk assessment mapping this day's assignment specifically asks you to demonstrate.",
        "to": " — directly supporting disaster risk assessment mapping."
      },
      {
        "from": "Next day, in our final lecture, we cover project planning and preparation for your capstone project, where all of this genuinely comes together into one complete, comprehensive analysis.",
        "to": "Next day, we cover project planning: how to scope, resource and deliver a GIS project in which all of this comes together into one complete analysis."
      }
    ],
    "3.1": [
      {
        "from": "— precisely the kind of decision you'll need to make and clearly justify in this day's assignment.",
        "to": "— a decision you should always be able to explain and justify."
      }
    ],
    "5.1": [
      {
        "from": ", and it's exactly what this day's assignment asks you to research in careful detail.",
        "to": ", and worth researching in careful detail before any professional flight."
      }
    ],
    "8.1": [
      {
        "from": "This directly connects to your capstone project, which asks you to support the State government planning for sustainable agriculture zones. That's a genuinely substantial, ambitious topic, and part of your real work this day is narrowing it into a scope",
        "to": "Consider a project to support State government planning for sustainable agriculture zones. That's a genuinely substantial, ambitious topic, and good scoping narrows it into a scope"
      },
      {
        "from": " This is exactly what this day's assignment specifically asks you to produce.",
        "to": ""
      }
    ],
    "8.2": [
      {
        "from": "## Preparing Your Capstone Project",
        "to": "## Bringing a Project Together"
      },
      {
        "from": "Your capstone project asks you to support sustainable agriculture zone planning through a comprehensive GIS analysis, a full series of thematic maps, a complete drone survey report, and clear implementation recommendations. Treat this as one connected, cohesive story:",
        "to": "A real project, such as supporting sustainable agriculture zone planning, typically needs a comprehensive GIS analysis, a full series of thematic maps, a drone survey report, and clear implementation recommendations. Treat it as one connected, cohesive story:"
      },
      {
        "from": "Your capstone project is your opportunity to demonstrate every single piece of this as one coherent, complete body of work.",
        "to": "The final assessment at the end of this course checks every piece of it."
      },
      {
        "from": "For your assignment, create a full project timeline and resource plan. For your practical exercise, finalize your capstone project's scope and methodology, applying everything covered today.",
        "to": "For your practical exercise, draft the scope, methodology, timeline and resource plan for a GIS project of your choice, applying everything covered today."
      },
      {
        "from": "Good luck with your capstone project.",
        "to": "Next day, you'll see how the same toolkit applies across seven industry sectors."
      }
    ],
    "9.1": [
      {
        "from": "exactly the technique used for suitability zones in day seven's assignment.",
        "to": "the same technique used for suitability zones in day seven."
      },
      {
        "from": "If your capstone takes the banking track, the honest answer",
        "to": "If you work in banking, the honest answer"
      },
      {
        "from": "and closes with how to choose your own capstone track from all seven.",
        "to": "and closes with how to choose which sector to focus on."
      }
    ],
    "9.2": [
      {
        "from": "the same GSD and flight-height calculation you practised in day six's assignment, applied",
        "to": "the same GSD and flight-height thinking from days five and six, applied"
      },
      {
        "from": "structurally the same method as the flood-risk worked example you saw in that day's assignment brief.",
        "to": "structurally the same overlay method covered that day."
      },
      {
        "from": "exactly as you practised in day four's assignment,",
        "to": "exactly as covered in day four,"
      },
      {
        "from": "## Choosing Your Capstone Track",
        "to": "## Choosing Your Sector"
      },
      {
        "from": "Your capstone project asks you to choose **one** of these sectors — or a comparable question in a similar sector — and carry a complete, connected analysis through it from data collection to final recommendations, exactly as this course's original agriculture-planning framing has always asked you to do for one specific area.",
        "to": "A good next step is to choose **one** of these sectors — or a comparable question in a similar sector — and practise carrying a complete, connected analysis through it, from data collection to final recommendations."
      },
      {
        "from": "Next up is your assignment for today, and then your capstone project.",
        "to": "Next up is the final assessment, below."
      }
    ]
  },
  "quizQuestionEdits": [
    {
      "from": "What does the capstone project ask students to support?",
      "to": "In the lesson's example of an ambitious GIS project, what was the project meant to support?"
    },
    {
      "from": "Which of the following is suggested as a way to narrow an overly broad capstone scope?",
      "to": "Which of the following is suggested as a way to narrow an overly broad project scope?"
    },
    {
      "from": "What does the capstone project require, tying together the whole course?",
      "to": "What does a full GIS project like the agriculture-zone example typically need, tying together the whole course?"
    },
    {
      "from": "In one or two sentences, explain why narrowing the capstone project's scope is important, and give an example of how to do it.",
      "to": "In one or two sentences, explain why narrowing a GIS project's scope is important, and give an example of how to do it."
    }
  ],
  "finalAssessment": [
    {
      "text": "Which data model represents features as points, lines, and polygons with precise coordinates?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Vector data uses exact coordinates for discrete features.",
      "answers": [
        {
          "text": "Vector",
          "isCorrect": true
        },
        {
          "text": "Raster",
          "isCorrect": false
        },
        {
          "text": "Tabular",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which data model represents continuous phenomena as a grid of cells?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Raster suits continuous data such as imagery, elevation and rainfall.",
      "answers": [
        {
          "text": "Vector",
          "isCorrect": false
        },
        {
          "text": "Relational",
          "isCorrect": false
        },
        {
          "text": "Raster",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is attribute data?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Combining location with attributes turns a map into a decision tool.",
      "answers": [
        {
          "text": "The coordinate system a dataset uses",
          "isCorrect": false
        },
        {
          "text": "Additional information combined with location, such as soil quality or crop yield history alongside farm boundaries",
          "isCorrect": true
        },
        {
          "text": "The exact pixel resolution of a satellite image",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "A specific well location would typically be represented in a GIS as which vector feature type?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "A single location such as a well is a point.",
      "answers": [
        {
          "text": "A point",
          "isCorrect": true
        },
        {
          "text": "A line",
          "isCorrect": false
        },
        {
          "text": "A polygon",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is a map projection?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Projections flatten the curved earth, always with some distortion.",
      "answers": [
        {
          "text": "A device used to measure distance during a field survey",
          "isCorrect": false
        },
        {
          "text": "A type of raster data file format",
          "isCorrect": false
        },
        {
          "text": "A mathematical method for representing the curved surface of the earth on a flat plane",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "Which projection system is commonly used for accurate distance and area measurement within the country?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "UTM gives accurate distance and area within each zone.",
      "answers": [
        {
          "text": "Robinson projection",
          "isCorrect": false
        },
        {
          "text": "UTM (Universal Transverse Mercator)",
          "isCorrect": true
        },
        {
          "text": "Standard Mercator",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "A map scale of 1 to 50,000 means one unit measured on the map represents what in the real world?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "One map unit equals 50,000 of the same units on the ground.",
      "answers": [
        {
          "text": "50,000 of those same units",
          "isCorrect": true
        },
        {
          "text": "50,000 square kilometers",
          "isCorrect": false
        },
        {
          "text": "50,000 individual map layers",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which three factors should drive the choice of data source for a project?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Accuracy, timeliness and budget drive the choice of source.",
      "answers": [
        {
          "text": "File format, software vendor, and internet speed",
          "isCorrect": false
        },
        {
          "text": "Screen resolution, map color scheme, and legend style",
          "isCorrect": false
        },
        {
          "text": "Required accuracy, timeliness, and available budget",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is the difference between accuracy and precision?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Measurements can be consistent (precise) but still wrong (inaccurate).",
      "answers": [
        {
          "text": "Accuracy applies only to raster data; precision applies only to vector data",
          "isCorrect": false
        },
        {
          "text": "Accuracy is closeness to the true value; precision is consistency between repeated measurements",
          "isCorrect": true
        },
        {
          "text": "Accuracy and precision mean exactly the same thing",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What does data cleaning specifically address?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Cleaning removes errors before analysis.",
      "answers": [
        {
          "text": "Duplicate records, missing values, and obvious outliers",
          "isCorrect": true
        },
        {
          "text": "Choosing which projection to use for a map",
          "isCorrect": false
        },
        {
          "text": "Selecting the correct drone flight altitude",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is remote sensing?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Satellites and drones observe the surface without physical contact.",
      "answers": [
        {
          "text": "Physically visiting a site to collect GPS coordinates",
          "isCorrect": false
        },
        {
          "text": "Manually digitizing paper maps into a GIS",
          "isCorrect": false
        },
        {
          "text": "Gathering information about an object or area without direct physical contact, using sensors",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "Which satellite program has continuously provided earth imagery since 1972, making it the longest-running continuous satellite record?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Landsat's long record suits tracking change over decades.",
      "answers": [
        {
          "text": "MODIS",
          "isCorrect": false
        },
        {
          "text": "Landsat",
          "isCorrect": true
        },
        {
          "text": "Sentinel",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Which two bands does NDVI combine to indicate vegetation health and density?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "NDVI combines near-infrared and red bands.",
      "answers": [
        {
          "text": "Near-infrared and red",
          "isCorrect": true
        },
        {
          "text": "Blue and green",
          "isCorrect": false
        },
        {
          "text": "Ultraviolet and near-infrared",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is change detection?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Comparing the same area at different dates reveals change.",
      "answers": [
        {
          "text": "Comparing two different projections of the same map",
          "isCorrect": false
        },
        {
          "text": "Comparing GPS accuracy across different devices",
          "isCorrect": false
        },
        {
          "text": "Comparing imagery of the same area at two or more points in time to identify what has meaningfully changed",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "Which of the following is listed as a key NCAA regulatory requirement for drone operators?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Commercial drone operations generally need permits.",
      "answers": [
        {
          "text": "A requirement to fly only at night",
          "isCorrect": false
        },
        {
          "text": "Required permits for commercial drone operations",
          "isCorrect": true
        },
        {
          "text": "Mandatory use of fixed-wing drones only",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What percentage of image overlap is typically needed for mapping software to reliably stitch photos together?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Enough overlap lets software stitch photos reliably.",
      "answers": [
        {
          "text": "Around 70 to 80 percent",
          "isCorrect": true
        },
        {
          "text": "Around 10 to 20 percent",
          "isCorrect": false
        },
        {
          "text": "Exactly 100 percent",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is a ground control point (GCP)?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "GCPs correct the drone's onboard GPS drift.",
      "answers": [
        {
          "text": "The exact spot where a drone takes off",
          "isCorrect": false
        },
        {
          "text": "A marker showing the center of the mapped area only",
          "isCorrect": false
        },
        {
          "text": "A visible location with precisely known real-world coordinates, used to calibrate a drone map's positional accuracy",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What is photogrammetry?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Photogrammetry extracts measurements and 3D structure from photos.",
      "answers": [
        {
          "text": "A technique for measuring GPS signal strength",
          "isCorrect": false
        },
        {
          "text": "The science of extracting reliable measurements and 3D structure from 2D photographs",
          "isCorrect": true
        },
        {
          "text": "The practice of registering a drone with aviation authorities",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is an orthomosaic?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "An orthomosaic can be measured like a map.",
      "answers": [
        {
          "text": "A single, large, seamless image stitched from overlapping photos, corrected for lens distortion and terrain displacement",
          "isCorrect": true
        },
        {
          "text": "A raw, single drone photograph with no processing applied",
          "isCorrect": false
        },
        {
          "text": "A 3D point cloud converted directly into a video",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is LiDAR's key advantage over standard photogrammetry in vegetated areas?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "LiDAR can capture ground elevation through gaps in vegetation.",
      "answers": [
        {
          "text": "It is significantly cheaper than a standard drone camera",
          "isCorrect": false
        },
        {
          "text": "It does not require any overlap between passes",
          "isCorrect": false
        },
        {
          "text": "Its laser pulses can partially penetrate canopy gaps to capture true ground elevation",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What does buffering create?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "A buffer is a zone at a set distance around a feature.",
      "answers": [
        {
          "text": "A ranked list of the closest facilities to a location",
          "isCorrect": false
        },
        {
          "text": "A defined zone at a specified distance around a chosen feature",
          "isCorrect": true
        },
        {
          "text": "A continuous raster surface interpolated from point data",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What does overlay analysis do?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Overlay finds where several conditions are true together.",
      "answers": [
        {
          "text": "Combines two or more data layers to identify relationships between them",
          "isCorrect": true
        },
        {
          "text": "Converts vector data into raster data automatically",
          "isCorrect": false
        },
        {
          "text": "Measures the exact area of a single polygon only",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What is interpolation used for?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Interpolation fills gaps between measured points.",
      "answers": [
        {
          "text": "Converting a projected coordinate system into geographic coordinates",
          "isCorrect": false
        },
        {
          "text": "Registering a drone with the NCAA before flight",
          "isCorrect": false
        },
        {
          "text": "Estimating values at unmeasured locations based on the pattern of nearby known values",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What do choropleth maps use to represent a data value across defined areas like local government areas?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Choropleths shade areas by value.",
      "answers": [
        {
          "text": "Continuous intensity gradients with no defined boundaries",
          "isCorrect": false
        },
        {
          "text": "Color shading",
          "isCorrect": true
        },
        {
          "text": "Symbols of varying size",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What three things does a well-defined project scope specify?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Clear scope prevents vague or unrealistic projects.",
      "answers": [
        {
          "text": "What questions the project answers, what geographic area it covers, and what deliverables it produces",
          "isCorrect": true
        },
        {
          "text": "Which software license to purchase and which drone model to buy",
          "isCorrect": false
        },
        {
          "text": "The exact number of team members and their job titles",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "What does effective stakeholder engagement involve?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Involve stakeholders throughout, not just at the end.",
      "answers": [
        {
          "text": "Waiting until the final report is complete before contacting anyone",
          "isCorrect": false
        },
        {
          "text": "Limiting all communication to written technical documentation only",
          "isCorrect": false
        },
        {
          "text": "Actively involving stakeholders throughout the project, not just presenting a finished analysis at the end",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "What should a final project report clearly connect the analysis back to?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Reports should answer the original question with clear recommendations.",
      "answers": [
        {
          "text": "A list of every software plugin installed during the project",
          "isCorrect": false
        },
        {
          "text": "The original project goals — the question asked, methodology used, findings, and recommendations",
          "isCorrect": true
        },
        {
          "text": "The exact GPS coordinates of every ground control point used",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "When should a drone be used rather than existing satellite or vector data?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Drones suit small areas that need high detail and current conditions.",
      "answers": [
        {
          "text": "When the problem is a small area needing high detail and current conditions",
          "isCorrect": true
        },
        {
          "text": "As the default first step for every single GIS project",
          "isCorrect": false
        },
        {
          "text": "Only when satellite imagery is completely unavailable anywhere in the world",
          "isCorrect": false
        }
      ]
    },
    {
      "text": "Why is a network-distance catchment better than a simple straight-line buffer?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "People travel along roads, not in straight lines.",
      "answers": [
        {
          "text": "Straight-line buffers cannot be drawn in QGIS",
          "isCorrect": false
        },
        {
          "text": "Network analysis is required by banking regulation in every country",
          "isCorrect": false
        },
        {
          "text": "A straight-line buffer overstates how far someone will actually travel along the real road network",
          "isCorrect": true
        }
      ]
    },
    {
      "text": "In mining, what is the single most valuable drone application?",
      "type": "multiple_choice",
      "points": 1,
      "explanation": "Drone surface models give fast, accurate volumes.",
      "answers": [
        {
          "text": "Issuing worker identification badges",
          "isCorrect": false
        },
        {
          "text": "Stockpile and volume measurement using photogrammetry",
          "isCorrect": true
        },
        {
          "text": "Drawing the mine's legal boundary on a printed map",
          "isCorrect": false
        }
      ]
    }
  ]
};
