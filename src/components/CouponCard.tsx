"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CouponCard() {
  const [open, setOpen] = useState(false);

  const coupons = [
    {
      title: "Assured Cashback on Paytm",
      subtitle: "Flat ₹30 Cashback",
    },
    {
      title: "Assured Cashback on CRED",
      subtitle: "Get cashback of ₹10",
    },
    {
      title: "15% off on Kotak Debit Cards",
      subtitle: "15% off up to ₹250",
    },
  ];

  return (
    <div className="w-full rounded-xl border border-orange-200 bg-white shadow-sm overflow-hidden">
      {/* HEADER */}
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between px-2 py-3 cursor-pointer"
      >
        <div className="flex items-start gap-2">
          <img src="/coupon.png" className="w-5 h-5  mt-[2px]" />

          <div className="flex gap-1 flex-col">
            <p className="text-sm font-medium text-gray-900">
              Hey! you have a new coupons
            </p>
            <p className="text-xs text-gray-500">
              Tap to see what you have won
            </p>
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 md:w-[32px] md:h-[20px] text-gray-600 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* DROPDOWN */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-[250px] border-t" : "max-h-0"
        }`}
      >
        <div className="px-3 py-2 space-y-3">
          {coupons.map((item, index) => (
            <div key={index} className="flex gap-2">
              <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px]">
                %
              </div>

              <div>
                <p className="text-[12px] font-medium text-gray-800">
                  {item.title}
                </p>
                <p className="text-[11px] text-gray-500">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
