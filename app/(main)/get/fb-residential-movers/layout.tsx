"use client";
// ==========================================================================
// ON THE GO MOVING — FB Residential Movers Landing Page Layout
// Overrides the parent /get/ layout for FB paid traffic pages.
// - No phone number anywhere (FB Ads can't track calls)
// - No sticky phone bar — replaced with form-scroll CTA bar
// - Uses HeaderLandingFb and FooterLandingFb (phone-free variants)
// ==========================================================================
import HeaderLandingFb from "@/components/layout/HeaderLandingFb";
import FooterLandingFb from "@/components/layout/FooterLandingFb";

export default function FbLandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderLandingFb />
      <main className="flex-1 pb-20 lg:pb-0">
        {children}
      </main>
      <FooterLandingFb />
    </div>
  );
}
