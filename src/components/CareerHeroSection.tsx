"use client";

import Image from "next/image";
import GradientButton2 from "./ui/GradientButton2";

export default function CareerHeroSection() {
  return (
    <section className="relative w-full min-h-[720px] md:h-[720px] pb-32 md:pb-0 overflow-visible px-4 md:px-0">
      {/* 🔶 Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ffac96] via-[#ffc296] to-[#ffd496]" />

      {/* 🟠 Circle */}
      <div className="hidden xl:block absolute left-[51%] top-24 w-[567px] h-[567px] bg-orange-400/40 rounded-full" />

      {/* 👩 Image */}
      <div className="hidden xl:block absolute right-[10%] bottom-0">
        <Image src="/girl.png" alt="girl" width={700} height={600} />
      </div>

      {/* 📄 Form (OVERFLOW MAGIC) */}
      <div
        className="
  relative md:absolute 
  md:left-[8%] md:-bottom-20 
  w-full max-w-[600px] mx-auto 
  mt-10 md:mt-0 
  h-auto md:h-[780px] 
  bg-white rounded-3xl shadow-sm p-6 md:p-10 z-20
"
      >
        <h2 className="text-[24px] md:text-[32px] font-semibold text-center mb-4">
          Apply for a job
        </h2>

        <div className="space-y-5">
          <input
            className="w-full p-3 bg-gray-100 rounded-lg outline-none text-black"
            placeholder="Full Name"
          />
          <input
            className="w-full p-3 bg-gray-100 rounded-lg outline-none"
            placeholder="Contact Number"
          />
          <input
            className="w-full p-3 bg-gray-100 rounded-lg outline-none"
            placeholder="Email Id"
          />
          <input
            className="w-full p-3 bg-gray-100 rounded-lg outline-none"
            placeholder="Looking for Job position"
          />
          <textarea
            className="w-full p-3 bg-gray-100 rounded-lg h-28 outline-none md:h-[300px] overflow-y-auto resize-none"
            placeholder="Experience & Details"
          />
        </div>

        <div className="mt-6 items-center flex justify-center">
          <GradientButton2 text="Send OTP" width="w-[260px]" className="" />
        </div>
      </div>
    </section>
  );
}
