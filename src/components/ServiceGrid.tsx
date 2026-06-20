"use client";

import { useRouter } from "next/navigation";
import LayoutContainer from "./LayoutContainer";

const services = [
  { title: "AC Repair", image: "/service-icons/ac.svg" },
  { title: "Geyser Repair", image: "/service-icons/geyser.svg" },
  { title: "Gas Stove Repair", image: "/service-icons/gas-stove.svg" },
  { title: "Water Cooler Repair", image: "/service-icons/water-cooler.svg" },
  { title: "Washing Machine Repair", image: "/service-icons/washing-machine.svg" },
  { title: "Kitchen Chimney Repair", image: "/service-icons/chimney.svg" },
  { title: "Refrigerator Repair", image: "/service-icons/refrigerator.svg" },
  { title: "Microwave Repair", image: "/service-icons/microwave.svg" },
  { title: "Water Purifier Repair", image: "/service-icons/water-purifier.svg" },
  { title: "TV Repair", image: "/service-icons/tv.svg" },
  { title: "Computer Repair", image: "/service-icons/computer.svg" },
  { title: "See All", image: "/service-icons/see-all.svg" },
];

export default function ServiceGrid() {
  const router = useRouter();

  return (
    <section className="bg-black py-[60px]">
      <LayoutContainer className="text-center">
        <h2 className="text-[32px] font-bold text-white mb-[30px]">
          Appliances Repair & Service
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => router.push("/services")}
              className="bg-[#f1f1f1] rounded-[20px] p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              <img
                src={service.image}
                alt={service.title}
                className="h-[80px] object-contain mb-3"
                onError={(e) => {
                  // Fallback to a placeholder if image is missing
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/80?text=" + service.title.charAt(0);
                }}
              />
              <h3 className="text-[14px] font-semibold text-[#222] text-center">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
}