import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  time,
  boolean,
  date,
  bigint,
} from "drizzle-orm/mysql-core";

// ── Users (from auth) ───────────────────────────────────────────
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ── Services ────────────────────────────────────────────────────
export const services = mysqlTable("services", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  duration: int("duration").notNull(), // in minutes
  price: int("price").default(0).notNull(), // in cents (or pence)
  color: varchar("color", { length: 7 }).default("#3b82f6").notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

// ── Weekly Availability ─────────────────────────────────────────
export const availability = mysqlTable("availability", {
  id: serial("id").primaryKey(),
  dayOfWeek: int("dayOfWeek").notNull(), // 0=Sun, 1=Mon, ..., 6=Sat
  startTime: time("startTime").notNull(),
  endTime: time("endTime").notNull(),
  serviceId: bigint("serviceId", { mode: "number", unsigned: true }),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Availability = typeof availability.$inferSelect;
export type InsertAvailability = typeof availability.$inferInsert;

// ── Bookings ────────────────────────────────────────────────────
export const bookings = mysqlTable("bookings", {
  id: serial("id").primaryKey(),
  serviceId: bigint("serviceId", { mode: "number", unsigned: true }).notNull(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }).notNull(),
  clientPhone: varchar("clientPhone", { length: 50 }),
  clientTimezone: varchar("clientTimezone", { length: 100 }).notNull(),
  bookingDateTimeUTC: timestamp("bookingDateTimeUTC").notNull(),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled", "completed"])
    .default("confirmed")
    .notNull(),
  notes: text("notes"),
  googleEventId: varchar("googleEventId", { length: 255 }),
  emailSent: boolean("emailSent").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

// ── Settings ────────────────────────────────────────────────────
export const settings = mysqlTable("settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value"),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;
