"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";
import { globalSearch } from "@/services/search";
import { Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/services/notifications";

export default function Header() {
    const logout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        window.location.href = "/login";
    };
    const { data } = useQuery({
        queryKey: ["alerts"],
        queryFn: getNotifications
    });
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const search = async (q: string) => {
        setQuery(q);

        if (!q) return setResults([]);

        const data = await globalSearch(q);
        setResults(data);
    };
    return (
        <header className="h-16 border-b bg-white flex items-center justify-between px-6">
            <h2 className="text-lg font-semibold">
                Inventory Dashboard
            </h2>
            <div className="relative">
                <Bell />

                {data?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded">
                        {data.length}
                    </span>
                )}
            </div>
            <input
                value={query}
                onChange={(e) => search(e.target.value)}
                placeholder="Search products, orders..."
                className="border rounded px-3 py-1"
            />
            {results.length > 0 && (
                <div className="absolute bg-white border rounded mt-1 w-72 shadow">
                    {results.map((r, i) => (
                        <div key={i} className="p-2 hover:bg-gray-100">
                            {r.name || r.id}
                        </div>
                    ))}
                </div>
            )}
            <button
                onClick={logout}
                className="flex items-center gap-2 text-red-500"
            >
                <LogOut size={18} />
                Logout
            </button>
        </header>
    );
}