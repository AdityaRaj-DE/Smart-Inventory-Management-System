import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/authGuard";
import { NextResponse } from "next/server";
import AdmZip from "adm-zip";

function toCSV(data: any[]) {
  if (!data.length) return "";

  const headers = Object.keys(data[0]);

  const rows = data.map(row =>
    headers.map(h => JSON.stringify(row[h] ?? "")).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}

export async function GET() {
  await requireAuth("ADMIN");

  const zip = new AdmZip();

  const [
    users,
    categories,
    suppliers,
    customers,
    products,
    warehouses,
    inventory,
    purchaseOrders,
    purchaseOrderItems,
    salesOrders,
    salesOrderItems
  ] = await Promise.all([
    prisma.user.findMany(),
    prisma.category.findMany(),
    prisma.supplier.findMany(),
    prisma.customer.findMany(),
    prisma.product.findMany(),
    prisma.warehouse.findMany(),
    prisma.inventory.findMany(),
    prisma.purchaseOrder.findMany(),
    prisma.purchaseOrderItem.findMany(),
    prisma.salesOrder.findMany(),
    prisma.salesOrderItem.findMany()
  ]);

  zip.addFile("users.csv", Buffer.from(toCSV(users)));
  zip.addFile("categories.csv", Buffer.from(toCSV(categories)));
  zip.addFile("suppliers.csv", Buffer.from(toCSV(suppliers)));
  zip.addFile("customers.csv", Buffer.from(toCSV(customers)));
  zip.addFile("products.csv", Buffer.from(toCSV(products)));
  zip.addFile("warehouses.csv", Buffer.from(toCSV(warehouses)));
  zip.addFile("inventory.csv", Buffer.from(toCSV(inventory)));
  zip.addFile("purchase_orders.csv", Buffer.from(toCSV(purchaseOrders)));
  zip.addFile("purchase_order_items.csv", Buffer.from(toCSV(purchaseOrderItems)));
  zip.addFile("sales_orders.csv", Buffer.from(toCSV(salesOrders)));
  zip.addFile("sales_order_items.csv", Buffer.from(toCSV(salesOrderItems)));

  const zipBuffer = zip.toBuffer();

  return new Response(zipBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=backup.zip"
    }
  });
}