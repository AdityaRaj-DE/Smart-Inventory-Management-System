import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { logAction } from "@/lib/audit";

export async function GET() {
  await requireAuth();

  const orders = await prisma.salesOrder.findMany({
    include: {
      customer: true,
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

  if (!body.customerId || !body.items || body.items.length === 0) {
    return NextResponse.json(
      { success: false, error: "Customer and items required" },
      { status: 400 },
    );
  }

  const order = await prisma.$transaction(async (tx) => {
    const total = body.items.reduce(
      (sum: number, item: any) => sum + item.quantity * item.price,
      0,
    );

    const salesOrder = await tx.salesOrder.create({
      data: {
        customerId: body.customerId,
        createdBy: auth.userId,
        totalAmount: total,
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

    return salesOrder;
  });

  await logAction({
    userId: auth.userId,
    action: "CREATE_SALES_ORDER",
    entity: "SalesOrder",
    entityId: order.id,
  });

  return NextResponse.json({
    success: true,
    data: order,
  });
}
