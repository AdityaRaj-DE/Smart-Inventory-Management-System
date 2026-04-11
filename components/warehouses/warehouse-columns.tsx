"use client";

import { ColumnDef } from "@tanstack/react-table";
import { deleteWarehouse } from "@/services/warehouses";

export const warehouseColumns: ColumnDef<any>[] = [
    {
        header: "Name",
        accessorKey: "name"
    },
    {
        header: "Location",
        accessorKey: "location"
    },
    {
        header: "Actions",
        cell: ({ row }) => {

            const id = row.original.id;

            const remove = async () => {
                if (!confirm("Delete warehouse?")) return;

                await deleteWarehouse(id);
                location.reload();
            };

            return (
                <button
                    onClick={remove}
                    className="text-red-600"
                >
                    Delete
                </button>
            )
        }
    }
];