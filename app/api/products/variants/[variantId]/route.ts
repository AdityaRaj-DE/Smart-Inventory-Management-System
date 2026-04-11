import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

export async function GET(
  req: Request,
  { params }: { params: { variantId: string } }
) {
  await requireAuth();

  const variant = await prisma.productVariant.findUnique({
    where: { id: params.variantId },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          sku: true
        }
      }
    }
  });

  if (!variant) {
    return NextResponse.json(
      { success: false, error: "Variant not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: variant
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: { variantId: string } }
) {
  await requireAuth("ADMIN");

  const body = await req.json();

  const variant = await prisma.productVariant.update({
    where: { id: params.variantId },
    data: {
      sku: body.sku,
      attributes: body.attributes
    }
  });

  return NextResponse.json({
    success: true,
    data: variant
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { variantId: string } }
) {
  await requireAuth("ADMIN");

  await prisma.productVariant.delete({
    where: { id: params.variantId }
  });

  return NextResponse.json({
    success: true,
    message: "Variant deleted"
  });
}