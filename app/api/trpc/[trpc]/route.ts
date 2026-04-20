import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";
import { appRouter } from "@/server/routers";
import { createContext } from "@/server/_core/context";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`[tRPC] Error on /${path ?? "<no-path>"}:`, error);
          }
        : undefined,
  });

export { handler as GET, handler as POST };
