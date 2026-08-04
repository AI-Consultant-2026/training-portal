export type UserRole = "student" | "instructor" | "admin";
export type UserStatus = "active" | "inactive" | "suspended";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  profileData: Record<string, unknown>;
}

export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseStatus = "draft" | "published" | "archived";

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  instructorId: string | null;
  durationWeeks: number;
  level: CourseLevel;
  status: CourseStatus;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  weekNumber: number;
  order: number;
  status: "draft" | "published";
  createdAt: string;
}

export interface LessonResourceLink {
  label: string;
  url: string;
}

export interface LessonImage {
  url: string;
  caption: string;
  afterParagraph: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  videoUrl: string | null;
  resources: { links?: LessonResourceLink[] };
  images: LessonImage[];
  order: number;
  durationMinutes: number;
}

export interface VideoCheckpointAnswer {
  id: string;
  answerText: string;
  order: number;
}

export interface VideoCheckpoint {
  id: string;
  timestampSeconds: number;
  questionText: string;
  questionType: "multiple_choice" | "true_false";
  order: number;
  explanation: string | null;
  answers: VideoCheckpointAnswer[];
}

export interface CheckCheckpointAnswerResult {
  correct: boolean;
  correctAnswerId: string;
  explanation: string | null;
}

export interface CourseProgress {
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
  completedLessonIds: string[];
}

export interface MarkLessonCompleteResult {
  completed: true;
  alreadyCompleted: boolean;
  courseProgress: { totalLessons: number; completedLessons: number; progressPercent: number };
}

export type EnrollmentStatus = "active" | "completed" | "dropped" | "suspended";

export interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  enrolledDate: string;
  status: EnrollmentStatus;
  completionDate: string | null;
  progressPercent: number;
  grade: string | null;
  course?: Course;
}

export interface Assignment {
  id: string;
  moduleId: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  fileRequired: boolean;
  gradingRubric: Record<string, unknown> | null;
  pointsTotal: number;
}

export type AssignmentSubmissionStatus = "submitted" | "graded" | "returned";

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submissionDate: string;
  filePath: string | null;
  submissionText: string | null;
  status: AssignmentSubmissionStatus;
  score: number | null;
  feedback: string | null;
  gradedDate: string | null;
  isLate: boolean;
  assignmentTitle?: string;
}

export interface Capstone {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  fileRequired: boolean;
  gradingRubric: Record<string, unknown> | null;
  pointsTotal: number;
}

export type CapstoneSubmissionStatus = "submitted" | "graded" | "returned";

export interface CapstoneSubmission {
  id: string;
  capstoneId: string;
  studentId: string;
  submissionDate: string;
  filePath: string | null;
  submissionText: string | null;
  status: CapstoneSubmissionStatus;
  score: number | null;
  feedback: string | null;
  gradedDate: string | null;
  isLate: boolean;
  courseTitle?: string;
}

export type QuizQuestionType = "multiple_choice" | "true_false" | "short_answer";

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  timeLimitMinutes: number | null;
  passingScore: number;
  questionCount: number;
  shuffleQuestions: boolean;
}

export interface QuizAnswerOption {
  id: string;
  answerText: string;
  order: number;
}

export interface QuizAnswerOptionGraded extends QuizAnswerOption {
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  questionType: QuizQuestionType;
  points: number;
  order: number;
  answers: QuizAnswerOption[];
}

export interface QuizAttemptSummary {
  id: string;
  quizId: string;
  startTime: string;
  attemptNumber: number;
  status: "in_progress" | "submitted" | "graded";
}

export interface QuizAttemptResult {
  id: string;
  quizId: string;
  status: "in_progress" | "submitted" | "graded";
  score: number | null;
  startTime: string;
  endTime: string | null;
  attemptNumber: number;
}

export interface QuizStartResponse {
  attempt: QuizAttemptSummary;
  quiz: Quiz;
  questions: QuizQuestion[];
}

export interface QuizGradedResponse {
  id: string;
  questionId: string;
  questionText: string | null;
  studentAnswer: string;
  isCorrect: boolean | null;
  pointsEarned: number | null;
  points: number | null;
  explanation: string | null;
  answers: QuizAnswerOptionGraded[];
}

export interface QuizSubmitResponse {
  attempt: QuizAttemptResult;
  responses: QuizGradedResponse[];
  timedOut: boolean;
  passed: boolean | null;
}

export interface QuizAttemptDetail extends QuizAttemptResult {
  studentId: string;
  responses: QuizGradedResponse[];
}

export interface QuizPendingReview {
  id: string;
  quizId: string;
  quizTitle: string | null;
  studentId: string;
  endTime: string | null;
  attemptNumber: number;
}

export interface AdminStats {
  users: {
    total: number;
    byRole: Record<UserRole, number>;
  };
  courses: {
    total: number;
    byStatus: Record<CourseStatus, number>;
    list: { id: string; title: string; status: CourseStatus; enrollmentCount: number }[];
  };
  enrollments: {
    total: number;
    byStatus: Record<EnrollmentStatus, number>;
    averageProgressPercent: number | null;
  };
  assignments: {
    totalSubmissions: number;
    pendingGrading: number;
    graded: number;
    averageScore: number | null;
  };
  quizzes: {
    totalAttempts: number;
    pendingGrading: number;
    graded: number;
    averageScore: number | null;
    passRate: number | null;
  };
}
