import { config } from "../config";

export function formatEnrolmentDeadline(): string {
  return new Date(config.enrolment.nextDeadline).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
