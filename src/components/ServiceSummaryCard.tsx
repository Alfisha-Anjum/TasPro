"use client";

import { useState, useEffect } from "react";
import { Star, Shield, CheckCircle } from "lucide-react";
import Image from "next/image";
import { BookingFlow } from "./booking-flow/BookingFlow";
import { createPortal } from "react-dom";
import nikImg from "@/components/nik.png";

interface ServiceSummaryCardProps {
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  warranty: string;
  service?: any;
}

export const ServiceSummaryCard: React.FC<ServiceSummaryCardProps> = ({
  rating,
  reviews,
  price,
  duration,
  warranty,
  service,
}) => {
  const [showBookingFlow, setShowBookingFlow] = useState(false);

  if (service?.slug === "ac-repair") {
    const [bannerEl, setBannerEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
      const el = document.querySelector(
        ".grid.lg\\:grid-cols-3 .lg\\:col-span-2 .relative.w-full.h-96.rounded-xl"
      ) as HTMLElement | null;
      if (el) {
        // ensure sizing matches design
        el.style.height = "363px";
        el.style.borderRadius = "20px";
        setBannerEl(el);
      }
    }, []);

    return (
      <>
        <style jsx global>{`
          .grid.lg\\:grid-cols-3:has(.ac-repair-override) {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .grid.lg\\:grid-cols-3:has(.ac-repair-override) > * {
            grid-column: 1 / -1 !important;
          }
          .grid.lg\\:grid-cols-3.mb-8:has(.ac-repair-override)
            > :not(.ac-repair-override):not(.lg\\:col-span-2) {
            display: none !important;
          }
        `}</style>
        <div className="ac-repair-override" style={{ display: "none" }} />
        {bannerEl &&
          createPortal(
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "400px",
                height: "363px",
                borderRadius: "20px",
                overflow: "hidden",
                pointerEvents: "none",
              }}
            >
              <Image src={nikImg} alt="Left hero" fill className="object-cover" />
            </div>,
            bannerEl
          )}
      </>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
        <div className="mb-6">
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-2xl font-bold text-gray-900">{rating}</span>
            <span className="text-gray-600">({reviews} reviews)</span>
          </div>
        </div>

        <div className="border-t border-gray-200 py-4 mb-4">
          <p className="text-gray-600 text-sm mb-1">Price</p>
          <p className="text-3xl font-bold text-gray-900">₹{price}</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-700">
            <CheckCircle className="w-5 h-5 text-orange-500" />
            <span className="text-sm">{duration} Duration</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Shield className="w-5 h-5 text-orange-500" />
            <span className="text-sm">{warranty} Warranty</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <CheckCircle className="w-5 h-5 text-orange-500" />
            <span className="text-sm">No Hidden Charges</span>
          </div>
        </div>

        <button
          onClick={() => setShowBookingFlow(true)}
          style={{ backgroundColor: "#FF6B00" }}
          className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Book Now
        </button>
      </div>

      {/* Booking Flow Modal */}
      <BookingFlow
        isOpen={showBookingFlow}
        onClose={() => setShowBookingFlow(false)}
        service={service}
        onSuccess={() => {
          // Handle success callback
          console.log("Service booked successfully");
        }}
      />
    </>
  );
};
