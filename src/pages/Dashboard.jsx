// src/pages/Dashboard.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * Dashboard with:
 * - Top carousel that displays multiple images at once (responsive: 1/2/3/4)
 * - Product cards linking to /plan/:id and passing plan in location.state
 * - Enquire button sends the plan to /app/1-KVA via navigate(state)
 *
 * Put your images in public/solar/ as in your original file names.
 */

const banners = [
  "/solar/banner1.jpeg",
  "/solar/banner2.jpeg",
  "/solar/banner3.jpeg",
  "/solar/banner4.jpeg",
];

const listImage = "/solar/list.jpg"; // used for product detail modal

// products now contain canonical id/slug and numeric price/subsidy/downpayment
const products = [
  {
    id: "1-kva",
    Title: "1 KVA",
    price: 43576,
    PriceText: "₹ 43,576",
    downpayment: 5430.40,
    downpaymentText: "₹ 5,430.40",
    subsidy: 30000,
    subsidyText: "₹ 30,000",
    warrantyYears: 3,
    panels: "4 Pcs × 550W Solar",
    systemVoltage: "24V",
    banner: "/solar/banner1.jpeg",
    bullets: [
      "Monocrystalline panels",
      "Installation included",
      "Free site survey",
    ],
  },
  {
    id: "2-kva",
    Title: "2 KVA",
    price: 83976,
    PriceText: "₹ 83,976",
    downpayment: 10790.40,
    downpaymentText: "₹ 10,790.40",
    subsidy: 57000,
    subsidyText: "₹ 57,000",
    warrantyYears: 3,
    panels: "6 Pcs × 550W Solar",
    systemVoltage: "24V",
    banner: "/solar/banner2.jpeg",
    bullets: ["Higher output", "5-year performance guarantee"],
  },
  {
    id: "3-kva",
    Title: "3 KVA",
    price: 115000,
    PriceText: "₹ 1,15,000",
    downpayment: 16425.00,
    downpaymentText: "₹ 16,425.00",
    subsidy: 87625,
    subsidyText: "₹ 87,625",
    warrantyYears: 3,
    panels: "9 Pcs × 550W Solar",
    systemVoltage: "24V",
    banner: "/solar/banner3.jpeg",
    bullets: ["Commercial grade inverter", "Priority installation"],
  },
  {
    id: "5-kva",
    Title: "5 KVA",
    price: 195594,
    PriceText: "₹ 1,95,594",
    downpayment: 39747.60,
    downpaymentText: "₹ 39,747.60",
    subsidy: 96225,
    subsidyText: "₹ 96,225",
    warrantyYears: 3,
    panels: "12 Pcs × 550W Solar",
    systemVoltage: "24V",
    banner: "/solar/banner4.jpeg",
    bullets: ["Hybrid-ready", "Extended support"],
  },
  {
    id: "10-kva",
    Title: "10 KVA",
    price: 297825,
    PriceText: "₹ 2,97,825",
    downpayment: 75930.00,
    downpaymentText: "₹ 75,930.00",
    subsidy: 108000,
    subsidyText: "₹ 1,08,000",
    warrantyYears: 3,
    panels: "18 Pcs × 550W Solar",
    systemVoltage: "24V",
    banner: "/solar/banner1.jpeg",
    bullets: ["Industrial scale", "Custom install"],
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  // carousel state
  const [index, setIndex] = useState(0); // current shift in items (0..banners.length-1)
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // number of visible slides (responsive)
  const getVisibleCount = (w) => {
    if (w >= 1024) return 4; // lg+
    if (w >= 768) return 3; // md
    if (w >= 640) return 2; // sm
    return 1; // mobile
  };
  const [visible, setVisible] = useState(() =>
    getVisibleCount(window.innerWidth)
  );

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  // update visible on resize
  useEffect(() => {
    const onResize = () => setVisible(getVisibleCount(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // autoplay: move by one image each tick
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (i) =>
    setIndex(((i % banners.length) + banners.length) % banners.length);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  const openDetails = (product) => {
    setModalProduct(product);
    setModalOpen(true);
  };

  // Helper: navigate to plan details and pass plan in state
  const openPlan = (plan) => {
    navigate(`/plan/${plan.id}`, { state: { plan } });
  };

  // Helper: enquire (navigate to your Enquiry route and pass plan)
  const enquirePlan = (plan) => {
    navigate("/app/1-KVA", { state: { plan } });
  };

  // calculate widths for multi-show sliding
  const visibleCount = Math.min(visible, banners.length);
  const itemWidthPercent = 100 / visibleCount; // each visible item width within viewport

  return (
    <div className="min-h-screen bg-gray-50 pb-12 min-w-screen">
      {/* ---------------- MULTI-ITEM CAROUSEL ---------------- */}
      <div className="hidden sm:grid max-w-7xl mx-auto px-1 mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
        {banners.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`banner-${i}`}
            className="w-full h-[450px] object-cover rounded-xl shadow"
          />
        ))}
      </div>

      {/* MOBILE CAROUSEL (only visible on small screens) */}
      <div
        className="sm:hidden max-w-full overflow-hidden relative mt-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{
            width: `${banners.length * 100}%`,
            transform: `translateX(-${(index * 100) / banners.length}%)`,
          }}
        >
          {banners.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`slide-${i}`}
              className="w-full h-[450px] object-cover rounded-xl"
            />
          ))}
        </div>

        {/* MOBILE DOTS */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* ---------------- INTRO ---------------- */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h1 className="text-2xl font-semibold">
            Welcome to Deeksha Gramin Solar
          </h1>
          <p className="text-gray-600 mt-1">
            Explore recommended solar installation packages below.
          </p>
        </div>
      </div>

      {/* ---------------- PRODUCT CARDS ---------------- */}
      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <article
            key={p.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col overflow-hidden"
          >
            <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={listImage}
                alt={`${p.Title} preview`}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold">{p.Title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {p.panels} · {p.batteries}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold text-green-600">
                    {p.PriceText}
                  </div>
                  <div className="text-xs text-gray-400">
                    One-time cost (est.)
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {/* View details (navigates to PlanDetails and passes plan in state) */}
                  {/* Enquire (navigates to Enquiry and passes plan state) */}
                  <button
                    onClick={() => enquirePlan(p)}
                    className="px-3 py-2 border rounded-md text-sm hover:bg-gray-50"
                  >
                    Enquire
                  </button>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-400">
                Est. installation: 3–7 days
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ---------------- CTA / Contact ---------------- */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-gradient-to-r from-yellow-50 to-white border border-yellow-100 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <h4 className="text-lg font-semibold">Want a custom quote?</h4>
            <p className="text-sm text-gray-600 mt-1">
              Leave your details and we’ll get back with a personalized
              estimate.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="#contact"
              className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-md font-medium shadow"
            >
              Request a quote
            </a>
          </div>
        </div>
      </div>

      {/* ---------------- DETAILS MODAL (shows list image) ---------------- */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-4xl w-full overflow-auto"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">
                {modalProduct?.Title || "Details"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close"
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <img
                src={listImage}
                alt="Full specification list"
                className="w-full h-auto object-contain"
              />
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    alert("Request submitted");
                    setModalOpen(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Request site visit
                </button>
                <a
                  href={`tel:+919431167436`}
                  className="px-4 py-2 border rounded-md text-sm"
                >
                  Call now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
