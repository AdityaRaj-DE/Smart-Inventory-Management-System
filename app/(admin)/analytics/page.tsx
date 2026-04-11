"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import {
  getSalesAnalytics,
  getProductAnalytics,
  getSupplierAnalytics
} from "@/services/analytics";

import { useQuery } from "@tanstack/react-query";
import RevenueChart from "@/components/analytics/revenue-chart";
import RoleGuard from "@/components/auth/RoleGuard";

export default function AnalyticsPage() {

  const sales = useQuery({
    queryKey: ["sales-analytics"],
    queryFn: getSalesAnalytics
  });

  const products = useQuery({
    queryKey: ["product-analytics"],
    queryFn: getProductAnalytics
  });

  const suppliers = useQuery({
    queryKey: ["supplier-analytics"],
    queryFn: getSupplierAnalytics
  });

  return (

    <RoleGuard allowedRoles={["ADMIN"]}>

      <DashboardLayout>

        <h1 className="text-2xl font-bold mb-6">
          Analytics Dashboard
        </h1>

        <div className="grid grid-cols-2 gap-6">

          {sales.data && (
            <RevenueChart
              data={sales.data.revenueTrend}
            />
          )}

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-semibold mb-4">
              Top Selling Products
            </h2>

            <div className="space-y-2">

              {products.data?.topSellingProducts?.map((p:any)=>(
                <div
                  key={p.id}
                  className="flex justify-between border-b pb-1"
                >
                  <span>{p.name}</span>
                  <span>{p.sales}</span>
                </div>
              ))}

            </div>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-semibold mb-4">
              Supplier Performance
            </h2>

            <div className="space-y-2">

              {suppliers.data?.supplierPerformance?.map((s:any)=>(
                <div
                  key={s.id}
                  className="flex justify-between border-b pb-1"
                >
                  <span>{s.name}</span>
                  <span>{s.orders} orders</span>
                </div>
              ))}

            </div>

          </div>

        </div>

      </DashboardLayout>

    </RoleGuard>
  );
}