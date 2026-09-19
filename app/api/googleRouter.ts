import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import {
  getGoogleAuthUrl,
  getTokensFromCode,
  listUpcomingEvents,
} from "./lib/google-calendar";

export const googleRouter = createRouter({
  authUrl: publicQuery.query(() => {
    return { url: getGoogleAuthUrl() };
  }),

  callback: publicQuery
    .input(z.object({ code: z.string() }))
    .query(async ({ input }) => {
      try {
        const tokens = await getTokensFromCode(input.code);
        return {
          success: true,
          tokens: {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expiry_date: tokens.expiry_date,
          },
        };
      } catch (err) {
        return {
          success: false,
          error: err instanceof Error ? err.message : "Unknown error",
        };
      }
    }),

  events: publicQuery
    .input(
      z.object({
        access_token: z.string(),
        refresh_token: z.string().optional(),
        maxResults: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const events = await listUpcomingEvents({
          tokens: {
            access_token: input.access_token,
            refresh_token: input.refresh_token,
          },
          maxResults: input.maxResults,
        });
        return { success: true, events };
      } catch (err) {
        return {
          success: false,
          error: err instanceof Error ? err.message : "Unknown error",
        };
      }
    }),
});
