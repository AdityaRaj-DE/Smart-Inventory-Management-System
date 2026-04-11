"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { getCustomerOrders } from "@/services/customers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function CustomerDetailPage() {

    const params = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ["customer-orders", params.id],
        queryFn: () => getCustomerOrders(params.id as string)
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <DashboardLayout>

            <h1 className="text-2xl font-bold mb-6">
                Customer Orders
            </h1>

            <div className="space-y-4">

                {data.map((o: any) => (
                    <div key={o.id} className="bg-white p-4 rounded shadow">

                        <p className="font-semibold">
                            Order {o.id}
                        </p>

                        <p>Status: {o.status}</p>

                        <p>Total: ₹{o.totalAmount}</p>

                    </div>
                ))}

            </div>

        </DashboardLayout>
    )
}