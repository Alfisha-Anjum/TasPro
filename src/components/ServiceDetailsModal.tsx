"use client";

import { X, Star, Plus, Minus, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import WarrantyModal from "@/components/WarrantyModal";
import { useBooking } from "@/context/BookingContext";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  service: any;
  onAdd: () => void;
}

// const frequentlyAdded = [
//   {
//     id: 1,
//     title: "AC Repair (Split)",
//     price: 299,
//     originalPrice: 499,
//     image: "/ac.png",
//   },
//   {
//     id: 2,
//     title: "Drain Clean AC",
//     price: 499,
//     originalPrice: 799,
//     image: "/ac.png",
//   },
//   {
//     id: 3,
//     title: "AC Gas Refill",
//     price: 1499,
//     originalPrice: 1999,
//     image: "/ac.png",
//   },
//   {
//     id: 4,
//     title: "AC Installation",
//     price: 999,
//     originalPrice: 1299,
//     image: "/ac.png",
//   },
// ];

export default function ServiceDetailsModal({
  isOpen,
  onClose,
  service,
  onAdd,
}: Props) {
  if (!isOpen || !service) return null;
// const [quantity, setQuantity] = useState(0);
const { cartItems, addToCart, removeFromCart } = useBooking();


const cartItem = cartItems.find(
  (item) => Number(item.id) === Number(service.id),
);

const quantity = cartItem?.quantity || 0;

  const [showWarranty, setShowWarranty] = useState(false);

  const cleanHtml = (html?: string) => {
    if (!html) return "";
    return html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
  };
const updateQuantity = (type: "increase" | "decrease") => {
  if (type === "increase") {
    onAdd(); // parent wala handleAddService call hoga
  } else {
    removeFromCart(service.id);
  }
};

const workflows = Array.isArray(service?.workflows) ? service.workflows : [];
  // const [cartItems, setCartItems] = useState<any[]>([]);
  // const handleAddItem = (item: any) => {
  //   setCartItems((prev) => [...prev, item]);
  // };

  const getEmbedUrl = (url: string) => {
  if (!url) return "";

  // youtube watch url
  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }

  // youtu.be short url
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // already embed url
  if (url.includes("/embed/")) {
    return url;
  }

  return url;
};

 const issueMoreDetails = Array.isArray(service?.issueMoreDetails)
   ? service.issueMoreDetails
   : service?.issueMoreDetails
     ? [service.issueMoreDetails]
     : [];

     console.log(service, "service");
     console.log(service.workflows, "service.workflows");

 const apiVideoUrl = issueMoreDetails.find(
   (item: any) => item.video_url,
 )?.video_url;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
      <div className="bg-white w-full max-w-sm relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Image */}
        <div
          className="max-h-[80vh] overflow-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="relative h-48 w-full">
            {apiVideoUrl ? (
              <iframe
                src={getEmbedUrl(apiVideoUrl)}
                title={service.title || service.name}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <Image
                src={service.image}
                alt={service.title || service.name}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Content */}
          <div className=" space-y-4">
            {/* Title + Price */}
            {/* <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">{service.title}</h2>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                  {service.rating} • {service.duration}
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">₹{service.price}</p>
                <p className="text-xs line-through text-gray-400">
                  ₹{service.originalPrice}
                </p>
              </div>
            </div> */}
            <div
              key={service.id}
              className="flex gap-3 px-4 py-3 justify-between"
            >
              {/* LEFT: Title + Rating */}
              <div className="flex-1">
                <p className="text-sm font-bold leading-tight">
                  {service.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm font-semibold text-gray-900">
                    ₹{service.discountedPrice * quantity}
                  </p>
                  <p className="text-xs text-gray-400 line-through">
                    ₹{service.originalPrice}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                  {/* {service.rating} • {service.duration}
                   */}
                  <span>
                    {typeof service.rating === "number"
                      ? service.rating.toFixed(1)
                      : "0.0"}
                  </span>
                  <span>({Math.round(service.reviews / 1000)}m reviews)</span>
                  <p className="text-xs text-gray-500">
                    | {service.duration} approx
                  </p>
                </div>
              </div>

              {/* RIGHT: Price + Quantity */}
              <div className="flex  justify-between sm:justify-end gap-4">
                {/* Price */}

                {/* Quantity */}
                {quantity === 0 ? (
                  <button
                    onClick={() => updateQuantity("increase")}
                    className="border border-orange-500 text-orange-500 font-semibold rounded-full px-6 h-8 text-xs hover:bg-orange-50"
                  >
                    Add
                  </button>
                ) : (
                  <div className="flex items-center border border-orange-500   px-4 h-8 rounded-md overflow-hidden">
                    <button
                      onClick={() => updateQuantity("decrease")}
                      className="  flex items-center justify-center text-orange-500 font-bold"
                    >
                      -
                    </button>

                    <span className=" px-2 text-center text-sm font-medium">
                      {quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity("increase")}
                      className=" flex items-center justify-center text-orange-500 font-bold"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Warranty */}
            {/* <div className="text-green-600 text-sm font-medium px-6 whitespace-pre-line">
              {cleanHtml(
                service.warrantyDescription ||
                  `${service.warrantyDays || 0} Days Warranty`,
              )}
            </div> */}

            {/* Badge */}
            <div className="px-4">
              <div className="border border-orange-500 rounded-lg px-3 py-2 text-sm flex justify-between ">
                <p>Standard Rate Card no hidden charges</p>
                <span>›</span>
              </div>
            </div>
            {workflows.length > 0 && (
              <div className="px-4 pt-4">
                <h3 className="text-xl font-bold mb-5">How it Works?</h3>

                <div className="space-y-6">
                  {workflows.map((item: any) => (
                    <div key={item.step} className="flex gap-4">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <BadgeCheck className="text-orange-500" size={22} />
                      </div>

                      {/* Content */}
                      <div>
                        <h4 className="font-semibold text-base">
                          Step {item.step}: {item.title}
                        </h4>

                        <p className="text-sm text-gray-600 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mx-4 rounded-2xl bg-gradient-to-r from-white to-orange-50 shadow-md border border-orange-100 p-5">
              <div className="flex items-center justify-between">
                {/* Left */}
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900">
                    {service?.warrantyDays || 30} Days Warranty
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {service?.warrantyDays || 30} days testing warranty
                    available.
                  </p>

                  <button
                    onClick={() => setShowWarranty(true)}
                    className="mt-4 text-orange-500 text-xs font-semibold hover:text-orange-600"
                  >
                    Explore Benefits →
                  </button>
                </div>

                {/* Right Icon */}
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                  <BadgeCheck
                    size={32}
                    className="text-white"
                    strokeWidth={2.2}
                  />
                </div>
              </div>
            </div>
            {/* How it works */}
            <div className="pt-3 px-4">
              {/* <h3 className="font-semibold mb-4">How it Works?</h3> */}

              {issueMoreDetails.map((detail: any, index: number) => (
                <div key={index} className="space-y-4">
                  <div className="">
                    <h3 className="font-semibold text-sm sm:text-base mb-1">
                      Service Inclusion
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {cleanHtml(detail.inclusions) ||
                        "No inclusion available."}
                    </p>
                  </div>

                  <div className="">
                    <h3 className="font-semibold text-sm sm:text-base mb-1">
                      Service Exclusion
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {detail.exclusions || "No exclusion available."}
                    </p>
                  </div>

                  <div className="">
                    <h3 className="font-semibold text-sm sm:text-base mb-1">
                      Important Note
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {detail.important_notes || "No important note available."}
                    </p>
                  </div>

                  <div className="px-4 sm:px-6">
                    <h3 className="font-semibold text-sm sm:text-base mb-1">
                      Safety Notes
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {detail.safety_notes || "No safety note available."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sections */}

            {/* <div className="pl-6">
              <h3 className="font-semibold mb-2">Frequently Added Together</h3>

              <div
                className=" overflow-auto flex gap-3"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {frequentlyAdded.map((item) => (
                  <div
                    key={item.id}
                    className="min-w-[110px] border rounded-lg  bg-white"
                  >
                  
                    <div className="relative w-full h-20 rounded-md overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    
                    <p className="text-[10px] mt-2 line-clamp-2 px-2">
                      {service.title || service.name}
                    </p>

                    <div className="text-xs mt-1 px-2">
                      <span className="font-semibold text-gray-900">
                        ₹{item.price}
                      </span>{" "}
                    
                    </div>

                    <div className="p-2">
                      <button
                        onClick={() => handleAddItem(item)}
                        className="mt-2 w-full border border-orange-500 text-orange-500 text-xs py-1 rounded-md"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            {/* Bottom Button */}
            {quantity > 0 && (
              <div
                className="sticky bottom-0 left-0 w-full bg-white 
  border-t px-6 py-2 
  flex justify-between items-center
  shadow-[0_-4px_12px_rgba(0,0,0,0.08)]
  rounded-t-xl"
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-2 text-sm">
                  {/* Item count badge */}
                  <div
                    className="w-5 h-5 flex items-center justify-center 
      bg-gray-200 rounded text-xs font-semibold"
                  >
                    {quantity}
                  </div>

                  <div>
                    {/* Price + original price */}
                    <div className="flex items-center ">
                      <span className="font-semibold text-gray-900 text-xs">
                        ₹{service.discountedPrice * quantity}
                      </span>

                      <span className="text-gray-400 line-through text-[10px]">
                        ₹{service.originalPrice * quantity}
                      </span>
                    </div>

                    {/* Plan text */}
                    <p className="text-blue-500 text-[10px] font-medium">
                      12 Month Plan
                    </p>
                  </div>
                </div>
                <WarrantyModal
                  open={showWarranty}
                  onClose={() => setShowWarranty(false)}
                  service={service}
                />
                {/* BUTTON */}
                <Link href="/cart">
                  <button
                    className="bg-gradient-to-r from-orange-500 to-orange-600 
    text-white px-5 py-2 rounded-lg text-sm font-semibold 
    shadow-md hover:opacity-90 transition"
                  >
                    View Cart
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
