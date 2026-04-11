"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { downloadBackup, restoreBackup } from "@/services/admin";
import RoleGuard from "@/components/auth/RoleGuard";
import { useState } from "react";

export default function BackupPage() {

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBackup = async () => {
    try {
      setLoading(true);
      await downloadBackup();
      alert("Backup downloaded");
    } catch {
      alert("Backup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {

    if (!file) {
      alert("Select a zip file");
      return;
    }

    try {
      setLoading(true);
      await restoreBackup(file);
      alert("Database restored successfully");
    } catch {
      alert("Restore failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>

      <DashboardLayout>

        <h1 className="text-2xl font-bold mb-6">
          Database Backup & Restore
        </h1>

        <div className="grid grid-cols-2 gap-6">

          {/* Backup Section */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-semibold mb-3">
              Backup Database
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Download a full backup of the database.
            </p>

            <button
              onClick={handleBackup}
              disabled={loading}
              className="bg-teal-600 text-white px-4 py-2 rounded"
            >
              Download Backup
            </button>

          </div>

          {/* Restore Section */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-semibold mb-3">
              Restore Database
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Upload a backup ZIP file to restore.
            </p>

            <input
              type="file"
              accept=".zip"
              onChange={(e) =>
                setFile(e.target.files?.[0] || null)
              }
              className="mb-4"
            />

            <button
              onClick={handleRestore}
              disabled={loading}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Restore Database
            </button>

          </div>

        </div>

      </DashboardLayout>

    </RoleGuard>
  );
}