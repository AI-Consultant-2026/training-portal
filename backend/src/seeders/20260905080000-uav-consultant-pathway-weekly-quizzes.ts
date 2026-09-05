import crypto from "crypto";
import { QueryInterface } from "sequelize";

const COURSE_SLUG = "uav-drone-consultant-pathway";
const TIME_LIMIT_MINUTES = 20;
const PASSING_SCORE = 70;
const QUESTION_COUNT = 8;

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

interface WeeklyQuizSeed {
  title: string;
  weekNumber: number;
  description: string;
  questions: QuestionSeed[];
}

// 7 weekly quizzes, one each for weeks 1, 3, 5, 6, 8, 10, 12 -- the 7 module weeks NOT
// already covered by a milestone assessment in 20260905020000-uav-consultant-pathway-assessments.ts
// (weeks 2, 4, 7, 9, 11, 13, 14). Together the two sets cover every content week 1-14 with
// no gaps and no overlaps. Unlike the milestone assessments (which each span a range of
// weeks), each of these covers only that single week's own 2 lessons -- a narrower scope,
// so a smaller bank (11 questions) and questionCount (8) than the milestones' 15/10.
// Named "<Module Title> Quiz" specifically so they read as distinct from the milestone
// assessment names (e.g. "UAV Foundations I Quiz" vs. "Beginner Assessment").
const WEEKLY_QUIZZES: WeeklyQuizSeed[] = [
  {
    title: "UAV Foundations I Quiz",
    weekNumber: 1,
    description: "Covers Week 1: UAV/UAS/drone terminology, payload, and the four main UAV categories.",
    questions: [
      { text: "What does UAS stand for?", type: "multiple_choice", explanation: null, answers: [{ text: "Uncrewed Aircraft System", isCorrect: true }, { text: "Unified Aerial Sensor", isCorrect: false }, { text: "Universal Autopilot System", isCorrect: false }] },
      { text: "What is a UAV's payload?", type: "multiple_choice", explanation: null, answers: [{ text: "Whatever it carries to do its job, e.g. a camera or sensor", isCorrect: true }, { text: "Its battery only", isCorrect: false }, { text: "Its remote control", isCorrect: false }] },
      { text: "\"Drone\" and \"UAV\" mean exactly the same precise thing to professionals.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Which UAV category can hover perfectly still over one spot?", type: "multiple_choice", explanation: null, answers: [{ text: "Fixed-wing", isCorrect: false }, { text: "Multirotor", isCorrect: true }, { text: "Neither", isCorrect: false }] },
      { text: "Which UAV category needs forward motion to generate lift and usually can't hover?", type: "multiple_choice", explanation: null, answers: [{ text: "Multirotor", isCorrect: false }, { text: "Fixed-wing", isCorrect: true }, { text: "Single-rotor", isCorrect: false }] },
      { text: "What real-world problem does a VTOL fixed-wing UAV solve?", type: "multiple_choice", explanation: null, answers: [{ text: "Long range with no runway needed", isCorrect: true }, { text: "Cheaper batteries", isCorrect: false }, { text: "No payload required", isCorrect: false }] },
      { text: "Fixed-wing UAVs are generally more efficient than multirotors for covering very large areas.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Why does a UAV consultant usually think about payload before choosing an aircraft?", type: "short_answer", explanation: "The payload (what needs to be carried to do the job) determines the real requirement; the aircraft only matters insofar as it can carry and support that payload correctly.", answers: [] },
      { text: "Which term refers only to the flying aircraft itself, with nobody on board?", type: "multiple_choice", explanation: null, answers: [{ text: "UAV", isCorrect: true }, { text: "UAS", isCorrect: false }, { text: "GCS", isCorrect: false }] },
      { text: "Name one real job a UAV can do that would be dangerous, slow, or expensive for a person to do directly.", type: "short_answer", explanation: "Any reasonable answer: bridge/mast/tower inspection, crop monitoring, flood assessment, search and rescue, etc. -- danger, height, time, or area covered.", answers: [] },
      { text: "Single-rotor helicopter UAVs are used in some agricultural spraying applications because they can carry heavier payloads than typical multirotors.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
    ],
  },
  {
    title: "Navigation I Quiz",
    weekNumber: 3,
    description: "Covers Week 3: GPS/GNSS, trilateration, HDOP, RTK, latitude, longitude, altitude, and AGL vs. AMSL.",
    questions: [
      { text: "Which term correctly refers to ALL satellite navigation systems, not just the American one?", type: "multiple_choice", explanation: null, answers: [{ text: "GPS", isCorrect: false }, { text: "GNSS", isCorrect: true }, { text: "WGS84", isCorrect: false }] },
      { text: "What does HDOP describe?", type: "multiple_choice", explanation: null, answers: [{ text: "How good the current satellite geometry is for an accurate position fix", isCorrect: true }, { text: "The aircraft's battery health", isCorrect: false }, { text: "The camera's resolution", isCorrect: false }] },
      { text: "A lower HDOP value generally means a more accurate position fix.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "What is trilateration?", type: "multiple_choice", explanation: null, answers: [{ text: "Calculating a position using measured distances to multiple known points", isCorrect: true }, { text: "A method for compressing GPS data", isCorrect: false }, { text: "A type of coordinate reference system", isCorrect: false }] },
      { text: "What does RTK correction improve?", type: "short_answer", explanation: "GNSS accuracy, bringing it down to a few centimetres for professional survey-grade work.", answers: [] },
      { text: "Coordinates are conventionally written in which order?", type: "multiple_choice", explanation: null, answers: [{ text: "Longitude, latitude", isCorrect: false }, { text: "Latitude, longitude", isCorrect: true }, { text: "Altitude, latitude", isCorrect: false }] },
      { text: "What does AGL stand for?", type: "multiple_choice", explanation: null, answers: [{ text: "Above Ground Level", isCorrect: true }, { text: "Aircraft Guidance Line", isCorrect: false }, { text: "Average Geographic Latitude", isCorrect: false }] },
      { text: "A UAV flying at a constant 100 m AGL over hilly terrain stays the same height above the ground the entire time.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Why would a coordinate with a negative latitude be suspicious for a site in Nigeria?", type: "short_answer", explanation: "Nigeria's latitude is expected to be positive (roughly 4N-14N, north of the Equator); a negative value would place the point south of the Equator, well outside Nigeria -- likely a typo or data error.", answers: [] },
      { text: "Which coordinate reference system is the standard used by GPS and almost all UAV/navigation systems worldwide?", type: "multiple_choice", explanation: null, answers: [{ text: "WGS84", isCorrect: true }, { text: "EPSG:3857", isCorrect: false }, { text: "There is no standard", isCorrect: false }] },
      { text: "Explain, in your own words, the practical difference between AGL and AMSL altitude.", type: "short_answer", explanation: "AGL is height above the ground directly beneath the aircraft (changes with terrain); AMSL is height above a global sea-level reference (doesn't change with terrain).", answers: [] },
    ],
  },
  {
    title: "UAV Systems Quiz",
    weekNumber: 5,
    description: "Covers Week 5: flight controllers, autopilots, firmware, flight modes, telemetry, and Ground Control Stations.",
    questions: [
      { text: "Which term describes the physical circuit board, not the software running on it?", type: "multiple_choice", explanation: null, answers: [{ text: "Autopilot", isCorrect: false }, { text: "Firmware", isCorrect: false }, { text: "Flight controller", isCorrect: true }] },
      { text: "What is firmware?", type: "multiple_choice", explanation: null, answers: [{ text: "The specific version of software installed and running on the flight controller", isCorrect: true }, { text: "A type of GPS sensor", isCorrect: false }, { text: "The physical frame of the aircraft", isCorrect: false }] },
      { text: "\"Open-source\" means only the original manufacturer can read or modify the autopilot's code.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "In Stabilize flight mode, what does the pilot still control directly?", type: "multiple_choice", explanation: null, answers: [{ text: "Direction and altitude", isCorrect: true }, { text: "Nothing -- it's fully automatic", isCorrect: false }, { text: "Only the camera gimbal", isCorrect: false }] },
      { text: "What is the practical difference between Stabilize mode and Auto (Mission) mode?", type: "short_answer", explanation: "In Stabilize, the autopilot only prevents flipping/tumbling while the pilot still controls direction and altitude; in Auto mode, the autopilot flies a full pre-planned waypoint sequence with no manual input needed.", answers: [] },
      { text: "What is telemetry?", type: "multiple_choice", explanation: null, answers: [{ text: "The continuous stream of data sent from the aircraft to the ground", isCorrect: true }, { text: "The aircraft's camera feed only", isCorrect: false }, { text: "The mission-planning software itself", isCorrect: false }] },
      { text: "What does GCS stand for?", type: "multiple_choice", explanation: null, answers: [{ text: "Ground Control Station", isCorrect: true }, { text: "Global Coordinate System", isCorrect: false }, { text: "General Command Software", isCorrect: false }] },
      { text: "Telemetry, video, and control are always exactly the same single radio link, with no distinction.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Name two things a Ground Control Station typically lets an operator do.", type: "short_answer", explanation: "Any two of: view live telemetry, send commands (e.g. RTH), plan/upload a mission, review flight logs after landing.", answers: [] },
      { text: "Give one real reason a flight log might be reviewed after a mission has already finished.", type: "short_answer", explanation: "Incident investigation (working out what went wrong) or mission verification (confirming the survey covered the intended area/altitude).", answers: [] },
      { text: "Why does it matter that a UAV's firmware is kept up to date, beyond just getting new features?", type: "short_answer", explanation: "Firmware updates can include important safety and stability fixes, not just cosmetic improvements -- skipping updates risks missing a fix that directly affects flight safety.", answers: [] },
    ],
  },
  {
    title: "Communication & Software Quiz",
    weekNumber: 6,
    description: "Covers Week 6: MAVLink, and the PX4 and ArduPilot autopilot projects.",
    questions: [
      { text: "What problem does MAVLink primarily solve?", type: "multiple_choice", explanation: null, answers: [{ text: "Different systems being unable to communicate with each other", isCorrect: true }, { text: "Battery life", isCorrect: false }, { text: "Propeller design", isCorrect: false }] },
      { text: "MAVLink is a private protocol owned by a single UAV manufacturer.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Which organisation maintains both MAVLink and PX4?", type: "multiple_choice", explanation: null, answers: [{ text: "Dronecode Foundation", isCorrect: true }, { text: "NASA", isCorrect: false }, { text: "QGIS", isCorrect: false }] },
      { text: "What does a MAVLink HEARTBEAT message do, and why might it be sent repeatedly rather than once?", type: "short_answer", explanation: "It confirms a component is alive and working; sending it repeatedly means an absent next HEARTBEAT is itself a useful signal that something has gone wrong.", answers: [] },
      { text: "Which MAVLink message carries the aircraft's current latitude, longitude, and altitude?", type: "multiple_choice", explanation: null, answers: [{ text: "GLOBAL_POSITION_INT", isCorrect: true }, { text: "BATTERY_STATUS", isCorrect: false }, { text: "MISSION_ITEM", isCorrect: false }] },
      { text: "Where was PX4 originally developed?", type: "multiple_choice", explanation: null, answers: [{ text: "ETH Zurich", isCorrect: true }, { text: "NASA Ames", isCorrect: false }, { text: "MIT", isCorrect: false }] },
      { text: "ArduPilot only supports multirotor and fixed-wing aircraft, nothing else.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Name two factors a consultant would weigh when recommending PX4 versus ArduPilot for a specific client.", type: "short_answer", explanation: "Any two of: which autopilot the client's aircraft manufacturer ships with, which one the client's pilots/technicians are already trained on, the specific vehicle type involved, the supporting ecosystem/community expertise already available.", answers: [] },
      { text: "What does it mean that PX4 and ArduPilot are both \"open-source\"?", type: "multiple_choice", explanation: null, answers: [{ text: "Their source code is public and openly reviewed/improved by a broad community", isCorrect: true }, { text: "They are free to buy but the code is secret", isCorrect: false }, { text: "Only Dronecode Foundation employees can use them", isCorrect: false }] },
      { text: "Explain briefly how MAVLink's openness reduces a client's risk of \"vendor lock-in.\"", type: "short_answer", explanation: "Because MAVLink is open and widely adopted, ground stations and autopilots from different manufacturers can interoperate, so a client isn't stuck with one company's whole ecosystem forever.", answers: [] },
      { text: "Which vehicle types, beyond aircraft, does ArduPilot notably support?", type: "multiple_choice", explanation: null, answers: [{ text: "Ground rovers, boats, and submarines", isCorrect: true }, { text: "Only multirotors", isCorrect: false }, { text: "None -- ArduPilot only supports aircraft", isCorrect: false }] },
    ],
  },
  {
    title: "Programming I Quiz",
    weekNumber: 8,
    description: "Covers Week 8: Python foundations (variables, lists, dictionaries, functions) and coordinates/CSV files in Python.",
    questions: [
      { text: "Which Python structure would you use to group a latitude, longitude, and altitude that all belong to ONE waypoint?", type: "multiple_choice", explanation: null, answers: [{ text: "A list", isCorrect: false }, { text: "A dictionary", isCorrect: true }, { text: "A function", isCorrect: false }] },
      { text: "A function must be written fresh every time you need to use it, and can't be reused.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "What does a `for` loop let you do?", type: "multiple_choice", explanation: null, answers: [{ text: "Store one single value", isCorrect: false }, { text: "Repeat a block of code once per item in a list", isCorrect: true }, { text: "Open a file", isCorrect: false }] },
      { text: "The Haversine formula is more accurate than a simple degrees-to-metres rule of thumb, especially over longer distances.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Why is CSV a useful format for sharing UAV mission or survey data between different software tools?", type: "short_answer", explanation: "It's a simple, universal plain-text format that virtually every data and mapping tool (spreadsheets, Python, QGIS, GCS software) can read and write.", answers: [] },
      { text: "Why might a UAV professional prefer writing a Python function to validate 500 coordinates, rather than checking each one by hand?", type: "short_answer", explanation: "A function runs the same check correctly and instantly on every coordinate, with no risk of the human error or fatigue that comes from manually checking hundreds of values.", answers: [] },
      { text: "Which Python data type would best store an ordered sequence of ten altitude values for one mission?", type: "multiple_choice", explanation: null, answers: [{ text: "A dictionary", isCorrect: false }, { text: "A list", isCorrect: true }, { text: "A single integer", isCorrect: false }] },
      { text: "What is a \"parameter\" in the context of a Python function?", type: "multiple_choice", explanation: null, answers: [{ text: "An input value the function accepts", isCorrect: true }, { text: "The function's name", isCorrect: false }, { text: "A type of loop", isCorrect: false }] },
      { text: "In the lesson's `is_valid_nigeria_coordinate` function, why does it return `lat_ok and lon_ok` rather than just `lat_ok`?", type: "short_answer", explanation: "A coordinate is only genuinely valid if BOTH latitude and longitude fall within range -- a coordinate could have a fine latitude but a wildly wrong longitude and still be a bad coordinate overall.", answers: [] },
      { text: "What does the Haversine formula calculate?", type: "multiple_choice", explanation: null, answers: [{ text: "The true straight-line distance between two coordinates, accounting for Earth's curvature", isCorrect: true }, { text: "A drone's remaining battery life", isCorrect: false }, { text: "The exact area of a polygon", isCorrect: false }] },
      { text: "Which Python module/library is used to read and write CSV files, as covered in this week's lesson?", type: "multiple_choice", explanation: null, answers: [{ text: "csv", isCorrect: true }, { text: "math", isCorrect: false }, { text: "mavsdk", isCorrect: false }] },
    ],
  },
  {
    title: "Mission Planning Quiz",
    weekNumber: 10,
    description: "Covers Week 10: turning a client requirement into a mission plan, and altitude, overlap, and geofence design.",
    questions: [
      { text: "What is an Area of Interest (AOI)?", type: "multiple_choice", explanation: null, answers: [{ text: "The specific geographic boundary a job needs to cover", isCorrect: true }, { text: "The client's budget", isCorrect: false }, { text: "The UAV's flight controller", isCorrect: false }] },
      { text: "\"We need a drone\" is usually a complete and sufficient starting point for designing a mission plan.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Why does an unclear AOI commonly cause disputes on real UAV projects?", type: "short_answer", explanation: "Without a precise, agreed boundary, there's no shared understanding of what \"covered\" means, risking either wasted extra flying or an incomplete survey.", answers: [] },
      { text: "In the consulting framework, which step comes right after \"Client requirement\"?", type: "multiple_choice", explanation: null, answers: [{ text: "Operational objective", isCorrect: true }, { text: "UAV selection", isCorrect: false }, { text: "Client report", isCorrect: false }] },
      { text: "What does higher survey altitude generally mean for image resolution (GSD)?", type: "multiple_choice", explanation: null, answers: [{ text: "Finer detail, smaller GSD", isCorrect: false }, { text: "Coarser detail, larger GSD", isCorrect: true }, { text: "No effect on GSD", isCorrect: false }] },
      { text: "Why do mapping missions destined for photogrammetry need heavy overlap between photos?", type: "short_answer", explanation: "Photogrammetry software matches shared features across overlapping photos to reconstruct 3D geometry; too little overlap leaves not enough shared detail.", answers: [] },
      { text: "A geofence can act as a safety backstop even if a mission plan itself contains a mistake.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "What is a \"lawnmower pattern\" in mission planning?", type: "multiple_choice", explanation: null, answers: [{ text: "A systematic back-and-forth parallel-line survey flight path", isCorrect: true }, { text: "A random flight path", isCorrect: false }, { text: "A single circular orbit around one point", isCorrect: false }] },
      { text: "A client needs to spot 5 cm cracks on a rooftop. Should survey altitude be higher or lower than a general boundary-mapping mission, and why?", type: "short_answer", explanation: "Lower -- finding small cracks requires fine detail (small GSD), which needs a lower survey altitude.", answers: [] },
      { text: "Which of these is a genuine reason to reject the \"best\" (most advanced) UAV on the market for a job?", type: "multiple_choice", explanation: null, answers: [{ text: "It may have far more range/speed/payload than the job actually needs, at unnecessary cost", isCorrect: true }, { text: "The best aircraft is always the wrong technical choice", isCorrect: false }, { text: "Advanced aircraft can't run any autopilot software", isCorrect: false }] },
      { text: "Give an example of a client's \"want\" versus their real underlying requirement, based on this week's framing.", type: "short_answer", explanation: "Any reasonable answer showing the distinction, e.g. \"we want a drone\" (a want/guessed solution) versus the client's actual need being answered by a specific operational objective established through questioning.", answers: [] },
    ],
  },
  {
    title: "GIS Foundations Quiz",
    weekNumber: 12,
    description: "Covers Week 12: points, lines, polygons, layers, vector vs. raster, and hands-on QGIS with CRS and Areas of Interest.",
    questions: [
      { text: "Which geometry type would best represent a farm's boundary?", type: "multiple_choice", explanation: null, answers: [{ text: "Point", isCorrect: false }, { text: "Line", isCorrect: false }, { text: "Polygon", isCorrect: true }] },
      { text: "A real GIS map is typically built from a single layer containing every kind of feature mixed together.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Explain the difference between vector and raster data, with one example of each.", type: "short_answer", explanation: "Vector data is precise coordinate-based geometry (points/lines/polygons) for discrete features, e.g. a farm boundary; raster data is a grid of pixels holding continuous values, e.g. a satellite image or elevation data.", answers: [] },
      { text: "What does QGIS let you do with vector and raster layers?", type: "multiple_choice", explanation: null, answers: [{ text: "View, create, edit, and analyse them", isCorrect: true }, { text: "Only view them, with no editing", isCorrect: false }, { text: "Only convert them to PDF", isCorrect: false }] },
      { text: "In QGIS, when loading a CSV with lat/lon columns, which column should be set as the X field?", type: "multiple_choice", explanation: null, answers: [{ text: "Latitude", isCorrect: false }, { text: "Longitude", isCorrect: true }, { text: "Altitude", isCorrect: false }] },
      { text: "EPSG:4326 always refers to the same coordinate reference system (WGS84), regardless of software or country.", type: "true_false", explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Why is calculating area directly from raw WGS84 (degree-based) coordinates not accurate for real ground measurements?", type: "short_answer", explanation: "WGS84 coordinates are in degrees, not metres, and degrees don't correspond to a constant real-world distance everywhere on Earth's curved surface -- a proper ellipsoidal area calculation is needed.", answers: [] },
      { text: "What is a \"layer\" in GIS?", type: "multiple_choice", explanation: null, answers: [{ text: "A set of related features grouped together and shown/hidden independently", isCorrect: true }, { text: "A single pixel in a raster image", isCorrect: false }, { text: "A type of coordinate reference system", isCorrect: false }] },
      { text: "Why would a UAV consultant import a Python-generated waypoint CSV into QGIS rather than just reading the raw numbers in a spreadsheet?", type: "short_answer", explanation: "QGIS can plot the coordinates visually on an actual interactive map, letting the consultant see flight path/coverage at a glance and compare it against the intended AOI, far easier than scanning rows of numbers.", answers: [] },
      { text: "What is an EPSG code?", type: "multiple_choice", explanation: null, answers: [{ text: "A standard reference number identifying a specific coordinate reference system", isCorrect: true }, { text: "A type of drone sensor", isCorrect: false }, { text: "A GPS satellite identifier", isCorrect: false }] },
      { text: "What is QGIS's Field Calculator used for in this week's practical activity?", type: "short_answer", explanation: "Calculating a polygon's real, accurate (ellipsoidal) area in hectares or square metres, rather than relying on the raw degree-based coordinates.", answers: [] },
    ],
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    WEEKLY_QUIZZES.forEach((quiz) => {
      if (quiz.questions.length !== 11) {
        throw new Error(`Expected 11 questions for "${quiz.title}", got ${quiz.questions.length}`);
      }
    });

    const now = new Date();

    for (const quiz of WEEKLY_QUIZZES) {
      const [rows] = await queryInterface.sequelize.query(
        `SELECT m.id AS module_id
         FROM modules m
         JOIN courses c ON c.id = m.course_id
         WHERE c.slug = ? AND m.week_number = ?`,
        { replacements: [COURSE_SLUG, quiz.weekNumber] },
      );
      const row = (rows as { module_id: string }[])[0];
      if (!row) {
        throw new Error(`Could not find module for week ${quiz.weekNumber} in ${COURSE_SLUG}`);
      }

      const quizId = crypto.randomUUID();
      await queryInterface.bulkInsert("quizzes", [
        {
          id: quizId,
          module_id: row.module_id,
          title: quiz.title,
          description: quiz.description,
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
      quiz.questions.forEach((q, qIndex) => {
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
    const titles = WEEKLY_QUIZZES.map((q) => q.title);
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
