import { AdminStats } from "../types/api";
import { axiosClient } from "./axiosClient";

export async function fetchAdminStats(): Promise<AdminStats> {
  const res = await axiosClient.get<{ stats: AdminStats }>("/admin/stats");
  return res.data.stats;
}
