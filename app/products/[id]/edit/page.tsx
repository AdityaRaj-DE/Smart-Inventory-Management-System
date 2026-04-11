"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import ProductForm from "@/components/forms/product-form";
import { getProduct, updateProduct } from "@/services/products";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => getProduct(params.id as string),
  });

  if (isLoading) return <p>Loading...</p>;

  const handleUpdate = async (formData: any) => {
    await updateProduct(params.id as string, formData);

    router.push("/products");
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">
        Edit Product
      </h1>

      <ProductForm
        onSubmit={handleUpdate}
      />
    </DashboardLayout>
  );
}