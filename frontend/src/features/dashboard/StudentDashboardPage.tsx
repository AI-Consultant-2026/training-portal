import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { EnrollmentCard } from "../enrollments/components/EnrollmentCard";
import { fetchMyEnrollments } from "../enrollments/enrollmentsSlice";

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

      {status === "loading" && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}
      {error && <Alert message={error} />}

      {status === "succeeded" && enrollments.length === 0 && (
        <div className="mt-8 rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-600">You&apos;re not enrolled in any courses yet.</p>
          <Link to="/courses" className="mt-2 inline-block text-blue-600 hover:underline">
            Browse courses
          </Link>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {enrollments.map((enrollment) => (
          <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
        ))}
      </div>
    </div>
  );
}
