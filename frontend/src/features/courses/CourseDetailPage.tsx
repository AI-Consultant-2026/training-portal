import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchModulesForCourse } from "../../api/courses.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { CourseModule } from "../../types/api";
import { enrollInCourse, fetchMyEnrollments } from "../enrollments/enrollmentsSlice";
import { fetchCourseBySlug } from "./coursesSlice";

export function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const { selectedCourse: course, status, error } = useAppSelector((state) => state.courses);
  const { items: enrollments, error: enrollError } = useAppSelector((state) => state.enrollments);
  const { user } = useAppSelector((state) => state.auth);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(fetchCourseBySlug(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (course) {
      fetchModulesForCourse(course.id).then(setModules);
    }
  }, [course]);

  const isEnrolled = course ? enrollments.some((e) => e.courseId === course.id) : false;

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

      <h2 className="mt-8 text-lg font-semibold text-gray-900">Modules</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {modules.map((mod) => (
          <li key={mod.id} className="rounded-md border border-gray-200 bg-white p-3">
            <span className="text-xs font-medium uppercase text-gray-400">Week {mod.weekNumber}</span>
            <p className="font-medium text-gray-900">{mod.title}</p>
            <p className="text-sm text-gray-600">{mod.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
