"use client";

import { X } from "lucide-react";

interface SplitACModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SplitACModal({ isOpen, onClose }: SplitACModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[440px] p-4 relative">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-semibold text-gray-800 mb-3">
          Split AC (1.5 Ton *2)
        </h2>

        {/* TABLE WRAPPER (important for mobile scroll) */}
        <div className="border border-gray-200 rounded-lg overflow-x-auto">
          <div className="min-w-[420px]">
            {/* HEADER */}
            <div className="grid grid-cols-[30px_60px_90px_90px_40px_1fr] text-gray-600 text-[11px] font-medium px-3 py-2">
              <span>S.N</span>
              <span>Make</span>
              <span>Serial No.</span>
              <span>Model No.</span>
              <span>Age</span>
              <span className="text-center">Images</span>
            </div>

            {/* ROWS */}
            {[1, 2].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[30px_60px_90px_90px_40px_1fr] items-center px-3 py-2 text-[12px] text-gray-700 border-t"
              >
                <span>{i + 1}</span>
                <span>Voltas</span>
                <span className="truncate">CAS1111</span>
                <span className="truncate">ERWT111</span>
                <span>5y</span>

                <div className="flex justify-center">
                  <div className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-sm text-red-500 text-[12px] cursor-pointer hover:bg-gray-50">
                    🖼
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
