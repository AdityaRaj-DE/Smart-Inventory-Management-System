import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import {
  getTopSellingProducts,
  getDeadStock
} from "@/services/analyticsService";

export async function GET() {
  await requireAuth();

  const [topSelling, deadStock] = await Promise.all([
    getTopSellingProducts(),
    getDeadStock()
  ]);

  return NextResponse.json({
    success: true,
    data: {
      topSellingProducts: topSelling,
      deadStock
    }
  });
}