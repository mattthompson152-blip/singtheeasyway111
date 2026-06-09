import { authRouter } from "./auth-router";
import { serviceRouter } from "./serviceRouter";
import { availabilityRouter } from "./availabilityRouter";
import { bookingRouter } from "./bookingRouter";
import { settingsRouter } from "./settingsRouter";
import { googleRouter } from "./googleRouter";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  service: serviceRouter,
  availability: availabilityRouter,
  booking: bookingRouter,
  settings: settingsRouter,
  google: googleRouter,
});

export type AppRouter = typeof appRouter;
