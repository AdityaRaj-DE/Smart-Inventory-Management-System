"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Inventory } from "@/types/inventory";
import {
  adjustInventory,
  damageInventory,
  returnInventory,
} from "@/services/inventory";

export const inventoryColumns: ColumnDef<Inventory>[] = [
  {
    header: "Product",
    cell: ({ row }) => row.original.product.name,
  },
  {
    header: "SKU",
    cell: ({ row }) => row.original.product.sku,
  },
  {
    header: "Warehouse",
    cell: ({ row }) => row.original.warehouse.name,
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Reserved",
    accessorKey: "reservedQty",
  },
  {
    header: "Damaged",
    accessorKey: "damagedQty",
  },

  {
    header: "Actions",
    cell: ({ row }) => {
      const inv = row.original;

      const adjust = async () => {
        const qty = prompt("Enter adjustment quantity");
        if (!qty) return;

        await adjustInventory({
          productId: inv.product.id,
          warehouseId: inv.warehouse.id,
          quantity: Number(qty),
        });

        location.reload();
      };

      const damage = async () => {
        const qty = prompt("Damaged quantity");
        if (!qty) return;

        await damageInventory({
          productId: inv.product.id,
          warehouseId: inv.warehouse.id,
          quantity: Number(qty),
        });

        location.reload();
      };

      const returnStock = async () => {
        const qty = prompt("Return quantity");
        if (!qty) return;

        await returnInventory({
          productId: inv.product.id,
          warehouseId: inv.warehouse.id,
          quantity: Number(qty),
        });

        location.reload();
      };

      return (
        <div className="flex gap-3">

          <button
            onClick={adjust}
            className="text-blue-600"
          >
            Adjust
          </button>

          <button
            onClick={damage}
            className="text-red-600"
          >
            Damage
          </button>

          <button
            onClick={returnStock}
            className="text-green-600"
          >
            Return
          </button>

        </div>
      );
    },
  },
];