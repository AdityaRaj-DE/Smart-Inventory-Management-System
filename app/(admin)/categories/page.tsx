"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import DataTable from "@/components/tables/data-table";
import { categoryColumns } from "@/components/categories/category-columns";
import { getCategories, createCategory } from "@/services/categories";
import { useQuery } from "@tanstack/react-query";
import RoleGuard from "@/components/auth/RoleGuard";
import { useState } from "react";

export default function CategoriesPage() {

    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories
    });

    const [name, setName] = useState("");

    const create = async () => {
        await createCategory({ name });
        location.reload();
    };

    return (

        <RoleGuard allowedRoles={["ADMIN"]}>

            <DashboardLayout>

                <h1 className="text-2xl font-bold mb-6">
                    Categories
                </h1>

                <div className="mb-6 flex gap-3">

                    <input
                        placeholder="Category name"
                        className="border p-2 rounded"
                        onChange={(e) => setName(e.target.value)}
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
                        columns={categoryColumns}
                        data={data}
                    />
                )}

            </DashboardLayout>

        </RoleGuard>

    )
}