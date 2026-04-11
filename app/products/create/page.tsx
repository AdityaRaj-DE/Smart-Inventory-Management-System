"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import ProductForm from "@/components/forms/product-form";
import { createProduct } from "@/services/products";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    await createProduct(data);

    router.push("/products");
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">
        Create Product
      </h1>

      <ProductForm onSubmit={handleCreate} />
    </DashboardLayout>
  );
}