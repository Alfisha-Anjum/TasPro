

"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  ChevronRight,
  Star,
  ChevronLeft,
  ChevronDown,
  Clock,
  X,
} from "lucide-react";
import Link from "next/link";
import { SERVICES_DATA } from "@/data/services";
import { useBooking } from "@/context/BookingContext";
import DeepCleaningServices from "@/components/DeepCleaningServices";
import ServicesSection from "@/components/ServicesSection";
import ServiceDetailsModal from "@/components/ServiceDetailsModal";
import { SelectCapacityModal } from "@/components/booking-flow/SelectCapacityModal";
import { AMCDurationModal } from "@/components/AMCDurationModal";
import { Heart } from "lucide-react";
import Image from "next/image";


type SubService = {
  id: number | string;
  name: string;
  description?: string;
  image: string;
  rating: number;
  reviews: number;
  duration: string;
  discountedPrice: number;
  originalPrice: number;
  warrantyDays?: number;
  warrantyDescription?: string;
  packageTag?: string;
  issueDescriptions?: any[];
  issueMoreDetails?: any[];
};

type CartItemService = SubService & {
  quantity: number;
};

export default function Page() {
  return <ACRepairLayout />;
}

const ACRepairLayout = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = params?.slug as string;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  const serviceId = searchParams?.get("service_id");
  const subCategoryId = searchParams?.get("sub_category_id");
  const source = searchParams?.get("source") || "";
const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const brandsRef = useRef<HTMLDivElement | null>(null);
const [showDifferentServiceModal, setShowDifferentServiceModal] =
  useState(false);
const [pendingCartItem, setPendingCartItem] = useState<any>(null);
  const [serviceDetails, setServiceDetails] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>(
    service?.types?.[0]?.id || "",
  );
  // const [cartItems, setCartItems] = useState<CartItemService[]>([]);
  // const { cartItems, addToCart, removeFromCart } = useBooking();
  const [selectedService, setSelectedService] = useState<SubService | null>(
    null,
  );

  const [showModal, setShowModal] = useState(false);
  const [showCoupons, setShowCoupons] = useState(false);
  const [showWarrantyModal, setShowWarrantyModal] = useState(false);
  const [showCapacityModal, setShowCapacityModal] = useState(false);
  const [showAMCModal, setShowAMCModal] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
const [selectedWarrantyDays, setSelectedWarrantyDays] = useState<number>(30);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
const {
  cartItems,
  addToCart,
  removeFromCart,
  selectedAddress,
  setSelectedAddress,
} = useBooking();
  const [activeScroll, setActiveScroll] = useState<"tabs" | "brands">("tabs");

  const apiService = serviceDetails?.data;
  const offers = apiService?.offers || [];
  const faqData = apiService?.faqs || [];
  const reviews = apiService?.reviews || [];

  const galleryImages = Array.isArray(apiService?.gallery_images)
    ? apiService.gallery_images
    : [];

    const handleAddService = (subService: any) => {
  const newItem = {
    id: subService.id,
    name: subService.name,
    subService: subService.name,
    serviceName: apiService?.name,
    price: subService.discountedPrice,
    discountedPrice: subService.discountedPrice,
    originalPrice: subService.originalPrice,
    quantity: 1,
    service_id: Number(serviceId),
    service_category_id: apiService?.service_category_id || apiService?.id,
    service_sub_category_id: activeTab,
    service_issue_id: subService.id,
  };

  console.log(newItem);
  console.log({
    final_price: subService.final_price,
    strike_price: subService.strike_price,
    base_price: subService.base_price,
  });
  const hasDifferentService =
    cartItems.length > 0 &&
    cartItems.some((item: any) => Number(item.service_id) !== Number(serviceId));

  if (hasDifferentService) {
    setPendingCartItem(newItem);
    setShowDifferentServiceModal(true);
    
    return;
  }

  addToCart(newItem as any);
};

  const safeImage = (img?: string | null) => {
    return img && img.trim() !== "" ? img : "/tas.logo.png";
  };
const handleWishlist = async (serviceIssueId: number | string) => {
  const id = Number(serviceIssueId);
  const oldWishlist = [...wishlistItems];

  const updatedWishlist = oldWishlist.includes(id)
    ? oldWishlist.filter((itemId) => itemId !== id)
    : [...oldWishlist, id];

  // instant UI
  setWishlistItems(updatedWishlist);
  localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://app.tasprocompany.in/api/customers/wish-lists/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    if (!data?.status) {
      setWishlistItems(oldWishlist);
      localStorage.setItem("wishlistItems", JSON.stringify(oldWishlist));
    }
  } catch (error) {
    setWishlistItems(oldWishlist);
    localStorage.setItem("wishlistItems", JSON.stringify(oldWishlist));
    console.log("Wishlist Error:", error);
  }
};
const getWishId = (item: any) =>
  Number(
    item.service_issue_id ||
      item.issue_id ||
      item.service_issue?.id ||
      item.issue?.id ||
      item.id,
  );

useEffect(() => {
  const fetchWishlistIds = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://app.tasprocompany.in/api/customers/wish-lists?state_name=Chhattisgarh&city_name=Raipur",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

     const ids = (data?.data || [])
       .map((item: any) => getWishId(item))
       .filter(Boolean);

     setWishlistItems(ids);
     localStorage.setItem("wishlistItems", JSON.stringify(ids));
    } catch (error) {
      console.log("Fetch wishlist ids error:", error);
    }
  };

  fetchWishlistIds();

  window.addEventListener("focus", fetchWishlistIds);
  window.addEventListener("wishlistUpdated", fetchWishlistIds);

  return () => {
    window.removeEventListener("focus", fetchWishlistIds);
    window.removeEventListener("wishlistUpdated", fetchWishlistIds);
  };
}, []);

  const banners =
    apiService?.banners?.length > 0
      ? apiService.banners
      : [safeImage(apiService?.images?.header_image1)];

  const [currentBanner, setCurrentBanner] = useState(0);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [banners]);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const url = serviceId
          ? `https://app.tasprocompany.in/api/service-details?service_id=${serviceId}&state_name=Chhattisgarh&city_name=Raipur`
          : `https://app.tasprocompany.in/api/service-details?id=${subCategoryId}`;

        const res = await fetch(url, {
          headers: { accept: "application/json" },
        });

        const data = await res.json();
        console.log("SERVICE DETAILS API DATA:", data);

        if (data?.status) {
          setServiceDetails(data);
          const firstTabId = data?.data?.subServices?.[0]?.sub_category_id;
          if (firstTabId) setActiveTab(String(firstTabId));
        }
      } catch (error) {
        console.log("SERVICE DETAILS API ERROR:", error);
      }
    };

    if (serviceId || subCategoryId) fetchServiceDetails();
  }, [serviceId, subCategoryId]);

  const fallbackBrands = [
    { name: "LG", logo: "/lg.png" },
    // { name: "Samsung", logo: "/sam.png" },
    { name: "Whirlpool", logo: "/whirl.png" },
    { name: "VOLTAS", logo: "/volt.png" },
    { name: "DAIKIN", logo: "/daikin.png" },
    { name: "Blue Star", logo: "/blueStar.png" },
    { name: "HITACHI", logo: "/hit.png" },
    { name: "MITSUBISHI", logo: "/mits.png" },
  ];

  const brands =
    apiService?.covered_brands?.map((brand: any) => {
      const matchedFallback = fallbackBrands.find(
        (item) => item.name.toLowerCase() === brand.name?.toLowerCase(),
      );

      return {
        ...brand,
        image: brand.image || matchedFallback?.logo || "/brand-placeholder.png",
      };
    }) || fallbackBrands.map((item) => ({ name: item.name, image: item.logo }));

  const apiTabs =
    apiService?.subServices?.map((cat: any) => ({
      id: String(cat.sub_category_id),
      name: cat.sub_category_name,
      items: cat.items || [],
    })) || [];

  const tabs = apiTabs.length > 0 ? apiTabs : service?.types || [];
  const currentType = tabs.find(
    (tab: any) => String(tab.id) === String(activeTab),
  );

  const displayServices: SubService[] =
    currentType?.items?.map((item: any) => ({
      id: item.id,
      name: item.name,
      title: item.name,
      image: safeImage(item.image || item.icon),
      rating: Number(item.rating || 0),
      reviews: item.reviews || 0,
      duration: `${item.duration_minutes || 30} min`,
      discountedPrice: Number(
        item.final_price ?? item.price ?? item.discount_price ?? 0,
      ),
      originalPrice: Number(item.strike_price || item.base_price || 0),
      warrantyDays: item.warranty_days,
      warrantyDescription: item.warranty_description,
      packageTag: item.package_tag,
      issueDescriptions: item.issue_descriptions || item.descriptions || [],
      issueMoreDetails: item.issue_more_details || item.details || [],
    })) ||
    currentType?.subServices ||
    [];

  const checkScrollState = (ref: React.RefObject<HTMLDivElement>) => {
    const slider = ref.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;
    setCanScroll(scrollWidth > clientWidth);
    setAtStart(scrollLeft <= 5);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  };

  useEffect(() => {
    const slider = tabsRef.current;
    if (!slider) return;

    const handleScroll = () => {
      setActiveScroll("tabs");
      checkScrollState(tabsRef);
    };

    slider.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => checkScrollState(tabsRef));
    checkScrollState(tabsRef);

    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, [tabs.length]);

  useEffect(() => {
    const slider = brandsRef.current;
    if (!slider) return;

    const handleScroll = () => {
      setActiveScroll("brands");
      checkScrollState(brandsRef);
    };

    slider.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => checkScrollState(brandsRef));

    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, [brands.length]);

  const scroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right",
  ) => {
    if (!ref.current) return;

    const width = ref.current.offsetWidth;
    ref.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

const updateQuantity = (
  service: any,
  type: "increase" | "decrease"
) => {
  if (type === "increase") {
    addToCart({
      ...service,
      quantity: 1,
    });
  } else {
    removeFromCart(service.id);
  }
};

const totalSavings = cartItems.reduce(
  (acc, item: any) =>
    acc +
    ((item.originalPrice || 0) + 50 - (item.discountedPrice || 0)) *
      item.quantity,
  0,
);


  return (
    <>
      <section>
        <div className="w-full max-w-7xl mx-auto lg:px-5">
          <div className="text-sm sm:text-base md:text-lg text-gray-600 px-5 py-4 sm:block hidden">
            <Link href="/" className="hover:text-[#FF6A00]">
              Home
            </Link>

            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white font-semibold">
              {apiService?.name || service?.name}
            </span>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-4 sm:gap-10 items-start w-full sm:px-5">
            <div className="w-[450px] pr-10">
              <h1 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white leading-snug">
                Best {apiService?.name || service?.name} <br />
                Service in {service?.city || "Your City"}
              </h1>

              <div className="mt-2 sm:mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-base">
                <Star className="w-5 h-5 fill-orange-500 text-orange-500" />

                <span className="font-semibold text-gray-900 dark:text-white">
                  {displayServices?.[0]?.rating || 0}
                </span>

                <span className="text-gray-600 dark:text-gray-300">
                  ({apiService?.reviews?.length || 0} reviews)
                </span>

                <span className="text-gray-400">|</span>

                <span className="font-semibold text-gray-900 dark:text-white">
                  {service?.bookings || 0}
                </span>

                <span className="text-gray-600 dark:text-gray-300">
                  (Bookings in {service?.city || "Your City"})
                </span>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl px-6 py-4 mt-6 relative max-w-lg sm:block hidden">
                <div className="absolute -top-3 left-5 bg-white px-3 py-1 border rounded-lg flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    TAS<span className="text-orange-500">Pro</span> Cover
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div
                    onClick={() => setShowWarrantyModal(true)}
                    className="flex justify-between items-center border rounded-xl px-4 py-3 cursor-pointer hover:border-orange-500"
                  >
                    <div className="flex gap-2 items-center">
                      <span>🏅</span>
                      <span className="text-sm text-gray-500 hover:text-orange-600">
                        {displayServices?.[0]?.warrantyDays || 0} Days Warranty
                      </span>
                    </div>
                    <span>›</span>
                  </div>

                  <div className="flex justify-between items-center border rounded-xl px-4 py-3 hover:border-orange-500">
                    <div className="flex gap-2 items-center">
                      <span>💳</span>
                      <Link
                        href={`/rate-card?service_id=${serviceId}`}
                        className="text-sm text-gray-500 hover:text-orange-600"
                      >
                        Standard rate card no hidden charges
                      </Link>
                    </div>
                    <span>›</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="relative w-full rounded-[24px] overflow-hidden group">
                {/* Banner Image */}
                <img
                  src={banners[currentBanner]}
                  alt="banner"
                  className="w-full h-full md:h-[300px]  object-cover transition-all duration-500"
                />

                {/* Left Button */}
                {banners.length > 1 && (
                  <button
                    onClick={prevBanner}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 border border-orange-500  h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <ChevronLeft className="w-5 h-5 text-orange-500" />
                  </button>
                )}

                {/* Right Button */}
                {banners.length > 1 && (
                  <button
                    onClick={nextBanner}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-orange-500 bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <ChevronRight className="w-5 h-5 text-orange-500" />
                  </button>
                )}

                {/* Dots */}
                {banners.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {banners.map((_: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentBanner(index)}
                        className={`h-2 rounded-full transition-all ${
                          currentBanner === index
                            ? "w-6 bg-white"
                            : "w-2 bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl pt-5 mx-auto sm:px-5">
        <div className="flex flex-col lg:flex-row gap-8 ">
          <div className="w-full lg:w-[60%] lg:flex-none">
            {offers.length > 0 && (
              <div className="sm:hidden mb-5 ">
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                  {offers.map((offer: any) => (
                    <div
                      key={offer.id}
                      className="flex-shrink-0 border border-gray-400 rounded-full px-4 py-1 flex items-center gap-2 bg-white"
                    >
                      <i className={`${offer.icon} text-orange-500 text-sm`} />

                      <p className="text-xs font-medium text-gray-500 whitespace-nowrap">
                        {offer.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}


            <div className="relative w-full flex items-center mb-5">
              {activeScroll === "tabs" && canScroll && !atStart && (
                <button
                  onClick={() => scroll(tabsRef, "left")}
                  className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center border border-[#FF6A00] z-20"
                >
                  <ChevronLeft className="w-6 h-6 text-[#FF6A00]" />
                </button>
              )}

              <div className="overflow-hidden">
                <div
                  ref={tabsRef}
                  className="flex gap-5 overflow-x-auto hide-scrollbar w-full py-2"
                >
                  {tabs.map((tab: any) => (
                    <div key={tab.id} className="flex-shrink-0">
                      <div
                        onClick={() => setActiveTab(String(tab.id))}
                        className={`w-40 h-[105px] p-2 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                          activeTab === String(tab.id)
                            ? "border-[#FF6A00] shadow-[0_4px_12px_rgba(255,106,0,0.18)]"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        {/* IMAGE */}
                        <img
                          src="/10.svg"
                          alt={tab.name}
                          className=" hidden sm:block w-14 h-10 object-contain mb-3"
                        />

                        {/* TEXT */}
                        <p
                          className={`text-sm sm:text-[12px] font-semibold ${
                            activeTab === String(tab.id)
                              ? "text-[#FF6A00]"
                              : "text-[#222]"
                          }`}
                        >
                          {tab.name?.replace(/repair/gi, "").trim()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {activeScroll === "tabs" && canScroll && !atEnd && (
                <button
                  onClick={() => scroll(tabsRef, "right")}
                  className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center border border-[#FF6A00] z-20"
                >
                  <ChevronRight className="w-6 h-6 text-[#FF6A00]" />
                </button>
              )}
            </div>


            <div className=" mt-14">
              <div
                className={`${
                  displayServices.length > 2
                    ? "max-h-[900px] overflow-y-auto pr-2 custom-scrollbar"
                    : ""
                }`}
              >
                <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 dark:text-white sm:mb-3">
                  Service
                </h3>
                {displayServices.map((subService) => (
                  <div
                    key={subService.id}
                    className="sm:w-[80%] w-full lg:max-w-lg"
                  >
                    <div className="sm:shadow-none shadow-lg rounded-xl py-4 px-4 w-full">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="relative w-28 h-28 rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={safeImage(subService.image)}
                              alt={subService.name || "Service"}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <button
                            onClick={() => {
                              if (source === "amc") {
                                setSelectedService(subService);
                                setShowCapacityModal(true);
                              } else {
                                handleAddService(subService);
                              }
                            }}
                            className="-mt-4 border z-10 border-orange-500 text-orange-500 px-4 py-1 rounded-lg text-sm font-medium bg-white shadow-sm"
                          >
                            Add
                          </button>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              onClick={() => {
                                setSelectedWarrantyDays(
                                  subService.warrantyDays || 30,
                                );
                                setShowWarrantyModal(true);
                              }}
                              className="cursor-pointer text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-md"
                            >
                              {subService.warrantyDays || 0} Days Warranty
                            </span>

                            <button
                              onClick={() => handleWishlist(subService.id)}
                              className="flex-shrink-0"
                            >
                              <Heart
                                className={`w-6 h-6 transition-all duration-300 ${
                                  wishlistItems.includes(Number(subService.id))
                                    ? "text-red-500 fill-red-500"
                                    : "text-gray-400"
                                }`}
                              />
                            </button>
                          </div>
                          <div className=" flex justify-between items-start sm:flex-row flex-col">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mt-1">
                                {subService.name}
                              </h4>

                              <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                                <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
                                <span>
                                  {typeof subService.rating === "number"
                                    ? subService.rating.toFixed(1)
                                    : "0.0"}
                                </span>
                                {/* <span>
                                  ({Math.round(subService.reviews / 1000)}m
                                  reviews)
                                </span> */}
                                <span>({subService.reviews} reviews)</span>
                              </div>

                              <div className="flex gap-2 py-2">
                                <Clock className="w-4 h-4" />
                                <p className="text-xs text-gray-700">
                                  {subService.duration} approx
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col mt-2 items-end">
                              {/* Wishlist Heart */}

                              {/* Price */}
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 dark:text-white text-lg">
                                  ₹{subService.discountedPrice}
                                </span>

                                {subService.originalPrice ? (
                                  <span className="text-xs text-gray-400 line-through">
                                    ₹{subService.originalPrice}
                                  </span>
                                ) : null}
                              </div>

                              {/* Offer Text */}
                              <span className="text-green-600 text-xs font-medium mt-1">
                                {subService.packageTag || "Offer Available"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <ul className="text-xs text-gray-500 mt-2 space-y-1">
                        <li>
                          • Get 2X deeper dust removal with Foam + PowerJet
                          technology
                        </li>
                        <li>
                          • Intense cleaning of both indoor & outdoor units
                        </li>
                      </ul>

                      <p
                        onClick={() => {
                          setSelectedService(subService);
                          setShowModal(true);
                        }}
                        className="text-blue-600 text-xs mt-2 cursor-pointer"
                      >
                        More Details {">>"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {showDifferentServiceModal && (
            <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center  justify-center px-4">
              <div className="bg-white w-full max-w-md p-6 shadow-xl rounded-xl">
                <h2 className="text-2xl font-bold mb-5">
                  Different Service Type
                </h2>

                <p className="text-xl leading-7 mb-8">
                  Adding this service will clear your current cart. Do you want
                  to continue?
                </p>

                <div className="flex justify-end gap-8">
                  <button
                    onClick={() => {
                      setShowDifferentServiceModal(false);
                      setPendingCartItem(null);
                    }}
                    className="text-[#8FE3D6] font-bold text-lg"
                  >
                    CANCEL
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("cartItems");
                      cartItems.forEach((item: any) => removeFromCart(item.id));

                      setTimeout(() => {
                        addToCart(pendingCartItem);
                        setShowDifferentServiceModal(false);
                        setPendingCartItem(null);
                      }, 100);
                    }}
                    className="text-[#8FE3D6] font-bold text-lg"
                  >
                    CONTINUE
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex-1  w-[30%] flex-shrink-0">
            <div className="flex flex-col items-start lg:items-end space-y-0 sm:space-y-6 max-w-[30%]">
              <div
                className="
    bg-white
    rounded-xl
    border
    border-gray-200
    p-5
    mb-5
    sticky
    top-20
    w-full

  "
              >
                {cartItems.length === 0 ? (
                  <div className="text-center">
                    <img
                      src="/pana.png"
                      alt="Empty Cart"
                      className="mx-auto mb-4  object-contain"
                    />
                    <p className="text-gray-600 font-medium mb-2">
                      Your Cart is empty
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Cart
                    </h3>

                    <div
                      className={`cart-scroll mb-4 space-y-4 ${
                        cartItems.length > 3
                          ? "h-[110px] overflow-y-auto overscroll-contain pr-2 "
                          : ""
                      }`}
                    >
                      <style jsx>{`
                        .cart-scroll {
                          scrollbar-width: none;
                          -ms-overflow-style: none;
                        }

                        .cart-scroll::-webkit-scrollbar {
                          display: none;
                        }
                      `}</style>

                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-3 items-center gap-2"
                        >
                          <div className="truncate">
                            <p className="text-sm text-gray-400 truncate">
                              {item.name}
                            </p>
                          </div>

                          <div className="flex justify-end">
                            <div className="flex items-center border border-orange-500 h-6 gap-3 px-2 rounded-md">
                              <button
                                onClick={() => updateQuantity(item, "decrease")}
                                className="text-orange-500"
                              >
                                -
                              </button>

                              <span className="text-sm">{item.quantity}</span>

                              <button
                                onClick={() => updateQuantity(item, "increase")}
                                className="text-orange-500"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">
                              ₹{item.discountedPrice * item.quantity}
                            </p>
                            <p className="text-xs text-gray-400 line-through">
                              ₹{item.originalPrice + 50}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">
                          ₹
                          {cartItems.reduce(
                            (acc, item) =>
                              acc + item.discountedPrice * item.quantity,
                            0,
                          )}
                        </p>
                        <p className="text-green-600 text-xs font-semibold">
                          You save ₹{totalSavings} on this order
                        </p>
                      </div>

                      <Link
                        href="/cart"
                        className="bg-orange-500 text-white px-5 py-3 rounded-lg text-sm font-medium"
                      >
                        View Cart
                      </Link>
                    </div>
                  </>
                )}
              </div>

              <div className="sm:hidden mt-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  Description
                </h2>

                <div
                  className="text-gray-500 text-sm leading-8 mb-8"
                  dangerouslySetInnerHTML={{
                    __html: apiService?.description || "",
                  }}
                />

                <Link
                  href={`/rate-card?service_id=${serviceId}`}
                  className="w-full border border-orange-500 text-orange-500 rounded-2xl px-5 py-2 flex items-center justify-between font-semibold text-sm mb-8"
                >
                  Standard Rate Card
                  <ChevronRight className="w-6 h-6" />
                </Link>
              </div>

              <div
                className="border rounded-xl p-5 mb-6 sm:block hidden    w-full
  "
              >
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">
                  Why TASPro Company
                </h4>

                {[
                  ["y1.png", "Trained & skilled technician serviceman"],
                  ["y2.png", "100% satisfaction guaranteed"],
                  ["y3.png", "On time service delivery"],
                  ["y4.png", "Quality assured service"],
                  ["y5.png", "Best price guaranteed"],
                  ["y6.png", "Hassle free work"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-2 mb-2">
                    <img
                      src={`/${icon}`}
                      alt="check"
                      className="w-4 h-4 object-contain"
                    />
                    <span className="text-xs text-gray-600">{text}</span>
                  </div>
                ))}
              </div>

              <div
                className="mb-6 border border-orange-500 rounded-xl px-4 py-3 sm:block hidden  w-full
   "
              >
                <button
                  onClick={() => setShowCoupons(!showCoupons)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex gap-4 ">
                    <img src="/coupon.png" alt="coupon" />
                    <div className="flex flex-col gap-2 items-start">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Coupons & Offer
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300">
                        Save upto 15% on every booking
                      </p>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      showCoupons ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showCoupons && (
                  <div className="mt-8 space-y-4">
                    {[
                      ["Assured Cashback on Paytm", "Flat ₹30 Cashback"],
                      ["Assured Cashback on CRED", "Get cashback of ₹10"],
                      ["15% off on Kotak Debit Cards", "15% off up to ₹250"],
                    ].map(([title, text]) => (
                      <div key={title} className="flex items-start gap-3">
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-500 text-white text-xs">
                          %
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {title}
                          </p>
                          <p className="text-xs text-gray-500">{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <ReviewsSection
          reviews={reviews}
          displayServices={displayServices}
          apiService={apiService}
        />

        <BrandsSection brands={brands} brandsRef={brandsRef} />

        <div className="sm:flex flex-col gap-1 my-5 hidden">
          <h2 className="text-2xl font-semibold dark:text-white">
            {apiService?.name} service in Raipur
          </h2>

          <div
            className="dark:text-gray-300 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: apiService?.description || "",
            }}
          />
        </div>

        <div className="sm:flex flex-col gap-1 hidden">
          <h2 className="text-2xl font-semibold dark:text-white">
            Hiring guide for {apiService?.name} service in Raipur
          </h2>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {apiService?.hiring_guide || "No hiring guide available."}
          </p>
        </div>

        <FAQSection
          faqData={faqData}
          openIndex={openIndex}
          toggleFAQ={toggleFAQ}
        />
      </div>

      <div className=" sm:block hidden overflow-x-auto hide-scrollbar">
        <DeepCleaningServices />
      </div>
      <MobilePhotos galleryImages={galleryImages} />

      {apiService?.need_from_you?.length > 0 && (
        <div className="max-w-7xl mx-auto mb-10 mt-10 sm:px-5 px-2 sm:hidden">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            What we will need from you
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {apiService.need_from_you.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm border border-gray-100"
              >
                <div className="w-10 h-10 flex items-center justify-center mb-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <p className="text-xs font-medium text-gray-800 text-center">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="hidden sm:block">
        <ServicesSection />
      </div>

      {showWarrantyModal && (
        <WarrantyModal
          warrantyDays={selectedWarrantyDays}
          onClose={() => setShowWarrantyModal(false)}
        />
      )}

      <SelectCapacityModal
        isOpen={showCapacityModal}
        onClose={() => setShowCapacityModal(false)}
        onContinue={(capacity) => {
          setSelectedCapacity(capacity);
          setShowCapacityModal(false);
          setShowAMCModal(true);
        }}
      />

      <AMCDurationModal
        isOpen={showAMCModal}
        onClose={() => setShowAMCModal(false)}
        onConfirm={() => {
          if (selectedService && selectedCapacity) {
            addToCart({
              id: String(selectedService.id),
              name: selectedService.name,
              serviceId: String(serviceId),
              serviceName: apiService?.name || "",
              subService: selectedService.name,
              capacity: selectedCapacity,
              price: selectedService.discountedPrice,
              discountedPrice: selectedService.discountedPrice,
              originalPrice: selectedService.originalPrice,
              image: selectedService.image,
              duration: selectedService.duration,
              rating: selectedService.rating,
              reviews: selectedService.reviews,
              quantity: 1,
              service_id: Number(serviceId),
              service_category_id:
                apiService?.service_category_id || apiService?.id,
            });
          }

          setShowAMCModal(false);
          setSelectedCapacity(null);
          setSelectedService(null);
        }}
      />

      <ServiceDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        service={selectedService}
        onAdd={() => {
          if (selectedService) {
            handleAddService(selectedService);
          }
        }}
      />
    </>
  );
};

const ReviewsSection = ({ reviews, displayServices, apiService }: any) => {
  return (
    <div className="w-full mx-auto mb-2">
      <div className="relative max-w-7xl text-center rounded-2xl p-0 md:p-8 overflow-visible">
        <div
          className="absolute inset-0 z-0 hidden md:block mt-5"
          style={{
            backgroundImage: "url('/wht.png')",
            backgroundSize: "auto 518px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.7)",
            borderRadius: "16px",
          }}
        />

        <div className="relative z-10">
          <h2 className="text-lg md:block hidden md:text-2xl font-semibold text-white text-right mb-2 pt-4">
            What our Customers Say?
          </h2>

          <h2 className="md:hidden block text-left pt-5 pb-2">Reviews</h2>

          <div className="hidden md:flex items-center justify-end gap-2 mb-8">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400" />
              ))}
            </div>

            <span className="text-lg font-semibold text-white">
              {displayServices?.[0]?.rating || 0}
            </span>

            <span className="text-sm text-white/80">
              ({apiService?.reviews?.length || 0} Reviews)
            </span>
          </div>

          <div className="md:hidden bg-[#F7F8FA]">
            <div className="bg-white rounded-xl mb-6 shadow-lg">
              <div className="flex items-center gap-6 px-5 py-5">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {displayServices?.[0]?.rating || 0}
                  </h3>

                  <div className="flex justify-center mt-3 text-orange-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(displayServices?.[0]?.rating || 0)
                            ? "fill-orange-500 text-orange-500"
                            : "fill-gray-300 text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-400 text-xs mt-2">
                    {displayServices?.[0]?.reviews || 0} reviews
                  </p>
                </div>

                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const percent =
                      apiService?.ratings_distribution?.find(
                        (item: any) => item.star === star,
                      )?.percentage || 0;

                    return (
                      <div key={star} className="flex gap-2">
                        <span className="text-sm w-4">{star}</span>
                        <Star className="w-4 h-4 fill-gray-400 text-gray-400" />
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              star >= 4
                                ? "bg-green-500"
                                : star === 3
                                  ? "bg-yellow-400"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {reviews.map((review: any, index: number) => (
                <div key={index} className="bg-white rounded-3xl p-5 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                      <div>
                        <div className="w-14 h-14 rounded-full bg-gray-100 overflow-hidden">
                          {review.avtar ? (
                            <img
                              src={review.avtar}
                              alt={review.name}
                              className="w-full h-full object-cover"
                            />
                          ) : null}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-900 text-sm text-left">
                          {review.name || "Anonymous"}
                        </h3>
                        <p className="text-gray-400 text-sm">{review.time}</p>
                      </div>
                    </div>

                    <div className="bg-orange-500 text-white rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1">
                      {review.rating || 0}
                      <Star className="w-3 h-3 fill-white text-white" />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm text-left">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex flex-col max-w-4xl mx-auto">
            <div className="flex md:flex-row w-full mx-auto bg-transparent rounded-2xl gap-8 pb-5 hide-scrollbar">
              {reviews.map((review: any) => (
                <div key={review.id} className="min-w-[300px]">
                  <div className="flex items-start bg-black/60 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden -top-12 -left-6 shrink-0">
                      <img
                        src={review.avtar || "/tiku.png"}
                        alt={review.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-white text-base md:text-lg">
                        {review.name || "Anonymous"}
                      </h3>

                      <div className="flex text-yellow-400 gap-0.5 mt-1.5">
                        {[...Array(review.rating || 0)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400" />
                        ))}
                      </div>

                      <span className="text-white text-xs font-medium tracking-wide">
                        {review.time}
                      </span>

                      <p className="text-white text-left leading-relaxed font-thin text-[15px] mt-3">
                        {review.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-8 mb-0 md:mb-10 relative md:flex items-start justify-start hidden">
              <p className="inline-flex items-center text-[#FF6A00] font-medium">
                View All Reviews
                <ChevronRight className="w-4 h-4" />
                <ChevronRight className="w-4 h-4 -ml-2" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BrandsSection = ({ brands, brandsRef }: any) => {
  return (
    <div className="mx-auto relative w-full overflow-hidden sm:mt-10">
      <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-5 ">
        We covered AC Brand
      </h2>

      <div className="sm:hidden">
        <div className="flex gap-8 overflow-x-auto hide-scrollbar pb-3">
          {brands.map((brand: any, index: number) => (
            <div key={index} className="min-w-[70px] text-center">
              <div className=" rounded-full border bg-white flex items-center justify-center">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className=" object-contain"
                />
              </div>

              <p className="text-xs sm:text-sm font-medium text-gray-600 mt-1 sm:mt-3">
                {brand.name}
              </p>
            </div>
          ))}
        </div>

        <p className="text-gray-400 text-xs sm:text-sm leading-5 mt-2 sm:mt-4 px-0 sm:px-5">
          These trademarks and/or logos are used for illustration purposes only
          and we disclaim any specific connection with the brand in this regard.
        </p>
      </div>

      <div className="hidden sm:block">
        <div
          ref={brandsRef}
          className="flex overflow-x-auto hide-scrollbar scroll-smooth gap-4 pb-2"
        >
          {brands.map((brand: any, index: number) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center text-center border w-28 h-28">
                <div className="relative h-[60px] w-full flex items-center justify-center">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="object-contain max-h-[60px]"
                  />
                </div>
              </div>

              <p className="text-xs mt-2 dark:text-white text-center w-full line-clamp-2">
                {brand.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

const FAQSection = ({ faqData, openIndex, toggleFAQ }: any) => {
  return (
    <div className="mx-auto mt-5 sm:mt-10">
      <h2 className="text-lg sm:text-2xl font-bold sm:font-semibold text-gray-900 dark:text-white mb-2">
        Frequently Asked Questions (FAQ)
      </h2>

      <div className="space-y-4 sm:pt-2">
        {faqData.map((faq: any, index: number) => (
          <div
            key={index}
            className="border rounded-2xl sm:rounded-none px-5 py-3 gap-4"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left gap-4"
            >
              <span className="font-semibold sm:font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                {faq.question}
              </span>

              <ChevronDown
                className={`w-5 h-5 text-orange-500 sm:text-gray-700 dark:sm:text-white transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === index && (
              <p className="text-gray-500 mt-4 sm:mt-3 leading-6 sm:leading-relaxed text-sm sm:text-base">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const MobilePhotos = ({ galleryImages }: any) => {
  if (!galleryImages.length) return null;

  return (
    <div className="max-w-7xl mx-auto mt-6 sm:px-5 px-2 sm:hidden">
      <h2 className="text-xl font-bold text-gray-900 mb-5">Photos</h2>

      <div className="grid grid-cols-2 gap-5 items-start">
        <div className="flex flex-col gap-5">
          {galleryImages
            .filter((_: string, i: number) => i % 2 === 0)
            .map((img: string, index: number) => (
              <div
                key={index}
                className={`overflow-hidden rounded-[28px] bg-gray-100 ${
                  index === 0 ? "h-[360px]" : "h-[140px]"
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </div>
            ))}
        </div>

        <div className="flex flex-col gap-5">
          {galleryImages
            .filter((_: string, i: number) => i % 2 !== 0)
            .map((img: string, index: number) => (
              <div
                key={index}
                className={`overflow-hidden rounded-[28px] bg-gray-100 ${
                  index === 1 ? "h-[360px]" : "h-[140px]"
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const WarrantyModal = ({
  warrantyDays,
  onClose,
}: {
  warrantyDays: number;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="relative bg-white rounded-[32px] w-full max-w-md p-6 pt-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center">
          <div className="w-28 h-28 rounded-full flex items-center justify-center">
            <img
              src="https://img.freepik.com/premium-vector/green-verified-badge_78370-6058.jpg?semt=ais_hybrid&w=740&q=80"
              alt="verified"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="text-center mt-2">
          <h2 className="text-xl font-bold text-black">Service Warranty</h2>

          <p className="text-[#FF8A00] text-lg font-bold mt-1">
            {warrantyDays} Days Warranty
          </p>
        </div>

        <div className="bg-orange-100 rounded-2xl p-5 mt-4">
          <h3 className="text-lg font-bold text-black mb-2">
            What&apos;s Covered?
          </h3>

          <ul className="space-y-1 text-gray-500 text-sm leading-relaxed">
            <li>• Free re-work for the same issue.</li>
            <li>• Quality assurance on all spare parts.</li>
            <li>• Genuine service by verified experts.</li>
            <li>• Priority support for warranty claims.</li>
          </ul>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={onClose}
            className="bg-orange-500 text-white text-xl font-bold px-10 py-3 rounded-full shadow-lg"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};