"use client";

import { X } from "lucide-react";

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  bookingData: any;
}

export const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  bookingData,
}) => {
  if (!isOpen) return null;

  const totalPrice = 3999;
  const discount = Math.floor(totalPrice * 0.25);
  const finalPrice = totalPrice - discount;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative max-h-96 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

        <div className="space-y-4 mb-6 pb-4 border-b border-gray-200">
          <div>
            <p className="text-sm text-gray-600">Service Type</p>
            <p className="font-bold text-gray-900">{bookingData.acType}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Capacity</p>
            <p className="font-bold text-gray-900">{bookingData.capacity}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Date & Time</p>
            <p className="font-bold text-gray-900">
              {bookingData.date} • {bookingData.time}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Address</p>
            <p className="font-bold text-gray-900">{bookingData.address.name}</p>
            <p className="text-sm text-gray-600">{bookingData.address.address}</p>
          </div>
        </div>

        <div className="space-y-2 mb-6 pb-4 border-b border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <span>MRP</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span style={{ color: "#FF6B00" }}>₹{finalPrice}</span>
          </div>
        </div>

        <button
          onClick={onContinue}
          style={{ backgroundColor: "#FF6B00" }}
          className="w-full text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};
