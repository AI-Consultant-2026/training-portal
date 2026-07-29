import { Enrollment } from "../types/api";
import { axiosClient } from "./axiosClient";

export async function fetchMyEnrollments(): Promise<Enrollment[]> {
  const res = await axiosClient.get<{ enrollments: Enrollment[] }>("/enrollments");
  return res.data.enrollments;
}

export async function enrollInCourse(courseId: string): Promise<Enrollment> {
  const res = await axiosClient.post<{ enrollment: Enrollment }>(`/courses/${courseId}/enroll`);
  return res.data.enrollment;
}
