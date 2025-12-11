// src/pages/Dashboard.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Dashboard with:
 * - Top carousel that displays multiple images at once (responsive: 1/2/3/4)
 * - Product cards (uses list image as the detailed spec sheet)
 * - Modal to view the list image (detailed shopping list / specs)
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

const products = [
  {
    id: 1,
    title: "2KVA / 24V",
    panels: "4 pc 550W Bifacial",
    batteries: "2 pc 200Ah (5yrs)",
    price: "₹1,01,034",
  },
  {
    id: 2,
    title: "2KVA / 24V",
    panels: "4 pc 550W Topcon",
    batteries: "2 pc 200Ah (5yrs)",
    price: "₹1,05,226",
  },
  {
    id: 3,
    title: "5KVA / 48V",
    panels: "9 pc 550W Bifacial",
    batteries: "4 pc 200Ah (5yrs)",
    price: "₹2,16,764",
  },
  {
    id: 4,
    title: "5KVA / 48V",
    panels: "9 pc 550W Topcon",
    batteries: "4 pc 200Ah (5yrs)",
    price: "₹2,26,196",
  },
  {
    id: 5,
    title: "10KVA / 120V",
    panels: "18 pc 550W Bifacial",
    batteries: "10 pc 200Ah (5yrs)",
    price: "₹4,56,767",
  },
  {
    id: 6,
    title: "10KVA / 120V",
    panels: "18 pc 550W Topcon",
    batteries: "10 pc 200Ah (5yrs)",
    price: "₹4,75,633",
  },
  {
    id: 7,
    title: "3024 Bullet",
    panels: "4 pc 550W Monoperc",
    batteries: "2 pc 200Ah",
    price: "₹92,982",
  },
  {
    id: 8,
    title: "3024 Bullet",
    panels: "4 pc 590W Topcon",
    batteries: "2 pc 200Ah",
    price: "₹99,938",
  },
  {
    id: 9,
    title: "5KVA / 48V",
    panels: "9 pc 550W Monoperc",
    batteries: "4 pc 200Ah",
    price: "₹2,15,594",
  },
  {
    id: 10,
    title: "5KVA / 48V",
    panels: "9 pc 590W Topcon",
    batteries: "4 pc 200Ah",
    price: "₹2,25,789",
  },
  {
    id: 11,
    title: "10KVA / 120V",
    panels: "18 pc 550W Monoperc",
    batteries: "10 pc 200Ah",
    price: "₹4,08,925",
  },
  {
    id: 12,
    title: "10KVA / 120V",
    panels: "18 pc 590W Topcon",
    batteries: "10 pc 200Ah",
    price: "₹4,40,252",
  },
];

export default function Dashboard() {
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

  // calculate widths for multi-show sliding
  const visibleCount = Math.min(visible, banners.length);
  const itemWidthPercent = 100 / visibleCount; // each visible item width within viewport
  // container needs to be banners.length * itemWidthPercent percent wide
  const containerWidthPercent = banners.length * itemWidthPercent;
  const translatePercent = index * itemWidthPercent; // shift by item width each step

  return (
    <div className="min-h-screen bg-gray-50 pb-12 min-w-screen">
      {/* ---------------- MULTI-ITEM CAROUSEL ---------------- */}
      {/* DESKTOP GRID (hidden on mobile) */}
      <div className="hidden sm:grid max-w-6xl mx-auto px-4 mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {banners.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`banner-${i}`}
            className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-xl shadow"
          />
        ))}
      </div>

      {/* MOBILE CAROUSEL (only visible on small screens) */}
      <div className="sm:hidden max-w-full overflow-hidden relative mt-6">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{
            width: `${banners.length * 100}%`,
            transform: `translateX(-${index * (105 / banners.length)}%)`,
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
          <h1 className="text-2xl font-semibold">Welcome to your Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Explore recommended solar installation packages below. Click{" "}
            <strong>View details</strong> to see the full specification sheet.
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
                alt={`${p.title} preview`}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {p.panels} · {p.batteries}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold text-green-600">
                    {p.price}
                  </div>
                  <div className="text-xs text-gray-400">
                    One-time cost (est.)
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {/* <button
                    onClick={() => openDetails(p)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                  >
                    View details
                  </button> */}
                  <button
                    onClick={() => alert(`Enquiry placed for ${p.title}`)}
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
                {modalProduct?.title || "Details"}
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
