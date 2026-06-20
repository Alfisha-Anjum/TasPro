"use client";

import { X, MapPin, Phone, MessageCircle, ChevronRight } from "lucide-react";

interface ScheduleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReschedule: () => void;
  schedule?: {
    id: string;
    serviceTitle: string;
    serviceSubtitle: string;
    serviceImage: string;
    rating: number;
    reviews: number;
    status: string;
    date: string;
    time: string;
    address: string;
    technician?: string;
    itemTotal: number;
    discount: number;
    taxes: number;
  };
}

const ScheduleDetailsModal = ({
  isOpen,
  onClose,
  onReschedule,
  schedule
}: ScheduleDetailsModalProps) => {
  if (!isOpen || !schedule) return null;

  const totalAmount = (schedule.itemTotal - schedule.discount + schedule.taxes).toFixed(2);

  const timelineSteps = [
    { title: "Booking Confirmed", completed: true },
    { title: "Technician Assigned", completed: true },
    { title: "On the way", completed: false },
    { title: "Completed", completed: false }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-[20px] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
        {/* Header with Close Button */}
        <div className="sticky top-0 bg-white border-b border-[#EEE] flex items-center justify-between p-6 z-10">
          <h2 className="text-xl font-semibold text-[#222]">Schedule Details</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#FFE9E2] flex items-center justify-center text-[#FF6B2C] hover:bg-[#FFD4C0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT PANEL - Service & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Summary Card */}
            <div className="bg-white rounded-[16px] border border-[#EEE] p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-[10px] overflow-hidden bg-gray-100">
                    <img
                      src={schedule.serviceImage}
                      alt={schedule.serviceTitle}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-service.jpg";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#222]">
                      {schedule.serviceTitle}
                    </h3>
                    <p className="text-sm text-[#777] mt-1">{schedule.serviceSubtitle}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <svg
                        className="w-4 h-4 text-[#FFA500]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-semibold text-[#222]">{schedule.rating}</span>
                      <span className="text-xs text-[#777]">({schedule.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold flex-shrink-0 ${
                  schedule.status === "Completed"
                    ? "bg-[#E8F5E9] text-[#28C76F]"
                    : schedule.status === "Running"
                    ? "bg-[#E3F2FD] text-[#1976D2]"
                    : "bg-[#FFE9E2] text-[#FF6B2C]"
                }`}>
                  {schedule.status}
                </span>
              </div>

              {/* Date & Time */}
              <div className="border-t border-[#EEE] pt-4">
                <p className="text-xs text-[#777] mb-1">Date & Time</p>
                <p className="text-sm font-semibold text-[#222]">
                  {schedule.date} | {schedule.time}
                </p>
              </div>
            </div>

            {/* Customer Details Card */}
            <div className="bg-white rounded-[16px] border border-[#EEE] p-5 hover:shadow-md transition-shadow">
              <h3 className="text-sm font-semibold text-[#222] pb-4 mb-4 border-b border-[#EEE]">
                Customer Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FF6B2C] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-[#777]">Address</p>
                    <p className="text-sm font-medium text-[#222]">{schedule.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#FF6B2C] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-[#777]">Technician</p>
                    <p className="text-sm font-medium text-[#222]">
                      {schedule.technician || "Not assigned yet"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#EEE]">
                <button className="flex items-center justify-center gap-2 h-11 rounded-[10px] bg-[#F7F7F7] text-[#222] text-sm font-medium hover:bg-[#EEE] transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </button>
                <button className="flex items-center justify-center gap-2 h-11 rounded-[10px] bg-[#F7F7F7] text-[#222] text-sm font-medium hover:bg-[#EEE] transition-colors">
                  <Phone className="w-4 h-4" />
                  Call
                </button>
              </div>
            </div>

            {/* Work Status Timeline */}
            <div className="bg-white rounded-[16px] border border-[#EEE] p-5 hover:shadow-md transition-shadow">
              <h3 className="text-sm font-semibold text-[#222] pb-4 mb-4 border-b border-[#EEE]">
                Work Status
              </h3>
              <div className="space-y-4">
                {timelineSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          step.completed
                            ? "bg-[#28C76F] border-[#28C76F]"
                            : "border-[#DDD] bg-white"
                        }`}
                      >
                        {step.completed && (
                          <svg
                            className="w-3.5 h-3.5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      {index < timelineSteps.length - 1 && (
                        <div
                          className={`w-0.5 h-12 mt-2 ${
                            step.completed ? "bg-[#28C76F]" : "bg-[#DDD]"
                          }`}
                        />
                      )}
                    </div>
                    <div className="pt-1">
                      <p
                        className={`text-sm font-medium ${
                          step.completed ? "text-[#222]" : "text-[#777]"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[16px] border border-[#EEE] p-5 sticky top-24 hover:shadow-md transition-shadow">
              <h3 className="text-sm font-semibold text-[#222] pb-4 mb-4 border-b border-[#EEE]">
                Payment Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#777]">Item Total</span>
                  <span className="font-medium text-[#222]">₹{schedule.itemTotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#777]">Discount</span>
                  <span className="font-medium text-[#28C76F]">-₹{schedule.discount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#777]">Taxes</span>
                  <span className="font-medium text-[#222]">₹{schedule.taxes}</span>
                </div>

                <div className="border-t border-[#EEE] pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#222]">Total Amount</span>
                    <span className="font-bold text-[#222] text-base">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Reschedule Button */}
              <button
                onClick={onReschedule}
                className="w-full mt-6 h-12 rounded-[10px] bg-gradient-to-r from-[#FF6B2C] to-[#FFA62B] text-white font-semibold hover:shadow-lg transition-shadow"
              >
                Reschedule
              </button>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }

          .animate-scaleIn {
            animation: scaleIn 0.2s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ScheduleDetailsModal;
