import { apiFetch } from "@/lib/api";

export const getUsers = async () => {
  const res = await apiFetch("/api/users");
  return res.data;
};

export const createUser = (data: any) =>
  apiFetch("/api/users", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateUser = (id: string, data: any) =>
  apiFetch(`/api/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deactivateUser = (id: string) =>
  apiFetch(`/api/users/${id}`, {
    method: "DELETE",
  });