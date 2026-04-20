"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "@/lib/trpc";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_EXTERNAL_URL) return process.env.RENDER_EXTERNAL_URL;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

// Module-level singletons — only created once on the client, safe for SSR
let queryClientSingleton: QueryClient | undefined;
let trpcClientSingleton: ReturnType<typeof trpc.createClient> | undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: create a new instance per request to avoid shared state
    return new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } });
  }
  if (!queryClientSingleton) {
    queryClientSingleton = new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } });
  }
  return queryClientSingleton;
}

function getTrpcClient() {
  if (typeof window === "undefined") {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer: superjson,
        }),
      ],
    });
  }
  if (!trpcClientSingleton) {
    trpcClientSingleton = trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer: superjson,
          fetch(url, options) {
            return fetch(url, { ...options, credentials: "include" });
          },
        }),
      ],
    });
  }
  return trpcClientSingleton;
}

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const trpcClient = getTrpcClient();

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
