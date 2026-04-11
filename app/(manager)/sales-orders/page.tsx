"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import DataTable from "@/components/tables/data-table";
import { getSalesOrders } from "@/services/sales-orders";
import { useQuery } from "@tanstack/react-query";

type SalesOrder = {
  id: string;
  status: string;
  totalAmount: number;
};

export default function SalesOrdersPage() {

  const { data, isLoading } = useQuery<SalesOrder[]>({
    queryKey: ["sales-orders"],
    queryFn: getSalesOrders,
  });

  return (
    <DashboardLayout>

      <h1 className="text-2xl font-bold mb-6">
        Sales Orders
      </h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DataTable<SalesOrder>
          columns={[
            { header: "ID", accessorKey: "id" },
            { header: "Status", accessorKey: "status" },
            {
              header: "Amount",
              cell: ({ row }) =>
                `₹${row.original.totalAmount || 0}`,
            },
          ]}
          data={data ?? []}
        />
      )}

    </DashboardLayout>
  );
}