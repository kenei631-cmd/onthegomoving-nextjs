"use client";
import { ClientProviders } from "@/components/ClientProviders";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function ClientProvidersWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <ClientProviders>
      <div key={pathname}>{children}</div>
    </ClientProviders>
  );
}
