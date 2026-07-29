import { CourseModule, Lesson } from "../models";
import { ApiError } from "../utils/ApiError";
import { getEnrollmentForCourseAndStudent } from "./enrollment.service";

export async function listLessonsForModule(moduleId: string): Promise<Lesson[]> {
  return Lesson.findAll({ where: { moduleId }, order: [["order", "ASC"]] });
}

export async function getLessonById(id: string): Promise<Lesson> {
  const lesson = await Lesson.findByPk(id);
  if (!lesson) {
    throw ApiError.notFound("Lesson not found");
  }
  return lesson;
}

async function countLessonsForCourse(courseId: string): Promise<number> {
  return Lesson.count({
    include: [
      {
        model: CourseModule,
        as: "module",
        where: { courseId },
        attributes: [],
      },
    ],
  });
}

/**
 * Phase 1 progress tracking is intentionally naive: it increments progress_percent
 * by an even share per lesson with no record of which lessons were already completed,
 * so calling this twice on the same lesson double-counts. This is fixed once the
 * progress_tracking table (a later phase) lands.
 */
export async function markLessonComplete(lessonId: string, studentId: string): Promise<void> {
  const lesson = await getLessonById(lessonId);
  const courseModule = await CourseModule.findByPk(lesson.moduleId);
  if (!courseModule) {
    throw ApiError.notFound("Module not found");
  }

  const enrollment = await getEnrollmentForCourseAndStudent(courseModule.courseId, studentId);
  if (!enrollment) {
    throw ApiError.forbidden("You must be enrolled in this course to complete lessons");
  }

  const totalLessons = await countLessonsForCourse(courseModule.courseId);
  const increment = totalLessons > 0 ? Math.round(100 / totalLessons) : 0;

  enrollment.progressPercent = Math.min(100, enrollment.progressPercent + increment);
  if (enrollment.progressPercent >= 100) {
    enrollment.status = "completed";
    enrollment.completionDate = new Date();
  }
  await enrollment.save();
}
