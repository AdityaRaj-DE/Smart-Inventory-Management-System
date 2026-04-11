"use client";

import { ColumnDef } from "@tanstack/react-table";
import { deleteSupplier } from "@/services/suppliers";

export const supplierColumns: ColumnDef<any>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;

      const remove = async () => {
        if (!confirm("Delete supplier?")) return;
        await deleteSupplier(id);
        location.reload();
      };

      return (
        <button
          onClick={remove}
          className="text-red-600"
        >
          Delete
        </button>
      );
    },
  },
];