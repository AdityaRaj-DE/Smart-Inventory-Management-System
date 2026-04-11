"use client";

import { ColumnDef } from "@tanstack/react-table";
import { deactivateUser } from "@/services/users";

export const userColumns: ColumnDef<any>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Active",
    cell: ({ row }) => (row.original.isActive ? "Yes" : "No"),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;

      const deactivate = async () => {
        if (!confirm("Deactivate user?")) return;
        await deactivateUser(id);
        location.reload();
      };

      return (
        <button
          onClick={deactivate}
          className="text-red-600"
        >
          Deactivate
        </button>
      );
    },
  },
];