import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { logAction } from "@/lib/audit";


// UPDATE CUSTOMER
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth();

  const body = await req.json();

  const customer = await prisma.customer.update({
    where: { id: params.id },
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
    },
  });

  await logAction({
    userId: auth.userId,
    action: "UPDATE_CUSTOMER",
    entity: "Customer",
    entityId: customer.id,
  });

  return NextResponse.json({
    success: true,
    data: customer,
  });
}


// DELETE CUSTOMER (ADMIN ONLY)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth("ADMIN");

  await prisma.customer.delete({
    where: { id: params.id },
  });

  await logAction({
    userId: auth.userId,
    action: "DELETE_CUSTOMER",
    entity: "Customer",
    entityId: params.id,
  });

  return NextResponse.json({
    success: true,
  });
}