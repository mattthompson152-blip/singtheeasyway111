import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findAllBookings,
  findUpcomingBookings,
  findBookingById,
  createBooking,
  updateBookingStatus,
  deleteBooking,
  markEmailSent,
  updateBookingGoogleEventId,
} from "./queries/bookings";
import { getBusinessTimezone, getBusinessName, getBusinessEmail } from "./queries/settings";
import { findServiceById } from "./queries/services";
import { sendBookingConfirmation, sendNotificationToBusiness } from "./lib/email";
import { createCalendarEvent } from "./lib/google-calendar";
import { formatInTimeZone } from "date-fns-tz";

export const bookingRouter = createRouter({
  list: adminQuery.query(() => findAllBookings()),

  upcoming: adminQuery.query(() => findUpcomingBookings()),

  byId: publicQuery
    .input(z.object({ id: z.number() }))
    .query(({ input }) => findBookingById(input.id)),

  create: publicQuery
    .input(
      z.object({
        serviceId: z.number(),
        clientName: z.string().min(1),
        clientEmail: z.string().email(),
        clientPhone: z.string().optional(),
        clientTimezone: z.string().min(1),
        bookingDateTimeUTC: z.string().datetime(),
        notes: z.string().optional(),
        googleTokens: z
          .object({
            access_token: z.string().optional(),
            refresh_token: z.string().optional(),
          })
          .optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const bookingDateTimeUTC = new Date(input.bookingDateTimeUTC);
      const service = await findServiceById(input.serviceId);
      if (!service) {
        throw new Error("Service not found");
      }

      // Create booking in database
      const booking = await createBooking({
        serviceId: input.serviceId,
        clientName: input.clientName,
        clientEmail: input.clientEmail,
        clientPhone: input.clientPhone,
        clientTimezone: input.clientTimezone,
        bookingDateTimeUTC,
        notes: input.notes,
      });

      if (!booking) {
        throw new Error("Failed to create booking");
      }

      // Sync with Google Calendar if tokens provided
      let googleEventId: string | undefined;
      if (input.googleTokens?.access_token) {
        try {
          const endDateTime = new Date(
            bookingDateTimeUTC.getTime() + service.duration * 60000,
          );
          const businessTimezone = await getBusinessTimezone();
          const businessName = await getBusinessName();

          googleEventId = await createCalendarEvent({
            tokens: input.googleTokens,
            summary: `${service.name} - ${input.clientName}`,
            description: `Booking with ${input.clientName}\nEmail: ${input.clientEmail}\n${input.notes ? `Notes: ${input.notes}` : ""}`,
            startDateTime: bookingDateTimeUTC,
            endDateTime,
            timezone: businessTimezone,
            attendeeEmail: input.clientEmail,
          });

          if (googleEventId) {
            await updateBookingGoogleEventId(booking.id, googleEventId);
          }
        } catch (err) {
          console.error("Google Calendar sync failed:", err);
        }
      }

      // Send confirmation email to client
      try {
        const businessName = await getBusinessName();
        const formattedDateTime = formatInTimeZone(
          bookingDateTimeUTC,
          input.clientTimezone,
          "EEEE, MMMM d, yyyy 'at' h:mm a",
        );

        await sendBookingConfirmation({
          to: input.clientEmail,
          clientName: input.clientName,
          serviceName: service.name,
          bookingDateTime: formattedDateTime,
          timezone: input.clientTimezone,
          duration: service.duration,
          businessName,
        });

        await markEmailSent(booking.id);
      } catch (err) {
        console.error("Failed to send confirmation email:", err);
      }

      // Send notification to business
      try {
        const businessEmail = await getBusinessEmail();
        const businessName = await getBusinessName();
        const businessTimezone = await getBusinessTimezone();
        const formattedDateTime = formatInTimeZone(
          bookingDateTimeUTC,
          businessTimezone,
          "EEEE, MMMM d, yyyy 'at' h:mm a",
        );

        if (businessEmail) {
          await sendNotificationToBusiness({
            businessEmail,
            clientName: input.clientName,
            clientEmail: input.clientEmail,
            serviceName: service.name,
            bookingDateTime: formattedDateTime,
            businessTimezone,
            duration: service.duration,
            businessName,
            notes: input.notes,
          });
        }
      } catch (err) {
        console.error("Failed to send business notification:", err);
      }

      return { booking, googleEventId };
    }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
      }),
    )
    .mutation(({ input }) => {
      const { id, status } = input;
      return updateBookingStatus(id, status);
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteBooking(input.id)),
});
