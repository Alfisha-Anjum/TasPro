"use client";

import { useEffect, useState } from "react";

const SERVICES = [
  "AC Repair",
  "Air Cooler",
  "Gas Stove Repair",
  "Water Heater",
  "Washing Machine",
  "Refrigerator",
  "Microwave",
  "Kitchen Chimney",
  "TV Repair",
  "Computer Repair",
];

export default function HomeStartupModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const shown = localStorage.getItem("homeStartupModalShown");
      if (!shown) {
        // small delay so animation feels natural on load
        setTimeout(() => setOpen(true), 120);
      }
    } catch (e) {
      setOpen(true);
    }
  }, []);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem("homeStartupModalShown", "1");
    } catch (e) {}
  };

  if (!mounted) return null;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={close}
          ></div>

          <div
            role="dialog"
            aria-label="Appliance Repair & Service"
            className={`relative w-full max-w-2xl mx-4 bg-white rounded-[20px] shadow-2xl p-5 sm:p-6 transform transition-all duration-300 ${
              open ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-600 hover:text-[#FF6B2C] p-2 rounded-full"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <h2 className="text-xl font-semibold text-center mb-6">Appliance Repair & Service</h2>

            <div className="grid grid-cols-3 gap-4">
              {SERVICES.map((s) => (
                <div
                  key={s}
                  className="group flex flex-col items-center text-center p-3 rounded-lg cursor-pointer transition-colors duration-200 bg-transparent hover:bg-orange-50"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2 transition-colors duration-200 group-hover:bg-[#FFEDE6]">
                    {/* simple generic appliance SVG icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="4" width="18" height="14" rx="2" stroke="#9CA3AF" strokeWidth="1.5" />
                      <path d="M8 8H16" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="1" fill="#9CA3AF" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-700 font-medium">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
