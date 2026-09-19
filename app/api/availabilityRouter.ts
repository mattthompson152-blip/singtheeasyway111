import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findAllAvailability,
  findAvailabilityByDay,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from "./queries/availability";

export const availabilityRouter = createRouter({
  list: publicQuery.query(() => findAllAvailability()),

  byDay: publicQuery
    .input(z.object({ dayOfWeek: z.number().min(0).max(6) }))
    .query(({ input }) => findAvailabilityByDay(input.dayOfWeek)),

  create: adminQuery
    .input(
      z.object({
        dayOfWeek: z.number().min(0).max(6),
        startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        serviceId: z.number().optional(),
      }),
    )
    .mutation(({ input }) => createAvailability(input)),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        dayOfWeek: z.number().min(0).max(6).optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        serviceId: z.number().nullable().optional(),
        active: z.boolean().optional(),
      }),
    )
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return updateAvailability(id, data);
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteAvailability(input.id)),
});
