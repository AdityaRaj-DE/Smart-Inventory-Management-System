import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await requireAuth();

  const order = await prisma.purchaseOrder.findUnique({
    where: { id: params.id },
    include: {
      supplier: true,
      items: {
        include: { product: true },
      },
      creator: true,
    },
  });

  return NextResponse.json({
    success: true,
    data: order,
  });
}