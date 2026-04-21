"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

// ClientProviders uses React context (useState, useContext) which cannot run during SSR prerendering.
// Using dynamic with ssr:false ensures these providers only mount on the client.
const ClientProviders = dynamic(
  () => import("@/components/ClientProviders").then((m) => m.ClientProviders),
  { ssr: false }
);

export function ClientProvidersWrapper({ children }: { children: ReactNode }) {
  return <ClientProviders>{children}</ClientProviders>;
}
