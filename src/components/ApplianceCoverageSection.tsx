"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import LayoutContainer from "./LayoutContainer";

const appliances = [
  { name: "Air Conditioner", icon: "/service-icons/ac.svg" },
  { name: "Refrigerator", icon: "/service-icons/refrigerator.svg" },
  { name: "Washing Machine", icon: "/service-icons/washing-machine.svg" },
  { name: "Microwave Oven", icon: "/service-icons/microwave.svg" },
  { name: "Television", icon: "/service-icons/tv.svg" },
  { name: "Water Heater", icon: "/service-icons/geyser.svg" },
];

export default function ApplianceCoverageSection() {
  const router = useRouter();

  return (
    <section className="py-12 bg-white">
      <LayoutContainer>
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-white to-orange-50 border border-orange-100/50 shadow-xl">
          <div className="px-6 py-12 md:px-10 md:py-16 text-center">
            {/* Heading & Text */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              All Major Appliances Covered
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
              Professional service for all your home appliances with guaranteed quality work and expert technicians.
            </p>

            {/* Appliance Icons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-12 justify-items-center">
              {appliances.map((appliance, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center group cursor-pointer"
                  onClick={() => router.push('/services')}
                >
                  <div className="w-20 h-20 mb-3 flex items-center justify-center bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] group-hover:shadow-[0_8px_25px_rgba(255,107,44,0.15)] transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-50">
                    <img 
                      src={appliance.icon} 
                      alt={appliance.name}
                      className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/56?text=${appliance.name.charAt(0)}`;
                      }}
                    />
                  </div>
                  <span className="font-semibold text-gray-700 text-sm group-hover:text-orange-600 transition-colors">
                    {appliance.name}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => router.push('/services')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-0.5"
            >
              Book Appliance Service
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}