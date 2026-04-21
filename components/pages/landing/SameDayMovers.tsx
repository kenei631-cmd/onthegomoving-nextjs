"use client";
// ==========================================================================
// ON THE GO MOVING — Same-Day Movers Landing Page
// Google Ads landing page — urgency-focused, large phone CTA, 3-step process
// noindex: paid traffic only
// ==========================================================================
import QuoteForm from "@/components/QuoteForm";
import { COMPANY } from "@/lib/siteData";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { Phone, CheckCircle, Clock, Zap, Star, Shield, Truck } from "lucide-react";

const STEPS = [
  {
    step: "1",
    title: "Call or Submit Your Info",
    desc: "Tell us your move date, locations, and size. We'll confirm availability within minutes.",
    icon: Phone,
  },
  {
    step: "2",
    title: "Get a Flat-Rate Quote",
    desc: "No hourly surprises. We give you a firm price before we show up — guaranteed.",
    icon: Zap,
  },
  {
    step: "3",
    title: "We Show Up & Move You",
    desc: "Our trained crew arrives on time, handles everything, and gets you settled same day.",
    icon: Truck,
  },
];

const TRUST_ITEMS = [
  { icon: Star, text: `${COMPANY.googleRating}★ (${COMPANY.googleReviewCount.toLocaleString()} reviews)` },
  { icon: Shield, text: "Licensed & Insured — WA HG-064180" },
  { icon: Clock, text: "Same-day availability — call to confirm" },
  { icon: CheckCircle, text: `Serving Seattle since ${COMPANY.founded}` },
];

export default function SameDayMovers() {
  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="relative bg-[#1a2e0a] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${BRAND_IMAGES.heroMovingCrew})` }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: headline + trust */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#75aa11] text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                <Clock size={12} /> Same-Day Available
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                Same-Day Movers<br />
                <span className="text-[#75aa11]">in Seattle</span>
              </h1>
              <p className="text-lg text-gray-200 mb-6 max-w-lg">
                Need to move today or tomorrow? On The Go Moving has crews available for last-minute and same-day moves across the Greater Seattle area. Call now to check availability.
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
              <h2 className="text-[#1a2e0a] text-xl font-bold mb-1">Get a Free Same-Day Quote</h2>
              <p className="text-gray-500 text-sm mb-4">We'll confirm availability and pricing within minutes.</p>
              <QuoteForm variant="inline" sourceLabel="landing-same-day-movers" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3-Step Process ── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-[#1a2e0a] text-center mb-10">
            How It Works — 3 Simple Steps
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {STEPS.map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-[#75aa11] text-white rounded-full flex items-center justify-center text-xl font-extrabold mx-auto mb-4">
                  {step}
                </div>
                <Icon size={24} className="text-[#75aa11] mx-auto mb-3" />
                <h3 className="font-bold text-[#1a2e0a] text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why choose us ── */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#1a2e0a] mb-4">
                Why Seattle Trusts On The Go Moving
              </h2>
              <ul className="space-y-4">
                {[
                  "Flat-rate pricing — no hourly clock surprises",
                  "Background-checked, uniformed crew members",
                  "Fully padded and wrapped furniture — zero damage policy",
                  "1 free month of storage with every move",
                  "Same-day and next-day availability (call to confirm)",
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
                alt="On The Go Moving crew loading truck"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[#75aa11] py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-3">Need to Move Today?</h2>
          <p className="text-white/90 mb-6">Call now to check same-day availability. We'll give you a flat-rate quote on the spot.</p>
          <a
            href={COMPANY.phoneHref}
            className="inline-flex items-center gap-3 bg-white text-[#1a2e0a] font-extrabold text-xl px-10 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
          >
            <Phone size={22} />
            {COMPANY.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
