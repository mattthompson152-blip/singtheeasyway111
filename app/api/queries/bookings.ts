import { getDb } from "./connection";
import { bookings } from "@db/schema";
import { eq, and, gte, desc } from "drizzle-orm";

export async function findAllBookings() {
  return getDb().query.bookings.findMany({
    orderBy: (bookings, { desc }) => [desc(bookings.bookingDateTimeUTC)],
    with: {
      service: true,
    },
  });
}

export async function findUpcomingBookings() {
  const now = new Date();
  return getDb().query.bookings.findMany({
    where: and(
      gte(bookings.bookingDateTimeUTC, now),
      eq(bookings.status, "confirmed"),
    ),
    orderBy: (bookings, { asc }) => [asc(bookings.bookingDateTimeUTC)],
    with: {
      service: true,
    },
  });
}

export async function findBookingById(id: number) {
  return getDb().query.bookings.findFirst({
    where: eq(bookings.id, id),
    with: {
      service: true,
    },
  });
}

export async function findBookingsByDateRange(start: Date, end: Date) {
  return getDb().query.bookings.findMany({
    where: and(
      gte(bookings.bookingDateTimeUTC, start),
      gte(bookings.bookingDateTimeUTC, end),
    ),
    with: {
      service: true,
    },
  });
}

export async function createBooking(data: {
  serviceId: number;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientTimezone: string;
  bookingDateTimeUTC: Date;
  notes?: string;
  googleEventId?: string;
}) {
  const [{ id }] = await getDb()
    .insert(bookings)
    .values({
      serviceId: data.serviceId,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone ?? null,
      clientTimezone: data.clientTimezone,
      bookingDateTimeUTC: data.bookingDateTimeUTC,
      notes: data.notes ?? null,
      googleEventId: data.googleEventId ?? null,
    })
    .$returningId();
  return findBookingById(id);
}

export async function updateBookingStatus(
  id: number,
  status: "pending" | "confirmed" | "cancelled" | "completed",
) {
  await getDb()
    .update(bookings)
    .set({ status })
    .where(eq(bookings.id, id));
  return findBookingById(id);
}

export async function updateBookingGoogleEventId(id: number, googleEventId: string) {
  await getDb()
    .update(bookings)
    .set({ googleEventId })
    .where(eq(bookings.id, id));
}

export async function markEmailSent(id: number) {
  await getDb()
    .update(bookings)
    .set({ emailSent: true })
    .where(eq(bookings.id, id));
}

export async function deleteBooking(id: number) {
  await getDb().delete(bookings).where(eq(bookings.id, id));
  return { success: true };
}
