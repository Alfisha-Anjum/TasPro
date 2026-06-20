"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface Props {
  booking: any;
  onClose: () => void;
  onConfirm: (data?: {
    cancel_reason_id: number;
    cancel_reason: string;
  }) => void;
  loading?: boolean;
}


const CancelBookingModal = ({
  booking,
  onClose,
  onConfirm,
  loading = false,
}: Props) => {
  const [reason, setReason] = useState("Cancellation Reason");
  const [description, setDescription] = useState("");
  const [showReasons, setShowReasons] = useState(false);
const [selectedReason, setSelectedReason] = useState<any>(null);
 const reasons = [
   { id: 1, label: "Change of plans" },
   { id: 2, label: "Booked by mistake" },
   { id: 3, label: "Found another service" },
   { id: 4, label: "Timing issue" },
   { id: 5, label: "Price issue" },
 ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="relative w-full max-w-[475px] rounded-[32px] bg-white px-8 pt-8 pb-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-5 right-[-6px] w-12 h-12 rounded-full bg-[#ff8a2a] text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          <X className="w-75 h-5" strokeWidth={3} />
        </button>

        {/* Heading */}
        <h2 className="text-[24px] font-bold text-[#222] text-center">
          Cancel Booking
        </h2>

        {/* Description */}
        <p className="text-center text-[14px]  text-[#7a7a7a] mt-2 mb-5 px-2">
          We're sorry to hear that you need to cancel your booking. Please let
          us know the reason for the cancellation by selecting one of the
          options below. Your feedback helps us improve our services.
        </p>

        {/* Reason Dropdown */}
        <div className="relative mb-4">
          <button
            type="button"
            onClick={() => setShowReasons(!showReasons)}
            className="w-full h-[54px] border border-[#ff8a65] rounded-[8px] px-4 flex items-center justify-between text-left bg-white"
          >
            <span
              className={`text-[14px] font-medium ${
                reason === "Cancellation Reason"
                  ? "text-[#2b2b2b]"
                  : "text-[#2b2b2b]"
              }`}
            >
              {reason}
            </span>

            <ChevronDown className="w-5 h-5 text-[#2b2b2b]" />
          </button>

          {/* Small avatar like screenshot */}

          {showReasons && (
            <div className="absolute top-[60px] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
              {reasons.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedReason(item);
                    setReason(item.label);
                    setShowReasons(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-orange-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Textarea */}
        <div className="mb-6">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please Describe Reason"
            className="w-full h-[162px] resize-none rounded-[8px] border border-[#ff8a65] px-4 py-4 text-[14px] text-[#2b2b2b] placeholder:text-[#2b2b2b] outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={() =>
              onConfirm({
                cancel_reason_id: selectedReason?.id,
                cancel_reason: description || selectedReason?.label,
              })
            }
            disabled={loading}
            className="h-[40px] min-w-[305px] rounded-full bg-gradient-to-r from-[#ff5a2f] to-[#ffb127] text-white text-[16px] font-medium shadow-[0_8px_18px_rgba(255,140,0,0.35)] hover:opacity-95 transition disabled:opacity-50"
          >
            {loading ? "Cancelling..." : "Cancel Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;
