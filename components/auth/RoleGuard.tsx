"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleGuard({
  children,
  allowedRoles,
}: any) {

  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {

    if (!role) return;

    if (!allowedRoles.includes(role)) {
      router.push("/dashboard");
    }

  }, [role]);

  return children;
}