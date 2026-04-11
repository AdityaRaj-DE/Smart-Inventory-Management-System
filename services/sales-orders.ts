import { apiFetch } from "@/lib/api";

export const getSalesOrders = async () =>{
  const res = await apiFetch("/api/sales-orders");
  return res.data;
}

export const createSalesOrder = (data: any) =>
  apiFetch("/api/sales-orders", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateSalesStatus = (
  id: string,
  status: string
) =>
  apiFetch(`/api/sales-orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });