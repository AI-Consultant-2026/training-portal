import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchModuleAssignments } from "../../api/assignments.api";
import { fetchCapstoneForCourse } from "../../api/capstones.api";
import { fetchCourseProgress, fetchModulesForCourse } from "../../api/courses.api";
import { fetchModuleLessons } from "../../api/lessons.api";
import { fetchPaymentQuote } from "../../api/payments.api";
import { fetchModuleQuizzes } from "../../api/quizzes.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Spinner } from "../../components/ui/Spinner";
import { YouTubePlayer } from "../../components/ui/YouTubePlayer";
import { Assignment, Capstone, CourseModule, CourseProgress, Lesson, PaymentQuote, Quiz } from "../../types/api";
import { enrollInCourse, fetchMyEnrollments } from "../enrollments/enrollmentsSlice";
import { fetchCourseBySlug } from "./coursesSlice";

// The shared demo login used to let prospects "feel out" the portal before paying --
// mirrors the backend's DEMO_ACCOUNT_EMAIL in lesson.service.ts. Only this exact
// account gets the Week 1 Lesson 1 preview exemption below.
const DEMO_ACCOUNT_EMAIL = "demo@paleontraining.com";

interface ModuleContent {
  lessons: Lesson[];
  assignments: Assignment[];
  quizzes: Quiz[];
  loadError?: boolean;
}

interface IntroVideo {
  videoId: string;
  title: string;
  ctaText: string;
}

// Real, verified (oEmbed-checked), embeddable YouTube videos chosen to entice a
// prospective student into enrolling -- shown before the Enroll button, one per course,
// keyed by slug so adding another course's intro video is a one-line addition here.
const INTRO_VIDEOS: Record<string, IntroVideo> = {
  "cyber-security-fundamentals": {
    videoId: "j0f1A8jrgTc",
    title: "What Are Cybersecurity Fundamentals?",
    ctaText: "Enrol Now — Start Your Digital Skills Training",
  },
  "social-media-management-content": {
    videoId: "egyKxMm5tus",
    title: "Social Media Marketing for Beginners",
    ctaText: "Enrol Now — Start Your Digital Skills Training",
  },
  "digital-marketing": {
    videoId: "lHMCFlSVtNs",
    title: "Digital Marketing Explained: What It Is and Why It Matters in 2025",
    ctaText: "Enrol Now — Start Your Digital Skills Training",
  },
  "renewable-energy-digital-systems": {
    videoId: "FQXkMt0Zm1A",
    title: "How do solar plants work? | Solar plant explained",
    ctaText: "Enrol Now — Start Your Digital Skills Training",
  },
  "gis-and-drone-mapping": {
    videoId: "KOvgaZMer5U",
    title: "What is Drone Mapping? Beginner's Guide",
    ctaText: "Enrol Now — Start Your Digital Skills Training",
  },
};

export function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const { selectedCourse: course, status, error } = useAppSelector((state) => state.courses);
  const { items: enrollments, error: enrollError } = useAppSelector((state) => state.enrollments);
  const { user } = useAppSelector((state) => state.auth);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [moduleContent, setModuleContent] = useState<Record<string, ModuleContent>>({});
  const [courseProgress, setCourseProgress] = useState<CourseProgress | null>(null);
  const [capstone, setCapstone] = useState<Capstone | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [paymentQuote, setPaymentQuote] = useState<PaymentQuote | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(fetchCourseBySlug(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (user) {
      dispatch(fetchMyEnrollments());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (course) {
      fetchModulesForCourse(course.id).then(setModules);
    }
  }, [course]);

  async function loadModuleContent(moduleId: string) {
    // Promise.allSettled, not Promise.all: one failed request (a transient network
    // blip, a slow cold start) must not silently blank out this week's whole content --
    // it previously did, since an unhandled rejection here just skipped the
    // setModuleContent call entirely, with no error and no way to recover short of a
    // full page reload hitting the same problem again.
    const [lessonsResult, assignmentsResult, quizzesResult] = await Promise.allSettled([
      fetchModuleLessons(moduleId),
      fetchModuleAssignments(moduleId),
      fetchModuleQuizzes(moduleId),
    ]);
    const loadError = [lessonsResult, assignmentsResult, quizzesResult].some(
      (r) => r.status === "rejected",
    );
    setModuleContent((prev) => ({
      ...prev,
      [moduleId]: {
        lessons: lessonsResult.status === "fulfilled" ? lessonsResult.value : [],
        assignments: assignmentsResult.status === "fulfilled" ? assignmentsResult.value : [],
        quizzes: quizzesResult.status === "fulfilled" ? quizzesResult.value : [],
        loadError,
      },
    }));
  }

  useEffect(() => {
    if (!user || modules.length === 0) return;
    modules.forEach((mod) => loadModuleContent(mod.id));
  }, [modules, user]);

  const myEnrollment = course ? enrollments.find((e) => e.courseId === course.id) : undefined;
  const isEnrolled = myEnrollment !== undefined;

  // Demo-account preview: only the very first lesson of the course's first module
  // (lowest weekNumber) is exempt from the payment lock -- mirrors the backend
  // exemption in lesson.service.ts's isDemoPreviewLesson().
  const isDemoAccount = user?.email === DEMO_ACCOUNT_EMAIL;
  const firstModuleId =
    modules.length > 0
      ? modules.reduce((min, m) => (m.weekNumber < min.weekNumber ? m : min), modules[0]).id
      : undefined;

  useEffect(() => {
    if (course && user?.role === "student") {
      fetchPaymentQuote(course.id).then(setPaymentQuote).catch(() => setPaymentQuote(null));
    }
  }, [course, user]);

  // Enrolment/payment is paused until the next intake -- every student sees the same
  // "reopens" notice on click instead of reaching the real (card/bank-transfer) payment
  // pages, not just the demo account's usual "get started" nudge.
  function handlePayForCourse() {
    if (!course) return;
    setShowPaymentDialog(true);
  }

  useEffect(() => {
    if (course && user?.role === "student" && isEnrolled) {
      fetchCourseProgress(course.id).then(setCourseProgress);
    }
  }, [course, user, isEnrolled]);

  // Course-level, not per-module -- deliberately a separate effect rather than folded
  // into the per-module Promise.all above.
  useEffect(() => {
    if (course && user) {
      fetchCapstoneForCourse(course.id).then(setCapstone);
    }
  }, [course, user]);

  async function handleEnroll() {
    if (!course) return;
    setEnrolling(true);
    const result = await dispatch(enrollInCourse(course.id));
    if (enrollInCourse.fulfilled.match(result)) {
      dispatch(fetchMyEnrollments());
    }
    setEnrolling(false);
  }

  if (status === "loading" || !course) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Alert message={error} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">{course.title}</h1>
      <p className="mt-2 text-sm text-gray-500">
        {course.level} &middot; {course.durationWeeks} weeks
      </p>
      <p className="mt-4 text-gray-700">{course.description}</p>

      {user?.role === "student" && (
        <div className="mt-6">
          {INTRO_VIDEOS[course.slug] && (
            <div className="mb-4">
              <YouTubePlayer
                videoId={INTRO_VIDEOS[course.slug].videoId}
                videoUrl={`https://www.youtube.com/watch?v=${INTRO_VIDEOS[course.slug].videoId}`}
                title={INTRO_VIDEOS[course.slug].title}
              />
              <p className="mt-3 text-center text-base font-semibold text-gray-900">
                {INTRO_VIDEOS[course.slug].ctaText}
              </p>
            </div>
          )}
          {enrollError && <Alert message={enrollError} />}
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleEnroll} isLoading={enrolling} disabled={isEnrolled}>
              {!isEnrolled
                ? "Enroll"
                : myEnrollment?.paymentConfirmed
                  ? "Already Enrolled"
                  : "Payment pending"}
            </Button>
            {isEnrolled && !myEnrollment?.paymentConfirmed && paymentQuote && (
              <Button variant="secondary" onClick={handlePayForCourse}>
                Pay for course &ndash; &#8358;{paymentQuote.baseAmountNgn.toLocaleString()}
              </Button>
            )}
          </div>
        </div>
      )}

      {courseProgress && (
        <div className="mt-6">
          <ProgressBar percent={courseProgress.progressPercent} />
          <p className="mt-1 text-sm text-gray-500">
            {courseProgress.completedLessons} of {courseProgress.totalLessons} lessons complete (
            {courseProgress.progressPercent}%)
          </p>
        </div>
      )}

      <h2 className="mt-8 text-lg font-semibold text-gray-900">Modules</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {modules.map((mod) => {
          const content = moduleContent[mod.id];
          return (
            <li key={mod.id} className="rounded-md border border-gray-200 bg-white p-3">
              <span className="text-xs font-medium uppercase text-gray-400">Week {mod.weekNumber}</span>
              <p className="font-medium text-gray-900">{mod.title}</p>
              <p className="text-sm text-gray-600">{mod.description}</p>

              {content &&
                (content.lessons.length > 0 ||
                  content.assignments.length > 0 ||
                  content.quizzes.length > 0) && (
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-gray-100 pt-3">
                  {content.lessons.map((lesson) => {
                    // Disabled by default: lessons only open once an admin has confirmed
                    // payment for this student's enrollment -- enrolling alone isn't
                    // enough. Only gates students -- instructors/admins aren't enrollees
                    // and should always be able to review content. The demo account gets
                    // one exemption: the course's very first lesson, for preview purposes.
                    const isCourseFirstLesson =
                      isDemoAccount && mod.id === firstModuleId && content.lessons[0]?.id === lesson.id;
                    const isLocked =
                      user?.role === "student" && !myEnrollment?.paymentConfirmed && !isCourseFirstLesson;
                    const isCompleted = courseProgress?.completedLessonIds.includes(lesson.id);

                    if (isLocked) {
                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => setShowPaymentDialog(true)}
                          className="text-sm font-medium text-gray-400 hover:text-gray-600"
                          title="This lesson unlocks once your payment has been confirmed"
                        >
                          Lesson: {lesson.title} (locked)
                        </button>
                      );
                    }
                    return (
                      <Link
                        key={lesson.id}
                        to={`/lessons/${lesson.id}`}
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        Lesson: {lesson.title}
                        {isCompleted && <span className="ml-1 text-green-700">(completed)</span>}
                      </Link>
                    );
                  })}
                  {content.quizzes.map((q) => {
                    // Admin-disabled takes precedence over everything else -- an instructor
                    // pulled this quiz from availability, which is a different, stronger
                    // gate than the lesson-completion lock below and applies to every role,
                    // not just students (see quiz.service.ts's start()).
                    if (!q.isEnabled) {
                      return (
                        <span
                          key={q.id}
                          className="text-sm font-medium text-gray-400"
                          title="This quiz is not available right now"
                        >
                          Quiz: {q.title} (unavailable)
                        </span>
                      );
                    }
                    // Disabled by default: a quiz only unlocks once every lesson in its
                    // own week is completed. Only gates students -- instructors/admins
                    // can't start a quiz attempt anyway (authorize("student") on the
                    // backend), so there's nothing to lock for them here.
                    const allLessonsCompleted =
                      content.lessons.length === 0 ||
                      content.lessons.every((lesson) =>
                        courseProgress?.completedLessonIds.includes(lesson.id),
                      );
                    const isLocked = user?.role === "student" && !allLessonsCompleted;

                    if (isLocked) {
                      return (
                        <span
                          key={q.id}
                          className="text-sm font-medium text-gray-400"
                          title="Complete this week's lessons to unlock the quiz"
                        >
                          Quiz: {q.title} (locked)
                        </span>
                      );
                    }
                    return (
                      <Link
                        key={q.id}
                        to={`/quizzes/${q.id}`}
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        Quiz: {q.title}
                      </Link>
                    );
                  })}
                  {content.assignments.map((a) => {
                    const isLocked = user?.role === "student" && !myEnrollment?.paymentConfirmed;
                    if (isLocked) {
                      return (
                        <span
                          key={a.id}
                          className="text-sm font-medium text-gray-400"
                          title="This assignment unlocks once your payment has been confirmed"
                        >
                          Assignment: {a.title} (locked)
                        </span>
                      );
                    }
                    return (
                      <Link
                        key={a.id}
                        to={`/assignments/${a.id}`}
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        Assignment: {a.title}
                      </Link>
                    );
                  })}
                </div>
              )}

              {content?.loadError && (
                <div className="mt-3 border-t border-gray-100 pt-3">
                  <Alert variant="error" message="Couldn't load this week's lessons, assignment, or quiz." />
                  <button
                    type="button"
                    onClick={() => loadModuleContent(mod.id)}
                    className="mt-1 text-sm font-medium text-blue-600 hover:underline"
                  >
                    Retry
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {capstone && (
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4">
          <span className="text-xs font-medium uppercase text-gray-400">Capstone project</span>
          <p className="mt-1 font-medium text-gray-900">{capstone.title}</p>
          {capstone.description && (
            <p className="mt-1 line-clamp-3 text-sm text-gray-600">{capstone.description}</p>
          )}
          <Link
            to={`/capstones/${capstone.id}`}
            className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            View capstone
          </Link>
        </div>
      )}

      {showPaymentDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-lg">
            <p className="text-sm text-gray-700">
              Enrolment for digital skills training reopens 01/01/2026. If you have sign up for
              any of the courses, you will be contacted to make payment and start. Thank you.
            </p>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setShowPaymentDialog(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
