import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { getDashboardStats } from "@/services/analyticsService";

export async function GET() {
  await requireAuth();

  const data = await getDashboardStats();

  return NextResponse.json({
    success: true,
    data
  });
}