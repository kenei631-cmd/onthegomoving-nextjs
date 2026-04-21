import { ClientProvidersWrapper } from "@/components/ClientProvidersWrapper";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientProvidersWrapper>{children}</ClientProvidersWrapper>;
}
