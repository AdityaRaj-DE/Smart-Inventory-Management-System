import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { logAction } from "@/lib/audit";


// GET PRODUCTS
export async function GET() {
  await requireAuth();

  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      category: true,
      supplier: true,
      _count: {
        select: {
          variants: true,
          inventories: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    success: true,
    data: products,
  });
}



// CREATE PRODUCT
export async function POST(req: Request) {
  const auth = await requireAuth("ADMIN");

  const body = await req.json();

  if (!body.name || !body.sku || !body.categoryId || !body.basePrice) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  // check duplicate SKU
  const existing = await prisma.product.findUnique({
    where: { sku: body.sku },
  });

  if (existing) {
    return NextResponse.json(
      { success: false, error: "SKU already exists" },
      { status: 400 }
    );
  }

  // validate category
  const category = await prisma.category.findUnique({
    where: { id: body.categoryId },
  });

  if (!category) {
    return NextResponse.json(
      { success: false, error: "Invalid category" },
      { status: 400 }
    );
  }

  // validate supplier (optional)
  if (body.supplierId) {
    const supplier = await prisma.supplier.findUnique({
      where: { id: body.supplierId },
    });

    if (!supplier) {
      return NextResponse.json(
        { success: false, error: "Invalid supplier" },
        { status: 400 }
      );
    }
  }

  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      sku: body.sku,
      basePrice: body.basePrice,
      unit: body.unit || "pcs",
      currency: body.currency || "INR",
      categoryId: body.categoryId,
      supplierId: body.supplierId,
    },
  });

  // create price history
  await prisma.priceHistory.create({
    data: {
      productId: product.id,
      price: body.basePrice,
    },
  });

  await logAction({
    userId: auth.userId,
    action: "CREATE_PRODUCT",
    entity: "Product",
    entityId: product.id,
  });

  return NextResponse.json({
    success: true,
    data: product,
  });
}