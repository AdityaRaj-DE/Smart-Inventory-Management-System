import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { logAction } from "@/lib/audit";

export async function GET(
 req: Request,
 { params }: { params: { id: string } }
) {
 await requireAuth();

 const orders = await prisma.purchaseOrder.findMany({
   where: { supplierId: params.id },
   include: { items: true }
 });

 return NextResponse.json({
   success: true,
   data: orders
 });
}