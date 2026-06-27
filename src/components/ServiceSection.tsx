"use client";

import {
  ChevronLeft,
  ChevronRight,
  Snowflake,
  Sparkles,
  Hammer,
  Bug,
  SprayCan,
  ClipboardCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ApplianceModal from "./ApplianceModal";
import { useState } from "react";
import LayoutContainer from "./LayoutContainer";

const services = [
  {
    title: "AC & Appliance Repair",
    icon: Snowflake,
    color: "purple",
    link: "/service/ac-repair",
  },
  {
    title: "Deep Cleaning Services",
    icon: Sparkles,
    color: "blue",
    link: "/service/deep-cleaning",
  },
  {
    title: "Handyman Services",
    icon: Hammer,
    color: "yellow",
    link: "/service/handyman",
  },
  {
    title: "Pest Control & Waterproofing",
    icon: Bug,
    color: "orange",
    link: "/service/pest-control",
  },
  {
    title: "Cleaning Packages",
    icon: SprayCan,
    color: "green",
    link: "/service/cleaning-packages",
  },
  {
    title: "AMC Service Plan",
    icon: ClipboardCheck,
    color: "gray",
    link: "/amc-services",
  },
];

const getColorClasses = (index: number) => {
  const colors = [
    {
      card: "bg-[#E9D5FF]",
      icon: "text-[#7E22CE]",
    },
    {
      card: "bg-[#DBEAFE]",
      icon: "text-[#0284C7]",
    },
    {
      card: "bg-[#FEF3C7]",
      icon: "text-[#F59E0B]",
    },
    {
      card: "bg-[#FFE4E6]",
      icon: "text-[#F97316]",
    },
    {
      card: "bg-[#DCFCE7]",
      icon: "text-[#16A34A]",
    },
    {
      card: "bg-[#E0F2FE]",
      icon: "text-[#0EA5E9]",
    },
    {
      card: "bg-[#FCE7F3]",
      icon: "text-[#DB2777]",
    },
    {
      card: "bg-[#F3E8FF]",
      icon: "text-[#9333EA]",
    },
    {
      card: "bg-[#FEF9C3]",
      icon: "text-[#CA8A04]",
    },
  ];

  return colors[index % colors.length];
};

export default function ServiceSection({
  data = [],
  applianceData = [],
}: {
  data?: any[];
  applianceData?: any[];
}) {
  const router = useRouter();
  const [showApplianceModal, setShowApplianceModal] = useState(false);

  const fetchCategoryServices = async (service: any) => {
    try {
      console.log("CLICKED SERVICE:", service);

      const url = `https://app.tasprocompany.in/api/services?state=Chhattisgarh&city=Raipur&state_id=1&service_category_id=${service.id}&service_category_name=${encodeURIComponent(service.name)}&state_name=Chhattisgarh&city_name=Raipur`;

      console.log("API URL:", url);

      const res = await fetch(url, {
        headers: {
          accept: "application/json",
        },
      });

      console.log("STATUS:", res.status);

      const data = await res.json();

      console.log("SERVICES API RESPONSE:", data);

      if (data?.status) {
        console.log("SUB CATEGORIES:", data.data);
      }

      router.push(
        `/service/${service.slug}?service_id=${service.service_id || service.id}`,
      );
    } catch (error) {
      console.log("SERVICES API ERROR:", error);
    }
  };

  const finalServices = data.length > 0 ? data : services;

  return (
    <section className="w-full sm:pb-10  sm:px-5">
      <LayoutContainer className="relative">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          {/* Left Side - Service Cards */}
          <div className="w-full lg:w-[40%] xl:w-[35%] flex flex-col">
            <h2 className="text-lg lg:text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-5 leading-[1.2] text-left max-w-[580px]">
              How can we serve you
              <br />
              today?
            </h2>

            <div
              className={`grid  grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-x-3 gap-y-5 xl:pb-0 sm:pb-10 ${
                finalServices.length > 6
                  ? "max-h-[320px] overflow-y-auto pr-2"
                  : ""
              }`}
            >
              {finalServices.map((service, index) => {
                const { card, icon } = getColorClasses(index);
                const Icon = services[index]?.icon || Snowflake;

                return (
                  <div
                    key={service.id || index}
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => {
                      if (service.name === "Appliances Repair & Service") {
                        setShowApplianceModal(true);
                      } else {
                        fetchCategoryServices(service);
                      }
                    }}
                  >
                    <div
                      className={`${card} w-full h-16 sm:h-24 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-all duration-300`}
                    >
                      <Icon className={`w-8 h-8 sm:w-12 sm:h-12 ${icon}`} />
                    </div>

                    <p className="mt-2 text-[12px] sm:text-sm font-medium text-gray-800 dark:text-gray-300 text-center leading-tight">
                      {service.name || service.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Hero Image Banner */}
          <div className="w-full sm:block hidden lg:w-[60%] relative h-[300px] lg:h-[450px] rounded-3xl overflow-hidden shadow-xl group lg:ml-8">
            <Image
              src="/heroimage.jpg"
              alt="Home Services"
              fill
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
        <ApplianceModal
          isOpen={showApplianceModal}
          onClose={() => setShowApplianceModal(false)}
          data={applianceData}
        />
      </LayoutContainer>
    </section>
  );
}
