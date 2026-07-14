"use client";

import { X, MapPin } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReschedule?: (date: string, time: string, notes: string) => void;
  onConfirm?: (data: { date: string; time: string; notes: string; address?: string }) => void;
  currentBooking?: any;
}

const RescheduleModal = ({ isOpen, onClose, onReschedule, onConfirm, currentBooking }: RescheduleModalProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) {
      await Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please select both date and time.",
        confirmButtonColor: "#FF6B00",
      });
      return;
    }

    if (onReschedule) {
      onReschedule(selectedDate, selectedTime, notes);
    } else if (onConfirm) {
      onConfirm({
        date: selectedDate,
        time: selectedTime,
        notes,
      });
    }

    await Swal.fire({
      icon: "success",
      title: "Rescheduled Successfully!",
      text: "Your service has been rescheduled.",
      timer: 1800,
      showConfirmButton: false,
    });

    resetForm();
    onClose();
  };

  const resetForm = () => {
    setSelectedDate("");
    setSelectedTime("");
    setNotes("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  // Time slots
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM"
  ];

  // Get next 30 days
  const getNextDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[16px] w-full max-w-sm shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-[#F0F0F0]">
          <h2 className="text-xl font-bold text-[#222]">Reschedule Service</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-orange-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Select Date */}
          <div>
            <label className="block text-sm font-semibold text-[#222] mb-2">
              Select Date <span className="text-[#FF6B00]">*</span>
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] bg-white"
            >
              <option value="">Choose a date</option>
              {getNextDates().map((date, index) => (
                <option key={index} value={date.toISOString().split("T")[0]}>
                  {date.toLocaleDateString("en-IN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  })}
                </option>
              ))}
            </select>
          </div>

          {/* Select Time Slot */}
          <div>
            <label className="block text-sm font-semibold text-[#222] mb-3">
              Select Time Slot <span className="text-[#FF6B00]">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-3 rounded-[10px] text-sm font-medium transition-all border ${
                    selectedTime === time
                      ? "bg-gradient-to-r from-[#FF8C42] to-[#FF6B00] text-white border-transparent"
                      : "bg-white text-[#333] border-[#DDD] hover:border-[#FF6B00]"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Your Location */}
          <div>
            <label className="block text-sm font-semibold text-[#222] mb-2">
              Your Location
            </label>
            <div className="flex items-center gap-3 px-4 py-3 border border-[#DDD] rounded-[10px] bg-[#F9F9F9]">
              <MapPin className="w-4 h-4 text-[#666]" />
              <span className="text-[#333] text-sm">
                {currentBooking?.address || "123 Main Street, City"}
              </span>
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <label className="block text-sm font-semibold text-[#222] mb-2">
              Special Notes <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special requirements or notes for the technician..."
              className="w-full px-4 py-3 border border-[#DDD] rounded-[10px] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B2C33] outline-none transition-colors text-[#333] resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Footer with Buttons */}
        <div className="px-6 py-4 bg-[#F9F9F9] border-t border-[#F0F0F0] flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 h-11 rounded-[10px] border border-[#DDD] text-[#333] font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className="flex-1 h-11 rounded-[10px] bg-gradient-to-r from-[#FF8C42] to-[#FF6B00] text-white font-semibold text-sm hover:from-[#FF7B20] hover:to-[#F55900] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;