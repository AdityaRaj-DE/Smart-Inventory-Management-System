"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import DataTable from "@/components/tables/data-table";
import { purchaseColumns } from "@/components/orders/purchase-columns";
import { getPurchaseOrders } from "@/services/purchase-orders";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function PurchaseOrdersPage() {

  const { data, isLoading } = useQuery({
    queryKey: ["purchase-orders"],
    queryFn: getPurchaseOrders,
  });

  return (
    <DashboardLayout>

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Purchase Orders
        </h1>

        <Link
          href="/purchase-orders/create"
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Create Order
        </Link>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DataTable
          columns={purchaseColumns}
          data={data}
        />
      )}

    </DashboardLayout>
  );
}