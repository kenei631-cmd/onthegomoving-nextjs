"use client";
// ==========================================================================
// ON THE GO MOVING — Residential Movers Landing Page
// Google Ads landing page — trust-focused, reviews, family-owned
// noindex: paid traffic only
// ==========================================================================
import QuoteForm from "@/components/QuoteForm";
import { COMPANY } from "@/lib/siteData";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { Phone, CheckCircle, Home, Star, Shield, Users, Package, Clock } from "lucide-react";

const MOVE_TYPES = [
  {
    icon: Home,
    title: "Single-Family Homes",
    desc: "Full-service moves for 2–5 bedroom homes across Seattle and the Eastside.",
  },
  {
    icon: Users,
    title: "Apartments & Condos",
    desc: "Experienced with stairs, elevators, and building move-in windows.",
  },
  {
    icon: Package,
    title: "Full-Pack Moves",
    desc: "We pack everything — boxes, furniture, fragile items — so you don't have to.",
  },
  {
    icon: Clock,
    title: "Long-Distance Moves",
    desc: "Moves across Washington State and beyond — same trusted crew.",
  },
];

const REVIEWS = [
  {
    name: "Sarah M.",
    location: "Bellevue, WA",
    stars: 5,
    text: "On The Go Moving made our move completely stress-free. The crew was on time, careful with all our furniture, and finished faster than expected. Highly recommend!",
  },
  {
    name: "James T.",
    location: "Seattle, WA",
    stars: 5,
    text: "Used them for a 3-bedroom house move. Flat-rate pricing was exactly what they quoted — no surprises. Professional team from start to finish.",
  },
  {
    name: "Linda K.",
    location: "Kirkland, WA",
    stars: 5,
    text: "Second time using On The Go Moving. They remembered our preferences from last time and handled everything perfectly. This is the only moving company I'll ever use.",
  },
];

const TRUST_ITEMS = [
  { icon: Star, text: `${COMPANY.googleRating}★ (${COMPANY.googleReviewCount.toLocaleString()} reviews)` },
  { icon: Shield, text: "Licensed & Insured — WA HG-064180" },
  { icon: Users, text: "Family-owned since 2009" },
  { icon: CheckCircle, text: "1 free month storage with every move" },
];

export default function ResidentialMoversLanding() {
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
                <Star size={12} /> {COMPANY.googleRating}★ Rated — {COMPANY.googleReviewCount.toLocaleString()} Reviews
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                Seattle's Most Trusted<br />
                <span className="text-[#75aa11]">Residential Movers</span>
              </h1>
              <p className="text-lg text-gray-200 mb-6 max-w-lg">
                Family-owned and operated since {COMPANY.founded}. On The Go Moving handles your home move with the care and attention it deserves — flat-rate pricing, no surprises.
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
              <h2 className="text-[#1a2e0a] text-xl font-bold mb-1">Get Your Free Moving Quote</h2>
              <p className="text-gray-500 text-sm mb-4">Flat-rate pricing — know your exact cost before move day.</p>
              <QuoteForm variant="inline" sourceLabel="landing-residential-movers" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Move types ── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-[#1a2e0a] text-center mb-10">
            Every Type of Residential Move
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {MOVE_TYPES.map(({ icon: Icon, title, desc }) => (
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

      {/* ── Reviews ── */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-[#1a2e0a] text-center mb-3">
            What Our Customers Say
          </h2>
          <p className="text-center text-gray-500 mb-10">
            {COMPANY.googleRating}★ average across {COMPANY.googleReviewCount.toLocaleString()} Google reviews
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <div key={review.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4 italic">"{review.text}"</p>
                <div>
                  <p className="font-bold text-[#1a2e0a] text-sm">{review.name}</p>
                  <p className="text-gray-400 text-xs">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why choose us ── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={BRAND_IMAGES.crewEntryway1}
                alt="On The Go Moving residential crew"
                className="w-full h-72 object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#1a2e0a] mb-4">
                Why Families Choose On The Go Moving
              </h2>
              <ul className="space-y-4">
                {[
                  "Flat-rate pricing — your quote is your final price",
                  "Background-checked, uniformed crew members",
                  "Fully padded and wrapped furniture — zero damage policy",
                  "1 free month of storage with every residential move",
                  "Family-owned and operated since 2009",
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
      <section className="bg-[#75aa11] py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-3">Ready to Get Moving?</h2>
          <p className="text-white/90 mb-6">Call us for a free flat-rate quote. No obligation, no surprises.</p>
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
