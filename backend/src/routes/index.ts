import { Router } from "express";
import { assignmentsRouter } from "./assignments.routes";
import { assignmentSubmissionsRouter } from "./assignmentSubmissions.routes";
import { authRouter } from "./auth.routes";
import { coursesRouter } from "./courses.routes";
import { enrollmentsRouter } from "./enrollments.routes";
import { healthRouter } from "./health.routes";
import { instructorRouter } from "./instructor.routes";
import { lessonsRouter } from "./lessons.routes";
import { modulesRouter } from "./modules.routes";
import { usersRouter } from "./users.routes";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/courses", coursesRouter);
apiRouter.use("/modules", modulesRouter);
apiRouter.use("/lessons", lessonsRouter);
apiRouter.use("/enrollments", enrollmentsRouter);
apiRouter.use("/assignments", assignmentsRouter);
apiRouter.use("/assignment-submissions", assignmentSubmissionsRouter);
apiRouter.use("/instructor", instructorRouter);
