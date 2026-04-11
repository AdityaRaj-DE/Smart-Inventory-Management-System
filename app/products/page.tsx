"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import DataTable from "@/components/tables/data-table";
import { productColumns } from "@/components/products/product-columns";
import { getProducts } from "@/services/products";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function ProductsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <DashboardLayout>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Products
        </h1>

        <Link
          href="/products/create"
          className="bg-teal-600 text-white px-4 py-2 rounded-lg"
        >
          Add Product
        </Link>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={productColumns} data={data} />
      )}
    </DashboardLayout>
  );
}