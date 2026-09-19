import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  findAllSettings,
  findSettingByKey,
  setSetting,
  getBusinessTimezone,
  getBusinessName,
} from "./queries/settings";

export const settingsRouter = createRouter({
  list: adminQuery.query(() => findAllSettings()),

  byKey: publicQuery
    .input(z.object({ key: z.string() }))
    .query(({ input }) => findSettingByKey(input.key)),

  getBusinessTimezone: publicQuery.query(() => getBusinessTimezone()),

  getBusinessName: publicQuery.query(() => getBusinessName()),

  set: adminQuery
    .input(z.object({ key: z.string(), value: z.string() }))
    .mutation(({ input }) => setSetting(input.key, input.value)),

  bulkSet: adminQuery
    .input(z.record(z.string()))
    .mutation(async ({ input }) => {
      const results = [];
      for (const [key, value] of Object.entries(input)) {
        results.push(await setSetting(key, value));
      }
      return results;
    }),
});
