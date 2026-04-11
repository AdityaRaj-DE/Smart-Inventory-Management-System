"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { getLowStock } from "@/services/inventory";
import { useQuery } from "@tanstack/react-query";

export default function LowStockPage() {

  const { data, isLoading } = useQuery({
    queryKey: ["low-stock"],
    queryFn: getLowStock,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <DashboardLayout>

      <h1 className="text-2xl font-bold mb-6">
        Low Stock Alerts
      </h1>

      {data.map((item: any) => (
        <div
          key={item.id}
          className="p-4 bg-red-50 border border-red-200 rounded mb-3"
        >
          {item.product.name} — {item.quantity} left
        </div>
      ))}

    </DashboardLayout>
  );
}