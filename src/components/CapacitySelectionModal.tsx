"use client";

import { useState, useEffect } from "react";
import { X, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/context/BookingContext";

interface CapacitySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  onConfirm: (capacity: string) => void;
  onSelectAMC: () => void;
}

const capacityOptions = [
  { capacity: "1.0 TON (Split AC)", price: 499, oldPrice: 799, image: "/hero1.png" },
  { capacity: "1.5 TON (Split AC)", price: 599, oldPrice: 899, image: "/hero1.png" },
  { capacity: "2.0 TON (Split AC)", price: 699, oldPrice: 999, image: "/hero1.png" },
  { capacity: "2.5 TON (Split AC)", price: 799, oldPrice: 1099, image: "/hero1.png" },
];

export const CapacitySelectionModal: React.FC<
  CapacitySelectionModalProps
> = ({ isOpen, onClose, serviceName, onConfirm, onSelectAMC }) => {
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [isManual, setIsManual] = useState(false);
  const [manualValue, setManualValue] = useState("10");
  const [manualQuantity, setManualQuantity] = useState(1);

  // Disable scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDone = () => {
    if (isManual) {
      onConfirm(`${manualValue} TR (Manual) x ${manualQuantity}`);
    } else if (selectedCapacity) {
      onConfirm(selectedCapacity);
    }
    onSelectAMC();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-[16px] w-full max-w-[500px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Select Split AC Capacity</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors"
          >
            <X className="w-5 h-5 text-orange-600" />
          </button>
        </div>

        {/* List */}
        <div className="max-h-[60vh] overflow-y-auto">
          {capacityOptions.map((option) => (
            <div 
              key={option.capacity}
              className={`p-4 flex items-center justify-between border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                selectedCapacity === option.capacity && !isManual ? "bg-orange-50" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                   <Image src={option.image} alt="AC" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{option.capacity}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-black text-sm">₹{option.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{option.oldPrice}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setSelectedCapacity(option.capacity);
                  setIsManual(false);
                }}
                className={`px-6 py-2 rounded-[12px] text-sm font-bold border transition-all ${
                  selectedCapacity === option.capacity && !isManual
                    ? "bg-orange-500 text-white border-orange-500"
                    : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                }`}
              >
                {selectedCapacity === option.capacity && !isManual ? "Added" : "Add"}
              </button>
            </div>
          ))}

          {/* Manual Section */}
          <div className="p-4 bg-gray-50/50">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                  isManual ? "border-orange-500" : "border-gray-300"
                }`}
                onClick={() => setIsManual(true)}
              >
                {isManual && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
              </div>
              <span className="font-medium text-gray-700 text-sm">Enter Capacity manually (in TR)</span>
            </div>

            <div className={`pl-8 transition-opacity ${isManual ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
              <div className="flex items-center gap-4">
                <div className="w-20">
                  <input
                    type="text"
                    value={manualValue}
                    onChange={(e) => setManualValue(e.target.value)}
                    className="w-full p-2 text-center border border-gray-300 rounded-lg text-sm font-bold focus:border-orange-500 outline-none"
                  />
                </div>
                <span className="font-bold text-gray-900">₹499</span>
                
                <div className="flex items-center gap-3 ml-auto bg-white border border-gray-200 rounded-lg p-1">
                  <button 
                    onClick={() => setManualQuantity(Math.max(1, manualQuantity - 1))}
                    className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-orange-500"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{manualQuantity}</span>
                  <button 
                    onClick={() => setManualQuantity(manualQuantity + 1)}
                    className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-orange-500"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleDone}
            disabled={!selectedCapacity && !isManual}
            className="w-full h-[48px] bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-[12px] hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
