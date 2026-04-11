import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { MovementType } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth();

  const body = await req.json();

  const order = await prisma.purchaseOrder.findUnique({
    where: { id: params.id },
    include: { items: true },
  });

  if (!order) {
    return NextResponse.json(
      { success: false, error: "Order not found" },
      { status: 404 }
    );
  }

  const updated = await prisma.$transaction(async (tx) => {

    const updatedOrder = await tx.purchaseOrder.update({
      where: { id: params.id },
      data: {
        status: body.status,
        completedAt: body.status === "COMPLETED" ? new Date() : null,
      },
    });

    if (body.status === "COMPLETED") {

      for (const item of order.items) {

        const inventory = await tx.inventory.findFirst({
          where: { productId: item.productId },
        });

        if (!inventory) continue;

        await tx.inventory.update({
          where: { id: inventory.id },
          data: {
            quantity: { increment: item.quantity },
            lastRestockedAt: new Date(),
          },
        });

        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            warehouseId: inventory.warehouseId,
            type: MovementType.PURCHASE,
            quantity: item.quantity,
            referenceId: order.id,
            referenceType: "PurchaseOrder",
            performedBy: auth.userId,
          },
        });
      }

    }

    return updatedOrder;
  });

  return NextResponse.json({
    success: true,
    data: updated,
  });
}