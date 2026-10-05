import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
import { Assignment, Course, CourseModule, Enrollment, Lesson, Quiz, User } from "../../types/api";
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
  university: null,
  referralCode: null,
  emailVerifiedAt: "2026-01-01T00:00:00.000Z",
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
    nextLessonId: null,
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
    submittedQuizIds: [],
    submittedAssignmentIds: [],
  });
  vi.mocked(lessonsApi.fetchModuleLessons).mockResolvedValue([]);
  vi.mocked(assignmentsApi.fetchModuleAssignments).mockResolvedValue([ASSIGNMENT]);
  vi.mocked(quizzesApi.fetchModuleQuizzes).mockResolvedValue([]);
  vi.mocked(capstonesApi.fetchCapstoneForCourse).mockResolvedValue(null);
  vi.mocked(paymentsApi.fetchPaymentQuote).mockResolvedValue({
    baseAmountNgn: 200000,
    card: { currency: "NGN", amount: 200000, enabled: false },
  });
  vi.mocked(enrollmentsApi.fetchMyEnrollments).mockResolvedValue([enrollment(enrollmentPaymentConfirmed)]);
}

function renderCoursePage() {
  return renderWithProviders(
    <Routes>
      <Route path="/courses/:slug" element={<CourseDetailPage />} />
      <Route path="/courses/:slug/pay/card" element={<div>Card payment page</div>} />
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
          emailVerification: { status: "idle", error: null, resendStatus: "idle" },
        },
      },
    },
  );
}

describe("CourseDetailPage failed course fetch", () => {
  it("shows an error message instead of an infinite spinner when the course fetch fails (e.g. 404)", async () => {
    mockCourseData(false);
    vi.mocked(coursesApi.fetchCourseBySlug).mockRejectedValue(new Error("Request failed with status code 404"));

    renderCoursePage();

    await waitFor(() => {
      expect(screen.getByText("Could not load course")).toBeInTheDocument();
    });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});

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

describe("CourseDetailPage payment flow", () => {
  it("opens the card payment page when Enroll is clicked, without enrolling yet", async () => {
    mockCourseData(false);
    vi.mocked(enrollmentsApi.fetchMyEnrollments).mockResolvedValue([]);
    renderCoursePage();

    await userEvent.click(await screen.findByRole("button", { name: "Enroll" }));

    expect(await screen.findByText("Card payment page")).toBeInTheDocument();
    expect(enrollmentsApi.enrollInCourse).not.toHaveBeenCalled();
  });

  it("sends an already-enrolled, unpaid student to the card payment page from 'Pay for course'", async () => {
    mockCourseData(false);
    renderCoursePage();

    await userEvent.click(await screen.findByRole("button", { name: /Pay for course/ }));

    expect(await screen.findByText("Card payment page")).toBeInTheDocument();
  });
});

describe("CourseDetailPage free preview lesson", () => {
  // Every course's very first lesson is open before payment (mirrors the backend's
  // getFreePreviewLesson); every later lesson stays locked until payment is confirmed.
  function lesson(id: string, title: string, order: number) {
    return {
      id,
      moduleId: "module-1",
      title,
      content: "",
      videoUrl: null,
      resources: {},
      images: [],
      order,
      durationMinutes: 10,
    };
  }

  it("opens the first lesson with a Free preview label and locks the rest when unpaid", async () => {
    mockCourseData(false);
    vi.mocked(lessonsApi.fetchModuleLessons).mockResolvedValue([
      lesson("lesson-1", "Intro to Security", 1),
      lesson("lesson-2", "Threat Landscape", 2),
    ]);
    renderCoursePage();

    const first = await screen.findByRole("link", { name: /Intro to Security/ });
    expect(first).toHaveAttribute("href", "/lessons/lesson-1");
    expect(screen.getByText("Free preview")).toBeInTheDocument();
    expect(screen.getByText(/Lesson: Threat Landscape \(locked\)/)).toBeInTheDocument();
  });

  it("drops the Free preview label once payment is confirmed", async () => {
    mockCourseData(true);
    vi.mocked(lessonsApi.fetchModuleLessons).mockResolvedValue([
      lesson("lesson-1", "Intro to Security", 1),
      lesson("lesson-2", "Threat Landscape", 2),
    ]);
    renderCoursePage();

    // Lesson 2 itself is held by the day gate (assignment not submitted yet) -- see the
    // "day gate" tests below -- so check the first lesson's label here.
    await screen.findByRole("link", { name: /Intro to Security/ });
    expect(screen.queryByText("Free preview")).not.toBeInTheDocument();
  });
});

describe("CourseDetailPage day gate", () => {
  const LESSON_1 = { id: "lesson-1", moduleId: MODULE.id, title: "Intro", order: 1 } as Lesson;
  const LESSON_2 = { id: "lesson-2", moduleId: MODULE.id, title: "Threats", order: 2 } as Lesson;
  const QUIZ = { id: "quiz-1", moduleId: MODULE.id, title: "Day 1 Quiz", isEnabled: true } as Quiz;

  function mockDay(progress: { completedLessonIds: string[]; submittedQuizIds: string[]; submittedAssignmentIds: string[] }) {
    mockCourseData(true);
    vi.mocked(lessonsApi.fetchModuleLessons).mockResolvedValue([LESSON_1, LESSON_2]);
    vi.mocked(quizzesApi.fetchModuleQuizzes).mockResolvedValue([QUIZ]);
    vi.mocked(coursesApi.fetchCourseProgress).mockResolvedValue({
      completedLessons: progress.completedLessonIds.length,
      totalLessons: 2,
      progressPercent: 0,
      ...progress,
    });
  }

  it("locks lesson 2 and pops up the outstanding quiz and assignment when clicked", async () => {
    mockDay({ completedLessonIds: ["lesson-1"], submittedQuizIds: ["quiz-1"], submittedAssignmentIds: [] });
    renderCoursePage();

    expect(await screen.findByRole("link", { name: /Lesson: Intro/ })).toBeInTheDocument();
    const locked = await screen.findByRole("button", { name: /Lesson: Threats \(locked\)/ });
    await userEvent.click(locked);

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent(/complete Day 1.s quiz and assignment to proceed to the next lesson/i);
    expect(dialog).toHaveTextContent(/Done/);
    expect(screen.getByRole("link", { name: "Submit" })).toHaveAttribute("href", "/assignments/assignment-1");
  });

  it("opens lesson 2 once the quiz and assignment are submitted", async () => {
    mockDay({
      completedLessonIds: ["lesson-1"],
      submittedQuizIds: ["quiz-1"],
      submittedAssignmentIds: ["assignment-1"],
    });
    renderCoursePage();

    expect(await screen.findByRole("link", { name: /Lesson: Threats/ })).toHaveAttribute("href", "/lessons/lesson-2");
  });
});
