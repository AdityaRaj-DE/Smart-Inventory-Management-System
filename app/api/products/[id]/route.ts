import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { logAction } from "@/lib/audit";

// GET SINGLE PRODUCT
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  await requireAuth();

  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      supplier: true,
      variants: true,
      priceHistory: true,
      inventories: {
        include: {
          warehouse: true,
        },
      },
    },
  });

  return NextResponse.json({
    success: true,
    data: product,
  });
}

// UPDATE PRODUCT
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const auth = await requireAuth("ADMIN");

  const body = await req.json();

  const existing = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!existing) {
    return NextResponse.json(
      { success: false, error: "Product not found" },
      { status: 404 },
    );
  }

  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      name: body.name,
      description: body.description,
      basePrice: body.basePrice,
      categoryId: body.categoryId,
      supplierId: body.supplierId,
      isActive: body.isActive,
    },
  });

  // if price changed → add history
  if (body.basePrice && body.basePrice !== existing.basePrice) {
    await prisma.priceHistory.updateMany({
      where: {
        productId: product.id,
        endDate: null,
      },
      data: {
        endDate: new Date(),
      },
    });
    await prisma.priceHistory.create({
      data: {
        productId: product.id,
        price: body.basePrice,
      },
    });
  }

  await logAction({
    userId: auth.userId,
    action: "UPDATE_PRODUCT",
    entity: "Product",
    entityId: product.id,
  });

  return NextResponse.json({
    success: true,
    data: product,
  });
}

// SOFT DELETE PRODUCT
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const auth = await requireAuth("ADMIN");

  const product = await prisma.product.update({
    where: { id: params.id },
    data: { isActive: false },
  });

  await logAction({
    userId: auth.userId,
    action: "DELETE_PRODUCT",
    entity: "Product",
    entityId: product.id,
  });

  return NextResponse.json({
    success: true,
  });
}
