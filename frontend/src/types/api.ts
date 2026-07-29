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
