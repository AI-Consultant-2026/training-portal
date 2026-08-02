import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchModuleAssignments } from "../../api/assignments.api";
import { fetchCapstoneForCourse } from "../../api/capstones.api";
import { fetchCourseProgress, fetchModulesForCourse } from "../../api/courses.api";
import { fetchModuleLessons } from "../../api/lessons.api";
import { fetchModuleQuizzes, fetchMyAttempts } from "../../api/quizzes.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Spinner } from "../../components/ui/Spinner";
import { Assignment, Capstone, CourseModule, CourseProgress, Lesson, Quiz } from "../../types/api";
import { enrollInCourse, fetchMyEnrollments } from "../enrollments/enrollmentsSlice";
import { fetchCourseBySlug } from "./coursesSlice";

interface ModuleContent {
  lessons: Lesson[];
  assignments: Assignment[];
  quizzes: Quiz[];
  loadError?: boolean;
}

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
  const [finalQuizCompleted, setFinalQuizCompleted] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modules, user]);

  const isEnrolled = course ? enrollments.some((e) => e.courseId === course.id) : false;

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

  // The capstone unlocks once the student has completed the quiz for the final week --
  // the last module by weekNumber, not by array position, in case modules ever come back
  // out of order. Applies to every course the same way: whichever week is numerically
  // last is treated as "the last week."
  const lastModule =
    modules.length > 0 ? modules.reduce((a, b) => (b.weekNumber > a.weekNumber ? b : a)) : null;
  const lastModuleQuizId = lastModule ? moduleContent[lastModule.id]?.quizzes[0]?.id : undefined;

  useEffect(() => {
    if (user?.role !== "student" || !isEnrolled || !lastModuleQuizId) return;
    fetchMyAttempts(lastModuleQuizId).then(({ attempts }) => {
      // "Completed" means the student has turned it in ("submitted" or "graded"), not
      // that it's been graded -- a quiz with a short_answer question stays "submitted"
      // (pending manual instructor review) until an instructor scores it, and the
      // capstone shouldn't stay locked behind that grading queue.
      setFinalQuizCompleted(attempts.some((a) => a.status === "submitted" || a.status === "graded"));
    });
  }, [user, isEnrolled, lastModuleQuizId]);

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
          {enrollError && <Alert message={enrollError} />}
          <Button onClick={handleEnroll} isLoading={enrolling} disabled={isEnrolled}>
            {isEnrolled ? "Already enrolled" : "Enroll"}
          </Button>
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
                    // Disabled by default: lessons and assignments only open once the
                    // student has actually enrolled. Only gates students -- instructors/
                    // admins aren't enrollees and should always be able to review content.
                    const isLocked = user?.role === "student" && !isEnrolled;
                    const isCompleted = courseProgress?.completedLessonIds.includes(lesson.id);

                    if (isLocked) {
                      return (
                        <span
                          key={lesson.id}
                          className="text-sm font-medium text-gray-400"
                          title="Enroll in this course to unlock its lessons"
                        >
                          Lesson: {lesson.title} (locked)
                        </span>
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
                  {content.assignments.map((a) => {
                    const isLocked = user?.role === "student" && !isEnrolled;
                    if (isLocked) {
                      return (
                        <span
                          key={a.id}
                          className="text-sm font-medium text-gray-400"
                          title="Enroll in this course to unlock its assignments"
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
                  {content.quizzes.map((q) => {
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
          {/* Disabled by default: unlocks once the final week's quiz has a graded
              attempt. Applies uniformly across every course -- "final week" is always
              whichever module has the highest weekNumber for that course. */}
          {user?.role === "student" && !finalQuizCompleted ? (
            <span
              className="mt-2 inline-block text-sm font-medium text-gray-400"
              title="Complete the final week's quiz to unlock the capstone"
            >
              View capstone (locked)
            </span>
          ) : (
            <Link
              to={`/capstones/${capstone.id}`}
              className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline"
            >
              View capstone
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
