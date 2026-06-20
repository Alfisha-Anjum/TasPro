"use client";

import { X, CreditCard, Smartphone, Banknote } from "lucide-react";
import { useState } from "react";

interface PaymentOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (method: string) => void;
  totalPrice: number;
}

const paymentMethods = [
  {
    id: "card",
    icon: CreditCard,
    label: "Debit / Credit Card",
    sub: "Visa, Mastercard, Rupay",
  },
  {
    id: "gpay",
    icon: Smartphone,
    label: "Google Pay",
    sub: "Fast & Secure",
  },
  {
    id: "phonepe",
    icon: Smartphone,
    label: "PhonePe",
    sub: "Instant Payment",
  },
  {
    id: "paytm",
    icon: Smartphone,
    label: "Paytm",
    sub: "Secure Payment",
  },
  {
    id: "cod",
    icon: Banknote,
    label: "Cash on Delivery",
    sub: "Pay after service",
  },
];

export const PaymentOptionModal: React.FC<PaymentOptionModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  totalPrice,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative max-h-96 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Select Payment Method
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Choose your preferred payment option
        </p>

        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className="w-full flex items-center gap-4 p-4 border-2 rounded-xl transition-all text-left"
              style={{
                borderColor:
                  selectedMethod === method.id ? "#FF6B00" : "#E5E7EB",
                backgroundColor:
                  selectedMethod === method.id ? "#FFF4E6" : "transparent",
              }}
            >
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <method.icon className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-grow">
                <p className="font-bold text-gray-900">{method.label}</p>
                <p className="text-sm text-gray-600">{method.sub}</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedMethod === method.id
                    ? "border-orange-600 bg-orange-600"
                    : "border-gray-300"
                }`}
              >
                {selectedMethod === method.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mb-6 p-4 bg-orange-50 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900">Amount to Pay</span>
            <span className="text-2xl font-bold text-orange-600">
              ₹{totalPrice}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            if (selectedMethod) onContinue(selectedMethod);
          }}
          disabled={!selectedMethod}
          style={{
            backgroundColor: selectedMethod ? "#FF6B00" : "#D1D5DB",
          }}
          className="w-full text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:cursor-not-allowed"
        >
          Pay ₹{totalPrice}
        </button>
      </div>
    </div>
  );
};
