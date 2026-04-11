import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { logAction } from "@/lib/audit";


// GET ALL CUSTOMERS
export async function GET() {
  await requireAuth();

  const customers = await prisma.customer.findMany({
    include: {
      _count: {
        select: {
          salesOrders: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({
    success: true,
    data: customers,
  });
}


// CREATE CUSTOMER
export async function POST(req: Request) {
  const auth = await requireAuth();

  const body = await req.json();

  if (!body.name) {
    return NextResponse.json(
      { success: false, error: "Customer name required" },
      { status: 400 }
    );
  }

  if (body.email) {
    const existing = await prisma.customer.findFirst({
      where: { email: body.email },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Customer email already exists" },
        { status: 400 }
      );
    }
  }

  const customer = await prisma.customer.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
    },
  });

  await logAction({
    userId: auth.userId,
    action: "CREATE_CUSTOMER",
    entity: "Customer",
    entityId: customer.id,
  });

  return NextResponse.json({
    success: true,
    data: customer,
  });
}