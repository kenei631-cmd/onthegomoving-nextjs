"use client";
// ==========================================================================
// ON THE GO MOVING — Commercial Moving Landing Page
// Google Ads landing page — B2B copy, downtime/COI messaging
// noindex: paid traffic only
// ==========================================================================
import QuoteForm from "@/components/QuoteForm";
import { COMPANY } from "@/lib/siteData";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { Phone, CheckCircle, Building2, Shield, Clock, FileText, Star, Truck } from "lucide-react";

const SERVICES = [
  {
    icon: Building2,
    title: "Office Relocations",
    desc: "Minimal downtime moves for offices of any size — from a single suite to a full floor.",
  },
  {
    icon: Truck,
    title: "Equipment & Inventory",
    desc: "Specialized handling for servers, workstations, heavy equipment, and sensitive inventory.",
  },
  {
    icon: FileText,
    title: "COI & Building Compliance",
    desc: "We provide Certificates of Insurance for any building requirement — no delays.",
  },
  {
    icon: Clock,
    title: "After-Hours & Weekend Moves",
    desc: "We work around your schedule to avoid business disruption — nights and weekends available.",
  },
];

const TRUST_ITEMS = [
  { icon: Star, text: `${COMPANY.googleRating}★ (${COMPANY.googleReviewCount.toLocaleString()} reviews)` },
  { icon: Shield, text: "Fully insured — COI provided on request" },
  { icon: Building2, text: "Offices, retail, medical, industrial" },
  { icon: CheckCircle, text: `Serving Seattle businesses since ${COMPANY.founded}` },
];

export default function CommercialMovingLanding() {
  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="relative bg-[#1a2e0a] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${BRAND_IMAGES.commercialFleet})` }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: headline + trust */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#75aa11] text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                <Building2 size={12} /> Commercial Moving
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                Commercial Movers<br />
                <span className="text-[#75aa11]">Seattle Businesses Trust</span>
              </h1>
              <p className="text-lg text-gray-200 mb-6 max-w-lg">
                Office relocations, equipment moves, and business transitions — done on your schedule to minimize downtime. COI provided for any building requirement.
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
              <h2 className="text-[#1a2e0a] text-xl font-bold mb-1">Request a Commercial Moving Quote</h2>
              <p className="text-gray-500 text-sm mb-4">We'll contact you within 1 business hour with availability and pricing.</p>
              <QuoteForm variant="inline" sourceLabel="landing-commercial-moving" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-[#1a2e0a] text-center mb-10">
            Commercial Moving Services
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

      {/* ── Why choose us ── */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
              <img
                src={BRAND_IMAGES.officeMoveAction}
                alt="On The Go Moving commercial office relocation"
                className="w-full h-72 object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-extrabold text-[#1a2e0a] mb-4">
                Why Seattle Businesses Choose Us
              </h2>
              <ul className="space-y-4">
                {[
                  "Dedicated project manager for every commercial move",
                  "COI (Certificate of Insurance) provided for any building",
                  "After-hours and weekend moves to avoid business disruption",
                  "Specialized handling for IT equipment and sensitive inventory",
                  "Flat-rate commercial pricing — no surprise hourly overruns",
                  `${COMPANY.googleRating}★ average across ${COMPANY.googleReviewCount.toLocaleString()} Google reviews`,
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-[#75aa11] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[#1a2e0a] py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-3">Ready to Plan Your Business Move?</h2>
          <p className="text-gray-300 mb-6">Call us to discuss your timeline, building requirements, and get a flat-rate commercial quote.</p>
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
