import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { logAction } from "@/lib/audit";

export async function GET() {
  await requireAuth();

  const orders = await prisma.purchaseOrder.findMany({
    include: {
      supplier: true,
      items: {
        include: { product: true },
      },
      creator: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    success: true,
    data: orders,
  });
}


export async function POST(req: Request) {
  const auth = await requireAuth();

  const body = await req.json();

  if (!body.supplierId || !body.items || body.items.length === 0) {
    return NextResponse.json(
      { success: false, error: "Supplier and items required" },
      { status: 400 }
    );
  }

  const order = await prisma.$transaction(async (tx) => {

    const purchaseOrder = await tx.purchaseOrder.create({
      data: {
        supplierId: body.supplierId,
        createdBy: auth.userId,
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    return purchaseOrder;
  });

  await logAction({
    userId: auth.userId,
    action: "CREATE_PURCHASE_ORDER",
    entity: "PurchaseOrder",
    entityId: order.id,
  });

  return NextResponse.json({
    success: true,
    data: order,
  });
}