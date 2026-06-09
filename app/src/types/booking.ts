export interface Service {
  id: number;
  name: string;
  description: string | null;
  duration: number;
  price: number;
  color: string;
  active: boolean;
  createdAt: Date;
}

export interface AvailabilitySlot {
  id: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  serviceId: number | null;
  active: boolean;
}

export interface Booking {
  id: number;
  serviceId: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string | null;
  clientTimezone: string;
  bookingDateTimeUTC: Date;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes: string | null;
  googleEventId: string | null;
  emailSent: boolean;
  createdAt: Date;
  service: Service | null;
}
