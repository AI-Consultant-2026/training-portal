import { Sequelize } from "sequelize";
import { Assignment, initAssignmentModel } from "./assignment.model";
import { AssignmentSubmission, initAssignmentSubmissionModel } from "./assignmentSubmission.model";
import { Course, initCourseModel } from "./course.model";
import { CourseModule, initCourseModuleModel } from "./module.model";
import { Enrollment, initEnrollmentModel } from "./enrollment.model";
import { Lesson, initLessonModel } from "./lesson.model";
import { Quiz, initQuizModel } from "./quiz.model";
import { QuizAnswer, initQuizAnswerModel } from "./quizAnswer.model";
import { QuizAttempt, initQuizAttemptModel } from "./quizAttempt.model";
import { QuizQuestion, initQuizQuestionModel } from "./quizQuestion.model";
import { QuizResponse, initQuizResponseModel } from "./quizResponse.model";
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
initAssignmentModel(sequelize);
initAssignmentSubmissionModel(sequelize);
initQuizModel(sequelize);
initQuizQuestionModel(sequelize);
initQuizAnswerModel(sequelize);
initQuizAttemptModel(sequelize);
initQuizResponseModel(sequelize);

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

CourseModule.hasMany(Assignment, { foreignKey: "moduleId", as: "assignments" });
Assignment.belongsTo(CourseModule, { foreignKey: "moduleId", as: "module" });

Assignment.hasMany(AssignmentSubmission, { foreignKey: "assignmentId", as: "submissions" });
AssignmentSubmission.belongsTo(Assignment, { foreignKey: "assignmentId", as: "assignment" });

User.hasMany(AssignmentSubmission, { foreignKey: "studentId", as: "assignmentSubmissions" });
AssignmentSubmission.belongsTo(User, { foreignKey: "studentId", as: "student" });

CourseModule.hasMany(Quiz, { foreignKey: "moduleId", as: "quizzes" });
Quiz.belongsTo(CourseModule, { foreignKey: "moduleId", as: "module" });

Quiz.hasMany(QuizQuestion, { foreignKey: "quizId", as: "questions" });
QuizQuestion.belongsTo(Quiz, { foreignKey: "quizId", as: "quiz" });

QuizQuestion.hasMany(QuizAnswer, { foreignKey: "questionId", as: "answers" });
QuizAnswer.belongsTo(QuizQuestion, { foreignKey: "questionId", as: "question" });

Quiz.hasMany(QuizAttempt, { foreignKey: "quizId", as: "attempts" });
QuizAttempt.belongsTo(Quiz, { foreignKey: "quizId", as: "quiz" });

User.hasMany(QuizAttempt, { foreignKey: "studentId", as: "quizAttempts" });
QuizAttempt.belongsTo(User, { foreignKey: "studentId", as: "student" });

QuizAttempt.hasMany(QuizResponse, { foreignKey: "attemptId", as: "responses" });
QuizResponse.belongsTo(QuizAttempt, { foreignKey: "attemptId", as: "attempt" });

QuizQuestion.hasMany(QuizResponse, { foreignKey: "questionId", as: "responses" });
QuizResponse.belongsTo(QuizQuestion, { foreignKey: "questionId", as: "question" });

export {
  Assignment,
  AssignmentSubmission,
  Course,
  CourseModule,
  Enrollment,
  Lesson,
  Quiz,
  QuizAnswer,
  QuizAttempt,
  QuizQuestion,
  QuizResponse,
  RefreshToken,
  User,
};
