"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import DataTable from "@/components/tables/data-table";
import { supplierColumns } from "@/components/suppliers/supplier-columns";
import { getSuppliers, createSupplier } from "@/services/suppliers";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import RoleGuard from "@/components/auth/RoleGuard";

export default function SuppliersPage() {

  const { data = [], isLoading } = useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const create = async () => {
    await createSupplier({
      name,
      email,
    });

    location.reload();
  };

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>

      <DashboardLayout>

        <h1 className="text-2xl font-bold mb-6">
          Suppliers
        </h1>

        <div className="flex gap-3 mb-6">

          <input
            placeholder="Name"
            className="border p-2"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            className="border p-2"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={create}
            className="bg-teal-600 text-white px-4 rounded"
          >
            Create
          </button>

        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <DataTable
            columns={supplierColumns}
            data={data}
          />
        )}

      </DashboardLayout>

    </RoleGuard>
  );
}