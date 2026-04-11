"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import DataTable from "@/components/tables/data-table";
import { warehouseColumns } from "@/components/warehouses/warehouse-columns";
import { getWarehouses, createWarehouse } from "@/services/warehouses";
import { useQuery } from "@tanstack/react-query";
import RoleGuard from "@/components/auth/RoleGuard";
import { useState } from "react";

export default function WarehousesPage() {

    const { data, isLoading } = useQuery({
        queryKey: ["warehouses"],
        queryFn: getWarehouses
    });

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    const create = async () => {
        await createWarehouse({ name, location });
        location.reload();
    };

    return (

        <RoleGuard allowedRoles={["ADMIN"]}>

            <DashboardLayout>

                <h1 className="text-2xl font-bold mb-6">
                    Warehouses
                </h1>

                <div className="flex gap-3 mb-6">

                    <input
                        placeholder="Name"
                        className="border p-2"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        placeholder="Location"
                        className="border p-2"
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <button
                        onClick={create}
                        className="bg-teal-600 text-white px-4 rounded"
                    >
                        Add
                    </button>

                </div>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <DataTable
                        columns={warehouseColumns}
                        data={data}
                    />
                )}

            </DashboardLayout>

        </RoleGuard>

    )
}