import { axiosClient } from "./axiosClient";

export interface ProblemReport {
  message: string;
  phone?: string;
  screenshot?: File | null;
}

// Sends an in-portal problem report to support. Name, email, device and browser are
// filled in on the server from the logged-in account and the request itself.
export async function reportProblem(report: ProblemReport): Promise<void> {
  const form = new FormData();
  form.append("message", report.message);
  if (report.phone) form.append("phone", report.phone);
  form.append("pageUrl", window.location.href);
  form.append("viewport", `${window.innerWidth}x${window.innerHeight}`);
  if (report.screenshot) form.append("screenshot", report.screenshot);
  await axiosClient.post("/support/report", form);
}
