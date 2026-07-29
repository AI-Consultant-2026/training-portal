import { Sequelize } from "sequelize";
import { Course, initCourseModel } from "./course.model";
import { CourseModule, initCourseModuleModel } from "./module.model";
import { Enrollment, initEnrollmentModel } from "./enrollment.model";
import { Lesson, initLessonModel } from "./lesson.model";
import { RefreshToken, initRefreshTokenModel } from "./refreshToken.model";
import { User, initUserModel } from "./user.model";

const databaseUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URL ?? process.env.DATABASE_URL
    : process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("Missing required environment variable: DATABASE_URL");
}

export const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false,
});

initUserModel(sequelize);
initCourseModel(sequelize);
initCourseModuleModel(sequelize);
initLessonModel(sequelize);
initEnrollmentModel(sequelize);
initRefreshTokenModel(sequelize);

User.hasMany(Course, { foreignKey: "instructorId", as: "coursesTaught" });
Course.belongsTo(User, { foreignKey: "instructorId", as: "instructor" });

Course.hasMany(CourseModule, { foreignKey: "courseId", as: "modules" });
CourseModule.belongsTo(Course, { foreignKey: "courseId", as: "course" });

CourseModule.hasMany(Lesson, { foreignKey: "moduleId", as: "lessons" });
Lesson.belongsTo(CourseModule, { foreignKey: "moduleId", as: "module" });

Course.hasMany(Enrollment, { foreignKey: "courseId", as: "enrollments" });
Enrollment.belongsTo(Course, { foreignKey: "courseId", as: "course" });

User.hasMany(Enrollment, { foreignKey: "studentId", as: "enrollments" });
Enrollment.belongsTo(User, { foreignKey: "studentId", as: "student" });

User.hasMany(RefreshToken, { foreignKey: "userId", as: "refreshTokens" });
RefreshToken.belongsTo(User, { foreignKey: "userId", as: "user" });

export { Course, CourseModule, Enrollment, Lesson, RefreshToken, User };
