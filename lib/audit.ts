import { prisma } from "./prisma";

export async function logAction({
  userId,
  action,
  entity,
  entityId,
  metadata,
  ipAddress,
}: {
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  metadata?: any;
  ipAddress?: string;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        metadata,
        ipAddress,
      },
    });
  } catch (err) {
    console.error("Audit log failed:", err);
  }
}