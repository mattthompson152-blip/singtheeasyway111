import { getDb } from "./connection";
import { services } from "@db/schema";
import { eq } from "drizzle-orm";

export async function findAllServices() {
  return getDb().query.services.findMany({
    orderBy: (services, { asc }) => [asc(services.name)],
  });
}

export async function findActiveServices() {
  return getDb().query.services.findMany({
    where: eq(services.active, true),
    orderBy: (services, { asc }) => [asc(services.name)],
  });
}

export async function findServiceById(id: number) {
  return getDb().query.services.findFirst({
    where: eq(services.id, id),
  });
}

export async function createService(data: {
  name: string;
  description?: string;
  duration: number;
  price?: number;
  color?: string;
}) {
  const [{ id }] = await getDb()
    .insert(services)
    .values({
      name: data.name,
      description: data.description,
      duration: data.duration,
      price: data.price ?? 0,
      color: data.color ?? "#3b82f6",
    })
    .$returningId();
  return findServiceById(id);
}

export async function updateService(
  id: number,
  data: Partial<{
    name: string;
    description: string | null;
    duration: number;
    price: number;
    color: string;
    active: boolean;
  }>,
) {
  await getDb()
    .update(services)
    .set(data)
    .where(eq(services.id, id));
  return findServiceById(id);
}

export async function deleteService(id: number) {
  await getDb().delete(services).where(eq(services.id, id));
  return { success: true };
}
