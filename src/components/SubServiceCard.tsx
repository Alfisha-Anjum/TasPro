"use client";

import { Star } from "lucide-react";
import Image from "next/image";

interface SubServiceCardProps {
  id: string;
  image: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  duration: string;
  originalPrice: number;
  discountedPrice: number;
  onAdd: () => void;
}

export const SubServiceCard: React.FC<SubServiceCardProps> = ({
  id,
  image,
  name,
  description,
  rating,
  reviews,
  duration,
  originalPrice,
  discountedPrice,
  onAdd,
}) => {
  const discount = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4 mb-4">
        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-grow">
          <h3 className="font-bold text-gray-900 mb-1">{name}</h3>
          <p className="text-sm text-gray-600 mb-2">{description}</p>

          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-900">
                {rating}
              </span>
              <span className="text-sm text-gray-500">({reviews})</span>
            </div>
            <span className="text-sm text-gray-600">⏱ {duration}</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm text-gray-500 line-through">
              ₹{originalPrice}
            </span>
            <span className="text-lg font-bold text-green-600">
              ₹{discountedPrice}
            </span>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
              {discount}% OFF
            </span>
          </div>

          <button
            onClick={onAdd}
            style={{ backgroundColor: "#FF6B00" }}
            className="text-white font-bold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
