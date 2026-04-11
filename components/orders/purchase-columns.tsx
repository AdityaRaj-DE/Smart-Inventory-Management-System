"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  approvePurchaseOrder,
  completePurchaseOrder,
} from "@/services/purchase-orders";

export const purchaseColumns: ColumnDef<any>[] = [
  {
    header: "Order ID",
    accessorKey: "id",
  },
  {
    header: "Supplier",
    cell: ({ row }) => row.original.supplier?.name,
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Amount",
    cell: ({ row }) => `₹${row.original.totalAmount || 0}`,
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;

      const approve = async () => {
        await approvePurchaseOrder(id);
        location.reload();
      };

      const complete = async () => {
        await completePurchaseOrder(id);
        location.reload();
      };

      return (
        <div className="flex gap-3">

          {row.original.status === "PENDING" && (
            <button
              onClick={approve}
              className="text-blue-600"
            >
              Approve
            </button>
          )}

          {row.original.status === "CONFIRMED" && (
            <button
              onClick={complete}
              className="text-green-600"
            >
              Complete
            </button>
          )}

        </div>
      );
    },
  },
];