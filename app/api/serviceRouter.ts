import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findAllServices,
  findActiveServices,
  findServiceById,
  createService,
  updateService,
  deleteService,
} from "./queries/services";

export const serviceRouter = createRouter({
  list: publicQuery.query(() => findActiveServices()),

  listAll: adminQuery.query(() => findAllServices()),

  byId: publicQuery
    .input(z.object({ id: z.number() }))
    .query(({ input }) => findServiceById(input.id)),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        duration: z.number().min(5).max(480),
        price: z.number().min(0).optional(),
        color: z.string().optional(),
      }),
    )
    .mutation(({ input }) => createService(input)),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        description: z.string().nullable().optional(),
        duration: z.number().min(5).max(480).optional(),
        price: z.number().min(0).optional(),
        color: z.string().optional(),
        active: z.boolean().optional(),
      }),
    )
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return updateService(id, data);
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteService(input.id)),
});
