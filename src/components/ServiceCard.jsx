import React from 'react';
import SafeImage from "@/components/SafeImage";
import { Star, Clock, ShieldCheck } from 'lucide-react';

const ServiceCard = ({
  title,
  description,
  rating,
  reviews,
  duration,
  price,
  originalPrice,
  discount,
  image,
  warrantyDays,
  onWarrantyClick,
  onAdd,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-all duration-200 group">
      {/* Left side - Service icon/image */}
      <div className="relative w-28 h-28 flex-shrink-0">
        <div className="absolute inset-0 bg-green-50 rounded-xl z-0 group-hover:scale-105 transition-transform duration-200"></div>
        <SafeImage
          src={image}
          alt={title}
          width={112}
          height={112}
          className="relative z-10 rounded-xl object-cover h-full w-full p-2"
        />
        <span
          onClick={onWarrantyClick}
          className="inline-block cursor-pointer text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-md mb-2"
        >
          {warrantyDays || 0} Days Warranty
        </span>
        <div className="absolute -top-2 -left-2 bg-white p-1.5 rounded-lg shadow-sm z-20 border border-gray-50">
          <ShieldCheck size={14} className="text-green-500" />
        </div>
      </div>

      {/* Service details */}
      <div className="flex-grow">
        <h3 className="text-lg font-bold mb-1 text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">{description}</p>

        {/* Rating and duration */}
        <div className="flex items-center gap-4 text-sm mb-4">
          <div className="flex items-center gap-1 font-semibold text-gray-800">
            <Star size={14} className="fill-orange-500 text-orange-500" />
            <span>{rating}</span>
            <span className="text-gray-400 font-normal">({reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Clock size={14} />
            <span>{duration}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-3">
          <span className="text-gray-400 line-through text-sm font-medium">
            ₹{originalPrice}
          </span>
          <span className="text-xl font-black text-green-600">₹{price}</span>
          <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-0.5 rounded-md border border-red-100 uppercase tracking-wider">
            {discount}
          </span>
        </div>
      </div>

      {/* Right side - Add button */}
      <div className="flex-shrink-0 ml-4">
        <button
          onClick={onAdd}
          className="bg-[#FF6B00] hover:bg-[#e66000] text-white font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-orange-100 transition-all duration-200 active:scale-95 transform"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
