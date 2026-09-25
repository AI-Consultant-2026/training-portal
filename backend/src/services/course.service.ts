import { COURSE_PRICES_NGN } from "../constants/coursePricing";
import { Course, CourseModule, Lesson } from "../models";
import { CourseLevel } from "../models/course.model";
import { ApiError } from "../utils/ApiError";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface CreateCourseInput {
  title: string;
  slug: string;
  description?: string;
  durationWeeks: number;
  level?: CourseLevel;
}

export interface UpdateCourseInput {
  title?: string;
  description?: string;
  durationWeeks?: number;
  level?: CourseLevel;
  status?: "draft" | "published" | "archived";
}

export async function listPublishedCourses(): Promise<Course[]> {
  return Course.findAll({ where: { status: "published" }, order: [["createdAt", "ASC"]] });
}

export async function listAllCourses(): Promise<Course[]> {
  return Course.findAll({ order: [["createdAt", "ASC"]] });
}

export async function getCourseByIdOrSlug(idOrSlug: string): Promise<Course> {
  const course = UUID_REGEX.test(idOrSlug)
    ? await Course.findByPk(idOrSlug)
    : await Course.findOne({ where: { slug: idOrSlug } });

  if (!course) {
    throw ApiError.notFound("Course not found");
  }
  return course;
}

export async function createCourse(input: CreateCourseInput, instructorId: string): Promise<Course> {
  const existing = await Course.findOne({ where: { slug: input.slug } });
  if (existing) {
    throw ApiError.conflict("A course with this slug already exists");
  }

  return Course.create({
    title: input.title,
    slug: input.slug,
    description: input.description ?? "",
    durationWeeks: input.durationWeeks,
    level: input.level ?? "beginner",
    instructorId,
  });
}

// A course flagged admin-only in its metadata (e.g. internal/experimental content not
// meant for the public catalog) is invisible to everyone except admins -- not just
// unlisted, but a 404 on direct access too, so a guessed/shared slug or ID doesn't leak
// the title, description, module list, or lesson content to instructors or students.
export function isAdminOnlyCourse(course: Course): boolean {
  return (course.metadata as { adminOnly?: boolean } | null)?.adminOnly === true;
}

export function assertCourseAccessible(course: Course, requester: { role: string } | undefined): void {
  if (isAdminOnlyCourse(course) && requester?.role !== "admin") {
    throw ApiError.notFound("Course not found");
  }
}

export function assertCanManageCourse(
  course: Course,
  requester: { id: string; role: string },
): void {
  if (requester.role === "admin") return;
  if (requester.role === "instructor" && course.instructorId === requester.id) return;
  throw ApiError.forbidden("You do not have permission to manage this course");
}

export async function updateCourse(
  idOrSlug: string,
  input: UpdateCourseInput,
  requester: { id: string; role: string },
): Promise<Course> {
  const course = await getCourseByIdOrSlug(idOrSlug);
  assertCanManageCourse(course, requester);

  if (input.title !== undefined) course.title = input.title;
  if (input.description !== undefined) course.description = input.description;
  if (input.durationWeeks !== undefined) course.durationWeeks = input.durationWeeks;
  if (input.level !== undefined) course.level = input.level;
  if (input.status !== undefined) course.status = input.status;

  await course.save();
  return course;
}

export async function deleteCourse(idOrSlug: string): Promise<void> {
  const course = await getCourseByIdOrSlug(idOrSlug);
  await course.destroy();
}

export interface PublicCoursePreview {
  course: { slug: string; title: string; dayCount: number; lessonCount: number; priceNgn: number | null };
  module: { title: string; weekNumber: number };
  lesson: Pick<Lesson, "title" | "content" | "videoUrl" | "images" | "resources" | "durationMinutes">;
}

// Public, no-login preview of a published course's free first lesson (see
// lesson.service.ts getFreePreviewLesson) for the "Try Day 1 free" links on the
// marketing site. Drafts, archived and admin-only courses 404 exactly like an unknown
// slug, so this can't be used to read anything that isn't already in the catalog.
export async function getPublicCoursePreview(slug: string): Promise<PublicCoursePreview> {
  const course = await Course.findOne({ where: { slug } });
  if (!course || course.status !== "published" || isAdminOnlyCourse(course)) {
    throw ApiError.notFound("Course not found");
  }
  // Imported lazily: lesson.service imports this module too.
  const { getFreePreviewLesson } = await import("./lesson.service");
  const preview = await getFreePreviewLesson(course.id);
  if (!preview) {
    throw ApiError.notFound("This course has no preview lesson yet");
  }
  const modules = await CourseModule.findAll({ where: { courseId: course.id }, attributes: ["id"] });
  const lessonCount = modules.length
    ? await Lesson.count({ where: { moduleId: modules.map((m) => m.id) } })
    : 0;
  const { lesson, module } = preview;
  return {
    course: {
      slug: course.slug,
      title: course.title,
      dayCount: modules.length,
      lessonCount,
      priceNgn: COURSE_PRICES_NGN[course.slug] ?? null,
    },
    module: { title: module.title, weekNumber: module.weekNumber },
    lesson: {
      title: lesson.title,
      content: lesson.content,
      videoUrl: lesson.videoUrl,
      images: lesson.images,
      resources: lesson.resources,
      durationMinutes: lesson.durationMinutes,
    },
  };
}
