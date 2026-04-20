"use client";

import { TRPCProvider } from "@/components/TRPCProvider";
import { Toaster } from "@/components/ui/sonner";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider>
      {children}
      <Toaster richColors position="top-right" />
    </TRPCProvider>
  );
}
