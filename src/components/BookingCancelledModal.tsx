"use client";

import { Check } from "lucide-react";
import { useEffect } from "react";

interface Props {
  onClose: () => void;
}

const BookingCancelledModal = ({ onClose }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
      onClick={onClose} // ❌ this closes on outside click
    >
      <div
        className="bg-white rounded-[32px] w-full max-w-[420px] py-10 px-6 text-center shadow-2xl relative"
        onClick={(e) => e.stopPropagation()} // ✅ prevents closing
      >
        {/* Circle Animation */}
        {/* Bubble Image */}
        <div className="relative flex items-center justify-center mb-6">
          <img
            src="/bubble.png"
            alt="success"
            className="w-[180px] h-[180px] object-contain"
          />
        </div>

        {/* Text */}
        <h2 className="text-[22px] font-semibold text-orange-500 mb-2">
          Booking Canceled
        </h2>

        <p className="text-gray-500 text-sm">Your Booking has been cancelled</p>

        {/* Close */}
        {/* <button
          onClick={onClose}
          className="mt-6 text-sm text-gray-500 underline"
        >
          Close
        </button> */}
      </div>
    </div>
  );
};

export default BookingCancelledModal;
