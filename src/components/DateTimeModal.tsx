"use client";

import { X, Calendar, Clock, FileText } from "lucide-react";
import { useEffect, useState } from "react";

interface DateTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (date: string, timeSlot: string, notes: string) => void;
}

const DateTimeModal = ({ isOpen, onClose, onContinue }: DateTimeModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");

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
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const timeSlots = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM", 
    "1:00 PM - 3:00 PM",
    "3:00 PM - 5:00 PM",
    "5:00 PM - 7:00 PM",
    "7:00 PM - 9:00 PM"
  ];

  const handleContinue = () => {
    if (selectedDate && selectedTimeSlot) {
      onContinue(selectedDate, selectedTimeSlot, specialNotes);
      onClose();
      // Reset form
      setSelectedDate("");
      setSelectedTimeSlot("");
      setSpecialNotes("");
    }
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative bg-white rounded-2xl shadow-xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-200 ${
          isVisible 
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-95 translate-y-4 opacity-0'
        }`}
        style={{
          width: '420px',
          borderRadius: '16px'
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Select Date & Time</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Select Date */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-orange-600" />
              <label className="font-semibold text-gray-900">Select Date</label>
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={{ borderRadius: '8px' }}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Select Time Slot */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-orange-600" />
              <label className="font-semibold text-gray-900">Select Time Slot</label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    selectedTimeSlot === slot
                      ? 'bg-orange-600 text-white border-orange-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  style={{ borderRadius: '8px' }}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-orange-600" />
              <label className="font-semibold text-gray-900">Special Notes</label>
            </div>
            <textarea
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="Any special instructions or requirements..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              style={{ borderRadius: '8px' }}
            />
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedDate || !selectedTimeSlot}
            className={`w-full py-3 text-white font-medium rounded-lg transition-colors ${
              selectedDate && selectedTimeSlot
                ? 'hover:opacity-90'
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              background: 'linear-gradient(90deg,#ff7a18,#ff3d00)',
              borderRadius: '10px',
              height: '48px'
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateTimeModal;
