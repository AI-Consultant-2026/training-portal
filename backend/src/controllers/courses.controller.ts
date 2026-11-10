import { Request, Response } from "express";
import * as capstoneService from "../services/capstone.service";
import * as courseService from "../services/course.service";
import * as lessonService from "../services/lesson.service";
import { Enrollment } from "../models";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const listCourses = asyncHandler(async (req: Request, res: Response) => {
  const courses =
    req.user && (req.user.role === "admin" || req.user.role === "instructor")
      ? await courseService.listAllCourses()
      : await courseService.listPublishedCourses();

  // Admin-only courses never appear in the catalog for anyone but an admin -- an
  // instructor otherwise sees every course via listAllCourses above, which would
  // otherwise leak an admin-only course's title/description as a catalog card.
  const visible = courses.filter(
    (course) => !courseService.isAdminOnlyCourse(course) || req.user?.role === "admin",
  );

  // Corporate courses appear only for staff and admins/instructors, and for a learner
  // only when their company has enrolled them.
  const isStaff = req.user?.role === "admin" || req.user?.role === "instructor";
  const myCourseIds =
    !isStaff && req.user && visible.some(courseService.isCorporateCourse)
      ? new Set(
          (
            await Enrollment.findAll({ where: { studentId: req.user.id }, attributes: ["courseId", "status"] })
          )
            .filter((e) => e.status !== "suspended")
            .map((e) => e.courseId),
        )
      : new Set<string>();
  const catalogue = visible.filter(
    (course) => isStaff || !courseService.isCorporateCourse(course) || myCourseIds.has(course.id),
  );

  res.json({ courses: catalogue });
});

export const getCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.getCourseByIdOrSlug(req.params.id);
  courseService.assertCourseAccessible(course, req.user);
  if (courseService.isCorporateCourse(course) && req.user?.role !== "admin" && req.user?.role !== "instructor") {
    const enrolled = req.user
      ? await Enrollment.findOne({ where: { courseId: course.id, studentId: req.user.id } })
      : null;
    if (!enrolled || enrolled.status === "suspended") throw ApiError.notFound("Course not found");
  }
  res.json({ course });
});

export const createCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.createCourse(req.body, req.user!.id);
  res.status(201).json({ course });
});

export const updateCourse = asyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.updateCourse(req.params.id, req.body, req.user!);
  res.json({ course });
});

export const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
  await courseService.deleteCourse(req.params.id);
  res.status(204).send();
});

export const getCourseProgress = asyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.getCourseByIdOrSlug(req.params.id);
  const progress = await lessonService.getCourseProgressForStudent(course.id, req.user!.id);
  res.json(progress);
});

export const getCourseCapstone = asyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.getCourseByIdOrSlug(req.params.id);
  courseService.assertCourseAccessible(course, req.user);
  const capstone = await capstoneService.getByCourse(course.id);
  res.json({ capstone });
});

export const getCoursePreview = asyncHandler(async (req: Request, res: Response) => {
  const preview = await courseService.getPublicCoursePreview(req.params.id);
  res.json(preview);
});
