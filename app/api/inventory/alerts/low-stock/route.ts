import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

export async function GET() {
 await requireAuth();

 const lowStock = await prisma.inventory.findMany({
   where: {
     quantity: {
       lt: prisma.inventory.fields.lowStockLevel
     }
   },
   include: {
     product: true,
     warehouse: true
   }
 });

 return NextResponse.json({
   success: true,
   data: lowStock
 });
}