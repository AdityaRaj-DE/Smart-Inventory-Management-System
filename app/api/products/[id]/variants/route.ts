import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

export async function GET(
 req: Request,
 { params }: { params: { id: string } }
) {
 await requireAuth();

 const variants = await prisma.productVariant.findMany({
   where: { productId: params.id }
 });

 return NextResponse.json({
   success: true,
   data: variants
 });
}

export async function POST(
 req: Request,
 { params }: { params: { id: string } }
) {
 const auth = await requireAuth("ADMIN");

 const body = await req.json();

 const variant = await prisma.productVariant.create({
   data: {
     productId: params.id,
     sku: body.sku,
     attributes: body.attributes
   }
 });

 return NextResponse.json({
   success: true,
   data: variant
 });
}