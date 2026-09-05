import crypto from "crypto";
import { QueryInterface } from "sequelize";

const COURSE_SLUG = "uav-drone-consultant-pathway";
const TIME_LIMIT_MINUTES = 20;
const PASSING_SCORE = 70;
const QUESTION_COUNT = 10;

interface AnswerSeed {
  text: string;
  isCorrect: boolean;
}

interface QuestionSeed {
  text: string;
  type: "multiple_choice" | "true_false" | "short_answer";
  explanation: string | null;
  answers: AnswerSeed[];
}

interface AssessmentSeed {
  title: string;
  weekNumber: number;
  description: string;
  questions: QuestionSeed[];
}

// 7 milestone assessments, each attached to the module (week) of the last week in the
// range it covers. Each bank has 15 questions; a real attempt draws QUESTION_COUNT (10)
// at random (shuffleQuestions: true). Weekly self-testing itself lives in each lesson's
// own "Knowledge Check" section (see curriculumUav.ts) -- these are the graded,
// timed, milestone-level checks the user's spec calls for.
const ASSESSMENTS: AssessmentSeed[] = [
  {
    title: "Beginner Assessment",
    weekNumber: 2,
    description: "Covers Weeks 1-2: UAV/UAS terminology, aircraft categories, components, and flight principles.",
    questions: [
      { text: "What does UAS stand for?", type: "multiple_choice", explanation: null, answers: [{ text: "Uncrewed Aircraft System", isCorrect: true }, { text: "Universal Aerial Sensor", isCorrect: false }, { text: "Unmanned Airspace Standard", isCorrect: false }] },
      { text: "What is a UAV's payload?", type: "multiple_choice", explanation: null, answers: [{ text: "Whatever it carries to do its job, e.g. a camera or sensor", isCorrect: true }, { text: "The battery only", isCorrect: false }, { text: "The remote control", isCorrect: false }] },
      { text: "Which UAV category can hover perfectly still over one spot?", type: "multiple_choice", explanation: null, answers: [{ text: "Fixed-wing", isCorrect: false }, { text: "Multirotor", isCorrect: true }, { text: "Neither", isCorrect: false }] },
      { text: "Which UAV category needs forward motion to generate lift and usually can't hover?", type: "multiple_choice", explanation: null, answers: [{ text: "Multirotor", isCorrect: false }, { text: "Fixed-wing", isCorrect: true }, { text: "Single-rotor", isCorrect: false }] },
      { text: "What problem does a VTOL fixed-wing UAV solve?", type: "multiple_choice", explanation: null, answers: [{ text: "Long range with no runway needed", isCorrect: true }, { text: "Cheaper battery cost", isCorrect: false }, { text: "No sensors required", isCorrect: false }] },
      { text: "Which component decides how fast each motor should spin, moment to moment?", type: "multiple_choice", explanation: null, answers: [{ text: "Battery", isCorrect: false }, { text: "Flight controller", isCorrect: true }, { text: "Frame", isCorrect: false }] },
      { text: "What does an ESC do?", type: "multiple_choice", explanation: null, answers: [{ text: "Converts a flight controller's command into the exact power a single motor needs", isCorrect: true }, { text: "Stores GPS coordinates", isCorrect: false }, { text: "Holds the camera steady", isCorrect: false }] },
      { text: "Why do multirotor propellers spin in alternating directions?", type: "short_answer", explanation: "So their rotational forces cancel out, rather than the whole aircraft spinning itself out of control.", answers: [] },
      { text: "Which sensor measures rotational speed, helping detect unwanted spinning?", type: "multiple_choice", explanation: null, answers: [{ text: "Barometer", isCorrect: false }, { text: "Gyroscope", isCorrect: true }, { text: "Magnetometer", isCorrect: false }] },
      { text: "Which sensor estimates altitude using air pressure?", type: "multiple_choice", explanation: null, answers: [{ text: "Barometer", isCorrect: true }, { text: "Accelerometer", isCorrect: false }, { text: "GPS", isCorrect: false }] },
      { text: "A multirotor steers using a rudder, similar to a boat.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "\"Drone\" and \"UAV\" mean exactly the same precise thing to professionals.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "A UAS is only the physical aircraft, with nothing else included.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "A client wants to inspect the inside of a large empty grain silo, close up, from many angles. Which UAV category best fits, and why?", type: "short_answer", explanation: "Multirotor -- it can hover and manoeuvre precisely in a confined space, which fixed-wing/VTOL aircraft cannot do.", answers: [] },
      { text: "Explain, in your own words, why a UAV consultant thinks about payload before choosing an aircraft.", type: "short_answer", explanation: "The payload (what needs to be carried to do the job) determines the real requirement; the aircraft is only useful insofar as it can carry and support that payload correctly.", answers: [] },
    ],
  },
  {
    title: "Navigation Assessment",
    weekNumber: 4,
    description: "Covers Weeks 3-4: GPS/GNSS, latitude/longitude/altitude, coordinate systems, waypoints, headings, bearings, and distance.",
    questions: [
      { text: "Which term correctly refers to ALL satellite navigation systems, not just the American one?", type: "multiple_choice", explanation: null, answers: [{ text: "GPS", isCorrect: false }, { text: "GNSS", isCorrect: true }, { text: "HDOP", isCorrect: false }] },
      { text: "A lower HDOP value generally means:", type: "multiple_choice", explanation: null, answers: [{ text: "A more accurate position fix", isCorrect: true }, { text: "A less accurate position fix", isCorrect: false }, { text: "No effect on accuracy", isCorrect: false }] },
      { text: "What does RTK correction improve?", type: "multiple_choice", explanation: null, answers: [{ text: "GNSS accuracy, down to a few centimetres", isCorrect: true }, { text: "Battery life", isCorrect: false }, { text: "Camera resolution", isCorrect: false }] },
      { text: "Coordinates are conventionally written in which order?", type: "multiple_choice", explanation: null, answers: [{ text: "Longitude, latitude", isCorrect: false }, { text: "Latitude, longitude", isCorrect: true }, { text: "Altitude, latitude", isCorrect: false }] },
      { text: "What does AGL stand for?", type: "multiple_choice", explanation: null, answers: [{ text: "Above Ground Level", isCorrect: true }, { text: "Aircraft Guidance Line", isCorrect: false }, { text: "Altitude Grid Location", isCorrect: false }] },
      { text: "A UAV flying at a constant 100 m AGL over hilly terrain stays the same height above the ground the entire time.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "What is a waypoint?", type: "multiple_choice", explanation: null, answers: [{ text: "A single coordinate stop in a flight path", isCorrect: true }, { text: "A type of battery", isCorrect: false }, { text: "A ground control station", isCorrect: false }] },
      { text: "Which CRS is the standard used by GPS and almost all UAV systems worldwide?", type: "multiple_choice", explanation: null, answers: [{ text: "WGS84", isCorrect: true }, { text: "EPSG:3857", isCorrect: false }, { text: "There is no standard", isCorrect: false }] },
      { text: "What does RTH (Return-To-Home) do?", type: "short_answer", explanation: "Automatically flies the aircraft back to its home point and lands, triggered manually or automatically (e.g. lost signal, low battery).", answers: [] },
      { text: "What bearing corresponds to due East?", type: "multiple_choice", explanation: null, answers: [{ text: "0 degrees", isCorrect: false }, { text: "90 degrees", isCorrect: true }, { text: "270 degrees", isCorrect: false }] },
      { text: "Heading and bearing always mean exactly the same thing in every situation.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Every coordinate reference system describes a given real-world location with the exact same numbers.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "You're given a coordinate for a supposed site in Nigeria with a negative latitude. What's suspicious, and what would you check first?", type: "short_answer", explanation: "Nigeria's latitude is expected to be positive (roughly 4N-14N); a negative value suggests a typo, sign error, or wrong-location coordinate -- check the source data.", answers: [] },
      { text: "Why do many mapping missions lock the camera to a fixed heading rather than following the direction of travel?", type: "short_answer", explanation: "So every photo is oriented consistently, which makes photogrammetry software able to stitch them together accurately afterward.", answers: [] },
      { text: "Standard consumer-grade GNSS is typically accurate to:", type: "multiple_choice", explanation: null, answers: [{ text: "A few centimetres", isCorrect: false }, { text: "A few metres", isCorrect: true }, { text: "A few kilometres", isCorrect: false }] },
    ],
  },
  {
    title: "UAV Systems Assessment",
    weekNumber: 7,
    description: "Covers Weeks 5-7: flight controllers, autopilots, firmware, telemetry, GCS, MAVLink, PX4, ArduPilot, and simulation.",
    questions: [
      { text: "Which term describes the physical circuit board, not the software running on it?", type: "multiple_choice", explanation: null, answers: [{ text: "Autopilot", isCorrect: false }, { text: "Firmware", isCorrect: false }, { text: "Flight controller", isCorrect: true }] },
      { text: "What is firmware?", type: "multiple_choice", explanation: null, answers: [{ text: "The specific version of software installed and running on the flight controller", isCorrect: true }, { text: "The aircraft's frame material", isCorrect: false }, { text: "A type of sensor", isCorrect: false }] },
      { text: "In Stabilize flight mode, what does the pilot still control directly?", type: "multiple_choice", explanation: null, answers: [{ text: "Direction and altitude", isCorrect: true }, { text: "Nothing -- it's fully automatic", isCorrect: false }, { text: "Only the camera", isCorrect: false }] },
      { text: "What is telemetry?", type: "multiple_choice", explanation: null, answers: [{ text: "The continuous stream of data sent from aircraft to ground", isCorrect: true }, { text: "The camera feed only", isCorrect: false }, { text: "The mission-planning software", isCorrect: false }] },
      { text: "What does GCS stand for?", type: "multiple_choice", explanation: null, answers: [{ text: "Ground Control Station", isCorrect: true }, { text: "Global Coordinate System", isCorrect: false }, { text: "General Command Software", isCorrect: false }] },
      { text: "What problem does MAVLink solve?", type: "multiple_choice", explanation: null, answers: [{ text: "Different systems being unable to communicate with each other", isCorrect: true }, { text: "Battery life", isCorrect: false }, { text: "Propeller design", isCorrect: false }] },
      { text: "MAVLink is a private protocol owned by a single UAV manufacturer.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Which organisation maintains both MAVLink and PX4?", type: "multiple_choice", explanation: null, answers: [{ text: "Dronecode Foundation", isCorrect: true }, { text: "NASA", isCorrect: false }, { text: "QGIS", isCorrect: false }] },
      { text: "Which ground control station is most closely associated with ArduPilot?", type: "multiple_choice", explanation: null, answers: [{ text: "QGroundControl", isCorrect: false }, { text: "Mission Planner", isCorrect: true }, { text: "MAVSDK", isCorrect: false }] },
      { text: "What does SITL stand for?", type: "multiple_choice", explanation: null, answers: [{ text: "Software-In-The-Loop", isCorrect: true }, { text: "Sensor-In-The-Loop", isCorrect: false }, { text: "Simulation-In-The-Land", isCorrect: false }] },
      { text: "A mission that runs perfectly in SITL simulation is automatically safe and legal to fly with a real aircraft.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "What is the key practical difference between SITL and HITL?", type: "short_answer", explanation: "SITL runs the autopilot as software with a fully simulated aircraft and sensors (no hardware needed); HITL uses real flight-controller hardware fed simulated sensor data.", answers: [] },
      { text: "A pre-flight checklist screen should let a pilot arm the motors regardless of GPS fix quality.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Name two things a typical Ground Control Station lets an operator do.", type: "short_answer", explanation: "Any two of: plan a mission, upload it to the aircraft, view live telemetry, send commands (e.g. RTH), configure parameters, review flight logs.", answers: [] },
      { text: "Which vehicle types, beyond aircraft, does ArduPilot notably support?", type: "multiple_choice", explanation: null, answers: [{ text: "Ground rovers, boats, and submarines", isCorrect: true }, { text: "Only multirotors", isCorrect: false }, { text: "None -- ArduPilot only supports aircraft", isCorrect: false }] },
    ],
  },
  {
    title: "Programming Assessment",
    weekNumber: 9,
    description: "Covers Weeks 8-9: Python foundations, coordinate/GPS data handling, files, MAVSDK, and telemetry logging.",
    questions: [
      { text: "Which Python structure would you use to group a latitude, longitude, and altitude that all belong to ONE waypoint?", type: "multiple_choice", explanation: null, answers: [{ text: "A list", isCorrect: false }, { text: "A dictionary", isCorrect: true }, { text: "A function", isCorrect: false }] },
      { text: "A function must be written fresh every time you need to use it, and can't be reused.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "What does a `for` loop let you do?", type: "multiple_choice", explanation: null, answers: [{ text: "Store one single value", isCorrect: false }, { text: "Repeat a block of code once per item in a list", isCorrect: true }, { text: "Open a file", isCorrect: false }] },
      { text: "The Haversine formula is more accurate than a simple degrees-to-metres rule of thumb, especially over longer distances.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "What is CSV useful for in UAV work?", type: "multiple_choice", explanation: null, answers: [{ text: "A simple, universal plain-text format most data/mapping tools can read and write", isCorrect: true }, { text: "It's only used for images", isCorrect: false }, { text: "It's a type of sensor", isCorrect: false }] },
      { text: "What is MAVSDK?", type: "multiple_choice", explanation: null, answers: [{ text: "A programming library providing a simple interface to MAVLink autopilots", isCorrect: true }, { text: "A type of drone battery", isCorrect: false }, { text: "A ground control station", isCorrect: false }] },
      { text: "Using MAVSDK, a programmer must build every raw MAVLink message by hand.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Why does MAVSDK use async programming (the `await` keyword)?", type: "short_answer", explanation: "Because communicating with a real or simulated aircraft over a network takes real time, and async lets the program wait for slow operations without freezing entirely.", answers: [] },
      { text: "Which MAVSDK plugin would you use to read the aircraft's current battery level repeatedly during flight?", type: "multiple_choice", explanation: null, answers: [{ text: "action", isCorrect: false }, { text: "telemetry", isCorrect: true }, { text: "mission", isCorrect: false }] },
      { text: "Why does a telemetry logger use an `async for` loop rather than a regular `for` loop?", type: "short_answer", explanation: "Telemetry arrives as a continuous live stream, not a fixed already-complete list, so the loop must keep waiting for and processing new items as they arrive.", answers: [] },
      { text: "A telemetry log file, once created, has no value after the flight has finished.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "What is a \"parameter\" in the context of a Python function?", type: "multiple_choice", explanation: null, answers: [{ text: "An input value the function accepts", isCorrect: true }, { text: "The function's name", isCorrect: false }, { text: "A type of loop", isCorrect: false }] },
      { text: "Which Python data type would best store an ordered sequence of ten altitude values for one mission?", type: "multiple_choice", explanation: null, answers: [{ text: "A dictionary", isCorrect: false }, { text: "A list", isCorrect: true }, { text: "A single integer", isCorrect: false }] },
      { text: "A client's team manually re-types GPS coordinates between devices and mistakes have crept in. How could a Python script help, based on this stage?", type: "short_answer", explanation: "A validation function/loop can automatically check every coordinate against expected ranges, catching errors instantly and consistently instead of relying on error-prone manual checking.", answers: [] },
      { text: "What does `system_address=\"udp://:14540\"` typically point to in a MAVSDK example?", type: "multiple_choice", explanation: null, answers: [{ text: "A PX4 SITL simulator running on the same computer", isCorrect: true }, { text: "A satellite in orbit", isCorrect: false }, { text: "A QGIS server", isCorrect: false }] },
    ],
  },
  {
    title: "Mission-Planning Assessment",
    weekNumber: 11,
    description: "Covers Weeks 10-11: client requirements, mission design (altitude/overlap/geofence), simulation, safety, risk, and Nigeria's UAV regulation.",
    questions: [
      { text: "What is an Area of Interest (AOI)?", type: "multiple_choice", explanation: null, answers: [{ text: "The specific geographic boundary a job needs to cover", isCorrect: true }, { text: "The client's budget", isCorrect: false }, { text: "The UAV's flight controller", isCorrect: false }] },
      { text: "\"We need a drone\" is usually a complete and sufficient starting point for designing a mission plan.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "In the consulting framework, which step comes immediately before \"UAV selection\"?", type: "multiple_choice", explanation: null, answers: [{ text: "Client report", isCorrect: false }, { text: "Sensor requirement", isCorrect: true }, { text: "Data processing", isCorrect: false }] },
      { text: "What does higher survey altitude generally mean for image resolution (GSD)?", type: "multiple_choice", explanation: null, answers: [{ text: "Finer detail, smaller GSD", isCorrect: false }, { text: "Coarser detail, larger GSD", isCorrect: true }, { text: "No effect", isCorrect: false }] },
      { text: "Why do mapping missions destined for photogrammetry need heavy overlap between photos?", type: "short_answer", explanation: "Photogrammetry software matches shared features across overlapping photos to reconstruct 3D geometry; too little overlap leaves not enough shared detail.", answers: [] },
      { text: "A geofence can act as a safety backstop even if a mission plan itself contains a mistake.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Which MAVSDK plugin is used to upload and run a full multi-waypoint mission?", type: "multiple_choice", explanation: null, answers: [{ text: "action", isCorrect: false }, { text: "telemetry", isCorrect: false }, { text: "mission", isCorrect: true }] },
      { text: "Running only a single takeoff test in simulation is just as effective as running a full mission plan start to finish.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Which authority regulates UAV operations in Nigeria?", type: "multiple_choice", explanation: null, answers: [{ text: "FAA", isCorrect: false }, { text: "CAA", isCorrect: false }, { text: "NCAA", isCorrect: true }] },
      { text: "A UAV rule that applies in the UK automatically applies the same way in Nigeria and the US.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Why does this course avoid stating exact current Nigerian UAV registration fees or thresholds?", type: "short_answer", explanation: "Because these are updated periodically by the NCAA, and a course cannot guarantee it reflects the latest changes -- always check current official regulations directly.", answers: [] },
      { text: "List two real-world checks that must happen before flying a mission for real, even if it simulated perfectly.", type: "short_answer", explanation: "Any two of: current weather, temporary local airspace restrictions, operator permits/registration, real on-site privacy and safety considerations.", answers: [] },
      { text: "What is a risk assessment, in the context of a UAV mission?", type: "multiple_choice", explanation: null, answers: [{ text: "Systematically identifying what could go wrong and how to prevent/respond to it", isCorrect: true }, { text: "A type of geofence", isCorrect: false }, { text: "A GPS accuracy setting", isCorrect: false }] },
      { text: "What does \"privacy-by-design\" mean for a UAV mission?", type: "multiple_choice", explanation: null, answers: [{ text: "Planning the mission from the start to minimise unnecessary capture of identifiable people or private spaces", isCorrect: true }, { text: "Encrypting all telemetry data", isCorrect: false }, { text: "Flying only at night", isCorrect: false }] },
      { text: "A client needs to spot 5 cm cracks on a rooftop. Should altitude be higher or lower than a general boundary-mapping mission, and why?", type: "short_answer", explanation: "Lower -- finding small cracks requires fine detail (small GSD), which needs a lower survey altitude.", answers: [] },
    ],
  },
  {
    title: "GIS Assessment",
    weekNumber: 13,
    description: "Covers Weeks 12-13: GIS foundations, QGIS, coordinate reference systems, photogrammetry, orthomosaics, DEMs, and UAV sensors.",
    questions: [
      { text: "Which geometry type would best represent a farm's boundary?", type: "multiple_choice", explanation: null, answers: [{ text: "Point", isCorrect: false }, { text: "Line", isCorrect: false }, { text: "Polygon", isCorrect: true }] },
      { text: "A real GIS map is typically built from a single layer containing every kind of feature mixed together.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Which is an example of raster data?", type: "multiple_choice", explanation: null, answers: [{ text: "A satellite image / elevation grid", isCorrect: true }, { text: "A farm boundary polygon", isCorrect: false }, { text: "A survey marker point", isCorrect: false }] },
      { text: "In QGIS, when loading a CSV with lat/lon columns, which column should be the X field?", type: "multiple_choice", explanation: null, answers: [{ text: "Latitude", isCorrect: false }, { text: "Longitude", isCorrect: true }, { text: "Altitude", isCorrect: false }] },
      { text: "EPSG:4326 always refers to the same coordinate reference system (WGS84), regardless of software or country.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Why is calculating area directly from raw WGS84 (degree-based) coordinates not accurate for real ground measurements?", type: "short_answer", explanation: "Degrees don't correspond to a constant real-world distance everywhere on Earth's curved surface -- a proper ellipsoidal area calculation is needed.", answers: [] },
      { text: "What does an orthomosaic correct for, that a single raw aerial photo does not?", type: "multiple_choice", explanation: null, answers: [{ text: "Battery drain", isCorrect: false }, { text: "Camera angle distortion and inconsistent scale", isCorrect: true }, { text: "GPS satellite count", isCorrect: false }] },
      { text: "A DSM and a DTM always represent exactly the same elevation values.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Which output represents bare-ground elevation with buildings/vegetation filtered out?", type: "multiple_choice", explanation: null, answers: [{ text: "DSM", isCorrect: false }, { text: "DTM", isCorrect: true }, { text: "Orthomosaic", isCorrect: false }] },
      { text: "Why does photogrammetry require heavy photo overlap to work correctly?", type: "short_answer", explanation: "It reconstructs 3D geometry by matching shared features across multiple overlapping photos; insufficient overlap leaves not enough shared detail.", answers: [] },
      { text: "Which sensor can see through small gaps in tree canopy to capture accurate ground elevation?", type: "multiple_choice", explanation: null, answers: [{ text: "RGB", isCorrect: false }, { text: "Thermal", isCorrect: false }, { text: "LiDAR", isCorrect: true }] },
      { text: "A standard RGB camera can directly reveal plant-health differences the same way a multispectral sensor can.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "What does NDVI highlight?", type: "multiple_choice", explanation: null, answers: [{ text: "Plant/vegetation health, using near-infrared reflectance", isCorrect: true }, { text: "Ground temperature only", isCorrect: false }, { text: "GPS accuracy", isCorrect: false }] },
      { text: "Why is thermal imaging useful for electrical infrastructure inspection?", type: "short_answer", explanation: "Overheating components emit detectable heat before visibly failing, which thermal imaging reveals but a normal camera cannot.", answers: [] },
      { text: "How does LiDAR fundamentally differ from a camera-based sensor?", type: "multiple_choice", explanation: null, answers: [{ text: "It actively fires laser pulses and measures return time to calculate distance, rather than passively capturing reflected light", isCorrect: true }, { text: "It only works at night", isCorrect: false }, { text: "It has no practical difference from a camera", isCorrect: false }] },
    ],
  },
  {
    title: "UAV Consultancy Assessment",
    weekNumber: 14,
    description: "Covers Week 14: UAV applications across industries and the full UAV consulting framework, equipment selection, costs, and deliverables.",
    questions: [
      { text: "Which sensor is most associated with spotting crop stress before it's visible to the naked eye?", type: "multiple_choice", explanation: null, answers: [{ text: "LiDAR", isCorrect: false }, { text: "Multispectral", isCorrect: true }, { text: "Thermal", isCorrect: false }] },
      { text: "This course considers UAV weaponisation or targeting a person to be within the scope of legitimate, lawful UAV consultancy.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Why does an emergency-response mission typically prioritise speed over survey-grade precision?", type: "short_answer", explanation: "Getting a rapid overview to inform an immediate response decision matters more than fine accuracy, which takes longer to achieve.", answers: [] },
      { text: "A construction project manager wants to verify contractor progress claims objectively over several months. What mission approach fits best?", type: "multiple_choice", explanation: null, answers: [{ text: "Regular repeat surveys producing successive DSMs/orthomosaics", isCorrect: true }, { text: "A single one-off flight with no follow-up", isCorrect: false }, { text: "No UAV survey is useful here", isCorrect: false }] },
      { text: "In the consulting framework, which step comes right after \"Client requirement\"?", type: "multiple_choice", explanation: null, answers: [{ text: "Operational objective", isCorrect: true }, { text: "UAV selection", isCorrect: false }, { text: "Client report", isCorrect: false }] },
      { text: "The cheapest UAV that technically cannot meet a client's accuracy requirement is still a reasonable cost-saving choice.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Name three factors that drive a real UAV project's cost.", type: "short_answer", explanation: "Any three of: equipment, flight time, data processing, personnel, regulatory/permit costs, deliverable complexity.", answers: [] },
      { text: "A client's board of directors (non-technical) and their GIS team (technical) both need results from the same project. What should the deliverable package include?", type: "multiple_choice", explanation: null, answers: [{ text: "Both a technical GIS package and a plain-language summary report", isCorrect: true }, { text: "Only raw sensor data", isCorrect: false }, { text: "Only a verbal briefing", isCorrect: false }] },
      { text: "Why should equipment options be filtered by capability/accuracy requirements BEFORE comparing price?", type: "short_answer", explanation: "Comparing price first risks choosing a cheaper option that can't actually do the job, wasting the whole budget on a deliverable that fails the client's real requirement.", answers: [] },
      { text: "Which industry commonly uses thermal sensors to detect overheating electrical faults invisible to a normal camera?", type: "multiple_choice", explanation: null, answers: [{ text: "Infrastructure inspection", isCorrect: true }, { text: "Tourism photography", isCorrect: false }, { text: "None -- thermal has no use here", isCorrect: false }] },
      { text: "A professional UAV deliverable package should include methodology documentation.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "What is \"lawful, ethical situational awareness\" in UAV use?", type: "multiple_choice", explanation: null, answers: [{ text: "Legitimate observation, documentation, and coordinating a lawful response", isCorrect: true }, { text: "Any use of a UAV to track a specific individual covertly", isCorrect: false }, { text: "Weaponised monitoring", isCorrect: false }] },
      { text: "Which comes last in the consulting framework?", type: "multiple_choice", explanation: null, answers: [{ text: "Client report", isCorrect: true }, { text: "Mission planning", isCorrect: false }, { text: "Sensor requirement", isCorrect: false }] },
      { text: "A prospective client asks why they should hire a consultant instead of buying a drone and figuring it out themselves. What is the strongest, most defensible answer, based on this course?", type: "short_answer", explanation: "A consultant applies a structured framework (requirements, safety, regulation, accuracy, sensor/equipment matching, simulation, analysis, deliverables) that avoids costly mistakes a self-taught approach is more likely to make, especially early on.", answers: [] },
      { text: "Environmental monitoring and construction monitoring share which mission approach?", type: "multiple_choice", explanation: null, answers: [{ text: "Repeat surveys of the same area over time to detect change", isCorrect: true }, { text: "A single flight with no follow-up, ever", isCorrect: false }, { text: "They never use UAVs", isCorrect: false }] },
    ],
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    ASSESSMENTS.forEach((assessment) => {
      if (assessment.questions.length !== 15) {
        throw new Error(`Expected 15 questions for "${assessment.title}", got ${assessment.questions.length}`);
      }
    });

    const now = new Date();

    for (const assessment of ASSESSMENTS) {
      const [rows] = await queryInterface.sequelize.query(
        `SELECT m.id AS module_id
         FROM modules m
         JOIN courses c ON c.id = m.course_id
         WHERE c.slug = ? AND m.week_number = ?`,
        { replacements: [COURSE_SLUG, assessment.weekNumber] },
      );
      const row = (rows as { module_id: string }[])[0];
      if (!row) {
        throw new Error(`Could not find module for week ${assessment.weekNumber} in ${COURSE_SLUG}`);
      }

      const quizId = crypto.randomUUID();
      await queryInterface.bulkInsert("quizzes", [
        {
          id: quizId,
          module_id: row.module_id,
          title: assessment.title,
          description: assessment.description,
          due_date: null,
          time_limit_minutes: TIME_LIMIT_MINUTES,
          passing_score: PASSING_SCORE,
          question_count: QUESTION_COUNT,
          shuffle_questions: true,
          created_at: now,
          updated_at: now,
        },
      ]);

      const questionRows: Record<string, unknown>[] = [];
      const answerRows: Record<string, unknown>[] = [];
      assessment.questions.forEach((q, qIndex) => {
        const questionId = crypto.randomUUID();
        questionRows.push({
          id: questionId,
          quiz_id: quizId,
          question_text: q.text,
          question_type: q.type,
          points: 1,
          order: qIndex + 1,
          explanation: q.explanation,
          created_at: now,
        });
        q.answers.forEach((a, aIndex) => {
          answerRows.push({
            id: crypto.randomUUID(),
            question_id: questionId,
            answer_text: a.text,
            is_correct: a.isCorrect,
            order: aIndex + 1,
          });
        });
      });
      await queryInterface.bulkInsert("quiz_questions", questionRows);
      if (answerRows.length > 0) {
        await queryInterface.bulkInsert("quiz_answers", answerRows);
      }
    }
  },

  down: async (queryInterface: QueryInterface) => {
    const titles = ASSESSMENTS.map((a) => a.title);
    const [quizzes] = await queryInterface.sequelize.query(
      `SELECT q.id
       FROM quizzes q
       JOIN modules m ON m.id = q.module_id
       JOIN courses c ON c.id = m.course_id
       WHERE c.slug = ? AND q.title IN (${titles.map(() => "?").join(",")})`,
      { replacements: [COURSE_SLUG, ...titles] },
    );
    const quizIds = (quizzes as { id: string }[]).map((q) => q.id);
    if (quizIds.length === 0) return;

    const [questions] = await queryInterface.sequelize.query(
      `SELECT id FROM quiz_questions WHERE quiz_id IN (${quizIds.map(() => "?").join(",")})`,
      { replacements: quizIds },
    );
    const questionIds = (questions as { id: string }[]).map((q) => q.id);
    if (questionIds.length > 0) {
      await queryInterface.bulkDelete("quiz_answers", { question_id: questionIds });
      await queryInterface.bulkDelete("quiz_questions", { id: questionIds });
    }
    await queryInterface.bulkDelete("quizzes", { id: quizIds });
  },
};
