"use client";

import { X, Star, Shield, Check, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { ReactNode } from "react";



interface ServiceData {
  title: string;
  rating: number;
  reviewCount: number;
  warranty: string;
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceData;
  title?: string;
  children?: ReactNode;
}


const ServiceModal = ({
  isOpen,
  onClose,
  title,
  children,
  service
}: ServiceModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen && !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-200 ${
          isVisible
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-4 opacity-0"
        }`}
        style={{
          width: "420px",
          borderRadius: "16px",
        }}
      >
        {/* Top Image */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: "180px",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          <Image
            src="/service1.png"
            alt={service.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Header */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">{service.title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Rating and Warranty */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold">{service.rating}</span>
              <span className="text-sm text-gray-500">
                ({service.reviewCount})
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">
                {service.warranty}
              </span>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {/* How it Works */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">How it Works</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold mt-0.5">
                    1
                  </div>
                  <p className="text-sm text-gray-600">
                    Book your service online
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold mt-0.5">
                    2
                  </div>
                  <p className="text-sm text-gray-600">
                    Technician visits your location
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold mt-0.5">
                    3
                  </div>
                  <p className="text-sm text-gray-600">
                    Service completed with warranty
                  </p>
                </div>
              </div>
            </div>

            {/* Service Inclusion */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Service Inclusion
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">
                    Complete inspection
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">
                    Cleaning and maintenance
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">
                    Basic repair work
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">
                    Performance testing
                  </span>
                </div>
              </div>
            </div>

            {/* Service Exclusion */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Service Exclusion
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-600">
                    Major parts replacement
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-600">Gas refilling</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-600">
                    Installation services
                  </span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Important Notes
              </h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  • Service available 9 AM - 9 PM
                  <br />
                  • Additional charges may apply for parts
                  <br />• Cancellation: 24 hours notice required
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;