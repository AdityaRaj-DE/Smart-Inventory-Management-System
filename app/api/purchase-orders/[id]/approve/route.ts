import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { logAction } from "@/lib/audit";

export async function PATCH(
 req: Request,
 { params }: { params: { id: string } }
) {
 const auth = await requireAuth("ADMIN");

 const order = await prisma.purchaseOrder.update({
   where: { id: params.id },
   data: {
     status: "CONFIRMED",
     approvedAt: new Date()
   }
 });

 return NextResponse.json({
   success: true,
   data: order
 });
}