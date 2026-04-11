"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { getDashboardAnalytics } from "@/services/analytics";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardAnalytics,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <DashboardLayout>

      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">
            Total Products
          </p>
          <p className="text-2xl font-bold">
            {data.totalProducts}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">
            Revenue
          </p>
          <p className="text-2xl font-bold">
            ₹{data.revenue}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">
            Inventory Units
          </p>
          <p className="text-2xl font-bold">
            {data.inventoryUnits}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">
            Sales Orders
          </p>
          <p className="text-2xl font-bold">
            {data.totalSalesOrders}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">
            Purchase Orders
          </p>
          <p className="text-2xl font-bold">
            {data.totalPurchaseOrders}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">
            Low Stock
          </p>
          <p className="text-2xl font-bold text-red-600">
            {data.lowStockCount}
          </p>
        </div>

      </div>

    </DashboardLayout>
  );
}