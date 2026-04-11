import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { parse } from "csv-parse/sync";

type ProductCSV = {
  name: string;
  sku: string;
  basePrice: string;
  categoryId: string;
  supplierId: string;
};

export async function POST(req: Request) {

  const auth = await requireAuth("ADMIN");

  const text = await req.text();

  const records = parse(text, {
    columns: true,
    skip_empty_lines: true
  }) as ProductCSV[];

  const products = [];

  for (const row of records) {

    const product = await prisma.product.create({
      data: {
        name: row.name,
        sku: row.sku,
        basePrice: Number(row.basePrice),
        categoryId: row.categoryId,
        supplierId: row.supplierId
      }
    });

    await prisma.priceHistory.create({
      data: {
        productId: product.id,
        price: product.basePrice
      }
    });

    products.push(product);
  }

  return NextResponse.json({
    success: true,
    count: products.length
  });
}