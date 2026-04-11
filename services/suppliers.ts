import { apiFetch } from "@/lib/api";

export const getSuppliers = async () => {
  const res = await apiFetch("/api/suppliers");
  return res.data;
};

export const createSupplier = (data: any) =>
  apiFetch("/api/suppliers", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateSupplier = (id: string, data: any) =>
  apiFetch(`/api/suppliers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteSupplier = (id: string) =>
  apiFetch(`/api/suppliers/${id}`, {
    method: "DELETE",
  });