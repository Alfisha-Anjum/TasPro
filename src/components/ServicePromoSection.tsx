"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import LayoutContainer from "./LayoutContainer";

export default function ServicePromoSection() {
  const router = useRouter();
 const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        {/* Mobile */}
        <div className="block sm:hidden w-full ">{children}</div>

        {/* sm and above */}
        <div className="hidden sm:block">
          <LayoutContainer>{children}</LayoutContainer>
        </div>
      </>
    );
  };

  return (
    <section className="pt-5 ">
      <ResponsiveContainer>
        <div
          className="relative overflow-hidden shadow-xl py-2 px-5 sm:p-5 sm:px-10 flex-row"
          style={{
            width: "100%",
            // height: "340px",
            borderRadius: "24px",
            background: "linear-gradient(to right, #ff6b35, #ffa500)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // padding: "0 60px",
            gap: "10px",
          }}
        >
          {/* Left Content */}
          <div className="flex flex-col justify-center z-20 max-w-44 sm:max-w-[600px]">
            <h2 className="font-semibold text-white mb-2 leading-tight text-sm md:text-2xl lg:text-3xl xl:text-4xl">
              Appliances <br />
              Suraksha Packages
            </h2>
            <h3 className="font-medium text-white mb-2 text-sm md:text-lg lg:text-xl xl:text-2xl sm:block hidden">
              All Major Appliances Covered
            </h3>
            <p className="text-white/80 mb-0 sm:mb-4 leading-relaxed line-clamp-2 sm:line-clamp-none text-[10px] sm:text-sm">
              Protect your home appliances with our comprehensive coverage
              plans. Experience peace of mind with 24/7 support and certified
              technicians at your doorstep.
            </p>
            <button
              onClick={() => router.push("/services")}
              className="group mt-4 self-start flex items-center gap-2 rounded-full bg-white px-2 py-1 sm:px-6 sm:py-2.5 text-sm font-bold text-orange-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <p className="text-xs sm:text-base ">Book Now</p>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Image */}
          {/* Right Image */}
          <div className="relative flex items-end justify-end flex-1 min-w-[120px] sm:min-w-[180px] h-[180px] sm:h-[260px]">
            <img
              src="/image.png"
              alt="Home Appliances Collection"
              className="h-full w-full object-contain "
            />
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}
