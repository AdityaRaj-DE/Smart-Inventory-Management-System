import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { logAction } from "@/lib/audit";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth("ADMIN");

  const body = await req.json();

  const warehouse = await prisma.warehouse.update({
    where: { id: params.id },
    data: {
      name: body.name,
      location: body.location,
    },
  });

  await logAction({
    userId: auth.userId,
    action: "UPDATE_WAREHOUSE",
    entity: "Warehouse",
    entityId: warehouse.id,
  });

  return NextResponse.json({
    success: true,
    data: warehouse,
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth("ADMIN");

  await prisma.warehouse.delete({
    where: { id: params.id },
  });

  await logAction({
    userId: auth.userId,
    action: "DELETE_WAREHOUSE",
    entity: "Warehouse",
    entityId: params.id,
  });

  return NextResponse.json({
    success: true,
  });
}