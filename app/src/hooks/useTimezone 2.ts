import { useState, useCallback, useMemo } from "react";
import { formatInTimeZone, toDate } from "date-fns-tz";
import { addMinutes, format, startOfDay, isSameDay, parseISO } from "date-fns";

// Generate time slots for a given date, availability, and existing bookings
export function useTimezone() {
  const [clientTimezone, setClientTimezone] = useState<string>(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return "UTC";
    }
  });

  const businessTimezone = "Europe/London"; // Business owner is in UK

  const formatInClientZone = useCallback(
    (date: Date | string, fmt: string = "h:mm a") => {
      return formatInTimeZone(
        typeof date === "string" ? parseISO(date) : date,
        clientTimezone,
        fmt,
      );
    },
    [clientTimezone],
  );

  const formatInBusinessZone = useCallback(
    (date: Date | string, fmt: string = "h:mm a") => {
      return formatInTimeZone(
        typeof date === "string" ? parseISO(date) : date,
        businessTimezone,
        fmt,
      );
    },
    [],
  );

  const convertToUTC = useCallback(
    (dateStr: string, timeStr: string, fromTimezone: string): Date => {
      const dateTimeStr = `${dateStr}T${timeStr}:00`;
      return toDate(dateTimeStr, { timeZone: fromTimezone });
    },
    [],
  );

  const getTimezoneOffset = useMemo(() => {
    try {
      const now = new Date();
      const clientOffset =
        -now.toLocaleString("en", { timeZone: clientTimezone, timeZoneName: "shortOffset" })
          .match(/GMT([+-]\d+)?/)?.[1] || "+0";
      const businessOffset =
        -now.toLocaleString("en", { timeZone: businessTimezone, timeZoneName: "shortOffset" })
          .match(/GMT([+-]\d+)?/)?.[1] || "+0";
      return { client: clientOffset, business: businessOffset };
    } catch {
      return { client: "+0", business: "+0" };
    }
  }, [clientTimezone]);

  const commonTimezones = useMemo(
    () => [
      { label: "Local Time", value: clientTimezone },
      { label: "London (GMT/BST)", value: "Europe/London" },
      { label: "New York (ET)", value: "America/New_York" },
      { label: "Los Angeles (PT)", value: "America/Los_Angeles" },
      { label: "Sydney (AEST)", value: "Australia/Sydney" },
      { label: "Melbourne (AEST)", value: "Australia/Melbourne" },
      { label: "Tokyo (JST)", value: "Asia/Tokyo" },
      { label: "Singapore (SGT)", value: "Asia/Singapore" },
      { label: "Dubai (GST)", value: "Asia/Dubai" },
      { label: "Paris (CET)", value: "Europe/Paris" },
      { label: "Berlin (CET)", value: "Europe/Berlin" },
      { label: "Mumbai (IST)", value: "Asia/Kolkata" },
      { label: "Hong Kong (HKT)", value: "Asia/Hong_Kong" },
      { label: "Toronto (ET)", value: "America/Toronto" },
      { label: "Vancouver (PT)", value: "America/Vancouver" },
      { label: "Auckland (NZST)", value: "Pacific/Auckland" },
    ],
    [clientTimezone],
  );

  // Generate available time slots for a selected date
  const generateTimeSlots = useCallback(
    (
      selectedDate: Date,
      availabilitySlots: { dayOfWeek: number; startTime: string; endTime: string }[],
      existingBookings: { bookingDateTimeUTC: Date | string }[],
      serviceDuration: number,
    ): Date[] => {
      const dayOfWeek = selectedDate.getDay();
      const daySlots = availabilitySlots.filter((s) => s.dayOfWeek === dayOfWeek);

      if (daySlots.length === 0) return [];

      const slots: Date[] = [];
      const slotDuration = serviceDuration || 30;

      for (const avail of daySlots) {
        const [startHour, startMin] = avail.startTime.split(":").map(Number);
        const [endHour, endMin] = avail.endTime.split(":").map(Number);

        const baseDate = startOfDay(selectedDate);
        let currentSlot = new Date(
          baseDate.getFullYear(),
          baseDate.getMonth(),
          baseDate.getDate(),
          startHour,
          startMin,
        );

        const endTime = new Date(
          baseDate.getFullYear(),
          baseDate.getMonth(),
          baseDate.getDate(),
          endHour,
          endMin,
        );

        while (currentSlot < endTime) {
          const slotEnd = addMinutes(currentSlot, slotDuration);

          // Check if this slot overlaps with any existing booking
          const isBooked = existingBookings.some((booking) => {
            const bookingDate =
              typeof booking.bookingDateTimeUTC === "string"
                ? parseISO(booking.bookingDateTimeUTC)
                : booking.bookingDateTimeUTC;

            if (!isSameDay(bookingDate, selectedDate)) return false;

            const bookingEnd = addMinutes(bookingDate, serviceDuration);
            return (
              (currentSlot >= bookingDate && currentSlot < bookingEnd) ||
              (slotEnd > bookingDate && slotEnd <= bookingEnd) ||
              (currentSlot <= bookingDate && slotEnd >= bookingEnd)
            );
          });

          // Only add slots that are in the future (or today with buffer)
          const now = new Date();
          const isPast = currentSlot < now;

          if (!isBooked && !isPast) {
            slots.push(new Date(currentSlot));
          }

          currentSlot = addMinutes(currentSlot, slotDuration);
        }
      }

      return slots;
    },
    [],
  );

  return {
    clientTimezone,
    setClientTimezone,
    businessTimezone,
    formatInClientZone,
    formatInBusinessZone,
    convertToUTC,
    getTimezoneOffset,
    commonTimezones,
    generateTimeSlots,
  };
}
