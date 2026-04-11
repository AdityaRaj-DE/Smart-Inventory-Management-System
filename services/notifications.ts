import { apiFetch } from "@/lib/api";

export const getNotifications = async () =>{
  const res = await apiFetch("/api/inventory/alerts/low-stock");
  return res.data;
}