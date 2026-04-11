import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

export async function GET() {
  await requireAuth();

  const inventory = await prisma.inventory.findMany({
    include: {
      product: true,
      warehouse: true,
    },
  });

  return NextResponse.json({
    success: true,
    data: inventory,
  });
}

export async function POST(req: Request) {
  const auth = await requireAuth("ADMIN");

  const body = await req.json();

  const inventory = await prisma.inventory.create({
    data: {
      productId: body.productId,
      warehouseId: body.warehouseId,
      quantity: body.quantity,
      lowStockLevel: body.lowStockLevel || 10,
    },
  });

  return NextResponse.json({
    success: true,
    data: inventory,
  });
}