import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import {
  getSupplierPerformance,
  getStockMovementTrend
} from "@/services/analyticsService";

export async function GET() {
  await requireAuth();

  const [suppliers, stockTrend] = await Promise.all([
    getSupplierPerformance(),
    getStockMovementTrend()
  ]);

  return NextResponse.json({
    success: true,
    data: {
      supplierPerformance: suppliers,
      stockMovementTrend: stockTrend
    }
  });
}