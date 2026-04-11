import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { logAction } from "@/lib/audit";


// UPDATE CATEGORY
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth("ADMIN");

  const body = await req.json();

  const category = await prisma.category.update({
    where: { id: params.id },
    data: {
      name: body.name,
      isActive: body.isActive,
    },
  });

  await logAction({
    userId: auth.userId,
    action: "UPDATE_CATEGORY",
    entity: "Category",
    entityId: category.id,
  });

  return NextResponse.json({
    success: true,
    data: category,
  });
}


// SOFT DELETE CATEGORY
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth("ADMIN");

  const category = await prisma.category.update({
    where: { id: params.id },
    data: {
      isActive: false,
    },
  });

  await logAction({
    userId: auth.userId,
    action: "DELETE_CATEGORY",
    entity: "Category",
    entityId: category.id,
  });

  return NextResponse.json({
    success: true,
  });
}