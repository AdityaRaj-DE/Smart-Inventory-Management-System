import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { getInventoryAnalytics } from "@/services/analyticsService";

export async function GET() {
  await requireAuth();

  const data = await getInventoryAnalytics();

  return NextResponse.json({
    success: true,
    data
  });
}