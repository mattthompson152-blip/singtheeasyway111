import { relations } from "drizzle-orm";
import { services, availability, bookings } from "./schema";

export const servicesRelations = relations(services, ({ many }) => ({
  bookings: many(bookings),
  availability: many(availability),
}));

export const availabilityRelations = relations(availability, ({ one }) => ({
  service: one(services, {
    fields: [availability.serviceId],
    references: [services.id],
  }),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  service: one(services, {
    fields: [bookings.serviceId],
    references: [services.id],
  }),
}));
