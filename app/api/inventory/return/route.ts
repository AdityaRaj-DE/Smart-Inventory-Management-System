import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { logAction } from "@/lib/audit";

export async function PATCH(req: Request) {
 const auth = await requireAuth();

 const body = await req.json();

 const inventory = await prisma.inventory.update({
   where: {
     productId_warehouseId: {
       productId: body.productId,
       warehouseId: body.warehouseId
     }
   },
   data: {
     quantity: { increment: body.quantity }
   }
 });

 await prisma.stockMovement.create({
   data: {
     productId: body.productId,
     warehouseId: body.warehouseId,
     type: "RETURN",
     quantity: body.quantity,
     performedBy: auth.userId
   }
 });

 return NextResponse.json({
   success: true,
   data: inventory
 });
}