"use client";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

type Props = {
  setActiveView: (view: string) => void;
};

export default function MyCoupon({ setActiveView }: Props) {
  const coupons = Array(8).fill({
    discount: "10% Off",
    date: "2023 / 08 / 30",
    code: "ABCD678CE",
  });

  return (
    <div className="w-full md:px-6 lg:px-12">
      <div className="w-full flex justify-between items-center mb-6 md:hidden">
        {/* Back */}
        <button
          onClick={() => setActiveView("default")}
          className="text-black dark:text-white font-medium flex items-center gap-2 hover:text-orange-500 transition"
        >
          <ArrowLeft size={20} />
          My Coupons
        </button>
      </div>

      <h2 className="hidden md:block md:text-[18px] md:text-[#1B1B1B] dark:text-white md:font-semibold md:mb-6">
        My Coupons
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
        {coupons.map((item, i) => (
          <div
            key={i}
            className="flex items-stretch items-center rounded-[20px] border border-[#E5E5E5] overflow-hidden bg-white"
          >
            <div className="flex items-center justify-center">
              <div className="w-[90px] h-full flex item-center justify-center bg-gradient-to-r from-[#FF512F] to-[#F09819]">
                <img src="/couponimg.png" className="w-12 h-12 mt-6" />
              </div>

              {/* Right content */}
              <div className="px-3 py-3 flex-1">
                <p className="text-[16px] text-[#1B1B1B] font-semibold">
                  {item.discount}
                </p>
                <p className="text-[12px] text-gray-400 mt-1">{item.date}</p>
                <p className="text-[13px] text-gray-500 mt-1">{item.code}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
