"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { getProduct } from "@/services/products";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import VariantSection from "@/components/products/variant-section";

export default function ProductDetailPage() {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => getProduct(params.id as string),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">
        {data.name}
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-3">
            Product Info
          </h2>

          <p>SKU: {data.sku}</p>
          <p>Price: ₹{data.basePrice}</p>
          <p>Category: {data.category?.name}</p>
          <p>Supplier: {data.supplier?.name || "—"}</p>
        </div>
        <VariantSection productId={params.id} />
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-3">
            Inventory
          </h2>

          {data.inventories?.map((inv: any) => (
            <div key={inv.id}>
              {inv.warehouse?.name} → {inv.quantity}
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}