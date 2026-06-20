"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface AlternateNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (number: string) => void;
}

export default function AlternateNumberModal({
  isOpen,
  onClose,
  onSave,
}: AlternateNumberModalProps) {
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[90%] max-w-md rounded-2xl p-6 relative shadow-lg"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-orange-500 text-white p-2 rounded-full shadow-md"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-2">
          Add Alternate Number
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter an alternate phone number for service communication.
        </p>

        {/* Input */}
        <div className="mb-6">
          <label className="block font-medium mb-2">
            Alternate Phone Number
          </label>

          <input
            type="tel"
            placeholder="e.g., +91 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-white w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Button */}
        <button
          onClick={() => onSave?.(phone)}
          className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-500 to-yellow-400"
        >
          Save Number
        </button>
      </div>
    </div>
  );
}
