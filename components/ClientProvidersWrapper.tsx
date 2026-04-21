"use client";
import { ClientProviders } from "@/components/ClientProviders";
import type { ReactNode } from "react";

export function ClientProvidersWrapper({ children }: { children: ReactNode }) {
  return <ClientProviders>{children}</ClientProviders>;
}
