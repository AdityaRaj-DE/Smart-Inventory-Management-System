import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function requireAuth(role?: "ADMIN" | "MANAGER") {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const { payload } = await jwtVerify(token, secret);

  const user = payload as {
    userId: string;
    role: "ADMIN" | "MANAGER";
  };

  if (role && user.role !== role) {
    throw new Error("Forbidden");
  }

  return user;
}