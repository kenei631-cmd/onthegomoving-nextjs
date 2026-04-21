"use client";
// ==========================================================================
// ON THE GO MOVING — Storage Services Landing Page
// Google Ads landing page — vault storage differentiation vs self-storage
// noindex: paid traffic only
// ==========================================================================
import QuoteForm from "@/components/QuoteForm";
import { COMPANY } from "@/lib/siteData";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { Phone, CheckCircle, Package, Shield, Lock, Star, Truck, Clock } from "lucide-react";

const COMPARISON = [
  {
    feature: "Storage type",
    us: "Private vault — your items only",
    them: "Open unit — shared access",
  },
  {
    feature: "Access",
    us: "Scheduled access with our team",
    them: "Drive-up, anyone with a code",
  },
  {
    feature: "Security",
    us: "Secured warehouse, no public access",
    them: "Gated lot, open to all tenants",
  },
  {
    feature: "Moving integration",
    us: "We pick up, store, and deliver",
    them: "You haul it yourself",
  },
  {
    feature: "Free month offer",
    us: "1 free month with any move",
    them: "No free month",
  },
];

const TRUST_ITEMS = [
  { icon: Star, text: `${COMPANY.googleRating}★ (${COMPANY.googleReviewCount.toLocaleString()} reviews)` },
  { icon: Shield, text: "Secured Redmond, WA facility" },
  { icon: Lock, text: "Private vaults — not shared units" },
  { icon: CheckCircle, text: "1 free month with any move" },
];

export default function StorageServicesLanding() {
  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="relative bg-[#1a2e0a] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${BRAND_IMAGES.storageWarehouse})` }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: headline + trust */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#75aa11] text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                <Package size={12} /> Storage Vaults — Not Self-Storage
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                Secure Storage<br />
                <span className="text-[#75aa11]">in Redmond, WA</span>
              </h1>
              <p className="text-lg text-gray-200 mb-6 max-w-lg">
                Unlike self-storage units, our private storage vaults are held in a secured Redmond warehouse — only accessible by our team. We pick up, store, and deliver your items. No hauling required.
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
              <h2 className="text-[#1a2e0a] text-xl font-bold mb-1">Get a Storage Quote</h2>
              <p className="text-gray-500 text-sm mb-4">Tell us what you need to store and we'll give you a flat monthly rate.</p>
              <QuoteForm variant="inline" sourceLabel="landing-storage-services" defaultFreeStorage={true} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Vault vs Self-Storage comparison ── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-[#1a2e0a] text-center mb-4">
            Vault Storage vs. Self-Storage
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
            Our storage vaults are private, secured, and managed by our team — not a public storage facility where anyone can access the building.
          </p>
          <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1a2e0a] text-white">
                  <th className="text-left px-4 py-3 font-semibold">Feature</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#75aa11]">On The Go Storage</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-300">Self-Storage Unit</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-medium text-[#1a2e0a]">{row.feature}</td>
                    <td className="px-4 py-3 text-gray-700">
                      <span className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-[#75aa11] flex-shrink-0" />
                        {row.us}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#1a2e0a] mb-4">
                How Our Storage Works
              </h2>
              <ul className="space-y-4">
                {[
                  "We pick up your items from your home or office",
                  "Items are loaded into a private vault at our Redmond facility",
                  "Your vault is sealed — only accessible by our team",
                  "When you're ready, we deliver directly to your new location",
                  "1 free month of storage included with any move",
                  "Flexible month-to-month pricing after the free period",
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
                src={BRAND_IMAGES.storageForklift}
                alt="On The Go Moving storage warehouse"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[#75aa11] py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-3">Need Secure Storage in Seattle?</h2>
          <p className="text-white/90 mb-6">Call us to discuss your storage needs and get a flat monthly rate. No long-term contracts required.</p>
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
