import { Router } from "express";
import * as coursesController from "../controllers/courses.controller";
import * as enrollmentsController from "../controllers/enrollments.controller";
import * as modulesController from "../controllers/modules.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { createCourseSchema, updateCourseSchema } from "../validators/courses.validators";

export const coursesRouter = Router();

// listCourses itself branches on role (admin/instructor see drafts too via
// listAllCourses, everyone else gets listPublishedCourses) -- this route just needs
// an authenticated user, not an admin one, or students can never reach the catalog.
coursesRouter.get("/", authenticate, coursesController.listCourses);
coursesRouter.post(
  "/",
  authenticate,
  authorize("instructor", "admin"),
  validate(createCourseSchema),
  coursesController.createCourse,
);
coursesRouter.get("/:id", authenticate, coursesController.getCourse);
coursesRouter.put(
  "/:id",
  authenticate,
  authorize("instructor", "admin"),
  validate(updateCourseSchema),
  coursesController.updateCourse,
);
coursesRouter.delete("/:id", authenticate, authorize("admin"), coursesController.deleteCourse);

coursesRouter.get("/:id/modules", authenticate, modulesController.listModulesForCourse);
coursesRouter.post("/:id/enroll", authenticate, authorize("student"), enrollmentsController.enrollInCourse);
coursesRouter.get(
  "/:id/progress",
  authenticate,
  authorize("student"),
  coursesController.getCourseProgress,
);
coursesRouter.get("/:id/capstone", authenticate, coursesController.getCourseCapstone);
