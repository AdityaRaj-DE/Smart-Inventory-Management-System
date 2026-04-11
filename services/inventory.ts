import { apiFetch } from "@/lib/api";

export const getInventory = async () =>{
  const res = await apiFetch("/api/inventory");
  return res.data;
}

export const adjustInventory = (data: any) =>
  apiFetch("/api/inventory/adjust", {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const damageInventory = (data: any) =>
  apiFetch("/api/inventory/damage", {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const returnInventory = (data: any) =>
  apiFetch("/api/inventory/return", {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const getLowStock = () =>
  apiFetch("/api/inventory/alerts/low-stock");