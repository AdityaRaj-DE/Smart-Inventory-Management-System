import { apiFetch } from "@/lib/api";

export const getCategories = async () =>{
  const res = await apiFetch("/api/categories");
  return res.data;
}

export const createCategory = (data: any) =>
  apiFetch("/api/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateCategory = (id: string, data: any) =>
  apiFetch(`/api/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteCategory = (id: string) =>
  apiFetch(`/api/categories/${id}`, {
    method: "DELETE",
  });