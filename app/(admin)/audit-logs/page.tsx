"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import DataTable from "@/components/tables/data-table";
import { auditColumns } from "@/components/audit/audit-columns";
import { getAuditLogs } from "@/services/auditLogs";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AuditDetail from "@/components/audit/audit-detail";
import RoleGuard from "@/components/auth/RoleGuard";

export default function AuditLogsPage() {

    const { data = [], isLoading } = useQuery({
        queryKey: ["auditLogs"],
        queryFn: () => getAuditLogs()
    });

    const [selected, setSelected] = useState<any>(null);

    return (

        <RoleGuard allowedRoles={["ADMIN"]}>

            <DashboardLayout>

                <h1 className="text-2xl font-bold mb-6">
                    Audit Logs
                </h1>

                <div className="grid grid-cols-2 gap-6">

                    <div>

                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <DataTable
                                columns={auditColumns}
                                data={data}
                                onRowClick={(row: any) => setSelected(row.original)}
                            />
                        )}

                    </div>

                    <div>

                        {selected && (
                            <AuditDetail log={selected} />
                        )}

                    </div>

                </div>

            </DashboardLayout>

        </RoleGuard>

    )
}