"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface AMCDurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (duration: string) => void;
}

const amcOptions = [
  {
    title: "12 Month Maintenance",
    value: "12m",
    price: 550,
    oldPrice: 650,
  },
  {
    title: "24 Month Maintenance",
    value: "24m",
    price: 1050,
    oldPrice: 1650,
    recommended: true,
  },
  {
    title: "36 Month Maintenance",
    value: "36m",
    price: 1550,
    oldPrice: 2650,
  },
];

export const AMCDurationModal: React.FC<AMCDurationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDone = () => {
    if (selected) {
      onConfirm(selected);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[24px] w-full max-w-sm p-5 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          Select AMC Duration
        </h2>

        {/* Options */}
        <div className="space-y-5">
          {amcOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => setSelected(option.value)}
              className="flex items-start gap-3 cursor-pointer"
            >
              {/* Radio */}
              <div
                className={`w-5 h-5 mt-1 rounded-full border-2 flex items-center justify-center
                  ${
                    selected === option.value
                      ? "border-orange-500"
                      : "border-gray-300"
                  }`}
              >
                {selected === option.value && (
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col">
                <p className="text-sm text-gray-800">{option.title}</p>

                <div className="flex items-center gap-2 mt-1">
                  <span className="font-semibold text-gray-900">
                    ₹{option.price}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    ₹{option.oldPrice}
                  </span>
                </div>

                {option.recommended && (
                  <span className="text-green-600 text-xs font-semibold mt-1">
                    RECOMMENDED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Done Button */}
        <button
          onClick={handleDone}
          disabled={!selected}
          className="w-full mt-6 py-3 rounded-full text-white font-semibold disabled:opacity-50"
          style={{
            background: "linear-gradient(90deg, #FF6B00, #FFA500)",
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
};
