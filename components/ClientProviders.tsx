"use client";

import { TRPCProvider } from "@/components/TRPCProvider";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/ScrollToTop";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider>
      <ScrollToTop />
      {children}
      <Toaster richColors position="top-right" />
    </TRPCProvider>
  );
}
