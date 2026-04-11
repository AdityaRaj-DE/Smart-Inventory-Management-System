"use client";

import { ColumnDef } from "@tanstack/react-table";
import { deleteVariant } from "@/services/variants";

export const variantColumns: ColumnDef<any>[] = [
  {
    header: "SKU",
    accessorKey: "sku",
  },
  {
    header: "Attributes",
    cell: ({ row }) =>
      JSON.stringify(row.original.attributes),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;

      const remove = async () => {
        if (!confirm("Delete variant?")) return;
        await deleteVariant(id);
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