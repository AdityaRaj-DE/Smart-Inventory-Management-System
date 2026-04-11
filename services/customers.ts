import { apiFetch } from "@/lib/api";

export const getCustomers = async () =>{
  const res = await apiFetch("/api/customers");
  return res.data;
}

export const createCustomer = (data: any) =>
  apiFetch("/api/customers", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateCustomer = (id: string, data: any) =>
  apiFetch(`/api/customers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteCustomer = (id: string) =>
  apiFetch(`/api/customers/${id}`, {
    method: "DELETE",
  });

export const getCustomerOrders = async (id: string) =>{
  const res = await apiFetch(`/api/customers/${id}/orders`);
  return res.data;
}