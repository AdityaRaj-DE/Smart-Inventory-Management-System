import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {

  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Public routes (no auth required)
  const publicRoutes = ["/login", "/register"];

  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // No token → force login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {

    const { payload } = await jwtVerify(token, secret);
    const role = payload.role as string;

    /*
    ADMIN-ONLY ROUTES
    */

    const adminRoutes = [
      "/users",
      "/categories",
      "/suppliers",
      "/warehouses",
      "/admin",
      "/admin/backup"
    ];

    if (
      adminRoutes.some(route => pathname.startsWith(route)) &&
      role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    /*
    MANAGER + ADMIN ROUTES
    */

    const sharedRoutes = [
      "/dashboard",
      "/products",
      "/inventory",
      "/purchase-orders",
      "/sales-orders",
      "/customers",
      "/analytics",
      "/ai",
    ];

    if (
      !sharedRoutes.some(route => pathname.startsWith(route)) &&
      !adminRoutes.some(route => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();

  } catch {

    return NextResponse.redirect(new URL("/login", req.url));

  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/inventory/:path*",
    "/purchase-orders/:path*",
    "/sales-orders/:path*",
    "/customers/:path*",
    "/users/:path*",
    "/suppliers/:path*",
    "/categories/:path*",
    "/warehouses/:path*",
    "/analytics/:path*",
    "/ai/:path*",
    "/admin",
    "/admin/backup"
  ],
};