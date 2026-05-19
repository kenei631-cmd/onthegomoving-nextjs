"use client";
// ==========================================================================
// ON THE GO MOVING — FB Residential Movers Page Layout
// Phone-free: HeaderLandingFb + FooterLandingFb only.
// No sticky phone bars. All conversions via form.
// ==========================================================================
import HeaderLandingFb from "@/components/layout/HeaderLandingFb";
import FooterLandingFb from "@/components/layout/FooterLandingFb";

export default function FbLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderLandingFb />
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      <FooterLandingFb />
    </div>
  );
}
