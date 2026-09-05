import { QueryInterface } from "sequelize";

interface LessonVideoSeed {
  weekNumber: number;
  lessonTitle: string;
  videoUrl: string;
}

const COURSE_SLUG = "uav-drone-consultant-pathway";

// Third pass of video research for this course, at the user's explicit request to drop
// the <=5 minute duration cap used in the first two passes entirely. Same verification
// technique as before (YouTube oEmbed existence check + a direct lengthSeconds check,
// this time only to confirm the video actually exists and get its real runtime for the
// citation -- not to reject anything for being long), official/reputable sources only,
// no padding with an irrelevant match just to fill a slot. A long official PX4/ArduPilot/
// DroneDeploy/Esri tutorial or a full Corey Schafer lesson is preferred here over a padded
// short one, when it's the clearer match for the lesson's actual topic.
//
// This pass covers 17 of the 20 lessons that had no video after the first two passes.
// 3 lessons still have no verified match despite real, repeated search effort across all
// three passes: Week 2 "How Drones Fly: Flight Principles and Onboard Sensors", Week 4
// "Headings, Distance, and Bearings", and Week 5 "Telemetry and Ground Control Stations".
// That's an accepted, honestly-noted outcome, not a gap papered over with a weak match.
const CONTENT: LessonVideoSeed[] = [
  {
    weekNumber: 2,
    lessonTitle: "Drone Components: How a Drone Is Actually Built",
    videoUrl: "https://www.youtube.com/watch?v=mNsxkGMAofc",
  },
  {
    weekNumber: 4,
    lessonTitle: "Coordinate Systems and Waypoints",
    videoUrl: "https://www.youtube.com/watch?v=zBmC0EeP54Q",
  },
  {
    weekNumber: 5,
    lessonTitle: "Flight Controllers, Autopilots, and Firmware",
    videoUrl: "https://www.youtube.com/watch?v=i-JPp7rihX8",
  },
  {
    weekNumber: 6,
    lessonTitle: "MAVLink: The Language Drones Speak",
    videoUrl: "https://www.youtube.com/watch?v=iZ-usX1VXRI",
  },
  {
    weekNumber: 6,
    lessonTitle: "Meet PX4 and ArduPilot",
    videoUrl: "https://www.youtube.com/watch?v=HaMTcihi5eQ",
  },
  {
    weekNumber: 7,
    lessonTitle: "QGroundControl and Mission Planner",
    videoUrl: "https://www.youtube.com/watch?v=0d23O_RUOmI",
  },
  {
    weekNumber: 7,
    lessonTitle: "Simulation and SITL: Flying Without a Real Drone",
    videoUrl: "https://www.youtube.com/watch?v=j4EZoyoVZD8",
  },
  {
    weekNumber: 8,
    lessonTitle: "Python Foundations for UAV Work",
    videoUrl: "https://www.youtube.com/watch?v=W8KRzm-HUcc",
  },
  {
    weekNumber: 8,
    lessonTitle: "Coordinates, GPS Data, and Files in Python",
    videoUrl: "https://www.youtube.com/watch?v=q5uM4VKywbA",
  },
  {
    weekNumber: 9,
    lessonTitle: "MAVSDK: Talking to a Simulated Drone with Python",
    videoUrl: "https://www.youtube.com/watch?v=m6glbv7daj0",
  },
  {
    weekNumber: 9,
    lessonTitle: "Reading and Logging Telemetry with Python",
    videoUrl: "https://www.youtube.com/watch?v=SM0WtREzqqE",
  },
  {
    weekNumber: 10,
    lessonTitle: "From Client Need to Mission Plan",
    videoUrl: "https://www.youtube.com/watch?v=m4xJWHg8viA",
  },
  {
    weekNumber: 11,
    lessonTitle: "Simulating and Monitoring a Full Mission",
    videoUrl: "https://www.youtube.com/watch?v=sRQQimoGxu8",
  },
  {
    weekNumber: 11,
    lessonTitle: "Flight Safety, Risk, and Responsible UAV Use",
    videoUrl: "https://www.youtube.com/watch?v=b72xxezBma4",
  },
  {
    weekNumber: 12,
    lessonTitle: "QGIS, Coordinate Reference Systems, and Areas of Interest",
    videoUrl: "https://www.youtube.com/watch?v=Xgi-UdyDi1k",
  },
  {
    weekNumber: 14,
    lessonTitle:
      "Thinking Like a UAV Consultant: The Consulting Framework, Equipment Selection, Costs, and Deliverables",
    videoUrl: "https://www.youtube.com/watch?v=cfcAGZq1vuQ",
  },
  {
    weekNumber: 15,
    lessonTitle: "Your UAV Consultant Toolkit",
    videoUrl: "https://www.youtube.com/watch?v=1G0RU7zhmaE",
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    for (const item of CONTENT) {
      const [rows] = await queryInterface.sequelize.query(
        `SELECT l.id AS lesson_id
         FROM lessons l
         JOIN modules m ON m.id = l.module_id
         JOIN courses c ON c.id = m.course_id
         WHERE c.slug = ? AND m.week_number = ? AND l.title = ?`,
        { replacements: [COURSE_SLUG, item.weekNumber, item.lessonTitle] },
      );
      const row = (rows as { lesson_id: string }[])[0];
      if (!row) {
        throw new Error(`Could not find lesson "${item.lessonTitle}" (week ${item.weekNumber}) for ${COURSE_SLUG}`);
      }

      await queryInterface.sequelize.query(`UPDATE lessons SET video_url = ? WHERE id = ?`, {
        replacements: [item.videoUrl, row.lesson_id],
      });
    }
  },

  down: async (queryInterface: QueryInterface) => {
    for (const item of CONTENT) {
      await queryInterface.sequelize.query(
        `UPDATE lessons l
         SET video_url = NULL
         FROM modules m, courses c
         WHERE l.module_id = m.id AND m.course_id = c.id
           AND c.slug = ? AND m.week_number = ? AND l.title = ?`,
        { replacements: [COURSE_SLUG, item.weekNumber, item.lessonTitle] },
      );
    }
  },
};
