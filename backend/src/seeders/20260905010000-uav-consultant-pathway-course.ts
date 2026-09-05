import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { INSTRUCTOR_ID } from "../utils/seedIds";
import { WEEKS } from "./data/curriculumUav";

const SLUG = "uav-drone-consultant-pathway";

// New course, added in one consolidated seeder (matches the HSE Fundamentals pattern in
// 20260819230000-hse-fundamentals-course.ts) rather than the older split-seeder style
// used for the original 5 courses.
//
// This course is admin-only: metadata.adminOnly = true below is the line that makes it
// invisible to everyone except an admin, everywhere -- the catalog, direct course/slug
// access, module list, lesson list, lesson content, and the capstone endpoint. See
// courseService.assertCourseAccessible (backend/src/services/course.service.ts), wired
// into every one of those read paths, and covered by the admin-only integration tests
// added alongside it.
//
// Every week's quizQuestions is intentionally an empty array: this course uses the
// per-lesson "Knowledge Check" section (inside each lesson's own markdown content,
// self-graded with an answer key) for weekly self-testing instead of a 20-question bank
// every week, and a separate seeder (20260905020000-uav-consultant-pathway-assessments)
// creates 7 real graded milestone quizzes via the quizzes/quiz_questions tables.
const COURSE_DESCRIPTION =
  "## Course Overview\n\nThis is not a course about flying a drone for fun. It's a structured, professional pathway that takes a genuinely beginner learner -- no aviation, programming, engineering, or geography background assumed -- from \"what is a drone?\" all the way to thinking like a real UAV consultant: someone who can advise an organisation on UAV technology, select the right equipment, plan a safe mission, work with coordinates and GIS, analyse UAV data, and manage a UAV project end to end.\n\nEvery lesson follows the same shape: a plain-language explanation first, then the correct professional terminology, real-world examples from actual UAV professionals, a hands-on practical activity, a short vocabulary list, a five-question knowledge check with an answer key, a mini project, and a \"consultant challenge\" scenario that forces client-requirements thinking, not just technical thinking.\n\n## Who This Course Is For\n\nA highly capable beginner, starting genuinely from zero, who is comfortable with plain-language explanations building up to real technical vocabulary and real, working Python code by Week 8. No prior aviation, coding, engineering, or GIS knowledge is assumed at the start -- each of those is introduced from first principles and built up gradually and deliberately, week by week.\n\n## What the Learner Will Be Able to Do\n\nBy the end of this course, the learner will be able to: explain the complete UAV ecosystem and the vocabulary professionals actually use; work confidently with GPS coordinates, waypoints, bearings, and distance; explain how flight controllers, autopilots, telemetry, and MAVLink fit together; write real Python code that validates coordinates, calculates distances, and talks to a simulated aircraft via MAVSDK; design, simulate, and safety-check a complete UAV mission plan; use QGIS to build real maps and calculate real areas; explain photogrammetry, orthomosaics, digital elevation models, and the four major UAV sensor types (RGB, thermal, multispectral, LiDAR); match a real industry problem (agriculture, mapping, construction, inspection, environmental monitoring, emergency response, lawful situational awareness) to the right UAV approach; and run a complete UAV consulting engagement, from a client's first vague request through to a professional deliverable and report.\n\n## Required Equipment and Software\n\n**No real drone is required for this course.** This is a deliberately simulation-first pathway: every practical activity uses free tools --  a spreadsheet, a plain-text or code editor, a free Python environment (a browser-based one like replit.com works fine), free QGIS (qgis.org), and free flight simulation (PX4/ArduPilot SITL, introduced in Week 7). A real drone is never needed to complete any lesson, project, or the final capstone -- and Week 7 and Week 11 are explicit that simulation success is never, by itself, proof that a real flight is safe or legal.\n\n## Complete Course Roadmap\n\n- **Week 1-2 -- UAV Foundations:** drone vs. UAV vs. UAS, aircraft types, components, flight principles, sensors\n- **Week 3-4 -- Navigation:** GPS/GNSS, latitude/longitude/altitude, coordinate systems, waypoints, bearings, distance\n- **Week 5-6 -- UAV Systems & Software:** flight controllers, autopilots, firmware, telemetry, GCS, MAVLink, PX4, ArduPilot\n- **Week 7 -- Ground Control & Simulation:** QGroundControl, Mission Planner, SITL\n- **Week 8-9 -- Programming:** Python foundations, coordinates/CSV, MAVSDK, telemetry logging\n- **Week 10-11 -- Mission Planning:** client requirements, AOI, waypoints, altitude, overlap, geofencing, simulation, safety, and Nigerian UAV regulation\n- **Week 12-13 -- GIS & Mapping:** points/lines/polygons/layers, QGIS, CRS, photogrammetry, orthomosaics, DEMs, UAV sensors\n- **Week 14 -- Applications & Consultancy:** agriculture, mapping, construction, inspection, environmental monitoring, emergency response, lawful situational awareness, and the full UAV consulting framework\n- **Week 15 -- Course Resources:** the complete video library, official documentation, and skills matrix\n- **Final Capstone Project:** The UAV Consultant Challenge -- a complete, realistic client engagement from first requirement to final report";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    WEEKS.forEach((week) => {
      if (week.quizQuestions.length !== 0) {
        throw new Error(
          `Week ${week.weekNumber} quizQuestions should be empty for this course -- weekly self-testing lives in each lesson's own Knowledge Check section, and milestone quizzes are seeded separately.`,
        );
      }
    });

    const now = new Date();

    const courseId = crypto.randomUUID();
    await queryInterface.bulkInsert("courses", [
      {
        id: courseId,
        title: "UAV & Drone Consultant Pathway",
        slug: SLUG,
        description: COURSE_DESCRIPTION,
        instructor_id: INSTRUCTOR_ID,
        duration_weeks: 15,
        level: "beginner",
        status: "published",
        metadata: JSON.stringify({ adminOnly: true }),
        created_at: now,
        updated_at: now,
      },
    ]);

    const moduleRows: Record<string, unknown>[] = [];
    const moduleIdByWeek = new Map<number, string>();
    WEEKS.forEach((week) => {
      const moduleId = crypto.randomUUID();
      moduleIdByWeek.set(week.weekNumber, moduleId);
      moduleRows.push({
        id: moduleId,
        course_id: courseId,
        title: week.moduleTitle,
        description: week.moduleDescription,
        week_number: week.weekNumber,
        order: week.weekNumber,
        status: "published",
        created_at: now,
      });
    });
    await queryInterface.bulkInsert("modules", moduleRows);

    const lessonRows: Record<string, unknown>[] = [];
    WEEKS.forEach((week) => {
      const moduleId = moduleIdByWeek.get(week.weekNumber);
      week.lessons.forEach((lesson) => {
        lessonRows.push({
          id: crypto.randomUUID(),
          module_id: moduleId,
          title: lesson.title,
          content: lesson.content,
          video_url: null,
          resources: JSON.stringify({}),
          images: JSON.stringify(lesson.images ?? []),
          order: lesson.order,
          duration_minutes: lesson.durationMinutes,
          created_at: now,
        });
      });
    });
    await queryInterface.bulkInsert("lessons", lessonRows);

    const assignmentRows: Record<string, unknown>[] = [];
    WEEKS.forEach((week) => {
      const moduleId = moduleIdByWeek.get(week.weekNumber);
      const dueDate = new Date(now.getTime() + (week.weekNumber + 1) * 7 * 24 * 60 * 60 * 1000);

      assignmentRows.push({
        id: crypto.randomUUID(),
        module_id: moduleId,
        title: week.assignmentTitle,
        description: week.assignmentDescription,
        due_date: dueDate,
        file_required: week.fileRequired,
        grading_rubric: null,
        points_total: 100,
        created_at: now,
        updated_at: now,
      });
    });
    await queryInterface.bulkInsert("assignments", assignmentRows);

    await queryInterface.bulkInsert("capstones", [
      {
        id: crypto.randomUUID(),
        course_id: courseId,
        title: "The UAV Consultant Challenge -- Final Capstone",
        description:
          "A fictional organisation -- choose one: a large commercial farm, a mid-size property developer, or a regional infrastructure operator -- wants to use UAVs to survey a large property and monitor its infrastructure. Act as their UAV consultant, end to end.\n\nYour capstone submission must, in order:\n\n1. **Understand the client's requirements.** Write a short client brief: who they are, what problem they're trying to solve, and what decision your work needs to support.\n2. **Define the Area of Interest.** Describe the AOI in words and give it an approximate size in hectares.\n3. **Work with coordinates.** Produce a table of at least 10 real-format coordinates (invented, but valid for your chosen country's expected latitude/longitude range) describing the AOI boundary and at least 3 points of specific interest (e.g. a structure to inspect) within it.\n4. **Create a GIS map.** Using QGIS, load your coordinates, draw the AOI as a polygon, and calculate its area using the ellipsoidal `area()` function (Week 12).\n5. **Select an appropriate UAV category.** Multirotor, fixed-wing, VTOL, or single-rotor -- with a clear reason tied to your AOI's size and shape (Week 1).\n6. **Select an appropriate sensor.** RGB, thermal, multispectral, or LiDAR (or a combination) -- with a clear reason tied to the client's actual requirement (Week 13).\n7. **Design a mission.** A lawnmower-pattern flight plan with a justified altitude and overlap percentages (Week 10).\n8. **Create waypoints.** A full waypoint table (lat/lon/alt/action) implementing your mission design (Week 4, 10).\n9. **Apply validation checks.** Show your coordinate-range validation logic (Python, from Week 8) applied to your own waypoint table, with the result.\n10. **Create a geofence.** Define a geofence boundary that safely contains your planned flight path (Week 10).\n11. **Simulate the mission.** Describe, step by step, how you would upload and run this mission in SITL via MAVSDK, and what you would monitor while it runs (Week 7, 9, 11).\n12. **Monitor telemetry.** Describe what telemetry data you would log throughout the mission and why each field matters for this specific job (Week 5, 9).\n13. **Process fictional UAV data.** Describe the photogrammetry workflow you'd apply to the captured photos, and which output(s) -- orthomosaic, DSM, DTM -- your client's requirement actually needs (Week 13).\n14. **Produce a map.** A final QGIS map layout showing your AOI, waypoints, and (described, since no real imagery exists) your intended orthomosaic output.\n15. **Produce a simple client report.** A one-to-two page, plain-language summary a non-technical client stakeholder could actually read and understand, explaining what was done and what it means for them.\n16. **Explain your reasoning.** A final section explicitly justifying why your chosen equipment and mission design are appropriate for this specific client -- not just correct in general, but right for THIS job, THIS budget, and THIS accuracy requirement.\n\nThis capstone deliberately mirrors the full consulting framework from Week 14 (Client requirement → ... → Client report). Treat it as one connected client engagement, not sixteen separate disconnected exercises -- your equipment and sensor choices in steps 5-6 should be directly justified by the requirement you established in step 1, and your final report in step 15 should genuinely reflect what steps 2-14 actually found.",
        due_date: new Date(now.getTime() + 16 * 7 * 24 * 60 * 60 * 1000),
        file_required: true,
        grading_rubric: null,
        points_total: 100,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    const [courses] = await queryInterface.sequelize.query(`SELECT id FROM courses WHERE slug = ?`, {
      replacements: [SLUG],
    });
    const courseIds = (courses as { id: string }[]).map((c) => c.id);
    if (courseIds.length === 0) return;

    await queryInterface.bulkDelete("capstones", { course_id: courseIds });

    const [modules] = await queryInterface.sequelize.query(
      `SELECT id FROM modules WHERE course_id IN (${courseIds.map(() => "?").join(",")})`,
      { replacements: courseIds },
    );
    const moduleIds = (modules as { id: string }[]).map((m) => m.id);

    if (moduleIds.length > 0) {
      await queryInterface.bulkDelete("assignments", { module_id: moduleIds });
      await queryInterface.bulkDelete("lessons", { module_id: moduleIds });
    }

    await queryInterface.bulkDelete("modules", { course_id: courseIds });
    await queryInterface.bulkDelete("courses", { id: courseIds });
  },
};
