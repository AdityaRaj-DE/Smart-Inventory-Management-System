"use client";

import { ColumnDef } from "@tanstack/react-table";
import { deleteCategory } from "@/services/categories";

export const categoryColumns: ColumnDef<any>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Actions",
    cell: ({ row }) => {

      const id = row.original.id;

      const remove = async () => {
        if (!confirm("Delete category?")) return;
        await deleteCategory(id);
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