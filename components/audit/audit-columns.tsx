"use client";

import { ColumnDef } from "@tanstack/react-table";

export const auditColumns: ColumnDef<any>[] = [
  {
    header: "Time",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleString(),
  },
  {
    header: "User",
    cell: ({ row }) => row.original.user?.name,
  },
  {
    header: "Action",
    accessorKey: "action",
  },
  {
    header: "Entity",
    accessorKey: "entity",
  },
  {
    header: "Entity ID",
    accessorKey: "entityId",
  },
];