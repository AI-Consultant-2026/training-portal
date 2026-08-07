import { QueryInterface } from "sequelize";

const COURSE_SLUG = "gis-and-drone-mapping";
const WEEK_NUMBER = 8;
const LESSON_TITLE = "Scoping and Resourcing a GIS Project";

const NEW_CONTENT =
  "Welcome to our final week of GIS and Drone Mapping. Over the past seven weeks, we've built genuinely substantial technical skill: GIS fundamentals, data collection, remote sensing, drone mapping, and spatial analysis. This week, we cover something equally important that technical courses often overlook entirely: how to actually plan, manage, and deliver a genuinely real GIS project from start to finish.\n\n## Project Planning and Scoping\n\nEvery genuinely successful GIS project starts with clear, well-defined **scope** — precisely what questions the project needs to answer, what specific geographic area it covers, and what final deliverables will actually be produced.\n\nA common, serious mistake, especially among beginners, is scope that's either too vague — \"map the environment of the State\" — or genuinely unrealistic for the time and resources actually available. Effective scoping means being specific: which exact resource, which exact geographic boundary, which exact time period, and precisely what decisions the finished analysis is genuinely meant to support.\n\nThis directly connects to your capstone project, which asks you to support the State government planning for sustainable agriculture zones. That's a genuinely substantial, ambitious topic, and part of your real work this week is narrowing it into a scope that's both meaningful and realistically achievable — perhaps focusing on one specific local government area, or one particular crop type, or one specific resource constraint like water availability, rather than attempting to comprehensively address absolutely everything at once.\n\n## Budget and Resource Estimation\n\nReal projects operate under real, genuine constraints — time, money, personnel, and equipment. Estimating these requirements accurately, upfront, is a genuinely essential planning skill.\n\nConsider the specific data sources required — free satellite imagery costs no direct money but requires meaningful processing time and genuine technical skill; drone surveys require equipment access, and depending on your specific circumstances, potentially technical services and formal regulatory permits, both of which we discussed carefully back in week five. Consider the required software and any associated licensing costs, and consider genuine personnel time — how many hours will data collection, careful processing, and thorough analysis realistically require, based on everything you now know from actually doing this hands-on work yourself.\n\nA well-prepared resource plan doesn't need to be perfectly precise down to the last detail, but it should demonstrate genuinely realistic, well-considered thinking, directly informed by real experience rather than pure guesswork. This is exactly what this week's assignment specifically asks you to produce.\n\n## Bringing It Together\n\nThis lesson covered how to define a clear, realistic project scope, and how to estimate the budget, time, and personnel a real GIS project actually requires.\n\nNext lesson turns to the people side of project delivery: engaging stakeholders throughout a project, quality-checking your findings before they're delivered, and reporting results through clear, interactive web maps.";

const OLD_CONTENT =
  "Defining a realistic, well-bounded project scope and estimating the budget, time, and personnel it will require.";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE lessons l
       SET content = ?
       FROM modules m, courses c
       WHERE l.module_id = m.id AND m.course_id = c.id
         AND c.slug = ? AND m.week_number = ? AND l.title = ?`,
      { replacements: [NEW_CONTENT, COURSE_SLUG, WEEK_NUMBER, LESSON_TITLE] },
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE lessons l
       SET content = ?
       FROM modules m, courses c
       WHERE l.module_id = m.id AND m.course_id = c.id
         AND c.slug = ? AND m.week_number = ? AND l.title = ?`,
      { replacements: [OLD_CONTENT, COURSE_SLUG, WEEK_NUMBER, LESSON_TITLE] },
    );
  },
};
