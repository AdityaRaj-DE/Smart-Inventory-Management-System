"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import DataTable from "@/components/tables/data-table";
import { inventoryColumns } from "@/components/inventory/inventory-columns";
import { getInventory } from "@/services/inventory";
import { useQuery } from "@tanstack/react-query";

export default function InventoryPage() {

  const { data, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventory,
  });

  return (
    <DashboardLayout>

      <h1 className="text-2xl font-bold mb-6">
        Inventory
      </h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DataTable
          columns={inventoryColumns}
          data={data}
        />
      )}

    </DashboardLayout>
  );
}