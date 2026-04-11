"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { useQuery } from "@tanstack/react-query";
import { getMovements } from "@/services/movements";

export default function StockMovementsPage() {

    const { data, isLoading } = useQuery({
        queryKey: ["movements"],
        queryFn: getMovements
    });

    if (isLoading) return <p>Loading...</p>

    return (
        <DashboardLayout>

            <h1 className="text-2xl font-bold mb-6">
                Stock Movement Timeline
            </h1>

            <div className="space-y-4">

                {data.map((m: any) => (
                    <div key={m.id} className="bg-white p-4 rounded shadow">

                        <p className="font-semibold">
                            {m.product.name}
                        </p>

                        <p className="text-sm text-gray-600">
                            {m.type} • {m.quantity}
                        </p>

                        <p className="text-xs text-gray-500">
                            {new Date(m.createdAt).toLocaleString()}
                        </p>

                    </div>
                ))}

            </div>

        </DashboardLayout>
    )
}