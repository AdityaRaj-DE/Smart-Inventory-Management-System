"use client";

import { useQuery } from "@tanstack/react-query";
import { getVariants, createVariant } from "@/services/variants";
import DataTable from "@/components/tables/data-table";
import { variantColumns } from "./variant-columns";
import { useState } from "react";

export default function VariantSection({ productId }: any) {

  const { data = [], isLoading } = useQuery({
    queryKey: ["variants", productId],
    queryFn: () => getVariants(productId),
  });

  const [sku, setSku] = useState("");
  const [attributes, setAttributes] = useState("");

  const create = async () => {

    await createVariant(productId, {
      sku,
      attributes: JSON.parse(attributes),
    });

    location.reload();
  };

  return (
    <div className="mt-8">

      <h2 className="text-lg font-semibold mb-4">
        Product Variants
      </h2>

      <div className="flex gap-3 mb-4">

        <input
          placeholder="SKU"
          className="border p-2"
          onChange={(e) => setSku(e.target.value)}
        />

        <input
          placeholder='Attributes JSON {"size":"M"}'
          className="border p-2"
          onChange={(e) => setAttributes(e.target.value)}
        />

        <button
          onClick={create}
          className="bg-teal-600 text-white px-4 rounded"
        >
          Add Variant
        </button>

      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DataTable
          columns={variantColumns}
          data={data}
        />
      )}

    </div>
  );
}