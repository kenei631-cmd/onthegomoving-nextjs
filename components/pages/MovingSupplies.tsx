"use client";

// ON THE GO MOVING — Moving Supplies Page
// Design: Clean Pacific Utility — Forest green hero, gold CTAs, white content
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { COMPANY } from "@/lib/siteData";
import Link from "next/link";
import { CheckCircle, Package, Phone, ShoppingCart, Truck, Star } from "lucide-react";

const SUPPLIES = [
  {
    category: "Boxes",
    items: [
      { name: "Small Moving Box (1.5 cu ft)", price: "$2.50", desc: "Books, canned goods, heavy items" },
      { name: "Medium Moving Box (3.0 cu ft)", price: "$3.50", desc: "Kitchen items, toys, tools" },
      { name: "Large Moving Box (4.5 cu ft)", price: "$4.50", desc: "Linens, pillows, light bulky items" },
      { name: "Extra-Large Box (6.0 cu ft)", price: "$5.50", desc: "Comforters, lampshades, large items" },
      { name: "Wardrobe Box (24 x 24 x 48 in)", price: "$14.00", desc: "Hanging clothes — no folding needed" },
      { name: "Dish Pack Box (18 x 18 x 28 in)", price: "$8.00", desc: "Reinforced for fragile kitchenware" },
      { name: "Picture / Mirror Box", price: "$9.00", desc: "Telescoping for any size frame" },
    ],
  },
  {
    category: "Packing Materials",
    items: [
      { name: "Packing Paper (25 lbs)", price: "$18.00", desc: "Unprinted newsprint — no ink transfer" },
      { name: "Bubble Wrap Roll (12 in x 30 ft)", price: "$12.00", desc: "Extra cushioning for fragile items" },
      { name: "Packing Tape (2 in x 110 yd)", price: "$4.00", desc: "Heavy-duty, 3-pack available" },
      { name: "Tape Gun Dispenser", price: "$6.00", desc: "Speeds up box sealing significantly" },
      { name: "Stretch Wrap / Shrink Wrap", price: "$10.00", desc: "Protects furniture surfaces & bundles items" },
      { name: "Foam Pouches (25-pack)", price: "$8.00", desc: "Glassware, dishes, collectibles" },
    ],
  },
  {
    category: "Specialty Protection",
    items: [
      { name: "Mattress Bag — Queen/King", price: "$8.00", desc: "Keeps mattress clean during transport" },
      { name: "Mattress Bag — Twin/Full", price: "$6.00", desc: "Lightweight, tear-resistant poly" },
      { name: "Furniture Blanket / Moving Pad", price: "$12.00", desc: "Heavy-duty 80 lb blanket" },
      { name: "Sofa Cover (L-shape)", price: "$10.00", desc: "Plastic cover for sectionals & sofas" },
      { name: "TV Box (up to 70 in)", price: "$22.00", desc: "Foam-lined for flat-screen protection" },
      { name: "Marker & Label Pack", price: "$3.00", desc: "Color-coded room labels + black marker" },
    ],
  },
];

const FAQS = [
  {
    q: "Can I pick up supplies at your Redmond warehouse?",
    a: "Yes — call ahead to confirm availability and we'll have your order ready for pickup at our Redmond, WA facility. Most items are in stock same-day.",
  },
  {
    q: "Do you deliver moving supplies?",
    a: "We can deliver supplies when our crew arrives for your move at no extra charge. For standalone delivery, call us to arrange — minimum order applies.",
  },
  {
    q: "How many boxes do I need for a 2-bedroom apartment?",
    a: "A typical 2-bedroom apartment requires 40–60 boxes: roughly 15 small, 20 medium, 10 large, and 5 specialty boxes (wardrobe, dish pack). We're happy to do a free estimate over the phone.",
  },
  {
    q: "Do you buy back unused boxes?",
    a: "Yes — we buy back clean, undamaged boxes after your move at 50% of purchase price. Bring them to our Redmond warehouse within 30 days.",
  },
];

export default function MovingSupplies() {
  useEffect(() => {
    document.title = "Moving Boxes & Packing Supplies | On The Go Moving";
    const meta = document.querySelector("meta[name=\"description\"]");
    if (meta) meta.setAttribute("content", "Moving boxes, tape, bubble wrap & packing materials from On The Go Moving & Storage. Quality supplies for your Seattle-area move. Pickup in Redmond or delivered.");

    // Schema
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "On The Go Moving & Storage — Moving Supplies",
      "url": "https://onthegomoving.com/moving-supplies/",
      "telephone": "+14256459378",
      "address": { "@type": "PostalAddress", "addressLocality": "Redmond", "addressRegion": "WA", "postalCode": "98052" },
      "description": "Quality moving boxes, packing materials, bubble wrap, tape, and specialty protection supplies for your move.",
    });
    document.head.appendChild(schema);
    return () => { document.head.removeChild(schema); };
  }, []);

  return (
    <div className="min-h-screen bg-white font-body">
      <Header />

      {/* Hero */}
      <section
        className="relative py-20 bg-brand-forest text-white overflow-hidden"
        style={{ backgroundImage: `linear-gradient(rgba(30,60,30,0.85), rgba(30,60,30,0.92)), url(${BRAND_IMAGES.onTheGoTeam})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Package className="w-3.5 h-3.5" /> Moving Supplies
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-black mb-4 leading-tight">
              Quality Moving Supplies<br />
              <span className="text-brand-gold">at Honest Prices</span>
            </h1>
            <p className="text-green-100 text-lg mb-8 max-w-xl">
              Everything you need for a safe, organized move — boxes, tape, bubble wrap, mattress bags, and specialty packing materials. Available for pickup at our Redmond warehouse or delivered with your move.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={COMPANY.phoneHref} className="inline-flex items-center justify-center gap-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold text-lg px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg">
                <Phone className="w-5 h-5" /> Call to Order: {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-brand-green text-white py-3">
        <div className="container flex flex-wrap justify-center gap-6 text-sm font-semibold">
          {["Same-day pickup available", "Buy-back program on unused boxes", "Delivered with your move at no extra charge", "Licensed & Insured HG-064180"].map((t, i) => (
            <span key={i} className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-gold" />{t}</span>
          ))}
        </div>
      </div>

      {/* Supplies catalog */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-black text-brand-forest mb-3">Our Moving Supplies Catalog</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Professional-grade materials used by our own crews — available to you at the same prices.</p>
          </div>
          <div className="space-y-12">
            {SUPPLIES.map((cat, ci) => (
              <div key={ci}>
                <h3 className="font-display text-xl font-black text-brand-forest mb-4 pb-2 border-b-2 border-brand-green/20 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-brand-green" /> {cat.category}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.items.map((item, ii) => (
                    <div key={ii} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-green/30 hover:bg-green-50/30 transition-all">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-semibold text-brand-forest text-sm">{item.name}</span>
                        <span className="text-brand-green font-bold text-sm whitespace-nowrap">{item.price}</span>
                      </div>
                      <p className="text-gray-500 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-brand-forest/5 border border-brand-forest/10 rounded-2xl p-6 text-center">
            <p className="text-gray-600 mb-4">Need a custom supply bundle for your move? Call us and we'll put together exactly what you need.</p>
            <a href={COMPANY.phoneHref} className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-forest text-white font-bold px-8 py-3 rounded-lg transition-colors">
              <Phone className="w-4 h-4" /> {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Why buy from us */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="font-display text-2xl lg:text-3xl font-black text-brand-forest mb-8 text-center">Why Buy Supplies From Us?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Star className="w-6 h-6 text-brand-gold" />, title: "Professional Grade", desc: "The same boxes and materials our crews use on every move." },
              { icon: <Truck className="w-6 h-6 text-brand-gold" />, title: "Delivered With Your Move", desc: "Order supplies and have them delivered when our crew arrives — no extra trip." },
              { icon: <ShoppingCart className="w-6 h-6 text-brand-gold" />, title: "Buy-Back Program", desc: "Return clean, unused boxes within 30 days for 50% back." },
              { icon: <CheckCircle className="w-6 h-6 text-brand-gold" />, title: "Expert Advice", desc: "Not sure what you need? Our team will estimate your supply list for free." },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">{f.icon}</div>
                <h3 className="font-bold text-brand-forest mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-display text-2xl lg:text-3xl font-black text-brand-forest mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-brand-forest mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-forest text-white">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-black mb-4">Ready to Order?</h2>
          <p className="text-green-200 mb-8 max-w-xl mx-auto">Call us to place your order or bundle supplies with your upcoming move for maximum convenience.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={COMPANY.phoneHref} className="inline-flex items-center justify-center gap-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold text-lg px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg">
              <Phone className="w-5 h-5" /> {COMPANY.phone}
            </a>
            <Link href="/packing-services/">
              <span className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all cursor-pointer">
                View Packing Services
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
