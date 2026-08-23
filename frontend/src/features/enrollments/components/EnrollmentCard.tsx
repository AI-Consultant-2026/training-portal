import { Link } from "react-router-dom";
import { ProgressBar } from "../../../components/ui/ProgressBar";
import { COURSE_COVER_IMAGES } from "../../courses/courseCoverImages";
import { Enrollment } from "../../../types/api";

interface EnrollmentCardProps {
  enrollment: Enrollment;
}

const STATUS_LABELS: Record<Enrollment["status"], string> = {
  active: "In progress",
  completed: "Completed",
  dropped: "Dropped",
  suspended: "Suspended",
};

export function EnrollmentCard({ enrollment }: EnrollmentCardProps) {
  const course = enrollment.course;
  const coverImage = course ? COURSE_COVER_IMAGES[course.slug] : undefined;

  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {coverImage && <img src={coverImage} alt="" className="h-32 w-full object-cover" />}
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{course?.title ?? "Course"}</h3>
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
            {STATUS_LABELS[enrollment.status]}
          </span>
        </div>
        <ProgressBar percent={enrollment.progressPercent} />
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{enrollment.progressPercent}% complete</span>
          {course && (
            <Link
              to={enrollment.nextLessonId ? `/lessons/${enrollment.nextLessonId}` : `/courses/${course.slug}`}
              className="text-blue-600 hover:underline"
            >
              Continue
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
