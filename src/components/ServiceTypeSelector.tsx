"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import subServiceImg from "./subservice.png";

interface ServiceType {
  id: string;
  name: string;
}

interface ServiceTypeSelectorProps {
  types: ServiceType[];
  activeType: string;
  onTypeChange: (type: string) => void;
}

const ServiceTypeSelector = ({ types, activeType, onTypeChange }: ServiceTypeSelectorProps) => {
  return (
    <div className="relative flex items-center gap-4 w-full">
      {/* Left Arrow */}
      <button className="flex-shrink-0 w-8 h-8 rounded-full border border-orange-100 flex items-center justify-center text-orange-500 hover:bg-orange-50 transition-colors">
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Types List */}
      <div className="flex gap-6 overflow-x-auto pb-2 no-scrollbar flex-grow">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`flex flex-col items-center justify-center min-w-[140px] p-4 rounded-2xl transition-all border-2 hover:shadow-md ${
              activeType === type.id
                ? "border-orange-500 bg-orange-50 shadow-lg"
                : "border-gray-100 bg-white hover:border-gray-300"
            }`}
          >
            <div className="w-16 h-12 relative mb-2">
              <Image
                src={subServiceImg}
                alt={type.name}
                fill
                className="object-contain"
              />
            </div>
            <span className={`text-sm font-semibold ${
              activeType === type.id ? "text-orange-600" : "text-gray-700"
            }`}>
              {type.name}
            </span>
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      <button className="flex-shrink-0 w-8 h-8 rounded-full border border-orange-100 flex items-center justify-center text-orange-500 hover:bg-orange-50 transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ServiceTypeSelector;
