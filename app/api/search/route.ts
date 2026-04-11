import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

export async function GET(req: Request) {
  await requireAuth();

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({
      success: true,
      data: {
        products: [],
        customers: [],
        suppliers: [],
        purchaseOrders: [],
        salesOrders: []
      }
    });
  }

  const search = q.toLowerCase();

  const [
    products,
    customers,
    suppliers,
    purchaseOrders,
    salesOrders
  ] = await Promise.all([

    prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { sku: { contains: search, mode: "insensitive" } }
        ]
      },
      select: {
        id: true,
        name: true,
        sku: true
      },
      take: 5
    }),

    prisma.customer.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } }
        ]
      },
      select: {
        id: true,
        name: true,
        email: true
      },
      take: 5
    }),

    prisma.supplier.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive"
        }
      },
      select: {
        id: true,
        name: true
      },
      take: 5
    }),

    prisma.purchaseOrder.findMany({
      where: {
        id: {
          contains: search
        }
      },
      select: {
        id: true,
        status: true,
        createdAt: true
      },
      take: 5
    }),

    prisma.salesOrder.findMany({
      where: {
        id: {
          contains: search
        }
      },
      select: {
        id: true,
        status: true,
        createdAt: true
      },
      take: 5
    })
  ]);

  return NextResponse.json({
    success: true,
    data: {
      products,
      customers,
      suppliers,
      purchaseOrders,
      salesOrders
    }
  });
}