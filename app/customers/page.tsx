"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import DataTable from "@/components/tables/data-table";
import { customerColumns } from "@/components/customers/customer-columns";
import { getCustomers } from "@/services/customers";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function CustomersPage() {

  const { data, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  return (
    <DashboardLayout>

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>

        <Link
          href="/customers/create"
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Add Customer
        </Link>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={customerColumns} data={data} />
      )}

    </DashboardLayout>
  );
}