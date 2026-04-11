import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { logAction } from "@/lib/audit";
import { Role } from "@prisma/client";

export async function GET(req: Request) {
  await requireAuth("ADMIN");

  const { searchParams } = new URL(req.url);

  const role = searchParams.get("role");
  const active = searchParams.get("active");

  const users = await prisma.user.findMany({
    where: {
      role: role ? (role as Role) : undefined,
      isActive: active ? active === "true" : undefined
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true
    }
  });

  return NextResponse.json({
    success: true,
    data: users
  });
}

export async function POST(req: Request) {
  const auth = await requireAuth("ADMIN");

  const body = await req.json();

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
      role: (body.role as Role) || Role.MANAGER,
    },
  });

  await logAction({
    userId: auth.userId,
    action: "CREATE_USER",
    entity: "User",
    entityId: user.id,
  });

  return NextResponse.json({
    success: true,
    data: user,
  });
}