"use client";

import PackageCard from "./PackageCard";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LayoutContainer from "./LayoutContainer";

const packages = [
  {
    title: "Looking for Fridge Repair?",
    subtitle: "Professional fridge repair",
    image:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=250&fit=crop",
  },
  {
    title: "AC Servicing",
    subtitle: "Complete AC maintenance",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=250&fit=crop",
  },
  {
    title: "Need an Electrician?",
    subtitle: "Expert electrical solutions",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=250&fit=crop",
  },
  {
    title: "Kitchen Cleaning",
    subtitle: "Complete kitchen deep cleaning",
    image:
      "https://images.unsplash.com/photo-1558629414-1e5e4c5b5d4?w=400&h=250&fit=crop",
  },
];

const getPackageImage = (name: string) => {
  const lower = name.toLowerCase().trim();

  if (lower.includes("fridge") || lower.includes("refrigerator"))
    return "/8.svg";
  if (lower.includes("ac")) return "/10.svg";
  if (lower.includes("electric")) return "/12.svg";
  if (lower.includes("kitchen")) return "/6.svg";
  if (lower.includes("bathroom")) return "/11.svg";
  if (lower.includes("deep") || lower.includes("cleaning")) return "/10.svg";
  if (lower.includes("washing")) return "/2.svg";
  if (lower.includes("microwave")) return "/5.svg";
  if (lower.includes("chimney")) return "/6.svg";

  return "/10.svg";
};
const CleaningPackage = ({ data = [] }: { data?: any[] }) => {
  const finalPackages = data.length > 0 ? data : packages;
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
const checkScrollState = () => {
  const slider = sliderRef.current;
  if (!slider) return;

  const { scrollLeft, scrollWidth, clientWidth } = slider;

  setCanScroll(finalPackages.length > 1 && scrollWidth > clientWidth + 5);
  setAtStart(scrollLeft <= 5);
  setAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
};

  useEffect(() => {
    checkScrollState();

    const slider = sliderRef.current;

    if (slider) {
      slider.addEventListener("scroll", checkScrollState);
    }

    window.addEventListener("resize", checkScrollState);

    return () => {
      if (slider) {
        slider.removeEventListener("scroll", checkScrollState);
      }
      window.removeEventListener("resize", checkScrollState);
    };
  }, [finalPackages.length]);
 
   const ResponsiveContainer = ({
     children,
   }: {
     children: React.ReactNode;
   }) => {
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
    <ResponsiveContainer>
      <div className="flex justify-between items-center mt-5 mb-2">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Cleaning Package
        </h2>
      </div>

      <div className="relative group">
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [scrollbar-width:none] snap-x items-center"
          style={{ gap: "20px" }}
        >
          {finalPackages.map((pkg, index) => (
            <div
              key={index}
              className="flex-shrink-0 snap-center"
              style={{ width: "382px", height: "228px" }}
            >
              <PackageCard
                title={pkg.title || pkg.name}
                subtitle={pkg.subtitle || "Best Value"}
                image={getPackageImage(pkg.title || pkg.name)}
                onBook={() =>
                  router.push(
                    `/service/${pkg.slug || "services"}?service_id=${pkg.id}`,
                  )
                }
              />
            </div>
          ))}
        </div>

        {canScroll && !atStart && (
          <button
            onClick={scrollLeft}
            className="absolute left-[-25px] top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 hidden md:flex items-center justify-center border border-orange-600 text-orange-700 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {canScroll && !atEnd && (
          <button
            onClick={scrollRight}
            className="absolute right-[-25px] top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 hidden md:flex items-center justify-center border border-orange-600 text-orange-700 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </ResponsiveContainer>
  );
};

export default CleaningPackage;
