import { apiFetch } from "@/lib/api";

export const getMovements = async () =>{
  const res = await apiFetch("/api/stock-movements");
  return res.data;
}