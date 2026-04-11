import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message required" },
        { status: 400 }
      );
    }

    // 🔹 Fetch inventory data
    const products = await prisma.product.findMany({
      include: { category: true, supplier: true, inventories: true },
    });

    const productsWithStock = products.map((p) => {
        const totalStock = p.inventories?.reduce((acc, inv) => acc + inv.quantity, 0) || 0;
        return { ...p, totalStock };
    });

    if (!products.length) {
      return NextResponse.json({
        reply: "No inventory data available.",
      });
    }

    // 🔹 Strict stock classification
    const lowStockProducts = productsWithStock.filter(p => p.totalStock <= 10);
    const overStockProducts = productsWithStock.filter(p => p.totalStock > 100);
    const healthyProducts = productsWithStock.filter(
      p => p.totalStock > 10 && p.totalStock <= 100
    );

    const totalValue = productsWithStock.reduce(
      (acc, p) => acc + p.totalStock * p.basePrice,
      0
    );

    // 🔹 Clean inventory summary (no special chars)
    const inventorySummary = productsWithStock
      .map(
        p =>
          `${p.name} | Qty: ${p.totalStock} | Price: ${p.basePrice} | Category: ${p.category?.name || "N/A"} | Supplier: ${p.supplier?.name || "N/A"}`
      )
      .join("\n");


    // 🔥 Strongly Controlled Prompt
    const prompt = `
SYSTEM ROLE:
You are an Enterprise Inventory Intelligence Engine.

STRICT RULES:
- Do NOT use markdown symbols.
- Do NOT use asterisks.
- Do NOT use bold text.
- Do NOT exaggerate.
- Do NOT guess.
- Only analyze provided data.
- Low Stock = quantity <= 10
- Overstock = quantity > 100

Inventory Metrics:
Total Products: ${products.length}
Low Stock Count: ${lowStockProducts.length}
Overstock Count: ${overStockProducts.length}
Healthy Count: ${healthyProducts.length}
Total Inventory Value: ${totalValue}

Inventory Data:
${inventorySummary}

User Question:
${message}

Respond in clean professional business format.
Use short paragraphs.
Be analytical.
Mention product names only when relevant.
Provide actionable insights.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      console.error("Gemini Error:", await response.text());
      return NextResponse.json({
        reply: "AI service unavailable. Try again later.",
      });
    }

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "No intelligent response generated.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("AI CHAT ERROR:", error);
    return NextResponse.json(
      { error: "Chat failed" },
      { status: 500 }
    );
  }
}
