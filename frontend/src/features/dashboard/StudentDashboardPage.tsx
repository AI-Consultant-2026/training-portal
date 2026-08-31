import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { EnrollmentCard } from "../enrollments/components/EnrollmentCard";
import { fetchMyEnrollments } from "../enrollments/enrollmentsSlice";
import { Enrollment } from "../../types/api";

export function StudentDashboardPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items: enrollments, status, error } = useAppSelector((state) => state.enrollments);

  useEffect(() => {
    dispatch(fetchMyEnrollments());
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {user?.firstName}</h1>

      <Link
        to="/refer"
        className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm hover:bg-blue-100"
      >
        <span className="text-blue-900">
          <span className="font-medium">Refer a friend, earn rewards.</span> Airtime, data or course
          credit for every friend who joins and pays.
        </span>
        <span className="shrink-0 font-medium text-blue-700">Get your code →</span>
      </Link>

      {status === "loading" && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}
      {error && <Alert message={error} />}

      {status === "succeeded" && enrollments.length === 0 && (
        <div className="mt-8 rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-600">You&apos;re not enrolled in any courses yet.</p>
          <Link
            to="/courses"
            className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Browse courses
          </Link>
        </div>
      )}

      {status === "succeeded" && enrollments.length > 0 && <DashboardEnrollments enrollments={enrollments} />}
    </div>
  );
}

// Splits into "In progress" / "Completed" sections only once there's at least one of
// each -- before a student finishes their first course, a "Completed" heading over an
// empty grid (or an "In progress" heading over everything) would just be noise.
function DashboardEnrollments({ enrollments }: { enrollments: Enrollment[] }) {
  const completed = enrollments.filter((e) => e.status === "completed");
  const inProgress = enrollments.filter((e) => e.status !== "completed");

  if (completed.length === 0 || inProgress.length === 0) {
    return (
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {enrollments.map((enrollment) => (
          <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
        ))}
      </div>
    );
  }

  return (
    <>
      <EnrollmentSection title="In progress" enrollments={inProgress} className="mt-8" />
      <EnrollmentSection title="Completed" enrollments={completed} className="mt-10" />
    </>
  );
}

function EnrollmentSection({
  title,
  enrollments,
  className,
}: {
  title: string;
  enrollments: Enrollment[];
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">{title}</h2>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {enrollments.map((enrollment) => (
          <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
        ))}
      </div>
    </section>
  );
}
