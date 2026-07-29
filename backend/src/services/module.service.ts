import { CourseModule } from "../models";
import { ApiError } from "../utils/ApiError";

export async function listPublishedModulesForCourse(courseId: string): Promise<CourseModule[]> {
  return CourseModule.findAll({
    where: { courseId, status: "published" },
    order: [["order", "ASC"]],
  });
}

export async function getModuleById(id: string): Promise<CourseModule> {
  const courseModule = await CourseModule.findByPk(id);
  if (!courseModule) {
    throw ApiError.notFound("Module not found");
  }
  return courseModule;
}
