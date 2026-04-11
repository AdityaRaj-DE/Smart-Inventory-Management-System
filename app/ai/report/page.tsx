"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { generateAIReport } from "@/services/ai";

export default function AIReportPage() {

  const generate = async () => {

    const blob = await generateAIReport();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory-report.pdf";
    a.click();
  };

  return (
    <DashboardLayout>

      <h1 className="text-2xl font-bold mb-6">
        AI Inventory Report
      </h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-lg">

        <p className="mb-4 text-gray-600">
          Generate a full AI analysis report of your inventory.
        </p>

        <button
          onClick={generate}
          className="bg-teal-600 text-white px-5 py-2 rounded"
        >
          Generate PDF Report
        </button>

      </div>

    </DashboardLayout>
  );
}