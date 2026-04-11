import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { getSalesAnalytics } from "@/services/analyticsService";

export async function GET() {
  await requireAuth();

  const data = await getSalesAnalytics();

  return NextResponse.json({
    success: true,
    data
  });
}