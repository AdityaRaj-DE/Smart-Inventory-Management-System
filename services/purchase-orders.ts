import { apiFetch } from "@/lib/api";

export const getPurchaseOrders = async () =>{
  const res = await apiFetch("/api/purchase-orders");
  return res.data;
}

export const getPurchaseOrder = async (id: string) =>{
  const res = await apiFetch(`/api/purchase-orders/${id}`);
  return res.data;
}

export const createPurchaseOrder = (data: any) =>
  apiFetch("/api/purchase-orders", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const approvePurchaseOrder = (id: string) =>
  apiFetch(`/api/purchase-orders/${id}/approve`, {
    method: "PATCH",
  });

export const completePurchaseOrder = (id: string) =>
  apiFetch(`/api/purchase-orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status: "COMPLETED" }),
  });