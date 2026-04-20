import { publicProcedure, router } from "./_core/trpc";
import { leadsRouter } from "./routers/leadsRouter";

export const appRouter = router({
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
  }),

  leads: leadsRouter,
});

export type AppRouter = typeof appRouter;
