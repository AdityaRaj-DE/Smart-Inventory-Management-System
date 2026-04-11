"use client";

import { ColumnDef } from "@tanstack/react-table";
import { deleteCustomer } from "@/services/customers";
import Link from "next/link";

export const customerColumns: ColumnDef<any>[] = [
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
        if (!confirm("Delete customer?")) return;
        await deleteCustomer(id);
        location.reload();
      };

      return (
        <div className="flex gap-3">
          <Link href={`/customers/${id}`} className="text-blue-600">
            View
          </Link>

          <button onClick={remove} className="text-red-600">
            Delete
          </button>
        </div>
      );
    },
  },
];