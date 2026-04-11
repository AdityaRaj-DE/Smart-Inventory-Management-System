import { apiFetch } from "@/lib/api";

export const getProducts = async () =>{
  const res = await apiFetch("/api/products");
  return res.data;
}

export const getProduct = async (id: string) =>{
  const res = await apiFetch(`/api/products/${id}`);
  return res.data;
}

export const createProduct = (data: any) =>
  apiFetch("/api/products", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateProduct = (id: string, data: any) =>
  apiFetch(`/api/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteProduct = (id: string) =>
  apiFetch(`/api/products/${id}`, {
    method: "DELETE",
  });

export const getProductVariants = (id: string) =>
  apiFetch(`/api/products/${id}/variants`);