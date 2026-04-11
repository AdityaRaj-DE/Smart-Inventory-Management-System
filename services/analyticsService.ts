import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [
    products,
    salesOrders,
    purchaseOrders,
    inventory,
    revenue
  ] = await Promise.all([
    prisma.product.count({ where: { isActive: true } }),
    prisma.salesOrder.count(),
    prisma.purchaseOrder.count(),
    prisma.inventory.findMany(),
    prisma.salesOrder.aggregate({
      _sum: { totalAmount: true }
    })
  ]);

  const totalInventoryUnits = inventory.reduce(
    (sum, i) => sum + i.quantity,
    0
  );

  const lowStockItems = inventory.filter(
    (i) => i.quantity < i.lowStockLevel
  ).length;

  return {
    totalProducts: products,
    totalSalesOrders: salesOrders,
    totalPurchaseOrders: purchaseOrders,
    totalInventoryUnits,
    totalRevenue: revenue._sum.totalAmount || 0,
    lowStockItems
  };
}

export async function getSalesAnalytics() {
  const orders = await prisma.salesOrder.findMany({
    where: { status: "COMPLETED" },
    include: {
      customer: true
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  let totalRevenue = 0;

  const revenueByCustomer: Record<string, number> = {};
  const revenueTrend: Record<string, number> = {};

  orders.forEach(order => {
    const amount = order.totalAmount || 0;

    totalRevenue += amount;

    const customer = order.customer?.name || "Unknown";

    revenueByCustomer[customer] =
      (revenueByCustomer[customer] || 0) + amount;

    const date = order.createdAt.toISOString().slice(0, 10);

    revenueTrend[date] =
      (revenueTrend[date] || 0) + amount;
  });

  const trendArray = Object.entries(revenueTrend).map(
    ([date, revenue]) => ({
      date,
      revenue
    })
  );

  return {
    totalRevenue,
    revenueByCustomer,
    revenueTrend: trendArray
  };
}

export async function getTopSellingProducts() {

  const grouped = await prisma.salesOrderItem.groupBy({
    by: ["productId"],
    _sum: { quantity: true },
    orderBy: {
      _sum: { quantity: "desc" }
    },
    take: 10
  });

  const productIds = grouped.map(g => g.productId);

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds }
    }
  });

  return grouped.map(g => {
    const product = products.find(
      p => p.id === g.productId
    );

    return {
      id: g.productId,
      name: product?.name || "Unknown",
      sales: g._sum.quantity || 0
    };
  });
}

export async function getSupplierPerformance() {

  const grouped = await prisma.purchaseOrder.groupBy({
    by: ["supplierId"],
    _count: { id: true }
  });

  const supplierIds = grouped.map(g => g.supplierId);

  const suppliers = await prisma.supplier.findMany({
    where: { id: { in: supplierIds } }
  });

  return grouped.map(g => {
    const supplier = suppliers.find(
      s => s.id === g.supplierId
    );

    return {
      id: g.supplierId,
      name: supplier?.name || "Unknown",
      orders: g._count.id
    };
  });
}

export async function getStockMovementTrend() {

  const movements = await prisma.stockMovement.findMany({
    orderBy: {
      createdAt: "asc"
    }
  });

  const trend: Record<string, number> = {};

  movements.forEach(m => {
    const date = m.createdAt.toISOString().slice(0, 10);

    trend[date] = (trend[date] || 0) + m.quantity;
  });

  return Object.entries(trend).map(([date, qty]) => ({
    date,
    quantity: qty
  }));
}

export async function getDeadStock() {

  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  return prisma.product.findMany({
    where: {
      salesItems: {
        none: {
          createdAt: {
            gte: ninetyDaysAgo
          }
        }
      }
    }
  });
}