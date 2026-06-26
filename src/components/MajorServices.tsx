"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LayoutContainer from "./LayoutContainer";
import SafeImage from "@/components/SafeImage";

const majorServices = [
  {
    title: "Plumbing Service Agency",
    rating: 4.5,
    reviews: "12m Review",
    image: "/heroimage.jpg",
  },
  {
    title: "Electrical Service Agency",
    rating: 4.5,
    reviews: "12m Review",
    image: "/heroimage.jpg",
  },
  {
    title: "Waterproofing Service Agency",
    rating: 4.5,
    reviews: "12m Review",
    image: "/heroimage.jpg",
  },
  {
    title: "Bathroom & Kitchen Renovation",
    rating: 4.5,
    reviews: "12m Review",
    image: "/heroimage.jpg",
  },
];

const MajorServices = ({ data = [] }: { data?: any[] }) => {
  const finalServices = data.length > 0 ? data : majorServices;

  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);

  const [canScroll, setCanScroll] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const checkScrollState = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;

    setCanScroll(scrollWidth > clientWidth);
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
  }, [finalServices.length]);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -307, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 307, behavior: "smooth" });
  };

  const handleBookService = (serviceTitle: string) => {
    router.push(`/service/${serviceTitle.toLowerCase().replace(/\s+/g, "-")}`);
  };

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
    <section className="py-5 bg-white dark:bg-gray-900">
      <ResponsiveContainer>
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-2">
          Major Services
        </h2>

        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [scrollbar-width:none] snap-x"
          >
            {finalServices.map((service, index) => (
              <div
                key={index}
                className="flex-shrink-0 snap-center w-[260px] sm:w-[270px] lg:w-[285px] bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.12)] border border-gray-100"
              >
                <div className="w-full h-[145px] overflow-hidden">
                  <SafeImage
                    src={service.image}
                    alt={service.title || service.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-3">
                  <h3 className="text-[15px] font-semibold text-[#222] leading-tight mb-2">
                    {service.title || service.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                    <span className="text-[11px] text-gray-600">
                      {Number(service.rating) || 4.5}
                    </span>
                    <span className="text-[11px] text-gray-500">
                      ({service.reviews || "12m Review"})
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-green-600 uppercase whitespace-nowrap">
                      Free Consultancy
                    </span>

                    <button
                      onClick={() =>
                        service.slug
                          ? router.push(`/service/${service.slug}`)
                          : handleBookService(service.title || service.name)
                      }
                      className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-medium px-5 py-2 rounded-md"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {canScroll && !atStart && (
            <button
              onClick={scrollLeft}
              className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-orange-500 rounded-full hidden md:flex items-center justify-center z-10 text-orange-500"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {canScroll && !atEnd && (
            <button
              onClick={scrollRight}
              className="absolute right-[-12px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-orange-500 rounded-full hidden md:flex items-center justify-center z-10 text-orange-500"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </ResponsiveContainer>
    </section>
  );
};

export default MajorServices;
