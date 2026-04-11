"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { createPurchaseOrder } from "@/services/purchase-orders";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePurchaseOrder() {

  const router = useRouter();

  const [supplierId, setSupplierId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const create = async () => {

    await createPurchaseOrder({
      supplierId,
      items: [
        {
          productId,
          quantity: Number(quantity),
          price: 0,
        },
      ],
    });

    router.push("/purchase-orders");
  };

  return (
    <DashboardLayout>

      <h1 className="text-2xl font-bold mb-6">
        Create Purchase Order
      </h1>

      <div className="space-y-4 max-w-lg">

        <input
          placeholder="Supplier ID"
          className="border p-2 w-full"
          onChange={(e) => setSupplierId(e.target.value)}
        />

        <input
          placeholder="Product ID"
          className="border p-2 w-full"
          onChange={(e) => setProductId(e.target.value)}
        />

        <input
          placeholder="Quantity"
          type="number"
          className="border p-2 w-full"
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button
          onClick={create}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Create Order
        </button>

      </div>

    </DashboardLayout>
  );
}