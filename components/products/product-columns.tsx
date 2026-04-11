"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/product";
import Link from "next/link";
import { deleteProduct } from "@/services/products";

export const productColumns: ColumnDef<Product>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "SKU",
    accessorKey: "sku",
  },
  {
    header: "Category",
    cell: ({ row }) => row.original.category?.name,
  },
  {
    header: "Supplier",
    cell: ({ row }) => row.original.supplier?.name || "—",
  },
  {
    header: "Price",
    cell: ({ row }) => `₹${row.original.basePrice}`,
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;

      const handleDelete = async () => {
        if (!confirm("Delete product?")) return;
        await deleteProduct(id);
        window.location.reload();
      };

      return (
        <div className="flex gap-3">
          <Link
            href={`/products/${id}`}
            className="text-blue-600"
          >
            View
          </Link>

          <Link
            href={`/products/${id}/edit`}
            className="text-green-600"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      );
    },
  },
];