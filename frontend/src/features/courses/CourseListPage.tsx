import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { fetchMyEnrollments } from "../enrollments/enrollmentsSlice";
import { CourseCard } from "./components/CourseCard";
import { fetchCourses } from "./coursesSlice";

export function CourseListPage() {
  const dispatch = useAppDispatch();
  const { items: courses, status, error } = useAppSelector((state) => state.courses);
  const { items: enrollments } = useAppSelector((state) => state.enrollments);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCourses());
    if (user) {
      dispatch(fetchMyEnrollments());
    }
  }, [dispatch, user]);

  const enrolledCourseIds = new Set(enrollments.map((e) => e.courseId));

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Courses</h1>
      {status === "loading" && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}
      {error && <Alert message={error} />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} isEnrolled={enrolledCourseIds.has(course.id)} />
        ))}
      </div>
    </div>
  );
}
