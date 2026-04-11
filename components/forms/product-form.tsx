"use client";

import { useState } from "react";

export default function ProductForm({
  onSubmit,
  defaultValues = {},
}: {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}) {
  const [name, setName] = useState(defaultValues.name || "");
  const [sku, setSku] = useState(defaultValues.sku || "");
  const [price, setPrice] = useState(defaultValues.basePrice || "");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    onSubmit({
      name,
      sku,
      basePrice: Number(price),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg"
    >
      <input
        placeholder="Product name"
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="SKU"
        className="border p-2 w-full"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
      />

      <input
        placeholder="Price"
        type="number"
        className="border p-2 w-full"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button className="bg-teal-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
}