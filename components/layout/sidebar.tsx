"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Boxes,
  Warehouse,
  ShoppingCart,
  Users,
  BarChart,
  Building,
  Database,
} from "lucide-react";

export default function Sidebar() {

  const { role } = useAuth();

  const commonLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/products", icon: Boxes },
    { name: "Inventory", href: "/inventory", icon: Warehouse },
    { name: "Sales Orders", href: "/sales-orders", icon: ShoppingCart },
    { name: "Customers", href: "/customers", icon: Users },
  ];

  const managerLinks = [
    { name: "Purchase Orders", href: "/purchase-orders", icon: ShoppingCart },
  ];

  const adminLinks = [
    { name: "Users", href: "/users", icon: Users },
    { name: "Suppliers", href: "/suppliers", icon: Building },
    { name: "Warehouses", href: "/warehouses", icon: Warehouse },
    { name: "Categories", href: "/categories", icon: Boxes },
    { name: "Analytics", href: "/analytics", icon: BarChart },
    { name: "DB Backup", href: "/admin/backup", icon: Database },
  ];

  const links = [
    ...commonLinks,
    ...(role === "MANAGER" ? managerLinks : []),
    ...(role === "ADMIN" ? adminLinks : []),
  ];

  return (
    <aside className="w-64 bg-white border-r h-screen p-5">

      <h1 className="text-xl font-bold mb-8">
        InventoryOS
      </h1>

      <nav className="flex flex-col gap-2">

        {links.map((link) => {

          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}