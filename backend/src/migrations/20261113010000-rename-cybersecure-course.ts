import { QueryInterface } from "sequelize";

// One name for the product (2026-11-13 review): the corporate course learners take is
// "CyberSecure Workforce", the same name the pages, checkout and certificates use. The slug
// (cybersecure-workforce-essentials) stays, so links, seats and enrolments are unaffected.
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      "UPDATE courses SET title = 'CyberSecure Workforce' WHERE slug = 'cybersecure-workforce-essentials'",
    );
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      "UPDATE courses SET title = 'CyberSecure Workforce Essentials' WHERE slug = 'cybersecure-workforce-essentials'",
    );
  },
};
