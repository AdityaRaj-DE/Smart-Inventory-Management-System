import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

export async function GET(req: Request) {
  await requireAuth("ADMIN");

  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId");
  const action = searchParams.get("action");
  const entity = searchParams.get("entity");

  const logs = await prisma.auditLog.findMany({
    where: {
      userId: userId || undefined,
      action: action || undefined,
      entity: entity || undefined
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 100
  });

  return NextResponse.json({
    success: true,
    data: logs
  });
}