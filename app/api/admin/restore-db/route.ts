import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import AdmZip from "adm-zip";
import { parse } from "csv-parse/sync";

export async function POST(req: Request) {
  const auth = await requireAuth("ADMIN");

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { success: false, error: "CSV zip file required" },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const zip = new AdmZip(buffer);

  const entries = zip.getEntries();

  const csvMap: Record<string, any[]> = {};

  const booleanFields = new Set(["isActive"]);

  const numberFields = new Set([
    "basePrice",
    "quantity",
    "reservedQty",
    "damagedQty",
    "lowStockLevel",
    "price",
    "totalAmount",
  ]);

  const dateFields = new Set([
    "createdAt",
    "updatedAt",
    "approvedAt",
    "completedAt",
    "lastRestockedAt",
  ]);

  const restoreOrder = [
  "users",
  "categories",
  "suppliers",
  "customers",
  "products",
  "warehouses",
  "inventory",
  "purchase_orders",
  "purchase_order_items",
  "sales_orders",
  "sales_order_items"
];

  for (const name of restoreOrder) {
  const entry = entries.find(e => e.entryName === `${name}.csv`);
  if (!entry) continue;

  const csv = entry.getData().toString("utf8");

    const records = parse(csv, {
      columns: true,
      skip_empty_lines: true,
    }).map((row: any) => {
      const converted: any = {};

      for (const key in row) {
        let value = row[key];

        if (value === "") {
          converted[key] = null;
          continue;
        }

        if (booleanFields.has(key)) {
          value = value === "true";
        } else if (numberFields.has(key)) {
          value = Number(value);
        } else if (dateFields.has(key)) {
          value = new Date(value);
        }

        converted[key] = value;
      }

      return converted;
    });

    csvMap[name] = records;
  }

  await prisma.$transaction(async (tx) => {
    // ⚠ clear database first
    await tx.stockMovement.deleteMany();
    await tx.salesOrderItem.deleteMany();
    await tx.purchaseOrderItem.deleteMany();
    await tx.inventory.deleteMany();
    await tx.productVariant.deleteMany();
    await tx.priceHistory.deleteMany();
    await tx.salesOrder.deleteMany();
    await tx.purchaseOrder.deleteMany();
    await tx.product.deleteMany();
    await tx.customer.deleteMany();
    await tx.supplier.deleteMany();
    await tx.category.deleteMany();
    await tx.warehouse.deleteMany();
    await tx.user.deleteMany();

    // USERS
    if (csvMap.users) {
      await tx.user.createMany({
        data: csvMap.users,
        skipDuplicates: true,
      });
    }

    // CATEGORIES
    if (csvMap.categories) {
      await tx.category.createMany({
        data: csvMap.categories,
        skipDuplicates: true,
      });
    }

    // SUPPLIERS
    if (csvMap.suppliers) {
      await tx.supplier.createMany({
        data: csvMap.suppliers,
        skipDuplicates: true,
      });
    }

    // CUSTOMERS
    if (csvMap.customers) {
      await tx.customer.createMany({
        data: csvMap.customers,
        skipDuplicates: true,
      });
    }
console.log(
  "categories loaded:",
  csvMap.categories?.length
);

console.log(
  "products loaded:",
  csvMap.products?.length
);
    // PRODUCTS
    if (csvMap.products) {
      await tx.product.createMany({
        data: csvMap.products,
        skipDuplicates: true,
      });
    }

    // WAREHOUSES
    if (csvMap.warehouses) {
      await tx.warehouse.createMany({
        data: csvMap.warehouses,
        skipDuplicates: true,
      });
    }

    // INVENTORY
    if (csvMap.inventory) {
      await tx.inventory.createMany({
        data: csvMap.inventory,
        skipDuplicates: true,
      });
    }

    // PURCHASE ORDERS
    if (csvMap.purchase_orders) {
      await tx.purchaseOrder.createMany({
        data: csvMap.purchase_orders,
        skipDuplicates: true,
      });
    }

    if (csvMap.purchase_order_items) {
      await tx.purchaseOrderItem.createMany({
        data: csvMap.purchase_order_items,
        skipDuplicates: true,
      });
    }

    // SALES ORDERS
    if (csvMap.sales_orders) {
      await tx.salesOrder.createMany({
        data: csvMap.sales_orders,
        skipDuplicates: true,
      });
    }

    if (csvMap.sales_order_items) {
      await tx.salesOrderItem.createMany({
        data: csvMap.sales_order_items,
        skipDuplicates: true,
      });
    }
  });

  return NextResponse.json({
    success: true,
    message: "Database restored from CSV backup",
  });
}
