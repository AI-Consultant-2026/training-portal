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

// The certificate endpoint requires the JWT bearer token, so a plain <a href> won't work -
// fetch it as a blob through the authenticated client and trigger the browser download ourselves
// (same pattern as downloadSubmissionFile in assignments.api.ts / capstones.api.ts).
export async function downloadCertificate(enrollmentId: string, courseTitle: string): Promise<void> {
  const res = await axiosClient.get(`/enrollments/${enrollmentId}/certificate`, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(res.data as Blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${courseTitle.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "")}-certificate.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

// Same blob-download pattern as downloadCertificate -- unlike the certificate, this is
// available any time after payment is confirmed, not just once the course is completed.
export async function downloadAttendanceRecord(enrollmentId: string, courseTitle: string): Promise<void> {
  const res = await axiosClient.get(`/enrollments/${enrollmentId}/attendance-record`, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(res.data as Blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${courseTitle.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "")}-attendance-record.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
