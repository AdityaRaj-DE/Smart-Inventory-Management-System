"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import DataTable from "@/components/tables/data-table";
import { userColumns } from "@/components/users/user-columns";
import { getUsers, createUser } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import RoleGuard from "@/components/auth/RoleGuard";

export default function UsersPage() {

  const { data = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const create = async () => {
    await createUser({
      name,
      email,
      password,
      role: "MANAGER",
    });

    location.reload();
  };

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>

      <DashboardLayout>

        <h1 className="text-2xl font-bold mb-6">
          Users
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

          <input
            placeholder="Password"
            className="border p-2"
            onChange={(e) => setPassword(e.target.value)}
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
            columns={userColumns}
            data={data}
          />
        )}

      </DashboardLayout>

    </RoleGuard>
  );
}