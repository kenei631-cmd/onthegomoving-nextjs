"use client";
// ==========================================================================
// ON THE GO MOVING — General Quote Landing Page
// Google Ads landing page — branded/general, service overview cards + form
// noindex: paid traffic only
// ==========================================================================
import QuoteForm from "@/components/QuoteForm";
import { COMPANY } from "@/lib/siteData";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { Phone, CheckCircle, Home, Building2, Package, Truck, Star, Shield, Users, Clock } from "lucide-react";

const SERVICES = [
  {
    icon: Home,
    title: "Residential Moving",
    desc: "Houses, apartments, condos — full-service moves across Greater Seattle.",
    href: "/residential-moving/",
  },
  {
    icon: Building2,
    title: "Commercial Moving",
    desc: "Office relocations and business moves with minimal downtime.",
    href: "/commercial-moving/",
  },
  {
    icon: Package,
    title: "Storage Services",
    desc: "Private vault storage at our secured Redmond, WA facility.",
    href: "/storage-services/",
  },
  {
    icon: Truck,
    title: "Packing Services",
    desc: "Full-pack and partial-pack options — we handle boxes, furniture, and fragile items.",
    href: "/packing-services/",
  },
];

const TRUST_ITEMS = [
  { icon: Star, text: `${COMPANY.googleRating}★ (${COMPANY.googleReviewCount.toLocaleString()} reviews)` },
  { icon: Shield, text: "Licensed & Insured — WA HG-064180" },
  { icon: Users, text: "Family-owned since 2009" },
  { icon: Clock, text: "Flat-rate pricing — no surprises" },
];

export default function QuoteLanding() {
  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="relative bg-[#1a2e0a] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${BRAND_IMAGES.teamFleet})` }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: headline + trust */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#75aa11] text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                <Star size={12} /> Seattle's Most Trusted Movers
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                Get a Free Moving Quote<br />
                <span className="text-[#75aa11]">in Minutes</span>
              </h1>
              <p className="text-lg text-gray-200 mb-6 max-w-lg">
                On The Go Moving & Storage has served the Greater Seattle area since {COMPANY.founded}. Tell us about your move and we'll give you a flat-rate quote — no obligation, no surprises.
              </p>

              {/* Phone CTA */}
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center gap-3 bg-[#75aa11] hover:bg-[#5e8a0d] text-white font-extrabold text-xl px-8 py-4 rounded-xl transition-colors shadow-lg mb-6"
              >
                <Phone size={22} />
                {COMPANY.phone}
              </a>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                {TRUST_ITEMS.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-gray-200">
                    <Icon size={15} className="text-[#75aa11] flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quote form */}
            <div id="quote-form" className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
              <h2 className="text-[#1a2e0a] text-xl font-bold mb-1">Request Your Free Quote</h2>
              <p className="text-gray-500 text-sm mb-4">We'll respond within 1 business hour with availability and pricing.</p>
              <QuoteForm variant="inline" sourceLabel="landing-quote" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services overview ── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-[#1a2e0a] text-center mb-10">
            Our Moving Services
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {SERVICES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex gap-4">
                <div className="w-12 h-12 bg-[#e8f4d0] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-[#75aa11]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1a2e0a] text-lg mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust section ── */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#1a2e0a] mb-4">
                Why Seattle Chooses On The Go Moving
              </h2>
              <ul className="space-y-4">
                {[
                  "Flat-rate pricing — your quote is your final price",
                  "Background-checked, uniformed crew members",
                  "Fully padded and wrapped furniture — zero damage policy",
                  "1 free month of storage with every move",
                  "Family-owned and operated since 2009",
                  "Licensed & insured — WA HG-064180 / USDOT# 2120054",
                  `${COMPANY.googleRating}★ average across ${COMPANY.googleReviewCount.toLocaleString()} Google reviews`,
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-[#75aa11] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={BRAND_IMAGES.crewRamp}
                alt="On The Go Moving crew"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[#1a2e0a] py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-3">Ready to Get Your Free Quote?</h2>
          <p className="text-gray-300 mb-6">Call us now or fill out the form above. We'll respond within 1 business hour.</p>
          <a
            href={COMPANY.phoneHref}
            className="inline-flex items-center gap-3 bg-[#75aa11] hover:bg-[#5e8a0d] text-white font-extrabold text-xl px-10 py-4 rounded-xl transition-colors shadow-lg"
          >
            <Phone size={22} />
            {COMPANY.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
