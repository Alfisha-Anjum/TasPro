"use client";

import { X, BadgeCheck } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  service: any;
}

const cleanHtml = (html?: string) => {
  if (!html) return "";

  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

export default function WarrantyModal({ open, onClose, service }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-5">
      <div className="relative w-full max-w-sm bg-white rounded-[28px] p-6 ">
        {/* Close */}
        <button onClick={onClose} className="absolute top-5 right-5">
          <X className="w-7 h-7" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mt-2">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
            <BadgeCheck className="text-white" size={52} />
          </div>
        </div>

        {/* Heading */}

        <h2 className="text-lg font-bold text-center mt-5">
          Service Warranty
        </h2>

        {/* Orange text */}

        <p className="text-orange-500 font-semibold text-center mt-1 text-sm">
          {service?.warrantyDays || 30} days testing warranty available.
        </p>

        {/* Box */}

        <div className="mt-6 bg-orange-50 rounded-2xl p-5">
          <h3 className="font-bold text-sm mb-2">What's Covered?</h3>

          <div className="text-xs text-gray-600 leading-5  whitespace-pre-line">
            {cleanHtml(service?.warrantyDescription)}
          </div>
        </div>

        {/* Button */}

        <div className="flex justify-center mt-8">
          <button
            onClick={onClose}
            className="px-5  py-3 text-sm rounded-full bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
