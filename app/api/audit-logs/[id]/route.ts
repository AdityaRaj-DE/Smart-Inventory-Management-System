import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await requireAuth("ADMIN");

  const log = await prisma.auditLog.findUnique({
    where: { id: params.id },
    include: {
      user: true
    }
  });

  return NextResponse.json({
    success: true,
    data: log
  });
}