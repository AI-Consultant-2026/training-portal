import { Course, CourseModule, CourseProgress } from "../types/api";
import { axiosClient } from "./axiosClient";

export async function fetchCourses(): Promise<Course[]> {
  const res = await axiosClient.get<{ courses: Course[] }>("/courses");
  return res.data.courses;
}

export async function fetchCourseBySlug(slug: string): Promise<Course> {
  const res = await axiosClient.get<{ course: Course }>(`/courses/${slug}`);
  return res.data.course;
}

export async function fetchModulesForCourse(courseId: string): Promise<CourseModule[]> {
  const res = await axiosClient.get<{ modules: CourseModule[] }>(`/courses/${courseId}/modules`);
  return res.data.modules;
}

export async function fetchCourseProgress(courseId: string): Promise<CourseProgress> {
  const res = await axiosClient.get<CourseProgress>(`/courses/${courseId}/progress`);
  return res.data;
}
