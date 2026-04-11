import { apiFetch } from "@/lib/api";

export const globalSearch = async (query: string) =>{
  const res = await apiFetch(`/api/search?q=${query}`);
  return res.data;
}