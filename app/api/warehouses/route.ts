import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { logAction } from "@/lib/audit";

export async function GET() {
  await requireAuth();

  const warehouses = await prisma.warehouse.findMany({
    include: {
      _count: {
        select: {
          inventories: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    success: true,
    data: warehouses,
  });
}

export async function POST(req: Request) {
  const auth = await requireAuth("ADMIN");

  const body = await req.json();

  if (!body.name) {
    return NextResponse.json(
      { success: false, error: "Warehouse name required" },
      { status: 400 }
    );
  }

  const warehouse = await prisma.warehouse.create({
    data: {
      name: body.name,
      location: body.location,
    },
  });

  await logAction({
    userId: auth.userId,
    action: "CREATE_WAREHOUSE",
    entity: "Warehouse",
    entityId: warehouse.id,
  });

  return NextResponse.json({
    success: true,
    data: warehouse,
  });
}