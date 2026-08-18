import { screen, waitFor } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import * as assignmentsApi from "../../api/assignments.api";
import * as capstonesApi from "../../api/capstones.api";
import * as coursesApi from "../../api/courses.api";
import * as enrollmentsApi from "../../api/enrollments.api";
import * as lessonsApi from "../../api/lessons.api";
import * as paymentsApi from "../../api/payments.api";
import * as quizzesApi from "../../api/quizzes.api";
import { renderWithProviders } from "../../test/test-utils";
import { Assignment, Course, CourseModule, Enrollment, User } from "../../types/api";
import { CourseDetailPage } from "./CourseDetailPage";

vi.mock("../../api/courses.api");
vi.mock("../../api/lessons.api");
vi.mock("../../api/assignments.api");
vi.mock("../../api/quizzes.api");
vi.mock("../../api/payments.api");
vi.mock("../../api/capstones.api");
vi.mock("../../api/enrollments.api");

const STUDENT: User = {
  id: "student-1",
  email: "student@example.com",
  firstName: "Stu",
  lastName: "Dent",
  role: "student",
  status: "active",
  profileData: {},
  location: "Nigeria",
  courseInterest: null,
};

const COURSE: Course = {
  id: "course-1",
  title: "Cyber Security Fundamentals",
  slug: "cyber-security-fundamentals",
  description: "A beginner-friendly course.",
  instructorId: null,
  durationWeeks: 12,
  level: "beginner",
  status: "published",
  metadata: {},
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

const MODULE: CourseModule = {
  id: "module-1",
  courseId: COURSE.id,
  title: "Cybersecurity Foundations",
  description: "Week 1 content.",
  weekNumber: 1,
  order: 1,
  status: "published",
  createdAt: "2026-01-01T00:00:00.000Z",
};

const ASSIGNMENT: Assignment = {
  id: "assignment-1",
  moduleId: MODULE.id,
  title: "Breach Case Study Analysis",
  description: "Research 3 real-world breaches.",
  dueDate: null,
  fileRequired: false,
  gradingRubric: null,
  pointsTotal: 100,
};

function enrollment(paymentConfirmed: boolean): Enrollment {
  return {
    id: "enrollment-1",
    courseId: COURSE.id,
    studentId: STUDENT.id,
    enrolledDate: "2026-01-01T00:00:00.000Z",
    status: "active",
    completionDate: null,
    progressPercent: 0,
    grade: null,
    paymentConfirmed,
    paymentConfirmedAt: paymentConfirmed ? "2026-01-02T00:00:00.000Z" : null,
  };
}

function mockCourseData(enrollmentPaymentConfirmed: boolean) {
  vi.mocked(coursesApi.fetchCourseBySlug).mockResolvedValue(COURSE);
  vi.mocked(coursesApi.fetchModulesForCourse).mockResolvedValue([MODULE]);
  vi.mocked(coursesApi.fetchCourseProgress).mockResolvedValue({
    completedLessons: 0,
    totalLessons: 0,
    progressPercent: 0,
    completedLessonIds: [],
  });
  vi.mocked(lessonsApi.fetchModuleLessons).mockResolvedValue([]);
  vi.mocked(assignmentsApi.fetchModuleAssignments).mockResolvedValue([ASSIGNMENT]);
  vi.mocked(quizzesApi.fetchModuleQuizzes).mockResolvedValue([]);
  vi.mocked(capstonesApi.fetchCapstoneForCourse).mockResolvedValue(null);
  vi.mocked(paymentsApi.fetchPaymentQuote).mockResolvedValue({
    baseAmountNgn: 200000,
    card: { currency: "GBP", amount: 100 },
    bankTransfer: {
      currency: "NGN",
      amount: 200000,
      bankDetails: {
        bankName: "Test Bank",
        accountName: "Paleon Training",
        accountNumber: "0000000000",
        sortCodeOrIban: "000000",
      },
    },
    estimatedLocal: null,
  });
  vi.mocked(enrollmentsApi.fetchMyEnrollments).mockResolvedValue([enrollment(enrollmentPaymentConfirmed)]);
}

function renderCoursePage() {
  return renderWithProviders(
    <Routes>
      <Route path="/courses/:slug" element={<CourseDetailPage />} />
    </Routes>,
    {
      route: `/courses/${COURSE.slug}`,
      preloadedState: {
        auth: {
          user: STUDENT,
          accessToken: "token",
          status: "idle",
          bootstrapped: true,
          error: null,
          passwordReset: { status: "idle", error: null },
        },
      },
    },
  );
}

describe("CourseDetailPage assignment payment gate", () => {
  // Regression guard for the payment-gating fix: assignments used to unlock as soon as
  // a student was merely enrolled (free), before the backend or this lock check
  // required enrollment.paymentConfirmed.
  it("locks the assignment when payment hasn't been confirmed", async () => {
    mockCourseData(false);
    renderCoursePage();

    await waitFor(() =>
      expect(screen.getByText(/Assignment: Breach Case Study Analysis \(locked\)/)).toBeInTheDocument(),
    );
    expect(screen.queryByRole("link", { name: /Breach Case Study Analysis/ })).not.toBeInTheDocument();
  });

  it("unlocks the assignment once payment is confirmed", async () => {
    mockCourseData(true);
    renderCoursePage();

    await waitFor(() =>
      expect(screen.getByRole("link", { name: /Breach Case Study Analysis/ })).toBeInTheDocument(),
    );
    expect(screen.queryByText(/\(locked\)/)).not.toBeInTheDocument();
  });
});
