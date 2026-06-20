"use client";

import { X } from "lucide-react";
import Image from "next/image";

interface SelectACTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (acType: string) => void;
  service: any;
}

const acTypes = [
  {
    id: "split-ac",
    name: "Split AC",
    price: 3999,
    image: "/hero1.png",
  },
  {
    id: "window-ac",
    name: "Window AC",
    price: 2999,
    image: "/hero2.png",
  },
  {
    id: "cassette-ac",
    name: "Cassette AC",
    price: 4999,
    image: "/hero3.png",
  },
];

export const SelectACTypeModal: React.FC<SelectACTypeModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  service,
}) => {
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

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Select AC Type</h2>

        <div className="space-y-4 mb-6">
          {acTypes.map((type) => (
            <div
              key={type.id}
              className="border-2 border-gray-200 rounded-2xl p-4 hover:border-orange-500 transition-colors cursor-pointer"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={type.image}
                    alt={type.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{type.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Professional service included
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-bold">
                      ₹{type.price}
                    </span>
                    <button
                      onClick={() => onContinue(type.id)}
                      style={{ backgroundColor: "#FF6B00" }}
                      className="text-white font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full text-gray-900 font-bold py-3 rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
