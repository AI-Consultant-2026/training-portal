import { axiosClient } from "./axiosClient";

export async function sendHeartbeat(): Promise<void> {
  await axiosClient.patch("/users/me/heartbeat");
}
