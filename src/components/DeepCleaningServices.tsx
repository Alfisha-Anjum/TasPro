"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import LayoutContainer from "./LayoutContainer";

const cleaningServices = [
  {
    title: "Deep Home Cleaning",
    rating: 4.8,
    reviews: 12000,
    price: 550,
    originalPrice: 650,
    duration: "45 min",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop&q=80",
  },
  {
    title: "Furniture Cleaning",
    rating: 4.7,
    reviews: 8000,
    price: 450,
    originalPrice: 550,
    duration: "60 min",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop&q=80",
  },
  {
    title: "Office Cleaning",
    rating: 4.9,
    reviews: 5000,
    price: 850,
    originalPrice: 950,
    duration: "2 Hours",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop&q=80",
  },
  {
    title: "Post Construction",
    rating: 4.6,
    reviews: 3000,
    price: 1250,
    originalPrice: 1500,
    duration: "4 Hours",
    image:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=300&h=200&fit=crop&q=80",
  },
  {
    title: "Bathroom Cleaning",
    rating: 4.8,
    reviews: 15000,
    price: 350,
    originalPrice: 450,
    duration: "30 min",
    image: "/bathroom.png",
  },
];

const getServiceImage = (name: string) => {
  const lower = name.toLowerCase();

  if (lower.includes("deep")) return "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop&q=80";
  if (lower.includes("furniture")) return "/furniture.png";
  if (lower.includes("office")) return "/officeclean.png";
  if (lower.includes("post")) return "/postconstruction.png";
  if (lower.includes("bathroom")) return "/bathroom.png";
  if (lower.includes("ac")) return "/10.svg";
  if (lower.includes("washing")) return "/2.svg";
  if (lower.includes("plumber")) return "/plumber.png";
  if (lower.includes("electric")) return "/electrician.png";

  return "/deepclean.png";
};
const DeepCleaningServices = ({
  title = "Deep Cleaning Services",
  data = [],
}: {
  title?: string;
  data?: any[];
}) => {
  const finalServices = data.length > 0 ? data : cleaningServices;
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [canScroll, setCanScroll] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -307, behavior: "smooth" });
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

const checkScrollState = () => {
  const slider = sliderRef.current;
  if (!slider) return;

  const { scrollLeft, scrollWidth, clientWidth } = slider;

  setCanScroll(finalServices.length > 1 && scrollWidth > clientWidth + 5);
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
  // const checkScrollable = () => {
  //   const slider = sliderRef.current;
  //   if (!slider) return;

  //   setCanScroll(slider.scrollWidth > slider.clientWidth);
  // };


  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 307, behavior: "smooth" });
      setCurrentIndex((prev) => Math.min(finalServices.length - 1, prev + 1));
    }
  };

  // Auto scroll functionality
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const maxScroll =
          sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        const currentScroll = sliderRef.current.scrollLeft;

        if (currentScroll >= maxScroll) {
          // Reset to beginning when reaching the end
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
          setCurrentIndex(0);
        } else {
          scrollRight();
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  // const handleBookService = (serviceTitle: string) => {
  //  router.push(
  //    `/service/${
  //      service.slug ||
  //      (service.title || service.name).toLowerCase().replace(/\s+/g, "-")
  //    }?service_id=${service.id}`,
  //  );
  // };

   const ResponsiveContainer = ({
     children,
   }: {
     children: React.ReactNode;
   }) => {
     return (
       <>
         {/* Mobile */}
         <div className="block sm:hidden w-full px-2">{children}</div>

         {/* sm and above */}
         <div className="hidden sm:block">
           <LayoutContainer>{children}</LayoutContainer>
         </div>
       </>
     );
   };


  return (
    <div className="pt-5 bg-white dark:bg-gray-900">
    <ResponsiveContainer>
        <div className=" mx-auto">
          {/* Updated Heading */}
          <h2
            className="text-gray-900 dark:text-gray-200 font-semibold mb-2 text-lg sm:text-2xl"
            style={{
              // fontSize: "24px",
              fontWeight: "600",
              textAlign: "left",
           
            }}
          >
            {title}
          </h2>

          <div
            className="relative"
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
          >
            <div
              ref={sliderRef}
              className="flex overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [scrollbar-width:none] snap-x items-center"
              style={{ gap: "20px" }}
            >
              {finalServices.map((service, index) => (
                <div key={index} className="flex-shrink-0 snap-center">
                  <ServiceCard
                    title={service.title || service.name}
                    image={getServiceImage(service.title || service.name)}
                    rating={Number(service.rating) || 0}
                    reviewCount={service.reviews || 0}
                    price={service.price || service.visiting_charge || 0}
                    originalPrice={
                      service.originalPrice || service.oldPrice || 0
                    }
                    duration={`${service.duration || 30} min`}
                    onAdd={() =>
                      router.push(
                        `/service/${service.slug || (service.title || service.name).toLowerCase().replace(/\s+/g, "-")}`,
                      )
                    }
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
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
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default DeepCleaningServices;
