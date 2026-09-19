import { getDb } from "./connection";
import { availability } from "@db/schema";
import { eq, and } from "drizzle-orm";

export async function findAllAvailability() {
  return getDb().query.availability.findMany({
    orderBy: (availability, { asc }) => [
      asc(availability.dayOfWeek),
      asc(availability.startTime),
    ],
  });
}

export async function findAvailabilityByDay(dayOfWeek: number) {
  return getDb().query.availability.findMany({
    where: and(eq(availability.dayOfWeek, dayOfWeek), eq(availability.active, true)),
    orderBy: (availability, { asc }) => [asc(availability.startTime)],
  });
}

export async function findAvailabilityByService(serviceId: number) {
  return getDb().query.availability.findMany({
    where: and(eq(availability.serviceId, serviceId), eq(availability.active, true)),
  });
}

export async function createAvailability(data: {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  serviceId?: number;
}) {
  const [{ id }] = await getDb()
    .insert(availability)
    .values({
      dayOfWeek: data.dayOfWeek,
      startTime: data.startTime,
      endTime: data.endTime,
      serviceId: data.serviceId ?? null,
    })
    .$returningId();
  return getDb().query.availability.findFirst({
    where: eq(availability.id, id),
  });
}

export async function updateAvailability(
  id: number,
  data: Partial<{
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    serviceId: number | null;
    active: boolean;
  }>,
) {
  await getDb()
    .update(availability)
    .set(data)
    .where(eq(availability.id, id));
  return getDb().query.availability.findFirst({
    where: eq(availability.id, id),
  });
}

export async function deleteAvailability(id: number) {
  await getDb().delete(availability).where(eq(availability.id, id));
  return { success: true };
}
