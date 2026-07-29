import { Link } from "react-router-dom";
import { Course } from "../../../types/api";

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
}

export function CourseCard({ course, isEnrolled }: CourseCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
      <p className="line-clamp-3 text-sm text-gray-600">{course.description}</p>
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span className="capitalize">{course.level}</span>
        <span>&middot;</span>
        <span>{course.durationWeeks} weeks</span>
      </div>
      <Link
        to={`/courses/${course.slug}`}
        className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        {isEnrolled ? "View course" : "Learn more"}
      </Link>
    </div>
  );
}
