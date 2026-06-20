"use client";

import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingSuccessModal = ({ isOpen, onClose }: BookingSuccessModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[20px] w-full max-w-[420px] shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
        {/* Content */}
        <div className="p-10 text-center">
          {/* Large Orange Circle with White Check - Animated */}
          <div className="w-28 h-28 bg-gradient-to-br from-[#FF8C42] to-[#FF6B00] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg animate-scale-pop">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
          
          {/* Text Content */}
          <h3 className="text-2xl font-bold text-[#222] mb-3">Booking Confirmed</h3>
          <p className="text-[#666] text-sm mb-8">
            Your service has been successfully booked
          </p>

          {/* Bottom action or auto-close info */}
          <p className="text-xs text-[#999]">Redirecting in a moment...</p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scalePop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scale-pop {
          animation: scalePop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

export default BookingSuccessModal;
