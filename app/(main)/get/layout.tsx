// ==========================================================================
// ON THE GO MOVING — /get/ Layout Wrapper
// Used exclusively for Google Ads landing pages under /get/*
// - Uses HeaderLanding (logo + phone only, no nav)
// - Uses FooterLanding (simplified: logo, contact, license)
// - Includes mobile sticky bottom CTA bar (phone + GET FREE QUOTE button)
// ==========================================================================
import HeaderLanding from "@/components/layout/HeaderLanding";
import FooterLanding from "@/components/layout/FooterLanding";
import { COMPANY } from "@/lib/siteData";

export default function GetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderLanding />

      <main className="flex-1 pb-20 sm:pb-0">
        {children}
      </main>

      <FooterLanding />

      {/* Mobile sticky bottom CTA bar — visible only on small screens */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center gap-2 px-4 py-3">
          <a
            href={COMPANY.phoneHref}
            className="flex-1 flex items-center justify-center gap-2 bg-[#1a2e0a] text-white font-bold py-3 rounded-lg text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z"/>
            </svg>
            {COMPANY.phone}
          </a>
          <a
            href="#quote-form"
            className="flex-1 flex items-center justify-center gap-1 bg-[#75aa11] text-white font-bold py-3 rounded-lg text-sm"
          >
            Get Free Quote
          </a>
        </div>
      </div>
    </div>
  );
}
