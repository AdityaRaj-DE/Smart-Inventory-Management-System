import { apiFetch } from "@/lib/api";

export const getVariants = async (productId: string) => {
  const res = await apiFetch(`/api/products/${productId}/variants`);
  return res.data;
};

export const createVariant = (productId: string, data: any) =>
  apiFetch(`/api/products/${productId}/variants`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateVariant = (variantId: string, data: any) =>
  apiFetch(`/api/products/variants/${variantId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteVariant = (variantId: string) =>
  apiFetch(`/api/products/variants/${variantId}`, {
    method: "DELETE",
  });