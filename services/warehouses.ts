import { apiFetch } from "@/lib/api";

export const getWarehouses = async () =>{
    const res = await apiFetch("/api/warehouses");
    return res.data;
}

export const createWarehouse = (data:any) =>
  apiFetch("/api/warehouses",{
    method:"POST",
    body:JSON.stringify(data)
  });

export const updateWarehouse = (id:string,data:any)=>
  apiFetch(`/api/warehouses/${id}`,{
    method:"PATCH",
    body:JSON.stringify(data)
  });

export const deleteWarehouse = (id:string)=>
  apiFetch(`/api/warehouses/${id}`,{
    method:"DELETE"
  });