import { apiFetch } from "@/lib/api";

export const getAuditLogs = async (filters: any = {}) => {
  const params = new URLSearchParams(filters).toString();

  const res = await apiFetch(`/api/audit-logs?${params}`);

  return res.data;
};

export const getAuditLog = async (id: string) => {
  const res = await apiFetch(`/api/audit-logs/${id}`);
  return res.data;
};