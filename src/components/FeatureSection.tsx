"use client";

import Image from "next/image";
import LayoutContainer from "./LayoutContainer";

const features = [
  {
    id: 1,
    icon: "/service.png",
    title: "Same Day Service",
    alt: "Service icon",
  },
  {
    id: 2,
    icon: "group.png",
    title: "Verified Serviceman",
    alt: "Verified serviceman icon",
  },
  {
    id: 3,
    icon: "/frame.png",
    title: "Satisfaction Guaranteed",
    alt: "Satisfaction badge icon",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-1">
      <LayoutContainer>
        {/* Feature Container */}
        <div className="w-full mx-auto h-auto lg:h-[122px] hidden sm:flex flex-col sm:flex-row justify-between items-center gap-[30px] sm:gap-[20px] opacity-100 transform-none">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="w-full lg:w-[600px] h-[122px] gap-[5px] sm:gap-[16px] opacity-100 flex flex-col items-center justify-center text-center bg-transparent transform-none"
            >
              {/* Feature Icon */}
              <div className="w-[80px] h-[80px] sm:w-[64px] sm:h-[64px] relative flex-shrink-0">
                <img
                  src={feature.icon}
                  alt={feature.alt}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              {/* Feature Title */}
              <h3 className="mt-[12px] text-base sm:text-xs lg:text-[18px] font-semibold text-[#1A1A1A] dark:text-gray-300 leading-tight">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
}
