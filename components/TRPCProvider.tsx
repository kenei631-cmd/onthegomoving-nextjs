"use client";
// Simplified provider - tRPC API removed for static export
// Form submissions now go directly to /.netlify/functions/submit-lead
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let queryClientSingleton: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } });
  }
  if (!queryClientSingleton) {
    queryClientSingleton = new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } });
  }
  return queryClientSingleton;
}

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
