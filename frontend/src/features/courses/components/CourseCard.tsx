import { Link } from "react-router-dom";
import { Course } from "../../../types/api";
import { COURSE_COVER_IMAGES } from "../courseCoverImages";

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
}

export function CourseCard({ course, isEnrolled }: CourseCardProps) {
  const coverImage = COURSE_COVER_IMAGES[course.slug];

  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {coverImage && <img src={coverImage} alt="" className="h-32 w-full object-cover" />}
      <div className="flex flex-col gap-2 p-5">
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
    </div>
  );
}
