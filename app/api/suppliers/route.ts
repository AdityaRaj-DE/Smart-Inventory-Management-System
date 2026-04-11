import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { logAction } from "@/lib/audit";


// GET ALL SUPPLIERS
export async function GET() {
  await requireAuth();

  const suppliers = await prisma.supplier.findMany({
    where: {
      isActive: true,
    },
    include: {
      _count: {
        select: {
          products: true,
          purchaseOrders: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({
    success: true,
    data: suppliers,
  });
}


// CREATE SUPPLIER
export async function POST(req: Request) {
  const auth = await requireAuth("ADMIN");

  const body = await req.json();

  if (!body.name) {
    return NextResponse.json(
      { success: false, error: "Supplier name required" },
      { status: 400 }
    );
  }

  const existing = await prisma.supplier.findUnique({
    where: { name: body.name },
  });

  if (existing) {
    return NextResponse.json(
      { success: false, error: "Supplier already exists" },
      { status: 400 }
    );
  }

  const supplier = await prisma.supplier.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
    },
  });

  await logAction({
    userId: auth.userId,
    action: "CREATE_SUPPLIER",
    entity: "Supplier",
    entityId: supplier.id,
  });

  return NextResponse.json({
    success: true,
    data: supplier,
  });
}