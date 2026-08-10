import { Sequelize } from "sequelize";
import { Assignment, initAssignmentModel } from "./assignment.model";
import { AssignmentSubmission, initAssignmentSubmissionModel } from "./assignmentSubmission.model";
import { Capstone, initCapstoneModel } from "./capstone.model";
import { CapstoneSubmission, initCapstoneSubmissionModel } from "./capstoneSubmission.model";
import { Course, initCourseModel } from "./course.model";
import { CourseModule, initCourseModuleModel } from "./module.model";
import { Enrollment, initEnrollmentModel } from "./enrollment.model";
import { Lead, initLeadModel } from "./lead.model";
import { Lesson, initLessonModel } from "./lesson.model";
import { Payment, initPaymentModel } from "./payment.model";
import { ProgressTracking, initProgressTrackingModel } from "./progressTracking.model";
import { Quiz, initQuizModel } from "./quiz.model";
import { QuizAnswer, initQuizAnswerModel } from "./quizAnswer.model";
import { QuizAttempt, initQuizAttemptModel } from "./quizAttempt.model";
import { QuizQuestion, initQuizQuestionModel } from "./quizQuestion.model";
import { QuizResponse, initQuizResponseModel } from "./quizResponse.model";
import { RefreshToken, initRefreshTokenModel } from "./refreshToken.model";
import { User, initUserModel } from "./user.model";
import { VideoCheckpoint, initVideoCheckpointModel } from "./videoCheckpoint.model";
import { VideoCheckpointAnswer, initVideoCheckpointAnswerModel } from "./videoCheckpointAnswer.model";

const databaseUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URL ?? process.env.DATABASE_URL
    : process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("Missing required environment variable: DATABASE_URL");
}

// Render's managed Postgres (and most hosted providers) require SSL on their public
// connection string; local/test Postgres never runs with NODE_ENV=production, so this
// is inert everywhere except a real production deploy.
export const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false,
  dialectOptions:
    process.env.NODE_ENV === "production" ? { ssl: { require: true, rejectUnauthorized: false } } : {},
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
initProgressTrackingModel(sequelize);
initCapstoneModel(sequelize);
initCapstoneSubmissionModel(sequelize);
initVideoCheckpointModel(sequelize);
initVideoCheckpointAnswerModel(sequelize);
initLeadModel(sequelize);
initPaymentModel(sequelize);

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

Enrollment.hasMany(Payment, { foreignKey: "enrollmentId", as: "payments" });
Payment.belongsTo(Enrollment, { foreignKey: "enrollmentId", as: "enrollment" });

User.hasMany(Payment, { foreignKey: "studentId", as: "payments" });
Payment.belongsTo(User, { foreignKey: "studentId", as: "student" });

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

User.hasMany(ProgressTracking, { foreignKey: "studentId", as: "progressRecords" });
ProgressTracking.belongsTo(User, { foreignKey: "studentId", as: "student" });

Lesson.hasMany(ProgressTracking, { foreignKey: "lessonId", as: "progressRecords" });
ProgressTracking.belongsTo(Lesson, { foreignKey: "lessonId", as: "lesson" });

// Structurally a hasOne (not hasMany, unlike every other Course relation here) since
// capstones.course_id is unique -- at most one capstone per course.
Course.hasOne(Capstone, { foreignKey: "courseId", as: "capstone" });
Capstone.belongsTo(Course, { foreignKey: "courseId", as: "course" });

Capstone.hasMany(CapstoneSubmission, { foreignKey: "capstoneId", as: "submissions" });
CapstoneSubmission.belongsTo(Capstone, { foreignKey: "capstoneId", as: "capstone" });

User.hasMany(CapstoneSubmission, { foreignKey: "studentId", as: "capstoneSubmissions" });
CapstoneSubmission.belongsTo(User, { foreignKey: "studentId", as: "student" });

Lesson.hasMany(VideoCheckpoint, { foreignKey: "lessonId", as: "checkpoints" });
VideoCheckpoint.belongsTo(Lesson, { foreignKey: "lessonId", as: "lesson" });

VideoCheckpoint.hasMany(VideoCheckpointAnswer, { foreignKey: "checkpointId", as: "answers" });
VideoCheckpointAnswer.belongsTo(VideoCheckpoint, { foreignKey: "checkpointId", as: "checkpoint" });

export {
  Assignment,
  AssignmentSubmission,
  Capstone,
  CapstoneSubmission,
  Course,
  CourseModule,
  Enrollment,
  Lead,
  Lesson,
  Payment,
  ProgressTracking,
  Quiz,
  QuizAnswer,
  QuizAttempt,
  QuizQuestion,
  QuizResponse,
  RefreshToken,
  User,
  VideoCheckpoint,
  VideoCheckpointAnswer,
};
